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
        "Developed and implemented machine learning models to improve data analysis processes.",
        "Collaborated with cross-functional teams to gather requirements and deliver AI solutions.",
        "Conducted research on the latest AI technologies and trends to enhance project outcomes.",
        "Assisted in the deployment and monitoring of AI models in production environments.",
      ],
    },
    {
      title: "Web Development Team Head",
      company_name: "ACM Student Chapter MUJ",
      icon: web,
      iconBg: "#E6DEDD",
      date: "June 2025 - Present",
      points: [
        "Developing and maintaining web applications using React.js and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews and providing constructive feedback to other developers.",
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
        "Web-based platform that allows users to search, book, and manage blood donations from various providers, providing a convenient and efficient solution for healthcare needs.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "PostgreSQL",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: "/Redconnect.png",
      source_code_link: "https://github.com/sarthakroutray/RedConnect.git",
    },
    {
      name: "GeoVerse",
      description:
        "An advanced AI-powered question-answering system for geospatial and earth observation data, specifically designed to interact with the MOSDAC (Meteorological & Oceanographic Satellite Data Archival Centre) portal.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
        {
          name: "scss",
          color: "pink-text-gradient",
        },
        {
          name: "python",
          color: "yellow-text-gradient",
        },
        {
          name: "LLMs",
          color: "purple-text-gradient",
        },
      ],
      image: "/Geoverse.png",
      source_code_link: "https://github.com/sarthakroutray/GeoVerse.git",
    },
    {
      name: "RL",
      description:
        "This repository implements a reinforcement-learning solution for fund investment management using the Soft Actor-Critic algorithm. The primary artifact is `Main_RL.ipynb` which defines a custom Gymnasium environment, training and evaluation routines, and a runnable pipeline..",
      tags: [
        {
          name: "Python",
          color: "blue-text-gradient",
        },
        {
          name: "MachineLearning",
          color: "green-text-gradient",
        },
      ],
      image: "/RL..png",
      source_code_link: "https://github.com/sarthakroutray/RL.git",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };