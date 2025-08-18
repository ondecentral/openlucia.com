"use client";

import { useState, useEffect, useRef } from "react";
import { Code2, Info, Loader2, AlertCircle } from "lucide-react";
import Dashboard from "./dashboard/dashboard";
import {
  sampleVisitors,
  dashboardStats,
} from "./dashboard/dashboard-seed-data";
import { useDashboardStats, useVisitors } from "@/lib/dashboard-api";
import { VisitorData } from "./dashboard/dashboard-seed-data";
import DeveloperView from "./dashboard/developer-view";
import {
  BottomRightPopup,
  WarningModal,
  AcceptModal,
  CancelModal,
  ConfirmModal,
} from "@/components/opt-out";

// Loading indicator component
const LoadingIndicator = () => (
  <div className="flex flex-col items-center justify-center py-16 space-y-4">
    <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
    <div className="text-center">
      <p className="text-gray-600 font-medium">Loading dashboard data...</p>
      <p className="text-sm text-gray-400 mt-1">Fetching real-time analytics</p>
    </div>
  </div>
);

// Error indicator component
const ErrorIndicator = () => (
  <div className="flex flex-col items-center justify-center py-16 space-y-4">
    <AlertCircle className="w-8 h-8 text-red-500" />
    <div className="text-center">
      <p className="text-gray-600 font-medium">Unable to load live data</p>
      <p className="text-sm text-gray-400 mt-1">Showing demo data instead</p>
    </div>
  </div>
);

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

  // Fetch real API data
  const {
    stats: apiStats,
    loading: statsLoading,
    error: statsError,
  } = useDashboardStats();
  const {
    visitors: apiVisitors,
    loading: visitorsLoading,
    error: visitorsError,
  } = useVisitors({ limit: 8 });

  // Utility function to ensure IP addresses are obscured (safety measure)
  const obscureIPAddress = (ip: string): string => {
    if (!ip) return "***.***.0.0";
    const parts = ip.split(".");
    if (parts.length !== 4) return "***.***.0.0";
    return `***.***.${parts[2]}.${parts[3]}`;
  };

  // Merge API data with mocked data for missing fields
  const mergedVisitors: VisitorData[] = apiVisitors.map((apiVisitor, index) => {
    // Use sample visitor as fallback for missing data
    const sampleVisitor = sampleVisitors[index % sampleVisitors.length];

    return {
      ...sampleVisitor,
      // Replace with API data where available (ensure IPs are obscured)
      visitor_id: apiVisitor.visitor_id,
      ip_address: obscureIPAddress(apiVisitor.ip_address),
      location: apiVisitor.location,
      browser: apiVisitor.browser,
      device_type: apiVisitor.device_type,
      os: apiVisitor.os,
      os_version: apiVisitor.os_version || sampleVisitor.os_version,
      incognito: apiVisitor.incognito,
      visit_time: apiVisitor.visit_time,
      incognito_sessions: apiVisitor.incognito_sessions,
      ads_clicked: apiVisitor.ads_clicked,
      click_ids: apiVisitor.click_ids,
      total_visits: apiVisitor.total_visits,
      // Keep mocked data for fields not available in API
      wallet_address: sampleVisitor.wallet_address,
      wallet_type: sampleVisitor.wallet_type,
      wallet_balance: sampleVisitor.wallet_balance,
      ens_domain: sampleVisitor.ens_domain,
      associated_emails: sampleVisitor.associated_emails,
      transactions: sampleVisitor.transactions,
      risk_level: sampleVisitor.risk_level,
      vpn: sampleVisitor.vpn,
      ip_addresses: (apiVisitor.ip_addresses || sampleVisitor.ip_addresses).map(
        (ipAddr) => ({
          ...ipAddr,
          ip: obscureIPAddress(ipAddr.ip),
        }),
      ),
      wallets: sampleVisitor.wallets,
      rewards: sampleVisitor.rewards,
    };
  });

  // Use API stats when available, fall back to mock data
  const displayStats = {
    totalVisits: apiStats?.totalVisits ?? dashboardStats.totalVisits,
    totalIncognitoVisits:
      apiStats?.totalIncognitoVisits ?? dashboardStats.totalIncognitoVisits,
    totalUniqueIPs: apiStats?.totalUniqueIPs ?? dashboardStats.totalUniqueIPs,
    totalUniqueGeolocations:
      apiStats?.totalUniqueGeolocations ??
      dashboardStats.totalUniqueGeolocations,
    totalWalletsDetected:
      apiStats?.totalWalletsDetected ?? dashboardStats.totalWalletsDetected,
    totalAdsClicked:
      apiStats?.totalAdsClicked ?? dashboardStats.totalAdsClicked,
    totalClickIds: apiStats?.totalClickIds ?? dashboardStats.totalClickIds,
    // Keep mocked reward data since API returns "0" for these
    totalUSDTRewards: dashboardStats.totalUSDTRewards,
    totalSOLRewards: dashboardStats.totalSOLRewards,
    totalETHRewards: dashboardStats.totalETHRewards,
  };

  // Determine loading state - show loading indicator when either API is loading initially
  const isLoading = statsLoading || visitorsLoading;

  // Show error state if both API calls failed and we have no data
  const hasError =
    (statsError || visitorsError) &&
    !statsLoading &&
    !visitorsLoading &&
    !apiStats &&
    !apiVisitors.length;

  // Use API visitors if available, otherwise fall back to sample data (but only show after loading)
  const displayVisitors =
    mergedVisitors.length > 0 ? mergedVisitors : sampleVisitors.slice(0, 8);

  // Handle clicking outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
        setIsTooltipPinned(false);
      }
    };

    if (isTooltipPinned) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
                    {(statsLoading || visitorsLoading) && (
                      <Loader2 className="w-3 h-3 animate-spin text-orange-500" />
                    )}
                    <div className="relative group">
                      <div
                        className="rounded-full text-xs font-medium cursor-help hover:bg-gray-400 transition-colors flex items-center justify-center"
                        onMouseEnter={() =>
                          !isTooltipPinned && setShowTooltip(true)
                        }
                        onMouseLeave={() =>
                          !isTooltipPinned && setShowTooltip(false)
                        }
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
                  ) : isLoading ? (
                    <LoadingIndicator />
                  ) : hasError ? (
                    <>
                      <ErrorIndicator />
                      <Dashboard
                        visitors={displayVisitors}
                        totalVisits={displayStats.totalVisits}
                        totalIncognitoVisits={displayStats.totalIncognitoVisits}
                        totalUniqueIPs={displayStats.totalUniqueIPs}
                        totalUniqueGeolocations={
                          displayStats.totalUniqueGeolocations
                        }
                        totalWalletsDetected={displayStats.totalWalletsDetected}
                        totalUSDTRewards={displayStats.totalUSDTRewards}
                        totalSOLRewards={displayStats.totalSOLRewards}
                        totalETHRewards={displayStats.totalETHRewards}
                        totalAdsClicked={displayStats.totalAdsClicked}
                        totalClickIds={displayStats.totalClickIds}
                      />
                    </>
                  ) : (
                    <Dashboard
                      visitors={displayVisitors}
                      totalVisits={displayStats.totalVisits}
                      totalIncognitoVisits={displayStats.totalIncognitoVisits}
                      totalUniqueIPs={displayStats.totalUniqueIPs}
                      totalUniqueGeolocations={
                        displayStats.totalUniqueGeolocations
                      }
                      totalWalletsDetected={displayStats.totalWalletsDetected}
                      totalUSDTRewards={displayStats.totalUSDTRewards}
                      totalSOLRewards={displayStats.totalSOLRewards}
                      totalETHRewards={displayStats.totalETHRewards}
                      totalAdsClicked={displayStats.totalAdsClicked}
                      totalClickIds={displayStats.totalClickIds}
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
      {showAcceptModal && <AcceptModal onBack={handleBack} />}
      {showCancelModal && <CancelModal onBack={handleBack} />}
      {showConfirmModal && <ConfirmModal onBack={handleBack} />}
    </section>
  );
}
