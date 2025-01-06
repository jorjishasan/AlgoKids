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
      y: -8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
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
      className="h-full"
    >
      <div
        ref={cardRef}
        className="h-full p-6 bg-black/90 border border-gray-700 rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/10"
      >
        <div className="flex flex-col h-full">
          <motion.div variants={iconVariants}>
            {getIcon(title)}
          </motion.div>
          <h3 className="text-xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-2 xl:mb-3">
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-snug">
            {description}
          </p>
        </div>
      </div>
    </motion.a>
  );
};

export default AlgorithmCard;