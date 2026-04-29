const Badge = ({ children, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/14 bg-white/8 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-200 ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
