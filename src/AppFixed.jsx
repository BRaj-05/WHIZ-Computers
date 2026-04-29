import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDarkMode } from './hooks/useDarkMode';
import { useLenisSafe } from './hooks/useLenisSafe';
import Loader from './components/Loader';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import NavbarFixed from './components/NavbarFixed';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';

const AppFixed = () => {
  const { isDark, toggleDark } = useDarkMode();
  const location = useLocation();
  const shouldShowLoader = useMemo(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return sessionStorage.getItem('whizz_loader_seen') !== 'true';
  }, []);
  const [loadingDone, setLoadingDone] = useState(!shouldShowLoader);

  useLenisSafe();

  const handleLoaderComplete = () => {
    sessionStorage.setItem('whizz_loader_seen', 'true');
    setLoadingDone(true);
  };

  return (
    <>
      <CustomCursor />
      {!loadingDone && <Loader onComplete={handleLoaderComplete} />}

      <div className={`min-h-screen transition-opacity duration-500 ${loadingDone ? 'opacity-100' : 'opacity-0'}`}>
        <NavbarFixed isDark={isDark} onToggleDark={toggleDark} />

        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={`${location.pathname}${location.hash}`}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
};

export default AppFixed;
