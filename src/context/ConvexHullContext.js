"use client"
import { createContext, useContext, useState, useCallback } from 'react';

const ConvexHullContext = createContext();

export const useConvexHull = () => {
  const context = useContext(ConvexHullContext);
  if (!context) {
    throw new Error('useConvexHull must be used within a ConvexHullProvider');
  }
  return context;
};

export const ConvexHullProvider = ({ children }) => {
  const [points, setPoints] = useState([]);
  const [hull, setHull] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);

  const clearPoints = useCallback(() => {
    setPoints([]);
    setHull([]);
    setCurrentStep(0);
    setCurrentLine(null);
  }, []);

  const addPoint = useCallback((x, y) => {
    setPoints(prev => [...prev, { x, y }]);
  }, []);

  const randomizePoints = useCallback(() => {
    const numPoints = Math.floor(Math.random() * 15) + 10; // Generate 10-25 points
    const newPoints = [];
    const width = 800;  // Match canvas width
    const height = 600; // Match canvas height
    const padding = 50; // Padding from edges

    for (let i = 0; i < numPoints; i++) {
      newPoints.push({
        x: Math.random() * (width - 2 * padding) + padding,
        y: Math.random() * (height - 2 * padding) + padding
      });
    }
    setPoints(newPoints);
    setHull([]);
    setCurrentStep(0);
    setCurrentLine(null);
  }, []);

  const visualizeConvexHull = useCallback(async () => {
    if (points.length < 3) return;
    setIsAnimating(true);
    
    // Find bottom-most point
    let bottomPoint = points[0];
    for (let i = 1; i < points.length; i++) {
      if (points[i].y > bottomPoint.y || 
         (points[i].y === bottomPoint.y && points[i].x < bottomPoint.x)) {
        bottomPoint = points[i];
      }
    }

    // Sort points by polar angle
    const sortedPoints = points
      .filter(p => p !== bottomPoint)
      .sort((a, b) => {
        const angleA = Math.atan2(a.y - bottomPoint.y, a.x - bottomPoint.x);
        const angleB = Math.atan2(b.y - bottomPoint.y, b.x - bottomPoint.x);
        return angleA - angleB;
      });

    // Visualize angle sorting
    for (const point of sortedPoints) {
      setCurrentLine({
        from: bottomPoint,
        to: point,
        color: '#ff0000'
      });
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const hull = [bottomPoint, sortedPoints[0], sortedPoints[1]];
    setHull(hull);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Process remaining points with visualization
    for (let i = 2; i < sortedPoints.length; i++) {
      while (hull.length > 1 && !isCounterClockwise(
        hull[hull.length - 2],
        hull[hull.length - 1],
        sortedPoints[i]
      )) {
        // Visualize point being checked
        setCurrentLine({
          from: hull[hull.length - 2],
          to: sortedPoints[i],
          color: '#yellow'
        });
        await new Promise(resolve => setTimeout(resolve, 200));
        hull.pop();
        setHull([...hull]);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      hull.push(sortedPoints[i]);
      setHull([...hull]);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Complete the hull
    setCurrentLine(null);
    setHull([...hull, hull[0]]);
    setIsAnimating(false);
  }, [points]);

  const value = {
    points,
    hull,
    currentStep,
    isAnimating,
    currentLine,
    addPoint,
    clearPoints,
    randomizePoints,
    visualizeConvexHull
  };

  return (
    <ConvexHullContext.Provider value={value}>
      {children}
    </ConvexHullContext.Provider>
  );
};

// Helper function to determine if three points make a counter-clockwise turn
function isCounterClockwise(p1, p2, p3) {
  return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x) > 0;
} 