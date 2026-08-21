import { useCallback, useState } from "react";
import { toast } from "sonner";
import { contactSchema, getZodErrors } from "../../utils/validators";
import { useSendContactMessage } from "./useContactMessageMutation";

const EMPTY_FORM = { name: "", email: "", phone: "", message: "" };

export function useContactForm(user) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const mutation = useSendContactMessage();

  const change = useCallback((field) => (event) => {
    setForm((previous) => ({ ...previous, [field]: event.target.value }));
    setErrors((previous) => previous[field] ? { ...previous, [field]: undefined } : previous);
  }, []);

  const submit = useCallback(async (event) => {
    event.preventDefault();
    const nextErrors = getZodErrors(contactSchema, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    try {
      await mutation.mutateAsync({ form, userId: user?.id });
      toast.success("پیام شما ارسال شد", { description: "به‌زودی با شما تماس می‌گیریم" });
      setForm(EMPTY_FORM);
    } catch (error) {
      toast.error(error?.userMessage || "ارسال پیام ناموفق بود، دوباره تلاش کنید");
    }
  }, [form, mutation, user?.id]);

  return { form, errors, mutation, change, submit };
}
