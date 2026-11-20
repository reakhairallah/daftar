# Daftar — Course & Instructor Reviews

Daftar collects what a course was actually like — with a named instructor, in a named term — and turns it into numbers students can use in registration week. One review per user, per course, per instructor, per term.

**Live:** https://daftar-reviews.vercel.app

---

## Team

**Team Daftar** · CSC443 Web Programming, Fall 2026, Section 31 · Topic 05 · Brief reference `CSC443-F26 · T05 · rev A`

| Member | Student ID |
|---|---|
| Cloey El Cham | 202408147 |
| Nelly Torbey | 202304643 |
| Rea Khairallah | 202404400 |
| Shahd Mughrabi | 202301406 |

---

## Who owns what

Files are listed by the member who committed them. A folder means every file inside it.

| Member | Surfaces (design file → route) | Files |
|---|---|---|
| Cloey | Home (`01-home.html` → `/`)<br>Courses (`02-courses.html` → `/courses`) | `src/home/`, `src/courses/`, `src/state/`, `tests/`<br>`src/components/`: `CourseCard.jsx`, `DataState.jsx`, `RatingSummary.jsx`<br>`src/data/mockData.js`, `src/lib/reviewSummaries.js`, `src/assets/fonts.css` |
| Nelly | Course detail (`03-course.html` → `/courses/:courseId`)<br>Instructor (`04-instructor.html` → `/instructors/:instructorId`) | `src/pages/`: `CourseDetail.jsx`, `Instructor.jsx`<br>`src/components/ReviewList.jsx`, `src/utils/`, `src/data/sampleData.js` |
| Rea | Write a review (`05-write.html` → `/reviews/new`, `/reviews/:reviewId/edit`)<br>My reviews (`06-myreviews.html` → `/me/reviews`) | `src/pages/`: `WriteReview.jsx`, `MyReviews.jsx`, `NotFound.jsx`<br>`src/components/write-review/`, `src/components/my-reviews/`<br>`src/components/`: `StarRating.jsx`, `DifficultyMeter.jsx`, `Badge.jsx`, `SignInRedirect.jsx`<br>`src/lib/`: `validateReview.js`, `findExistingReview.js`, `useUnsavedChangesWarning.js`, `reviewLabels.js`<br>`src/main.jsx`, `vercel.json` |
| Shahd | Compare (`07-compare.html` → `/compare`)<br>Sign in and register (`08-auth.html` → `/signin`, `/register`) | `src/pages/ComparePage.jsx`, `src/pages/auth/`<br>`src/components/comparecomponents/`, `src/components/authcomponents/` |

**Shared:** `src/App.jsx` (everyone added their own routes), `src/components/Layout.jsx` and `src/index.css` (Cloey and Rea).

---

## Tech stack

- **React 19** with **Vite**
- **Tailwind CSS v3.4**
- **React Router v7**
- **ESLint**

Phase 1 has no backend. All data lives in React state and resets when the page reloads.

---

## Getting started

Requires Node.js 20.19+ or 22.12+ (Vite's supported runtime ranges).

```bash
git clone https://github.com/reakhairallah/daftar.git
cd daftar
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

Other scripts:

```bash
npm run build          # production build into dist/
npm run lint           # ESLint
npm run test:home      # Home tests
npm run test:courses   # Courses tests
```

---

## Deployment

The site is deployed on Vercel from the `main` branch; every merge into `main` redeploys it. `vercel.json` rewrites every path to `index.html`, so routes like `/me/reviews` also work when opened directly or refreshed.

---

## Tailwind setup

**The catch:** Daftar uses its own colours and fonts (`text-ink`, `border-line`, `bg-brand-500`, `font-display`…). Those are not built into Tailwind. Without the config below they silently do nothing.

### How it was installed

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

### `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#19151a',      // main text
        muted: '#6b6168',    // secondary text
        line: '#e5deda',     // borders
        paper: '#faf8f5',    // page background
        surface: '#ffffff',  // cards, inputs
        brand: {
          50: '#fbf2f3',
          100: '#f6e2e5',
          300: '#da9aa4',
          400: '#c46c7b',
          500: '#a84a5b',
          600: '#8c3547',
          700: '#72293a',
          800: '#5a2130',
        },
        accent: {
          50: '#fdf8e9',
          400: '#d4a72c',
          500: '#b4891b',
          800: '#554011',
          900: '#33270a',
        },
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'ui-serif', 'serif'],
        body: ['"Libre Franklin"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Fonts

The supplied Newsreader and Libre Franklin font faces are embedded in `src/assets/fonts.css`, imported by `src/index.css`. They load locally and do not depend on Google Fonts or an internet connection.

---

## Project structure

```
src/
  home/           Home surface
  courses/        Courses surface, result states, search and sorting
  pages/          Course detail, Instructor, Write a review, My reviews, Compare, Auth, NotFound
  components/     shared components (Layout, DataState, RatingSummary, StarRating…) plus one folder per surface
  data/           Phase 1 mock data
  state/          shared in-memory data provider
  lib/            plain JS helpers: review calculations, validation, the one-review rule
  utils/          rating calculations used by the Instructor page
  assets/         supplied fonts
  App.jsx         routes
  main.jsx        entry point and router setup
```

---

## Data model

We store four entities, plus the terms a review can belong to. Every average, count and percentage is computed from the reviews that currently exist; nothing is cached.

| Entity | Fields |
|---|---|
| User | `id`, `fullName`, `email`, `major` |
| Course | `code`, `title`, `department`, `credits`, `coRequisite` |
| Instructor | `id`, `name`, `department` |
| Term | `id`, `season`, `year` |
| Review | `id`, `authorId`, `courseCode`, `instructorId`, `termId`, `rating` (1–5), `difficulty` (1–5), `hoursPerWeek`, `wouldTakeAgain`, `body`, `anonymous`, `createdAt`, `updatedAt` |

A review links to its author, course, instructor and term by id. The house rule is one review per `authorId` + `courseCode` + `instructorId` + `termId`.

### Mock data

- **Where:** `src/data/mockData.js`, loaded once by `src/state/AppProvider.jsx`.
- **What:** 4 courses (CSC498 has no reviews yet, on purpose), 1 instructor, 3 terms, 52 users and 134 reviews written as real comments.
- **How pages use it:** every surface calls `useAppData()` from `src/state/AppContext.js`, which returns the data plus `setReviews` and `setCurrentUser`. Because the provider wraps all routes, a review posted or edited on one page shows up everywhere. Nothing is saved to `localStorage`: reloading restores the original data.
- The signed-in user is `u1` (Rea Khairallah), who owns three of the reviews.

---

## Trying the data states

Add `?state=loading`, `?state=empty` or `?state=error` to these pages to see each state:

| Page | Example |
|---|---|
| Home | `/?state=loading` |
| Courses | `/courses?state=empty` |
| Course detail | `/courses/CSC443?state=error` |
| Instructor | `/instructors/abdelnour?state=loading` |
| My reviews | `/me/reviews?state=empty` |

**Try again** removes the state parameter.
