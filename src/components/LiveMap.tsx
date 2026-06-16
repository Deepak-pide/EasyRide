"use client"

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const mockStations = [
  { id: 1, lat: '40%', lng: '30%', available: 5 },
  { id: 2, lat: '65%', lng: '45%', available: 2 },
  { id: 3, lat: '25%', lng: '70%', available: 8 },
  { id: 4, lat: '80%', lng: '20%', available: 1 },
  { id: 5, lat: '50%', lng: '80%', available: 4 },
];

export function LiveMap() {
  const mapImage = PlaceHolderImages.find(img => img.id === 'map-bg');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-[70vh] rounded-b-[3rem] overflow-hidden shadow-2xl bg-slate-200">
      {/* Background Image as Map Mockup */}
      {mapImage && (
        <Image
          src={mapImage.imageUrl}
          alt="Map Background"
          fill
          className="object-cover opacity-60 grayscale"
          priority
        />
      )}

      {/* Map Overlay Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />

      {/* Pulse Markers */}
      {mockStations.map((station) => (
        <div
          key={station.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{ top: station.lat, left: station.lng }}
        >
          <div className="relative flex items-center justify-center">
            {/* Outer Pulse */}
            <div className="absolute w-12 h-12 bg-primary/20 rounded-full animate-ping opacity-75" />
            
            {/* Inner Marker */}
            <div className="relative bg-white p-2 rounded-2xl shadow-xl border-2 border-primary flex items-center gap-2 transition-transform hover:scale-110 active:scale-95">
              <div className="bg-primary p-1.5 rounded-lg text-white">
                <Navigation className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm pr-1 text-primary">{station.available}</span>
            </div>
          </div>
        </div>
      ))}

      {/* User Location */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-6 h-6 bg-accent rounded-full border-4 border-white shadow-lg z-10 relative" />
          <div className="absolute inset-0 bg-accent/30 rounded-full animate-pulse scale-[2.5]" />
        </div>
      </div>

      {/* Floating Controls */}
      <div className="absolute top-6 right-6 flex flex-col gap-3">
        <button className="bg-white/80 backdrop-blur shadow-lg p-3 rounded-2xl border border-white/50 active:scale-90 transition-transform">
          <Navigation className="w-5 h-5 text-primary" />
        </button>
      </div>

      <div className="absolute top-6 left-6">
        <div className="bg-white/90 backdrop-blur shadow-lg px-4 py-3 rounded-3xl border border-white/50 flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="font-headline font-bold text-sm tracking-wide">SYSTEMS ONLINE</span>
        </div>
      </div>
    </div>
  );
}
