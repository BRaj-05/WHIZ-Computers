// src/components/Cards3D.jsx
// Interactive 3D tilt cards with dynamic lighting effect

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { staggerFadeUp } from '../animations/gsapAnimations';

gsap.registerPlugin(ScrollTrigger);

const COURSES = [
  { id: 1, icon: '📊', title: 'MS Office Mastery', category: 'Productivity', duration: '6 weeks', students: 1240, level: 'Beginner', color: '#6e3bff', glow: 'rgba(110,59,255,0.4)' },
  { id: 2, icon: '🐍', title: 'Python Programming', category: 'Development', duration: '10 weeks', students: 892, level: 'Intermediate', color: '#00f5d4', glow: 'rgba(0,245,212,0.4)' },
  { id: 3, icon: '🎨', title: 'Web Design Pro', category: 'Design', duration: '8 weeks', students: 643, level: 'Beginner', color: '#fb7185', glow: 'rgba(251,113,133,0.4)' },
  { id: 4, icon: '💰', title: 'Tally & Accounting', category: 'Finance', duration: '6 weeks', students: 511, level: 'Beginner', color: '#fbbf24', glow: 'rgba(251,191,36,0.4)' },
  { id: 5, icon: '📱', title: 'Digital Marketing', category: 'Marketing', duration: '8 weeks', students: 730, level: 'Intermediate', color: '#7c3aed', glow: 'rgba(124,58,237,0.4)' },
  { id: 6, icon: '✏️', title: 'Graphic Design', category: 'Design', duration: '10 weeks', students: 420, level: 'All Levels', color: '#10b981', glow: 'rgba(16,185,129,0.4)' },
];

const Card3D = ({ course }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    const STRENGTH = 15;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -STRENGTH;
      const rotY = ((x - cx) / cx) * STRENGTH;

      // Tilt
      gsap.to(card, {
        rotateX: rotX,
        rotateY: rotY,
        scale: 1.03,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800,
      });

      // Dynamic glow follows mouse
      if (glow) {
        const xPct = (x / rect.width) * 100;
        const yPct = (y / rect.height) * 100;
        glow.style.background = `radial-gradient(circle at ${xPct}% ${yPct}%, ${course.glow} 0%, transparent 60%)`;
        gsap.to(glow, { opacity: 1, duration: 0.3 });
      }
    };

    const onLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)',
      });
      if (glow) gsap.to(glow, { opacity: 0, duration: 0.4 });
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, [course.glow]);

  return (
    <div
      ref={cardRef}
      className="relative rounded-3xl p-6 overflow-hidden will-transform group"
      style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic lighting overlay */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 transition-opacity"
      />

      {/* Card noise texture */}
      <div
        className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 20%, ${course.color}22 0%, transparent 60%)`,
        }}
      />

      {/* Top row */}
      <div className="relative flex items-start justify-between mb-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
          style={{ background: `${course.color}18`, border: `1px solid ${course.color}30` }}
        >
          {course.icon}
        </div>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            background: `${course.color}15`,
            color: course.color,
            border: `1px solid ${course.color}30`,
          }}
        >
          {course.level}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-lg font-bold mb-1 text-gray-900 dark:text-white group-hover:text-gradient transition-all"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        {course.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{course.category}</p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-5">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {course.duration}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {course.students.toLocaleString()} students
        </span>
      </div>

      {/* CTA */}
      <button
        className="w-full py-3 rounded-2xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${course.color}, ${course.color}aa)`,
          boxShadow: `0 4px 20px ${course.glow}`,
        }}
      >
        Enroll Now →
      </button>
    </div>
  );
};

const Cards3D = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.from(headingRef.current.children, {
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }

    if (gridRef.current) {
      const cards = gridRef.current.children;
      staggerFadeUp(Array.from(cards), {
        trigger: gridRef.current,
        start: 'top 80%',
        stagger: 0.1,
        duration: 0.8,
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="courses"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 dark:opacity-100 opacity-0 transition-opacity"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, #1a0840 0%, #080714 100%)' }}
      />
      <div className="absolute inset-0 -z-10 dark:opacity-0 opacity-100 transition-opacity bg-gray-50" />
      <div className="absolute inset-0 -z-10 grid-pattern" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              background: 'rgba(110,59,255,0.1)',
              border: '1px solid rgba(110,59,255,0.2)',
              color: '#6e3bff',
            }}
          >
            ✦ Our Courses
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Learn From{' '}
            <span className="text-gradient">Industry Experts</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg">
            Hands-on, practical courses designed to get you job-ready in weeks, not years.
          </p>
        </div>

        {/* 3D Card Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {COURSES.map(course => (
            <Card3D key={course.id} course={course} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #6e3bff, #4800e0)',
              boxShadow: '0 8px 30px rgba(110,59,255,0.35)',
            }}
          >
            View All Courses
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cards3D;
