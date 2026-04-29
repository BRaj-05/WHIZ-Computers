const TextField = ({ as = 'input', className = '', ...props }) => {
  const Component = as;

  return (
    <Component
      className={`w-full rounded-2xl border border-slate-200/90 bg-slate-50/80 px-4 py-3.5 text-slate-900 outline-none transition-all duration-250 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(110,59,255,0.10),0_14px_32px_rgba(15,23,42,0.08)] ${className}`}
      {...props}
    />
  );
};

export default TextField;
