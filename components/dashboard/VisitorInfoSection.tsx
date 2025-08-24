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
  Info,
  Smartphone,
  Monitor,
  Globe,
  Tablet,
} from "lucide-react";
import { VisitorData } from "./dashboard-seed-data";
import {
  getExplorerUrlForAddress,
  getVisitorTotalUsd,
  getValuationEmoji,
  getValuationLabel,
} from "./utils";
import VisitsCarousel from "./VisitsCarousel";
import DeviceViewsCarousel from "./DeviceViewsCarousel";
import StatCard from "./StatCard";

interface VisitorInfoSectionProps {
  visitor: VisitorData;
  onCopyToClipboard: (text: string) => void;
}

const VisitorInfoSection: React.FC<VisitorInfoSectionProps> = ({
  visitor,
  onCopyToClipboard,
}) => {
  const [visitsIndex, setVisitsIndex] = useState<number>(0);
  const [deviceViewsIndex, setDeviceViewsIndex] = useState<number>(0);

  // Visits to be displayed in the visits carousel
  const visits = useMemo(
    () => [
      {
        title: "TOTAL VISITS",
        value: visitor.total_visits,
        icon: <Users className="h-5 w-5 text-orange-500" />,
        tooltip: "+12.4% (24h)",
      },
      {
        title: "INCOGNITO VISITS",
        value: visitor.incognito_sessions,
        icon: <EyeOff className="h-5 w-5 text-orange-500" />,
        tooltip: "-5.2% (24h)",
      },
    ],
    [visitor.total_visits, visitor.incognito_sessions],
  );

  // Device views to be displayed in the device views carousel
  const deviceViews = useMemo(
    () => [
      {
        title: "MOBILE VIEWS",
        value: 211, // Hardcoded value
        icon: <Smartphone className="h-5 w-5 text-orange-500" />,
        tooltip: "+18.2% (24h)",
      },
      {
        title: "TABLET VIEWS",
        value: 2, // Hardcoded value
        icon: <Tablet className="h-5 w-5 text-orange-500" />,
        tooltip: "+18.2% (24h)",
      },
      {
        title: "COMPUTER VIEWS",
        value: 154, // Hardcoded value
        icon: <Monitor className="h-5 w-5 text-orange-500" />,
        tooltip: "+9.7% (24h)",
      },
    ],
    [],
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
          icon={<Target className="h-5 w-5 text-orange-500" />}
          tooltip="+8.7% (24h)"
          className="border-r md:border-b-0"
        />
        <StatCard
          title="CLICK IDS"
          value={visitor.click_ids}
          icon={<Fingerprint className="h-5 w-5 text-orange-500" />}
          tooltip="+12.4% (24h)"
          className=""
        />
      </section>
      {/* Wallets, valuation, most active, and IP addresses section */}
      <section className="align-center grid grid-cols-2 border-b border-gray-200 md:grid-cols-4">
        <StatCard
          title="WALLETS"
          value={visitor.wallets.length}
          icon={<Wallet className="h-5 w-5 text-orange-500" />}
          tooltip="+18.9% (24h)"
        />
        <StatCard
          title="VALUATION"
          // value={getValuationEmoji(getVisitorTotalUsd(visitor.wallets))}
          icon={
            <span className="text-2xl">
              {getValuationEmoji(getVisitorTotalUsd(visitor.wallets))}
            </span>
          }
          tooltip={`Wallet valuation: ${getValuationLabel(getVisitorTotalUsd(visitor.wallets))} ($${getVisitorTotalUsd(visitor.wallets).toLocaleString()})`}
          className="border-r md:border-b-0"
        />
        <StatCard
          title="MOST ACTIVE"
          value="N/A"
          icon={<span className="text-2xl"></span>}
          tooltip="Coming soon!"
          className="border-r text-gray-400 md:border-b-0"
        />
        <StatCard
          title="IP ADDRESSES"
          value={visitor.ip_addresses.length}
          icon={<Network className="h-5 w-5 text-orange-500" />}
          tooltip="+3.8% (24h)"
          className=""
        />
      </section>

      <section className="grid grid-cols-1 gap-1.5 p-1 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 p-1.5">
          <h3 className="mb-3 flex items-center justify-center gap-2 border-b border-gray-200 pb-2 text-base font-semibold text-gray-600">
            <Mail className="h-4 w-4 text-orange-500" /> Associated Emails
          </h3>
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
            <MapPin className="h-4 w-4 text-orange-500" /> IP Addresses
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
          <h3 className="mb-3 flex items-center justify-center gap-2 border-b border-gray-200 pb-2 text-base font-semibold text-gray-600">
            <Wallet className="h-4 w-4 text-orange-500" /> Wallet Addresses
          </h3>
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
                      <div className="text-xs text-orange-500">
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
                      className="ml-2 text-gray-400 transition-colors hover:text-orange-500"
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
