/**
 * Record one clip from the microphone. Shared by the beat recorder and the
 * "teach a sound" flow so there is one MediaRecorder implementation.
 *
 * Browser audio processing is switched off: echo cancellation and noise
 * suppression eat exactly the short noisy bursts beatboxing is made of.
 *
 * The live level meter and "no sound" check are ported from Kuzic
 * (artifacts/kuzic/src/hooks/use-media-recorder.ts).
 */

// Calibration knobs for the "no sound is coming in" hint. Kuzic tuned these
// with auto-gain on; ours is off, so a quiet mic sits lower. Raise the level
// if a working mic gets flagged, lower it if a dead one does not.
const NO_SIGNAL_LEVEL = 0.015; // meter value (0-1) below which input counts as silence
const NO_SIGNAL_SECONDS = 3; // silence this long since the last sound raises the hint

const AUDIO = {
  echoCancellation: false,
  noiseSuppression: false,
  autoGainControl: false
};

/**
 * @typedef {Object} RecordOptions
 * @property {(elapsedSeconds: number) => void} [onTick] - about ten times a second
 * @property {(level: number, noSignal: boolean) => void} [onLevel] - every frame:
 *   input level 0-1, and whether the mic has been silent for a while
 * @property {string} [deviceId] - microphone to use; the default one if it is gone
 */

/**
 * @param {number} maxSeconds - recording stops by itself after this long
 * @param {RecordOptions} [options]
 * @returns {Promise<{stop: () => void, blob: Promise<Blob>}>} resolves once
 *   recording has started; rejects if the microphone is unavailable
 */
export async function recordClip(maxSeconds, { onTick, onLevel, deviceId } = {}) {
  if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
    throw new DOMException('Recording is not available', 'NotSupportedError');
  }

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: deviceId ? { ...AUDIO, deviceId: { exact: deviceId } } : AUDIO
    });
  } catch (err) {
    // The remembered mic is unplugged or its id rotated: use the default one.
    // Anything else (blocked, busy) must not ask the user a second time.
    if (!deviceId || !['OverconstrainedError', 'NotFoundError'].includes(err.name)) throw err;
    stream = await navigator.mediaDevices.getUserMedia({ audio: AUDIO });
  }

  const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
  let recorder;
  try {
    recorder = new MediaRecorder(stream, { mimeType });
  } catch (err) {
    stream.getTracks().forEach((track) => track.stop()); // do not leave the mic light on
    throw err;
  }
  const chunks = [];
  const startedAt = performance.now();

  const stopMeter = startMeter(stream, startedAt, onLevel);

  const stop = () => {
    clearInterval(timer);
    if (recorder.state === 'recording') recorder.stop();
  };
  // Wall clock, not a tick counter: intervals drift and are throttled in background tabs
  const timer = setInterval(() => {
    const elapsed = (performance.now() - startedAt) / 1000;
    onTick?.(Math.min(maxSeconds, elapsed));
    if (elapsed >= maxSeconds) stop();
  }, 100);

  const blob = new Promise((resolve) => {
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.onstop = () => {
      stopMeter();
      stream.getTracks().forEach((track) => track.stop());
      resolve(new Blob(chunks, { type: mimeType }));
    };
  });

  recorder.start(100);
  return { stop, blob };
}

/**
 * Report the input level every frame. Progressive enhancement: recording
 * works the same if the browser has no Web Audio.
 * @param {MediaStream} stream
 * @param {number} startedAt - performance.now() when recording began
 * @param {RecordOptions['onLevel']} onLevel
 * @returns {() => void} stop the meter and reset the level to 0
 */
function startMeter(stream, startedAt, onLevel) {
  if (!onLevel) return () => {};
  let frame = 0;
  let context;
  try {
    context = new (window.AudioContext || window.webkitAudioContext)();
    context.resume?.();
    const analyser = context.createAnalyser();
    analyser.fftSize = 512;
    context.createMediaStreamSource(stream).connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    let lastLoudAt = startedAt;

    const tick = () => {
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const centered = (data[i] - 128) / 128;
        sum += centered * centered;
      }
      // RMS with a mild curve so quiet sounds still move the meter
      const level = Math.min(1, Math.sqrt(sum / data.length) * 3);
      const now = performance.now();
      if (level > NO_SIGNAL_LEVEL) lastLoudAt = now;
      onLevel(level, now - lastLoudAt > NO_SIGNAL_SECONDS * 1000);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  } catch {
    // no meter; the timer is the functional signal
  }
  return () => {
    cancelAnimationFrame(frame);
    context?.close().catch(() => {});
    onLevel(0, false);
  };
}

/**
 * What to tell the user when the microphone could not be started.
 * @param {{name?: string}} err - the rejection from recordClip
 * @returns {string} cause and next move
 */
export function micErrorMessage(err) {
  switch (err?.name) {
    case 'NotAllowedError':
    case 'SecurityError':
      return 'Mic access is blocked. Allow it in your browser settings and try again, or upload a file.';
    case 'NotSupportedError':
      return "Recording isn't supported in this browser. Try the latest Chrome, Safari, or Firefox, or upload a file.";
    case 'NotFoundError':
      return 'No microphone found. Plug one in and try again, or upload a file.';
    default:
      return "Couldn't start the microphone. Check that nothing else is using it, then try again.";
  }
}

/**
 * Microphones the user can pick from. Browsers only reveal names after the
 * first grant, so this is empty until then.
 * @returns {Promise<{deviceId: string, label: string}[]>}
 */
export async function listMics() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices
      // Chrome's "default" / "communications" aliases duplicate real devices
      .filter((d) => d.kind === 'audioinput' && d.label && d.deviceId && !['default', 'communications'].includes(d.deviceId))
      .map(({ deviceId, label }) => ({ deviceId, label }));
  } catch {
    return [];
  }
}

/**
 * Decode a finished recording (or an uploaded file) so its waveform can be
 * drawn. Offline context: needs no user gesture and plays nothing.
 * @param {Blob} blob
 * @returns {Promise<{samples: Float32Array, duration: number}>} mono samples at 22050 Hz, and seconds
 */
export async function decodeClip(blob) {
  const Offline = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  const audio = await new Offline(1, 1, 22050).decodeAudioData(await blob.arrayBuffer());
  return { samples: audio.getChannelData(0), duration: audio.duration };
}
