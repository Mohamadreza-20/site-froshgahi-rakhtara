import { useEffect, useRef, useState } from "react";

export default function LazyMount({ children, minHeight = 400, id }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible || !ref.current) return undefined;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "250px" },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div id={id} ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? (
        <div className="lazy-mount-enter">{children}</div>
      ) : (
        <div className="flex items-center justify-center animate-pulse" style={{ minHeight }} aria-hidden="true">
          <div className="w-8 h-8 rounded-full border-4 border-forest/15 border-t-camel animate-spin" />
        </div>
      )}
    </div>
  );
}
