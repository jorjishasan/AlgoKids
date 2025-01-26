import SortingClient from '@/components/pages/SortingClient';
import Script from 'next/script';

export const metadata = {
  title: 'Sorting Visualizer - Learn Sorting Algorithms Interactively',
  description: 'Interactive sorting algorithm visualizer for kids. Learn bubble sort, merge sort, quick sort and more through step-by-step animations and explanations.',
  keywords: ['sorting algorithms', 'bubble sort', 'merge sort', 'quick sort', 'algorithm visualization', 'educational tech', 'kids learning'],
  openGraph: {
    title: 'Interactive Sorting Algorithm Visualizer for Kids',
    description: 'Watch sorting algorithms come to life! Learn how bubble sort, merge sort, and quick sort work through interactive animations.',
  },
};

export default function SortingPage() {
  return (
    <>
      <Script
        id="sorting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'AlGOKIDS Sorting Visualizer',
            applicationCategory: 'EducationalApplication',
            educationalUse: ['Interactive Learning', 'Demonstration'],
            educationalLevel: 'Beginner',
            description: 'Interactive sorting algorithm visualizer helping kids understand how different sorting algorithms work through step-by-step animations.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock'
            },
            featureList: [
              'Interactive visualization of sorting algorithms',
              'Step-by-step animation',
              'Speed control',
              'Array size customization',
              'Multiple sorting algorithms'
            ],
            browserRequirements: 'Requires JavaScript. Best viewed in modern browsers.',
            permissions: 'no special permissions required',
            url: 'https://algokids.app/sorting'
          })
        }}
      />
      <SortingClient />
    </>
  );
}