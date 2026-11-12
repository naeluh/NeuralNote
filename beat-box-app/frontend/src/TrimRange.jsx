import { useRef, useState } from 'react';

// Adapted from Kuzic artifacts/kuzic/src/components/timing-sheet.tsx (pill handles
// with a grip in a 44px hit box, pointer capture, lift while dragged, only the
// outside dimmed) and waveform-player.tsx (role="slider" handles and their keys:
// Arrow = step, Shift+Arrow = fine step, PageUp/PageDown = coarse step).
// Different on purpose: the handles are foreground, not a colour (orange is the
// one accent here), and each one is a real focusable element.

/** Float steps (0.1 s) drift; snap to the unit, then drop the noise. */
const snap = (value, unit) => Number((Math.round(value / unit) * unit).toFixed(4));

/**
 * A strip with a start and an end handle: what is between them is kept.
 * Whatever is passed as children is drawn behind the handles (a waveform, a
 * map of hits). Units are the caller's: steps, seconds.
 * @param {Object} props
 * @param {string} props.label - names the pair for screen readers, e.g. "Trim audio"
 * @param {number} props.max - right end of the strip
 * @param {number} props.start
 * @param {number} props.end
 * @param {number} props.step - an Arrow key press, and what a drag snaps to
 * @param {number} [props.fineStep] - Shift+Arrow
 * @param {number} props.pageStep - PageUp / PageDown
 * @param {number} props.minGap - least distance between the handles
 * @param {(start: number, end: number, edge: 'start'|'end') => void} props.onChange - while moving
 * @param {(start: number, end: number, edge: 'start'|'end') => void} [props.onCommit] - once, on
 *   release or key up, if anything moved
 * @param {(value: number, edge: 'start'|'end') => string} props.valueText - a handle's position in words
 * @param {boolean} [props.disabled]
 * @param {import('react').ReactNode} [props.children]
 */
export function TrimRange({ label, max, start, end, step, fineStep = step, pageStep, minGap, onChange, onCommit, valueText, disabled = false, children }) {
  const trackRef = useRef(null);
  const movedRef = useRef(null); // latest [start, end, edge] of the gesture in progress, if it moved anything
  const [dragging, setDragging] = useState(null);

  const move = (edge, value) => {
    const next = edge === 'start' ? Math.min(Math.max(0, value), end - minGap) : Math.max(Math.min(max, value), start + minGap);
    if (next === (edge === 'start' ? start : end)) return;
    movedRef.current = edge === 'start' ? [next, end, edge] : [start, next, edge];
    onChange(...movedRef.current);
  };

  const commit = () => {
    if (movedRef.current) onCommit?.(...movedRef.current);
    movedRef.current = null;
  };

  const handle = (edge) => {
    const value = edge === 'start' ? start : end;
    const onKeyDown = (e) => {
      const unit = e.shiftKey ? fineStep : step;
      const to = {
        ArrowLeft: value - unit,
        ArrowDown: value - unit,
        ArrowRight: value + unit,
        ArrowUp: value + unit,
        PageDown: value - pageStep,
        PageUp: value + pageStep,
        Home: 0,
        End: max
      }[e.key];
      if (to === undefined || e.altKey || e.metaKey || e.ctrlKey) return;
      e.preventDefault(); // these keys scroll the page
      e.stopPropagation();
      move(edge, e.key === 'Home' || e.key === 'End' ? to : snap(to, unit));
    };
    return (
      <div
        key={edge}
        role='slider'
        tabIndex={disabled ? -1 : 0}
        aria-label={edge === 'start' ? 'Trim start' : 'Trim end'}
        aria-orientation='horizontal'
        aria-valuemin={edge === 'start' ? 0 : start + minGap}
        aria-valuemax={edge === 'start' ? end - minGap : max}
        aria-valuenow={value}
        aria-valuetext={valueText(value, edge)}
        aria-disabled={disabled}
        // a 44px target around a 14px pill; the track is inset so the outer half stays inside the card
        className={`absolute inset-y-0 flex w-11 -translate-x-1/2 items-center justify-center rounded-md ${disabled ? '' : 'cursor-ew-resize'}`}
        style={{ left: `${(value / max) * 100}%` }}
        onKeyDown={disabled ? undefined : onKeyDown}
        onKeyUp={commit}
        onPointerDown={(e) => {
          if (disabled || e.button !== 0) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          setDragging(edge);
        }}
        onPointerMove={(e) => {
          if (dragging !== edge) return;
          const track = trackRef.current.getBoundingClientRect();
          move(edge, snap(((e.clientX - track.left) / track.width) * max, step));
        }}
        onPointerUp={() => {
          setDragging(null);
          commit();
        }}
        onPointerCancel={() => {
          setDragging(null);
          commit();
        }}
      >
        <span
          className={`flex h-full w-3.5 items-center justify-center rounded-full bg-foreground transition-transform ${
            dragging === edge ? 'scale-110 ring-2 ring-foreground/40' : ''
          }`}
        >
          <span className='h-4 w-[3px] rounded-full bg-background/50' />
        </span>
      </div>
    );
  };

  return (
    <div role='group' aria-label={label} className={`px-2 ${disabled ? 'opacity-40' : ''}`}>
      <div ref={trackRef} className='relative h-11 touch-none select-none'>
        <div className='absolute inset-0 overflow-hidden rounded-md bg-secondary'>{children}</div>
        {/* only what is cut gets darker; the kept part is never tinted */}
        <div className='absolute inset-y-0 left-0 rounded-l-md bg-background/70' style={{ width: `${(start / max) * 100}%` }} />
        <div className='absolute inset-y-0 right-0 rounded-r-md bg-background/70' style={{ width: `${(1 - end / max) * 100}%` }} />
        {handle('start')}
        {handle('end')}
      </div>
    </div>
  );
}
