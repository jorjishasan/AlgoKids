'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const CubeLogo = ({ className = '', isHovered = false }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isHovered) {
      controls.start({
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
      });
    } else {
      controls.start({
        rotate: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20
        }
      });
    }
  }, [isHovered, controls]);

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
      className={`w-8 lg:w-10 h-8 lg:h-10 focus:outline-none ${className}`}
      animate={controls}
      whileTap={{
        scale: 0.9,
        rotate: -45,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      }}
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
