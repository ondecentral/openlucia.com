import React from "react";
import { CreditCard, Receipt, Copy, ExternalLink, Info } from "lucide-react";
import { TokenUSDT, TokenETH, TokenSOL } from "@web3icons/react";
import { VisitorData, RewardTransaction } from "./dashboard-seed-data";
import { getExplorerUrlForTx } from "./utils";

interface RewardsSectionProps {
  visitor: VisitorData;
  onCopyToClipboard: (text: string) => void;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({
  visitor,
  onCopyToClipboard,
}) => {
  return (
    <div className="mt-4 border border-gray-200 rounded-lg p-3 relative">
      <h3 className="text-base font-semibold text-gray-600 mb-3 flex items-center gap-2">
        <CreditCard className="text-orange-500 w-4 h-4" /> Rewards Received
      </h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-center items-center gap-2 mb-2">
            <TokenUSDT size={24} variant="branded" />
            <span className="hidden min-[410px]:inline text-sm font-semibold text-gray-600">
              USDT
            </span>
          </div>
          <p className="text-lg font-bold text-gray-800">
            {visitor.rewards?.totalUSDT ?? "0"}
          </p>
          <p className="text-xs text-gray-500">Total Received</p>
        </div>

        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-center items-center gap-2 mb-2">
            <TokenETH size={24} variant="branded" />
            <span className="hidden min-[410px]:inline text-sm font-semibold text-gray-600">
              ETH
            </span>
          </div>
          <p className="text-lg font-bold text-gray-800">
            {visitor.rewards?.totalETH ?? "0"}
          </p>
          <p className="text-xs text-gray-500">Total Received</p>
        </div>

        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-center items-center gap-2 mb-2">
            <TokenSOL size={24} variant="branded" />
            <span className="hidden min-[410px]:inline text-sm font-semibold text-gray-600">
              SOL
            </span>
          </div>
          <p className="text-lg font-bold text-gray-800">
            {visitor.rewards?.totalSOL ?? "0"}
          </p>
          <p className="text-xs text-gray-500">Total Received</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-3">
        <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
          <Receipt className="text-orange-500 w-3 h-3" /> Recent Reward
          Transactions
        </h4>
        <div className="max-h-[120px] overflow-y-auto border border-gray-200 rounded-lg">
          <div className="space-y-1 p-1">
            {visitor.rewards?.transactions?.map(
              (transaction: RewardTransaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-col min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-between p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                  onClick={() => onCopyToClipboard(transaction.txHash)}
                >
                  <div className="flex items-center justify-center gap-2 min-[360px]:justify-start min-[360px]:flex-1">
                    {transaction.token === "USDT" && (
                      <TokenUSDT size={16} variant="branded" />
                    )}
                    {transaction.token === "ETH" && (
                      <TokenETH size={16} variant="branded" />
                    )}
                    {transaction.token === "SOL" && (
                      <TokenSOL size={16} variant="branded" />
                    )}
                    <span className="text-sm font-mono text-gray-600">
                      {transaction.txHash.slice(0, 4)}...
                      {transaction.txHash.slice(-4)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopyToClipboard(transaction.txHash);
                      }}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      title="Copy transaction hash"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <a
                      href={getExplorerUrlForTx(transaction.txHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-orange-500 transition-colors"
                      title="View on explorer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="hidden min-[426px]:inline text-xs text-gray-400 ml-4">
                      {transaction.timestamp}
                    </span>
                  </div>
                  <div className="flex justify-center min-[360px]:justify-end min-[360px]:flex-shrink-0">
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

      <div className="absolute bottom-2 left-2 group">
        <Info className="w-3 h-3 text-gray-400 cursor-help" />
        <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
          +25.7% (24h)
        </div>
      </div>
    </div>
  );
};

export default RewardsSection;
