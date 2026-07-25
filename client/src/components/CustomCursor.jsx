import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, label";

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouse  = { x: -100, y: -100 };
    let cursor = { x: -100, y: -100 };
    let raf = null;

    const loop = () => {
      // dot snaps instantly
      dot.style.transform  = `translate(${mouse.x - 3}px, ${mouse.y - 3}px)`;

      // ring lerps behind
      cursor.x += (mouse.x - cursor.x) * 0.12;
      cursor.y += (mouse.y - cursor.y) * 0.12;
      ring.style.transform = `translate(${cursor.x - 20}px, ${cursor.y - 20}px)`;

      // stop looping once the ring has caught up — restart on next move
      if (Math.abs(mouse.x - cursor.x) > 0.1 || Math.abs(mouse.y - cursor.y) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (raf === null) raf = requestAnimationFrame(loop);
    };

    // event delegation — no per-element listeners, no MutationObserver
    const onOver = (e) => {
      if (e.target.closest?.(INTERACTIVE)) ring.classList.add("cursor-ring--hover");
    };
    const onOut = (e) => {
      const from = e.target.closest?.(INTERACTIVE);
      if (from && !e.relatedTarget?.closest?.(INTERACTIVE)) {
        ring.classList.remove("cursor-ring--hover");
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
