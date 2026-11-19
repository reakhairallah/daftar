import { useEffect, useMemo, useRef, useState } from "react";
import { reviewsForCourse, summarizeReviews } from "../lib/reviewSummaries";
import { courses, homeReviews as reviews } from "../data/mockData";
import AddCourseForm from "../components/comparecomponents/AddCourseForm";
import CompareCard from "../components/comparecomponents/CompareCard";
import EmptySlot from "../components/comparecomponents/EmptySlot";
import { CompareLoading, CompareEmpty, CompareError } from "../components/comparecomponents/CompareStates";

const MAX = 3;
const SIMULATE_ERROR = false; // set to true to see the error state

// Pretends to be a server so loading and error are real states now.
// In Phase 2, replace the body with the API call.
function loadData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (SIMULATE_ERROR) reject(new Error("The server did not answer"));
      else resolve({ courses, reviews });
    }, 400);
  });
}

export default function ComparePage() {
  const [data, setData] = useState(null); // { courses, reviews }
  const [loadState, setLoadState] = useState("loading"); // "loading" | "error" | "ready"
  const [attempt, setAttempt] = useState(0); // bumped by "Try again" to load again
  const [selected, setSelected] = useState([]); // course codes, max 3
  const inputRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    loadData()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setLoadState("ready");
      })
      .catch(() => {
        if (!cancelled) setLoadState("error");
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  function retry() {
    setLoadState("loading");
    setAttempt((a) => a + 1);
  }

  function addCourse(code) {
    setSelected((current) =>
      current.length >= MAX || current.includes(code) ? current : [...current, code]
    );
  }

  // Derived, never stored: recomputed whenever the data or the picks change.
  const cards = useMemo(() => {
    if (!data) return [];
    return selected
      .map((code) => data.courses.find((c) => c.code === code))
      .filter(Boolean)
      .map((course) => ({
        course,
        summary: summarizeReviews(reviewsForCourse(data.reviews, course.code)),
      }));
  }, [data, selected]);

  // The largest single bar across every card. All bars are drawn against it.
  const sharedMaximum = Math.max(
    0,
    ...cards.flatMap(({ summary }) => summary.distribution.map((row) => row.count))
  );

  // The four data states. Only "loading" and "error" are stored;
  // "empty" and "populated" follow from how many courses are picked.
  let content;
  if (loadState === "loading") {
    content = <CompareLoading />;
  } else if (loadState === "error") {
    content = <CompareError onRetry={retry} />;
  } else if (cards.length === 0) {
    content = <CompareEmpty />;
  } else {
    content = (
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ course, summary }) => (
          <CompareCard key={course.code} course={course} summary={summary} sharedMaximum={sharedMaximum} />
        ))}
        {cards.length < MAX && (
          <EmptySlot position={cards.length + 1} onChoose={() => inputRef.current?.focus()} />
        )}
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Compare</h1>
      <p className="mt-2 max-w-prose text-sm text-muted">
        Up to three courses side by side, on the same scales.
      </p>

      <AddCourseForm
        courses={data?.courses ?? []}
        selected={selected}
        onAdd={addCourse}
        onClearAll={() => setSelected([])}
        inputRef={inputRef}
        disabled={loadState !== "ready"}
      />

      <section aria-labelledby="comparison-heading" className="mt-6">
        <h2 id="comparison-heading" className="sr-only">Comparison</h2>
        {content}
      </section>
    </main>
  );
}