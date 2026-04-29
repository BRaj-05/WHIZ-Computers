import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { scrollToSection, updateHash } from '../utils/scrollToSection';

const STATS = [
  { value: 5000, suffix: '+', label: 'Students Trained' },
  { value: 10, suffix: '+', label: 'Professional Tracks' },
  { value: 98, suffix: '%', label: 'Placement Support' },
  { value: 24, suffix: '/7', label: 'Learning Access' },
];

const SKILLS = [
  { label: 'MS Office', pct: 94 },
  { label: 'Python', pct: 78 },
  { label: 'Web Design', pct: 86 },
];

const HeroNeo = () => {
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

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (event.clientY - rect.top - rect.height / 2) / rect.height;

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

export default HeroNeo;
