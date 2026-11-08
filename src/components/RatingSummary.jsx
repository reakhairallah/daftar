export default function RatingSummary({ reviews = [] }) {
  const count = reviews.length;
  const total = reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const average = count > 0 ? total / count : null;

  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((review) => review.rating === stars).length,
  }));

  const maximum = Math.max(
    1,
    ...distribution.map((row) => row.count)
  );

  return (
    <section className="rounded-card border border-line bg-surface p-6">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
        CSC443 · Web Programming · Fall 2026
      </h2>

      <div className="mt-4 flex items-end gap-4">
        <span className="font-display text-6xl font-semibold leading-none tracking-tight tabular-nums">
          {average === null ? "—" : average.toFixed(1)}
        </span>

        <div className="pb-1">
          {average !== null && (
            <span
              className="flex gap-0.5"
              role="img"
              aria-label={`${average.toFixed(1)} out of 5 stars`}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className={`h-5 w-5 ${
                    star <= Math.round(average)
                      ? "text-accent-400"
                      : "text-line"
                  }`}
                >
                  <path d="M10 1.8l2.5 5.1 5.6.8-4 4 .9 5.6-5-2.6-5 2.6.9-5.6-4-4 5.6-.8z" />
                </svg>
              ))}
            </span>
          )}

          <p className="mt-1 text-xs text-muted">
            {count} {count === 1 ? "review" : "reviews"}
          </p>
        </div>
      </div>

      <figure className="mt-6">
        <figcaption className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
          Ratings given · {count} in total
        </figcaption>

        <div className="flex flex-col gap-[2px]">
          {distribution.map(({ stars, count }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="w-6 flex-none text-right font-display text-xs font-semibold text-muted">
                {stars}
                <span className="sr-only"> stars</span>
              </span>

              <span className="h-5 min-w-0 flex-1 rounded-[2px] bg-brand-50">
                <span
                  className="block h-full rounded-[4px] bg-brand-600"
                  style={{ width: `${(count / maximum) * 100}%` }}
                />
              </span>

              <span className="w-8 flex-none font-display text-xs font-semibold">
                {count}
                <span className="sr-only"> reviews</span>
              </span>
            </div>
          ))}
        </div>
      </figure>
    </section>
  );
}