import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0"
    >
      {/* Main Heading - Absolute positioned */}
      <h1 className="absolute text-7xl font-black text-white leading-none text-left" style={{ top: '27%', left: '7%', filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.7))' }}>
        Sarthak<br />Routray
      </h1>

      {/* Get in touch - Absolute positioned at bottom-left */}
      <div className="absolute" style={{ top: '70%', left: '7%', width: '10%' }}>
        <div className="text-xs text-gray-200 mb-1 text-left" style={{ filter: 'drop-shadow(0 0 2px rgba(255, 0, 255, 0.7))' }}>Get in touch</div>
        <div className="text-xs mb-0 text-left">
          <a href="https://github.com/sarthakroutray" className="hover:underline text-gray-200" style={{ filter: 'drop-shadow(0 0 2px rgba(0, 255, 255, 0.7))' }}>Github</a>,{' '}
          <a href="https://instagram.com/sarthakroutray1809" className="hover:underline text-gray-200" style={{ filter: 'drop-shadow(0 0 2px rgba(255, 0, 255, 0.7))' }}>Instagram</a>
        </div>
      </div>

      {/* Right: Description - Absolute positioned */}
      <div className="absolute text-lg text-white font-normal text-left" style={{ top: '50%', right: '12%', width: '28%', filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>
       I'm Sarthak Routray, a Computer Science undergraduate at Manipal University Jaipur with a passion for technology and coding. I love building creative, efficient software and constantly explore new tools to grow and contribute to the tech community.
      </div>
    </motion.div>
  );
}

export default Home; 