// Loading, empty and error for the Compare page.

// Loading: placeholder cards hold their size, so nothing jumps when data lands.
export function CompareLoading() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" role="status">
      <span className="sr-only">Loading course data</span>
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3 rounded-card border border-line bg-surface p-5" aria-hidden="true">
          <span className="block h-3 w-16 animate-pulse rounded bg-line" />
          <span className="block h-6 w-3/5 animate-pulse rounded bg-line" />
          <span className="block h-10 w-24 animate-pulse rounded bg-line" />
          <span className="block h-28 w-full animate-pulse rounded bg-line" />
          <span className="block h-20 w-full animate-pulse rounded bg-line" />
        </div>
      ))}
    </div>
  );
}

// Empty: nothing picked yet. An invitation to act, not "no results".
export function CompareEmpty() {
  return (
    <div className="rounded-card border border-dashed border-line bg-surface px-6 py-14 text-center">
      <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
        Pick a course to start comparing
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
        Search by code or name above. Add up to three and they line up on the same scales.
      </p>
    </div>
  );
}

// Error: plain words, no status code, always a retry (02-courses).
export function CompareError({ onRetry }) {
  return (
    <div className="rounded-card border border-red-200 bg-red-50 px-6 py-14 text-center" role="alert">
      <h3 className="font-display text-2xl font-semibold tracking-tight text-red-900">
        The course data would not load
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-sm text-red-900/70">
        The server did not answer. This usually passes in a moment.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-7 inline-flex items-center rounded bg-brand-700 px-4 py-2.5 text-xs font-semibold text-paper transition hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
      >
        Try again
      </button>
    </div>
  );
}