import { motion } from 'framer-motion';

function Skills() {
  const skillCategories = {
    "Programming Languages": [
      { name: "Python", icon: "�" },
      { name: "Java", icon: "☕" },
      { name: "JavaScript", icon: "�" },
      { name: "C", icon: "⚡" }
    ],
    "Web Development": [
      { name: "HTML", icon: "🌐" },
      { name: "CSS", icon: "🎨" },
      { name: "React", icon: "⚛️" },
      { name: "Node.js", icon: "�" },
      { name: "Tailwind CSS", icon: "�" }
    ],
    "Machine Learning & AI": [
      { name: "Machine Learning", icon: "🤖" },
      { name: "Data Analysis", icon: "�" },
      { name: "Predictive Analytics", icon: "�" }
    ],
    "Tools & Technologies": [
      { name: "Git", icon: "�" },
      { name: "SQL", icon: "🗄️" },
      { name: "FastAPI", icon: "🚀" },
      { name: "Docker", icon: "�" },
      { name: "PostgreSQL", icon: "�" },
      { name: "Pandas", icon: "�" }
    ],
    "Data Processing": [
      { name: "pdfplumber", icon: "📄" },
      { name: "tabula-py", icon: "�" },
      { name: "thefuzz", icon: "🔍" },
      { name: "PyPDF2", icon: "📖" }
    ],
    "Other Skills": [
      { name: "Team Collaboration", icon: "�" },
      { name: "Problem Solving", icon: "🧩" },
      { name: "Project Management", icon: "�" }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      {/* Section Header */}
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-white mb-8"
      >
        <span className="text-purple-400">#</span>skills
      </motion.h2>

      {/* Decorative Elements */}
      <div className="relative">
        {/* Dotted patterns */}
        <div className="absolute top-0 left-0 w-16 h-16 opacity-30">
          <div className="grid grid-cols-4 gap-1 h-full">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-purple-400 rounded-full"></div>
            ))}
          </div>
        </div>

        <div className="absolute top-20 right-20 w-20 h-20 opacity-30">
          <div className="grid grid-cols-5 gap-1 h-full">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-blue-400 rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Geometric shapes */}
        <div className="absolute top-32 left-32 w-12 h-12 border-2 border-purple-400 opacity-40"></div>
        <div className="absolute bottom-20 right-40 w-16 h-8 border-2 border-blue-400 opacity-40"></div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg p-6"
            >
              <h3 className="text-purple-400 font-semibold mb-4 text-lg">{category}</h3>
              <div className="space-y-3">
                {skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <span className="text-lg">{skill.icon}</span>
                    <span className="text-sm">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Skills; 