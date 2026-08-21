import { useEffect, useState } from "react";
export function useProductDetailSelection(product) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(null);
  const hasSizes = Array.isArray(product?.sizes) && product.sizes.length > 0;
  useEffect(() => {
    setQty(1);
    setSize(hasSizes ? product.sizes[0] : null);
  }, [product, hasSizes]);
  return { qty, size, hasSizes, setQty, setSize };
}
