
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  Shield, 
  Activity, 
  FileText, 
  ChevronRight, 
  User, 
  Globe, 
  Clock, 
  LogOut, 
  Search,
  ArrowUpDown,
  Filter,
  Eye,
  Trash2,
  MoreVertical,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';

type CaseRecord = {
  id: string;
  case_id: string;
  case_type: string;
  user_name: string;
  user_email: string;
  user_country: string;
  risk_level: string;
  evidence_integrity: string;
  status: string;
  created_at: string;
  description: string;
  result_data: any;
  form_values: any;
};

export default function AdminDashboard() {
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchCases();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
    }
  };

  const fetchCases = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching cases:', error);
    } else {
      setCases(data || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const deleteCase = async (id: string) => {
    if (confirm('Permanently delete this forensic record?')) {
      const { error } = await supabase.from('cases').delete().eq('id', id);
      if (!error) {
        setCases(cases.filter(c => c.id !== id));
      }
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Admin Nav */}
      <nav className="h-20 border-b border-white/5 bg-card/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-primary flex items-center justify-center">
            <Shield className="text-black w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-headline font-bold tracking-tight uppercase">Command Center</h1>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Forensic Management Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Intelligence Stream</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      <div className="p-8 max-w-[1600px] mx-auto space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Investigations', value: cases.length, icon: FileText },
            { label: 'Critical Risk Cases', value: cases.filter(c => c.risk_level === 'Critical').length, icon: AlertCircle, color: 'text-destructive' },
            { label: 'High Trust Assets', value: cases.filter(c => c.evidence_integrity === 'Substantial').length, icon: Shield, color: 'text-primary' },
            { label: 'Pending Verification', value: cases.filter(c => c.status === 'Review Pending').length, icon: Clock, color: 'text-secondary' },
          ].map((stat, i) => (
            <Card key={i} className="glass-card border-white/5 hover:border-primary/20 transition-all p-8">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded">
                  <stat.icon className={`w-5 h-5 ${stat.color || 'text-muted-foreground'}`} />
                </div>
                <Badge variant="outline" className="border-white/10 text-[9px] uppercase tracking-widest">Live</Badge>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
              <h3 className="text-3xl font-headline font-bold">{stat.value}</h3>
            </Card>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              placeholder="Search Case ID or Participant..."
              className="w-full h-12 bg-card/50 border border-white/5 rounded-none pl-12 pr-4 text-sm focus:border-primary/50 outline-none transition-colors"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-12 border-white/5 bg-card/50 uppercase text-[10px] font-black tracking-widest">
              <Filter className="w-3.5 h-3.5 mr-2" /> Filters
            </Button>
            <Button onClick={fetchCases} variant="outline" className="h-12 border-white/5 bg-card/50 uppercase text-[10px] font-black tracking-widest">
              Refresh Node
            </Button>
          </div>
        </div>

        {/* Table Area */}
        <Card className="glass-card border-white/5 overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="hover:bg-transparent border-white/5">
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-6 px-8">Case Identity</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Participant</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Category</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-center">Risk Factor</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-center">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-right px-8">Operation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Synchronizing Records...</p>
                  </TableCell>
                </TableRow>
              ) : cases.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">No Investigative Records Found</p>
                  </TableCell>
                </TableRow>
              ) : (
                cases.map((c) => (
                  <TableRow key={c.id} className="border-white/5 hover:bg-white/[0.02] group transition-colors">
                    <TableCell className="py-6 px-8">
                      <div className="flex items-center gap-3">
                        <Fingerprint className="w-4 h-4 text-primary" />
                        <div>
                          <p className="font-bold text-sm text-white">{c.case_id}</p>
                          <p className="text-[9px] text-muted-foreground uppercase tracking-widest">
                            {new Date(c.created_at).toLocaleDateString()} @ {new Date(c.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <User className="w-3.5 h-3.5 opacity-50" />
                        <div>
                          <p className="text-xs font-medium text-foreground">{c.user_name}</p>
                          <p className="text-[10px] text-muted-foreground">{c.user_email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-white/10 text-[9px] font-black uppercase tracking-widest bg-white/5">
                        {c.case_type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          c.risk_level === 'Critical' ? 'bg-destructive animate-pulse' : 
                          c.risk_level === 'High' ? 'bg-primary/70' : 'bg-primary'
                        )} />
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-widest",
                          c.risk_level === 'Critical' ? 'text-destructive' : 'text-foreground'
                        )}>{c.risk_level}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] uppercase tracking-widest">
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <div className="flex items-center justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9 border-white/5 bg-white/5 hover:bg-primary hover:text-black uppercase text-[9px] font-black tracking-widest">
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-white/10 p-0">
                            <DialogHeader className="p-8 border-b border-white/5 bg-card/50">
                              <DialogTitle className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                  <div className="p-3 bg-primary/10 rounded">
                                    <FileText className="w-6 h-6 text-primary" />
                                  </div>
                                  <div>
                                    <h2 className="text-2xl font-headline font-bold uppercase tracking-tight">Investigation Brief</h2>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Case #{c.case_id}</p>
                                  </div>
                                </div>
                                <Badge className="bg-primary text-black uppercase tracking-widest text-[10px] py-1.5 px-4">{c.status}</Badge>
                              </DialogTitle>
                            </DialogHeader>
                            <div className="p-8 space-y-12">
                              {/* Summary Section */}
                              <div className="grid md:grid-cols-3 gap-8">
                                <div className="space-y-4">
                                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"><User className="w-3.5 h-3.5" /> Participant Details</h4>
                                  <div className="p-6 bg-white/5 border border-white/5 space-y-3">
                                    <div><p className="text-[9px] text-muted-foreground uppercase">Full Name</p><p className="text-sm font-bold">{c.user_name}</p></div>
                                    <div><p className="text-[9px] text-muted-foreground uppercase">Email</p><p className="text-sm font-bold">{c.user_email}</p></div>
                                    <div><p className="text-[9px] text-muted-foreground uppercase">Phone</p><p className="text-sm font-bold">{c.user_phone}</p></div>
                                    <div><p className="text-[9px] text-muted-foreground uppercase">Location</p><p className="text-sm font-bold">{c.user_country}</p></div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"><Activity className="w-3.5 h-3.5" /> Intake Metrics</h4>
                                  <div className="p-6 bg-white/5 border border-white/5 space-y-3">
                                    <div><p className="text-[9px] text-muted-foreground uppercase">Risk Factor</p><p className="text-sm font-bold uppercase text-primary">{c.risk_level}</p></div>
                                    <div><p className="text-[9px] text-muted-foreground uppercase">Evidence Status</p><p className="text-sm font-bold uppercase">{c.evidence_integrity}</p></div>
                                    <div><p className="text-[9px] text-muted-foreground uppercase">Preferred Method</p><p className="text-sm font-bold uppercase">{c.preferred_method} ({c.best_contact_time})</p></div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"><Target className="w-3.5 h-3.5" /> Platform Data</h4>
                                  <div className="p-6 bg-white/5 border border-white/5 space-y-3">
                                    {Object.entries(c.form_values || {}).map(([key, val]: any) => (
                                      <div key={key}>
                                        <p className="text-[9px] text-muted-foreground uppercase">{key.replace(/([A-Z])/g, ' $1')}</p>
                                        <p className="text-sm font-bold">{val}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* AI Narrative Section */}
                              <div className="space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"><Search className="w-3.5 h-3.5" /> Technical Narrative</h4>
                                <div className="p-8 bg-card border border-white/10 italic text-sm text-foreground/80 leading-relaxed border-l-2 border-l-primary">
                                  "{c.description}"
                                </div>
                                {c.result_data?.recoveryScenarioSummary && (
                                  <div className="p-8 bg-primary/5 border border-primary/20 text-xs font-bold uppercase tracking-widest text-primary leading-relaxed">
                                    AI Summary: {c.result_data.recoveryScenarioSummary}
                                  </div>
                                )}
                              </div>

                              {/* AI Findings Grid */}
                              {c.result_data?.preliminaryCaseFindings && (
                                <div className="space-y-6">
                                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5" /> AI Forensic Findings</h4>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {Object.entries(c.result_data.preliminaryCaseFindings).map(([key, val]: any) => (
                                      <div key={key} className="p-4 bg-white/5 border border-white/5">
                                        <p className="text-[8px] text-muted-foreground uppercase mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                                        <p className="text-[11px] font-bold uppercase">{val}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Roadmap */}
                              {c.result_data?.investigativeFocusAreas && (
                                <div className="space-y-6">
                                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"><Network className="w-3.5 h-3.5" /> Suggested Roadmap</h4>
                                  <div className="grid md:grid-cols-2 gap-4">
                                    {c.result_data.investigativeFocusAreas.map((area: any, i: number) => (
                                      <div key={i} className="p-6 bg-white/5 border border-white/5 space-y-3">
                                        <h5 className="text-[11px] font-black uppercase tracking-widest text-primary">{area.categoryName}</h5>
                                        <p className="text-[10px] text-muted-foreground leading-relaxed uppercase">{area.description}</p>
                                        <ul className="space-y-1 pt-2 border-t border-white/5">
                                          {area.specificItems.map((item: string, j: number) => (
                                            <li key={j} className="text-[9px] font-bold text-foreground/60 flex items-center gap-2">
                                              <ChevronRight className="w-3 h-3 text-primary" /> {item}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-white/5">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card border-white/10 shadow-2xl w-48">
                            <DropdownMenuItem className="py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-primary/10 hover:text-primary">
                              <Activity className="w-3.5 h-3.5 mr-2" /> Mark Investigating
                            </DropdownMenuItem>
                            <DropdownMenuItem className="py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-emerald-500/10 hover:text-emerald-500">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-2" /> Mark Resolved
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => deleteCase(c.id)}
                              className="py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Record
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Decorative Atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/[0.01] rounded-full blur-[120px]" />
      </div>
    </main>
  );
}
