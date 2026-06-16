"use client"

import React from 'react';
import { Card } from '@/components/ui/card';
import { BottomDock } from '@/components/BottomDock';
import { Bike, Calendar, ArrowRight, TrendingUp, MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const mockHistory = [
  { id: 1, date: 'Today, 2:45 PM', dist: 4.2, cost: 21.0, start: 'Jaistambh Chowk', end: 'Telibandha Marine Drive' },
  { id: 2, date: 'Yesterday, 9:15 AM', dist: 2.8, cost: 14.0, start: 'Ghadi Chowk', end: 'Sharda Chowk' },
  { id: 3, date: 'Oct 24, 6:00 PM', dist: 1.5, cost: 7.5, start: 'Phool Chowk', end: 'Amapara' },
  { id: 4, date: 'Oct 23, 1:20 PM', dist: 5.6, cost: 28.0, start: 'Tatibandh Chowk', end: 'Raipur Station' },
  { id: 5, date: 'Oct 21, 10:00 AM', dist: 3.1, cost: 15.5, start: 'Santoshi Nagar', end: 'Pachpedi Naka' },
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-3xl font-headline mb-2">Your Trips</h1>
        <p className="text-muted-foreground">Review your Raipur commute stats.</p>
      </div>

      {/* Summary Cards */}
      <div className="px-6 mb-8 overflow-x-auto flex gap-4 no-scrollbar">
        <Card className="flex-shrink-0 w-48 p-5 rounded-[2.5rem] border-none bg-primary text-white shadow-xl">
          <TrendingUp className="w-6 h-6 text-accent mb-4" />
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Monthly Spend</p>
          <p className="text-2xl font-headline">₹1,240</p>
        </Card>
        <Card className="flex-shrink-0 w-48 p-5 rounded-[2.5rem] border-none bg-white shadow-xl">
          <Bike className="w-6 h-6 text-primary mb-4" />
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Total Dist</p>
          <p className="text-2xl font-headline">142.5 KM</p>
        </Card>
        <Card className="flex-shrink-0 w-48 p-5 rounded-[2.5rem] border-none bg-accent shadow-xl text-accent-foreground">
          <Calendar className="w-6 h-6 mb-4" />
          <p className="text-accent-foreground/60 text-[10px] font-bold uppercase tracking-widest">Rides</p>
          <p className="text-2xl font-headline">24</p>
        </Card>
      </div>

      <div className="px-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search Chouks in Raipur..." className="pl-10 h-12 rounded-2xl bg-white border-none shadow-sm" />
        </div>
      </div>

      <div className="px-6 space-y-4 pb-12">
        <h3 className="font-headline text-lg mb-2">Recent Raipur Journeys</h3>
        {mockHistory.map((ride) => (
          <Card key={ride.id} className="p-4 rounded-[2rem] border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="bg-secondary/50 p-3 rounded-2xl">
                  <Bike className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm mb-1">{ride.date}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate max-w-[80px]">{ride.start}</span>
                    <ArrowRight className="w-3 h-3 mx-1" />
                    <span className="truncate max-w-[80px]">{ride.end}</span>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-headline text-lg">₹{ride.cost.toFixed(0)}</p>
                <p className="text-[10px] font-bold text-primary uppercase">{ride.dist} KM</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <BottomDock />
    </div>
  );
}
