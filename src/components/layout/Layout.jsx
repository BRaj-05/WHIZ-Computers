import Navbar from './Navbar';
import Footer from './Footer';
import { useDarkMode } from '../../hooks/useDarkMode';

const Layout = ({ children, tone = 'dark', showFooter = true }) => {
  const { isDark } = useDarkMode();
  const effectiveTone = isDark ? 'dark' : tone;
  const isLight = effectiveTone === 'light';

  return (
    <div
      className={`relative min-h-screen overflow-x-clip transition-colors duration-500 ${
        isLight
          ? 'bg-[radial-gradient(circle_at_top,#ffffff_0%,#f7f8fc_52%,#edf1f7_100%)] text-slate-900'
          : 'bg-[linear-gradient(180deg,#050816_0%,#090b18_42%,#070a15_100%)] text-slate-100'
      }`}
    >
      {!isLight && (
        <>
          <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_15%_18%,rgba(110,59,255,0.18),transparent_26%),radial-gradient(circle_at_85%_10%,rgba(0,174,243,0.14),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(110,59,255,0.12),transparent_35%)]" />
          <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_85%)]" />
        </>
      )}

      <Navbar tone={effectiveTone} />
      <main className="relative z-10 flex-1 pt-28 sm:pt-32">{children}</main>
      {showFooter && <Footer tone={effectiveTone} />}
    </div>
  );
};

export default Layout;
