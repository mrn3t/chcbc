import { useState, useCallback, useMemo } from 'react';
import type { Trade, PlanetRank, UserProfile, Achievement, ChartDataPoint } from '@/types';

export const PLANETS: PlanetRank[] = [
  {
    id: 'earth',
    name: 'Earth',
    nameAr: 'الأرض',
    percentage: 0,
    image: '/images/planet-earth.png',
    color: '#1A3A5C',
    glowClass: 'planet-glow-earth',
    description: 'The beginning of your journey',
    descriptionAr: 'بداية رحلتك نحو النجوم',
    quote: 'Every great journey begins on solid ground',
  },
  {
    id: 'mars',
    name: 'Mars',
    nameAr: 'المريخ',
    percentage: 5,
    image: '/images/planet-mars.png',
    color: '#8B2500',
    glowClass: 'planet-glow-mars',
    description: 'The warrior\'s planet',
    descriptionAr: 'كوكب المحاربين',
    quote: 'Courage is your first step to greatness',
  },
  {
    id: 'venus',
    name: 'Venus',
    nameAr: 'الزهرة',
    percentage: 10,
    image: '/images/planet-venus.png',
    color: '#C8802E',
    glowClass: 'planet-glow-venus',
    description: 'Beauty in discipline',
    descriptionAr: 'الجمال في الانضباط',
    quote: 'Discipline creates beauty in results',
  },
  {
    id: 'mercury',
    name: 'Mercury',
    nameAr: 'عطارد',
    percentage: 15,
    image: '/images/planet-mercury.png',
    color: '#6B6B6B',
    glowClass: 'planet-glow-mercury',
    description: 'Speed and precision',
    descriptionAr: 'السرعة والدقة',
    quote: 'Precision separates amateurs from pros',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    nameAr: 'نبتون',
    percentage: 20,
    image: '/images/planet-neptune.png',
    color: '#1B3A6B',
    glowClass: 'planet-glow-neptune',
    description: 'Depth of wisdom',
    descriptionAr: 'عمق الحكمة',
    quote: 'Wisdom flows like the deepest ocean',
  },
  {
    id: 'uranus',
    name: 'Uranus',
    nameAr: 'أورانوس',
    percentage: 25,
    image: '/images/planet-uranus.png',
    color: '#2E8B8B',
    glowClass: 'planet-glow-uranus',
    description: 'Innovation and change',
    descriptionAr: 'الابتكار والتغيير',
    quote: 'Innovation breaks all boundaries',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    nameAr: 'زحل',
    percentage: 30,
    image: '/images/planet-saturn.png',
    color: '#B8860B',
    glowClass: 'planet-glow-saturn',
    description: 'The ringed master',
    descriptionAr: 'سيد الحلقات',
    quote: 'Mastery comes from consistent discipline',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    nameAr: 'المشتري',
    percentage: 35,
    image: '/images/planet-jupiter.png',
    color: '#8B4513',
    glowClass: 'planet-glow-jupiter',
    description: 'The giant of power',
    descriptionAr: 'عملاق القوة',
    quote: 'Power comes from knowledge and patience',
  },
  {
    id: 'sun',
    name: 'Sun',
    nameAr: 'الشمس',
    percentage: 40,
    image: '/images/planet-sun.png',
    color: '#FF6B00',
    glowClass: 'planet-glow-sun',
    description: 'The ultimate rank',
    descriptionAr: 'الدرجة النهائية',
    quote: 'You are the center of your trading universe',
  },
];

const INITIAL_TRADES: Trade[] = [
  {
    id: '1',
    pair: 'XAU/USD',
    direction: 'BUY',
    entryPrice: 2352.14,
    exitPrice: 2368.50,
    stopLoss: 2345.00,
    takeProfit: 2375.00,
    lotSize: 0.5,
    entryReason: 'Breakout above resistance with volume confirmation',
    exitReason: 'Target hit with strong momentum',
    notes: 'Clean setup, followed the plan perfectly',
    profitLoss: 818.0,
    profitLossPercent: 0.69,
    imageUrl: null,
    status: 'CLOSED',
    createdAt: '2026-05-10T08:30:00',
    closedAt: '2026-05-10T14:20:00',
  },
  {
    id: '2',
    pair: 'BTC/USDT',
    direction: 'SELL',
    entryPrice: 67420.50,
    exitPrice: 66850.00,
    stopLoss: 68000.00,
    takeProfit: 66500.00,
    lotSize: 0.1,
    entryReason: 'Double top formation at resistance',
    exitReason: 'Support reached, partial profits taken',
    notes: 'Good risk management, scaled out at 1:2 RRR',
    profitLoss: 570.0,
    profitLossPercent: 0.84,
    imageUrl: null,
    status: 'CLOSED',
    createdAt: '2026-05-09T12:15:00',
    closedAt: '2026-05-09T18:45:00',
  },
  {
    id: '3',
    pair: 'EUR/USD',
    direction: 'BUY',
    entryPrice: 1.0845,
    exitPrice: 1.0870,
    stopLoss: 1.0820,
    takeProfit: 1.0900,
    lotSize: 1.0,
    entryReason: 'Bullish engulfing on 4H timeframe',
    exitReason: 'Trailing stop hit after momentum fade',
    notes: 'Solid technical setup',
    profitLoss: 250.0,
    profitLossPercent: 2.30,
    imageUrl: null,
    status: 'CLOSED',
    createdAt: '2026-05-08T09:00:00',
    closedAt: '2026-05-08T16:30:00',
  },
  {
    id: '4',
    pair: 'XAU/USD',
    direction: 'SELL',
    entryPrice: 2380.00,
    exitPrice: 2370.00,
    stopLoss: 2390.00,
    takeProfit: 2355.00,
    lotSize: 0.25,
    entryReason: 'Reversal signal at overbought zone',
    exitReason: 'Support bounce, closed early',
    notes: 'Could have held longer but happy with profit',
    profitLoss: 250.0,
    profitLossPercent: 0.42,
    imageUrl: null,
    status: 'CLOSED',
    createdAt: '2026-05-07T11:20:00',
    closedAt: '2026-05-07T15:10:00',
  },
  {
    id: '5',
    pair: 'GBP/USD',
    direction: 'BUY',
    entryPrice: 1.2740,
    exitPrice: null,
    stopLoss: 1.2700,
    takeProfit: 1.2820,
    lotSize: 0.5,
    entryReason: 'Trend continuation after pullback',
    exitReason: '',
    notes: 'Holding for target, moving SL to breakeven',
    profitLoss: 0,
    profitLossPercent: 0,
    imageUrl: null,
    status: 'OPEN',
    createdAt: '2026-05-12T06:45:00',
    closedAt: null,
  },
  {
    id: '6',
    pair: 'USD/JPY',
    direction: 'SELL',
    entryPrice: 155.80,
    exitPrice: 155.20,
    stopLoss: 156.20,
    takeProfit: 154.50,
    lotSize: 0.3,
    entryReason: 'Resistance rejection with bearish divergence',
    exitReason: 'Target zone reached',
    notes: 'Perfect execution',
    profitLoss: 180.0,
    profitLossPercent: 0.38,
    imageUrl: null,
    status: 'CLOSED',
    createdAt: '2026-05-06T14:00:00',
    closedAt: '2026-05-06T21:30:00',
  },
  {
    id: '7',
    pair: 'XAU/USD',
    direction: 'BUY',
    entryPrice: 2340.00,
    exitPrice: 2335.00,
    stopLoss: 2330.00,
    takeProfit: 2360.00,
    lotSize: 0.4,
    entryReason: 'False breakout, market reversed',
    exitReason: 'Stopped out',
    notes: 'Lost trade but good risk management',
    profitLoss: -200.0,
    profitLossPercent: -0.21,
    imageUrl: null,
    status: 'CLOSED',
    createdAt: '2026-05-05T10:30:00',
    closedAt: '2026-05-05T13:45:00',
  },
  {
    id: '8',
    pair: 'BTC/USDT',
    direction: 'BUY',
    entryPrice: 66100.00,
    exitPrice: 67200.00,
    stopLoss: 65500.00,
    takeProfit: 68000.00,
    lotSize: 0.15,
    entryReason: 'Support hold with bullish divergence',
    exitReason: 'Strong resistance ahead, took profits',
    notes: 'Great trade, followed plan exactly',
    profitLoss: 1650.0,
    profitLossPercent: 1.66,
    imageUrl: null,
    status: 'CLOSED',
    createdAt: '2026-05-04T07:00:00',
    closedAt: '2026-05-04T20:15:00',
  },
];

const INITIAL_PROFILE: UserProfile = {
  name: 'Cosmic Trader',
  avatar: null,
  xp: 12500,
  currentRank: PLANETS[1], // Mars
  totalTrades: 47,
  winRate: 65.9,
  profitFactor: 2.4,
  currentStreak: 3,
  bestStreak: 7,
  tradingDays: 28,
  consecutiveDays: 12,
  level: 12,
};

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-trade',
    title: 'First Steps',
    description: 'Execute your first trade',
    icon: 'Zap',
    unlocked: true,
    unlockedAt: '2026-04-01',
    progress: 1,
    maxProgress: 1,
  },
  {
    id: 'win-streak-5',
    title: 'Hot Streak',
    description: 'Win 5 trades in a row',
    icon: 'Flame',
    unlocked: true,
    unlockedAt: '2026-04-15',
    progress: 7,
    maxProgress: 5,
  },
  {
    id: 'profit-1k',
    title: 'First Grand',
    description: 'Make $1,000 in profit',
    icon: 'TrendingUp',
    unlocked: true,
    unlockedAt: '2026-04-20',
    progress: 1000,
    maxProgress: 1000,
  },
  {
    id: 'trades-50',
    title: 'Veteran',
    description: 'Complete 50 trades',
    icon: 'Award',
    unlocked: false,
    unlockedAt: null,
    progress: 47,
    maxProgress: 50,
  },
  {
    id: 'consecutive-30',
    title: 'Iron Discipline',
    description: 'Trade for 30 consecutive days',
    icon: 'Calendar',
    unlocked: false,
    unlockedAt: null,
    progress: 12,
    maxProgress: 30,
  },
  {
    id: 'level-sun',
    title: 'Solar Master',
    description: 'Reach the Sun rank',
    icon: 'Sun',
    unlocked: false,
    unlockedAt: null,
    progress: 12.5,
    maxProgress: 40,
  },
  {
    id: 'win-rate-70',
    title: 'Sharpshooter',
    description: 'Achieve 70% win rate',
    icon: 'Target',
    unlocked: false,
    unlockedAt: null,
    progress: 65.9,
    maxProgress: 70,
  },
  {
    id: 'risk-manager',
    title: 'Risk Manager',
    description: 'Maintain 1:2 RRR for 20 trades',
    icon: 'Shield',
    unlocked: true,
    unlockedAt: '2026-05-01',
    progress: 20,
    maxProgress: 20,
  },
];

export function useTradingData() {
  const [trades, setTrades] = useState<Trade[]>(INITIAL_TRADES);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);

  const addTrade = useCallback((trade: Omit<Trade, 'id' | 'createdAt' | 'profitLoss' | 'profitLossPercent' | 'status' | 'closedAt'>) => {
    const newTrade: Trade = {
      ...trade,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      profitLoss: 0,
      profitLossPercent: 0,
      status: 'OPEN',
      closedAt: null,
    };
    setTrades((prev) => [newTrade, ...prev]);
    setProfile((prev) => ({
      ...prev,
      totalTrades: prev.totalTrades + 1,
    }));
  }, []);

  const closeTrade = useCallback((tradeId: string, exitPrice: number, exitReason: string) => {
    setTrades((prev) =>
      prev.map((t) => {
        if (t.id === tradeId) {
          const pips = t.direction === 'BUY' ? exitPrice - t.entryPrice : t.entryPrice - exitPrice;
          const profitLoss = pips * t.lotSize * 100;
          const profitLossPercent = (pips / t.entryPrice) * 100;
          return {
            ...t,
            exitPrice,
            exitReason,
            profitLoss,
            profitLossPercent: Number(profitLossPercent.toFixed(2)),
            status: 'CLOSED' as const,
            closedAt: new Date().toISOString(),
          };
        }
        return t;
      })
    );
  }, []);

  const deleteTrade = useCallback((tradeId: string) => {
    setTrades((prev) => prev.filter((t) => t.id !== tradeId));
  }, []);

  const stats = useMemo(() => {
    const closedTrades = trades.filter((t) => t.status === 'CLOSED');
    const winningTrades = closedTrades.filter((t) => t.profitLoss > 0);
    const totalProfit = closedTrades.reduce((sum, t) => sum + Math.max(0, t.profitLoss), 0);
    const totalLoss = closedTrades.reduce((sum, t) => sum + Math.abs(Math.min(0, t.profitLoss)), 0);
    const netProfit = closedTrades.reduce((sum, t) => sum + t.profitLoss, 0);

    return {
      totalTrades: trades.length,
      openTrades: trades.filter((t) => t.status === 'OPEN').length,
      winRate: closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0,
      profitFactor: totalLoss > 0 ? totalProfit / totalLoss : totalProfit > 0 ? Infinity : 0,
      totalProfit,
      totalLoss,
      netProfit,
      averageWin: winningTrades.length > 0 ? totalProfit / winningTrades.length : 0,
      averageLoss: (closedTrades.length - winningTrades.length) > 0 ? totalLoss / (closedTrades.length - winningTrades.length) : 0,
    };
  }, [trades]);

  const chartData: ChartDataPoint[] = useMemo(() => {
    const sorted = [...trades]
      .filter((t) => t.status === 'CLOSED')
      .sort((a, b) => new Date(a.closedAt!).getTime() - new Date(b.closedAt!).getTime());

    let cumulative = 0;
    return sorted.map((t) => {
      cumulative += t.profitLoss;
      return {
        date: new Date(t.closedAt!).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: Number(cumulative.toFixed(2)),
        trades: 1,
      };
    });
  }, [trades]);

  const currentProgress = useMemo(() => {
    return (profile.xp / 40000) * 100;
  }, [profile.xp]);

  return {
    trades,
    profile,
    achievements,
    stats,
    chartData,
    currentProgress,
    planets: PLANETS,
    addTrade,
    closeTrade,
    deleteTrade,
    setProfile,
    setAchievements,
  };
}
