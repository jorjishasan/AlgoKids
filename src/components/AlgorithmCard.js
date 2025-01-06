"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { getIcon } from "./icons/AlgorithmIcons";

const AlgorithmCard = ({ 
  title, 
  description, 
  href
}) => {
  const cardRef = useRef(null);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5
      }
    },
    hover: { 
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <motion.a 
      href={href}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
    >
      <div
        ref={cardRef}
        className="group relative w-80 h-48 bg-white/30 backdrop-blur-md rounded-lg shadow-lg overflow-hidden"
      >
        <div className="absolute inset-px z-10 rounded-lg bg-black/90" />
        
        <div className="relative z-30 flex flex-col p-6">
          <motion.div variants={iconVariants}>
            {getIcon(title)}
          </motion.div>
          <h3 className="text-xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-2">
            {title}
          </h3>
          <p className="text-gray-400 text-sm flex-grow">
            {description}
          </p>
        </div>
      </div>
    </motion.a>
  );
};

export default AlgorithmCard;