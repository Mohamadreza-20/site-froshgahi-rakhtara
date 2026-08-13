export const PANEL_ROLES = ["مدیر فروشگاه", "پشتیبانی"];

export function canAccessPanel(user) {
	return Boolean(user) && PANEL_ROLES.includes(user.role);
}
