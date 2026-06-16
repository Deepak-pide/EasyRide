
"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import { Navigation, MapPin, UserCircle, Zap, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const RAIPUR_CENTER = {
  lat: 21.2227,
  lng: 81.6508
};

export const mockStations = [
  { id: 1, lat: 21.1764, lng: 81.6705, label: 'Sejbahar Hub', available: 8 },
  { id: 2, lat: 21.2227, lng: 81.6508, label: 'Santoshi Nagar Chouk', available: 12 },
  { id: 3, lat: 21.2588, lng: 81.6298, label: 'Raipur Station', available: 5 },
  { id: 4, lat: 21.2384, lng: 81.6548, label: 'Telibandha', available: 7 },
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
  const isSimulation = !apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY";

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || '',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Initial call to set nearest station even if geolocation fails
    if (onNearestStationFound) {
      onNearestStationFound(mockStations[3], 1.2); // Default to Telibandha
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
  }, [onNearestStationFound]);

  if (isSimulation) {
    return (
      <div className="w-full h-full bg-[#E5F1FF] relative overflow-hidden">
        {/* Stylized Simulated Map Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-full h-1 bg-primary/20 rotate-45" />
          <div className="absolute top-1/2 left-0 w-full h-1 bg-primary/20" />
          <div className="absolute top-0 left-1/2 w-1 h-full bg-primary/20" />
          <div className="absolute top-1/3 right-1/4 w-full h-1 bg-primary/20 -rotate-12" />
        </div>

        {/* Mock Markers */}
        {mockStations.map((station, idx) => (
          <div 
            key={station.id}
            className="absolute transition-transform hover:scale-110"
            style={{ 
              top: `${20 + (idx * 15)}%`, 
              left: `${15 + (idx * 20)}%` 
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="bg-white p-2 rounded-2xl shadow-xl border-2 border-primary flex items-center gap-2">
                <div className="bg-primary p-1.5 rounded-lg text-white">
                  <Navigation className="w-4 h-4" />
                </div>
                <div className="flex flex-col pr-1">
                  <span className="font-black text-[10px] text-primary leading-tight">{station.available} available</span>
                  <span className="text-[8px] text-muted-foreground font-bold truncate max-w-[80px]">{station.label}</span>
                </div>
              </div>
              <div className="w-3 h-3 bg-primary rounded-full mt-[-6px] shadow-lg border-2 border-white" />
            </div>
          </div>
        ))}

        {/* User Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex items-center justify-center">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full animate-ping absolute" />
            <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-2xl z-10 flex items-center justify-center">
              <UserCircle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Simulation Indicator */}
        <div className="absolute top-6 left-6 z-50">
          <div className="bg-white/90 backdrop-blur shadow-xl px-4 py-2.5 rounded-3xl border border-white/50 flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <span className="font-headline font-black text-[10px] tracking-widest uppercase text-primary">Raipur Live Simulation</span>
          </div>
        </div>

        {/* Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6 z-50">
          <Card className="bg-white/95 backdrop-blur-sm p-4 rounded-[2rem] border-none shadow-2xl flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <p className="text-[10px] font-bold text-muted-foreground leading-snug uppercase tracking-tight">
              Prototype Mode: Showing simulated real-time data for Raipur Hubs.
            </p>
          </Card>
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
        zoom={13}
        onLoad={setMap}
        options={mapOptions}
      >
        {mockStations.map((station) => (
          <OverlayView
            key={station.id}
            position={{ lat: station.lat, lng: station.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-12 h-12 bg-primary/20 rounded-full animate-ping opacity-75" />
                <div className="relative bg-white p-2 rounded-2xl shadow-xl border-2 border-primary flex items-center gap-2">
                  <div className="bg-primary p-1.5 rounded-lg text-white">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col pr-1">
                    <span className="font-bold text-[10px] text-primary leading-tight">{station.available} available</span>
                    <span className="text-[8px] text-muted-foreground truncate max-w-[80px]">{station.label}</span>
                  </div>
                </div>
              </div>
            </div>
          </OverlayView>
        ))}

        {userLocation && (
          <OverlayView position={userLocation} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <div className="transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-2xl z-10 relative flex items-center justify-center">
                  <UserCircle className="w-5 h-5 text-white" />
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
