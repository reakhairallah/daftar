import { useState } from "react";
import { Link } from "react-router-dom";

// Temporary reviews for Phase 1
const sampleReviews = [
  {
    id: "r1",
    authorId: "u1",
    authorName: "Rea Khairallah",
    instructorId: "abdelnour",
    instructorName: "Abdelnour",
    termId: "fall-2026",
    termName: "Fall 2026",
    rating: 5,
    difficulty: 3,
    hoursPerWeek: 7,
    anonymous: false,
    body: "The project is the course. Start the React part early — the brief gives you the screens, but nobody tells you how long wiring the state takes.",
  },
  {
    id: "r2",
    authorId: "u2",
    authorName: "Student",
    instructorId: "farhat",
    instructorName: "Farhat",
    termId: "spring-2026",
    termName: "Spring 2026",
    rating: 4,
    difficulty: 3,
    hoursPerWeek: 6,
    anonymous: true,
    body: "Fair exams, and the slides are genuinely enough to revise from. Lost a star for the group project marking being opaque.",
  },
];

export default function ReviewList({
  reviews = sampleReviews,
  currentUser = null,
}) {
  const [instructor, setInstructor] = useState("all");
  const [term, setTerm] = useState("all");

  const instructors = [
    ...new Map(
      reviews.map((review) => [
        review.instructorId,
        {
          id: review.instructorId,
          name: review.instructorName,
        },
      ]),
    ).values(),
  ];

  const terms = [
    ...new Map(
      reviews.map((review) => [
        review.termId,
        {
          id: review.termId,
          name: review.termName,
        },
      ]),
    ).values(),
  ];

  const filteredReviews = reviews.filter((review) => {
    const matchesInstructor =
      instructor === "all" || review.instructorId === instructor;

    const matchesTerm = term === "all" || review.termId === term;

    return matchesInstructor && matchesTerm;
  });

  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-3">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Reviews
        </h2>

        <div className="flex flex-wrap gap-2">
          <select
            aria-label="Filter by instructor"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            className="rounded border border-line bg-surface px-3 py-2 text-sm"
          >
            <option value="all">All instructors</option>
            {instructors.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="rounded border border-line bg-surface px-3 py-2 text-sm"
          >
            <option value="all">All terms</option>
            {terms.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <p className="mt-5 text-sm text-muted">
          No reviews match your filters.
        </p>
      ) : (
        <ul className="mt-5 space-y-3">
          {filteredReviews.map((review) => {
            const isOwner = currentUser?.id === review.authorId;

            const displayName = review.anonymous
              ? "Anonymous"
              : review.authorName;

            const initials = review.anonymous
              ? "••"
              : (displayName || "Student")
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2);

            return (
              <li
                key={review.id}
                className="rounded-card border border-line bg-surface p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
                    {initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display font-semibold">
                        {displayName}
                      </h3>

                      <span className="text-xs text-muted">
                        {review.termName} · {review.instructorName}
                      </span>

                      {isOwner && (
                        <span className="rounded bg-ink px-2 py-0.5 text-xs text-paper">
                          Yours
                        </span>
                      )}

                      {review.anonymous && (
                        <span className="rounded bg-brand-50 px-2 py-0.5 text-xs text-brand-700">
                          Posted anonymously
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap gap-4 text-sm">
                      <span
                        className="text-amber-500"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>

                      <span className="text-muted">
                        Difficulty {review.difficulty}/5
                      </span>

                      <span className="text-muted">
                        About {review.hoursPerWeek}h a week
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-ink">
                      {review.body}
                    </p>

                    {isOwner && (
                      <Link
                        to={`/reviews/${review.id}/edit`}
                        className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline"
                      >
                        Edit review
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
