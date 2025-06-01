import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-clip-text text-transparent bg-gradient-purple-blue"
    >
      <h1 className="text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-purple-blue" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.7))' }}>404</h1>
      <p className="text-2xl md:text-3xl font-light mt-4 mb-8 text-center bg-clip-text text-transparent bg-gradient-purple-blue" style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <img src="/Style Ninja GIF by AGoodDoctorBTC.gif" alt="Animated GIF" className="w-64 h-64 mb-8" />
      <Link
        to="/"
        className="px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Go Home
      </Link>
    </motion.div>
  );
}

export default NotFound; 