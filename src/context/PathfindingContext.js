"use client"
import React, { createContext, useContext, useState, useCallback } from 'react';
import Dijkstra from '../lib/algorithms/pathfinding/dijkstra';
import astar from '../lib/algorithms/pathfinding/astar';

const PathfindingContext = createContext();

export const usePathfinding = () => {
  const context = useContext(PathfindingContext);
  if (!context) {
    throw new Error('usePathfinding must be used within a PathfindingProvider');
  }
  return context;
};

export const PathfindingProvider = ({ children }) => {
  const [state, setState] = useState({
    method: "A* Search",
    grid: [],
    mouseClicked: false,
    mainClicked: "",
    start_node: null,
    end_node: null,
    visited: 0,
    shortestPath: 0,
    number_of_nodes: 0
  });

  let animating = false;

  const makeGrid = useCallback(() => {
    if (animating) return;
    let row_size = Math.floor((window.innerHeight - 60) / 27);
    let col_size = Math.floor((window.innerWidth) / 27);
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
    let start_x = Math.floor(Math.random() * row_size);
    let start_y = Math.floor(Math.random() * col_size);
    let end_x = Math.floor(Math.random() * row_size);
    let end_y = Math.floor(Math.random() * col_size);
    arr[start_x][start_y].isStart = true;
    arr[end_x][end_y].isEnd = true;

    setState(prev => ({
      ...prev,
      grid: arr,
      start_node: [start_x, start_y],
      end_node: [end_x, end_y],
      number_of_nodes: arr.length * arr[0].length,
      visited: 0,
      shortestPath: 0
    }));
  }, []);

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
    e.preventDefault();
    if (animating) return;
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

    let result;
    try {
      if (state.method === "Dijkstra's Algorithm") {
        result = Dijkstra(arr, state.start_node, state.end_node);
      } else {
        result = astar(arr, state.start_node, state.end_node);
      }
    } catch (error) {
      console.error("Error finding path:", error);
      return;
    }

    if (!result || !result.visitedNodes || !result.shortestPath) {
      console.log("No path found!");
      return;
    }

    const { visitedNodes, shortestPath } = result;

    const animate = async () => {
      animating = true;

      // Animate visited nodes in real-time
      for (let i = 0; i < visitedNodes.length; i++) {
        const node = visitedNodes[i];
        arr[node.row][node.col].isVisited = true;
        const domNode = document.getElementById(`node-${node.row}-${node.col}`);
        
        if (!arr[node.row][node.col].isStart && !arr[node.row][node.col].isEnd) {
          domNode.className = 'node node_visited';
          await new Promise(resolve => setTimeout(resolve, 10)); // Shorter delay for real-time feel
        }
      }

      // Mark and animate shortest path
      for (let i = 0; i < shortestPath.length; i++) {
        const node = shortestPath[i];
        arr[node.row][node.col].isShortestPath = true;
        const domNode = document.getElementById(`node-${node.row}-${node.col}`);
        
        if (!arr[node.row][node.col].isStart && !arr[node.row][node.col].isEnd) {
          domNode.className = 'node node_path';
          await new Promise(resolve => setTimeout(resolve, 30));
        }
      }

      setState(prev => ({
        ...prev,
        grid: arr,
        visited: visitedNodes.length,
        shortestPath: shortestPath.length
      }));
      
      animating = false;
    };

    animate();
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