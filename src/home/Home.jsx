import { Link } from "react-router-dom";
import RatingSummary from "../components/RatingSummary";
import { useState } from "react";
import { initialReviews } from "./homeData";
export default function Home() {
    const [reviews] = useState(initialReviews);
  return (
    <section className="grid items-start gap-10 lg:grid-cols-[1.15fr_1fr]">
  <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
        Registration opens 16 November
      </p>

      <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.03] tracking-tight">
        Nobody should<br />
        pick a course<br />
        on rumour.
      </h1>

      <p className="mt-6 max-w-lg text-base text-muted">
        Daftar collects what a course was actually like — with a named
        instructor, in a named term — and turns it into numbers you can
        use. One review each, so nobody can shout.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
  <Link
    to="/courses"
    className="inline-flex items-center justify-center rounded bg-brand-700 px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
  >
    Find a course
  </Link>

  <Link
    to="/reviews/new"
    className="inline-flex items-center justify-center rounded border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
  >
    Write a review
   </Link>
</div>
  </div>

  <RatingSummary reviews={reviews}/>
</section>
  );
}