import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";

const MENU_WIDTH = 144;
const MENU_MARGIN = 8;

export function useActionsMenu() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const instanceId = useId().replace(/:/g, "");
  const triggerId = `product-actions-trigger-${instanceId}`;
  const menuId = `product-actions-menu-${instanceId}`;

  const calculatePosition = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const menuHeight = menuRef.current?.offsetHeight ?? 100;
    const openUpward = window.innerHeight - rect.bottom < menuHeight + MENU_MARGIN;
    const left = Math.max(MENU_MARGIN, Math.min(rect.left, window.innerWidth - MENU_MARGIN - MENU_WIDTH));
    setPosition({ left, top: openUpward ? rect.top - MENU_MARGIN : rect.bottom + MENU_MARGIN, openUpward });
  }, []);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  const toggle = useCallback((event) => {
    event.stopPropagation();
    setOpen((current) => !current);
  }, []);

  useLayoutEffect(() => {
    if (!open) return undefined;
    calculatePosition();
    const frame = requestAnimationFrame(() => menuRef.current?.querySelector('[role="menuitem"]')?.focus());
    return () => cancelAnimationFrame(frame);
  }, [calculatePosition, open]);

  useEffect(() => {
    if (!open) return undefined;
    const handlePointerDown = (event) => {
      if (!buttonRef.current?.contains(event.target) && !menuRef.current?.contains(event.target)) close();
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") { event.preventDefault(); close(true); return; }
      if (!menuRef.current || !["ArrowDown", "ArrowUp"].includes(event.key)) return;
      event.preventDefault();
      const items = [...menuRef.current.querySelectorAll('[role="menuitem"]')];
      if (!items.length) return;
      const current = items.indexOf(document.activeElement);
      const next = event.key === "ArrowDown" ? (current + 1 + items.length) % items.length : (current - 1 + items.length) % items.length;
      items[next]?.focus();
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", calculatePosition, true);
    window.addEventListener("resize", calculatePosition);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", calculatePosition, true);
      window.removeEventListener("resize", calculatePosition);
    };
  }, [calculatePosition, close, open]);

  return { open, position, buttonRef, menuRef, triggerId, menuId, toggle, close };
}
