import { Link, useParams, useSearchParams } from "react-router-dom";
import { calculateRatingSummary } from "../utils/ratingUtils";
import ReviewList from "../components/ReviewList";
import { useAppData } from "../state/AppContext";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const pageState = searchParams.get("state");

  const {
    courses,
    reviews: allReviews,
    instructors: allInstructors,
    users,
    terms,
    currentUser,
  } = useAppData();

  const course = courses.find((item) => item.code === courseId);

  const courseReviews = allReviews
    .filter((review) => review.courseCode === courseId)
    .map((review) => {
      const author = users.find((user) => user.id === review.authorId);

      const instructor = allInstructors.find(
        (item) => item.id === review.instructorId,
      );

      const term = terms.find((item) => item.id === review.termId);

      return {
        ...review,
        authorName: author?.fullName || "Student",
        instructorName: instructor?.name || "Unknown",
        termName: term ? `${term.season} ${term.year}` : review.termId,
      };
    });

  const reviews = pageState === "empty" ? [] : courseReviews;

  const summary = calculateRatingSummary(reviews);

  const instructorIds = [
    ...new Set(courseReviews.map((review) => review.instructorId)),
  ];

  const instructors = allInstructors.filter((item) =>
    instructorIds.includes(item.id),
  );

  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: summary.distribution[stars - 1],
  }));

  const maxCount = Math.max(1, ...distribution.map((item) => item.count));

  const reviewedTerms = terms
    .filter((term) => reviews.some((review) => review.termId === term.id))
    .sort((a, b) => {
      const seasons = { Spring: 1, Summer: 2, Fall: 3 };
      return a.year - b.year || seasons[a.season] - seasons[b.season];
    });

  const firstTerm = reviewedTerms[0];
  const lastTerm = reviewedTerms[reviewedTerms.length - 1];

  const termRange = firstTerm
    ? firstTerm.id === lastTerm.id
      ? `${firstTerm.season} ${firstTerm.year}`
      : `${firstTerm.season} ${firstTerm.year} to ${lastTerm.season} ${lastTerm.year}`
    : "";

  // Loading state
  if (pageState === "loading") {
    return (
      <div role="status" className="py-16 text-center">
        <h1 className="font-display text-2xl font-semibold">
          Loading course...
        </h1>

        <p className="mt-2 text-sm text-muted">
          Getting course information and reviews.
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
        <h1 className="font-display text-2xl font-semibold">
          Something went wrong
        </h1>

        <p className="mt-2 text-sm text-muted">
          We couldn't load the course information. Please try again.
        </p>

        <Link
          to={`/courses/${courseId}`}
          className="mt-4 inline-block rounded bg-brand-700 px-4 py-2 text-sm font-semibold text-white"
        >
          Try again
        </Link>
      </section>
    );
  }

  // Course not found
  if (!course) {
    return (
      <section className="py-10">
        <h1 className="font-display text-2xl font-semibold">
          Course not found
        </h1>

        <p className="mt-2 text-sm text-muted">
          We couldn't find the course you're looking for.
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

        {course.code}
      </nav>

      {/* Course header */}
      <section className="mt-4 flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="font-display text-sm font-semibold text-brand-700">
            {course.code}
          </p>

          <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight text-ink">
            {course.title}
          </h1>

          <p className="mt-2 text-sm text-muted">
            {course.department} · {course.credits} credits
            {course.coRequisite && ` · co-requisite ${course.coRequisite}`}
          </p>
        </div>

        {/* Instructor cards */}
        <div className="flex flex-wrap gap-3">
          {instructors.map((instructor) => {
            const initials = instructor.name
              .split(" ")
              .map((name) => name[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <Link
                key={instructor.id}
                to={`/instructors/${instructor.id}`}
                className="flex items-center gap-3 rounded-card border border-line bg-surface px-4 py-3 hover:border-brand-300"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-sm font-semibold text-brand-700">
                  {initials}
                </span>

                <div>
                  <p className="text-sm font-semibold text-ink">
                    {instructor.name}
                  </p>

                  <p className="text-xs text-muted">View instructor</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Rating summary */}
      <section className="mt-6 grid gap-6 rounded-card border border-line bg-surface p-6 lg:grid-cols-[auto_1fr_auto]">
        {/* Overall rating */}
        <div className="lg:pr-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
            Overall
          </p>

          <p className="mt-2 font-display text-6xl font-semibold tracking-tight text-ink">
            {summary.count ? summary.averageRating.toFixed(1) : "—"}
          </p>

          {summary.count > 0 && (
            <p
              className="mt-2 text-lg text-amber-500"
              role="img"
              aria-label={`${summary.averageRating.toFixed(1)} out of 5 stars`}
            >
              {"★".repeat(Math.round(summary.averageRating))}
              {"☆".repeat(5 - Math.round(summary.averageRating))}
            </p>
          )}

          <p className="mt-2 text-xs text-muted">{summary.count} reviews</p>

          {termRange && <p className="mt-1 text-xs text-muted">{termRange}</p>}
        </div>

        {/* Rating distribution */}
        <div className="lg:border-x lg:border-line lg:px-8">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
            Ratings given · {summary.count} in total
          </h2>

          <div className="space-y-2">
            {distribution.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="w-5 text-sm text-muted">{stars}</span>

                <div className="h-5 min-w-0 flex-1 overflow-hidden rounded bg-brand-50">
                  <div
                    className="h-full rounded bg-brand-600"
                    style={{
                      width: `${(count / maxCount) * 100}%`,
                    }}
                  />
                </div>

                <span className="w-6 text-right text-sm text-ink">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional statistics */}
        <div className="space-y-5 lg:pl-2">
          <div>
            <p className="text-[11px] font-semibold uppercase text-muted">
              Difficulty
            </p>

            <p className="mt-1 font-display text-3xl font-semibold text-ink">
              {summary.count
                ? `${summary.averageDifficulty.toFixed(1)}/5`
                : "—"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase text-muted">
              Hours a week
            </p>

            <p className="mt-1 font-display text-3xl font-semibold text-ink">
              {summary.count ? summary.averageHours.toFixed(1) : "—"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase text-muted">
              Would take again
            </p>

            <p className="mt-1 font-display text-3xl font-semibold text-ink">
              {summary.count ? `${Math.round(summary.takeAgainPercent)}%` : "—"}
            </p>
          </div>
        </div>
      </section>

      {/* Write a review action */}
      <section className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-card border border-line bg-surface p-4">
        <div>
          <p className="font-display font-semibold text-ink">
            Taken this course?
          </p>

          <p className="mt-1 text-sm text-muted">
            {currentUser
              ? "Share your experience with other students."
              : "Sign in to share your experience."}
          </p>
        </div>

        <Link
          to={currentUser ? `/reviews/new?courseId=${course.code}` : "/signin"}
          className="rounded bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
        >
          {currentUser ? "Write a review" : "Sign in"}
        </Link>
      </section>

      {/* Reviews and empty state */}
      {reviews.length === 0 ? (
        <section className="mt-10 rounded-card border border-line bg-surface p-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-ink">
            No reviews yet
          </h2>

          <p className="mt-2 text-sm text-muted">
            Be the first to review this course.
          </p>
        </section>
      ) : (
        <ReviewList
          key={course.code}
          reviews={reviews}
          currentUser={currentUser}
        />
      )}
    </>
  );
}
