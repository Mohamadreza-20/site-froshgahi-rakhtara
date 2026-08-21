import { Eye, EyeOff } from "lucide-react";

export default function PasswordField({ value, error, visible, onChange, onToggle }) {
  return (
    <div>
      <label htmlFor="login-password" className="block text-sm font-bold mb-2 text-ink/70">رمز عبور</label>
      <div className="relative">
        <input id="login-password" type={visible ? "text" : "password"} value={value} onChange={onChange} placeholder="رمز عبور خود را وارد کنید" aria-invalid={Boolean(error)} aria-describedby={error ? "login-password-error" : undefined} className={`w-full px-4 py-3 pl-11 rounded-xl border outline-none focus:ring-2 focus:ring-camel transition-colors ${error ? "border-rust" : "border-ink/15"}`} />
        <button type="button" onClick={onToggle} className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel/40 rounded" aria-label={visible ? "پنهان کردن رمز" : "نمایش رمز"}>
          {visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
        </button>
      </div>
      {error && <p id="login-password-error" className="text-xs text-rust mt-1.5" role="alert">{error}</p>}
    </div>
  );
}
