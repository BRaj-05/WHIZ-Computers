import { Link } from 'react-router-dom';

const highlights = [
  { value: '5000+', label: 'Learners trained' },
  { value: '200+', label: 'Hiring connections' },
  { value: '10+', label: 'Career-ready tracks' },
  { value: '94%', label: 'Practical completion rate' },
];

const AboutSectionNeo = () => {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 -z-20 bg-[#090816]" />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 18% 24%, rgba(110,59,255,0.22), transparent 24%), radial-gradient(circle at 84% 16%, rgba(0,194,255,0.12), transparent 22%), linear-gradient(180deg, #090816 0%, #0f1226 100%)',
        }}
      />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-brand-400/20 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-200">
            About Whizz
          </span>
          <h2 className="mt-6 text-4xl font-bold text-white sm:text-5xl" style={{ fontFamily: 'Syne, sans-serif' }}>
            Training that feels
            <span className="text-gradient"> modern, practical, and career-focused</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Whizz Computer is built for students who want a cleaner path into technology. We teach foundations, coding,
            office tools, and job-ready digital skills through guided practice instead of confusing theory-heavy classes.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {['Project reviews', 'Mentor support', 'Flexible batches', 'Portfolio-ready output'].map((item) => (
              <span key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/about"
              className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore our story
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center rounded-2xl px-6 py-3.5 text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #6e3bff, #00aef3)', boxShadow: '0 16px 40px rgba(88, 66, 255, 0.24)' }}
            >
              Start your journey
            </Link>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {highlights.map((item, index) => (
            <article
              key={item.label}
              className={`rounded-[2rem] border border-white/10 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] ${
                index === 0 ? 'bg-[linear-gradient(135deg,rgba(17,16,36,0.95),rgba(8,29,45,0.88))] sm:col-span-2' : 'bg-white/5'
              }`}
            >
              <div className="text-sm uppercase tracking-[0.22em] text-brand-200">{item.label}</div>
              <div className="mt-4 text-4xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                {item.value}
              </div>
              <p className="mt-4 text-base leading-7 text-slate-300">
                {index === 0
                  ? 'From beginners to aspiring developers, our structure is designed to build confidence and visible progress.'
                  : 'A stronger learning system with clear milestones, cleaner design, and more practical output.'}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSectionNeo;
