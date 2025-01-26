"use client";
import Pathfinding from '@/components/pathfinding/Pathfinding';
import { PathfindingProvider } from '@/context/PathfindingContext';

const PathfindingClient = () => {
  return (
    <PathfindingProvider>
      <Pathfinding />
    </PathfindingProvider>
  );
};

export default PathfindingClient; 