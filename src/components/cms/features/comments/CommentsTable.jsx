import { MessageSquare } from "lucide-react";
import CommentRow from "./CommentRow";
import { Pagination } from "../../ui";

export default function CommentsTable({ loading, comments, productNameMap, currentPage, totalPages, onPageChange, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EEF0F5] p-5 shadow-sm shadow-black/[0.02] space-y-5">
      <div className="bg-white rounded-2xl border border-[#EEF0F5] overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="text-[#9CA3AF] text-xs border-b border-[#EEF0F5]">
              <th className="text-right font-medium px-5 py-3">محصول</th>
              <th className="text-right font-medium px-5 py-3">نویسنده</th>
              <th className="text-right font-medium px-5 py-3">امتیاز</th>
              <th className="text-right font-medium px-5 py-3">متن نظر</th>
              <th className="text-right font-medium px-5 py-3">تاریخ</th>
              <th className="px-5 py-3"><span className="sr-only">عملیات</span></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-10 text-[#6B7280] text-sm">در حال بارگذاری نظرات...</td></tr>
            ) : comments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-[#6B7280] text-sm">
                  <div className="flex flex-col items-center gap-2"><MessageSquare size={22} className="text-[#D1D5DB]" aria-hidden="true" />نظری با این مشخصات پیدا نشد</div>
                </td>
              </tr>
            ) : (
              comments.map((comment) => (
                <CommentRow key={comment.id} comment={comment} productName={productNameMap.get(String(comment.productId))} onDelete={onDelete} />
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
