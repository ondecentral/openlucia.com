import React, { useState, useMemo } from 'react';
import {
  MousePointerClick,
  Hash,
  Users,
  EyeOff,
  Network,
  Globe,
  Wallet,
  Smartphone,
  Monitor,
} from 'lucide-react';
import { VisitorData } from './dashboard-seed-data';
import { TokenETH, TokenSOL, TokenUSDT } from '@web3icons/react';
import StatCard from './StatCard';
import SearchBar from './SearchBar';
import RewardsCarousel from './RewardsCarousel';
import VisitsCarousel from './VisitsCarousel';
import DeviceViewsCarousel from './DeviceViewsCarousel';
import VisitorTab from './VisitorTab';

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
  totalClickIds,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<{
    message: string;
    visible: boolean;
  }>({ message: '', visible: false });
  const [expandedTabs, setExpandedTabs] = useState<Set<string>>(new Set());
  const [expandedTokens, setExpandedTokens] = useState<Set<string>>(new Set());
  const [walletIndex, setWalletIndex] = useState<Record<string, number>>({});
  const [rewardsIndex, setRewardsIndex] = useState<number>(0);
  const [visitsIndex, setVisitsIndex] = useState<number>(0);
  const [deviceViewsIndex, setDeviceViewsIndex] = useState<number>(0);

  // Rewards to be displayed in the rewards carousel
  const rewards = useMemo(
    () => [
      {
        symbol: 'USDT',
        value: totalUSDTRewards,
        icon: <TokenUSDT size={32} variant="branded" />,
      },
      {
        symbol: 'SOL',
        value: totalSOLRewards,
        icon: <TokenSOL size={32} variant="branded" />,
      },
      {
        symbol: 'ETH',
        value: totalETHRewards,
        icon: <TokenETH size={32} variant="branded" />,
      },
    ],
    [totalUSDTRewards, totalSOLRewards, totalETHRewards]
  );

  // Visits to be displayed in the visits carousel
  const visits = useMemo(
    () => [
      {
        title: 'TOTAL VISITS',
        value: totalVisits,
        icon: <Users className="w-5 h-5 text-orange-500" />,
        tooltip: '+12.4% (24h)',
      },
      {
        title: 'INCOGNITO VISITS',
        value: totalIncognitoVisits,
        icon: <EyeOff className="w-5 h-5 text-orange-500" />,
        tooltip: '-5.2% (24h)',
      },
    ],
    [totalVisits, totalIncognitoVisits]
  );

  // Device views to be displayed in the device views carousel
  const deviceViews = useMemo(
    () => [
      {
        title: 'MOBILE VIEWS',
        value: 2847, // Hardcoded value
        icon: <Smartphone className="w-5 h-5 text-orange-500" />,
        tooltip: '+18.2% (24h)',
      },
      {
        title: 'DESKTOP VIEWS',
        value: 1953, // Hardcoded value
        icon: <Monitor className="w-5 h-5 text-orange-500" />,
        tooltip: '+9.7% (24h)',
      },
    ],
    []
  );

  // Navigate through the rewards carousel
  const navigateRewards = (direction: 'prev' | 'next') => {
    setRewardsIndex(current => {
      if (direction === 'next') return (current + 1) % rewards.length;
      return current === 0 ? rewards.length - 1 : current - 1;
    });
  };

  // Navigate through the visits carousel
  const navigateVisits = (direction: 'prev' | 'next') => {
    setVisitsIndex(current => {
      if (direction === 'next') return (current + 1) % visits.length;
      return current === 0 ? visits.length - 1 : current - 1;
    });
  };

  // Navigate through the device views carousel
  const navigateDeviceViews = (direction: 'prev' | 'next') => {
    setDeviceViewsIndex(current => {
      if (direction === 'next') return (current + 1) % deviceViews.length;
      return current === 0 ? deviceViews.length - 1 : current - 1;
    });
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setNotification({ message: 'Copied to clipboard!', visible: true });
    setTimeout(() => setNotification({ message: '', visible: false }), 2000);
  };

  // Filter visitors based on search term
  const filteredVisitors = useMemo(() => {
    if (!searchTerm) return visitors;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return visitors.filter(
      visitor =>
        visitor.visitor_id.toLowerCase().includes(lowerSearchTerm) ||
        visitor.wallet_address.toLowerCase().includes(lowerSearchTerm) ||
        visitor.ip_address.toLowerCase().includes(lowerSearchTerm)
    );
  }, [visitors, searchTerm]);

  // Toggle the expanded tab for a visitor
  const toggleTab = (visitorId: string) => {
    const newExpandedTabs = new Set(expandedTabs);
    if (newExpandedTabs.has(visitorId)) {
      newExpandedTabs.delete(visitorId);
    } else {
      newExpandedTabs.add(visitorId);
    }
    setExpandedTabs(newExpandedTabs);
  };

  // Navigate through the wallets details if a visitor has multiple wallets
  const navigateWallet = (visitorId: string, direction: 'prev' | 'next') => {
    const visitor = visitors.find(v => v.visitor_id === visitorId);
    if (!visitor || visitor.wallets.length <= 1) return;

    const currentIndex = walletIndex[visitorId] || 0;
    const newIndex =
      direction === 'next'
        ? (currentIndex + 1) % visitor.wallets.length
        : currentIndex === 0
          ? visitor.wallets.length - 1
          : currentIndex - 1;

    setWalletIndex(prev => ({ ...prev, [visitorId]: newIndex }));
  };

  return (
    <main className="w-full">
      {notification.visible && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300">
          {notification.message}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <section className="grid grid-cols-2 md:grid-cols-4 align-center border-b border-gray-200">
          {/* Visits and device views section */}
          <VisitsCarousel currentVisit={visits[visitsIndex]} onNavigate={navigateVisits} />
          <DeviceViewsCarousel
            currentDevice={deviceViews[deviceViewsIndex]}
            onNavigate={navigateDeviceViews}
          />
          <StatCard
            title="TOTAL UNIQUE IP ADDRESSES"
            value={totalUniqueIPs}
            icon={<Network className="w-5 h-5 text-orange-500" />}
            tooltip="+8.7% (24h)"
            className="border-r md:border-b-0"
          />
          <StatCard
            title="TOTAL UNIQUE GEOLOCATIONS"
            value={totalUniqueGeolocations}
            icon={<Globe className="w-5 h-5 text-orange-500" />}
            tooltip="+15.3% (24h)"
            className="border-r md:border-b-0"
          />
        </section>

        {/* Stats section */}
        <section className="grid grid-cols-2 md:grid-cols-4 align-center border-b border-gray-200">
          <StatCard
            title="TOTAL WALLETS DETECTED"
            value={totalWalletsDetected}
            icon={<Wallet className="w-5 h-5 text-orange-500" />}
            tooltip="+23.1% (24h)"
          />
          <RewardsCarousel currentReward={rewards[rewardsIndex]} onNavigate={navigateRewards} />

          <StatCard
            title="TOTAL ADS CLICKED"
            value={totalAdsClicked}
            icon={<MousePointerClick className="w-5 h-5 text-orange-500" />}
            tooltip="+7.3% (24h)"
            className="border-r md:border-b-0"
          />
          <StatCard
            title="TOTAL CLICK IDS"
            value={totalClickIds}
            icon={<Hash className="w-5 h-5 text-orange-500" />}
            tooltip="+9.1% (24h)"
            className=""
          />
        </section>

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* Visitors tabs section */}
        <section className="p-3">
          <h2 className="text-xs text-gray-400 font-semibold tracking-wider mb-2">VISITORS</h2>
          <div className="space-y-2">
            {filteredVisitors.map(visitor => (
              <VisitorTab
                key={visitor.visitor_id}
                visitor={visitor}
                isExpanded={expandedTabs.has(visitor.visitor_id)}
                walletIndex={walletIndex[visitor.visitor_id] || 0}
                expandedTokens={expandedTokens.has(visitor.visitor_id)}
                onToggleTab={() => toggleTab(visitor.visitor_id)}
                onNavigateWallet={direction => navigateWallet(visitor.visitor_id, direction)}
                onToggleTokens={() =>
                  setExpandedTokens(prev => {
                    const prevArray = Array.from(prev);
                    return new Set(
                      prevArray.includes(visitor.visitor_id)
                        ? prevArray.filter(id => id !== visitor.visitor_id)
                        : [...prevArray, visitor.visitor_id]
                    );
                  })
                }
                onCopyToClipboard={copyToClipboard}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
