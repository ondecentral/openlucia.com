'use client';

import React, { useRef } from 'react';
import { Info } from 'lucide-react';

interface DemoDataLabelProps {
  className?: string;
  onShowNotification: () => void;
}

const DemoDataLabel: React.FC<DemoDataLabelProps> = ({ className = '', onShowNotification }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      onShowNotification();
    }, 600);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <div
      className={`relative inline-flex items-center gap-2 cursor-help group ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-1.5">
        <Info className="w-3 h-3 text-gray-400 group-hover:text-orange-500 transition-colors" />
        <span className="text-xs text-gray-400 group-hover:text-orange-500 font-semibold tracking-wider transition-colors">
          DEMO DATA
        </span>
      </div>
    </div>
  );
};

export default DemoDataLabel;
