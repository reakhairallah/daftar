import { Link } from "react-router-dom";

const buttonClass =
  "mt-6 inline-flex rounded bg-brand-700 px-4 py-2.5 text-sm font-semibold text-paper hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700";

export default function DataState({
  state,
  isEmpty,
  onRetry,
  emptyTitle = "No reviews yet",
  children,
}) {
  if (state === "loading") {
    return (
      <section
        role="status"
        className="rounded-card border border-line bg-surface p-6"
      >
        <p className="text-sm text-muted">Loading reviews…</p>
        <div
          aria-hidden="true"
          className="mt-5 space-y-3 animate-pulse motion-reduce:animate-none"
        >
          <div className="h-8 w-1/3 rounded bg-line" />
          <div className="h-5 rounded bg-line" />
          <div className="h-5 w-3/4 rounded bg-line" />
        </div>
      </section>
    );
  }

  if (state === "error") {
    return (
      <section
        role="alert"
        className="rounded-card border border-red-200 bg-red-50 p-6"
      >
        <h2 className="font-display text-2xl font-semibold text-red-900">
          The reviews could not be loaded
        </h2>
        <p className="mt-3 text-sm text-red-900">
          Please try again in a moment.
        </p>
        <button
          type="button"
          className={buttonClass}
          onClick={onRetry}
        >
          Try again
        </button>
      </section>
    );
  }

  if (state === "empty" || isEmpty) {
    return (
      <section className="rounded-card border border-dashed border-line bg-surface p-6">
        <h2 className="font-display text-2xl font-semibold">
          {emptyTitle}
        </h2>
        <p className="mt-3 text-sm text-muted">
          If you took a course, share what it was like.
        </p>
        <Link to="/reviews/new" className={buttonClass}>
          Write a review
        </Link>
      </section>
    );
  }

  return children;
}