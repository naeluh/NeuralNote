import { useState } from 'react';
import { Download, Trash2 } from 'lucide-react';
import { ConfirmButton } from './ConfirmButton.jsx';

const ICON = { size: 16, 'aria-hidden': true };

/** @param {number} ms - epoch milliseconds @returns {string} e.g. "Nov 10, 3:42 PM" */
const when = (ms) =>
  new Date(ms).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

/**
 * @typedef {Object} PastTake
 * @property {string} id
 * @property {number} created_at - epoch milliseconds
 * @property {number} drum_count
 */

/**
 * Earlier conversions, newest first. Download or delete only: the audio is
 * not kept, so an old take cannot be converted again.
 * @param {Object} props
 * @param {PastTake[]} props.takes
 * @param {(id: string) => Promise<void>} props.onDelete - rejects with a message to show
 */
export function PastTakes({ takes, onDelete }) {
  const [error, setError] = useState(null);
  if (takes.length === 0) return null;

  const remove = (id) => {
    setError(null);
    onDelete(id).catch((err) => setError(err.message));
  };

  return (
    <section className='card space-y-3' aria-labelledby='past-takes'>
      <h2 id='past-takes' className='text-lg font-semibold'>
        Past recordings
      </h2>
      <ul className='divide-y'>
        {takes.map((take) => (
          <li key={take.id} className='flex flex-wrap items-center justify-between gap-2 py-2'>
            <span className='tabular-nums'>
              {take.drum_count} hits
              <span className='hint'> · {when(take.created_at)}</span>
            </span>
            <span className='flex gap-1'>
              <a
                href={`/api/midi/${take.id}`}
                download='beatbox-drums.mid'
                aria-label={`Download the .mid from ${when(take.created_at)}`}
                className='btn btn-ghost'
              >
                <Download {...ICON} /> .mid
              </a>
              <ConfirmButton label={`Delete the recording from ${when(take.created_at)}`} onConfirm={() => remove(take.id)}>
                <Trash2 {...ICON} /> Delete
              </ConfirmButton>
            </span>
          </li>
        ))}
      </ul>
      {/* always mounted so a screen reader hears the message when it appears */}
      <p aria-live='polite' className='text-sm text-destructive'>
        {error}
      </p>
    </section>
  );
}
