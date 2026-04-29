// src/components/TechStackShowcase.jsx
// Animated tech stack and skills display with terminal-style animations

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TECH_STACKS = [
  {
    category: "Frontend",
    icon: "⚛️",
    skills: ["React", "Vue", "HTML/CSS", "Tailwind", "JavaScript"],
    color: "#61dafb",
  },
  {
    category: "Backend",
    icon: "🔧",
    skills: ["Python", "Node.js", "Django", "Express", "FastAPI"],
    color: "#3776ab",
  },
  {
    category: "Databases",
    icon: "🗄️",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis"],
    color: "#336791",
  },
  {
    category: "Design",
    icon: "🎨",
    skills: ["Figma", "Adobe XD", "UI/UX", "Prototyping", "Animation"],
    color: "#ff6b9d",
  },
  {
    category: "DevOps",
    icon: "🚀",
    skills: ["Docker", "AWS", "GitHub", "CI/CD", "Linux"],
    color: "#ff9900",
  },
  {
    category: "Mobile",
    icon: "📱",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "PWA"],
    color: "#34c759",
  },
];

const TechStackShowcase = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Main container fade in
    gsap.from(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
    });

    // Stagger card animations
    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.from(card, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          rotationY: -20,
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.12,
          ease: "back.out",
        });

        // Hover animation setup
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            boxShadow: `0 20px 40px ${TECH_STACKS[i].color}40`,
            duration: 0.3,
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "none",
            duration: 0.3,
          });
        });
      }
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(110,59,255,0.03) 0%, rgba(0,245,212,0.03) 100%)",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-20"
          style={{
            background: "radial-gradient(circle, #6e3bff 0%, #00f5d4 100%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block mb-4 px-4 py-2 rounded-full"
            style={{
              background: "rgba(110,59,255,0.1)",
              border: "1px solid rgba(110,59,255,0.3)",
            }}
          >
            <span className="text-sm font-semibold text-purple-600 dark:text-cyan-400">
              💻 Tech Stack
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Master Industry Standards
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Learn the tools and technologies that top companies use. From
            frontend to backend, we cover the complete stack.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {TECH_STACKS.map((stack, idx) => (
            <div
              key={stack.category}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group relative p-8 rounded-2xl border backdrop-blur-sm cursor-pointer transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              {/* Gradient border on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${stack.color}33, transparent)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Header with icon and title */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `${stack.color}15`,
                      border: `2px solid ${stack.color}40`,
                    }}
                  >
                    {stack.icon}
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold text-gray-900 dark:text-white"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {stack.category}
                    </h3>
                    <div
                      className="w-6 h-0.5 rounded-full mt-1 group-hover:w-12 transition-all duration-500"
                      style={{ background: stack.color }}
                    />
                  </div>
                </div>

                {/* Skills list */}
                <div className="space-y-3">
                  {stack.skills.map((skill, i) => (
                    <div
                      key={skill}
                      className="flex items-center gap-3 transition-all duration-300"
                      style={{
                        opacity: 0.7,
                        animation: `slideIn 0.5s ease-out ${i * 0.1}s both`,
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: stack.color }}
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div
                  className="mt-6 w-full h-1 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500 group-hover:w-full origin-left"
                    style={{
                      width: "70%",
                      background: `linear-gradient(90deg, ${stack.color}, transparent)`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center p-8 rounded-2xl border"
          style={{
            background:
              "linear-gradient(135deg, rgba(110,59,255,0.1), rgba(0,245,212,0.1))",
            borderColor: "rgba(110,59,255,0.3)",
          }}
        >
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Ready to master these technologies?
          </p>
          <button
            className="px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #6e3bff, #00f5d4)",
              boxShadow: "0 8px 30px rgba(110,59,255,0.35)",
            }}
          >
            Explore Courses
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 0.7;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default TechStackShowcase;
