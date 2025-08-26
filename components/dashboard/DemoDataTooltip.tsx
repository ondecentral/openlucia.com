import React, { useRef } from 'react';
import { Info } from 'lucide-react';

interface DemoDataTooltipProps {
  onShowDemoNotification: () => void;
  className?: string;
  inline?: boolean; // New prop to control positioning mode
}

const DemoDataTooltip: React.FC<DemoDataTooltipProps> = ({
  onShowDemoNotification,
  className = '',
  inline = false,
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      onShowDemoNotification();
    }, 600);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  if (inline) {
    // Inline mode for use within text flows
    return (
      <div className={`relative inline-block group ${className}`}>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Info className="w-3 h-3 text-gray-400 group-hover:text-orange-500 cursor-pointer transition-colors" />
        </div>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
          DEMO DATA
        </div>
      </div>
    );
  }

  // Default mode for StatCard components (absolute positioning)
  return (
    <div className={`absolute bottom-2 right-2 group ${className}`}>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Info className="w-3 h-3 text-gray-400 group-hover:text-orange-500 cursor-pointer transition-colors" />
      </div>
      <div className="absolute bottom-full right-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
        DEMO DATA
      </div>
    </div>
  );
};

export default DemoDataTooltip;
