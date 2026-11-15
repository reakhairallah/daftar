import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SelectField from "../components/write-review/SelectField";
import TextField from "../components/write-review/TextField";
import StarRating from "../components/StarRating";
import DifficultyMeter from "../components/DifficultyMeter";
import FieldMessage from "../components/write-review/FieldMessage";
import AlreadyReviewedNotice from "../components/write-review/AlreadyReviewedNotice";
import EditRefused from "../components/write-review/EditRefused";
import { labelClass } from "../components/write-review/fieldStyles";
import { validateReview, MIN_BODY } from "../lib/validateReview";
import { findExistingReview } from "../lib/findExistingReview";
import { useUnsavedChangesWarning } from "../lib/useUnsavedChangesWarning";

// TEMP: same shape as Cloey's useAppData(). Replace with: const { courses, instructors, terms, reviews, setReviews, currentUser } = useAppData();
const courses = [
  { code: "CSC443", title: "Web Programming" },
  { code: "CSC310", title: "Algorithms" },
  { code: "CSC375", title: "Database Management" },
];
const instructors = [
  { id: "abdelnour", name: "Nagib Abdelnour" },
  { id: "farhat", name: "Mohammad Farhat" },
];
const terms = [
  { id: "fall-2026", season: "Fall", year: 2026 },
  { id: "summer-2026", season: "Summer", year: 2026 },
  { id: "spring-2026", season: "Spring", year: 2026 },
];
const reviews = [
  {
    id: "r1", authorId: "u1", courseCode: "CSC443", instructorId: "abdelnour", termId: "fall-2026",
    rating: 5, difficulty: 3, hoursPerWeek: 7, wouldTakeAgain: true, anonymous: false,
    body: "In CSC443, the weekly examples made the difficult concepts easier to follow.",
    createdAt: "2026-10-14", updatedAt: null,
  },
  {
    id: "CSC310-r1", authorId: "u1", courseCode: "CSC310", instructorId: "abdelnour", termId: "fall-2026",
    rating: 5, difficulty: 5, hoursPerWeek: 11, wouldTakeAgain: true, anonymous: false,
    body: "In CSC310, the pace picked up after the midterm, so planning ahead helped.",
    createdAt: "2026-10-14", updatedAt: null,
  },
  {
    id: "r2", authorId: "u2", courseCode: "CSC443", instructorId: "farhat", termId: "spring-2026",
    rating: 4, difficulty: 3, hoursPerWeek: 6, wouldTakeAgain: true, anonymous: false,
    body: "In CSC443, the assessments rewarded understanding more than memorization.",
    createdAt: "2026-05-02", updatedAt: null,
  },
];
const currentUser = { id: "u1", fullName: "Rea Khairallah" };
const setReviews = (newList) => console.log("TEMP saved:", newList);

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

function reviewToForm(review) {
  return {
    courseCode: review.courseCode,
    instructorId: review.instructorId,
    termId: review.termId,
    hoursPerWeek: String(review.hoursPerWeek),
    rating: review.rating,
    difficulty: review.difficulty,
    wouldTakeAgain: review.wouldTakeAgain,
    body: review.body,
    anonymous: review.anonymous,
  };
}

export default function WriteReview() {
  const { reviewId } = useParams();
  return <ReviewForm key={reviewId ?? "new"} reviewId={reviewId} />;
}

function ReviewForm({ reviewId }) {
  const editingReview = reviews.find((review) => review.id === reviewId);
  const isEditing = Boolean(editingReview);

  const initialForm = isEditing ? reviewToForm(editingReview) : emptyForm;

  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const existingReview = findExistingReview(reviews, form, currentUser.id, editingReview?.id);
  const existingReviewPath = existingReview && `/reviews/${existingReview.id}/edit`;

  const hasUnsavedChanges = !saved && JSON.stringify(form) !== JSON.stringify(initialForm);
  useUnsavedChangesWarning(hasUnsavedChanges, existingReviewPath);

  useEffect(() => {
    if (saved) navigate("/me/reviews");
  }, [saved, navigate]);

  if (reviewId && !editingReview) {
    return <EditRefused title="This review does not exist" text="It may have been deleted, or the link is wrong." />;
  }
  if (editingReview && editingReview.authorId !== currentUser.id) {
    return <EditRefused title="You can only edit your own reviews" text="This review was written by someone else." />;
  }

  const errors = validateReview(form);

  const shownErrors = {};
  for (const name in errors) {
    if (touched[name] || submitAttempted) shownErrors[name] = errors[name];
  }

  const shownErrorCount = Object.keys(shownErrors).length;

  const courseOptions = courses.map((c) => ({ value: c.code, label: `${c.code} · ${c.title}` }));
  const instructorOptions = instructors.map((i) => ({ value: i.id, label: i.name }));
  const termOptions = terms.map((t) => ({ value: t.id, label: `${t.season} ${t.year}` }));

  function updateField(name, value) {
    setForm({ ...form, [name]: value });
    setTouched({ ...touched, [name]: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitAttempted(true);

    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors || existingReview) return;

    const fields = { ...form, hoursPerWeek: Number(form.hoursPerWeek), body: form.body.trim() };
    const today = new Date().toISOString().slice(0, 10);

    if (isEditing) {
      const updatedReview = { ...editingReview, ...fields, updatedAt: today };
      setReviews(reviews.map((review) => (review.id === editingReview.id ? updatedReview : review)));
    } else {
      const newReview = { ...fields, id: crypto.randomUUID(), authorId: currentUser.id, createdAt: today, updatedAt: null };
      setReviews([...reviews, newReview]);
    }
    setSaved(true);
  }

  return (
    <>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
        {isEditing ? "Edit your review" : "Write a review"}
      </h1>
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

        {existingReview && (
          <AlreadyReviewedNotice review={existingReview} editPath={existingReviewPath} instructors={instructors} terms={terms} />
        )}

        <fieldset
          className="flex flex-col gap-1.5"
          aria-describedby={shownErrors.rating ? "r-rating-msg" : undefined}
        >
          <legend className={labelClass}>Overall rating</legend>
          <div className="mt-1.5">
            <StarRating value={form.rating} onChange={(value) => updateField("rating", value)} />
          </div>
          <FieldMessage id="r-rating-msg" error={shownErrors.rating} />
        </fieldset>

        <fieldset className="flex flex-col gap-1.5" aria-describedby="r-diff-msg">
          <legend className={labelClass}>Difficulty</legend>
          <div className="mt-1.5 max-w-xs">
            <DifficultyMeter value={form.difficulty} onChange={(value) => updateField("difficulty", value)} />
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
          help={`Minimum ${MIN_BODY} characters. Say something a reader could act on.`}
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
            {isEditing ? "Save changes" : "Post review"}
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
