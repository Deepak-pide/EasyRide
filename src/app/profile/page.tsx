"use client"

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Wallet, 
  Settings, 
  ShieldCheck, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  CreditCard, 
  Trophy,
  Bell,
  Download
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { playTapSound } from '@/lib/audio-utils';

export default function ProfilePage() {
  const avatarImage = PlaceHolderImages.find(img => img.id === 'user-avatar');
  const user = {
    name: "Raipur Explorer",
    email: "explorer@raipur.in",
    balance: 450,
    trips: 24,
    impact: 12.4,
    memberSince: "Oct 2024"
  };

  const menuItems = [
    { icon: CreditCard, label: "Payment Methods", sub: "Visa •••• 4242" },
    { icon: ShieldCheck, label: "Safety & Privacy", sub: "Permissions, Data" },
    { icon: Bell, label: "Notifications", sub: "Alerts, Promos" },
    { icon: HelpCircle, label: "Help & Support", sub: "FAQs, Chat" },
  ];

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="px-6 pt-12 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline mb-1">Account</h1>
          <p className="text-muted-foreground text-sm">Managing your urban mobility.</p>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={playTapSound}
          className="rounded-full h-12 w-12 border-primary/20"
        >
          <Settings className="w-5 h-5 text-primary" />
        </Button>
      </div>

      <div className="px-6 mb-8">
        <Card className="p-6 rounded-[2.5rem] border-none shadow-xl bg-white flex items-center gap-5">
          <Avatar className="h-20 w-20 border-4 border-primary/10">
            {avatarImage && (
              <AvatarImage 
                src={avatarImage.imageUrl} 
                alt={avatarImage.description}
                data-ai-hint={avatarImage.imageHint} 
              />
            )}
            <AvatarFallback className="bg-primary text-white text-xl font-bold">RE</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-headline font-bold">{user.name}</h2>
              <Badge variant="secondary" className="bg-accent/20 text-accent-foreground text-[10px] font-black uppercase">GOLD</Badge>
            </div>
            <p className="text-muted-foreground text-xs font-medium">{user.email}</p>
          </div>
        </Card>
      </div>

      {/* Interactive Download Button */}
      <div className="px-6 mb-8 flex justify-center">
        <Button 
          variant="default"
          onClick={playTapSound}
          className="h-14 rounded-full bg-primary text-white font-black group transition-all duration-300 w-14 hover:w-48 overflow-hidden shadow-xl shadow-primary/20"
        >
          <div className="flex items-center gap-3">
            <Download className="w-6 h-6 shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest text-xs">Download App</span>
          </div>
        </Button>
      </div>

      <div className="px-6 grid grid-cols-2 gap-4 mb-8">
        <Card className="p-5 rounded-[2rem] border-none bg-primary text-white shadow-lg overflow-hidden relative">
          <Wallet className="w-6 h-6 text-accent mb-3" />
          <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Balance</p>
          <p className="text-2xl font-headline font-bold">₹{user.balance}</p>
        </Card>

        <Card className="p-5 rounded-[2rem] border-none bg-accent shadow-lg text-accent-foreground">
          <Trophy className="w-6 h-6 mb-3" />
          <p className="text-accent-foreground/60 text-[10px] font-black uppercase tracking-widest">Rewards</p>
          <p className="text-2xl font-headline font-bold">1,240</p>
        </Card>
      </div>

      <div className="px-6 space-y-3">
        <h3 className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4 px-2">Settings</h3>
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card 
              key={idx} 
              onClick={playTapSound}
              className="p-4 rounded-[1.5rem] border-none shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
            >
              <div className="bg-secondary/50 p-2.5 rounded-xl">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.sub}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/30" />
            </Card>
          );
        })}

        <Button 
          variant="ghost" 
          onClick={playTapSound}
          className="w-full h-14 rounded-2xl text-destructive hover:bg-destructive/5 mt-6 font-bold"
        >
          <LogOut className="w-5 h-5 mr-3" />
          LOG OUT
        </Button>
      </div>
    </div>
  );
}
