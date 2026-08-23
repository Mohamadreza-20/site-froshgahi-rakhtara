import { useState } from "react";
import { toast } from "sonner";
import { login } from "../../services/account/auth.service";
import { loginSchema, getZodErrors } from "../../utils/validators";
import { useAuthContext } from "../../context/AuthContext";

export function useLoginForm(onSuccess) {
  const { signIn } = useAuthContext();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = getZodErrors(loginSchema, { identifier, password });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await login({ identifier: identifier.trim(), password, remember });
      if (result.success) {
        signIn(result.data, remember);
        toast.success("با موفقیت وارد حساب کاربری شدید");
        onSuccess?.(result.data);
      } else {
        toast.error(result.error || "ورود ناموفق بود، دوباره تلاش کنید");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    identifier,
    password,
    remember,
    showPassword,
    errors,
    loading,
    setIdentifier,
    setPassword,
    setRemember,
    setShowPassword,
    handleSubmit,
  };
}
