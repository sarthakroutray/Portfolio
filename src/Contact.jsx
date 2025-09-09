import { motion } from 'framer-motion';

function Contact() {
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
        className="text-2xl font-bold text-white mb-2"
      >
        <span className="text-purple-400">#</span>contacts
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-gray-400 text-sm mb-8"
      >
        Who am I?
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <p className="text-gray-300 text-lg">
            I'm interested in internship and freelance opportunities in software development, AI/ML, and web development. However, if you have other requests or questions, don't hesitate to contact me.
          </p>
        </motion.div>

        {/* Right Content - Contact Cards */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4"
        >

          {/* Message Card */}
          <div className="border border-gray-600 rounded-lg p-4" style={{ backgroundColor: '#282c33' }}>
            <h3 className="text-white font-semibold mb-3">Message me here</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors duration-200">
                <span className="text-sm">Discord:</span>
                <span className="text-sm">saberathena.</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors duration-200">
                <span className="text-lg">📧</span>
                <a href="mailto:sarthak.routray2006@gmail.com" className="text-sm">
                  sarthak.routray2006@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* All Media Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12"
      >
        {/* Decorative dots */}
        <div className="flex items-center space-x-1 mb-6">
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-purple-400 rounded-full opacity-30"></div>
            ))}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4">
          <span className="text-purple-400">#</span>all-media
        </h3>
        
        <div className="flex space-x-6">
          <a href="https://github.com/sarthakroutray" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center space-x-2">
            <span className="text-lg">�</span>
            <span className="text-sm">@sarthakroutray</span>
          </a>
          <a href="https://linkedin.com/in/sarthak-routray-020583323" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center space-x-2">
            <span className="text-lg">💼</span>
            <span className="text-sm">@sarthakroutray</span>
          </a>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 pt-8 border-t border-gray-600"
      >
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-purple-400 font-bold">Sarthak</span>
            <span className="text-gray-400 text-sm">sarthak.routray2006@gmail.com</span>
          </div>
          <div className="text-gray-400 text-sm">
            Web designer and AIML Enthusiast
          </div>
          <div className="flex space-x-4 text-gray-400">
            <a href="https://github.com/sarthakroutray" className="hover:text-purple-400 transition-colors">
              <span className="text-xl">�</span>
            </a>
            <a href="https://linkedin.com/in/sarthak-routray-020583323" className="hover:text-purple-400 transition-colors">
              <span className="text-xl">💼</span>
            </a>
            <a href="mailto:sarthak.routray2006@gmail.com" className="hover:text-purple-400 transition-colors">
              <span className="text-xl">📧</span>
            </a>
          </div>
        </div>
        
        <div className="text-center mt-6 text-gray-500 text-sm">
          © Copyright 2025. Made by Sarthak
        </div>
      </motion.footer>
    </motion.div>
  );
}

export default Contact; 
