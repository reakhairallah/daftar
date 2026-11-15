import { Link } from "react-router-dom";

export default function EmptyReviews() {
  return (
    <section className="rounded-card border border-dashed border-line bg-surface px-6 py-14 text-center">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">You have not written a review</h2>
      <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
        The courses you have taken are the ones you can review. It takes two minutes and it is the only reason this site has anything in it.
      </p>
      <Link
        to="/reviews/new"
        className="mt-7 inline-flex rounded bg-brand-700 px-3 py-1.5 text-xs font-semibold text-paper hover:bg-brand-800"
      >
        Write one
      </Link>
    </section>
  );
}
