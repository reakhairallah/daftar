import { useState } from "react";

const MAX = 3;

const primaryButton =
  "inline-flex items-center rounded bg-brand-700 px-4 py-2.5 text-xs font-semibold text-paper transition enabled:hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700";
const ghostButton =
  "inline-flex items-center rounded px-4 py-2.5 text-xs font-semibold text-muted transition enabled:hover:bg-brand-50 enabled:hover:text-ink disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700";

// Search box + Add + Clear all. Owns only what the user is typing;
// the list of picked courses lives in ComparePage.
export default function AddCourseForm({ courses, selected, onAdd, onClearAll, inputRef, disabled }) {
  const [query, setQuery] = useState("");

  const full = selected.length >= MAX;
  const q = query.trim().toLowerCase();

  const found = q
    ? courses.filter((c) => c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q))
    : [];
  const matches = found.filter((c) => !selected.includes(c.code)).slice(0, 5);

  let message = "";
  if (full) message = "Three courses is the limit. Clear all to start a new comparison.";
  else if (q && found.length === 0) message = `No course matches “${query.trim()}”.`;
  else if (q && matches.length === 0) message = "That course is already in the comparison.";

  function add(code) {
    onAdd(code);
    setQuery("");
    inputRef.current?.focus();
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (matches.length > 0) add(matches[0].code);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-wrap items-end gap-3 rounded-card border border-line bg-surface p-4"
      >
        <div className="flex min-w-[12rem] flex-1 flex-col gap-1.5">
          <label htmlFor="c-add" className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
            Add a course
          </label>
          <input
            id="c-add"
            ref={inputRef}
            type="search"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={disabled || full}
            aria-describedby="c-add-message"
            placeholder="CSC375, linear algebra"
            className="w-full rounded border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100 disabled:bg-paper"
          />
        </div>

        <button type="submit" disabled={disabled || matches.length === 0} className={primaryButton}>
          Add
        </button>
        <span className="flex-1" />
        <button type="button" onClick={onClearAll} disabled={selected.length === 0} className={ghostButton}>
          Clear all
        </button>

        {matches.length > 0 && (
          <ul className="w-full space-y-1" aria-label="Matching courses">
            {matches.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  onClick={() => add(c.code)}
                  className="flex w-full items-baseline gap-3 rounded px-3 py-2 text-left text-sm hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700"
                >
                  <span className="font-display font-semibold tabular-nums text-brand-700">{c.code}</span>
                  <span className="text-ink">{c.title}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </form>

      <p id="c-add-message" className="mt-2 min-h-4 text-xs text-muted" aria-live="polite">
        {message}
      </p>
    </>
  );
}