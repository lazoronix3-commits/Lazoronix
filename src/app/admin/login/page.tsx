
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push('/admin');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: error.message || 'Invalid credentials.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md glass-card border-primary/20">
        <CardHeader className="text-center space-y-4 pt-10">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline font-bold uppercase tracking-tighter">
            Forensic Portal
          </CardTitle>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
            Restricted Access | Authorization Required
          </p>
        </CardHeader>
        <CardContent className="p-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Admin Email</Label>
              <Input
                type="email"
                placeholder="investigator@lazoronix.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-white/10 rounded-none"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Access Key</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50 border-white/10 rounded-none"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-none hover:bg-primary/90"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Decrypt & Enter'}
            </Button>
          </form>
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-[8px] text-muted-foreground uppercase tracking-[0.4em] flex items-center justify-center gap-2">
              <Lock className="w-3 h-3" /> Encrypted Session Active
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
