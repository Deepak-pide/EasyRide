
"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { LiveMap } from '@/components/LiveMap';
import { BottomDock } from '@/components/BottomDock';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap, MapPin, Bike, Search, Navigation } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const [nearestStation, setNearestStation] = useState<{label: string, distance: number} | null>(null);
  const heroImage = PlaceHolderImages.find(img => img.id === 'raipur-skyline');

  const handleNearestStationFound = (station: any, distance: number) => {
    setNearestStation({
      label: station.label,
      distance: +distance.toFixed(1)
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Search Section - Sticky for accessibility */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-primary/5 px-6 pt-12 pb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-60" />
          <Input 
            placeholder="Where are you going in Raipur?" 
            className="pl-11 h-14 rounded-2xl bg-white border-none shadow-lg ring-1 ring-primary/5 focus:ring-primary/20 transition-all text-sm font-medium"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pb-32">
        {/* Map Content - Dynamic height that feels natural */}
        <div className="w-full h-[40vh] min-h-[300px] relative px-4 pt-4">
          <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
            <LiveMap onNearestStationFound={handleNearestStationFound} />
          </div>
        </div>

        {/* Info & Stats Section */}
        <div className="px-6 -mt-6 relative z-30 space-y-6">
          {/* Welcome Card */}
          <Card className="p-8 rounded-[3rem] border-none shadow-2xl bg-white/95 backdrop-blur-md">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-headline font-black tracking-tighter mb-1">EasyRide Raipur</h1>
                {nearestStation ? (
                  <div className="flex items-center gap-2 text-primary font-black animate-in fade-in slide-in-from-left-2 duration-500">
                    <Navigation className="w-4 h-4 fill-primary" />
                    <p className="text-[10px] uppercase tracking-widest">Nearest: {nearestStation.label} ({nearestStation.distance}km)</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">Locating Fleet...</p>
                )}
              </div>
              <div className="bg-primary/10 px-4 py-2 rounded-2xl flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary fill-primary" />
                <span className="text-[10px] font-black text-primary uppercase">Best Rate</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/20 p-5 rounded-[2rem] flex flex-col gap-2 transition-transform hover:scale-[1.02]">
                <div className="bg-primary/20 w-10 h-10 rounded-xl flex items-center justify-center">
                  <Bike className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest mb-0.5">In Service</p>
                  <p className="text-xl font-headline font-bold">20 Units</p>
                </div>
              </div>
              <div className="bg-secondary/20 p-5 rounded-[2rem] flex flex-col gap-2 transition-transform hover:scale-[1.02]">
                <div className="bg-accent/20 w-10 h-10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest mb-0.5">Fixed Price</p>
                  <p className="text-xl font-headline font-bold">₹5/km</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Localized Raipur Hero - Now properly spaced */}
          {heroImage && (
            <div className="w-full h-28 rounded-[2.5rem] overflow-hidden relative shadow-xl border-4 border-white">
              <Image 
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent flex flex-col justify-center px-8">
                <h2 className="text-white font-headline font-black text-2xl italic tracking-tighter leading-none">RIDE RAIPUR</h2>
                <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Smart Mobility 2.0</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomDock />
    </div>
  );
}
