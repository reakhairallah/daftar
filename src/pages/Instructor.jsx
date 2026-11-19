import { Link, useParams, useSearchParams } from "react-router-dom";
import { calculateRatingSummary } from "../utils/ratingUtils";
import { useAppData } from "../state/AppContext";

export default function Instructor() {
  const { instructorId } = useParams();
  const [searchParams] = useSearchParams();
  const pageState = searchParams.get("state");

  const { courses, instructors, reviews, terms } = useAppData();

  const instructor = instructors.find((item) => item.id === instructorId);

  const instructorReviews = reviews.filter(
    (review) => review.instructorId === instructorId,
  );

  const visibleReviews = pageState === "empty" ? [] : instructorReviews;

  const summary = calculateRatingSummary(visibleReviews);

  const coursesWithRatings = courses
    .filter((course) =>
      instructorReviews.some((review) => review.courseCode === course.code),
    )
    .map((course) => {
      const courseReviews = visibleReviews.filter(
        (review) => review.courseCode === course.code,
      );

      const courseTerms = [
        ...new Set(courseReviews.map((review) => review.termId)),
      ]
        .map((id) => terms.find((term) => term.id === id))
        .filter(Boolean)
        .map((term) => `${term.season} ${term.year}`);

      return {
        ...course,
        term: courseTerms.join(", "),
        summary: calculateRatingSummary(courseReviews),
      };
    });

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: summary.distribution[stars - 1],
  }));

  const maxRatingCount = Math.max(
    1,
    ...ratingDistribution.map((item) => item.count),
  );

  // Loading state
  if (pageState === "loading") {
    return (
      <div role="status" className="py-16 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Loading instructor...
        </h1>

        <p className="mt-2 text-sm text-muted">
          Getting instructor information and reviews.
        </p>
      </div>
    );
  }

  // Error state
  if (pageState === "error") {
    return (
      <section
        role="alert"
        className="rounded-card border border-line bg-surface p-6"
      >
        <h1 className="font-display text-2xl font-semibold text-ink">
          Something went wrong
        </h1>

        <p className="mt-2 text-sm text-muted">
          We couldn't load the instructor information. Please try again.
        </p>

        <Link
          to={`/instructors/${instructorId}`}
          className="mt-4 inline-block rounded bg-brand-700 px-4 py-2 text-sm font-semibold text-white"
        >
          Try again
        </Link>
      </section>
    );
  }

  // Instructor not found
  if (!instructor) {
    return (
      <section className="py-10">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Instructor not found
        </h1>

        <p className="mt-2 text-sm text-muted">
          We couldn't find the instructor you're looking for.
        </p>

        <Link
          to="/courses"
          className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline"
        >
          Back to courses
        </Link>
      </section>
    );
  }

  const initials = instructor.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {/* Breadcrumb */}
      <nav
        className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted"
        aria-label="Breadcrumb"
      >
        <Link to="/courses" className="hover:text-ink">
          Courses
        </Link>

        <span className="mx-2 text-brand-500">/</span>

        {instructor.name}
      </nav>

      {/* Instructor information */}
      <section className="mt-4 flex flex-wrap items-end gap-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-2xl font-semibold text-brand-700">
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
            {instructor.name}
          </h1>

          <p className="mt-2 text-sm text-muted">
            {instructor.department} · {coursesWithRatings.length} courses ·{" "}
            {summary.count} reviews
          </p>
        </div>

        {/* Overall instructor rating */}
        <div className="text-left sm:text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
            Across all courses
          </p>

          <div className="mt-1 flex items-end gap-2 sm:justify-end">
            <span className="font-display text-4xl font-semibold tracking-tight text-ink">
              {summary.count > 0 ? summary.averageRating.toFixed(1) : "—"}
            </span>

            {summary.count > 0 && (
              <span
                className="pb-1 text-lg text-amber-500"
                role="img"
                aria-label={`${summary.averageRating.toFixed(1)} out of 5 stars`}
              >
                {"★".repeat(Math.round(summary.averageRating))}
                {"☆".repeat(5 - Math.round(summary.averageRating))}
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-muted">
            Based on {summary.count} student reviews
          </p>
        </div>
      </section>

      {/* Empty state */}
      {summary.count === 0 ? (
        <section className="mt-8 rounded-card border border-line bg-surface p-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-ink">
            No reviews yet
          </h2>

          <p className="mt-2 text-sm text-muted">
            This instructor hasn't received any reviews yet.
          </p>
        </section>
      ) : (
        <>
          {/* Courses taught */}
          <section className="mt-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Courses taught
            </h2>

            <ul className="mt-4 space-y-3">
              {coursesWithRatings.map((course) => (
                <li
                  key={course.code}
                  className="rounded-card border border-line bg-surface px-5 py-4 hover:border-brand-300"
                >
                  <div className="flex flex-wrap items-center justify-between gap-5">
                    <div>
                      <p className="text-sm font-semibold text-brand-700">
                        {course.code}
                      </p>

                      <Link
                        to={`/courses/${course.code}`}
                        className="font-display text-lg font-semibold text-ink hover:text-brand-700"
                      >
                        {course.title}
                      </Link>

                      <p className="mt-1 text-xs text-muted">
                        {course.term && `${course.term} · `}
                        {course.summary.count} reviews
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                      <div>
                        <p className="text-[11px] uppercase text-muted">
                          Rating
                        </p>

                        <p className="font-semibold text-ink">
                          {course.summary.count
                            ? `${course.summary.averageRating.toFixed(1)}/5`
                            : "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase text-muted">
                          Difficulty
                        </p>

                        <p className="font-semibold text-ink">
                          {course.summary.count
                            ? `${course.summary.averageDifficulty.toFixed(1)}/5`
                            : "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase text-muted">
                          Hours/wk
                        </p>

                        <p className="font-semibold text-ink">
                          {course.summary.count
                            ? course.summary.averageHours.toFixed(1)
                            : "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase text-muted">
                          Again
                        </p>

                        <p className="font-semibold text-ink">
                          {course.summary.count
                            ? `${Math.round(course.summary.takeAgainPercent)}%`
                            : "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Rating distribution */}
          <section className="mt-10 rounded-card border border-line bg-surface p-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
              All reviews of this instructor
            </h2>

            <div className="mt-4 max-w-md">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
                Ratings given · {summary.count} in total
              </p>

              <div className="flex flex-col gap-2">
                {ratingDistribution.map(({ stars, count }) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="w-6 text-right text-xs font-semibold text-muted">
                      {stars}
                    </span>

                    <div
                      className="h-5 min-w-0 flex-1 overflow-hidden rounded bg-brand-50"
                      role="img"
                      aria-label={`${count} reviews with ${stars} stars`}
                    >
                      <div
                        className="h-full rounded bg-brand-600"
                        style={{
                          width: `${(count / maxRatingCount) * 100}%`,
                        }}
                      />
                    </div>

                    <span className="w-8 text-xs font-semibold text-ink">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
