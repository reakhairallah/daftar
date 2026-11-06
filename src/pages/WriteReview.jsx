import { useState } from "react";
import { Link } from "react-router-dom";
import SelectField from "../components/write-review/SelectField";
import TextField from "../components/write-review/TextField";
import FieldMessage from "../components/write-review/FieldMessage";
import { labelClass } from "../components/write-review/fieldStyles";

// TEMP: hard-coded lists
const courses = [
  { code: "CSC443", title: "Web Programming" },
  { code: "CSC375", title: "Database Management" },
];
const instructors = [
  { id: "abdelnour", name: "Nagib Abdelnour" },
  { id: "farhat", name: "Mohammad Farhat" },
];
const terms = [
  { id: "fall-2026", season: "Fall", year: 2026 },
  { id: "spring-2026", season: "Spring", year: 2026 },
  { id: "fall-2025", season: "Fall", year: 2025 },
];

const courseOptions = courses.map((c) => ({ value: c.code, label: `${c.code} · ${c.title}` }));
const instructorOptions = instructors.map((i) => ({ value: i.id, label: i.name }));
const termOptions = terms.map((t) => ({ value: t.id, label: `${t.season} ${t.year}` }));

const emptyForm = {
  courseCode: "",
  instructorId: "",
  termId: "",
  hoursPerWeek: "",
  rating: 0,
  difficulty: 0,
  wouldTakeAgain: null,
  body: "",
  anonymous: false,
};

const MAX_HOURS = 30;
const MIN_BODY = 40;

function validate(form) {
  const errors = {};
  if (!form.courseCode) errors.courseCode = "Choose the course you took.";
  if (!form.instructorId) errors.instructorId = "Choose who taught it.";
  if (!form.termId) errors.termId = "Choose the term you took it.";

  const hours = Number(form.hoursPerWeek);
  if (form.hoursPerWeek === "") errors.hoursPerWeek = "Enter the hours a week, a rough guess is fine.";
  else if (!Number.isInteger(hours) || hours < 0) errors.hoursPerWeek = "Enter a whole number of hours.";
  else if (hours > MAX_HOURS) errors.hoursPerWeek = `${hours} hours a week on one three-credit course is almost certainly a typo.`;

  if (!form.rating) errors.rating = "Choose a rating from 1 to 5 stars.";
  if (!form.difficulty) errors.difficulty = "Choose a difficulty from 1 to 5.";
  if (form.wouldTakeAgain === null) errors.wouldTakeAgain = "Choose yes or no.";

  const length = form.body.trim().length;
  if (length < MIN_BODY) errors.body = `Write at least ${MIN_BODY} characters (${length} so far).`;
  return errors;
}

const oneToFive = [1, 2, 3, 4, 5];
const difficultyShades = ["bg-brand-300", "bg-brand-400", "bg-brand-500", "bg-brand-600", "bg-brand-700"];

export default function WriteReview() {
  const [form, setForm] = useState(emptyForm);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const errors = validate(form);

  const shownErrors = {};
  for (const name in errors) {
    if (touched[name] || submitAttempted) shownErrors[name] = errors[name];
  }

  const shownErrorCount = Object.keys(shownErrors).length;

  function updateField(name, value) {
    setForm({ ...form, [name]: value });
    setTouched({ ...touched, [name]: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitAttempted(true);
  }

  return (
    <>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Write a review</h1>
      <p className="mt-2 max-w-prose text-sm text-muted">
        One review per course, per instructor, per term. You can come back and edit it; you cannot post a second one.
      </p>

      <form className="mt-10 max-w-3xl space-y-7" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <SelectField
            id="r-course"
            label="Course"
            options={courseOptions}
            value={form.courseCode}
            onChange={(value) => updateField("courseCode", value)}
            error={shownErrors.courseCode}
          />

          <SelectField
            id="r-inst"
            label="Instructor"
            options={instructorOptions}
            value={form.instructorId}
            onChange={(value) => updateField("instructorId", value)}
            error={shownErrors.instructorId}
            help="Reviews are tied to who taught it. The same course with a different instructor is a different review."
          />

          <SelectField
            id="r-term"
            label="Term"
            options={termOptions}
            value={form.termId}
            onChange={(value) => updateField("termId", value)}
            error={shownErrors.termId}
          />

          <TextField
            id="r-hours"
            label="Hours a week, outside class"
            type="number"
            min="0"
            value={form.hoursPerWeek}
            onChange={(value) => updateField("hoursPerWeek", value)}
            error={shownErrors.hoursPerWeek}
          />
        </div>

        <fieldset
          className="flex flex-col gap-1.5"
          aria-describedby={shownErrors.rating ? "r-rating-msg" : undefined}
        >
          <legend className={labelClass}>Overall rating</legend>
          <div className="mt-1.5 flex items-center gap-3">
            <div className="flex gap-1">
              {oneToFive.map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  aria-pressed={n === form.rating}
                  onClick={() => updateField("rating", n)}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded border ${
                    n <= form.rating ? "border-accent-400 bg-accent-50" : "border-line bg-surface"
                  }`}
                >
                  <svg viewBox="0 0 20 20" className={`h-5 w-5 ${n <= form.rating ? "text-accent-400" : "text-line"}`} fill="currentColor" aria-hidden="true">
                    <path d="M10 1.8l2.5 5.1 5.6.8-4 4 .9 5.6-5-2.6-5 2.6.9-5.6-4-4 5.6-.8z" />
                  </svg>
                </button>
              ))}
            </div>
            <span className="font-display text-lg font-semibold tabular-nums text-ink">{form.rating || "–"}</span>
          </div>
          <FieldMessage id="r-rating-msg" error={shownErrors.rating} />
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
                  aria-pressed={n === form.difficulty}
                  onClick={() => updateField("difficulty", n)}
                  className={`h-2 flex-1 rounded-[2px] ${n <= form.difficulty ? difficultyShades[n - 1] : "bg-line"}`}
                />
              ))}
            </div>
            <span className="font-display text-sm font-semibold tabular-nums text-ink">
              {form.difficulty || "–"}<span className="text-muted">/5</span>
            </span>
          </div>
          <FieldMessage
            id="r-diff-msg"
            error={shownErrors.difficulty}
            help="Hard is not the same as bad. A course can be five stars and five difficulty."
          />
        </fieldset>

        <fieldset
          className="flex flex-col gap-1.5"
          aria-describedby={shownErrors.wouldTakeAgain ? "r-again-msg" : undefined}
        >
          <legend className={labelClass}>Would you take it again</legend>
          <div className="mt-1.5 flex gap-3">
            {[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ].map((choice) => (
              <button
                key={choice.label}
                type="button"
                aria-pressed={choice.value === form.wouldTakeAgain}
                onClick={() => updateField("wouldTakeAgain", choice.value)}
                className={`rounded border px-3 py-1.5 text-xs font-semibold ${
                  choice.value === form.wouldTakeAgain ? "border-brand-600 bg-brand-50 text-brand-800" : "border-line bg-surface text-ink hover:bg-brand-50"
                }`}
              >
                {choice.label}
              </button>
            ))}
          </div>
          <FieldMessage id="r-again-msg" error={shownErrors.wouldTakeAgain} />
        </fieldset>

        <TextField
          id="r-body"
          label="What was it actually like"
          multiline
          rows="6"
          placeholder="What the work was, what surprised you, what you would tell yourself before registering"
          value={form.body}
          onChange={(value) => updateField("body", value)}
          error={shownErrors.body}
          help="Minimum 40 characters. Say something a reader could act on."
        />

        <label className="flex cursor-pointer items-start gap-3 rounded-card border border-line bg-brand-50/50 p-4">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 accent-brand-700"
            checked={form.anonymous}
            onChange={(e) => updateField("anonymous", e.target.checked)}
          />
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
          <span className="flex-1" />
          <p aria-live="polite" className="text-xs font-semibold text-red-700">
            {shownErrorCount === 1 && "One field needs attention"}
            {shownErrorCount > 1 && `${shownErrorCount} fields need attention`}
          </p>
        </div>
      </form>
    </>
  );
}
