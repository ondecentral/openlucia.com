import React from "react";

interface VisitsCarouselProps {
  currentVisit: {
    title: string;
    value: number;
    icon: React.ReactNode;
  };
  onNavigate: (direction: "prev" | "next") => void;
}

const VisitsCarousel: React.FC<VisitsCarouselProps> = ({
  currentVisit,
  onNavigate,
}) => {
  return (
    <div className="relative border-b border-r border-gray-200 p-3 md:border-b-0">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => onNavigate("prev")}
          className="text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Previous visit type"
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
          {currentVisit.title}
        </p>
        <button
          onClick={() => onNavigate("next")}
          className="text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Next visit type"
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
        {currentVisit.icon}
        <p className="text-sm font-semibold text-gray-600">
          {currentVisit.value.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default VisitsCarousel;
