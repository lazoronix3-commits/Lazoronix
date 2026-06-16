'use client';

import { Shield } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

export function Footer() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
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
    <footer id="contact" className="bg-card border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className={cn(
                "w-12 h-12 rounded flex items-center justify-center transition-all overflow-hidden",
                logoUrl ? "bg-transparent p-1" : "bg-primary shadow-lg"
              )}>
                {logoUrl ? (
                  <img 
                    src={logoUrl} 
                    alt="Logo" 
                    className="w-full h-full object-contain"
                    onError={() => setLogoUrl(null)}
                  />
                ) : (
                  <Shield className="text-white w-7 h-7" />
                )}
              </div>
              <span className="text-xl font-headline font-bold">LAZORONIX</span>
            </Link>
            <p className="text-muted-foreground text-[10px] leading-relaxed mb-6 uppercase tracking-wider opacity-70 font-bold">
              Institutional Digital Asset Intelligence & Investigation Firm. Specialized forensic rigor for complex financial fraud and asset resolution.
            </p>
          </div>
          
          <div>
            <h5 className="text-[10px] font-black mb-6 text-foreground uppercase tracking-[0.3em]">Divisions</h5>
            <ul className="space-y-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              <li><Link href="#services" className="hover:text-primary transition-colors">Trading Fraud Division</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Investment Fraud Division</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Social Engineering Division</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Asset Tracing Division</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Access Recovery Division</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-[10px] font-black mb-6 text-foreground uppercase tracking-[0.3em]">Integrity</h5>
            <ul className="space-y-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              <li><Link href="#preservation" className="hover:text-primary transition-colors">Preservation Protocols</Link></li>
              <li><Link href="#process" className="hover:text-primary transition-colors">Methodology</Link></li>
              <li><Link href="#forensic-intake" className="hover:text-primary transition-colors">Evidence Portal</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-black mb-6 text-foreground uppercase tracking-[0.3em]">Intelligence</h5>
            <ul className="space-y-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              <li><Link href="#faq" className="hover:text-primary transition-colors">Knowledge Base</Link></li>
              <li><Link href="#success-stories" className="hover:text-primary transition-colors">Forensic Records</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Technical Briefs</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-[10px] font-black mb-6 text-foreground uppercase tracking-[0.3em]">Compliance</h5>
            <ul className="space-y-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Protocols</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Institutional Terms</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Legal Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Lazoronix Intelligence. All rights reserved. 
          </p>
          <div className="flex gap-6">
            <p className="text-[9px] text-muted-foreground max-w-md text-left md:text-right leading-relaxed italic uppercase tracking-[0.1em] opacity-50 font-bold">
              Technical Note: Digital asset investigation involves inherent jurisdictional complexity. Every lifecycle requires formal forensic review prior to departmental engagement.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
