import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "../../ui";
import ContactMessageItem from "./ContactMessageItem";
import { QueryErrorState, QueryLoadingState, EmptyState } from "../../../shared/states/QueryStates";
import { useContactMessageMutations, useContactMessagesQuery } from "../../../../lib/hooks/cms/useContactQueries";

export default function ContactMessagesSection() {
  const { data: messages = [], isLoading, isError, refetch } = useContactMessagesQuery();
  const { reply, remove } = useContactMessageMutations();
  const [deletingMessage, setDeletingMessage] = useState(null);

  async function handleReply(id, replyText) {
    try {
      await reply.mutateAsync({ id, replyText });
      toast.success("پاسخ شما ارسال شد");
    } catch (error) {
      toast.error(error?.userMessage || "ارسال پاسخ ناموفق بود، دوباره تلاش کنید");
    }
  }

  async function handleDelete() {
    if (!deletingMessage) return;
    try {
      await remove.mutateAsync(deletingMessage.id);
      toast.success("پیام حذف شد");
      setDeletingMessage(null);
    } catch (error) {
      toast.error(error?.userMessage || "حذف پیام با خطا مواجه شد");
    }
  }

  return (
    <section className="bg-white rounded-2xl border border-[#EEF0F5] p-6 shadow-sm shadow-black/[0.02]" aria-labelledby="contact-messages-title">
      <div className="flex items-center justify-between mb-5">
        <h3 id="contact-messages-title" className="font-bold text-[#111827]">پیام‌های تماس با ما</h3>
        {messages.length > 0 && <span className="text-xs text-[#9CA3AF]">{messages.length.toLocaleString("fa-IR")} پیام</span>}
      </div>

      {isLoading ? <QueryLoadingState message="در حال بارگذاری پیام‌ها..." /> : null}
      {isError ? <QueryErrorState message="دریافت پیام‌ها ناموفق بود" onRetry={refetch} /> : null}
      {!isLoading && !isError && messages.length === 0 ? <EmptyState title="هنوز پیامی ثبت نشده است" description="پیام‌های فرم تماس با ما اینجا نمایش داده می‌شوند." /> : null}
      {!isLoading && !isError && messages.length > 0 ? (
        <div className="space-y-3">
          {messages.map((message) => (
            <ContactMessageItem key={message.id} message={message} onReply={handleReply} onRequestDelete={setDeletingMessage} replying={reply.isPending} />
          ))}
        </div>
      ) : null}

      <ConfirmDialog
        open={Boolean(deletingMessage)}
        onClose={() => !remove.isPending && setDeletingMessage(null)}
        onConfirm={handleDelete}
        loading={remove.isPending}
        title="حذف پیام"
        description={deletingMessage ? `آیا از حذف پیام «${deletingMessage.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.` : ""}
      />
    </section>
  );
}
