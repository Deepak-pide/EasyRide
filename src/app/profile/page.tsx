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
  Leaf,
  Bell
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ProfilePage() {
  const avatarImage = PlaceHolderImages.find(img => img.id === 'user-avatar');
  const user = {
    name: "Raipur Explorer",
    email: "explorer@raipur.in",
    balance: 450,
    trips: 24,
    impact: 12.4, // kg CO2
    memberSince: "Oct 2024"
  };

  const menuItems = [
    { icon: CreditCard, label: "Payment Methods", sub: "Visa •••• 4242" },
    { icon: ShieldCheck, label: "Safety & Privacy", sub: "Permissions, Data" },
    { icon: Bell, label: "Notifications", sub: "Alerts, Promos" },
    { icon: HelpCircle, label: "Help & Support", sub: "FAQs, Chat" },
    { icon: Settings, label: "App Settings", sub: "Language, Theme" },
  ];

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline mb-1">Account</h1>
          <p className="text-muted-foreground text-sm">Managing your urban mobility.</p>
        </div>
        <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-primary/20">
          <Settings className="w-5 h-5 text-primary" />
        </Button>
      </div>

      {/* User Card */}
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
              <h2 className="text-xl font-headline">{user.name}</h2>
              <Badge variant="secondary" className="bg-accent/20 text-accent-foreground text-[10px] font-black uppercase">GOLD</Badge>
            </div>
            <p className="text-muted-foreground text-xs font-medium">{user.email}</p>
            <p className="text-primary text-[10px] font-bold uppercase tracking-wider mt-2">Member since {user.memberSince}</p>
          </div>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="px-6 grid grid-cols-2 gap-4 mb-8">
        <Card className="p-5 rounded-[2rem] border-none bg-primary text-white shadow-lg overflow-hidden relative">
          <div className="relative z-10">
            <Wallet className="w-6 h-6 text-accent mb-3" />
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Balance</p>
            <p className="text-2xl font-headline">₹{user.balance}</p>
            <Button size="sm" className="mt-3 bg-white/20 hover:bg-white/30 border-none text-white rounded-xl text-[10px] font-bold h-8">
              ADD CASH
            </Button>
          </div>
          <Wallet className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5 rotate-12" />
        </Card>

        <Card className="p-5 rounded-[2rem] border-none bg-accent shadow-lg text-accent-foreground">
          <Trophy className="w-6 h-6 mb-3" />
          <p className="text-accent-foreground/60 text-[10px] font-bold uppercase tracking-widest">Rewards</p>
          <p className="text-2xl font-headline">1,240</p>
          <p className="text-[10px] mt-1 font-bold">Pts available</p>
        </Card>
      </div>

      {/* Eco Impact Banner */}
      <div className="px-6 mb-8">
        <Card className="p-5 rounded-[2rem] border-none bg-green-50 flex items-center gap-4">
          <div className="bg-green-500/20 p-3 rounded-2xl">
            <Leaf className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-green-800 font-bold text-sm">Eco Champion</p>
            <p className="text-green-600/80 text-xs">You've saved <span className="font-bold">{user.impact}kg</span> of CO2 emissions this month!</p>
          </div>
          <ChevronRight className="w-5 h-5 ml-auto text-green-300" />
        </Card>
      </div>

      {/* Menu List */}
      <div className="px-6 space-y-3">
        <h3 className="font-headline text-sm uppercase tracking-widest text-muted-foreground mb-4 px-2">Account Settings</h3>
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} className="p-4 rounded-[1.5rem] border-none shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-4">
              <div className="bg-secondary/50 p-2.5 rounded-xl">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm leading-tight">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.sub}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/30" />
            </Card>
          );
        })}

        <Button 
          variant="ghost" 
          className="w-full h-14 rounded-2xl text-destructive hover:text-destructive hover:bg-destructive/5 mt-6 font-bold"
        >
          <LogOut className="w-5 h-5 mr-3" />
          LOG OUT
        </Button>
      </div>
    </div>
  );
}
