"use client";
import { ConvexHullProvider } from '@/context/ConvexHullContext';
import ConvexHullVisualizer from '@/components/convexhull/ConvexHullVisualizer';

const ConvexHullClient = () => {
  return (
    <ConvexHullProvider>
      <ConvexHullVisualizer />
    </ConvexHullProvider>
  );
};

export default ConvexHullClient; 