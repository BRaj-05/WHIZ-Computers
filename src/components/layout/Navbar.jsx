import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../ui/Button';
import { useDarkMode } from '../../hooks/useDarkMode';
import { scrollToSection, updateHash } from '../../utils/scrollToSection';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Courses', href: '/#courses' },
  { label: 'Contact', href: '/#contact' },
];

const isHashHref = (href) => href.startsWith('/#');

const ThemeToggle = ({ isDark, onToggle, tone }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    data-cursor="interactive"
    className={`group relative flex h-10 w-[72px] items-center rounded-full border px-1 transition-all duration-300 ${
      tone === 'light'
        ? 'border-slate-200/90 bg-slate-50/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_20px_rgba(148,163,184,0.12)]'
        : 'border-white/10 bg-white/6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_22px_rgba(2,8,23,0.22)]'
    }`}
  >
    <span className={`absolute left-3 font-mono text-[10px] font-medium uppercase tracking-[0.18em] transition-opacity ${isDark ? 'opacity-0' : 'opacity-55'}`}>
      Light
    </span>
    <span className={`absolute right-3 font-mono text-[10px] font-medium uppercase tracking-[0.18em] transition-opacity ${isDark ? 'opacity-55' : 'opacity-0'}`}>
      Dark
    </span>
    <span
      className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold text-white transition-all duration-300 ${
        isDark
          ? 'translate-x-[35px] bg-[linear-gradient(135deg,#5b4fff_0%,#279dff_100%)] shadow-[0_0_18px_rgba(91,79,255,0.28)]'
          : 'translate-x-0 bg-[linear-gradient(135deg,#111827_0%,#334155_100%)] shadow-[0_8px_18px_rgba(15,23,42,0.22)]'
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-white/95" />
    </span>
  </button>
);

const Navbar = ({ tone = 'dark' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleDark } = useDarkMode();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (event, href) => {
    if (!isHashHref(href)) return;

    event.preventDefault();
    const hash = href.slice(1);

    if (location.pathname === '/') {
      if (scrollToSection(hash)) {
        updateHash(hash);
      }
      return;
    }

    navigate(href);
  };

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/' && !location.hash;
    if (isHashHref(href)) return location.pathname === '/' && location.hash === href.slice(1);
    return location.pathname === href;
  };

  const shellClass =
    tone === 'light'
      ? `${isScrolled ? 'bg-white/90 shadow-[0_18px_45px_rgba(148,163,184,0.14)]' : 'bg-white/82 shadow-[0_12px_28px_rgba(148,163,184,0.10)]'} border border-slate-200/70 text-slate-900`
      : `${isScrolled ? 'bg-[#0a1020]/74 shadow-[0_18px_56px_rgba(2,8,23,0.34)]' : 'bg-[#0c1224]/66 shadow-[0_14px_36px_rgba(2,8,23,0.24)]'} border border-white/10 text-white`;

  const navLinkClass = (href) =>
    `group relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
      isActive(href)
        ? tone === 'light'
          ? 'text-slate-950'
          : 'text-white'
        : tone === 'light'
          ? 'text-slate-500 hover:text-slate-900'
          : 'text-slate-300 hover:text-white'
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className={`rounded-[28px] backdrop-blur-xl transition-all duration-300 ${shellClass}`}>
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6e3bff_0%,#00aef3_100%)] text-sm font-black text-white shadow-[0_0_36px_rgba(110,59,255,0.4)]">
                <span className="absolute inset-0 rounded-2xl bg-white/10" />
                <span className="relative">W</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-display text-base font-bold tracking-tight">Whizz Computer</div>
                <div className={`font-mono text-[11px] uppercase tracking-[0.28em] ${tone === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                  Build. Ship. Learn.
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={(event) => handleLinkClick(event, item.href)}
                  className={navLinkClass(item.href)}
                >
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className={`absolute inset-0 -z-10 rounded-full ${
                        tone === 'light'
                          ? 'bg-slate-900 text-white shadow-[0_10px_30px_rgba(15,23,42,0.16)]'
                          : 'bg-[linear-gradient(135deg,rgba(110,59,255,0.24),rgba(0,174,243,0.18))] shadow-[0_10px_30px_rgba(59,130,246,0.18)]'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {!isActive(item.href) && (
                    <span className={`absolute inset-x-3 bottom-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                      tone === 'light' ? 'bg-slate-400/80' : 'bg-white/45'
                    }`} />
                  )}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-2 sm:flex">
              <ThemeToggle isDark={isDark} onToggle={toggleDark} tone={tone} />
              <Button to="/login" variant={tone === 'light' ? 'ghostLight' : 'secondary'} size="sm">
                Login
              </Button>
              <Button to="/register" size="sm">
                Get started
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              data-cursor="interactive"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border lg:hidden ${
                tone === 'light' ? 'border-slate-200 bg-white/70 text-slate-900' : 'border-white/10 bg-white/5 text-white'
              }`}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block h-0.5 w-5 bg-current" />
                <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="block h-0.5 w-5 bg-current" />
                <motion.span animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block h-0.5 w-5 bg-current" />
              </div>
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-inherit lg:hidden"
              >
                <div className="space-y-2 px-4 py-4 sm:px-6">
                  {NAV_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={(event) => handleLinkClick(event, item.href)}
                      className={`block rounded-2xl px-4 py-3 text-sm font-semibold ${
                        isActive(item.href)
                          ? tone === 'light'
                            ? 'bg-slate-900 text-white'
                            : 'bg-white/10 text-white'
                          : tone === 'light'
                            ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="col-span-1 flex items-center justify-center">
                      <ThemeToggle isDark={isDark} onToggle={toggleDark} tone={tone} />
                    </div>
                    <Button to="/login" variant={tone === 'light' ? 'ghostLight' : 'secondary'} size="sm" className="justify-center">
                      Login
                    </Button>
                    <Button to="/register" size="sm" className="justify-center">
                      Join now
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
