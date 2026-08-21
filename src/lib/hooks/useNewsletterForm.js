import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { newsletterSchema } from "../../utils/validators";

export function useNewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!subscribed) return undefined;
    const timer = window.setTimeout(() => setSubscribed(false), 2500);
    return () => window.clearTimeout(timer);
  }, [subscribed]);

  const changeEmail = useCallback((event) => {
    setEmail(event.target.value);
    setError("");
  }, []);

  const submit = useCallback((event) => {
    event.preventDefault();
    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    toast.success("عضویت شما ثبت شد", { description: "از این به بعد از تخفیف‌های فصلی باخبر می‌شوید" });
    setEmail("");
    setError("");
    setSubscribed(true);
  }, [email]);

  return { email, error, subscribed, changeEmail, submit };
}
