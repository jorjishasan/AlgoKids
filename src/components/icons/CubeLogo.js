'use client';
import { motion } from 'framer-motion';

const CubeLogo = ({ className }) => {
  const logoVariants = {
    initial: {
      rotate: 0,
      scale: 1
    },
    hover: {
      rotate: [0, 360, 360, 360],
      scale: [1, 1.2, 0.9, 1.1],
      transition: {
        duration: 1.2,
        times: [0, 0.4, 0.7, 1],
        type: "spring",
        stiffness: 200,
        damping: 10,
        bounce: 0.5
      }
    },
    tap: {
      scale: 0.9,
      rotate: -45,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const pathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: {
        pathLength: { duration: 1, ease: "easeInOut" },
        opacity: { duration: 0.2 }
      }
    }
  };

  return (
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 667 667"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      variants={logoVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      animate="initial"
    >
      <motion.path
        d="M108 332.855H558"
        stroke="#52EC8C"
        strokeWidth="100"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <motion.path
        d="M220.5 138L445.5 527.71"
        stroke="#52EC8C"
        strokeWidth="100"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.path
        d="M445.5 138L220.5 527.71"
        stroke="#52EC8C"
        strokeWidth="100"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
      />
    </motion.svg>
  );
};

export default CubeLogo;
