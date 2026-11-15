import { Link, useParams, useSearchParams } from "react-router-dom";
import { calculateRatingSummary } from "../utils/ratingUtils";
import ReviewList from "../components/ReviewList";

// Temporary Phase 1 data
const sampleCourses = [
  {
    code: "CSC443",
    title: "Web Programming",
    department: "Computer Science",
    credits: 3,
    coRequisite: "CSC375",
  },
  {
    code: "CSC245",
    title: "Object-Oriented Programming",
    department: "Computer Science",
    credits: 3,
    coRequisite: null,
  },
];

const sampleInstructors = [
  {
    id: "abdelnour",
    name: "Nagib Abdelnour",
  },
];

const sampleReviews = [
  {
    id: "r1",
    authorId: "u1",
    authorName: "Rea Khairallah",
    courseCode: "CSC443",
    instructorId: "abdelnour",
    instructorName: "Abdelnour",
    termId: "fall-2026",
    termName: "Fall 2026",
    rating: 5,
    difficulty: 3,
    hoursPerWeek: 7,
    wouldTakeAgain: true,
    anonymous: false,
    body: "The course was interesting and the projects were useful.",
  },
  {
    id: "r2",
    authorId: "u2",
    authorName: "Student",
    courseCode: "CSC443",
    instructorId: "abdelnour",
    instructorName: "Abdelnour",
    termId: "spring-2026",
    termName: "Spring 2026",
    rating: 4,
    difficulty: 4,
    hoursPerWeek: 8,
    wouldTakeAgain: true,
    anonymous: true,
    body: "Good explanations, but some assignments took a lot of time.",
  },
  {
    id: "r3",
    authorId: "u3",
    authorName: "Student",
    courseCode: "CSC245",
    instructorId: "abdelnour",
    instructorName: "Abdelnour",
    termId: "spring-2026",
    termName: "Spring 2026",
    rating: 3,
    difficulty: 3,
    hoursPerWeek: 6,
    wouldTakeAgain: false,
    anonymous: false,
    body: "The lectures were helpful, although the exams were challenging.",
  },
];

export default function CourseDetail() {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const pageState = searchParams.get("state");

  const course = sampleCourses.find((item) => item.code === courseId);

  const courseReviews = sampleReviews.filter(
    (review) => review.courseCode === courseId,
  );

  const reviews = pageState === "empty" ? [] : courseReviews;
  const summary = calculateRatingSummary(reviews);

  const instructorIds = [
    ...new Set(reviews.map((review) => review.instructorId)),
  ];

  const instructors = sampleInstructors.filter((item) =>
    instructorIds.includes(item.id),
  );

  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: summary.distribution[stars - 1],
  }));

  const maxCount = Math.max(1, ...distribution.map((item) => item.count));

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
          We couldn't load the course information.
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
          <p className="text-sm font-semibold text-brand-700">{course.code}</p>

          <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight text-ink">
            {course.title}
          </h1>

          <p className="mt-2 text-sm text-muted">
            {course.department} · {course.credits} credits
            {course.coRequisite && ` · co-requisite ${course.coRequisite}`}
          </p>
        </div>

        <Link
          to="/instructors/abdelnour"
          className="flex items-center gap-3 rounded-card border border-line bg-surface px-4 py-3 hover:border-brand-300"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 font-display text-sm font-semibold text-brand-700">
            NA
          </span>

          <div>
            <p className="text-sm font-semibold text-ink">Nagib Abdelnour</p>
            <p className="text-xs text-muted">View instructor</p>
          </div>
        </Link>
      </section>

      {/* Rating summary */}
      <section className="mt-6 grid gap-6 rounded-card border border-line bg-surface p-6 lg:grid-cols-[auto_1fr_auto]">
        <div className="lg:pr-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
            Overall
          </p>

          <p className="mt-2 font-display text-6xl font-semibold text-ink">
            {summary.count ? summary.averageRating.toFixed(1) : "—"}
          </p>

          {summary.count > 0 && (
            <p className="mt-2 text-lg text-amber-500">
              {"★".repeat(Math.round(summary.averageRating))}
              {"☆".repeat(5 - Math.round(summary.averageRating))}
            </p>
          )}

          <p className="mt-2 text-xs text-muted">{summary.count} reviews</p>
        </div>

        {/* Rating distribution */}
        <div className="lg:border-x lg:border-line lg:px-8">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
            Ratings given
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

                <span className="w-6 text-sm text-ink">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Other statistics */}
        <div className="space-y-5 lg:pl-2">
          <div>
            <p className="text-[11px] font-semibold uppercase text-muted">
              Difficulty
            </p>
            <p className="mt-1 font-display text-3xl font-semibold">
              {summary.count
                ? `${summary.averageDifficulty.toFixed(1)}/5`
                : "—"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase text-muted">
              Hours a week
            </p>
            <p className="mt-1 font-display text-3xl font-semibold">
              {summary.count ? summary.averageHours.toFixed(1) : "—"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase text-muted">
              Would take again
            </p>
            <p className="mt-1 font-display text-3xl font-semibold">
              {summary.count ? `${Math.round(summary.takeAgainPercent)}%` : "—"}
            </p>
          </div>
        </div>
      </section>

      {/* Instructor links */}
      {instructors.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Instructors
          </h2>

          <div className="mt-3 flex flex-wrap gap-3">
            {instructors.map((instructor) => (
              <Link
                key={instructor.id}
                to={`/instructors/${instructor.id}`}
                className="rounded-card border border-line bg-surface px-4 py-3 text-sm font-semibold text-brand-700 hover:border-brand-300"
              >
                {instructor.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      {reviews.length === 0 ? (
        <section className="mt-10 rounded-card border border-line bg-surface p-8 text-center">
          <h2 className="font-display text-2xl font-semibold">
            No reviews yet
          </h2>

          <p className="mt-2 text-sm text-muted">
            Be the first to review this course.
          </p>

          <Link
            to="/reviews/new"
            className="mt-5 inline-block rounded bg-brand-700 px-4 py-2 text-sm font-semibold text-white"
          >
            Write a review
          </Link>
        </section>
      ) : (
        <ReviewList
          reviews={reviews}
          currentUser={
            searchParams.get("viewer") === "owner"
              ? { id: "u1" }
              : searchParams.get("viewer") === "signedin"
                ? { id: "u99" }
                : null
          }
        />
      )}
    </>
  );
}
