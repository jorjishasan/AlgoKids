"use client";
import Pathfinding from '../../components/pathfinding/Pathfinding';
import { PathfindingProvider } from '../../context/PathfindingContext';

const PathfindingPage = () => {
  return (
    <PathfindingProvider>
      <Pathfinding />
    </PathfindingProvider>
  );
};

export default PathfindingPage;
