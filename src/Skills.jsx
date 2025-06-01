import { motion } from 'framer-motion';

function Skills() {
  const skills = [
    { name: 'Java', logo: '/logos/java.svg' },
    { name: 'C', logo: '/logos/c.svg' },
    { name: 'Python', logo: '/logos/python.svg' },
    { name: 'React', logo: '/logos/react.svg' },
    { name: 'HTML', logo: '/logos/html.svg' },
    { name: 'CSS', logo: '/logos/css.svg' },
    { name: 'Tailwind CSS', logo: '/logos/tailwindcss.svg' },
    { name: 'JavaScript', logo: '/logos/javascript.svg' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-4 md:py-8 w-full"
    >
      {/* Skills Page Content */}
      <div className="text-lg text-white font-normal w-[90%] md:w-[80%] max-w-4xl overflow-y-auto px-4" style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>
        <h2 className="text-5xl font-black text-white leading-none mb-8 text-center" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.7))' }}>My Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {skills.map((skill) => (
            <div key={skill.name} className="bg-gray-800 bg-opacity-30 p-6 rounded-lg flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105" style={{ boxShadow: '0 0 15px rgba(0, 255, 255, 0.3), 0 0 15px rgba(255, 0, 255, 0.3)' }}>
              <img src={skill.logo} alt={`${skill.name} Logo`} className="w-20 h-20 object-contain mb-2" />
              <span className="text-base font-medium text-white">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Skills; 