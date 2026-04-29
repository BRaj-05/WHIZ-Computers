import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const COURSE_ICON = {
  Coding: '</>',
  Foundation: 'PC',
  Finance: 'FI',
  'Career Skills': 'CS',
  'Office Productivity': 'OF',
};

const CourseCard = ({ course }) => {
  const progress =
    course.category === 'Coding'
      ? 84
      : course.category === 'Foundation'
        ? 58
        : course.category === 'Career Skills'
          ? 70
          : 74;

  return (
    <Card className="group relative overflow-hidden p-0" hover>
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(circle at 100% 0%, ${course.accent}55 0%, transparent 38%)`,
        }}
      />

      <div className="relative p-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <Badge className="border-white/15 bg-white/5 text-slate-300">{course.level}</Badge>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white transition-transform duration-300 group-hover:translate-x-0.5">
              {course.title}
            </h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.24em] text-slate-400">{course.category}</p>
          </div>
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 font-mono text-sm font-bold text-white transition-transform duration-300 group-hover:scale-110"
            style={{ boxShadow: `0 0 20px ${course.accent}40` }}
          >
            {COURSE_ICON[course.category] || 'CO'}
          </div>
        </div>

        <p className="min-h-[72px] text-sm leading-7 text-slate-300">{course.description}</p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
            <span>Duration</span>
            <span>{course.duration}</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10">
            <div
              className="h-1.5 rounded-full shadow-[0_0_28px_rgba(0,174,243,0.35)]"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${course.accent}, #00aef3)`,
              }}
            />
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between gap-3">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">Fees</div>
            <div className="mt-1 font-display text-2xl font-bold text-white">{course.price}</div>
          </div>
          <Button to={`/courses/${course.slug}`} size="sm" className="whitespace-nowrap">
            View details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
