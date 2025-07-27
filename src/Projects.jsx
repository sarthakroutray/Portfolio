import { motion } from 'framer-motion';

function Projects() {
  const projects = [
    {
      title: "🔴 REDCONNECT",
      description: "A modern, full-stack Blood Donation Management System connecting donors directly to recipients via a web platform with admin controls. This platform facilitates real-time matching between blood donors and recipients, ensuring efficient and life-saving connections.",
      technologies: ["React.js", "Express.js", "PostgreSQL", "Node.js"],
      githubLink: "https://github.com/sarthakroutray/redconnect",
      liveLink: "https://red-connect-nine.vercel.app/",
      status: "Completed",
      features: ["Donor-Recipient Matching", "Admin Dashboard", "Real-time Notifications", "User Management", "Blood Type Compatibility"]
    },
    {
      title: "💸 Personal Finance ETL Pipeline",
      description: "An advanced ETL pipeline that extracts and processes financial data from multiple sources including PDFs, emails, and Excel files. The system standardizes and categorizes financial data before loading it into a PostgreSQL database for analytics.",
      technologies: ["FastAPI", "pdfplumber", "tabula-py", "PyPDF2", "Pandas", "PostgreSQL", "Docker"],
      githubLink: "https://github.com/sarthakroutray/finance-etl-pipeline",
      liveLink: "#",
      status: "Completed",
      features: ["Multi-source Data Extraction", "Data Standardization", "Automated Categorization", "Docker Containerization", "RESTful API"]
    },
    {
      title: "Portfolio Website",
      description: "A responsive and modern portfolio website built with React and advanced animations to showcase my skills, projects, and experience. Features glassmorphism design and smooth transitions.",
      technologies: ["React.js", "Vite", "Tailwind CSS", "Framer Motion", "JavaScript"],
      githubLink: "https://github.com/sarthakroutray/Portfolio",
      liveLink: "https://portfolio-nine-azure-86.vercel.app/",
      status: "Completed",
      features: ["Responsive Design", "Smooth Animations", "Modern UI/UX", "Performance Optimized"]
    },
    {
      title: "Cybersecurity Monitoring Dashboard",
      description: "A comprehensive cybersecurity dashboard for monitoring network threats and vulnerabilities. Incorporates learnings from Google Cybersecurity Professional Certificate.",
      technologies: ["Python", "Cybersecurity Tools", "Dashboard Framework", "Network Monitoring"],
      githubLink: "#",
      liveLink: "#",
      status: "In Progress",
      features: ["Threat Detection", "Vulnerability Assessment", "Real-time Monitoring", "Security Analytics"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="py-4 md:py-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-purple-blue leading-none mb-4" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.7))' }}>
          My Projects
        </h2>
        <p className="text-lg font-normal bg-clip-text text-transparent bg-gradient-purple-blue max-w-2xl mx-auto" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 0, 255, 0.7))' }}>
          A showcase of my work in web development, AI/ML, and software engineering
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20"
            style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                project.status === 'Completed' 
                  ? 'bg-green-500 bg-opacity-20 text-green-300' 
                  : project.status === 'In Progress'
                  ? 'bg-blue-500 bg-opacity-20 text-blue-300'
                  : 'bg-yellow-500 bg-opacity-20 text-yellow-300'
              }`}>
                {project.status}
              </span>
            </div>

            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-purple-blue mb-3" style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>
              {project.title}
            </h3>

            <p className="text-sm font-normal bg-clip-text text-transparent bg-gradient-purple-blue mb-4" style={{ filter: 'drop-shadow(0 0 2px rgba(255, 0, 255, 0.7))' }}>
              {project.description}
            </p>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-white bg-opacity-20 text-white text-xs rounded-md backdrop-blur-sm"
                    style={{ filter: 'drop-shadow(0 0 2px rgba(0, 255, 255, 0.5))' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.features && (
              <div className="mb-4">
                <h5 className="text-xs font-semibold text-cyan-400 mb-2">Key Features:</h5>
                <div className="flex flex-wrap gap-2">
                  {project.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-2 py-1 bg-cyan-500 bg-opacity-20 text-cyan-300 text-xs rounded-md backdrop-blur-sm"
                      style={{ filter: 'drop-shadow(0 0 2px rgba(0, 255, 255, 0.3))' }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <a
                href={project.githubLink}
                className="text-xs bg-clip-text text-transparent bg-gradient-purple-blue hover:underline"
                style={{ filter: 'drop-shadow(0 0 2px rgba(0, 255, 255, 0.7))' }}
              >
                View Code
              </a>
              <a
                href={project.liveLink}
                className="text-xs bg-clip-text text-transparent bg-gradient-purple-blue hover:underline"
                style={{ filter: 'drop-shadow(0 0 2px rgba(255, 0, 255, 0.7))' }}
              >
                Live Demo
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Projects;
