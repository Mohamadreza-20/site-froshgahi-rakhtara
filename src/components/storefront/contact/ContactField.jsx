const fieldClass = (error) => `w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-camel transition-colors ${error ? "border-rust" : "border-ink/15"}`;
export default function ContactField({ id, label, error, multiline = false, ...props }) {
  const Control = multiline ? "textarea" : "input";
  return <div><label htmlFor={id} className="block text-sm font-bold mb-2 text-ink/70">{label}</label><Control id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} rows={multiline ? 6 : undefined} className={`${fieldClass(error)} ${multiline ? "resize-none" : ""}`} {...props} />{error && <p id={`${id}-error`} className="text-xs text-rust mt-1.5" role="alert">{error}</p>}</div>;
}
