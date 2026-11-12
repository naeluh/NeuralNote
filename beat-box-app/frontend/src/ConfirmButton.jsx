import { useEffect, useRef, useState } from 'react';

const ARMED_MS = 3000;

/**
 * A delete button that needs two clicks: the first arms it ("Delete?") for a
 * few seconds, the second commits. For things that cannot be undone.
 * @param {Object} props
 * @param {() => void} props.onConfirm
 * @param {string} props.label - accessible name, e.g. "Delete Kick"
 * @param {import('react').ReactNode} props.children - idle content
 * @param {boolean} [props.disabled]
 * @param {string} [props.armedText] - what it asks once armed
 */
export function ConfirmButton({ onConfirm, label, children, disabled, armedText = 'Delete?' }) {
  const [armed, setArmed] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const click = () => {
    clearTimeout(timer.current);
    if (armed) {
      setArmed(false);
      onConfirm();
    } else {
      setArmed(true);
      timer.current = setTimeout(() => setArmed(false), ARMED_MS);
    }
  };

  return (
    <button
      type='button'
      onClick={click}
      disabled={disabled}
      aria-label={armed ? `${label}: press again to confirm` : label}
      className={`btn ${armed ? 'btn-danger' : 'btn-ghost'}`}
    >
      {armed ? armedText : children}
    </button>
  );
}
