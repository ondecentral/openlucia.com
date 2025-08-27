import React from "react";
import { CreditCard, Receipt, Copy, ExternalLink } from "lucide-react";
import { TokenUSDT, TokenETH, TokenSOL } from "@web3icons/react";
import { VisitorData, RewardTransaction } from "./dashboard-seed-data";
import { getExplorerUrlForTx } from "./utils";
import DemoDataLabel from "./DemoDataLabel";

interface RewardsSectionProps {
  visitor: VisitorData;
  onCopyToClipboard: (text: string) => void;
  onShowDemoNotification: () => void;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({
  visitor,
  onCopyToClipboard,
  onShowDemoNotification,
}) => {
  return (
    <div className="relative mt-4 p-3">
      <div className="mb-3 flex items-center gap-2">
        <h3 className="flex items-center gap-2 text-base font-semibold text-gray-600">
          <CreditCard className="h-4 w-4 text-orange-500" /> Rewards Received
        </h3>
        <DemoDataLabel onShowNotification={onShowDemoNotification} />
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <TokenUSDT size={24} variant="branded" />
            <span className="hidden text-sm font-semibold text-gray-600 min-[410px]:inline">
              USDT
            </span>
          </div>
          <p className="text-lg font-bold text-gray-800">
            {visitor.rewards?.totalUSDT ?? "0"}
          </p>
          <p className="text-xs text-gray-500">Total Received</p>
        </div>

        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <TokenETH size={24} variant="branded" />
            <span className="hidden text-sm font-semibold text-gray-600 min-[410px]:inline">
              ETH
            </span>
          </div>
          <p className="text-lg font-bold text-gray-800">
            {visitor.rewards?.totalETH ?? "0"}
          </p>
          <p className="text-xs text-gray-500">Total Received</p>
        </div>

        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <TokenSOL size={24} variant="branded" />
            <span className="hidden text-sm font-semibold text-gray-600 min-[410px]:inline">
              SOL
            </span>
          </div>
          <p className="text-lg font-bold text-gray-800">
            {visitor.rewards?.totalSOL ?? "0"}
          </p>
          <p className="text-xs text-gray-500">Total Received</p>
        </div>
      </div>

      <div className="pt-3">
        <div className="mb-2 flex items-center gap-2">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <Receipt className="h-3 w-3 text-orange-500" /> Recent Reward
            Transactions
          </h4>
          <DemoDataLabel onShowNotification={onShowDemoNotification} />
        </div>
        <div className="max-h-[120px] overflow-y-auto rounded-lg border border-gray-200">
          <div className="space-y-1 p-1">
            {visitor.rewards?.transactions?.map(
              (transaction: RewardTransaction) => (
                <div
                  key={transaction.id}
                  className="flex cursor-pointer flex-col rounded p-2 transition-colors hover:bg-gray-50 min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-between"
                  onClick={() => onCopyToClipboard(transaction.txHash)}
                >
                  <div className="flex items-center justify-center gap-2 min-[360px]:flex-1 min-[360px]:justify-start">
                    {transaction.token === "USDT" && (
                      <TokenUSDT size={16} variant="branded" />
                    )}
                    {transaction.token === "ETH" && (
                      <TokenETH size={16} variant="branded" />
                    )}
                    {transaction.token === "SOL" && (
                      <TokenSOL size={16} variant="branded" />
                    )}
                    <span className="font-mono text-sm text-gray-600">
                      {transaction.txHash.slice(0, 4)}...
                      {transaction.txHash.slice(-4)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopyToClipboard(transaction.txHash);
                      }}
                      className="text-gray-400 transition-colors hover:text-gray-600"
                      title="Copy transaction hash"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                    <a
                      href={getExplorerUrlForTx(transaction.txHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors hover:text-orange-500"
                      title="View on explorer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <span className="ml-4 hidden text-xs text-gray-400 min-[426px]:inline">
                      {transaction.timestamp}
                    </span>
                  </div>
                  <div className="flex justify-center min-[360px]:flex-shrink-0 min-[360px]:justify-end">
                    <p className="text-sm font-semibold text-green-600">
                      +{transaction.amount} {transaction.token}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsSection;
