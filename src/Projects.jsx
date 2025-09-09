import { motion } from 'framer-motion';

function Projects() {
  const projects = [
    {
      title: "🔴 REDCONNECT",
      description: "A modern, full-stack Blood Donation Management System connecting donors directly to recipients via a web platform with admin controls.",
      technologies: ["React.js", "Express.js", "PostgreSQL", "Node.js"],
      githubLink: "https://github.com/sarthakroutray/redconnect",
      liveLink: "https://red-connect-nine.vercel.app/",
      color: "from-red-500 to-pink-500",
      status: "Completed",
      features: ["Donor-Recipient Matching", "Admin Dashboard", "Real-time Notifications", "User Management"]
    },
    {
      title: "💸 Personal Finance ETL Pipeline", 
      description: "An advanced ETL pipeline that extracts and processes financial data from multiple sources including PDFs, emails, and Excel files.",
      technologies: ["FastAPI", "pdfplumber", "tabula-py", "PyPDF2", "Pandas", "PostgreSQL", "Docker"],
      githubLink: "https://github.com/sarthakroutray/finance-etl-pipeline",
      liveLink: "#",
      color: "from-blue-500 to-cyan-500",
      status: "Completed",
      features: ["Multi-source Data Extraction", "Data Standardization", "Automated Categorization", "Docker Containerization"]
    },
    {
      title: "Portfolio Website",
      description: "A responsive and modern portfolio website built with React and advanced animations to showcase my skills, projects, and experience.",
      technologies: ["React.js", "Vite", "Tailwind CSS", "Framer Motion", "JavaScript"],
      githubLink: "https://github.com/sarthakroutray/Portfolio",
      liveLink: "https://sarthakroutray.vercel.app/",
      color: "from-purple-500 to-violet-500",
      status: "Completed",
      features: ["Responsive Design", "Smooth Animations", "Modern UI/UX", "Performance Optimized"]
    },
    {
      title: "Cybersecurity Monitoring Dashboard",
      description: "A comprehensive cybersecurity dashboard for monitoring network threats and vulnerabilities. Incorporates learnings from Google Cybersecurity Professional Certificate.",
      technologies: ["Python", "Cybersecurity Tools", "Dashboard Framework", "Network Monitoring"],
      githubLink: "#",
      liveLink: "#",
      color: "from-green-500 to-emerald-500",
      status: "In Progress",
      features: ["Threat Detection", "Vulnerability Assessment", "Real-time Monitoring", "Security Analytics"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-white"
        >
          <span className="text-purple-400">#</span>projects
        </motion.h2>
        <motion.a
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          href="/projects"
          className="text-purple-400 text-sm hover:underline"
        >
          View all ~~&gt;
        </motion.a>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg overflow-hidden hover:border-purple-500 transition-all duration-300"
          >
            {/* Project Image/Header */}
            <div className={`h-32 bg-gradient-to-br ${project.color} flex items-center justify-center relative`}>
              <div className="text-white font-bold text-xl">{project.title.replace(/[^\w\s]/g, '')}</div>
              
              {/* Status badges */}
              <div className="absolute top-2 right-2 flex flex-col space-y-1">
                {project.status && (
                  <span className="px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded">
                    {project.status}
                  </span>
                )}
                {project.cached && (
                  <span className="px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded">
                    {project.cached}
                  </span>
                )}
              </div>
            </div>

            {/* Project Info */}
            <div className="p-4">
              <h3 className="text-white font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Features */}
              {project.features && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.features.slice(0, 2).map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-2 py-1 bg-purple-500 bg-opacity-20 text-purple-300 text-xs rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex space-x-4">
                {project.githubLink && project.githubLink !== "#" && (
                  <a
                    href={project.githubLink}
                    className="text-purple-400 text-sm hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Code
                  </a>
                )}
                {project.liveLink && project.liveLink !== "#" && (
                  <a
                    href={project.liveLink}
                    className="text-purple-400 text-sm hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Projects;
