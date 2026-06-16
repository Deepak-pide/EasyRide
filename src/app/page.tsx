
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
    <div className="flex flex-col min-h-screen bg-background pb-32">
      {/* Search Header */}
      <div className="px-6 pt-8 pb-4 absolute top-0 left-0 right-0 z-20 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Where are you going in Raipur?" 
            className="pl-10 h-12 rounded-2xl bg-white/90 backdrop-blur-md border-none shadow-xl"
          />
        </div>
      </div>

      {/* Map Content - Fixed Height for Mobile Viewport */}
      <div className="h-[55vh] relative z-10">
        <div className="absolute inset-0 rounded-b-[3rem] overflow-hidden shadow-2xl">
          <LiveMap onNearestStationFound={handleNearestStationFound} />
        </div>
      </div>

      {/* Welcome Card & Info */}
      <div className="px-6 -mt-12 relative z-30 space-y-4">
        {heroImage && (
          <div className="w-full h-24 rounded-[2rem] overflow-hidden relative shadow-lg">
            <Image 
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover opacity-80"
              data-ai-hint={heroImage.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent flex items-center px-6">
              <h2 className="text-white font-headline font-black text-xl italic tracking-tight">RIDE RAIPUR</h2>
            </div>
          </div>
        )}

        <Card className="p-6 rounded-[2.5rem] border-none shadow-2xl bg-white/95 backdrop-blur-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-headline mb-1">EasyRide Raipur</h1>
              {nearestStation ? (
                <div className="flex items-center gap-2 text-primary font-bold animate-in fade-in slide-in-from-left-2 duration-500">
                  <Navigation className="w-4 h-4 fill-primary" />
                  <p className="text-sm">Nearest: {nearestStation.label} ({nearestStation.distance}km away)</p>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Finding scooters near you...</p>
              )}
            </div>
            <div className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-primary fill-primary" />
              <span className="text-xs font-bold text-primary">BEST PRICE</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/30 p-4 rounded-3xl flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-xl">
                <Bike className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Available</p>
                <p className="text-lg font-headline">20 Units</p>
              </div>
            </div>
            <div className="bg-secondary/30 p-4 rounded-3xl flex items-center gap-3">
              <div className="bg-accent/20 p-2 rounded-xl">
                <MapPin className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Pricing</p>
                <p className="text-lg font-headline">₹5/km</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="bg-primary text-white p-6 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-xl font-headline mb-2">Unlock Your Ride</h2>
            <p className="text-primary-foreground/80 text-sm mb-4">Scan the QR on any scooter near you to start.</p>
            <Button 
              onClick={() => window.location.href = '/scan'}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-2xl h-12 shadow-lg"
            >
              SCAN QR CODE
            </Button>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 rotate-12 transition-transform group-hover:rotate-45">
            <Zap className="w-24 h-24" />
          </div>
        </div>
      </div>

      <BottomDock />
    </div>
  );
}
