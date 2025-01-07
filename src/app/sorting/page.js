"use client"
import Navigation from '@/components/sorting/Navigation';
import SortingVisualizer from '@/components/sorting/SortingVisualizer';
import ComplexityDrawer from '@/components/sorting/ComplexityDrawer';
import Toast from '@/components/sorting/Toast';
import { SortingProvider } from '@/context/SortingContext';

const Sorting = () => {
  return (
    <SortingProvider>
      <div className="min-h-screen bg-gray-900 font-sans">
        <Navigation />
        <SortingVisualizer />
        <ComplexityDrawer />
        <Toast />
      </div>
    </SortingProvider>
  );
};

export default Sorting;