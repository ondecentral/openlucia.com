import React, { useRef } from "react";
import { Info } from "lucide-react";

interface DemoDataTooltipProps {
  onShowDemoNotification: (source?: string) => void;
  className?: string;
  inline?: boolean; // New prop to control positioning mode
  source?: string;
}

const DemoDataTooltip: React.FC<DemoDataTooltipProps> = ({
  onShowDemoNotification,
  className = "",
  inline = false,
  source,
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      onShowDemoNotification(source);
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
      <div className={`group relative inline-block ${className}`}>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Info className="h-3 w-3 cursor-pointer text-gray-400 transition-colors group-hover:text-orange-500" />
        </div>
        <div className="absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
          DEMO DATA
        </div>
      </div>
    );
  }

  // Default mode for StatCard components (absolute positioning)
  return (
    <div className={`group absolute bottom-2 right-2 ${className}`}>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Info className="h-3 w-3 cursor-pointer text-gray-400 transition-colors group-hover:text-orange-500" />
      </div>
      <div className="absolute bottom-full right-0 z-10 mb-1 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
        DEMO DATA
      </div>
    </div>
  );
};

export default DemoDataTooltip;
