import { memo, useEffect, useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, Trash2, MessageSquare, Loader2, Send, CornerUpLeft } from "lucide-react";
import { ConfirmDialog, StatusPill } from "../../ui";
import {
	getContactMessages,
	deleteContactMessage,
	replyToContactMessage,
	MESSAGE_STATUS,
} from "../../../../services/contactUs.service";

const ContactMessageItem = memo(function ContactMessageItem({
	message,
	onReply,
	onRequestDelete,
}) {
	const [replyText, setReplyText] = useState(message.reply || "");
	const [sending, setSending] = useState(false);

	const isAnswered = message.status === MESSAGE_STATUS.ANSWERED;

	const handleSendReply = async () => {
		if (!replyText.trim()) return;
		setSending(true);
		try {
			await onReply(message.id, replyText.trim());
		} finally {
			setSending(false);
		}
	};

	return (
		<div className="border border-[#EEF0F5] rounded-xl p-4">
			<div className="flex items-start justify-between gap-4">
				<div className="min-w-0 flex-1">
					<div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-1.5">
						<span className="font-bold text-[#111827]">{message.name}</span>
						{message.date && (
							<span className="text-xs text-[#9CA3AF]">{message.date}</span>
						)}
						<StatusPill
							status={message.status || MESSAGE_STATUS.PENDING}
						/>
					</div>
					<div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-[#6B7280] mb-2">
						{message.email && (
							<span className="flex items-center gap-1.5" dir="ltr">
								<Mail size={13} />
								{message.email}
							</span>
						)}
						{message.phone && (
							<span className="flex items-center gap-1.5" dir="ltr">
								<Phone size={13} />
								{message.phone}
							</span>
						)}
					</div>
					<p className="text-sm text-[#374151] leading-6">{message.message}</p>
				</div>
				<button
					type="button"
					onClick={() => onRequestDelete(message)}
					aria-label="حذف پیام"
					className="cursor-pointer shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-[#DC2626] hover:bg-[#FEF2F2] transition"
				>
					<Trash2 size={16} />
				</button>
			</div>

			{isAnswered && message.reply && (
				<div className="mt-3 flex items-start gap-2 bg-[#F5F8FF] border border-[#E4E9F7] rounded-lg p-3">
					<CornerUpLeft size={14} className="text-[#4B5EAA] mt-0.5 shrink-0" />
					<div>
						<p className="text-xs font-bold text-[#4B5EAA] mb-1">پاسخ ما</p>
						<p className="text-sm text-[#374151] leading-6">{message.reply}</p>
					</div>
				</div>
			)}

			<div className="mt-3 flex items-center gap-2">
				<input
					type="text"
					value={replyText}
					onChange={(event) => setReplyText(event.target.value)}
					placeholder={isAnswered ? "ویرایش پاسخ..." : "پاسخ خود را بنویسید..."}
					className="flex-1 px-3.5 py-2.5 text-sm rounded-lg border border-[#E5E7EB] outline-none focus:ring-2 focus:ring-forest/30 transition-colors"
				/>
				<button
					type="button"
					onClick={handleSendReply}
					disabled={sending || !replyText.trim()}
					className="cursor-pointer shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-bold bg-forest text-cream hover:bg-forest-light transition disabled:opacity-50"
				>
					{sending ? (
						<Loader2 size={14} className="animate-spin" />
					) : (
						<Send size={14} />
					)}
					{isAnswered ? "بروزرسانی پاسخ" : "ارسال پاسخ"}
				</button>
			</div>
		</div>
	);
});

export default function ContactMessagesSection() {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [deletingMessage, setDeletingMessage] = useState(null);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		let ignore = false;
		getContactMessages()
			.then((data) => {
				if (!ignore) setMessages(data);
			})
			.catch((error) => {
				console.error("خطا در دریافت پیام‌های تماس با ما:", error);
			})
			.finally(() => {
				if (!ignore) setLoading(false);
			});
		return () => {
			ignore = true;
		};
	}, []);

	const handleReply = async (id, replyText) => {
		try {
			const updated = await replyToContactMessage(id, replyText);
			setMessages((prev) =>
				prev.map((currentMessage) => (currentMessage.id === id ? { ...currentMessage, ...updated } : currentMessage)),
			);
			toast.success("پاسخ شما ارسال شد");
		} catch (error) {
			console.error("ارسال پاسخ با خطا مواجه شد:", error);
			toast.error("ارسال پاسخ ناموفق بود، دوباره تلاش کنید");
		}
	};

	const handleDelete = async () => {
		if (!deletingMessage) return;
		setDeleting(true);
		try {
			await deleteContactMessage(deletingMessage.id);
			setMessages((prev) => prev.filter((currentMessage) => currentMessage.id !== deletingMessage.id));
			toast.success("پیام حذف شد");
			setDeletingMessage(null);
		} catch (error) {
			console.error("حذف پیام با خطا مواجه شد:", error);
			toast.error("حذف پیام با خطا مواجه شد");
		} finally {
			setDeleting(false);
		}
	};

	return (
		<div className="bg-white rounded-2xl border border-[#EEF0F5] p-6 shadow-sm shadow-black/[0.02]">
			<div className="flex items-center justify-between mb-5">
				<h3 className="font-bold text-[#111827]">پیام‌های تماس با ما</h3>
				{messages.length > 0 && (
					<span className="text-xs text-[#9CA3AF]">
						{messages.length.toLocaleString("fa-IR")} پیام
					</span>
				)}
			</div>

			{loading ? (
				<div className="text-center py-6 text-sm text-[#9CA3AF]">
					در حال بارگذاری...
				</div>
			) : messages.length === 0 ? (
				<div className="flex flex-col items-center gap-2 py-8 text-sm text-[#9CA3AF]">
					<MessageSquare size={22} className="text-[#D1D5DB]" />
					هنوز پیامی از فرم تماس با ما ثبت نشده است
				</div>
			) : (
				<div className="space-y-3">
					{messages.map((message) => (
						<ContactMessageItem
							key={message.id}
							message={message}
							onReply={handleReply}
							onRequestDelete={setDeletingMessage}
						/>
					))}
				</div>
			)}

			<ConfirmDialog
				open={Boolean(deletingMessage)}
				onClose={() => setDeletingMessage(null)}
				onConfirm={handleDelete}
				loading={deleting}
				title="حذف پیام"
				description={
					deletingMessage
						? `آیا از حذف پیام «${deletingMessage.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`
						: ""
				}
			/>
		</div>
	);
}
