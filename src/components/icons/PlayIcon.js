'use client';
import { motion } from 'framer-motion';

const PlayIcon = () => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M8 5.14v14.72a1 1 0 001.5.87l11-7.36a1 1 0 000-1.74l-11-7.36a1 1 0 00-1.5.87z"
      fill="currentColor"
      initial={{ scale: 0.8, x: -5 }}
      animate={{
        scale: [0.8, 1.1, 1],
        x: [-5, 2, 0]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  </motion.svg>
);

export default PlayIcon; 