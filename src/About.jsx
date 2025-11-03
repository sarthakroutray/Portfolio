import React from "react";
import { motion } from "framer-motion";

import { styles } from "./styles";
import { fadeIn, textVariant } from "./utils/motion";

const About = () => {
  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0 flex flex-col items-center justify-center min-h-screen`}>
      <span className='hash-span' id='about'>
        &nbsp;
      </span>
      <motion.div variants={textVariant()} className='text-center'>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] text-center'
      >
        I'm a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Node.js, and
        Three.js. I'm a quick learner and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Let's work together to bring your ideas to life!
      </motion.p>
    </div>
  );
};

export default About; 