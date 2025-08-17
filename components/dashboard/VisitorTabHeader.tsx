import React from "react";
import { Copy, ChevronDown, TriangleAlert } from "lucide-react";
import { VisitorData } from "./dashboard-seed-data";

interface VisitorTabHeaderProps {
  visitor: VisitorData;
  isExpanded: boolean;
  onToggle: () => void;
  onCopyToClipboard: (text: string) => void;
}

const VisitorTabHeader: React.FC<VisitorTabHeaderProps> = ({
  visitor,
  isExpanded,
  onToggle,
  onCopyToClipboard,
}) => {
  return (
    <div
      onClick={onToggle}
      className="w-full p-2 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-medium text-gray-700 md:truncate">
            <span className="hidden md:inline">{visitor.visitor_id}</span>
            <span className="hidden min-[360px]:inline md:hidden">
              {visitor.visitor_id.slice(0, 4)}...{visitor.visitor_id.slice(-4)}
            </span>
            <span className="inline min-[360px]:hidden">
              ...{visitor.visitor_id.slice(-4)}
            </span>
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopyToClipboard(visitor.visitor_id);
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            title="Copy visitor ID"
          >
            <Copy className="w-3 h-3" />
          </button>
        </div>
        <span className="text-xs text-gray-500 w-full text-left sm:w-auto sm:text-left sm:ml-0">
          {visitor.visit_time}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <div
          className={`border p-1 rounded text-center min-w-[60px] ${
            visitor.risk_level >= 80
              ? "border-red-500"
              : visitor.risk_level >= 50
                ? "border-orange-500"
                : "border-green-500"
          }`}
        >
          <p
            className={`text-xs font-semibold ${
              visitor.risk_level >= 80
                ? "text-red-500"
                : visitor.risk_level >= 50
                  ? "text-orange-500"
                  : "text-green-500"
            }`}
          >
            RISK LEVEL
          </p>
          <p
            className={`text-sm font-bold flex items-center justify-center gap-1 ${
              visitor.risk_level >= 80
                ? "text-red-500"
                : visitor.risk_level >= 50
                  ? "text-orange-500"
                  : "text-green-500"
            }`}
          >
            {visitor.risk_level} <TriangleAlert className="w-2.5 h-2.5" />
          </p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default VisitorTabHeader;
