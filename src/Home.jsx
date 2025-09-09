import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-full flex flex-col relative"
    >
      <div className="flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-8">
          {/* Left Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-purple-400 text-sm mb-2">Hello, I'm</div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
                Sarthak Routray
              </h1>
              <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-purple-400 mb-6">
                Computer Science Engineering Student
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-400 text-base lg:text-lg max-w-md"
            >
              AI/ML Enthusiast | Full-Stack Developer | Passionate about building innovative tech solutions
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                to="/contact"
                className="inline-block px-6 py-3 border border-purple-400 text-purple-400 rounded-lg hover:bg-purple-400 hover:text-white transition-all duration-300"
              >
                Contact me!!
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Character Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center items-center order-1 lg:order-2"
          >
            {/* Geometric Background Elements */}
            <div className="absolute inset-0">
              {/* Dotted Pattern */}
              <div className="absolute top-0 right-0 w-16 h-16 lg:w-20 lg:h-20 opacity-30">
                <div className="grid grid-cols-4 lg:grid-cols-5 gap-1 h-full">
                  {[...Array(25)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-purple-400 rounded-full"></div>
                  ))}
                </div>
              </div>
              
              {/* Rectangle Frames */}
              <div className="absolute top-8 right-12 lg:top-12 lg:right-20 w-12 h-12 lg:w-16 lg:h-16 border-2 border-purple-400 opacity-50"></div>
              <div className="absolute bottom-12 left-6 lg:bottom-20 lg:left-10 w-8 h-8 lg:w-12 lg:h-12 border-2 border-blue-400 opacity-50"></div>
            </div>

            {/* Character Image */}
            <div className="relative z-10 w-64 h-64 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px] flex items-center justify-center">
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
              <div className="w-full h-full flex items-center justify-center text-4xl lg:text-6xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl" style={{ display: 'none' }}>
                👤
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quote Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="pb-4 px-8"
      >
        <div className="border border-gray-600 rounded-lg p-4 max-w-xl mx-auto" style={{ backgroundColor: '#282c33' }}>
          <div className="text-gray-300 text-base font-mono -mb-2">
            "You either die a hero, or you live long enough to see yourself become the villain."
          </div>
          <div className="text-gray-500 text-sm text-right">
            - The Dark Knight
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Home; 