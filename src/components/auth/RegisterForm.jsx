import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { register } from "../../services/authService";
import { registerSchema, getZodErrors } from "../../utils/validators";
import { useAuthContext } from "../../context/AuthContext";

export default function RegisterForm({ onSuccess }) {
  const { signIn } = useAuthContext();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const next = getZodErrors(registerSchema, {
      fullName,
      email,
      phone,
      password,
      confirmPassword,
      acceptTerms,
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const result = await register({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
    });
    setLoading(false);

    if (result.success) {
      signIn(result.data);
      toast.success("ثبت‌نام با موفقیت انجام شد", { description: "خوش آمدید به رخت‌آرا" });
      onSuccess?.(result.data);
    } else {
      toast.error(result.error || "ثبت‌نام ناموفق بود، دوباره تلاش کنید");
    }
  }

  const fieldClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-camel transition-colors ${
      hasError ? "border-rust" : "border-ink/15"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label className="block text-sm font-bold mb-2 text-ink/70">نام و نام‌خانوادگی</label>
        <input
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="مثلاً سارا احمدی"
          className={fieldClass(errors.fullName)}
        />
        {errors.fullName && <p className="text-xs text-rust mt-1.5">{errors.fullName}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold mb-2 text-ink/70">ایمیل</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@email.com"
          className={fieldClass(errors.email)}
        />
        {errors.email && <p className="text-xs text-rust mt-1.5">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold mb-2 text-ink/70">شماره موبایل</label>
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="0912xxxxxxx"
          dir="ltr"
          className={fieldClass(errors.phone) + " text-right"}
        />
        {errors.phone && <p className="text-xs text-rust mt-1.5">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold mb-2 text-ink/70">رمز عبور</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="حداقل ۸ کاراکتر"
            className={fieldClass(errors.password) + " pl-11"}
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

      <div>
        <label className="block text-sm font-bold mb-2 text-ink/70">تکرار رمز عبور</label>
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="رمز عبور را دوباره وارد کنید"
          className={fieldClass(errors.confirmPassword)}
        />
        {errors.confirmPassword && <p className="text-xs text-rust mt-1.5">{errors.confirmPassword}</p>}
      </div>

      <div>
        <label className="flex items-start gap-2 text-sm text-ink/70 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(event) => setAcceptTerms(event.target.checked)}
            className="accent-forest w-4 h-4 mt-0.5"
          />
          <span>قوانین و مقررات رخت‌آرا را می‌پذیرم</span>
        </label>
        {errors.acceptTerms && <p className="text-xs text-rust mt-1.5">{errors.acceptTerms}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-full bg-forest hover:bg-forest-light text-cream transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 shadow-lg shadow-forest/20"
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        {loading ? "در حال ثبت‌نام…" : "ایجاد حساب کاربری"}
      </button>
    </form>
  );
}
