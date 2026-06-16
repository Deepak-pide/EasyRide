"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Zap, History, Leaf, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Map, label: 'Explore', href: '/' },
  { icon: History, label: 'Trips', href: '/history' },
  { icon: Zap, label: 'Unlock', href: '/scan', primary: true },
  { icon: Leaf, label: 'Eco', href: '/eco' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export function BottomDock() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4 pb-6 pt-2 pointer-events-none md:hidden">
      <nav className="glass-dock w-full rounded-[2.5rem] flex items-center justify-between p-2 pointer-events-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.primary) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative -top-6 flex flex-col items-center justify-center px-1"
              >
                <div className="bg-accent text-accent-foreground p-5 rounded-full shadow-[0_8px_30px_rgb(255,235,51,0.4)] transition-transform active:scale-90 border-4 border-background">
                  <Icon className="w-7 h-7 stroke-[3px]" />
                </div>
                <span className="mt-1 text-[10px] font-black uppercase tracking-wider text-foreground">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 py-2 transition-colors active:scale-95"
            >
              <div className={cn(
                "p-2 rounded-xl transition-all",
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}>
                <Icon className={cn("w-6 h-6", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
              </div>
              <span className={cn(
                "text-[10px] mt-1 font-medium",
                isActive ? "text-primary font-bold" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
