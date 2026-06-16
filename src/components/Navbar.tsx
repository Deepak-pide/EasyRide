"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Zap, History, Leaf, User, Bike } from 'lucide-react';
import { cn } from '@/lib/utils';
<<<<<<< HEAD
<<<<<<< HEAD
import { Button } from '@/components/ui/button';
import { playTapSound } from '@/lib/sound-utils';
=======
>>>>>>> 3f0c062 (still not working page not loading what could be cause trobleshoot and t)
=======
import { playTapSound } from '@/lib/audio-utils';
>>>>>>> 90d3a60 (okk now use unlock.wav  and tap.mp3 for tapping and swtching between sco)

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
<<<<<<< HEAD
<<<<<<< HEAD
        <Link href="/" onClick={playTapSound} className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
=======
        <Link href="/" className="flex items-center gap-2 group">
=======
        <Link href="/" onClick={playTapSound} className="flex items-center gap-2 group">
>>>>>>> 90d3a60 (okk now use unlock.wav  and tap.mp3 for tapping and swtching between sco)
          <div className="bg-primary p-1.5 rounded-lg group-hover:scale-110 transition-transform">
>>>>>>> 3f0c062 (still not working page not loading what could be cause trobleshoot and t)
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
                  "flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all hover:text-primary hover:scale-105",
                  isActive ? "text-primary scale-105" : "text-muted-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

<<<<<<< HEAD
        <Link href="/scan" onClick={playTapSound}>
          <Button className="bg-accent text-accent-foreground font-black rounded-full px-6 hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 mr-2 fill-current" />
            UNLOCK SCOOTER
          </Button>
=======
        <Link 
          href="/scan"
          onClick={playTapSound}
          className="bg-accent text-accent-foreground font-black rounded-full px-6 py-2 flex items-center gap-2 shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Zap className="w-4 h-4 fill-current" />
          UNLOCK SCOOTER
>>>>>>> 3f0c062 (still not working page not loading what could be cause trobleshoot and t)
        </Link>
      </div>
    </header>
  );
}
