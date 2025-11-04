import { motion } from "framer-motion";

import { styles } from "../styles";

const Hero = () => {
  const handleScroll = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className={`relative w-full h-screen mx-auto flex items-center justify-center`}>
      <div
        className={`max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start justify-center gap-5`}
      >
        <div>
          <div style={{ background: 'rgba(5, 8, 22, 0.15)', backdropFilter: 'blur(12px)' }} className='p-6 rounded-2xl border border-white/30 shadow-xl shadow-black/50 flex gap-5 items-start'>
            <div className='flex flex-col justify-center items-center mt-0'>
              <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
              <div className='w-1 sm:h-52 h-52 violet-gradient' />
            </div>
            <div>
              <h1 className={`${styles.heroHeadText} text-white drop-shadow-[0_4px_12px_rgba(0,0,0,1)]`}>
                Hi, I'm <span className='text-[#915EFF] drop-shadow-[0_0_20px_rgba(145,94,255,0.8),0_4px_12px_rgba(0,0,0,1)]'>Sarthak</span>
              </h1>
              <p className={`${styles.heroSubText} mt-2 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,1)]`}>
                I develop full-stack web applications,
                AIML enthusiast  <br className='sm:block hidden' /> and a lifelong learner.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <button
          onClick={handleScroll}
          className='cursor-pointer'
        >
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;