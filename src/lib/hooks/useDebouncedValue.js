import { useEffect, useState } from "react";

export function useDebouncedValue(value, delay = 450) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, Math.max(0, delay));

    return () => window.clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}
