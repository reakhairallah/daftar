export default function FieldMessage({ id, error, help }) {
  if (error) return <p id={id} className="text-xs font-semibold text-red-700">{error}</p>;
  if (help) return <p id={id} className="text-xs text-muted">{help}</p>;
  return null;
}
