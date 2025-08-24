import React from "react";
import { Info, Smartphone, Monitor } from "lucide-react";

interface DeviceViewsCarouselProps {
  currentDevice: {
    title: string;
    value: number;
    icon: React.ReactNode;
    tooltip: string;
  };
  onNavigate: (direction: "prev" | "next") => void;
}

const DeviceViewsCarousel: React.FC<DeviceViewsCarouselProps> = ({
  currentDevice,
  onNavigate,
}) => {
  return (
    <div className="relative border-b border-r border-gray-200 p-3 md:border-b-0">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => onNavigate("prev")}
          className="text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Previous device type"
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
          {currentDevice.title}
        </p>
        <button
          onClick={() => onNavigate("next")}
          className="text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Next device type"
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
        {currentDevice.icon}
        <p className="text-sm font-semibold text-gray-600">
          {currentDevice.value.toLocaleString()}
        </p>
      </div>
      <div className="group absolute bottom-2 left-2">
        <Info className="h-3 w-3 cursor-help text-gray-400" />
        <div className="absolute bottom-full left-0 z-10 mb-1 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
          {currentDevice.tooltip}
        </div>
      </div>
    </div>
  );
};

export default DeviceViewsCarousel;
