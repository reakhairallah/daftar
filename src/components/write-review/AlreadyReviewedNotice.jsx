import { Link } from "react-router-dom";

export default function AlreadyReviewedNotice({ review, editPath, instructors, terms }) {
  const instructor = instructors.find((i) => i.id === review.instructorId);
  const term = terms.find((t) => t.id === review.termId);
  const lastName = instructor.name.split(" ").at(-1);
  const postedOn = new Date(review.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long" });

  return (
    <div role="status" className="rounded border-l-4 border-accent-500 bg-accent-50 p-4">
      <p className="text-sm font-semibold text-accent-900">
        You reviewed {review.courseCode} with {lastName} in {term.season} {term.year} already.
      </p>
      <p className="mt-1 text-xs text-accent-900/80">
        Posted {postedOn}, {review.rating} {review.rating === 1 ? "star" : "stars"}. You can change it as often as you like.
      </p>
      <Link
        to={editPath}
        className="mt-3 inline-flex rounded border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink hover:bg-brand-50"
      >
        Edit that review instead
      </Link>
    </div>
  );
}
