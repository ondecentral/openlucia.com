"use client";

import { useState, useEffect, useRef } from "react";
import VisitorDashboard from "./fingerprint-dashboard";

export default function FingerprintDashboardExample() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {!isExpanded ? (
          // Collapsed state - Button
          <div className="text-center">
            <div className="border-b [border-image:linear-gradient(to_right,transparent,theme(colors.stone.300/.8),transparent)1] pb-8">
              <button
                onClick={handleButtonClick}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                <span className="relative inline-flex items-center">
                  View Fingerprint Dashboard{" "}
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    <svg
                      width={20}
                      height={20}
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
                  </span>
                </span>
              </button>
            </div>
          </div>
        ) : (
          // Expanded state - Dashboard content
          <div className={`transition-all duration-500 ease-out ${
            isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.orange.300),theme(colors.orange.500),theme(colors.orange.400),theme(colors.orange.500),theme(colors.orange.300))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                  Fingerprint Dashboard
                </h2>
                <button
                  onClick={handleButtonClick}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                  aria-label="Close dashboard"
                >
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-lg text-gray-600">
                Comprehensive dashboard of visitor analytics.
              </p>
            </div>
            <div className="relative">
              <VisitorDashboard />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
