const tones = {
  dark: "border-ink bg-ink text-paper",
  light: "border-line bg-brand-50 text-brand-800",
};

export default function Badge({ tone = "light", children }) {
  return (
    <span className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  );
}
