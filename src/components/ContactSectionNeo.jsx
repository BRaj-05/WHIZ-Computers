import { Link } from 'react-router-dom';

const steps = [
  'Choose your course track',
  'Talk to admissions',
  'Join your batch',
  'Build practical projects',
];

const ContactSectionNeo = () => {
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 -z-20 bg-[#0a0917]" />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 14% 20%, rgba(0,194,255,0.12), transparent 22%), radial-gradient(circle at 84% 30%, rgba(110,59,255,0.2), transparent 24%), linear-gradient(180deg, #0a0917 0%, #10162d 100%)',
        }}
      />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-25" />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,14,31,0.95),rgba(8,23,37,0.92))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
          <span className="inline-flex rounded-full border border-brand-400/20 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-200">
            Admissions support
          </span>
          <h2 className="mt-6 text-4xl font-bold text-white sm:text-5xl" style={{ fontFamily: 'Syne, sans-serif' }}>
            Talk to us and
            <span className="text-gradient"> get the right next step fast</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            If you are unsure whether to start with basics, office tools, or coding, we guide you into the right track
            and fee plan without wasting time.
          </p>

          <div className="mt-8 space-y-3">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/15 text-sm font-semibold text-brand-200">
                  {index + 1}
                </div>
                <div className="text-base font-medium text-slate-200">{step}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ['Call us', '+91 99999 00000'],
              ['Email us', 'hello@whizzcomputer.com'],
              ['Visit us', 'Fraser Road, Patna'],
              ['Batch timing', 'Morning, afternoon, evening'],
            ].map(([label, value]) => (
              <article key={label} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
                <div className="text-sm uppercase tracking-[0.22em] text-brand-200">{label}</div>
                <div className="mt-4 text-xl font-semibold text-white">{value}</div>
              </article>
            ))}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.22em] text-brand-200">Ready to join</div>
                <div className="mt-3 text-3xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Book your admission path
                </div>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
                  Use the full contact form or jump straight into registration and choose your course there.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Open contact page
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center rounded-2xl px-6 py-3.5 text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #6e3bff, #00aef3)', boxShadow: '0 16px 40px rgba(88, 66, 255, 0.24)' }}
                >
                  Register now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSectionNeo;
