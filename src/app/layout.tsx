import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import ToolBox from '../components/ToolBox';
import {Analytics} from '@vercel/analytics/react';
import DeviceRotateRecommender from './room/[id]/_components/DeviceRotateRecommender';

const inter = Inter({subsets: ['latin']});

const openGraphImage = {
  title: 'Instant, real-time polls built with PartyKit',
};

export const metadata: Metadata = {
  title: 'FIND GEMS 💎',
  description: "This is online board game, Let's find some gems!",
  icons:
    'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>💎</text></svg>',
  openGraph: {
    title: 'FIND GEMS 💎',
    description:
      "This is online board game, Let's find some gems! This is a game for two players 👤👤",
    type: 'website',
    images: [`/api/og?${new URLSearchParams(openGraphImage)}`],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <div className="flex h-screen w-screen justify-start">
          <ToolBox />
          <Analytics />
          <DeviceRotateRecommender />
          <main className="mx-auto w-screen p-4 md:w-2/3 md:p-8 xl:w-1/2">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
