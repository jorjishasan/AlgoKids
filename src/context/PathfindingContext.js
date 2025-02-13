"use client"
import React, { createContext, useContext, useState, useCallback } from 'react';
import Dijkstra from '../lib/algorithms/pathfinding/dijkstra';
import astar from '../lib/algorithms/pathfinding/astar';
import bfs from '../lib/algorithms/pathfinding/bfs';
import dfs from '../lib/algorithms/pathfinding/dfs';
import swarm from '../lib/algorithms/pathfinding/swarm';
import convergentSwarm from '../lib/algorithms/pathfinding/convergentSwarm';
import bidirectionalSwarm from '../lib/algorithms/pathfinding/bidirectionalSwarm';
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
    
    // Calculate available space with minimal padding
    const navHeight = 80;
    const padding = deviceInfo.isMobile ? 16 : 32;
    const availableHeight = deviceInfo.height - navHeight - padding * 2;
    const availableWidth = deviceInfo.width - padding * 2;

    // Set minimum and maximum node sizes based on device type
    const minNodeSize = deviceInfo.isMobile ? 35 : 40;
    const maxNodeSize = deviceInfo.isMobile ? 50 : 60;

    // Calculate maximum possible nodes that could fit
    const maxPossibleColumns = Math.floor(availableWidth / minNodeSize);
    const maxPossibleRows = Math.floor(availableHeight / minNodeSize);

    // Determine optimal grid dimensions based on device characteristics
    let desiredColumns, desiredRows;
    
    if (deviceInfo.isMobile) {
      if (deviceInfo.isLandscape) {
        // Landscape mobile: wider grid
        desiredColumns = Math.min(maxPossibleColumns, 20);
        desiredRows = Math.min(maxPossibleRows, 10);
      } else {
        // Portrait mobile: taller grid
        desiredColumns = Math.min(maxPossibleColumns, 12);
        desiredRows = Math.min(maxPossibleRows, 16);
      }
    } else if (deviceInfo.isTablet) {
      // Tablets: medium-sized grid
      desiredColumns = Math.min(maxPossibleColumns, deviceInfo.isLandscape ? 25 : 20);
      desiredRows = Math.min(maxPossibleRows, deviceInfo.isLandscape ? 14 : 18);
    } else {
      // Desktop: larger grid
      desiredColumns = Math.min(maxPossibleColumns, deviceInfo.isLandscape ? 35 : 30);
      desiredRows = Math.min(maxPossibleRows, deviceInfo.isLandscape ? 16 : 20);
    }

    // Calculate node size to fill available space
    const nodeSize = Math.min(
      Math.floor(availableWidth / desiredColumns),
      Math.floor(availableHeight / desiredRows),
      maxNodeSize
    );

    // Recalculate final dimensions to fill space optimally
    const finalColumns = Math.floor(availableWidth / nodeSize);
    const finalRows = Math.floor(availableHeight / nodeSize);
    
    // Use the calculated dimensions
    const row_size = Math.min(desiredRows, finalRows);
    const col_size = Math.min(desiredColumns, finalColumns);
    
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
    
    // Place start and end nodes with proportional spacing
    const start_x = Math.floor(row_size / 4);
    const start_y = Math.floor(col_size / 4);
    const end_x = Math.floor(3 * row_size / 4);
    const end_y = Math.floor(3 * col_size / 4);
    
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
      nodeSize
    }));
  }, [deviceInfo.width, deviceInfo.height, deviceInfo.isMobile, deviceInfo.isTablet, deviceInfo.isLandscape]);

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
        case "Swarm Algorithm":
          result = await swarm(arr, state.start_node, state.end_node, onVisit);
          break;
        case "Convergent Swarm":
          result = await convergentSwarm(arr, state.start_node, state.end_node, onVisit);
          break;
        case "Bidirectional Swarm":
          result = await bidirectionalSwarm(arr, state.start_node, state.end_node, onVisit);
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