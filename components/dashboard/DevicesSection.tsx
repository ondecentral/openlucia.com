import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Smartphone, Monitor, Tablet, Copy } from 'lucide-react';
import { VisitorData, Device } from './dashboard-seed-data';
import MapboxMap from './mapbox-map';
import { getOSIcon } from './utils';

interface DeviceHistorySectionProps {
  visitor: VisitorData;
}

const DevicesSection: React.FC<DeviceHistorySectionProps> = ({ visitor }) => {
  const [expandedDevices, setExpandedDevices] = useState<Set<string>>(new Set());
  const [deviceIPIndex, setDeviceIPIndex] = useState<Record<string, number>>({});

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
  const navigateIP = (deviceId: string, direction: 'prev' | 'next') => {
    const device = visitor.devices.find(d => d.id === deviceId);
    if (!device || device.ip_addresses.length <= 1) return;

    const currentIndex = deviceIPIndex[deviceId] || 0;
    const newIndex =
      direction === 'next'
        ? (currentIndex + 1) % device.ip_addresses.length
        : currentIndex === 0
          ? device.ip_addresses.length - 1
          : currentIndex - 1;

    setDeviceIPIndex(prev => ({ ...prev, [deviceId]: newIndex }));
  };

  // Get the current IP address for a device for mapbox map
  const getCurrentIPAddress = (device: Device) => {
    const currentIndex = deviceIPIndex[device.id] || 0;
    return device.ip_addresses[currentIndex];
  };

  return (
    <section className="p-3">
      <h2 className="text-xs text-gray-400 font-semibold tracking-wider mb-3">
        ASSOCIATED DEVICES
      </h2>

      <div className="space-y-3">
        {visitor.devices.map(device => {
          const isExpanded = expandedDevices.has(device.id);
          const currentIP = getCurrentIPAddress(device);
          const hasMultipleIPs = device.ip_addresses.length > 1;

          return (
            <div key={device.id} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Device Header - Clickable */}
              <div
                className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleDevice(device.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getOSIcon(device.os)}
                    <span className="text-sm text-gray-500">{device.os}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {device.os.toLowerCase() === 'linux' ? device.os_version : device.device_name}
                    </span>
                    <span className="text-sm text-gray-500 ml-auto">
                      {device.ip_addresses.length} IP{device.ip_addresses.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-gray-200">
                  {/* Device Information */}
                  <div className="p-3">
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Device Information</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between items-center">
                          <span className="text-gray-500">OS Version</span>
                          <span className="font-medium">{device.os_version}</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-gray-500">First Seen</span>
                          <span className="font-medium">{device.first_seen}</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-gray-500">Last Seen</span>
                          <span className="font-medium">{visitor.visit_time}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Browsers Section */}
                  <div className="px-3 pb-3">
                    <div className="border border-gray-200 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                        <span className="text-orange-500">🌐</span> Browsers
                      </h4>
                      <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2">
                        {device.browsers.map((browser, index) => (
                          <div
                            key={index}
                            className="p-1 text-left bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="text-sm text-gray-600">
                                  {browser.name} {browser.version}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* IP Details Section */}
                  <div className="px-3 pb-3">
                    <div className="border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between p-1">
                        <h4 className="text-sm font-medium text-gray-600">IP Address Details</h4>
                        {hasMultipleIPs && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                navigateIP(device.id, 'prev');
                              }}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              title="Previous IP"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
                              {deviceIPIndex[device.id] + 1 || 1} of {device.ip_addresses.length}
                            </span>
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                navigateIP(device.id, 'next');
                              }}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              title="Next IP"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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

                      <ul className="text-sm">
                        <li className="flex justify-between items-center p-1 border-b border-gray-200">
                          <span className="text-gray-500">IP Address</span>
                          <span className="font-mono text-xs bg-gray-100 p-0.5 rounded">
                            {currentIP.ip}
                          </span>
                        </li>
                        <li className="flex justify-between items-center p-1 border-b border-gray-200">
                          <span className="text-gray-500">Location</span>
                          <span className="font-medium">{currentIP.location}</span>
                        </li>
                        <li className="flex justify-between items-center p-1 border-b border-gray-200">
                          <span className="text-gray-500">Visits</span>
                          <span className="font-medium">{currentIP.visits}</span>
                        </li>
                        <li
                          className={`flex justify-between items-center p-1 ${currentIP.vpn_detected ? 'bg-red-50' : 'bg-green-50'}`}
                        >
                          <span className="text-gray-500">VPN</span>
                          <span
                            className={`font-semibold ${currentIP.vpn_detected ? 'text-red-600' : 'text-green-600'}`}
                          >
                            {currentIP.vpn_detected ? 'Detected' : 'Not Detected'}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Map Section */}
                  <div className="px-3 pb-3">
                    <div className="h-48 overflow-hidden bg-gray-100 rounded-lg">
                      <MapboxMap location={currentIP.location} className="h-full w-full" />
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
