export const MAX_HOURS = 30;
export const MIN_BODY = 40;

export function validateReview(form) {
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
