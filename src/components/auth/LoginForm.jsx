import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import PasswordField from "./login/PasswordField";
import { useLoginForm } from "../../lib/hooks/useLoginForm";
import IdentifierField from "./login/IdentifierField";

export default function LoginForm({ onSuccess }) {
  const form = useLoginForm(onSuccess);

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
      <IdentifierField value={form.identifier} error={form.errors.identifier} onChange={(event) => form.setIdentifier(event.target.value)} />
      <PasswordField value={form.password} error={form.errors.password} visible={form.showPassword} onChange={(event) => form.setPassword(event.target.value)} onToggle={() => form.setShowPassword((visible) => !visible)} />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-ink/70 cursor-pointer">
          <input type="checkbox" checked={form.remember} onChange={(event) => form.setRemember(event.target.checked)} className="accent-forest w-4 h-4" />
          مرا به خاطر بسپار
        </label>
        <button type="button" onClick={() => toast.info("بازیابی رمز عبور در نسخه نمایشی پروژه فعال نشده است.")} className="cursor-pointer text-forest hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel/40 rounded">
          فراموشی رمز عبور
        </button>
      </div>

      <button type="submit" disabled={form.loading} className="cursor-pointer w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-full bg-forest hover:bg-forest-light text-cream transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 shadow-lg shadow-forest/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40">
        {form.loading && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
        {form.loading ? "در حال ورود…" : "ورود به حساب کاربری"}
      </button>
    </form>
  );
}
