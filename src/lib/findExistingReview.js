export function findExistingReview(reviews, form, userId, editingId) {
  return reviews.find(
    (review) =>
      review.id !== editingId &&
      review.authorId === userId &&
      review.courseCode === form.courseCode &&
      review.instructorId === form.instructorId &&
      review.termId === form.termId
  );
}
