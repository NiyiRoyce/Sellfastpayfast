import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  X,
  Search,
  Settings,
  RefreshCw,
  LogOut,
  BookOpen,
  MessageCircle,
  BarChart3,
  Activity,
  ChevronDown,
  ArrowUpRight,
  Globe,
  Grid,
  Zap,
  Star,
  Send,
  User,
  Menu,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';

// Import Poppins font
const fontStyle = document.createElement('link');
fontStyle.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap';
fontStyle.rel = 'stylesheet';
document.head.appendChild(fontStyle);

// TypeScript interfaces
interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  icon: string;
  volume24h: number;
  marketCap: number;
  image?: string;
  rank?: number;
}

interface MarketStats {
  totalMarketCap: number;
  totalMarketCapChange: number;
  tradingVolume: number;
  tradingVolumeChange: number;
  activeCryptos: number;
  btcDominance: number;
  btcDominanceChange: number;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isLogout?: boolean;
  showLabels: boolean;
}

interface CryptoCardProps {
  crypto: CryptoData;
  onClick: () => void;
}

interface SidebarProps {
  handleJoinTelegram: () => void;
  handleLogout: () => void;
  isOpen: boolean;
  onToggle: () => void;
} 

type ViewType = 'Welcome' | 'exchange' | 'markets' | 'settings' | 'ebook';
type TradeType = 'buy' | 'sell';

// Updated theme with Poppins font integration
const theme = {
  primary: 'from-[#FEFD0C] to-[#FEFD0C]/90',
  primaryHover: 'from-[#FEFD0C]/90 to-[#FEFD0C]',
  secondary: 'from-gray-700 to-gray-800',
  secondaryHover: 'from-gray-600 to-gray-700',
  background: 'bg-[#0A0A0A]',
  surface: 'bg-[#0A0A0A]/60 backdrop-blur-xl border-[#FEFD0C]/10',
  surfaceHover: 'bg-black/70',
  text: 'text-white',
  textSecondary: 'text-gray-300',
  textMuted: 'text-gray-400',
  border: 'border-[#FEFD0C]/10',
  success: 'text-emerald-400',
  error: 'text-red-400',
  warning: 'text-[#FEFD0C]',
  whatsapp: 'from-green-500 to-green-600',
  input: 'bg-black/50 border-[#FEFD0C]/20 focus:border-[#FEFD0C] focus:ring-[#FEFD0C]/20',
  primaryText: 'text-black',
  glow: 'shadow-[#FEFD0C]/20',
  font: 'font-poppins'
} as const;

// CoinGecko API service
const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

const fetchCryptoData = async (): Promise<CryptoData[]> => {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto data');
    }
    
    const data = await response.json();
    
    return data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      price: coin.current_price,
      change: coin.price_change_percentage_24h || 0,
      icon: getSymbolIcon(coin.symbol.toUpperCase()),
      volume24h: coin.total_volume / 1000000000, // Convert to billions
      marketCap: coin.market_cap / 1000000000, // Convert to billions
      image: coin.image,
      rank: coin.market_cap_rank,
    }));
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return [];
  }
};

const fetchGlobalStats = async (): Promise<MarketStats> => {
  try {
    const response = await fetch(`${COINGECKO_API_BASE}/global`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch global stats');
    }
    
    const data = await response.json();
    const globalData = data.data;
    
    return {
      totalMarketCap: globalData.total_market_cap.usd / 1000000000000, // Convert to trillions
      totalMarketCapChange: globalData.market_cap_change_percentage_24h_usd || 0,
      tradingVolume: globalData.total_volume.usd / 1000000000, // Convert to billions
      tradingVolumeChange: Math.random() * 10 - 5, // CoinGecko doesn't provide this, so simulate
      activeCryptos: globalData.active_cryptocurrencies,
      btcDominance: globalData.market_cap_percentage.btc || 0,
      btcDominanceChange: Math.random() * 2 - 1, // Simulate BTC dominance change
    };
  } catch (error) {
    console.error('Error fetching global stats:', error);
    return {
      totalMarketCap: 2.5,
      totalMarketCapChange: 3.2,
      tradingVolume: 200,
      tradingVolumeChange: -1.8,
      activeCryptos: 27184,
      btcDominance: 52.4,
      btcDominanceChange: 0.2,
    };
  }
};

// Function to get symbol icons
const getSymbolIcon = (symbol: string): string => {
  const iconMap: { [key: string]: string } = {
    'BTC': '₿',
    'ETH': 'Ξ',
    'USDT': '₮',
    'BNB': 'B',
    'SOL': '◎',
    'USDC': '$',
    'XRP': 'X',
    'DOGE': 'Ð',
    'ADA': '₳',
    'AVAX': 'A',
    'SHIB': 'S',
    'DOT': '●',
    'LINK': '⬟',
    'TRX': 'T',
    'MATIC': 'M',
    'UNI': '🦄',
    'LTC': 'Ł',
    'NEAR': 'N',
    'ATOM': 'A',
    'XLM': '*',
    'ALGO': 'A',
    'VET': 'V',
    'ICP': '∞',
    'FIL': 'F',
    'HBAR': 'H',
    'APT': 'A',
    'QNT': 'Q',
    'GRT': 'G',
    'SAND': 'S',
    'MANA': 'M',
    'FLOW': 'F',
    'THETA': 'Θ',
    'AAVE': 'A',
    'AXS': 'A',
    'EGLD': 'E',
    'FTM': 'F',
    'XTZ': 'T',
    'CAKE': 'C',
    'RUNE': 'R',
    'KCS': 'K',
    'CHZ': 'C',
    'ENJ': 'E',
    'GALA': 'G',
    'LRC': 'L',
    'ZEC': 'Z',
    'DASH': 'D',
    'COMP': 'C',
    'YFI': 'Y',
  };
  
  return iconMap[symbol] || symbol.charAt(0);
};

// Reusable Components
const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick, isLogout = false, showLabels }) => (
  <li className="my-3 md:my-5">
    <button
      onClick={onClick}
      className={`w-full flex items-center text-left font-poppins text-sm transition-all duration-200 ${
        isActive
          ? `text-[#FEFD0C] border-b-2 border-[#FEFD0C] pb-2`
          : isLogout
          ? `text-white hover:text-red-400`
          : `text-white hover:text-[#FEFD0C]`
      }`}
      title={!showLabels ? label : undefined}
    >
      <span className={`${showLabels ? 'mr-3' : 'mx-auto'} transition-all duration-200`}>{icon}</span>
      {showLabels && <span className="transition-all duration-200">{label}</span>}
    </button>
  </li>
);

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto, onClick }) => (
  <div
    onClick={onClick}
    className={`group ${theme.surface} rounded-xl p-3 md:p-4 cursor-pointer transition-all duration-300 hover:${theme.surfaceHover} hover:shadow-lg hover:${theme.glow} hover:-translate-y-1 border font-poppins`}
  >
    <div className="flex items-center justify-between mb-2 md:mb-3">
      <div className="flex items-center space-x-2 md:space-x-3">
        <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10">
          {crypto.image ? (
            <img 
              src={crypto.image} 
              alt={crypto.name}
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center ${theme.primaryText} font-bold text-xs md:text-sm shadow-lg ${crypto.image ? 'hidden' : ''}`}>
            {crypto.icon}
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-1">
            <p className={`font-semibold ${theme.text} text-xs md:text-sm font-poppins`}>{crypto.symbol}</p>
            {crypto.rank && crypto.rank <= 10 && (
              <span className="bg-[#FEFD0C] text-black text-xs px-1 rounded font-bold">#{crypto.rank}</span>
            )}
          </div>
          <p className={`text-xs ${theme.textMuted} font-poppins hidden md:block`}>{crypto.name}</p>
        </div>
      </div>
      <ArrowUpRight className={`w-3 h-3 md:w-4 md:h-4 ${theme.textMuted} group-hover:text-[#FEFD0C] transition-colors`} />
    </div>
    
    <div className="space-y-1 md:space-y-2">
      <p className={`text-base md:text-lg font-bold ${theme.text} font-poppins`}>
        ${crypto.price < 1 ? crypto.price.toFixed(6) : crypto.price.toLocaleString()}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {crypto.change >= 0 ? (
            <TrendingUp className={`w-3 h-3 ${theme.success}`} />
          ) : (
            <TrendingDown className={`w-3 h-3 ${theme.error}`} />
          )}
          <span className={`text-xs font-medium font-poppins ${crypto.change >= 0 ? theme.success : theme.error}`}>
            {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
          </span>
        </div>
        <span className={`text-xs ${theme.textMuted} font-poppins`}>24h</span>
      </div>
    </div>
  </div>
);

// Mobile Header Component
const MobileHeader: React.FC<{ onToggleSidebar: () => void; currentView: ViewType }> = ({ onToggleSidebar, currentView }) => (
  <div className="md:hidden flex items-center justify-between mb-4 p-4 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#FEFD0C]/10">
    <button
      onClick={onToggleSidebar}
      className="p-2 rounded-lg hover:bg-[#FEFD0C]/10 transition-colors text-white"
    >
      <Menu className="w-6 h-6" />
    </button>
  </div>
);

// Sidebar Component
const Sidebar: React.FC<SidebarProps> = ({ handleJoinTelegram, handleLogout, isOpen, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLabels, setShowLabels] = useState(true);

  const routes = {
    dashboard: "/users",
    exchange: "/exchange",  
    markets: "/market",
    ebook: "/resources",
    settings: "/settings",
  };

  const handleNavigation = (view: keyof typeof routes) => {
    if (routes[view]) {
      navigate(routes[view]);
    }
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      onToggle();
    }
  };

  const toggleLabels = () => {
    setShowLabels(!showLabels);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed md:relative inset-y-0 left-0 z-50 ${showLabels ? 'w-64' : 'w-20'} ${theme.background} border-r border-[#FEFD0C]/10 flex flex-col font-poppins transform transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Brand Header */}
        <div className="p-4 md:p-6 border-b border-[#FEFD0C]/10">
          <div className="flex items-center justify-between">
            {/* Desktop Toggle Button - Only show on desktop */}
            <button
              onClick={toggleLabels}
              className={`hidden md:flex w-8 h-8 bg-gradient-to-br ${theme.primary} rounded-lg items-center justify-center shadow-lg transition-colors hover:bg-opacity-80`}
              title={showLabels ? "Collapse sidebar" : "Expand sidebar"}
            >
              <div className="w-4 h-4 flex flex-col items-center justify-center relative">
                <span
                  className={`block w-3 h-0.5 bg-black transition-transform duration-300 ${
                    showLabels ? 'rotate-45 translate-y-[2px]' : ''
                  }`}
                />
                <span
                  className={`block w-3 h-0.5 bg-black mt-1 transition-transform duration-300 ${
                    showLabels ? '-rotate-45 -translate-y-[2px]' : ''
                  }`}
                />
              </div>
            </button>
            
            {/* Mobile Close button - Only show on mobile */}
            <button
              onClick={onToggle}
              className="md:hidden p-2 rounded-lg hover:bg-[#FEFD0C]/10 transition-colors text-white ml-auto"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 md:p-4">
          <ul className="list-none p-0 mt-4 md:mt-10">
            <NavItem
              icon={<User className="w-4 h-4" />}
              label="Dashboard"
              isActive={location.pathname === routes.dashboard}
              onClick={() => handleNavigation("dashboard")}
              showLabels={showLabels}
            />
            <NavItem
              icon={<RefreshCw className="w-4 h-4" />}
              label="Trade crypto"
              isActive={location.pathname === routes.exchange}
              onClick={() => handleNavigation("exchange")}
              showLabels={showLabels}
            />
            <NavItem
              icon={<BarChart3 className="w-4 h-4" />}
              label="Coin Markets"
              isActive={location.pathname === routes.markets}
              onClick={() => handleNavigation("markets")}
              showLabels={showLabels}
            />
            <NavItem
              icon={<BookOpen className="w-4 h-4" />}
              label="E-book & Physical book"
              isActive={location.pathname === routes.ebook}
              onClick={() => handleNavigation("ebook")}
              showLabels={showLabels}
            />
            <NavItem
              icon={<Settings className="w-4 h-4" />}
              label="Settings"
              isActive={location.pathname === routes.settings}
              onClick={() => handleNavigation("settings")}
              showLabels={showLabels}
            />
            <NavItem
              icon={<Send className="w-4 h-4" />}
              label="Telegram"
              isActive={false}
              onClick={() => {
                handleJoinTelegram();
                if (window.innerWidth < 768) onToggle();
              }}
              showLabels={showLabels}
            />
            <NavItem
              icon={<MessageCircle className="w-4 h-4" />}
              label="Report a Problem"
              isActive={false}
              onClick={() => {
                window.open('https://wa.me/447721863850', '_blank');
                if (window.innerWidth < 768) onToggle();
              }}
              showLabels={showLabels}
            />
            <NavItem
              icon={<LogOut className="w-4 h-4" />}
              label="Logout"
              isActive={false}
              onClick={() => {
                handleLogout();
                if (window.innerWidth < 768) onToggle();
              }}
              isLogout={true}
              showLabels={showLabels}
            />
          </ul>
        </nav>
      </div>
    </>
  );
};

// Main Dashboard Component
const EnhancedCryptoDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('Welcome');
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeType, setTradeType] = useState<TradeType>('buy');
  const [tradeCrypto, setTradeCrypto] = useState('BTC');
  const [showCryptoDropdown, setShowCryptoDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cryptoList, setCryptoList] = useState<CryptoData[]>([]);
  const [marketStats, setMarketStats] = useState<MarketStats>({
    totalMarketCap: 0,
    totalMarketCapChange: 0,
    tradingVolume: 0,
    tradingVolumeChange: 0,
    activeCryptos: 0,
    btcDominance: 0,
    btcDominanceChange: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const filteredCryptoList = useMemo(() => {
    if (!searchQuery) return cryptoList;
    return cryptoList.filter(crypto => 
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cryptoList, searchQuery]);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [cryptoData, globalStats] = await Promise.all([
          fetchCryptoData(),
          fetchGlobalStats()
        ]);
        
        setCryptoList(cryptoData);
        setMarketStats(globalStats);
        setLastUpdate(new Date());
      } catch (err) {
        setError('Failed to fetch market data. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-refresh data every 100 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const [cryptoData, globalStats] = await Promise.all([
          fetchCryptoData(),
          fetchGlobalStats()
        ]);
        
        setCryptoList(cryptoData);
        setMarketStats(globalStats);
        setLastUpdate(new Date());
      } catch (err) {
        console.error('Error refreshing data:', err);
      }
    }, 100000); // Update every 100 seconds

    return () => clearInterval(interval);
  }, []);

  // Close sidebar on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpenTradeModal = (crypto?: string) => {
    if (crypto) {
      setTradeCrypto(crypto);
    } else {
      setTradeCrypto(selectedCrypto);
    }
    setShowTradeModal(true);
  };

  const handleTrade = () => {
    const amount = parseFloat(tradeAmount);
    if (!amount || amount < 250) {
      alert('Minimum trade amount is $250');
      return;
    }

    const selectedCryptoData = cryptoList.find(c => c.symbol === tradeCrypto);
    const cryptoAmount = tradeType === 'buy' 
      ? (amount / selectedCryptoData!.price).toFixed(8)
      : amount.toString();

    // Redirect to WhatsApp
    const action = tradeType === 'buy' ? 'buy' : 'sell';
    const message = `Hi! I want to ${action} ${tradeType === 'buy' ? `$${amount} worth of` : `${cryptoAmount}`} ${selectedCryptoData?.name} (${tradeCrypto})${tradeType === 'buy' ? ` (≈${cryptoAmount} ${tradeCrypto})` : ` for $${amount}`}.`;
    const whatsappUrl = `https://wa.me/447721863850?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setShowTradeModal(false);
    setTradeAmount('');
  };

  const handleJoinTelegram = () => {
    window.open('https://t.me/tradewithbnaira01', '_blank');
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const selectedCryptoData = cryptoList.find(c => c.symbol === tradeCrypto);

  // Render different views based on current selection
  const renderContent = () => {
    switch (currentView) {
      case 'Welcome':
        return (
          <div className="space-y-4 md:space-y-6 font-poppins">
            {/* Background Pattern */}
            <div className="fixed inset-0 opacity-5 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FEFD0C]/10 via-transparent to-[#FEFD0C]/10"></div>
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FEFD0C]/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FEFD0C]/5 rounded-full blur-3xl"></div>
            </div>

            {/* Market Overview */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 relative z-10">
                          <div className="bg-[#FEFD0C] text-black rounded-lg md:rounded-xl p-4 md:p-6 border border-black shadow-2xl shadow-black/40">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs md:text-sm text-black/70 mb-1 font-poppins">Market Cap</p>
                                <p className="text-lg md:text-2xl font-bold text-black font-poppins">
                                  ${marketStats.totalMarketCap.toFixed(2)}T
                                </p>
                                <div className="flex items-center space-x-1 mt-1 md:mt-2">
                                  {marketStats.totalMarketCapChange >= 0 ? (
                                    <TrendingUp className="w-3 h-3 text-black" />
                                  ) : (
                                    <TrendingDown className="w-3 h-3 text-black" />
                                  )}
                                  <span className="text-xs font-medium text-black font-poppins">
                                    {marketStats.totalMarketCapChange >= 0 ? '+' : ''}{marketStats.totalMarketCapChange.toFixed(2)}%
                                  </span>
                                </div>
                              </div>
                              <Globe className="w-6 h-6 md:w-8 md:h-8 text-black" />
                            </div>
                          </div>
            
                          <div className="bg-[#FEFD0C] text-black rounded-lg md:rounded-xl p-4 md:p-6 border border-black shadow-2xl shadow-black/40">
                            <div className="flex items-center justify-between"><div>
                                <p className="text-xs md:text-sm text-black/70 mb-1 font-poppins">24h Volume</p>
                                <p className="text-lg md:text-2xl font-bold text-black font-poppins">
                                  ${marketStats.tradingVolume.toFixed(0)}B
                                </p>
                                <div className="flex items-center space-x-1 mt-1 md:mt-2">
                                  {marketStats.tradingVolumeChange >= 0 ? (
                                    <TrendingUp className="w-3 h-3 text-black" />
                                  ) : (
                                    <TrendingDown className="w-3 h-3 text-black" />
                                  )}
                                  <span className="text-xs font-medium text-black font-poppins">
                                    {marketStats.tradingVolumeChange >= 0 ? '+' : ''}{marketStats.tradingVolumeChange.toFixed(2)}%
                                  </span>
                                </div>
                              </div>
                              <Activity className="w-6 h-6 md:w-8 md:h-8 text-black" />
                            </div>
                          </div>
            
                          <div className="bg-[#FEFD0C] text-black rounded-lg md:rounded-xl p-4 md:p-6 border border-black shadow-2xl shadow-black/40">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs md:text-sm text-black/70 mb-1 font-poppins">BTC Dominance</p>
                                <p className="text-lg md:text-2xl font-bold text-black font-poppins">
                                  {marketStats.btcDominance.toFixed(1)}%
                                </p>
                                <div className="flex items-center space-x-1 mt-1 md:mt-2">
                                  {marketStats.btcDominanceChange >= 0 ? (
                                    <TrendingUp className="w-3 h-3 text-black" />
                                  ) : (
                                    <TrendingDown className="w-3 h-3 text-black" />
                                  )}
                                  <span className="text-xs font-medium text-black font-poppins">
                                    {marketStats.btcDominanceChange >= 0 ? '+' : ''}{marketStats.btcDominanceChange.toFixed(2)}%
                                  </span>
                                </div>
                              </div>
                              <Star className="w-6 h-6 md:w-8 md:h-8 text-black" />
                            </div>
                          </div>
            
                          <div className="bg-[#FEFD0C] text-black rounded-lg md:rounded-xl p-4 md:p-6 border border-black shadow-2xl shadow-black/40">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs md:text-sm text-black/70 mb-1 font-poppins">Active Cryptos</p>
                                <p className="text-lg md:text-2xl font-bold text-black font-poppins">
                                  {marketStats.activeCryptos.toLocaleString()}
                                </p>
                                <div className="flex items-center space-x-1 mt-1 md:mt-2">
                                  <Zap className="w-3 h-3 text-black" />
                                  <span className="text-xs font-medium text-black font-poppins">
                                    Live Data
                                  </span>
                                </div>
                              </div>
                              <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-black" />
                            </div>
                          </div>
                        </div>

            {/* Search Bar */}
            <div className={`${theme.surface} rounded-lg md:rounded-xl p-3 md:p-4 border shadow-2xl shadow-black/50 relative z-10`}>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 ${theme.textMuted}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cryptocurrencies..."
                  className={`w-full pl-8 md:pl-10 pr-4 py-2 md:py-3 ${theme.input} rounded-lg ${theme.text} placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border font-poppins text-sm md:text-base`}
                />
              </div>
            </div>

            {/* Crypto Grid */}
            <div className={`${theme.surface} rounded-lg md:rounded-xl p-4 md:p-6 border shadow-2xl shadow-black/50 relative z-10`}>
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className={`text-base md:text-lg font-semibold ${theme.text} font-poppins`}>
                  {searchQuery ? `Search Results (${filteredCryptoList.length})` : 'Top Cryptocurrencies'}
                </h3>
                <button
                  onClick={() => handleOpenTradeModal()}
                  className={`bg-gradient-to-r ${theme.primary} hover:${theme.primaryHover} ${theme.primaryText} px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-medium transition-all duration-200 shadow-lg ${theme.glow} flex items-center space-x-2 hover:scale-105 font-poppins text-sm md:text-base`}
                >
                  <RefreshCw className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Trade</span>
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {filteredCryptoList.slice(0, 8).map((crypto) => (
                  <CryptoCard
                    key={crypto.symbol}
                    crypto={crypto}
                    onClick={() => handleOpenTradeModal(crypto.symbol)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className={`${theme.surface} rounded-lg md:rounded-xl p-6 md:p-8 text-center border shadow-2xl shadow-black/50 font-poppins`}>
            <h2 className={`text-xl md:text-2xl font-bold ${theme.text} mb-4 font-poppins`}>
              {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
            </h2>
            <p className={`${theme.textSecondary} font-poppins`}>This section is under development</p>
          </div>
        );
    }
  };

 return (
    <div className={`min-h-screen ${theme.background} flex font-poppins`} style={{ fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Sidebar */}
      <Sidebar 
        handleJoinTelegram={handleJoinTelegram}
        handleLogout={handleLogout}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <MobileHeader onToggleSidebar={toggleSidebar} currentView={currentView} />

        {/* Main Content Area */}
        <div className="flex-1 p-3 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header - Hidden on mobile since we have mobile header */}
            <div className="mb-4 md:mb-6 hidden md:block">
              <h1 className={`text-xl md:text-2xl font-bold ${theme.text} mb-1 font-poppins`}>
                {currentView === 'Welcome' ? 'Welcome' : currentView.charAt(0).toUpperCase() + currentView.slice(1)}
              </h1>
              <p className={`${theme.textSecondary} text-sm font-poppins`}>
                {currentView === 'Welcome' ? 'Trade and Exchange your cryptocurrencies' : `Manage your ${currentView} preferences`}
              </p>
            </div>

            {/* Main Content Area */}
            {renderContent()}
          </div>
        </div>
      </div>
      
      {/* Enhanced Trade Modal */}
      {showTradeModal && ( 
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-poppins">
          <div className={`bg-black/95 backdrop-blur-xl border-[#FEFD0C]/20 rounded-xl p-6 w-full max-w-md shadow-2xl border`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${theme.text} font-poppins`}>
                Trade Cryptocurrency
              </h3>
              <button
                onClick={() => setShowTradeModal(false)}
                className={`p-2 rounded-lg hover:bg-[#FEFD0C]/10 transition-colors ${theme.textMuted} hover:${theme.text}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Trade Type Toggle */}
              <div className="flex rounded-lg bg-[#FEFD0C]/5 p-1 border border-[#FEFD0C]/10">
                <button
                  onClick={() => setTradeType('buy')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 font-poppins ${
                    tradeType === 'buy'
                      ? `bg-gradient-to-r ${theme.primary} ${theme.primaryText} shadow-lg`
                      : `${theme.textSecondary} hover:${theme.text}`
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setTradeType('sell')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 font-poppins ${
                    tradeType === 'sell'
                      ? `bg-gradient-to-r ${theme.primary} ${theme.primaryText} shadow-lg`
                      : `${theme.textSecondary} hover:${theme.text}`
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Crypto Selection */}
                            <div className="relative">
                              <label className={`block text-sm font-medium ${theme.textSecondary} mb-2 font-poppins`}>
                                Cryptocurrency
                              </label>
                              <button
                                onClick={() => setShowCryptoDropdown(!showCryptoDropdown)}
                                className={`w-full flex items-center justify-between p-3 rounded-lg bg-[#FEFD0C]/5 hover:bg-[#FEFD0C]/10 transition-colors ${theme.text} border border-[#FEFD0C]/20 font-poppins`}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={`w-8 h-8 bg-gradient-to-br ${theme.primary} rounded-full flex items-center justify-center ${theme.primaryText} text-xs font-bold`}>
                                    {selectedCryptoData?.icon}
                                  </div>
                                  <div className="text-left">
                                    <p className="font-medium text-sm font-poppins">{tradeCrypto}</p>
                                    <p className={`text-xs ${theme.textMuted} font-poppins`}>{selectedCryptoData?.name}</p>
                                  </div>
                                </div>
                                <ChevronDown className={`w-4 h-4 transition-transform ${showCryptoDropdown ? 'rotate-180' : ''}`} />
                              </button>
                              
                              {showCryptoDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl rounded-lg border border-[#FEFD0C]/20 shadow-xl z-10 max-h-64 overflow-y-auto">
                                  {cryptoList.map((crypto) => (
                                    <button
                                      key={crypto.symbol}
                                      onClick={() => {
                                        setTradeCrypto(crypto.symbol);
                                        setShowCryptoDropdown(false);
                                      }}
                                      className={`w-full flex items-center space-x-3 p-3 hover:bg-[#FEFD0C]/10 transition-colors text-left font-poppins`}
                                    >
                                      <div className={`w-8 h-8 bg-gradient-to-br ${theme.primary} rounded-full flex items-center justify-center ${theme.primaryText} text-xs font-bold`}>
                                        {crypto.icon}
                                      </div>
                                      <div>
                                        <p className={`font-medium text-sm ${theme.text} font-poppins`}>{crypto.symbol}</p>
                                       <p className={`text-xs ${theme.textMuted} font-poppins`}>{crypto.name}</p>
                                     </div>
                                     <div className="ml-auto text-right">
                                       <p className={`text-sm font-medium ${theme.text} font-poppins`}>${crypto.price.toLocaleString()}</p>
                                       <p className={`text-xs ${crypto.change >= 0 ? theme.success : theme.error} font-poppins`}>
                                         {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                                       </p>
                                     </div>
                                   </button>
                                 ))}
                               </div>
                             )}
                           </div>
              
                           {/* Amount Input */}
                           <div>
                             <label className={`block text-sm font-medium ${theme.textSecondary} mb-2 font-poppins`}>
                               {tradeType === 'buy' ? 'Amount (USD)' : `Amount (${tradeCrypto})`}
                             </label>
                             <div className="relative">
                               <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textMuted} font-poppins`}>
                                 {tradeType === 'buy' ? '$' : selectedCryptoData?.icon}
                               </span>
                               <input
                                 type="number"
                                 value={tradeAmount}
                                 onChange={(e) => setTradeAmount(e.target.value)}
                                 placeholder={tradeType === 'buy' ? '250.00' : '0.00'}
                                 className={`w-full pl-8 pr-4 py-3 ${theme.input} rounded-lg ${theme.text} placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border font-poppins`}
                                 min="250"
                                 step="0.01"
                               />
                             </div>
                             <p className={`text-xs ${theme.textMuted} mt-1 font-poppins`}>
                               Minimum: $250
                             </p>
                           </div>
  {tradeAmount && parseFloat(tradeAmount) >= 250 && selectedCryptoData && (
  <div className={`bg-[#FEFD0C]/5 rounded-lg p-4 border border-[#FEFD0C]/20`}>
    <h4 className={`text-sm font-medium ${theme.text} mb-2 font-poppins`}>Trade Summary</h4>
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className={`${theme.textMuted} font-poppins`}>
          {tradeType === 'buy' ? 'You pay:' : 'You receive:'}
        </span>
        <span className={`${theme.text} font-medium font-poppins`}>
          {tradeType === 'buy' ? `$${parseFloat(tradeAmount).toLocaleString()}` : `$${parseFloat(tradeAmount).toLocaleString()}`}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className={`${theme.textMuted} font-poppins`}>
          {tradeType === 'buy' ? 'You receive:' : 'You pay:'}
        </span>
        <span className={`${theme.text} font-medium font-poppins`}>
          {tradeType === 'buy' 
            ? `≈${(parseFloat(tradeAmount) / selectedCryptoData.price).toFixed(8)} ${tradeCrypto}`
            : `≈${(parseFloat(tradeAmount) * selectedCryptoData.price).toFixed(2)} USD`
          }
        </span>
      </div>
      <div className="flex justify-between text-sm pt-2 border-t border-[#FEFD0C]/10">
        <span className={`${theme.textMuted} font-poppins`}>Rate:</span>
        <span className={`${theme.text} font-medium font-poppins`}>
          1 {tradeCrypto} = ${selectedCryptoData.price.toLocaleString()}
        </span>
      </div>
    </div>
  </div>
)}
              
                           {/* Action Buttons */}
                           <div className="flex space-x-3 pt-2">
                             <button
                               onClick={() => setShowTradeModal(false)}
                               className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 bg-gray-800 hover:bg-gray-700 ${theme.text} font-poppins`}
                             >
                               Cancel
                             </button>
                             <button
                               onClick={handleTrade}
                               disabled={!tradeAmount || parseFloat(tradeAmount) < 250}
                               className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:scale-105 font-poppins ${
                                 !tradeAmount || parseFloat(tradeAmount) < 250
                                   ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                   : `bg-gradient-to-r ${theme.primary} hover:${theme.primaryHover} ${theme.primaryText} ${theme.glow}`
                               }`}
                             >
                               {tradeType === 'buy' ? 'Buy' : 'Sell'} {tradeCrypto}
                             </button>
                           </div>
              
                           {/* Disclaimer */}
                           <div className={`text-xs ${theme.textMuted} text-center mt-4 font-poppins`}>
                             <p>By continuing, you'll be redirected to WhatsApp to complete your trade.</p>
                             <p className="mt-1">All trades are processed manually by our team.</p>
                           </div>
                         </div>
                       </div>
                     </div>
                   )}
                 </div>
               );
              };
              
              export default EnhancedCryptoDashboard;