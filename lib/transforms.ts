import {
  VisitorData,
  Transaction,
  IPAddress,
  Wallet as WalletData,
  RewardTransaction,
  sampleVisitors,
} from "../components/dashboard/dashboard-seed-data";

// Type guards for better type safety
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

// Typed interfaces for JSONB structures
interface WalletJSONBData {
  walletAddress?: string;
  walletName?: string;
  solanaAddress?: string;
  solWalletName?: string;
}

interface AgentData {
  os?: {
    name?: string;
    version?: string;
  };
  browser?: {
    name?: string;
    version?: string;
    major?: string;
  };
}

interface LocationInfo {
  vpn_detected?: boolean;
  additional_ips?: Array<{
    ip?: string;
    location?: string;
    visits?: number;
    first_seen?: string;
    last_seen?: string;
    vpn_detected?: boolean;
  }>;
}

interface BrowserData {
  incognito?: boolean;
  incognito_sessions?: number;
}

interface DeviceData {
  touch?: boolean;
}

interface ScreenData {
  width?: number;
  height?: number;
}

// Safe parsing functions to replace 'as' assertions
function parseWalletData(data: unknown): WalletJSONBData {
  if (!isRecord(data)) return {};

  return {
    walletAddress: isString(data.walletAddress)
      ? data.walletAddress
      : undefined,
    walletName: isString(data.walletName) ? data.walletName : undefined,
    solanaAddress: isString(data.solanaAddress)
      ? data.solanaAddress
      : undefined,
    solWalletName: isString(data.solWalletName)
      ? data.solWalletName
      : undefined,
  };
}

function parseAgentData(data: unknown): AgentData {
  if (!isRecord(data)) return {};

  const osData = isRecord(data.os) ? data.os : {};
  const browserData = isRecord(data.browser) ? data.browser : {};

  return {
    os: {
      name: isString(osData.name) ? osData.name : undefined,
      version: isString(osData.version) ? osData.version : undefined,
    },
    browser: {
      name: isString(browserData.name) ? browserData.name : undefined,
      version: isString(browserData.version) ? browserData.version : undefined,
      major: isString(browserData.major) ? browserData.major : undefined,
    },
  };
}

function parseLocationInfo(data: unknown): LocationInfo {
  if (!isRecord(data)) return {};

  return {
    vpn_detected: isBoolean(data.vpn_detected) ? data.vpn_detected : undefined,
    additional_ips: Array.isArray(data.additional_ips)
      ? data.additional_ips.map((ip) => ({
          ip: isRecord(ip) && isString(ip.ip) ? ip.ip : undefined,
          location:
            isRecord(ip) && isString(ip.location) ? ip.location : undefined,
          visits: isRecord(ip) && isNumber(ip.visits) ? ip.visits : undefined,
          first_seen:
            isRecord(ip) && isString(ip.first_seen) ? ip.first_seen : undefined,
          last_seen:
            isRecord(ip) && isString(ip.last_seen) ? ip.last_seen : undefined,
          vpn_detected:
            isRecord(ip) && isBoolean(ip.vpn_detected)
              ? ip.vpn_detected
              : undefined,
        }))
      : undefined,
  };
}

function parseBrowserData(data: unknown): BrowserData {
  if (!isRecord(data)) return {};

  return {
    incognito: isBoolean(data.incognito) ? data.incognito : undefined,
    incognito_sessions: isNumber(data.incognito_sessions)
      ? data.incognito_sessions
      : undefined,
  };
}

function parseDeviceData(data: unknown): DeviceData {
  if (!isRecord(data)) return {};

  return {
    touch: isBoolean(data.touch) ? data.touch : undefined,
  };
}

function parseScreenData(data: unknown): ScreenData {
  if (!isRecord(data)) return {};

  return {
    width: isNumber(data.width) ? data.width : undefined,
    height: isNumber(data.height) ? data.height : undefined,
  };
}

// Database row interfaces based on schema analysis
export interface FingerprintRow {
  id: number;
  data: Record<string, unknown>; // JSONB
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
  location_info?: Record<string, unknown>; // JSONB
  session_id?: string;
  sdk_version?: string;
  origin?: string;
  device_data?: Record<string, unknown>; // JSONB
  screen_data?: Record<string, unknown>; // JSONB
  browser_data?: Record<string, unknown>; // JSONB
  permissions_data?: Record<string, unknown>; // JSONB
  storage_data?: Record<string, unknown>; // JSONB
  wallet_data?: Record<string, unknown>; // JSONB
  agent_data?: Record<string, unknown>; // JSONB
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
  info?: Record<string, unknown>; // JSONB
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

// A users device
export interface Device {
  id: string;
  type: string;
  os: string;
  os_version: string;
  browsers: Array<{
    name: string;
    version: string;
  }>;
  incognito: boolean;
  ip_addresses: IPAddress[];
  first_seen: string;
  last_seen: string;
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
  walletData: unknown,
  walletRows?: WalletRow[],
): WalletData[] {
  const wallets: WalletData[] = [];
  const parsedWalletData = parseWalletData(walletData);

  // Ethereum wallet
  if (parsedWalletData.walletAddress) {
    wallets.push({
      address: parsedWalletData.walletAddress,
      type: parsedWalletData.walletName || "Unknown",
      balance: "0", // Balance not available in fingerprint data
      ens_domain: "",
      first_seen: new Date().toISOString(),
      last_seen: new Date().toISOString(),
      tokens: [],
      transactions: [],
    });
  }

  // Solana wallet
  if (parsedWalletData.solanaAddress) {
    wallets.push({
      address: parsedWalletData.solanaAddress,
      type: parsedWalletData.solWalletName || "Unknown",
      balance: "0", // Balance not available in fingerprint data
      ens_domain: "",
      first_seen: new Date().toISOString(),
      last_seen: new Date().toISOString(),
      tokens: [],
      transactions: [],
    });
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
function parseAgentDataToInfo(agentData: unknown): {
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
} {
  const parsed = parseAgentData(agentData);

  return {
    os: parsed.os?.name || "Unknown",
    osVersion: parsed.os?.version || "Unknown",
    browser: parsed.browser?.name || "Unknown",
    browserVersion:
      parsed.browser?.version || parsed.browser?.major || "Unknown",
  };
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
  const locationInfo = parseLocationInfo(fingerprint.location_info);

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
      vpn_detected: locationInfo.vpn_detected || false,
    });
  }

  // Additional IPs from location_info JSONB
  if (locationInfo.additional_ips) {
    locationInfo.additional_ips.forEach((ipInfo) => {
      ips.push({
        ip: obscureIPAddress(ipInfo.ip || "Unknown"),
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

  // Extract data from JSONB fields (real structure from database) using safe parsing
  const deviceData = parseDeviceData(fingerprint.device_data);
  const browserData = parseBrowserData(fingerprint.browser_data);
  const walletData = fingerprint.wallet_data;
  const locationInfo = parseLocationInfo(fingerprint.location_info);
  const screenData = parseScreenData(fingerprint.data?.screen);

  // Parse agent_data for proper OS and browser info
  const agentInfo = parseAgentDataToInfo(fingerprint.agent_data);

  // Get mock wallet data for demo (spread across visitors)
  const mockWalletData = getMockWalletDataForDemo(visitorIndex);

  // Determine device type from device capabilities and screen size
  const getDeviceType = (): string => {
    const width = screenData.width || 0;

    // Mobile: touch = true OR width < 768
    if (deviceData.touch || width < 768) return "Mobile";

    // Tablet: touch != true AND width >= 768 AND width < 1024
    if (width >= 768 && width < 1024) return "Tablet";

    // Computer: touch != true AND width >= 1024
    return "Computer";
  };

  // Calculate metrics
  const realWallets = extractWallets(walletData, walletRows);
  const parsedWalletData = parseWalletData(walletData);
  const hasRealWallet =
    parsedWalletData.walletAddress || parsedWalletData.solanaAddress;
  const wallets = hasRealWallet ? realWallets : mockWalletData.wallets; // Use mock data if no real wallet
  const ipAddresses = extractIPAddresses(fingerprint);
  const incognitoSessions =
    browserData.incognito_sessions || (browserData.incognito ? 1 : 0);
  const sessionIds = new Set(
    page_views.map((pv) => pv.session_id).filter((id) => id),
  );
  const totalVisits = sessionIds.size > 0 ? sessionIds.size : 1;
  const adsClicked = button_clicks.filter((click) =>
    click.button?.includes("ad"),
  ).length;

  // Calculate device view statistics based on actual device characteristics
  const currentDeviceType = getDeviceType();
  const pageViewCount = page_views.length || 1;

  const mobileViews = currentDeviceType === "Mobile" ? pageViewCount : 0;
  const tabletViews = currentDeviceType === "Tablet" ? pageViewCount : 0;
  const computerViews = currentDeviceType === "Computer" ? pageViewCount : 0;

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

  // Create devices based on the actual device type and page views
  // For now, create one device per visitor since each fingerprint represents one device session
  // In the future, this could be enhanced to aggregate multiple fingerprints per visitor
  const devices: Device[] = [
    {
      id: `device_${fingerprint.id}`,
      type: getDeviceType(),
      os: agentInfo.os,
      os_version: agentInfo.osVersion,
      browsers: [
        {
          name: agentInfo.browser,
          version: agentInfo.browserVersion,
        },
      ],
      incognito: browserData.incognito || false,
      ip_addresses: ipAddresses,
      first_seen: fingerprint.createdAt,
      last_seen: fingerprint.updatedAt,
    },
  ];

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
      ? lucia_user?.info &&
        isRecord(lucia_user.info) &&
        isStringArray(lucia_user.info.emails)
        ? lucia_user.info.emails
        : []
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
    mobile_views: mobileViews,
    tablet_views: tabletViews,
    computer_views: computerViews,
    ip_addresses: ipAddresses,
    wallets: wallets,
    rewards: hasRealWallet ? generateMockRewards() : mockWalletData.rewards,
    devices: devices,
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
