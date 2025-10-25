// RainbowGradient.jsx
import { useEffect, useState, useRef } from 'react';

export default function RainbowGradient() {
  const [amt, setAmt] = useState(0); // eased 0..1
  const [footerBox, setFooterBox] = useState({ height: 0, bottom: 0 }); // Track footer size and position

  useEffect(() => {
    let raf = null;
    let pull = 0;
    const MAX_PULL = 180;   // how much extra drag maps to full effect
    const DECAY = 0.9;

    const atBottom = () =>
      Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight;

    const tick = () => {
      const raw = Math.min(1, Math.max(0, pull / MAX_PULL));
      const eased = 1 - Math.pow(1 - raw, 3);
      setAmt(eased);

      pull *= DECAY;
      if (pull < 0.1) pull = 0;
      raf = pull ? requestAnimationFrame(tick) : null;
    };

    // Desktop (wheel/trackpad)
    const onWheel = (e) => {
      if (!atBottom() || e.deltaY <= 0) return;
      pull = Math.min(MAX_PULL, pull + e.deltaY);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // Touch
    let lastY = null;
    const onTouchStart = (e) => (lastY = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (lastY == null) return;
      const dy = lastY - e.touches[0].clientY; // up=+, down=-
      lastY = e.touches[0].clientY;
      if (atBottom() && dy < 0) {
        pull = Math.min(MAX_PULL, pull + (-dy));
        if (!raf) raf = requestAnimationFrame(tick);
      }
    };
    const onTouchEnd = () => (lastY = null);

    // Hide immediately once you leave bottom
    const onScroll = () => {
      if (!atBottom() && pull) {
        pull = 0;
        if (!raf) raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Track footer's real height and position with ResizeObserver + scroll listener
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const updateFooterBox = () => {
      const rect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate distance from viewport bottom to footer bottom
      const distanceFromBottom = viewportHeight - rect.bottom;

      setFooterBox({
        height: rect.height,
        bottom: distanceFromBottom, // Can be negative if footer is below viewport
      });
    };

    // Initial measurement
    updateFooterBox();

    // Watch for size changes
    const resizeObserver = new ResizeObserver(updateFooterBox);
    resizeObserver.observe(footer);

    // Watch for scroll changes
    window.addEventListener('scroll', updateFooterBox, { passive: true });
    window.addEventListener('resize', updateFooterBox, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', updateFooterBox);
      window.removeEventListener('resize', updateFooterBox);
    };
  }, []);

  // --- Tunables ---
  const BAND_HEIGHT = 800;   // px - height of the actual blurred band (large = softer)
  const SLIDE_UP_PX = 200;   // px - how far the band slides UP from bottom at full pull
  const OPACITY = 0.5;

  return (
    // Fixed clipping container - matches footer position and height, clips gradient to footer's box
    <div
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: `${footerBox.bottom}px`, // Follow footer's vertical position
        height: `${footerBox.height}px`, // Match footer's real height
        overflow: 'hidden',               // Clip rainbow to this box
        pointerEvents: 'none',
        zIndex: -1,                       // Behind all content including footer
      }}
    >
      {/* Rainbow band that slides up from below */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: `${BAND_HEIGHT}px`,
          // Start fully below container, slide up as amt increases
          transform: `translateY(${BAND_HEIGHT - (amt * SLIDE_UP_PX)}px)`,
          opacity: amt * OPACITY,
          filter: 'blur(48px)',      // bigger blur removes banding/lines
          willChange: 'transform, opacity',
          // Feather the top so no hard line is ever visible
          maskImage: 'radial-gradient(120% 130% at 50% 100%, #000 58%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(120% 130% at 50% 100%, #000 58%, transparent 85%)',
          background: `linear-gradient(
            to top,
            hsl(293,77%,65%) 0%,
            hsl(293,77%,65%) 14%,
            hsl(285,80%,60%) 14% 28%,
            hsl(278,76%,55%) 28% 42%,
            hsl(274,82%,55%) 42% 56%,
            hsl(270,85%,40%) 56% 70%,
            hsl(270,100%,10%) 70% 80%,
            hsl(270,100%,7%) 80% 90%,
            #0D001A 90% 100%
          )`,
        }}
      />
    </div>
  );
}