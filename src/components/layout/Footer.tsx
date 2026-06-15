import { Shield } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-card border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <Shield className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-headline font-bold">LAZORONIX</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Professional digital asset recovery and blockchain forensics specialists. Evidence-based solutions for complex asset recovery challenges.
            </p>
          </div>
          
          <div>
            <h5 className="font-headline font-bold mb-6">Services</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Wallet Access Recovery</Link></li>
              <li><Link href="#" className="hover:text-primary">Transaction Analysis</Link></li>
              <li><Link href="#" className="hover:text-primary">Asset Verification</Link></li>
              <li><Link href="#" className="hover:text-primary">Security Investigations</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-headline font-bold mb-6">Company</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Expert Team</Link></li>
              <li><Link href="#" className="hover:text-primary">Confidentiality Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-headline font-bold mb-6">Legal</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Lazoronix Recovery. All rights reserved. 
            Digital asset recovery involves risks. Always perform your own due diligence.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-muted-foreground hover:text-primary"><Shield className="w-5 h-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Shield className="w-5 h-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
