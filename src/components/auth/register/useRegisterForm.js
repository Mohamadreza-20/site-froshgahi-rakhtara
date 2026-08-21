import { useState } from "react";
import { getZodErrors, registerSchema } from "../../../utils/validators";

export function useRegisterForm() {
  const [fields, setFields] = useState({ fullName: "", email: "", phone: "", password: "", confirmPassword: "", acceptTerms: false });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const setField = (field) => (value) => {
    const nextValue = value?.target ? value.target.value : value;
    setFields((previous) => ({ ...previous, [field]: nextValue }));
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
  };
  const validate = () => { const next = getZodErrors(registerSchema, fields); setErrors(next); return Object.keys(next).length === 0; };
  return { fields, errors, showPassword, setShowPassword, setField, validate };
}
