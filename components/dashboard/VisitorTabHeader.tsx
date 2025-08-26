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
      className="flex w-full cursor-pointer items-center justify-between bg-gray-50 p-2 transition-colors hover:bg-gray-100"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
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
            className="flex-shrink-0 text-gray-400 transition-colors hover:text-gray-600"
            title="Copy visitor ID"
          >
            <Copy className="h-3 w-3" />
          </button>
        </div>
        <span className="w-full text-left text-xs text-gray-500 sm:ml-0 sm:w-auto sm:text-left">
          {visitor.visit_time}
        </span>
      </div>

      <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
        <div
          className={`min-w-[60px] rounded border p-1 text-center ${
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
            className={`flex items-center justify-center gap-1 text-sm font-bold ${
              visitor.risk_level >= 80
                ? "text-red-500"
                : visitor.risk_level >= 50
                  ? "text-orange-500"
                  : "text-green-500"
            }`}
          >
            {visitor.risk_level} <TriangleAlert className="h-2.5 w-2.5" />
          </p>
        </div>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default VisitorTabHeader;
