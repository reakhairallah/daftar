const oneToFive = [1, 2, 3, 4, 5];
const shades = ["bg-brand-300", "bg-brand-400", "bg-brand-500", "bg-brand-600", "bg-brand-700"];

export default function DifficultyMeter({ value, onChange }) {
  return (
    <span className="flex w-full items-center gap-2">
      <span className="flex min-w-[5rem] flex-1 gap-[2px]">
        {oneToFive.map((n) => {
          const segmentClass = `h-2 flex-1 rounded-[2px] ${n <= Math.round(value) ? shades[n - 1] : "bg-line"}`;
          return onChange ? (
            <button
              key={n}
              type="button"
              aria-label={`Difficulty ${n} of 5`}
              aria-pressed={n === value}
              onClick={() => onChange(n)}
              className={segmentClass}
            />
          ) : (
            <span key={n} className={segmentClass} />
          );
        })}
      </span>
      <span className="font-display text-sm font-semibold tabular-nums text-ink">
        {value ? Math.round(value * 10) / 10 : "–"}<span className="text-muted">/5</span>
      </span>
    </span>
  );
}
