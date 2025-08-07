"use client";

import { useState, useEffect } from "react";
import Dashboard from "./dashboard";
import { sampleVisitors, dashboardStats } from "./dashboard-seed-data";

export default function DashboardDemo() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const handleOpenDashboard = () => {
    setIsDashboardOpen(true);
  };

  const handleCloseDashboard = () => {
    setIsDashboardOpen(false);
  };

  // Handle escape key to close dashboard
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDashboardOpen) {
        handleCloseDashboard();
      }
    };

    if (isDashboardOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isDashboardOpen]);

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <div className="border-b [border-image:linear-gradient(to_right,transparent,theme(colors.stone.300/.8),transparent)1] pb-6">
            {!isDashboardOpen ? (
              /* Demo Button */
              <button
                onClick={handleOpenDashboard}
                className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                <span className="relative inline-flex items-center">
                  Dashboard Demo{" "}
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    <svg
                      width={16}
                      height={16}
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
            ) : (
              /* Dashboard Content */
              <div className="relative bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                {/* Dashboard Header */}
                <div className="flex items-center justify-end p-2 border-b border-gray-200">
                  <button
                    onClick={handleCloseDashboard}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
                    aria-label="Close dashboard"
                  >
                    <svg
                      width={20}
                      height={20}
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

                {/* Dashboard Body */}
                <div className="max-h-[70vh] overflow-y-auto">
                  <div className="p-3 sm:p-4">
                    <Dashboard 
                      visitors={sampleVisitors}
                      totalVisits={dashboardStats.totalVisits}
                      totalIncognitoVisits={dashboardStats.totalIncognitoVisits}
                      totalUniqueIPs={dashboardStats.totalUniqueIPs}
                      totalUniqueGeolocations={dashboardStats.totalUniqueGeolocations}
                      totalWalletsDetected={dashboardStats.totalWalletsDetected}
                      totalLuciaRewards={dashboardStats.totalLuciaRewards}
                      totalAdsClicked={dashboardStats.totalAdsClicked}
                      totalClickIds={dashboardStats.totalClickIds}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
