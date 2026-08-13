
const COLORS = [
	"#2F4F3E",
	"#6C63FF",
	"#D4A94E",
	"#1B1E3B",
	"#8C6A4F",
	"#3B7A5A",
	"#C2410C",
	"#0F766E",
];

function hashSeed(seed) {
	let hash = 0;
	for (let index = 0; index < seed.length; index++) {
		hash = (hash << 5) - hash + seed.charCodeAt(index);
		hash |= 0;
	}
	return Math.abs(hash);
}

function initialsFromSeed(seed) {
	const cleaned = seed.trim();
	if (!cleaned) return "؟";
	const parts = cleaned.split(/\s+/).filter(Boolean);
	if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
	return cleaned.slice(0, 2).toUpperCase();
}

export function getAvatarUrl(seed = "کاربر") {
	const hash = hashSeed(seed);
	const bg = COLORS[hash % COLORS.length];
	const initials = initialsFromSeed(seed);

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
		<rect width="64" height="64" rx="32" fill="${bg}"/>
		<text x="32" y="40" text-anchor="middle" font-family="Tahoma, Vazirmatn, sans-serif" font-size="24" font-weight="700" fill="#FBF7EF">${initials}</text>
	</svg>`;

	return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
