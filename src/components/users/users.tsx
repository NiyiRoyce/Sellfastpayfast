import React, { useState, useEffect } from "react";
import {
  BookOpen,
  MessageCircle,
  TrendingUp,
  DollarSign,
  ArrowUpDown,
  Zap,
  Star,
  Activity,
  Globe,
  BarChart3,
  User,
  Wallet,
  Download,
  ExternalLink,
  Phone,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Eye,
  EyeOff,
  TrendingDown,
  Calendar,
  Target,
  Award,
  PieChart
} from "lucide-react";

type TradeType = 'buy' | 'sell';

interface Trade {
  id: string;
  type: TradeType;
  amount: number;
  currency: string;
  rate: number;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  timestamp: Date;
}

const CryptoDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ebook' | 'telegram' | 'trade'>('dashboard');
  const [tradeType, setTradeType] = useState<TradeType>('buy');
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [btcPrice, setBtcPrice] = useState(45000);
  const [trades, setTrades] = useState<Trade[]>([
    {
      id: "1",
      type: 'buy',
      amount: 0.5,
      currency: 'USD',
      rate: 44500,
      total: 22250,
      status: 'completed',
      timestamp: new Date(Date.now() - 86400000)
    },
    {
      id: "2", 
      type: 'sell',
      amount: 0.2,
      currency: 'EUR',
      rate: 43800,
      total: 8760,
      status: 'completed',
      timestamp: new Date(Date.now() - 172800000)
    }
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [currentTrade, setCurrentTrade] = useState<Partial<Trade>>({});
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [notifications, setNotifications] = useState(3);

  // User data
  const userData = {
    name: "Alex Thompson",
    email: "alex@example.com",
    memberSince: "Jan 2024",
    totalTrades: 47,
    successRate: 94,
    totalProfit: 12450,
    btcHoldings: 1.2847,
    portfolioValue: 57890
  };

  // Simulate real-time BTC price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBtcPrice(prev => {
        const change = (Math.random() - 0.5) * 1000;
        return Math.max(prev + change, 35000);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currencies = [
    { code: 'USD', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', symbol: '£', flag: '🇬🇧' },
    { code: 'NGN', symbol: '₦', flag: '🇳🇬' },
    { code: 'CAD', symbol: 'C$', flag: '🇨🇦' },
    { code: 'AUD', symbol: 'A$', flag: '🇦🇺' },
  ];

  const getCurrentRate = () => {
    const baseRate = btcPrice;
    const spread = tradeType === 'buy' ? 0.015 : -0.015;
    return baseRate * (1 + spread);
  };

  const calculateTotal = () => {
    if (!amount || isNaN(Number(amount))) return 0;
    return Number(amount) * getCurrentRate();
  };

  const handleTrade = () => {
    if (!amount || isNaN(Number(amount))) return;

    const trade: Trade = {
      id: Date.now().toString(),
      type: tradeType,
      amount: Number(amount),
      currency: selectedCurrency,
      rate: getCurrentRate(),
      total: calculateTotal(),
      status: 'pending',
      timestamp: new Date()
    };

    setCurrentTrade(trade);
    setShowTradeModal(true);
  };

  const completeTrade = () => {
    if (!currentTrade.id) return;
    
    const phoneNumber = "+1234567890";
    const currency = currencies.find(c => c.code === selectedCurrency);
    const message = encodeURIComponent(
      `Hi! I want to ${currentTrade.type} ${currentTrade.amount} BTC for ${currency?.symbol}${currentTrade.total?.toFixed(2)} ${selectedCurrency}. Rate: ${currency?.symbol}${currentTrade.rate?.toFixed(2)} per BTC. Trade ID: ${currentTrade.id}`
    );
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    
    setTrades(prev => [...prev, currentTrade as Trade]);
    setShowTradeModal(false);
    setAmount('');
    setCurrentTrade({});
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'ebook', label: 'E-Book', icon: BookOpen },
    { id: 'telegram', label: 'Telegram', icon: MessageCircle },
    { id: 'trade', label: 'Trade', icon: TrendingUp },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      
      <div 
        className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden"
        style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif' }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FEFD0C]/10 via-transparent to-blue-500/10"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FEFD0C]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <header className="relative z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-[#FEFD0C] text-black p-2 rounded-xl">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#FEFD0C]">CryptoHub</h1>
                  <p className="text-xs text-gray-400">Personal Dashboard</p>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-1">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id as any)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeTab === id
                        ? 'bg-[#FEFD0C] text-black shadow-lg'
                        : 'text-gray-300 hover:text-[#FEFD0C] hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {label}
                  </button>
                ))}
              </nav>

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <button className="relative p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                  <Bell className="h-5 w-5 text-gray-300" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#FEFD0C] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {notifications}
                    </span>
                  )}
                </button>
                
                <div className="hidden md:flex items-center space-x-3 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700/50">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#FEFD0C] to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">AT</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{userData.name}</div>
                    <div className="text-xs text-gray-400">Pro Trader</div>
                  </div>
                </div>
                
                <button className="hidden md:block p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                  <Settings className="h-5 w-5 text-gray-300" />
                </button>
                
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg bg-slate-800/50"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <nav className="md:hidden mt-4 space-y-2">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveTab(id as any);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === id
                        ? 'bg-[#FEFD0C] text-black'
                        : 'text-gray-300 hover:text-[#FEFD0C] hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {label}
                  </button>
                ))}
              </nav>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 container mx-auto px-4 py-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Welcome back, <span className="text-[#FEFD0C]">{userData.name.split(' ')[0]}!</span>
                </h2>
                <p className="text-gray-400">Here's what's happening with your crypto portfolio today.</p>
              </div>

              {/* Portfolio Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 hover:border-[#FEFD0C]/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <Wallet className="h-8 w-8 text-[#FEFD0C]" />
                    <button 
                      onClick={() => setBalanceVisible(!balanceVisible)}
                      className="text-gray-400 hover:text-white"
                    >
                      {balanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {balanceVisible ? `$${userData.portfolioValue.toLocaleString()}` : '••••••'}
                  </div>
                  <div className="text-sm text-gray-400">Total Portfolio Value</div>
                  <div className="text-green-400 text-sm mt-2">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +8.2% this week
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-orange-500/20 p-2 rounded-lg">
                      <span className="text-orange-400 font-bold text-lg">₿</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{userData.btcHoldings}</div>
                  <div className="text-sm text-gray-400">Bitcoin Holdings</div>
                  <div className="text-blue-400 text-sm mt-2">
                    <DollarSign className="inline h-3 w-3 mr-1" />
                    ${(userData.btcHoldings * btcPrice).toFixed(0)}
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Activity className="h-8 w-8 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{userData.totalTrades}</div>
                  <div className="text-sm text-gray-400">Total Trades</div>
                  <div className="text-green-400 text-sm mt-2">
                    <Target className="inline h-3 w-3 mr-1" />
                    {userData.successRate}% success rate
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="h-8 w-8 text-[#FEFD0C]" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    +${userData.totalProfit.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Total P&L</div>
                  <div className="text-[#FEFD0C] text-sm mt-2">
                    <Award className="inline h-3 w-3 mr-1" />
                    All time high
                  </div>
                </div>
              </div>

              {/* Live BTC Price & Quick Trade */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Live Bitcoin Price</h3>
                    <div className="bg-orange-500/20 p-2 rounded-lg">
                      <span className="text-orange-400 font-bold">₿</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-[#FEFD0C] mb-2">${btcPrice.toFixed(2)}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-green-400 text-sm">
                      <TrendingUp className="inline h-4 w-4 mr-1" />
                      +2.5% (24h)
                    </div>
                    <div className="text-xs text-gray-400">Last updated: now</div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">24h High:</span>
                        <div className="font-mono font-bold">${(btcPrice + 1200).toFixed(2)}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">24h Low:</span>
                        <div className="font-mono font-bold">${(btcPrice - 800).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Quick Trade</h3>
                  <div className="flex rounded-lg bg-slate-900/50 p-1 mb-4">
                    <button
                      onClick={() => setTradeType('buy')}
                      className={`flex-1 py-2 rounded font-medium transition-all duration-300 text-sm ${
                        tradeType === 'buy' 
                          ? 'bg-green-500 text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => setTradeType('sell')}
                      className={`flex-1 py-2 rounded font-medium transition-all duration-300 text-sm ${
                        tradeType === 'sell' 
                          ? 'bg-red-500 text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Sell
                    </button>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount (BTC)"
                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FEFD0C]/50 mb-4"
                  />
                  <button
                    onClick={() => setActiveTab('trade')}
                    className="w-full bg-[#FEFD0C] text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-300 transition-all duration-300"
                  >
                    Go to Trading
                  </button>
                </div>
              </div>

              {/* Recent Activity & Resources */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Recent Trades */}
                <div className="md:col-span-2 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-[#FEFD0C]" />
                      Recent Trades
                    </h3>
                    <button className="text-[#FEFD0C] text-sm hover:underline">View All</button>
                  </div>
                  <div className="space-y-3">
                    {trades.slice(-5).map((trade) => (
                      <div key={trade.id} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${trade.type === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {trade.type === 'buy' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{trade.type === 'buy' ? 'Bought' : 'Sold'} {trade.amount} BTC</div>
                            <div className="text-xs text-gray-400">{trade.timestamp.toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-sm">${trade.total.toFixed(2)}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${trade.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                            {trade.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Access */}
                <div className="space-y-4">
                  <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 hover:border-[#FEFD0C]/30 transition-all duration-300 cursor-pointer"
                       onClick={() => setActiveTab('ebook')}>
                    <div className="flex items-center justify-between mb-3">
                      <BookOpen className="h-6 w-6 text-[#FEFD0C]" />
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                    <h4 className="font-bold mb-2">Trading Guide</h4>
                    <p className="text-sm text-gray-400">Access your crypto trading e-book</p>
                  </div>

                  <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
                       onClick={() => setActiveTab('telegram')}>
                    <div className="flex items-center justify-between mb-3">
                      <MessageCircle className="h-6 w-6 text-blue-400" />
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                    <h4 className="font-bold mb-2">Trading Signals</h4>
                    <p className="text-sm text-gray-400">Join our Telegram community</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* E-Book Tab */}
          {activeTab === 'ebook' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block bg-[#FEFD0C]/10 text-[#FEFD0C] px-4 py-2 rounded-full mb-4">
                  <BookOpen className="inline h-4 w-4 mr-2" />
                  Digital Guide
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Crypto Trading <span className="text-[#FEFD0C]">Masterclass</span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Your comprehensive guide to cryptocurrency trading, from basics to advanced strategies
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="bg-gradient-to-br from-[#FEFD0C]/20 to-[#FEFD0C]/5 rounded-2xl p-8 border border-[#FEFD0C]/20 mb-6">
                      <BookOpen className="h-16 w-16 text-[#FEFD0C] mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-center mb-2">Complete Trading Guide</h3>
                      <p className="text-center text-gray-300">200+ pages of expert insights</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">Beginner-friendly explanations</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">Advanced trading strategies</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">Risk management techniques</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">Market analysis tools</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">Portfolio diversification</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                      <h4 className="font-bold text-lg mb-3">What You'll Learn</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Cryptocurrency fundamentals</li>
                        <li>• Technical analysis mastery</li>
                        <li>• Trading psychology</li>
                        <li>• DeFi opportunities</li>
                        <li>• Tax implications & compliance</li>
                      </ul>
                    </div>

                    <button className="w-full bg-[#FEFD0C] text-black font-bold py-4 px-6 rounded-xl hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                      <Download className="h-5 w-5 mr-2" />
                      Download Free E-Book
                    </button>

                    <div className="text-center text-sm text-gray-400">
                      <Shield className="inline h-4 w-4 mr-1" />
                      Instant download • No registration required
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Telegram Tab */}
          {activeTab === 'telegram' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block bg-[#FEFD0C]/10 text-[#FEFD0C] px-4 py-2 rounded-full mb-4">
                  <MessageCircle className="inline h-4 w-4 mr-2" />
                  Community Hub
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Join Our <span className="text-[#FEFD0C]">Telegram Channel</span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Get exclusive trading signals, market analysis, and connect with fellow crypto enthusiasts
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl p-8 border border-blue-500/20 mb-6">
                      <MessageCircle className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-center mb-2">Trading Signals</h3>
                      <p className="text-center text-gray-300">5,000+ active members</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">Daily market analysis</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">Real-time trading signals</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">Expert insights & tips</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">Community discussions</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">24/7 support</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                      <h4 className="font-bold text-lg mb-3">Channel Benefits</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Premium trading signals</li>
                        <li>• Market trend predictions</li>
                        <li>• Portfolio recommendations</li>
                        <li>• Educational content</li>
                        <li>• Direct access to experts</li>
                      </ul>
                    </div>

                    <button 
                      onClick={() => window.open('https://t.me/cryptohub', '_blank')}
                      className="w-full bg-blue-500 text-white font-bold py-4 px-6 rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Join Telegram Channel
                    </button>

                    <div className="text-center text-sm text-gray-400">
                      <Globe className="inline h-4 w-4 mr-1" />
                      Free to join • Instant access
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-[#FEFD0C] mb-2">5,000+</div>
                  <div className="text-gray-300">Active Members</div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">94%</div>
                  <div className="text-gray-300">Signal Accuracy</div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                  <div className="text-gray-300">Active Support</div>
                </div>
              </div>
            </div>
          )}

          {/* Trade Tab */}
          {activeTab === 'trade' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-[#FEFD0C]">Bitcoin</span> Trading
                </h2>
                <p className="text-gray-300">Execute your trades with competitive rates and instant processing</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-2 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Trade Bitcoin</h3>
                    <div className="text-2xl font-bold text-[#FEFD0C]">${btcPrice.toFixed(2)}</div>
                  </div>

                  {/* Trade Type Selection */}
                  <div className="flex rounded-xl bg-slate-900/50 p-1 mb-6">
                    <button
                      onClick={() => setTradeType('buy')}
                      className={`flex-1 py-3 rounded-lg font-bold transition-all duration-300 ${
                        tradeType === 'buy' 
                          ? 'bg-green-500 text-white shadow-lg' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Buy Bitcoin
                    </button>
                    <button
                      onClick={() => setTradeType('sell')}
                      className={`flex-1 py-3 rounded-lg font-bold transition-all duration-300 ${
                        tradeType === 'sell' 
                          ? 'bg-red-500 text-white shadow-lg' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Sell Bitcoin
                    </button>
                  </div>

                  {/* Currency Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Select Currency
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {currencies.map((currency) => (
                        <button
                          key={currency.code}
                          onClick={() => setSelectedCurrency(currency.code)}
                          className={`p-3 rounded-lg border transition-all duration-300 ${
                            selectedCurrency === currency.code
                              ? 'border-[#FEFD0C] bg-[#FEFD0C]/10 text-[#FEFD0C]'
                              : 'border-slate-700/50 bg-slate-900/30 text-gray-300 hover:border-slate-600'
                          }`}
                        >
                          <div className="text-lg mb-1">{currency.flag}</div>
                          <div className="font-bold text-sm">{currency.code}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Amount (BTC)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FEFD0C]/50 focus:border-[#FEFD0C]/50"
                    />
                  </div>

                  {/* Rate & Total Display */}
                  <div className="bg-slate-900/50 rounded-xl p-4 mb-6 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Exchange Rate:</span>
                      <span className="font-mono font-bold text-[#FEFD0C]">
                        {currencies.find(c => c.code === selectedCurrency)?.symbol}{getCurrentRate().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Amount:</span>
                      <span className="font-mono font-bold text-white text-lg">
                        {currencies.find(c => c.code === selectedCurrency)?.symbol}{calculateTotal().toFixed(2)} {selectedCurrency}
                      </span>
                    </div>
                  </div>

                  {/* Trade Button */}
                  <button
                    onClick={handleTrade}
                    disabled={!amount || isNaN(Number(amount)) || Number(amount) <= 0}
                    className="w-full bg-[#FEFD0C] text-black font-bold py-4 px-6 rounded-xl hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {tradeType === 'buy' ? 'Buy' : 'Sell'} Bitcoin
                  </button>
                </div>

                {/* Info Panel */}
                <div className="space-y-6">
                  <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                    <h4 className="font-bold mb-4">Why Choose Us?</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-green-400" />
                        <span className="text-sm text-gray-300">Secure & regulated</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Zap className="h-5 w-5 text-[#FEFD0C]" />
                        <span className="text-sm text-gray-300">Instant processing</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <DollarSign className="h-5 w-5 text-blue-400" />
                        <span className="text-sm text-gray-300">Competitive rates</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-purple-400" />
                        <span className="text-sm text-gray-300">24/7 support</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                    <h4 className="font-bold mb-3">Market Stats</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">24h Volume:</span>
                        <span className="font-mono text-sm">$2.4B</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Market Cap:</span>
                        <span className="font-mono text-sm">$890B</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Dominance:</span>
                        <span className="font-mono text-sm">42.3%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Trades */}
              {trades.length > 0 && (
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Your Recent Trades</h3>
                  <div className="space-y-3">
                    {trades.slice(-3).map((trade) => (
                      <div key={trade.id} className="flex items-center justify-between p-4 bg-slate-900/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${trade.type === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {trade.type === 'buy' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          </div>
                          <div>
                            <div className="font-medium">{trade.type === 'buy' ? 'Bought' : 'Sold'} {trade.amount} BTC</div>
                            <div className="text-sm text-gray-400">{trade.timestamp.toLocaleString()}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold">${trade.total.toFixed(2)}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${trade.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                            {trade.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Trade Confirmation Modal */}
        {showTradeModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full">
              <div className="text-center mb-6">
                <div className={`inline-flex p-3 rounded-full mb-4 ${currentTrade.type === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {currentTrade.type === 'buy' ? <TrendingUp className="h-8 w-8" /> : <TrendingDown className="h-8 w-8" />}
                </div>
                <h3 className="text-xl font-bold mb-2">Confirm Trade</h3>
                <p className="text-gray-400">Review your transaction details</p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-4 mb-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Action:</span>
                  <span className="font-bold capitalize">{currentTrade.type} Bitcoin</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount:</span>
                  <span className="font-mono font-bold">{currentTrade.amount} BTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rate:</span>
                  <span className="font-mono font-bold">
                    {currencies.find(c => c.code === selectedCurrency)?.symbol}{currentTrade.rate?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-700 pt-3">
                  <span className="text-gray-400">Total:</span>
                  <span className="font-mono font-bold text-[#FEFD0C] text-lg">
                    {currencies.find(c => c.code === selectedCurrency)?.symbol}{currentTrade.total?.toFixed(2)} {selectedCurrency}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowTradeModal(false)}
                  className="flex-1 bg-slate-700 text-gray-300 font-bold py-3 px-4 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={completeTrade}
                  className="flex-1 bg-[#FEFD0C] text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Complete via WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CryptoDashboard;