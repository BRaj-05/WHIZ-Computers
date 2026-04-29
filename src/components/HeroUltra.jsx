// src/components/HeroUltra.jsx
// Epic hero section with advanced animations, floating elements, and impressive visuals

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { scrollToSection, updateHash } from "../utils/scrollToSection";

const STATS = [
  { value: 5000, suffix: "+", label: "Students Trained" },
  { value: 10, suffix: "+", label: "Expert Courses" },
  { value: 98, suffix: "%", label: "Success Rate" },
  { value: 24, suffix: "/7", label: "Support" },
];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576836579312-94b3e3f5e9de?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
];

const FLOATING_ITEMS = [
  { label: "Python", icon: "🐍", delay: 0, duration: 6 },
  { label: "React", icon: "⚛️", delay: 1, duration: 7 },
  { label: "Web Dev", icon: "💻", delay: 2, duration: 8 },
  { label: "Python", icon: "🐍", delay: 3, duration: 6 },
];

const HeroUltra = () => {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const bgRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);
  const floatingRef = useRef(null);

  const [counters, setCounters] = useState(STATS.map(() => 0));
  const [currentImage, setCurrentImage] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle explore courses
  const handleExploreCourses = (e) => {
    e.preventDefault();
    if (scrollToSection("#courses")) {
      updateHash("#courses");
    }
  };

  // Background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Main timeline animations
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Heading animation with stagger
      const heading = headingRef.current;
      if (heading) {
        const lines = heading.querySelectorAll(".line");
        gsap.from(lines, {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "expo.out",
          delay: 0.3,
        });
      }

      // Timeline for all elements
      const tl = gsap.timeline({ delay: 0.2 });

      // Subtitle
      tl.from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.7",
      );

      // CTA Buttons
      tl.from(
        ctaRef.current?.children || [],
        {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.6",
      );

      // Stats
      tl.from(
        statsRef.current?.children || [],
        {
          y: 30,
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.5)",
        },
        "-=0.3",
      );

      // Orbs floating animation
      gsap.to(orb1Ref.current, {
        y: -30,
        x: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(orb2Ref.current, {
        y: 20,
        x: -20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      gsap.to(orb3Ref.current, {
        y: -25,
        x: -15,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;

        STATS.forEach((stat, i) => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 2.5,
            delay: i * 0.15,
            ease: "power2.out",
            onUpdate: () => {
              setCounters((prev) => {
                const next = [...prev];
                next[i] = Math.round(obj.val);
                return next;
              });
            },
          });
        });
        observer.disconnect();
      },
      { threshold: 0.3 },
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Parallax effect for background
  useEffect(() => {
    if (!bgRef.current) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      gsap.to(bgRef.current, {
        y: scrollY * 0.5,
        duration: 0.3,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Orb mouse tracking
  useEffect(() => {
    if (!heroRef.current) return;

    const handleMouseMove = (e) => {
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      gsap.to(orb1Ref.current, {
        x: x * 30,
        y: y * 25,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.to(orb2Ref.current, {
        x: x * -25,
        y: y * -20,
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(orb3Ref.current, {
        x: x * 20,
        y: y * -25,
        duration: 1.2,
        ease: "power2.out",
      });
    };

    heroRef.current.addEventListener("mousemove", handleMouseMove);
    return () => {
      heroRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[120vh] overflow-hidden bg-slate-950"
    >
      {/* Animated Background */}
      <div ref={bgRef} className="absolute inset-0">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #172554 50%, #0f172a 100%)",
          }}
        />

        {/* Animated background image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src={HERO_IMAGES[currentImage]}
            alt="Hero background"
            className="h-full w-full object-cover transition-opacity duration-1000"
          />
        </div>

        {/* Floating orbs */}
        <div
          ref={orb1Ref}
          className="absolute right-1/4 top-20 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(110, 59, 255, 0.6) 0%, transparent 70%)",
          }}
        />
        <div
          ref={orb2Ref}
          className="absolute left-1/3 bottom-40 h-80 w-80 rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(24, 182, 255, 0.5) 0%, transparent 70%)",
          }}
        />
        <div
          ref={orb3Ref}
          className="absolute right-1/3 top-1/2 h-72 w-72 rounded-full opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)",
          }}
        />

        {/* Grid background */}
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
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 w-fit rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm"
            >
              <span
                className="text-sm font-semibold text-transparent"
                style={{
                  background: "linear-gradient(90deg, #6e3bff, #18b6ff)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                ✨ Unlock Your Tech Potential
              </span>
            </motion.div>

            {/* Heading */}
            <h1
              ref={headingRef}
              className="mb-6 text-5xl font-black leading-tight md:text-6xl lg:text-7xl"
            >
              <div className="line overflow-hidden">
                <span className="text-white">Master</span>
              </div>
              <div className="line overflow-hidden">
                <span className="text-white">Computer</span>
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
                  Skills, Build
                </span>
              </div>
              <div className="line overflow-hidden">
                <span
                  className="text-transparent"
                  style={{
                    background: "linear-gradient(90deg, #18b6ff, #00f5d4)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  Your Future.
                </span>
              </div>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="mb-8 max-w-xl text-lg text-slate-300 leading-relaxed"
            >
              Join thousands of students mastering in-demand tech skills with
              our industry-expert instructors. From beginner to advanced, we've
              got your learning journey covered.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col gap-4 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExploreCourses}
                className="rounded-lg px-8 py-3.5 font-semibold text-white shadow-xl transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, #6e3bff 0%, #4800e0 100%)",
                }}
              >
                Explore Courses
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg border-2 border-white/30 px-8 py-3.5 font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10"
              >
                Watch Demo
              </motion.button>
            </div>

            {/* Footer stats */}
            <div className="mt-12 flex gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="text-sm text-slate-400">Trusted by</p>
                <p className="text-2xl font-bold text-white">50,000+</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Success Rate</p>
                <p
                  className="text-2xl font-bold text-transparent"
                  style={{
                    background: "linear-gradient(90deg, #6e3bff, #18b6ff)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  98%
                </p>
              </div>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Floating skill cards */}
            <div ref={floatingRef} className="relative h-96 w-full">
              {FLOATING_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -20, 0],
                  }}
                  transition={{
                    opacity: { delay: 0.3 + i * 0.1, duration: 0.5 },
                    scale: { delay: 0.3 + i * 0.1, duration: 0.5 },
                    y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute rounded-xl border border-white/20 bg-white/5 px-4 py-3 backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition-all"
                  style={{
                    left: `${20 + (i % 2) * 40}%`,
                    top: `${10 + ((i * 25) % 70)}%`,
                  }}
                >
                  <span className="mr-2 text-2xl">{item.icon}</span>
                  <span className="text-sm font-semibold text-white">
                    {item.label}
                  </span>
                </motion.div>
              ))}

              {/* Center glow */}
              <div
                className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-30"
                style={{
                  background: "radial-gradient(circle, #6e3bff, transparent)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="mt-32 grid grid-cols-2 gap-6 sm:grid-cols-4 border-t border-white/10 pt-16"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col"
            >
              <span className="text-3xl font-black text-white md:text-4xl">
                {counters[i]}
                <span
                  className="text-transparent"
                  style={{
                    background: "linear-gradient(90deg, #6e3bff, #18b6ff)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  {stat.suffix}
                </span>
              </span>
              <span className="text-xs font-semibold text-slate-400 md:text-sm">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroUltra;
