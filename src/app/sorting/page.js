"use client"
import dynamic from 'next/dynamic'

// Dynamically import components that use window/browser APIs
const SortingVisualizer = dynamic(
  () => import('@/components/sorting/SortingVisualizer'),
  { ssr: false }
)

const Navigation = dynamic(
  () => import('@/components/sorting/Navigation'),
  { ssr: false }
)

const ComplexityDrawer = dynamic(
  () => import('@/components/sorting/ComplexityDrawer'),
  { ssr: false }
)

const Toast = dynamic(
  () => import('@/components/sorting/Toast'),
  { ssr: false }
)

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