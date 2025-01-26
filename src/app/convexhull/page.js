import ConvexHullClient from '@/components/pages/ConvexHullClient';
import Script from 'next/script';

export const metadata = {
  title: 'Convex Hull Visualizer - Learn Computational Geometry',
  description: 'Discover computational geometry through interactive convex hull algorithm visualizations. Perfect for kids learning about geometric algorithms and problem-solving.',
  keywords: ['convex hull', 'computational geometry', 'geometric algorithms', 'Graham scan', 'Jarvis march', 'interactive learning', 'math visualization'],
  openGraph: {
    title: 'Interactive Convex Hull Algorithm Visualizer for Kids',
    description: 'Explore computational geometry concepts through interactive convex hull demonstrations. Watch geometric algorithms in action!',
  },
};

export default function ConvexHullPage() {
  return (
    <>
      <Script
        id="convexhull-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'AlGOKIDS Convex Hull Visualizer',
            applicationCategory: 'EducationalApplication',
            educationalUse: ['Interactive Learning', 'Demonstration'],
            educationalLevel: 'Beginner',
            description: 'Interactive convex hull algorithm visualizer helping kids understand computational geometry through step-by-step demonstrations.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock'
            },
            featureList: [
              'Interactive point placement',
              'Real-time convex hull calculation',
              'Step-by-step visualization',
              'Multiple algorithm support',
              'Dynamic point manipulation'
            ],
            browserRequirements: 'Requires JavaScript. Best viewed in modern browsers.',
            permissions: 'no special permissions required',
            url: 'https://algokids.app/convexhull'
          })
        }}
      />
      <ConvexHullClient />
    </>
  );
}