"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Zap, Camera, ScanLine } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ScanPage() {
  const router = useRouter();
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScanning(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleUnlock = () => {
    router.push('/ride');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Viewfinder Mockup */}
      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
        <div className="relative w-72 h-72 border-2 border-white/20 rounded-3xl">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-accent rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-accent rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-accent rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent rounded-br-2xl" />
          
          {scanning && (
            <div className="absolute inset-x-0 h-1 bg-accent/50 animate-bounce top-1/2 shadow-[0_0_20px_rgba(255,235,51,0.8)]" />
          )}
        </div>
      </div>

      {/* Header Overlay */}
      <div className="relative z-10 px-6 pt-12 flex justify-between items-center text-white">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white/10 backdrop-blur">
          <X className="w-6 h-6" />
        </Button>
        <h1 className="font-headline text-lg">Scan QR Code</h1>
        <div className="w-10" />
      </div>

      {/* Footer Overlay */}
      <div className="mt-auto relative z-10 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
        {!scanning ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="bg-white p-6 rounded-[2.5rem] border-none mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-accent p-3 rounded-2xl">
                  <Zap className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-headline font-bold">EasyRide Scooter detected</h3>
                  <p className="text-sm text-muted-foreground">ID: ER-9041 • 88% Battery</p>
                </div>
              </div>
              <Button onClick={handleUnlock} className="w-full bg-primary h-14 rounded-2xl font-bold text-lg">
                START RIDE
              </Button>
            </Card>
          </div>
        ) : (
          <div className="text-center text-white/60 py-8">
            <ScanLine className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <p className="text-sm font-bold uppercase tracking-widest">Searching for QR Code...</p>
          </div>
        )}
        <div className="flex justify-center gap-12 text-white/40 pb-4">
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-white/5 rounded-full">
              <Camera className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Flash</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-white/5 rounded-full">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Manual Code</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>;
}
