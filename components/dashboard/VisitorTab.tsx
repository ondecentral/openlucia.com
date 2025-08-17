import React from "react";
import { VisitorData } from "./dashboard-seed-data";
import VisitorTabHeader from "./VisitorTabHeader";
import VisitorInfoSection from "./VisitorInfoSection";
import RewardsSection from "./RewardsSection";
import VisitHistorySection from "./VisitHistorySection";
import WalletDetailsSection from "./WalletDetailsSection";

interface VisitorTabProps {
  visitor: VisitorData;
  isExpanded: boolean;
  ipIndex: number;
  walletIndex: number;
  expandedTokens: boolean;
  onToggleTab: () => void;
  onNavigateIP: (direction: "prev" | "next") => void;
  onNavigateWallet: (direction: "prev" | "next") => void;
  onToggleTokens: () => void;
  onCopyToClipboard: (text: string) => void;
}

const VisitorTab: React.FC<VisitorTabProps> = ({
  visitor,
  isExpanded,
  ipIndex,
  walletIndex,
  expandedTokens,
  onToggleTab,
  onNavigateIP,
  onNavigateWallet,
  onToggleTokens,
  onCopyToClipboard,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <VisitorTabHeader
        visitor={visitor}
        isExpanded={isExpanded}
        onToggle={onToggleTab}
        onCopyToClipboard={onCopyToClipboard}
      />

      {isExpanded && (
        <div className="border-t border-gray-200">
          <VisitorInfoSection
            visitor={visitor}
            onCopyToClipboard={onCopyToClipboard}
          />

          <RewardsSection
            visitor={visitor}
            onCopyToClipboard={onCopyToClipboard}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="lg:border-r border-gray-200">
              <VisitHistorySection
                visitor={visitor}
                ipIndex={ipIndex}
                onNavigateIP={onNavigateIP}
              />
            </div>

            <div className="lg:col-span-1">
              <WalletDetailsSection
                visitor={visitor}
                walletIndex={walletIndex}
                expandedTokens={expandedTokens}
                onNavigateWallet={onNavigateWallet}
                onToggleTokens={onToggleTokens}
                onCopyToClipboard={onCopyToClipboard}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorTab;
