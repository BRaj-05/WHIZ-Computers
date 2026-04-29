import { Link } from 'react-router-dom';
import { courseCatalog } from '../data/courseCatalog';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Courses', to: '/#courses' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Contact', to: '/#contact' },
];

const socialLinks = [
  { label: 'Facebook', icon: 'f' },
  { label: 'Instagram', icon: 'ig' },
  { label: 'Twitter', icon: 'x' },
  { label: 'YouTube', icon: 'yt' },
];

const popularCourseSlugs = [
  'basic-computer',
  'advanced-computer-ms-office',
  'web-development',
  'python-programming',
  'graphic-design',
];

const FooterNeo = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/6 bg-[#141d38]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(110,59,255,0.16),transparent_22%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.22em] text-brand-200">Ready to enroll</div>
            <div className="mt-3 text-3xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              Build your next skill with a cleaner learning platform
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/login" className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center rounded-2xl px-6 py-3.5 text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #6e3bff, #00aef3)', boxShadow: '0 18px 40px rgba(88, 66, 255, 0.24)' }}
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.9fr_1fr_1.05fr]">
          <div>
            <Link to="/" className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6e3bff,#18b6ff)] text-2xl font-bold text-white">
                W
              </div>
              <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                Whizz <span className="text-gradient">Computer</span>
              </div>
            </Link>

            <p className="mt-7 max-w-sm text-[1.05rem] leading-9 text-slate-300">
              Empowering students with practical computer skills, cleaner learning journeys, and coding paths that feel modern from the first click.
            </p>

            <div className="mt-8 flex gap-3">
              {socialLinks.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  aria-label={item.label}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-sm font-semibold uppercase tracking-wide text-slate-200 transition-transform duration-200 hover:-translate-y-1 hover:bg-white/10"
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[1.35rem] font-bold uppercase tracking-[0.06em] text-white">Quick Links</h3>
            <div className="mt-7 space-y-5">
              {quickLinks.map((link) => (
                <Link key={link.label} to={link.to} className="block text-[1.08rem] text-slate-300 transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[1.35rem] font-bold uppercase tracking-[0.06em] text-white">Popular Courses</h3>
            <div className="mt-7 space-y-5">
              {popularCourseSlugs.map((slug) => courseCatalog.find((course) => course.slug === slug)).filter(Boolean).map((course) => (
                <Link key={course.slug} to={`/courses/${course.slug}`} className="block text-[1.08rem] text-slate-300 transition-colors hover:text-white">
                  {course.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[1.35rem] font-bold uppercase tracking-[0.06em] text-white">Contact Us</h3>
            <div className="mt-7 space-y-7 text-[1.06rem] leading-8 text-slate-300">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/6 text-brand-200">◎</div>
                <div>Fraser Road, Patna, Bihar 800001</div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/6 text-brand-200">⌕</div>
                <div>+91 99999 00000</div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/6 text-brand-200">✉</div>
                <div>hello@whizzcomputer.com</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 h-px bg-white/8" />

        <div className="mt-10 flex flex-col gap-5 text-[1rem] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div>© 2026 Whizz Computer. All rights reserved.</div>
          <div className="flex flex-wrap gap-8">
            <Link to="/about" className="transition-colors hover:text-white">
              About Page
            </Link>
            <Link to="/contact" className="transition-colors hover:text-white">
              Contact Page
            </Link>
            <Link to="/dashboard" className="transition-colors hover:text-white">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNeo;
