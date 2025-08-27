import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { VisitorData, Device } from "./dashboard-seed-data";
import MapboxMap from "./mapbox-map";
import { getDeviceIcon, getOSIcon, formatDate } from "./utils";
import DemoDataTooltip from "./DemoDataTooltip";

interface DeviceHistorySectionProps {
  visitor: VisitorData;
  onShowDemoNotification: () => void;
}

const DevicesSection: React.FC<DeviceHistorySectionProps> = ({
  visitor,
  onShowDemoNotification,
}) => {
  const [expandedDevices, setExpandedDevices] = useState<Set<string>>(
    new Set(),
  );
  const [deviceIPIndex, setDeviceIPIndex] = useState<Record<string, number>>(
    {},
  );

  // Toggle device expansion
  const toggleDevice = (deviceId: string) => {
    const newExpandedDevices = new Set(expandedDevices);
    if (newExpandedDevices.has(deviceId)) {
      newExpandedDevices.delete(deviceId);
    } else {
      newExpandedDevices.add(deviceId);
    }
    setExpandedDevices(newExpandedDevices);
  };

  // Navigate between IP addresses within a device
  const navigateIP = (deviceId: string, direction: "prev" | "next") => {
    const device = visitor.devices.find((d) => d.id === deviceId);
    if (!device || device.ip_addresses.length <= 1) return;

    const currentIndex = deviceIPIndex[deviceId] || 0;
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % device.ip_addresses.length
        : currentIndex === 0
          ? device.ip_addresses.length - 1
          : currentIndex - 1;

    setDeviceIPIndex((prev) => ({ ...prev, [deviceId]: newIndex }));
  };

  // Get the current IP address for a device for mapbox map
  const getCurrentIPAddress = (device: Device) => {
    const currentIndex = deviceIPIndex[device.id] || 0;
    return device.ip_addresses[currentIndex];
  };

  return (
    <section className="p-1">
      <h2 className="mb-3 text-xs font-semibold tracking-wider text-gray-400">
        ASSOCIATED DEVICES
      </h2>

      <div className="space-y-3">
        {visitor.devices.map((device) => {
          const isExpanded = expandedDevices.has(device.id);
          const currentIP = getCurrentIPAddress(device);
          const hasMultipleIPs = device.ip_addresses.length > 1;

          return (
            <div
              key={device.id}
              className="overflow-hidden rounded-lg border border-gray-200"
            >
              {/* Device Header - Clickable */}
              <div
                className="cursor-pointer p-1 transition-colors hover:bg-gray-50"
                onClick={() => toggleDevice(device.id)}
              >
                <div className="flex items-center justify-between">
                  {/* Device icon, OS icon, and IP count */}
                  <div className="flex items-center justify-between gap-2">
                    {/* Device Icon + Abbreviation */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex h-8 w-8 items-center justify-center">
                        {getDeviceIcon(device.type)}
                      </div>
                      <span className="mt-1 text-xs font-medium text-gray-500">
                        {device.type.toUpperCase().slice(0, 3)}
                      </span>
                    </div>

                    {/* OS Icon */}
                    <div className="flex items-center justify-center">
                      <div className="flex h-8 w-8 items-center justify-center">
                        {getOSIcon(device.os)}
                      </div>
                    </div>

                    {/* IP Count */}
                    <div className="flex items-center justify-center">
                      <p className="text-sm font-medium text-gray-500">
                        {device.ip_addresses.length} IP
                        {device.ip_addresses.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* OS Version + Chevron */}
                  <div className="flex min-w-0 items-center justify-between gap-2">
                    <div className="mr-2 min-w-0 flex-1">
                      <h3 className="break-words text-xs font-medium leading-tight text-gray-700">
                        {device.os_version}
                      </h3>
                    </div>
                    {/* Expand/Collapse Icon - Always visible */}
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-gray-200">
                  {/* Device Information */}
                  <div className="p-1">
                    <div className="mb-2 rounded-lg bg-gray-50 p-1.5">
                      <h4 className="mb-2 flex items-center justify-center gap-2 text-center text-sm font-medium text-gray-600">
                        <span className="text-blue-500">💻</span> Device
                        Information
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center justify-between">
                          <span className="text-gray-500">Device Type</span>
                          <span className="flex items-center gap-1 font-medium">
                            {getDeviceIcon(device.type)} {device.type}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-gray-500">OS Version</span>
                          <span className="font-medium">
                            {getOSIcon(device.os)}
                            {device.os} {device.os_version}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-gray-500">First Seen</span>
                          <span className="font-medium">
                            {formatDate(device.first_seen)}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-gray-500">Last Seen</span>
                          <span className="font-medium">
                            {visitor.visit_time}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Browsers Section */}
                  <div className="px-1">
                    <div className="mb-2 rounded-lg border border-gray-200 p-1.5">
                      <div className="flex items-center justify-center">
                        <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-600">
                          <span className="text-orange-500">🌐</span> Browsers
                        </h4>
                      </div>
                      <div className="max-h-[120px] space-y-2 overflow-y-auto">
                        {device.browsers.map((browser, index) => (
                          <div
                            key={index}
                            className="rounded bg-gray-50 p-1 text-left transition-colors hover:bg-gray-100"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="text-sm text-gray-600">
                                  {browser.name}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* IP Details Section */}
                  <div className="px-1 pb-1">
                    <div className="rounded-t-lg border border-gray-200">
                      <div className="flex items-center justify-between p-1">
                        <div className="flex-1"></div>
                        <h4 className="flex items-center gap-2 text-sm font-medium text-gray-600">
                          <span className="text-green-500">🌍</span> IP
                          Addresses
                        </h4>
                        <div className="flex flex-1 justify-end">
                          {hasMultipleIPs && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigateIP(device.id, "prev");
                                }}
                                className="text-gray-400 transition-colors hover:text-gray-600"
                                title="Previous IP"
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
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
                              <span className="text-xs text-gray-500">
                                {deviceIPIndex[device.id] + 1 || 1} of{" "}
                                {device.ip_addresses.length}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigateIP(device.id, "next");
                                }}
                                className="text-gray-400 transition-colors hover:text-gray-600"
                                title="Next IP"
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
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
                          )}
                        </div>
                      </div>

                      <ul className="text-sm">
                        <li className="flex items-center justify-between border-b border-gray-200 p-1.5">
                          <span className="text-gray-500">IP Address</span>
                          <span className="rounded bg-gray-100 p-0.5 font-mono text-xs">
                            {currentIP.ip}
                          </span>
                        </li>
                        <li className="flex items-center justify-between border-b border-gray-200 p-1.5">
                          <span className="text-gray-500">Location</span>
                          <span className="font-medium">
                            {currentIP.location}
                          </span>
                        </li>
                        <li
                          className={`flex items-center justify-between border-b p-1.5 ${currentIP.vpn_detected ? "bg-red-50" : "bg-green-50"}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">VPN</span>
                            <DemoDataTooltip
                              onShowDemoNotification={onShowDemoNotification}
                              inline={true}
                            />
                          </div>
                          <span
                            className={`font-semibold ${currentIP.vpn_detected ? "text-red-600" : "text-green-600"}`}
                          >
                            {currentIP.vpn_detected
                              ? "Detected"
                              : "Not Detected"}
                          </span>
                        </li>
                        <li
                          className={`flex items-center justify-between p-1.5 ${device.incognito ? "bg-red-50" : "bg-green-50"}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">
                              Incognito Mode
                            </span>
                            <DemoDataTooltip
                              onShowDemoNotification={onShowDemoNotification}
                              inline={true}
                            />
                          </div>
                          <span
                            className={`font-semibold ${device.incognito ? "text-red-600" : "text-green-600"}`}
                          >
                            {device.incognito ? "Yes" : "No"}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Map Section */}
                  <div className="px-1 pb-1">
                    <div className="h-48 overflow-hidden rounded-b-lg bg-gray-100">
                      <MapboxMap
                        location={currentIP.location}
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DevicesSection;
