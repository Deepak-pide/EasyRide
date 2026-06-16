
"use client"

import React, { useState, useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import { Navigation, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

const RAIPUR_CENTER = {
  lat: 21.2227,
  lng: 81.6508
};

const mockStations = [
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
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#7c93a3"}]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [{"color": "#dae3e8"}]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [{"color": "#f2f4f6"}]
    },
    {
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [{"color": "#e8ebed"}]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [{"color": "#ffffff"}]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [{"color": "#d1d9e0"}]
    }
  ]
};

export function LiveMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || '',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  if (!apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY") {
    return (
      <div className="w-full h-full bg-slate-100 flex items-center justify-center p-6 text-center">
        <Card className="p-8 max-w-xs rounded-[2rem] border-dashed border-2">
          <MapPin className="w-12 h-12 text-primary/40 mx-auto mb-4" />
          <h3 className="font-headline text-lg mb-2">Map API Required</h3>
          <p className="text-sm text-muted-foreground mb-4">Please add your Google Maps API key to the environment variables to see live Raipur stations.</p>
          <div className="text-[10px] font-mono bg-muted p-2 rounded-lg break-all">
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
          </div>
        </Card>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="w-full h-full bg-slate-100 flex items-center justify-center">
        <p className="text-destructive font-headline font-bold">MAP LOAD ERROR</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-slate-200 animate-pulse flex items-center justify-center">
        <p className="text-muted-foreground font-headline font-bold tracking-widest">INITIALIZING MAP...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={RAIPUR_CENTER}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
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
                <div className="relative bg-white p-2 rounded-2xl shadow-xl border-2 border-primary flex items-center gap-2 transition-transform hover:scale-110 active:scale-95">
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

        <OverlayView
          position={RAIPUR_CENTER}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-6 h-6 bg-accent rounded-full border-4 border-white shadow-lg z-10 relative" />
              <div className="absolute inset-0 bg-accent/30 rounded-full animate-pulse scale-[2.5]" />
            </div>
          </div>
        </OverlayView>
      </GoogleMap>

      <div className="absolute top-6 right-6 flex flex-col gap-3">
        <button 
          onClick={() => map?.panTo(RAIPUR_CENTER)}
          className="bg-white/90 backdrop-blur shadow-lg p-3 rounded-2xl border border-white/50 active:scale-90 transition-transform"
        >
          <Navigation className="w-5 h-5 text-primary" />
        </button>
      </div>

      <div className="absolute top-6 left-6">
        <div className="bg-white/90 backdrop-blur shadow-lg px-4 py-3 rounded-3xl border border-white/50 flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="font-headline font-bold text-xs tracking-wide uppercase">Raipur Live</span>
        </div>
      </div>
    </div>
  );
}
