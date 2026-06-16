
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
      "relative transition-all duration-700 ease-out transform w-72 h-72 sm:w-80 sm:h-80",
      isSelected ? "scale-100 opacity-100 rotate-0" : "scale-50 opacity-20 blur-[2px] -rotate-6"
    )}>
      {imageData && (
        <div className="relative w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
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
          <div className={cn(
            "absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 blur-2xl rounded-full transition-opacity duration-700",
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
        "absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[60vh] transition-colors duration-1000 blur-[120px] opacity-20 pointer-events-none",
        selectedScooter.color === 'blue' ? "bg-blue-600" : "bg-red-600"
      )} />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 px-6 pt-12 flex justify-between items-center text-white">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()} 
          className="rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all"
        >
          <X className="w-6 h-6" />
        </Button>
        <div className="text-center">
          <h1 className="font-headline text-lg font-black tracking-widest uppercase text-white">Select Ride</h1>
          <p className="text-[10px] text-white/40 font-bold tracking-tighter uppercase">Raipur Fleet v3.2</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/5">
          <ShieldCheck className="w-4 h-4 text-green-400" />
          <span className="text-[10px] font-black text-white">SECURE</span>
        </div>
      </div>

      {/* Sliding Carousel Display */}
      <div 
        className="h-[55vh] relative flex items-center justify-center pt-24 pb-12 overflow-hidden touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Navigation Arrows */}
        <button 
          onClick={handlePrev}
          disabled={selectedIndex === 0}
          className={cn(
            "absolute left-4 z-40 p-3 rounded-full bg-white/5 text-white/40 transition-all",
            selectedIndex === 0 ? "opacity-0 pointer-events-none" : "hover:bg-white/10 active:scale-90"
          )}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button 
          onClick={handleNext}
          disabled={selectedIndex === mockScooters.length - 1}
          className={cn(
            "absolute right-4 z-40 p-3 rounded-full bg-white/5 text-white/40 transition-all",
            selectedIndex === mockScooters.length - 1 ? "opacity-0 pointer-events-none" : "hover:bg-white/10 active:scale-90"
          )}
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <div 
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] items-center"
          style={{ 
            transform: `translateX(${selectedIndex === 0 ? '15%' : '-15%'})`,
            width: '140%' 
          }}
        >
          {mockScooters.map((scooter, idx) => (
            <div 
              key={scooter.id}
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                "cursor-pointer transition-all duration-700 flex flex-col items-center justify-center flex-1",
                selectedIndex === idx ? "z-10" : "z-0 scale-90"
              )}
            >
              <ScooterVisual color={scooter.color} isSelected={selectedIndex === idx} />
              
              <div className={cn(
                "mt-4 transition-all duration-500",
                selectedIndex === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}>
                <div className={cn(
                  "w-3 h-3 rounded-full mx-auto",
                  scooter.color === 'blue' ? "bg-blue-500 shadow-[0_0_15px_#3B82F6]" : "bg-red-500 shadow-[0_0_15px_#EF4444]"
                )} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Container */}
      <div className="flex-1 bg-background rounded-t-[4rem] relative z-20 shadow-[0_-20px_80px_rgba(0,0,0,0.4)] p-8 flex flex-col animate-in slide-in-from-bottom-20 duration-1000">
        
        {/* Model Info Header */}
        <div className="flex justify-between items-end mb-8">
          <div className="space-y-1">
            <span className={cn(
              "text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full transition-colors duration-500",
              selectedScooter.color === 'blue' ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
            )}>
              {selectedScooter.name}
            </span>
            <h2 className="text-4xl font-headline font-black tracking-tighter text-foreground pt-2">
              {selectedScooter.id}
            </h2>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-xs font-bold text-muted-foreground uppercase">{selectedScooter.condition} Grade</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Price</p>
            <p className="text-3xl font-headline font-black text-primary leading-none">{selectedScooter.price}</p>
          </div>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="p-6 rounded-[2.5rem] border-none bg-secondary/20 shadow-sm transition-all hover:bg-secondary/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <BatteryFull className={cn(
                  "w-6 h-6 transition-colors duration-500",
                  selectedScooter.battery > 50 ? "text-green-500" : "text-yellow-500"
                )} />
              </div>
              <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Charge</p>
                <p className="text-2xl font-headline font-black">{selectedScooter.battery}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-[2.5rem] border-none bg-secondary/20 shadow-sm transition-all hover:bg-secondary/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Est. Range</p>
                <p className="text-2xl font-headline font-black">{selectedScooter.range}<span className="text-xs ml-1 opacity-40">KM</span></p>
              </div>
            </div>
          </Card>
        </div>

        {/* Pricing Info */}
        <div className="flex justify-between px-4 mb-8">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Unlock</span>
            <span className="font-bold">₹10.00</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Distance</span>
            <span className="font-bold">₹5.00/km</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Insurance</span>
            <span className="font-bold text-green-600">Free</span>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={handleUnlock} 
          className={cn(
            "w-full h-20 rounded-[2.5rem] text-white font-black text-xl shadow-2xl transition-all hover:scale-[1.02] active:scale-95 group",
            selectedScooter.color === 'blue' ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/30" : "bg-red-600 hover:bg-red-700 shadow-red-500/30"
          )}
        >
          <Zap className="w-6 h-6 mr-3 fill-accent stroke-accent group-hover:animate-bounce" />
          START {selectedScooter.color.toUpperCase()} RIDE
        </Button>

        <p className="text-center text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em] pt-6 pb-2">
          Secure Bluetooth Pairing • Raipur Smart Mobility
        </p>
      </div>
    </div>
  );
}
