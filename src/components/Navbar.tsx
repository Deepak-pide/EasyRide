"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Zap, History, Leaf, User, Bike } from 'lucide-react';
import { cn } from '@/lib/utils';
import { playTapSound } from '@/lib/audio-utils';

const navItems = [
  { icon: Map, label: 'Explore', href: '/' },
  { icon: History, label: 'Trips', href: '/history' },
  { icon: Leaf, label: 'Eco Impact', href: '/eco' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="hidden md:block sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-8 mx-auto max-w-7xl">
        <Link 
          href="/" 
          onClick={playTapSound} 
          className="flex items-center gap-2 group"
        >
          <div className="bg-primary p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <Bike className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-headline font-black tracking-tight uppercase">EasyRide</span>
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={playTapSound}
                className={cn(
                  "flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all hover:text-primary",
                  isActive ? "text-primary font-black" : "text-muted-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link 
          href="/scan"
          onClick={playTapSound}
          className="bg-accent text-accent-foreground font-black rounded-full px-6 py-2 flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <Zap className="w-4 h-4 fill-current" />
          UNLOCK SCOOTER
        </Link>
      </div>
    </header>
  );
}
