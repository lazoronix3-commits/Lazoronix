
'use client';

import { Shield } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function Footer() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    const { data } = supabase.storage
      .from('assets')
      .getPublicUrl('logo.png');
    
    if (data?.publicUrl) {
      setLogoUrl(`${data.publicUrl}?t=${Date.now()}`);
    }
  };

  return (
    <footer id="contact" className="bg-card border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center overflow-hidden">
                {logoUrl ? (
                  <img 
                    src={logoUrl} 
                    alt="Logo" 
                    className="w-full h-full object-contain"
                    onError={() => setLogoUrl(null)}
                  />
                ) : (
                  <Shield className="text-white w-5 h-5" />
                )}
              </div>
              <span className="text-xl font-headline font-bold">LAZORONIX</span>
            </Link>
            <p className="text-muted-foreground text-[11px] leading-relaxed mb-6 uppercase tracking-wider opacity-70">
              Professional digital asset recovery and blockchain forensics specialists. Providing institutional-grade evidence analysis for complex asset recovery challenges.
            </p>
          </div>
          
          <div>
            <h5 className="text-xs font-headline font-bold mb-6 text-foreground uppercase tracking-[0.3em]">Services</h5>
            <ul className="space-y-4 text-xs text-muted-foreground font-medium">
              <li><Link href="#services" className="hover:text-primary transition-colors">Forex Scam Recovery</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Investment Scam Recovery</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Romance Scam Recovery</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Job Scam Recovery</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Wallet Recovery</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-xs font-headline font-bold mb-6 text-foreground uppercase tracking-[0.3em]">Company</h5>
            <ul className="space-y-4 text-xs text-muted-foreground font-medium">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#process" className="hover:text-primary transition-colors">Methodology</Link></li>
              <li><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-headline font-bold mb-6 text-foreground uppercase tracking-[0.3em]">Resources</h5>
            <ul className="space-y-4 text-xs text-muted-foreground font-medium">
              <li><Link href="#" className="hover:text-primary transition-colors">Recovery Guides</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Scam Awareness</Link></li>
              <li><Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-xs font-headline font-bold mb-6 text-foreground uppercase tracking-[0.3em]">Legal</h5>
            <ul className="space-y-4 text-xs text-muted-foreground font-medium">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Lazoronix Recovery. All rights reserved. 
          </p>
          <div className="flex gap-6">
            <p className="text-[9px] text-muted-foreground max-w-md text-left md:text-right leading-relaxed italic uppercase tracking-[0.1em] opacity-50">
              Technical Note: Digital asset recovery involves inherent risks and jurisdictional complexity. Every investigation requires a formal forensic review phase prior to engagement.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
