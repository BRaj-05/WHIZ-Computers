// src/components/EnhancedFooter.jsx
// Ultra-premium footer with animations and gradients

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FOOTER_LINKS = {
  Company: ["About Us", "Careers", "Blog", "Press"],
  Courses: ["All Courses", "Python", "Web Design", "Digital Marketing"],
  Support: ["Help Center", "Contact Us", "FAQ", "Community"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"],
};

const SOCIAL_LINKS = [
  { icon: "𝕏", label: "Twitter", href: "#" },
  { icon: "f", label: "Facebook", href: "#" },
  { icon: "in", label: "LinkedIn", href: "#" },
  { icon: "Ⓘ", label: "Instagram", href: "#" },
  { icon: "Y", label: "YouTube", href: "#" },
];

const EnhancedFooter = ({ isDark, onToggleDark }) => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 to-slate-900 border-t border-white/10">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{
            background: "radial-gradient(circle, #6e3bff, transparent)",
          }}
        />
        <div
          className="absolute -bottom-40 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-5"
          style={{
            background: "radial-gradient(circle, #18b6ff, transparent)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Top section with CTA */}
        <div className="border-b border-white/10 px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
              Ready to Transform Your{" "}
              <span
                className="text-transparent"
                style={{
                  background: "linear-gradient(90deg, #6e3bff, #18b6ff)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                Tech Career?
              </span>
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Join thousands of students who are already learning from industry
              experts and landing their dream jobs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-lg font-semibold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #6e3bff 0%, #4800e0 100%)",
                }}
              >
                Explore Courses Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-lg font-semibold text-white border-2 border-white/20 hover:border-white/40 transition-colors"
              >
                Schedule Demo
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Main footer content */}
        <div className="px-6 sm:px-8 lg:px-12 py-16">
          <div className="mx-auto max-w-6xl">
            {/* Logo and description */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-12 pb-12 border-b border-white/10"
            >
              <Link to="/" className="flex items-center gap-3 mb-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #6e3bff, #18b6ff)",
                  }}
                >
                  W
                </div>
                <span className="text-xl font-bold text-white">
                  Whizz Computer
                </span>
              </Link>
              <p className="text-slate-400 max-w-md">
                Master computer skills with industry experts. Learn practical,
                hands-on techniques used by top tech companies worldwide.
              </p>
            </motion.div>

            {/* Links grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pb-12 border-b border-white/10"
            >
              {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                <motion.div key={category} variants={itemVariants}>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex flex-col md:flex-row items-center justify-between gap-6"
            >
              {/* Theme toggle and Social links */}
              <div className="flex gap-4 items-center">
                {/* Theme Toggle */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onToggleDark}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-lg font-bold hover:border-white/40 hover:bg-white/5 transition-all hover:shadow-lg"
                  title={
                    isDark ? "Switch to Light Mode" : "Switch to Dark Mode"
                  }
                >
                  {isDark ? "☀️" : "🌙"}
                </motion.button>

                {/* Social links */}
                {SOCIAL_LINKS.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-sm font-bold text-white hover:border-white/50 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              {/* Copyright and bottom text */}
              <div className="text-center md:text-right space-y-2">
                <p className="text-sm text-slate-400">
                  © {currentYear} Whizz Computer. All rights reserved.
                </p>
                <p className="text-xs text-slate-500">
                  Empowering the next generation of tech professionals
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
