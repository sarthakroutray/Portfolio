import { motion } from 'framer-motion';

function Resume() {
  const education = [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      institution: "Manipal University Jaipur",
      duration: "2024 - 2028",
      details: "Currently pursuing B.Tech in Computer Science and Engineering with focus on software development, machine learning, and web technologies."
    }
  ];

  const experience = [
    {
      title: "AIML Intern",
      company: "TransBnk Solutions Private Limited",
      duration: "June - July 2025",
      responsibilities: [
        "Developed and implemented machine learning models to improve predictive analytics",
        "Analyzed datasets using Python to extract trends and insights",
        "Contributed to AI-driven application development for enhanced user experience"
      ]
    }
  ];

  const skills = {
    "Programming Languages": ["Python", "Java", "JavaScript"],
    "Web Development": ["HTML", "CSS", "React", "Node.js"],
    "Machine Learning & AI": ["Machine Learning", "Data Analysis", "Predictive Analytics"],
    "Tools & Technologies": ["Git", "SQL", "FastAPI", "Docker", "Pandas", "PostgreSQL"],
    "Data Processing": ["pdfplumber", "tabula-py", "thefuzz", "PyPDF2"],
    "Other Skills": ["Team Collaboration", "Problem Solving", "Project Management"]
  };

  const projects = [
    {
      title: "REDCONNECT",
      description: "A modern, full-stack Blood Donation Management System connecting donors directly to recipients via a web platform with admin controls.",
      technologies: ["React.js", "Express.js", "PostgreSQL"],
      features: ["Donor-Recipient Connection", "Admin Dashboard", "Real-time Matching", "User Management"]
    },
    {
      title: "Personal Finance ETL Pipeline",
      description: "An ETL pipeline that extracts and processes financial data from PDFs, emails, and Excel files, standardizes and categorizes it, and loads it into a PostgreSQL database.",
      technologies: ["FastAPI", "pdfplumber", "tabula-py", "PyPDF2", "Pandas", "PostgreSQL", "Docker"],
      features: ["Data Extraction", "Data Processing", "Database Integration", "Automated Pipeline"]
    }
  ];

  const certifications = [
    "Google Cybersecurity Professional Certificate V2"
  ];

  const languages = [
    "Hindi",
    "English"
  ];

  const achievements = [
    "Completed Google Cybersecurity Professional Certificate V2",
    "Developed full-stack applications with modern web technologies",
    "Successfully implemented machine learning models for predictive analytics",
    "Built automated ETL pipeline for financial data processing",
    "Strong foundation in AI/ML and data analysis",
    "Active contributor to open-source projects and tech community"
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
        <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-purple-blue leading-none mb-2" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.7))' }}>
          Sarthak Routray
        </h2>
        <p className="text-lg bg-clip-text text-transparent bg-gradient-purple-blue mb-2" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 0, 255, 0.7))' }}>
          Computer Science Engineering Student
        </p>
        <div className="text-sm text-white opacity-80 mb-6">
          <p>📧 sarthak.routray2006@gmail.com | 📱 +91 9819362168</p>
          <p>📍 Mumbai | 🌐 GitHub: github.com/sarthakroutray</p>
          <p>💼 LinkedIn: linkedin.com/in/sarthak-routray-020583323</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
        >
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-purple-blue mb-4" style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>
            Education
          </h3>
          {education.map((edu, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-purple-blue" style={{ filter: 'drop-shadow(0 0 2px rgba(255, 0, 255, 0.7))' }}>
                {edu.degree}
              </h4>
              <p className="text-sm font-medium text-white opacity-80">{edu.institution}</p>
              <p className="text-xs text-white opacity-60">{edu.duration}</p>
              <p className="text-sm bg-clip-text text-transparent bg-gradient-purple-blue mt-2" style={{ filter: 'drop-shadow(0 0 2px rgba(0, 255, 255, 0.7))' }}>
                {edu.details}
              </p>
            </div>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
        >
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-purple-blue mb-4" style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>
            Experience
          </h3>
          {experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-purple-blue" style={{ filter: 'drop-shadow(0 0 2px rgba(255, 0, 255, 0.7))' }}>
                {exp.title}
              </h4>
              <p className="text-sm font-medium text-white opacity-80">{exp.company}</p>
              <p className="text-xs text-white opacity-60 mb-3">{exp.duration}</p>
              <ul className="list-disc list-inside space-y-1">
                {exp.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex} className="text-sm bg-clip-text text-transparent bg-gradient-purple-blue" style={{ filter: 'drop-shadow(0 0 2px rgba(0, 255, 255, 0.7))' }}>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
        >
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-purple-blue mb-4" style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div key={index}>
                <h4 className="text-md font-semibold bg-clip-text text-transparent bg-gradient-purple-blue mb-2" style={{ filter: 'drop-shadow(0 0 2px rgba(255, 0, 255, 0.7))' }}>
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-white bg-opacity-20 text-white text-xs rounded-md backdrop-blur-sm"
                      style={{ filter: 'drop-shadow(0 0 2px rgba(0, 255, 255, 0.5))' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
        >
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-purple-blue mb-4" style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>
            Projects
          </h3>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-purple-blue" style={{ filter: 'drop-shadow(0 0 2px rgba(255, 0, 255, 0.7))' }}>
                  {project.title}
                </h4>
                <p className="text-sm bg-clip-text text-transparent bg-gradient-purple-blue mb-2" style={{ filter: 'drop-shadow(0 0 2px rgba(0, 255, 255, 0.7))' }}>
                  {project.description}
                </p>
                <div className="mb-2">
                  <span className="text-xs text-white opacity-60">Technologies: </span>
                  <span className="text-xs text-cyan-400">{project.technologies.join(", ")}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-2 py-1 bg-white bg-opacity-20 text-white text-xs rounded-md backdrop-blur-sm"
                      style={{ filter: 'drop-shadow(0 0 2px rgba(0, 255, 255, 0.5))' }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
        >
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-purple-blue mb-4" style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>
            Certifications
          </h3>
          <ul className="space-y-2">
            {certifications.map((cert, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">🏆</span>
                <span className="text-sm bg-clip-text text-transparent bg-gradient-purple-blue" style={{ filter: 'drop-shadow(0 0 2px rgba(0, 255, 255, 0.7))' }}>
                  {cert}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
        >
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-purple-blue mb-4" style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>
            Languages
          </h3>
          <div className="flex flex-wrap gap-3">
            {languages.map((language, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-white bg-opacity-20 text-white text-sm rounded-lg backdrop-blur-sm"
                style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.5))' }}
              >
                {language}
              </span>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
        >
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-purple-blue mb-4" style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>
            Achievements & Highlights
          </h3>
          <ul className="space-y-2">
            {achievements.map((achievement, index) => (
              <li key={index} className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-1">•</span>
                <span className="text-sm bg-clip-text text-transparent bg-gradient-purple-blue" style={{ filter: 'drop-shadow(0 0 2px rgba(255, 0, 255, 0.7))' }}>
                  {achievement}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>
    </motion.div>
  );
}

export default Resume;
