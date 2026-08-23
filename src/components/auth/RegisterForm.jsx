import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { register } from "../../services/account/auth.service";
import { toJalaliToday } from "../../utils/date";
import { useAuthContext } from "../../context/AuthContext";
import RegisterFields from "./register/RegisterFields";
import { useRegisterForm } from "./register/useRegisterForm";

export default function RegisterForm({ onSuccess }){
 const {signIn}=useAuthContext();const state=useRegisterForm();const [loading,setLoading]=useState(false);
 const handleSubmit=async(event)=>{event.preventDefault();if(!state.validate())return;setLoading(true);const result=await register({fullName:state.fields.fullName.trim(),email:state.fields.email.trim(),phone:state.fields.phone.trim(),password:state.fields.password},{today:toJalaliToday()});setLoading(false);if(result.success){signIn(result.data);toast.success("حساب کاربری با موفقیت ساخته شد");onSuccess?.(result.data);}else toast.error(result.error||"ثبت‌نام ناموفق بود، دوباره تلاش کنید");};
 return <form onSubmit={handleSubmit} noValidate className="space-y-5"><RegisterFields {...state}/><button type="submit" disabled={loading} className="cursor-pointer w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-full bg-forest hover:bg-forest-light text-cream transition-transform hover:scale-[1.02] disabled:opacity-60 shadow-lg shadow-forest/20">{loading&&<Loader2 size={18} className="animate-spin"/>}{loading?"در حال ثبت‌نام…":"ایجاد حساب کاربری"}</button></form>;
}
