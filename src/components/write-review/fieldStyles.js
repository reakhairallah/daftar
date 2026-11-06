export const labelClass = "text-[11px] font-semibold uppercase tracking-[0.13em] text-muted";

export function inputClass(error) {
  const base = "w-full rounded border bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-4";
  return error
    ? `${base} border-red-500 focus:border-red-600 focus:ring-red-100`
    : `${base} border-line focus:border-brand-500 focus:ring-brand-100`;
}
