import { useEffect, useRef, useState } from 'react';
import { Mic, Square, Trash2 } from 'lucide-react';
import { recordClip, micErrorMessage } from './recorder.js';
import { GM_DRUMS } from './logic.js';
import { LevelStrip } from './LevelStrip.jsx';
import { ConfirmButton } from './ConfirmButton.jsx';

const TEACH_SECONDS = 5;
const ICON = { size: 16, 'aria-hidden': true };

/**
 * @typedef {Object} KitSound
 * @property {string} id
 * @property {number} note - GM drum note
 * @property {string} name
 * @property {number} examples - how many repeats were learned
 */

/**
 * The taught sounds, loaded once from the server.
 * @returns {[KitSound[], (sounds: KitSound[]) => void]}
 */
export function useKit() {
  const [sounds, setSounds] = useState(/** @type {KitSound[]} */ ([]));
  useEffect(() => {
    fetch('/api/kit')
      .then((res) => (res.ok ? res.json() : { sounds: [] }))
      .then((data) => setSounds(data.sounds))
      .catch(() => {}); // kit is optional; Classic works without it
  }, []);
  return [sounds, setSounds];
}

/**
 * Teach the app your own sounds: pick a drum, make your sound a few times.
 * @param {Object} props
 * @param {KitSound[]} props.sounds
 * @param {(sounds: KitSound[]) => void} props.onChange
 * @param {boolean} props.disabled - true while the main recorder is busy
 * @param {string} [props.deviceId] - microphone picked in the recorder
 * @param {(busy: boolean) => void} props.onBusy - teaching holds the microphone
 * @param {() => void} props.onBeforeRecord - silence the preview so it is not taught
 */
export function KitPanel({ sounds, onChange, disabled, deviceId, onBusy, onBeforeRecord }) {
  const [note, setNote] = useState(GM_DRUMS[0].note);
  const [status, setStatus] = useState('idle'); // idle | recording | saving
  const [secondsLeft, setSecondsLeft] = useState(TEACH_SECONDS);
  const [message, setMessage] = useState(null); // { kind: 'ok' | 'warn' | 'error', text }
  const levelRef = useRef(0);
  const clipRef = useRef(null);

  const teach = async () => {
    setMessage(null);
    setSecondsLeft(TEACH_SECONDS);
    onBeforeRecord();
    onBusy(true);
    try {
      try {
        clipRef.current = await recordClip(TEACH_SECONDS, {
          deviceId,
          onTick: (elapsed) => setSecondsLeft(Math.ceil(TEACH_SECONDS - elapsed)),
          onLevel: (level) => {
            levelRef.current = level;
          }
        });
      } catch (err) {
        setMessage({ kind: 'error', text: micErrorMessage(err) });
        return;
      }
      setStatus('recording');
      const blob = await clipRef.current.blob;
      setStatus('saving');

      const drum = GM_DRUMS.find((d) => d.note === note);
      const form = new FormData();
      form.append('audio', blob, 'teach.webm');
      form.append('note', drum.note);
      form.append('name', drum.name);
      const res = await fetch('/api/kit/teach', { method: 'POST', body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Couldn't learn that sound. Try again.");
      onChange([...sounds, data.sound]);
      setMessage(
        data.conflictsWith
          ? {
              kind: 'warn',
              text: `Learned ${drum.name} from ${data.sound.examples} repeats, but it sounds a lot like your ${data.conflictsWith}. Make them more different or delete one, or they'll get mixed up.`
            }
          : { kind: 'ok', text: `Learned ${drum.name} from ${data.sound.examples} repeats.` }
      );
    } catch (err) {
      setMessage({ kind: 'error', text: err.message });
    } finally {
      setStatus('idle');
      onBusy(false);
    }
  };

  const remove = async (id) => {
    try {
      const res = await fetch(`/api/kit/${id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error);
      onChange(data.sounds);
      setMessage(null); // "Learned X" no longer describes the list
    } catch (err) {
      setMessage({ kind: 'error', text: err.message || "Couldn't delete that sound. Try again." });
    }
  };

  const messageColor = { ok: 'text-success', warn: 'text-warning', error: 'text-destructive' };
  const listening = status === 'recording';

  return (
    <section className='card space-y-4' aria-labelledby='my-kit'>
      <div>
        <h2 id='my-kit' className='text-lg font-semibold'>
          My Kit
        </h2>
        <p className='hint'>
          Teach it your own sounds. Pick a drum, press Teach, then make your sound for it 4 to 8 times with a short gap
          between each. Anything you haven't taught is still matched automatically.
        </p>
      </div>

      <div className='flex flex-wrap items-center gap-3'>
        <label htmlFor='teach-drum' className='text-sm'>
          Drum
        </label>
        <select
          id='teach-drum'
          value={note}
          onChange={(e) => setNote(Number(e.target.value))}
          disabled={status !== 'idle'}
          className='field'
        >
          {GM_DRUMS.map((d) => (
            <option key={d.note} value={d.note}>
              {d.name}
            </option>
          ))}
        </select>
        {listening ? (
          <button type='button' onClick={() => clipRef.current?.stop()} className='btn'>
            <Square {...ICON} /> Done <span className='tabular-nums'>({secondsLeft}s)</span>
          </button>
        ) : (
          <button type='button' onClick={teach} disabled={disabled || status !== 'idle'} className='btn'>
            <Mic {...ICON} /> {status === 'saving' ? 'Learning…' : `Teach (${TEACH_SECONDS}s)`}
          </button>
        )}
      </div>

      {listening && <LevelStrip levelRef={levelRef} active />}

      <p aria-live='polite' className={`min-h-5 text-sm ${message ? messageColor[message.kind] : ''}`}>
        {listening ? 'Listening. Make your sound a few times.' : message?.text}
      </p>

      {sounds.length === 0 ? (
        <p className='hint'>No sounds yet. Teach one.</p>
      ) : (
        <ul className='divide-y'>
          {sounds.map((sound) => (
            <li key={sound.id} className='flex flex-wrap items-center justify-between gap-2 py-2'>
              <span>
                {sound.name}
                <span className='hint'> · {sound.examples} repeats</span>
              </span>
              <ConfirmButton label={`Delete ${sound.name}`} onConfirm={() => remove(sound.id)} disabled={status !== 'idle'}>
                <Trash2 {...ICON} /> Delete
              </ConfirmButton>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
