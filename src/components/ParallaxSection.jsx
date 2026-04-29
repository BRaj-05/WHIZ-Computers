// src/components/ParallaxSection.jsx
// Multi-layer parallax section with GSAP ScrollTrigger scrub

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: '🎯',
    title: 'Industry-Aligned Curriculum',
    desc: 'Our courses are designed in collaboration with top employers to ensure you learn exactly what the market demands.',
    color: '#6e3bff',
  },
  {
    icon: '👨‍🏫',
    title: 'Expert Instructors',
    desc: '10+ years of real-world experience. Our teachers are practitioners, not just educators.',
    color: '#00f5d4',
  },
  {
    icon: '🏆',
    title: 'Certified Training',
    desc: 'Earn industry-recognized certificates that employers trust and value across sectors.',
    color: '#fb7185',
  },
  {
    icon: '💼',
    title: 'Placement Support',
    desc: '98% placement rate. We connect you directly with our 200+ hiring partner companies.',
    color: '#fbbf24',
  },
];

const ParallaxSection = () => {
  const sectionRef = useRef(null);
  const bgLayerRef = useRef(null);
  const midLayerRef = useRef(null);
  const fgLayerRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Multi-layer parallax on scroll
      gsap.to(bgLayerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: -120,
        ease: 'none',
      });

      gsap.to(midLayerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: -60,
        ease: 'none',
      });

      gsap.to(fgLayerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: -30,
        ease: 'none',
      });

      // Heading reveal
      if (headingRef.current) {
        gsap.from(headingRef.current.children, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'expo.out',
        });
      }

      // Cards stagger
      if (cardsRef.current) {
        gsap.from(Array.from(cardsRef.current.children), {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'expo.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ minHeight: '80vh' }}
    >
      {/* ── Parallax Background Layers ── */}

      {/* Layer 1: Far back — large blobs */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 -z-20 will-transform pointer-events-none"
      >
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-15 dark:opacity-20"
          style={{
            background: 'radial-gradient(circle, #6e3bff, transparent)',
            top: '-10%',
            left: '-10%',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-10 dark:opacity-15"
          style={{
            background: 'radial-gradient(circle, #00f5d4, transparent)',
            bottom: '-5%',
            right: '5%',
          }}
        />
      </div>

      {/* Layer 2: Mid — floating geometric shapes */}
      <div
        ref={midLayerRef}
        className="absolute inset-0 -z-10 will-transform pointer-events-none"
      >
        <div
          className="absolute w-32 h-32 rounded-3xl opacity-8 dark:opacity-15 rotate-12"
          style={{
            background: 'linear-gradient(135deg, #6e3bff22, #00f5d422)',
            border: '1px solid rgba(110,59,255,0.2)',
            top: '15%',
            right: '15%',
          }}
        />
        <div
          className="absolute w-20 h-20 rounded-full opacity-10 dark:opacity-20"
          style={{
            background: 'rgba(251,113,133,0.3)',
            bottom: '20%',
            left: '10%',
          }}
        />
        <div
          className="absolute w-16 h-16 rotate-45 opacity-8 dark:opacity-15"
          style={{
            background: 'rgba(251,191,36,0.2)',
            border: '2px solid rgba(251,191,36,0.2)',
            top: '60%',
            right: '30%',
          }}
        />
      </div>

      {/* Layer 3: Foreground — subtle dots */}
      <div
        ref={fgLayerRef}
        className="absolute inset-0 -z-5 will-transform pointer-events-none opacity-30 dark:opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(110,59,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-20 max-w-2xl">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              background: 'rgba(110,59,255,0.08)',
              border: '1px solid rgba(110,59,255,0.2)',
              color: '#6e3bff',
            }}
          >
            ✦ Why Choose Us
          </span>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Everything You Need{' '}
            <span className="text-gradient">to Succeed</span>
          </h2>

          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            We don't just teach — we transform careers. Our end-to-end support
            system ensures you're job-ready before you even graduate.
          </p>
        </div>

        {/* ── Feature Cards ── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {FEATURES.map((feat) => (
            <div
              key={feat.title}
              className="group relative rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 cursor-hover"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.06)',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${feat.color}15 0%, transparent 60%)` }}
              />

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${feat.color}12`,
                  border: `1px solid ${feat.color}25`,
                }}
              >
                {feat.icon}
              </div>

              <h3
                className="text-lg font-bold text-gray-900 dark:text-white mb-2"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {feat.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {feat.desc}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${feat.color}, transparent)` }}
              />
            </div>
          ))}
        </div>

        {/* ── Large CTA Banner ── */}
        <div
          className="mt-24 rounded-3xl p-10 md:p-14 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #6e3bff 0%, #4800e0 50%, #2a0080 100%)',
          }}
        >
          {/* Background decoration */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20"
            style={{ background: '#00f5d4', transform: 'translate(30%, -30%)' }}
          />
          <div
            className="absolute bottom-0 left-10 w-60 h-60 rounded-full blur-3xl opacity-15"
            style={{ background: '#fb7185', transform: 'translateY(30%)' }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3
                className="text-3xl sm:text-4xl font-bold text-white mb-3"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Ready to Start Your Journey?
              </h3>
              <p className="text-white/70 text-lg max-w-lg">
                Join 5,000+ students who have already transformed their careers with Whizz Computer.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <button
                className="px-8 py-4 bg-white text-brand-600 font-semibold rounded-2xl hover:scale-105 transition-transform duration-300"
                style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
              >
                Enroll Today
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
