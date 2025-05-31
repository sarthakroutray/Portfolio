import { motion } from 'framer-motion';

function Skills() {
  const skills = [
    { name: 'Java', logo: '/skills/java.png' },
    { name: 'C', logo: '/skills/c.png' },
    { name: 'Python', logo: '/skills/python.png' },
    { name: 'React', logo: '/skills/react.png' },
    { name: 'HTML', logo: '/skills/html.png' },
    { name: 'CSS', logo: '/skills/css.png' },
    { name: 'Tailwind CSS', logo: '/skills/tailwindcss.png' },
    { name: 'JavaScript', logo: '/skills/javascript.png' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      {/* Skills Page Content */}
      <div className="text-lg text-white font-normal w-[80%] h-[70%] overflow-y-auto px-4" style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>
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