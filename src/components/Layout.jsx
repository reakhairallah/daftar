import { Link, NavLink, Outlet } from "react-router-dom";
import { useAppData } from "../state/AppContext";

const navClass = ({ isActive }) =>
  `border-b-2 pb-1 text-sm ${
    isActive
      ? "border-brand-600 font-semibold text-ink"
      : "border-transparent text-muted hover:text-ink"
  }`;

export default function Layout() {
  const { currentUser, instructors } = useAppData();
  const initials = currentUser?.fullName
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
  const instructorId = instructors[0]?.id;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-surface focus:px-4 focus:py-3"
      >
        Skip to content
      </a>

      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-7 gap-y-3 px-4 pb-3 pt-4">
          <Link to="/" className="flex items-baseline gap-2.5">
            <span className="font-display text-2xl font-semibold tracking-tight text-ink">
              Daftar
            </span>
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.13em] text-muted sm:inline">
              What the course is actually like
            </span>
          </Link>

          <nav
            className="order-last flex w-full flex-wrap gap-x-6 gap-y-3 lg:order-none lg:w-auto"
            aria-label="Main navigation"
          >
            <NavLink to="/courses" className={navClass}>Courses</NavLink>
            {instructorId && (
              <NavLink to={`/instructors/${instructorId}`} className={navClass}>
                Instructors
              </NavLink>
            )}
            {currentUser && (
              <NavLink to="/me/reviews" className={navClass}>My reviews</NavLink>
            )}
          </nav>

          <span className="flex-1" aria-hidden="true" />
          <Link
            to="/reviews/new"
            className="hidden rounded bg-brand-700 px-3 py-2 text-xs font-semibold text-paper transition hover:bg-brand-800 sm:inline-flex"
          >
            Write a review
          </Link>
          {currentUser ? (
            <Link
              to="/me/reviews"
              aria-label={`My reviews, signed in as ${currentUser.fullName}`}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-700 font-display text-[11px] font-semibold text-paper"
            >
              {initials}
            </Link>
          ) : (
            <Link to="/signin" className="text-sm font-semibold text-brand-700 underline underline-offset-4">
              Sign in
            </Link>
          )}
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="mx-auto max-w-6xl px-4 py-10">
        <Outlet />
      </main>

      <footer className="mx-auto mt-20 max-w-6xl border-t border-line px-4 py-8 text-xs text-muted">
        <span className="font-display font-bold tracking-wide">DAFTAR</span>
        {" · CSC443 Web Programming · Fall 2026"}
      </footer>
    </>
  );
}
