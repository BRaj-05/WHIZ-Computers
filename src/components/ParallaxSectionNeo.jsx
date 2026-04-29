import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FEATURES = [
  { id: 'projects', eyebrow: 'Project-led', title: 'Learn with practical builds, not only notes', desc: 'Every track is structured around exercises, deliverables, and guided implementation so students retain real skills.', accent: '#7c5cff' },
  { id: 'mentorship', eyebrow: 'Mentorship', title: 'Clear feedback from experienced trainers', desc: 'Students get correction, review, and direction instead of trying to learn everything alone from random videos.', accent: '#00c2ff' },
  { id: 'career', eyebrow: 'Career-ready', title: 'Designed to support jobs, freelancing, and confidence', desc: 'From resume preparation to portfolio work, the platform presentation now matches the professional outcome.', accent: '#10d6b4' },
];

const ParallaxSectionNeo = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current?.children || [], {
        y: 36,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.from(cardsRef.current?.children || [], {
        y: 42,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 78%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 -z-20 bg-[#080713]" />
      <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(circle at 20% 25%, rgba(110,59,255,0.22), transparent 26%), radial-gradient(circle at 84% 16%, rgba(0,194,255,0.10), transparent 24%)' }} />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mb-14 max-w-3xl">
          <span className="inline-flex rounded-full border border-brand-400/20 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-200">Why students choose Whizz</span>
          <h2 className="mt-6 text-4xl font-bold text-white sm:text-5xl" style={{ fontFamily: 'Syne, sans-serif' }}>
            A learning experience with
            <span className="text-gradient"> stronger visual identity</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            This section follows the same dark premium direction as the hero and course cards, so the whole interface feels cohesive.
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
          <article className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,14,32,0.96),rgba(9,26,39,0.9))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
            <div className="absolute -right-10 top-10 h-36 w-36 rounded-full blur-3xl" style={{ background: 'rgba(110,59,255,0.3)' }} />
            <div className="relative">
              <div className="text-sm uppercase tracking-[0.22em] text-brand-200">Platform advantage</div>
              <h3 className="mt-5 max-w-xl text-3xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                Built for students who want coding skills with premium presentation
              </h3>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                Instead of generic training-site blocks, this area now feels closer to a startup product interface with stronger spacing, contrast, and atmosphere.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {['Responsive UI', 'Project-first learning', 'Pricing clarity', 'Deploy-ready sections'].map((item) => (
                  <div key={item} className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-slate-200">{item}</div>
                ))}
              </div>
            </div>
          </article>

          {FEATURES.map((feature) => (
            <article key={feature.id} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
              <div className="absolute inset-0 opacity-60" style={{ background: `radial-gradient(circle at top right, ${feature.accent}26 0%, transparent 40%)` }} />
              <div className="relative">
                <div className="text-sm uppercase tracking-[0.22em]" style={{ color: feature.accent }}>{feature.eyebrow}</div>
                <h3 className="mt-4 text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{feature.title}</h3>
                <p className="mt-4 text-base leading-8 text-slate-300">{feature.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParallaxSectionNeo;
