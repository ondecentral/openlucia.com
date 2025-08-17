import React from "react";
import { Wallet, Copy, ExternalLink, ChevronDown, Receipt } from "lucide-react";
import { VisitorData } from "./dashboard-seed-data";
import { getWalletIcon, getTokenIcon, getExplorerUrlForAddress } from "./utils";

interface WalletDetailsSectionProps {
  visitor: VisitorData;
  walletIndex: number;
  expandedTokens: boolean;
  onNavigateWallet: (direction: "prev" | "next") => void;
  onToggleTokens: () => void;
  onCopyToClipboard: (text: string) => void;
}

const WalletDetailsSection: React.FC<WalletDetailsSectionProps> = ({
  visitor,
  walletIndex,
  expandedTokens,
  onNavigateWallet,
  onToggleTokens,
  onCopyToClipboard,
}) => {
  const currentWallet = visitor.wallets[walletIndex] || visitor.wallets[0];
  const transactions = currentWallet?.transactions || visitor.transactions;

  const calculateTotalValue = () => {
    const totalValue = currentWallet?.tokens.reduce((sum, token) => {
      return sum + parseFloat(token.value.replace("$", "").replace(",", ""));
    }, 0);
    return totalValue
      ? `$${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : "$0.00";
  };

  const calculatePNL = () => {
    const pnlPercent = currentWallet?.tokens.some((t) => t.symbol === "ETH")
      ? 12.4
      : currentWallet?.tokens.some((t) => t.symbol === "SOL")
        ? 8.2
        : 5.6;
    const totalValue =
      currentWallet?.tokens.reduce((sum, token) => {
        return sum + parseFloat(token.value.replace("$", "").replace(",", ""));
      }, 0) || 0;
    const pnlValue = totalValue * (pnlPercent / 100);
    return { pnlPercent, pnlValue };
  };

  const { pnlPercent, pnlValue } = calculatePNL();

  return (
    <>
      <section className="p-3">
        <div className="flex items-center justify-center gap-3 mb-2">
          <button
            onClick={() => onNavigateWallet("prev")}
            disabled={visitor.wallets.length <= 1}
            className="text-gray-400 hover:text-gray-600 disabled:text-gray-200 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2 className="text-xs text-gray-400 font-semibold tracking-wider">
            ASSOCIATED WALLETS
          </h2>
          <button
            onClick={() => onNavigateWallet("next")}
            disabled={visitor.wallets.length <= 1}
            className="text-gray-400 hover:text-gray-600 disabled:text-gray-200 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="border border-gray-200 rounded-lg p-3">
          <h3 className="text-base font-semibold text-gray-600 mb-3 flex items-center gap-2">
            <Wallet className="text-orange-500 w-4 h-4" /> Wallet Details
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between items-center">
              <span className="text-gray-500">Wallet Type</span>
              <span className="font-medium flex items-center gap-1.5">
                {getWalletIcon(currentWallet?.type || visitor.wallet_type)}
                {currentWallet?.type || visitor.wallet_type}
              </span>
            </li>
            <li className="flex justify-between items-center gap-1.5">
              <span className="text-gray-500">Wallet Address</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs bg-gray-100 p-0.5 rounded">
                  {(currentWallet?.address || visitor.wallet_address).slice(
                    0,
                    6,
                  )}
                  ...
                  {(currentWallet?.address || visitor.wallet_address).slice(-4)}
                </span>
                <button
                  onClick={() =>
                    onCopyToClipboard(
                      currentWallet?.address || visitor.wallet_address,
                    )
                  }
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title="Copy address"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <a
                  href={getExplorerUrlForAddress(
                    currentWallet?.address || visitor.wallet_address,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                  title="View on explorer"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </li>
            <li className="flex justify-between items-center gap-1.5">
              <span className="text-gray-500">ENS/SNS Domain</span>
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-orange-500">
                  {currentWallet?.ens_domain || visitor.ens_domain}
                </span>
                <button
                  onClick={() =>
                    onCopyToClipboard(
                      currentWallet?.ens_domain || visitor.ens_domain,
                    )
                  }
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title="Copy domain"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-500">Total Value</span>
              <span className="font-medium">{calculateTotalValue()}</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-500">PNL (24h)</span>
              <span
                className={`font-medium ${pnlPercent >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {pnlPercent >= 0 ? "+" : "-"}
                {Math.abs(pnlPercent)}% ($
                {pnlValue.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                )
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-2">
          <div
            onClick={onToggleTokens}
            className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getTokenIcon(currentWallet?.tokens[0]?.symbol || "")}
                <span className="font-medium">
                  {currentWallet?.tokens[0]?.amount}{" "}
                  {currentWallet?.tokens[0]?.symbol}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  expandedTokens ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          {expandedTokens && (
            <div className="mt-2 border border-gray-200 rounded-lg p-3">
              <div className="max-h-[240px] overflow-y-auto">
                <ul className="space-y-3">
                  {currentWallet?.tokens.slice(1).map((token, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        {getTokenIcon(token.symbol)}
                        <span className="font-medium">
                          {token.amount} {token.symbol}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {token.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="p-3 pt-0">
        <h3 className="text-base font-semibold text-gray-600 mb-2 flex items-center gap-2">
          <Receipt className="text-orange-500 w-4 h-4" /> Recent Transactions
        </h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200 text-sm">
            {transactions.map((transaction) => (
              <li
                key={transaction.id}
                className="p-2.5 flex justify-between items-center hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-600">
                    {transaction.type}
                  </p>
                  <p className="text-xs text-gray-400">{transaction.details}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${transaction.positive ? "text-green-600" : "text-red-600"}`}
                  >
                    {transaction.amount}
                  </p>
                  <p className="text-xs text-gray-400">{transaction.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default WalletDetailsSection;
