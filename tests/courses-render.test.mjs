import { before, after, test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { courses, homeReviews } from "../src/data/mockData.js";
import { getCourseResults } from "../src/courses/courseResults.js";

let server;
let Courses;
let CourseResults;
let AppProvider;

before(async () => {
  server = await createServer({
    root: path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
    configFile: false,
    plugins: [react()],
    logLevel: "error",
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  Courses = (await server.ssrLoadModule("/src/courses/Courses.jsx")).default;
  CourseResults = (await server.ssrLoadModule("/src/courses/CourseResults.jsx")).default;
  AppProvider = (await server.ssrLoadModule("/src/state/AppProvider.jsx")).default;
});

after(async () => { await server?.close(); });

function render(Component, url = "/courses", providerProps = {}, componentProps = {}) {
  return renderToStaticMarkup(
    createElement(MemoryRouter, { initialEntries: [url] },
      createElement(AppProvider, providerProps, createElement(Component, componentProps))
    )
  );
}

test("populated Courses shows the shared catalogue and computed ranking", () => {
  const html = render(Courses);
  assert.match(html, /4 courses/);
  const positions = ["CSC443", "CSC375", "CSC310", "CSC498"].map((code) => html.indexOf(`href="/courses/${code}"`));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.match(html, /No reviews yet/);
});

test("loading reserves course rows while hiding populated results", () => {
  const html = render(Courses, "/courses?state=loading");
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /Loading course results/);
  assert.equal((html.match(/<li /g) ?? []).length, 2);
  assert.doesNotMatch(html, /href="\/courses\/CSC443"/);
});

test("error gives plain language and a retry button", () => {
  const html = render(Courses, "/courses?state=error&keep=example");
  assert.match(html, /role="alert"/);
  assert.match(html, /The course list would not load/);
  assert.match(html, />Try again<\/button>/);
  assert.doesNotMatch(html, /href="\/courses\/CSC443"/);
});

test("the empty demonstration names an existing course and offers its first review", () => {
  assert.ok(courses.some((course) => course.code === "CSC498"));
  assert.ok(!homeReviews.some((review) => review.courseCode === "CSC498"));
  const html = render(Courses, "/courses?state=empty");
  assert.match(html, /1 course/);
  assert.match(html, /Nobody has reviewed CSC498 yet/);
  assert.match(html, /href="\/reviews\/new\?course=CSC498"/);
  assert.doesNotMatch(html, /No courses match|NaN|Infinity/);
});

test("a real search for an unreviewed course uses the same empty review panel", () => {
  const results = getCourseResults(courses, homeReviews, { query: "CSC498" });
  const html = render(CourseResults, "/courses", {}, {
    state: "populated", courses: results, reviews: homeReviews,
  });
  assert.match(html, /Nobody has reviewed CSC498 yet/);
  assert.match(html, /Write the first review/);
  assert.doesNotMatch(html, /No courses match/);
});

test("zero search matches offer clearing filters rather than writing a review", () => {
  const html = render(CourseResults, "/courses", {}, {
    state: "populated", courses: [], reviews: homeReviews,
  });
  assert.match(html, /No courses match your filters/);
  assert.match(html, /Clear filters/);
  assert.doesNotMatch(html, /Write the first review|Nobody has reviewed/);
});

test("deleted reviews and signed-out viewers use the same shared catalogue", () => {
  const empty = render(Courses, "/courses", { initialReviews: [], initialUser: null });
  assert.equal((empty.match(/No reviews yet/g) ?? []).length, 4);
  assert.doesNotMatch(empty, /NaN|Infinity/);
  const unknownState = render(Courses, "/courses?state=unknown");
  assert.match(unknownState, /href="\/courses\/CSC443"/);
});
