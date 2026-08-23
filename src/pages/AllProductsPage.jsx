import { useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { useCategories } from "../lib/hooks/useCategories";
import { useProducts } from "../lib/hooks/useProducts";
import ProductListingHero from "../components/storefront/ProductListingHero";
import ProductListingResults from "../components/storefront/ProductListingResults";
import { usePageMeta } from "../lib/hooks/usePageMeta";

const PAGE_SIZE = 15;
export default function AllProductsPage() {
  const { categories } = useCategories();
  usePageMeta({ title: "محصولات | Rakhtara", description: "مشاهده و مقایسه محصولات پوشاک، کیف، کفش و اکسسوری فروشگاه Rakhtara.", path: "/products" });
  const { addToCart } = useOutletContext();
  const [searchParams,setSearchParams]=useSearchParams(); const [currentPage,setCurrentPage]=useState(1); const [sort,setSort]=useState("default");
  const activeCategoryId=searchParams.get("category")||"all"; const activeCategory=categories.find((category)=>String(category.id)===String(activeCategoryId))||null;
  const sortMap={"price-asc":{sortField:"price",sortOrder:"asc"},"price-desc":{sortField:"price",sortOrder:"desc"},"name-asc":{sortField:"name",sortOrder:"asc"}};
  const {products,loading,error,totalPages,total,fetching,refetch}=useProducts({page:currentPage,limit:PAGE_SIZE,category:activeCategory?.name||"all", categoryId:activeCategory?.id||"all",...(sortMap[sort]||{})});
  const selectCategory=(id)=>{setCurrentPage(1);setSort("default");id==="all"?setSearchParams({}):setSearchParams({category:id});};
  const changeSort=(value)=>{setSort(value);setCurrentPage(1);}; const changePage=(page)=>{setCurrentPage(page);window.scrollTo({top:0,behavior:"smooth"});};
  return <div><ProductListingHero activeCategory={activeCategory} activeCategoryId={activeCategoryId} total={total} loading={loading} onCategorySelect={selectCategory}/><div className="max-w-7xl mx-auto px-6 py-10"><ProductListingResults products={products} loading={loading} error={error} refetch={refetch} total={total} fetching={fetching} sort={sort} onSortChange={changeSort} currentPage={Math.min(currentPage,totalPages)} totalPages={totalPages} onPageChange={changePage} addToCart={addToCart}/></div></div>;
}
