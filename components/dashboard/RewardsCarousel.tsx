import React from "react";
import { Info } from "lucide-react";

interface RewardsCarouselProps {
  currentReward: {
    symbol: string;
    value: string;
    icon: React.ReactNode;
  };
  onNavigate: (direction: "prev" | "next") => void;
}

const RewardsCarousel: React.FC<RewardsCarouselProps> = ({
  currentReward,
  onNavigate,
}) => {
  return (
    <div className="relative border-b border-gray-200 p-3 md:border-b-0 md:border-r">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => onNavigate("prev")}
          className="text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Previous reward"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className="text-xs font-semibold tracking-wider text-gray-400">
          REWARDS DISTRIBUTED
        </p>
        <button
          onClick={() => onNavigate("next")}
          className="text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Next reward"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="mt-1 flex items-center justify-center gap-2">
        {currentReward.icon}
        <p className="text-sm font-semibold text-gray-600">
          {currentReward.value}
        </p>
      </div>
      <div className="group absolute bottom-2 left-2">
        <Info className="h-3 w-3 cursor-help text-gray-400" />
        <div className="absolute bottom-full left-0 z-10 mb-1 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
          +18.9% (24h)
        </div>
      </div>
    </div>
  );
};

export default RewardsCarousel;
