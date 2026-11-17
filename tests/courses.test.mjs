import test from "node:test";
import assert from "node:assert/strict";
import { courses, homeReviews } from "../src/data/mockData.js";
import { getCourseResults } from "../src/courses/courseResults.js";

const codes = (results) => results.map((course) => course.code);

test("search matches course codes and titles, ignoring case and outer spaces", () => {
  assert.deepEqual(codes(getCourseResults(courses, homeReviews, { query: " cSc443 " })), ["CSC443"]);
  assert.deepEqual(codes(getCourseResults(courses, homeReviews, { query: "ALGORITHMS" })), ["CSC310"]);
  assert.deepEqual(getCourseResults(courses, homeReviews, { query: "not a course" }), []);
});

test("department and search both apply, with an empty department showing all", () => {
  const catalogue = [
    ...courses,
    { code: "PSY101", title: "Introduction to Psychology", department: "Psychology" },
  ];
  assert.deepEqual(codes(getCourseResults(catalogue, homeReviews, { department: "Psychology" })), ["PSY101"]);
  assert.deepEqual(getCourseResults(catalogue, homeReviews, { department: "Psychology", query: "CSC" }), []);
  assert.equal(getCourseResults(catalogue, homeReviews).length, 5);
});

test("each sort uses the corresponding computed measure", () => {
  assert.deepEqual(codes(getCourseResults(courses, homeReviews)), ["CSC443", "CSC375", "CSC310", "CSC498"]);
  for (const sortBy of ["difficulty", "hours"]) {
    assert.deepEqual(codes(getCourseResults(courses, homeReviews, { sortBy })), ["CSC443", "CSC375", "CSC310", "CSC498"]);
  }
  assert.deepEqual(codes(getCourseResults(courses, homeReviews, { sortBy: "count" })), ["CSC310", "CSC375", "CSC443", "CSC498"]);

  // These samples ensure difficulty and hours are separate, independent sorts.
  const independentReviews = [
    { ...homeReviews[0], courseCode: "CSC443", difficulty: 5, hoursPerWeek: 1 },
    { ...homeReviews[0], courseCode: "CSC375", difficulty: 1, hoursPerWeek: 5 },
  ];
  assert.deepEqual(codes(getCourseResults(courses, independentReviews, { sortBy: "difficulty" })), ["CSC375", "CSC443", "CSC310", "CSC498"]);
  assert.deepEqual(codes(getCourseResults(courses, independentReviews, { sortBy: "hours" })), ["CSC443", "CSC375", "CSC310", "CSC498"]);
});

test("unreviewed courses stay last and input arrays keep their original order", () => {
  const catalogue = [{ code: "TEST100", title: "Topics", department: "Computer Science & Mathematics" }, ...courses];
  const originalCodes = codes(catalogue);
  const originalReviewIds = homeReviews.map((review) => review.id);
  for (const sortBy of ["rating", "difficulty", "hours", "count"]) {
    const results = getCourseResults(catalogue, homeReviews, { sortBy });
    assert.equal(results.at(-1).code, "TEST100");
    assert.equal(results.at(-1).summary.rating, null);
  }
  assert.deepEqual(codes(catalogue), originalCodes);
  assert.deepEqual(homeReviews.map((review) => review.id), originalReviewIds);
});

test("updated reviews change ordering and include reviews from every term", () => {
  const reviews = [
    { ...homeReviews[0], courseCode: "CSC443", rating: 1, termId: "spring-2026" },
    { ...homeReviews[0], courseCode: "CSC443", rating: 5 },
    { ...homeReviews[0], courseCode: "CSC375", rating: 4 },
  ];
  assert.deepEqual(codes(getCourseResults(courses, reviews)), ["CSC375", "CSC443", "CSC310", "CSC498"]);
  assert.equal(getCourseResults(courses, reviews).find((course) => course.code === "CSC443").summary.rating, 3);
  assert.deepEqual(codes(getCourseResults(courses, reviews.slice(1))), ["CSC443", "CSC375", "CSC310", "CSC498"]);
});
