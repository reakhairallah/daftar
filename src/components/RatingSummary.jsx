import { summarizeReviews } from "../lib/reviewSummaries";

export default function RatingSummary({
  reviews = [],
  course = { code: "CSC443", title: "Web Programming" },
  termLabel = "Fall 2026",
  sharedMaximum,
}) {
  const { count, rating, distribution } = summarizeReviews(reviews);
  const localMaximum = Math.max(1, ...distribution.map((row) => row.count));
  const maximum = Math.max(localMaximum, sharedMaximum ?? 0);

  return (
    <section className="min-w-0 rounded-card border border-line bg-surface p-6">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
        {course.code} · {course.title} · {termLabel}
      </h2>
      <div className="mt-4 flex items-end gap-4">
        <span className="font-display text-6xl font-semibold leading-none tracking-tight tabular-nums">
          {rating === null ? "—" : rating.toFixed(1)}
        </span>
        <div className="pb-1">
          {rating !== null && (
            <span className="flex gap-0.5" role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className={`h-5 w-5 ${star <= Math.round(rating) ? "text-accent-400" : "text-line"}`}
                >
                  <path d="M10 1.8l2.5 5.1 5.6.8-4 4 .9 5.6-5-2.6-5 2.6.9-5.6-4-4 5.6-.8z" />
                </svg>
              ))}
            </span>
          )}
          <p className="mt-1 text-xs text-muted">{count} {count === 1 ? "review" : "reviews"}</p>
        </div>
      </div>
      <figure className="mt-6">
        <figcaption className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
          Ratings given · {count} in total
        </figcaption>
        <div className="flex flex-col gap-[2px]">
          {distribution.map(({ stars, count: bucketCount }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="w-6 flex-none text-right font-display text-xs font-semibold text-muted">
                {stars}<span className="sr-only"> stars</span>
              </span>
              <span className="h-5 min-w-0 flex-1 rounded-[2px] bg-brand-50" aria-hidden="true">
                <span
                  className="block h-full rounded-[4px] bg-brand-600"
                  style={{ width: `${(bucketCount / maximum) * 100}%` }}
                />
              </span>
              <span className="w-8 flex-none font-display text-xs font-semibold">
                {bucketCount}<span className="sr-only"> reviews</span>
              </span>
            </div>
          ))}
        </div>
      </figure>
    </section>
  );
}
