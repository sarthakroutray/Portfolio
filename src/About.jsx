import { motion } from 'framer-motion';

function About() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="py-4 md:py-8 flex flex-col items-center"
    >
      <div className="text-lg font-normal text-center md:text-left w-full max-w-2xl bg-clip-text text-transparent bg-gradient-purple-blue" style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>
        <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-purple-blue leading-none mb-4" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.7))' }}>About Me</h2>
        <p className="mb-4">I am Sarthak Routray, a passionate Computer Science undergraduate at Manipal University Jaipur. With a strong enthusiasm for technology and coding, I continuously seek opportunities to expand my skills and apply them to real-world projects. I enjoy building creative and efficient software solutions, and I'm driven by a curiosity to learn new technologies and contribute meaningfully to the tech community.</p>
      </div>
    </motion.div>
  );
}

export default About; 