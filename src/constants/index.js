import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    starbucks,
    tesla,
    shopify,
    carrent,
    jobit,
    tripguide,
    threejs,
  } from "../assets";
  
export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "about",
    title: "About",
  },
  {
    id: "resume",
    title: "Experience",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "React Native Developer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "Content Creator",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    ];
  
  const experiences = [
    {
      title: "AI ML Intern",
      company_name: "Transbnk Solutions Pvt Ltd",
      icon: web,
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
      icon: web,
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
  
  const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
      name: "Sara Lee",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Rick does.",
      name: "Chris Brown",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  const projects = [
    {
      name: "Redconnect",
      description:
        "Built a blood-donation coordination platform to reduce friction between donors, patients, and organizers through streamlined search, booking, and request management flows.",
      techHighlights: "Tech: React, Node.js, PostgreSQL, Tailwind, REST APIs",
      ctaLabel: "Inspect System",
      tags: [
        {
          name: "frontend",
          color: "blue-text-gradient",
        },
        {
          name: "backend",
          color: "green-text-gradient",
        },
        {
          name: "database",
          color: "pink-text-gradient",
        },
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
        {
          name: "ai",
          color: "blue-text-gradient",
        },
        {
          name: "llm",
          color: "green-text-gradient",
        },
        {
          name: "frontend",
          color: "pink-text-gradient",
        },
        {
          name: "backend",
          color: "yellow-text-gradient",
        },
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
        {
          name: "ai",
          color: "blue-text-gradient",
        },
        {
          name: "ml",
          color: "green-text-gradient",
        },
        {
          name: "research",
          color: "green-text-gradient",
        },
      ],
      source_code_link: "https://github.com/sarthakroutray/RL.git",
    },
    {
      name: "IntelliMed AI",
      description:
        "Implemented an AI-driven medical support platform that structures symptom and context inputs into repeatable assistant flows so outputs stay consistent across similar queries.",
      techHighlights: "Tech: JavaScript, AI workflows, Node.js, Prompt orchestration",
      ctaLabel: "Inspect System",
      tags: [
        {
          name: "ai",
          color: "blue-text-gradient",
        },
        {
          name: "backend",
          color: "green-text-gradient",
        },
        {
          name: "healthtech",
          color: "pink-text-gradient",
        },
      ],
      source_code_link: "https://github.com/sarthakroutray/IntelliMed-AI",
    },
    {
      name: "ELICIT-25",
      description:
        "Contributed to ELICIT-25 by stabilizing frontend modules before event releases and helping deploy updates with low downtime risk during active campaign windows.",
      techHighlights: "Tech: TypeScript, React, Tailwind, Vercel, Component architecture",
      ctaLabel: "Inspect System",
      tags: [
        {
          name: "frontend",
          color: "blue-text-gradient",
        },
        {
          name: "production",
          color: "green-text-gradient",
        },
        {
          name: "event-platform",
          color: "pink-text-gradient",
        },
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
        {
          name: "frontend",
          color: "blue-text-gradient",
        },
        {
          name: "logic-design",
          color: "green-text-gradient",
        },
        {
          name: "event-tech",
          color: "pink-text-gradient",
        },
      ],
      source_code_link: "https://github.com/sarthakroutray/Treasure-Hunt",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };