"use client"
import Navigation from '@/components/sorting/Navigation';
import SortingVisualizer from '@/components/sorting/SortingVisualizer';
import ComplexityDrawer from '@/components/sorting/ComplexityDrawer';
import { SortingProvider } from '@/context/SortingContext';

const Sorting = () => {
  return (
    <SortingProvider>
      <div className="min-h-screen bg-gray-900 font-mono">
        <Navigation />
        <SortingVisualizer />
        <ComplexityDrawer />
      </div>
    </SortingProvider>
  );
};

export default Sorting;