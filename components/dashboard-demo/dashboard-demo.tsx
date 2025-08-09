"use client";

import { useState } from "react";
import { Code2 } from "lucide-react";
import Dashboard from "./dashboard";
import { sampleVisitors, dashboardStats } from "./dashboard-seed-data";
import DeveloperView from "./developer-view";
import { BottomRightPopup, WarningModal, AcceptModal, CancelModal, ConfirmModal } from "@/components/opt-out";





export default function DashboardDemo() {
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className={isDeveloper ? "text-left" : "text-center"}>
          <div className="border-b [border-image:linear-gradient(to_right,transparent,theme(colors.stone.300/.8),transparent)1] pb-6">
            {/* Dashboard Content */}
            <div className="relative bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between p-2 border-b border-gray-200">
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
                  <button
                    onClick={handleOptOutClick}
                    className="px-3 py-1 text-sm text-gray-400 hover:bg-gray-700 hover:text-white rounded transition-colors"
                  >
                    DEMO OPT OUT
                  </button>
                </div>
                <div className="text-gray-400 text-sm pr-2">
                  Demo version - Full functionality available Q3 2025
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
