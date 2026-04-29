// src/components/NavbarUltra.jsx
// Ultra-advanced navbar with premium animations and stunning effects

import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import DarkModeToggle from "./DarkModeToggle";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Courses", href: "/#courses" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

const NavbarUltra = ({ isDark, onToggleDark }) => {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const mousePos = useRef({ x: 0, y: 0 });

  // GSAP entrance animation
  useEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -60,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        delay: 0.15,
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Prevent scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Mouse tracking for gradient effect
  const handleMouseMove = (e) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleNavClick = (event, href) => {
    if (!href.startsWith("/#")) return;
    event.preventDefault();
    const hash = href.slice(2);
    if (location.pathname === "/") {
      const target = document.querySelector(`#${hash}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `/#${hash}`);
      }
      return;
    }
    navigate(href);
  };

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/" && !location.hash;
    if (href.startsWith("/#"))
      return location.pathname === "/" && location.hash === href.slice(1);
    return location.pathname === href;
  };

  return (
    <header
      ref={navRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-x-0 top-0 z-[120] px-4 pt-3 sm:px-6 lg:px-8 transition-all duration-300"
    >
      <div
        className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-500 ${
          scrolled
            ? "bg-slate-950/85 shadow-2xl backdrop-blur-3xl border-white/20"
            : "bg-slate-950/50 shadow-lg backdrop-blur-2xl border-white/10"
        }`}
        style={{
          background: scrolled
            ? "linear-gradient(135deg, rgba(10,15,30,0.9) 0%, rgba(5,10,25,0.95) 100%)"
            : "linear-gradient(135deg, rgba(20,28,50,0.6) 0%, rgba(10,20,40,0.6) 100%)",
          boxShadow: scrolled
            ? "0 12px 48px rgba(0,0,0,0.7), 0 0 3px rgba(110,59,255,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
            : "0 6px 24px rgba(0,0,0,0.3), 0 0 1px rgba(110,59,255,0.2)",
        }}
      >
        <div className="flex items-center justify-between gap-4 px-6 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 8 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-11 w-11 items-center justify-center rounded-xl font-bold text-white shadow-lg shadow-purple-600/50 hover:shadow-purple-600/80 transition-shadow"
              style={{
                background:
                  "linear-gradient(135deg, #6e3bff 0%, #4800e0 50%, #18b6ff 100%)",
              }}
            >
              W
            </motion.div>
            <div className="hidden flex-col sm:flex">
              <span className="text-lg font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all">
                Whizz
              </span>
              <span
                className="text-xs font-semibold leading-tight"
                style={{
                  background: "linear-gradient(90deg, #6e3bff, #18b6ff)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Computer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            className="hidden items-center gap-2 xl:flex"
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.div
                key={label}
                variants={navItemVariants}
                className="relative"
              >
                <Link
                  to={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`group relative overflow-hidden rounded-2xl px-4 py-2 text-sm font-semibold transition duration-300 ${
                    isActive(href)
                      ? "text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{label}</span>
                  <span className="pointer-events-none absolute inset-x-0 bottom-1 mx-auto h-0.5 w-10 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 transition duration-300 group-hover:opacity-100" />
                  {isActive(href) && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-2xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(110,59,255,0.35), rgba(24,182,255,0.18))",
                        boxShadow: "0 0 20px rgba(110,59,255,0.25)",
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.25,
                        duration: 0.55,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <DarkModeToggle isDark={isDark} onToggle={onToggleDark} />

            {/* Dashboard Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/dashboard"
                className="hidden md:inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/15 hover:border-white/30 hover:shadow-lg"
              >
                <span>Dashboard</span>
              </Link>
            </motion.div>

            {/* Login Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="hidden md:inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/15 hover:border-white/30 hover:shadow-lg"
              >
                <span>Login</span>
              </Link>
            </motion.div>

            {/* Sign Up Button */}
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
              <Link
                to="/register"
                className="hidden md:inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(135deg, #6e3bff 0%, #4800e0 50%, #7c3aed 100%)",
                }}
              >
                <span>Sign Up</span>
                <span className="text-xs">→</span>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 p-2.5 xl:hidden transition-all"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 bg-white"
              />
              <motion.span
                animate={
                  menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }
                }
                className="block h-0.5 w-5 bg-white"
              />
              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                }
                className="block h-0.5 w-5 bg-white"
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden xl:hidden"
            >
              <div className="space-y-2 px-6 pb-6 pt-4">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      to={href}
                      onClick={(e) => handleNavClick(e, href)}
                      className={`block rounded-lg px-4 py-3 font-semibold transition-all ${
                        isActive(href)
                          ? "bg-gradient-to-r from-purple-500/30 to-cyan-500/20 text-white border border-white/20"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4"
                >
                  <Link
                    to="/login"
                    className="rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 py-2.5 text-center text-sm font-semibold text-white transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-lg py-2.5 text-center text-sm font-semibold text-white hover:shadow-lg transition-all"
                    style={{
                      background: "linear-gradient(135deg, #6e3bff, #4800e0)",
                    }}
                  >
                    Sign Up
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

export default NavbarUltra;
