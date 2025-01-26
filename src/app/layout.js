import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import { DeviceProvider } from '@/context/DeviceContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  adjustFontFallback: false
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  adjustFontFallback: false
});

export const metadata = {
  metadataBase: new URL('https://algokids.app'),
  title: {
    template: '%s • AlGOKIDS',
    default: 'AlGOKIDS - Interactive Algorithm Learning for Kids',
  },
  description: 'Fun and interactive way for kids to learn algorithms through visualizations. Features sorting algorithms, pathfinding, and computational geometry with step-by-step explanations.',
  keywords: ['algorithm visualization', 'kids learning', 'educational tech', 'sorting algorithms', 'pathfinding', 'convex hull', 'interactive learning', 'computer science for kids'],
  authors: [{ name: 'AlGOKIDS Team' }],
  creator: 'AlGOKIDS',
  publisher: 'AlGOKIDS',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://algokids.app',
    siteName: 'AlGOKIDS',
    title: 'AlGOKIDS - Making Algorithms Fun for Kids',
    description: 'Interactive platform helping kids learn algorithms through engaging visualizations and step-by-step guidance.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlGOKIDS - Interactive Algorithm Learning for Kids',
    description: 'Make learning algorithms fun with interactive visualizations',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://algokids.app',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          id="schema-org-graph"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'AlGOKIDS',
              description: 'Interactive algorithm learning platform for kids',
              url: 'https://algokids.app',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://algokids.app/search?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
      </head>
      <body className="font-sans">
        <DeviceProvider>
          {children}
        </DeviceProvider>
      </body>
    </html>
  );
}
