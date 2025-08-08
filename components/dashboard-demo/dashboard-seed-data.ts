export interface Transaction {
  id: number;
  type: string;
  details: string;
  amount: string;
  time: string;
  positive: boolean;
}

export interface IPAddress {
  ip: string;
  location: string;
  visits: number;
  first_seen: string;
  last_seen: string;
  vpn_detected: boolean;
}

interface Token {
  symbol: string;
  amount: string;
  value: string;
}

export interface Wallet {
  address: string;
  type: string;
  balance: string;
  ens_domain?: string;
  first_seen: string;
  last_seen: string;
  tokens: Token[];
  transactions: Transaction[];
}

export interface VisitorData {
  visitor_id: string;
  ip_address: string;
  wallet_address: string;
  location: string;
  browser: string;
  device_type: string;
  os: string;
  os_version: string;
  incognito: boolean;
  vpn: boolean;
  wallet_type: string;
  wallet_balance: string;
  ens_domain: string;
  associated_emails: string[];
  transactions: Transaction[];
  visit_time: string;
  risk_level: number; 
  incognito_sessions: number;
  ads_clicked: number;
  click_ids: number;
  total_visits: number;
  ip_addresses: IPAddress[];
  wallets: Wallet[];
}

// Different transaction sets for different wallets
export const transactionSets = {
  ethWalletTransactions1: [
    {
      id: 1,
      type: 'Bought PEPE',
      details: 'Uniswap V3',
      amount: '+42,000,000 PEPE',
      time: '2 min ago',
      positive: true
    },
    {
      id: 2,
      type: 'Sent ETH',
      details: 'To: 0x98...fE34',
      amount: '-0.5 ETH',
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
    }
  ],
  ethWalletTransactions2: [
    {
      id: 1,
      type: 'Swapped SHIB',
      details: '1inch Exchange',
      amount: '+15,000,000 SHIB',
      time: '10 min ago',
      positive: true
    },
    {
      id: 2,
      type: 'Bought DOGE',
      details: 'Binance',
      amount: '+45,000 DOGE',
      time: '3 hours ago',
      positive: true
    },
    {
      id: 3,
      type: 'Sent ETH',
      details: 'To: 0xab...cD45',
      amount: '-1.5 ETH',
      time: '1 day ago',
      positive: false
    }
  ],
  solWalletTransactions1: [
    {
      id: 1,
      type: 'Bought DOGE',
      details: 'Binance',
      amount: '+25,000 DOGE',
      time: '15 min ago',
      positive: true
    },
    {
      id: 2,
      type: 'Received SOL',
      details: 'From: Gh7...Kp9',
      amount: '+45.8 SOL',
      time: '2 hours ago',
      positive: true
    },
    {
      id: 3,
      type: 'Stake SOL',
      details: 'Marinade Finance',
      amount: '-100 SOL',
      time: '1 day ago',
      positive: false
    }
  ],
  solWalletTransactions2: [
    {
      id: 1,
      type: 'Unstake SOL',
      details: 'Lido',
      amount: '+234.5 SOL',
      time: '30 min ago',
      positive: true
    },
    {
      id: 2,
      type: 'Swap PEPE',
      details: 'Jupiter',
      amount: '+300,000,000 PEPE',
      time: '4 hours ago',
      positive: true
    },
    {
      id: 3,
      type: 'Sent SOL',
      details: 'To: Jk9...Nm2',
      amount: '-50 SOL',
      time: '2 days ago',
      positive: false
    }
  ],
  whaleWalletTransactions: [
    {
      id: 1,
      type: 'Bought PEPE',
      details: 'Binance',
      amount: '+100,000,000 PEPE',
      time: '5 min ago',
      positive: true
    },
    {
      id: 2,
      type: 'Received ETH',
      details: 'From: 0x12...eF78',
      amount: '+25.89 ETH',
      time: '1 hour ago',
      positive: true
    },
    {
      id: 3,
      type: 'Swap SHIB',
      details: 'Uniswap V3',
      amount: '+1,200,000,000 SHIB',
      time: '6 hours ago',
      positive: true
    }
  ]
};

export const sampleIPAddresses: IPAddress[] = [
  {
    ip: '216.183.125.142',
    location: 'Chicago, United States',
    visits: 15,
    first_seen: '2024-01-15',
    last_seen: '2024-01-20',
    vpn_detected: true
  },
  {
    ip: '192.168.1.100',
    location: 'New York, United States',
    visits: 8,
    first_seen: '2024-01-18',
    last_seen: '2024-01-19',
    vpn_detected: false
  }
];

export const sampleWallets: Wallet[] = [
  // User 1 - Single wallet holder (ETH + memecoins)
  {
    address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    type: 'Metamask',
    balance: '2.45 ETH ($4,532.50)',
    ens_domain: 'pepe.eth',
    first_seen: '2024-01-15',
    last_seen: '2024-01-20',
    tokens: [
      { symbol: 'ETH', amount: '2.45', value: '$4,532.50' },
      { symbol: 'PEPE', amount: '42,000,000', value: '$478.80' },
      { symbol: 'SHIB', amount: '15,000,000', value: '$345.00' },
      { symbol: 'LINK', amount: '250', value: '$3,875.00' },
      { symbol: 'RAY', amount: '1', value: '$12,500.00' }
    ],
    transactions: transactionSets.ethWalletTransactions1
  },

  // User 2 - Three wallet holder (ETH + SOL + memecoins)
  {
    address: '0x1234567890123456789012345678901234567890',
    type: 'Ledger',
    balance: '5.67 ETH ($10,489.50)',
    ens_domain: 'doge.eth',
    first_seen: '2024-01-10',
    last_seen: '2024-01-21',
    tokens: [
      { symbol: 'ETH', amount: '5.67', value: '$10,489.50' },
      { symbol: 'DOGE', amount: '45,000', value: '$8,235.00' },
      { symbol: 'PEPE', amount: '150,000,000', value: '$1,710.00' },
      { symbol: 'LINK', amount: '120', value: '$1,860.00' },
      { symbol: 'RAY', amount: '2', value: '$27,000.00' }
    ],
    transactions: transactionSets.ethWalletTransactions2
  },
  {
    address: 'DuXjR8QNP1tJvW5DKcfGBzqiYj6N5DvsDfEP5ztDiYGE',
    type: 'Phantom',
    balance: '145.8 SOL ($14,580.00)',
    first_seen: '2024-01-18',
    last_seen: '2024-01-19',
    tokens: [
      { symbol: 'SOL', amount: '145.8', value: '$14,580.00' },
      { symbol: 'DOGE', amount: '25,000', value: '$4,575.00' }
    ],
    transactions: transactionSets.solWalletTransactions1
  },
  {
    address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    type: 'WalletConnect',
    balance: '1.92 ETH ($3,552.00)',
    first_seen: '2024-01-18',
    last_seen: '2024-01-19',
    tokens: [
      { symbol: 'ETH', amount: '1.92', value: '$3,552.00' },
      { symbol: 'PEPE', amount: '50,000,000', value: '$570.00' }
    ],
    transactions: transactionSets.ethWalletTransactions1
  },

  // User 3 - Five wallet holder (Mixed portfolio)
  {
    address: '0x9876543210987654321098765432109876543210',
    type: 'Metamask',
    balance: '12.34 ETH ($22,829.00)',
    ens_domain: 'whale.eth',
    first_seen: '2024-02-01',
    last_seen: '2024-02-15',
    tokens: [
      { symbol: 'ETH', amount: '12.34', value: '$22,829.00' },
      { symbol: 'PEPE', amount: '500,000,000', value: '$5,700.00' },
      { symbol: 'SHIB', amount: '250,000,000', value: '$5,750.00' },
      { symbol: 'LINK', amount: '500', value: '$7,750.00' },
      { symbol: 'RAY', amount: '1', value: '$18,000.00' }
    ],
    transactions: transactionSets.ethWalletTransactions2
  },
  {
    address: 'FidaeBkZkvDqi1GXNEwB8uWmj9Ngx2HXSX8jcVngJk1',
    type: 'Backpack',
    balance: '892.3 SOL ($89,230.00)',
    first_seen: '2024-01-05',
    last_seen: '2024-01-22',
    tokens: [
      { symbol: 'SOL', amount: '892.3', value: '$89,230.00' },
      { symbol: 'SHIB', amount: '200,000,000', value: '$4,600.00' }
    ],
    transactions: transactionSets.solWalletTransactions2
  },
  {
    address: '0xabcdef0123456789abcdef0123456789abcdef01',
    type: 'Coinbase Wallet',
    balance: '3.45 ETH ($6,382.50)',
    first_seen: '2024-02-10',
    last_seen: '2024-02-20',
    tokens: [
      { symbol: 'ETH', amount: '3.45', value: '$6,382.50' },
      { symbol: 'DOGE', amount: '75,000', value: '$13,725.00' },
      { symbol: 'LINK', amount: '60', value: '$930.00' },
      { symbol: 'RAY', amount: '1', value: '$14,200.00' }
    ],
    transactions: transactionSets.ethWalletTransactions1
  },
  {
    address: '0x0123456789abcdef0123456789abcdef01234567',
    type: 'Trezor',
    balance: '8.92 ETH ($16,502.00)',
    first_seen: '2024-02-05',
    last_seen: '2024-02-18',
    tokens: [
      { symbol: 'ETH', amount: '8.92', value: '$16,502.00' },
      { symbol: 'PEPE', amount: '100,000,000', value: '$1,140.00' }
    ],
    transactions: transactionSets.whaleWalletTransactions
  },
  {
    address: 'Gy7PJ8QwNxrKMYkuq2Y5vX9LZn1BGVxjCj4RmWypGd3F',
    type: 'Phantom',
    balance: '234.5 SOL ($23,450.00)',
    first_seen: '2024-02-12',
    last_seen: '2024-02-22',
    tokens: [
      { symbol: 'SOL', amount: '234.5', value: '$23,450.00' },
      { symbol: 'DOGE', amount: '35,000', value: '$6,405.00' }
    ],
    transactions: transactionSets.solWalletTransactions1
  },

  // User 4 - Seven wallet holder (Heavy in memecoins)
  {
    address: '0xdef0123456789abcdef0123456789abcdef0123',
    type: 'Metamask',
    balance: '15.67 ETH ($28,989.50)',
    ens_domain: 'memes.eth',
    first_seen: '2024-02-15',
    last_seen: '2024-02-25',
    tokens: [
      { symbol: 'ETH', amount: '15.67', value: '$28,989.50' },
      { symbol: 'PEPE', amount: '800,000,000', value: '$9,120.00' },
      { symbol: 'SHIB', amount: '450,000,000', value: '$10,350.00' },
      { symbol: 'DOGE', amount: '120,000', value: '$21,960.00' },
      { symbol: 'LINK', amount: '320', value: '$4,960.00' },
      { symbol: 'RAY', amount: '3', value: '$54,000.00' }
    ],
    transactions: transactionSets.whaleWalletTransactions
  },
  {
    address: '0x123456789abcdef0123456789abcdef01234567',
    type: 'WalletConnect',
    balance: '4.56 ETH ($8,436.00)',
    first_seen: '2024-02-18',
    last_seen: '2024-02-28',
    tokens: [
      { symbol: 'ETH', amount: '4.56', value: '$8,436.00' },
      { symbol: 'SHIB', amount: '150,000,000', value: '$3,450.00' },
      { symbol: 'LINK', amount: '45', value: '$697.50' },
      { symbol: 'RAY', amount: '1', value: '$16,300.00' }
    ],
    transactions: transactionSets.ethWalletTransactions2
  },
  {
    address: 'J4t8NqBxZYGsLbVSaY5tVTm1xG9X6vKjP2RwQnZ3HcM',
    type: 'Phantom',
    balance: '567.8 SOL ($56,780.00)',
    first_seen: '2024-02-20',
    last_seen: '2024-03-01',
    tokens: [
      { symbol: 'SOL', amount: '567.8', value: '$56,780.00' },
      { symbol: 'PEPE', amount: '300,000,000', value: '$3,420.00' }
    ],
    transactions: transactionSets.solWalletTransactions2
  },

  // User 5 - Ten wallet holder (Diverse portfolio)
  {
    address: '0x789abcdef0123456789abcdef0123456789abcd',
    type: 'Metamask',
    balance: '25.89 ETH ($47,896.50)',
    ens_domain: 'crypto.eth',
    first_seen: '2024-02-25',
    last_seen: '2024-03-05',
    tokens: [
      { symbol: 'ETH', amount: '25.89', value: '$47,896.50' },
      { symbol: 'PEPE', amount: '1,200,000,000', value: '$13,680.00' },
      { symbol: 'SHIB', amount: '850,000,000', value: '$19,550.00' },
      { symbol: 'DOGE', amount: '250,000', value: '$45,750.00' },
      { symbol: 'LINK', amount: '700', value: '$10,850.00' },
      { symbol: 'RAY', amount: '2', value: '$40,000.00' }
    ],
    transactions: transactionSets.whaleWalletTransactions
  },
  {
    address: '0xef0123456789abcdef0123456789abcdef01234',
    type: 'Ledger',
    balance: '18.34 ETH ($33,929.00)',
    first_seen: '2024-02-28',
    last_seen: '2024-03-08',
    tokens: [
      { symbol: 'ETH', amount: '18.34', value: '$33,929.00' },
      { symbol: 'DOGE', amount: '85,000', value: '$15,555.00' },
      { symbol: 'LINK', amount: '220', value: '$3,410.00' },
      { symbol: 'RAY', amount: '1', value: '$15,800.00' }
    ],
    transactions: transactionSets.ethWalletTransactions1
  },
  {
    address: 'N5v2P8qWxYrKtM3jBhG6fD4sZ9nC7mL1RwX3kJ2TcV',
    type: 'Phantom',
    balance: '789.4 SOL ($78,940.00)',
    first_seen: '2024-03-01',
    last_seen: '2024-03-10',
    tokens: [
      { symbol: 'SOL', amount: '789.4', value: '$78,940.00' },
      { symbol: 'SHIB', amount: '500,000,000', value: '$11,500.00' }
    ],
    transactions: transactionSets.solWalletTransactions2
  },
  {
    address: '0x456789abcdef0123456789abcdef0123456789ab',
    type: 'Metamask',
    balance: '32.15 ETH ($59,477.50)',
    ens_domain: 'trader.eth',
    first_seen: '2024-03-05',
    last_seen: '2024-03-12',
    tokens: [
      { symbol: 'ETH', amount: '32.15', value: '$59,477.50' },
      { symbol: 'PEPE', amount: '2,500,000,000', value: '$28,500.00' },
      { symbol: 'SHIB', amount: '1,200,000,000', value: '$27,600.00' },
      { symbol: 'DOGE', amount: '350,000', value: '$64,050.00' },
      { symbol: 'LINK', amount: '950', value: '$14,725.00' },
      { symbol: 'RAY', amount: '1', value: '$22,750.00' }
    ],
    transactions: transactionSets.whaleWalletTransactions
  }
];

export const sampleVisitors: VisitorData[] = [
  // User 1 - Single wallet holder
  {
    visitor_id: 'gwAdFbB0FtxzczlBtcvj',
    ip_address: '216.183.125.142',
    wallet_address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    location: 'Chicago, United States',
    browser: 'Chrome 138.0.0',
    device_type: 'Computer',
    os: 'MacOS',
    os_version: '14.1 "Sonoma"',
    incognito: false,
    vpn: true,
    wallet_type: 'Metamask',
    wallet_balance: '2.45 ETH ($4,532.50)',
    ens_domain: 'pepe.eth',
    associated_emails: ['user.primary@email.com', 'secondary.email@domain.com'],
    transactions: transactionSets.ethWalletTransactions1,
    visit_time: 'Now',
    risk_level: 85,
    incognito_sessions: 3,
    ads_clicked: 12,
    click_ids: 12,
    total_visits: 25,
    ip_addresses: sampleIPAddresses,
    wallets: [sampleWallets[0]] // Single wallet holder
  },

  // User 2 - Three wallet holder
  {
    visitor_id: 'hxK9mN2Qr8vYzWpL5sA3',
    ip_address: '192.168.1.100',
    wallet_address: '0x1234567890123456789012345678901234567890',
    location: 'New York, United States',
    browser: 'Firefox 120.0',
    device_type: 'Mobile',
    os: 'iOS',
    os_version: '17.2',
    incognito: true,
    vpn: false,
    wallet_type: 'Ledger',
    wallet_balance: '5.67 ETH ($10,489.50)',
    ens_domain: 'doge.eth',
    associated_emails: ['alice@example.com'],
    transactions: transactionSets.ethWalletTransactions2,
    visit_time: '2 hours ago',
    risk_level: 35,
    incognito_sessions: 8,
    ads_clicked: 5,
    click_ids: 5,
    total_visits: 15,
    ip_addresses: [
      {
        ip: '192.168.1.100',
        location: 'New York, United States',
        visits: 8,
        first_seen: '2024-01-18',
        last_seen: '2024-01-19',
        vpn_detected: false
      }
    ],
    wallets: sampleWallets.slice(1, 4) // Three wallet holder
  },

  // User 3 - Five wallet holder
  {
    visitor_id: 'jqR7tU4vX9zBcF2gH6kL8',
    ip_address: '10.0.0.50',
    wallet_address: '0x9876543210987654321098765432109876543210',
    location: 'London, United Kingdom',
    browser: 'Safari 17.1',
    device_type: 'Tablet',
    os: 'iPadOS',
    os_version: '17.1',
    incognito: false,
    vpn: true,
    wallet_type: 'Metamask',
    wallet_balance: '12.34 ETH ($22,829.00)',
    ens_domain: 'whale.eth',
    associated_emails: ['bob@example.com', 'bob.work@company.com'],
    transactions: transactionSets.ethWalletTransactions2,
    visit_time: '1 day ago',
    risk_level: 65,
    incognito_sessions: 2,
    ads_clicked: 8,
    click_ids: 8,
    total_visits: 12,
    ip_addresses: [
      {
        ip: '10.0.0.50',
        location: 'London, United Kingdom',
        visits: 12,
        first_seen: '2024-01-10',
        last_seen: '2024-01-19',
        vpn_detected: true
      }
    ],
    wallets: sampleWallets.slice(4, 9) // Five wallet holder
  },

  // User 4 - Seven wallet holder
  {
    visitor_id: 'kL9pQ8rM5nW2xY4vT7uJ',
    ip_address: '172.16.0.100',
    wallet_address: '0xdef0123456789abcdef0123456789abcdef0123',
    location: 'Tokyo, Japan',
    browser: 'Edge 120.0',
    device_type: 'Computer',
    os: 'Windows',
    os_version: '11 Pro',
    incognito: true,
    vpn: true,
    wallet_type: 'Metamask',
    wallet_balance: '15.67 ETH ($28,989.50)',
    ens_domain: 'memes.eth',
    associated_emails: ['crypto@example.com'],
    transactions: transactionSets.whaleWalletTransactions,
    visit_time: '3 hours ago',
    risk_level: 45,
    incognito_sessions: 5,
    ads_clicked: 15,
    click_ids: 15,
    total_visits: 30,
    ip_addresses: [
      {
        ip: '172.16.0.100',
        location: 'Tokyo, Japan',
        visits: 30,
        first_seen: '2024-02-15',
        last_seen: '2024-02-25',
        vpn_detected: true
      }
    ],
    wallets: sampleWallets.slice(9, 16) // Seven wallet holder
  },

  // User 5 - Ten wallet holder
  {
    visitor_id: 'mN7bV4cX9zL6kH2jF8dP',
    ip_address: '192.168.2.200',
    wallet_address: '0x789abcdef0123456789abcdef0123456789abcd',
    location: 'Singapore',
    browser: 'Brave 1.50.0',
    device_type: 'Computer',
    os: 'Linux',
    os_version: 'Ubuntu 22.04',
    incognito: false,
    vpn: false,
    wallet_type: 'Metamask',
    wallet_balance: '25.89 ETH ($47,896.50)',
    ens_domain: 'crypto.eth',
    associated_emails: ['whale@example.com', 'trading@company.com'],
    transactions: transactionSets.whaleWalletTransactions,
    visit_time: '5 minutes ago',
    risk_level: 25,
    incognito_sessions: 1,
    ads_clicked: 20,
    click_ids: 20,
    total_visits: 50,
    ip_addresses: [
      {
        ip: '192.168.2.200',
        location: 'Singapore',
        visits: 50,
        first_seen: '2024-02-25',
        last_seen: '2024-03-05',
        vpn_detected: false
      }
    ],
    wallets: sampleWallets.slice(9, 16) // Ten wallet holder
  }
];

export const dashboardStats = {
  totalVisits: 377,
  totalIncognitoVisits: 42,
  totalUniqueIPs: 251,
  totalUniqueGeolocations: 137,
  totalWalletsDetected: 293,
  totalUSDTRewards: '574',
  totalSOLRewards: '6.13',
  totalETHRewards: '0.78',
  totalAdsClicked: 148,
  totalClickIds: 149
};
