import { useState } from 'react';

const FAQS = [
  {
    q: 'Do I need prior computer knowledge to join?',
    a: 'No. Our beginner tracks start from the basics. Advanced coding courses are easier if you already know the fundamentals, but we help bridge the gap.',
  },
  {
    q: 'What are the batch timings?',
    a: 'We offer morning, afternoon, and evening batches on weekdays and weekends so students and working learners can join comfortably.',
  },
  {
    q: 'Do you provide certificates?',
    a: 'Yes. Students receive course completion certificates after finishing assignments, attendance requirements, and practical assessments.',
  },
  {
    q: 'Is there placement support for coding students?',
    a: 'Yes. Our coding-focused programs include resume support, mock interviews, project guidance, and job-readiness mentoring.',
  },
  {
    q: 'Can I pay in installments?',
    a: 'Yes. For longer programs we support installment-based fee plans. Final options depend on the selected course.',
  },
  {
    q: 'Will these courses help me build real projects?',
    a: 'Yes. We focus on practical assignments, portfolio pieces, and project-based learning so you finish with usable work, not just theory.',
  },
];

const FaqSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 -z-20 bg-[#090816]" />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 10% 16%, rgba(110,59,255,0.18), transparent 26%), radial-gradient(circle at 84% 20%, rgba(0,194,255,0.1), transparent 22%), linear-gradient(180deg, #090816 0%, #10162d 100%)',
        }}
      />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-25" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-5 inline-flex rounded-full border border-brand-400/20 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-200">
            FAQ
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl" style={{ fontFamily: 'Syne, sans-serif' }}>
            Questions students ask before joining
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Fast answers, cleaner transitions, and a darker premium style so this section feels like part of the same platform.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((item, index) => {
            const open = active === index;
            return (
              <article
                key={item.q}
                className={`overflow-hidden rounded-[1.9rem] border px-6 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-all duration-300 ${
                  open ? 'border-brand-400/25 bg-[linear-gradient(135deg,rgba(18,16,35,0.96),rgba(9,30,43,0.9))]' : 'border-white/10 bg-white/5'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActive(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="text-xl font-semibold text-white">{item.q}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg text-brand-200">
                    {open ? '-' : '+'}
                  </span>
                </button>

                <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-70'}`}>
                  <div className="overflow-hidden">
                    <p className="pt-5 pr-14 text-lg leading-8 text-slate-300">{item.a}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
