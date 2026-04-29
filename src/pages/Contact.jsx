// src/pages/Contact.jsx
// Contact page with animated form and map-style info cards

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { submitContactForm } from '../utils/api';
import { pageVariants } from '../animations/motionVariants';

const CONTACT_INFO = [
  { icon: '📍', label: 'Address', value: 'Fraser Road, Patna, Bihar 800001' },
  { icon: '📞', label: 'Phone', value: '+91 99999 00000' },
  { icon: '📧', label: 'Email', value: 'hello@whizzcomputer.com' },
  { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 9AM – 7PM' },
];

const Contact = () => {
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        y: 50, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out', delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Use mock success for demo (replace with real API call)
      await new Promise(r => setTimeout(r, 1200));
      // await submitContactForm(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', course: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass = `w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300
    bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10
    text-gray-900 dark:text-white placeholder-gray-400
    focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20`;

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-24 min-h-screen"
    >
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(110,59,255,0.1) 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0 -z-10 grid-pattern opacity-40" />
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="contact-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ background: 'rgba(110,59,255,0.08)', border: '1px solid rgba(110,59,255,0.2)', color: '#6e3bff' }}>
            ✦ Get in Touch
          </div>
          <h1 className="contact-reveal text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}>
            Let's Start Your <span className="text-gradient">Journey</span>
          </h1>
          <p className="contact-reveal text-lg text-gray-500 dark:text-gray-400">
            Have questions about courses, admissions, or fees? We're here to help.
          </p>
        </div>
      </section>

      {/* Main grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
        <div className="grid lg:grid-cols-5 gap-10">

          {/* ── Info Column ── */}
          <div ref={infoRef} className="lg:col-span-2 space-y-5">
            {CONTACT_INFO.map(item => (
              <div
                key={item.label}
                className="contact-reveal flex items-start gap-4 p-5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <div className="text-xs font-semibold text-brand-500 mb-0.5 uppercase tracking-wider">{item.label}</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{item.value}</div>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div
              className="contact-reveal rounded-2xl overflow-hidden h-48 flex items-center justify-center text-gray-400 text-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(110,59,255,0.08), rgba(0,245,212,0.05))',
                border: '1px solid rgba(110,59,255,0.15)',
              }}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">📍</div>
                <div>Fraser Road, Patna</div>
                <div className="text-xs text-brand-500 mt-1">Open in Maps →</div>
              </div>
            </div>
          </div>

          {/* ── Form Column ── */}
          <div className="lg:col-span-3">
            <div
              className="contact-reveal rounded-3xl p-8 md:p-10"
              style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8" style={{ fontFamily: 'Syne, sans-serif' }}>
                Send a Message
              </h2>

              {status === 'success' ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">We'll get back to you within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="mt-6 px-6 py-3 text-sm font-semibold text-brand-500 border border-brand-500/30 rounded-xl hover:bg-brand-500/10 transition-all">
                    Send Another →
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">Name *</label>
                      <input name="name" type="text" required value={formData.name}
                        onChange={handleChange} placeholder="Rahul Sharma" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">Email *</label>
                      <input name="email" type="email" required value={formData.email}
                        onChange={handleChange} placeholder="rahul@email.com" className={inputClass} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">Phone</label>
                      <input name="phone" type="tel" value={formData.phone}
                        onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">Interested In</label>
                      <select name="course" value={formData.course} onChange={handleChange}
                        className={inputClass + ' appearance-none'}>
                        <option value="">Select a course</option>
                        <option>MS Office Mastery</option>
                        <option>Python Programming</option>
                        <option>Web Design Pro</option>
                        <option>Tally & Accounting</option>
                        <option>Digital Marketing</option>
                        <option>Graphic Design</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">Message</label>
                    <textarea name="message" rows={5} value={formData.message}
                      onChange={handleChange} placeholder="Tell us a bit about your goals..."
                      className={inputClass + ' resize-none'} />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 text-base font-semibold text-white rounded-2xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, #6e3bff, #4800e0)',
                      boxShadow: '0 8px 30px rgba(110,59,255,0.35)',
                    }}
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message →'}
                  </button>

                  {status === 'error' && (
                    <p className="text-sm text-red-500 text-center">Something went wrong. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default Contact;
