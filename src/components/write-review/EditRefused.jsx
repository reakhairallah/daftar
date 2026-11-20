import { Link } from "react-router-dom";

export default function EditRefused({ title, text }) {
  return (
    <section className="max-w-prose">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">{title}</h1>
      <p className="mt-2 text-sm text-muted">{text}</p>
      <Link to="/me/reviews" className="mt-6 inline-flex rounded bg-brand-700 px-4 py-2.5 text-sm font-semibold text-paper hover:bg-brand-800">
        Go to My reviews
      </Link>
    </section>
  );
}
