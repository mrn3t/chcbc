export type TradeDirection = 'BUY' | 'SELL';

export interface Trade {
  id: string;
  pair: string;
  direction: TradeDirection;
  entryPrice: number;
  exitPrice: number | null;
  stopLoss: number | null;
  takeProfit: number | null;
  lotSize: number;
  entryReason: string;
  exitReason: string;
  notes: string;
  profitLoss: number;
  profitLossPercent: number;
  imageUrl: string | null;
  status: 'OPEN' | 'CLOSED';
  createdAt: string;
  closedAt: string | null;
}

export interface PlanetRank {
  id: string;
  name: string;
  nameAr: string;
  percentage: number;
  image: string;
  color: string;
  glowClass: string;
  description: string;
  descriptionAr: string;
  quote: string;
}

export interface UserProfile {
  name: string;
  avatar: string | null;
  xp: number;
  currentRank: PlanetRank;
  totalTrades: number;
  winRate: number;
  profitFactor: number;
  currentStreak: number;
  bestStreak: number;
  tradingDays: number;
  consecutiveDays: number;
  level: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt: string | null;
  progress: number;
  maxProgress: number;
}

export interface MarketData {
  pair: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  trades: number;
}
