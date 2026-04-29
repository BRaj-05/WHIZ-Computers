// src/components/Loader.jsx
// Fullscreen preloader with GSAP text reveal animation

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LOADER_WORDS = ['LEARN.', 'BUILD.', 'SUCCEED.'];

const Loader = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const wordRefs = useRef([]);
  const progressRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const progress = progressRef.current;
    const counter = counterRef.current;

    if (!overlay) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out loader
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut',
          onComplete: () => {
            overlay.style.display = 'none';
            onComplete?.();
          },
        });
      },
    });

    // Counter animation
    const obj = { val: 0 };
    tl.to(obj, {
      val: 100,
      duration: 2.4,
      ease: 'power1.inOut',
      onUpdate: () => {
        if (counter) counter.textContent = `${Math.round(obj.val)}%`;
        if (progress) {
          progress.style.transform = `scaleX(${obj.val / 100})`;
        }
      },
    }, 0);

    // Word reveals
    LOADER_WORDS.forEach((_, i) => {
      const wordEl = wordRefs.current[i];
      if (!wordEl) return;

      tl.fromTo(
        wordEl,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.5, ease: 'expo.out' },
        i * 0.55
      ).to(
        wordEl,
        { y: '-110%', opacity: 0, duration: 0.4, ease: 'power2.in' },
        i * 0.55 + 0.45
      );
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="loader-overlay flex-col"
      style={{ zIndex: 9999 }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, #1a0a3e 0%, #080714 70%)',
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(110,59,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(110,59,255,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Logo mark */}
      <div className="relative z-10 mb-16 flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
          style={{ background: 'linear-gradient(135deg, #6e3bff, #00f5d4)' }}
        >
          W
        </div>
        <span className="text-white text-xl font-semibold tracking-wide" style={{ fontFamily: 'Syne, sans-serif' }}>
          Whizz Computer
        </span>
      </div>

      {/* Animated word */}
      <div className="relative z-10 overflow-hidden h-24 flex items-center justify-center mb-8">
        {LOADER_WORDS.map((word, i) => (
          <span
            key={word}
            ref={(el) => (wordRefs.current[i] = el)}
            className="absolute text-5xl md:text-7xl font-bold tracking-tighter"
            style={{
              fontFamily: 'Syne, sans-serif',
              background: 'linear-gradient(135deg, #fff 0%, #a78bff 50%, #00f5d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transform: 'translateY(100%)',
              opacity: 0,
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-64 h-px bg-white/10 mb-4 overflow-hidden">
        <div
          ref={progressRef}
          className="absolute inset-0 origin-left"
          style={{
            background: 'linear-gradient(90deg, #6e3bff, #00f5d4)',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      {/* Counter */}
      <span
        ref={counterRef}
        className="relative z-10 text-white/40 text-sm font-mono tracking-widest"
      >
        0%
      </span>
    </div>
  );
};

export default Loader;
