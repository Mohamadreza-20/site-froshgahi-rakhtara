import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { login } from "../../services/authService";
import { loginSchema, getZodErrors } from "../../utils/validators";
import { useAuthContext } from "../../context/AuthContext";

export default function LoginForm({ onSuccess }) {
  const { signIn } = useAuthContext();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const next = getZodErrors(loginSchema, { identifier, password });
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const result = await login({ identifier: identifier.trim(), password, remember });
    setLoading(false);

    if (result.success) {
      signIn(result.data);
      toast.success("ورود با موفقیت انجام شد", { description: "خوش آمدید به رخت‌آرا" });
      onSuccess?.(result.data);
    } else {
      toast.error(result.error || "ورود ناموفق بود، دوباره تلاش کنید");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label className="block text-sm font-bold mb-2 text-ink/70">ایمیل یا شماره موبایل</label>
        <input
          type="text"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          placeholder="مثلاً 0912xxxxxxx یا name@email.com"
          className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-camel transition-colors ${
            errors.identifier ? "border-rust" : "border-ink/15"
          }`}
        />
        {errors.identifier && <p className="text-xs text-rust mt-1.5">{errors.identifier}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold mb-2 text-ink/70">رمز عبور</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="رمز عبور خود را وارد کنید"
            className={`w-full px-4 py-3 pl-11 rounded-xl border outline-none focus:ring-2 focus:ring-camel transition-colors ${
              errors.password ? "border-rust" : "border-ink/15"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
            className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
            aria-label={showPassword ? "پنهان کردن رمز" : "نمایش رمز"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-rust mt-1.5">{errors.password}</p>}
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-ink/70 cursor-pointer">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            className="accent-forest w-4 h-4"
          />
          مرا به خاطر بسپار
        </label>
        <button type="button" className="cursor-pointer text-forest hover:underline font-medium">
          فراموشی رمز عبور
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-full bg-forest hover:bg-forest-light text-cream transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 shadow-lg shadow-forest/20"
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        {loading ? "در حال ورود…" : "ورود به حساب کاربری"}
      </button>
    </form>
  );
}
