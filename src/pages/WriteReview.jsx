import { Link } from "react-router-dom";

// TEMP: hard-coded lists
const courses = ["CSC443 · Web Programming", "CSC375 · Database Management"];
const instructors = ["Nagib Abdelnour", "Mohammad Farhat"];
const terms = ["Fall 2026", "Spring 2026", "Fall 2025"];

const labelClass = "text-[11px] font-semibold uppercase tracking-[0.13em] text-muted";
const inputClass =
  "w-full rounded border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100";

const oneToFive = [1, 2, 3, 4, 5];
const difficultyShades = ["bg-brand-300", "bg-brand-400", "bg-brand-500", "bg-brand-600", "bg-brand-700"];

export default function WriteReview() {
  // TEMP: fixed values
  const rating = 4;
  const difficulty = 3;
  const takeAgain = "yes";

  return (
    <>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Write a review</h1>
      <p className="mt-2 max-w-prose text-sm text-muted">
        One review per course, per instructor, per term. You can come back and edit it; you cannot post a second one.
      </p>

      {/* TEMP: stop the browser reloading the page */}
      <form className="mt-10 max-w-3xl space-y-7" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="r-course" className={labelClass}>Course</label>
            <select id="r-course" className={inputClass}>
              <option value="">Choose one</option>
              {courses.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="r-inst" className={labelClass}>Instructor</label>
            <select id="r-inst" className={inputClass} aria-describedby="r-inst-msg">
              <option value="">Choose one</option>
              {instructors.map((i) => <option key={i}>{i}</option>)}
            </select>
            <p id="r-inst-msg" className="text-xs text-muted">
              Reviews are tied to who taught it. The same course with a different instructor is a different review.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="r-term" className={labelClass}>Term</label>
            <select id="r-term" className={inputClass}>
              <option value="">Choose one</option>
              {terms.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="r-hours" className={labelClass}>Hours a week, outside class</label>
            <input id="r-hours" type="number" min="0" className={inputClass} />
          </div>
        </div>

        <fieldset className="flex flex-col gap-1.5">
          <legend className={labelClass}>Overall rating</legend>
          <div className="mt-1.5 flex items-center gap-3">
            <div className="flex gap-1">
              {oneToFive.map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  aria-pressed={n === rating}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded border ${
                    n <= rating ? "border-accent-400 bg-accent-50" : "border-line bg-surface"
                  }`}
                >
                  <svg viewBox="0 0 20 20" className={`h-5 w-5 ${n <= rating ? "text-accent-400" : "text-line"}`} fill="currentColor" aria-hidden="true">
                    <path d="M10 1.8l2.5 5.1 5.6.8-4 4 .9 5.6-5-2.6-5 2.6.9-5.6-4-4 5.6-.8z" />
                  </svg>
                </button>
              ))}
            </div>
            <span className="font-display text-lg font-semibold tabular-nums text-ink">{rating}</span>
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-1.5" aria-describedby="r-diff-msg">
          <legend className={labelClass}>Difficulty</legend>
          <div className="mt-1.5 flex w-full max-w-xs items-center gap-2">
            <div className="flex flex-1 gap-[2px]">
              {oneToFive.map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`Difficulty ${n} of 5`}
                  aria-pressed={n === difficulty}
                  className={`h-2 flex-1 rounded-[2px] ${n <= difficulty ? difficultyShades[n - 1] : "bg-line"}`}
                />
              ))}
            </div>
            <span className="font-display text-sm font-semibold tabular-nums text-ink">
              {difficulty}<span className="text-muted">/5</span>
            </span>
          </div>
          <p id="r-diff-msg" className="text-xs text-muted">
            Hard is not the same as bad. A course can be five stars and five difficulty.
          </p>
        </fieldset>

        <fieldset className="flex flex-col gap-1.5">
          <legend className={labelClass}>Would you take it again</legend>
          <div className="mt-1.5 flex gap-3">
            {["yes", "no"].map((choice) => (
              <button
                key={choice}
                type="button"
                aria-pressed={choice === takeAgain}
                className={`rounded border px-3 py-1.5 text-xs font-semibold capitalize ${
                  choice === takeAgain ? "border-brand-600 bg-brand-50 text-brand-800" : "border-line bg-surface text-ink hover:bg-brand-50"
                }`}
              >
                {choice}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="r-body" className={labelClass}>What was it actually like</label>
          <textarea
            id="r-body"
            rows="6"
            placeholder="What the work was, what surprised you, what you would tell yourself before registering"
            className={inputClass}
            aria-describedby="r-body-msg"
          />
          <p id="r-body-msg" className="text-xs text-muted">
            Minimum 40 characters. Say something a reader could act on.
          </p>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-card border border-line bg-brand-50/50 p-4">
          <input type="checkbox" className="mt-0.5 h-4 w-4 accent-brand-700" />
          <span>
            <span className="block text-sm font-semibold text-ink">Post this anonymously</span>
            <span className="mt-1 block text-sm text-muted">
              Readers will not see your name. It is still your review &mdash; it appears in My reviews and you can edit or delete it.
            </span>
          </span>
        </label>

        <div className="flex flex-wrap items-center gap-3 border-t border-line pt-6">
          <button type="submit" className="rounded bg-brand-700 px-4 py-2.5 text-sm font-semibold text-paper hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">
            Post review
          </button>
          <Link to="/me/reviews" className="rounded px-4 py-2.5 text-sm font-semibold text-muted hover:bg-brand-50 hover:text-ink">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
