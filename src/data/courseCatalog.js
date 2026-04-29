export const courseCatalog = [
  {
    id: 'basic-computer',
    slug: 'basic-computer',
    title: 'Basic Computer',
    level: 'Beginner',
    category: 'Foundation',
    duration: '2 Months',
    price: 'Rs. 3,000',
    accent: '#7c5cff',
    description:
      'Computer basics, internet, files, typing, and daily productivity workflows.',
    overview:
      'This foundation track is designed for students who want to become comfortable with everyday computer work before moving into advanced office or coding courses.',
    outcomes: ['Computer fundamentals', 'Internet and email usage', 'Typing and file handling', 'Daily workflow confidence'],
  },
  {
    id: 'advanced-office',
    slug: 'advanced-computer-ms-office',
    title: 'Advanced Computer (MS Office)',
    level: 'Advanced',
    category: 'Office Productivity',
    duration: '3 Months',
    price: 'Rs. 5,000',
    accent: '#00c2ff',
    description:
      'Excel, PowerPoint, Word, reports, dashboards, formulas, and office automation.',
    overview:
      'A strong practical office track focused on advanced tools used in jobs, business reporting, and productivity-heavy roles.',
    outcomes: ['Excel formulas and dashboards', 'PowerPoint presentation design', 'Word formatting mastery', 'Office workflow automation'],
  },
  {
    id: 'tally-accounting',
    slug: 'tally-accounting',
    title: 'Tally & Accounting',
    level: 'Professional',
    category: 'Finance',
    duration: '3 Months',
    price: 'Rs. 5,000',
    accent: '#ff9d3f',
    description:
      'GST, vouchers, billing, payroll, inventory, and practical accounting operations.',
    overview:
      'Built for students and professionals who want hands-on finance software skills that are directly useful in accounting roles.',
    outcomes: ['GST workflows', 'Inventory and billing', 'Payroll processing', 'Practical accounting operations'],
  },
  {
    id: 'python-programming',
    slug: 'python-programming',
    title: 'Python Programming',
    level: 'Development',
    category: 'Coding',
    duration: '4 Months',
    price: 'Rs. 8,500',
    accent: '#12d7b8',
    description:
      'Programming logic, automation, APIs, mini apps, and portfolio-ready Python work.',
    overview:
      'This coding-first track helps students move from logic building into scripts, tools, and project work that supports internships and entry-level jobs.',
    outcomes: ['Programming logic', 'Automation scripts', 'API basics', 'Portfolio mini projects'],
  },
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Web Development',
    level: 'Development',
    category: 'Coding',
    duration: '5 Months',
    price: 'Rs. 12,000',
    accent: '#b76cff',
    description:
      'HTML, CSS, JavaScript, React basics, responsive layouts, and deploy-ready projects.',
    overview:
      'A modern coding path for learners who want to build websites, user interfaces, and complete web projects from design to deployment.',
    outcomes: ['Responsive web layouts', 'JavaScript fundamentals', 'React basics', 'Deploy-ready portfolio projects'],
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    level: 'Professional',
    category: 'Career Skills',
    duration: '3 Months',
    price: 'Rs. 6,500',
    accent: '#ff5ea8',
    description:
      'SEO, ads, content, analytics, and campaigns with practical business-focused tasks.',
    overview:
      'For learners who want business-ready growth skills across paid ads, content strategy, and analytics.',
    outcomes: ['SEO basics', 'Google and Meta ads', 'Content planning', 'Campaign reporting'],
  },
  {
    id: 'graphic-design',
    slug: 'graphic-design',
    title: 'Graphic Design',
    level: 'Professional',
    category: 'Career Skills',
    duration: '3 Months',
    price: 'Rs. 7,000',
    accent: '#3ddc97',
    description:
      'Photoshop, Illustrator, layout systems, visual branding, and practical creative workflows.',
    overview:
      'For learners who want modern visual design skills for freelance work, agencies, and creative portfolios.',
    outcomes: ['Photoshop and Illustrator', 'Branding basics', 'Poster and social creatives', 'Portfolio presentation'],
  },
];

export const getCourseBySlug = (slug) =>
  courseCatalog.find((course) => course.slug === slug);
