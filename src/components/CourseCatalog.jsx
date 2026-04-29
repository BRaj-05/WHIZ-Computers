import { useMemo, useState } from 'react';

const COURSES = [
  {
    id: 'basic-computer',
    title: 'Basic Computer',
    level: 'Beginner',
    category: 'Foundation',
    duration: '2 Months',
    price: 'Rs. 3,000',
    desc: 'Learn computer fundamentals, internet, email, typing, and daily office workflows.',
    gradient: 'linear-gradient(135deg, #e8ecff 0%, #d8dfff 100%)',
    accent: '#5b52ff',
  },
  {
    id: 'advanced-office',
    title: 'Advanced Computer (MS Office)',
    level: 'Advanced',
    category: 'Office Productivity',
    duration: '3 Months',
    price: 'Rs. 5,000',
    desc: 'Master Excel, PowerPoint, Word, dashboards, formulas, reports, and presentation skills.',
    gradient: 'linear-gradient(135deg, #e9f1ff 0%, #d6e6ff 100%)',
    accent: '#4f46e5',
  },
  {
    id: 'tally-accounting',
    title: 'Tally & Accounting',
    level: 'Professional',
    category: 'Finance',
    duration: '3 Months',
    price: 'Rs. 5,000',
    desc: 'Learn GST, vouchers, payroll, inventory, billing, and real accounting workflows.',
    gradient: 'linear-gradient(135deg, #fff2d8 0%, #ffe5b4 100%)',
    accent: '#d97706',
  },
  {
    id: 'python-programming',
    title: 'Python Programming',
    level: 'Development',
    category: 'Coding',
    duration: '4 Months',
    price: 'Rs. 8,500',
    desc: 'Build logic, projects, automation scripts, and coding confidence with practical exercises.',
    gradient: 'linear-gradient(135deg, #dcfdf4 0%, #ccfbf1 100%)',
    accent: '#0f766e',
  },
  {
    id: 'web-development',
    title: 'Web Development',
    level: 'Development',
    category: 'Coding',
    duration: '5 Months',
    price: 'Rs. 12,000',
    desc: 'HTML, CSS, JavaScript, React basics, responsive design, and deploy-ready projects.',
    gradient: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
    accent: '#7c3aed',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    level: 'Professional',
    category: 'Career Skills',
    duration: '3 Months',
    price: 'Rs. 6,500',
    desc: 'SEO, Meta Ads, Google Ads, content strategy, and campaign reporting for real businesses.',
    gradient: 'linear-gradient(135deg, #ffe4ef 0%, #ffd7e7 100%)',
    accent: '#db2777',
  },
];

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

const CourseCatalog = () => {
  const [activeFilter, setActiveFilter] = useState('All Courses');

  const visibleCourses = useMemo(
    () => COURSES.filter((course) => matchesFilter(course, activeFilter)),
    [activeFilter]
  );

  return (
    <section id="courses" className="relative py-24 sm:py-28">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 15% 20%, rgba(110,59,255,0.14), transparent 32%), radial-gradient(circle at 85% 15%, rgba(0,245,212,0.12), transparent 28%), linear-gradient(180deg, #fbfbff 0%, #f3f4ff 100%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span
              className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
              style={{
                background: 'rgba(91,82,255,0.08)',
                border: '1px solid rgba(91,82,255,0.16)',
                color: '#5b52ff',
              }}
            >
              Popular programs
            </span>
            <h2 className="text-4xl font-bold text-slate-950 sm:text-5xl" style={{ fontFamily: 'Syne, sans-serif' }}>
              Job-ready courses for
              <span className="text-gradient"> coding and career growth</span>
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
              Each course is designed around practical projects, clear pricing, and skills that are useful in real work.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                  activeFilter === filter
                    ? 'text-white shadow-lg'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
                style={
                  activeFilter === filter
                    ? {
                        background: 'linear-gradient(135deg, #5b52ff, #4338ca)',
                        boxShadow: '0 18px 40px rgba(91, 82, 255, 0.22)',
                      }
                    : undefined
                }
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleCourses.map((course) => (
            <article
              key={course.id}
              className="group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative h-60 p-8" style={{ background: course.gradient }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.85),transparent_38%)]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex rounded-full px-3 py-1 text-sm font-semibold"
                      style={{ background: 'rgba(255,255,255,0.75)', color: course.accent }}
                    >
                      {course.level}
                    </span>
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-xl font-bold shadow-lg"
                      style={{ color: course.accent }}
                    >
                      {iconForCourse(course)}
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-white/70 bg-white/75 p-4 backdrop-blur">
                    <div className="mb-2 text-sm font-medium text-slate-500">{course.category}</div>
                    <div className="text-xl font-bold text-slate-950">{course.title}</div>
                  </div>
                </div>
              </div>

              <div className="p-7">
                <p className="min-h-[88px] text-base leading-8 text-slate-600">{course.desc}</p>

                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 text-slate-500">
                  <span className="text-base">{course.duration}</span>
                  <span className="text-3xl font-bold" style={{ color: course.accent, fontFamily: 'Syne, sans-serif' }}>
                    {course.price}
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <a href="#faq" className="text-base font-semibold" style={{ color: course.accent }}>
                    View details
                  </a>
                  <a
                    href="#pricing"
                    className="inline-flex items-center rounded-2xl px-4 py-2.5 text-sm font-semibold text-white"
                    style={{ background: `linear-gradient(135deg, ${course.accent}, ${course.accent}cc)` }}
                  >
                    Join now
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCatalog;
