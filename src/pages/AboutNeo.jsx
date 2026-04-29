import { motion } from 'framer-motion';
import { pageVariants } from '../animations/motionVariants';

const milestones = [
  ['2016', 'Founded in Patna with 20 students and a dream'],
  ['2018', 'Crossed 500 students and added Python and Web Design'],
  ['2020', 'Launched online learning during the pandemic'],
  ['2022', 'Govt. recognized institute with 2000+ alumni'],
  ['2024', '5000+ students and 200+ hiring partners'],
  ['2026', 'Expanding to 3 new cities with fresh admissions'],
];

const AboutNeo = () => {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen bg-[#0b0a18] pt-36">
      <section className="relative overflow-hidden pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(110,59,255,0.2),transparent_24%),linear-gradient(180deg,#0b0a18_0%,#111327_100%)]" />
        <div className="absolute inset-0 -z-10 grid-pattern opacity-35" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-brand-400/20 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-200">About Whizz</span>
            <h1 className="mt-7 text-5xl font-bold text-white sm:text-6xl" style={{ fontFamily: 'Syne, sans-serif' }}>
              A modern computer institute with
              <span className="text-gradient"> practical teaching at the center</span>
            </h1>
            <p className="mt-6 text-xl leading-9 text-slate-300">
              We help students move from confusion to clarity in coding, office productivity, and digital career skills through guided projects and real mentoring.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="text-sm uppercase tracking-[0.22em] text-brand-200">Why we exist</div>
              <p className="mt-5 text-lg leading-9 text-slate-200">
                Too many students join training centers and still leave without confidence. Whizz is built to be different: clearer explanations, stronger UI, modern presentation, and practical output.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {['Practical first', 'Career-ready', 'Affordable tracks', 'Modern coding focus'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm font-semibold text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(16,18,36,0.95),rgba(8,28,41,0.88))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
              <div className="text-sm uppercase tracking-[0.22em] text-brand-200">Our journey</div>
              <div className="relative mt-8 pl-8">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-[linear-gradient(180deg,#6e3bff,#00d4ff)]" />
                <div className="space-y-8">
                  {milestones.map(([year, text]) => (
                    <div key={year} className="relative">
                      <div className="absolute -left-[1.25rem] top-1 flex h-8 w-8 items-center justify-center rounded-full border border-brand-400 bg-[#0b0a18] text-xs font-bold text-brand-200">
                        {year.slice(2)}
                      </div>
                      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">{year}</div>
                      <div className="mt-2 text-lg leading-8 text-slate-300">{text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default AboutNeo;
