import { useEffect, useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { getContactInfo } from "../../../../services/contactUs.service";

export default function ContactInfoSection() {
	const [info, setInfo] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let ignore = false;
		getContactInfo()
			.then((data) => {
				if (!ignore) setInfo(data);
			})
			.catch((error) => {
				console.error("خطا در دریافت اطلاعات تماس با ما:", error);
			})
			.finally(() => {
				if (!ignore) setLoading(false);
			});
		return () => {
			ignore = true;
		};
	}, []);

	const rows = info
		? [
				{ icon: MapPin, label: "آدرس", value: info.address },
				{ icon: Phone, label: "شماره تماس", value: info.phone, dir: "ltr" },
				{ icon: Mail, label: "ایمیل", value: info.email, dir: "ltr" },
			]
		: [];

	return (
		<div className="bg-white rounded-2xl border border-[#EEF0F5] p-6 shadow-sm shadow-black/[0.02]">
			<h3 className="font-bold text-[#111827] mb-5">اطلاعات تماس با ما</h3>

			{loading ? (
				<div className="text-center py-6 text-sm text-[#9CA3AF]">
					در حال بارگذاری...
				</div>
			) : !info ? (
				<div className="text-center py-6 text-sm text-[#9CA3AF]">
					اطلاعاتی ثبت نشده است
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					{rows.map(({ icon: Icon, label, value, dir }) => (
						<div
							key={label}
							className="flex items-start gap-3 border border-[#EEF0F5] rounded-xl p-4"
						>
							<span className="shrink-0 w-10 h-10 rounded-full bg-[#EEF0FF] flex items-center justify-center text-[#6C63FF]">
								<Icon size={18} />
							</span>
							<div className="min-w-0">
								<p className="text-xs text-[#9CA3AF] mb-1">{label}</p>
								<p dir={dir} className="font-bold text-[#111827] truncate">
									{value}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
