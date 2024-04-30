import Footer from '@/components/Footer';
import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';

const inter = Inter({subsets: ['latin']});

const openGraphImage = {
  title: 'Instant, real-time polls built with PartyKit',
  cta: 'Create your own poll now',
};

export const metadata: Metadata = {
  title: 'Party poll!',
  description: "Voting's better with friends 🎈",
  openGraph: {
    images: [`/api/og?${new URLSearchParams(openGraphImage)}`],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen w-screen justify-start">
          <main className="mx-auto mb-8 w-screen p-4 md:h-auto md:w-2/3 md:p-8 xl:w-1/2">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
