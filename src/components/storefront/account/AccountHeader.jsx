import OptimizedImage from "../../shared/OptimizedImage";
import { CalendarDays, Mail, Phone } from "lucide-react";
import { getAvatarUrl } from "../../../utils/avatar";

export default function AccountHeader({ user }) {
  return (
    <div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-5 bg-white border border-ink/10 rounded-3xl p-6 md:p-8">
      <OptimizedImage
        loading="lazy"
        decoding="async"
        src={getAvatarUrl(user.seed || user.name || user.email)}
        alt={user.name}
        className="w-20 h-20 rounded-full shadow-md shadow-forest/10"
      />
      <div className="flex-1">
        <h1 className="text-2xl font-extrabold text-forest">{user.name}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-ink/60">
          <span className="flex items-center gap-1.5" dir="ltr"><Mail size={14} aria-hidden="true" />{user.email}</span>
          <span className="flex items-center gap-1.5" dir="ltr"><Phone size={14} aria-hidden="true" />{user.phone}</span>
          {user.joined && <span className="flex items-center gap-1.5"><CalendarDays size={14} aria-hidden="true" />عضویت از {user.joined}</span>}
        </div>
      </div>
    </div>
  );
}
