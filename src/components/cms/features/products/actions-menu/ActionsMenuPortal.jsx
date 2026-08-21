import { createPortal } from "react-dom";

export default function ActionsMenuPortal({ menuRef, menuId, triggerId, position, items, onSelect }) {
  return createPortal(
    <div
      ref={menuRef}
      id={menuId}
      role="menu"
      aria-labelledby={triggerId}
      dir="rtl"
      style={{
        position: "fixed",
        top: position ? position.top : 0,
        left: position ? position.left : 0,
        transform: position?.openUpward ? "translateY(-100%)" : "none",
        visibility: position ? "visible" : "hidden",
      }}
      className="w-36 bg-white rounded-xl border border-[#EEF0F5] shadow-lg shadow-black/[0.06] py-1.5 z-[999]"
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => onSelect(item)}
          role="menuitem"
          className={`cursor-pointer w-full flex items-center gap-2 px-3.5 py-2 text-sm text-right transition ${item.danger ? "text-[#DC2626] hover:bg-[#FEF2F2]" : "text-[#374151] hover:bg-[#F5F6FA]"}`}
        >
          {item.icon && <item.icon size={15} aria-hidden="true" />}
          {item.label}
        </button>
      ))}
    </div>,
    document.body,
  );
}
