import React from 'react';
import { Wallet } from 'lucide-react';
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
} from '@web3icons/react';

export const getExplorerUrlForAddress = (address: string): string => {
  const isEvm = /^0x[a-fA-F0-9]{40}$/.test(address || '');
  return isEvm
    ? `https://etherscan.io/address/${address}`
    : `https://solscan.io/account/${address}`;
};

export const getExplorerUrlForTx = (txHash: string): string => {
  const isEvmTx = /^0x([a-fA-F0-9]{64})$/.test(txHash || '');
  return isEvmTx ? `https://etherscan.io/tx/${txHash}` : `https://solscan.io/tx/${txHash}`;
};

export const getWalletIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'metamask':
      return <WalletMetamask size={24} variant="branded" />;
    case 'walletconnect':
      return <WalletWalletConnect size={24} variant="branded" />;
    case 'ledger':
      return <WalletLedger size={24} variant="branded" />;
    case 'coinbase wallet':
      return <WalletCoinbase size={24} variant="branded" />;
    case 'backpack':
      return <WalletBackpack size={24} variant="branded" />;
    case 'phantom':
      return <WalletPhantom size={24} variant="branded" />;
    case 'trezor':
      return <WalletTrezor size={24} variant="branded" />;
    default:
      return <Wallet className="w-6 h-6 text-orange-500" />;
  }
};

export const getTokenIcon = (symbol: string, size: number = 24) => {
  switch ((symbol || '').toUpperCase()) {
    case 'ETH':
      return <TokenETH size={size} variant="branded" />;
    case 'SOL':
      return <TokenSOL size={size} variant="branded" />;
    case 'USDT':
      return <TokenUSDT size={size} variant="branded" />;
    case 'USDC':
      return <TokenUSDC size={size} variant="branded" />;
    case 'PEPE':
      return <TokenPEPE size={size} variant="branded" />;
    case 'SHIB':
      return <TokenSHIB size={size} variant="branded" />;
    case 'DOGE':
      return <TokenDOGE size={size} variant="branded" />;
    case 'LINK':
      return <TokenLINK size={size} variant="branded" />;
    case 'RAY':
      return <TokenRAY size={size} variant="branded" />;
    default:
      return <Wallet className={`w-${size / 4} h-${size / 4} text-orange-500`} />;
  }
};

// Valuation helpers
export const parseUsdToNumber = (usdLike: string | number | undefined): number => {
  if (usdLike === undefined || usdLike === null) return 0;
  if (typeof usdLike === 'number') return usdLike;
  const cleaned = usdLike
    .toString()
    .replace(/[^0-9.]/g, '')
    .trim();
  const asNumber = parseFloat(cleaned);
  return Number.isFinite(asNumber) ? asNumber : 0;
};

// Expects an array of tokens where token.value is like "$1,234.56"
export const sumTokenValuesUsd = (tokens: Array<{ value: string }> | undefined): number => {
  if (!tokens || tokens.length === 0) return 0;
  return tokens.reduce((sum, token) => sum + parseUsdToNumber(token.value), 0);
};

// Given a wallet object with tokens array
export const getWalletTotalUsd = (
  wallet: { tokens?: Array<{ value: string }> } | undefined
): number => {
  if (!wallet) return 0;
  return sumTokenValuesUsd(wallet.tokens);
};

// Given an array of wallets
export const getVisitorTotalUsd = (
  wallets: Array<{ tokens?: Array<{ value: string }> }> | undefined
): number => {
  if (!wallets || wallets.length === 0) return 0;
  return wallets.reduce((sum, w) => sum + getWalletTotalUsd(w), 0);
};

export type ValuationTier = 'micro' | 'small' | 'medium' | 'large' | 'extra_large' | 'kaiju';

export const getValuationTier = (usdTotal: number): ValuationTier => {
  if (usdTotal <= 250) return 'micro';
  if (usdTotal <= 1000) return 'small'; // 251 - 1000
  if (usdTotal <= 10000) return 'medium'; // 1001 - 10,000
  if (usdTotal <= 25000) return 'large'; // 10,001 - 25,000
  if (usdTotal <= 100000) return 'extra_large'; // 25,001 - 100,000
  return 'kaiju'; // 100,001+
};

export const getValuationEmoji = (usdTotal: number): string => {
  const tier = getValuationTier(usdTotal);
  switch (tier) {
    case 'micro':
      return '🦐'; // krill
    case 'small':
      return '🐟'; // fish
    case 'medium':
      return '🐬'; // dolphin
    case 'large':
      return '🦈'; // shark
    case 'extra_large':
      return '🐋'; // whale
    case 'kaiju':
      return '🐉'; // kaiju
    default:
      return '🐋'; // whale
  }
};

export const getValuationLabel = (usdTotal: number): string => {
  const tier = getValuationTier(usdTotal);
  switch (tier) {
    case 'micro':
      return 'Micro';
    case 'small':
      return 'Small';
    case 'medium':
      return 'Medium';
    case 'large':
      return 'Large';
    case 'extra_large':
      return 'Extra Large';
    case 'kaiju':
      return 'XXL';
    default:
      return 'Unknown';
  }
};
