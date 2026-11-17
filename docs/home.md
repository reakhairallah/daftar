# Home surface

Reference: `01-home.html` and `components.html` in the Daftar design pack (`CSC443-F26 · T05 · rev A`).

## Files

- `src/home/Home.jsx`: introduction, featured rating summary, highest-rated list, and policies.
- `src/components/Layout.jsx`: shared header, footer, keyboard skip link, and routed content area.
- `src/components/RatingSummary.jsx`: mean rating and five directly labeled distribution bars.
- `src/components/CourseCard.jsx`: course link, rating, separate difficulty meter, weekly hours, and take-again percentage.
- `src/components/DataState.jsx`: loading, empty, error, and populated content.
- `src/lib/reviewSummaries.js`: the calculations used by both summary components and the ranking.
- `src/data/mockData.js`: provisional course, review, user, instructor, and term fixtures.
- `src/state/AppProvider.jsx` and `AppContext.js`: shared in-memory state and the `useAppData` hook.
- `src/home/homeData.js`: compatibility exports for the old fixture imports.
- `src/assets/fonts.css`: the supplied Newsreader and Libre Franklin font assets, embedded for offline use.

## Data flow

`AppProvider` wraps the routed layout once. Home and Layout read it with `useAppData()`. Route changes keep that provider mounted. Reloading restores the fixtures; no localStorage is used.

Home filters reviews to `fall-2026`, then filters the featured card to `CSC443`. The highest-rated list computes each course's mean, excludes unreviewed courses, sorts by the unrounded mean, and takes three. The same calculation helper provides all displayed counts, distributions, difficulty, hours, and percentages. Summaries are never stored on course records.

The fixture distribution expands into 134 individual reviews across three courses. CSC443 has 38 reviews and a mean of 159 / 38, displayed as 4.2. The ranking is CSC443, CSC375, CSC310. This follows calculated values rather than the illustrative reference order. All author/course/instructor/term keys are unique.

`RatingSummary` accepts a course and term label rather than fixing these inside the component. It also accepts `sharedMaximum`; a future comparison surface should pass the maximum bucket count across every displayed distribution.

## Shared state integration

The initial signed-in fixture is Rea Khairallah (`u1`). The header computes initials from `currentUser.fullName`; setting `currentUser` to null shows Sign in and removes the personal-review link. Authentication UI and its validation remain owned by the auth surface.

Other surfaces must read this provider rather than create their own independent review state. Its current integration API exposes `reviews`, `setReviews`, `users`, `setUsers`, `currentUser`, `setCurrentUser`, `courses`, `instructors`, and `terms`.

For example, after the owning review surface has checked ownership and confirmed a deletion:

```jsx
const { setReviews } = useAppData();
setReviews((current) => current.filter((review) => review.id !== reviewId));
```

Home will calculate its summaries from the updated array on the next render. The provider supplies shared state; validation, ownership checks, and duplicate-review rejection still belong in the team's mutation actions/forms. The existence of unique fixtures is not runtime enforcement of the house rule.

## Reproducible states

Open the Home route and append one of these query strings:

| URL | Expected result |
| --- | --- |
| `/` | Populated summary and list |
| `/?state=loading` | Two loading regions; introduction and policies stay visible |
| `/?state=empty` | Two empty regions with a review action |
| `/?state=error` | Two errors with retry actions |
| `/?state=error&keep=example` | Retry removes only `state`, preserving `keep=example` |

These are deliberate Phase 1 simulations. Loading stays visible until the URL changes. Real empty review arrays also trigger the empty UI without a query parameter.

## Route handoff

The Courses branch includes the completed Home implementation and the Courses route. Other owners' completed screens still need integration. The outgoing route contracts are:

| Destination | Route | Current status in this branch |
| --- | --- | --- |
| Courses | `/courses` | Implemented on cloey/courses; team merge pending |
| Course detail | `/courses/:courseId` | Matches Nelly's branch; merge still required |
| Instructor | `/instructors/:id` | Expected profile route; default header link opens Abdelnour |
| Write review | `/reviews/new` | Team starter placeholder currently present |
| My reviews | `/me/reviews` | Team starter placeholder currently present |
| Sign in | `/signin` | Matches Shahd's branch; merge still required |

Until those route elements are merged, unmatched destinations use the existing NotFound screen. Do not describe these destinations as complete or deployed. No teammate branch has been merged by the Home changes.

## Checks

```sh
npm run test:home
npm run build
```

The checks cover reference calculations, ranking, deletion/update recalculation, empty arrays, unique review keys, the three simulated states, and the signed-in/signed-out header variants. They also verify that Home renders the review array supplied by the shared provider.

Browser checks should include 390px phone, tablet, and desktop layouts; no horizontal scrolling; visible Tab focus; skip-to-content; and Try again restoring data while preserving unrelated query parameters.

Screenshots are stored in `docs/screenshots/` when captured. Add updated screenshots after merging the team's destination pages. The full team README still needs real student IDs, its live URL, and the final surface/file ownership mapping.


## Verification record

- `npm run test:home`: all 10 checks passed.
- `npm run build`: passed.
- Browser rendered the updated Home with the local fonts and reference-style header. Desktop and phone screenshots were visually reviewed.
- Viewports 1280px, 768px, and 390px: document width stayed within the viewport; no horizontal overflow.
- `state=loading`: two status regions. `state=empty`: both empty regions. `state=error`: two alerts.
- Clicking Try again restored the 38-review featured card, removed `state`, and preserved `keep=example`.
- Skip to content focused `main-content`; Tab continued to Find a course with a visible solid outline.
- Browser console: no errors or warnings during these checks.
- Signed-in, other-user, signed-out, and provider-supplied updated/deleted review cases were checked by the rendering tests.
- Screenshots: [desktop](screenshots/home-desktop.png), [390px phone](screenshots/home-mobile.png).

No commit, push, branch merge, or Git author-setting change was made for this update. The other surface destinations and their validated mutation/auth actions remain the route owners' integration work.
