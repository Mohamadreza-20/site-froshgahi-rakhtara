import { useEffect, useState } from "react";
import { getProduct } from "../../services/products";
import { useLoadingBar } from "../../context/LoadingBarContext";

let cache = null;
let inflight = null;
const listeners = new Set();

function notify() {
	listeners.forEach((fn) => fn(cache));
}

export function useProducts() {
	const [products, setProducts] = useState(cache || []);
	const [loading, setLoading] = useState(cache === null);
	const { start, stop } = useLoadingBar();

	useEffect(() => {
		if (cache) {
			setProducts(cache);
			setLoading(false);
			return;
		}

		let active = true;
		setLoading(true);
		start();

		if (!inflight) {
			inflight = getProduct()
				.then((data) => {
					cache = data;
					notify();
					return data;
				})
				.finally(() => {
					inflight = null;
				});
		}

		inflight.then((data) => {
			if (active) {
				setProducts(data);
				setLoading(false);
			}
			stop();
		});

		const onUpdate = (data) => {
			if (active) setProducts(data);
		};
		listeners.add(onUpdate);

		return () => {
			active = false;
			listeners.delete(onUpdate);
		};
	}, []);

	return { products, loading };
}
