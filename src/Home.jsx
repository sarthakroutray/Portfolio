import { motion } from 'framer-motion';

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row items-center justify-center h-full w-full px-4 md:px-0"
    >
      <div className="text-center md:text-left md:w-1/2 lg:w-2/5 mb-8 md:mb-0 md:mr-8 md:-mt-24">
        <h1 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-purple-blue leading-none mb-8" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.7))' }}>
          Sarthak<br />Routray
        </h1>

        <div className="mt-8 md:mt-16">
          <div className="text-xs bg-clip-text text-transparent bg-gradient-purple-blue mb-1" style={{ filter: 'drop-shadow(0 0 2px rgba(255, 0, 255, 0.7))' }}>Get in touch</div>
          <div className="text-xs">
            <a href="https://github.com/sarthakroutray" className="hover:underline bg-clip-text text-transparent bg-gradient-purple-blue" style={{ filter: 'drop-shadow(0 0 2px rgba(0, 255, 255, 0.7))' }}>Github</a><span style={{ color: '#ff69b4' }}>,</span>{' '}
            <a href="https://instagram.com/sarthakroutray1809" className="hover:underline bg-clip-text text-transparent bg-gradient-purple-blue" style={{ filter: 'drop-shadow(0 0 2px rgba(255, 0, 255, 0.7))' }}>Instagram</a><span style={{ color: '#ff69b4' }}>,</span>{' '}
            <a href="https://www.linkedin.com/in/sarthak-routray-020583323/" className="hover:underline bg-clip-text text-transparent bg-gradient-purple-blue" style={{ filter: 'drop-shadow(0 0 2px rgba(0, 255, 255, 0.7))' }}>LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="text-lg font-normal text-center md:text-left md:w-1/2 lg:w-2/5 bg-clip-text text-transparent bg-gradient-purple-blue md:mt-40" style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>
        I am Sarthak Routray, a passionate Computer Science undergraduate at Manipal University Jaipur. With a strong enthusiasm for technology and coding, I continuously seek opportunities to expand my skills and apply them to real-world projects.
      </div>
    </motion.div>
  );
}

export default Home; 