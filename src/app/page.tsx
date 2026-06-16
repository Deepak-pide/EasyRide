"use client"

import React from 'react';
import { LiveMap } from '@/components/LiveMap';
import { BottomDock } from '@/components/BottomDock';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap, MapPin, Bike, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Search Header */}
      <div className="px-6 pt-8 pb-4 absolute top-0 left-0 right-0 z-20 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Where are you going?" 
            className="pl-10 h-12 rounded-2xl bg-white/90 backdrop-blur-md border-none shadow-xl"
          />
        </div>
      </div>

      {/* Map Content */}
      <div className="flex-1 relative">
        <LiveMap />
      </div>

      {/* Welcome Card & Info */}
      <div className="px-6 -mt-16 relative z-30 space-y-4">
        <Card className="p-6 rounded-[2.5rem] border-none shadow-2xl bg-white/95 backdrop-blur-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-headline mb-1">EasyRide</h1>
              <p className="text-muted-foreground text-sm">Nearby scooters found in your area.</p>
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
                <p className="text-lg font-headline">12 Units</p>
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
            <p className="text-primary-foreground/80 text-sm mb-4">Scan the QR on any scooter to start your journey instantly.</p>
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-2xl h-12 shadow-lg">
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
