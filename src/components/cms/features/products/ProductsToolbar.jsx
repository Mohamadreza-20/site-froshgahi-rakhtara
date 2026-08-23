import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { useCategories } from "../../../../lib/hooks/useCategories";
import ViewToggle from "./ViewToggle";

export default function ProductsToolbar({
  query,
  onQueryChange,
  activeCategory,
  onCategoryChange,
  manualFilters,
  onManualFilterChange,
  onResetManualFilters,
  hasManualFilters,
  view,
  onViewChange,
}) {
  const [showFilters, setShowFilters] = useState(false);
  const { categories } = useCategories();
  const categoryOptions = ["همه", ...categories.map((category) => category.name)];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="جستجوی محصول..."
            aria-label="جستجوی محصول"
            className="pr-9 pl-3 py-2 rounded-lg border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition w-56 bg-white"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => setShowFilters((visible) => !visible)}
            className={`cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition ${
              showFilters || hasManualFilters ? "border-[#6C63FF] text-[#6C63FF] bg-[#F7F5FF]" : "border-[#EEF0F5] text-[#6B7280] bg-white hover:bg-[#FAFAFC]"
            }`}
          >
            <SlidersHorizontal size={15} />
            فیلتر دستی
          </button>
          <ViewToggle view={view} onChange={onViewChange} />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={14} className="text-[#9CA3AF] shrink-0" />
        {categoryOptions.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`cursor-pointer px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
              activeCategory === category ? "bg-[#111827] text-white" : "bg-[#F5F6FA] text-[#6B7280] hover:bg-[#EEF0F5]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {showFilters && (
        <div className="rounded-xl border border-[#EEF0F5] bg-[#FAFAFC] p-4 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[#111827]">فیلتر دستی محصولات</p>
              <p className="text-xs text-[#9CA3AF] mt-1">تغییرات فیلتر و جستجو با تأخیر کوتاه اعمال می‌شوند.</p>
            </div>
            {hasManualFilters && (
              <button
                type="button"
                onClick={onResetManualFilters}
                className="cursor-pointer inline-flex items-center gap-1 text-xs text-[#DC2626] hover:underline"
              >
                <X size={13} />
                پاک کردن فیلترها
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="text-xs text-[#6B7280] space-y-1.5">
              <span>حداقل قیمت</span>
              <input
                type="number"
                min="0"
                value={manualFilters.minPrice}
                onChange={(event) => onManualFilterChange("minPrice", event.target.value)}
                placeholder="مثلاً ۵۰۰۰۰۰"
                className="w-full px-3 py-2 rounded-lg border border-[#EEF0F5] bg-white text-sm outline-none focus:border-[#6C63FF]"
              />
            </label>

            <label className="text-xs text-[#6B7280] space-y-1.5">
              <span>حداکثر قیمت</span>
              <input
                type="number"
                min="0"
                value={manualFilters.maxPrice}
                onChange={(event) => onManualFilterChange("maxPrice", event.target.value)}
                placeholder="مثلاً ۲۰۰۰۰۰۰"
                className="w-full px-3 py-2 rounded-lg border border-[#EEF0F5] bg-white text-sm outline-none focus:border-[#6C63FF]"
              />
            </label>

            <label className="text-xs text-[#6B7280] space-y-1.5">
              <span>وضعیت موجودی</span>
              <select
                value={manualFilters.stockFilter}
                onChange={(event) => onManualFilterChange("stockFilter", event.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#EEF0F5] bg-white text-sm outline-none focus:border-[#6C63FF]"
              >
                <option value="all">همه</option>
                <option value="inStock">موجود</option>
                <option value="lowStock">رو به اتمام (۱ تا ۶)</option>
                <option value="outOfStock">ناموجود</option>
              </select>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
