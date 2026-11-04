# Daftar — Course & Instructor Reviews

Daftar collects what a course was actually like — with a named instructor, in a named term — and turns it into numbers students can use in registration week. One review per user, per course, per instructor, per term.

---

## Work Division

| File | Surface | Owner |
|---|---|---|
| `01-home.html` | Home — the pitch, a live summary, the highest rated | Cloey |
| `02-courses.html` | Courses — search and filters, four data states | Cloey |
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

Requires Node.js 18 or later.

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

The design pack embeds Newsreader and Libre Franklin inside `styles.css`. We load them separately: _(choose one — Google Fonts link in `index.html`, or self-hosted files in `src/assets/fonts/`)_.

---

## Project structure

```
src/
  components/     shared pieces (RatingSummary, StarRating, DifficultyMeter, ReviewCard, Header)
  pages/          one file per surface (HomePage, ComparePage, AuthPage, ...)
  data/           Phase 1 mock data (users, courses, instructors, reviews)
  lib/            pure functions (summarise reviews, sharedMax, validation)
  App.jsx         routes
  main.jsx        entry point
```

---

## Data model

In short: we store `User`, `Course`, `Instructor` and `Review`. Every average, count and percentage (`CourseSummary`) is computed from the reviews that currently exist. Nothing is cached.