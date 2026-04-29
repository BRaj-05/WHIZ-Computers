// src/animations/gsapAnimations.js
// Central GSAP animation utilities with ScrollTrigger integration

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

/* ─── Defaults ─────────────────────────────────────────────── */
const EASE_OUT = 'power3.out';
const EASE_EXPO = 'expo.out';

/* ─── Loader Animations ────────────────────────────────────── */

/**
 * Animate loader text reveal char by char
 */
export const animateLoaderText = (chars, onComplete) => {
  const tl = gsap.timeline({ onComplete });

  tl.set(chars, { y: '100%', opacity: 0 })
    .to(chars, {
      y: '0%',
      opacity: 1,
      duration: 0.8,
      stagger: 0.04,
      ease: EASE_EXPO,
    })
    .to(chars, {
      y: '-110%',
      opacity: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: 'power2.in',
      delay: 0.6,
    });

  return tl;
};

/**
 * Fade out and remove loader overlay
 */
export const fadeOutLoader = (element, onComplete) => {
  return gsap.to(element, {
    opacity: 0,
    duration: 0.8,
    ease: EASE_OUT,
    onComplete,
  });
};

/* ─── Hero Animations ──────────────────────────────────────── */

/**
 * Split text into spans and animate each word/char
 */
export const splitAndAnimateText = (element) => {
  if (!element) return;

  const text = element.innerText;
  const words = text.split(' ');

  element.innerHTML = words
    .map(word => `<span class="overflow-hidden inline-block"><span class="split-word inline-block">${word}</span></span>`)
    .join(' ');

  const wordEls = element.querySelectorAll('.split-word');

  return gsap.from(wordEls, {
    y: '110%',
    opacity: 0,
    duration: 1,
    stagger: 0.08,
    ease: EASE_EXPO,
    delay: 0.2,
  });
};

/**
 * Hero subtitle fade in
 */
export const animateHeroSubtitle = (element, delay = 0.8) => {
  return gsap.from(element, {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: EASE_OUT,
    delay,
  });
};

/**
 * Hero CTA buttons entrance
 */
export const animateHeroButtons = (elements, delay = 1.1) => {
  return gsap.from(elements, {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: EASE_OUT,
    delay,
  });
};

/**
 * Floating orbs parallax on mouse move
 */
export const initMouseParallax = (container, elements) => {
  if (!container) return;

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = container.getBoundingClientRect();
    const xPos = (clientX - left - width / 2) / width;
    const yPos = (clientY - top - height / 2) / height;

    elements.forEach((el, i) => {
      if (!el) return;
      const depth = (i + 1) * 15;
      gsap.to(el, {
        x: xPos * depth,
        y: yPos * depth,
        duration: 1,
        ease: 'power2.out',
      });
    });
  };

  container.addEventListener('mousemove', handleMouseMove);
  return () => container.removeEventListener('mousemove', handleMouseMove);
};

/* ─── Scroll Animations ────────────────────────────────────── */

/**
 * Fade up on scroll (single element)
 */
export const fadeUpOnScroll = (element, options = {}) => {
  const { delay = 0, duration = 0.9, start = 'top 85%' } = options;

  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: 'play none none none',
    },
    y: 60,
    opacity: 0,
    duration,
    delay,
    ease: EASE_OUT,
  });
};

/**
 * Stagger fade up (multiple elements)
 */
export const staggerFadeUp = (elements, options = {}) => {
  const {
    stagger = 0.12,
    duration = 0.9,
    start = 'top 80%',
    trigger = elements[0],
    delay = 0,
  } = options;

  return gsap.from(elements, {
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none none',
    },
    y: 60,
    opacity: 0,
    duration,
    stagger,
    delay,
    ease: EASE_OUT,
  });
};

/**
 * Scale in from small
 */
export const scaleInOnScroll = (element, options = {}) => {
  const { start = 'top 85%', duration = 0.8 } = options;

  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: 'play none none none',
    },
    scale: 0.85,
    opacity: 0,
    duration,
    ease: EASE_OUT,
  });
};

/**
 * Reveal from left
 */
export const slideInFromLeft = (element, options = {}) => {
  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    x: -80,
    opacity: 0,
    duration: 1,
    ease: EASE_EXPO,
    ...options,
  });
};

/**
 * Reveal from right
 */
export const slideInFromRight = (element, options = {}) => {
  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    x: 80,
    opacity: 0,
    duration: 1,
    ease: EASE_EXPO,
    ...options,
  });
};

/* ─── Parallax Section ─────────────────────────────────────── */

/**
 * Parallax scroll effect on element
 */
export const initParallax = (element, speed = 0.5) => {
  if (!element) return;

  return gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
    y: `${speed * 100}px`,
    ease: 'none',
  });
};

/* ─── Horizontal Scroll ────────────────────────────────────── */

/**
 * Pin section and scroll track horizontally
 */
export const initHorizontalScroll = (section, track) => {
  if (!section || !track) return;

  const totalWidth = track.scrollWidth - window.innerWidth;

  return gsap.to(track, {
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: `+=${totalWidth}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
    x: -totalWidth,
    ease: 'none',
  });
};

/* ─── Navbar ───────────────────────────────────────────────── */

/**
 * Navbar entrance animation
 */
export const animateNavbar = (element) => {
  return gsap.from(element, {
    y: -80,
    opacity: 0,
    duration: 1,
    ease: EASE_EXPO,
    delay: 0.1,
  });
};

/* ─── Number Counter ───────────────────────────────────────── */

/**
 * Animate number from 0 to target
 */
export const animateCounter = (element, target, options = {}) => {
  const { duration = 2, delay = 0 } = options;
  const obj = { val: 0 };

  return gsap.to(obj, {
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    val: target,
    duration,
    delay,
    ease: 'power2.out',
    onUpdate: () => {
      if (element) element.textContent = Math.round(obj.val).toLocaleString();
    },
  });
};

/* ─── Cleanup ──────────────────────────────────────────────── */

/**
 * Kill all ScrollTrigger instances (call on unmount)
 */
export const killScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(t => t.kill());
};

export { gsap, ScrollTrigger };
