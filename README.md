# 🖥️ Whizz Computer — Premium Frontend

> Awwwards-level redesign of built with React + Vite + GSAP + Framer Motion + Lenis + Tailwind CSS.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and configure
cp .env.example .env

# 3. Start dev server
npm run dev

# 4. Build for production
npm run build
```

---

## 🗂️ Complete Project Architecture

```
whizz/
├── index.html                  ← Entry HTML (fonts loaded here)
├── vite.config.js              ← Vite config
├── tailwind.config.js          ← Tailwind + dark mode + custom tokens
├── postcss.config.js           ← PostCSS (Tailwind + autoprefixer)
├── .env.example                ← Environment variable template
│
└── src/
    ├── main.jsx                ← ReactDOM.createRoot, BrowserRouter wraps App
    ├── App.jsx                 ← Root: router, loader, navbar, footer, cursor
    ├── index.css               ← Global CSS, Tailwind directives, custom utilities
    │
    ├── components/             ← Reusable UI components
    │   ├── Loader.jsx          ← Fullscreen GSAP preloader (words + counter)
    │   ├── CustomCursor.jsx    ← Dual-ring cursor (dot snaps, ring lags)
    │   ├── DarkModeToggle.jsx  ← Animated pill toggle (Framer Motion)
    │   ├── Navbar.jsx          ← Sticky blur nav, mobile menu, dark toggle
    │   ├── Hero.jsx            ← Split text, mouse parallax, magnetic CTA
    │   ├── Cards3D.jsx         ← 3D tilt cards with dynamic lighting
    │   ├── ParallaxSection.jsx ← Multi-layer parallax + feature cards + CTA
    │   ├── HorizontalScroll.jsx← GSAP-pinned horizontal testimonials scroll
    │   └── Footer.jsx          ← Newsletter, links, social icons
    │
    ├── pages/                  ← Route-level page components
    │   ├── Home.jsx            ← Assembles Hero → Cards3D → Parallax → Horizontal
    │   ├── About.jsx           ← Team, values, timeline, GSAP reveals
    │   ├── Contact.jsx         ← Form + contact info, API-ready submit
    │   └── Dashboard.jsx       ← Student stats + course list (useEffect + api.js)
    │
    ├── hooks/                  ← Custom React hooks
    │   ├── useDarkMode.js      ← Reads/writes localStorage, toggles .dark class
    │   └── useLenis.js         ← Lenis smooth scroll wired to GSAP ticker
    │
    ├── animations/             ← Animation configuration files
    │   ├── gsapAnimations.js   ← All GSAP helpers (loader, hero, scroll, parallax)
    │   └── motionVariants.js   ← All Framer Motion variants (page, menu, cards)
    │
    └── utils/
        └── api.js              ← Axios instance + all API endpoints + mock data
```

---

## 🧠 Architecture Explained — How Everything Connects

### 1. Entry Flow
```
index.html → src/main.jsx → App.jsx
```
- `main.jsx` creates the React root and wraps everything in `<BrowserRouter>`
- `App.jsx` is the conductor — it holds global state (dark mode, loader done) and renders the layout shell

### 2. Boot Sequence
```
App.jsx renders:
  ├── <CustomCursor />        (always visible, tracks mouse)
  ├── <Loader />              (fullscreen, fades out after ~3s)
  └── [Main site]             (opacity-0 → opacity-100 after loader)
        ├── <Navbar />
        ├── <AnimatePresence> → <Routes> (page transitions)
        └── <Footer />
```

### 3. Dark Mode Flow
```
useDarkMode hook
  ├── reads localStorage on init
  ├── sets isDark state
  ├── useEffect → adds/removes 'dark' class on <html>
  └── writes to localStorage on every toggle

Tailwind config → darkMode: 'class'
  → all dark: variants activate when html.dark exists
```

### 4. Smooth Scroll Flow
```
useLenis hook (runs once in App.jsx)
  ├── new Lenis({ duration: 1.2, easing: ... })
  ├── gsap.ticker.add(time => lenis.raf(time * 1000))
  └── lenis.on('scroll', ScrollTrigger.update)

Result: Lenis handles scroll → GSAP ticker drives it → ScrollTrigger stays in sync
```

### 5. Animation Architecture
```
GSAP (gsapAnimations.js)           Framer Motion (motionVariants.js)
──────────────────────             ──────────────────────────────────
• Loader text reveal               • Page enter/exit transitions
• Hero split text animation        • Mobile menu open/close
• Mouse parallax (hero orbs)       • Dark mode toggle thumb
• ScrollTrigger scroll reveals     • Card hover states
• Horizontal scroll pin            
• 3D card tilt + lighting          
• Counter number animations        
• Navbar entrance                  

Rule: GSAP for timeline/scroll/physics animations
      Framer Motion ONLY for route transitions + simple state-based UI
```

### 6. API / Data Flow
```
utils/api.js
  ├── axios instance (baseURL from VITE_API_URL env var)
  ├── interceptors: attach token, handle 401
  ├── named exports: getCourses(), submitContactForm(), etc.
  └── getMockCourses() / getMockStats() → for demo without backend

Dashboard.jsx
  └── useEffect → Promise.all([getMockCourses(), getMockStats()])
        ├── loading state → spinner
        ├── error state → error message
        └── data → renders StatCard + CourseCard components

Contact.jsx
  └── handleSubmit → submitContactForm(formData)
        ├── loading → button spinner
        ├── success → success screen
        └── error → error message
```

### 7. Page Transition Flow
```
App.jsx → <AnimatePresence mode="wait"> → <Routes key={location.pathname}>

On route change:
  1. AnimatePresence sees key change
  2. Old page runs exit variant (opacity 0, y -20, blur)
  3. New page runs initial → animate (opacity 1, y 0, no blur)
  4. Transition: ~0.5s total, feels instant but smooth
```

### 8. Component Communication
```
App.jsx (state owner)
  ├── isDark, toggleDark  → passed to <Navbar> as props
  ├── loadingDone         → local state, set by <Loader onComplete={}>
  └── No Redux/Zustand needed — app is small enough for prop drilling
```

---

## 🎨 Design System

### Colors (in tailwind.config.js)
| Token | Value | Usage |
|-------|-------|-------|
| `brand-500` | `#6e3bff` | Primary purple — buttons, accents |
| `accent.cyan` | `#00f5d4` | Secondary — gradients, highlights |
| `accent.rose` | `#fb7185` | Warm accent — some cards |
| `accent.amber` | `#fbbf24` | Stats, badges |

### Typography
| Role | Font | Weight |
|------|------|--------|
| Headings (h1–h5) | Syne | 700–800 |
| Body text | DM Sans | 300–500 |
| Code/mono | JetBrains Mono | 400–500 |

### Spacing System
Tailwind's default scale — consistent multiples of 4px. Key sizes:
- Section padding: `py-24 lg:py-32`
- Card padding: `p-6 md:p-8`
- Section gap: `gap-6` (cards), `gap-10` (columns)

### Glass Cards Recipe
```css
background: rgba(255,255,255,0.05);
backdrop-filter: blur(20px);
border: 1px solid rgba(255,255,255,0.10);
```

---

## 🔌 Connecting Your Backend

### Step 1 — Set your API URL
```bash
# .env
VITE_API_URL=http://localhost:8000/api
```

### Step 2 — Replace mock calls with real ones
```js
// Before (in Dashboard.jsx):
const [coursesRes, statsRes] = await Promise.all([
  getMockCourses(),  // ← mock
  getMockStats(),
]);

// After:
const [coursesRes, statsRes] = await Promise.all([
  getCourses(),           // ← real API call
  getDashboardStats(userId),
]);
```

### Step 3 — Add auth token
```js
// After login, store token:
localStorage.setItem('whizz_token', token);

// api.js interceptor automatically attaches it to every request ✓
```

---

## ⚡ Performance Tips

| Technique | Where Used |
|-----------|------------|
| `will-change: transform` | Animated orbs, parallax elements |
| `transform` not `top/left` | All GSAP animations use x/y |
| `requestAnimationFrame` | Custom cursor ring lag |
| Lenis + GSAP ticker | No scroll jank |
| `gsap.context()` | Scoped animations, auto-cleanup |
| `ScrollTrigger.revert()` | Cleanup on component unmount |

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| (default) | 0px+ | Mobile layout, stacked columns |
| `sm:` | 640px+ | 2-col grids start |
| `md:` | 768px+ | Hero right panel shows |
| `lg:` | 1024px+ | Full desktop nav, 3–4 col grids |
| `xl:` | 1280px+ | Max width containers |

---

## 🛠️ Adding New Pages

1. Create `src/pages/NewPage.jsx`
2. Wrap with `<motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">`
3. Add route in `App.jsx`: `<Route path="/new" element={<NewPage />} />`
4. Add nav link in `Navbar.jsx` NAV_LINKS array

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `gsap` | 3.12 | All scroll + timeline animations |
| `framer-motion` | 11 | Page transitions + UI state animations |
| `@studio-freight/lenis` | 1.0 | Smooth scroll engine |
| `react-router-dom` | 6 | Client-side routing |
| `axios` | 1.6 | HTTP client with interceptors |
| `tailwindcss` | 3.4 | Utility-first CSS |
