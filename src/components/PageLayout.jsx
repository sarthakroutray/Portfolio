import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    rotateY: 180,
  },
  in: {
    opacity: 1,
    rotateY: 0,
  },
  out: {
    opacity: 0,
    rotateY: -180,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8,
};

const PageLayout = ({ children }) => {
  return (
    <motion.div
      style={{ perspective: 1000 }}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default PageLayout;
