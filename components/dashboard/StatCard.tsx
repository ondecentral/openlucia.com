import React, { ReactNode } from 'react';
import { Info } from 'lucide-react';

interface StatCardProps {
  title: string;
  value?: string | number;
  icon: ReactNode;
  tooltip: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, tooltip, className = '' }) => {
  return (
    <div className={`p-3 border-r border-b md:border-b-0 border-gray-200 relative ${className}`}>
      <p className="text-xs text-gray-400 font-semibold tracking-wider">{title}</p>
      <div className="flex justify-center items-center gap-2 mt-1">
        {icon}
        <p className="text-sm font-semibold text-gray-600">{value}</p>
      </div>
      <div className="absolute bottom-2 left-2 group">
        <Info className="w-3 h-3 text-gray-400 cursor-help" />
        <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
          {tooltip}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
