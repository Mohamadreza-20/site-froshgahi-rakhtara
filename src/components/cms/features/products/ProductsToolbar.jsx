import { Search, Filter } from "lucide-react";
import { CATEGORIES } from "../../../../lib/data/products";
import ViewToggle from "./ViewToggle";

const categories = ["همه", ...CATEGORIES.map((category) => category.name)];

export default function ProductsToolbar({
  query,
  onQueryChange,
  activeCategory,
  onCategoryChange,
  view,
  onViewChange,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="relative">
        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="جستجوی محصول..."
          className="pr-9 pl-3 py-2 rounded-lg border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition w-56 bg-white"
        />
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-[#9CA3AF] shrink-0" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`cursor-pointer px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                activeCategory === category ? "bg-[#111827] text-white" : "bg-[#F5F6FA] text-[#6B7280] hover:bg-[#EEF0F5]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <ViewToggle view={view} onChange={onViewChange} />
      </div>
    </div>
  );
}
