
"use client"

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Leaf, 
  Share2, 
  ArrowRight, 
  Wind, 
  TreePine, 
  Zap, 
  Trophy, 
  Globe,
  Sparkles
} from 'lucide-react';
import { ecoRideNarrative, type EcoRideNarrativeOutput } from '@/ai/flows/eco-ride-narrative';
import { Progress } from '@/components/ui/progress';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function EcoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [narrative, setNarrative] = useState<EcoRideNarrativeOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const ecoImage = PlaceHolderImages.find(img => img.id === 'eco-celebration');

  const dist = Number(searchParams.get('dist')) || 4.2;
  const dur = Number(searchParams.get('dur')) || 12;

  useEffect(() => {
    async function generate() {
      try {
        const result = await ecoRideNarrative({
          userDisplayName: "Explorer",
          distanceKm: dist,
          durationMinutes: Math.floor(dur / 60),
          carbonSavedKg: +(dist * 0.4).toFixed(2),
          caloriesBurned: Math.floor(dist * 25),
          numRides: 15
        });
        setNarrative(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    generate();
  }, [dist, dur]);

  return (
    <div className="min-h-screen bg-[#F0F7FF] p-6 selection:bg-primary/20">
      <div className="max-w-md mx-auto space-y-6 pb-32">
        {/* Success Header */}
        <div className="text-center pt-8 animate-in fade-in zoom-in duration-700">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-primary/10">
              <Sparkles className="w-12 h-12 text-primary fill-primary animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground p-2 rounded-full shadow-lg">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <h1 className="text-4xl font-headline font-black text-foreground mb-2 tracking-tight">
            RAIPUR CHAMPION!
          </h1>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-[10px]">
            Your sustainability report is ready
          </p>
        </div>

        {/* AI Insight Card */}
        <Card className="relative overflow-hidden p-0 rounded-[3.5rem] border-none shadow-2xl bg-white">
          {ecoImage && (
            <div className="w-full h-40 relative">
              <Image 
                src={ecoImage.imageUrl}
                alt={ecoImage.description}
                fill
                className="object-cover"
                data-ai-hint={ecoImage.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
            </div>
          )}

          <div className="p-8 pb-4">
            {loading ? (
              <div className="space-y-4 py-8">
                <div className="h-6 bg-secondary animate-pulse rounded-full w-3/4" />
                <div className="h-6 bg-secondary animate-pulse rounded-full w-full" />
                <div className="h-6 bg-secondary animate-pulse rounded-full w-5/6" />
                <p className="text-center text-[10px] font-black text-primary/40 pt-6 uppercase tracking-widest animate-pulse">
                  Analyzing Environmental Impact...
                </p>
              </div>
            ) : (
              <div className="animate-in slide-in-from-bottom-8 duration-700">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-primary uppercase block mb-1">Impact Score</span>
                    <span className="text-5xl font-headline font-black text-primary leading-none">
                      {narrative?.ecoScore}
                      <span className="text-lg text-primary/40 font-bold">/100</span>
                    </span>
                  </div>
                  <div className="bg-green-500/10 px-4 py-2 rounded-2xl flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-600 fill-green-600" />
                    <span className="text-xs font-black text-green-700 tracking-wider">LEVEL 4</span>
                  </div>
                </div>

                <Progress value={narrative?.ecoScore} className="h-4 mb-10 bg-primary/5 rounded-full" />
                
                <div className="relative px-4 mb-10">
                  <div className="absolute -left-2 top-0 text-primary opacity-20">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <blockquote className="text-2xl font-headline font-bold leading-tight text-foreground/90 italic tracking-tight">
                    "{narrative?.narrative}"
                  </blockquote>
                </div>

                {/* Local Raipur Milestone */}
                <div className="bg-primary/5 p-6 rounded-[2.5rem] mb-6 flex items-center gap-4 border border-primary/10">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <TreePine className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-wider mb-0.5">Raipur Contribution</p>
                    <p className="text-sm font-bold text-foreground/80">Equivalent to planting 2.4 trees in Telibandha Park</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats Footer Section */}
          <div className="bg-secondary/20 p-8 pt-6 border-t border-primary/5">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 p-5 rounded-[2rem] shadow-sm">
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-3">
                  <Wind className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">CO2 Saved</p>
                <p className="text-2xl font-headline font-black text-blue-700">{(dist * 0.4).toFixed(2)}kg</p>
              </div>
              <div className="bg-white/80 p-5 rounded-[2rem] shadow-sm">
                <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                </div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Energy Saved</p>
                <p className="text-2xl font-headline font-black text-yellow-700">12.4<span className="text-sm">kWh</span></p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <Button 
            className="w-full h-18 rounded-[2rem] bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all group"
          >
            <Share2 className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
            SHARE YOUR IMPACT
          </Button>
          <Button 
            variant="ghost"
            onClick={() => router.push('/')} 
            className="w-full h-18 rounded-[2rem] bg-white border-2 border-primary/10 text-primary font-black text-lg hover:bg-primary/5 transition-all"
          >
            RETURN HOME
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </div>

        {/* Mini Tip */}
        <p className="text-center text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.3em] pt-4">
          Every km in Raipur counts • Ride EasyRide
        </p>
      </div>
    </div>
  );
}

export default function EcoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-10 text-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
        <p className="font-headline font-bold text-primary tracking-widest animate-pulse">CALCULATING IMPACT...</p>
      </div>
    }>
      <EcoContent />
    </Suspense>
  );
}
