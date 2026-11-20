import { Link } from "react-router-dom";

const meterColors = ["bg-brand-300", "bg-brand-400", "bg-brand-500", "bg-brand-600", "bg-brand-700"];
const label = "text-[11px] font-semibold uppercase tracking-[0.13em] text-muted";

// One course column on the Compare page.
// `summary` comes from the team's summarizeReviews(). `sharedMaximum` comes from
// ComparePage, the only place that can see every card: all bars are measured
// against it, so a longer bar always means more reviews.
export default function CompareCard({ course, summary, sharedMaximum }) {
  const { count, rating, difficulty, hours, again, distribution } = summary;

  return (
    <article className="rounded-card border border-line bg-surface p-5">
      <p className="font-display text-xs font-semibold tabular-nums text-brand-700">{course.code}</p>
      <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
        <Link to={`/courses/${course.code}`} className="hover:underline">{course.title}</Link>
      </h3>

      {count === 0 ? (
        <>
          <p className="mt-4 text-sm text-muted">
            Nobody has reviewed {course.code} yet. If you took it, you would be the first.
          </p>
          <Link
            to={`/reviews/new?course=${course.code}`}
            className="mt-4 inline-block font-semibold text-brand-700 underline underline-offset-4"
          >
            Write the first review
          </Link>
        </>
      ) : (
        <>
          <div className="mt-4 flex items-end gap-3">
            <span className="font-display text-4xl font-semibold leading-none tracking-tight tabular-nums text-ink">
              {rating.toFixed(1)}
            </span>
            <span className="flex gap-0.5 pb-1" role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className={`h-4 w-4 ${star <= Math.round(rating) ? "text-accent-400" : "text-line"}`}
                >
                  <path d="M10 1.8l2.5 5.1 5.6.8-4 4 .9 5.6-5-2.6-5 2.6.9-5.6-4-4 5.6-.8z" />
                </svg>
              ))}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">{count} {count === 1 ? "review" : "reviews"}</p>

          <figure className="m-0 mt-5">
            <figcaption className={`${label} mb-2.5`}>Ratings given · {count} in total</figcaption>
            <div className="flex flex-col gap-[2px]">
              {distribution.map(({ stars, count: bucketCount }) => (
                <div key={stars} className="flex items-center gap-3">
                  <span className="w-6 flex-none text-right font-display text-xs font-semibold text-muted">
                    {stars}<span className="sr-only"> stars</span>
                  </span>
                  <span className="h-5 min-w-0 flex-1 rounded-[2px] bg-brand-50" aria-hidden="true">
                    <span
                      className="block h-full rounded-[4px] bg-brand-600"
                      style={{ width: `${sharedMaximum ? (bucketCount / sharedMaximum) * 100 : 0}%` }}
                    />
                  </span>
                  <span className="w-8 flex-none font-display text-xs font-semibold text-ink">
                    {bucketCount}<span className="sr-only"> reviews</span>
                  </span>
                </div>
              ))}
            </div>
          </figure>

          <dl className="mt-5 space-y-3 border-t border-line pt-4">
            <div>
              <dt className={label}>Difficulty</dt>
              <dd className="mt-1.5 flex items-center gap-2">
                <span className="flex min-w-[5rem] flex-1 gap-[2px]" aria-hidden="true">
                  {meterColors.map((color, index) => (
                    <span
                      key={color}
                      className={`h-2 flex-1 rounded-[2px] ${index < Math.round(difficulty) ? color : "bg-line"}`}
                    />
                  ))}
                </span>
                <span className="font-display text-sm font-semibold tabular-nums text-ink">
                  {Math.round(difficulty)}<span className="text-muted">/5</span>
                </span>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className={label}>Hours a week</dt>
              <dd className="font-display font-semibold tabular-nums text-ink">{Math.round(hours)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className={label}>Would take again</dt>
              <dd className="font-display font-semibold tabular-nums text-ink">{Math.round(again)}%</dd>
            </div>
          </dl>
        </>
      )}
    </article>
  );
}