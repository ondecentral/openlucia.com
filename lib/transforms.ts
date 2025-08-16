import {
  VisitorData,
  Transaction,
  IPAddress,
  Wallet as WalletData,
  RewardTransaction,
  sampleVisitors,
} from "../components/dashboard/dashboard-seed-data";

// Database row interfaces based on schema analysis
export interface FingerprintRow {
  id: number;
  data: any; // JSONB
  os?: string;
  timezone?: string;
  agent?: string;
  screen_width?: string;
  screen_height?: string;
  user_id?: number;
  profileHash: string;
  ip?: string;
  lucia_user_id?: number;
  unique_hash?: string;
  country?: string;
  city?: string;
  state?: string;
  location_info?: any; // JSONB
  session_id?: string;
  sdk_version?: string;
  origin?: string;
  device_data?: any; // JSONB
  screen_data?: any; // JSONB
  browser_data?: any; // JSONB
  permissions_data?: any; // JSONB
  storage_data?: any; // JSONB
  wallet_data?: any; // JSONB
  agent_data?: any; // JSONB
  createdAt: string;
  updatedAt: string;
}

export interface PageViewRow {
  id: number;
  client_id?: number;
  page?: string;
  user_id?: number;
  timestamp?: string;
  lucia_user_id?: number;
  fingerprint_id?: number;
  session_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ButtonClickRow {
  id: number;
  client_id?: number;
  button?: string;
  user_id?: number;
  lucia_user_id?: number;
  fingerprint_id?: number;
  session_id?: string;
  created_at: string;
  updated_at: string;
}

export interface LuciaUserRow {
  id: number;
  info?: any; // JSONB
  local_storage_hash_id: string;
  user_id?: number;
  unique_hash?: string;
  ip?: string;
  created_at: string;
  updated_at: string;
}

export interface WalletRow {
  id: number;
  name?: string;
  address?: string;
  chain_id?: number;
  network_name?: string;
  created_at: string;
  updated_at: string;
}

// Aggregated data interface for visitor transformation
export interface VisitorAggregateRow {
  fingerprint: FingerprintRow;
  lucia_user?: LuciaUserRow;
  page_views: PageViewRow[];
  button_clicks: ButtonClickRow[];
  wallets?: WalletRow[];
}

/**
 * Calculate risk level based on various factors
 */
function calculateRiskLevel(data: {
  hasVpn: boolean;
  incognitoSessions: number;
  multipleIPs: boolean;
  multipleLocations: boolean;
  walletValue: number;
  behaviorInconsistencies: number;
}): number {
  let risk = 0;

  // VPN usage (high risk)
  if (data.hasVpn) risk += 30;

  // Multiple incognito sessions (medium risk)
  risk += Math.min(data.incognitoSessions * 5, 25);

  // Multiple IP addresses (medium risk)
  if (data.multipleIPs) risk += 20;

  // Multiple locations (high risk)
  if (data.multipleLocations) risk += 25;

  // Low wallet value with high activity (suspicious)
  if (data.walletValue < 100 && data.behaviorInconsistencies > 5) risk += 15;

  // High wallet value with suspicious behavior (medium risk)
  if (data.walletValue > 10000 && data.behaviorInconsistencies > 3) risk += 10;

  return Math.min(risk, 100); // Cap at 100
}

/**
 * Extract wallet information from JSONB data (Real structure: {walletName, solWalletName, solanaAddress, walletAddress})
 */
function extractWallets(
  walletData: any,
  walletRows?: WalletRow[],
): WalletData[] {
  const wallets: WalletData[] = [];

  // From fingerprint wallet_data JSONB (Real structure from database)
  if (walletData && typeof walletData === "object" && walletData !== null) {
    // Ethereum wallet
    if (walletData.walletAddress) {
      wallets.push({
        address: walletData.walletAddress,
        type: walletData.walletName || "Unknown",
        balance: "0", // Balance not available in fingerprint data
        ens_domain: "",
        first_seen: new Date().toISOString(),
        last_seen: new Date().toISOString(),
        tokens: [],
        transactions: [],
      });
    }

    // Solana wallet
    if (walletData.solanaAddress) {
      wallets.push({
        address: walletData.solanaAddress,
        type: walletData.solWalletName || "Unknown",
        balance: "0", // Balance not available in fingerprint data
        ens_domain: "",
        first_seen: new Date().toISOString(),
        last_seen: new Date().toISOString(),
        tokens: [],
        transactions: [],
      });
    }
  }

  // From separate wallet table
  if (walletRows) {
    walletRows.forEach((wallet) => {
      wallets.push({
        address: wallet.address || "",
        type: "Unknown", // Type not stored in wallet table
        balance: "0", // Balance not stored in wallet table
        ens_domain: "",
        first_seen: wallet.created_at,
        last_seen: wallet.updated_at,
        tokens: [],
        transactions: [],
      });
    });
  }

  // Return default empty wallet if no wallet data
  return wallets.length > 0
    ? wallets
    : [
        {
          address: "",
          type: "Unknown",
          balance: "0",
          ens_domain: "",
          first_seen: new Date().toISOString(),
          last_seen: new Date().toISOString(),
          tokens: [],
          transactions: [],
        },
      ];
}

/**
 * Obscure IP address by replacing first 2 octets with ***.***
 */
function obscureIPAddress(ip: string): string {
  if (!ip) return "***.***.0.0";

  const parts = ip.split(".");
  if (parts.length !== 4) return "***.***.0.0";

  return `***.***.${parts[2]}.${parts[3]}`;
}

/**
 * Parse agent_data JSONB field to extract OS and browser info
 */
function parseAgentData(agentData: any): {
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
} {
  const defaultResponse = {
    os: "Unknown",
    osVersion: "Unknown",
    browser: "Unknown",
    browserVersion: "Unknown",
  };

  if (!agentData || typeof agentData !== "object") {
    return defaultResponse;
  }

  try {
    const os = agentData.os?.name || "Unknown";
    const osVersion = agentData.os?.version || "Unknown";
    const browser = agentData.browser?.name || "Unknown";
    const browserVersion =
      agentData.browser?.version || agentData.browser?.major || "Unknown";

    return { os, osVersion, browser, browserVersion };
  } catch (error) {
    console.warn("Error parsing agent_data:", error);
    return defaultResponse;
  }
}

/**
 * Get mock wallet data for demo purposes by spreading sample visitor data
 */
function getMockWalletDataForDemo(visitorIndex: number): {
  walletAddress: string;
  walletType: string;
  walletBalance: string;
  ensDomain: string;
  associatedEmails: string[];
  transactions: Transaction[];
  wallets: WalletData[];
  rewards: {
    totalUSDT: string;
    totalETH: string;
    totalSOL: string;
    transactions: RewardTransaction[];
  };
} {
  // Cycle through sample visitors to spread mock data across real visitors
  const mockVisitor = sampleVisitors[visitorIndex % sampleVisitors.length];

  return {
    walletAddress: mockVisitor.wallet_address,
    walletType: mockVisitor.wallet_type,
    walletBalance: mockVisitor.wallet_balance,
    ensDomain: mockVisitor.ens_domain,
    associatedEmails: mockVisitor.associated_emails,
    transactions: mockVisitor.transactions,
    wallets: mockVisitor.wallets,
    rewards: mockVisitor.rewards,
  };
}

/**
 * Extract IP addresses from various sources
 */
function extractIPAddresses(fingerprint: FingerprintRow): IPAddress[] {
  const ips: IPAddress[] = [];

  // Primary IP from fingerprint (obscured for privacy)
  if (fingerprint.ip) {
    ips.push({
      ip: obscureIPAddress(fingerprint.ip),
      location:
        fingerprint.city && fingerprint.country
          ? `${fingerprint.city}, ${fingerprint.country}`
          : "Unknown",
      visits: 1, // We'd need additional queries to get visit count per IP
      first_seen: fingerprint.createdAt,
      last_seen: fingerprint.updatedAt,
      vpn_detected: fingerprint.location_info?.vpn_detected || false,
    });
  }

  // Additional IPs from location_info JSONB
  if (fingerprint.location_info?.additional_ips) {
    fingerprint.location_info.additional_ips.forEach((ipInfo: any) => {
      ips.push({
        ip: obscureIPAddress(ipInfo.ip),
        location: ipInfo.location || "Unknown",
        visits: ipInfo.visits || 1,
        first_seen: ipInfo.first_seen || fingerprint.createdAt,
        last_seen: ipInfo.last_seen || fingerprint.updatedAt,
        vpn_detected: ipInfo.vpn_detected || false,
      });
    });
  }

  return ips.length > 0
    ? ips
    : [
        {
          ip: obscureIPAddress(fingerprint.ip || "0.0.0.0"),
          location: "Unknown",
          visits: 1,
          first_seen: fingerprint.createdAt,
          last_seen: fingerprint.updatedAt,
          vpn_detected: false,
        },
      ];
}

/**
 * Generate mock transaction data (since we don't have real transaction data)
 */
function generateMockTransactions(): Transaction[] {
  // For now, return empty array since we don't have transaction data
  // In the future, this could be populated from blockchain data or external APIs
  return [];
}

/**
 * Generate mock reward transactions
 */
function generateMockRewards(): {
  totalUSDT: string;
  totalETH: string;
  totalSOL: string;
  transactions: RewardTransaction[];
} {
  // Mock rewards based on activity level
  return {
    totalUSDT: "0",
    totalETH: "0",
    totalSOL: "0",
    transactions: [],
  };
}

/**
 * Transform database data to VisitorData interface
 */
export function transformToVisitorData(
  aggregate: VisitorAggregateRow,
  visitorIndex: number = 0,
): VisitorData {
  const {
    fingerprint,
    lucia_user,
    page_views,
    button_clicks,
    wallets: walletRows,
  } = aggregate;

  // Extract data from JSONB fields (real structure from database)
  const deviceData = fingerprint.device_data || {};
  const browserData = fingerprint.browser_data || {};
  const walletData = fingerprint.wallet_data;
  const locationInfo = fingerprint.location_info || {};
  const screenData = fingerprint.data?.screen || {};

  // Parse agent_data for proper OS and browser info
  const agentInfo = parseAgentData(fingerprint.agent_data);

  // Get mock wallet data for demo (spread across visitors)
  const mockWalletData = getMockWalletDataForDemo(visitorIndex);

  // Determine device type from device capabilities and screen size
  const getDeviceType = () => {
    if (deviceData.touch) return "Mobile";
    if (screenData.width && screenData.width < 768) return "Mobile";
    if (screenData.width && screenData.width < 1024) return "Tablet";
    return "Computer";
  };

  // Calculate metrics
  const realWallets = extractWallets(walletData, walletRows);
  const hasRealWallet =
    walletData && (walletData.walletAddress || walletData.solanaAddress);
  const wallets = hasRealWallet ? realWallets : mockWalletData.wallets; // Use mock data if no real wallet
  const ipAddresses = extractIPAddresses(fingerprint);
  const incognitoSessions =
    browserData.incognito_sessions || (browserData.incognito ? 1 : 0);
  // Count visits correctly: sessions + fingerprints without sessions
  const sessionIds = new Set(
    page_views.map((pv) => pv.session_id).filter((id) => id),
  );
  const totalVisits = sessionIds.size > 0 ? sessionIds.size : 1; // At least 1 visit (the fingerprint itself)
  const adsClicked = button_clicks.filter((click) =>
    click.button?.includes("ad"),
  ).length;

  // Risk calculation
  const riskLevel = calculateRiskLevel({
    hasVpn: locationInfo.vpn_detected || false,
    incognitoSessions,
    multipleIPs: ipAddresses.length > 1,
    multipleLocations: new Set(ipAddresses.map((ip) => ip.location)).size > 1,
    walletValue: wallets.reduce((sum, w) => {
      const balance = parseFloat(w.balance.replace(/[^0-9.-]+/g, ""));
      return sum + (isNaN(balance) ? 0 : balance);
    }, 0),
    behaviorInconsistencies:
      incognitoSessions + (ipAddresses.length > 1 ? 1 : 0),
  });

  // Time formatting
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
    return `${Math.floor(diffMins / 1440)} days ago`;
  };

  return {
    visitor_id: fingerprint.profileHash.substring(0, 16), // Limit to 16 symbols
    ip_address: obscureIPAddress(fingerprint.ip || "0.0.0.0"),
    wallet_address: hasRealWallet
      ? wallets[0]?.address || ""
      : mockWalletData.walletAddress,
    location:
      fingerprint.city && fingerprint.country
        ? `${fingerprint.city}, ${fingerprint.country}`
        : "Unknown",
    browser: `${agentInfo.browser} ${agentInfo.browserVersion}`,
    device_type: getDeviceType(),
    os: agentInfo.os,
    os_version: agentInfo.osVersion,
    incognito: browserData.incognito || false,
    vpn: locationInfo.vpn_detected || false,
    wallet_type: hasRealWallet
      ? wallets[0]?.type || "Unknown"
      : mockWalletData.walletType,
    wallet_balance: hasRealWallet
      ? wallets[0]?.balance || "0"
      : mockWalletData.walletBalance,
    ens_domain: hasRealWallet
      ? wallets[0]?.ens_domain || ""
      : mockWalletData.ensDomain,
    associated_emails: hasRealWallet
      ? lucia_user?.info?.emails || []
      : mockWalletData.associatedEmails,
    transactions: hasRealWallet
      ? generateMockTransactions()
      : mockWalletData.transactions,
    visit_time: formatTimeAgo(fingerprint.createdAt),
    risk_level: riskLevel,
    incognito_sessions: incognitoSessions,
    ads_clicked: adsClicked,
    click_ids: button_clicks.length,
    total_visits: totalVisits,
    ip_addresses: ipAddresses,
    wallets: wallets,
    rewards: hasRealWallet ? generateMockRewards() : mockWalletData.rewards,
  };
}

/**
 * Transform multiple visitor aggregates to VisitorData array
 */
export function transformToVisitorDataArray(
  aggregates: VisitorAggregateRow[],
): VisitorData[] {
  return aggregates.map((aggregate, index) =>
    transformToVisitorData(aggregate, index),
  );
}
