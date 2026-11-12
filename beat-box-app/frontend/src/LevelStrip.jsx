import { useEffect, useRef } from 'react';

// Ported from Kuzic artifacts/kuzic/src/components/recorder-dialog.tsx (LevelStrip).
// Geometry in CSS px: 3px bars on a 6px rhythm, one bucket of mic input per 100 ms.
const STRIP_W = 288;
const STRIP_H = 56;
const BAR_W = 3;
const SPAN = 6;
const SAMPLE_MS = 100;
// The still waveform of a finished recording: finer bars, as on Kuzic's waveforms
const WAVE_BAR = 2;
const WAVE_SPAN = 4;

/**
 * One level bar, vertically centred. Square-root curve: sounds read tall, silence flat.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} level - 0-1
 * @param {number} height - of the strip, CSS px
 * @param {number} [width] - of the bar
 */
function drawBar(ctx, x, level, height, width = BAR_W) {
  const h = Math.max(2, Math.min(1, Math.sqrt(level) * 1.3) * (height - 4));
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, (height - h) / 2, width, h, width / 2);
  else ctx.rect(x, (height - h) / 2, width, h);
  ctx.fill();
}

/**
 * A finished recording as bars, filling its parent. Decorative: the trim
 * handles drawn over it carry the meaning.
 * ponytail: drawn once per recording at the width it mounts with; a resized
 * window stretches it. Redraw from a ResizeObserver if that ever looks wrong.
 * @param {Object} props
 * @param {number[]} props.peaks - loudness 0-1 over time (logic.js peaksFrom)
 */
export function WaveBars({ peaks }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || peaks.length === 0) return;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = getComputedStyle(canvas).color; // stays on the theme tokens
    const bars = Math.floor(width / WAVE_SPAN);
    for (let i = 0; i < bars; i++) {
      const from = Math.floor((i * peaks.length) / bars);
      const to = Math.max(from + 1, Math.floor(((i + 1) * peaks.length) / bars));
      drawBar(ctx, i * WAVE_SPAN + 1, Math.max(...peaks.slice(from, to)), height, WAVE_BAR);
    }
  }, [peaks]);

  return <canvas ref={canvasRef} aria-hidden='true' className='block h-full w-full text-muted-foreground' />;
}

/**
 * Input level history, voice-memo style. Dead still (a dotted baseline) until
 * recording starts; then each 100 ms bucket holds the PEAK level, so short
 * beatbox hits are not missed between frames, and the strip scrolls left.
 * Decorative: the timer and status line carry the meaning.
 * @param {Object} props
 * @param {{current: number}} props.levelRef - live level 0-1, written by the recorder
 *   (a ref, so 60 readings a second do not re-render anything)
 * @param {boolean} props.active - recording right now
 */
export function LevelStrip({ levelRef, active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return undefined;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = STRIP_W * dpr;
    canvas.height = STRIP_H * dpr;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = getComputedStyle(canvas).color; // stays on the theme tokens

    if (!active) {
      ctx.clearRect(0, 0, STRIP_W, STRIP_H);
      ctx.globalAlpha = 0.3;
      for (let x = 0; x + BAR_W <= STRIP_W; x += SPAN) drawBar(ctx, x, 0, STRIP_H);
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const capacity = Math.ceil(STRIP_W / SPAN) + 2;
    const samples = [];
    let peak = 0;
    let lastSample = performance.now();
    let frame = 0;

    const draw = (now) => {
      peak = Math.max(peak, levelRef.current);
      while (now - lastSample >= SAMPLE_MS) {
        samples.push(peak);
        peak = levelRef.current;
        lastSample += SAMPLE_MS;
        if (samples.length > capacity) samples.shift();
      }
      // newest bucket enters at the right; everything slides left between buckets
      const slide = reduceMotion ? 0 : Math.min(1, (now - lastSample) / SAMPLE_MS);
      ctx.clearRect(0, 0, STRIP_W, STRIP_H);
      ctx.globalAlpha = 1;
      samples.forEach((level, i) => {
        const x = STRIP_W - BAR_W - (samples.length - 1 - i + slide) * SPAN;
        if (x + BAR_W >= 0) drawBar(ctx, x, level, STRIP_H);
      });
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [active, levelRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden='true'
      data-testid='level-strip'
      className={`max-w-full ${active ? 'text-foreground' : 'text-muted-foreground'}`}
      style={{ width: STRIP_W, height: STRIP_H }}
    />
  );
}
