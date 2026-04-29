import { Link } from 'react-router-dom';

const DashboardPreview = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 20% 10%, rgba(110,59,255,0.16), transparent 28%), radial-gradient(circle at 86% 18%, rgba(0,194,255,0.12), transparent 22%), linear-gradient(180deg, #090816 0%, #10152b 100%)',
        }}
      />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-25" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="max-w-2xl">
          <span className="mb-5 inline-flex rounded-full border border-brand-400/20 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-200">
            Student dashboard
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl" style={{ fontFamily: 'Syne, sans-serif' }}>
            Track coding progress, projects, and next actions in one place
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Your dashboard should feel like a real learning platform, not just a static page. This section previews progress, active courses, and learning streaks.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center rounded-2xl px-6 py-3.5 text-sm font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #5b52ff, #4338ca)',
                boxShadow: '0 18px 40px rgba(91, 82, 255, 0.2)',
              }}
            >
              Open dashboard
            </Link>
            <a href="#pricing" className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white">
              Compare plans
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,16,34,0.96),rgba(9,29,43,0.9))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400">Learning overview</div>
              <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                Build and ship your skills
              </div>
            </div>
            <div className="rounded-2xl bg-brand-500/15 px-3 py-2 text-sm font-semibold text-brand-200">72% done</div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['Hours learned', '126'],
              ['Projects', '9'],
              ['Interview score', '88%'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm text-slate-400">{label}</div>
                <div className="mt-2 text-3xl font-bold text-white">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {[
              ['Python Programming', 'Module 8: APIs', '82%'],
              ['Web Development', 'Responsive Project', '68%'],
              ['Career Readiness', 'Portfolio Review', '90%'],
            ].map(([title, subtitle, progress]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-black/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-white">{title}</div>
                    <div className="text-sm text-slate-400">{subtitle}</div>
                  </div>
                  <div className="text-sm font-semibold text-brand-600">{progress}</div>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: progress,
                      background: 'linear-gradient(90deg, #5b52ff, #22d3ee)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
