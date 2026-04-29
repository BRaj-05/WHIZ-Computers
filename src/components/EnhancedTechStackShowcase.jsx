// src/components/EnhancedTechStackShowcase.jsx
// Ultra-advanced tech stack showcase with animated icons and smooth scrolling

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const TECH_ITEMS = [
  {
    name: "Python",
    icon: "🐍",
    color: "#3776ab",
    bg: "from-blue-600/20 to-blue-500/10",
  },
  {
    name: "React",
    icon: "⚛️",
    color: "#61dafb",
    bg: "from-cyan-500/20 to-cyan-400/10",
  },
  {
    name: "JavaScript",
    icon: "✨",
    color: "#f7df1e",
    bg: "from-yellow-500/20 to-yellow-400/10",
  },
  {
    name: "Web Design",
    icon: "🎨",
    color: "#ff6b6b",
    bg: "from-red-600/20 to-red-500/10",
  },
  {
    name: "Node.js",
    icon: "🔗",
    color: "#68a063",
    bg: "from-green-600/20 to-green-500/10",
  },
  {
    name: "Databases",
    icon: "💾",
    color: "#13aa52",
    bg: "from-emerald-600/20 to-emerald-500/10",
  },
  {
    name: "DevOps",
    icon: "⚙️",
    color: "#1e90ff",
    bg: "from-blue-700/20 to-blue-600/10",
  },
  {
    name: "Mobile Dev",
    icon: "📱",
    color: "#3776ab",
    bg: "from-indigo-600/20 to-indigo-500/10",
  },
];

const TechCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.from(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: "expo.out",
    });
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: 1.08, rotateY: 5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl border border-white/10 p-6 backdrop-blur-md transition-all duration-300 cursor-pointer bg-gradient-to-br ${item.bg}`}
    >
      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-2xl blur-xl opacity-30 -z-10"
          style={{ background: item.color }}
        />
      )}

      {/* Icon container */}
      <motion.div
        animate={{ y: isHovered ? -8 : 0, rotate: isHovered ? 12 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-5xl mb-4 origin-center"
      >
        {item.icon}
      </motion.div>

      {/* Name */}
      <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>

      {/* Progress bar */}
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "85%" }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`,
          }}
        />
      </div>

      {/* Skill level text */}
      <p className="text-xs text-slate-400 mt-2">Expert Level</p>
    </motion.div>
  );
};

const EnhancedTechStackShowcase = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress =
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

      setScrollPos(Math.max(0, Math.min(1, scrollProgress)));

      if (headingRef.current) {
        gsap.to(headingRef.current, {
          y: scrollProgress * 30,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Title animation
  useEffect(() => {
    if (!headingRef.current) return;

    const ctx = gsap.context(() => {
      const lines = headingRef.current.querySelectorAll(".line");
      gsap.from(lines, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "expo.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #172554 50%, #0f172a 100%)",
          }}
        />

        {/* Animated gradient orbs */}
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl animate-glow-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(110, 59, 255, 0.6) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-15 blur-3xl animate-glow-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(24, 182, 255, 0.5) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-6 w-fit mx-auto rounded-full border border-white/20 bg-white/5 px-4 py-2"
          >
            <span
              className="text-sm font-semibold text-transparent"
              style={{
                background: "linear-gradient(90deg, #6e3bff, #18b6ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
            >
              ✦ Technologies We Cover
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6 text-white">
            <div className="line overflow-hidden">
              <span>Master Modern</span>
            </div>
            <div className="line overflow-hidden">
              <span
                className="text-transparent"
                style={{
                  background:
                    "linear-gradient(90deg, #6e3bff, #18b6ff, #00f5d4)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                Technologies
              </span>
            </div>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Learn the tools and frameworks used by leading tech companies
            worldwide.
          </p>
        </div>

        {/* Tech Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TECH_ITEMS.map((item, index) => (
            <TechCard key={index} item={item} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-300 mb-6">
            And many more technologies covered in our comprehensive curriculum
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, #6e3bff 0%, #4800e0 100%)",
            }}
          >
            Explore All Technologies →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedTechStackShowcase;
