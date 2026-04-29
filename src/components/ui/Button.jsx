import { Link } from 'react-router-dom';

const VARIANT_STYLES = {
  primary:
    'border border-transparent bg-[linear-gradient(135deg,#6e3bff_0%,#3f7cff_55%,#00aef3_100%)] bg-[length:180%_180%] text-white shadow-[0_14px_30px_rgba(110,59,255,0.22)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_20px_42px_rgba(110,59,255,0.28)] hover:animate-gradient-x active:scale-[0.985]',
  secondary:
    'border border-white/14 bg-white/6 text-white hover:-translate-y-0.5 hover:scale-[1.02] hover:border-cyan-300/25 hover:bg-white/9 hover:shadow-[0_14px_28px_rgba(14,165,233,0.10)] active:scale-[0.985]',
  ghost:
    'border border-transparent text-slate-200 hover:bg-white/8 hover:text-white active:scale-[0.985]',
  ghostLight:
    'border border-slate-200 bg-white/70 text-slate-700 hover:scale-[1.02] hover:border-slate-300 hover:bg-white hover:text-slate-950 hover:shadow-[0_12px_26px_rgba(148,163,184,0.14)] active:scale-[0.985]',
};

const SIZE_STYLES = {
  sm: 'px-4 py-2.5 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

const Button = ({ children, variant = 'primary', size = 'md', className = '', to, href, ...props }) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-300 will-change-transform ${SIZE_STYLES[size]} ${VARIANT_STYLES[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
