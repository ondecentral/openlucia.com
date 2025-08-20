import React, { useMemo, useState } from 'react';
import {
  Mail,
  MapPin,
  Wallet,
  Copy,
  ExternalLink,
  Users,
  EyeOff,
  Target,
  Fingerprint,
  Network,
  Info,
  Smartphone,
  Monitor,
  Globe,
} from 'lucide-react';
import { VisitorData } from './dashboard-seed-data';
import { getExplorerUrlForAddress } from './utils';
import VisitsCarousel from './VisitsCarousel';
import DeviceViewsCarousel from './DeviceViewsCarousel';
import StatCard from './StatCard';

interface VisitorInfoSectionProps {
  visitor: VisitorData;
  onCopyToClipboard: (text: string) => void;
}

const VisitorInfoSection: React.FC<VisitorInfoSectionProps> = ({ visitor, onCopyToClipboard }) => {
  const [visitsIndex, setVisitsIndex] = useState<number>(0);
  const [deviceViewsIndex, setDeviceViewsIndex] = useState<number>(0);

  const visits = useMemo(
    () => [
      {
        title: 'TOTAL VISITS',
        value: visitor.total_visits,
        icon: <Users className="w-5 h-5 text-orange-500" />,
        tooltip: '+12.4% (24h)',
      },
      {
        title: 'INCOGNITO VISITS',
        value: visitor.incognito_sessions,
        icon: <EyeOff className="w-5 h-5 text-orange-500" />,
        tooltip: '-5.2% (24h)',
      },
    ],
    [visitor.total_visits, visitor.incognito_sessions]
  );

  const deviceViews = useMemo(
    () => [
      {
        title: 'MOBILE VIEWS',
        value: 211, // Hardcoded value
        icon: <Smartphone className="w-5 h-5 text-orange-500" />,
        tooltip: '+18.2% (24h)',
      },
      {
        title: 'DESKTOP VIEWS',
        value: 154, // Hardcoded value
        icon: <Monitor className="w-5 h-5 text-orange-500" />,
        tooltip: '+9.7% (24h)',
      },
    ],
    []
  );

  const navigateVisits = (direction: 'prev' | 'next') => {
    setVisitsIndex(current => {
      if (direction === 'next') return (current + 1) % visits.length;
      return current === 0 ? visits.length - 1 : current - 1;
    });
  };

  const navigateDeviceViews = (direction: 'prev' | 'next') => {
    setDeviceViewsIndex(current => {
      if (direction === 'next') return (current + 1) % deviceViews.length;
      return current === 0 ? deviceViews.length - 1 : current - 1;
    });
  };
  return (
    <>
      <section className="grid grid-cols-2 md:grid-cols-4 align-center border-b border-gray-200">
        <VisitsCarousel currentVisit={visits[visitsIndex]} onNavigate={navigateVisits} />
        <DeviceViewsCarousel
          currentDevice={deviceViews[deviceViewsIndex]}
          onNavigate={navigateDeviceViews}
        />
        <StatCard
          title="ADS CLICKED"
          value={visitor.ads_clicked}
          icon={<Target className="w-5 h-5 text-orange-500" />}
          tooltip="+8.7% (24h)"
          className="border-r md:border-b-0"
        />
        <StatCard
          title="CLICK IDS"
          value={visitor.click_ids}
          icon={<Fingerprint className="w-5 h-5 text-orange-500" />}
          tooltip="+12.4% (24h)"
          className=""
        />
      </section>
      <section className="grid grid-cols-2 md:grid-cols-4 align-center border-b border-gray-200">
        <StatCard
          title="WALLETS"
          value={visitor.wallets.length}
          icon={<Wallet className="w-5 h-5 text-orange-500" />}
          tooltip="+18.9% (24h)"
        />
        <StatCard
          title="VALUATION"
          value="🐋"
          icon={<span className="text-2xl">🐋</span>}
          tooltip="Whale Status"
          className="border-r md:border-b-0"
        />
        <StatCard
          title="MOST ACTIVE"
          value="Afternoon"
          icon={<span className="text-2xl">☀️</span>}
          tooltip="Peak Time"
          className="border-r md:border-b-0"
        />
        <StatCard
          title="IP ADDRESSES"
          value={visitor.ip_addresses.length}
          icon={<Network className="w-5 h-5 text-orange-500" />}
          tooltip="+3.8% (24h)"
          className=""
        />
      </section>
    </>
  );
};

export default VisitorInfoSection;
