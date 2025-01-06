"use client"
import { useDevice } from '@/context/DeviceContext';
import Background3D from '../components/Background3D'
import AlgorithmCard from '../components/AlgorithmCard'

const Home = () => {
  const { isMobile } = useDevice();

  return (
    <main className="min-h-screen relative">
      {!isMobile ? (
        <Background3D />
      ) : (
        <div className="fixed inset-0 -z-10 bg-black" />
      )}
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <h1 className="text-4xl font-black text-left mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          algoview.app
        </h1>
        
        <p className="text-left text-gray-300 max-w-2xl mx-auto mb-12">
          Explore and visualize algorithms through interactive animations. 
          Understand complex concepts with our intuitive visualization tools.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          <AlgorithmCard
            title="Sorting Visualizer"
            description="Watch how different sorting algorithms organize data in real-time"
            href="/sorting"
          />
          <AlgorithmCard
            title="Pathfinding Visualizer"
            description="Explore how algorithms find the shortest path between points"
            href="/pathfinding"
          />
          <AlgorithmCard
            title="Convex Hull Visualizer"
            description="Understand how algorithms compute the convex hull of a point set"
            href="/convexhull"
          />
        </div>

        <div className="text-center">
          <a
            href="/sorting"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          >
            <span className="mr-2">Start Exploring</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  )
}

export default Home
