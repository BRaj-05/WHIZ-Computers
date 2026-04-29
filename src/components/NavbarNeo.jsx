import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import DarkModeToggle from './DarkModeToggle';
import { menuItemVariants, menuVariants } from '../animations/motionVariants';
import { scrollToSection, updateHash } from '../utils/scrollToSection';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Courses', href: '/#courses' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

const isHashLink = (href) => href.startsWith('/#');

const NavbarNeo = ({ isDark, onToggleDark }) => {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!navRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, { y: -40, opacity: 0, duration: 0.7, ease: 'expo.out' });
    }, navRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
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
    <header ref={navRef} className="fixed inset-x-0 top-0 z-[120] px-4 pt-4 sm:px-6 lg:px-8">
      <div className={`mx-auto max-w-7xl rounded-[1.8rem] border transition-all duration-300 ${scrolled ? 'border-white/10 bg-[#0c0b17]/88 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl' : 'border-white/10 bg-[#0f0c1f]/78 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl'}`}>
        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <Link to="/" className="group flex shrink-0 items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold text-white transition-transform duration-300 group-hover:scale-105" style={{ background: 'linear-gradient(135deg, #6e3bff, #18b6ff)' }}>
              W
            </div>
            <div className="text-[1.7rem] font-bold leading-none text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              Whizz<span className="text-gradient">Computer</span>
            </div>
          </Link>

          <ul className="hidden items-center gap-1 xl:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link to={href} onClick={(event) => handleNavClick(event, href)} className={`relative rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${isActive(href) ? 'text-white' : 'text-slate-300 hover:text-white'}`}>
                  {label}
                  {isActive(href) && <motion.div layoutId="nav-pill-neo" className="absolute inset-0 -z-10 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(110,59,255,0.32), rgba(0,194,255,0.14))' }} />}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <DarkModeToggle isDark={isDark} onToggle={onToggleDark} />
            <Link to="/dashboard" className="hidden items-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 md:inline-flex">
              Dashboard
            </Link>
            <Link to="/login" className="relative hidden items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 md:inline-flex">
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_62%)] opacity-70" />
              <span className="relative">Login</span>
            </Link>
            <Link to="/register" className="relative hidden items-center overflow-hidden rounded-2xl px-5 py-3 text-sm font-semibold text-transparent md:inline-flex" style={{ background: 'linear-gradient(135deg, #6e3bff, #4800e0)' }}>
              <span className="absolute -right-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-xl" />
              <span className="absolute inset-0 flex items-center justify-center text-white">Sign Up -&gt;</span>
              Register →
            </Link>
            <button type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu" aria-controls="mobile-menu" aria-expanded={menuOpen} className="flex flex-col gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-3 text-white xl:hidden">
              <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block h-0.5 w-5 origin-center bg-white" />
              <motion.span animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }} className="block h-0.5 w-5 bg-white" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block h-0.5 w-5 origin-center bg-white" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div id="mobile-menu" variants={menuVariants} initial="closed" animate="open" exit="closed" className="overflow-hidden xl:hidden">
              <div className="mx-5 mb-5 rounded-[1.6rem] border border-white/10 bg-black/20 p-4 backdrop-blur-xl">
                {NAV_LINKS.map(({ label, href }) => (
                  <motion.div key={label} variants={menuItemVariants}>
                    <Link to={href} onClick={(event) => handleNavClick(event, href)} className={`flex items-center rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${isActive(href) ? 'bg-brand-500/12 text-white' : 'text-slate-200 hover:bg-white/5'}`}>
                      {label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={menuItemVariants} className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
                  <Link to="/dashboard" className="rounded-2xl border border-brand-500/30 py-3 text-center text-sm font-semibold text-brand-200">Dashboard</Link>
                  <Link to="/login" className="rounded-2xl border border-white/12 bg-white/5 py-3 text-center text-sm font-semibold text-white">Login</Link>
                </motion.div>
                <motion.div variants={menuItemVariants} className="mt-2">
                  <Link to="/register" className="relative block rounded-2xl py-3 text-center text-sm font-semibold text-transparent" style={{ background: 'linear-gradient(135deg, #6e3bff, #4800e0)' }}>
                    <span className="absolute inset-0 flex items-center justify-center text-white">Sign Up -&gt;</span>
                    Register →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default NavbarNeo;
