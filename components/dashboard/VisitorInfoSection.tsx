import React, { useMemo, useState } from "react";
import {
  Mail,
  MapPin,
  Wallet,
  Copy,
  ExternalLink,
  Users,
  EyeOff,
  Target,
  Fingerprint,
  Network,
  Smartphone,
  Monitor,
  Tablet,
  Sun,
} from "lucide-react";
import { VisitorData } from "./dashboard-seed-data";
import {
  getExplorerUrlForAddress,
  getVisitorTotalUsd,
  getValuationEmoji,
} from "./utils";
import VisitsCarousel from "./VisitsCarousel";
import DeviceViewsCarousel from "./DeviceViewsCarousel";
import StatCard from "./StatCard";
import DemoDataLabel from "./DemoDataLabel";

interface VisitorInfoSectionProps {
  visitor: VisitorData;
  onCopyToClipboard: (text: string) => void;
  onShowDemoNotification: () => void;
}

const VisitorInfoSection: React.FC<VisitorInfoSectionProps> = ({
  visitor,
  onCopyToClipboard,
  onShowDemoNotification,
}) => {
  const [visitsIndex, setVisitsIndex] = useState<number>(0);
  const [deviceViewsIndex, setDeviceViewsIndex] = useState<number>(0);

  // Visits to be displayed in the visits carousel
  const visits = useMemo(
    () => [
      {
        title: "TOTAL VISITS",
        value: visitor.total_visits,
        icon: <Users className="h-5 w-5" style={{ color: "#0029FF" }} />,
      },
      {
        title: "INCOGNITO VISITS",
        value: visitor.incognito_sessions,
        icon: <EyeOff className="h-5 w-5" style={{ color: "#0029FF" }} />,
      },
    ],
    [visitor.total_visits, visitor.incognito_sessions],
  );

  // Device views to be displayed in the device views carousel
  const deviceViews = useMemo(
    () => [
      {
        title: "MOBILE VIEWS",
        value: visitor.mobile_views, // Hardcoded value
        icon: <Smartphone className="h-5 w-5" style={{ color: "#0029FF" }} />,
      },
      {
        title: "TABLET VIEWS",
        value: visitor.tablet_views, // Hardcoded value
        icon: <Tablet className="h-5 w-5" style={{ color: "#0029FF" }} />,
      },
      {
        title: "COMPUTER VIEWS",
        value: visitor.computer_views, // Hardcoded value
        icon: <Monitor className="h-5 w-5" style={{ color: "#0029FF" }} />,
      },
    ],
    [visitor.mobile_views, visitor.tablet_views, visitor.computer_views],
  );

  // Navigate through the visits carousel
  const navigateVisits = (direction: "prev" | "next") => {
    setVisitsIndex((current) => {
      if (direction === "next") return (current + 1) % visits.length;
      return current === 0 ? visits.length - 1 : current - 1;
    });
  };

  // Navigate through the device views carousel
  const navigateDeviceViews = (direction: "prev" | "next") => {
    setDeviceViewsIndex((current) => {
      if (direction === "next") return (current + 1) % deviceViews.length;
      return current === 0 ? deviceViews.length - 1 : current - 1;
    });
  };
  return (
    <>
      {/* Visits and device views section */}
      <section className="align-center grid grid-cols-2 border-b border-gray-200 md:grid-cols-4">
        <VisitsCarousel
          currentVisit={visits[visitsIndex]}
          onNavigate={navigateVisits}
        />
        <DeviceViewsCarousel
          currentDevice={deviceViews[deviceViewsIndex]}
          onNavigate={navigateDeviceViews}
        />
        <StatCard
          title="ADS CLICKED"
          value={visitor.ads_clicked}
          icon={<Target className="h-5 w-5" style={{ color: "#0029FF" }} />}
          className="border-r md:border-b-0"
          isDemoData={true}
          onShowDemoNotification={onShowDemoNotification}
          demoSource="ads_clicked"
        />
        <StatCard
          title="CLICK IDS"
          value={visitor.click_ids}
          icon={
            <Fingerprint className="h-5 w-5" style={{ color: "#0029FF" }} />
          }
          className=""
          isDemoData={true}
          onShowDemoNotification={onShowDemoNotification}
          demoSource="click_ids"
        />
      </section>
      {/* Wallets, valuation, most active, and IP addresses section */}
      <section className="align-center grid grid-cols-2 border-b border-gray-200 md:grid-cols-4">
        <StatCard
          title="WALLETS"
          value={visitor.wallets.length}
          icon={<Wallet className="h-5 w-5" style={{ color: "#0029FF" }} />}
          isDemoData={true}
          onShowDemoNotification={onShowDemoNotification}
          demoSource="wallets_count"
        />
        <StatCard
          title="VALUATION"
          // value={getValuationEmoji(getVisitorTotalUsd(visitor.wallets))}
          icon={
            <span className="text-2xl">
              {getValuationEmoji(getVisitorTotalUsd(visitor.wallets))}
            </span>
          }
          className="border-r md:border-b-0"
          isDemoData={true}
          onShowDemoNotification={onShowDemoNotification}
          demoSource="valuation"
        />
        <StatCard
          title="MOST ACTIVE"
          value="Afternoon"
          icon={<Sun className="h-5 w-5" style={{ color: "#0029FF" }} />}
          className="border-r text-gray-400 md:border-b-0"
          isDemoData={true}
          onShowDemoNotification={onShowDemoNotification}
          demoSource="most_active"
        />
        <StatCard
          title="IP ADDRESSES"
          value={visitor.ip_addresses.length}
          icon={<Network className="h-5 w-5" style={{ color: "#0029FF" }} />}
          className=""
        />
      </section>

      <section className="grid grid-cols-1 gap-1.5 p-1 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 p-1.5">
          <div className="mb-3 flex items-center gap-2 border-b border-gray-200 pb-2">
            <h3 className="flex items-center gap-2 text-base font-semibold text-gray-600">
              <Mail className="h-4 w-4" style={{ color: "#0029FF" }} />{" "}
              Associated Emails
            </h3>
            <DemoDataLabel
              source="associated_emails"
              onShowNotification={onShowDemoNotification}
            />
          </div>

          <div className="max-h-[120px] space-y-2 overflow-y-auto">
            {visitor.associated_emails.map((email, index) => (
              <div
                key={index}
                className="flex justify-between rounded bg-gray-50 p-1 text-left transition-colors hover:bg-gray-100"
              >
                <span className="flex-1 truncate text-sm text-gray-600">
                  {email}
                </span>
                <button
                  onClick={() => onCopyToClipboard(email)}
                  className="ml-2 text-gray-400 transition-colors hover:text-gray-600"
                  title="Copy email"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-1.5">
          <h3 className="mb-3 flex items-center justify-center gap-2 border-b border-gray-200 pb-2 text-base font-semibold text-gray-600">
            <MapPin className="h-4 w-4" style={{ color: "#0029FF" }} /> IP
            Addresses
          </h3>
          <div className="max-h-[120px] space-y-2 overflow-y-auto">
            {visitor.ip_addresses.map((ipData, index) => (
              <div
                key={index}
                className="rounded bg-gray-50 p-1 text-left transition-colors hover:bg-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-mono text-sm text-gray-600">
                      {ipData.ip}
                    </div>
                    <div className="text-xs text-gray-400">
                      {ipData.location}
                    </div>
                  </div>
                  <button
                    onClick={() => onCopyToClipboard(ipData.ip)}
                    className="ml-2 text-gray-400 transition-colors hover:text-gray-600"
                    title="Copy IP address"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-1.5">
          <div className="mb-3 flex items-center gap-2 border-b border-gray-200 pb-2">
            <h3 className="flex items-center gap-2 text-base font-semibold text-gray-600">
              <Wallet className="h-4 w-4" style={{ color: "#0029FF" }} /> Wallet
              Addresses
            </h3>
            <DemoDataLabel
              source="wallet_addresses"
              onShowNotification={onShowDemoNotification}
            />
          </div>
          <div className="max-h-[120px] space-y-2 overflow-y-auto">
            {visitor.wallets.map((wallet, index) => (
              <div
                key={index}
                className="rounded bg-gray-50 p-1 text-left transition-colors hover:bg-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-mono text-sm text-gray-600">
                      {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                    </div>
                    {wallet.ens_domain && (
                      <div className="text-xs text-[#0029FF]">
                        {wallet.ens_domain}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => onCopyToClipboard(wallet.address)}
                      className="ml-2 text-gray-400 transition-colors hover:text-gray-600"
                      title="Copy wallet address"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                    <a
                      href={getExplorerUrlForAddress(wallet.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-gray-400 transition-colors hover:text-[#0029FF]"
                      title="View on explorer"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default VisitorInfoSection;
