import { Link } from "react-router-dom";
const meterColors = [
  "bg-brand-300",
  "bg-brand-400",
  "bg-brand-500",
  "bg-brand-600",
  "bg-brand-700",
];

export default function CourseCard({ course, reviews }) {
  const matching = reviews.filter(
    (review) => review.courseCode === course.code
  );
  const count = matching.length;

  const mean = (field) =>
    count === 0
      ? null
      : matching.reduce(
          (sum, review) => sum + Number(review[field]),
          0
        ) / count;

  const rating = mean("rating");
  const difficulty = mean("difficulty");
  const hours = mean("hoursPerWeek");
  const again = mean("wouldTakeAgain");

  return (
    <li className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-card border border-line bg-surface px-5 py-4">
      <div className="min-w-0 flex-1 basis-64">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-display text-sm font-semibold text-brand-700">
            {course.code}
          </span>
          <h3 className="font-display text-lg font-semibold tracking-tight">
  <Link
    to={`/courses/${course.code}`}
    className="hover:underline"
  >
    {course.title}
  </Link>
</h3>
        </div>
        <p className="mt-0.5 text-xs text-muted">
          {course.department}
        </p>
      </div>

      {count === 0 ? (
        <p className="text-sm text-muted">No reviews yet</p>
      ) : (
        <div className="grid w-full grid-cols-2 items-center gap-x-6 gap-y-3 sm:w-auto sm:grid-cols-[auto_auto_auto_auto]">
          <div className="flex items-center gap-2">
            <span
              className="flex gap-0.5"
              role="img"
              aria-label={`${rating.toFixed(1)} out of 5 stars`}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className={`h-4 w-4 ${
                    star <= Math.round(rating)
                      ? "text-accent-400"
                      : "text-line"
                  }`}
                >
                  <path d="M10 1.8l2.5 5.1 5.6.8-4 4 .9 5.6-5-2.6-5 2.6.9-5.6-4-4 5.6-.8z" />
                </svg>
              ))}
            </span>
            <span className="font-display font-semibold">
              {rating.toFixed(1)}
            </span>
            <span className="text-xs text-muted">({count})</span>
          </div>

          <div className="min-w-28">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
              Difficulty
            </span>
            <div className="flex items-center gap-2">
              <span className="flex flex-1 gap-[2px]" aria-hidden="true">
                {meterColors.map((color, index) => (
                  <span
                    key={color}
                    className={`h-2 flex-1 rounded-[2px] ${
                      index < Math.round(difficulty)
                        ? color
                        : "bg-line"
                    }`}
                  />
                ))}
              </span>
              <span className="font-display text-sm font-semibold">
                {difficulty.toFixed(1)}/5
              </span>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
              Hours/wk
            </span>
            <span className="font-display font-semibold">
              {hours.toFixed(1)}
            </span>
          </div>

          <div className="sm:text-right">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
              Again
            </span>
            <span className="font-display font-semibold">
              {Math.round(again * 100)}%
            </span>
          </div>
        </div>
      )}
    </li>
  );
}