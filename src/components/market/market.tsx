import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Search,
  Filter,
  Star,
  BarChart3,
  Activity,
  Eye,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Flame,
  Zap,
  Crown,
  ArrowRight,
  ArrowLeft
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
  category: 'hot' | 'top' | 'new' | 'defi' | 'metaverse';
}

interface MarketStats {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  activeCoins: number;
  marketCapChange24h: number;
}

// Updated theme configuration to match exchange component
const theme = {
  primary: 'from-amber-400 to-yellow-500',
  primaryHover: 'from-amber-500 to-yellow-600',
  secondary: 'from-gray-700 to-gray-800',
  secondaryHover: 'from-gray-600 to-gray-700',
  background: 'from-slate-900 via-gray-900 to-black',
  surface: 'bg-gray-800/20 backdrop-blur-xl border-gray-700/30',
  text: 'text-white',
  textSecondary: 'text-gray-300',
  border: 'border-gray-700/30',
  success: 'text-emerald-400',
  error: 'text-red-400',
  warning: 'text-amber-400',
  accent: 'from-indigo-500 to-purple-600'
} as const;

// Mock market data
const mockMarketStats: MarketStats = {
  totalMarketCap: 2840000000000,
  totalVolume24h: 89400000000,
  btcDominance: 52.3,
  activeCoins: 13847,
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
    isWatchlisted: true,
    category: 'top'
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
    isWatchlisted: false,
    category: 'top'
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    price: 196.84,
    change24h: 12.67,
    volume24h: 3200000000,
    marketCap: 93000000000,
    rank: 3,
    icon: '◎',
    sparklineData: [180, 185, 175, 190, 195, 192, 197],
    isWatchlisted: true,
    category: 'hot'
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    price: 1.45,
    change24h: 8.34,
    volume24h: 1800000000,
    marketCap: 51000000000,
    rank: 4,
    icon: '₳',
    sparklineData: [1.32, 1.38, 1.35, 1.42, 1.44, 1.43, 1.45],
    isWatchlisted: false,
    category: 'defi'
  },
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'BNB',
    price: 615.42,
    change24h: -2.23,
    volume24h: 1500000000,
    marketCap: 89000000000,
    rank: 5,
    icon: 'B',
    sparklineData: [630, 620, 625, 615, 610, 618, 615],
    isWatchlisted: false,
    category: 'top'
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
    isWatchlisted: true,
    category: 'hot'
  },
  {
    id: 'avalanche',
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 89.34,
    change24h: -5.67,
    volume24h: 890000000,
    marketCap: 34000000000,
    rank: 7,
    icon: 'A',
    sparklineData: [95, 92, 94, 90, 88, 91, 89],
    isWatchlisted: false,
    category: 'defi'
  },
  {
    id: 'polygon',
    symbol: 'MATIC',
    name: 'Polygon',
    price: 1.89,
    change24h: 9.23,
    volume24h: 650000000,
    marketCap: 18000000000,
    rank: 8,
    icon: 'M',
    sparklineData: [1.7, 1.75, 1.72, 1.82, 1.87, 1.88, 1.89],
    isWatchlisted: false,
    category: 'metaverse'
  }
];

// Utility functions
const formatPrice = (price: number): string => {
  if (price >= 1) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `$${price.toFixed(6)}`;
};

const formatMarketCap = (value: number): string => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
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
  const range = max - min;
  
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
        className="drop-shadow-sm"
      />
    </svg>
  );
};

// Category Badge Component
const CategoryBadge: React.FC<{ category: CryptoCurrency['category'] }> = ({ category }) => {
  const badges = {
    hot: { icon: Flame, label: 'Hot', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    top: { icon: Crown, label: 'Top', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    new: { icon: Zap, label: 'New', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    defi: { icon: BarChart3, label: 'DeFi', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    metaverse: { icon: Eye, label: 'Meta', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' }
  };

  const badge = badges[category];
  const Icon = badge.icon;

  return (
    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full ${badge.color} text-xs font-medium border backdrop-blur-sm`}>
      <Icon className="w-3 h-3" />
      <span>{badge.label}</span>
    </div>
  );
};

// Market Stats Component
const MarketStatsCard: React.FC<{ stats: MarketStats }> = ({ stats }) => {
  return (
    <div className={`${theme.surface} rounded-2xl p-6 shadow-xl border backdrop-blur-xl`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${theme.text}`}>Market Overview</h2>
        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/30`}>
          <Activity className="w-3 h-3" />
          <span>Live</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <p className={`text-sm ${theme.textSecondary}`}>Total Market Cap</p>
          <p className={`text-2xl font-bold ${theme.text}`}>{formatMarketCap(stats.totalMarketCap)}</p>
          <div className={`flex items-center space-x-1 ${stats.marketCapChange24h >= 0 ? theme.success : theme.error}`}>
            {stats.marketCapChange24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm font-medium">{Math.abs(stats.marketCapChange24h).toFixed(1)}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className={`text-sm ${theme.textSecondary}`}>24h Volume</p>
          <p className={`text-2xl font-bold ${theme.text}`}>{formatVolume(stats.totalVolume24h)}</p>
          <p className={`text-sm ${theme.textSecondary}`}>Across all exchanges</p>
        </div>

        <div className="space-y-2">
          <p className={`text-sm ${theme.textSecondary}`}>BTC Dominance</p>
          <p className={`text-2xl font-bold ${theme.text}`}>{stats.btcDominance}%</p>
          <div className="w-full bg-gray-700/40 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${theme.primary} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${stats.btcDominance}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className={`text-sm ${theme.textSecondary}`}>Active Coins</p>
          <p className={`text-2xl font-bold ${theme.text}`}>{stats.activeCoins.toLocaleString()}</p>
          <p className={`text-sm ${theme.success}`}>+12 today</p>
        </div>
      </div>
    </div>
  );
};

// Main Market Component
const CryptoMarketComponent: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoCurrency[]>(mockCryptoData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | CryptoCurrency['category']>('all');
  const [sortBy, setSortBy] = useState<'rank' | 'price' | 'change24h' | 'volume24h' | 'marketCap'>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set(['bitcoin', 'solana', 'ripple']));

  // Auto refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prevData => 
        prevData.map(crypto => ({
          ...crypto,
          price: crypto.price + (Math.random() - 0.5) * crypto.price * 0.001,
          change24h: crypto.change24h + (Math.random() - 0.5) * 0.5
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Filter and sort data
  const filteredAndSortedData = cryptoData
    .filter(crypto => {
      const matchesSearch = crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || crypto.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'rank') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const toggleWatchlist = (cryptoId: string) => {
    const newWatchlist = new Set(watchlist);
    if (newWatchlist.has(cryptoId)) {
      newWatchlist.delete(cryptoId);
    } else {
      newWatchlist.add(cryptoId);
    }
    setWatchlist(newWatchlist);
    
    setCryptoData(prevData =>
      prevData.map(crypto =>
        crypto.id === cryptoId 
          ? { ...crypto, isWatchlisted: newWatchlist.has(cryptoId) }
          : crypto
      )
    );
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCryptoData(prevData =>
      prevData.map(crypto => ({
        ...crypto,
        price: crypto.price + (Math.random() - 0.5) * crypto.price * 0.02,
        change24h: crypto.change24h + (Math.random() - 0.5) * 2
      }))
    );
    
    setIsRefreshing(false);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback for cases where there's no history
      console.log('No history available, implement custom navigation');
    }
  };

  const categories: Array<{ key: 'all' | CryptoCurrency['category']; label: string; icon: React.ElementType }> = [
    { key: 'all', label: 'All', icon: BarChart3 },
    { key: 'hot', label: 'Hot', icon: Flame },
    { key: 'top', label: 'Top', icon: Crown },
    { key: 'new', label: 'New', icon: Zap },
    { key: 'defi', label: 'DeFi', icon: Activity },
    { key: 'metaverse', label: 'Meta', icon: Eye }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} p-4 md:p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Back Navigation */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={handleBack}
              className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-800/30 backdrop-blur-sm ${theme.textSecondary} hover:bg-gray-700/40 hover:text-white transition-all duration-200 border ${theme.border}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className={`text-3xl font-bold ${theme.text}`}>Crypto Markets</h1>
              <p className={`text-sm ${theme.textSecondary}`}>Real-time cryptocurrency data</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r ${theme.primary} hover:${theme.primaryHover} text-black transition-all duration-200 disabled:opacity-50 shadow-lg`}
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme.textSecondary}`} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search cryptocurrencies..."
                className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/20 backdrop-blur-xl border ${theme.border} ${theme.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-200`}
              />
            </div>
            
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200 backdrop-blur-sm ${
                    selectedCategory === key
                      ? `bg-gradient-to-r ${theme.primary} text-black shadow-lg`
                      : `${theme.textSecondary} hover:${theme.text} bg-gray-800/20 hover:bg-gray-700/30 border ${theme.border}`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="mb-6">
          <MarketStatsCard stats={mockMarketStats} />
        </div>

        {/* Crypto List */}
        <div className={`${theme.surface} rounded-2xl border shadow-xl overflow-hidden backdrop-blur-xl`}>
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-700/30 bg-gray-800/30">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-1 flex items-center justify-center">
                <Star className={`w-4 h-4 ${theme.textSecondary}`} />
              </div>
              
              <button
                onClick={() => handleSort('rank')}
                className={`col-span-1 flex items-center space-x-1 text-xs font-medium ${theme.textSecondary} hover:${theme.text} transition-colors`}
              >
                <span>#</span>
                {sortBy === 'rank' && (
                  sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                )}
              </button>
              
              <div className="col-span-3">
                <span className={`text-xs font-medium ${theme.textSecondary}`}>Name</span>
              </div>
              
              <button
                onClick={() => handleSort('price')}
                className={`col-span-2 flex items-center space-x-1 text-xs font-medium ${theme.textSecondary} hover:${theme.text} transition-colors`}
              >
                <span>Price</span>
                {sortBy === 'price' && (
                  sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                )}
              </button>
              
              <button
                onClick={() => handleSort('change24h')}
                className={`col-span-2 flex items-center space-x-1 text-xs font-medium ${theme.textSecondary} hover:${theme.text} transition-colors`}
              >
                <span>24h %</span>
                {sortBy === 'change24h' && (
                  sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                )}
              </button>
              
              <button
                onClick={() => handleSort('volume24h')}
                className={`col-span-2 flex items-center space-x-1 text-xs font-medium ${theme.textSecondary} hover:${theme.text} transition-colors`}
              >
                <span>Volume</span>
                {sortBy === 'volume24h' && (
                  sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                )}
              </button>
              
              <div className="col-span-1">
                <span className={`text-xs font-medium ${theme.textSecondary}`}>Chart</span>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-700/30">
            {filteredAndSortedData.map((crypto, index) => (
              <div 
                key={crypto.id}
                className="px-6 py-4 hover:bg-gray-800/30 transition-colors duration-200 group"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Watchlist */}
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => toggleWatchlist(crypto.id)}
                      className={`transition-all duration-200 ${
                        watchlist.has(crypto.id) ? 'text-amber-400' : `${theme.textSecondary} group-hover:text-gray-300`
                      }`}
                    >
                      <Star className={`w-4 h-4 ${watchlist.has(crypto.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Rank */}
                  <div className="col-span-1">
                    <span className={`text-sm font-medium ${theme.textSecondary}`}>#{crypto.rank}</span>
                  </div>

                  {/* Name & Symbol */}
                  <div className="col-span-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${theme.primary} rounded-full flex items-center justify-center text-black text-sm font-bold shadow-lg`}>
                        {crypto.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className={`font-bold ${theme.text}`}>{crypto.symbol}</p>
                          <CategoryBadge category={crypto.category} />
                        </div>
                        <p className={`text-sm ${theme.textSecondary}`}>{crypto.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2">
                    <p className={`font-bold ${theme.text}`}>{formatPrice(crypto.price)}</p>
                  </div>

                  {/* 24h Change */}
                  <div className="col-span-2">
                    <div className={`flex items-center space-x-1 ${crypto.change24h >= 0 ? theme.success : theme.error}`}>
                      {crypto.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="font-bold">
                        {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* Volume */}
                  <div className="col-span-2">
                    <p className={`font-bold ${theme.text}`}>{formatVolume(crypto.volume24h)}</p>
                    <p className={`text-xs ${theme.textSecondary}`}>24h volume</p>
                  </div>

                  {/* Sparkline */}
                  <div className="col-span-1 flex justify-center">
                    <MiniSparkline data={crypto.sparklineData} isPositive={crypto.change24h >= 0} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredAndSortedData.length === 0 && (
            <div className="px-6 py-12 text-center">
              <div className={`w-16 h-16 mx-auto bg-gray-800/30 rounded-full flex items-center justify-center mb-4`}>
                <Search className={`w-6 h-6 ${theme.textSecondary}`} />
              </div>
              <p className={`text-lg font-medium ${theme.text} mb-2`}>No cryptocurrencies found</p>
              <p className={`${theme.textSecondary}`}>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoMarketComponent;