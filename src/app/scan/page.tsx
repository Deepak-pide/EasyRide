"use client"

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X, Zap, BatteryFull, MapPin, Star, ShieldCheck, ChevronLeft, ChevronRight, Unlock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { playTapSound, playUnlockSound } from '@/lib/audio-utils';

const mockScooters = [
  { id: 'ER-BLUE-01', battery: 94, range: 48, condition: 'New', price: '₹5/km', color: 'blue', name: 'Azure Glide' },
  { id: 'ER-RED-02', battery: 88, range: 42, condition: 'Excellent', price: '₹5/km', color: 'red', name: 'Crimson Bolt' },
];

const ScooterVisual = ({ color, isSelected }: { color: string, isSelected: boolean }) => {
  const imageId = color === 'blue' ? 'scooter-blue' : 'scooter-red';
  const imageData = PlaceHolderImages.find(img => img.id === imageId);

  return (
    <div className={cn(
      "relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform w-64 h-64 sm:w-80 sm:h-80",
      isSelected ? "scale-110 opacity-100 blur-0" : "scale-75 opacity-20 blur-[1px]"
    )}>
      {imageData && (
        <div className="relative w-full h-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          <Image 
            src={imageData.imageUrl}
            alt={imageData.description}
            fill
            className={cn(
              "object-contain transition-all duration-1000",
              color === 'blue' ? "hue-rotate-[190deg] saturate-[1.5]" : "hue-rotate-[340deg] saturate-[1.8]"
            )}
            data-ai-hint={imageData.imageHint}
            priority
          />
        </div>
      )}
    </div>
  );
};

export default function ScanPage() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const selectedScooter = mockScooters[selectedIndex];

  const handleUnlock = () => {
    setIsUnlocking(true);
    playUnlockSound();
    
    // Animate before redirecting
    setTimeout(() => {
      router.push(`/ride?id=${selectedScooter.id}`);
    }, 2000);
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      playTapSound();
    }
  };

  const handleNext = () => {
    if (selectedIndex < mockScooters.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      playTapSound();
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col relative overflow-hidden selection:bg-none">
      {/* Unlock Animation Overlay */}
      {isUnlocking && (
        <div className="fixed inset-0 z-[100] bg-green-500/90 backdrop-blur-3xl flex flex-col items-center justify-center animate-in fade-in duration-500">
           <div className="relative">
              <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.6)] animate-in zoom-in-50 duration-500">
                <div className="relative">
                  <Unlock className="w-20 h-20 text-green-600 animate-in spin-in-90 duration-700" />
                  <Sparkles className="absolute -top-4 -right-4 w-10 h-10 text-yellow-400 animate-pulse" />
                </div>
              </div>
              <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-30" />
              <div className="absolute inset-0 bg-green-300 rounded-full animate-pulse opacity-20 scale-125" />
           </div>
           <h2 className="mt-10 text-4xl font-headline font-black text-white tracking-tighter uppercase italic animate-in slide-in-from-bottom-8 duration-700">
             SYSTEM UNLOCKED
           </h2>
        </div>
      )}

      <div className={cn(
        "absolute top-0 left-1/2 -translate-x-1/2 w-[180%] h-[70vh] transition-colors duration-1000 blur-[140px] opacity-25 pointer-events-none",
        selectedScooter.color === 'blue' ? "bg-blue-600" : "bg-red-600"
      )} />

      <div className="absolute top-0 left-0 right-0 z-50 px-6 pt-12 flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => { playTapSound(); router.back(); }} 
          className="rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white"
        >
          <X className="w-6 h-6" />
        </Button>
        <div className="text-center">
          <h1 className="font-headline text-lg font-black tracking-widest uppercase text-white">Choose Ride</h1>
        </div>
        <div className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
          <ShieldCheck className="w-4 h-4 text-green-400" />
          <span className="text-[10px] font-black text-white">SECURE</span>
        </div>
      </div>

      <div className="h-[50vh] relative flex items-center justify-center pt-24 overflow-hidden">
        <button 
          onClick={handlePrev}
          disabled={selectedIndex === 0}
          className={cn(
            "absolute left-6 z-[60] p-4 rounded-full bg-white/5 backdrop-blur-md text-white/30 border border-white/5 transition-all",
            selectedIndex === 0 ? "opacity-0 pointer-events-none" : "hover:bg-white/10 active:scale-90 opacity-100"
          )}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button 
          onClick={handleNext}
          disabled={selectedIndex === mockScooters.length - 1}
          className={cn(
            "absolute right-6 z-[60] p-4 rounded-full bg-white/5 backdrop-blur-md text-white/30 border border-white/5 transition-all",
            selectedIndex === mockScooters.length - 1 ? "opacity-0 pointer-events-none" : "hover:bg-white/10 active:scale-90 opacity-100"
          )}
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <div className="flex items-center justify-center">
          {mockScooters.map((scooter, idx) => (
            <div 
              key={scooter.id}
              className={cn(
                "transition-all duration-700 absolute",
                selectedIndex === idx ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
              )}
            >
              <ScooterVisual color={scooter.color} isSelected={selectedIndex === idx} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-background rounded-t-[4rem] relative z-30 shadow-[0_-30px_100px_rgba(0,0,0,0.6)] p-8 flex flex-col">
        <div className="flex justify-between items-end mb-8">
          <div className="space-y-1">
            <span className={cn(
              "text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full",
              selectedScooter.color === 'blue' ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
            )}>
              {selectedScooter.name}
            </span>
            <h2 className="text-4xl font-headline font-black tracking-tighter text-foreground pt-3">
              {selectedScooter.id}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Pricing</p>
            <p className="text-3xl font-headline font-black text-primary leading-none">{selectedScooter.price}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="p-6 rounded-[2.5rem] border-none bg-secondary/20 shadow-sm">
            <BatteryFull className="w-6 h-6 text-green-500 mb-2" />
            <p className="text-[10px] font-black text-muted-foreground uppercase">Battery</p>
            <p className="text-2xl font-headline font-black">{selectedScooter.battery}%</p>
          </Card>

          <Card className="p-6 rounded-[2.5rem] border-none bg-secondary/20 shadow-sm">
            <MapPin className="w-6 h-6 text-primary mb-2" />
            <p className="text-[10px] font-black text-muted-foreground uppercase">Range</p>
            <p className="text-2xl font-headline font-black">{selectedScooter.range} KM</p>
          </Card>
        </div>

        <Button 
          onClick={handleUnlock} 
          disabled={isUnlocking}
          className={cn(
            "w-full h-20 rounded-[2.5rem] text-white font-black text-xl shadow-2xl transition-all hover:scale-[1.02] active:scale-95 group relative overflow-hidden",
            selectedScooter.color === 'blue' ? "bg-blue-600 hover:bg-blue-700" : "bg-red-600 hover:bg-red-700"
          )}
        >
          <Zap className="w-6 h-6 mr-3" />
          {isUnlocking ? "UNLOCKING..." : `START ${selectedScooter.color.toUpperCase()} RIDE`}
        </Button>
      </div>
    </div>
  );
}
