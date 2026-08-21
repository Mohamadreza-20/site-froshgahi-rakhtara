import ProductField from "./ProductField";
import ProductImagePicker from "../ProductImagePicker";
import { CATEGORIES } from "../../../../../lib/data/products";

export default function ProductFormFields({ form, errors, imageError, onChange, onImageChange, onImageError }) {
  return <div className="space-y-4">
    <ProductImagePicker value={form.image} onChange={onImageChange} error={imageError} onError={onImageError} />
    <ProductField id="product-name" label="نام محصول" required value={form.name} onChange={onChange("name")} placeholder="مثلاً کفش اسپرت مدل آریا" />
    <div className="grid grid-cols-2 gap-4">
      <ProductField id="product-category" label="دسته‌بندی" value={form.cat} onChange={onChange("cat")}>
        <select id="product-category" value={form.cat} onChange={onChange("cat")} className="cursor-pointer w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white">
          {CATEGORIES.map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}
        </select>
      </ProductField>
      <ProductField id="product-sku" label="کد محصول (SKU)" required value={form.sku} onChange={onChange("sku")} placeholder="SH-1042" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <ProductField id="product-price" label="قیمت (تومان)" type="number" min="0" required value={form.price} onChange={onChange("price")} placeholder="1250000" />
      <ProductField id="product-stock" label="موجودی انبار" type="number" min="0" required value={form.stock} onChange={onChange("stock")} placeholder="۲۴" />
    </div>
    <ProductField id="product-sizes" label="سایزها (اختیاری، با ویرگول جدا کنید)" value={form.sizes} onChange={onChange("sizes")} placeholder="S، M، L، XL" />
    <ProductField id="product-desc" label="توضیح کوتاه"><textarea id="product-desc" value={form.desc} onChange={onChange("desc")} rows={3} placeholder="توضیح کوتاهی درباره محصول بنویسید" className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white resize-none" /></ProductField>
    <ProductField id="product-long-desc" label="توضیح کامل"><textarea id="product-long-desc" value={form.longDesc} onChange={onChange("longDesc")} rows={8} placeholder="توضیح کامل درباره محصول بنویسید" className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white resize-none" /></ProductField>
    {Object.keys(errors).length > 0 && <p className="text-xs text-[#DC2626]" role="alert">لطفاً مقادیر فرم را بررسی کنید.</p>}
  </div>;
}
