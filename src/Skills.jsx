import React from "react";
import { motion } from "framer-motion";

import { BallCanvas } from "./components/canvas";
import { technologies } from "./constants";
import { styles } from "./styles";
import { textVariant } from "./utils/motion";

const Tech = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: 0.2 }}
      className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
    >
      <span className='hash-span' id='skills'>
        &nbsp;
      </span>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I know</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>
      
      <div className='flex flex-row flex-wrap justify-center gap-4 sm:gap-10 mt-20'>
        {technologies.map((technology) => (
          <div className='w-20 h-20 sm:w-28 sm:h-28' key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Tech; 