// Shown while fewer than three courses are picked. It invites the next
// course instead of letting the grid collapse (07-compare, "one slot still empty").
export default function EmptySlot({ position, onChoose }) {
  return (
    <div className="rounded-card border border-line bg-surface p-5">
      <p className="font-display text-lg font-semibold text-muted">
        Add a {position === 2 ? "second" : "third"} course
      </p>
      <p className="mt-1.5 text-sm text-muted">
        {position === 2
          ? "One course on its own is not a comparison yet."
          : "Three is the most that fits before the numbers stop being comparable at a glance."}
      </p>
      <button
        type="button"
        onClick={onChoose}
        className="mt-4 inline-flex items-center rounded border border-line bg-surface px-4 py-2.5 text-xs font-semibold text-ink transition hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
      >
        Choose one
      </button>
    </div>
  );
}