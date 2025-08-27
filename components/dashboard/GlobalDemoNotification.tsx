"use client";

import React, { useEffect } from "react";
import { Info, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/images/logo.svg";

interface GlobalDemoNotificationProps {
  isVisible: boolean;
  onClose: () => void;
}

const GlobalDemoNotification: React.FC<GlobalDemoNotificationProps> = ({
  isVisible,
  onClose,
}) => {
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
    <div className="animate-in slide-in-from-bottom-2 fixed bottom-4 right-4 z-50 w-80 rounded-lg bg-gray-900 p-6 text-white shadow-lg duration-300">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-3 top-3 text-gray-400 transition-colors hover:text-white"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Header with Logo */}
      <div className="mb-4 flex items-center justify-center gap-2 border-b border-gray-700 pb-4">
        <div className="text-sm text-gray-400">Powered by:</div>
        <div className="flex items-center gap-2">
          <Image src={Logo} width={20} height={20} alt="Lucia Protocol Logo" />
          <span className="text-sm font-medium text-white">Lucia Protocol</span>
        </div>
      </div>

      {/* Main Message */}
      <div className="mb-4 text-center text-sm leading-relaxed text-gray-300">
        <div className="mb-3 flex items-center justify-center gap-2">
          <Info className="h-5 w-5 text-orange-400" />
          <span className="text-base font-medium text-white">
            Demo Data Notice
          </span>
        </div>
        <p className="mb-3">
          While we do collect this information, it&apos;s currently not live. To
          see a live example please request a full demo.
        </p>
        <p className="text-xs text-gray-400">
          Wallet addresses, balances, transactions, and rewards shown are demo
          data for illustration purposes.
        </p>
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <button
          onClick={() =>
            window.open("https://ads.clickinsights.xyz/contact", "_blank")
          }
          className="btn flex w-full items-center justify-center gap-2 bg-orange-500 py-2 text-sm text-white shadow outline outline-1 outline-orange-500 hover:bg-orange-400 hover:outline-2 hover:outline-orange-400 hover:drop-shadow-lg"
        >
          <ExternalLink className="h-4 w-4" />
          Request Full Demo
        </button>
      </div>
    </div>
  );
};

export default GlobalDemoNotification;
