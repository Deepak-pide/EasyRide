"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Zap, History, Leaf, User, Bike } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
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
                className={cn(
                  "flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/scan">
          <Button className="bg-accent text-accent-foreground font-black rounded-full px-6 hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 mr-2 fill-current" />
            UNLOCK SCOOTER
          </Button>
        </Link>
      </div>
    </header>
  );
}
