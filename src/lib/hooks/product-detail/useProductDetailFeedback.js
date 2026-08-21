import { useCallback, useEffect, useRef, useState } from "react";
export function useProductDetailFeedback() {
  const [justAdded, setJustAdded] = useState(false);
  const timeoutRef = useRef(null);
  useEffect(() => () => clearTimeout(timeoutRef.current), []);
  const flash = useCallback(() => {
    setJustAdded(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setJustAdded(false), 1200);
  }, []);
  return { justAdded, flash };
}
