'use client';

import Link from 'next/link';
import { Shield, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const services = [
  "Forex Scam Recovery",
  "Investment Scam Recovery",
  "Romance Scam Recovery",
  "Job Scam Recovery",
  "Loan Scam Recovery",
  "Wallet Recovery",
  "Asset Recovery Solutions",
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center group-hover:bg-accent transition-colors">
            <Shield className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-headline font-bold tracking-tight">
            LAZORONIX<span className="text-primary group-hover:text-accent transition-colors">.</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors outline-none">
              Services <ChevronDown className="w-4 h-4 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-card border-white/10 shadow-2xl">
              {services.map((service) => (
                <DropdownMenuItem key={service} asChild>
                  <Link href="#services" className="w-full cursor-pointer py-2.5 text-sm hover:bg-primary/10">
                    {service}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="#process" className="text-sm font-medium hover:text-primary transition-colors">Methodology</Link>
          <Link href="#why-us" className="text-sm font-medium hover:text-primary transition-colors">Success Stories</Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:inline-flex border-primary/20 hover:bg-primary/5">
            Client Portal
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Get Free Assessment
          </Button>
        </div>
      </div>
    </nav>
  );
}
