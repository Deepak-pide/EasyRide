import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from '@/components/Navbar';
import { BottomDock } from '@/components/BottomDock';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'EasyRide | Smart Urban Commute',
  description: 'Unlock your city with EasyRide scooters. Modern, eco-friendly, and efficient travel.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background overflow-x-hidden min-h-screen flex flex-col">
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        
        <div className="flex-1 flex flex-col items-center w-full">
          <main className="w-full max-w-lg md:max-w-7xl min-h-[calc(100vh-64px)] relative bg-background md:shadow-none pb-24 lg:border-x lg:border-primary/5">
            <Suspense fallback={<div className="h-screen w-full flex items-center justify-center font-headline font-bold text-primary animate-pulse uppercase tracking-[0.3em]">Loading Ride...</div>}>
              {children}
            </Suspense>
          </main>
        </div>

        <Suspense fallback={null}>
          <BottomDock />
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
