import { useState } from "react";
import CourseCard from "../components/CourseCard";
import { useAppData } from "../state/AppContext";
import { getCourseResults } from "./courseResults";

const fieldClass =
  "w-full rounded border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100";
const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.13em] text-muted";

export default function Courses() {
  const { courses, reviews } = useAppData();
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const visibleCourses = getCourseResults(courses, reviews, {
    query,
    department,
    sortBy,
  });

  function clearFilters() {
    setQuery("");
    setDepartment("");
    setSortBy("rating");
  }

  return (
    <>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
        Courses
      </h1>
      <p className="mt-2 text-sm text-muted">
        Scores are the mean of every review currently posted. Difficulty and hours
        are separate measures, so they get separate columns — never one axis
        pretending to carry both.
      </p>

      <form
        className="mt-6 flex flex-wrap items-end gap-3 rounded-card border border-line bg-surface p-4"
        aria-label="Course filters"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex min-w-0 flex-1 basis-44 flex-col gap-1.5">
          <label htmlFor="q" className={labelClass}>Course code or title</label>
          <input
            id="q"
            name="q"
            type="search"
            className={fieldClass}
            placeholder="CSC443, algorithms"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="flex w-full min-w-0 flex-col gap-1.5 sm:w-56">
          <label htmlFor="dept" className={labelClass}>Department</label>
          <select
            id="dept"
            name="department"
            className={fieldClass}
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            <option value="">All departments</option>
            <option value="Computer Science & Mathematics">Computer Science &amp; Mathematics</option>
            <option value="Psychology">Psychology</option>
          </select>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-1.5 sm:w-44">
          <label htmlFor="sort" className={labelClass}>Sort by</label>
          <select
            id="sort"
            name="sort"
            className={fieldClass}
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="rating">Highest rated</option>
            <option value="difficulty">Easiest</option>
            <option value="hours">Fewest hours</option>
            <option value="count">Most reviewed</option>
          </select>
        </div>

        <button
          type="button"
          className="rounded px-3 py-2.5 text-xs font-semibold text-muted transition hover:bg-brand-50 hover:text-ink"
          onClick={clearFilters}
        >
          Clear
        </button>
        <span className="flex-1" aria-hidden="true" />
        <p role="status" className="font-mono text-xs text-muted">
          {visibleCourses.length} {visibleCourses.length === 1 ? "course" : "courses"}
        </p>
      </form>

      {visibleCourses.length > 0 ? (
        <ul className="mt-5 space-y-3" aria-label="Course results">
          {visibleCourses.map((course) => (
            <CourseCard key={course.code} course={course} reviews={reviews} />
          ))}
        </ul>
      ) : (
        <section className="mt-5 rounded-card border border-dashed border-line bg-surface px-6 py-14 text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            No courses match your filters
          </h2>
          <p className="mt-3 text-sm text-muted">
            Try another course code or title, or clear the filters to see all courses.
          </p>
          <button
            type="button"
            className="mt-7 rounded bg-brand-700 px-4 py-2.5 text-sm font-semibold text-paper hover:bg-brand-800"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </section>
      )}
    </>
  );
}
