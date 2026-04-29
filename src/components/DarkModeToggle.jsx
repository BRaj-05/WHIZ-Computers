// src/components/DarkModeToggle.jsx
// Animated pill toggle for dark/light mode

import { motion } from "framer-motion";

const DarkModeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-14 h-7 rounded-full flex items-center px-1 transition-colors duration-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #6e3bff, #4800e0)"
          : "linear-gradient(135deg, #e0e7ff, #c4c2ff)",
      }}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 text-xs">{isDark ? "🌙" : ""}</span>
      <span className="absolute right-1.5 text-xs">{!isDark ? "☀️" : ""}</span>

      {/* Thumb */}
      <motion.div
        className="w-5 h-5 rounded-full shadow-md flex items-center justify-center text-xs relative z-10"
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          background: isDark ? "#fff" : "#6e3bff",
        }}
      >
        {isDark ? "🌙" : "☀️"}
      </motion.div>
    </button>
  );
};

export default DarkModeToggle;
