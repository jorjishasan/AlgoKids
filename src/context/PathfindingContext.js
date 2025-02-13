"use client"
import React, { createContext, useContext, useState, useCallback } from 'react';
import Dijkstra from '../lib/algorithms/pathfinding/dijkstra';
import astar from '../lib/algorithms/pathfinding/astar';
import bfs from '../lib/algorithms/pathfinding/bfs';
import dfs from '../lib/algorithms/pathfinding/dfs';
import { useDevice } from './DeviceContext';

const PathfindingContext = createContext();

export const usePathfinding = () => {
  const context = useContext(PathfindingContext);
  if (!context) {
    throw new Error('usePathfinding must be used within a PathfindingProvider');
  }
  return context;
};

export const PathfindingProvider = ({ children }) => {
  const deviceInfo = useDevice();
  const [state, setState] = useState({
    method: "Dijkstra's Algorithm",
    grid: [],
    mouseClicked: false,
    mainClicked: "",
    start_node: null,
    end_node: null,
    visited: 0,
    shortestPath: 0,
    number_of_nodes: 0,
    currentPath: null,
    isRunning: false
  });

  let animating = false;

  const makeGrid = useCallback(() => {
    if (animating) return;
    
    // Calculate available space
    const navHeight = 80; // Approximate nav height
    const padding = deviceInfo.isMobile ? 20 : 40; // Less padding on mobile
    const availableHeight = window.innerHeight - navHeight - padding;
    const availableWidth = Math.min(window.innerWidth - padding, 1200); // Max width with padding
    
    // Calculate optimal node size based on screen dimensions
    let nodeSize;
    if (deviceInfo.isMobile) {
      // For mobile, aim for 12-15 nodes across
      nodeSize = Math.floor(availableWidth / 12);
    } else {
      // For desktop, aim for 20-25 nodes across
      nodeSize = Math.floor(availableWidth / 20);
    }
    
    // Ensure minimum and maximum node sizes
    nodeSize = Math.max(Math.min(nodeSize, 50), 30); // Min 30px, Max 50px
    
    // Calculate grid dimensions
    let row_size = Math.floor(availableHeight / nodeSize);
    let col_size = Math.floor(availableWidth / nodeSize);
    
    // Ensure minimum sizes for usability
    row_size = Math.min(Math.max(row_size, 8), deviceInfo.isMobile ? 15 : 20); // Fewer rows on mobile
    col_size = Math.min(Math.max(col_size, 8), deviceInfo.isMobile ? 12 : 25); // Fewer columns on mobile
    
    let arr = [];
    for (let i = 0; i < row_size; i++) {
      let row = [];
      for (let j = 0; j < col_size; j++) {
        row.push({
          value: 1,
          row: i,
          col: j,
          isVisited: false,
          isShortestPath: false,
          isWall: false,
        });
        try {
          document.getElementById(`node-${i}-${j}`).className = "node";
        } catch {}
      }
      arr.push(row);
    }
    
    // Place start and end nodes with some minimum distance
    let start_x = Math.floor(row_size / 4);
    let start_y = Math.floor(col_size / 4);
    let end_x = Math.floor(3 * row_size / 4);
    let end_y = Math.floor(3 * col_size / 4);
    
    arr[start_x][start_y].isStart = true;
    arr[end_x][end_y].isEnd = true;

    setState(prev => ({
      ...prev,
      grid: arr,
      start_node: [start_x, start_y],
      end_node: [end_x, end_y],
      number_of_nodes: arr.length * arr[0].length,
      visited: 0,
      shortestPath: 0,
      nodeSize // Store the calculated node size in state
    }));
  }, [deviceInfo.isMobile, deviceInfo.width]); // Add deviceInfo dependencies

  const handleMouseDown = (row, col) => {
    if (animating) return;
    let arr = [...state.grid];
    if (arr[row][col].isStart) {
      setState(prev => ({ ...prev, mainClicked: "start" }));
    }
    else if (arr[row][col].isEnd) {
      setState(prev => ({ ...prev, mainClicked: "end" }));
    }
    if (!arr[row][col].isWall && !arr[row][col].isStart && !arr[row][col].isEnd)
      arr[row][col].isWall = true;
    else if (arr[row][col].isWall) {
      arr[row][col].isWall = false;
    }
    setState(prev => ({
      ...prev,
      grid: arr,
      mouseClicked: true
    }));
  };

  const handleMouseEnter = (row, col) => {
    if (animating) return;
    if (state.mouseClicked) {
      let arr = [...state.grid];
      if (state.mainClicked === "start") {
        arr[row][col].isStart = true;
        setState(prev => ({
          ...prev,
          start_node: [row, col]
        }));
      }
      else if (state.mainClicked === "end") {
        arr[row][col].isEnd = true;
        setState(prev => ({
          ...prev,
          end_node: [row, col]
        }));
      }
      else if (!arr[row][col].isWall && !arr[row][col].isStart && !arr[row][col].isEnd)
        arr[row][col].isWall = true;
      else if (arr[row][col].isWall) {
        arr[row][col].isWall = false;
      }
      setState(prev => ({
        ...prev,
        grid: arr,
        mouseClicked: true
      }));
    }
  };

  const handleMouseLeave = (row, col) => {
    if (animating) return;
    let arr = [...state.grid];
    if (state.mainClicked !== "") {
      arr[row][col].isStart = false;
      arr[row][col].isEnd = false;
      setState(prev => ({
        ...prev,
        grid: arr
      }));
    }
  };

  const handleMouseUp = () => {
    if (animating) return;
    setState(prev => ({
      ...prev,
      mouseClicked: false,
      mainClicked: ""
    }));
  };

  const visualizePathfinding = async (e) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }
    if (state.isRunning) return;
    
    setState(prev => ({ ...prev, isRunning: true }));
    
    let arr = [...state.grid];
    
    // Clear previous visualization
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        arr[i][j].isVisited = false;
        arr[i][j].isShortestPath = false;
        const node = document.getElementById(`node-${i}-${j}`);
        node.className = 'node';
        if (arr[i][j].isStart) node.className = 'node node_start';
        if (arr[i][j].isEnd) node.className = 'node node_end';
        if (arr[i][j].isWall) node.className = 'node node_wall';
      }
    }

    // Real-time visualization callback
    const onVisit = async (node) => {
      if (!arr[node.row][node.col].isStart && !arr[node.row][node.col].isEnd) {
        arr[node.row][node.col].isVisited = true;
        const domNode = document.getElementById(`node-${node.row}-${node.col}`);
        domNode.className = 'node node_visited';
        await new Promise(resolve => setTimeout(resolve, 5));
      }
    };

    let result;
    try {
      switch(state.method) {
        case "Dijkstra's Algorithm":
          result = await Dijkstra(arr, state.start_node, state.end_node, onVisit);
          break;
        case "A* Search":
          result = await astar(arr, state.start_node, state.end_node, onVisit);
          break;
        case "Breadth First Search":
          result = await bfs(arr, state.start_node, state.end_node, onVisit);
          break;
        case "Depth First Search":
          result = await dfs(arr, state.start_node, state.end_node, onVisit);
          break;
        default:
          result = await Dijkstra(arr, state.start_node, state.end_node, onVisit);
      }
    } catch (error) {
      console.error("Error finding path:", error);
      setState(prev => ({ ...prev, isRunning: false }));
      return;
    }

    if (!result || !result.visitedNodes || !result.shortestPath) {
      console.log("No path found!");
      setState(prev => ({ ...prev, isRunning: false }));
      return;
    }

    const { visitedNodes, shortestPath } = result;

    // Animate shortest path
    for (let i = 0; i < shortestPath.length; i++) {
      const node = shortestPath[i];
      arr[node.row][node.col].isShortestPath = true;
      if (!arr[node.row][node.col].isStart && !arr[node.row][node.col].isEnd) {
        const domNode = document.getElementById(`node-${node.row}-${node.col}`);
        domNode.className = 'node node_path';
        await new Promise(resolve => setTimeout(resolve, 30));
      }
    }

    setState(prev => ({
      ...prev,
      grid: arr,
      visited: visitedNodes.length,
      shortestPath: shortestPath.length,
      currentPath: shortestPath,
      isRunning: false
    }));
  };

  const setMethod = (method) => {
    setState(prev => ({ ...prev, method }));
  };

  const value = {
    state,
    makeGrid,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleMouseLeave,
    visualizePathfinding,
    setMethod
  };

  return (
    <PathfindingContext.Provider value={value}>
      {children}
    </PathfindingContext.Provider>
  );
};

export default PathfindingProvider; 