// src/components/FooterEnhanced.jsx
// Premium animated footer with slides, transitions, and coding elements

import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FOOTER_SLIDES = [
  {
    id: 1,
    title: "Learn What Matters",
    description: "Industry-relevant courses designed by experts",
    icon: "📚",
    color: "#6e3bff",
  },
  {
    id: 2,
    title: "Build Real Projects",
    description: "Hands-on projects from day one",
    icon: "🛠️",
    color: "#00f5d4",
  },
  {
    id: 3,
    title: "Launch Your Career",
    description: "Job-ready skills and placement support",
    icon: "🚀",
    color: "#ff6b9d",
  },
];

const LINKS = {
  Courses: [
    "MS Office",
    "Python",
    "Web Design",
    "Tally",
    "Digital Marketing",
    "Graphic Design",
  ],
  Company: ["About Us", "Blog", "Careers", "Press Kit", "Partners"],
  Support: [
    "Contact",
    "FAQ",
    "Help Center",
    "Privacy Policy",
    "Terms of Service",
  ],
};

const SOCIALS = [
  { label: "Twitter", icon: "𝕏", href: "#" },
  { label: "LinkedIn", icon: "in", href: "#" },
  { label: "Instagram", icon: "◎", href: "#" },
  { label: "YouTube", icon: "▶", href: "#" },
];

const FooterEnhanced = () => {
  const footerRef = useRef(null);
  const slidesRef = useRef([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!footerRef.current) return;

    // Main fade-in
    gsap.from(footerRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
    });

    // Stagger section animations
    const sections = footerRef.current.querySelectorAll(".footer-section");
    sections.forEach((section, i) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        x: i % 2 === 0 ? -30 : 30,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: "expo.out",
      });
    });
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % FOOTER_SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animate active slide
  useEffect(() => {
    slidesRef.current.forEach((slide, idx) => {
      if (slide) {
        gsap.to(slide, {
          opacity: activeSlide === idx ? 1 : 0.3,
          scale: activeSlide === idx ? 1 : 0.95,
          duration: 0.6,
          ease: "power2.inOut",
        });
      }
    });
  }, [activeSlide]);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black border-t border-gray-200 dark:border-white/10"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div
          className="absolute top-0 left-10 w-72 h-72 opacity-10"
          style={{
            background: "radial-gradient(circle, #6e3bff, transparent)",
            filter: "blur(80px)",
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 right-10 w-72 h-72 opacity-10"
          style={{
            background: "radial-gradient(circle, #00f5d4, transparent)",
            filter: "blur(80px)",
            animation: "float 25s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Main content wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* ━━━ SECTION 1: Feature Slides ━━━ */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {FOOTER_SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                ref={(el) => (slidesRef.current[idx] = el)}
                onClick={() => setActiveSlide(idx)}
                className="group relative p-6 rounded-2xl cursor-pointer transition-all duration-500 backdrop-blur-sm border"
                style={{
                  background:
                    activeSlide === idx
                      ? `${slide.color}15`
                      : "rgba(255,255,255,0.05)",
                  borderColor:
                    activeSlide === idx
                      ? slide.color + "66"
                      : "rgba(255,255,255,0.1)",
                  boxShadow:
                    activeSlide === idx ? `0 0 40px ${slide.color}33` : "none",
                }}
              >
                {/* Icon */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {slide.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {slide.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {slide.description}
                </p>

                {/* Indicator dot */}
                <div className="mt-4 flex gap-1">
                  {FOOTER_SLIDES.map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: activeSlide === idx && i < 2 ? "8px" : "4px",
                        background:
                          activeSlide === idx
                            ? slide.color
                            : "rgba(255,255,255,0.2)",
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Active slide message */}
          <div
            className="p-6 rounded-2xl border text-center transition-all duration-500"
            style={{
              background: `${FOOTER_SLIDES[activeSlide].color}08`,
              borderColor: FOOTER_SLIDES[activeSlide].color + "33",
            }}
          >
            <p className="text-gray-700 dark:text-gray-300 font-semibold">
              ✨ {FOOTER_SLIDES[activeSlide].description}
            </p>
          </div>
        </div>

        {/* ━━━ SECTION 2: Newsletter + Brand ━━━ */}
        <div className="footer-section grid lg:grid-cols-2 gap-16 mb-16 pb-16 border-b border-gray-200 dark:border-white/10">
          {/* Brand section */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6 w-fit group">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: "linear-gradient(135deg, #6e3bff, #00f5d4)",
                }}
              >
                W
              </div>
              <span
                className="text-2xl font-bold text-gray-900 dark:text-white"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Whizz{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #6e3bff, #00f5d4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Computer
                </span>
              </span>
            </Link>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              Empowering individuals with practical computer skills since 2016.
              Your journey to a better career starts here.
            </p>

            {/* Trust badges with animation */}
            <div className="flex flex-wrap gap-3">
              {["ISO Certified", "5★ Rated", "Govt. Recognized"].map(
                (badge, i) => (
                  <div
                    key={badge}
                    className="text-xs font-semibold px-3 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
                    style={{
                      background: "rgba(110,59,255,0.12)",
                      border: "1.5px solid rgba(110,59,255,0.3)",
                      color: "#6e3bff",
                    }}
                  >
                    ✓ {badge}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Newsletter section */}
          <div className="flex flex-col justify-center">
            <h4
              className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Stay Updated
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              Get exclusive course updates, coding tips, and career
              opportunities.
            </p>

            {/* Newsletter form with animation */}
            <div className="space-y-3">
              <div className="flex gap-2 group">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300
                    bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10
                    text-gray-900 dark:text-white placeholder-gray-500
                    focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30
                    group-hover:border-purple-400"
                />
                <button
                  className="px-6 py-3 text-sm font-bold text-white rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, #6e3bff, #4800e0)",
                    boxShadow: "0 8px 25px rgba(110,59,255,0.4)",
                  }}
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                We'll never spam you. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* ━━━ SECTION 3: Link Columns ━━━ */}
        <div className="footer-section grid grid-cols-2 md:grid-cols-3 gap-10 mb-16 pb-16 border-b border-gray-200 dark:border-white/10">
          {Object.entries(LINKS).map(([col, items]) => (
            <div key={col}>
              <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-5 tracking-wide uppercase">
                {col}
              </h5>
              <ul className="space-y-3">
                {items.map((item, i) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-cyan-400 transition-all duration-300 hover:translate-x-1 inline-block"
                      style={{
                        transitionDelay: `${i * 50}ms`,
                      }}
                    >
                      {item} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ━━━ SECTION 4: Bottom Bar ━━━ */}
        <div className="footer-section flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
          {/* Copyright */}
          <div className="text-xs text-gray-500 dark:text-gray-600">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold">Whizz Computer Institute</span>.
              All rights reserved.
            </p>
          </div>

          {/* Social links with hover animations */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ label, icon, href }, i) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300
                  bg-gray-200 dark:bg-white/5 text-gray-700 dark:text-gray-400
                  hover:text-white hover:scale-110 hover:shadow-lg"
                style={{
                  transitionDelay: `${i * 50}ms`,
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    background: "linear-gradient(135deg, #6e3bff, #00f5d4)",
                    duration: 0.3,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    background: "rgba(255,255,255,0.05)",
                    duration: 0.3,
                  });
                }}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Tagline */}
          <div className="text-xs text-gray-500 dark:text-gray-600 text-center sm:text-right">
            Made with <span className="text-red-500">❤️</span> in India
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </footer>
  );
};

export default FooterEnhanced;
