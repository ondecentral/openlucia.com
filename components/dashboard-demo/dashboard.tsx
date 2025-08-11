import React, { useState, useMemo } from 'react';
import { MapPin, ChevronUp, Wallet, Mail, Receipt, TriangleAlert, Copy, Search, ChevronDown, MousePointerClick, Hash, Users, EyeOff, Network, Globe, Info, Eye, Target, Fingerprint, CreditCard, ExternalLink } from 'lucide-react';
import { VisitorData, Transaction, IPAddress, Wallet as WalletData, RewardTransaction } from './dashboard-seed-data';
import MapboxMap from './mapbox-map';
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
} from '@web3icons/react'


interface DashboardProps {
  visitors: VisitorData[];
  totalVisits: number;
  totalIncognitoVisits: number;
  totalUniqueIPs: number;
  totalUniqueGeolocations: number;
  totalWalletsDetected: number;
  totalUSDTRewards: string;
  totalSOLRewards: string;
  totalETHRewards: string;
  totalAdsClicked: number;
  totalClickIds: number;
}

// Build the correct explorer URL for a given wallet address
const getExplorerUrlForAddress = (address: string): string => {
  const isEvm = /^0x[a-fA-F0-9]{40}$/.test(address || '');
  return isEvm
    ? `https://etherscan.io/address/${address}`
    : `https://solscan.io/account/${address}`;
};

// Build the correct explorer URL for a given transaction hash
const getExplorerUrlForTx = (txHash: string): string => {
  const isEvmTx = /^0x([a-fA-F0-9]{64})$/.test(txHash || '');
  return isEvmTx
    ? `https://etherscan.io/tx/${txHash}`
    : `https://solscan.io/tx/${txHash}`;
};

// Gets the wallet icon based on the wallet type
const getWalletIcon = (type: string) => {
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

// Gets the token icon based on the token symbol
const getTokenIcon = (symbol: string, size: number = 24) => {
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
      return <Wallet className={`w-${size/4} h-${size/4} text-orange-500`} />;
  }
};

/**
 * Demo dashboard for data collected by the Lucia SDK.
 */
const Dashboard: React.FC<DashboardProps> = ({
  visitors,
  totalVisits,
  totalIncognitoVisits,
  totalUniqueIPs,
  totalUniqueGeolocations,
  totalWalletsDetected,
  totalUSDTRewards,
  totalSOLRewards,
  totalETHRewards,
  totalAdsClicked,
  totalClickIds
}) => {
  // For search bar
  const [searchTerm, setSearchTerm] = useState('');

  // For notification for copying to clipboard
  const [notification, setNotification] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  
  // For visitor tabs
  const [expandedTabs, setExpandedTabs] = useState<Set<string>>(new Set());
  const [expandedTokens, setExpandedTokens] = useState<Set<string>>(new Set());
  const [ipIndex, setIpIndex] = useState<Record<string, number>>({});
  const [walletIndex, setWalletIndex] = useState<Record<string, number>>({});
  
  // For rewards carousel (USDT, SOL, ETH)
  const [rewardsIndex, setRewardsIndex] = useState<number>(0);
  const rewards = useMemo(() => [
    { symbol: 'USDT', value: totalUSDTRewards, icon: <TokenUSDT size={32} variant="branded" /> },
    { symbol: 'SOL', value: totalSOLRewards, icon: <TokenSOL size={32} variant="branded" /> },
    { symbol: 'ETH', value: totalETHRewards, icon: <TokenETH size={32} variant="branded" /> },
  ], [totalUSDTRewards, totalSOLRewards, totalETHRewards]);

  // Navigate through rewards carousel
  const navigateRewards = (direction: 'prev' | 'next') => {
    setRewardsIndex((current) => {
      if (direction === 'next') return (current + 1) % rewards.length;
      return current === 0 ? rewards.length - 1 : current - 1;
    });
  };

  // For copying to clipboard and displaying notification
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setNotification({ message: 'Copied to clipboard!', visible: true });
    setTimeout(() => setNotification({ message: '', visible: false }), 2000);
  };

  // Filter visitors based on search term
  const filteredVisitors = useMemo(() => {
    if (!searchTerm) return visitors;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return visitors.filter(visitor => 
      visitor.visitor_id.toLowerCase().includes(lowerSearchTerm) ||
      visitor.wallet_address.toLowerCase().includes(lowerSearchTerm) ||
      visitor.ip_address.toLowerCase().includes(lowerSearchTerm)
    );
  }, [visitors, searchTerm]);

  const toggleTab = (visitorId: string) => {
    const newExpandedTabs = new Set(expandedTabs);
    if (newExpandedTabs.has(visitorId)) {
      newExpandedTabs.delete(visitorId);
    } else {
      newExpandedTabs.add(visitorId);
    }
    setExpandedTabs(newExpandedTabs);
  };

  // Navigate through IP addresses carousel
  const navigateIP = (visitorId: string, direction: 'prev' | 'next') => {
    const visitor = visitors.find(v => v.visitor_id === visitorId);
    if (!visitor || visitor.ip_addresses.length <= 1) return;

    const currentIndex = ipIndex[visitorId] || 0;
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % visitor.ip_addresses.length
      : currentIndex === 0 
        ? visitor.ip_addresses.length - 1 
        : currentIndex - 1;
    
    setIpIndex(prev => ({ ...prev, [visitorId]: newIndex }));
  };

  // Navigate through wallet addresses carousel
  const navigateWallet = (visitorId: string, direction: 'prev' | 'next') => {
    const visitor = visitors.find(v => v.visitor_id === visitorId);
    if (!visitor || visitor.wallets.length <= 1) return;

    const currentIndex = walletIndex[visitorId] || 0;
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % visitor.wallets.length
      : currentIndex === 0 
        ? visitor.wallets.length - 1 
        : currentIndex - 1;
    
    setWalletIndex(prev => ({ ...prev, [visitorId]: newIndex }));
  };

  return (
    <main className="w-full">
      {/* Notification */}
      {notification.visible && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300">
          {notification.message}
        </div>
      )}
      
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <>
            {/* Visit Summary - Single Row */}
            <section className="grid grid-cols-2 md:grid-cols-4 align-center border-b border-gray-200">
              <div className="p-3 border-r border-gray-200 relative">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">TOTAL VISITS</p>
                <div className="flex justify-center items-center gap-2 mt-1">
                  <Users className="w-5 h-5 text-orange-500" />
                  <p className="text-sm font-semibold text-gray-600">{totalVisits}</p>
                </div>
                <div className="absolute bottom-2 left-2 group">
                  <Info className="w-3 h-3 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    +12.4% (24h)
                  </div>
                </div>
              </div>
              <div className="p-3 border-r border-gray-200 relative">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">TOTAL INCOGNITO VISITS</p>
                <div className="flex justify-center items-center gap-2 mt-1">
                  <EyeOff className="w-5 h-5 text-orange-500" />
                  <p className="text-sm font-semibold text-gray-600">{totalIncognitoVisits}</p>
                </div>
                <div className="absolute bottom-2 left-2 group">
                  <Info className="w-3 h-3 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    -5.2% (24h)
                  </div>
                </div>
              </div>
              <div className="p-3 border-r border-gray-200 relative">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">TOTAL UNIQUE IP ADDRESSES</p>
                <div className="flex justify-center items-center gap-2 mt-1">
                  <Network className="w-5 h-5 text-orange-500" />
                  <p className="text-sm font-semibold text-gray-600">{totalUniqueIPs}</p>
                </div>
                <div className="absolute bottom-2 left-2 group">
                  <Info className="w-3 h-3 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    +8.7% (24h)
                  </div>
                </div>
              </div>
              <div className="p-3 relative">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">TOTAL UNIQUE GEOLOCATIONS</p>
                <div className="flex justify-center items-center gap-2 mt-1">
                  <Globe className="w-5 h-5 text-orange-500" />
                  <p className="text-sm font-semibold text-gray-600">{totalUniqueGeolocations}</p>
                </div>
                <div className="absolute bottom-2 left-2 group">
                  <Info className="w-3 h-3 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    +15.3% (24h)
                  </div>
                </div>
              </div>
            </section>

            {/* Lucia Summary - Single Row */}
            <section className="grid grid-cols-2 md:grid-cols-4 align-center border-b border-gray-200">
              <div className="p-3 border-r border-gray-200 relative">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">TOTAL WALLETS DETECTED</p>
                <div className="flex justify-center items-center gap-2 mt-1">
                  <Wallet className="w-5 h-5 text-orange-500" />
                  <p className="text-sm font-semibold text-gray-600">{totalWalletsDetected}</p>
                </div>
                <div className="absolute bottom-2 left-2 group">
                  <Info className="w-3 h-3 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    +23.1% (24h)
                  </div>
                </div>
              </div>
              <div className="p-3 border-r border-gray-200 relative">
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => navigateRewards('prev')}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Previous reward"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <p className="text-xs text-gray-400 font-semibold tracking-wider">REWARDS DISTRIBUTED</p>
                  <button
                    onClick={() => navigateRewards('next')}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Next reward"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div className="flex justify-center items-center gap-2 mt-1">
                  {rewards[rewardsIndex].icon}
                  <p className="text-sm font-semibold text-gray-600">{rewards[rewardsIndex].value}</p>
                </div>
                <div className="absolute bottom-2 left-2 group">
                  <Info className="w-3 h-3 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    +18.9% (24h)
                  </div>
                </div>
              </div>
              <div className="p-3 border-r border-gray-200 relative">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">TOTAL ADS CLICKED</p>
                <div className="flex justify-center items-center gap-2 mt-1">
                  <MousePointerClick className="w-5 h-5 text-orange-500" />
                  <p className="text-sm font-semibold text-gray-600">{totalAdsClicked}</p>
                </div>
                <div className="absolute bottom-2 left-2 group">
                  <Info className="w-3 h-3 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    +7.3% (24h)
                  </div>
                </div>
              </div>
              <div className="p-3 relative">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">TOTAL CLICK IDS</p>
                <div className="flex justify-center items-center gap-2 mt-1">
                  <Hash className="w-5 h-5 text-orange-500" />
                  <p className="text-sm font-semibold text-gray-600">{totalClickIds}</p>
                </div>
                <div className="absolute bottom-2 left-2 group">
                  <Info className="w-3 h-3 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    +9.1% (24h)
                  </div>
                </div>
              </div>
            </section>

            {/* Search Bar */}
            <section className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by visitor ID, wallet address, or IP address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </section>

            {/* Visitor Tabs */}
            <section className="p-3">
              <h2 className="text-xs text-gray-400 font-semibold tracking-wider mb-2">VISITORS</h2>
              <div className="space-y-2">

                {/* Map through the visitors and display them in a tab */}
                {filteredVisitors.map((visitor) => (
                  <div key={visitor.visitor_id} className="border border-gray-200 rounded-lg overflow-hidden">

                    {/* Tab Header */}
                    <div 
                      onClick={() => toggleTab(visitor.visitor_id)}
                      className="w-full p-2 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      {/* Left side - Visitor ID and timestamp stacked on mobile */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-medium text-gray-700 md:truncate">
                            {/* Responsive ID display: base=...last4, ≥360px=first4...last4, ≥md=full */}
                            <span className="hidden md:inline">{visitor.visitor_id}</span>
                            <span className="hidden min-[360px]:inline md:hidden">
                              {visitor.visitor_id.slice(0, 4)}...{visitor.visitor_id.slice(-4)}
                            </span>
                            <span className="inline min-[360px]:hidden">
                              ...{visitor.visitor_id.slice(-4)}
                            </span>
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(visitor.visitor_id);
                            }}
                            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                            title="Copy visitor ID"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs text-gray-500 w-full text-left sm:w-auto sm:text-left sm:ml-0">
                          {visitor.visit_time}
                        </span>
                      </div>
                      
                      {/* Right side - Risk level and chevron */}
                      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        {/* Risk Level */}
                        <div className={`border p-1 rounded text-center min-w-[60px] ${
                          visitor.risk_level >= 80 ? 'border-red-500' : 
                          visitor.risk_level >= 50 ? 'border-orange-500' : 
                          'border-green-500'
                        }`}>
                          <p className={`text-xs font-semibold ${
                            visitor.risk_level >= 80 ? 'text-red-500' : 
                            visitor.risk_level >= 50 ? 'text-orange-500' : 
                            'text-green-500'
                          }`}>RISK LEVEL</p>
                          <p className={`text-sm font-bold flex items-center justify-center gap-1 ${
                            visitor.risk_level >= 80 ? 'text-red-500' : 
                            visitor.risk_level >= 50 ? 'text-orange-500' : 
                            'text-green-500'
                          }`}>
                            {visitor.risk_level} <TriangleAlert className="w-2.5 h-2.5" />
                          </p>
                        </div>
                        <ChevronDown 
                          className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${
                            expandedTabs.has(visitor.visitor_id) ? 'rotate-180' : ''
                          }`} 
                        />
                      </div>
                    </div>

                    {/* Tab Content */}
                    {expandedTabs.has(visitor.visitor_id) && (
                      <div className="border-t border-gray-200">
                        {/* Visitor Info Row - Top */}
                        <section className="p-3 border-b border-gray-200">                  
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-3">
                            <div className="text-center relative">
                              <p className="text-xs text-gray-400 font-semibold tracking-wider">INCOGNITO SESSIONS</p>
                              <div className="flex justify-center items-center gap-2 mt-1">
                                <EyeOff className="w-4 h-4 text-orange-500" />
                                <p className="text-sm font-semibold text-gray-600">{visitor.incognito_sessions}</p>
                              </div>
                              <div className="absolute bottom-0 left-1 group">
                                <Info className="w-2.5 h-2.5 text-gray-400 cursor-help" />
                                <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  +15.2% (24h)
                                </div>
                              </div>
                            </div>
                            <div className="text-center relative">
                              <p className="text-xs text-gray-400 font-semibold tracking-wider">ADS CLICKED</p>
                              <div className="flex justify-center items-center gap-2 mt-1">
                                <Target className="w-4 h-4 text-orange-500" />
                                <p className="text-sm font-semibold text-gray-600">{visitor.ads_clicked}</p>
                              </div>
                              <div className="absolute bottom-0 left-1 group">
                                <Info className="w-2.5 h-2.5 text-gray-400 cursor-help" />
                                <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  +8.7% (24h)
                                </div>
                              </div>
                            </div>
                            <div className="text-center relative">
                              <p className="text-xs text-gray-400 font-semibold tracking-wider">CLICK IDS</p>
                              <div className="flex justify-center items-center gap-2 mt-1">
                                <Fingerprint className="w-4 h-4 text-orange-500" />
                                <p className="text-sm font-semibold text-gray-600">{visitor.click_ids}</p>
                              </div>
                              <div className="absolute bottom-0 left-1 group">
                                <Info className="w-2.5 h-2.5 text-gray-400 cursor-help" />
                                <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  +12.4% (24h)
                                </div>
                              </div>
                            </div>
                            <div className="text-center relative">
                              <p className="text-xs text-gray-400 font-semibold tracking-wider">TOTAL VISITS</p>
                              <div className="flex justify-center items-center gap-2 mt-1">
                                <Users className="w-4 h-4 text-orange-500" />
                                <p className="text-sm font-semibold text-gray-600">{visitor.total_visits}</p>
                              </div>
                              <div className="absolute bottom-0 left-1 group">
                                <Info className="w-2.5 h-2.5 text-gray-400 cursor-help" />
                                <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  +6.3% (24h)
                                </div>
                              </div>
                            </div>
                            <div className="text-center relative">
                              <p className="text-xs text-gray-400 font-semibold tracking-wider">IP ADDRESSES</p>
                              <div className="flex justify-center items-center gap-2 mt-1">
                                <Network className="w-4 h-4 text-orange-500" />
                                <p className="text-sm font-semibold text-gray-600">{visitor.ip_addresses.length}</p>
                              </div>
                              <div className="absolute bottom-0 left-1 group">
                                <Info className="w-2.5 h-2.5 text-gray-400 cursor-help" />
                                <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  +3.8% (24h)
                                </div>
                              </div>
                            </div>
                            <div className="text-center relative">
                              <p className="text-xs text-gray-400 font-semibold tracking-wider">WALLETS</p>
                              <div className="flex justify-center items-center gap-2 mt-1">
                                <Wallet className="w-4 h-4 text-orange-500" />
                                <p className="text-sm font-semibold text-gray-600">{visitor.wallets.length}</p>
                              </div>
                              <div className="absolute bottom-0 left-1 group">
                                <Info className="w-2.5 h-2.5 text-gray-400 cursor-help" />
                                <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  +18.9% (24h)
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Associated Emails, IP Addresses, and Wallet Addresses */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {/* Associated Emails */}
                            <div className="border border-gray-200 rounded-lg p-3">
                              <h3 className="text-base font-semibold text-gray-600 mb-3 flex items-center justify-center gap-2 border-b border-gray-200 pb-2">
                                <Mail className="text-orange-500 w-4 h-4" /> Associated Emails
                              </h3>
                              <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2">
                                {visitor.associated_emails.map((email, index) => (
                                  <div key={index} className="flex text-left justify-between p-1 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                                    <span className="text-sm text-gray-600 truncate flex-1">{email}</span>
                                    <button
                                      onClick={() => copyToClipboard(email)}
                                      className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                                      title="Copy email"
                                    >
                                      <Copy className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* IP Addresses */}
                            <div className="border border-gray-200 rounded-lg p-3">
                              <h3 className="text-base font-semibold text-gray-600 mb-3 flex items-center justify-center gap-2 border-b border-gray-200 pb-2">
                                <MapPin className="text-orange-500 w-4 h-4" /> IP Addresses
                              </h3>
                              <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2">
                                {visitor.ip_addresses.map((ipData, index) => (
                                  <div key={index} className="p-1 text-left bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center justify-between">
                                      <div className="flex-1">
                                        <div className="font-mono text-sm text-gray-600">{ipData.ip}</div>
                                        <div className="text-xs text-gray-400">{ipData.location}</div>
                                      </div>
                                      <button
                                        onClick={() => copyToClipboard(ipData.ip)}
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

                            {/* Wallet Addresses */}
                            <div className="border border-gray-200 rounded-lg p-3">
                              <h3 className="text-base font-semibold text-gray-600 mb-3 flex items-center justify-center gap-2 border-b border-gray-200 pb-2">
                                <Wallet className="text-orange-500 w-4 h-4" /> Wallet Addresses
                              </h3>
                              <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2">
                                {visitor.wallets.map((wallet, index) => (
                                  <div key={index} className="p-1 text-left bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center justify-between">
                                      <div className="flex-1">
                                        <div className="font-mono text-sm text-gray-600">
                                          {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                                        </div>
                                        {wallet.ens_domain && (
                                          <div className="text-xs text-orange-500">{wallet.ens_domain}</div>
                                        )}
                                      </div>
                                      <div className="flex items-center">
                                        <button
                                          onClick={() => copyToClipboard(wallet.address)}
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

                          {/* Rewards Received Section */}
                          <div className="mt-4 border border-gray-200 rounded-lg p-3 relative">
                            <h3 className="text-base font-semibold text-gray-600 mb-3 flex items-center gap-2">
                              <CreditCard className="text-orange-500 w-4 h-4" /> Rewards Received
                            </h3>
                            
                            {/* Three Column Layout for Rewards */}
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              {/* USDT Column */}
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="flex justify-center items-center gap-2 mb-2">
                                  <TokenUSDT size={24} variant="branded" />
                                  <span className="hidden min-[410px]:inline text-sm font-semibold text-gray-600">USDT</span>
                                </div>
                                <p className="text-lg font-bold text-gray-800">{visitor.rewards?.totalUSDT ?? '0'}</p>
                                <p className="text-xs text-gray-500">Total Received</p>
                              </div>
                              
                              {/* ETH Column */}
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="flex justify-center items-center gap-2 mb-2">
                                  <TokenETH size={24} variant="branded" />
                                  <span className="hidden min-[410px]:inline text-sm font-semibold text-gray-600">ETH</span>
                                </div>
                                <p className="text-lg font-bold text-gray-800">{visitor.rewards?.totalETH ?? '0'}</p>
                                <p className="text-xs text-gray-500">Total Received</p>
                              </div>
                              
                              {/* SOL Column */}
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="flex justify-center items-center gap-2 mb-2">
                                  <TokenSOL size={24} variant="branded" />
                                  <span className="hidden min-[410px]:inline text-sm font-semibold text-gray-600">SOL</span>
                                </div>
                                <p className="text-lg font-bold text-gray-800">{visitor.rewards?.totalSOL ?? '0'}</p>
                                <p className="text-xs text-gray-500">Total Received</p>
                              </div>
                            </div>
                            
                            {/* Recent Transactions */}
                            <div className="border-t border-gray-200 pt-3">
                              <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                                <Receipt className="text-orange-500 w-3 h-3" /> Recent Reward Transactions
                              </h4>
                                <div className="max-h-[120px] overflow-y-auto border border-gray-200 rounded-lg">
                                  <div className="space-y-1 p-1">
                                    {visitor.rewards?.transactions?.map((transaction: RewardTransaction) => (
                                      <div
                                        key={transaction.id}
                                        className="flex flex-col min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-between p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                                        onClick={() => copyToClipboard(transaction.txHash)}
                                      >
                                        {/* Transaction Hash and Time - Single row on mobile, left side on 360px+ */}
                                        <div className="flex items-center justify-center gap-2 min-[360px]:justify-start min-[360px]:flex-1">
                                          {transaction.token === 'USDT' && <TokenUSDT size={16} variant="branded" />}
                                          {transaction.token === 'ETH' && <TokenETH size={16} variant="branded" />}
                                          {transaction.token === 'SOL' && <TokenSOL size={16} variant="branded" />}
                                          <span className="text-sm font-mono text-gray-600">
                                            {transaction.txHash.slice(0, 4)}...{transaction.txHash.slice(-4)}
                                          </span>
                                          <button
                                            onClick={(e) => { e.stopPropagation(); copyToClipboard(transaction.txHash); }}
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
                                          {/* Time - Only visible on 426px+ screens, positioned after the buttons */}
                                          <span className="hidden min-[426px]:inline text-xs text-gray-400 ml-4">
                                            {transaction.timestamp}
                                          </span>
                                        </div>
                                        {/* Amount - Right side on all screen sizes */}
                                        <div className="flex justify-center min-[360px]:justify-end min-[360px]:flex-shrink-0">
                                          <p className="text-sm font-semibold text-green-600">+{transaction.amount} {transaction.token}</p>
                                        </div>
                                      </div>
                                    ))}
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
                        </section>

                        {/* Main Content Grid - Equal Layout: 50% left, 50% right */}
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                          {/* Left Column - Takes 50% */}
                          <div className="lg:border-r border-gray-200">
                            <section className="p-3">
                              <div className="flex items-center justify-center gap-3 mb-2">
                                <button
                                  onClick={() => navigateIP(visitor.visitor_id, 'prev')}
                                  disabled={visitor.ip_addresses.length <= 1}
                                  className="text-gray-400 hover:text-gray-600 disabled:text-gray-200 disabled:cursor-not-allowed transition-colors"
                                >
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </button>
                                <h2 className="text-xs text-gray-400 font-semibold tracking-wider">VISIT HISTORY</h2>
                                <button
                                  onClick={() => navigateIP(visitor.visitor_id, 'next')}
                                  disabled={visitor.ip_addresses.length <= 1}
                                  className="text-gray-400 hover:text-gray-600 disabled:text-gray-200 disabled:cursor-not-allowed transition-colors"
                                >
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </button>
                              </div>
                              <div className="border border-gray-200 rounded-lg">
                                <div className="border-t border-gray-200">
                                  <div className="h-48 overflow-hidden bg-gray-100">
                                    <MapboxMap 
                                      location={visitor.ip_addresses[ipIndex[visitor.visitor_id] || 0]?.location || visitor.location}
                                      className="h-full w-full"
                                    />
                                  </div>
                                  
                                </div>
                                <ul className="divide-y divide-gray-200 text-sm">
                                  <li className="p-2.5 flex justify-between items-center">
                                    <strong className="font-medium text-gray-600">Last Connected</strong>
                                    <span>{visitor.visit_time}</span>
                                  </li>
                                  <li className="p-2.5 flex justify-between items-center">
                                    <strong className="font-medium text-gray-600">Location</strong>
                                    <span>{visitor.ip_addresses[ipIndex[visitor.visitor_id] || 0]?.location || visitor.location}</span>
                                  </li>
                                  <li className="p-2.5 flex justify-between items-center">
                                    <strong className="font-medium text-gray-600">IP Address</strong>
                                    <span>{visitor.ip_addresses[ipIndex[visitor.visitor_id] || 0]?.ip || visitor.ip_address}</span>
                                  </li>
                                  <li className="p-2.5 flex justify-between items-center">
                                    <strong className="font-medium text-gray-600">Browser</strong>
                                    <span>{visitor.browser}</span>
                                  </li>
                                  <li className="p-2.5 flex justify-between items-center bg-green-50">
                                    <strong className="font-medium text-gray-600">Incognito mode</strong>
                                    <span className="font-semibold text-green-600">
                                      {visitor.incognito ? 'Detected' : 'Not Detected'}
                                    </span>
                                  </li>
                                  <li className="p-2.5 flex justify-between items-center bg-red-50">
                                    <strong className="font-medium text-gray-600">VPN</strong>
                                    <span className="font-semibold text-red-600">
                                      {visitor.ip_addresses[ipIndex[visitor.visitor_id] || 0]?.vpn_detected || visitor.vpn ? 'Detected' : 'Not Detected'}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </section>
                            <section className="p-3 pt-0">
                              <div className="border border-gray-200 rounded-lg p-3">
                                <h3 className="text-base font-semibold text-gray-600 mb-2">Device Information</h3>
                                <ul className="space-y-1.5 text-sm">
                                  <li className="flex justify-between items-center">
                                    <span className="text-gray-500">Device Type</span>
                                    <span className="font-medium bg-gray-100 px-1.5 py-0.5 rounded">{visitor.device_type}</span>
                                  </li>
                                  <li className="flex justify-between items-center">
                                    <span className="text-gray-500">Operating System</span>
                                    <span className="font-medium">{visitor.os}</span>
                                  </li>
                                  <li className="flex justify-between items-center">
                                    <span className="text-gray-500">OS Version</span>
                                    <span className="font-medium">{visitor.os_version}</span>
                                  </li>
                                </ul>
                              </div>
                            </section>
                          </div>

                          {/* Right Column - Takes 50% */}
                          <div className="lg:col-span-1">
                            <section className="p-3">
                              <div className="flex items-center justify-center gap-3 mb-2">
                                <button
                                  onClick={() => navigateWallet(visitor.visitor_id, 'prev')}
                                  disabled={visitor.wallets.length <= 1}
                                  className="text-gray-400 hover:text-gray-600 disabled:text-gray-200 disabled:cursor-not-allowed transition-colors"
                                >
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </button>
                                <h2 className="text-xs text-gray-400 font-semibold tracking-wider">ASSOCIATED WALLETS</h2>
                                <button
                                  onClick={() => navigateWallet(visitor.visitor_id, 'next')}
                                  disabled={visitor.wallets.length <= 1}
                                  className="text-gray-400 hover:text-gray-600 disabled:text-gray-200 disabled:cursor-not-allowed transition-colors"
                                >
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                                      {getWalletIcon(visitor.wallets[walletIndex[visitor.visitor_id] || 0]?.type || visitor.wallet_type)}
                                      {visitor.wallets[walletIndex[visitor.visitor_id] || 0]?.type || visitor.wallet_type}
                                    </span>
                                  </li>
                                  <li className="flex justify-between items-center gap-1.5">
                                    <span className="text-gray-500">Wallet Address</span>
                                    {(() => {
                                      const fullAddress = visitor.wallets[walletIndex[visitor.visitor_id] || 0]?.address || visitor.wallet_address;
                                      return (
                                        <div className="flex items-center gap-1.5">
                                          <span className="font-mono text-xs bg-gray-100 p-0.5 rounded">
                                            {fullAddress.slice(0, 6)}...{fullAddress.slice(-4)}
                                          </span>
                                          <button 
                                            onClick={() => copyToClipboard(fullAddress)}
                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                            title="Copy address"
                                          >
                                            <Copy className="w-4 h-4" />
                                          </button>
                                          <a
                                            href={getExplorerUrlForAddress(fullAddress)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-orange-500 transition-colors"
                                            title="View on explorer"
                                          >
                                            <ExternalLink className="w-4 h-4" />
                                          </a>
                                        </div>
                                      );
                                    })()}
                                  </li>
                                  <li className="flex justify-between items-center gap-1.5">
                                    <span className="text-gray-500">ENS/SNS Domain</span>
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-medium text-orange-500">{visitor.wallets[walletIndex[visitor.visitor_id] || 0]?.ens_domain || visitor.ens_domain}</span>
                                      <button 
                                        onClick={() => copyToClipboard(visitor.wallets[walletIndex[visitor.visitor_id] || 0]?.ens_domain || visitor.ens_domain)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                        title="Copy domain"
                                      >
                                        <Copy className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </li>
                                  <li className="flex justify-between items-center">
                                    <span className="text-gray-500">Total Value</span>
                                    <span className="font-medium">
                                      {(() => {
                                        const currentWallet = visitor.wallets[walletIndex[visitor.visitor_id] || 0];
                                        const totalValue = currentWallet?.tokens.reduce((sum, token) => {
                                          return sum + parseFloat(token.value.replace('$', '').replace(',', ''));
                                        }, 0);
                                        return totalValue ? `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00';
                                      })()}
                                    </span>
                                  </li>
                                  <li className="flex justify-between items-center">
                                    <span className="text-gray-500">PNL (24h)</span>
                                    {(() => {
                                      const currentWallet = visitor.wallets[walletIndex[visitor.visitor_id] || 0];
                                      const pnlPercent = currentWallet?.tokens.some(t => t.symbol === 'ETH') ? 12.4 :
                                                       currentWallet?.tokens.some(t => t.symbol === 'SOL') ? 8.2 : 5.6;
                                      const totalValue = currentWallet?.tokens.reduce((sum, token) => {
                                        return sum + parseFloat(token.value.replace('$', '').replace(',', ''));
                                      }, 0) || 0;
                                      const pnlValue = (totalValue * (pnlPercent / 100));
                                      return (
                                        <span className={`font-medium ${pnlPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                          {pnlPercent >= 0 ? '+' : '-'}{Math.abs(pnlPercent)}% (${pnlValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                                        </span>
                                      );
                                    })()}
                                  </li>
                                </ul>
                              </div>
                              
                              {/* Token Breakdown */}
                              <div className="mt-2">
                                <div 
                                  onClick={() => setExpandedTokens(prev => {
                                    const prevArray = Array.from(prev);
                                    return new Set(
                                      prevArray.includes(visitor.visitor_id)
                                        ? prevArray.filter(id => id !== visitor.visitor_id)
                                        : [...prevArray, visitor.visitor_id]
                                    );
                                  })}
                                  className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                  <div className="flex items-center justify-between">
                                    {(() => {
                                      const currentWallet = visitor.wallets[walletIndex[visitor.visitor_id] || 0];
                                      const mainToken = currentWallet?.tokens[0];
                                      return (
                                        <div className="flex items-center gap-2">
                                          {getTokenIcon(mainToken?.symbol || '')}
                                          <span className="font-medium">{mainToken?.amount} {mainToken?.symbol}</span>
                                        </div>
                                      );
                                    })()}
                                    <ChevronDown 
                                      className={`w-4 h-4 text-gray-400 transition-transform ${
                                        expandedTokens.has(visitor.visitor_id) ? 'rotate-180' : ''
                                      }`}
                                    />
                                  </div>
                                </div>
                                
                                {/* Expanded Token List */}
                                {expandedTokens.has(visitor.visitor_id) && (
                                  <div className="mt-2 border border-gray-200 rounded-lg p-3">
                                    <div className="max-h-[240px] overflow-y-auto">
                                      <ul className="space-y-3">
                                        {(() => {
                                          const currentWallet = visitor.wallets[walletIndex[visitor.visitor_id] || 0];
                                          return currentWallet?.tokens.slice(1).map((token, index) => (
                                            <li key={index} className="flex items-center justify-between">
                                              <div className="flex items-center gap-2">
                                                {getTokenIcon(token.symbol)}
                                                <span className="font-medium">{token.amount} {token.symbol}</span>
                                              </div>
                                              <span className="text-sm text-gray-500">{token.value}</span>
                                            </li>
                                          ));
                                        })()}
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
                                  {(visitor.wallets[walletIndex[visitor.visitor_id] || 0]?.transactions || visitor.transactions).map((transaction) => (
                                    <li key={transaction.id} className="p-2.5 flex justify-between items-center hover:bg-gray-50">
                                      <div>
                                        <p className="font-medium text-gray-600">{transaction.type}</p>
                                        <p className="text-xs text-gray-400">{transaction.details}</p>
                                      </div>
                                      <div className="text-right">
                                        <p className={`font-semibold ${transaction.positive ? 'text-green-600' : 'text-red-600'}`}>
                                          {transaction.amount}
                                        </p>
                                        <p className="text-xs text-gray-400">{transaction.time}</p>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </section>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </>
        
      </div>
    </main>
  );
};

export default Dashboard;