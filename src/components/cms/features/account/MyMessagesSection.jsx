import { memo } from "react";
import { QueryErrorState, QueryLoadingState } from "../../../shared/states/QueryStates";
import { MessageSquare, CornerUpLeft, Clock } from "lucide-react";
import { useMyContactMessagesQuery } from "../../../../lib/hooks/cms/useContactQueries";
import { MESSAGE_STATUS } from "../../../../services/contactUs.service";

const statusStyle = { [MESSAGE_STATUS.ANSWERED]: "bg-[#E9F7EF] text-[#16A34A]", [MESSAGE_STATUS.PENDING]: "bg-[#FEF6E7] text-[#D97706]" };
const MyMessageItem = memo(function MyMessageItem({ message }) {
  const status = message.status || MESSAGE_STATUS.PENDING;
  const isAnswered = status === MESSAGE_STATUS.ANSWERED && message.reply;
  return <div className="border border-ink/10 rounded-2xl p-4"><div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-2">{message.date && <span className="text-xs text-ink/40">{message.date}</span>}<span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[status] || "bg-gray-100 text-gray-600"}`}>{status}</span></div><p className="text-sm text-ink/80 leading-6 mb-3">{message.message}</p>{isAnswered ? <div className="flex items-start gap-2 bg-camel/10 border border-camel/20 rounded-xl p-3"><CornerUpLeft size={14} className="text-forest mt-0.5 shrink-0" aria-hidden="true" /><div><p className="text-xs font-bold text-forest mb-1">پاسخ ما</p><p className="text-sm text-ink/70 leading-6">{message.reply}</p></div></div> : <div className="flex items-center gap-2 text-xs text-ink/40"><Clock size={13} aria-hidden="true" />هنوز پاسخی برای این پیام ثبت نشده است</div>}</div>;
});

export default function MyMessagesSection({ userId }) {
  const { data: messages = [], isLoading, isError, refetch } = useMyContactMessagesQuery(userId);
  if (!isLoading && !isError && messages.length === 0) return null;
  return <div className="bg-white border border-ink/10 rounded-3xl p-6 md:p-8 mt-6"><h2 className="font-extrabold text-lg text-forest mb-1 flex items-center gap-2"><MessageSquare size={18} aria-hidden="true" />پیام‌های تماس با ما</h2><p className="text-sm text-ink/50 mb-4">پیام‌هایی که برای ما ارسال کرده‌اید و پاسخ تیم پشتیبانی را اینجا می‌بینید.</p>{isLoading ? <QueryLoadingState message="در حال بارگذاری پیام‌ها..." /> : isError ? <QueryErrorState message="دریافت پیام‌ها ناموفق بود" onRetry={refetch} /> : <div className="space-y-3">{messages.map((message) => <MyMessageItem key={message.id} message={message} />)}</div>}</div>;
}
