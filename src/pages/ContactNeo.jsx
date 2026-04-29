import { useState } from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '../animations/motionVariants';

const ContactNeo = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen bg-[#0b0a18] pt-36">
      <section className="relative overflow-hidden pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(110,59,255,0.2),transparent_24%),linear-gradient(180deg,#0b0a18_0%,#111327_100%)]" />
        <div className="absolute inset-0 -z-10 grid-pattern opacity-35" />

        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <span className="inline-flex rounded-full border border-brand-400/20 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-200">Contact us</span>
            <h1 className="mt-7 text-5xl font-bold text-white sm:text-6xl" style={{ fontFamily: 'Syne, sans-serif' }}>
              Let’s talk about the
              <span className="text-gradient"> right course for you</span>
            </h1>
            <p className="mt-6 text-xl leading-9 text-slate-300">
              Reach out for admissions, pricing, coding tracks, or custom guidance on where to start.
            </p>

            <div className="mt-10 space-y-4">
              {[
                ['Address', 'Fraser Road, Patna, Bihar 800001'],
                ['Phone', '+91 99999 00000'],
                ['Email', 'hello@whizzcomputer.com'],
                ['Hours', 'Mon-Sat, 9AM - 7PM'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-slate-200 backdrop-blur">
                  <div className="text-xs uppercase tracking-[0.2em] text-brand-200">{label}</div>
                  <div className="mt-2 text-lg">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,14,32,0.96),rgba(9,26,39,0.88))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
            {!submitted ? (
              <form
                className="space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div>
                  <div className="text-sm uppercase tracking-[0.22em] text-brand-200">Message us</div>
                  <h2 className="mt-3 text-3xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                    Start your learning journey
                  </h2>
                </div>

                {['Full Name', 'Email Address', 'Phone Number'].map((label) => (
                  <input
                    key={label}
                    placeholder={label}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-brand-400"
                  />
                ))}

                <select className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-brand-400">
                  <option value="">Choose a course</option>
                  <option>Web Development</option>
                  <option>Python Programming</option>
                  <option>MS Office</option>
                  <option>Tally & Accounting</option>
                </select>

                <textarea
                  rows={5}
                  placeholder="Tell us about your goals"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-brand-400"
                />

                <button
                  type="submit"
                  className="w-full rounded-2xl px-6 py-4 text-base font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #6e3bff, #00aef3)', boxShadow: '0 18px 40px rgba(88, 66, 255, 0.25)' }}
                >
                  Send Message
                </button>
              </form>
            ) : (
              <div className="flex min-h-[440px] flex-col items-center justify-center text-center">
                <div className="text-6xl text-brand-200">✓</div>
                <h2 className="mt-6 text-3xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Message sent
                </h2>
                <p className="mt-4 max-w-md text-lg leading-8 text-slate-300">
                  We received your message and will get back to you soon with the right next step.
                </p>
                <button type="button" onClick={() => setSubmitted(false)} className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-white">
                  Send another
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default ContactNeo;
