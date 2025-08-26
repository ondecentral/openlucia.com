'use client';

import React, { useEffect } from 'react';
import { Info, ExternalLink, X } from 'lucide-react';
import Image from 'next/image';
import Logo from '@/public/images/logo.svg';

interface GlobalDemoNotificationProps {
  isVisible: boolean;
  onClose: () => void;
}

const GlobalDemoNotification: React.FC<GlobalDemoNotificationProps> = ({ isVisible, onClose }) => {
  // Auto-hide after 15 seconds when notification becomes visible
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 10000); // 7 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-gray-900 p-6 rounded-lg shadow-lg text-white z-50 animate-in slide-in-from-bottom-2 duration-300">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Header with Logo */}
      <div className="flex items-center justify-center gap-2 mb-4 pb-4 border-b border-gray-700">
        <div className="text-sm text-gray-400">Powered by:</div>
        <div className="flex items-center gap-2">
          <Image src={Logo} width={20} height={20} alt="Lucia Protocol Logo" />
          <span className="text-sm text-white font-medium">Lucia Protocol</span>
        </div>
      </div>

      {/* Main Message */}
      <div className="mb-4 text-sm text-gray-300 leading-relaxed text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Info className="w-5 h-5 text-orange-400" />
          <span className="text-base font-medium text-white">Demo Data Notice</span>
        </div>
        <p className="mb-3">
          While we do collect this information, it's currently not live. To see a live example
          please request a full demo.
        </p>
        <p className="text-xs text-gray-400">
          Wallet addresses, balances, transactions, and rewards shown are demo data for illustration
          purposes.
        </p>
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <button
          onClick={() => window.open('https://ads.clickinsights.xyz/contact', '_blank')}
          className="btn w-full outline outline-1 outline-orange-500 bg-orange-500 text-white shadow hover:drop-shadow-lg hover:outline-2 hover:outline-orange-400 hover:bg-orange-400 flex items-center justify-center gap-2 text-sm py-2"
        >
          <ExternalLink className="w-4 h-4" />
          Request Full Demo
        </button>
      </div>
    </div>
  );
};

export default GlobalDemoNotification;
