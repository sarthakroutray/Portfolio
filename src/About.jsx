import { motion } from 'framer-motion';

function About() {
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
        <span className="text-purple-400">#</span>about-me
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Content */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-400 text-lg mb-4">Hello, I'm Sarthak!</p>
            
            <p className="text-gray-300 mb-6">
              I am Sarthak Routray, a passionate Computer Science undergraduate at Manipal University Jaipur. With a strong enthusiasm for technology and coding, I continuously seek opportunities to expand my skills and apply them to real-world projects.
            </p>
            
            <p className="text-gray-300 mb-6">
              I enjoy building creative and efficient software solutions, and I'm driven by a curiosity to learn new technologies and contribute meaningfully to the tech community. Currently exploring AI/ML and full-stack development.
            </p>
          </motion.div>
        </div>

        {/* Right Content - Character Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative flex justify-center items-center"
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0">
            {/* Dotted Pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
              <div className="grid grid-cols-5 gap-1 h-full">
                {[...Array(25)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-purple-400 rounded-full"></div>
                ))}
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-16 h-16 opacity-30">
              <div className="grid grid-cols-4 gap-1 h-full">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-blue-400 rounded-full"></div>
                ))}
              </div>
            </div>
            
            {/* Rectangle Frames */}
            <div className="absolute top-20 right-10 w-16 h-12 border-2 border-purple-400 opacity-50"></div>
            <div className="absolute bottom-20 left-20 w-12 h-16 border-2 border-blue-400 opacity-50"></div>
          </div>

          {/* Character Image */}
          <div className="relative z-10 w-96 h-96 lg:w-[500px] lg:h-[500px] flex items-center justify-center">
            <img 
              src="/character.png" 
              alt="Sarthak Routray Character" 
              className="w-full h-full object-contain filter drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 20px rgba(139, 92, 246, 0.2))'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl" style={{ display: 'none' }}>
              🧑‍💻
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default About; 