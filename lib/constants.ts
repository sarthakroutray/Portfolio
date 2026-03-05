/* ===== Tech icons (kept as public images) ===== */
export const technologies = [
  { name: "HTML 5", icon: "/images/html.png" },
  { name: "CSS 3", icon: "/images/css.png" },
  { name: "JavaScript", icon: "/images/javascript.png" },
  { name: "TypeScript", icon: "/images/typescript.png" },
  { name: "React JS", icon: "/images/reactjs.png" },
  { name: "Tailwind CSS", icon: "/images/tailwind.png" },
  { name: "Node JS", icon: "/images/nodejs.png" },
  { name: "MongoDB", icon: "/images/mongodb.png" },
  { name: "Three JS", icon: "/images/threejs.svg" },
  { name: "git", icon: "/images/git.png" },
];

export interface ExperienceItem {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
}

export const experiences: ExperienceItem[] = [
  {
    title: "AI ML Intern",
    company_name: "Transbnk Solutions Pvt Ltd",
    icon: "/images/web.png",
    iconBg: "#383E56",
    date: "June 2025 - July 2025",
    points: [
      "Built and evaluated machine learning models in Python for internal classification and forecasting use cases using scikit-learn pipelines.",
      "Designed reusable preprocessing workflows that reduced manual data-cleaning effort and improved experimentation turnaround by roughly 15%.",
      "Exposed model inference through REST endpoints and integrated them into application workflows for faster stakeholder validation.",
      "Set up model monitoring checks for drift and prediction consistency so production outputs stayed stable over time.",
    ],
  },
  {
    title: "Web Development Team Head",
    company_name: "ACM Student Chapter MUJ",
    icon: "/images/web.png",
    iconBg: "#E6DEDD",
    date: "June 2025 - Present",
    points: [
      "Led architecture and delivery of chapter web platforms using React and TypeScript with focus on maintainability and release speed.",
      "Standardized component and API integration patterns that reduced repeated implementation effort across event pages and modules.",
      "Reduced page lag on mobile by simplifying heavy UI paths and tightening render behavior on key event pages.",
      "Introduced PR review checklists and shared coding patterns so contributors shipped more consistent React and TypeScript code.",
    ],
  },
];

export interface ProjectTag {
  name: string;
  color: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  techHighlights: string;
  ctaLabel: string;
  tags: ProjectTag[];
  source_code_link: string;
}

export const projects: ProjectItem[] = [
  {
    name: "Redconnect",
    description:
      "Built a blood-donation coordination platform to reduce friction between donors, patients, and organizers through streamlined search, booking, and request management flows.",
    techHighlights: "Tech: React, Node.js, PostgreSQL, Tailwind, REST APIs",
    ctaLabel: "Inspect System",
    tags: [
      { name: "frontend", color: "blue-text-gradient" },
      { name: "backend", color: "green-text-gradient" },
      { name: "database", color: "pink-text-gradient" },
    ],
    source_code_link: "https://github.com/sarthakroutray/RedConnect.git",
  },
  {
    name: "GeoVerse",
    description:
      "Engineered an AI-assisted geospatial Q&A system for MOSDAC data that converts complex earth-observation queries into actionable responses for faster research workflows.",
    techHighlights: "Tech: React, Python, LLM workflows, APIs, Geospatial data",
    ctaLabel: "Explore Case Study",
    tags: [
      { name: "ai", color: "blue-text-gradient" },
      { name: "llm", color: "green-text-gradient" },
      { name: "frontend", color: "pink-text-gradient" },
      { name: "backend", color: "yellow-text-gradient" },
    ],
    source_code_link: "https://github.com/sarthakroutray/GeoVerse.git",
  },
  {
    name: "RL",
    description:
      "Developed a reinforcement-learning investment environment using Soft Actor-Critic to evaluate policy-based allocation strategies under changing market conditions.",
    techHighlights: "Tech: Python, Gymnasium, PyTorch, Reinforcement Learning",
    ctaLabel: "View Architecture",
    tags: [
      { name: "ai", color: "blue-text-gradient" },
      { name: "ml", color: "green-text-gradient" },
      { name: "research", color: "green-text-gradient" },
    ],
    source_code_link: "https://github.com/sarthakroutray/RL.git",
  },
  {
    name: "IntelliMed AI",
    description:
      "Implemented an AI-driven medical support platform that structures symptom and context inputs into repeatable assistant flows so outputs stay consistent across similar queries.",
    techHighlights:
      "Tech: JavaScript, AI workflows, Node.js, Prompt orchestration",
    ctaLabel: "Inspect System",
    tags: [
      { name: "ai", color: "blue-text-gradient" },
      { name: "backend", color: "green-text-gradient" },
      { name: "healthtech", color: "pink-text-gradient" },
    ],
    source_code_link: "https://github.com/sarthakroutray/IntelliMed-AI",
  },
  {
    name: "ELICIT-25",
    description:
      "Contributed to ELICIT-25 by stabilizing frontend modules before event releases and helping deploy updates with low downtime risk during active campaign windows.",
    techHighlights:
      "Tech: TypeScript, React, Tailwind, Vercel, Component architecture",
    ctaLabel: "Inspect System",
    tags: [
      { name: "frontend", color: "blue-text-gradient" },
      { name: "production", color: "green-text-gradient" },
      { name: "event-platform", color: "pink-text-gradient" },
    ],
    source_code_link: "https://github.com/sarthakroutray/ELICIT-25",
  },
  {
    name: "Final Destination Treasure Hunt",
    description:
      "Built core clue progression logic and event-state checks so treasure-hunt rounds ran smoothly during live, time-bound participation.",
    techHighlights: "Tech: JavaScript, React, State logic, Event flow design",
    ctaLabel: "Inspect System",
    tags: [
      { name: "frontend", color: "blue-text-gradient" },
      { name: "logic-design", color: "green-text-gradient" },
      { name: "event-tech", color: "pink-text-gradient" },
    ],
    source_code_link: "https://github.com/sarthakroutray/Treasure-Hunt",
  },
];

export const heroToolkit = [
  "Python",
  "Machine Learning",
  "LLM Systems",
  "RAG Pipelines",
  "Node.js",
  "React",
];

export const skillGroups = [
  {
    title: "Frontend",
    items: ["React", "Tailwind", "TypeScript", "Three.js"],
  },
  {
    title: "Backend",
    items: ["Node.js", "REST APIs", "PostgreSQL", "MongoDB"],
  },
  {
    title: "AI / ML",
    items: ["Python", "Machine Learning", "LLMs", "NLP", "RAG systems"],
  },
  {
    title: "Tools",
    items: ["Git", "Docker"],
  },
];

export const stickyNotes = [
  { text: "Ask me about AI + full-stack collabs.", footer: "build > hype" },
  {
    text: "Try clicking skills to filter my work.",
    footer: "interaction enabled",
  },
  {
    text: "Open for internships & dev roles.",
    footer: "status: available",
  },
];

export const engineeringFocuses = [
  "Scalable backend architecture",
  "AI model deployment and inference pipelines",
  "Automation-driven workflows",
  "API design and deployment for real product use",
];
