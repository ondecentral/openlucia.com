import React, { ReactNode } from "react";
import { Info } from "lucide-react";
import DemoDataTooltip from "./DemoDataTooltip";

interface StatCardProps {
  title: string;
  value?: string | number;
  icon: ReactNode;
  tooltip?: string;
  className?: string;
  isDemoData?: boolean;
  onShowDemoNotification?: () => void;
}

const StatCard: React.FC = ({
  title,
  value,
  icon,
  tooltip,
  className = "",
  isDemoData = false,
  onShowDemoNotification,
}) => {
  return (
    <div
      className={`relative border-b border-r border-gray-200 p-3 md:border-b-0 ${className}`}
    >
      <p className="text-xs font-semibold tracking-wider text-gray-400">
        {title}
      </p>
      <div className="mt-1 flex items-center justify-center gap-2">
        {icon}
        <p className="text-sm font-semibold text-gray-600">{value}</p>
      </div>

      {/* Tooltip - either regular tooltip or demo data tooltip */}
      {tooltip && (
        <div className="group absolute bottom-2 left-2">
          <Info className="h-3 w-3 cursor-help text-gray-400" />
          <div className="absolute bottom-full left-0 z-10 mb-1 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            {tooltip}
          </div>
        </div>
      )}

      {/* Demo Data Tooltip */}
      {isDemoData && onShowDemoNotification && (
        <DemoDataTooltip onShowDemoNotification={onShowDemoNotification} />
      )}
    </div>
  );
};

export default StatCard;
