// src/animations/motionVariants.js
// Framer Motion variants for page transitions and component animations

/* ─── Page Transitions ─────────────────────────────────────── */

export const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(4px)',
    transition: {
      duration: 0.18,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

/* Slide page transition */
export const slidePageVariants = {
  initial: { x: '100%', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    x: '-30%',
    opacity: 0,
    transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] },
  },
};

/* ─── Mobile Menu ──────────────────────────────────────────── */

export const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.4,
      ease: [0.7, 0, 0.84, 0],
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      when: 'beforeChildren',
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

export const menuItemVariants = {
  closed: { opacity: 0, x: -20, filter: 'blur(4px)' },
  open: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { ease: [0.16, 1, 0.3, 1], duration: 0.5 },
  },
};

/* ─── Card Hover ───────────────────────────────────────────── */

export const cardHoverVariants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.01,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── Fade In Stagger Container ────────────────────────────── */

export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── Dark Mode Toggle ─────────────────────────────────────── */

export const toggleVariants = {
  light: { x: 2 },
  dark: { x: 26 },
};

/* ─── Loader ───────────────────────────────────────────────── */

export const loaderBarVariants = {
  initial: { scaleX: 0, originX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── Tooltip / Popover ────────────────────────────────────── */

export const tooltipVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 5 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

/* ─── Notification Badge ───────────────────────────────────── */

export const badgeVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 500, damping: 25 },
  },
};
