import { useEffect, useRef, useState } from 'react';
import { Bell, CircleDashed, CircleDot, CircleSlash, Cylinder, Disc, Disc2, Disc3, Drum, Hand, Plus, Sparkle, ZoomIn } from 'lucide-react';
import { GM_DRUMS, STEPS_PER_BAR, stepLabel } from './logic.js';
import { TrimRange } from './TrimRange.jsx';

const BEAT = 4; // steps per beat
const TAP_SLOP = 6; // px a press may wander and still be a tap (Kuzic timing-sheet.tsx TAP_SLOP)
const DIMMED = 0.3; // cells outside the trim
const CELL_MIN = 24; // px: the narrowest a step gets on a phone, where a finger has to hit it
const INSET = 8; // px: TrimRange insets its track (px-2) so a handle fits at the edge; the lanes match it
const ICON = { size: 18, 'aria-hidden': true, className: 'shrink-0 text-muted-foreground' };
const HEADERS = 'w-32 shrink-0 space-y-1 sm:w-40';
const ROW = 'flex h-11 items-center gap-1.5';

/** One picture per drum, so a row is found without reading. Unknown notes get the plain drum. */
const DRUM_ICONS = {
  36: CircleDot,
  38: Drum,
  42: Disc,
  46: Disc2,
  39: Hand,
  37: CircleSlash,
  45: Cylinder,
  47: Cylinder,
  50: Cylinder,
  49: Sparkle,
  51: Disc3,
  56: Bell,
  54: CircleDashed
};

/**
 * The ruler: one tick per beat, bar numbers bold. Decorative; cells and trim
 * handles say where they are themselves.
 * @param {Object} props
 * @param {number} props.bars
 */
function Ruler({ bars }) {
  return (
    <div className='flex h-full' aria-hidden='true'>
      {Array.from({ length: bars * BEAT }, (_, beat) => (
        <span
          key={beat}
          className={`flex-1 border-l pl-2.5 pt-1 text-xs tabular-nums ${
            beat % BEAT === 0 ? 'border-foreground/40 font-semibold text-foreground' : 'border-input text-muted-foreground'
          }`}
        >
          {beat % BEAT === 0 ? beat / BEAT + 1 : `${Math.floor(beat / BEAT) + 1}.${(beat % BEAT) + 1}`}
        </span>
      ))}
    </div>
  );
}

/**
 * One drum's row on the timeline. Spans while there is nothing to edit yet,
 * buttons once there is. Every step is the same width, so a step's place is
 * simply step / steps of the row: the ruler, trim handles and playhead rely on it.
 * @param {Object} props
 * @param {string} props.label - drum name for screen readers
 * @param {number[]} props.cells - one value per step: 0 = empty, otherwise velocity 0-1
 * @param {(step: number, velocity: number) => Object} [props.cellProps] - makes each cell a button with these props
 */
function Lane({ label, cells, cellProps }) {
  const hits = cells.filter(Boolean).length;
  const Cell = cellProps ? 'button' : 'span';
  return (
    <div
      role={cellProps ? 'group' : 'img'}
      aria-label={`${label}, ${hits} ${hits === 1 ? 'hit' : 'hits'}`}
      className='grid'
      style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}
    >
      {cells.map((velocity, step) => {
        const { dim = false, over = false, ...rest } = cellProps?.(step, velocity) ?? {};
        // louder hits are brighter; the first step of each beat is a shade lighter when empty
        const opacity = (velocity ? 0.5 + 0.5 * velocity : 1) * (dim ? DIMMED : 1);
        const onBeat = step % BEAT === 0;
        return (
          // the gaps are padding inside equal columns: a bar line, a wider gap before a beat
          <Cell
            key={step}
            data-hit={velocity ? '' : undefined}
            className={`group block h-11 pr-px ${
              step > 0 && step % STEPS_PER_BAR === 0 ? 'border-l border-foreground/40 pl-1' : step > 0 && onBeat ? 'pl-1' : 'pl-px'
            } ${cellProps ? 'disabled:cursor-default' : ''} ${
              // a hit can be dragged sideways; up and down still scrolls the page
              cellProps && velocity ? 'cursor-grab touch-pan-y' : ''
            }`}
            {...rest}
          >
            <span
              style={opacity === 1 ? undefined : { opacity }}
              className={`pointer-events-none block h-full rounded-sm ${
                velocity
                  ? 'bg-foreground'
                  : onBeat
                  ? `bg-accent ${cellProps ? 'group-enabled:group-hover:bg-input' : ''}`
                  : `bg-secondary ${cellProps ? 'group-enabled:group-hover:bg-accent' : ''}`
              } ${cellProps ? 'transition-colors' : ''} ${over ? 'ring-2 ring-foreground' : ''}`}
            />
          </Cell>
        );
      })}
    </div>
  );
}

/**
 * Moves the playhead line while the preview plays, outside React: a frame is
 * one style write, not a render. The timeline scrolls along with it.
 * ponytail: following stops while the pointer or focus is in the grid, so it
 * never pulls a cell from under the hand. Add a "follow" toggle if that hides too much.
 * @param {boolean} playing
 * @param {() => number|null} getStep - where the preview is, in steps (fractional)
 * @param {number} steps - length of the timeline
 * @param {{grid: Object, scroll: Object, line: Object}} refs
 */
function usePlayhead(playing, getStep, steps, { grid, scroll, line }) {
  const getStepRef = useRef(getStep);
  getStepRef.current = getStep;

  useEffect(() => {
    const lineEl = line.current;
    if (!playing || !lineEl) return undefined;
    let frame = 0;
    const draw = () => {
      const step = getStepRef.current();
      const shown = step !== null && step >= 0 && step < steps; // typed preview code can loop past the grid
      lineEl.hidden = !shown;
      if (shown) {
        lineEl.style.left = `${(step / steps) * 100}%`;
        const view = scroll.current;
        const x = INSET + (step / steps) * (view.scrollWidth - 2 * INSET);
        const offScreen = x < view.scrollLeft || x > view.scrollLeft + view.clientWidth - CELL_MIN;
        if (offScreen && !grid.current.matches(':hover, :focus-within')) view.scrollLeft = x - CELL_MIN; // turn the page, like a DAW
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      lineEl.hidden = true;
    };
  }, [playing, steps, grid, scroll, line]);
}

/**
 * The beat laid out like a DAW track area: drum rows down the left (icon and
 * drum picker), one timeline to the right with a ruler in bars and beats, trim
 * handles on the ruler and a playhead while the preview plays. Tap a cell to add
 * or remove a hit, drag a hit (or Alt+Arrow) to move it, arrows to walk the cells.
 * Pass an empty grid for the "still listening" placeholder.
 * @param {Object} props
 * @param {{bars: number, lanes: import('./logic.js').GridLane[]}} props.grid - from buildGrid()
 * @param {boolean} [props.busy] - a new result is on its way; the grid dims in place
 * @param {boolean} [props.disabled] - no editing right now
 * @param {import('./logic.js').Trim|null} [props.trim] - steps outside it dim and cannot be edited
 * @param {boolean} [props.playing] - the preview is playing
 * @param {() => number|null} [props.getStep] - where the preview is, in steps
 * @param {(note: number, step: number) => void} props.onToggle
 * @param {(from: {note: number, step: number}, to: {note: number, step: number}) => void} props.onMove
 * @param {(start: number, end: number, edge: 'start'|'end') => void} props.onTrim - a trim handle moved, in steps
 * @param {(from: number, to: number) => void} props.onChangeDrum - a row now plays another GM note
 * @param {(note: number) => void} props.onAddDrum - a new, empty row
 */
export function StepGrid({ grid, busy = false, disabled = false, trim = null, playing = false, getStep = () => null, onToggle, onMove, onTrim, onChangeDrum, onAddDrum }) {
  const { bars, lanes } = grid;
  const steps = bars * STEPS_PER_BAR;
  const gridRef = useRef(null);
  const scrollRef = useRef(null);
  const lineRef = useRef(null);
  const dragRef = useRef(null); // the hit being dragged: { note, step, x, y, moved, over }
  const skipClickRef = useRef(false); // the click that ends a drag must not toggle
  const [focus, setFocus] = useState(null); // the cell arrow keys start from: { note, step }
  const [over, setOver] = useState(null); // "note:step" a dragged hit would land on
  const [zoom, setZoom] = useState(1); // 1 = the whole beat in view; more = wider steps, drag to scroll

  usePlayhead(playing, getStep, steps, { grid: gridRef, scroll: scrollRef, line: lineRef });

  if (bars === 0) {
    // Same geometry as a real one-bar beat, so nothing jumps when hits arrive
    const empty = new Array(STEPS_PER_BAR).fill(0);
    return (
      <div aria-busy='true' aria-label='Finding your hits' className='flex gap-2 opacity-60'>
        <div className={HEADERS} aria-hidden='true'>
          <div className='h-11' />
          {GM_DRUMS.slice(0, 3).map((drum) => {
            const Icon = DRUM_ICONS[drum.note];
            return (
              <p key={drum.note} className={`${ROW} text-sm text-muted-foreground`}>
                <Icon {...ICON} />
                {drum.name}
              </p>
            );
          })}
        </div>
        <div className='min-w-0 flex-1 space-y-1 px-2'>
          <div className='h-11 overflow-hidden rounded-md bg-secondary'>
            <Ruler bars={1} />
          </div>
          {GM_DRUMS.slice(0, 3).map((drum) => (
            <Lane key={drum.note} label={drum.name} cells={empty} />
          ))}
        </div>
      </div>
    );
  }

  const kept = (step) => !trim || (step >= trim.start && step < trim.end);
  // One tab stop for all cells: the last one used, or the first one that can be edited
  const tabStop = focus && kept(focus.step) && lanes.some((l) => l.note === focus.note) ? focus : { note: lanes[0]?.note, step: trim?.start ?? 0 };

  /** @returns {{el: HTMLButtonElement, note: number, step: number}|null} the cell under an element */
  const cellOf = (target) => {
    const el = target?.closest?.('[data-step]');
    return el && gridRef.current?.contains(el) ? { el, note: Number(el.dataset.note), step: Number(el.dataset.step) } : null;
  };
  const cellAt = (note, step) => gridRef.current?.querySelector(`[data-note="${note}"][data-step="${step}"]`);
  const free = (el) => el && !el.disabled && !el.hasAttribute('data-hit');

  const move = (from, to) => {
    onMove({ note: from.note, step: from.step }, { note: to.note, step: to.step });
    to.el.focus(); // focus follows the hit, so the next key acts on it
  };

  const onClick = (e) => {
    if (skipClickRef.current) {
      skipClickRef.current = false;
      return;
    }
    const cell = cellOf(e.target);
    if (cell && !cell.el.disabled) onToggle(cell.note, cell.step);
  };

  const onKeyDown = (e) => {
    const cell = cellOf(e.target);
    const delta = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] }[e.key];
    if (!cell || !delta) return;
    e.preventDefault(); // arrows would scroll, and Alt+Left is the browser's Back: the take's audio only lives in this page
    const lane = lanes[lanes.findIndex((l) => l.note === cell.note) + delta[0]];
    const el = lane && cellAt(lane.note, cell.step + delta[1]);
    if (!el || el.disabled) return;
    const to = { el, note: lane.note, step: cell.step + delta[1] };
    if (!e.altKey) el.focus();
    else if (cell.el.hasAttribute('data-hit') && free(el)) move(cell, to);
  };

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    const cell = cellOf(e.target);
    if (cell && !cell.el.disabled && cell.el.hasAttribute('data-hit')) {
      dragRef.current = { ...cell, x: e.clientX, y: e.clientY, moved: false, over: null };
      cell.el.setPointerCapture(e.pointerId);
    } else if (e.pointerType === 'mouse' && scrollRef.current?.contains(e.target) && !e.target.closest('[role="slider"]')) {
      // anywhere else on the timeline a mouse drag scrolls it; a finger already does
      dragRef.current = { pan: true, x: e.clientX, left: scrollRef.current.scrollLeft, moved: false };
    }
  };

  const onPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag) return;
    if (drag.pan) {
      if (!drag.moved && Math.abs(e.clientX - drag.x) < TAP_SLOP) return;
      if (!drag.moved) scrollRef.current.setPointerCapture(e.pointerId); // only now: a plain click must still reach its cell
      drag.moved = true;
      scrollRef.current.scrollLeft = drag.left - (e.clientX - drag.x);
      return;
    }
    const target = cellOf(document.elementFromPoint(e.clientX, e.clientY));
    // A press that wanders but stays on its own cell is still a tap (it removes the hit):
    // a hand on a trackpad drifts further than the slop. It is a drag once it leaves the cell.
    if (!drag.moved && (target?.el === drag.el || Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < TAP_SLOP)) return;
    drag.moved = true;
    drag.over = target && free(target.el) ? target : null;
    setOver(drag.over ? `${drag.over.note}:${drag.over.step}` : null);
  };

  const endDrag = (e) => {
    const drag = dragRef.current;
    dragRef.current = null;
    setOver(null);
    if (!drag?.moved || e.type === 'pointercancel') return; // a tap: the click that follows toggles the cell
    skipClickRef.current = true;
    setTimeout(() => (skipClickRef.current = false), 0); // in case no click follows
    if (drag.over) move(drag, drag.over);
  };

  return (
    <div
      ref={gridRef}
      aria-busy={busy}
      data-testid='step-grid'
      className={`flex gap-2 transition-opacity ${busy ? 'opacity-40' : ''}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onFocus={(e) => {
        const cell = cellOf(e.target);
        if (cell) setFocus({ note: cell.note, step: cell.step });
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {/* track headers: they stay put while the timeline scrolls */}
      <div className={HEADERS}>
        <label className={ROW}>
          <ZoomIn {...ICON} />
          <input
            type='range'
            aria-label='Zoom the timeline'
            min='1'
            max='4'
            step='0.5'
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className='min-w-0 flex-1 accent-foreground'
          />
        </label>
        {lanes.map((lane) => {
          const Icon = DRUM_ICONS[lane.note] ?? Drum;
          return (
            <div key={lane.note} className={ROW}>
              <Icon {...ICON} />
              {/* same drum list as My Kit; a drum that already has a row cannot be picked twice */}
              <select
                aria-label={`Drum for the ${lane.label} row`}
                value={lane.note}
                disabled={disabled}
                onChange={(e) => onChangeDrum(lane.note, Number(e.target.value))}
                className='field min-w-0 flex-1'
              >
                {!GM_DRUMS.some((d) => d.note === lane.note) && <option value={lane.note}>{lane.label}</option>}
                {GM_DRUMS.map((d) => (
                  <option key={d.note} value={d.note} disabled={d.note !== lane.note && lanes.some((l) => l.note === d.note)}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
        <div className={ROW}>
          <Plus {...ICON} />
          <select aria-label='Add a drum row' value='' disabled={disabled} onChange={(e) => onAddDrum(Number(e.target.value))} className='field min-w-0 flex-1'>
            <option value=''>Add drum</option>
            {GM_DRUMS.filter((d) => !lanes.some((l) => l.note === d.note)).map((d) => (
              <option key={d.note} value={d.note}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* overflow-x-clip: the end trim handle's 44px touch area would otherwise stick out and make 14px to scroll */}
      {/* the timeline: the whole beat in view; zoomed in (or on a phone) it scrolls sideways, by drag, with no scroll bar */}
      <div ref={scrollRef} data-testid='timeline' className='min-w-0 flex-1 select-none overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        <div className='relative min-w-[var(--tap)] space-y-1 overflow-x-clip sm:min-w-0' style={{ width: `${zoom * 100}%`, '--tap': `${steps * CELL_MIN + 2 * INSET}px` }}>
          {/* trim on the ruler: the hits between the handles are the file; nothing is listened to again */}
          <TrimRange
            label='Trim your beat'
            max={steps}
            start={trim?.start ?? 0}
            end={trim?.end ?? steps}
            step={1}
            pageStep={STEPS_PER_BAR}
            minGap={1}
            // the end handle sits after the last step it keeps
            valueText={(value, edge) => stepLabel(edge === 'end' ? value - 1 : value)}
            disabled={disabled}
            onChange={onTrim}
          >
            <Ruler bars={bars} />
          </TrimRange>
          {lanes.map((lane) => (
            <div key={lane.note} className='px-2'>
              <Lane
                label={lane.label}
                cells={lane.cells}
                cellProps={(step, velocity) => ({
                  type: 'button',
                  'data-note': lane.note,
                  'data-step': step,
                  'aria-pressed': Boolean(velocity),
                  'aria-label': `${lane.label}, bar ${Math.floor(step / STEPS_PER_BAR) + 1}, step ${(step % STEPS_PER_BAR) + 1}`,
                  tabIndex: tabStop.note === lane.note && tabStop.step === step ? 0 : -1,
                  disabled: disabled || !kept(step),
                  dim: !kept(step),
                  over: over === `${lane.note}:${step}`
                })}
              />
            </div>
          ))}
          {/* the playhead: over the ruler and every row, same inset as the cells */}
          <div className='pointer-events-none absolute inset-y-0 left-2 right-2 !mt-0' aria-hidden='true'>
            <div ref={lineRef} hidden data-testid='playhead' className='absolute inset-y-0 w-0.5 -translate-x-1/2 rounded-full bg-foreground ring-1 ring-background' />
          </div>
        </div>
      </div>
    </div>
  );
}
