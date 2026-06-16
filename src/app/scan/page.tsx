
"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Zap, Camera, Bike, BatteryFull, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const mockScooters = [
  { id: 'ER-9041', battery: 88, range: 42, condition: 'Excellent', price: '₹5/km' },
  { id: 'ER-7720', battery: 94, range: 48, condition: 'New', price: '₹5/km' },
  { id: 'ER-3112', battery: 45, range: 20, condition: 'Good', price: '₹4/km' },
  { id: 'ER-5509', battery: 76, range: 35, condition: 'Excellent', price: '₹5/km' },
];

export default function ScanPage() {
  const router = useRouter();
  const [selectedScooter, setSelectedScooter] = useState(mockScooters[0]);

  const handleUnlock = () => {
    router.push(`/ride?id=${selectedScooter.id}`);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Header Area with Selection View */}
      <div className="h-[30vh] flex items-center justify-center bg-slate-900 transition-all duration-500">
        <div className="relative border-2 border-white/20 rounded-3xl w-48 h-48 flex items-center justify-center">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-accent rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-accent rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-accent rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent rounded-br-2xl" />
          
          <div className="flex flex-col items-center gap-2 animate-in zoom-in duration-500">
            <Bike className="w-12 h-12 text-accent" />
            <span className="text-white/40 text-[10px] font-black tracking-widest uppercase">Target Locked</span>
          </div>
        </div>
      </div>

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 pt-12 flex justify-between items-center text-white pointer-events-none">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()} 
          className="rounded-full bg-white/10 backdrop-blur pointer-events-auto"
        >
          <X className="w-6 h-6" />
        </Button>
        <h1 className="font-headline text-lg">Select Your Ride</h1>
        <div className="w-10" />
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-background rounded-t-[3rem] -mt-10 relative z-20 p-6 flex flex-col animate-in slide-in-from-bottom-10 duration-700">
        {/* Horizontal Scooter Selection */}
        <div className="mb-6">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4 px-2">Nearby in Raipur</p>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {mockScooters.map((scooter) => (
              <div 
                key={scooter.id}
                onClick={() => setSelectedScooter(scooter)}
                className={cn(
                  "flex-shrink-0 w-24 h-24 rounded-3xl flex flex-col items-center justify-center transition-all cursor-pointer border-2",
                  selectedScooter.id === scooter.id 
                    ? "bg-primary border-primary text-white shadow-xl scale-110" 
                    : "bg-secondary/30 border-transparent text-muted-foreground"
                )}
              >
                <Bike className={cn("w-8 h-8 mb-1", selectedScooter.id === scooter.id ? "text-accent" : "")} />
                <span className="text-[10px] font-bold">{scooter.id.split('-')[1]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selection Details */}
        <Card className="flex-1 p-6 rounded-[2.5rem] border-none bg-secondary/20 shadow-inner space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-headline mb-1 tracking-tight">{selectedScooter.id}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="text-sm font-bold uppercase tracking-wider">{selectedScooter.condition} Condition</span>
              </div>
            </div>
            <div className="bg-primary/10 px-4 py-2 rounded-2xl border border-primary/5">
              <span className="text-primary font-black">{selectedScooter.price}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-[2rem] shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <BatteryFull className="w-4 h-4 text-green-500" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Battery</span>
              </div>
              <p className="text-2xl font-headline font-black">{selectedScooter.battery}%</p>
            </div>
            <div className="bg-white p-5 rounded-[2rem] shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Range</span>
              </div>
              <p className="text-2xl font-headline font-black">{selectedScooter.range}<span className="text-sm ml-1 text-muted-foreground">KM</span></p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="text-muted-foreground font-medium uppercase tracking-wider">Unlock Fee</span>
              <span className="font-black text-foreground">₹10.00</span>
            </div>
            <div className="flex items-center justify-between text-xs px-2">
              <span className="text-muted-foreground font-medium uppercase tracking-wider">Distance Rate</span>
              <span className="font-black text-foreground">₹5.00 / KM</span>
            </div>
          </div>

          <Button 
            onClick={handleUnlock} 
            className="w-full h-18 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02]"
          >
            <Zap className="w-6 h-6 mr-3 fill-accent stroke-accent" />
            UNLOCK & START RIDE
          </Button>
        </Card>

        <div className="mt-8 flex justify-center gap-12 text-muted-foreground/30">
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-secondary/30 rounded-full">
              <Camera className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Manual Entry</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-secondary/30 rounded-full">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Help</span>
          </div>
        </div>
      </div>
    </div>
  );
}
