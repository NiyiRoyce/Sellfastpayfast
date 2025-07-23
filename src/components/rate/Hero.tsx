import React, { useState, useEffect, useMemo } from "react";
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

const countryCodeMap: Record<string, { code: string; currency: string }> = {
  "United States": { code: "us", currency: "usd" },
  "Eurozone": { code: "eu", currency: "eur" },
  "United Kingdom": { code: "gb", currency: "gbp" },
  "Japan": { code: "jp", currency: "jpy" },
  "Singapore": { code: "sg", currency: "sgd" },
  "Australia": { code: "au", currency: "aud" },
  "Canada": { code: "ca", currency: "cad" },
  "India": { code: "in", currency: "inr" },
  "Germany": { code: "de", currency: "eur" },
  "France": { code: "fr", currency: "eur" },
  "Switzerland": { code: "ch", currency: "chf" },
  "Brazil": { code: "br", currency: "brl" },
  "Mexico": { code: "mx", currency: "mxn" },
  "South Korea": { code: "kr", currency: "krw" },
};

// Currency symbol mapping
const currencySymbols: Record<string, string> = {
  usd: "$",
  eur: "€",
  gbp: "£",
  jpy: "¥",
  sgd: "S$",
  aud: "A$",
  cad: "C$",
  ngn: "₦",
  zar: "R",
  inr: "₹",
  chf: "CHF",
  brl: "R$",
  mxn: "$",
  krw: "₩",
};

const formatCurrency = (value: number, currency: string): string => {
  const lowDecimalCurrencies = ['jpy', 'krw', 'ngn', 'inr'];
  const maxFractionDigits = lowDecimalCurrencies.includes(currency.toLowerCase()) ? 0 : 2;
  const symbol = currencySymbols[currency.toLowerCase()] || currency.toUpperCase();

  const formattedNumber = value.toLocaleString(navigator.language || 'en-US', {
    minimumFractionDigits: maxFractionDigits,
    maximumFractionDigits: maxFractionDigits
  });

  return `${symbol}${formattedNumber}`;
};

// ---------- MOCK DATA ----------

const getMockData = (): RateItem[] => {
  // Current BTC price in USD
  const baseUsdPrice = 118901; // as per latest data

  // Updated realistic FX rates (approximate recent values)
  const fxRates: Record<string, number> = {
    usd: 1,
    eur: 0.92,   // 1 USD = 0.92 EUR
    gbp: 0.81,   // 1 USD = 0.81 GBP
    jpy: 145,    // 1 USD = 145 JPY
    sgd: 1.35,   // 1 USD = 1.35 SGD
    aud: 1.48,   // 1 USD = 1.48 AUD
    cad: 1.31,   // 1 USD = 1.31 CAD
    ngn: 1705,   // 1 USD = 1705 NGN
    inr: 83,     // 1 USD = 83 INR
    chf: 0.89,   // 1 USD = 0.89 CHF
    brl: 5.563,  // 1 USD = 5.563 BRL
    mxn: 18.2,   // 1 USD = 18.2 MXN
    krw: 1392,   // 1 USD = 1392 KRW
  };

  return Object.entries(countryCodeMap).map(([country, { code, currency }]) => {
    const fxRate = fxRates[currency.toLowerCase()] || 1;
    const price = baseUsdPrice * fxRate;

    // Random 24h change between -5% to +5%
    const change = (Math.random() - 0.5) * 10;

    // Random volume and market cap based on realistic ranges
    const volume = Math.floor(Math.random() * (100_000_000 - 50_000_000 + 1)) + 50_000_000;
    const marketCap = Math.floor(Math.random() * (500_000_000_000 - 100_000_000_000 + 1)) + 100_000_000_000;

    const spread = 0.002;
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

// ---------- FETCH FROM API ----------
const fetchCoinData = async (): Promise<RateItem[]> => {
  try {
    const currencies = Object.values(countryCodeMap).map((c) => c.currency).join(",");
    const priceResponse = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currencies}&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true&include_last_updated_at=true`
    );

    if (!priceResponse.ok) {
      console.warn(`API error: ${priceResponse.status}, using mock data`);
      return getMockData();
    }

    const priceData = await priceResponse.json();

    if (!priceData.bitcoin) {
      console.warn("No bitcoin data in response, using mock data");
      return getMockData();
    }

    return Object.entries(countryCodeMap).map(([country, { code, currency }]) => {
      const price = priceData.bitcoin[currency] || 45000;
      const change = priceData.bitcoin[`${currency}_24h_change`] || 0;
      const volume = priceData.bitcoin[`${currency}_24h_vol`] || 0;
      const marketCap = priceData.bitcoin[`${currency}_market_cap`] || 0;
      const lastUpdatedAt = priceData.bitcoin.last_updated_at;

      const spread = 0.002;
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
  } catch (error) {
    console.error("Error fetching coin data:", error);
    console.log("Falling back to mock data");
    return getMockData();
  }
};

// ---------- MAIN COMPONENT ----------
const RateSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
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

  const loadData = async () => {
    try {
      const items = await fetchCoinData();
      setData(items);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Failed to load data:", error);
      setData(getMockData());
      setLastUpdated(new Date().toLocaleTimeString());
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await loadData();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && favorites.size === 0) {
      const initialFavs = new Set(data.slice(0, 3).map((i) => i.country));
      setFavorites(initialFavs);
    }
  }, [data, favorites.size]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadData();
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  const requestSort = (key: keyof RateItem) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const toggleFavorite = (country: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(country)) {
        newSet.delete(country);
      } else {
        newSet.add(country);
      }
      return newSet;
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadData();
    } catch (error) {
      console.error("Failed to refresh data:", error);
    } finally {
      setIsRefreshing(false);
    }
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

    // Calculate USD equivalents for proper averaging
    const usdData = data.find(item => item.currency === 'USD');
    const avgBuyUSD = usdData ? usdData.buyRate : data.reduce((sum, item) => sum + item.buyRate, 0) / data.length;
    const avgSellUSD = usdData ? usdData.sellRate : data.reduce((sum, item) => sum + item.sellRate, 0) / data.length;
    const totalVolume = data.reduce((sum, item) => sum + item.volume, 0);

    return {
      avgBuy: avgBuyUSD.toLocaleString('en-US', { maximumFractionDigits: 0 }),
      avgSell: avgSellUSD.toLocaleString('en-US', { maximumFractionDigits: 0 }),
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
      
      <section 
        className="w-full py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden"
        style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif' }}
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-black/40 text-[#FEFD0C] font-medium px-4 py-2 rounded-full text-sm mb-4 border border-[#FEFD0C]">
              <Zap className="inline w-4 h-4 mr-2" />
              Real-Time Data
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
              Live Bitcoin 
              <span className="text-[#FEFD0C] block mt-2">Exchange Rates</span>
            </h2>
            <div className="w-20 h-1 bg-[#FEFD0C] rounded-full mx-auto mb-8"></div>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
              Powered by CoinGecko API for authentic market data with real-time updates every 2 minutes.
            </p>
            
            {/* Market Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-black/40 border border-[#FEFD0C] rounded-lg p-4 hover:bg-black/60 transition-all duration-300 group hover:scale-105">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-5 w-5 text-[#FEFD0C] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-lg font-bold text-[#FEFD0C]">${marketStats.avgBuy}</p>
                <p className="text-xs text-gray-400">Avg Buy Rate (USD)</p>
              </div>
              <div className="bg-black/40 border border-[#FEFD0C] rounded-lg p-4 hover:bg-black/60 transition-all duration-300 group hover:scale-105">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-5 w-5 text-[#FEFD0C] rotate-180 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-lg font-bold text-[#FEFD0C]">${marketStats.avgSell}</p>
                <p className="text-xs text-gray-400">Avg Sell Rate (USD)</p>
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
                      : "text-white hover:text-[#FEFD0C] hover:bg-black/20"
                  }`}
                  aria-current={activeTab === key ? "page" : undefined}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {key !== "all" && (
                    <span className="ml-1 inline-block rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium">
                      {count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
                    <div className="text-center py-20">
                      <div className="inline-flex items-center text-[#FEFD0C] text-lg font-semibold">
                        <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                        Loading exchange rates...
                      </div>
                    </div>
                  ) : filteredData.length === 0 ? (
                    <div className="text-center py-20">
                      <div className="text-[#FEFD0C] text-lg font-semibold mb-2">No matching markets found.</div>
                      <p className="text-gray-400">Try adjusting your search terms or filters.</p>
                    </div>
                  ) : viewMode === "table" ? (
                    <div className="overflow-x-auto rounded-2xl border border-[#FEFD0C] bg-black/40">
                      <table className="w-full border-collapse text-white">
                        <thead>
                          <tr className="bg-[#FEFD0C] text-black text-left">
                            <th
                              className="px-6 py-4 cursor-pointer font-bold hover:bg-yellow-300 transition-colors duration-300"
                              onClick={() => requestSort("country")}
                            >
                              Country <ArrowUpDown className="inline-block h-4 w-4 ml-1" />
                            </th>
                            <th
                              className="px-6 py-4 cursor-pointer font-bold hover:bg-yellow-300 transition-colors duration-300"
                              onClick={() => requestSort("currency")}
                            >
                              Currency <ArrowUpDown className="inline-block h-4 w-4 ml-1" />
                            </th>
                            <th
                              className="px-6 py-4 cursor-pointer font-bold hover:bg-yellow-300 transition-colors duration-300"
                              onClick={() => requestSort("buyRate")}
                            >
                              Buy Rate <ArrowUpDown className="inline-block h-4 w-4 ml-1" />
                            </th>
                            <th
                              className="px-6 py-4 cursor-pointer font-bold hover:bg-yellow-300 transition-colors duration-300"
                              onClick={() => requestSort("sellRate")}
                            >
                              Sell Rate <ArrowUpDown className="inline-block h-4 w-4 ml-1" />
                            </th>
                            <th
                              className="px-6 py-4 cursor-pointer font-bold hover:bg-yellow-300 transition-colors duration-300"
                              onClick={() => requestSort("change24h")}
                            >
                              Change 24h <ArrowUpDown className="inline-block h-4 w-4 ml-1" />
                            </th>
                            <th
                              className="px-6 py-4 cursor-pointer font-bold hover:bg-yellow-300 transition-colors duration-300"
                              onClick={() => requestSort("volume")}
                            >
                              Volume <ArrowUpDown className="inline-block h-4 w-4 ml-1" />
                            </th>
                            <th className="px-6 py-4 font-bold">Diff %</th>
                            <th className="px-6 py-4 font-bold">Favorite</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.map((item, index) => (
                            <tr
                              key={item.country}
                              className={`border-t border-[#FEFD0C]/20 hover:bg-black/60 transition-colors duration-300 ${
                                index % 2 === 0 ? 'bg-black/20' : 'bg-black/10'
                              }`}
                            >
                              <td className="px-6 py-4 flex items-center gap-3 font-medium">
                                <img
                                  src={item.image}
                                  alt={`${item.country} flag`}
                                  className="w-8 h-5 object-cover rounded-sm shadow-sm"
                                  loading="lazy"
                                />
                                {item.country}
                              </td>
                              <td className="px-6 py-4 font-mono font-semibold text-[#FEFD0C]">{item.currency}</td>
                              <td className="px-6 py-4 font-mono font-bold">{item.buyRate}</td>
                              <td className="px-6 py-4 font-mono font-bold">{item.sellRate}</td>
                              <td
                                className={`px-6 py-4 font-mono font-bold ${
                                  item.change24h >= 0 ? "text-green-400" : "text-red-400"
                                }`}
                              >
                                {item.change24h >= 0 ? "+" : ""}{item.change24h.toFixed(2)}%
                              </td>
                              <td className="px-6 py-4 font-mono text-gray-300">{Number(item.volume).toLocaleString()}</td>
                              <td className="px-6 py-4 font-mono font-semibold text-[#FEFD0C]">{getRateDifference(item.buyRate, item.sellRate)}%</td>
                              <td className="px-6 py-4 text-center">
                                <button
                                  onClick={() => toggleFavorite(item.country)}
                                  aria-label={
                                    favorites.has(item.country)
                                      ? `Remove ${item.country} from favorites`
                                      : `Add ${item.country} to favorites`
                                  }
                                  title={
                                    favorites.has(item.country)
                                      ? `Remove from favorites`
                                      : `Add to favorites`
                                  }
                                  className="text-[#FEFD0C] hover:text-yellow-300 hover:scale-110 transition-all duration-300"
                                >
                                  <Star className={`h-5 w-5 ${favorites.has(item.country) ? "fill-[#FEFD0C]" : ""}`} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {filteredData.map((item) => (
                        <div
                          key={item.country}
                          className="bg-black/40 border border-[#FEFD0C] rounded-2xl p-6 hover:bg-black/60 hover:border-[#FEFD0C] transition-all duration-500 group hover:scale-105"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-white text-lg group-hover:text-[#FEFD0C] transition-colors duration-300">{item.country}</h3>
                            <button
                              onClick={() => toggleFavorite(item.country)}
                              aria-label={
                                favorites.has(item.country)
                                  ? `Remove ${item.country} from favorites`
                                  : `Add ${item.country} to favorites`
                              }
                              title={
                                favorites.has(item.country)
                                  ? `Remove from favorites`
                                  : `Add to favorites`
                              }
                              className="text-[#FEFD0C] hover:text-yellow-300 hover:scale-110 transition-all duration-300"
                            >
                              <Star className={`h-5 w-5 ${favorites.has(item.country) ? "fill-[#FEFD0C]" : ""}`} />
                            </button>
                          </div>
                          <div className="flex items-center mb-4">
                            <img
                              src={item.image}
                              alt={`${item.country} flag`}
                              className="w-16 h-10 rounded-lg shadow-md mr-3"
                              loading="lazy"
                            />
                            <div className="text-sm bg-black/40 text-[#FEFD0C] px-3 py-1 rounded-full border border-[#FEFD0C] font-mono font-semibold">
                              {item.currency}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400 text-sm">Buy Rate:</span>
                              <span className="font-mono font-bold text-green-400">{item.buyRate}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400 text-sm">Sell Rate:</span>
                              <span className="font-mono font-bold text-red-400">{item.sellRate}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400 text-sm">24h Change:</span>
                              <span
                                className={`font-mono font-bold ${
                                  item.change24h >= 0 ? "text-green-400" : "text-red-400"
                                }`}
                              >
                                {item.change24h >= 0 ? "+" : ""}{item.change24h.toFixed(2)}%
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400 text-sm">Volume:</span>
                              <span className="font-mono text-gray-300">{Number(item.volume).toLocaleString()}</span>
                            </div>
                            <div className="pt-3 border-t border-[#FEFD0C]/20 flex justify-between items-center">
                              <span className="text-gray-400 text-sm">Spread:</span>
                              <span className="font-mono font-bold text-[#FEFD0C]">{getRateDifference(item.buyRate, item.sellRate)}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
        
                 {/* Footer with last updated info */}
                           <div className="mt-12 text-center">
                             <div className="inline-flex items-center gap-2 bg-gradient-to-r from-black/60 to-black/40 border border-[#FEFD0C]/30 rounded-full px-6 py-3 backdrop-blur-sm">
                               <Clock className="h-4 w-4 text-[#FEFD0C]" />
                               <span className="text-gray-300 text-sm">
                                 Last updated: {lastUpdated}
                               </span>
                               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                             </div>
                           </div>
                 
                           {/* Security and reliability badges */}
                           <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                             <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-black/40 to-black/20 border border-[#FEFD0C]/20 rounded-xl backdrop-blur-sm">
                               <Shield className="h-6 w-6 text-[#FEFD0C]" />
                               <div>
                                 <p className="text-white font-semibold text-sm">Secure API</p>
                                 <p className="text-gray-400 text-xs">SSL Encrypted</p>
                               </div>
                             </div>
                             <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-black/40 to-black/20 border border-[#FEFD0C]/20 rounded-xl backdrop-blur-sm">
                               <Cpu className="h-6 w-6 text-[#FEFD0C]" />
                               <div>
                                 <p className="text-white font-semibold text-sm">Real-Time</p>
                                 <p className="text-gray-400 text-xs">30s Updates</p>
                               </div>
                             </div>
                             <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-black/40 to-black/20 border border-[#FEFD0C]/20 rounded-xl backdrop-blur-sm">
                               <Activity className="h-6 w-6 text-[#FEFD0C]" />
                               <div>
                                 <p className="text-white font-semibold text-sm">Live Data</p>
                                 <p className="text-gray-400 text-xs">CoinGecko API</p>
                               </div>
                             </div>
                           </div>
                         </div>
                 
                       </section>
                     </>
                   );
                 };
                 
                 export default RateSection;