import React from "react";
import { VisitorData } from "./dashboard-seed-data";
import MapboxMap from "./mapbox-map";

interface VisitHistorySectionProps {
  visitor: VisitorData;
  ipIndex: number;
  onNavigateIP: (direction: "prev" | "next") => void;
}

const VisitHistorySection: React.FC<VisitHistorySectionProps> = ({
  visitor,
  ipIndex,
  onNavigateIP,
}) => {
  return (
    <>
      <section className="p-3">
        <div className="flex items-center justify-center gap-3 mb-2">
          <button
            onClick={() => onNavigateIP("prev")}
            disabled={visitor.ip_addresses.length <= 1}
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
            VISIT HISTORY
          </h2>
          <button
            onClick={() => onNavigateIP("next")}
            disabled={visitor.ip_addresses.length <= 1}
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
        <div className="border border-gray-200 rounded-lg">
          <div className="border-t border-gray-200">
            <div className="h-48 overflow-hidden bg-gray-100">
              <MapboxMap
                location={
                  visitor.ip_addresses[ipIndex]?.location || visitor.location
                }
                className="h-full w-full"
              />
            </div>
          </div>
          <ul className="divide-y divide-gray-200 text-sm">
            <li className="p-2.5 flex justify-between items-center">
              <strong className="font-medium text-gray-600">
                Last Connected
              </strong>
              <span>{visitor.visit_time}</span>
            </li>
            <li className="p-2.5 flex justify-between items-center">
              <strong className="font-medium text-gray-600">Location</strong>
              <span>
                {visitor.ip_addresses[ipIndex]?.location || visitor.location}
              </span>
            </li>
            <li className="p-2.5 flex justify-between items-center">
              <strong className="font-medium text-gray-600">IP Address</strong>
              <span>
                {visitor.ip_addresses[ipIndex]?.ip || visitor.ip_address}
              </span>
            </li>
            <li className="p-2.5 flex justify-between items-center">
              <strong className="font-medium text-gray-600">Browser</strong>
              <span>{visitor.browser}</span>
            </li>
            <li className="p-2.5 flex justify-between items-center bg-green-50">
              <strong className="font-medium text-gray-600">
                Incognito mode
              </strong>
              <span className="font-semibold text-green-600">
                {visitor.incognito ? "Detected" : "Not Detected"}
              </span>
            </li>
            <li className="p-2.5 flex justify-between items-center bg-red-50">
              <strong className="font-medium text-gray-600">VPN</strong>
              <span className="font-semibold text-red-600">
                {visitor.ip_addresses[ipIndex]?.vpn_detected || visitor.vpn
                  ? "Detected"
                  : "Not Detected"}
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="p-3 pt-0">
        <div className="border border-gray-200 rounded-lg p-3">
          <h3 className="text-base font-semibold text-gray-600 mb-2">
            Device Information
          </h3>
          <ul className="space-y-1.5 text-sm">
            <li className="flex justify-between items-center">
              <span className="text-gray-500">Device Type</span>
              <span className="font-medium bg-gray-100 px-1.5 py-0.5 rounded">
                {visitor.device_type}
              </span>
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
    </>
  );
};

export default VisitHistorySection;
