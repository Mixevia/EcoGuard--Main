import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Wind, Flame, Droplets, Trees, MapPin, 
  ChevronRight, ArrowRight, ThumbsUp, 
  MessageSquare, AlertCircle, CheckCircle2,
  FileText
} from 'lucide-react';
import { 
  LineChart, Line, ResponsiveContainer, 
  AreaChart, Area, XAxis 
} from 'recharts';
import { ScreenTypeProps } from '../types';
import { Skeleton } from '../components/ui/Skeleton';

const sparkData = [
  { v: 40 }, { v: 45 }, { v: 38 }, { v: 52 }, { v: 42 }, { v: 48 }, { v: 42 }
];

const areaData = [
  { n: 'M', v: 20 }, { n: 'T', v: 35 }, { n: 'W', v: 25 }, 
  { n: 'T', v: 45 }, { n: 'F', v: 30 }, { n: 'S', v: 55 }, { n: 'S', v: 40 }
];

const alerts = [
  { id: '1', type: 'fire', icon: Flame, loc: 'Bwindi Impenetrable', time: '15m ago', color: 'text-orange-500 bg-orange-500/10' },
  { id: '2', type: 'flood', icon: Droplets, loc: 'Bundibugyo', time: '2h ago', color: 'text-blue-500 bg-blue-500/10' },
  { id: '3', type: 'trees', icon: Trees, loc: 'Entebbe Peninsula', time: '4h ago', color: 'text-green-500 bg-green-500/10' },
];

const communityActivity = [
  { id: '1', user: 'Kirabo J.', avatar: 'https://i.pravatar.cc/150?u=kirabo', type: 'Wetland Encroachment', loc: 'Kyebando', votes: 156, time: '8m ago' },
  { id: '2', user: 'Okello B.', avatar: 'https://i.pravatar.cc/150?u=okello', type: 'Charcoal Burning', loc: 'Nakasongola', votes: 89, time: '32m ago' },
  { id: '3', user: 'Musiime P.', avatar: 'https://i.pravatar.cc/150?u=musiime', type: 'Plastic Clogging', loc: 'Port Bell', votes: 42, time: '1h ago' },
];

const MotionSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.section
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 0.4, delay }}
  >
    {children}
  </motion.section>
);

export const Dashboard: React.FC<ScreenTypeProps> = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-48 w-full rounded-[24px]" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-24 mx-1" />
          <div className="flex gap-3 overflow-hidden">
            <Skeleton className="h-20 w-48 shrink-0 rounded-2xl" />
            <Skeleton className="h-20 w-48 shrink-0 rounded-2xl" />
          </div>
        </div>
        <Skeleton className="h-28 w-full rounded-[24px]" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-32 mx-1" />
          <div className="flex flex-col gap-3">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* SECTION A: Hero Card */}
      <MotionSection>
        <div className="bg-surface-container-lowest rounded-[24px] p-5 shadow-sm border border-outline-variant relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 text-outline mb-1">
                <MapPin size={14} />
                <span className="text-xs font-bold uppercase tracking-widest">Kampala, Central</span>
              </div>
              <h2 className="text-4xl font-black text-on-surface tracking-tighter">18</h2>
              <div className="mt-2 inline-flex items-center bg-accent-green/10 text-accent-green px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border border-accent-green/20">
                Excellent Air Quality
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-outline uppercase">Reports Filed</span>
              <p className="text-[11px] font-black text-on-surface">2,847 Today</p>
            </div>
          </div>
          
          <div className="h-16 w-full -mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparkData}>
                <Line type="monotone" dataKey="v" stroke="#3DDB85" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </MotionSection>

      {/* SECTION B: Active Alerts Strip */}
      <MotionSection delay={0.1}>
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-outline px-1">Critical Alerts</h3>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex-shrink-0 flex items-center gap-3 bg-white p-3 pr-5 rounded-2xl border border-outline-variant shadow-sm active:scale-95 transition-all">
                <div className={`p-2 rounded-xl ${alert.color}`}>
                  <alert.icon size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[11px] font-black text-on-surface leading-tight">{alert.loc}</div>
                  <div className="text-[10px] font-bold text-outline">{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* SECTION C: Quick Report Button */}
      <MotionSection delay={0.2}>
        <button 
          onClick={() => onNavigate('REPORT')}
          className="w-full bg-primary text-white p-6 rounded-[24px] shadow-lg shadow-primary/20 flex items-center justify-between group active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <FileText size={24} strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-black leading-tight">Secure Wildlife Report</h3>
              <p className="text-xs text-white/70 font-medium tracking-tight">Direct line to NEMA/UWA responders</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight size={20} strokeWidth={3} />
          </div>
        </button>
      </MotionSection>

      {/* SECTION D: Recent Community Activity */}
      <MotionSection delay={0.3}>
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-outline">Action Feed</h3>
            <button onClick={() => onNavigate('COMMUNITY')} className="text-[10px] font-black text-primary uppercase">View Community</button>
          </div>
          <div className="flex flex-col gap-3">
            {communityActivity.map((item) => (
              <div key={item.id} className="bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant flex items-center gap-4 group hover:bg-white hover:shadow-md transition-all">
                <img src={item.avatar} alt={item.user} className="w-10 h-10 rounded-full border-2 border-primary/10" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-black text-on-surface mb-0.5 truncate">{item.type}</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-outline font-bold">
                    <MapPin size={10} className="text-primary" /> {item.loc} • {item.time}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-0.5 bg-white p-2 rounded-xl border border-outline-variant shadow-sm">
                  <ThumbsUp size={12} className="text-primary" />
                  <span className="text-[10px] font-black text-on-surface">{item.votes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* SECTION E: Impact Stats Row */}
      <MotionSection delay={0.4}>
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-surface-container-low rounded-2xl p-4 flex flex-col justify-between h-32 border border-outline-variant">
            <div className="text-2xl font-black text-on-surface">4.8k</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-outline leading-tight">Verified Reports</div>
            <div className="mt-2 text-[9px] font-bold text-primary flex items-center gap-1">
              <CheckCircle2 size={10} /> +18%
            </div>
          </div>
          <div className="bg-white rounded-2xl p-0 flex flex-col justify-between h-32 border border-outline-variant overflow-hidden shadow-sm relative">
            <div className="p-4 relative z-10">
              <div className="text-2xl font-black text-accent-green">94%</div>
              <div className="text-[9px] font-black uppercase tracking-widest text-outline leading-tight">Resolve Rate</div>
            </div>
            <div className="absolute inset-0 top-12 opacity-30">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <Area type="monotone" dataKey="v" stroke="#3DDB85" fill="#3DDB85" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-error-container/20 rounded-2xl p-4 flex flex-col justify-between h-32 border border-error-container/50">
            <div className="text-2xl font-black text-error">12</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-error/60 leading-tight">Hot Zones</div>
            <div className="mt-2 text-[9px] font-bold text-error flex items-center gap-1">
               <AlertCircle size={10} /> MONITORING
            </div>
          </div>
        </div>
      </MotionSection>
    </div>
  );
};
