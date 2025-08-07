import React, { useState, useMemo } from 'react';
import { MapPin, ChevronUp, Wallet, Mail, Receipt, TriangleAlert, Copy, Search, ChevronDown } from 'lucide-react';
import { VisitorData, Transaction, IPAddress, Wallet as WalletData } from './dashboard-seed-data';

interface DashboardProps {
  visitors: VisitorData[];
  totalVisits: number;
  totalIncognitoVisits: number;
  totalUniqueIPs: number;
  totalUniqueGeolocations: number;
  totalWalletsDetected: number;
  totalLuciaRewards: string;
  totalAdsClicked: number;
  totalClickIds: number;
}

const Dashboard: React.FC<DashboardProps> = ({
  visitors,
  totalVisits,
  totalIncognitoVisits,
  totalUniqueIPs,
  totalUniqueGeolocations,
  totalWalletsDetected,
  totalLuciaRewards,
  totalAdsClicked,
  totalClickIds
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTabs, setExpandedTabs] = useState<Set<string>>(new Set());
  const [ipIndex, setIpIndex] = useState<Record<string, number>>({});
  const [walletIndex, setWalletIndex] = useState<Record<string, number>>({});

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <>
            {/* Visit Summary - Single Row */}
            <section className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-200">
              <div className="p-3 border-r border-gray-200">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">TOTAL VISITS</p>
                <p className="text-sm font-semibold text-gray-600 mt-1">{totalVisits}</p>
              </div>
              <div className="p-3 border-r border-gray-200">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">TOTAL INCOGNITO VISITS</p>
                <p className="text-sm font-semibold text-gray-600 mt-1">{totalIncognitoVisits}</p>
              </div>
              <div className="p-3 border-r border-gray-200">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">TOTAL UNIQUEIP ADDRESSES</p>
                <p className="text-sm font-semibold text-gray-600 mt-1">{totalUniqueIPs}</p>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">TOTAL UNIQUE GEOLOCATIONS</p>
                <p className="text-sm font-semibold text-gray-600 mt-1">{totalUniqueGeolocations}</p>
              </div>
            </section>

            {/* Lucia Summary - Single Row */}
            <section className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-200">
              <div className="p-3 border-r border-gray-200">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">TOTAL WALLETS DETECTED</p>
                <p className="text-sm font-semibold text-gray-600 mt-1">{totalWalletsDetected}</p>
              </div>
              <div className="p-3 border-r border-gray-200">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">LUCIA REWARDS DISTRIBUTED</p>
                <p className="text-sm font-semibold text-gray-600 mt-1">{totalLuciaRewards}</p>
              </div>
              <div className="p-3 border-r border-gray-200">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">TOTAL ADS CLICKED</p>
                <p className="text-sm font-semibold text-gray-600 mt-1">{totalAdsClicked}</p>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">TOTAL CLICK IDS</p>
                <p className="text-sm font-semibold text-gray-600 mt-1">{totalClickIds}</p>
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
                {filteredVisitors.map((visitor) => (
                  <div key={visitor.visitor_id} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Tab Header */}
                    <button
                      onClick={() => toggleTab(visitor.visitor_id)}
                      className="w-full p-2 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-medium text-gray-700">
                          {visitor.visitor_id}
                        </span>
                        <span className="text-xs text-gray-500">
                          {visitor.visit_time}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        {/* Suspect Score */}
                        <div className={`border p-1 rounded text-center ${
                          visitor.suspect_score >= 7 ? 'border-red-500' : 
                          visitor.suspect_score >= 4 ? 'border-orange-500' : 
                          'border-green-500'
                        }`}>
                          <p className={`text-xs font-semibold ${
                            visitor.suspect_score >= 7 ? 'text-red-500' : 
                            visitor.suspect_score >= 4 ? 'text-orange-500' : 
                            'text-green-500'
                          }`}>SUSPECT SCORE</p>
                          <p className={`text-sm font-bold flex items-center justify-center gap-1 ${
                            visitor.suspect_score >= 7 ? 'text-red-500' : 
                            visitor.suspect_score >= 4 ? 'text-orange-500' : 
                            'text-green-500'
                          }`}>
                            {visitor.suspect_score} <TriangleAlert className="w-2.5 h-2.5" />
                          </p>
                        </div>
                        <ChevronDown 
                          className={`w-4 h-4 text-gray-400 transition-transform ${
                            expandedTabs.has(visitor.visitor_id) ? 'rotate-180' : ''
                          }`} 
                        />
                      </div>
                    </button>

                    {/* Tab Content */}
                    {expandedTabs.has(visitor.visitor_id) && (
                      <div className="border-t border-gray-200">
                        {/* Visitor Info Row - Top */}
                        <section className="p-3 border-b border-gray-200">                  
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-3">
                            <div className="text-center">
                              <p className="text-xs text-gray-400 font-semibold tracking-wider">INCOGNITO SESSIONS</p>
                              <p className="text-sm font-semibold text-gray-600">{visitor.incognito_sessions}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-400 font-semibold tracking-wider">ADS CLICKED</p>
                              <p className="text-sm font-semibold text-gray-600">{visitor.ads_clicked}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-400 font-semibold tracking-wider">CLICK IDS</p>
                              <p className="text-sm font-semibold text-gray-600">{visitor.click_ids}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-400 font-semibold tracking-wider">TOTAL VISITS</p>
                              <p className="text-sm font-semibold text-gray-600">{visitor.total_visits}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-400 font-semibold tracking-wider">IP ADDRESSES</p>
                              <p className="text-sm font-semibold text-gray-600">{visitor.ip_addresses.length}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-400 font-semibold tracking-wider">WALLETS</p>
                              <p className="text-sm font-semibold text-gray-600">{visitor.wallets.length}</p>
                            </div>
                          </div>
                          {/* Associated Emails, IP Addresses, and Wallet Addresses */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {/* Associated Emails */}
                            <div className="border border-gray-200 rounded-lg p-3">
                              <h3 className="text-base font-semibold text-gray-600 mb-2 flex items-center gap-2">
                                <Mail className="text-orange-500 w-4 h-4" /> Associated Emails
                              </h3>
                              <ul className="space-y-1.5 text-sm">
                                {visitor.associated_emails.map((email, index) => (
                                  <li key={index} className="flex items-center gap-1.5 text-gray-600">
                                    <div className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    <span className="truncate">{email}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* IP Addresses */}
                            <div className="border border-gray-200 rounded-lg p-3">
                              <h3 className="text-base font-semibold text-gray-600 mb-2 flex items-center gap-2">
                                <MapPin className="text-orange-500 w-4 h-4" /> IP Addresses
                              </h3>
                              <ul className="space-y-1.5 text-sm">
                                {visitor.ip_addresses.map((ipData, index) => (
                                  <li key={index} className="flex items-center gap-1.5 text-gray-600">
                                    <div className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    <div className="flex flex-col">
                                      <span className="font-mono text-xs">{ipData.ip}</span>
                                      <span className="text-xs text-gray-400">{ipData.location}</span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Wallet Addresses */}
                            <div className="border border-gray-200 rounded-lg p-3">
                              <h3 className="text-base font-semibold text-gray-600 mb-2 flex items-center gap-2">
                                <Wallet className="text-orange-500 w-4 h-4" /> Wallet Addresses
                              </h3>
                              <ul className="space-y-1.5 text-sm">
                                {visitor.wallets.map((wallet, index) => (
                                  <li key={index} className="flex items-center gap-1.5 text-gray-600">
                                    <div className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    <div className="flex flex-col">
                                      <span className="font-mono text-xs">{wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</span>
                                      {wallet.ens_domain && (
                                        <span className="text-xs text-orange-500">{wallet.ens_domain}</span>
                                      )}
                                    </div>
                                  </li>
                                ))}
                              </ul>
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
                                  <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                                    <MapPin className="text-orange-500 w-8 h-8" />
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
                                      <div className="w-4 h-4 bg-orange-500 rounded"></div> {visitor.wallets[walletIndex[visitor.visitor_id] || 0]?.type || visitor.wallet_type}
                                    </span>
                                  </li>
                                  <li className="flex justify-between items-center gap-1.5">
                                    <span className="text-gray-500">Wallet Address</span>
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-mono text-xs bg-gray-100 p-0.5 rounded">
                                        {visitor.wallets[walletIndex[visitor.visitor_id] || 0]?.address ? 
                                          `${visitor.wallets[walletIndex[visitor.visitor_id] || 0].address.slice(0, 6)}...${visitor.wallets[walletIndex[visitor.visitor_id] || 0].address.slice(-4)}` :
                                          `${visitor.wallet_address.slice(0, 6)}...${visitor.wallet_address.slice(-4)}`
                                        }
                                      </span>
                                      <button 
                                        onClick={() => copyToClipboard(visitor.wallets[walletIndex[visitor.visitor_id] || 0]?.address || visitor.wallet_address)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                        title="Copy address"
                                      >
                                        <Copy className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </li>
                                  <li className="flex justify-between items-center">
                                    <span className="text-gray-500">Wallet Balance</span>
                                    <span className="font-medium">{visitor.wallets[walletIndex[visitor.visitor_id] || 0]?.balance || visitor.wallet_balance}</span>
                                  </li>
                                  <li className="flex justify-between items-center gap-1.5">
                                    <span className="text-gray-500">ENS Domain</span>
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-medium text-orange-500">{visitor.wallets[walletIndex[visitor.visitor_id] || 0]?.ens_domain || visitor.ens_domain}</span>
                                      <button 
                                        onClick={() => copyToClipboard(visitor.wallets[walletIndex[visitor.visitor_id] || 0]?.ens_domain || visitor.ens_domain)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                        title="Copy ENS domain"
                                      >
                                        <Copy className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </li>
                                </ul>
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