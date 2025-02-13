"use client"
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import "../../styles/pathfinding.css"
import Grid from "./Grid"
import NavBar from "./NavBar"
import Tutorial from "./Tutorial"
import { usePathfinding } from '../../context/PathfindingContext'
import { useState } from 'react'

const Pathfinding = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const { 
    state,
    makeGrid,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleMouseLeave,
  } = usePathfinding();

  useEffect(() => {
    makeGrid();
    window.addEventListener("resize", makeGrid);
    return () => window.removeEventListener("resize", makeGrid);
  }, [makeGrid]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <NavBar isHamburgerOpen={isHamburgerOpen} setIsHamburgerOpen={setIsHamburgerOpen} />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Grid
            grid={state.grid}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            shortestPathNodes={state.currentPath}
          />
        </motion.div>
      </div>

      <Tutorial />
    </div>
  )
}

export default Pathfinding