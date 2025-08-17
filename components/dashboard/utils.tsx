import React from "react";
import { Wallet } from "lucide-react";
import {
  TokenETH,
  TokenSOL,
  WalletLedger,
  WalletMetamask,
  WalletCoinbase,
  WalletWalletConnect,
  WalletBackpack,
  WalletPhantom,
  WalletTrezor,
  TokenUSDT,
  TokenPEPE,
  TokenSHIB,
  TokenDOGE,
  TokenLINK,
  TokenRAY,
  TokenUSDC,
} from "@web3icons/react";

export const getExplorerUrlForAddress = (address: string): string => {
  const isEvm = /^0x[a-fA-F0-9]{40}$/.test(address || "");
  return isEvm
    ? `https://etherscan.io/address/${address}`
    : `https://solscan.io/account/${address}`;
};

export const getExplorerUrlForTx = (txHash: string): string => {
  const isEvmTx = /^0x([a-fA-F0-9]{64})$/.test(txHash || "");
  return isEvmTx
    ? `https://etherscan.io/tx/${txHash}`
    : `https://solscan.io/tx/${txHash}`;
};

export const getWalletIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "metamask":
      return <WalletMetamask size={24} variant="branded" />;
    case "walletconnect":
      return <WalletWalletConnect size={24} variant="branded" />;
    case "ledger":
      return <WalletLedger size={24} variant="branded" />;
    case "coinbase wallet":
      return <WalletCoinbase size={24} variant="branded" />;
    case "backpack":
      return <WalletBackpack size={24} variant="branded" />;
    case "phantom":
      return <WalletPhantom size={24} variant="branded" />;
    case "trezor":
      return <WalletTrezor size={24} variant="branded" />;
    default:
      return <Wallet className="w-6 h-6 text-orange-500" />;
  }
};

export const getTokenIcon = (symbol: string, size: number = 24) => {
  switch ((symbol || "").toUpperCase()) {
    case "ETH":
      return <TokenETH size={size} variant="branded" />;
    case "SOL":
      return <TokenSOL size={size} variant="branded" />;
    case "USDT":
      return <TokenUSDT size={size} variant="branded" />;
    case "USDC":
      return <TokenUSDC size={size} variant="branded" />;
    case "PEPE":
      return <TokenPEPE size={size} variant="branded" />;
    case "SHIB":
      return <TokenSHIB size={size} variant="branded" />;
    case "DOGE":
      return <TokenDOGE size={size} variant="branded" />;
    case "LINK":
      return <TokenLINK size={size} variant="branded" />;
    case "RAY":
      return <TokenRAY size={size} variant="branded" />;
    default:
      return (
        <Wallet className={`w-${size / 4} h-${size / 4} text-orange-500`} />
      );
  }
};
