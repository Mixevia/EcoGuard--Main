import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Megaphone, ArrowUp, MessageSquare, Lightbulb, Edit3, ChevronRight, Recycle, ThumbsUp, MapPin, Filter, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { cn } from '../lib/utils';
import { CommunityReport } from '../types';

const districtData = [
  { name: 'Kampala', count: 854 },
  { name: 'Wakiso', count: 642 },
  { name: 'Mbarara', count: 312 },
  { name: 'Jinja', count: 285 },
  { name: 'Gulu', count: 198 },
];

const mockFeed: CommunityReport[] = [
  { id: '1', user: { name: 'Kirabo J.', avatar: 'https://i.pravatar.cc/150?u=kirabo' }, type: 'Illegal Dumping', location: 'Kyebando', votes: 156, time: '8m ago', description: 'Large scale plastic dumping observed near the local wetland area. Urgent cleanup needed.' },
  { id: '2', user: { name: 'Okello B.', avatar: 'https://i.pravatar.cc/150?u=okello' }, type: 'Deforestation', location: 'Nakasongola', votes: 89, time: '32m ago', description: 'Suspicious tree clearing activity in the protected forest reserve. Multiple sites affected.' },
  { id: '3', user: { name: 'Musiime P.', avatar: 'https://i.pravatar.cc/150?u=musiime' }, type: 'Water Pollution', location: 'Port Bell', votes: 42, time: '1h ago', description: 'Discoloration in the water near the landing site. Possible chemical runoff.' },
];

const MotionSection = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.section
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 0.4, delay }}
    className={className}
  >
    {children}
  </motion.section>
);

export const Community: React.FC = () => {
  const [filter, setFilter] = useState('All');
  
  const stats = [
    { label: 'Total Actions', value: '4,842', trend: '+18%', color: 'text-primary' },
    { label: 'Guardians', value: '1,560', trend: '+8%', color: 'text-blue-500' },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-on-surface tracking-tight">Community Hub</h1>
        <p className="text-sm text-outline font-medium">Power in numbers for Uganda's nature</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <MotionSection key={i} delay={i * 0.1}>
            <div className="bg-surface-container-low rounded-2xl p-5 shadow-sm border border-outline-variant h-full">
              <div className={cn("text-3xl font-black leading-tight", stat.color)}>{stat.value}</div>
              <div className="text-[10px] text-outline font-bold uppercase tracking-widest mt-1">{stat.label}</div>
              <div className="text-[10px] text-green-600 font-bold flex items-center gap-1 mt-3">
                <ArrowUp size={12} /> {stat.trend} increase
              </div>
            </div>
          </MotionSection>
        ))}
      </div>

      {/* Reports by District Chart */}
      <MotionSection delay={0.2}>
        <section className="bg-white rounded-[24px] p-6 border border-outline-variant shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-outline mb-6">Hot Spots by District</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="count" radius={[4, 4, 4, 4]} barSize={32}>
                  {districtData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#3DDB85' : 'var(--primary-container)'} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </MotionSection>

      {/* Feed Filters */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-outline">Action Feed</h3>
          <div className="flex items-center gap-2">
            <Search size={16} className="text-outline" />
            <Filter size={16} className="text-outline" />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
          {['All', 'Wakiso', 'Kampala', 'Albertine Rift'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-tight transition-all",
                filter === f ? "bg-accent-green text-surface shadow-md" : "bg-surface-container text-outline border border-outline-variant"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {mockFeed.map((report, idx) => (
            <MotionSection key={report.id} delay={idx * 0.1}>
              <div 
                className="bg-white rounded-[28px] p-5 shadow-sm border border-outline-variant space-y-4 active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={report.user.avatar} className="w-10 h-10 rounded-full border-2 border-primary/10" alt="" />
                    <div>
                      <h4 className="text-sm font-black text-on-surface leading-tight">{report.user.name}</h4>
                      <p className="text-[11px] text-outline font-bold">Resilience in {report.location}</p>
                    </div>
                  </div>
                  <div className="text-[10px] font-black text-outline uppercase">{report.time}</div>
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase border border-primary/10">
                    <Edit3 size={12} /> {report.type}
                  </div>
                  <p className="text-sm text-on-surface-variant font-medium leading-relaxed line-clamp-2">
                    {report.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button className="flex items-center gap-1.5 text-outline hover:text-primary transition-colors">
                    <ThumbsUp size={16} />
                    <span className="text-[11px] font-black">{report.votes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-outline hover:text-primary transition-colors">
                    <MessageSquare size={16} />
                    <span className="text-[11px] font-black">12 verifying</span>
                  </button>
                  <div className="ml-auto text-primary font-black text-[11px] flex items-center gap-1">
                    Details <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </MotionSection>
          ))}
        </div>
      </section>
    </div>
  );
};
