"use client"
import { useConvexHull } from '../../context/ConvexHullContext';
import Navigation from './Navigation';
import Canvas from './Canvas';

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
    <div className="min-h-screen bg-[#1A1B1E]">
      <Navigation 
        isAnimating={isAnimating}
        points={points}
        onRandomize={randomizePoints}
        onVisualize={visualizeConvexHull}
        onClear={clearPoints}
      />
      <div className="mt-8">
        <Canvas 
          points={points}
          hull={hull}
          currentLine={currentLine}
          isAnimating={isAnimating}
          onAddPoint={addPoint}
        />
      </div>
    </div>
  );
};

export default ConvexHullVisualizer; 