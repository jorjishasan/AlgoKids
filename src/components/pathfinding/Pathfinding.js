"use client"
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import "../../styles/pathfinding.css"
import Grid from "./Grid"
import NavBar from "./NavBar"
import Tutorial from "./Tutorial"
import Stats from "./Stats"
import { usePathfinding } from '../../context/PathfindingContext'

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
    <div className="h-screen bg-gradient-to-br from-blue-600 via-indigo-500 to-violet-500 overflow-hidden">
      <NavBar isHamburgerOpen={isHamburgerOpen} setIsHamburgerOpen={setIsHamburgerOpen} />
      
      <div className="h-[calc(100vh-80px)] container mx-auto px-4 relative z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6"
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
      <Stats />
    </div>
  )
}

export default Pathfinding