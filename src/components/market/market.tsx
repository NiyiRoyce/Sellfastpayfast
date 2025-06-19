import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Search,
  Star,
  ArrowLeft,
  Activity,
} from 'lucide-react';

// TypeScript interfaces
interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  rank: number;
  icon: string;
  sparklineData: number[];
  isWatchlisted: boolean;
}

interface MarketStats {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  marketCapChange24h: number;
}

// Theme configuration
const theme = {
  primary: 'from-[#FEFD0C] to-[#F5F500]',
  primaryAccent: '#FEFD0C',
  background: 'bg-black',              // Changed from 'bg-black/40' to solid black
  surface: 'bg-black/70 backdrop-blur-2xl border-white/5',
  surfaceHover: 'bg-black/80 backdrop-blur-2xl border-[#FEFD0C]/20',
  surfaceLight: 'bg-white/5 backdrop-blur-xl border-white/10',
  text: 'text-white',
  textSecondary: 'text-gray-300',
  textMuted: 'text-gray-400',
  textAccent: 'text-[#FEFD0C]',
  border: 'border-white/10',
  borderHover: 'border-[#FEFD0C]/30',
  success: 'text-green-400',
  error: 'text-red-400',
  glow: 'shadow-[0_0_20px_rgba(254,253,12,0.3)]',
  glowSubtle: 'shadow-[0_0_10px_rgba(254,253,12,0.15)]'
} as const;

// Mock data
const mockMarketStats: MarketStats = {
  totalMarketCap: 2840000000000,
  totalVolume24h: 89400000000,
  btcDominance: 52.3,
  marketCapChange24h: 2.8
};
const mockCryptoData: CryptoCurrency[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 68420.32,
    change24h: 4.23,
    volume24h: 23400000000,
    marketCap: 1350000000000,
    rank: 1,
    icon: '₿',
    sparklineData: [65000, 66200, 64800, 67100, 68400, 67900, 68420],
    isWatchlisted: true
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3834.67,
    change24h: 6.87,
    volume24h: 18200000000,
    marketCap: 461000000000,
    rank: 2,
    icon: 'Ξ',
    sparklineData: [3600, 3700, 3650, 3750, 3800, 3820, 3834],
    isWatchlisted: false
  },
  {
    id: 'tether',
    symbol: 'USDT',
    name: 'Tether',
    price: 1.00,
    change24h: 0.02,
    volume24h: 45600000000,
    marketCap: 124000000000,
    rank: 3,
    icon: '₮',
    sparklineData: [0.999, 1.001, 0.998, 1.002, 1.000, 0.999, 1.000],
    isWatchlisted: false
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    price: 196.84,
    change24h: 12.67,
    volume24h: 3200000000,
    marketCap: 93000000000,
    rank: 4,
    icon: '◎',
    sparklineData: [180, 185, 175, 190, 195, 192, 197],
    isWatchlisted: false
  },
  {
    id: 'bnb',
    symbol: 'BNB',
    name: 'BNB',
    price: 712.45,
    change24h: 3.78,
    volume24h: 1900000000,
    marketCap: 103000000000,
    rank: 5,
    icon: 'Ⓑ',
    sparklineData: [685, 695, 680, 705, 715, 708, 712],
    isWatchlisted: false
  },
  {
    id: 'ripple',
    symbol: 'XRP',
    name: 'XRP',
    price: 2.52,
    change24h: 15.56,
    volume24h: 8900000000,
    marketCap: 144000000000,
    rank: 6,
    icon: 'X',
    sparklineData: [2.1, 2.2, 2.15, 2.35, 2.48, 2.51, 2.52],
    isWatchlisted: true
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    price: 1.00,
    change24h: -0.01,
    volume24h: 6800000000,
    marketCap: 38000000000,
    rank: 7,
    icon: '$',
    sparklineData: [1.001, 0.999, 1.002, 0.998, 1.000, 1.001, 1.000],
    isWatchlisted: false
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    price: 1.45,
    change24h: 8.34,
    volume24h: 1800000000,
    marketCap: 51000000000,
    rank: 8,
    icon: '₳',
    sparklineData: [1.32, 1.38, 1.35, 1.42, 1.44, 1.43, 1.45],
    isWatchlisted: false
  },
  {
    id: 'dogecoin',
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.42,
    change24h: 18.92,
    volume24h: 5600000000,
    marketCap: 62000000000,
    rank: 9,
    icon: 'Ð',
    sparklineData: [0.35, 0.37, 0.34, 0.39, 0.41, 0.40, 0.42],
    isWatchlisted: false
  },
  {
    id: 'tron',
    symbol: 'TRX',
    name: 'TRON',
    price: 0.28,
    change24h: 5.67,
    volume24h: 1200000000,
    marketCap: 24000000000,
    rank: 10,
    icon: '⚡',
    sparklineData: [0.265, 0.270, 0.268, 0.275, 0.282, 0.279, 0.280],
    isWatchlisted: false
  },
  {
    id: 'avalanche',
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 45.23,
    change24h: 9.45,
    volume24h: 890000000,
    marketCap: 18500000000,
    rank: 11,
    icon: '🔺',
    sparklineData: [41, 42, 40, 44, 46, 44, 45],
    isWatchlisted: false
  },
  {
    id: 'shiba-inu',
    symbol: 'SHIB',
    name: 'Shiba Inu',
    price: 0.00003124,
    change24h: 22.34,
    volume24h: 2300000000,
    marketCap: 18400000000,
    rank: 12,
    icon: '🐕',
    sparklineData: [0.000025, 0.000027, 0.000024, 0.000029, 0.000031, 0.000030, 0.00003124],
    isWatchlisted: false
  },
  {
    id: 'polkadot',
    symbol: 'DOT',
    name: 'Polkadot',
    price: 8.94,
    change24h: 7.12,
    volume24h: 450000000,
    marketCap: 12800000000,
    rank: 13,
    icon: '●',
    sparklineData: [8.2, 8.4, 8.1, 8.6, 8.9, 8.7, 8.94],
    isWatchlisted: false
  },
  {
    id: 'chainlink',
    symbol: 'LINK',
    name: 'Chainlink',
    price: 24.67,
    change24h: 11.78,
    volume24h: 780000000,
    marketCap: 15200000000,
    rank: 14,
    icon: '🔗',
    sparklineData: [22, 23, 21.5, 24, 25, 24.2, 24.67],
    isWatchlisted: false
  },
  {
    id: 'polygon',
    symbol: 'MATIC',
    name: 'Polygon',
    price: 0.87,
    change24h: 13.56,
    volume24h: 520000000,
    marketCap: 8700000000,
    rank: 15,
    icon: '⬡',
    sparklineData: [0.76, 0.78, 0.74, 0.82, 0.86, 0.84, 0.87],
    isWatchlisted: false
  },
  {
    id: 'litecoin',
    symbol: 'LTC',
    name: 'Litecoin',
    price: 106.34,
    change24h: 6.23,
    volume24h: 890000000,
    marketCap: 7900000000,
    rank: 16,
    icon: 'Ł',
    sparklineData: [100, 102, 98, 104, 107, 105, 106],
    isWatchlisted: false
  },
  {
    id: 'near',
    symbol: 'NEAR',
    name: 'NEAR Protocol',
    price: 7.45,
    change24h: 16.78,
    volume24h: 340000000,
    marketCap: 8200000000,
    rank: 17,
    icon: 'Ⓝ',
    sparklineData: [6.2, 6.5, 6.0, 7.0, 7.4, 7.2, 7.45],
    isWatchlisted: false
  },
  {
    id: 'uniswap',
    symbol: 'UNI',
    name: 'Uniswap',
    price: 15.89,
    change24h: 14.23,
    volume24h: 290000000,
    marketCap: 9500000000,
    rank: 18,
    icon: '🦄',
    sparklineData: [13.5, 14.2, 13.1, 15.1, 16.0, 15.4, 15.89],
    isWatchlisted: false
  },
  {
    id: 'aptos',
    symbol: 'APT',
    name: 'Aptos',
    price: 12.56,
    change24h: 19.45,
    volume24h: 380000000,
    marketCap: 6800000000,
    rank: 19,
    icon: '🅰',
    sparklineData: [10.2, 10.8, 9.9, 11.8, 12.4, 12.1, 12.56],
    isWatchlisted: false
  },
  {
    id: 'sui',
    symbol: 'SUI',
    name: 'Sui',
    price: 4.67,
    change24h: 25.34,
    volume24h: 420000000,
    marketCap: 13600000000,
    rank: 20,
    icon: '🌊',
    sparklineData: [3.6, 3.8, 3.5, 4.2, 4.6, 4.4, 4.67],
    isWatchlisted: false
  }
];

// Utility functions
const formatPrice = (price: number): string => {
  if (price >= 1000) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  if (price >= 1) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (price >= 0.01) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(6)}`;
};

const formatMarketCap = (value: number): string => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  return `$${value.toLocaleString()}`;
};

const formatVolume = (value: number): string => {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
  return `$${value.toLocaleString()}`;
};

// Mini Sparkline Component
const MiniSparkline: React.FC<{ data: number[]; isPositive: boolean }> = ({ data, isPositive }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;  // Avoid division by zero

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 60;
    const y = 20 - ((value - min) / range) * 20;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="60" height="20" className="opacity-80">
      <polyline
        points={points}
        fill="none"
        stroke={isPositive ? '#34d399' : '#f87171'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Market Stats Component
const MarketStatsCard: React.FC<{ stats: MarketStats }> = ({ stats }) => {
  return (
    <div className={`${theme.surface} rounded-xl p-6 border relative overflow-hidden mb-6`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#FEFD0C]/5 via-transparent to-transparent opacity-50"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.primary} ${theme.glow}`}>
            <Activity className="w-5 h-5 text-black" />
          </div>
          <div>
            <h2 className={`text-lg font-bold ${theme.text}`}>Market Overview</h2>
            <p className={`text-sm ${theme.textSecondary}`}>Global cryptocurrency statistics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${theme.surfaceLight} border ${theme.border}`}>
            <p className={`text-sm font-medium ${theme.textSecondary} mb-1`}>Total Market Cap</p>
            <p className={`text-xl font-bold ${theme.text}`}>{formatMarketCap(stats.totalMarketCap)}</p>
            <div className={`flex items-center space-x-1 mt-1 ${stats.marketCapChange24h >= 0 ? theme.success : theme.error}`}>
              {stats.marketCapChange24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span className="text-sm font-medium">{Math.abs(stats.marketCapChange24h).toFixed(1)}%</span>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${theme.surfaceLight} border ${theme.border}`}>
            <p className={`text-sm font-medium ${theme.textSecondary} mb-1`}>24h Volume</p>
            <p className={`text-xl font-bold ${theme.text}`}>{formatVolume(stats.totalVolume24h)}</p>
            <p className={`text-sm ${theme.textSecondary} mt-1`}>Across exchanges</p>
          </div>

          <div className={`p-4 rounded-lg ${theme.surfaceLight} border ${theme.border}`}>
            <p className={`text-sm font-medium ${theme.textSecondary} mb-1`}>BTC Dominance</p>
            <p className={`text-xl font-bold ${theme.text}`}>{stats.btcDominance}%</p>
            <div className="w-full bg-black/40 rounded-full h-2 mt-2 border border-[#FEFD0C]/20">
              <div 
                className={`bg-gradient-to-r ${theme.primary} h-2 rounded-full transition-all duration-500 ${theme.glow}`}
                style={{ width: `${stats.btcDominance}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CryptoMarketComponent: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoCurrency[]>(mockCryptoData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set(['bitcoin', 'solana', 'ripple']));

  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const toggleWatchlist = (id: string) => {
    setWatchlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const filteredCryptos = cryptoData.filter(
    c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className={`min-h-screen ${theme.background} relative p-8 text-white font-sans`}>
      <div className="max-w-7xl mx-auto">
        {/* Header with Back button */}
        <header className="flex items-center justify-between mb-8">
          <button
            onClick={goBack}
            aria-label="Go back"
            className={`p-2 rounded-full border border-white/20 hover:${theme.borderHover} transition duration-300 flex items-center justify-center mr-4`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-extrabold tracking-tight flex-1 text-center md:text-left">
            Cryptocurrency Market
          </h1>
          <button
            onClick={refreshData}
            className={`p-2 rounded-full border border-white/20 hover:${theme.borderHover} transition duration-300 flex items-center justify-center ${isRefreshing ? 'animate-spin' : ''}`}
            aria-label="Refresh data"
          >
            <RefreshCw className="w-6 h-6" />
          </button>
        </header>

        {/* Market Stats */}
        <MarketStatsCard stats={mockMarketStats} />

        {/* Search and Clear */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <input
              type="search"
              placeholder="Search by name or symbol"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className={`${theme.surface} w-full rounded-lg py-2 pl-10 pr-4 border ${theme.border} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
            />
            <Search className="absolute left-3 top-2.5 text-yellow-400 w-5 h-5" />
          </div>

          <div className="flex space-x-4">
            <button
              className={`${theme.surface} px-4 py-2 rounded-lg border ${theme.border} hover:${theme.borderHover} transition duration-300`}
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </button>
          </div>
        </div>

        {/* Crypto Table */}
        <div className={`${theme.surface} rounded-xl p-6 border overflow-x-auto`}>
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-2 px-3 w-12">#</th>
                <th className="text-left py-2 px-3 w-12"></th>
                <th className="text-left py-2 px-3">Name</th>
                <th className="text-right py-2 px-3">Price</th>
                <th className="text-right py-2 px-3">24h %</th>
                <th className="text-right py-2 px-3">Volume 24h</th>
                <th className="text-right py-2 px-3">Market Cap</th>
                <th className="text-center py-2 px-3 w-24">Sparkline</th>
                <th className="text-center py-2 px-3 w-16">Watchlist</th>
              </tr>
            </thead>
            <tbody>
              {filteredCryptos.map((coin) => {
                const isPositive = coin.change24h >= 0;
                return (
                  <tr
                    key={coin.id}
                    className={`${theme.surfaceHover} cursor-pointer hover:${theme.glowSubtle} transition duration-200`}
                  >
                    <td className="py-3 px-3 text-yellow-400 font-semibold">{coin.rank}</td>
                    <td className="py-3 px-3 text-lg">{coin.icon}</td>
                    <td className="py-3 px-3">
                      <div className="font-semibold">{coin.name}</div>
                      <div className={`uppercase text-xs tracking-wide ${theme.textSecondary}`}>{coin.symbol}</div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono">{formatPrice(coin.price)}</td>
                    <td
                      className={`py-3 px-3 text-right font-semibold ${
                        isPositive ? theme.success : theme.error
                      }`}
                    >
                      {isPositive ? <TrendingUp className="inline w-4 h-4" /> : <TrendingDown className="inline w-4 h-4" />}
                      <span className="ml-1">{coin.change24h.toFixed(2)}%</span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono">{formatVolume(coin.volume24h)}</td>
                    <td className="py-3 px-3 text-right font-mono">{formatMarketCap(coin.marketCap)}</td>
                    <td className="py-3 px-3 text-center">
                      <MiniSparkline data={coin.sparklineData} isPositive={isPositive} />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => toggleWatchlist(coin.id)}
                        aria-label={watchlist.has(coin.id) ? 'Remove from watchlist' : 'Add to watchlist'}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 transition-colors ${
                            watchlist.has(coin.id) ? 'text-yellow-400' : 'text-white/30 hover:text-yellow-400'
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredCryptos.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-gray-400">
                    No cryptocurrencies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CryptoMarketComponent;
