// Calculations stay outside React so every surface can use the same rules.
export function summarizeReviews(reviews = []) {
  const count = reviews.length;
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((review) => review.rating === stars).length,
  }));

  if (count === 0) {
    return { count, distribution, rating: null, difficulty: null, hours: null, again: null };
  }

  const mean = (field) =>
    reviews.reduce((sum, review) => sum + Number(review[field]), 0) / count;

  return {
    count,
    distribution,
    rating: mean("rating"),
    difficulty: mean("difficulty"),
    hours: mean("hoursPerWeek"),
    again: mean("wouldTakeAgain") * 100,
  };
}

export function reviewsForTerm(reviews, termId) {
  return reviews.filter((review) => review.termId === termId);
}

export function reviewsForCourse(reviews, courseCode) {
  return reviews.filter((review) => review.courseCode === courseCode);
}

export function highestRatedCourses(courses, reviews, limit = 3) {
  return courses
    .map((course) => ({
      ...course,
      summary: summarizeReviews(reviewsForCourse(reviews, course.code)),
    }))
    .filter((course) => course.summary.count > 0)
    .sort((a, b) => b.summary.rating - a.summary.rating || a.code.localeCompare(b.code))
    .slice(0, limit);
}
