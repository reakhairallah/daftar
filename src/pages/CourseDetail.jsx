import { Link, useParams } from "react-router-dom";

export default function CourseDetail() {
  const { courseId } = useParams();

  return (
    <>
      {/* Breadcrumb navigation */}
      <nav
        className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted"
        aria-label="Breadcrumb"
      >
        <Link to="/courses" className="hover:text-ink">
          Courses
        </Link>
        <span className="mx-2 text-brand-500">/</span>
        {courseId}
      </nav>

      {/* Course information */}
      <section className="mt-4">
        <p className="text-sm font-semibold text-brand-700">{courseId}</p>

        <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight text-ink">
          Course Detail
        </h1>

        <p className="mt-2 text-sm text-muted">
          Course information and student reviews will appear here.
        </p>
      </section>
    </>
  );
}
