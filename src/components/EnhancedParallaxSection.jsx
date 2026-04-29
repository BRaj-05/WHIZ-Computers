// src/components/EnhancedParallaxSection.jsx
// Ultra-advanced parallax section with floating elements and smooth animations

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: "🚀",
    title: "Industry-Standard Curriculum",
    description: "Learn from experts working at top tech companies worldwide.",
  },
  {
    icon: "💼",
    title: "Career-Focused Projects",
    description: "Build portfolio-worthy projects that impress employers.",
  },
  {
    icon: "👥",
    title: "Mentorship & Support",
    description: "Get personalized guidance from experienced instructors.",
  },
  {
    icon: "📊",
    title: "Real-Time Analytics",
    description: "Track your progress with detailed performance metrics.",
  },
];

const EnhancedParallaxSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const featuresRef = useRef([]);
  const orbRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      if (orbRef.current) {
        gsap.to(orbRef.current, {
          x: x * 30,
          y: y * 30,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Entrance animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
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
      }

      // Features animation
      featuresRef.current.forEach((feature, i) => {
        if (feature) {
          gsap.from(feature, {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "expo.out",
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Floating animation for orb
  useEffect(() => {
    if (orbRef.current) {
      gsap.to(orbRef.current, {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden py-24 lg:py-32"
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

        {/* Animated orbs */}
        <div
          ref={orbRef}
          className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(110, 59, 255, 0.6) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(24, 182, 255, 0.5) 0%, transparent 70%)",
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={containerRef}
        className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"
      >
        {/* Heading */}
        <div
          ref={headingRef}
          className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 items-center"
        >
          <div>
            <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6 text-white">
              <div className="line overflow-hidden">
                <span>Why Whizz</span>
              </div>
              <div className="line overflow-hidden">
                <span
                  className="text-transparent"
                  style={{
                    background: "linear-gradient(90deg, #6e3bff, #18b6ff)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  Computer?
                </span>
              </div>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              We're not just a coding school. We're your partner in building a
              successful tech career with practical skills, real-world projects,
              and expert mentorship.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
            >
              <p
                className="text-3xl font-bold text-transparent"
                style={{
                  background: "linear-gradient(90deg, #6e3bff, #18b6ff)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                50K+
              </p>
              <p className="text-sm text-slate-400 mt-2">Active Students</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
            >
              <p
                className="text-3xl font-bold text-transparent"
                style={{
                  background: "linear-gradient(90deg, #18b6ff, #00f5d4)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                98%
              </p>
              <p className="text-sm text-slate-400 mt-2">Success Rate</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
            >
              <p
                className="text-3xl font-bold text-transparent"
                style={{
                  background: "linear-gradient(90deg, #00f5d4, #6e3bff)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                10+
              </p>
              <p className="text-sm text-slate-400 mt-2">Expert Courses</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
            >
              <p
                className="text-3xl font-bold text-transparent"
                style={{
                  background: "linear-gradient(90deg, #6e3bff, #fb7185)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                24/7
              </p>
              <p className="text-sm text-slate-400 mt-2">Support</p>
            </motion.div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              ref={(el) => (featuresRef.current[i] = el)}
              whileHover={{ y: -8 }}
              className="group rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md hover:border-white/20 transition-all"
            >
              <div className="mb-4 text-4xl group-hover:animate-bounce">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Master Tech Skills?
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-lg font-semibold text-white shadow-xl"
            style={{
              background: "linear-gradient(135deg, #6e3bff 0%, #4800e0 100%)",
            }}
          >
            Start Learning Today →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedParallaxSection;
