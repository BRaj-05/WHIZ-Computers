import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { courseCatalog } from '../data/courseCatalog';

const FILTERS = ['All Courses', 'Foundation', 'Coding', 'Professional', 'Career Skills'];

const matchesFilter = (course, filter) => {
  if (filter === 'All Courses') return true;
  if (filter === 'Professional') return course.level === 'Professional';
  return course.category === filter;
};

const iconForCourse = (course) => {
  if (course.category === 'Coding') return '</>';
  if (course.category === 'Finance') return 'Rs';
  if (course.category === 'Career Skills') return 'AD';
  return 'PC';
};

const CourseCatalogNeo = () => {
  const [activeFilter, setActiveFilter] = useState('All Courses');
  const visibleCourses = useMemo(() => courseCatalog.filter((course) => matchesFilter(course, activeFilter)), [activeFilter]);

  return (
    <section id="courses" className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 -z-20 bg-[#0a0918]" />
      <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(circle at 18% 18%, rgba(110,59,255,0.20), transparent 26%), radial-gradient(circle at 84% 16%, rgba(0,194,255,0.14), transparent 23%), linear-gradient(180deg, #0a0918 0%, #0f0b22 100%)' }} />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-35" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="mb-5 inline-flex rounded-full border border-brand-400/20 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-200">Course catalog</span>
            <h2 className="text-4xl font-bold text-white sm:text-5xl" style={{ fontFamily: 'Syne, sans-serif' }}>
              Pick a track that looks
              <span className="text-gradient"> premium and feels practical</span>
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              The cards are redesigned to feel more like a modern product or coding platform instead of plain white tuition boxes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {FILTERS.map((filter) => (
              <button key={filter} type="button" onClick={() => setActiveFilter(filter)} className={`rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${activeFilter === filter ? 'text-white shadow-lg' : 'border border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white'}`} style={activeFilter === filter ? { background: 'linear-gradient(135deg, #6e3bff, #00aef3)', boxShadow: '0 18px 50px rgba(94, 82, 255, 0.28)' } : undefined}>
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleCourses.map((course) => (
            <article key={course.id} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(13,14,28,0.94),rgba(8,17,28,0.94))] shadow-[0_25px_80px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-90" style={{ background: `radial-gradient(circle at top right, ${course.accent}26 0%, transparent 36%)` }} />
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)]" />
              <div className="relative p-7">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]" style={{ background: `${course.accent}18`, color: course.accent }}>{course.level}</span>
                    <Link to={`/courses/${course.slug}`} className="mt-5 block text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{course.title}</Link>
                    <p className="mt-2 text-sm font-medium text-slate-400">{course.category}</p>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-white/10 bg-white/5 text-lg font-bold shadow-[0_0_24px_rgba(255,255,255,0.05)]" style={{ color: course.accent }}>{iconForCourse(course)}</div>
                </div>
                <p className="min-h-[84px] text-base leading-8 text-slate-300">{course.description}</p>
                <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-black/20 p-4">
                  <div className="mb-3 flex items-center justify-between text-sm text-slate-400"><span>Learning path</span><span>{course.duration}</span></div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full" style={{ width: course.category === 'Coding' ? '82%' : course.category === 'Foundation' ? '64%' : '74%', background: `linear-gradient(90deg, ${course.accent}, #22d3ee)`, boxShadow: `0 0 18px ${course.accent}44` }} />
                  </div>
                </div>
                <div className="mt-7 flex items-center justify-between">
                  <div>
                    <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Fees</div>
                    <div className="mt-1 text-3xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{course.price}</div>
                  </div>
                  <Link to={`/courses/${course.slug}`} className="inline-flex items-center rounded-2xl px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02]" style={{ background: `linear-gradient(135deg, ${course.accent}, #6e3bff)` }}>
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCatalogNeo;
