import { Link } from 'react-router-dom';
import StarRating from '../StarRating';
import RatingDistribution from '../RatingDistribution';
import DifficultyMeter from '../DifficultyMeter';
import { card, label, num, btnPrimary } from '../../lib/styles';

// One course in the comparison. Knows nothing about the other cards:
// sharedMax comes from ComparePage, which can see all of them.
export default function CourseCard({ summary, sharedMax }) {
  const {
    courseCode,
    title,
    count,
    mean,
    distribution,
    avgDifficulty,
    avgHours,
    wouldTakeAgainPct,
  } = summary;

  return (
    <article className={`${card} p-5`}>
      <p className={`${num} text-xs text-brand-700`}>{courseCode}</p>
      <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">{title}</h3>

      {count === 0 ? (
        <>
          <p className="mt-4 text-sm text-muted">
            Nobody has reviewed {courseCode} yet. If you took it, you would be the first.
          </p>
          {/* Route belongs to Write a review (Rea). Confirm the path with her. */}
          <Link to={`/write?course=${courseCode}`} className={`${btnPrimary} mt-4`}>
            Write the first review
          </Link>
        </>
      ) : (
        <>
          <div className="mt-4 flex items-end gap-3">
            <span className={`${num} text-4xl leading-none text-ink`}>{mean.toFixed(1)}</span>
            <span className="pb-1">
              <StarRating value={mean} />
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">
            {count} {count === 1 ? 'review' : 'reviews'}
          </p>

          <div className="mt-5">
            <RatingDistribution distribution={distribution} count={count} max={sharedMax} />
          </div>

          <dl className="mt-5 space-y-3 border-t border-line pt-4">
            <div>
              <dt className={label}>Difficulty</dt>
              <dd className="mt-1.5">
                <DifficultyMeter value={avgDifficulty} />
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className={label}>Hours a week</dt>
              <dd className={`${num} text-ink`}>{Math.round(avgHours)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className={label}>Would take again</dt>
              <dd className={`${num} text-ink`}>{wouldTakeAgainPct}%</dd>
            </div>
          </dl>
        </>
      )}
    </article>
  );
}