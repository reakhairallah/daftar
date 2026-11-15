import { Link, useParams, useSearchParams } from "react-router-dom";

// Temporary instructor data from the design reference
const sampleInstructor = {
  id: "abdelnour",
  name: "Nagib Abdelnour",
  department: "Computer Science",
};

const sampleCourses = [
  {
    code: "CSC443",
    title: "Web Programming",
    term: "Fall 2026",
    reviewCount: 38,
    rating: 4.2,
    difficulty: 3,
    hoursPerWeek: 7,
    takeAgain: 89,
  },
  {
    code: "CSC245",
    title: "Object-Oriented Programming",
    term: "Spring 2026",
    reviewCount: 8,
    rating: 4.3,
    difficulty: 3,
    hoursPerWeek: 6,
    takeAgain: 91,
  },
];

const ratingDistribution = [
  { stars: 5, count: 22 },
  { stars: 4, count: 16 },
  { stars: 3, count: 5 },
  { stars: 2, count: 2 },
  { stars: 1, count: 1 },
];

const maxRatingCount = Math.max(
  ...ratingDistribution.map((item) => item.count),
);

const totalReviews = ratingDistribution.reduce(
  (total, item) => total + item.count,
  0,
);

export default function Instructor() {
  const { instructorId } = useParams();
  const [searchParams] = useSearchParams();
  const pageState = searchParams.get("state");
  const instructor =
    instructorId === sampleInstructor.id ? sampleInstructor : null;

  if (pageState === "loading") {
    return (
      <div role="status" className="py-16 text-center">
        <p className="text-lg font-semibold text-ink">Loading instructor...</p>
        <p className="mt-2 text-sm text-muted">
          Getting instructor information and reviews.
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
          We couldn't load the instructor information. Please try again.
        </p>

        <Link
          to={`/instructors/${instructorId}`}
          className="mt-4 inline-block rounded bg-brand-700 px-4 py-2 text-sm font-semibold text-white"
        >
          Try again
        </Link>
      </div>
    );
  }

  if (!instructor) {
    return <p role="status">Instructor not found.</p>;
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav
        className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted"
        aria-label="Breadcrumb"
      >
        <Link to="/instructors" className="hover:text-ink">
          Instructors
        </Link>

        <span className="mx-2 text-brand-500">/</span>
        {instructor.name}
      </nav>

      {/* Instructor information */}
      <section className="mt-4 flex flex-wrap items-end gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 font-display text-2xl font-semibold text-brand-700">
          NA
        </div>

        <div className="flex-1">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
            {instructor.name}
          </h1>

          <p className="mt-2 text-sm text-muted">
            {instructor.department} · 2 courses · 46 reviews
          </p>
        </div>

        {/* Overall instructor rating */}
        <div className="text-left sm:text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
            Across all courses
          </p>

          <div className="mt-1 flex items-end gap-2 sm:justify-end">
            <span className="font-display text-4xl font-semibold tracking-tight text-ink">
              4.3
            </span>

            <span className="pb-1 text-lg text-amber-500">★★★★☆</span>
          </div>

          <p className="mt-1 text-xs text-muted">Based on 46 student reviews</p>
        </div>
      </section>
      {pageState === "empty" ? (
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
              {sampleCourses.map((course) => (
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
                        {course.term} · {course.reviewCount} reviews
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                      <div>
                        <p className="text-[11px] uppercase text-muted">
                          Rating
                        </p>
                        <p className="font-semibold text-ink">
                          {course.rating}/5
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase text-muted">
                          Difficulty
                        </p>
                        <p className="font-semibold text-ink">
                          {course.difficulty}/5
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase text-muted">
                          Hours/wk
                        </p>
                        <p className="font-semibold text-ink">
                          {course.hoursPerWeek}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase text-muted">
                          Again
                        </p>
                        <p className="font-semibold text-ink">
                          {course.takeAgain}%
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* All instructor ratings */}
          <section className="mt-10 rounded-card border border-line bg-surface p-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
              All reviews of this instructor
            </h2>

            <div className="mt-4 max-w-md">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
                Ratings given · {totalReviews} in total
              </p>

              <div className="flex flex-col gap-2">
                {ratingDistribution.map(({ stars, count }) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="w-6 text-right text-xs font-semibold text-muted">
                      {stars}
                    </span>

                    <div className="h-5 min-w-0 flex-1 overflow-hidden rounded bg-brand-50">
                      <div
                        className="h-full rounded bg-brand-600"
                        style={{
                          width: `${
                            maxRatingCount > 0
                              ? (count / maxRatingCount) * 100
                              : 0
                          }%`,
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
