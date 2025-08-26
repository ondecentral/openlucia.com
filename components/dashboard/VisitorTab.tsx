import React from "react";
import { VisitorData } from "./dashboard-seed-data";
import VisitorTabHeader from "./VisitorTabHeader";
import VisitorInfoSection from "./VisitorInfoSection";
import RewardsSection from "./RewardsSection";
import DevicesSection from "./DevicesSection";
import WalletDetailsSection from "./WalletDetailsSection";

interface VisitorTabProps {
  visitor: VisitorData;
  isExpanded: boolean;
  walletIndex: number;
  expandedTokens: boolean;
  onToggleTab: () => void;
  onNavigateWallet: (direction: "prev" | "next") => void;
  onToggleTokens: () => void;
  onCopyToClipboard: (text: string) => void;
}

const VisitorTab: React.FC<VisitorTabProps> = ({
  visitor,
  isExpanded,
  walletIndex,
  expandedTokens,
  onToggleTab,
  onNavigateWallet,
  onToggleTokens,
  onCopyToClipboard,
}) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
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
            <div className="border-gray-200 lg:border-r">
              <DevicesSection visitor={visitor} />
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
