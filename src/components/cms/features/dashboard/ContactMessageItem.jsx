import { memo, useState } from "react";
import { CornerUpLeft, Loader2, Mail, Phone, Send, Trash2 } from "lucide-react";
import { StatusPill } from "../../ui";
import { MESSAGE_STATUS } from "../../../../services/contactUs.service";

const ContactMessageItem = memo(function ContactMessageItem({ message, onReply, onRequestDelete, replying }) {
  const [replyText, setReplyText] = useState(message.reply || "");
  const isAnswered = message.status === MESSAGE_STATUS.ANSWERED;

  async function handleSendReply() {
    if (!replyText.trim()) return;
    await onReply(message.id, replyText.trim());
  }

  return (
    <article className="border border-[#EEF0F5] rounded-xl p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-1.5">
            <span className="font-bold text-[#111827]">{message.name}</span>
            {message.date && <span className="text-xs text-[#9CA3AF]">{message.date}</span>}
            <StatusPill status={message.status || MESSAGE_STATUS.PENDING} />
          </div>
          <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-[#6B7280] mb-2">
            {message.email && <span className="flex items-center gap-1.5" dir="ltr"><Mail size={13} aria-hidden="true" />{message.email}</span>}
            {message.phone && <span className="flex items-center gap-1.5" dir="ltr"><Phone size={13} aria-hidden="true" />{message.phone}</span>}
          </div>
          <p className="text-sm text-[#374151] leading-6">{message.message}</p>
        </div>
        <button type="button" onClick={() => onRequestDelete(message)} aria-label={`حذف پیام ${message.name}`} className="cursor-pointer shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-[#DC2626] hover:bg-[#FEF2F2] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]/30">
          <Trash2 size={16} aria-hidden="true" />
        </button>
      </div>

      {isAnswered && message.reply && (
        <div className="mt-3 flex items-start gap-2 bg-[#F5F8FF] border border-[#E4E9F7] rounded-lg p-3">
          <CornerUpLeft size={14} className="text-[#4B5EAA] mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold text-[#4B5EAA] mb-1">پاسخ ما</p>
            <p className="text-sm text-[#374151] leading-6">{message.reply}</p>
          </div>
        </div>
      )}

      <div className="mt-3 flex items-center gap-2">
        <label className="sr-only" htmlFor={`reply-${message.id}`}>پاسخ به پیام {message.name}</label>
        <input id={`reply-${message.id}`} type="text" value={replyText} onChange={(event) => setReplyText(event.target.value)} placeholder={isAnswered ? "ویرایش پاسخ..." : "پاسخ خود را بنویسید..."} className="flex-1 px-3.5 py-2.5 text-sm rounded-lg border border-[#E5E7EB] outline-none focus:ring-2 focus:ring-forest/30 transition-colors" />
        <button type="button" onClick={handleSendReply} disabled={replying || !replyText.trim()} className="cursor-pointer shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-bold bg-forest text-cream hover:bg-forest-light transition disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30">
          {replying ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : <Send size={14} aria-hidden="true" />}
          {isAnswered ? "بروزرسانی پاسخ" : "ارسال پاسخ"}
        </button>
      </div>
    </article>
  );
});

export default ContactMessageItem;
