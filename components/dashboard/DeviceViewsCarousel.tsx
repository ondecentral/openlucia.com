import React from 'react';
import { Info, Smartphone, Monitor } from 'lucide-react';

interface DeviceViewsCarouselProps {
  currentDevice: {
    title: string;
    value: number;
    icon: React.ReactNode;
    tooltip: string;
  };
  onNavigate: (direction: 'prev' | 'next') => void;
}

const DeviceViewsCarousel: React.FC<DeviceViewsCarouselProps> = ({ currentDevice, onNavigate }) => {
  return (
    <div className="p-3 border-r border-b md:border-b-0 border-gray-200 relative">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => onNavigate('prev')}
          className="text-gray-400 hover:text-gray-600 transition-colors"
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
        <p className="text-xs text-gray-400 font-semibold tracking-wider">{currentDevice.title}</p>
        <button
          onClick={() => onNavigate('next')}
          className="text-gray-400 hover:text-gray-600 transition-colors"
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
      <div className="flex justify-center items-center gap-2 mt-1">
        {currentDevice.icon}
        <p className="text-sm font-semibold text-gray-600">
          {currentDevice.value.toLocaleString()}
        </p>
      </div>
      <div className="absolute bottom-2 left-2 group">
        <Info className="w-3 h-3 text-gray-400 cursor-help" />
        <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
          {currentDevice.tooltip}
        </div>
      </div>
    </div>
  );
};

export default DeviceViewsCarousel;
