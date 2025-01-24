'use client';
import { motion } from 'framer-motion';

const ShuffleIcon = () => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* First Card */}
    <motion.rect
      x="4"
      y="6"
      width="12"
      height="16"
      rx="2"
      fill="currentColor"
      initial={{ x: 0, rotate: 0 }}
      animate={{ 
        x: [0, -2, 0],
        rotate: [-5, -5, -5]
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
    
    {/* Second Card */}
    <motion.rect
      x="8"
      y="4"
      width="12"
      height="16"
      rx="2"
      fill="currentColor"
      initial={{ x: 0, rotate: 0 }}
      animate={{ 
        x: [0, 2, 0],
        rotate: [0, 0, 0]
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
    
    {/* Third Card */}
    <motion.rect
      x="12"
      y="6"
      width="12"
      height="16"
      rx="2"
      fill="currentColor"
      initial={{ x: 0, rotate: 0 }}
      animate={{ 
        x: [0, 4, 0],
        rotate: [5, 5, 5]
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  </motion.svg>
);

export default ShuffleIcon; 