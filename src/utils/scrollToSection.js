const HEADER_OFFSET = 104;

export const scrollToSection = (hash, options = {}) => {
  if (typeof window === 'undefined' || !hash) return false;

  const id = hash.startsWith('#') ? hash.slice(1) : hash;
  const target = document.getElementById(id);

  if (!target) return false;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: options.behavior ?? (prefersReducedMotion ? 'auto' : 'smooth'),
  });

  return true;
};

export const updateHash = (hash) => {
  if (typeof window === 'undefined' || !hash) return;

  const nextHash = hash.startsWith('#') ? hash : `#${hash}`;
  window.history.replaceState(null, '', `${window.location.pathname}${nextHash}`);
};
