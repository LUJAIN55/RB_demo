export type Language = 'ar' | 'en';

export type UserRole = 'traveler' | 'operator';

export type PortalMode = 'traveler' | 'operations';

export type OpsSection =
  | 'overview'
  | 'connections'
  | 'gap-analysis'
  | 'optimization'
  | 'analytics';

export type PageId =
  | 'login'
  | 'home'
  | 'search'
  | 'details'
  | 'assistant'
  | 'traveler-profile'
  | 'operations'
  | 'operator-profile'
  | 'access-denied';

export interface AuthenticatedUser {
  id: string;
  name: LocalizedText;
  email: string;
  role: UserRole;
  organization?: LocalizedText;
  preferredCityId?: string;
  isDemo: boolean;
}

export type DataProvenance = 'official' | 'verified' | 'estimated' | 'simulated';

export enum TransportMode {
  BUS = 'bus',
  TRAIN = 'train',
  FLIGHT = 'flight',
  MULTIMODAL = 'multimodal',
}

export enum RiskLevel {
  GOOD = 'good',
  ATTENTION = 'attention',
  HIGH_RISK = 'high_risk',
}

export enum SortOption {
  RECOMMENDED = 'recommended',
  LOWEST_PRICE = 'lowest_price',
  SHORTEST_DURATION = 'shortest_duration',
  FEWEST_TRANSFERS = 'fewest_transfers',
}

export interface LocalizedText {
  ar: string;
  en: string;
}

export interface SaudiCity {
  id: string;
  name: LocalizedText;
  region: LocalizedText;
  hubType: LocalizedText;
  mapCoords: { x: number; y: number };
  featured?: boolean;
  image?: string;
  sampleRoutesCount?: number;
  startingPriceSar?: number;
  tagline?: LocalizedText;
}

export interface OperatorInfo {
  id: string;
  name: LocalizedText;
  shortCode: string;
  mode: TransportMode;
  accentHex: string;
  policySummary: LocalizedText;
}

export interface JourneyLeg {
  id: string;
  mode: TransportMode.BUS | TransportMode.TRAIN | TransportMode.FLIGHT;
  operatorId: string;
  serviceCode: string;
  originStation: LocalizedText;
  destinationStation: LocalizedText;
  originCityId: string;
  destinationCityId: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  priceSar: number;
  amenities: LocalizedText[];
  transferAfterMinutes?: number;
  transferLocation?: LocalizedText;
  transferNote?: LocalizedText;
}

export interface AiRecommendationFactors {
  priceNote: LocalizedText;
  durationNote: LocalizedText;
  waitingNote: LocalizedText;
  transfersNote: LocalizedText;
}

export interface Journey {
  id: string;
  originCityId: string;
  destinationCityId: string;
  primaryMode: TransportMode;
  modesSequence: (TransportMode.BUS | TransportMode.TRAIN | TransportMode.FLIGHT)[];
  operatorIds: string[];
  departureTime: string;
  arrivalTime: string;
  totalDurationMinutes: number;
  transfersCount: number;
  totalWaitingMinutes: number;
  priceSar: number;
  platformFeeSar: number;
  isAiRecommended: boolean;
  aiReason?: LocalizedText;
  aiFactors?: AiRecommendationFactors;
  dataProvenance?: DataProvenance;
  verificationStatus: LocalizedText;
  sourceNote: LocalizedText;
  legs: JourneyLeg[];
}

export interface SearchParams {
  fromCityId: string;
  toCityId: string;
  date: string;
  passengers: number;
}

export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
  isDemo?: boolean;
  recommendedJourneys?: Journey[];
}

export interface OperationalConnection {
  id: string;
  journeyCode: string;
  operatorId: string;
  originCityId: string;
  destinationCityId: string;
  transferHub: LocalizedText;
  scheduledArrival: string;
  nextDeparture: string;
  proposedDeparture: string;
  waitingMinutes: number;
  delayMinutes: number;
  riskLevel: RiskLevel;
  severityLabel: LocalizedText;
  aiSuggestion: LocalizedText;
  expectedImpact: LocalizedText;
  optimizedWaitMinutes: number;
  corridorKey: string;
  dataProvenance: DataProvenance;
  appliedOptimization?: boolean;
}

export interface WaitingDistributionBucket {
  id: string;
  label: LocalizedText;
  count: number;
  tone: 'good' | 'teal' | 'attention' | 'risk';
}

export interface DailyPerformancePoint {
  day: LocalizedText;
  onTime: number;
  delayed: number;
}
