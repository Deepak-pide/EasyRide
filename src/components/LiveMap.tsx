
"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import { Navigation, MapPin, UserCircle, Zap, Info, Landmark } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const RAIPUR_CENTER = {
  lat: 21.2514,
  lng: 81.6296
};

export const mockStations = [
  { id: 1, lat: 21.2514, lng: 81.6296, label: 'Jaistambh Chowk', available: 8 },
  { id: 2, lat: 21.2485, lng: 81.6371, label: 'Ghadi Chowk', available: 12 },
  { id: 3, lat: 21.2588, lng: 81.6298, label: 'Raipur Station', available: 5 },
  { id: 4, lat: 21.2384, lng: 81.6548, label: 'Marine Drive (Telibandha)', available: 7 },
  { id: 5, lat: 21.2415, lng: 81.6115, label: 'Amapara Hub', available: 4 },
];

const containerStyle = {
  width: '100%',
  height: '100%'
};

const mapOptions = {
  disableDefaultUI: true,
  styles: [
    { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{"color": "#7c93a3"}] },
    { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{"color": "#dae3e8"}] },
    { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{"color": "#f2f4f6"}] },
    { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{"color": "#e8ebed"}] },
    { "featureType": "road", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"}] },
    { "featureType": "water", "elementType": "geometry.fill", "stylers": [{"color": "#d1d9e0"}] }
  ]
};

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

interface LiveMapProps {
  onNearestStationFound?: (station: any, distance: number) => void;
}

export function LiveMap({ onNearestStationFound }: LiveMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const isSimulation = !apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY" || apiKey === "";

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || '',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Default nearest for simulation
    if (onNearestStationFound && isSimulation) {
      onNearestStationFound(mockStations[0], 0.8); 
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
          setUserLocation(loc);
          
          let nearest = mockStations[0];
          let minDistance = Infinity;
          mockStations.forEach(station => {
            const dist = getDistance(loc.lat, loc.lng, station.lat, station.lng);
            if (dist < minDistance) {
              minDistance = dist;
              nearest = station;
            }
          });
          if (onNearestStationFound) onNearestStationFound(nearest, minDistance);
        }
      );
    }
  }, [onNearestStationFound, isSimulation]);

  if (isSimulation) {
    return (
      <div className="w-full h-full bg-[#F0F7FF] relative overflow-hidden font-body">
        {/* Abstract Map Grid Lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full w-px bg-primary" style={{ left: `${i * 5}%` }} />
          ))}
          {[...Array(20)].map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full h-px bg-primary" style={{ top: `${i * 5}%` }} />
          ))}
        </div>

        {/* Abstract Road Geometry */}
        <div className="absolute top-1/2 left-0 w-full h-12 bg-white shadow-inner rotate-12 opacity-50" />
        <div className="absolute top-0 left-1/3 w-16 h-full bg-white shadow-inner -rotate-6 opacity-50" />

        {/* Raipur Landmark Label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none text-center">
            <h2 className="text-8xl font-black text-primary uppercase tracking-tighter">RAIPUR</h2>
            <p className="text-2xl font-bold text-primary tracking-[0.5em] mt-4">SMART CITY ZONE</p>
        </div>

        {/* Mock Markers */}
        {mockStations.map((station, idx) => (
          <div 
            key={station.id}
            className="absolute transition-all hover:scale-110 cursor-pointer"
            style={{ 
              top: `${25 + (idx % 3) * 20}%`, 
              left: `${15 + (idx % 4) * 20}%` 
            }}
          >
            <div className="relative flex flex-col items-center">
                <Card className="bg-white/95 backdrop-blur-sm p-2 rounded-2xl shadow-xl border-2 border-primary/20 flex items-center gap-2 group hover:border-primary transition-colors">
                    <div className="bg-primary p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
                        <Navigation className="w-4 h-4 fill-white" />
                    </div>
                    <div className="flex flex-col pr-1">
                        <span className="text-[10px] font-black text-primary uppercase leading-tight">{station.available} Available</span>
                        <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-tight truncate max-w-[80px]">{station.label}</span>
                    </div>
                </Card>
                <div className="w-3 h-3 bg-primary rounded-full mt-[-4px] shadow-lg border-2 border-white animate-pulse" />
            </div>
          </div>
        ))}

        {/* User Marker */}
        <div className="absolute top-[60%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full animate-ping absolute" />
            <div className="w-10 h-10 bg-blue-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Simulation Indicator */}
        <div className="absolute top-6 left-6 z-50">
          <div className="bg-white/90 backdrop-blur-md shadow-2xl px-5 py-2.5 rounded-full border border-primary/10 flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <div className="flex flex-col">
                <span className="font-black text-[10px] tracking-[0.2em] uppercase text-primary leading-none">RAIPUR PROTOTYPE</span>
                <span className="text-[7px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Live Fleet Active</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loadError) return <div className="w-full h-full bg-slate-100 flex items-center justify-center"><p className="text-destructive font-headline font-bold">MAP LOAD ERROR</p></div>;
  if (!isLoaded) return <div className="w-full h-full bg-slate-200 animate-pulse flex items-center justify-center"><p className="text-muted-foreground font-headline font-bold tracking-widest uppercase">Initializing Map...</p></div>;

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || RAIPUR_CENTER}
        zoom={14}
        onLoad={setMap}
        options={mapOptions}
      >
        {mockStations.map((station) => (
          <OverlayView
            key={station.id}
            position={{ lat: station.lat, lng: station.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-12 h-12 bg-primary/20 rounded-full animate-ping opacity-75" />
                <Card className="relative bg-white p-2 rounded-2xl shadow-xl border-2 border-primary flex items-center gap-2">
                  <div className="bg-primary p-1.5 rounded-lg text-white">
                    <Navigation className="w-4 h-4 fill-white" />
                  </div>
                  <div className="flex flex-col pr-1">
                    <span className="font-black text-[10px] text-primary leading-tight">{station.available} Available</span>
                    <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-tight">{station.label}</span>
                  </div>
                </Card>
              </div>
            </div>
          </OverlayView>
        ))}

        {userLocation && (
          <OverlayView position={userLocation} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <div className="transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-600 rounded-full border-4 border-white shadow-2xl z-10 relative flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-pulse scale-[2]" />
              </div>
            </div>
          </OverlayView>
        )}
      </GoogleMap>
    </div>
  );
}
