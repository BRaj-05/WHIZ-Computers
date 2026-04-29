const Card = ({ children, className = '', hover = true }) => {
  return (
    <article
      className={`interactive-card relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_18px_44px_rgba(2,8,23,0.24)] transition-all duration-300 ${
        hover ? 'hover:-translate-y-1.5 hover:border-cyan-300/20 hover:shadow-[0_24px_68px_rgba(2,8,23,0.36)]' : ''
      } ${className}`}
    >
      <div className="absolute inset-0 rounded-[28px] bg-[linear-gradient(135deg,rgba(110,59,255,0.16),transparent_32%,rgba(0,174,243,0.12))] opacity-80" />
      <div className="relative z-10">{children}</div>
    </article>
  );
};

export default Card;
