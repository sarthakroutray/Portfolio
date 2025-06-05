import { motion } from 'framer-motion';

function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="py-4 md:py-8 flex flex-col items-center w-full"
    >
      {/* Contact Page Content */}
      <div className="text-lg font-normal text-center md:text-left w-full max-w-2xl bg-clip-text text-transparent bg-gradient-purple-blue" style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>
        <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-purple-blue leading-none mb-4" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.7))' }}>Get in Touch</h2>
        <p className="mb-4">You can reach me via email or connect with me on social media.</p>
        <p className="mb-4">Email: <a href="mailto:sarthak.routray2006@gmail.com" className="hover:underline bg-clip-text text-transparent bg-gradient-purple-blue" style={{ filter: 'drop-shadow(0 0 2px rgba(0, 255, 255, 0.7))' }}>sarthak.routray2006@gmail.com</a></p>
        <div className="text-center md:text-left mt-8">
            <a href="https://github.com/sarthakroutray" className="hover:underline bg-clip-text text-transparent bg-gradient-purple-blue mr-4" style={{ filter: 'drop-shadow(0 0 2px rgba(0, 255, 255, 0.7))' }}>Github</a>
            <a href="https://instagram.com/sarthakroutray1809" className="hover:underline bg-clip-text text-transparent bg-gradient-purple-blue" style={{ filter: 'drop-shadow(0 0 2px rgba(255, 0, 255, 0.7))' }}>Instagram </a>
            <a href="https://www.linkedin.com/in/sarthak-routray-020583323/" className="hover:underline bg-clip-text text-transparent bg-gradient-purple-blue mr-4" style={{ filter: 'drop-shadow(0 0 2px rgba(0, 255, 255, 0.7))' }}>LinkedIn</a>
        </div>
      </div>
    </motion.div>
  );
}

export default Contact; 