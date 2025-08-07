import React, { useState } from 'react';
import { MapPin, ChevronUp, Wallet, Mail, Receipt, TriangleAlert, Copy } from 'lucide-react';

interface Transaction {
  id: number;
  type: string;
  details: string;
  amount: string;
  time: string;
  positive: boolean;
}

const VisitorDashboard = () => {
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      type: 'Sent ETH',
      details: 'To: 0x98...fE34',
      amount: '-0.5 ETH',
      time: '2 min ago',
      positive: false
    },
    {
      id: 2,
      type: 'Mint NFT',
      details: 'Cool Cats',
      amount: '-0.1 ETH',
      time: '1 hour ago',
      positive: false
    },
    {
      id: 3,
      type: 'Received ETH',
      details: 'From: 0x45...dC12',
      amount: '+1.2 ETH',
      time: '5 hours ago',
      positive: true
    },
    {
      id: 4,
      type: 'Contract Interaction',
      details: 'Uniswap V3',
      amount: '-0.002 ETH',
      time: '1 day ago',
      positive: false
    },
    {
      id: 5,
      type: 'Sent ETH',
      details: 'To: 0x77...aB56',
      amount: '-2.0 ETH',
      time: '2 days ago',
      positive: false
    }
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="w-full max-w-7xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <header className="p-5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-lg text-gray-600">
              Hello, visitor ID
              <span className="font-semibold text-orange-500 ml-1">gwAdFbB0FtxzczlBtcvj</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500">I'M A DEVELOPER</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={isDeveloper}
                onChange={(e) => setIsDeveloper(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>
          <div className="border border-red-500 p-2 rounded-md text-center">
            <p className="text-xs text-red-500 font-semibold">SUSPECT SCORE</p>
            <p className="text-xl font-bold text-red-500 flex items-center justify-center gap-1">
              7 <TriangleAlert className="w-4 h-4" />
            </p>
          </div>
        </header>

        {isDeveloper ? (
          // Developer View - Orange gradient with request demo button
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 min-h-[600px] flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-white mb-6">
                Ready to Build?
              </h2>
              <p className="text-orange-100 text-lg mb-8 max-w-md mx-auto">
                Get started with Lucia Protocol's developer tools and start building the future of Web3 attribution.
              </p>
              <a
                href="https://ads.clickinsights.xyz/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-orange-600 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-500"
              >
                <span className="relative inline-flex items-center">
                  Request Demo{" "}
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    <svg
                      width={20}
                      height={20}
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
                  </span>
                </span>
              </a>
            </div>
          </div>
        ) : (
          // Regular Dashboard View
          <>
            {/* Visit Summary - Single Row */}
            <section className="grid grid-cols-4 border-b border-gray-200">
              <div className="p-4 border-r border-gray-200">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">YOUR VISIT SUMMARY</p>
                <p className="text-base font-semibold text-gray-600 mt-1">You visited 1 time</p>
              </div>
              <div className="p-4 border-r border-gray-200">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">INCOGNITO</p>
                <p className="text-base font-semibold text-gray-600 mt-1">0 sessions</p>
              </div>
              <div className="p-4 border-r border-gray-200">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">IP ADDRESS</p>
                <p className="text-base font-semibold text-gray-600 mt-1">1 IP</p>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">GEOLOCATION</p>
                <p className="text-base font-semibold text-gray-600 mt-1">1 location</p>
              </div>
            </section>

            {/* Lucia Summary - Single Row */}
            <section className="grid grid-cols-4 border-b border-gray-200">
              <div className="p-4 border-r border-gray-200">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">WALLETS DETECTED</p>
                <p className="text-base font-semibold text-gray-600 mt-1">10</p>
              </div>
              <div className="p-4 border-r border-gray-200">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">LUCIA REWARDS</p>
                <p className="text-base font-semibold text-gray-600 mt-1">10 LUC | 1.43 USD</p>
              </div>
              <div className="p-4 border-r border-gray-200">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">AD CLICK</p>
                <p className="text-base font-semibold text-gray-600 mt-1">10 | 5 DIRECT</p>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400 font-semibold tracking-wider">CLICK IDS</p>
                <p className="text-base font-semibold text-gray-600 mt-1">10 PLATFORMS</p>
              </div>
            </section>

            {/* Main Content Grid - Equal Layout: 50% left, 50% right */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Column - Takes 50% */}
              <div className="lg:border-r border-gray-200">
                <section className="p-5">
                  <h2 className="text-xs text-gray-400 font-semibold tracking-wider mb-3">YOUR VISIT HISTORY</h2>
                  <div className="border border-gray-200 rounded-lg">
                    <div className="flex">
                      <div className="p-3 flex flex-col items-center justify-start border-r border-gray-200 bg-gray-50 rounded-l-lg">
                        <button className="text-gray-400 hover:text-gray-600">
                          <ChevronUp className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-4 flex-grow">
                        <p className="font-semibold text-gray-600">Now</p>
                        <p className="text-sm text-gray-500">Chicago, United States</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200">
                      <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                        <MapPin className="text-orange-500 w-8 h-8" />
                      </div>
                      <ul className="divide-y divide-gray-200 text-sm">
                        <li className="p-3 flex justify-between items-center">
                          <strong className="font-medium text-gray-600">IP Address</strong>
                          <span>216.183.125.142</span>
                        </li>
                        <li className="p-3 flex justify-between items-center">
                          <strong className="font-medium text-gray-600">Browser</strong>
                          <span>Chrome 138.0.0</span>
                        </li>
                        <li className="p-3 flex justify-between items-center bg-green-50">
                          <strong className="font-medium text-gray-600">Incognito mode</strong>
                          <span className="font-semibold text-green-600">Not Detected</span>
                        </li>
                        <li className="p-3 flex justify-between items-center bg-red-50">
                          <strong className="font-medium text-gray-600">VPN</strong>
                          <span className="font-semibold text-red-600">Detected</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
                <section className="p-5 pt-0">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-base font-semibold text-gray-600 mb-3">Device Information</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between items-center">
                        <span className="text-gray-500">Device Type</span>
                        <span className="font-medium bg-gray-100 px-2 py-1 rounded">Computer</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-gray-500">Operating System</span>
                        <span className="font-medium">MacOS</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-gray-500">OS Version</span>
                        <span className="font-medium">14.1 "Sonoma"</span>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>

              {/* Right Column - Takes 50% */}
              <div className="lg:col-span-1">
                <section className="p-5">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-base font-semibold text-gray-600 mb-4 flex items-center gap-2">
                      <Wallet className="text-orange-500 w-4 h-4" /> Wallet Details
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex justify-between items-center">
                        <span className="text-gray-500">Wallet Type</span>
                        <span className="font-medium flex items-center gap-2">
                          <div className="w-5 h-5 bg-orange-500 rounded"></div> Metamask
                        </span>
                      </li>
                      <li className="flex justify-between items-center gap-2">
                        <span className="text-gray-500">Wallet Address</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs bg-gray-100 p-1 rounded">0xd8dA...6045</span>
                          <button 
                            onClick={() => copyToClipboard('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            title="Copy address"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-gray-500">Wallet Balance</span>
                        <span className="font-medium">3.14 ETH</span>
                      </li>
                      <li className="flex justify-between items-center gap-2">
                        <span className="text-gray-500">ENS Domain</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-orange-500">vitalik.eth</span>
                          <button 
                            onClick={() => copyToClipboard('vitalik.eth')}
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
                <section className="p-5 pt-0">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-base font-semibold text-gray-600 mb-3 flex items-center gap-2">
                      <Mail className="text-orange-500 w-4 h-4" /> Associated Emails
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>user.primary@email.com</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <span>secondary.email@domain.com</span>
                      </li>
                    </ul>
                  </div>
                </section>
                <section className="p-5 pt-0">
                  <h3 className="text-base font-semibold text-gray-600 mb-3 flex items-center gap-2">
                    <Receipt className="text-orange-500 w-4 h-4" /> Recent Transactions
                  </h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <ul className="divide-y divide-gray-200 text-sm">
                      {transactions.map((transaction) => (
                        <li key={transaction.id} className="p-3 flex justify-between items-center hover:bg-gray-50">
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
          </>
        )}
      </div>
    </main>
  );
};

export default VisitorDashboard;