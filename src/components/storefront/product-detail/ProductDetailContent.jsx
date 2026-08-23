import ProductComments from "../ProductComments";
import ProductDetailGallery from "./ProductDetailGallery";
import ProductPurchasePanel from "./ProductPurchasePanel";
import RelatedProducts from "./RelatedProducts";

export default function ProductDetailContent({ state, categoryId, onAdd }) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <ProductDetailGallery product={state.product} />
        <ProductPurchasePanel
          product={state.product}
          qty={state.qty}
          size={state.size}
          justAdded={state.justAdded}
          outOfStock={state.outOfStock}
          stock={state.stock}
          hasSizes={state.hasSizes}
          onQtyChange={state.setQty}
          onSizeChange={state.setSize}
          onAddToCart={state.handleAddToCart}
        />
      </div>
      <ProductComments productId={state.product.id} />
      <RelatedProducts products={state.relatedProducts} fetching={state.relatedFetching} categoryId={categoryId} productId={state.product.id} onAdd={onAdd} />
    </>
  );
}
