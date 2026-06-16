import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from '@/components/Navbar';
import { BottomDock } from '@/components/BottomDock';

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
        <Navbar />
        <div className="flex-1 flex flex-col items-center w-full">
          <main className="w-full max-w-lg md:max-w-7xl min-h-[calc(100vh-64px)] relative bg-background md:shadow-none pb-24 lg:border-x lg:border-primary/5">
            {children}
          </main>
        </div>
        <BottomDock />
        <Toaster />
      </body>
    </html>
  );
}
