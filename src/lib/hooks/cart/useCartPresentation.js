import { useCallback, useEffect, useRef, useState } from "react";

export function useCartPresentation() {
  const [bump, setBump] = useState(false);
  const bumpTimeout = useRef(null);

  const flashBump = useCallback(() => {
    setBump(true);
    window.clearTimeout(bumpTimeout.current);
    bumpTimeout.current = window.setTimeout(() => setBump(false), 300);
  }, []);

  useEffect(() => () => window.clearTimeout(bumpTimeout.current), []);

  return { bump, flashBump };
}
