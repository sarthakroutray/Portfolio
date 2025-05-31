import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function About() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0"
    >
      {/* About Page Content */}
      <div className="absolute text-lg text-white font-normal text-left" style={{ top: '20%', left: '7%', width: '80%', filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>
        <h2 className="text-5xl font-black text-white leading-none mb-4" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.7))' }}>About Me</h2>
        <p>I'm Sarthak Routray, a passionate Computer Science undergraduate at Manipal University Jaipur. I'm deeply interested in technology and software development, with hands-on experience in building responsive, user-friendly applications. I've worked on real-world projects involving web development, cybersecurity, and AI/ML, which have helped me strengthen my problem-solving abilities and expand my technical skill set. Driven by curiosity and a desire to innovate, I aim to build impactful solutions and contribute meaningfully to the tech community.</p>
      </div>
    </motion.div>
  );
}

export default About; 