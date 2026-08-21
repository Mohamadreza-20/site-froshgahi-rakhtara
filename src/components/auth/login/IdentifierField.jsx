export default function IdentifierField({ value, error, onChange }) {
  return (
    <div>
      <label htmlFor="login-identifier" className="block text-sm font-bold mb-2 text-ink/70">ایمیل یا شماره موبایل</label>
      <input id="login-identifier" type="text" value={value} onChange={onChange} placeholder="مثلاً 0912xxxxxxx یا name@email.com" aria-invalid={Boolean(error)} aria-describedby={error ? "login-identifier-error" : undefined} className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-camel transition-colors ${error ? "border-rust" : "border-ink/15"}`} />
      {error && <p id="login-identifier-error" className="text-xs text-rust mt-1.5" role="alert">{error}</p>}
    </div>
  );
}
