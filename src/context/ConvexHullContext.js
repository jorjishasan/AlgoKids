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
    
    // Get canvas dimensions from the canvas element
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = width / 40; // Same padding as in Canvas component
    
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

    // Sort points by polar angle with animation
    const sortedPoints = points
      .filter(p => p !== bottomPoint)
      .sort((a, b) => {
        const angleA = Math.atan2(a.y - bottomPoint.y, a.x - bottomPoint.x);
        const angleB = Math.atan2(b.y - bottomPoint.y, b.x - bottomPoint.x);
        return angleA - angleB;
      });

    // Visualize angle sorting with smooth animation
    for (const point of sortedPoints) {
      setCurrentLine({
        from: bottomPoint,
        to: point,
        color: '#fbbf24' // Amber color for scanning
      });
      await new Promise(resolve => setTimeout(resolve, 50)); // Faster animation
    }

    const hull = [bottomPoint];
    setHull(hull);

    // Process remaining points with smooth animation
    for (let i = 0; i < sortedPoints.length; i++) {
      const point = sortedPoints[i];
      
      while (hull.length >= 2 && !isCounterClockwise(
        hull[hull.length - 2],
        hull[hull.length - 1],
        point
      )) {
        // Visualize checking with red line
        setCurrentLine({
          from: hull[hull.length - 2],
          to: point,
          color: '#f87171' // Red color for removing points
        });
        await new Promise(resolve => setTimeout(resolve, 100));
        hull.pop();
        setHull([...hull]);
      }
      
      // Visualize adding point with green line
      setCurrentLine({
        from: hull[hull.length - 1],
        to: point,
        color: '#4ade80' // Green color for adding points
      });
      await new Promise(resolve => setTimeout(resolve, 100));
      
      hull.push(point);
      setHull([...hull]);
    }

    // Complete the hull with animation
    if (hull.length > 2) {
      setCurrentLine({
        from: hull[hull.length - 1],
        to: hull[0],
        color: '#4ade80'
      });
      await new Promise(resolve => setTimeout(resolve, 100));
      setHull([...hull, hull[0]]);
    }
    
    setCurrentLine(null);
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