"use client"

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Leaf, Share2, ArrowRight, Wind, TreePine, CloudRain, Zap } from 'lucide-react';
import { ecoRideNarrative, type EcoRideNarrativeOutput } from '@/ai/flows/eco-ride-narrative';
import { Progress } from '@/components/ui/progress';

function EcoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [narrative, setNarrative] = useState<EcoRideNarrativeOutput | null>(null);
  const [loading, setLoading] = useState(true);

  const dist = Number(searchParams.get('dist')) || 4.2;
  const dur = Number(searchParams.get('dur')) || 12;

  useEffect(() => {
    async function generate() {
      try {
        const result = await ecoRideNarrative({
          userDisplayName: "Explorer",
          distanceKm: dist,
          durationMinutes: Math.floor(dur / 60),
          carbonSavedKg: +(dist * 0.4).toFixed(2), // roughly 0.4kg per km saved vs car
          caloriesBurned: Math.floor(dist * 25),
          numRides: 14
        });
        setNarrative(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(loading => false);
      }
    }
    generate();
  }, [dist, dur]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto space-y-6 pb-24">
        <div className="text-center pt-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
            <Leaf className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-headline mb-2">Ride Complete!</h1>
          <p className="text-muted-foreground">You made a difference today.</p>
        </div>

        <Card className="p-8 rounded-[3rem] border-none shadow-2xl relative overflow-hidden">
          {loading ? (
            <div className="space-y-4 py-8">
              <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
              <div className="h-4 bg-muted animate-pulse rounded w-full" />
              <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
              <p className="text-center text-xs font-bold text-muted-foreground pt-4 uppercase tracking-widest">Generating Eco Insights...</p>
            </div>
          ) : (
            <div className="animate-in fade-in duration-700">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">Eco Score</span>
                <span className="text-2xl font-headline text-primary">{narrative?.ecoScore}/100</span>
              </div>
              <Progress value={narrative?.ecoScore} className="h-3 mb-8 bg-primary/10" />
              
              <blockquote className="text-xl font-headline leading-relaxed italic text-foreground/90 mb-8">
                "{narrative?.narrative}"
              </blockquote>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 p-4 rounded-3xl">
                  <TreePine className="w-5 h-5 text-green-600 mb-2" />
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">CO2 Saved</p>
                  <p className="text-lg font-headline">{(dist * 0.4).toFixed(1)} kg</p>
                </div>
                <div className="bg-secondary/50 p-4 rounded-3xl">
                  <Wind className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Energy Saved</p>
                  <p className="text-lg font-headline">12.4 kWh</p>
                </div>
              </div>
            </div>
          )}
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Leaf className="w-32 h-32" />
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-16 rounded-[2rem] border-primary/20 text-primary font-bold">
            <Share2 className="w-5 h-5 mr-2" />
            SHARE IMPACT
          </Button>
          <Button onClick={() => router.push('/')} className="h-16 rounded-[2rem] bg-primary text-white font-bold">
            GO HOME
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function EcoPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading Eco-Narrative...</div>}>
      <EcoContent />
    </Suspense>
  );
}
