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
          I build web products with React, Node.js, and TypeScript, and I spend most of my time on features where backend behavior and AI outputs need to work together reliably.
<br />
I prefer practical engineering over buzzwords: clear API contracts, stable deployments, and model-driven workflows that teams can actually maintain.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default About;