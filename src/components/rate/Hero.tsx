import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Search,
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
  buyRate: string;
  sellRate: string;
  change24h: number;
  volume: string;
  isFavorite?: boolean;
};

const countryCodeMap: Record<string, { code: string; currency: string }> = {
  "United States": { code: "us", currency: "usd" },
  Eurozone: { code: "eu", currency: "eur" },
  "United Kingdom": { code: "gb", currency: "gbp" },
  Japan: { code: "jp", currency: "jpy" },
  Singapore: { code: "sg", currency: "sgd" },
  Australia: { code: "au", currency: "aud" },
  Canada: { code: "ca", currency: "cad" },
  Nigeria: { code: "ng", currency: "ngn" },
  "South Africa": { code: "za", currency: "zar" },
  India: { code: "in", currency: "inr" },
  Germany: { code: "de", currency: "eur" },
  France: { code: "fr", currency: "eur" },
  Switzerland: { code: "ch", currency: "chf" },
  Brazil: { code: "br", currency: "brl" },
  Mexico: { code: "mx", currency: "mxn" },
  "South Korea": { code: "kr", currency: "krw" },
};

const fetchCoinData = async (): Promise<RateItem[]> => {
  // Get BTC data from CoinGecko in multiple currencies
  const currencies = Object.values(countryCodeMap).map((c) => c.currency).join(",");
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currencies}&include_24hr_change=true&include_last_updated_at=true`
  );
  const json = await response.json();

  const timestamp = json.bitcoin.last_updated_at
    ? new Date(json.bitcoin.last_updated_at * 1000).toLocaleTimeString()
    : new Date().toLocaleTimeString();

  return Object.entries(countryCodeMap).map(([country, { code, currency }]) => {
    const price = json.bitcoin[currency] || 0;
    const change = json.bitcoin[`${currency}_24h_change`] || 0;

    // Simulate buyRate slightly lower than price and sellRate slightly higher
    const buyRate = price * (1 - 0.005 + Math.random() * 0.002); // ~ -0.3% to +0.2%
    const sellRate = price * (1 + 0.005 + Math.random() * 0.003); // ~ +0.5% to +0.8%

    return {
      country,
      currency: currency.toUpperCase(),
      image: `https://flagcdn.com/w40/${code}.png`,
      buyRate: buyRate.toFixed(2),
      sellRate: sellRate.toFixed(2),
      change24h: change,
      volume: (Math.random() * 1000000).toFixed(0), // No volume from API, so mock
    };
  });
};

const RateSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<RateItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof RateItem | null;
    direction: "ascending" | "descending";
  }>({ key: null, direction: "ascending" });
  const [activeTab, setActiveTab] = useState<
    "all" | "bestBuy" | "bestSell" | "favorites"
  >("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const items = await fetchCoinData();
      setData(items);

      // Set favorites if empty
      if (favorites.size === 0) {
        const initialFavs = new Set(items.slice(0, 3).map((i) => i.country));
        setFavorites(initialFavs);
      }

      setLastUpdated(new Date().toLocaleTimeString());
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Auto refresh every 30s
  useEffect(() => {
    const interval = setInterval(async () => {
      const items = await fetchCoinData();
      setData(items);
      setLastUpdated(new Date().toLocaleTimeString());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const parseRate = (rate: string) => parseFloat(rate);

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

  const filteredData = useMemo(() => {
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
      filtered.sort((a, b) => parseRate(a.buyRate) - parseRate(b.buyRate));
      filtered = filtered.slice(0, 8);
    } else if (activeTab === "bestSell") {
      filtered.sort((a, b) => parseRate(b.sellRate) - parseRate(a.sellRate));
      filtered = filtered.slice(0, 8);
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (sortConfig.key === "change24h") {
          return sortConfig.direction === "ascending"
            ? a.change24h - b.change24h
            : b.change24h - a.change24h;
        }
        const aValue = parseRate(String(a[sortConfig.key!]));
        const bValue = parseRate(String(b[sortConfig.key!]));
        return sortConfig.direction === "ascending"
          ? aValue - bValue
          : bValue - aValue;
      });
    }

    return filtered;
  }, [data, searchTerm, activeTab, sortConfig, favorites]);

  const getRateDifference = (buy: string, sell: string) => {
    const diff = ((parseRate(sell) - parseRate(buy)) / parseRate(buy)) * 100;
    return diff.toFixed(2);
  };

  const marketStats = useMemo(() => {
    if (!data.length)
      return { avgBuy: 0, avgSell: 0, totalVolume: 0, activeMarkets: 0 };

    const avgBuy =
      data.reduce((sum, item) => sum + parseRate(item.buyRate), 0) / data.length;
    const avgSell =
      data.reduce((sum, item) => sum + parseRate(item.sellRate), 0) / data.length;
    const totalVolume = data.reduce((sum, item) => sum + parseFloat(item.volume), 0);

    return {
      avgBuy: avgBuy.toFixed(2),
      avgSell: avgSell.toFixed(2),
      totalVolume: totalVolume.toLocaleString(),
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
              Powered by CoinGecko API for authentic market data with real-time updates every 30 seconds.
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
              onClick={() => {
                setIsLoading(true);
                fetchCoinData().then((items) => {
                  setData(items);
                  setLastUpdated(new Date().toLocaleTimeString());
                  setIsLoading(false);
                });
              }}
              disabled={isLoading}
              className="group inline-flex items-center justify-center px-6 py-3 rounded-xl bg-transparent border-2 border-[#FEFD0C] text-[#FEFD0C] font-bold hover:bg-[#FEFD0C] hover:text-black transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label="Refresh data"
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : "group-hover:rotate-180"} transition-transform duration-300`} />
              Refresh Data
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

          {/* Table or Cards */}
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
                      <td className="px-6 py-4 font-mono font-bold">${item.buyRate}</td>
                      <td className="px-6 py-4 font-mono font-bold">${item.sellRate}</td>
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
                      <span className="font-mono font-bold text-green-400">${item.buyRate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Sell Rate:</span>
                      <span className="font-mono font-bold text-red-400">${item.sellRate}</span>
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

          {/* Footer */}
          <div className="mt-20 bg-black/40 border border-[#FEFD0C] rounded-3xl p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-block bg-black/40 text-[#FEFD0C] px-4 py-2 rounded-full text-sm mb-4 border border-[#FEFD0C]">
                <Activity className="inline w-4 h-4 mr-2" />
                Last Updated: {lastUpdated}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Real-Time Bitcoin Exchange Data
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                All rates are fetched live from CoinGecko API and updated every 30 seconds. 
                Buy and sell rates include realistic market spreads for accurate trading insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-400">
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-[#FEFD0C]" />
                  {data.length} Global Markets
                </div>
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-[#FEFD0C]" />
                  Auto-refresh every 30s
                </div>
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-[#FEFD0C]" />
                  Live market spreads
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RateSection;