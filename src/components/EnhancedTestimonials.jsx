// src/components/EnhancedTestimonials.jsx
// Ultra-premium testimonials section with smooth animations

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Data Analyst @ TCS",
    course: "Python Programming",
    avatar: "PS",
    avatarColor: "#6e3bff",
    text: "Whizz Computer completely transformed my career. The Python course was hands-on, project-based, and I landed a job at TCS within 2 months!",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    stars: 5,
  },
  {
    id: 2,
    name: "Rahul Gupta",
    role: "Senior Designer @ Infosys",
    course: "Web Design Pro",
    avatar: "RG",
    avatarColor: "#00f5d4",
    text: "The instructors are world-class. Not just theory — real-world projects, expert feedback, and portfolio building. My portfolio got immediate offers!",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    stars: 5,
  },
  {
    id: 3,
    name: "Anjali Verma",
    role: "Lead Accountant @ Deloitte",
    course: "Tally & Accounting Pro",
    avatar: "AV",
    avatarColor: "#fb7185",
    text: "From zero to managing entire accounting systems in 6 weeks. The Tally expertise I gained opened doors I never expected!",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    stars: 5,
  },
  {
    id: 4,
    name: "Suresh Patel",
    role: "Marketing Director @ Startup",
    course: "Digital Marketing",
    avatar: "SP",
    avatarColor: "#fbbf24",
    text: "The digital marketing curriculum is incredibly current. Google Ads, Meta, SEO — all the skills I need for real campaigns. ROI was immediate!",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    stars: 5,
  },
  {
    id: 5,
    name: "Kavita Nair",
    role: "Design Lead @ Zomato",
    course: "Graphic Design Mastery",
    avatar: "KN",
    avatarColor: "#7c3aed",
    text: "From Photoshop basics to designing for major brands in just 3 months! The mentorship and community support is unmatched.",
    image:
      "https://images.unsplash.com/photo-1494888286974-455937fef111?q=80&w=400&auto=format&fit=crop",
    stars: 5,
  },
  {
    id: 6,
    name: "Amit Singh",
    role: "Operations Manager @ MNC",
    course: "MS Office Mastery",
    avatar: "AS",
    avatarColor: "#10b981",
    text: "The MS Office course boosted my productivity by 10x. Now building dashboards and automations that save my entire team hours daily!",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    stars: 5,
  },
];

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group flex-shrink-0 w-full md:w-96 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-md hover:border-white/20 transition-all"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
      }}
    >
      {/* Card header with image and user info */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-full w-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />

        {/* Avatar */}
        <div
          className="absolute bottom-4 left-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${testimonial.avatarColor}, ${testimonial.avatarColor}aa)`,
          }}
        >
          {testimonial.avatar}
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.stars)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.05 + index * 0.1 }}
              className="text-lg"
            >
              ⭐
            </motion.span>
          ))}
        </div>

        {/* Testimonial text */}
        <p className="text-sm text-slate-200 leading-relaxed mb-4 line-clamp-4">
          "{testimonial.text}"
        </p>

        {/* User info and course */}
        <div className="space-y-2 pt-4 border-t border-white/10">
          <div>
            <p className="font-bold text-white text-sm">{testimonial.name}</p>
            <p className="text-xs text-slate-400">{testimonial.role}</p>
          </div>
          <span
            className="inline-block text-xs font-semibold px-3 py-1 rounded-lg"
            style={{
              background: `${testimonial.avatarColor}20`,
              color: testimonial.avatarColor,
            }}
          >
            {testimonial.course}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const EnhancedTestimonials = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const ctx = gsap.context(() => {
      const lines = headingRef.current.querySelectorAll(".line");
      gsap.from(lines, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "expo.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #172554 50%, #0f172a 100%)",
          }}
        />

        {/* Animated orbs */}
        <div
          className="absolute right-1/4 top-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl animate-float"
          style={{
            background:
              "radial-gradient(circle, rgba(110, 59, 255, 0.6) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute left-1/4 bottom-1/3 w-72 h-72 rounded-full opacity-15 blur-3xl animate-float-slow"
          style={{
            background:
              "radial-gradient(circle, rgba(24, 182, 255, 0.5) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-6 w-fit mx-auto rounded-full border border-white/20 bg-white/5 px-4 py-2"
          >
            <span
              className="text-sm font-semibold text-transparent"
              style={{
                background: "linear-gradient(90deg, #6e3bff, #18b6ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
            >
              ✦ Success Stories
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6 text-white">
            <div className="line overflow-hidden">
              <span>What Our Students</span>
            </div>
            <div className="line overflow-hidden">
              <span
                className="text-transparent"
                style={{
                  background:
                    "linear-gradient(90deg, #6e3bff, #18b6ff, #00f5d4)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                Are Achieving
              </span>
            </div>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Join thousands of successful students who transformed their careers
            with our practical, industry-focused courses.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-300 mb-6 text-lg">
            Ready to write your own success story?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-lg font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #6e3bff 0%, #4800e0 100%)",
              }}
            >
              Start Learning Now →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-lg font-semibold text-white border-2 border-white/20 hover:border-white/40 transition-colors"
            >
              Browse All Courses
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedTestimonials;
