import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Search,
  Star,
  ArrowLeft,
  Activity,
  AlertCircle,
  Loader2,
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
  high24h: number;
  low24h: number;
  circulatingSupply: number;
  totalSupply: number;
  ath: number;
  athChangePercentage: number;
  atl: number;
  atlChangePercentage: number;
}

interface MarketStats {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  marketCapChange24h: number;
  ethDominance: number;
  activeCryptocurrencies: number;
}

// Theme configuration
const theme = {
  primary: 'from-[#FEFD0C] to-[#F5F500]',
  primaryAccent: '#FEFD0C',
  background: 'bg-black',
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

const getCoinIcon = (symbol: string): string => {
  const iconMap: { [key: string]: string } = {
    'BTC': '₿',
    'ETH': 'Ξ',
    'USDT': '₮',
    'BNB': 'Ⓑ',
    'SOL': '◎',
    'XRP': 'Ⓧ',
    'USDC': '$',
    'DOGE': 'Ð',
    'ADA': '₳',
    'TRX': '⚡',
    'LINK': '🔗',
    'AVAX': '🔺',
    'LTC': 'Ł',
    'SUI': '🌊',
    'DOT': '●',
    'MATIC': '🔷',
    'UNI': '🦄',
    'ATOM': '⚛️',
    'ALGO': '🔷',
    'VET': '💎',
    'ICP': '∞',
    'FIL': '📁',
    'APT': '🅰️',
    'NEAR': '🔴',
    'AAVE': '👻',
    'GRT': '📊',
    'SAND': '🏝️',
    'MANA': '🏛️',
    'CRO': '🔺',
    'LDO': '🔷'
  };
  return iconMap[symbol.toUpperCase()] || '🪙';
};

// API Functions
const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

const fetchMarketData = async (): Promise<{ coins: CryptoCurrency[], marketStats: MarketStats }> => {
  try {
    // Fetch global market data
    const globalResponse = await fetch(`${COINGECKO_API_BASE}/global`);
    const globalData = await globalResponse.json();
    
    // Fetch top 50 cryptocurrencies with sparkline data
    const coinsResponse = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h`
    );
    const coinsData = await coinsResponse.json();

    const marketStats: MarketStats = {
      totalMarketCap: globalData.data.total_market_cap.usd,
      totalVolume24h: globalData.data.total_volume.usd,
      btcDominance: globalData.data.market_cap_percentage.btc,
      ethDominance: globalData.data.market_cap_percentage.eth || 0,
      marketCapChange24h: globalData.data.market_cap_change_percentage_24h_usd,
      activeCryptocurrencies: globalData.data.active_cryptocurrencies
    };

    const coins: CryptoCurrency[] = coinsData.map((coin: any, index: number) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h || 0,
      volume24h: coin.total_volume,
      marketCap: coin.market_cap,
      rank: coin.market_cap_rank,
      icon: getCoinIcon(coin.symbol),
      sparklineData: coin.sparkline_in_7d?.price?.slice(-7) || [coin.current_price],
      isWatchlisted: false,
      high24h: coin.high_24h,
      low24h: coin.low_24h,
      circulatingSupply: coin.circulating_supply,
      totalSupply: coin.total_supply,
      ath: coin.ath,
      athChangePercentage: coin.ath_change_percentage,
      atl: coin.atl,
      atlChangePercentage: coin.atl_change_percentage
    }));

    return { coins, marketStats };
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
};

// Mini Sparkline Component
const MiniSparkline: React.FC<{ data: number[]; isPositive: boolean }> = ({ data, isPositive }) => {
  if (!data || data.length === 0) return null;
  
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <p className={`text-xl font-bold ${theme.text}`}>{stats.btcDominance.toFixed(1)}%</p>
            <div className="w-full bg-black/40 rounded-full h-2 mt-2 border border-[#FEFD0C]/20">
              <div 
                className={`bg-gradient-to-r ${theme.primary} h-2 rounded-full transition-all duration-500 ${theme.glow}`}
                style={{ width: `${stats.btcDominance}%` }}
              />
            </div>
          </div>

          <div className={`p-4 rounded-lg ${theme.surfaceLight} border ${theme.border}`}>
            <p className={`text-sm font-medium ${theme.textSecondary} mb-1`}>Active Coins</p>
            <p className={`text-xl font-bold ${theme.text}`}>{stats.activeCryptocurrencies?.toLocaleString() || 'N/A'}</p>
            <p className={`text-sm ${theme.textSecondary} mt-1`}>ETH: {stats.ethDominance.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Error Component
const ErrorCard: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
  <div className={`${theme.surface} rounded-xl p-6 border text-center`}>
    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
    <h3 className={`text-lg font-semibold ${theme.text} mb-2`}>Failed to Load Data</h3>
    <p className={`${theme.textSecondary} mb-4`}>{message}</p>
    <button
      onClick={onRetry}
      className={`px-4 py-2 bg-gradient-to-r ${theme.primary} text-black font-semibold rounded-lg hover:opacity-90 transition-opacity`}
    >
      Try Again
    </button>
  </div>
);

// Loading Component
const LoadingCard: React.FC = () => (
  <div className={`${theme.surface} rounded-xl p-6 border text-center`}>
    <Loader2 className="w-12 h-12 text-[#FEFD0C] mx-auto mb-4 animate-spin" />
    <h3 className={`text-lg font-semibold ${theme.text} mb-2`}>Loading Market Data</h3>
    <p className={`${theme.textSecondary}`}>Fetching latest cryptocurrency prices...</p>
  </div>
);

const CryptoMarketComponent: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoCurrency[]>([]);
  const [marketStats, setMarketStats] = useState<MarketStats | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'rank' | 'price' | 'change' | 'volume' | 'marketCap'>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const loadData = async () => {
    try {
      setError(null);
      const { coins, marketStats: stats } = await fetchMarketData();
      setCryptoData(coins);
      setMarketStats(stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market data');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setIsRefreshing(true);
    await loadData();
  };

  const toggleWatchlist = (id: string) => {
    setWatchlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedCryptos = [...cryptoData].sort((a, b) => {
    let aValue: number;
    let bValue: number;

    switch (sortBy) {
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'change':
        aValue = a.change24h;
        bValue = b.change24h;
        break;
      case 'volume':
        aValue = a.volume24h;
        bValue = b.volume24h;
        break;
      case 'marketCap':
        aValue = a.marketCap;
        bValue = b.marketCap;
        break;
      default:
        aValue = a.rank;
        bValue = b.rank;
    }

    if (sortOrder === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  const filteredCryptos = sortedCryptos.filter(
    c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const goBack = () => {
    window.history.back();
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${theme.background} relative p-8 text-white font-sans`}>
        <div className="max-w-7xl mx-auto">
          <LoadingCard />
        </div>
      </div>
    );
  }

  if (error && !marketStats) {
    return (
      <div className={`min-h-screen ${theme.background} relative p-8 text-white font-sans`}>
        <div className="max-w-7xl mx-auto">
          <ErrorCard message={error} onRetry={loadData} />
        </div>
      </div>
    );
  }

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
            disabled={isRefreshing}
            className={`p-2 rounded-full border border-white/20 hover:${theme.borderHover} transition duration-300 flex items-center justify-center ${isRefreshing ? 'animate-spin' : ''}`}
            aria-label="Refresh data"
          >
            <RefreshCw className="w-6 h-6" />
          </button>
        </header>

        {/* Market Stats */}
        {marketStats && <MarketStatsCard stats={marketStats} />}

        {/* Search and Filters */}
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
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className={`${theme.surface} px-4 py-2 rounded-lg border ${theme.border} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
            >
              <option value="rank">Sort by Rank</option>
              <option value="price">Sort by Price</option>
              <option value="change">Sort by 24h Change</option>
              <option value="volume">Sort by Volume</option>
              <option value="marketCap">Sort by Market Cap</option>
            </select>
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
                <th className="text-left py-2 px-3 w-12 cursor-pointer" onClick={() => handleSort('rank')}>#</th>
                <th className="text-left py-2 px-3 w-12"></th>
                <th className="text-left py-2 px-3">Name</th>
                <th className="text-right py-2 px-3 cursor-pointer" onClick={() => handleSort('price')}>Price</th>
                <th className="text-right py-2 px-3 cursor-pointer" onClick={() => handleSort('change')}>24h %</th>
                <th className="text-right py-2 px-3 cursor-pointer" onClick={() => handleSort('volume')}>Volume 24h</th>
                <th className="text-right py-2 px-3 cursor-pointer" onClick={() => handleSort('marketCap')}>Market Cap</th>
                <th className="text-center py-2 px-3 w-24">7d Chart</th>
                <th className="text-center py-2 px-3 w-16">Watch</th>
              </tr>
            </thead>
            <tbody>
              {filteredCryptos.map((coin) => {
                const isPositive = coin.change24h >= 0;
                return (
                  <tr
                    key={coin.id}
                    className={`hover:${theme.surfaceHover} cursor-pointer transition duration-200 border-b border-white/5`}
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
                            watchlist.has(coin.id) ? 'text-yellow-400 fill-current' : 'text-white/30 hover:text-yellow-400'
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

        {/* Footer with data source info */}
        <div className="mt-6 text-center">
          <p className={`text-sm ${theme.textMuted}`}>
            Data provided by CoinGecko API • Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoMarketComponent;