import api from "./api";
import { getProduct } from "./products";

const RESOURCE = "/cart";

export const getCartItems = async (ownerId) => {
	const { data } = await api.get(RESOURCE, { params: { ownerId } });
	return data;
};

export const createCartItem = async (item) => {
	const { data } = await api.post(RESOURCE, item);
	return data;
};

export const updateCartItem = async (id, patch) => {
	const { data } = await api.patch(`${RESOURCE}/${id}`, patch);
	return data;
};

export const deleteCartItem = async (id) => {
	const { data } = await api.delete(`${RESOURCE}/${id}`);
	return data;
};

export async function mergeCartItems(sourceOwnerId, targetOwnerId) {
	if (!sourceOwnerId || !targetOwnerId || sourceOwnerId === targetOwnerId) return;

	const [sourceItems, targetItems] = await Promise.all([
		getCartItems(sourceOwnerId),
		getCartItems(targetOwnerId),
	]);

	const targetByKey = new Map(targetItems.map((item) => [item.cartKey, item]));

	for (const sourceItem of sourceItems) {
		const targetItem = targetByKey.get(sourceItem.cartKey);
		let stock = Number(sourceItem.stock);

		try {
			const product = await getProduct(sourceItem.productId);
			stock = Number(product?.stock);
		} catch {
			stock = Number.isFinite(stock) ? stock : 0;
		}

		if (!Number.isFinite(stock) || stock <= 0) {
			if (targetItem) await deleteCartItem(targetItem.id);
			await deleteCartItem(sourceItem.id);
			continue;
		}

		const mergedQty = Math.min((targetItem?.qty || 0) + sourceItem.qty, stock);
		if (targetItem) {
			await updateCartItem(targetItem.id, { qty: mergedQty, stock });
		} else {
			await createCartItem({
				ownerId: targetOwnerId,
				productId: sourceItem.productId,
				name: sourceItem.name,
				price: sourceItem.price,
				image: sourceItem.image,
				gradient: sourceItem.gradient,
				size: sourceItem.size,
				qty: mergedQty,
				stock,
				cartKey: sourceItem.cartKey,
			});
		}
		await deleteCartItem(sourceItem.id);
	}
}
