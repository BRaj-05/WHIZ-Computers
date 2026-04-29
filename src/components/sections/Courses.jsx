import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import CourseCard from './CourseCard';
import { courseCatalog } from '../../data/courseCatalog';

const FILTERS = ['All', 'Foundation', 'Coding', 'Professional', 'Career Skills'];

const matchByFilter = (course, filter) => {
  if (filter === 'All') return true;
  if (filter === 'Professional') return course.level === 'Professional';
  return course.category === filter;
};

const Courses = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const visibleCourses = useMemo(
    () => courseCatalog.filter((course) => matchByFilter(course, activeFilter)),
    [activeFilter]
  );

  return (
    <section id="courses" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <Badge>Programs</Badge>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Job-ready tracks with
              <span className="text-gradient"> practical outcomes</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Cleanly merged course discovery with reusable cards, stronger visual hierarchy, and a modern product-like browsing flow.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-[linear-gradient(135deg,#6e3bff_0%,#00aef3_100%)] text-white shadow-[0_14px_28px_rgba(110,59,255,0.28)]'
                    : 'border border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
