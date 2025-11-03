import React from "react";
import { motion } from "framer-motion";

import { BallCanvas } from "./components/canvas";
import { technologies } from "./constants";
import { styles } from "./styles";
import { textVariant } from "./utils/motion";

const Tech = () => {
  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <span className='hash-span' id='skills'>
        &nbsp;
      </span>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I know</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>
      
      <div className='flex flex-row flex-wrap justify-center gap-10 mt-20'>
        {technologies.map((technology) => (
          <div className='w-28 h-28' key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tech; 