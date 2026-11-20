import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import DataState from "../components/DataState";
import RatingSummary from "../components/RatingSummary";
import { useAppData } from "../state/AppContext";
import {
  highestRatedCourses,
  reviewsForCourse,
  reviewsForTerm,
} from "../lib/reviewSummaries";

const TERM_ID = "fall-2026";
const FEATURED_CODE = "CSC443";

export default function Home() {
  const { courses, reviews, terms } = useAppData();
  const [params, setParams] = useSearchParams();
  const requestedState = params.get("state");
  const viewState = ["loading", "empty", "error"].includes(requestedState)
    ? requestedState
    : "populated";

  const term = terms.find((item) => item.id === TERM_ID);
  const termLabel = term ? `${term.season} ${term.year}` : "Fall 2026";
  const termReviews = reviewsForTerm(reviews, TERM_ID);
  const featuredCourse = courses.find((course) => course.code === FEATURED_CODE);
  const featuredReviews = reviewsForCourse(termReviews, FEATURED_CODE);
  const highestRated = highestRatedCourses(courses, termReviews);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Daftar — what the course is actually like";
    return () => { document.title = previousTitle; };
  }, []);

  function retry() {
    const next = new URLSearchParams(params);
    next.delete("state");
    setParams(next, { replace: true });
  }

  return (
    <>
      <section className="grid items-start gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
            Registration opens 16 November
          </p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.03] tracking-tight text-ink">
            Nobody should<br />pick a course<br />on rumour.
          </h1>
          <p className="mt-6 max-w-lg text-base text-muted">
            Daftar collects what a course was actually like — with a named
            instructor, in a named term — and turns it into numbers you can
            use. One review each, so nobody can shout.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center rounded bg-brand-700 px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-brand-800"
            >
              Find a course
            </Link>
            <Link
              to="/reviews/new"
              className="inline-flex items-center justify-center rounded border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-brand-50"
            >
              Write a review
            </Link>
          </div>
        </div>

        <DataState
          state={viewState}
          isEmpty={!featuredCourse || featuredReviews.length === 0}
          onRetry={retry}
          emptyTitle={featuredCourse ? "Nobody has reviewed CSC443 yet" : "No course ratings available"}
        >
          <RatingSummary
            reviews={featuredReviews}
            course={featuredCourse}
            termLabel={termLabel}
          />
        </DataState>
      </section>

      <section className="mt-16" aria-labelledby="highest-rated-heading">
        <div className="flex items-end justify-between gap-4">
          <h2 id="highest-rated-heading" className="font-display text-2xl font-semibold tracking-tight">
            Highest rated this term
          </h2>
          <Link
            to="/courses"
            className="shrink-0 text-sm font-semibold text-brand-700 underline decoration-accent-400 decoration-2 underline-offset-4"
          >
            All courses
          </Link>
        </div>
        <div className="mt-5">
          <DataState
            state={viewState}
            isEmpty={highestRated.length === 0}
            onRetry={retry}
            emptyTitle="No reviewed courses this term"
          >
            <ul className="space-y-3">
              {highestRated.map((course) => (
                <CourseCard key={course.code} course={course} reviews={termReviews} />
              ))}
            </ul>
          </DataState>
        </div>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-3" aria-label="How reviews work">
        <div className="rounded-card border border-line bg-surface p-6">
          <h3 className="font-display text-lg font-semibold tracking-tight">One review each</h3>
          <p className="mt-1.5 text-sm text-muted">
            Per course, per instructor, per term. You can edit yours; you cannot post a second.
          </p>
        </div>
        <div className="rounded-card border border-line bg-surface p-6">
          <h3 className="font-display text-lg font-semibold tracking-tight">Anonymous is not nameless</h3>
          <p className="mt-1.5 text-sm text-muted">
            You may hide your name from readers. Your review still belongs to you and you can still manage it.
          </p>
        </div>
        <div className="rounded-card border border-line bg-surface p-6">
          <h3 className="font-display text-lg font-semibold tracking-tight">Averages are computed</h3>
          <p className="mt-1.5 text-sm text-muted">
            Delete a review and the mean changes immediately. Nothing is cached into a column.
          </p>
        </div>
      </section>
    </>
  );
}
