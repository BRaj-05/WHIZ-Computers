// src/components/Hero.jsx
  // Modern hero section with a clean, "coding platform" aesthetic.

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { scrollToSection, updateHash } from "../utils/scrollToSection";

const STATS = [
  { value: 5000, suffix: "+", label: "Students Trained" },
  { value: 10, suffix: "+", label: "Professional Tracks" },
  { value: 98, suffix: "%", label: "Placement Support" },
  { value: 24, suffix: "/7", label: "Learning Access" },
];

const SKILLS = [
  { label: 'MS Office', pct: 94 },
  { label: 'Python', pct: 78 },
  { label: 'Web Design', pct: 86 },
];

const Hero = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const statsRef = useRef(null);
  const orbOneRef = useRef(null);
  const orbTwoRef = useRef(null);
  const [counters, setCounters] = useState(STATS.map(() => 0));

  const handleExploreCourses = (event) => {
    event.preventDefault();
    if (scrollToSection('#courses')) updateHash('#courses');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current?.children || [], {
        y: 36,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'expo.out',
        delay: 0.15,
      });
      gsap.from(rightRef.current, {
        x: 40,
        opacity: 0,
        duration: 0.95,
        ease: 'expo.out',
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        STATS.forEach((stat, index) => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 1.8,
            delay: index * 0.08,
            ease: 'power2.out',
            onUpdate: () => {
              setCounters((prev) => {
                const next = [...prev];
                next[index] = Math.round(obj.val);
                return next;
              });
            },
          });
        });
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || window.matchMedia('(pointer: coarse)').matches) return undefined;

    const handleMove = (e) => {
      const rect = node.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      gsap.to(orbOneRef.current, { x: x * 40, y: y * 30, duration: 0.8, ease: 'power2.out' });
      gsap.to(orbTwoRef.current, { x: x * -26, y: y * -22, duration: 1, ease: 'power2.out' });
    };

    node.addEventListener('mousemove', handleMove);
    return () => node.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-32">
      <div className="absolute inset-0 -z-20 bg-[#090815]" />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 14% 32%, rgba(122, 62, 255, 0.28), transparent 24%), radial-gradient(circle at 84% 18%, rgba(0, 218, 255, 0.14), transparent 22%), radial-gradient(circle at 68% 72%, rgba(0, 255, 170, 0.10), transparent 18%)',
        }}
      />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-50" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(9,8,21,0.2),rgba(9,8,21,0.95))]" />

      <div
        ref={orbOneRef}
        className="absolute -left-16 top-32 -z-10 h-80 w-80 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(109,59,255,0.35), transparent 70%)' }}
      />
      <div
        ref={orbTwoRef}
        className="absolute bottom-16 right-10 -z-10 h-72 w-72 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.18), transparent 70%)' }}
      />

      <div className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-14 px-4 pb-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <div ref={leftRef} className="relative max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/20 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-200 shadow-[0_0_40px_rgba(109,59,255,0.18)]">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee]" />
            Code. Create. Get hired.
          </span>

          <h1 className="mt-8 text-6xl font-bold leading-[0.92] tracking-[-0.04em] text-white sm:text-7xl xl:text-[7.6rem]" style={{ fontFamily: 'Syne, sans-serif' }}>
            Master
            <br />
            Computer Skills,
            <br />
            <span className="text-gradient">Build Your Future.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
            A modern learning platform for coding, office tools, and career-ready digital skills with practical training, premium mentorship, and real project work.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/#courses"
              onClick={handleExploreCourses}
              className="inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-base font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #6e3bff, #00aef3)', boxShadow: '0 16px 40px rgba(88, 66, 255, 0.35)' }}
            >
              Explore Courses <span>→</span>
            </Link>
            <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur hover:bg-white/10">
              View Dashboard
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {['React Projects', 'Python Labs', 'Portfolio Reviews', 'Interview Prep'].map((item) => (
              <span key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div ref={rightRef} className="relative hidden lg:block">
          <div className="relative mx-auto h-[620px] max-w-[520px]">
            <div className="absolute inset-0 rounded-[2.5rem] border border-brand-400/10 bg-[linear-gradient(180deg,rgba(10,10,24,0.95),rgba(6,17,28,0.88))] shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl" />
            <div className="absolute left-8 top-7 right-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6e3bff,#00c2ff)] text-xl text-white shadow-[0_0_30px_rgba(110,59,255,0.35)]">{'</>'}</div>
                <div>
                  <div className="text-lg font-semibold text-white">Learn. Build. Succeed.</div>
                  <div className="text-sm text-brand-200">10+ Professional Courses</div>
                </div>
              </div>
              <div className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">Live practical</div>
            </div>
            <div className="absolute right-2 top-20 rounded-[1.4rem] border border-cyan-200/30 bg-slate-100/95 px-5 py-4 text-slate-700 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-lg text-emerald-500">✓</div>
                <div>
                  <div className="text-base font-bold">100% Practical</div>
                  <div className="text-sm text-slate-500">Hands-on Training</div>
                </div>
              </div>
            </div>
            <div className="absolute left-10 top-36 right-10 rounded-[2rem] border border-white/10 bg-[#0d1423]/85 p-7 backdrop-blur">
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Track</div>
                  <div className="mt-2 text-2xl font-bold text-white">Coding</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Mode</div>
                  <div className="mt-2 text-2xl font-bold text-cyan-300">Project-first</div>
                </div>
              </div>
              <div className="space-y-5">
                {SKILLS.map((skill) => (
                  <div key={skill.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-300">{skill.label}</span>
                      <span className="font-semibold text-brand-200">{skill.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-2 rounded-full" style={{ width: `${skill.pct}%`, background: 'linear-gradient(90deg, #6e3bff, #00d4ff)', boxShadow: '0 0 18px rgba(0, 212, 255, 0.25)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-14 left-8 right-8 grid grid-cols-[1.1fr_0.9fr] gap-5">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="text-sm uppercase tracking-[0.22em] text-slate-400">Student flow</div>
                <div className="mt-4 space-y-3">
                  {['Join course', 'Build project', 'Get reviewed', 'Apply confidently'].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/20 text-sm font-semibold text-brand-200">{index + 1}</div>
                      <span className="text-sm font-medium text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="absolute right-6 top-6 h-3 w-3 rounded-full bg-brand-400 shadow-[0_0_18px_#8b5cf6]" />
                <div className="mt-8 flex h-36 items-center justify-center rounded-[2rem] border border-dashed border-brand-400/20">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-[1.8rem] bg-slate-100 text-4xl text-brand-500 shadow-[0_0_50px_rgba(139,92,246,0.18)]">
                    {'</>'}
                    <div className="absolute h-[140px] w-[140px] rounded-full border border-brand-400/15" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={statsRef} className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map(({ suffix, label }, index) => (
            <div key={label} className="rounded-[1.75rem] border border-white/10 bg-white/5 px-6 py-5 backdrop-blur">
              <div className="text-4xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                {counters[index]}<span className="text-gradient">{suffix}</span>
              </div>
              <div className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-400">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
          style={{
            background: "radial-gradient(circle, #6e3bff, transparent)",
          }}
        />
      </div>
      <div
        ref={orb2Ref}
        className="absolute will-transform pointer-events-none"
        style={{ bottom: "20%", right: "5%" }}
      >
        <div
          className="w-64 h-64 rounded-full opacity-20 dark:opacity-25 blur-3xl"
          style={{
            background: "radial-gradient(circle, #00f5d4, transparent)",
          }}
        />
      </div>
      <div
        ref={orb3Ref}
        className="absolute will-transform pointer-events-none"
        style={{ top: "40%", right: "25%" }}
      >
        <div
          className="w-48 h-48 rounded-full opacity-10 dark:opacity-20 blur-2xl"
          style={{
            background: "radial-gradient(circle, #fb7185, transparent)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* ── Left: Text Content ── */}
          <div className="relative">
            {/* Badge */}
            <div ref={badgeRef} className="mb-6 inline-flex items-center gap-2">
              <span
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border"
                style={{
                  background: "rgba(110, 59, 255, 0.08)",
                  borderColor: "rgba(110, 59, 255, 0.2)",
                  color: "#6e3bff",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse-slow" />
                Admissions Open for 2026
              </span>
            </div>

            {/* Heading */}
            <h1
              ref={headingRef}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 will-transform"
              style={{ fontFamily: "Syne, sans-serif", lineHeight: 1.05 }}
            >
              Master Computer Skills, Build Your Future.
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-lg text-gray-500 dark:text-gray-400 max-w-lg mb-8 leading-relaxed will-opacity"
            >
              From basics to advanced programming — learn industry-relevant
              courses with expert instructors and placement support. Your career
              transformation starts here.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 mb-12">
              <div ref={magneticRef} className="magnetic-btn">
                <Link
                  to="/#courses"
                  onClick={handleExploreCourses}
                  className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-2xl
                    transition-all duration-300 hover:shadow-2xl"
                  style={{
                    background: "linear-gradient(135deg, #6e3bff, #4800e0)",
                    boxShadow: "0 8px 30px rgba(110, 59, 255, 0.4)",
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      duration: 0.4,
                      ease: "elastic.out(1, 0.5)",
                    });
                  }}
                >
                  Explore Courses
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-2xl border-2 transition-all duration-300
                  dark:text-white text-gray-800 hover:border-brand-500 dark:hover:border-brand-400"
                style={{ borderColor: "rgba(110,59,255,0.25)" }}
              >
                Get in Touch
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {["R", "A", "S", "P", "M"].map((letter, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      background: [
                        "#6e3bff",
                        "#00f5d4",
                        "#fb7185",
                        "#fbbf24",
                        "#7c3aed",
                      ][i],
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  5,000+ Students
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                    4.9/5
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Visual Cards ── */}
          <div className="relative h-[500px] lg:h-[600px] hidden md:block">
            {/* ── Terminal Window Floating Card ── */}
            <div
              className="absolute top-4 right-0 w-80 rounded-2xl overflow-hidden shadow-2xl animate-float"
              style={{
                background: "rgba(15, 23, 42, 0.95)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.1)",
                animationDelay: "0s",
              }}
            >
              <div className="bg-[#1e1e2e] px-4 py-2.5 flex items-center gap-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                <span className="ml-2 text-xs text-gray-400 font-mono tracking-widest">
                  whizz_init.js
                </span>
              </div>
              <div className="p-5 font-mono text-sm leading-relaxed">
                <p>
                  <span className="text-[#c678dd]">import</span>{" "}
                  <span className="text-[#e5c07b]">Success</span>{" "}
                  <span className="text-[#c678dd]">from</span>{" "}
                  <span className="text-[#98c379]">'@whizz/career'</span>;
                </p>
                <p className="mt-3">
                  <span className="text-[#c678dd]">const</span>{" "}
                  <span className="text-[#61afef]">student</span>{" "}
                  <span className="text-[#56b6c2]">=</span>{" "}
                  <span className="text-[#c678dd]">new</span>{" "}
                  <span className="text-[#e5c07b]">Success</span>();
                </p>
                <p className="mt-3 text-gray-400">
                  // Initialize skill building
                </p>
                <p>
                  student.<span className="text-[#61afef]">master</span>([
                </p>
                <p className="pl-4 text-[#98c379]">'Full Stack Web Dev',</p>
                <p className="pl-4 text-[#98c379]">'Python Automation',</p>
                <p className="pl-4 text-[#98c379]">'Advanced UI/UX'</p>
                <p>]);</p>
                <p className="mt-3">
                  <span className="text-[#c678dd]">await</span> student.
                  <span className="text-[#61afef]">launchCareer</span>();
                </p>
                <span className="inline-block w-2.5 h-5 bg-brand-500 animate-pulse mt-2 translate-y-1"></span>
              </div>
            </div>

            {/* ── Image Preview Floating Card ── */}
            <div
              className="absolute bottom-16 -left-4 w-64 rounded-2xl p-2 shadow-2xl animate-float"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.15)",
                animationDelay: "1.5s",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
                alt="Coding Preview"
                className="rounded-xl w-full h-36 object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
              <div className="mt-3 flex items-center justify-between px-3 pb-2">
                <span className="text-xs font-bold text-gray-800 dark:text-white">
                  Live Environments
                </span>
                <span className="flex w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
              </div>
            </div>

            {/* ── Floating Tech Badge ── */}
            <div
              className="absolute top-1/2 -right-8 rounded-2xl px-5 py-3 flex items-center gap-3 shadow-xl animate-float"
              style={{
                background:
                  "linear-gradient(135deg, rgba(110,59,255,0.9), rgba(72,0,224,0.9))",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.2)",
                animationDelay: "2.5s",
              }}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl backdrop-blur-sm">
                🚀
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-wide">
                  100% Practical
                </div>
                <div className="text-xs text-white/70 font-medium">
                  Real-world Projects
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-gray-200 dark:border-white/10"
        >
          {STATS.map(({ suffix, label }, i) => (
            <div key={label} className="text-center">
              <div
                className="text-3xl sm:text-4xl font-bold mb-1 text-gradient"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {counters[i]}
                {suffix}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
