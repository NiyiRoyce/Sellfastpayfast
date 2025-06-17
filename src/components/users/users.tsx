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
  Home,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Globe,
  Zap,
  Star,
  Send
} from 'lucide-react';

// TypeScript interfaces
interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  icon: string;
  volume24h: number;
  marketCap: number;
}

interface MarketStats {
  totalMarketCap: number;
  tradingVolume: number;
  activeCryptos: number;
  marketCapChange: number;
  volumeChange: number;
  cryptoChange: number;
  btcDominance: number;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isLogout?: boolean;
}

interface CryptoCardProps {
  crypto: CryptoData;
  onClick: () => void;
}

interface SidebarProps {
  handleJoinTelegram: () => void;
  handleLogout: () => void;
} 

type ViewType = 'Welcome' | 'exchange' | 'markets' | 'settings' | 'ebook';
type TradeType = 'buy' | 'sell';

// Updated dark theme configuration
const theme = {
  primary: 'from-amber-400 to-yellow-500',
  primaryHover: 'from-amber-500 to-yellow-600',
  secondary: 'from-gray-700 to-gray-800',
  secondaryHover: 'from-gray-600 to-gray-700',
  background: 'bg-gray-900',
  surface: 'bg-gray-800/50 backdrop-blur-sm border-gray-700/50',
  surfaceHover: 'bg-gray-800/70',
  text: 'text-white',
  textSecondary: 'text-gray-300',
  textMuted: 'text-gray-400',
  border: 'border-gray-700/50',
  success: 'text-emerald-400',
  error: 'text-red-400',
  warning: 'text-amber-400',
  whatsapp: 'from-green-500 to-green-600',
  input: 'bg-gray-800/50 border-gray-700/50 focus:border-amber-500 focus:ring-amber-500/20'
} as const;

// Reusable Components
const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick, isLogout = false }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 p-3 rounded-lg font-medium text-sm transition-all duration-200 group ${
      isActive
        ? `bg-gradient-to-r ${theme.primary} text-black shadow-lg shadow-amber-500/25`
        : isLogout
        ? `hover:bg-red-900/20 ${theme.error} hover:text-red-300`
        : `hover:bg-gray-700/30 ${theme.textSecondary} hover:${theme.text}`
    }`}
  >
    <span className={`transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`}>
      {icon}
    </span>
    <span>{label}</span>
  </button>
);

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto, onClick }) => (
  <div
    onClick={onClick}
    className={`group ${theme.surface} rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:${theme.surfaceHover} hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1 border`}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center text-black font-bold text-sm shadow-lg`}>
          {crypto.icon}
        </div>
        <div>
          <p className={`font-semibold ${theme.text} text-sm`}>{crypto.symbol}</p>
          <p className={`text-xs ${theme.textMuted}`}>{crypto.name}</p>
        </div>
      </div>
      <ArrowUpRight className={`w-4 h-4 ${theme.textMuted} group-hover:text-amber-400 transition-colors`} />
    </div>
    
    <div className="space-y-2">
      <p className={`text-lg font-bold ${theme.text}`}>${crypto.price.toLocaleString()}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {crypto.change >= 0 ? (
            <TrendingUp className={`w-3 h-3 ${theme.success}`} />
          ) : (
            <TrendingDown className={`w-3 h-3 ${theme.error}`} />
          )}
          <span className={`text-xs font-medium ${crypto.change >= 0 ? theme.success : theme.error}`}>
            {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
          </span>
        </div>
        <span className={`text-xs ${theme.textMuted}`}>24h</span>
      </div>
    </div>
  </div>
);

// Professional Sidebar Component
const Sidebar: React.FC<SidebarProps> = ({ handleJoinTelegram, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = {
    dashboard: "/users",
    exchange: "/exchange",
    markets: "/market",
    ebook: "/ebook",
    settings: "/settings",
  };

  const handleNavigation = (view: keyof typeof routes) => {
    if (routes[view]) {
      navigate(routes[view]);
    }
  };

  return (
    <div className={`w-64 ${theme.background} border-r border-gray-800 flex flex-col`}>
      {/* Brand Header - More Professional */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 bg-gradient-to-br ${theme.primary} rounded-lg flex items-center justify-center shadow-lg`}>
            <Activity className="w-5 h-5 text-black" />
          </div>
          <div>
            <h2 className={`text-lg font-bold ${theme.text}`}>Sellfastpayfast</h2>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <NavItem
          icon={<Home className="w-4 h-4" />}
          label="Dashboard"
          isActive={location.pathname === routes.dashboard}
          onClick={() => handleNavigation("dashboard")}
        />
        <NavItem
          icon={<RefreshCw className="w-4 h-4" />}
          label="Exchange"
          isActive={location.pathname === routes.exchange}
          onClick={() => handleNavigation("exchange")}
        />
        <NavItem
          icon={<BarChart3 className="w-4 h-4" />}
          label="Markets"
          isActive={location.pathname === routes.markets}
          onClick={() => handleNavigation("markets")}
        />
        <NavItem
          icon={<BookOpen className="w-4 h-4" />}
          label="Resources"
          isActive={location.pathname === routes.ebook}
          onClick={() => handleNavigation("ebook")}
        />
        <NavItem
          icon={<Send className="w-4 h-4" />}
          label="Telegram"
          isActive={false}
          onClick={handleJoinTelegram}
        />
        <NavItem
          icon={<Settings className="w-4 h-4" />}
          label="Settings"
          isActive={location.pathname === routes.settings}
          onClick={() => handleNavigation("settings")}
        />
      </nav>
        
      {/* Logout Section */}
      <div className="p-4 border-t border-gray-800">
        <NavItem
          icon={<LogOut className="w-4 h-4" />}
          label="Sign Out"
          isActive={false}
          onClick={handleLogout}
          isLogout={true}
        />
      </div>
    </div>
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

  const [cryptoPrices, setCryptoPrices] = useState<Record<string, number>>({
    BTC: 42850,
    ETH: 2834,
    SOL: 96.84,
    USDC: 1.0,
    ADA: 0.45,
    DOT: 7.23,
    LINK: 14.87,
    UNI: 6.92,
  });

  const marketStats: MarketStats = {
    totalMarketCap: 2.5,
    tradingVolume: 200,
    activeCryptos: 27184,
    marketCapChange: 3.2,
    volumeChange: -1.8,
    cryptoChange: 12,
    btcDominance: 52.4
  };

  const cryptoList = useMemo<CryptoData[]>(
    () => [
      { symbol: 'BTC', name: 'Bitcoin', price: cryptoPrices.BTC, change: 3.24, icon: '₿', volume24h: 28.5, marketCap: 840.2 },
      { symbol: 'ETH', name: 'Ethereum', price: cryptoPrices.ETH, change: 1.87, icon: 'Ξ', volume24h: 15.2, marketCap: 340.8 },
      { symbol: 'SOL', name: 'Solana', price: cryptoPrices.SOL, change: 5.67, icon: '◎', volume24h: 2.8, marketCap: 42.1 },
      { symbol: 'USDC', name: 'USD Coin', price: cryptoPrices.USDC, change: 0.01, icon: '$', volume24h: 4.1, marketCap: 32.9 },
      { symbol: 'ADA', name: 'Cardano', price: cryptoPrices.ADA, change: 2.34, icon: '₳', volume24h: 1.2, marketCap: 15.8 },
      { symbol: 'DOT', name: 'Polkadot', price: cryptoPrices.DOT, change: -1.45, icon: '●', volume24h: 0.8, marketCap: 9.2 },
      { symbol: 'LINK', name: 'Chainlink', price: cryptoPrices.LINK, change: 4.12, icon: '⬟', volume24h: 1.5, marketCap: 8.7 },
      { symbol: 'UNI', name: 'Uniswap', price: cryptoPrices.UNI, change: -0.89, icon: '🦄', volume24h: 0.9, marketCap: 4.1 },
    ],
    [cryptoPrices]
  );

  const filteredCryptoList = useMemo(() => {
    if (!searchQuery) return cryptoList;
    return cryptoList.filter(crypto => 
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cryptoList, searchQuery]);

  // Price simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoPrices((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach(symbol => {
          const volatility = symbol === 'USDC' ? 0.001 : symbol === 'BTC' ? 0.01 : 0.02;
          updated[symbol] = updated[symbol] * (1 + (Math.random() - 0.5) * volatility);
        });
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
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
      ? (amount / cryptoPrices[tradeCrypto]).toFixed(8)
      : amount.toString();

    // Redirect to WhatsApp
    const action = tradeType === 'buy' ? 'buy' : 'sell';
    const message = `Hi! I want to ${action} ${tradeType === 'buy' ? `$${amount} worth of` : `${cryptoAmount}`} ${selectedCryptoData?.name} (${tradeCrypto})${tradeType === 'buy' ? ` (≈${cryptoAmount} ${tradeCrypto})` : ` for $${amount}`}.`;
    const whatsappUrl = `https://wa.me/2348118482904?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setShowTradeModal(false);
    setTradeAmount('');
  };

  const handleJoinTelegram = () => {
    window.open('https://t.me/yourchannel', '_blank');
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
  };

  const selectedCryptoData = cryptoList.find(c => c.symbol === tradeCrypto);

  // Render different views based on current selection
  const renderContent = () => {
    switch (currentView) {
      case 'Welcome':
        return (
          <div className="space-y-6">
            {/* Market Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`${theme.surface} rounded-xl p-6 border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${theme.textMuted} mb-1`}>Market Cap</p>
                    <p className={`text-2xl font-bold ${theme.text}`}>${marketStats.totalMarketCap}T</p>
                    <div className="flex items-center space-x-1 mt-2">
                      <TrendingUp className={`w-3 h-3 ${theme.success}`} />
                      <span className={`text-xs font-medium ${theme.success}`}>+{marketStats.marketCapChange}%</span>
                    </div>
                  </div>
                  <Globe className="w-8 h-8 text-blue-400" />
                </div>
              </div>

              <div className={`${theme.surface} rounded-xl p-6 border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${theme.textMuted} mb-1`}>24h Volume</p>
                    <p className={`text-2xl font-bold ${theme.text}`}>${marketStats.tradingVolume}B</p>
                    <div className="flex items-center space-x-1 mt-2">
                      <TrendingDown className={`w-3 h-3 ${theme.error}`} />
                      <span className={`text-xs font-medium ${theme.error}`}>{marketStats.volumeChange}%</span>
                    </div>
                  </div>
                  <Activity className="w-8 h-8 text-indigo-400" />
                </div>
              </div>

              <div className={`${theme.surface} rounded-xl p-6 border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${theme.textMuted} mb-1`}>BTC Dominance</p>
                    <p className={`text-2xl font-bold ${theme.text}`}>{marketStats.btcDominance}%</p>
                    <div className="flex items-center space-x-1 mt-2">
                      <Star className={`w-3 h-3 ${theme.warning}`} />
                      <span className={`text-xs font-medium ${theme.textSecondary}`}>Stable</span>
                    </div>
                  </div>
                  <Zap className={`w-8 h-8 ${theme.warning}`} />
                </div>
              </div>

              <div className={`${theme.surface} rounded-xl p-6 border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${theme.textMuted} mb-1`}>Active Cryptos</p>
                    <p className={`text-2xl font-bold ${theme.text}`}>{marketStats.activeCryptos.toLocaleString()}</p>
                    <div className="flex items-center space-x-1 mt-2">
                      <TrendingUp className={`w-3 h-3 ${theme.success}`} />
                      <span className={`text-xs font-medium ${theme.success}`}>+{marketStats.cryptoChange}</span>
                    </div>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className={`${theme.surface} rounded-xl p-4 border`}>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme.textMuted}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cryptocurrencies..."
                  className={`w-full pl-10 pr-4 py-3 ${theme.input} rounded-lg ${theme.text} placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border`}
                />
              </div>
            </div>

            {/* Crypto Grid */}
            <div className={`${theme.surface} rounded-xl p-6 border`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${theme.text}`}>
                  {searchQuery ? `Search Results (${filteredCryptoList.length})` : 'Top Cryptocurrencies'}
                </h3>
                <button
                  onClick={() => handleOpenTradeModal()}
                  className={`bg-gradient-to-r ${theme.primary} hover:${theme.primaryHover} text-black px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-amber-500/25 flex items-center space-x-2`}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Trade</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
          <div className={`${theme.surface} rounded-xl p-8 text-center border`}>
            <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>
              {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
            </h2>
            <p className={`${theme.textSecondary}`}>This section is under development</p>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${theme.background} flex`}>
      {/* Sidebar */}
      <Sidebar 
        handleJoinTelegram={handleJoinTelegram}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className={`text-2xl font-bold ${theme.text} mb-1`}>
              {currentView === 'Welcome' ? 'Welcome' : currentView.charAt(0).toUpperCase() + currentView.slice(1)}
            </h1>
            <p className={`${theme.textSecondary} text-sm`}>
              {currentView === 'Welcome' ? 'Trade and Exchange your cryptocurrencies' : `Manage your ${currentView} preferences`}
            </p>
          </div>

          {/* Main Content Area */}
          {renderContent()}
        </div>
      </div>

      {/* Enhanced Trade Modal */}
      {showTradeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`bg-gray-800/95 backdrop-blur-xl border-gray-700/50 rounded-xl p-6 w-full max-w-md shadow-2xl border`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${theme.text}`}>
                Trade Cryptocurrency
              </h3>
              <button
                onClick={() => setShowTradeModal(false)}
                className={`p-2 rounded-lg hover:bg-gray-700/30 transition-colors ${theme.textMuted} hover:${theme.text}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Trade Type Toggle */}
              <div className="flex rounded-lg bg-gray-700/30 p-1">
                <button
                  onClick={() => setTradeType('buy')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
                    tradeType === 'buy'
                      ? `bg-gradient-to-r ${theme.primary} text-black shadow-lg`
                      : `${theme.textSecondary} hover:${theme.text}`
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setTradeType('sell')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
                    tradeType === 'sell'
                      ? `bg-gradient-to-r ${theme.primary} text-black shadow-lg`
                      : `${theme.textSecondary} hover:${theme.text}`
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Crypto Selection */}
              <div className="relative">
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                  Cryptocurrency
                </label>
                <button
                  onClick={() => setShowCryptoDropdown(!showCryptoDropdown)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg bg-gray-700/30 hover:bg-gray-600/30 transition-colors ${theme.text} border ${theme.border}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 bg-gradient-to-br ${theme.primary} rounded-full flex items-center justify-center text-black text-xs font-bold`}>
                      {selectedCryptoData?.icon}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-sm">{tradeCrypto}</p>
                      <p className={`text-xs ${theme.textMuted}`}>{selectedCryptoData?.name}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showCryptoDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showCryptoDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-xl rounded-lg border border-gray-700/50 shadow-xl z-10 max-h-64 overflow-y-auto">
                    {cryptoList.map((crypto) => (
                      <button
                        key={crypto.symbol}
                        onClick={() => {
                          setTradeCrypto(crypto.symbol);
                          setShowCryptoDropdown(false);
                        }}
                        className={`w-full flex items-center space-x-3 p-3 hover:bg-gray-700/40 transition-colors text-left`}
                      >
                        <div className={`w-8 h-8 bg-gradient-to-br ${theme.primary} rounded-full flex items-center justify-center text-black text-xs font-bold`}>
                          {crypto.icon}
                        </div>
                        <div>
                          <p className={`font-medium text-sm ${theme.text}`}>{crypto.symbol}</p>
                          <p className={`text-xs ${theme.textMuted}`}>{crypto.name}</p>
                        </div>
                        <div className="ml-auto text-right">
                          <p className={`font-medium text-sm ${theme.text}`}>${crypto.price.toFixed(2)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Amount Input */}
              <div>
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                  {tradeType === 'buy' ? 'Amount (USD)' : `Amount (${tradeCrypto})`}
                </label>
                <input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  placeholder={tradeType === 'buy' ? 'Enter USD amount' : `Enter ${tradeCrypto} amount`}
                  className={`w-full p-3 rounded-lg ${theme.input} ${theme.text} placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border`}
                />
                <p className={`text-xs ${theme.textMuted} mt-1`}>
                  Minimum trade: $250
                </p>
              </div>

              {/* Price Display */}
              <div className={`bg-gray-700/30 rounded-lg p-3 border ${theme.border}`}>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${theme.textSecondary}`}>Current Price:</span>
                  <span className={`font-medium ${theme.text}`}>
                    ${cryptoPrices[tradeCrypto]?.toFixed(2)}
                  </span>
                </div>
                {tradeAmount && (
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-sm ${theme.textSecondary}`}>
                      {tradeType === 'buy' ? 'You will receive:' : 'You will get:'}
                    </span>
                    <span className={`font-medium ${theme.text}`}>
                      {tradeType === 'buy' 
                        ? `≈${(parseFloat(tradeAmount) / cryptoPrices[tradeCrypto]).toFixed(8)} ${tradeCrypto}`
                        : `≈$${(parseFloat(tradeAmount) * cryptoPrices[tradeCrypto]).toFixed(2)}`
                      }
                    </span>
                  </div>
                )}
              </div>

              {/* Trade Button */}
              <button
                onClick={handleTrade}
                className={`w-full bg-gradient-to-r ${theme.primary} hover:${theme.primaryHover} text-black py-3 px-4 rounded-lg font-bold transition-all duration-200 shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2`}
              >
                <RefreshCw className="w-4 h-4" />
                <span>{tradeType === 'buy' ? 'Buy' :'Sell'} {tradeCrypto}</span>
              </button>

               {/* Disclaimer */}
              <div className={`text-xs ${theme.textMuted} text-center`}>
                By proceeding, you'll be redirected to WhatsApp to complete your trade
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedCryptoDashboard;