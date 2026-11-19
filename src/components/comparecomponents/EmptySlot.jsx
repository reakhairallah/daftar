import { card, btnSecondary } from '../../lib/styles';

// Shown while fewer than three courses are picked. It invites the next
// course instead of letting the grid collapse (07-compare, "one slot still empty").
export default function EmptySlot({ position, onChoose }) {
  const ordinal = position === 2 ? 'second' : 'third';

  return (
    <div className={`${card} p-5`}>
      <p className="font-display text-lg font-semibold text-muted">Add a {ordinal} course</p>
      <p className="mt-1.5 text-sm text-muted">
        {position === 2
          ? 'One course on its own is not a comparison yet.'
          : 'Three is the most that fits before the numbers stop being comparable at a glance.'}
      </p>
      <button type="button" onClick={onChoose} className={`${btnSecondary} mt-4`}>
        Choose one
      </button>
    </div>
  );
}