import PathfindingClient from '@/components/pages/PathfindingClient';
import Script from 'next/script';

export const metadata = {
  title: 'Pathfinding Visualizer - Path Finding Algorithms',
  description: 'Explore pathfinding algorithms like A*, Dijkstra, and BFS through interactive visualizations. Perfect for kids learning about graph algorithms and maze solving.',
  keywords: ['pathfinding algorithms', 'A* algorithm', 'Dijkstra algorithm', 'BFS', 'maze solving', 'graph algorithms', 'educational games'],
  openGraph: {
    title: 'Interactive Pathfinding Algorithm Visualizer for Kids',
    description: 'Watch pathfinding algorithms navigate through mazes! Learn how A*, Dijkstra, and BFS algorithms work through interactive demonstrations.',
  },
};

export default function PathfindingPage() {
  return (
    <>
      <Script
        id="pathfinding-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'AlGOKIDS Pathfinding Visualizer',
            applicationCategory: 'EducationalApplication',
            educationalUse: ['Interactive Learning', 'Demonstration'],
            educationalLevel: 'Beginner',
            description: 'Interactive pathfinding algorithm visualizer helping kids understand how different pathfinding algorithms work through maze solving animations.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock'
            },
            featureList: [
              'Interactive maze generation',
              'Multiple pathfinding algorithms',
              'Real-time visualization',
              'Customizable maze walls',
              'Step-by-step demonstration'
            ],
            browserRequirements: 'Requires JavaScript. Best viewed in modern browsers.',
            permissions: 'no special permissions required',
            url: 'https://algokids.app/pathfinding'
          })
        }}
      />
      <PathfindingClient />
    </>
  );
}
