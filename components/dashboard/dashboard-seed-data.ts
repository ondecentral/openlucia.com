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

export interface Device {
  id: string;
  type: string;
  os: string;
  os_version: string;
  browsers: Array<{ name: string; version: string }>;
  incognito: boolean;
  ip_addresses: IPAddress[];
  first_seen: string;
  last_seen: string;
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

export interface RewardTransaction {
  id: string;
  token: "USDT" | "ETH" | "SOL";
  amount: string;
  value: string;
  timestamp: string;
  txHash: string;
}

interface Rewards {
  totalUSDT: string;
  totalETH: string;
  totalSOL: string;
  transactions: RewardTransaction[];
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
  mobile_views: number;
  tablet_views: number;
  computer_views: number;
  ip_addresses: IPAddress[];
  wallets: Wallet[];
  rewards: Rewards;
  devices: Device[];
}

// Transaction sets for different users
const vitalikTransactions: Transaction[] = [
  {
    id: 1,
    type: "NFT Purchase",
    details: "CryptoPunk #8857",
    amount: "-42 ETH",
    time: "3 hours ago",
    positive: false,
  },
  {
    id: 2,
    type: "Received ETH",
    details: "From: 0x742...3b8D",
    amount: "+125.5 ETH",
    time: "12 hours ago",
    positive: true,
  },
  {
    id: 3,
    type: "Bought SHIB",
    details: "Uniswap V3",
    amount: "+8,500,000,000 SHIB",
    time: "1 day ago",
    positive: true,
  },
  {
    id: 4,
    type: "ENS Renewal",
    details: "vitalik.eth",
    amount: "-0.003 ETH",
    time: "2 days ago",
    positive: false,
  },
];

const solanaWhaleTransactions1: Transaction[] = [
  {
    id: 1,
    type: "Staked SOL",
    details: "Marinade Finance",
    amount: "-5 SOL",
    time: "2 hours ago",
    positive: false,
  },
  {
    id: 2,
    type: "Bought USDT",
    details: "Jupiter Aggregator",
    amount: "+125 USDT",
    time: "5 hours ago",
    positive: true,
  },
  {
    id: 3,
    type: "NFT Sale",
    details: "DeGods #3421",
    amount: "+2.3 SOL",
    time: "1 day ago",
    positive: true,
  },
  {
    id: 4,
    type: "Received RAY",
    details: "From: 9xK2...mN3p",
    amount: "+8.5 RAY",
    time: "3 days ago",
    positive: true,
  },
];

const solanaWhaleTransactions2: Transaction[] = [
  {
    id: 1,
    type: "Swap USDC",
    details: "Orca DEX",
    amount: "+45 USDC",
    time: "30 min ago",
    positive: true,
  },
  {
    id: 2,
    type: "Sent SOL",
    details: "To: Hx9L...7kP2",
    amount: "-0.15 SOL",
    time: "4 hours ago",
    positive: false,
  },
  {
    id: 3,
    type: "NFT Mint",
    details: "Okay Bears",
    amount: "-0.3 SOL",
    time: "2 days ago",
    positive: false,
  },
];

const mixedUserEthTransactions: Transaction[] = [
  {
    id: 1,
    type: "Bought DOGE",
    details: "Binance",
    amount: "+250 DOGE",
    time: "1 hour ago",
    positive: true,
  },
  {
    id: 2,
    type: "Swap USDT",
    details: "1inch",
    amount: "+125 USDT",
    time: "6 hours ago",
    positive: true,
  },
  {
    id: 3,
    type: "NFT Purchase",
    details: "Azuki #1234",
    amount: "-0.085 ETH",
    time: "1 week ago",
    positive: false,
  },
  {
    id: 4,
    type: "Add Liquidity",
    details: "LINK/ETH Pool",
    amount: "-1.25 LINK",
    time: "2 weeks ago",
    positive: false,
  },
];

const mixedUserSolTransactions: Transaction[] = [
  {
    id: 1,
    type: "Yield Farming",
    details: "Raydium RAY-USDC",
    amount: "+4.5 RAY",
    time: "8 hours ago",
    positive: true,
  },
  {
    id: 2,
    type: "Bought USDC",
    details: "Jupiter",
    amount: "+285 USDC",
    time: "1 day ago",
    positive: true,
  },
  {
    id: 3,
    type: "NFT Sale",
    details: "SMB Gen2 #892",
    amount: "+0.78 SOL",
    time: "3 days ago",
    positive: true,
  },
  {
    id: 4,
    type: "Domain Purchase",
    details: "crypto.sol",
    amount: "-20 USDC",
    time: "1 week ago",
    positive: false,
  },
];

const brokeUserTransactions1: Transaction[] = [
  {
    id: 1,
    type: "Bought PEPE",
    details: "Uniswap V2",
    amount: "+1,000 PEPE",
    time: "2 hours ago",
    positive: true,
  },
  {
    id: 2,
    type: "Failed Transaction",
    details: "Insufficient gas",
    amount: "-0.003 ETH",
    time: "3 hours ago",
    positive: false,
  },
  {
    id: 3,
    type: "Received USDT",
    details: "From: 0x123...abc",
    amount: "+0.22 USDT",
    time: "2 days ago",
    positive: true,
  },
];

const brokeUserTransactions2: Transaction[] = [
  {
    id: 1,
    type: "Airdrop Claim",
    details: "JUP Token",
    amount: "+12 JUP",
    time: "1 day ago",
    positive: true,
  },
  {
    id: 2,
    type: "Sent SOL",
    details: "To: 8Kx9...mP2n",
    amount: "-0.05 SOL",
    time: "3 days ago",
    positive: false,
  },
  {
    id: 3,
    type: "NFT Mint Failed",
    details: "Network congestion",
    amount: "-0.01 SOL",
    time: "1 week ago",
    positive: false,
  },
];

const conservativeUserEthTransactions: Transaction[] = [
  {
    id: 1,
    type: "DCA Buy USDC",
    details: "Monthly purchase",
    amount: "+50 USDC",
    time: "1 day ago",
    positive: true,
  },
  {
    id: 2,
    type: "Earn Interest",
    details: "Compound Finance",
    amount: "+1.25 USDT",
    time: "1 week ago",
    positive: true,
  },
  {
    id: 3,
    type: "Gas Fee",
    details: "Contract interaction",
    amount: "-0.02 ETH",
    time: "2 weeks ago",
    positive: false,
  },
];

const conservativeUserSolTransactions: Transaction[] = [
  {
    id: 1,
    type: "Liquidity Mining",
    details: "RAY rewards",
    amount: "+2.85 RAY",
    time: "12 hours ago",
    positive: true,
  },
  {
    id: 2,
    type: "Unstake SOL",
    details: "Lido",
    amount: "+1.25 SOL",
    time: "3 days ago",
    positive: true,
  },
  {
    id: 3,
    type: "Transaction Fee",
    details: "Network fee",
    amount: "-0.00025 SOL",
    time: "1 week ago",
    positive: false,
  },
];

const solanaOnlyTransactions: Transaction[] = [
  {
    id: 1,
    type: "Arbitrage Trade",
    details: "USDT/USDC",
    amount: "+12.5 USDT",
    time: "30 min ago",
    positive: true,
  },
  {
    id: 2,
    type: "Provide Liquidity",
    details: "RAY-USDC Pool",
    amount: "-5 RAY",
    time: "2 hours ago",
    positive: false,
  },
  {
    id: 3,
    type: "NFT Collection Sweep",
    details: "Bought 5 Claynosaurz",
    amount: "-1.25 SOL",
    time: "1 day ago",
    positive: false,
  },
  {
    id: 4,
    type: "Yield Harvest",
    details: "Claimed rewards",
    amount: "+8.53 USDC",
    time: "3 days ago",
    positive: true,
  },
];

export const sampleVisitors: VisitorData[] = [
  // User 1 - Solana user (2 SOL wallets)
  {
    visitor_id: "sK4mP9nX2vB7jL5qW8",
    ip_address: "***.***0.100.42",
    wallet_address: "DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK",
    location: "Miami, United States",
    browser: "Chrome 120.0.0",
    device_type: "Computer",
    os: "MacOS",
    os_version: "14.2 Sonoma",
    incognito: true,
    vpn: false,
    wallet_type: "Phantom",
    wallet_balance: "7.5 SOL ($1,425)",
    ens_domain: "",
    associated_emails: [
      "solana.trader@protonmail.com",
      "defi.whale@gmail.com",
      "crypto@tempmail.org",
      "anon42@mail.com",
    ],
    transactions: solanaWhaleTransactions1,
    visit_time: "Now",
    risk_level: 45,
    incognito_sessions: 8,
    ads_clicked: 15,
    click_ids: 15,
    total_visits: 89,
    mobile_views: 32,
    tablet_views: 8,
    computer_views: 49,
    ip_addresses: [
      {
        ip: "***.***0.100.42",
        location: "Miami, United States",
        visits: 45,
        first_seen: "2024-11-15",
        last_seen: "2025-01-20",
        vpn_detected: false,
      },
      {
        ip: "***.***3.113.77",
        location: "New York, United States",
        visits: 28,
        first_seen: "2024-12-01",
        last_seen: "2025-01-18",
        vpn_detected: true,
      },
      {
        ip: "***.***6.254.99",
        location: "Los Angeles, United States",
        visits: 16,
        first_seen: "2025-01-05",
        last_seen: "2025-01-19",
        vpn_detected: false,
      },
    ],
    wallets: [
      {
        address: "DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK",
        type: "Phantom",
        balance: "7.5 SOL ($1,425)",
        first_seen: "2024-11-15",
        last_seen: "2025-01-20",
        tokens: [
          { symbol: "SOL", amount: "7.5", value: "$1,425" },
          { symbol: "USDT", amount: "250", value: "$250" },
          { symbol: "USDC", amount: "175", value: "$175" },
          { symbol: "RAY", amount: "15", value: "$82.50" },
        ],
        transactions: solanaWhaleTransactions1,
      },
      {
        address: "3yFwqXBfZY4jBVUafQ1YEXw189y2dN3V5KQq9uzBDy1E",
        type: "Backpack",
        balance: "2.8 SOL ($532)",
        first_seen: "2024-12-20",
        last_seen: "2025-01-19",
        tokens: [
          { symbol: "SOL", amount: "2.8", value: "$532" },
          { symbol: "USDC", amount: "45", value: "$45" },
        ],
        transactions: solanaWhaleTransactions2,
      },
    ],
    rewards: {
      totalUSDT: "10",
      totalETH: "0.0025",
      totalSOL: "0.08",
      transactions: [
        {
          id: "tx_5",
          token: "SOL",
          amount: "0.05",
          value: "$9.50",
          timestamp: "6 hours ago",
          txHash:
            "iWEYiH78NuGJUM334Z4SmcTWjsyoDUKGSbsykX4A2bQJRSCjzTECSDkCa9xYpFxT1g3EeGuuLLhvE1eQS7LMvyN",
        },
        {
          id: "tx_6",
          token: "USDT",
          amount: "10",
          value: "$10",
          timestamp: "1 day ago",
          txHash:
            "0xc2e7404828a8eef22edc3f0dabfbe446567443baf00224e9d907a3b4e37a350a",
        },
        {
          id: "tx_7",
          token: "ETH",
          amount: "0.0025",
          value: "$8",
          timestamp: "4 days ago",
          txHash:
            "0x78b07a5409ab3aa79c33b9fa3914a61e942682f85199657c50eecf64b5dab8eb",
        },
        {
          id: "tx_8",
          token: "SOL",
          amount: "0.03",
          value: "$5.70",
          timestamp: "1 week ago",
          txHash:
            "2Qf2ayHHhFGXpE62Es7U7PvDEe3thd1o92ny3ajCNApCvcLsx6GXKxCMY7tL3gyTevTcrjtTcbi46qt5fDB8aTj3",
        },
      ],
    },
    devices: [
      {
        id: "device_2",
        type: "Computer",
        os: "MacOS",
        os_version: "14.2 Sonoma",
        browsers: [
          {
            name: "Chrome",
            version: "120.0.0",
          },
          {
            name: "Safari",
            version: "17.2",
          },
        ],
        incognito: true,
        ip_addresses: [
          {
            ip: "***.***0.100.42",
            location: "Miami, United States",
            visits: 45,
            first_seen: "2024-11-15",
            last_seen: "2025-01-20",
            vpn_detected: false,
          },
          {
            ip: "***.***3.113.77",
            location: "New York, United States",
            visits: 28,
            first_seen: "2024-12-01",
            last_seen: "2025-01-18",
            vpn_detected: true,
          },
          {
            ip: "***.***6.254.99",
            location: "Los Angeles, United States",
            visits: 16,
            first_seen: "2025-01-05",
            last_seen: "2025-01-19",
            vpn_detected: false,
          },
        ],
        first_seen: "2024-11-15",
        last_seen: "2025-01-20",
      },
      {
        id: "device_2b",
        type: "Tablet",
        os: "iPadOS",
        os_version: "17.2",
        browsers: [
          {
            name: "Safari",
            version: "17.2",
          },
        ],
        incognito: false,
        ip_addresses: [
          {
            ip: "***.***0.100.43",
            location: "Miami, United States",
            visits: 12,
            first_seen: "2024-12-01",
            last_seen: "2025-01-19",
            vpn_detected: false,
          },
        ],
        first_seen: "2024-12-01",
        last_seen: "2025-01-19",
      },
    ],
  },

  // User 2 - Small trader (2 ETH, 3 SOL wallets) - HIGHEST REWARDS
  {
    visitor_id: "bR0k3nW4ll3t5sY5t3m",
    ip_address: "***.***3.113.42",
    wallet_address: "0x1234567890abcdef1234567890abcdef12345678",
    location: "Mumbai, India",
    browser: "Chrome 120.0.0",
    device_type: "Mobile",
    os: "Android",
    os_version: "14",
    incognito: true,
    vpn: true,
    wallet_type: "Metamask",
    wallet_balance: "0.12 ETH ($384)",
    ens_domain: "",
    associated_emails: ["smalltrader@gmail.com"],
    transactions: brokeUserTransactions1,
    visit_time: "5 minutes ago",
    risk_level: 93,
    incognito_sessions: 12,
    ads_clicked: 45,
    click_ids: 45,
    total_visits: 234,
    mobile_views: 187,
    tablet_views: 12,
    computer_views: 35,
    ip_addresses: [
      {
        ip: "***.***3.113.42",
        location: "Mumbai, India",
        visits: 67,
        first_seen: "2024-09-15",
        last_seen: "2025-01-20",
        vpn_detected: true,
      },
      {
        ip: "***.***3.32.156",
        location: "Tokyo, Japan",
        visits: 45,
        first_seen: "2024-10-20",
        last_seen: "2025-01-18",
        vpn_detected: true,
      },
      {
        ip: "***.***9.108.153",
        location: "Berlin, Germany",
        visits: 38,
        first_seen: "2024-11-10",
        last_seen: "2025-01-17",
        vpn_detected: true,
      },
      {
        ip: "***.***1.1.140",
        location: "Sydney, Australia",
        visits: 42,
        first_seen: "2024-12-05",
        last_seen: "2025-01-19",
        vpn_detected: false,
      },
      {
        ip: "***.***6.123.96",
        location: "São Paulo, Brazil",
        visits: 42,
        first_seen: "2025-01-01",
        last_seen: "2025-01-20",
        vpn_detected: true,
      },
    ],
    wallets: [
      {
        address: "0x1234567890abcdef1234567890abcdef12345678",
        type: "Metamask",
        balance: "0.12 ETH ($384)",
        first_seen: "2024-09-15",
        last_seen: "2025-01-20",
        tokens: [
          { symbol: "ETH", amount: "0.12", value: "$384" },
          { symbol: "PEPE", amount: "1,000", value: "$0.019" },
          { symbol: "USDT", amount: "0.22", value: "$0.22" },
        ],
        transactions: brokeUserTransactions1,
      },
      {
        address: "0xabcdef1234567890abcdef1234567890abcdef12",
        type: "WalletConnect",
        balance: "0.095 ETH ($304)",
        first_seen: "2024-10-01",
        last_seen: "2025-01-18",
        tokens: [
          { symbol: "ETH", amount: "0.095", value: "$304" },
          { symbol: "DOGE", amount: "10", value: "$3.40" },
          { symbol: "SHIB", amount: "50,000", value: "$1.20" },
        ],
        transactions: brokeUserTransactions1,
      },
      {
        address: "BkX9TNxvKmQ2jL5PzRY8nV4wS7aH6DcF3gE1yU9MpCiJ",
        type: "Phantom",
        balance: "2.5 SOL ($475)",
        first_seen: "2024-11-15",
        last_seen: "2025-01-19",
        tokens: [
          { symbol: "SOL", amount: "2.5", value: "$475" },
          { symbol: "USDC", amount: "25", value: "$25" },
        ],
        transactions: brokeUserTransactions2,
      },
      {
        address: "Hy7mKP3nX9vL2Qw5BjR8Ts4Zn6Fc1Gd0Em9Vu8YkLaWx",
        type: "Backpack",
        balance: "1.8 SOL ($342)",
        first_seen: "2024-12-10",
        last_seen: "2025-01-17",
        tokens: [
          { symbol: "SOL", amount: "1.8", value: "$342" },
          { symbol: "RAY", amount: "0.5", value: "$2.75" },
        ],
        transactions: brokeUserTransactions2,
      },
      {
        address: "Jm4Vx8Kn2Pq9Lr7Ws5Yt3Bn6Hc0Zf1Gd4Ea8Ru7MiNp",
        type: "Phantom",
        balance: "3.2 SOL ($608)",
        first_seen: "2025-01-05",
        last_seen: "2025-01-20",
        tokens: [
          { symbol: "SOL", amount: "3.2", value: "$608" },
          { symbol: "USDT", amount: "15", value: "$15" },
        ],
        transactions: brokeUserTransactions2,
      },
    ],
    rewards: {
      totalUSDT: "25",
      totalETH: "0.006",
      totalSOL: "0.15",
      transactions: [
        {
          id: "tx_13",
          token: "USDT",
          amount: "15",
          value: "$15",
          timestamp: "1 hour ago",
          txHash:
            "0x2c674dc8f55a6f6b8dc64c9466a184e988cc9cf0fc4cae12a2a2ed5efc46a44d",
        },
        {
          id: "tx_14",
          token: "SOL",
          amount: "0.10",
          value: "$19",
          timestamp: "8 hours ago",
          txHash:
            "3hunNQcMfEmjUnjTRnqpJcV5WrjPoc7BDTZZfuPgUMioQvF7GU2Y8UmBWNBQDWAceooxQNcKBBoBkZrkNxmqomkm",
        },
        {
          id: "tx_15",
          token: "ETH",
          amount: "0.006",
          value: "$19.20",
          timestamp: "2 days ago",
          txHash:
            "0x0f61466106fdeca579b693272082451dfb82543bdaa887a1c2b361bd016cdbe0",
        },
        {
          id: "tx_16",
          token: "USDT",
          amount: "10",
          value: "$10",
          timestamp: "4 days ago",
          txHash:
            "5Yp1UtGXRxLeDeymskmTpmbsmfeRorCpE5TZcpfADJ9LTENXJPBpokCrP1QhaKn4HWQuzrP7nPrxw42rbeanRmVB",
        },
        {
          id: "tx_17",
          token: "SOL",
          amount: "0.05",
          value: "$9.50",
          timestamp: "1 week ago",
          txHash:
            "5CBmTthv5M8RVpbesvMWijvwL5DNUiMCsauC1QTyrqAabtWL9M5fNGoDt1FzcN47H19VuDNarNVYW4RuCTGV4iy4",
        },
      ],
    },
    devices: [
      {
        id: "device_4",
        type: "Mobile",
        os: "Android",
        os_version: "14",
        browsers: [
          {
            name: "Chrome",
            version: "120.0.0",
          },
          {
            name: "Samsung Internet",
            version: "23.0",
          },
        ],
        incognito: true,
        ip_addresses: [
          {
            ip: "***.***3.113.42",
            location: "Mumbai, India",
            visits: 67,
            first_seen: "2024-09-15",
            last_seen: "2025-01-20",
            vpn_detected: true,
          },
          {
            ip: "***.***3.32.156",
            location: "Tokyo, Japan",
            visits: 45,
            first_seen: "2024-10-20",
            last_seen: "2025-01-18",
            vpn_detected: true,
          },
          {
            ip: "***.***9.108.153",
            location: "Berlin, Germany",
            visits: 38,
            first_seen: "2024-11-10",
            last_seen: "2025-01-17",
            vpn_detected: true,
          },
          {
            ip: "***.***1.1.140",
            location: "Sydney, Australia",
            visits: 42,
            first_seen: "2024-12-05",
            last_seen: "2025-01-19",
            vpn_detected: false,
          },
          {
            ip: "***.***6.123.96",
            location: "São Paulo, Brazil",
            visits: 42,
            first_seen: "2025-01-01",
            last_seen: "2025-01-20",
            vpn_detected: true,
          },
        ],
        first_seen: "2024-09-15",
        last_seen: "2025-01-20",
      },
    ],
  },

  // User 3 - Mixed portfolio (1 ETH, 1 SOL)
  {
    visitor_id: "mX9pL2kN7vB4jQ6wS3",
    ip_address: "***.***2.2.123",
    wallet_address: "0x742d35Cc6634C0532925a3b844Bc8e70d4C9dB8a",
    location: "London, United Kingdom",
    browser: "Firefox 121.0",
    device_type: "Computer",
    os: "Windows",
    os_version: "11 Pro",
    incognito: false,
    vpn: true,
    wallet_type: "Metamask",
    wallet_balance: "0.4 ETH ($1,280)",
    ens_domain: "",
    associated_emails: [
      "crypto.investor@gmail.com",
      "john.doe@company.com",
      "trading@proton.me",
      "backup@mail.com",
      "newsletter@substack.com",
    ],
    transactions: mixedUserEthTransactions,
    visit_time: "47 minutes ago",
    risk_level: 66,
    incognito_sessions: 3,
    ads_clicked: 22,
    click_ids: 23,
    total_visits: 156,
    mobile_views: 45,
    tablet_views: 23,
    computer_views: 88,
    ip_addresses: [
      {
        ip: "***.***2.2.123",
        location: "London, United Kingdom",
        visits: 98,
        first_seen: "2024-10-12",
        last_seen: "2025-01-20",
        vpn_detected: true,
      },
      {
        ip: "***.***1.100.178",
        location: "Manchester, United Kingdom",
        visits: 58,
        first_seen: "2024-11-20",
        last_seen: "2025-01-18",
        vpn_detected: false,
      },
    ],
    wallets: [
      {
        address: "0x742d35Cc6634C0532925a3b844Bc8e70d4C9dB8a",
        type: "Metamask",
        balance: "0.4 ETH ($1,280)",
        first_seen: "2024-10-12",
        last_seen: "2025-01-20",
        tokens: [
          { symbol: "ETH", amount: "0.4", value: "$1,280" },
          { symbol: "USDT", amount: "125", value: "$125" },
          { symbol: "DOGE", amount: "850", value: "$289" },
          { symbol: "LINK", amount: "8", value: "$200" },
        ],
        transactions: mixedUserEthTransactions,
      },
      {
        address: "7VcwKTeGrCXaJQPzVpFnhjWqJzhpgXMkQJBxKqzCmLv6",
        type: "Phantom",
        balance: "4.8 SOL ($912)",
        ens_domain: "crypto.sol",
        first_seen: "2024-11-01",
        last_seen: "2025-01-19",
        tokens: [
          { symbol: "SOL", amount: "4.8", value: "$912" },
          { symbol: "USDC", amount: "285", value: "$285" },
          { symbol: "RAY", amount: "12", value: "$66" },
        ],
        transactions: mixedUserSolTransactions,
      },
    ],
    rewards: {
      totalUSDT: "18",
      totalETH: "0.004",
      totalSOL: "0.10",
      transactions: [
        {
          id: "tx_9",
          token: "USDT",
          amount: "12",
          value: "$12",
          timestamp: "4 hours ago",
          txHash:
            "0x2c674dc8f55a6f6b8dc64c9466a184e988cc9cf0fc4cae12a2a2ed5efc46a44d",
        },
        {
          id: "tx_10",
          token: "ETH",
          amount: "0.004",
          value: "$12.80",
          timestamp: "1 day ago",
          txHash:
            "0xffec554c30d5e12022c21c665a7231bceea7aa7597b1addfa61df4e6e049c58c",
        },
        {
          id: "tx_11",
          token: "SOL",
          amount: "0.10",
          value: "$19",
          timestamp: "3 days ago",
          txHash:
            "4RtoGgXu5wb19pQnpbCuhNDiGvkZsvFs5NTdDrVsJHTdP4KcAN4yghPUhQSH37MjQDH5wfRX8S51TVNrgr1FeDga",
        },
        {
          id: "tx_12",
          token: "USDT",
          amount: "6",
          value: "$6",
          timestamp: "5 days ago",
          txHash:
            "0xee13a698de247b7a7a81b4f95bc60d8a2d15616338d08645565c100cbeb5561f",
        },
      ],
    },
    devices: [
      {
        id: "device_3",
        type: "Computer",
        os: "Windows",
        os_version: "11 Pro",
        browsers: [
          {
            name: "Firefox",
            version: "121.0",
          },
          {
            name: "Edge",
            version: "120.0",
          },
        ],
        incognito: false,
        ip_addresses: [
          {
            ip: "***.***2.2.123",
            location: "London, United Kingdom",
            visits: 98,
            first_seen: "2024-10-12",
            last_seen: "2025-01-20",
            vpn_detected: true,
          },
          {
            ip: "***.***1.100.178",
            location: "Manchester, United Kingdom",
            visits: 58,
            first_seen: "2024-11-20",
            last_seen: "2025-01-18",
            vpn_detected: false,
          },
        ],
        first_seen: "2024-10-12",
        last_seen: "2025-01-20",
      },
    ],
  },

  // User 4 - Vitalik-like whale (1 ETH wallet)
  {
    visitor_id: "vBu7Kn9Qm3xLpW8sT2aR",
    ip_address: "***.***2.182.92",
    wallet_address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    location: "Zug, Switzerland",
    browser: "Brave 1.58.0",
    device_type: "Computer",
    os: "Linux",
    os_version: "Ubuntu 22.04 LTS",
    incognito: false,
    vpn: true,
    wallet_type: "Ledger",
    wallet_balance: "4.7 ETH ($10,386,560)",
    ens_domain: "vitalik.eth",
    associated_emails: ["v.buterin@ethereum.org", "contact@vitalik.ca"],
    transactions: vitalikTransactions,
    visit_time: "1 hour ago",
    risk_level: 15,
    incognito_sessions: 0,
    ads_clicked: 2,
    click_ids: 2,
    total_visits: 127,
    mobile_views: 18,
    tablet_views: 5,
    computer_views: 104,
    ip_addresses: [
      {
        ip: "***.***2.182.92",
        location: "Zug, Switzerland",
        visits: 127,
        first_seen: "2024-01-01",
        last_seen: "2025-01-20",
        vpn_detected: true,
      },
    ],
    wallets: [
      {
        address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        type: "Ledger",
        balance: "4.7 ETH ($10,386,560)",
        ens_domain: "vitalik.eth",
        first_seen: "2024-01-01",
        last_seen: "2025-01-20",
        tokens: [
          { symbol: "ETH", amount: "4.7", value: "$19,978" },
          { symbol: "SHIB", amount: "8,500,000,000", value: "$105,000" },
        ],
        transactions: vitalikTransactions,
      },
    ],
    rewards: {
      totalUSDT: "15",
      totalETH: "0.003",
      totalSOL: "0.06",
      transactions: [
        {
          id: "tx_1",
          token: "USDT",
          amount: "8",
          value: "$8",
          timestamp: "3 hours ago",
          txHash:
            "0x2158291994bc5475aa318fd3df070049406ad800b8021df538b9f8f0e034c57a",
        },
        {
          id: "tx_2",
          token: "ETH",
          amount: "0.003",
          value: "$9.60",
          timestamp: "2 days ago",
          txHash:
            "0x73d034097423d908d823bb488f4a465b3a2fea85a37683058375f12a5e067318",
        },
        {
          id: "tx_3",
          token: "SOL",
          amount: "0.06",
          value: "$11.40",
          timestamp: "5 days ago",
          txHash:
            "5tTJ1xRUPhhXGCgWAnSXzr14EH5TAJiSQGDwzZNL315v9PM2sVHRsv3nU5qHSv6k6CDA8T8D7f3UP9SW1duYMcLw",
        },
        {
          id: "tx_4",
          token: "USDT",
          amount: "7",
          value: "$7",
          timestamp: "1 week ago",
          txHash:
            "0xd97394f32333011889e1ec78103df834616001034d12201b8384b816b3d1217d",
        },
      ],
    },
    devices: [
      {
        id: "device_1",
        type: "Computer",
        os: "Linux",
        os_version: "Ubuntu 22.04 LTS",
        browsers: [
          {
            name: "Brave",
            version: "1.58.0",
          },
          {
            name: "Firefox",
            version: "121.0",
          },
        ],
        incognito: false,
        ip_addresses: [
          {
            ip: "***.***2.182.92",
            location: "Zug, Switzerland",
            visits: 127,
            first_seen: "2024-01-01",
            last_seen: "2025-01-20",
            vpn_detected: true,
          },
        ],
        first_seen: "2024-01-01",
        last_seen: "2025-01-20",
      },
      {
        id: "device_1b",
        type: "Mobile",
        os: "iOS",
        os_version: "17.2",
        browsers: [
          {
            name: "Safari",
            version: "17.2",
          },
        ],
        incognito: false,
        ip_addresses: [
          {
            ip: "***.***2.182.93",
            location: "Zug, Switzerland",
            visits: 23,
            first_seen: "2024-06-15",
            last_seen: "2025-01-20",
            vpn_detected: true,
          },
        ],
        first_seen: "2024-06-15",
        last_seen: "2025-01-20",
      },
    ],
  },

  // User 5 - Conservative investor (1 ETH, 2 SOL)
  {
    visitor_id: "cN5vT8mK2pL9jX4qW7",
    ip_address: "***.***7.16.142",
    wallet_address: "0x8B3F5F7a9Cd2B1E4D6C0A8E2F9B3C7D1A4E6F8B2",
    location: "Singapore",
    browser: "Safari 17.2",
    device_type: "Computer",
    os: "MacOS",
    os_version: "14.2 Sonoma",
    incognito: false,
    vpn: false,
    wallet_type: "Trezor",
    wallet_balance: "0.35 ETH ($1,120)",
    ens_domain: "",
    associated_emails: ["stable.investor@outlook.com"],
    transactions: conservativeUserEthTransactions,
    visit_time: "2 hours ago",
    risk_level: 20,
    incognito_sessions: 1,
    ads_clicked: 8,
    click_ids: 8,
    total_visits: 45,
    mobile_views: 7,
    tablet_views: 3,
    computer_views: 35,
    ip_addresses: [
      {
        ip: "***.***7.16.142",
        location: "Singapore",
        visits: 38,
        first_seen: "2024-08-20",
        last_seen: "2025-01-20",
        vpn_detected: false,
      },
      {
        ip: "***.***8.60.1",
        location: "Hong Kong",
        visits: 7,
        first_seen: "2024-12-15",
        last_seen: "2025-01-15",
        vpn_detected: false,
      },
    ],
    wallets: [
      {
        address: "0x8B3F5F7a9Cd2B1E4D6C0A8E2F9B3C7D1A4E6F8B2",
        type: "Trezor",
        balance: "0.35 ETH ($1,120)",
        first_seen: "2024-08-20",
        last_seen: "2025-01-20",
        tokens: [
          { symbol: "ETH", amount: "0.35", value: "$1,120" },
          { symbol: "USDC", amount: "750", value: "$750" },
          { symbol: "USDT", amount: "625", value: "$625" },
        ],
        transactions: conservativeUserEthTransactions,
      },
      {
        address: "Kq8Np3Lm7Vx2Yw5Jt9Rn4Bs6Hc1Zf0Gd8Ea7Wu9MkPx",
        type: "Phantom",
        balance: "6.5 SOL ($1,235)",
        first_seen: "2024-09-10",
        last_seen: "2025-01-19",
        tokens: [
          { symbol: "SOL", amount: "6.5", value: "$1,235" },
          { symbol: "RAY", amount: "25", value: "$137.50" },
        ],
        transactions: conservativeUserSolTransactions,
      },
      {
        address: "Nx5Tm8Kp2Vq9Lr7Ws3Yt4Bn6Jc0Hf1Gd4Ma8Eu7RiZx",
        type: "Ledger",
        balance: "4.2 SOL ($798)",
        first_seen: "2024-11-25",
        last_seen: "2025-01-18",
        tokens: [{ symbol: "SOL", amount: "4.2", value: "$798" }],
        transactions: conservativeUserSolTransactions,
      },
    ],
    rewards: {
      totalUSDT: "8",
      totalETH: "0.002",
      totalSOL: "0.04",
      transactions: [
        {
          id: "tx_18",
          token: "USDT",
          amount: "5",
          value: "$5",
          timestamp: "12 hours ago",
          txHash:
            "0x6422d401a3c12585eaee198e18dcd5f4846abe247249cc7ecd455e46d7fcea2c",
        },
        {
          id: "tx_19",
          token: "ETH",
          amount: "0.002",
          value: "$6.40",
          timestamp: "3 days ago",
          txHash:
            "0xaa29c1dbe38bbcff8943ef7766e739840feff8e5ac1307e52eb33917d93c57df",
        },
        {
          id: "tx_20",
          token: "SOL",
          amount: "0.04",
          value: "$7.60",
          timestamp: "1 week ago",
          txHash:
            "3hunNQcMfEmjUnjTRnqpJcV5WrjPoc7BDTZZfuPgUMioQvF7GU2Y8UmBWNBQDWAceooxQNcKBBoBkZrkNxmqomkm",
        },
        {
          id: "tx_21",
          token: "USDT",
          amount: "3",
          value: "$3",
          timestamp: "2 weeks ago",
          txHash:
            "4Daqs3CF826przQ8kx9ZWQjdwqczPAzPmbX5NBYmx6uf4YT67F1cne5RMgK3XxAHkhGcQiwMsRDWtyYRZEAD2okH",
        },
      ],
    },
    devices: [
      {
        id: "device_5",
        type: "Computer",
        os: "MacOS",
        os_version: "14.2 Sonoma",
        browsers: [
          {
            name: "Safari",
            version: "17.2",
          },
        ],
        incognito: false,
        ip_addresses: [
          {
            ip: "***.***7.16.142",
            location: "Singapore",
            visits: 38,
            first_seen: "2024-08-20",
            last_seen: "2025-01-20",
            vpn_detected: false,
          },
          {
            ip: "***.***8.60.1",
            location: "Hong Kong",
            visits: 7,
            first_seen: "2024-12-15",
            last_seen: "2025-01-15",
            vpn_detected: false,
          },
        ],
        first_seen: "2024-08-20",
        last_seen: "2025-01-20",
      },
    ],
  },

  // User 6 - Solana-only DeFi user (1 SOL wallet)
  {
    visitor_id: "dF1Us3R5oL4nA8mX2k",
    ip_address: "***.***8.16.96",
    wallet_address: "FzhYvM3NKXrqmQJHB8TpnC4dWyLkG6sE9aV2RjU7iPxN",
    location: "Amsterdam, Netherlands",
    browser: "Brave 1.58.0",
    device_type: "Computer",
    os: "Linux",
    os_version: "Ubuntu 22.04",
    incognito: true,
    vpn: true,
    wallet_type: "Phantom",
    wallet_balance: "7.8 SOL ($1,482)",
    ens_domain: "",
    associated_emails: [
      "defi.expert@protonmail.com",
      "yield.farmer@tutanota.com",
      "solana@encrypted.email",
      "anon.trader@mail.com",
      "newsletter@defi.org",
    ],
    transactions: solanaOnlyTransactions,
    visit_time: "3 days ago",
    risk_level: 55,
    incognito_sessions: 6,
    ads_clicked: 28,
    click_ids: 29,
    total_visits: 198,
    mobile_views: 34,
    tablet_views: 15,
    computer_views: 149,
    ip_addresses: [
      {
        ip: "***.***8.16.96",
        location: "Amsterdam, Netherlands",
        visits: 89,
        first_seen: "2024-07-10",
        last_seen: "2025-01-20",
        vpn_detected: true,
      },
      {
        ip: "***.***3.72.36",
        location: "Frankfurt, Germany",
        visits: 67,
        first_seen: "2024-09-15",
        last_seen: "2025-01-18",
        vpn_detected: true,
      },
      {
        ip: "***.***0.216.35",
        location: "Paris, France",
        visits: 42,
        first_seen: "2024-12-01",
        last_seen: "2025-01-19",
        vpn_detected: false,
      },
    ],
    wallets: [
      {
        address: "FzhYvM3NKXrqmQJHB8TpnC4dWyLkG6sE9aV2RjU7iPxN",
        type: "Phantom",
        balance: "7.8 SOL ($1,482)",
        first_seen: "2024-07-10",
        last_seen: "2025-01-20",
        tokens: [
          { symbol: "SOL", amount: "7.8", value: "$1,482" },
          { symbol: "USDT", amount: "450", value: "$450" },
          { symbol: "USDC", amount: "385", value: "$385" },
          { symbol: "RAY", amount: "28", value: "$154" },
        ],
        transactions: solanaOnlyTransactions,
      },
    ],
    rewards: {
      totalUSDT: "14",
      totalETH: "0.0035",
      totalSOL: "0.12",
      transactions: [
        {
          id: "tx_22",
          token: "SOL",
          amount: "0.08",
          value: "$15.20",
          timestamp: "2 hours ago",
          txHash:
            "45vwMa1WDgS1FeaACZQjju3v18JCBZoW81uE3xQ5cEKBH8bhvYGY8bvTSRAe44kXnSjMTJqZJUKdRiQapq3RhTXP",
        },
        {
          id: "tx_23",
          token: "USDT",
          amount: "8",
          value: "$8",
          timestamp: "1 day ago",
          txHash:
            "0xfa88424677dfd396282185b284cc8b61b1f9b2fe59d21957a17db925ddd71a87",
        },
        {
          id: "tx_24",
          token: "ETH",
          amount: "0.0035",
          value: "$11.20",
          timestamp: "2 days ago",
          txHash:
            "0xec4b0cfedba722a1f3ad4316bc109ee0a35fc3274a09a65329ed2a3991356c14",
        },
        {
          id: "tx_25",
          token: "USDT",
          amount: "6",
          value: "$6",
          timestamp: "5 days ago",
          txHash:
            "45vwMa1WDgS1FeaACZQjju3v18JCBZoW81uE3xQ5cEKBH8bhvYGY8bvTSRAe44kXnSjMTJqZJUKdRiQapq3RhTXP",
        },
        {
          id: "tx_26",
          token: "SOL",
          amount: "0.04",
          value: "$7.60",
          timestamp: "1 week ago",
          txHash:
            "3hQ17U14vqgfmttsC6ruGJKCxiPauHzWsigqNKMkSwHBezVUanE1TyFEyKpexLqJhCUYHciDatksMJrkmxvrMczh",
        },
      ],
    },
    devices: [
      {
        id: "device_6",
        type: "Computer",
        os: "Linux",
        os_version: "Ubuntu 22.04",
        browsers: [
          {
            name: "Brave",
            version: "1.58.0",
          },
          {
            name: "Firefox",
            version: "121.0",
          },
        ],
        incognito: true,
        ip_addresses: [
          {
            ip: "***.***8.16.96",
            location: "Amsterdam, Netherlands",
            visits: 89,
            first_seen: "2024-07-10",
            last_seen: "2025-01-20",
            vpn_detected: true,
          },
          {
            ip: "***.***3.72.36",
            location: "Frankfurt, Germany",
            visits: 67,
            first_seen: "2024-09-15",
            last_seen: "2025-01-18",
            vpn_detected: true,
          },
          {
            ip: "***.***0.216.35",
            location: "Paris, France",
            visits: 42,
            first_seen: "2024-12-01",
            last_seen: "2025-01-19",
            vpn_detected: false,
          },
        ],
        first_seen: "2024-07-10",
        last_seen: "2025-01-20",
      },
    ],
  },
];

export const dashboardStats = {
  totalVisits: 377,
  totalIncognitoVisits: 42,
  totalUniqueIPs: 251,
  totalUniqueGeolocations: 137,
  totalWalletsDetected: 293,
  totalUSDTRewards: "574",
  totalSOLRewards: "6.13",
  totalETHRewards: "0.78",
  totalAdsClicked: 148,
  totalClickIds: 149,
};
