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
      <div className='text-center'>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false }}
          className={styles.sectionSubText}
        >
          Introduction
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: false }}
          className={styles.sectionHeadText}
        >
          Overview.
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: false }}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] text-center'
      >
        I'm a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Node.js, and
        Three.js. I'm a quick learner and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Let's work together to bring your ideas to life!
      </motion.p>
    </motion.div>
  );
};

export default About; 