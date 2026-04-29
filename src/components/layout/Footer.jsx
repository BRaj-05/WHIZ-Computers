import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Footer = ({ tone = 'dark' }) => {
  const isLight = tone === 'light';

  return (
    <footer
      className={`relative mt-24 border-t ${
        isLight ? 'border-slate-200/80 bg-white/70 text-slate-600' : 'border-white/10 bg-[#060914]/70 text-slate-400'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div
          className={`rounded-[32px] border p-8 backdrop-blur-xl ${
            isLight
              ? 'border-slate-200/80 bg-white/80 shadow-[0_24px_60px_rgba(148,163,184,0.14)]'
              : 'border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(2,8,23,0.34)]'
          }`}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className={`font-mono text-xs uppercase tracking-[0.3em] ${isLight ? 'text-brand-600' : 'text-cyan-300'}`}>
                Premium Learning Platform
              </p>
              <h3 className={`mt-4 font-display text-3xl font-bold tracking-tight ${isLight ? 'text-slate-950' : 'text-white'}`}>
                Build practical skills with a product-grade learning experience.
              </h3>
              <p className="mt-3 text-sm leading-7">
                Structured programs, portfolio-ready projects, and developer-style workflows that make learning feel modern.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button to="/login" variant={isLight ? 'ghostLight' : 'secondary'}>
                Login
              </Button>
              <Button to="/register">Create account</Button>
            </div>
          </div>

          <div className={`mt-10 flex flex-col gap-5 border-t pt-8 sm:flex-row sm:items-center sm:justify-between ${isLight ? 'border-slate-200/80' : 'border-white/10'}`}>
            <div>
              <Link to="/" className={`font-display text-xl font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                Whizz Computer
              </Link>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.24em]">Fraser Road, Patna</p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <a href="/#about" className="transition hover:text-brand-500">
                About
              </a>
              <a href="/#courses" className="transition hover:text-brand-500">
                Courses
              </a>
              <a href="/#contact" className="transition hover:text-brand-500">
                Contact
              </a>
            </div>

            <p className="text-xs uppercase tracking-[0.18em]">Copyright 2026 Whizz Computer</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
