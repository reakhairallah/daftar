import { Link, useParams, useSearchParams } from "react-router-dom";
import ReviewList from "../components/ReviewList";

// Temporary course data from the design reference.
// We will replace this with the team's shared data later.
const sampleCourse = {
  code: "CSC443",
  title: "Web Programming",
  department: "Computer Science",
  credits: 3,
  coRequisite: "CSC375",
};

const sampleInstructor = {
  id: "abdelnour",
  name: "Nagib Abdelnour",
};

export default function CourseDetail() {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const pageState = searchParams.get("state");
  // Temporary lookup until shared data is available.
  const course = courseId === sampleCourse.code ? sampleCourse : null;

  if (pageState === "loading") {
    return (
      <div role="status" className="py-16 text-center">
        <p className="text-lg font-semibold text-ink">Loading course...</p>
        <p className="mt-2 text-sm text-muted">
          Getting the course information and reviews.
        </p>
      </div>
    );
  }

  if (pageState === "error") {
    return (
      <div
        role="alert"
        className="rounded-card border border-line bg-surface p-6"
      >
        <h1 className="font-display text-2xl font-semibold text-ink">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-muted">
          We couldn't load the course information. Please try again.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded bg-brand-700 px-4 py-2 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!course) {
    return <p role="status">Course not found.</p>;
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

        {/* Instructor card */}
        <Link
          to={`/instructors/${sampleInstructor.id}`}
          className="flex items-center gap-3 rounded-card border border-line bg-surface px-4 py-2.5 hover:border-brand-300"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 font-display text-sm font-semibold text-brand-700">
            NA
          </span>

          <div>
            <p className="text-sm font-semibold text-ink">
              {sampleInstructor.name}
            </p>

            <p className="text-xs text-muted">Teaching it this term</p>
          </div>
        </Link>
      </section>

      {/* Rating Summary — temporary design data */}
      <section className="mt-6 grid gap-6 rounded-card border border-line bg-surface p-6 lg:grid-cols-[auto_1fr_auto]">
        {/* Overall rating */}
        <div className="lg:pr-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
            Overall
          </p>

          <div className="mt-2 flex items-center gap-3">
            <span className="font-display text-6xl font-semibold text-ink">
              4.2
            </span>

            <span className="text-xl text-amber-500">★★★★☆</span>
          </div>

          <p className="mt-2 text-xs text-muted">
            38 reviews · Fall 2024 to Spring 2026
          </p>
        </div>

        {/* Rating distribution */}
        <div className="lg:border-x lg:border-line lg:px-8">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
            Ratings given · 38 in total
          </h2>

          <div className="space-y-2">
            {[
              { stars: 5, count: 18 },
              { stars: 4, count: 13 },
              { stars: 3, count: 4 },
              { stars: 2, count: 2 },
              { stars: 1, count: 1 },
            ].map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="w-5 text-sm text-muted">{stars}</span>

                <div className="h-5 flex-1 overflow-hidden rounded bg-brand-50">
                  <div
                    className="h-full rounded bg-brand-600"
                    style={{ width: `${(count / 18) * 100}%` }}
                  />
                </div>

                <span className="w-6 text-sm text-ink">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional statistics */}
        <div className="space-y-5 lg:pl-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
              Difficulty
            </p>
            <p className="mt-1 font-display text-3xl font-semibold text-ink">
              3/5
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
              Hours a week
            </p>
            <p className="mt-1 font-display text-3xl font-semibold text-ink">
              7
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
              Would take again
            </p>
            <p className="mt-1 font-display text-3xl font-semibold text-ink">
              89%
            </p>
          </div>
        </div>
      </section>

      {pageState === "empty" ? (
        <section className="mt-10 rounded-card border border-line bg-surface p-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-ink">
            No reviews yet
          </h2>
          <p className="mt-2 text-sm text-muted">
            This course hasn't received any reviews. Be the first to share your
            experience.
          </p>
          <Link
            to="/reviews/new"
            className="mt-5 inline-block rounded bg-brand-700 px-4 py-2 text-sm font-semibold text-white"
          >
            Write a review
          </Link>
        </section>
      ) : (
        <ReviewList />
      )}
    </>
  );
}
