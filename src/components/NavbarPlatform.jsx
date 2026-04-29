import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import DarkModeToggle from './DarkModeToggle';
import { menuItemVariants, menuVariants } from '../animations/motionVariants';
import { scrollToSection, updateHash } from '../utils/scrollToSection';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Courses', href: '/#courses' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/contact' },
];

const isHashLink = (href) => href.startsWith('/#');

const NavbarPlatform = ({ isDark, onToggleDark, isLoggedIn, onToggleAuth }) => {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!navRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, { y: -50, opacity: 0, duration: 0.7, ease: 'expo.out' });
    }, navRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return undefined;
    const timeout = window.setTimeout(() => scrollToSection(location.hash, { behavior: 'smooth' }), 80);
    return () => window.clearTimeout(timeout);
  }, [location.pathname, location.hash]);

  const handleNavClick = (event, href) => {
    if (!isHashLink(href)) return;
    event.preventDefault();
    const hash = href.slice(1);

    if (location.pathname === '/') {
      if (scrollToSection(hash)) updateHash(hash);
      return;
    }

    navigate(href);
  };

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/' && !location.hash;
    if (isHashLink(href)) return location.pathname === '/' && location.hash === href.slice(1);
    return location.pathname === href;
  };

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? isDark
            ? 'border-b border-white/10 bg-black/55 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl'
            : 'border-b border-slate-200/70 bg-white/85 py-3 shadow-xl shadow-slate-200/40 backdrop-blur-xl'
          : 'py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-4">
          <Link to="/" className="group flex shrink-0 items-center gap-2.5">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl text-base font-bold text-white transition-transform duration-300 group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #6e3bff, #00c2ff)' }}
            >
              W
            </div>
            <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              Whizz <span className="text-gradient">Computer</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 xl:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  to={href}
                  onClick={(event) => handleNavClick(event, href)}
                  className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(href)
                      ? 'text-brand-500 dark:text-brand-300'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {label}
                  {isActive(href) && (
                    <motion.div
                      layoutId="nav-pill-platform"
                      className="absolute inset-0 -z-10 rounded-xl"
                      style={{ background: isDark ? 'rgba(110, 59, 255, 0.18)' : 'rgba(110, 59, 255, 0.1)' }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <DarkModeToggle isDark={isDark} onToggle={onToggleDark} />

            <Link
              to="/dashboard"
              className="hidden items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-950 dark:border-white/10 dark:text-slate-200 dark:hover:text-white md:flex"
            >
              Dashboard
            </Link>

            <button
              type="button"
              onClick={onToggleAuth}
              className={`hidden rounded-xl px-4 py-2 text-sm font-semibold md:inline-flex ${
                isLoggedIn
                  ? 'border border-slate-300 text-slate-700 dark:border-white/15 dark:text-slate-200'
                  : 'text-white'
              }`}
              style={isLoggedIn ? undefined : { background: 'linear-gradient(135deg, #6e3bff, #4800e0)' }}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Toggle menu"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              className="flex flex-col gap-1.5 rounded-xl p-2 transition hover:bg-black/5 dark:hover:bg-white/5 xl:hidden"
            >
              <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block h-0.5 w-5 origin-center bg-slate-800 dark:bg-white" />
              <motion.span animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }} className="block h-0.5 w-5 bg-slate-800 dark:bg-white" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block h-0.5 w-5 origin-center bg-slate-800 dark:bg-white" />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div id="mobile-menu" variants={menuVariants} initial="closed" animate="open" exit="closed" className="overflow-hidden xl:hidden">
              <div className={`mt-4 rounded-3xl border p-4 shadow-2xl backdrop-blur-xl ${isDark ? 'border-white/10 bg-slate-950/90' : 'border-slate-200 bg-white/95'}`}>
                {NAV_LINKS.map(({ label, href }) => (
                  <motion.div key={label} variants={menuItemVariants}>
                    <Link
                      to={href}
                      onClick={(event) => handleNavClick(event, href)}
                      className={`flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive(href)
                          ? 'bg-brand-500/10 text-brand-500'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5'
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div variants={menuItemVariants} className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-200 pt-4 dark:border-white/10">
                  <Link to="/dashboard" className="rounded-2xl border border-brand-500/30 py-2.5 text-center text-sm font-medium text-brand-500">
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={onToggleAuth}
                    className={`rounded-2xl py-2.5 text-center text-sm font-semibold ${isLoggedIn ? 'border border-slate-300 text-slate-700 dark:border-white/15 dark:text-slate-200' : 'text-white'}`}
                    style={isLoggedIn ? undefined : { background: 'linear-gradient(135deg, #6e3bff, #4800e0)' }}
                  >
                    {isLoggedIn ? 'Logout' : 'Login'}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default NavbarPlatform;
