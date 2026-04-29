import { Link } from 'react-router-dom';

const PRICING = [
  {
    name: 'Starter',
    price: 'Rs. 3,000',
    description: 'For beginners starting with computer basics and office tools.',
    features: ['2 month access', 'Lab practice', 'Printed notes', 'Certificate support'],
    highlight: false,
  },
  {
    name: 'Career Track',
    price: 'Rs. 8,500',
    description: 'For students who want coding, projects, and guided career growth.',
    features: ['Python or web development', 'Weekly mentor reviews', 'Projects for portfolio', 'Interview preparation'],
    highlight: true,
  },
  {
    name: 'Pro Plus',
    price: 'Rs. 12,000',
    description: 'For serious learners who want advanced skills plus placement support.',
    features: ['Advanced coding track', 'Resume and LinkedIn help', 'Mock interviews', 'Priority support'],
    highlight: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-24 sm:py-28">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(180deg, #0f0a25 0%, #130c31 100%)' }}
      />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-brand-300">
            Pricing plans
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl" style={{ fontFamily: 'Syne, sans-serif' }}>
            Clear fees, practical outcomes, no confusion
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Choose a plan based on your learning goal. You can start small, then upgrade as you grow.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {PRICING.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-[2rem] border p-8 ${
                plan.highlight
                  ? 'border-brand-400/50 bg-gradient-to-br from-brand-700/50 to-slate-950 shadow-[0_24px_80px_rgba(91,82,255,0.35)]'
                  : 'border-white/10 bg-white/5'
              } backdrop-blur-xl`}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">{plan.name}</div>
                  <div className="mt-3 text-4xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {plan.price}
                  </div>
                </div>
                {plan.highlight && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">Most Popular</span>
                )}
              </div>

              <p className="text-base leading-7 text-slate-300">{plan.description}</p>

              <div className="my-7 h-px bg-white/10" />

              <ul className="space-y-4 text-sm text-slate-200">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-brand-200">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/register"
                className={`mt-8 block w-full rounded-2xl px-5 py-3.5 text-center text-sm font-semibold transition-transform duration-200 hover:scale-[1.01] ${
                  plan.highlight ? 'bg-white text-brand-700' : 'bg-brand-600 text-white'
                }`}
              >
                Choose {plan.name}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
