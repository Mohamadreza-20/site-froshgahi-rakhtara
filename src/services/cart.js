import api from "./api";

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
		if (targetItem) {
			await updateCartItem(targetItem.id, { qty: targetItem.qty + sourceItem.qty });
		} else {
			await createCartItem({
				ownerId: targetOwnerId,
				productId: sourceItem.productId,
				name: sourceItem.name,
				price: sourceItem.price,
				image: sourceItem.image,
				gradient: sourceItem.gradient,
				size: sourceItem.size,
				qty: sourceItem.qty,
				cartKey: sourceItem.cartKey,
			});
		}
		await deleteCartItem(sourceItem.id);
	}
}
