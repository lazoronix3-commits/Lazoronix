import Link from 'next/link';
import {Shield} from 'lucide-react';
import {Button} from '@/components/ui/button';

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
          <Link href="#services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
          <Link href="#process" className="text-sm font-medium hover:text-primary transition-colors">Methodology</Link>
          <Link href="#why-us" className="text-sm font-medium hover:text-primary transition-colors">Why Lazoronix</Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:inline-flex border-primary/20 hover:bg-primary/5">
            Log In
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Start Assessment
          </Button>
        </div>
      </div>
    </nav>
  );
}
