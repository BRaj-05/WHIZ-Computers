// src/components/CustomCursor.jsx
// Smooth dual-ring custom cursor with hover detection

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Track mouse position
    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      // Snap dot instantly
      gsap.set(dot, { x: e.clientX, y: e.clientY });
    };

    // Smooth ring follows with lag
    const animate = () => {
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.12;
      gsap.set(ring, { x: ringPos.current.x, y: ringPos.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Hover effects on interactive elements
    const hoverEls = document.querySelectorAll(
      'a, button, [data-cursor="hover"], input, textarea, .cursor-hover'
    );

    const onEnter = () => {
      gsap.to(ring, { scale: 2.5, opacity: 0.6, duration: 0.3, ease: 'power2.out' });
      gsap.to(dot, { scale: 0.5, duration: 0.3 });
    };

    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMouseMove);

    // Hide on leave, show on enter
    const onLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };
    const onEnterWindow = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    document.addEventListener('mouseleave', onLeaveWindow);
    document.addEventListener('mouseenter', onEnterWindow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onLeaveWindow);
      document.removeEventListener('mouseenter', onEnterWindow);
      hoverEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      {/* Dot (snaps instantly) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#fff',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />

      {/* Ring (lags behind) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(110, 59, 255, 0.7)',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          transition: 'opacity 0.2s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;
