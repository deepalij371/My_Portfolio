import { useRef, useState, useEffect } from "react";

/**
 * Wraps children in an IntersectionObserver-based reveal animation.
 * Adds "reveal-in" class when the element enters the viewport.
 */
export default function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} ${className}`}>
      {children}
    </div>
  );
}
