'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const divisions = [
  "Financial Trading Fraud Division",
  "Institutional Investment Fraud Division",
  "Social Engineering Fraud Division",
  "Employment & Recruitment Fraud Division",
  "Institutional Loan Fraud Division",
  "Digital Asset Access & Recovery Division",
  "Blockchain Intelligence & Tracing Division",
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    try {
      const { data } = supabase.storage
        .from('assets')
        .getPublicUrl('logo.png');
      
      if (data?.publicUrl) {
        setLogoUrl(`${data.publicUrl}?t=${Date.now()}`);
      }
    } catch (error) {
      setLogoUrl(null);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className={cn(
            "w-14 h-14 rounded-lg flex items-center justify-center transition-all overflow-hidden",
            logoUrl ? "bg-transparent p-1" : "bg-primary group-hover:bg-accent shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          )}>
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Lazoronix Logo" 
                className="w-full h-full object-contain"
                onError={() => setLogoUrl(null)}
              />
            ) : (
              <Shield className="text-white w-8 h-8" />
            )}
          </div>
          <span className="text-2xl font-headline font-bold tracking-tight">
            LAZORONIX<span className="text-primary group-hover:text-accent transition-colors">.</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors outline-none">
                Divisions <ChevronDown className="w-4 h-4 opacity-50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 bg-card border-white/10 shadow-2xl">
                {divisions.map((division) => (
                  <DropdownMenuItem key={division} asChild>
                    <Link href="#services" className="w-full cursor-pointer py-2.5 text-sm hover:bg-primary/10 uppercase tracking-widest text-[10px] font-bold">
                      {division}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors outline-none">
              Divisions <ChevronDown className="w-4 h-4 opacity-50" />
            </button>
          )}

          <Link href="#process" className="text-sm font-medium hover:text-primary transition-colors">Methodology</Link>
          <Link href="#success-stories" className="text-sm font-medium hover:text-primary transition-colors">Forensic Records</Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest text-[11px] font-black">Knowledge Base</Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild className="bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-widest h-11 px-6">
            <Link href="#forensic-intake">
              Commence Assessment
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
