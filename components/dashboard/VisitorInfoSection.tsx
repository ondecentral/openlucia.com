import React from "react";
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
} from "lucide-react";
import { VisitorData } from "./dashboard-seed-data";
import { getExplorerUrlForAddress } from "./utils";

interface VisitorInfoSectionProps {
  visitor: VisitorData;
  onCopyToClipboard: (text: string) => void;
}

const VisitorInfoSection: React.FC<VisitorInfoSectionProps> = ({
  visitor,
  onCopyToClipboard,
}) => {
  return (
    <section className="p-3 border-b border-gray-200">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-3">
        <div className="text-center relative">
          <p className="text-xs text-gray-400 font-semibold tracking-wider">
            INCOGNITO SESSIONS
          </p>
          <div className="flex justify-center items-center gap-2 mt-1">
            <EyeOff className="w-4 h-4 text-orange-500" />
            <p className="text-sm font-semibold text-gray-600">
              {visitor.incognito_sessions}
            </p>
          </div>
          <div className="absolute bottom-0 left-1 group">
            <Info className="w-2.5 h-2.5 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              +15.2% (24h)
            </div>
          </div>
        </div>
        <div className="text-center relative">
          <p className="text-xs text-gray-400 font-semibold tracking-wider">
            ADS CLICKED
          </p>
          <div className="flex justify-center items-center gap-2 mt-1">
            <Target className="w-4 h-4 text-orange-500" />
            <p className="text-sm font-semibold text-gray-600">
              {visitor.ads_clicked}
            </p>
          </div>
          <div className="absolute bottom-0 left-1 group">
            <Info className="w-2.5 h-2.5 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              +8.7% (24h)
            </div>
          </div>
        </div>
        <div className="text-center relative">
          <p className="text-xs text-gray-400 font-semibold tracking-wider">
            CLICK IDS
          </p>
          <div className="flex justify-center items-center gap-2 mt-1">
            <Fingerprint className="w-4 h-4 text-orange-500" />
            <p className="text-sm font-semibold text-gray-600">
              {visitor.click_ids}
            </p>
          </div>
          <div className="absolute bottom-0 left-1 group">
            <Info className="w-2.5 h-2.5 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              +12.4% (24h)
            </div>
          </div>
        </div>
        <div className="text-center relative">
          <p className="text-xs text-gray-400 font-semibold tracking-wider">
            TOTAL VISITS
          </p>
          <div className="flex justify-center items-center gap-2 mt-1">
            <Users className="w-4 h-4 text-orange-500" />
            <p className="text-sm font-semibold text-gray-600">
              {visitor.total_visits}
            </p>
          </div>
          <div className="absolute bottom-0 left-1 group">
            <Info className="w-2.5 h-2.5 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              +6.3% (24h)
            </div>
          </div>
        </div>
        <div className="text-center relative">
          <p className="text-xs text-gray-400 font-semibold tracking-wider">
            IP ADDRESSES
          </p>
          <div className="flex justify-center items-center gap-2 mt-1">
            <Network className="w-4 h-4 text-orange-500" />
            <p className="text-sm font-semibold text-gray-600">
              {visitor.ip_addresses.length}
            </p>
          </div>
          <div className="absolute bottom-0 left-1 group">
            <Info className="w-2.5 h-2.5 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              +3.8% (24h)
            </div>
          </div>
        </div>
        <div className="text-center relative">
          <p className="text-xs text-gray-400 font-semibold tracking-wider">
            WALLETS
          </p>
          <div className="flex justify-center items-center gap-2 mt-1">
            <Wallet className="w-4 h-4 text-orange-500" />
            <p className="text-sm font-semibold text-gray-600">
              {visitor.wallets.length}
            </p>
          </div>
          <div className="absolute bottom-0 left-1 group">
            <Info className="w-2.5 h-2.5 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              +18.9% (24h)
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="border border-gray-200 rounded-lg p-3">
          <h3 className="text-base font-semibold text-gray-600 mb-3 flex items-center justify-center gap-2 border-b border-gray-200 pb-2">
            <Mail className="text-orange-500 w-4 h-4" /> Associated Emails
          </h3>
          <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2">
            {visitor.associated_emails.map((email, index) => (
              <div
                key={index}
                className="flex text-left justify-between p-1 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm text-gray-600 truncate flex-1">
                  {email}
                </span>
                <button
                  onClick={() => onCopyToClipboard(email)}
                  className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                  title="Copy email"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-3">
          <h3 className="text-base font-semibold text-gray-600 mb-3 flex items-center justify-center gap-2 border-b border-gray-200 pb-2">
            <MapPin className="text-orange-500 w-4 h-4" /> IP Addresses
          </h3>
          <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2">
            {visitor.ip_addresses.map((ipData, index) => (
              <div
                key={index}
                className="p-1 text-left bg-gray-50 rounded hover:bg-gray-100 transition-colors"
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
                    className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                    title="Copy IP address"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-3">
          <h3 className="text-base font-semibold text-gray-600 mb-3 flex items-center justify-center gap-2 border-b border-gray-200 pb-2">
            <Wallet className="text-orange-500 w-4 h-4" /> Wallet Addresses
          </h3>
          <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2">
            {visitor.wallets.map((wallet, index) => (
              <div
                key={index}
                className="p-1 text-left bg-gray-50 rounded hover:bg-gray-100 transition-colors"
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
                      className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                      title="Copy wallet address"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <a
                      href={getExplorerUrlForAddress(wallet.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-orange-500 transition-colors ml-2"
                      title="View on explorer"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitorInfoSection;
