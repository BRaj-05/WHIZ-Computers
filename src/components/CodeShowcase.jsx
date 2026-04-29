// src/components/CodeShowcase.jsx
// Interactive code snippet showcase with syntax highlighting

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CODE_EXAMPLES = [
  {
    id: 1,
    title: "React Hooks",
    language: "jsx",
    code: `const [count, setCount] = useState(0);\n\nreturn (\n  <button onClick={() => setCount(c => c + 1)}>\n    Count: {count}\n  </button>\n);`,
    color: "#61dafb",
  },
  {
    id: 2,
    title: "Python Basics",
    language: "python",
    code: `def greet(name):\n  return f"Hello, {name}!"\n\nprint(greet("Whizz"))\n# Output: Hello, Whizz!`,
    color: "#3776ab",
  },
  {
    id: 3,
    title: "API Call",
    language: "javascript",
    code: `fetch('/api/courses')\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));`,
    color: "#f7df1e",
  },
  {
    id: 4,
    title: "CSS Grid",
    language: "css",
    code: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n  padding: 2rem;\n}`,
    color: "#1572b6",
  },
];

const CodeShowcase = () => {
  const containerRef = useRef(null);
  const [activeCode, setActiveCode] = useState(0);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.from(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
    });

    // Stagger card entrances
    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.from(card, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
          x: -40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "expo.out",
        });
      }
    });
  }, []);

  const handleCodeClick = (index) => {
    setActiveCode(index);
    gsap.to(cardsRef.current[index], {
      scale: 1.05,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(110,59,255,0.05) 0%, rgba(0,245,212,0.05) 100%)",
      }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #6e3bff, transparent)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Code in Action
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real-world coding examples from our courses. Learn what you'll
            master.
          </p>
        </div>

        {/* Code cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {CODE_EXAMPLES.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              onClick={() => handleCodeClick(idx)}
              className="group cursor-pointer relative p-6 rounded-2xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
              style={{
                background:
                  activeCode === idx
                    ? "rgba(110,59,255,0.15)"
                    : "rgba(255,255,255,0.03)",
                borderColor:
                  activeCode === idx
                    ? item.color + "33"
                    : "rgba(255,255,255,0.1)",
                boxShadow:
                  activeCode === idx ? `0 0 30px ${item.color}33` : "none",
              }}
            >
              {/* Language badge */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold text-white uppercase tracking-wider"
                  style={{ background: item.color + "33", color: item.color }}
                >
                  {item.language}
                </span>
              </div>

              {/* Code block */}
              <pre
                className="p-4 rounded-xl bg-gray-900/50 dark:bg-black/50 text-sm overflow-x-auto font-mono transition-all duration-300"
                style={{
                  borderLeft: `3px solid ${item.color}`,
                  color: activeCode === idx ? item.color : "#888",
                }}
              >
                <code>{item.code}</code>
              </pre>

              {/* Active indicator */}
              {activeCode === idx && (
                <div
                  className="absolute top-2 right-2 w-3 h-3 rounded-full animate-pulse"
                  style={{ background: item.color }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Active code display */}
        <div
          className="relative p-8 rounded-2xl border transition-all duration-500"
          style={{
            background: "rgba(20,20,35,0.8)",
            borderColor: CODE_EXAMPLES[activeCode].color + "66",
            boxShadow: `0 0 40px ${CODE_EXAMPLES[activeCode].color}33`,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: CODE_EXAMPLES[activeCode].color }}
            />
            <span className="text-sm font-semibold text-white/60">
              {CODE_EXAMPLES[activeCode].title}
            </span>
          </div>
          <pre className="p-6 rounded-lg bg-gray-900/80 text-sm overflow-x-auto font-mono">
            <code style={{ color: CODE_EXAMPLES[activeCode].color }}>
              {CODE_EXAMPLES[activeCode].code}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default CodeShowcase;
