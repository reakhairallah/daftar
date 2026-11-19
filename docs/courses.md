# Courses surface

Reference: `02-courses.html` and the shared component guidance in the Daftar design pack.

## Files

- `src/courses/Courses.jsx`: heading, controlled search/filter/sort fields, count, state URL, and retry.
- `src/courses/courseResults.js`: case-insensitive search, combined department filtering, and sorting by calculated summaries.
- `src/courses/CourseResults.jsx`: populated rows, loading skeletons, error/retry, an unreviewed course, and no search matches.
- `src/components/CourseCard.jsx`: shared course metrics and outgoing links.
- `src/data/mockData.js`: four provisional courses and the shared review fixtures; CSC498 has no reviews.
- `tests/courses.test.mjs` and `tests/courses-render.test.mjs`: calculation and rendered-state checks.

## Behaviour

Courses reads `useAppData()` from the existing provider. Filtering and sorting derive a new result list without changing the catalogue or reviews. Every metric includes all posted reviews for the course, across terms. Reviewed courses sort before unreviewed courses; tied values sort by course code. Clear restores all departments, an empty search, and Highest rated.

## Demonstration URLs

| Path | Display |
| --- | --- |
| `/courses` | Shared catalogue with calculated metrics |
| `/courses?state=loading` | Two skeleton course rows |
| `/courses?state=empty` | Existing CSC498 without reviews and its first-review link |
| `/courses?state=error` | Plain-language failure and retry |
| `/courses?state=error&keep=example` | Retry preserves `keep=example` and current filter selections |

These URLs simulate Phase 1 states; no backend requests are made. On the normal route, search CSC498 for a natural empty-review example. A search with no matching courses offers Clear filters rather than asking for a review.

## Checks and integration

Run `npm run test:courses`, `npm run test:home`, and `npm run build`. Browser checks include search, all four sorts, Clear, retry, keyboard focus, and a 390px viewport without horizontal overflow.

Course links use `/courses/:courseId` with the course code. First-review links use `/reviews/new?course=CSC498` (or the relevant code); the owning form must read that parameter. Course detail and review screens still require team integration. Home is inherited from cloey/home, so the Courses branch includes those Home commits; merge ordering should account for that dependency.

## Browser verification

- Layouts at 390px, 768px, and 1280px stayed within the available width. Loading, empty, and error layouts also fit at 390px.
- Search, all sort choices, department filtering, Clear, no matches, and the unreviewed CSC498 panel worked in the browser.
- Retry retained the algorithms search and kept the unrelated keep=example URL parameter while removing state.
- The skip link focused main-content; Tab reached the department control with visible focus. No browser errors or warnings were recorded.
- Automated checks: 12 Courses checks, 10 Home checks, and the production build passed.
- Captured views: [390px phone](screenshots/courses-mobile.jpg) and [desktop](screenshots/courses-desktop.jpg).
