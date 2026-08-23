export function getGuestId(storageKey) {
	try {
		let id = localStorage.getItem(storageKey);
		if (!id) {
			id = `guest-${crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`}`;
			localStorage.setItem(storageKey, id);
		}
		return id;
	} catch {
		return `guest-${Date.now()}`;
	}
}

export function fromCartRow(row) {
	return {
		id: row.productId,
		rowId: row.id,
		name: row.name,
		price: row.price,
		image: row.image,
		gradient: row.gradient,
		size: row.size,
		qty: Math.max(0, Number(row.qty) || 0),
		stock: Number.isFinite(Number(row.stock)) ? Math.max(0, Number(row.stock)) : undefined,
		cartKey: row.cartKey,
	};
}

export function toCartPayload(product, qty, size, cartKey, ownerId) {
	return {
		ownerId,
		productId: product.id,
		name: product.name,
		price: product.price,
		image: product.image,
		gradient: product.gradient,
		size,
		qty,
		stock: Number(product.stock) || 0,
		cartKey,
	};
}

export function getCartKey(productId, size) {
	return size ? `${productId}-${size}` : `${productId}`;
}
