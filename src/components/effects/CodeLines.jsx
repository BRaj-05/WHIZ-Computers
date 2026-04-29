const CODE_ROWS = [
  "const cohort = await platform.launch({ track: 'full-stack' });",
  'if (student.progress > 0.85) unlockCareerSprint();',
  "deploy({ projects: ['portfolio', 'dashboard', 'api'] });",
  'mentor.review(submission).then(improveShippingConfidence);',
  'git commit -m "ship skills, not just certificates"',
  'type SkillMap = { coding: true; design: true; career: true };',
  'pnpm create whizz-career-starter --interactive',
  'const roadmap = modules.filter(module => module.realWorld);',
];

const CodeLines = () => {
  const rows = [...CODE_ROWS, ...CODE_ROWS];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050816] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050816] to-transparent" />
      <div className="animate-code-drift space-y-5 px-6 py-10 font-mono text-[11px] leading-6 text-cyan-300/90 sm:px-10 sm:text-xs">
        {rows.map((row, index) => (
          <div
            key={`${row}-${index}`}
            className={`whitespace-nowrap ${index % 3 === 0 ? 'text-emerald-300/80' : index % 2 === 0 ? 'text-cyan-300/80' : 'text-sky-300/70'}`}
          >
            <span className="mr-4 text-slate-500/70">{String(index + 1).padStart(2, '0')}</span>
            {row}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeLines;
