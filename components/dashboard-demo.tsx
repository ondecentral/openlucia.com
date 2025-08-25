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
  <div className="flex flex-col items-center justify-center space-y-4 py-16">
    <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
    <div className="text-center">
      <p className="font-medium text-gray-600">Loading dashboard data...</p>
      <p className="mt-1 text-sm text-gray-400">Fetching real-time analytics</p>
    </div>
  </div>
);

// Error indicator component
const ErrorIndicator = () => (
  <div className="flex flex-col items-center justify-center space-y-4 py-16">
    <AlertCircle className="h-8 w-8 text-red-500" />
    <div className="text-center">
      <p className="font-medium text-gray-600">Unable to load live data</p>
      <p className="mt-1 text-sm text-gray-400">Showing demo data instead</p>
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
      mobile_views: apiVisitor.mobile_views ?? sampleVisitor.mobile_views,
      tablet_views: apiVisitor.tablet_views ?? sampleVisitor.tablet_views,
      computer_views: apiVisitor.computer_views ?? sampleVisitor.computer_views,
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
    // Add device view totals from API
    totalMobileViews: apiStats?.totalMobileViews ?? 0,
    totalTabletViews: apiStats?.totalTabletViews ?? 0,
    totalComputerViews: apiStats?.totalComputerViews ?? 0,
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
          <div className="border-b py-6 [border-image:linear-gradient(to_right,transparent,theme(colors.stone.300/.8),transparent)1]">
            {/* Dashboard Content */}
            <div className="relative rounded-lg border border-gray-200 bg-white shadow-lg">
              {/* Dashboard Header */}
              <div className="flex flex-col items-center gap-2 border-b border-gray-200 p-2 sm:grid sm:grid-cols-3 sm:gap-0">
                {/* Center section - DEMO VERSION on top for mobile */}
                <div className="order-1 flex w-full justify-center sm:order-2 sm:col-start-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    DEMO VERSION
                    {(statsLoading || visitorsLoading) && (
                      <Loader2 className="h-3 w-3 animate-spin text-orange-500" />
                    )}
                    <div className="group relative">
                      <div
                        className="flex cursor-help items-center justify-center rounded-full text-xs font-medium transition-colors hover:bg-gray-400"
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
                        <Info className="h-3 w-3 cursor-help text-gray-400" />
                      </div>
                      {showTooltip && (
                        <div
                          ref={tooltipRef}
                          className="absolute bottom-full left-1/2 z-[9999] mb-1 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-100 transition-opacity duration-200"
                        >
                          Full functionality available Q3 2025
                          <div className="border-l-3 border-r-3 border-t-3 absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-transparent border-t-gray-800"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom row container for mobile */}
                <div className="order-2 flex w-full items-center justify-between sm:hidden">
                  {/* Left side - Code icon and toggle */}
                  <div className="flex items-center gap-3">
                    <Code2 className="h-4 w-4 text-gray-500" />
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={isDeveloper}
                        onChange={(e) => setIsDeveloper(e.target.checked)}
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-orange-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>

                  {/* Right side - Demo opt out button */}
                  <button
                    onClick={handleOptOutClick}
                    className="rounded border border-orange-500 px-3 py-1 text-sm text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                  >
                    DEMO OPT OUT
                  </button>
                </div>

                {/* Desktop layout - Left section */}
                <div className="order-2 hidden w-full items-center justify-start gap-3 sm:order-1 sm:flex sm:w-auto">
                  <Code2 className="h-4 w-4 text-gray-500" />
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={isDeveloper}
                      onChange={(e) => setIsDeveloper(e.target.checked)}
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-orange-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>

                {/* Desktop layout - Right section */}
                <div className="order-3 hidden w-full justify-end sm:flex sm:w-auto">
                  <button
                    onClick={handleOptOutClick}
                    className="rounded border border-orange-500 px-3 py-1 text-sm text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
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
                        totalMobileViews={displayStats.totalMobileViews}
                        totalTabletViews={displayStats.totalTabletViews}
                        totalComputerViews={displayStats.totalComputerViews}
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
                      totalMobileViews={displayStats.totalMobileViews}
                      totalTabletViews={displayStats.totalTabletViews}
                      totalComputerViews={displayStats.totalComputerViews}
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
