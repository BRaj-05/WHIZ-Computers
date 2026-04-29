import CodeLines from './CodeLines';
import FloatingParticles from './FloatingParticles';

const HeroBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[36px]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,22,0.98)_0%,rgba(8,11,26,0.94)_52%,rgba(5,8,22,0.98)_100%)]" />

      <div className="absolute -left-20 top-[-8%] h-72 w-72 rounded-full bg-[#6e3bff]/30 blur-3xl animate-hero-float" />
      <div className="absolute right-[-10%] top-[2%] h-80 w-80 rounded-full bg-[#00aef3]/18 blur-3xl animate-hero-float animation-delay-2000" />
      <div className="absolute bottom-[-18%] left-[38%] h-96 w-96 rounded-full bg-[#6e3bff]/16 blur-3xl animate-hero-float animation-delay-4000" />

      <div className="absolute inset-y-0 left-[-20%] w-[60%] rotate-[-10deg] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.05)_48%,transparent_100%)] blur-3xl opacity-10 animate-light-sweep" />

      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(148,163,184,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.9)_1px,transparent_1px)] [background-size:46px_46px]" />

      <CodeLines />
      <FloatingParticles />

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050816] to-transparent" />
    </div>
  );
};

export default HeroBackground;
