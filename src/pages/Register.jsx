import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import TextField from '../components/ui/TextField';
import { pageVariants } from '../animations/motionVariants';
import { useDarkMode } from '../hooks/useDarkMode';

const Register = () => {
  const { isDark } = useDarkMode();

  return (
    <motion.section variants={pageVariants} initial="initial" animate="animate" exit="exit" className="py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div
          className={`hidden rounded-[32px] border p-10 shadow-[0_26px_60px_rgba(148,163,184,0.14)] lg:block ${
            isDark
              ? 'border-white/10 bg-[linear-gradient(160deg,#081120_0%,#0c1528_100%)] text-slate-100 shadow-[0_26px_80px_rgba(2,8,23,0.34)]'
              : 'border-slate-200/80 bg-[linear-gradient(160deg,#ffffff_0%,#f5f7fb_100%)] text-slate-900'
          }`}
        >
          <p className={`font-mono text-xs uppercase tracking-[0.24em] ${isDark ? 'text-cyan-300' : 'text-brand-600'}`}>Create account</p>
          <h1 className={`mt-4 max-w-md font-display text-5xl font-bold leading-[1.02] ${isDark ? 'text-white' : 'text-slate-950'}`}>Join Whizz Computer with a cleaner, product-grade onboarding flow.</h1>
          <p className={`mt-5 max-w-md text-base leading-7 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Track progress, access mentors, and enroll in premium learning paths without the visual noise.</p>
          <div className={`mt-8 rounded-3xl border p-5 ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200/80 bg-white/80'}`}>
            <div className={`font-mono text-[11px] uppercase tracking-[0.22em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>account.setup()</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Learning dashboard', 'Mentor feedback', 'Course access'].map((item) => (
                <span key={item} className={`rounded-full border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] ${isDark ? 'border-white/10 bg-white/5 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`rounded-[32px] border p-8 backdrop-blur-md ${
            isDark
              ? 'border-white/10 bg-[#0b1324]/88 shadow-[0_22px_58px_rgba(2,8,23,0.3)]'
              : 'border-slate-200/80 bg-white/90 shadow-[0_22px_58px_rgba(148,163,184,0.14)]'
          }`}
        >
          <h2 className={`font-display text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>Register</h2>
          <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Create your student account in minutes.</p>

          <div className="mt-7 space-y-4">
            <TextField
              type="text"
              placeholder="Full name"
              className={isDark ? 'border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12),0_14px_32px_rgba(2,8,23,0.2)]' : ''}
            />
            <TextField
              type="email"
              placeholder="Email address"
              className={isDark ? 'border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12),0_14px_32px_rgba(2,8,23,0.2)]' : ''}
            />
            <TextField
              type="tel"
              placeholder="Phone"
              className={isDark ? 'border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12),0_14px_32px_rgba(2,8,23,0.2)]' : ''}
            />
            <TextField
              type="password"
              placeholder="Password"
              className={isDark ? 'border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12),0_14px_32px_rgba(2,8,23,0.2)]' : ''}
            />
            <Button className="w-full justify-center" size="lg">
              Create account
            </Button>
          </div>

          <p className={`mt-6 text-center text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default Register;
