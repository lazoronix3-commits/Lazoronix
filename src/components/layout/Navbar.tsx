'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

const navLinks = [
  { href: "/#preservation", label: "Protocols" },
  { href: "/#intelligence", label: "Intelligence Reports" },
  { href: "/#process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 md:gap-3 group">
          <div className={cn(
            "w-10 h-10 md:w-14 md:h-14 rounded-lg flex items-center justify-center transition-all overflow-hidden",
            logoUrl ? "bg-transparent p-0.5" : "bg-primary group-hover:bg-accent shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          )}>
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Lazoronix Logo" 
                className="w-full h-full object-contain"
                onError={() => setLogoUrl(null)}
              />
            ) : (
              <Shield className="text-white w-6 h-6 md:w-8 md:h-8" />
            )}
          </div>
          <span className="text-lg md:text-2xl font-headline font-bold tracking-tight">
            LAZORONIX<span className="text-primary group-hover:text-accent transition-colors">.</span>
          </span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 ml-auto mr-12">
          {mounted && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest hover:text-primary transition-colors outline-none">
                Services <ChevronDown className="w-3 h-3 opacity-50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 bg-card border-white/10 shadow-2xl">
                {divisions.map((division) => (
                  <DropdownMenuItem key={division} asChild>
                    <Link href="/#services" className="w-full cursor-pointer py-2.5 text-sm hover:bg-primary/10 uppercase tracking-widest text-[10px] font-bold">
                      {division}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-[11px] font-black uppercase tracking-widest hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button asChild className="hidden sm:flex bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest h-10 md:h-11 px-4 md:px-6 rounded-none text-[10px] md:text-sm">
            <Link href="/#forensic-intake">
              Commence Assessment
            </Link>
          </Button>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 text-primary">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card border-white/5 w-full sm:max-w-xs p-0">
              <SheetHeader className="p-6 border-b border-white/5 text-left">
                <SheetTitle className="text-xl font-headline font-bold uppercase tracking-tight flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" /> LAZORONIX
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-6 space-y-6">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Services</p>
                  <div className="grid gap-3">
                    {divisions.map((division) => (
                      <Link 
                        key={division} 
                        href="/#services" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                      >
                        {division}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Navigation</p>
                  <div className="grid gap-4">
                    {navLinks.map((link) => (
                      <Link 
                        key={link.href} 
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-[11px] font-black uppercase tracking-widest hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="pt-8">
                  <Button asChild onClick={() => setIsMobileMenuOpen(false)} className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-none">
                    <Link href="/#forensic-intake">
                      Commence Assessment
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
