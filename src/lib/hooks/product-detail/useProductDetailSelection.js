import { useEffect, useState } from "react";
export function useProductDetailSelection(product, maxQty) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(null);
  const hasSizes = Array.isArray(product?.sizes) && product.sizes.length > 0;
  useEffect(() => {
    setQty(maxQty > 0 ? 1 : 0);
    setSize(hasSizes ? product.sizes[0] : null);
  }, [product, hasSizes, maxQty]);

  const setSafeQty = (value) => {
    const next = Math.max(1, Math.min(Number(value) || 1, Math.max(1, maxQty)));
    setQty(next);
  };
  return { qty, size, hasSizes, setQty: setSafeQty, setSize };
}
