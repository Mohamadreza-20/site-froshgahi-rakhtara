export const SORT_OPTIONS = [
	{ value: "default", label: "پیش‌فرض" },
	{ value: "price-asc", label: "ارزان‌ترین" },
	{ value: "price-desc", label: "گران‌ترین" },
	{ value: "name-asc", label: "بر اساس نام" },
];

export function sortProducts(list, sort) {
	const products = [...list];
	switch (sort) {
		case "price-asc":
			return products.sort((firstProduct, secondProduct) => Number(firstProduct.price || 0) - Number(secondProduct.price || 0));
		case "price-desc":
			return products.sort((firstProduct, secondProduct) => Number(secondProduct.price || 0) - Number(firstProduct.price || 0));
		case "name-asc":
			return products.sort((firstProduct, secondProduct) =>
				String(firstProduct.name).localeCompare(String(secondProduct.name), "fa"),
			);
		default:
			return products;
	}
}
