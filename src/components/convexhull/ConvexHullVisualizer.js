"use client"
import { useConvexHull } from '../../context/ConvexHullContext';
import Navbar from './Navigation';
import Canvas from './Canvas';
import { motion } from 'framer-motion';

const ConvexHullVisualizer = () => {
  const { 
    points, 
    hull, 
    isAnimating, 
    currentLine,
    addPoint, 
    clearPoints,
    randomizePoints,
    visualizeConvexHull 
  } = useConvexHull();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen overflow-hidden flex flex-col bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400"
    >
      {/* Playful gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),rgba(255,255,255,0))]" />
      
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,#fff_1px,transparent_1px)] bg-[length:40px_40px] animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,#fff_1px,transparent_1px)] bg-[length:30px_30px] animate-[pulse_4s_ease-in-out_infinite_1s]" />
      </div>
      
      <Navbar 
        isAnimating={isAnimating}
        points={points}
        onRandomize={randomizePoints}
        onVisualize={visualizeConvexHull}
        onClear={clearPoints}
      />
      <div className="flex-1 flex items-start mt-[100px] justify-center relative z-0">
        <Canvas 
          points={points}
          hull={hull}
          currentLine={currentLine}
          isAnimating={isAnimating}
          onAddPoint={addPoint}
        />
      </div>
    </motion.div>
  );
};

export default ConvexHullVisualizer;