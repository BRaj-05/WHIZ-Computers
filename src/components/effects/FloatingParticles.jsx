const PARTICLES = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  size: index % 3 === 0 ? 5 : index % 2 === 0 ? 3 : 4,
  left: `${6 + ((index * 11) % 88)}%`,
  top: `${8 + ((index * 7) % 78)}%`,
  delay: `${(index % 6) * 0.8}s`,
  duration: `${12 + (index % 5) * 3}s`,
}));

const FloatingParticles = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((particle) => (
        <span
          key={particle.id}
          className="absolute rounded-full bg-cyan-300/70 shadow-[0_0_18px_rgba(34,211,238,0.55)] animate-float-particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
