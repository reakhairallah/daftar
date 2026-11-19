import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";

const buttonClass =
  "mt-7 inline-flex items-center justify-center rounded bg-brand-700 px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-brand-800";
const panelClass =
  "rounded-card border border-dashed border-line bg-surface px-6 py-14 text-center";

export default function CourseResults({ state, courses, reviews, onRetry, onClear }) {
  if (state === "loading") {
    return (
      <section role="status" aria-busy="true" aria-label="Loading course results">
        <p className="sr-only">Loading course results…</p>
        <ul className="space-y-3" aria-hidden="true">
          {[1, 2].map((row) => (
            <li
              key={row}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-card border border-line bg-surface px-5 py-4 motion-safe:animate-pulse"
            >
              <div className="min-w-0 flex-1 basis-64 space-y-2.5">
                <span className="block h-5 w-2/5 rounded bg-line" />
                <span className="block h-3 w-1/3 rounded bg-line" />
              </div>
              <div className="grid w-full grid-cols-2 gap-x-6 gap-y-3 sm:w-auto sm:grid-cols-[auto_auto_auto_auto]">
                <span className="h-5 w-28 rounded bg-line" />
                <span className="h-5 w-28 rounded bg-line" />
                <span className="h-5 w-16 rounded bg-line" />
                <span className="h-5 w-16 rounded bg-line" />
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (state === "error") {
    return (
      <section role="alert" className="rounded-card border border-red-200 bg-red-50 px-6 py-14 text-center">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-red-900">
          The course list would not load
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-red-900/70">
          Please try again in a moment.
        </p>
        <button type="button" className={buttonClass} onClick={onRetry}>Try again</button>
      </section>
    );
  }

  if (courses.length === 0) {
    return (
      <section className={panelClass}>
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          No courses match your filters
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
          Try another course code or title, or clear the filters to see all courses.
        </p>
        <button type="button" className={buttonClass} onClick={onClear}>Clear filters</button>
      </section>
    );
  }

  if (courses.length === 1 && courses[0].summary.count === 0) {
    const course = courses[0];
    return (
      <section className={panelClass}>
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Nobody has reviewed {course.code} yet
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
          The course exists. If you took it, you would be the first to review it.
        </p>
        <Link to={`/reviews/new?course=${encodeURIComponent(course.code)}`} className={buttonClass}>
          Write the first review
        </Link>
      </section>
    );
  }

  return (
    <ul className="space-y-3" aria-label="Course results">
      {courses.map((course) => (
        <CourseCard key={course.code} course={course} reviews={reviews} />
      ))}
    </ul>
  );
}
