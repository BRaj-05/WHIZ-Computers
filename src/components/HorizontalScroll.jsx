// src/components/HorizontalScroll.jsx
// Pinned section that scrolls horizontally on vertical scroll via GSAP

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Data Analyst @ TCS',
    course: 'Python Programming',
    avatar: 'PS',
    avatarColor: '#6e3bff',
    text: 'Whizz Computer completely changed my career. The Python course was hands-on, practical, and I landed a job at TCS within 2 months of completing it!',
    stars: 5,
  },
  {
    id: 2,
    name: 'Rahul Gupta',
    role: 'Web Designer @ Infosys',
    course: 'Web Design Pro',
    avatar: 'RG',
    avatarColor: '#00f5d4',
    text: 'The instructors are incredible. Not just theory — real projects, real feedback. My portfolio got me hired before I even finished the course.',
    stars: 5,
  },
  {
    id: 3,
    name: 'Anjali Verma',
    role: 'Accountant @ Big4 Firm',
    course: 'Tally & Accounting',
    avatar: 'AV',
    avatarColor: '#fb7185',
    text: 'Tally course was outstanding. I went from zero knowledge to managing a full accounting system in 6 weeks. Worth every rupee!',
    stars: 5,
  },
  {
    id: 4,
    name: 'Suresh Patel',
    role: 'Marketing Manager',
    course: 'Digital Marketing',
    avatar: 'SP',
    avatarColor: '#fbbf24',
    text: 'The digital marketing curriculum is extremely up-to-date. Google Ads, Meta Ads, SEO — I learned skills that actually apply to real campaigns.',
    stars: 5,
  },
  {
    id: 5,
    name: 'Kavita Nair',
    role: 'Graphic Designer @ Zomato',
    course: 'Graphic Design',
    avatar: 'KN',
    avatarColor: '#7c3aed',
    text: 'From Photoshop beginner to designing Zomato brand assets in under 3 months! The mentorship at Whizz is second to none.',
    stars: 5,
  },
  {
    id: 6,
    name: 'Amit Singh',
    role: 'Office Admin @ MNC',
    course: 'MS Office Mastery',
    avatar: 'AS',
    avatarColor: '#10b981',
    text: 'The MS Office course elevated my productivity by 10x. I can now build dashboards and automate tasks my entire team depends on.',
    stars: 5,
  },
];

const HorizontalScroll = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Wait for layout
    const timeout = setTimeout(() => {
      const totalWidth = track.scrollWidth - window.innerWidth + 80;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      tl.to(track, { x: -totalWidth, ease: 'none' });

      // Heading parallax
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
        });
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll()
        .filter(t => t.trigger === section)
        .forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden bg-gray-50 dark:bg-[#080714]"
      style={{ height: '100vh' }}
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      <div className="absolute inset-0 flex flex-col justify-center">
        {/* Section label + heading */}
        <div ref={headingRef} className="px-4 sm:px-8 lg:px-16 mb-12 shrink-0">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{
              background: 'rgba(110,59,255,0.08)',
              border: '1px solid rgba(110,59,255,0.2)',
              color: '#6e3bff',
            }}
          >
            ✦ Student Stories
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            What Our Students Say
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
            Scroll down to explore testimonials →
          </p>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex gap-6 px-4 sm:px-8 lg:px-16 will-transform"
          style={{ width: 'max-content' }}
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="w-80 md:w-96 shrink-0 rounded-3xl p-8 relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Quote mark */}
              <div
                className="absolute top-6 right-6 text-6xl font-serif leading-none opacity-10"
                style={{ color: t.avatarColor }}
              >
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(t.stars)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 relative z-10">
                "{t.text}"
              </p>

              {/* Course tag */}
              <span
                className="inline-flex text-xs font-medium px-3 py-1 rounded-full mb-6"
                style={{
                  background: `${t.avatarColor}15`,
                  color: t.avatarColor,
                  border: `1px solid ${t.avatarColor}30`,
                }}
              >
                {t.course}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${t.avatarColor}, ${t.avatarColor}88)` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}

          {/* End card */}
          <div
            className="w-72 shrink-0 rounded-3xl p-8 flex flex-col items-center justify-center text-center"
            style={{
              background: 'linear-gradient(135deg, #6e3bff, #4800e0)',
            }}
          >
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
              Your Story Next?
            </h4>
            <p className="text-white/70 text-sm mb-6">
              Join 5,000+ students already transforming their careers.
            </p>
            <button className="px-6 py-3 bg-white text-brand-600 font-semibold rounded-2xl hover:scale-105 transition-transform">
              Start Today →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
