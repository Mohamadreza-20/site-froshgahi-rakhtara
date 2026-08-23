export function toJalaliToday() {
	try {
		return new Intl.DateTimeFormat("fa-IR", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		}).format(new Date());
	} catch {
		return "";
	}
}
