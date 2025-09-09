"use client";

import React, { useEffect } from "react";
import { Info, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/images/logo.svg";

interface GlobalDemoNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  source?: string;
}

const GlobalDemoNotification: React.FC<GlobalDemoNotificationProps> = ({
  isVisible,
  onClose,
  source,
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
    <div
      className="animate-in slide-in-from-bottom-2 fixed bottom-4 right-4 w-80 rounded-lg p-6 text-white shadow-lg duration-300"
      style={{ backgroundColor: "rgb(51 65 85)", zIndex: 9999 }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-3 top-3 text-gray-400 transition-colors hover:text-white"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Header with Logo */}
      <div
        className="mb-4 flex items-center justify-center gap-2 border-b pb-4"
        style={{ borderColor: "#f6e491" }}
      >
        <div className="text-sm" style={{ color: "#f6e491" }}>
          Powered by:
        </div>
        <div className="flex items-center gap-2">
          <Image src={Logo} width={75} alt="Lucia Protocol Logo" />
        </div>
      </div>

      {/* Main Message */}
      <div className="mb-4 text-center text-sm leading-relaxed text-white">
        <div className="mb-3 flex items-center justify-center gap-2">
          <Info className="h-5 w-5" style={{ color: "#f6e491" }} />
          <span className="text-base font-medium text-white">
            Demo Data Notice
          </span>
        </div>
        <p className="mb-3">
          While we do collect this information, it&apos;s currently not live. To
          see a live example please request a full demo.
        </p>
        <p className="text-xs" style={{ color: "#f6e491" }}>
          Wallet addresses, balances, transactions, and rewards shown are demo
          data for illustration purposes.
        </p>
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Button clicked!"); // Debug log

            // Add visual feedback
            e.currentTarget.style.transform = "scale(0.95)";
            setTimeout(() => {
              e.currentTarget.style.transform = "scale(1)";
            }, 150);

            try {
              const stored =
                typeof window !== "undefined"
                  ? window.sessionStorage.getItem("lucia_demo_source")
                  : null;
              const s = source || stored || "unknown";
              const url = new URL("https://ads.clickinsights.xyz/contact");
              url.searchParams.set("demo_source", s);
              console.log("Opening URL:", url.toString()); // Debug log

              // Try to open the URL in a new tab
              const newWindow = window.open(
                url.toString(),
                "_blank",
                "noopener,noreferrer",
              );

              // Check if popup was blocked by testing if the window is still accessible
              if (
                !newWindow ||
                newWindow.closed ||
                typeof newWindow.closed === "undefined"
              ) {
                // Popup was blocked, try alternative approach
                // Create a temporary link element and click it
                const link = document.createElement("a");
                link.href = url.toString();
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }
            } catch (error) {
              window.open("https://ads.clickinsights.xyz/contact", "_blank");
            }
          }}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md py-2 text-sm text-white shadow outline outline-1 transition-all duration-300 hover:outline-2 hover:drop-shadow-lg"
          style={{
            backgroundColor: "#f6e491",
            color: "rgb(51 65 85)",
            outlineColor: "#f6e491",
            borderColor: "#f6e491",
            pointerEvents: "auto",
          }}
        >
          <ExternalLink className="h-4 w-4" />
          Request Full Demo
        </button>
      </div>
    </div>
  );
};

export default GlobalDemoNotification;
