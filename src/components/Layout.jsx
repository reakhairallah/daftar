import { Link, NavLink, Outlet } from "react-router-dom";

// NavLink tells us if its link is the current page, so we underline it
const navClass = ({ isActive }) =>
  isActive
    ? "pb-1 text-sm border-b-2 border-brand-600 font-semibold text-ink"
    : "pb-1 text-sm text-muted hover:text-ink";

export default function Layout() {
  return (
    <>
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl items-end gap-7 px-4 pb-3 pt-4">
          <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-ink">
            Daftar
          </Link>
          <nav className="flex gap-6">
            <NavLink to="/me/reviews" className={navClass}>My reviews</NavLink>
            <NavLink to="/reviews/new" className={navClass}>Write a review</NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Outlet />
      </main>
    </>
  );
}