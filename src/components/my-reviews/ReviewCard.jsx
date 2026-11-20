import { Link } from "react-router-dom";
import StarRating from "../StarRating";
import Badge from "../Badge";
import { initials } from "../../lib/reviewLabels";

const actionClass = "rounded px-3 py-1.5 text-xs font-semibold text-muted hover:bg-brand-50 hover:text-ink";

export default function ReviewCard({ review, authorName, instructorName, termLabel, onDelete }) {
  const shownName = review.anonymous ? "Anonymous" : authorName;
  const avatar = review.anonymous ? "••" : initials(authorName);

  return (
    <li className="rounded-card border border-line bg-surface p-5">
      <div className="flex flex-wrap items-start gap-4">
        <span
          aria-hidden="true"
          className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-50 font-display text-xs font-semibold text-brand-700"
        >
          {avatar}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-display text-base font-semibold tracking-tight text-ink">{shownName}</span>
            <span className="text-xs text-muted">
              <Link to={`/courses/${review.courseCode}`} className="underline-offset-2 hover:text-ink hover:underline">
                {review.courseCode}
              </Link>
              {" · "}
              <Link to={`/instructors/${review.instructorId}`} className="underline-offset-2 hover:text-ink hover:underline">
                {instructorName}
              </Link>
              {` · ${termLabel}`}
            </span>
            <Badge tone="dark">Yours</Badge>
            {review.anonymous && <Badge>Posted anonymously</Badge>}
            {review.updatedAt && <Badge>Edited</Badge>}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2">
            <StarRating value={review.rating} />
            <span className="text-xs text-muted">
              Difficulty <span className="font-display font-semibold tabular-nums text-ink">{review.difficulty}/5</span>
            </span>
            <span className="text-xs text-muted">
              About <span className="font-display font-semibold tabular-nums text-ink">{review.hoursPerWeek}h</span> a week
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-ink/85">{review.body}</p>
        </div>

        <div className="flex items-center gap-1">
          <Link to={`/reviews/${review.id}/edit`} className={actionClass} aria-label={`Edit your ${review.courseCode} review`}>
            Edit
          </Link>
          <button type="button" onClick={onDelete} className={actionClass} aria-label={`Delete your ${review.courseCode} review`}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
