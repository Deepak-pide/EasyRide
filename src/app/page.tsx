
"use client"

import React, { useState, useCallback, Suspense } from 'react';
import Image from 'next/image';
import { LiveMap } from '@/components/LiveMap';
import { Card } from '@/components/ui/card';
import { Zap, MapPin, Bike, Search, Navigation, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const [nearestStation, setNearestStation] = useState<{label: string, distance: number} | null>(null);
  const heroImage = PlaceHolderImages.find(img => img.id === 'raipur-skyline');

  // Memoize this to prevent the LiveMap from re-rendering in an infinite loop
  const handleNearestStationFound = useCallback((station: any, distance: number) => {
    setNearestStation(prev => {
      // Only update if the data actually changed to prevent re-render loops
      if (prev?.label === station.label && prev?.distance === +distance.toFixed(1)) return prev;
      return {
        label: station.label,
        distance: +distance.toFixed(1)
      };
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <div className="flex flex-col md:flex-row-reverse gap-8 px-0 md:px-8 py-0 md:py-8 w-full max-w-7xl mx-auto">
        
        {/* Right Sidebar - Desktop Only */}
        <div className="hidden lg:flex flex-col w-80 gap-6 shrink-0 pt-10">
          <Card className="p-6 rounded-[2.5rem] border-none shadow-xl bg-primary text-white overflow-hidden relative">
            <TrendingUp className="w-12 h-12 absolute -right-2 -bottom-2 opacity-20" />
            <h3 className="font-headline font-black text-lg mb-2">PROMO ACTIVE</h3>
            <p className="text-white/80 text-xs mb-4">Get 20% off your first 5 rides this week in Raipur.</p>
            <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
              <span className="font-black tracking-widest uppercase text-sm">RIDE2024</span>
            </div>
          </Card>

          <Card className="p-6 rounded-[2.5rem] border-none shadow-xl bg-white space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <h3 className="font-headline font-black text-sm uppercase tracking-wider">Safety First</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Always wear a helmet. Follow local traffic rules on MG Road and GE Road.
            </p>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col pb-32 w-full md:max-w-none min-w-0">
          {/* Top Search Section */}
          <div className="sticky top-0 md:static z-40 bg-background/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b md:border-none border-primary/5 px-6 pt-10 pb-4 md:px-0 md:pt-0 md:mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-60" />
              <Input 
                placeholder="Where are you going in Raipur?" 
                className="pl-11 h-14 rounded-2xl bg-white border-none shadow-lg ring-1 ring-primary/5 focus:ring-primary/20 transition-all text-sm font-medium"
              />
            </div>
          </div>

          {/* Map Container - Wrapped in Suspense to prevent blocking the main thread */}
          <div className="w-full h-[45vh] md:h-[60vh] min-h-[450px] relative px-4 md:px-0 shrink-0 mb-8">
            <div className="w-full h-full rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white relative bg-white">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center bg-secondary/10 animate-pulse">
                  <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Loading Map...</p>
                </div>
              }>
                <LiveMap onNearestStationFound={handleNearestStationFound} />
              </Suspense>
            </div>
          </div>

          {/* Dynamic Overlay Info Area */}
          <div className="px-6 md:px-0 -mt-16 md:mt-0 relative z-30 space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
            <Card className="p-8 rounded-[3.5rem] border-none shadow-2xl bg-white/95 backdrop-blur-md md:col-span-2 lg:col-span-1">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                      <h1 className="text-3xl font-headline font-black tracking-tighter">EasyRide</h1>
                      <Sparkles className="w-5 h-5 text-accent fill-accent" />
                  </div>
                  {!nearestStation ? (
                     <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest animate-pulse">Locating Fleet...</p>
                  ) : (
                    <div className="flex items-center gap-2 text-primary font-black animate-in fade-in slide-in-from-left-2 duration-500">
                      <Navigation className="w-3 h-3 fill-primary" />
                      <p className="text-[10px] uppercase tracking-widest">RAIPUR FLEET ACTIVE</p>
                    </div>
                  )}
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-2xl flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary fill-primary" />
                  <span className="text-[10px] font-black text-primary uppercase">Best Rate</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/20 p-5 rounded-[2.5rem] flex flex-col gap-2 transition-transform hover:scale-[1.02]">
                  <div className="bg-primary/20 w-10 h-10 rounded-xl flex items-center justify-center">
                    <Bike className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest mb-0.5">Near You</p>
                    <p className="text-xl font-headline font-bold">12 Units</p>
                  </div>
                </div>
                <div className="bg-secondary/20 p-5 rounded-[2.5rem] flex flex-col gap-2 transition-transform hover:scale-[1.02]">
                  <div className="bg-accent/20 w-10 h-10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest mb-0.5">Fixed Price</p>
                    <p className="text-xl font-headline font-bold">₹5/km</p>
                  </div>
                </div>
              </div>
              
              {nearestStation && (
                <div className="mt-6 pt-6 border-t border-primary/5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                        <Navigation className="w-5 h-5 text-white fill-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest truncate">Nearest Hub</p>
                        <p className="text-sm font-bold text-foreground truncate">{nearestStation.label}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-headline font-black text-primary leading-none">
                        {nearestStation.distance} <span className="text-[10px] uppercase">km</span>
                      </p>
                      <p className="text-[8px] font-bold text-muted-foreground uppercase mt-1">Walk: 12m</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-1">
              {heroImage && (
                <div className="w-full h-44 rounded-[3.5rem] overflow-hidden relative shadow-xl border-4 border-white group transition-all hover:shadow-2xl">
                  <Image 
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    data-ai-hint={heroImage.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/40 to-transparent flex flex-col justify-center px-10">
                    <h2 className="text-white font-headline font-black text-3xl italic tracking-tighter leading-none uppercase">Ride Raipur</h2>
                    <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.3em] mt-3">Smart Mobility • {new Date().getFullYear()}</p>
                  </div>
                </div>
              )}

              <div className="bg-white/80 backdrop-blur-sm rounded-[3rem] p-6 border border-primary/5 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md border border-primary/5 shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground/80 truncate font-headline">Heading to Marine Drive?</p>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest truncate">Typical ride: ₹20 • 12 mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
