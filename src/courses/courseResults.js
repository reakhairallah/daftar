import { reviewsForCourse, summarizeReviews } from "../lib/reviewSummaries.js";

export function getCourseResults(
  courses,
  reviews,
  { query = "", department = "", sortBy = "rating" } = {}
) {
  const search = query.trim().toLowerCase();

  return courses
    .filter((course) =>
      `${course.code} ${course.title}`.toLowerCase().includes(search) &&
      (!department || course.department === department)
    )
    .map((course) => ({
      ...course,
      summary: summarizeReviews(reviewsForCourse(reviews, course.code)),
    }))
    .sort((a, b) => {
      // Missing reviews are not a zero rating or an easy workload.
      const reviewedFirst = Number(b.summary.count > 0) - Number(a.summary.count > 0);
      if (reviewedFirst !== 0) return reviewedFirst;

      let difference;
      if (sortBy === "difficulty") {
        difference = a.summary.difficulty - b.summary.difficulty;
      } else if (sortBy === "hours") {
        difference = a.summary.hours - b.summary.hours;
      } else if (sortBy === "count") {
        difference = b.summary.count - a.summary.count;
      } else {
        difference = b.summary.rating - a.summary.rating;
      }

      return difference || a.code.localeCompare(b.code);
    });
}
