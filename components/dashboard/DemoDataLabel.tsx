"use client";

import React, { useRef } from "react";
import { Info } from "lucide-react";

interface DemoDataLabelProps {
  className?: string;
  source?: string;
  onShowNotification: (source?: string) => void;
}

const DemoDataLabel: React.FC<DemoDataLabelProps> = ({
  className = "",
  source,
  onShowNotification,
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      onShowNotification(source);
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
      className={`group relative inline-flex cursor-help items-center gap-2 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-1.5">
        <Info className="h-3 w-3 text-gray-400 transition-colors group-hover:text-[#0029FF]" />
        <span className="text-xs font-semibold tracking-wider text-gray-400 transition-colors group-hover:text-[#0029FF]">
          DEMO DATA
        </span>
      </div>
    </div>
  );
};

export default DemoDataLabel;
