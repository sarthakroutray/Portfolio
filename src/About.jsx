import React from "react";
import { motion } from "framer-motion";

import { styles } from "./styles";
import { fadeIn, textVariant } from "./utils/motion";

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: 0.2 }}
      className={`${styles.padding} max-w-7xl mx-auto relative z-0 flex flex-col items-center justify-center min-h-screen`}
    >
      <span className='hash-span' id='about'>
        &nbsp;
      </span>
      <div className='text-center backdrop-blur-md bg-black/40 p-8 rounded-2xl border border-white/20 shadow-lg shadow-black/30'>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className={styles.sectionSubText + ' text-white'}
        >
          Introduction
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className={styles.sectionHeadText + ' text-white'}
        >
          Overview.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className='mt-4 text-white text-[17px] max-w-3xl leading-[30px]'
        >
          I'm a skilled software developer with strong expertise in TypeScript and JavaScript, specializing in modern frameworks like React, Node.js, and Three.js. I also work with AI and Machine Learning technologies, combining intelligent systems with interactive interfaces to create innovative, data-driven solutions.
<br />
A fast learner and creative problem-solver, I collaborate closely with clients to build efficient, scalable, and user-centric applications that make a real impact. Let’s bring your ideas to life with technology that’s both smart and intuitive.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default About;