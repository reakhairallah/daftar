# Daftar — Course & Instructor Reviews

Daftar collects what a course was actually like — with a named instructor, in a named term — and turns it into numbers students can use in registration week. One review per user, per course, per instructor, per term.

---

## Work Division

| File | Surface | Owner |
|---|---|---|
| `01-home.html` → `src/home/Home.jsx` | Home — the pitch, a live summary, the highest rated | Cloey |
| `02-courses.html` → `src/courses/Courses.jsx` | Courses — search and filters, four data states | Cloey |
| `03-course.html` | Course detail — the summary, the reviews, three viewer variants | Nelly |
| `04-instructor.html` | Instructor — their courses, and the honest way to average them | Nelly |
| `05-write.html` | Write a review — validation, anonymity, the one-review rule refusing | Rea |
| `06-myreviews.html` | My reviews — everything you wrote, anonymous ones included | Rea |
| `07-compare.html` | Compare — up to three courses on one shared scale | Shahd |
| `08-auth.html` | Sign in and register — both states, plus a rejected sign-in | Shahd |

---

## Tech stack

**Frontend**

- **React** with **Vite**
- **Tailwind CSS v3.4**
- **React Router**

**Backend**

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
  components/     shared Layout, CourseCard, RatingSummary, DataState
  pages/          starter review pages and NotFound; teammate pages await integration
  data/           Phase 1 mock data (users, courses, instructors, terms, reviews)
  lib/            shared review calculations
  state/          shared in-memory data provider
  assets/         supplied fonts
  App.jsx         routes
  main.jsx        entry point
```

---

## Data model

In short: we store `User`, `Course`, `Instructor` and `Review`. Every average, count and percentage (`CourseSummary`) is computed from the reviews that currently exist. Nothing is cached.

---

## Home implementation

Reference: `CSC443-F26 · T05 · rev A`. Home's React source is `src/home/Home.jsx`. Shared fixture data lives in `src/data/mockData.js`; the single shared in-memory provider is `src/state/AppProvider.jsx`. No localStorage or backend is used. Other surfaces should use `useAppData()` from `src/state/AppContext.js` so review changes update Home's summaries too.

The Home route supports `?state=loading`, `?state=empty`, and `?state=error`. Try again removes only the state parameter. Home includes the populated rating summary, a calculated top three for Fall 2026, the three review-policy cards, and shared navigation/footer.

Run `npm run test:home` and `npm run build` to check it. The header uses the seeded current user and derives their initials from their name; a null current user renders the signed-out variant.

See [Home implementation and route handoff](docs/home.md) for file ownership, data flow, test URLs, and integration details. Home and Courses are connected in this branch. Course detail, instructor, review, and sign-in destinations still need the team's completed pages integrated. Full team submission details (student IDs, live URL, remaining file mappings) still need to be supplied by the team.

## Courses implementation

Reference: `02-courses.html` in the supplied design pack. The route is `/courses`, implemented in `src/courses/Courses.jsx`. It reuses the shared provider, course cards, and review calculations.

Search matches course codes and titles without case sensitivity. Department and search filters combine. Sort options use calculated rating, difficulty, weekly hours, or review count; courses without reviews appear last. Averages include all posted reviews across terms. The provisional catalogue has four courses, including unreviewed CSC498.

Use `/courses?state=loading`, `/courses?state=empty`, and `/courses?state=error` to demonstrate the required states. Searching CSC498 also shows a genuine no-review state, separately from a search with no matching courses. Retry removes only the state parameter and retains the current filter selections.

Run `npm run test:courses`, `npm run test:home`, and `npm run build`. See [Courses files and integration](docs/courses.md) for the file mapping, state examples, and remaining team route connections.
