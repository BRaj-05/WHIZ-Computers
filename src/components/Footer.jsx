// src/components/Footer.jsx
// Premium footer with newsletter, links, and social icons

import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LINKS = {
  Courses: ['MS Office', 'Python', 'Web Design', 'Tally', 'Digital Marketing', 'Graphic Design'],
  Company: ['About Us', 'Blog', 'Careers', 'Press Kit', 'Partners'],
  Support: ['Contact', 'FAQ', 'Help Center', 'Privacy Policy', 'Terms of Service'],
};

const SOCIALS = [
  { label: 'Twitter', icon: 'X', href: '#' },
  { label: 'LinkedIn', icon: 'in', href: '#' },
  { label: 'Instagram', icon: '◎', href: '#' },
  { label: 'YouTube', icon: '▶', href: '#' },
];

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;
    gsap.from(footerRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-gray-200 dark:border-white/8"
      style={{ background: 'inherit' }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #6e3bff55, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">

        {/* ── Top: Brand + Newsletter ── */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5 w-fit">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ background: 'linear-gradient(135deg, #6e3bff, #00f5d4)' }}
              >
                W
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                Whizz <span className="text-gradient">Computer</span>
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              Empowering individuals with practical computer skills since 2016.
              Your journey to a better career starts here.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {['ISO Certified', '5★ Rated', 'Govt. Recognized'].map(badge => (
                <span
                  key={badge}
                  className="text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(110,59,255,0.08)',
                    border: '1px solid rgba(110,59,255,0.2)',
                    color: '#6e3bff',
                  }}
                >
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
              Stay in the loop
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              Get course updates, tips, and offers — straight to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300
                  bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10
                  text-gray-900 dark:text-white placeholder-gray-400
                  focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
              <button
                className="px-5 py-3 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:scale-105 shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #6e3bff, #4800e0)',
                  boxShadow: '0 4px 20px rgba(110,59,255,0.35)',
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ── Mid: Link Columns ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-16 border-t border-gray-200 dark:border-white/8 pt-12">
          {Object.entries(LINKS).map(([col, items]) => (
            <div key={col}>
              <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-5 tracking-wide">
                {col}
              </h5>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom Bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 dark:border-white/8 pt-8">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} Whizz Computer Institute. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ label, icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300
                  bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400
                  hover:bg-brand-500 hover:text-white hover:scale-110"
              >
                {icon}
              </a>
            ))}
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500">
            Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
