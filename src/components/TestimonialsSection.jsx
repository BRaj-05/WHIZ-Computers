const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Python Student',
    company: 'Placed at TCS',
    text: 'The Python track helped me move from theory to real projects. My interview confidence improved a lot.',
    accent: '#5b52ff',
  },
  {
    name: 'Rahul Gupta',
    role: 'Web Development Student',
    company: 'Freelance Designer',
    text: 'The projects were practical and the guidance was clear. I built a portfolio that actually got responses.',
    accent: '#0f766e',
  },
  {
    name: 'Anjali Verma',
    role: 'Tally Student',
    company: 'Accounts Executive',
    text: 'What I liked most was the step-by-step practical work. It felt useful from the first week itself.',
    accent: '#d97706',
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative overflow-hidden py-24 sm:py-28">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 10% 15%, rgba(110,59,255,0.16), transparent 28%), radial-gradient(circle at 85% 20%, rgba(0,245,212,0.1), transparent 24%), linear-gradient(180deg, #0b0820 0%, #0f0b2b 100%)',
        }}
      />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <span className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-brand-300">
            Student stories
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl" style={{ fontFamily: 'Syne, sans-serif' }}>
            Results that feel real, not decorative
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            We kept this section lighter and cleaner so it looks polished without the pinned-scroll lag.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <article key={item.name} className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>★</span>
                ))}
              </div>
              <p className="min-h-[136px] text-lg leading-8 text-slate-200">"{item.text}"</p>
              <div className="mt-8 flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${item.accent}, ${item.accent}cc)` }}
                >
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="text-sm text-slate-400">{item.role}</div>
                  <div className="text-sm" style={{ color: item.accent }}>{item.company}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
