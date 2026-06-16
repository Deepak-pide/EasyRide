
"use client"

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X, Zap, BatteryFull, MapPin, Star, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

// Simplified mock data with only two scooters
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
          {/* Internal Glow for depth */}
          <div className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-12 blur-3xl rounded-full transition-opacity duration-1000",
            isSelected ? "opacity-40" : "opacity-0",
            color === 'blue' ? "bg-blue-400" : "bg-red-400"
          )} />
        </div>
      )}
    </div>
  );
};

export default function ScanPage() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const selectedScooter = mockScooters[selectedIndex];

  const handleUnlock = () => {
    router.push(`/ride?id=${selectedScooter.id}`);
  };

  const handlePrev = () => {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex < mockScooters.length - 1) setSelectedIndex(selectedIndex + 1);
  };

  // Swipe logic
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart.current - touchEnd;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStart.current = null;
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col relative overflow-hidden selection:bg-none">
      {/* Dynamic Background Glow */}
      <div className={cn(
        "absolute top-0 left-1/2 -translate-x-1/2 w-[180%] h-[70vh] transition-colors duration-1000 blur-[140px] opacity-25 pointer-events-none",
        selectedScooter.color === 'blue' ? "bg-blue-600" : "bg-red-600"
      )} />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 px-6 pt-12 flex justify-between items-center text-white">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()} 
          className="rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all border border-white/10"
        >
          <X className="w-6 h-6" />
        </Button>
        <div className="text-center">
          <h1 className="font-headline text-lg font-black tracking-widest uppercase text-white">Choose Ride</h1>
          <p className="text-[10px] text-white/40 font-bold tracking-tighter uppercase">Fleet Raipur 2.0</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
          <ShieldCheck className="w-4 h-4 text-green-400" />
          <span className="text-[10px] font-black text-white">SECURE</span>
        </div>
      </div>

      {/* Carousel Section */}
      <div 
        className="h-[50vh] relative flex items-center justify-center pt-24 overflow-hidden touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Floating Arrows */}
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

        {/* The Carousel Container */}
        <div 
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] items-center"
          style={{ 
            transform: `translateX(${selectedIndex === 0 ? '25%' : '-25%'})`,
            width: '200%' 
          }}
        >
          {mockScooters.map((scooter, idx) => (
            <div 
              key={scooter.id}
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center transition-all duration-700",
                selectedIndex === idx ? "z-20" : "z-10 opacity-40 grayscale-[0.5]"
              )}
            >
              <ScooterVisual color={scooter.color} isSelected={selectedIndex === idx} />
              
              <div className={cn(
                "mt-6 transition-all duration-500",
                selectedIndex === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}>
                <div className={cn(
                  "w-2 h-2 rounded-full mx-auto",
                  scooter.color === 'blue' ? "bg-blue-500 shadow-[0_0_20px_#3B82F6]" : "bg-red-500 shadow-[0_0_20px_#EF4444]"
                )} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Container */}
      <div className="flex-1 bg-background rounded-t-[4rem] relative z-30 shadow-[0_-30px_100px_rgba(0,0,0,0.6)] p-8 flex flex-col animate-in slide-in-from-bottom-24 duration-1000">
        
        {/* Model Info Header */}
        <div className="flex justify-between items-end mb-8">
          <div className="space-y-1">
            <span className={cn(
              "text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full transition-colors duration-500",
              selectedScooter.color === 'blue' ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
            )}>
              {selectedScooter.name}
            </span>
            <h2 className="text-4xl font-headline font-black tracking-tighter text-foreground pt-3">
              {selectedScooter.id}
            </h2>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-xs font-bold text-muted-foreground uppercase">{selectedScooter.condition} Condition</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Pricing</p>
            <p className="text-3xl font-headline font-black text-primary leading-none">{selectedScooter.price}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="p-6 rounded-[2.5rem] border-none bg-secondary/20 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md">
                <BatteryFull className={cn(
                  "w-6 h-6 transition-colors duration-500",
                  selectedScooter.battery > 50 ? "text-green-500" : "text-yellow-500"
                )} />
              </div>
              <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Battery</p>
                <p className="text-2xl font-headline font-black">{selectedScooter.battery}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-[2.5rem] border-none bg-secondary/20 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Range</p>
                <p className="text-2xl font-headline font-black">{selectedScooter.range}<span className="text-xs ml-1 opacity-40">KM</span></p>
              </div>
            </div>
          </Card>
        </div>

        {/* Info Row */}
        <div className="flex justify-center gap-12 px-6 mb-10">
          <div className="text-center">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block mb-1">Ride</span>
            <span className="font-bold text-sm">₹5/km</span>
          </div>
          <div className="w-px h-10 bg-border/50" />
          <div className="text-center">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block mb-1">Insured</span>
            <span className="font-bold text-sm text-green-600">Yes</span>
          </div>
        </div>

        {/* Final Action */}
        <Button 
          onClick={handleUnlock} 
          className={cn(
            "w-full h-20 rounded-[2.5rem] text-white font-black text-xl shadow-2xl transition-all hover:scale-[1.02] active:scale-95 group relative overflow-hidden",
            selectedScooter.color === 'blue' ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/40" : "bg-red-600 hover:bg-red-700 shadow-red-500/40"
          )}
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <Zap className="w-6 h-6 mr-3 fill-accent stroke-accent group-hover:rotate-12 transition-transform" />
          START {selectedScooter.color.toUpperCase()} RIDE
        </Button>

        <p className="text-center text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em] pt-8 pb-2">
          Ready for Raipur Roads • EasyRide Smart Mobility
        </p>
      </div>
    </div>
  );
}
