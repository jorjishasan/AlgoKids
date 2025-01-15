"use client"
import { useEffect, useRef } from 'react';

const Canvas = ({ points, hull, currentLine, isAnimating, onAddPoint }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set fixed canvas dimensions
    const width = 800;  // Fixed width
    const height = 600; // Fixed height
    
    // Set both the drawing buffer size and display size
    canvas.width = width;
    canvas.height = height;
    
    // Clear canvas
    ctx.fillStyle = '#1A1B1E';
    ctx.fillRect(0, 0, width, height);
    
    // Draw points
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    });
    
    // Draw hull
    if (hull.length > 0) {
      ctx.beginPath();
      ctx.moveTo(hull[0].x, hull[0].y);
      hull.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw current animation line
    if (currentLine) {
      ctx.beginPath();
      ctx.moveTo(currentLine.from.x, currentLine.from.y);
      ctx.lineTo(currentLine.to.x, currentLine.to.y);
      ctx.strokeStyle = currentLine.color;
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [points, hull, currentLine]);

  const handleCanvasClick = (e) => {
    if (isAnimating) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Calculate click position relative to canvas
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Scale coordinates based on canvas size ratio
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    onAddPoint(x * scaleX, y * scaleY);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="border border-gray-700 rounded"
        style={{ width: '800px', height: '600px' }} // Fixed display size
      />
      <div className="text-gray-400">
        Click anywhere on the canvas to add points or use the Randomize button
      </div>
    </div>
  );
};

export default Canvas; 