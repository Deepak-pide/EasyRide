"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap, Timer, Navigation, Power, Lock, BatteryFull, MapPin } from 'lucide-react';
import { suggestBatteryEfficientRoute } from '@/ai/flows/battery-efficient-route-suggestion';
import { useToast } from '@/hooks/use-toast';

export default function RidePage() {
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [battery, setBattery] = useState(88);
  const [suggestion, setSuggestion] = useState<any>(null);
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const RATE_PER_KM = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setDistance(prev => +(prev + 0.05).toFixed(2));
      setDuration(prev => prev + 1);
      if (duration % 60 === 0) setBattery(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  const handleSuggestRoute = async () => {
    setIsLoadingSuggestion(true);
    try {
      const result = await suggestBatteryEfficientRoute({
        startLocation: { latitude: 21.2588, longitude: 81.6298 },
        endLocation: { latitude: 21.2384, longitude: 81.6548 }
      });
      setSuggestion(result);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Raipur Route AI Offline",
        description: "Could not fetch battery efficient route at this time."
      });
    } finally {
      setIsLoadingSuggestion(false);
    }
  };

  const endTrip = () => {
    router.push(`/eco?dist=${distance}&dur=${duration}`);
  };

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-primary text-white p-6 pb-40">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-accent fill-accent" />
          </div>
          <div>
            <h1 className="font-headline text-xl">Ride in Raipur</h1>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">ID: #RAI-2024</p>
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-2xl flex items-center gap-2">
          <BatteryFull className="w-4 h-4 text-green-400" />
          <span className="font-bold">{battery}%</span>
        </div>
      </div>

      <div className="flex flex-col items-center py-8 mb-8">
        <div className="relative">
          <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-[12px] border-white/10 flex flex-col items-center justify-center">
            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Distance</p>
            <h2 className="text-6xl sm:text-7xl font-headline font-black mb-2">{distance.toFixed(2)}</h2>
            <p className="text-xl sm:text-2xl font-headline text-accent uppercase font-black">KM</p>
          </div>
          <div className="absolute inset-0 border-[12px] border-transparent border-t-accent rounded-full animate-spin [animation-duration:10s]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="bg-white/10 backdrop-blur border-none p-5 rounded-[2.5rem] text-white">
          <p className="text-[10px] text-white/50 font-black uppercase tracking-widest mb-2">Duration</p>
          <div className="flex items-center gap-3">
            <Timer className="w-5 h-5 text-accent" />
            <p className="text-xl font-headline font-bold">{formatTime(duration)}</p>
          </div>
        </Card>
        <Card className="bg-white/10 backdrop-blur border-none p-5 rounded-[2.5rem] text-white">
          <p className="text-[10px] text-white/50 font-black uppercase tracking-widest mb-2">Cost (Est)</p>
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-accent" />
            <p className="text-xl font-headline font-bold">₹{(distance * RATE_PER_KM).toFixed(2)}</p>
          </div>
        </Card>
      </div>

      <Card className="bg-white/10 backdrop-blur border-none p-6 rounded-[2.5rem] mb-6 overflow-hidden relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Navigation className="w-5 h-5 text-accent" />
            <h3 className="font-headline font-black text-sm uppercase tracking-wider">Raipur Efficiency AI</h3>
          </div>
          {!suggestion && (
            <Button 
              size="sm" 
              onClick={handleSuggestRoute} 
              disabled={isLoadingSuggestion}
              className="bg-accent text-accent-foreground font-black rounded-xl text-[10px] px-4"
            >
              {isLoadingSuggestion ? "Scanning..." : "OPTIMIZE"}
            </Button>
          )}
        </div>

        {suggestion ? (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center gap-2 text-[10px] font-black text-accent mb-1 uppercase tracking-widest">
              <MapPin className="w-3 h-3" />
              <span>NAVIGATING TO MARINE DRIVE</span>
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-medium">{suggestion.reasoning}</p>
            <div className="flex gap-3">
              <div className="bg-white/10 px-3 py-2 rounded-xl text-[10px] font-black text-accent uppercase">
                {suggestion.estimatedDistanceKm.toFixed(1)} KM
              </div>
              <div className="bg-green-500/20 px-3 py-2 rounded-xl text-[10px] font-black text-green-400 uppercase">
                {suggestion.estimatedBatterySavingsPercent}% Efficient
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-white/40 font-medium leading-relaxed">Find the best route through Raipur Chouks to save battery and reach faster.</p>
        )}
      </Card>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg p-6 z-50 pointer-events-none">
        <div className="flex gap-4 pointer-events-auto">
          <Button variant="outline" className="flex-1 h-18 rounded-[2rem] border-white/20 bg-white/10 text-white font-black text-lg hover:bg-white/20 active:scale-95 transition-all">
            <Lock className="w-6 h-6 mr-2" />
            PAUSE
          </Button>
          <Button 
            onClick={endTrip}
            className="flex-1 h-18 rounded-[2rem] bg-accent text-accent-foreground font-black text-lg shadow-[0_10px_40px_rgba(255,235,51,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Power className="w-6 h-6 mr-2" />
            END RIDE
          </Button>
        </div>
      </div>
    </div>
  );
}
