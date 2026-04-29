// src/pages/About.jsx
// About page — team, mission, values with GSAP scroll reveals

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pageVariants } from '../animations/motionVariants';

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  { name: 'Rajesh Kumar', role: 'Founder & Lead Instructor', initials: 'RK', color: '#6e3bff', exp: '12 yrs' },
  { name: 'Priya Mehta', role: 'Python & Web Development', initials: 'PM', color: '#00f5d4', exp: '8 yrs' },
  { name: 'Sandeep Joshi', role: 'Graphic Design & UI/UX', initials: 'SJ', color: '#fb7185', exp: '10 yrs' },
  { name: 'Anita Sharma', role: 'Digital Marketing Expert', initials: 'AS', color: '#fbbf24', exp: '7 yrs' },
];

const VALUES = [
  { icon: '🎯', title: 'Practical First', desc: 'Every concept is taught through real projects, not just theory.' },
  { icon: '🤝', title: 'Student Success', desc: 'Your career outcome is our success metric — full stop.' },
  { icon: '🔄', title: 'Always Current', desc: 'Curriculum updated every quarter to match industry demand.' },
  { icon: '🌐', title: 'Accessible Learning', desc: 'Affordable pricing with EMI options so cost is never a barrier.' },
];

const MILESTONES = [
  { year: '2016', event: 'Founded in Patna with 20 students and a dream' },
  { year: '2018', event: 'Crossed 500 students, added Python & Web Design' },
  { year: '2020', event: 'Launched online learning during pandemic' },
  { year: '2022', event: 'Govt. recognized institute, 2000+ alumni' },
  { year: '2024', event: '5000+ students, 200+ hiring partners' },
  { year: '2026', event: 'Expanding to 3 new cities — admissions open!' },
];

const About = () => {
  const heroRef = useRef(null);
  const valuesRef = useRef(null);
  const timelineRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal
      if (heroRef.current) {
        gsap.from(heroRef.current.querySelectorAll('.reveal-item'), {
          y: 60, opacity: 0, duration: 1, stagger: 0.12, ease: 'expo.out', delay: 0.2,
        });
      }

      // Values stagger
      if (valuesRef.current) {
        gsap.from(valuesRef.current.querySelectorAll('.value-card'), {
          scrollTrigger: { trigger: valuesRef.current, start: 'top 80%' },
          y: 50, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out',
        });
      }

      // Timeline items
      if (timelineRef.current) {
        gsap.from(timelineRef.current.querySelectorAll('.timeline-item'), {
          scrollTrigger: { trigger: timelineRef.current, start: 'top 75%' },
          x: -60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'expo.out',
        });
      }

      // Team cards
      if (teamRef.current) {
        gsap.from(teamRef.current.querySelectorAll('.team-card'), {
          scrollTrigger: { trigger: teamRef.current, start: 'top 80%' },
          y: 60, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-24"
    >
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative py-24 overflow-hidden"
      >
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(110,59,255,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="absolute inset-0 -z-10 grid-pattern opacity-50" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="reveal-item inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
            style={{ background: 'rgba(110,59,255,0.08)', border: '1px solid rgba(110,59,255,0.2)', color: '#6e3bff' }}>
            ✦ Our Story
          </div>
          <h1
            className="reveal-item text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Transforming Lives Through{' '}
            <span className="text-gradient">Education</span>
          </h1>
          <p className="reveal-item text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Since 2016, Whizz Computer has been the most trusted name in practical IT training in Patna — and now expanding across India.
          </p>
          {/* Quick stats */}
          <div className="reveal-item grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
            {[
              { n: '5000+', l: 'Students' }, { n: '10+', l: 'Courses' },
              { n: '98%', l: 'Placement' }, { n: '200+', l: 'Partners' },
            ].map(({ n, l }) => (
              <div key={l}
                className="rounded-2xl p-5"
                style={{ background: 'rgba(110,59,255,0.07)', border: '1px solid rgba(110,59,255,0.15)' }}>
                <div className="text-3xl font-bold text-gradient mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{n}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section ref={valuesRef} className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center"
          style={{ fontFamily: 'Syne, sans-serif' }}>
          What We Stand For
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map(v => (
            <div key={v.title}
              className="value-card group rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2"
              style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="text-4xl mb-5 transition-transform duration-300 group-hover:scale-110">{v.icon}</div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{v.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section ref={timelineRef} className="py-24 bg-gray-50 dark:bg-white/2">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-14 text-center"
            style={{ fontFamily: 'Syne, sans-serif' }}>
            Our Journey
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #6e3bff, #00f5d4)' }} />
            <div className="space-y-10">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="timeline-item flex gap-6 items-start">
                  <div className="shrink-0 w-12 h-12 rounded-full border-2 border-brand-500 flex items-center justify-center z-10"
                    style={{ background: '#080714' }}>
                    <span className="text-xs font-bold text-brand-500">{m.year.slice(2)}</span>
                  </div>
                  <div className="flex-1 pb-4">
                    <span className="text-xs font-mono text-brand-500 mb-1 block">{m.year}</span>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section ref={teamRef} className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center"
          style={{ fontFamily: 'Syne, sans-serif' }}>
          Meet the Experts
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-14">Practitioners who teach from real experience</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map(member => (
            <div key={member.name}
              className="team-card group text-center rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2"
              style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div
                className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-2xl font-bold text-white mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}88)` }}>
                {member.initials}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{member.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{member.role}</p>
              <span className="text-xs font-medium px-3 py-1 rounded-full"
                style={{ background: `${member.color}15`, color: member.color, border: `1px solid ${member.color}30` }}>
                {member.exp} experience
              </span>
            </div>
          ))}
        </div>
      </section>
    </motion.main>
  );
};

export default About;
