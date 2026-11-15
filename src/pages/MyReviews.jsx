import { useSearchParams } from "react-router-dom";
import ReviewCard from "../components/my-reviews/ReviewCard";
import EmptyReviews from "../components/my-reviews/EmptyReviews";
import DataState from "../components/TempDataState";
import { useAppData } from "../lib/tempAppData";
import { termLabel, instructorLastName } from "../lib/reviewLabels";

export default function MyReviews() {
  const { reviews, setReviews, instructors, terms, currentUser } = useAppData();
  const myReviews = reviews.filter((review) => review.authorId === currentUser.id);

  const [params, setParams] = useSearchParams();
  const requestedState = params.get("state");
  const viewState = ["loading", "empty", "error"].includes(requestedState) ? requestedState : "populated";

  function retry() {
    const next = new URLSearchParams(params);
    next.delete("state");
    setParams(next, { replace: true });
  }

  function deleteReview(review) {
    if (!window.confirm(`Delete your ${review.courseCode} review? This cannot be undone.`)) return;
    setReviews(reviews.filter((r) => r.id !== review.id));
  }

  let content;
  if (viewState === "loading" || viewState === "error") {
    content = <DataState state={viewState} onRetry={retry} />;
  } else if (viewState === "empty" || myReviews.length === 0) {
    content = <EmptyReviews />;
  } else {
    content = (
      <ul className="space-y-3">
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
    );
  }

  return (
    <>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">My reviews</h1>
      <p className="mt-2 text-sm text-muted">
        Everything you have written, including the ones posted anonymously. Deleting one changes the course average straight away.
      </p>
      <div className="mt-6">{content}</div>
    </>
  );
}
