import test from "node:test";
import assert from "node:assert/strict";
import { courses, homeReviews, seedUsers } from "../src/data/mockData.js";
import {
  summarizeReviews,
  reviewsForCourse,
  reviewsForTerm,
  highestRatedCourses,
} from "../src/lib/reviewSummaries.js";

test("the featured summary agrees with the reference review distribution", () => {
  const summary = summarizeReviews(reviewsForCourse(homeReviews, "CSC443"));
  assert.equal(summary.count, 38);
  assert.equal(summary.rating.toFixed(1), "4.2");
  assert.deepEqual(summary.distribution.map((row) => row.count), [18, 13, 4, 2, 1]);
  assert.equal(summary.difficulty, 3);
  assert.equal(summary.hours, 7);
  assert.equal(Math.round(summary.again), 89);
});

test("deleting or correcting a review changes the derived summary", () => {
  const reviews = reviewsForCourse(homeReviews, "CSC443");
  const before = summarizeReviews(reviews);
  const afterDelete = summarizeReviews(reviews.slice(1));
  const afterEdit = summarizeReviews(reviews.map((review, index) =>
    index === 0 ? { ...review, rating: 1 } : review
  ));
  assert.equal(afterDelete.count, 37);
  assert.equal(afterDelete.distribution[0].count, 17);
  assert.ok(afterDelete.rating < before.rating);
  assert.equal(afterEdit.rating.toFixed(1), "4.1");
  assert.equal(before.count, 38, "the original reviews were not mutated");
});

test("unreviewed courses have absent measures instead of zero ratings", () => {
  const empty = summarizeReviews([]);
  assert.equal(empty.count, 0);
  for (const key of ["rating", "difficulty", "hours", "again"]) assert.equal(empty[key], null);
  assert.ok(empty.distribution.every((row) => row.count === 0));
});

test("the term-specific top three are sorted by actual means", () => {
  const otherTermReview = { ...homeReviews[0], id: "earlier", termId: "spring-2026", rating: 1 };
  const current = reviewsForTerm([...homeReviews, otherTermReview], "fall-2026");
  const result = highestRatedCourses([
    ...courses,
    { code: "CSC498", title: "Topics", department: "Computer Science" },
  ], current);
  assert.deepEqual(result.map((course) => course.code), ["CSC443", "CSC375", "CSC310"]);
  assert.equal(current.length, 134);
  assert.equal(courses[1].code, "CSC310", "ranking leaves the source order intact");
});

test("seed reviews have valid authors and unique house-rule keys", () => {
  assert.equal(homeReviews.length, 134);
  const userIds = new Set(seedUsers.map((user) => user.id));
  const keys = homeReviews.map((review) => [
    review.authorId, review.courseCode, review.instructorId, review.termId,
  ].join("|"));
  assert.equal(new Set(keys).size, homeReviews.length);
  assert.ok(homeReviews.every((review) => userIds.has(review.authorId)));
  assert.ok(homeReviews.every((review) => review.body.length >= 40));
  assert.ok(seedUsers.every((user) => user.email.endsWith("@lau.edu") && !Object.hasOwn(user, "password")));
});
