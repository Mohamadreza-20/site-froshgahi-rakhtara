import { MoreHorizontal } from "lucide-react";
import ActionsMenuPortal from "./actions-menu/ActionsMenuPortal";
import { useActionsMenu } from "../../../../lib/hooks/useActionsMenu";

export default function ActionsMenu({ items }) {
  const menu = useActionsMenu();
  return (
    <div className="relative inline-block">
      <button
        ref={menu.buttonRef}
        type="button"
        onClick={menu.toggle}
        aria-label="عملیات بیشتر"
        aria-expanded={menu.open}
        aria-haspopup="menu"
        aria-controls={menu.menuId}
        id={menu.triggerId}
        className="cursor-pointer text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F5F6FA] p-1 rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30"
      >
        <MoreHorizontal size={18} aria-hidden="true" />
      </button>
      {menu.open && (
        <ActionsMenuPortal
          menuRef={menu.menuRef}
          menuId={menu.menuId}
          triggerId={menu.triggerId}
          position={menu.position}
          items={items}
          onSelect={(item) => { menu.close(); item.onClick(); }}
        />
      )}
    </div>
  );
}
