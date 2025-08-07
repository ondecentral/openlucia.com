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

export interface Wallet {
  address: string;
  type: string;
  balance: string;
  ens_domain?: string;
  first_seen: string;
  last_seen: string;
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
  suspect_score: number;
  // New fields for counts
  incognito_sessions: number;
  ads_clicked: number;
  click_ids: number;
  total_visits: number;
  ip_addresses: IPAddress[];
  wallets: Wallet[];
}

export const sampleTransactions: Transaction[] = [
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
];

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
  {
    address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    type: 'Metamask',
    balance: '3.14 ETH',
    ens_domain: 'vitalik.eth',
    first_seen: '2024-01-15',
    last_seen: '2024-01-20',
    transactions: sampleTransactions
  },
  {
    address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    type: 'WalletConnect',
    balance: '0.85 ETH',
    ens_domain: 'alice.eth',
    first_seen: '2024-01-18',
    last_seen: '2024-01-19',
    transactions: sampleTransactions
  }
];

export const sampleVisitors: VisitorData[] = [
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
    wallet_balance: '3.14 ETH',
    ens_domain: 'vitalik.eth',
    associated_emails: ['user.primary@email.com', 'secondary.email@domain.com'],
    transactions: sampleTransactions,
    visit_time: 'Now',
    suspect_score: 7,
    incognito_sessions: 3,
    ads_clicked: 12,
    click_ids: 12,
    total_visits: 25,
    ip_addresses: sampleIPAddresses,
    wallets: sampleWallets
  },
  {
    visitor_id: 'hxK9mN2Qr8vYzWpL5sA3',
    ip_address: '192.168.1.100',
    wallet_address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    location: 'New York, United States',
    browser: 'Firefox 120.0',
    device_type: 'Mobile',
    os: 'iOS',
    os_version: '17.2',
    incognito: true,
    vpn: false,
    wallet_type: 'WalletConnect',
    wallet_balance: '0.85 ETH',
    ens_domain: 'alice.eth',
    associated_emails: ['alice@example.com'],
    transactions: sampleTransactions,
    visit_time: '2 hours ago',
    suspect_score: 3,
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
    wallets: [
      {
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        type: 'WalletConnect',
        balance: '0.85 ETH',
        ens_domain: 'alice.eth',
        first_seen: '2024-01-18',
        last_seen: '2024-01-19',
        transactions: sampleTransactions
      }
    ]
  },
  {
    visitor_id: 'jqR7tU4vX9zBcF2gH6kL8',
    ip_address: '10.0.0.50',
    wallet_address: '0x9bA2cF8b8F8F8F8F8F8F8F8F8F8F8F8F8F8F8F8',
    location: 'London, United Kingdom',
    browser: 'Safari 17.1',
    device_type: 'Tablet',
    os: 'iPadOS',
    os_version: '17.1',
    incognito: false,
    vpn: true,
    wallet_type: 'Coinbase Wallet',
    wallet_balance: '1.23 ETH',
    ens_domain: 'bob.eth',
    associated_emails: ['bob@example.com', 'bob.work@company.com'],
    transactions: sampleTransactions,
    visit_time: '1 day ago',
    suspect_score: 5,
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
    wallets: [
      {
        address: '0x9bA2cF8b8F8F8F8F8F8F8F8F8F8F8F8F8F8F8F8',
        type: 'Coinbase Wallet',
        balance: '1.23 ETH',
        ens_domain: 'bob.eth',
        first_seen: '2024-01-10',
        last_seen: '2024-01-19',
        transactions: sampleTransactions
      }
    ]
  }
];

export const dashboardStats = {
  totalVisits: 300,
  totalIncognitoVisits: 45,
  totalUniqueIPs: 250,
  totalUniqueGeolocations: 180,
  totalWalletsDetected: 275,
  totalLuciaRewards: '25 LUC',
  totalAdsClicked: 150,
  totalClickIds: 150
};
