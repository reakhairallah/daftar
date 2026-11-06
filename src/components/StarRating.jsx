const oneToFive = [1, 2, 3, 4, 5];

function StarIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden="true">
      <path d="M10 1.8l2.5 5.1 5.6.8-4 4 .9 5.6-5-2.6-5 2.6.9-5.6-4-4 5.6-.8z" />
    </svg>
  );
}

export default function StarRating({ value, onChange }) {
  if (onChange) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {oneToFive.map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n} of 5 stars`}
              aria-pressed={n === value}
              onClick={() => onChange(n)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded border ${
                n <= value ? "border-accent-400 bg-accent-50" : "border-line bg-surface"
              }`}
            >
              <StarIcon className={`h-5 w-5 ${n <= value ? "text-accent-400" : "text-line"}`} />
            </button>
          ))}
        </div>
        <span className="font-display text-lg font-semibold tabular-nums text-ink">{value || "–"}</span>
      </div>
    );
  }

  return (
    <span className="flex items-center gap-2">
      <span className="flex items-center gap-0.5" role="img" aria-label={`${value.toFixed(1)} out of 5`}>
        {oneToFive.map((n) => (
          <StarIcon key={n} className={`h-4 w-4 ${n <= Math.round(value) ? "text-accent-400" : "text-line"}`} />
        ))}
      </span>
      <span className="font-display text-base font-semibold tabular-nums text-ink">{value.toFixed(1)}</span>
    </span>
  );
}
