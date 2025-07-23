import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Search,
  Shield,
  Clock,
  Cpu,
  RefreshCw,
  Activity,
  Globe,
  DollarSign,
  BarChart3,
  Star,
  Eye,
  Zap,
  AlertCircle,
  CheckCircle,
  X,
  Loader2,
  Wifi,
  WifiOff,
} from "lucide-react";

type RateItem = {
  country: string;
  currency: string;
  image: string;
  buyRate: number;
  sellRate: number;
  change24h: number;
  volume: number;
  marketCap: number;
  lastUpdated: string;
  isFavorite?: boolean;
};

type ApiStatus = 'idle' | 'loading' | 'success' | 'error' | 'retrying';

const countryCodeMap: Record<string, { code: string; currency: string }> = {
  "United States": { code: "us", currency: "usd" },
  "Eurozone": { code: "eu", currency: "eur" },
  "United Kingdom": { code: "gb", currency: "gbp" },
  "Japan": { code: "jp", currency: "jpy" },
  "Singapore": { code: "sg", currency: "sgd" },
  "Australia": { code: "au", currency: "aud" },
  "Canada": { code: "ca", currency: "cad" },
  "Nigeria": { code: "ng", currency: "ngn" },
  "South Africa": { code: "za", currency: "zar" },
  "India": { code: "in", currency: "inr" },
  "Germany": { code: "de", currency: "eur" },
  "France": { code: "fr", currency: "eur" },
  "Switzerland": { code: "ch", currency: "chf" },
  "Brazil": { code: "br", currency: "brl" },
  "Mexico": { code: "mx", currency: "mxn" },
  "South Korea": { code: "kr", currency: "krw" },
};

const formatCurrency = (value: number, currency: string): string => {
  const lowDecimalCurrencies = ['jpy', 'krw', 'ngn', 'inr'];
  const maxFractionDigits = lowDecimalCurrencies.includes(currency.toLowerCase()) ? 0 : 2;

  return value.toLocaleString('en-US', {
    minimumFractionDigits: maxFractionDigits,
    maximumFractionDigits: maxFractionDigits
  });
};

// Enhanced mock data with more realistic values
const getMockData = (): RateItem[] => {
  const baseUsdPrice = 45000 + (Math.random() - 0.5) * 2000; // Add some variance
  const fxRates: Record<string, number> = {
    usd: 1, eur: 0.93, gbp: 0.82, jpy: 157, sgd: 1.35,
    aud: 1.48, cad: 1.31, ngn: 1600, zar: 18.9, inr: 83,
    chf: 0.89, brl: 5.4, mxn: 18.2, krw: 1370
  };

  return Object.entries(countryCodeMap).map(([country, { code, currency }]) => {
    const fxRate = fxRates[currency] || 1;
    const price = baseUsdPrice * fxRate;
    const change = (Math.random() - 0.5) * 15; // More realistic change range
    const volume = Math.floor(Math.random() * 1_000_000_000) + 100_000_000;
    const marketCap = Math.floor(Math.random() * 20_000_000_000) + 1_000_000_000;
    const spread = 0.001 + Math.random() * 0.003; // Variable spread
    const buyRate = price * (1 - spread);
    const sellRate = price * (1 + spread);

    return {
      country,
      currency: currency.toUpperCase(),
      image: `https://flagcdn.com/w40/${code}.png`,
      buyRate,
      sellRate,
      change24h: change,
      volume,
      marketCap,
      lastUpdated: new Date().toLocaleTimeString(),
    };
  });
};

// Enhanced API fetch with retry logic and better error handling
const fetchCoinDataWithRetry = async (retries = 3): Promise<RateItem[]> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const currencies = Object.values(countryCodeMap).map((c) => c.currency).join(",");
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const priceResponse = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currencies}&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true&include_last_updated_at=true`,
        { 
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          }
        }
      );

      clearTimeout(timeoutId);

      if (!priceResponse.ok) {
        throw new Error(`HTTP ${priceResponse.status}: ${priceResponse.statusText}`);
      }

      const priceData = await priceResponse.json();

      if (!priceData.bitcoin) {
        throw new Error("No bitcoin data in API response");
      }

      const result = Object.entries(countryCodeMap).map(([country, { code, currency }]) => {
        const price = priceData.bitcoin[currency] || 45000;
        const change = priceData.bitcoin[`${currency}_24h_change`] || 0;
        const volume = priceData.bitcoin[`${currency}_24h_vol`] || 0;
        const marketCap = priceData.bitcoin[`${currency}_market_cap`] || 0;
        const lastUpdatedAt = priceData.bitcoin.last_updated_at;

        const spread = 0.001 + Math.random() * 0.002; // Realistic spread
        const buyRate = price * (1 - spread);
        const sellRate = price * (1 + spread);

        return {
          country,
          currency: currency.toUpperCase(),
          image: `https://flagcdn.com/w40/${code}.png`,
          buyRate,
          sellRate,
          change24h: change,
          volume,
          marketCap,
          lastUpdated: lastUpdatedAt
            ? new Date(lastUpdatedAt * 1000).toLocaleTimeString()
            : new Date().toLocaleTimeString(),
        };
      });

      return result;
    } catch (error) {
      console.error(`Fetch attempt ${attempt} failed:`, error);
      
      if (attempt === retries) {
        throw error;
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  
  throw new Error("All retry attempts failed");
};

// Loading Modal Component
const LoadingModal: React.FC<{ isOpen: boolean; status: ApiStatus; onClose: () => void }> = ({ 
  isOpen, 
  status, 
  onClose 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-black/90 to-black/70 border-2 border-[#FEFD0C] rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl shadow-[#FEFD0C]/25">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Loading Exchange Rates</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="absolute inset-0 rounded-full border-4 border-[#FEFD0C]/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#FEFD0C] animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-[#FEFD0C] animate-spin animation-delay-150"></div>
            </div>
            
            <div className="space-y-2">
              {status === 'loading' && (
                <div className="flex items-center justify-center gap-2 text-[#FEFD0C]">
                  <Wifi className="h-5 w-5 animate-pulse" />
                  <span className="font-semibold">Fetching real-time data...</span>
                </div>
              )}
              
              {status === 'retrying' && (
                <div className="flex items-center justify-center gap-2 text-yellow-500">
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span className="font-semibold">Retrying connection...</span>
                </div>
              )}
              
              {status === 'error' && (
                <div className="flex items-center justify-center gap-2 text-red-400">
                  <WifiOff className="h-5 w-5" />
                  <span className="font-semibold">Using fallback data...</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-400 space-y-1">
            <p>• Connecting to CoinGecko API</p>
            <p>• Fetching 16 currency pairs</p>
            <p>• Processing real-time market data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toast Notification Component
const Toast: React.FC<{ 
  message: string; 
  type: 'success' | 'error' | 'info'; 
  isVisible: boolean; 
  onClose: () => void;
}> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-400" />,
    error: <AlertCircle className="h-5 w-5 text-red-400" />,
    info: <Activity className="h-5 w-5 text-blue-400" />,
  };

  const colors = {
    success: 'border-green-400 bg-green-400/10',
    error: 'border-red-400 bg-red-400/10',
    info: 'border-blue-400 bg-blue-400/10',
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`flex items-center gap-3 p-4 rounded-lg border ${colors[type]} backdrop-blur-sm`}>
        {icons[type]}
        <span className="text-white font-medium">{message}</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Main Component
const RateSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<ApiStatus>('idle');
  const [data, setData] = useState<RateItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof RateItem | null;
    direction: "ascending" | "descending";
  }>({ key: null, direction: "ascending" });
  const [activeTab, setActiveTab] = useState<"all" | "bestBuy" | "bestSell" | "favorites">("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [lastUpdated, setLastUpdated] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
    message: '',
    type: 'info',
    isVisible: false,
  });
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, isVisible: false }));
  }, []);

  const loadData = useCallback(async (showModal = false) => {
    if (showModal) {
      setShowLoadingModal(true);
    }
    
    try {
      setApiStatus('loading');
      const items = await fetchCoinDataWithRetry(3);
      
      setData(items);
      setLastUpdated(new Date().toLocaleTimeString());
      setApiStatus('success');
      setIsUsingMockData(false);
      setRetryCount(0);
      
      if (showModal) {
        showToast('Successfully loaded real-time data from CoinGecko API', 'success');
      }
    } catch (error) {
      console.error("Failed to load data:", error);
      setApiStatus('error');
      
      // Fallback to mock data
      const mockData = getMockData();
      setData(mockData);
      setLastUpdated(new Date().toLocaleTimeString());
      setIsUsingMockData(true);
      setRetryCount(prev => prev + 1);
      
      if (showModal) {
        showToast('API unavailable. Using demo data with simulated values.', 'error');
      }
    } finally {
      if (showModal) {
        setShowLoadingModal(false);
      }
    }
  }, [showToast]);

  // Initial data load
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setShowLoadingModal(true);
      await loadData(false);
      setIsLoading(false);
      setShowLoadingModal(false);
    };
    
    fetchInitialData();
  }, [loadData]);

  // Set initial favorites
  useEffect(() => {
    if (data.length > 0 && favorites.size === 0) {
      const initialFavs = new Set(data.slice(0, 3).map((i) => i.country));
      setFavorites(initialFavs);
    }
  }, [data, favorites.size]);

  // Auto-refresh every minute
  useEffect(() => {
    const interval = setInterval(() => {
      loadData(false);
    }, 60000); // 1 minute instead of 2 minutes for more real-time feeling
    
    return () => clearInterval(interval);
  }, [loadData]);

  const requestSort = (key: keyof RateItem) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const toggleFavorite = (country: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(country)) {
      newFavorites.delete(country);
    } else {
      newFavorites.add(country);
    }
    setFavorites(newFavorites);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData(true);
    setIsRefreshing(false);
  };

  const filteredData = useMemo(() => {
    if (!data.length) return [];

    let filtered = [...data];

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.currency.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeTab === "favorites") {
      filtered = filtered.filter((item) => favorites.has(item.country));
    } else if (activeTab === "bestBuy") {
      filtered.sort((a, b) => a.buyRate - b.buyRate);
      filtered = filtered.slice(0, 8);
    } else if (activeTab === "bestSell") {
      filtered.sort((a, b) => b.sellRate - a.sellRate);
      filtered = filtered.slice(0, 8);
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key!];
        const bVal = b[sortConfig.key!];

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortConfig.direction === "ascending" ? aVal - bVal : bVal - aVal;
        }

        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        return sortConfig.direction === "ascending"
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr);
      });
    }

    return filtered;
  }, [data, searchTerm, activeTab, sortConfig, favorites]);

  const getRateDifference = (buy: number, sell: number) => {
    if (buy === 0) return "0.00";
    const diff = ((sell - buy) / buy) * 100;
    return diff.toFixed(2);
  };

  const marketStats = useMemo(() => {
    if (!data.length) return { avgBuy: "0", avgSell: "0", totalVolume: "0", activeMarkets: 0 };

    const avgBuy = data.reduce((sum, item) => sum + item.buyRate, 0) / data.length;
    const avgSell = data.reduce((sum, item) => sum + item.sellRate, 0) / data.length;
    const totalVolume = data.reduce((sum, item) => sum + item.volume, 0);

    return {
      avgBuy: avgBuy.toLocaleString('en-US', { maximumFractionDigits: 0 }),
      avgSell: avgSell.toLocaleString('en-US', { maximumFractionDigits: 0 }),
      totalVolume: totalVolume.toLocaleString('en-US', { maximumFractionDigits: 0 }),
      activeMarkets: data.length,
    };
  }, [data]);

  const tabConfig = [
    { key: "all", label: "All Markets", icon: Globe, count: data.length },
    { key: "bestBuy", label: "Best Buy", icon: TrendingDown, count: 8 },
    { key: "bestSell", label: "Best Sell", icon: TrendingUp, count: 8 },
    { key: "favorites", label: "Favorites", icon: Star, count: favorites.size },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      
      <style>
        {`
          @keyframes slide-in {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out;
          }
          .animation-delay-150 {
            animation-delay: 0.15s;
          }
        `}
      </style>

      <LoadingModal 
        isOpen={showLoadingModal} 
        status={apiStatus} 
        onClose={() => setShowLoadingModal(false)} 
      />

      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      
      <section 
        className="w-full py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden"
        style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif' }}
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-black/40 text-[#FEFD0C] font-medium px-4 py-2 rounded-full text-sm mb-4 border border-[#FEFD0C]">
              {isUsingMockData ? (
                <>
                  <AlertCircle className="inline w-4 h-4 mr-2" />
                  Demo Mode
                </>
              ) : (
                <>
                  <Zap className="inline w-4 h-4 mr-2" />
                  Real-Time Data
                </>
              )}
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
              Live Bitcoin 
              <span className="text-[#FEFD0C] block mt-2">Exchange Rates</span>
            </h2>
            <div className="w-20 h-1 bg-[#FEFD0C] rounded-full mx-auto mb-8"></div>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
              {isUsingMockData 
                ? "Currently showing demo data with simulated values. Real-time updates will resume when API is available."
                : "Powered by CoinGecko API for authentic market data with real-time updates every minute."
              }
            </p>
            
            {/* Market Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-black/40 border border-[#FEFD0C] rounded-lg p-4 hover:bg-black/60 transition-all duration-300 group hover:scale-105">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-5 w-5 text-[#FEFD0C] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-lg font-bold text-[#FEFD0C]">${marketStats.avgBuy}</p>
                <p className="text-xs text-gray-400">Avg Buy Rate</p>
              </div>
              <div className="bg-black/40 border border-[#FEFD0C] rounded-lg p-4 hover:bg-black/60 transition-all duration-300 group hover:scale-105">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-5 w-5 text-[#FEFD0C] rotate-180 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-lg font-bold text-[#FEFD0C]">${marketStats.avgSell}</p>
                <p className="text-xs text-gray-400">Avg Sell Rate</p>
              </div>
              <div className="bg-black/40 border border-[#FEFD0C] rounded-lg p-4 hover:bg-black/60 transition-all duration-300 group hover:scale-105">
                <div className="flex items-center justify-center mb-2">
                  <Activity className="h-5 w-5 text-[#FEFD0C] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-lg font-bold text-[#FEFD0C]">{marketStats.totalVolume}</p>
                <p className="text-xs text-gray-400">Total Volume</p>
              </div>
              <div className="bg-black/40 border border-[#FEFD0C] rounded-lg p-4 hover:bg-black/60 transition-all duration-300 group hover:scale-105">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="h-5 w-5 text-[#FEFD0C] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-lg font-bold text-[#FEFD0C]">{marketStats.activeMarkets}</p>
                <p className="text-xs text-gray-400">Active Markets</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            {/* Search Input */}
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search by country or currency"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl bg-black/40 border border-[#FEFD0C] text-white placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FEFD0C] focus:border-[#FEFD0C] transition-all duration-300"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#FEFD0C]" />
            </div>

            {/* View Mode Toggle */}
            <div className="inline-flex rounded-xl bg-black/40 border border-[#FEFD0C] p-1.5">
              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  viewMode === "table" 
                    ? "bg-[#FEFD0C] text-black transform scale-105" 
                    : "text-white hover:text-[#FEFD0C] hover:bg-black/20"
                }`}
                aria-label="Table view"
                title="Table View"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Table
              </button>
              <button
                onClick={() => setViewMode("cards")}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  viewMode === "cards" 
                    ? "bg-[#FEFD0C] text-black transform scale-105" 
                    : "text-white hover:text-[#FEFD0C] hover:bg-black/20"
                }`}
                aria-label="Card view"
                title="Card View"
              >
                <Eye className="h-4 w-4 mr-2" />
                Cards
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`group inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold transition-all duration-500 transform disabled:cursor-not-allowed ${
                isRefreshing
                  ? "bg-[#FEFD0C]/20 border-2 border-[#FEFD0C] text-[#FEFD0C] scale-105 animate-pulse"
                  : "bg-transparent border-2 border-[#FEFD0C] text-[#FEFD0C] hover:bg-[#FEFD0C] hover:text-black hover:scale-105 hover:shadow-lg hover:shadow-[#FEFD0C]/25"
              }`}
              aria-label="Refresh data"
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 mr-2 transition-transform duration-900 ${
                isRefreshing 
                  ? "animate-spin" 
                  : "group-hover:rotate-180"
              }`} />
              {isRefreshing ? "Refreshing..." : "Refresh Data"}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-xl bg-black/40 border border-[#FEFD0C] p-1.5">
              {tabConfig.map(({ key, label, icon: Icon, count }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === key
                      ? "bg-[#FEFD0C] text-black transform scale-105"
                      : "text-white hover:text-[#FEFD0C] hover:bg-black/20"}`}
                  aria-label={`View ${label.toLowerCase()}`}
                  title={label}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  <span className="ml-2 px-2 py-1 rounded-full bg-black/20 text-xs">
                    {count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
              <Clock className="h-4 w-4" />
              Last updated: {lastUpdated}
              {isUsingMockData && (
                <span className="text-yellow-500 font-medium">(Demo Data)</span>
              )}
            </div>
          </div>

          {/* Data Display */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-[#FEFD0C]/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#FEFD0C] animate-spin"></div>
                </div>
                <p className="text-[#FEFD0C] font-semibold">Loading Exchange Rates...</p>
              </div>
            </div>
          ) : (
            <>
              {viewMode === "table" ? (
                <div className="overflow-x-auto rounded-xl bg-black/40 border border-[#FEFD0C] backdrop-blur-sm">
                  <table className="w-full">
                    <thead className="bg-[#FEFD0C]/10 border-b border-[#FEFD0C]">
                      <tr>
                        <th className="text-left p-4 font-bold text-[#FEFD0C]">
                          <button
                            onClick={() => requestSort("country")}
                            className="flex items-center gap-2 hover:text-yellow-300 transition-colors duration-200"
                          >
                            Country/Currency
                            <ArrowUpDown className="h-4 w-4" />
                          </button>
                        </th>
                        <th className="text-left p-4 font-bold text-[#FEFD0C]">
                          <button
                            onClick={() => requestSort("buyRate")}
                            className="flex items-center gap-2 hover:text-yellow-300 transition-colors duration-200"
                          >
                            Buy Rate
                            <ArrowUpDown className="h-4 w-4" />
                          </button>
                        </th>
                        <th className="text-left p-4 font-bold text-[#FEFD0C]">
                          <button
                            onClick={() => requestSort("sellRate")}
                            className="flex items-center gap-2 hover:text-yellow-300 transition-colors duration-200"
                          >
                            Sell Rate
                            <ArrowUpDown className="h-4 w-4" />
                          </button>
                        </th>
                        <th className="text-left p-4 font-bold text-[#FEFD0C]">Spread</th>
                        <th className="text-left p-4 font-bold text-[#FEFD0C]">
                          <button
                            onClick={() => requestSort("change24h")}
                            className="flex items-center gap-2 hover:text-yellow-300 transition-colors duration-200"
                          >
                            24h Change
                            <ArrowUpDown className="h-4 w-4" />
                          </button>
                        </th>
                        <th className="text-left p-4 font-bold text-[#FEFD0C]">
                          <button
                            onClick={() => requestSort("volume")}
                            className="flex items-center gap-2 hover:text-yellow-300 transition-colors duration-200"
                          >
                            Volume
                            <ArrowUpDown className="h-4 w-4" />
                          </button>
                        </th>
                        <th className="text-left p-4 font-bold text-[#FEFD0C]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item, index) => (
                        <tr
                          key={item.country}
                          className={`border-b border-[#FEFD0C]/20 hover:bg-[#FEFD0C]/5 transition-all duration-300 ${
                            index % 2 === 0 ? "bg-black/20" : "bg-transparent"
                          }`}
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={`${item.country} flag`}
                                className="w-8 h-6 rounded object-cover shadow-sm"
                              />
                              <div>
                                <p className="font-semibold text-white">{item.country}</p>
                                <p className="text-sm text-gray-400">{item.currency}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-green-400 text-lg">
                              {formatCurrency(item.buyRate, item.currency)}
                            </p>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-red-400 text-lg">
                              {formatCurrency(item.sellRate, item.currency)}
                            </p>
                          </td>
                          <td className="p-4">
                            <p className="text-yellow-400 font-medium">
                              {getRateDifference(item.buyRate, item.sellRate)}%
                            </p>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {item.change24h >= 0 ? (
                                <TrendingUp className="h-4 w-4 text-green-400" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-400" />
                              )}
                              <span
                                className={`font-bold ${
                                  item.change24h >= 0 ? "text-green-400" : "text-red-400"
                                }`}
                              >
                                {item.change24h >= 0 ? "+" : ""}{item.change24h.toFixed(2)}%
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="text-white font-medium">
                              {item.volume.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                            </p>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => toggleFavorite(item.country)}
                              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                                favorites.has(item.country)
                                  ? "text-[#FEFD0C] bg-[#FEFD0C]/20"
                                  : "text-gray-400 hover:text-[#FEFD0C] hover:bg-[#FEFD0C]/10"
                              }`}
                              aria-label={`${favorites.has(item.country) ? "Remove from" : "Add to"} favorites`}
                            >
                              <Star className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredData.map((item) => (
                    <div
                      key={item.country}
                      className="bg-black/40 border border-[#FEFD0C] rounded-xl p-6 hover:bg-black/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FEFD0C]/25 group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={`${item.country} flag`}
                            className="w-10 h-8 rounded object-cover shadow-sm"
                          />
                          <div>
                            <h3 className="font-bold text-white group-hover:text-[#FEFD0C] transition-colors duration-300">
                              {item.country}
                            </h3>
                            <p className="text-sm text-gray-400">{item.currency}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleFavorite(item.country)}
                          className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                            favorites.has(item.country)
                              ? "text-[#FEFD0C] bg-[#FEFD0C]/20"
                              : "text-gray-400 hover:text-[#FEFD0C] hover:bg-[#FEFD0C]/10"
                          }`}
                          aria-label={`${favorites.has(item.country) ? "Remove from" : "Add to"} favorites`}
                        >
                          <Star className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">Buy Rate</span>
                          <span className="font-bold text-green-400 text-lg">
                            {formatCurrency(item.buyRate, item.currency)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">Sell Rate</span>
                          <span className="font-bold text-red-400 text-lg">
                            {formatCurrency(item.sellRate, item.currency)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">Spread</span>
                          <span className="font-bold text-yellow-400">
                            {getRateDifference(item.buyRate, item.sellRate)}%
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 border-t border-[#FEFD0C]/20">
                          <span className="text-gray-400 text-sm">24h Change</span>
                          <div className="flex items-center gap-1">
                            {item.change24h >= 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-400" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-400" />
                            )}
                            <span
                              className={`font-bold ${
                                item.change24h >= 0 ? "text-green-400" : "text-red-400"
                              }`}
                            >
                              {item.change24h >= 0 ? "+" : ""}{item.change24h.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">Volume</span>
                          <span className="font-medium text-white text-sm">
                            {item.volume.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!isLoading && filteredData.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FEFD0C]/10 flex items-center justify-center">
                <Search className="h-8 w-8 text-[#FEFD0C]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Results Found</h3>
              <p className="text-gray-400">
                Try adjusting your search terms or filter criteria.
              </p>
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-gray-400 text-sm mb-4">
              <Shield className="h-4 w-4" />
              <span>
                {isUsingMockData 
                  ? "Demo data for illustration purposes only"
                  : "Real-time data powered by CoinGecko API"
                }
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <span>• Updates every 60 seconds</span>
              <span>• {data.length} currency pairs</span>
              <span>• Live market data</span>
              <span>• Secure & reliable</span>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-900 opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FEFD0C]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FEFD0C]/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </section>
    </>
  );
};

export default RateSection;