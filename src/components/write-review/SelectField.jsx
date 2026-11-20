import FieldMessage from "./FieldMessage";
import { labelClass, inputClass } from "./fieldStyles";

export default function SelectField({ id, label, options, value, onChange, error, help }) {
  const messageId = `${id}-msg`;
  const hasMessage = Boolean(error || help);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelClass}>{label}</label>
      <select
        id={id}
        className={inputClass(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={hasMessage ? messageId : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Choose one</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <FieldMessage id={messageId} error={error} help={help} />
    </div>
  );
}
