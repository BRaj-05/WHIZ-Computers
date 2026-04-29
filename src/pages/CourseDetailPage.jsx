import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { courseCatalog, getCourseBySlug } from '../data/courseCatalog';
import { pageVariants } from '../animations/motionVariants';

const CourseDetailPage = () => {
  const { slug } = useParams();
  const course = getCourseBySlug(slug);

  if (!course) {
    return (
      <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen bg-[#0b0a18]">
        <div className="mx-auto max-w-4xl px-4 text-center text-white">
          <h1 className="text-5xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Course not found</h1>
          <Link to="/#courses" className="mt-8 inline-flex rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white">Back to courses</Link>
        </div>
      </motion.main>
    );
  }

  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen bg-[#0b0a18]">
      <div className="relative overflow-hidden pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(110,59,255,0.2),transparent_24%),linear-gradient(180deg,#0b0a18_0%,#111327_100%)]" />
        <div className="absolute inset-0 -z-10 grid-pattern opacity-35" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex rounded-full px-4 py-2 text-sm font-medium" style={{ background: `${course.accent}18`, color: course.accent }}>
                {course.level} · {course.category}
              </span>
              <h1 className="mt-7 text-5xl font-bold text-white sm:text-6xl" style={{ fontFamily: 'Syne, sans-serif' }}>
                {course.title}
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-300">{course.overview}</p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  ['Duration', course.duration],
                  ['Fees', course.price],
                  ['Track', course.category],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5 text-white">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</div>
                    <div className="mt-2 text-xl font-semibold">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>What you will learn</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {course.outcomes.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-slate-200">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,14,32,0.96),rgba(9,26,39,0.88))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
              <div className="text-sm uppercase tracking-[0.22em]" style={{ color: course.accent }}>Enroll now</div>
              <div className="mt-3 text-4xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{course.price}</div>
              <p className="mt-4 text-lg leading-8 text-slate-300">{course.description}</p>

              <div className="mt-8 space-y-4">
                <Link to="/register" className="block rounded-2xl px-6 py-4 text-center text-base font-semibold text-white" style={{ background: `linear-gradient(135deg, ${course.accent}, #6e3bff)` }}>
                  Register for this course
                </Link>
                <Link to="/contact" className="block rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center text-base font-semibold text-white">
                  Talk to admissions
                </Link>
              </div>

              <div className="mt-10 border-t border-white/10 pt-8">
                <div className="text-sm uppercase tracking-[0.2em] text-slate-400">More tracks</div>
                <div className="mt-5 space-y-3">
                  {courseCatalog.filter((item) => item.slug !== course.slug).slice(0, 3).map((item) => (
                    <Link key={item.slug} to={`/courses/${item.slug}`} className="block rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-slate-200 hover:bg-white/5">
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default CourseDetailPage;

