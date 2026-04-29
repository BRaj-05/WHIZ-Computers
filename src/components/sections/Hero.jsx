import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import HeroBackground from '../effects/HeroBackground';

const HERO_TERMS = ['future-ready developers', 'modern creators', 'career builders'];

const HERO_STATS = [
  { label: 'Students active', value: '50K+' },
  { label: 'Projects shipped', value: '120+' },
  { label: 'Placement focus', value: '98%' },
  { label: 'Mentor reviews', value: '24/7' },
];

const CODE_PREVIEW = [
  { label: 'track', value: 'Full Stack Foundations' },
  { label: 'status', value: 'admissions.open()' },
  { label: 'projects', value: 'portfolio + dashboard + APIs' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const Hero = () => {
  const [termIndex, setTermIndex] = useState(0);
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    const activeWord = HERO_TERMS[termIndex];
    let currentIndex = 0;

    const typeTimer = window.setInterval(() => {
      currentIndex += 1;
      setVisibleText(activeWord.slice(0, currentIndex));

      if (currentIndex >= activeWord.length) {
        window.clearInterval(typeTimer);
        window.setTimeout(() => {
          setVisibleText('');
          setTermIndex((current) => (current + 1) % HERO_TERMS.length);
        }, 1600);
      }
    }, 70);

    return () => window.clearInterval(typeTimer);
  }, [termIndex]);

  return (
    <section id="top" className="relative pb-16 pt-4 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#050816] shadow-[0_40px_120px_rgba(2,8,23,0.45)]">
          <HeroBackground />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative grid gap-12 px-6 py-14 sm:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-12 lg:py-20"
          >
            <div className="max-w-3xl">
              <motion.div variants={itemVariants}>
                <Badge className="border-cyan-400/20 bg-cyan-400/10 text-cyan-100">
                  Developer-first learning platform
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl xl:text-[5.2rem]"
              >
                Learn with the polish of
                <span className="mt-2 block text-slate-100">premium product teams</span>
                <span className="mt-3 block font-mono text-lg font-medium tracking-[-0.02em] text-slate-300 sm:text-[1.65rem]">
                  for <span className="text-cyan-300">{visibleText || HERO_TERMS[termIndex]}</span>
                  <span className="ml-1 inline-block h-6 w-[2px] translate-y-1 bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.8)] animate-caret-blink" />
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-[1.15rem]">
                Whizz Computer blends structured teaching, project shipping, and premium product design so students build real-world tech skills in an interface that feels modern, fast, and serious.
              </motion.p>

              <motion.div variants={itemVariants} className="mt-9 flex flex-wrap gap-3">
                <Button href="#courses" size="lg" className="shadow-[0_0_28px_rgba(110,59,255,0.20)]">
                  Explore tracks
                </Button>
                <Button href="#contact" variant="secondary" size="lg">
                  Talk to admissions
                </Button>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-md">
                    <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 rounded-[32px] bg-[linear-gradient(135deg,rgba(110,59,255,0.14),rgba(0,174,243,0.10))] blur-2xl" />

              <div className="relative space-y-4">
                <div className="gradient-border-card rounded-[30px] bg-[#08101f]/90 p-[1px]">
                  <div className="rounded-[29px] border border-white/8 bg-[#07101d]/95 p-5 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-rose-400" />
                        <span className="h-3 w-3 rounded-full bg-amber-300" />
                        <span className="h-3 w-3 rounded-full bg-emerald-400" />
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-400">terminal</span>
                    </div>

                    <div className="mt-5 space-y-4 font-mono text-sm text-slate-200">
                      <div className="text-cyan-300">$ npx create-whizz-track</div>
                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                        {CODE_PREVIEW.map((item) => (
                          <div key={item.label} className="flex items-start gap-4 py-2">
                            <span className="min-w-16 text-slate-500">{item.label}</span>
                            <span className="text-emerald-300">{item.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-slate-400">
                        {'>'} portfolio.deploy()
                        <span className="ml-2 text-cyan-300">success</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="interactive-card rounded-[28px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl">
                    <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-400">live cohort</div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex -space-x-3">
                        {[0, 1, 2].map((item) => (
                          <div
                            key={item}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(135deg,#6e3bff,#00aef3)] text-xs font-bold text-white"
                          >
                            {`0${item + 1}`}
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-white">Mentor-led shipping sessions</div>
                        <div className="text-sm text-slate-400">Reviews, debugging, and placement prep.</div>
                      </div>
                    </div>
                  </div>

                  <div className="interactive-card rounded-[28px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl">
                    <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-400">stack preview</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {['HTML', 'CSS', 'React', 'Python', 'Excel', 'Design'].map((tech) => (
                        <span key={tech} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 font-mono text-xs text-cyan-100">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-4/5 rounded-full bg-[linear-gradient(90deg,#6e3bff_0%,#00aef3_100%)] shadow-[0_0_30px_rgba(0,174,243,0.5)]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
