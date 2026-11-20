import FieldMessage from "./FieldMessage";
import { labelClass, inputClass } from "./fieldStyles";

export default function TextField({ id, label, value, onChange, error, help, multiline = false, ...inputProps }) {
  const messageId = `${id}-msg`;
  const hasMessage = Boolean(error || help);
  const Input = multiline ? "textarea" : "input";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelClass}>{label}</label>
      <Input
        {...inputProps}
        id={id}
        className={inputClass(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={hasMessage ? messageId : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <FieldMessage id={messageId} error={error} help={help} />
    </div>
  );
}
