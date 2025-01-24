"use client"
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useDevice } from '@/context/DeviceContext';

const Canvas = ({ points, hull, currentLine, isAnimating, onAddPoint }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const { width: deviceWidth, isMobile } = useDevice();

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const viewportHeight = window.innerHeight;
      const navbarHeight = 80; // Approximate navbar height
      const legendHeight = 60; // Approximate legend height
      const instructionsHeight = 100; // Approximate instructions height
      const availableHeight = viewportHeight - navbarHeight - legendHeight - instructionsHeight;
      
      // Calculate dimensions based on container width and available height
      const maxWidth = Math.min(container.clientWidth, 1200);
      const width = Math.max(maxWidth * 0.9, 300);
      
      // For mobile, use more height
      const heightRatio = isMobile ? 0.85 : 0.7;
      const maxHeight = availableHeight * heightRatio;
      const heightByAspect = width * 0.75; // 4:3 aspect ratio
      
      // Use the smaller of the two heights
      const height = Math.min(maxHeight, heightByAspect);
      
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isMobile, deviceWidth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Clear canvas with playful gradient background
    const gradient = ctx.createLinearGradient(0, 0, dimensions.width, dimensions.height);
    gradient.addColorStop(0, '#3b82f6'); // Blue
    gradient.addColorStop(0.5, '#8b5cf6'); // Purple
    gradient.addColorStop(1, '#3b82f6'); // Blue
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);
    
    // Add some playful background patterns
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    
    // Draw grid with slightly larger spacing on mobile
    const gridSize = Math.floor(dimensions.width / (isMobile ? 12 : 16));
    
    // Vertical lines
    for (let x = gridSize; x < dimensions.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, dimensions.height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = gridSize; y < dimensions.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(dimensions.width, y);
      ctx.stroke();
    }
    
    // Draw points with glow effect
    points.forEach(point => {
      const pointSize = Math.max(dimensions.width / (isMobile ? 120 : 160), 4);
      
      // Outer glow
      const gradient = ctx.createRadialGradient(
        point.x, point.y, pointSize * 0.5,
        point.x, point.y, pointSize * 2
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, pointSize * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner point
      ctx.beginPath();
      ctx.arc(point.x, point.y, pointSize, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    });
    
    // Draw hull with gradient stroke
    if (hull.length > 0) {
      ctx.beginPath();
      ctx.moveTo(hull[0].x, hull[0].y);
      hull.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = Math.max(dimensions.width / 300, 2);
      ctx.stroke();
    }

    // Draw current animation line
    if (currentLine) {
      ctx.beginPath();
      ctx.moveTo(currentLine.from.x, currentLine.from.y);
      ctx.lineTo(currentLine.to.x, currentLine.to.y);
      ctx.strokeStyle = currentLine.color;
      ctx.lineWidth = Math.max(dimensions.width / 400, 1.5);
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [points, hull, currentLine, dimensions, isMobile]);

  const handleCanvasClick = (e) => {
    if (isAnimating) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Get click coordinates relative to canvas
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    // Add padding to prevent points from being too close to the edge
    const padding = canvas.width / 40;
    
    // Clamp coordinates within canvas bounds with padding
    const clampedX = Math.min(Math.max(x, padding), canvas.width - padding);
    const clampedY = Math.min(Math.max(y, padding), canvas.height - padding);
    
    onAddPoint(clampedX, clampedY);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4" ref={containerRef}>
      {/* Legend */}
      <div className="flex justify-center gap-x-4 gap-y-2 my-2 flex-wrap px-4">
        {[
          { color: "bg-white", text: "Points" },
          { color: "bg-yellow-400", text: "Scanning" },
          { color: "bg-green-400", text: "Hull" }
        ].map(({ color, text }) => (
          <motion.div
            key={text}
            className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`w-4 h-4 rounded-sm ${color}`} />
            <span className="text-white font-bold text-sm">{text}</span>
          </motion.div>
        ))}
      </div>

      <div className="w-full flex justify-center px-4">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="border border-white/10 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5"
          style={{ 
            width: dimensions.width,
            height: dimensions.height,
            maxWidth: '100%',
            objectFit: 'contain'
          }}
        />
      </div>
      
      <div className="text-gray-100 text-center px-4 space-y-2">
        <p className="font-medium text-sm  sm:text-base">Click anywhere on the canvas to add points ✨</p>
        <p className="text-xs sm:text-sm">Need at least 3 points to find the convex hull,</p>
      </div>
    </div>
  );
};

export default Canvas; 