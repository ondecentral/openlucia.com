"use client";

import { useState, useEffect, useRef } from "react";
import { Code2, Info } from "lucide-react";
import Dashboard from "./dashboard/dashboard";
import { sampleVisitors, dashboardStats } from "./dashboard/dashboard-seed-data";
import DeveloperView from "./dashboard/developer-view";
import { BottomRightPopup, WarningModal, AcceptModal, CancelModal, ConfirmModal } from "@/components/opt-out";





export default function DashboardDemo() {
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isTooltipPinned, setIsTooltipPinned] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
        setIsTooltipPinned(false);
      }
    };

    if (isTooltipPinned) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTooltipPinned]);

  /**
   * Below are handlers for the opt out modals and popups
   */
  const handleOptOutClick = () => {
    setShowPopup(true);
  };

  const handleAccept = () => {
    setShowPopup(false);
    setShowAcceptModal(true);
  };

  const handleDeny = () => {
    setShowPopup(false);
    setShowWarning(true);
  };

  const handleConfirm = () => {
    setShowWarning(false);
    setShowConfirmModal(true);
  };

  const handleCancel = () => {
    setShowWarning(false);
    setShowCancelModal(true);
  };

  const handleBack = () => {
    setShowAcceptModal(false);
    setShowCancelModal(false);
    setShowConfirmModal(false);
  };

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-1 sm:px-6">
        <div className="text-center">
          <div className="border-b [border-image:linear-gradient(to_right,transparent,theme(colors.stone.300/.8),transparent)1] py-6">
            {/* Dashboard Content */}
            <div className="relative bg-white rounded-lg shadow-lg border border-gray-200">
              {/* Dashboard Header */}
              <div className="flex flex-col sm:grid sm:grid-cols-3 items-center p-2 border-b border-gray-200 gap-2 sm:gap-0">
                {/* Center section - DEMO VERSION on top for mobile */}
                <div className="flex justify-center w-full sm:col-start-2 order-1 sm:order-2">
                  <div className="text-gray-400 text-sm flex items-center gap-2">
                    DEMO VERSION
                    <div className="relative group">
                      <div 
                        className="rounded-full text-xs font-medium cursor-help hover:bg-gray-400 transition-colors flex items-center justify-center"
                        onMouseEnter={() => !isTooltipPinned && setShowTooltip(true)}
                        onMouseLeave={() => !isTooltipPinned && setShowTooltip(false)}
                        onClick={() => {
                          setIsTooltipPinned(!isTooltipPinned);
                          setShowTooltip(!isTooltipPinned);
                        }}
                      >
                        <Info className="w-3 h-3 text-gray-400 cursor-help" />
                      </div>
                      {showTooltip && (
                        <div 
                          ref={tooltipRef}
                          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-100 transition-opacity duration-200 whitespace-nowrap z-[9999]"
                        >
                          Full functionality available Q3 2025
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-gray-800"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Bottom row container for mobile */}
                <div className="flex justify-between items-center w-full sm:hidden order-2">
                  {/* Left side - Code icon and toggle */}
                  <div className="flex items-center gap-3">                
                    <Code2 className="w-4 h-4 text-gray-500" />
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={isDeveloper}
                        onChange={(e) => setIsDeveloper(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                  
                  {/* Right side - Demo opt out button */}
                  <button
                    onClick={handleOptOutClick}
                    className="px-3 py-1 text-sm text-gray-400 border border-orange-500 hover:bg-gray-700 hover:text-white rounded transition-colors"
                  >
                    DEMO OPT OUT
                  </button>
                </div>
                
                {/* Desktop layout - Left section */}
                <div className="hidden sm:flex items-center gap-3 w-full sm:w-auto justify-start order-2 sm:order-1">                
                  <Code2 className="w-4 h-4 text-gray-500" />
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={isDeveloper}
                      onChange={(e) => setIsDeveloper(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
                
                {/* Desktop layout - Right section */}
                <div className="hidden sm:flex justify-end w-full sm:w-auto order-3">
                  <button
                    onClick={handleOptOutClick}
                    className="px-3 py-1 text-sm text-gray-400 border border-orange-500 hover:bg-gray-700 hover:text-white rounded transition-colors"
                  >
                    DEMO OPT OUT
                  </button>
                </div>
              </div>

              {/* Dashboard Demo Body */}
              <div className="max-h-[70vh] overflow-y-auto">
                <div className="p-3 sm:p-4">
                  {isDeveloper ? (
                    <DeveloperView />
                  ) : (
                    <Dashboard 
                      visitors={sampleVisitors}
                      totalVisits={dashboardStats.totalVisits}
                      totalIncognitoVisits={dashboardStats.totalIncognitoVisits}
                      totalUniqueIPs={dashboardStats.totalUniqueIPs}
                      totalUniqueGeolocations={dashboardStats.totalUniqueGeolocations}
                      totalWalletsDetected={dashboardStats.totalWalletsDetected}                  
                      totalUSDTRewards={dashboardStats.totalUSDTRewards}
                      totalSOLRewards={dashboardStats.totalSOLRewards}
                      totalETHRewards={dashboardStats.totalETHRewards}
                      totalAdsClicked={dashboardStats.totalAdsClicked}
                      totalClickIds={dashboardStats.totalClickIds}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popups and Modals */}
      {showPopup && (
        <BottomRightPopup onAccept={handleAccept} onDeny={handleDeny} />
      )}
      {showWarning && (
        <WarningModal onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
      {showAcceptModal && (
        <AcceptModal onBack={handleBack} />
      )}
      {showCancelModal && (
        <CancelModal onBack={handleBack} />
      )}
      {showConfirmModal && (
        <ConfirmModal onBack={handleBack} />
      )}
    </section>
  );
}
