import { useEffect, useRef, useState } from "react";

export default function LazyMount({ children, minHeight = 400, id }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (visible || !ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const raf = requestAnimationFrame(() => {
      const timeoutId = setTimeout(() => setShown(true), 40);
      return () => clearTimeout(timeoutId);
    });
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  return (
    <div id={id} ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? (
        <div
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(28px)",
            transition:
              "opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {children}
        </div>
      ) : (
        <div className="flex items-center justify-center animate-pulse" style={{ minHeight }}>
          <div className="w-8 h-8 rounded-full border-4 border-forest/15 border-t-camel animate-spin" />
        </div>
      )}
    </div>
  );
}
