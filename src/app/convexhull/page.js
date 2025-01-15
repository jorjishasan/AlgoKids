"use client";
import { ConvexHullProvider } from '../../context/ConvexHullContext';
import ConvexHullVisualizer from '../../components/convexhull/ConvexHullVisualizer';

const ConvexHullPage = () => {
  return (
    <ConvexHullProvider>
      <ConvexHullVisualizer />
    </ConvexHullProvider>
  );
};

export default ConvexHullPage;