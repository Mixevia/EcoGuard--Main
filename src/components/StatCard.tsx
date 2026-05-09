import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  status?: string;
  Icon: React.FC<{ size?: number; className?: string }>;
  color: string;
  fullWidth?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, value, unit, subtitle, status, Icon, color, fullWidth 
}) => {
  return (
    <div className={`${fullWidth ? 'col-span-2' : 'col-span-1'} bg-surface-container-lowest rounded-xl p-4 border border-outline-variant shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow`}>
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${color}`} />
      
      <div className="flex justify-between items-start mb-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center opacity-20 ${color.replace('bg-', 'bg-opacity-10 ')}`}>
          <Icon className={color.replace('bg-', 'text-')} size={18} />
        </div>
        {status && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${color.replace('bg-', 'bg-opacity-10 ').replace('bg-', 'text-')}`}>
            {status}
          </span>
        )}
      </div>

      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-on-surface">{value}</span>
          {unit && <span className="text-xs text-outline font-medium">{unit}</span>}
        </div>
        <div className="text-[11px] text-outline font-medium mt-0.5">{title}</div>
        {subtitle && (
          <div className={`text-[10px] font-bold mt-2 ${color.replace('bg-', 'text-')}`}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
