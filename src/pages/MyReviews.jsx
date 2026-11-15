import ReviewCard from "../components/my-reviews/ReviewCard";
import { useAppData } from "../lib/tempAppData";
import { termLabel, instructorLastName } from "../lib/reviewLabels";

export default function MyReviews() {
  const { reviews, setReviews, instructors, terms, currentUser } = useAppData();
  const myReviews = reviews.filter((review) => review.authorId === currentUser.id);

  function deleteReview(review) {
    if (!window.confirm(`Delete your ${review.courseCode} review? This cannot be undone.`)) return;
    setReviews(reviews.filter((r) => r.id !== review.id));
  }

  return (
    <>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">My reviews</h1>
      <p className="mt-2 text-sm text-muted">
        Everything you have written, including the ones posted anonymously. Deleting one changes the course average straight away.
      </p>

      <ul className="mt-6 space-y-3">
        {myReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            authorName={currentUser.fullName}
            instructorName={instructorLastName(instructors, review.instructorId)}
            termLabel={termLabel(terms, review.termId)}
            onDelete={() => deleteReview(review)}
          />
        ))}
      </ul>
    </>
  );
}
