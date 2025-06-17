import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  DollarSign,
  ChevronDown,
  ArrowUpDown,
  AlertCircle,
  CheckCircle,
  MessageCircle,
  Zap,
  ExternalLink
} from 'lucide-react';

// TypeScript interfaces
interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
}

// Theme configuration - dark theme for app integration
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

// Mock cryptocurrency data
const availableCryptos: CryptoCurrency[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 42850.32,
    change24h: 3.24,
    icon: '₿'
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2834.67,
    change24h: 1.87,
    icon: 'Ξ'
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    price: 96.84,
    change24h: 5.67,
    icon: '◎'
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.45,
    change24h: 2.34,
    icon: '₳'
  },
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'BNB',
    price: 315.42,
    change24h: -1.23,
    icon: 'B'
  },
  {
    id: 'ripple',
    symbol: 'XRP',
    name: 'XRP',
    price: 0.52,
    change24h: 4.56,
    icon: 'X'
  }
];

// Utility functions
const formatPrice = (price: number): string => {
  if (price >= 1) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `$${price.toFixed(6)}`;
};

// Main Exchange Component
const ExchangeComponent: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>(availableCryptos[0]);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState<string>('');
  const [usdValue, setUsdValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showCryptoDropdown, setShowCryptoDropdown] = useState(false);

  const MINIMUM_TRADE = 250;
  const WHATSAPP_NUMBER = '+2348118482904';

  // Handle navigation back with proper history handling
  const handleBack = () => {
    try {
      // Check if we can go back in history
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // Fallback navigation
        window.location.href = '/';
      }
    } catch (error) {
      // Fallback if history API fails
      window.location.href = '/';
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCryptoDropdown) {
        const target = event.target as HTMLElement;
        if (!target.closest('.crypto-dropdown')) {
          setShowCryptoDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCryptoDropdown]);

  // Handle amount input change
  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (value && !isNaN(Number(value))) {
      const usdAmount = Number(value) * selectedCrypto.price;
      setUsdValue(usdAmount.toFixed(2));
    } else {
      setUsdValue('');
    }
  };

  // Handle USD value input change
  const handleUsdValueChange = (value: string) => {
    setUsdValue(value);
    if (value && !isNaN(Number(value))) {
      const cryptoAmount = Number(value) / selectedCrypto.price;
      setAmount(cryptoAmount.toFixed(8));
    } else {
      setAmount('');
    }
  };

  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    const tradeAction = tradeType === 'buy' ? 'Buy' : 'Sell';
    const cryptoAmount = parseFloat(amount).toFixed(8);
    const usdAmount = parseFloat(usdValue).toFixed(2);
    const rate = formatPrice(selectedCrypto.price);
    
    return `🚀 *Crypto Exchange Order Request*

📋 *Order Details:*
• Action: ${tradeAction} ${selectedCrypto.name} (${selectedCrypto.symbol})
• Amount: ${cryptoAmount} ${selectedCrypto.symbol}
• Value: $${usdAmount}
• Rate: ${rate}

💼 *Trade Type:* ${tradeType.toUpperCase()}

Please confirm this order and provide payment instructions. Thank you!`;
  };

  // Handle trade execution via WhatsApp
  const handleTrade = async () => {
    if (!amount || !usdValue || parseFloat(usdValue) < MINIMUM_TRADE) return;

    setIsLoading(true);
    setOrderStatus('idle');

    // Simulate brief processing
    setTimeout(() => {
      const message = generateWhatsAppMessage();
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      setOrderStatus('success');
      setIsLoading(false);
      
      // Reset form after showing success message
      setTimeout(() => {
        setAmount('');
        setUsdValue('');
        setOrderStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <div className={`min-h-screen ${theme.background} py-6`}>
      <div className="max-w-md mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={handleBack}
            className={`flex items-center justify-center w-10 h-10 rounded-xl ${theme.surface} hover:${theme.surfaceHover} ${theme.textSecondary} hover:${theme.text} transition-all duration-200 border ${theme.border} shadow-sm`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className={`text-xl font-bold ${theme.text}`}>Exchange</h1>
            <p className={`text-sm ${theme.textSecondary}`}>Trade cryptocurrencies</p>
          </div>
        </div>

        {/* Trade Type Selector */}
        <div className={`${theme.surface} rounded-2xl p-3 border shadow-sm`}>
          <div className="flex bg-gray-700/30 rounded-xl p-1 space-x-1">
            <button
              onClick={() => setTradeType('buy')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                tradeType === 'buy'
                  ? `bg-gradient-to-r ${theme.primary} text-black shadow-sm`
                  : `${theme.textSecondary} hover:${theme.text} hover:bg-gray-600/30`
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Buy</span>
              </div>
            </button>
            <button
              onClick={() => setTradeType('sell')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                tradeType === 'sell'
                  ? `bg-gradient-to-r ${theme.primary} text-black shadow-sm`
                  : `${theme.textSecondary} hover:${theme.text} hover:bg-gray-600/30`
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingDown className="w-4 h-4" />
                <span>Sell</span>
              </div>
            </button>
          </div>
        </div>

        {/* Main Trading Card */}
        <div className={`${theme.surface} rounded-2xl p-6 border shadow-sm`}>
          {/* Crypto Selection */}
          <div className="mb-6">
            <label className={`block text-sm font-medium ${theme.textSecondary} mb-3`}>
              Select Cryptocurrency
            </label>
            <div className="relative crypto-dropdown">
              <button
                onClick={() => setShowCryptoDropdown(!showCryptoDropdown)}
                className={`w-full flex items-center justify-between p-4 rounded-xl ${theme.input} hover:bg-gray-700/30 transition-all duration-200 ${theme.text} border focus:outline-none focus:ring-2 focus:ring-amber-500/20`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${theme.primary} rounded-full flex items-center justify-center text-black text-sm font-bold shadow-sm`}>
                    {selectedCrypto.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">{selectedCrypto.symbol}</p>
                    <p className={`text-sm ${theme.textSecondary}`}>{selectedCrypto.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className={`font-semibold ${theme.text}`}>{formatPrice(selectedCrypto.price)}</p>
                    <p className={`text-sm ${selectedCrypto.change24h >= 0 ? theme.success : theme.error}`}>
                      {selectedCrypto.change24h >= 0 ? '+' : ''}{selectedCrypto.change24h.toFixed(2)}%
                    </p>
                  </div>
                  <ChevronDown className={`w-5 h-5 ${theme.textMuted} transition-transform duration-200 ${showCryptoDropdown ? 'rotate-180' : ''}`} />
                </div>
              </button>
              
              {showCryptoDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-2xl z-20 max-h-80 overflow-y-auto">
                  {availableCryptos.map((crypto) => (
                    <button
                      key={crypto.id}
                      onClick={() => {
                        setSelectedCrypto(crypto);
                        setShowCryptoDropdown(false);
                        setAmount('');
                        setUsdValue('');
                      }}
                      className={`w-full flex items-center justify-between p-4 hover:bg-gray-700/40 transition-all duration-200 text-left first:rounded-t-xl last:rounded-b-xl ${
                        selectedCrypto.id === crypto.id ? 'bg-amber-500/10 border-l-2 border-amber-500' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-gradient-to-br ${theme.primary} rounded-full flex items-center justify-center text-black text-xs font-bold`}>
                          {crypto.icon}
                        </div>
                        <div>
                          <p className={`font-medium ${theme.text}`}>{crypto.symbol}</p>
                          <p className={`text-sm ${theme.textSecondary}`}>{crypto.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${theme.text}`}>{formatPrice(crypto.price)}</p>
                        <p className={`text-sm ${crypto.change24h >= 0 ? theme.success : theme.error}`}>
                          {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Amount Inputs */}
          <div className="space-y-4 mb-6">
            {/* Crypto Amount */}
            <div>
              <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                {tradeType === 'buy' ? 'You will receive' : 'Amount to sell'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="0.00000000"
                  className={`w-full p-4 pr-16 rounded-xl ${theme.input} ${theme.text} placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <span className={`text-sm font-semibold ${theme.textSecondary}`}>
                    {selectedCrypto.symbol}
                  </span>
                </div>
              </div>
            </div>

            {/* Conversion Icon */}
            <div className="flex justify-center">
              <div className={`w-10 h-10 rounded-full bg-gray-700/40 flex items-center justify-center ${theme.textMuted} border ${theme.border}`}>
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </div>

            {/* USD Amount */}
            <div>
              <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                {tradeType === 'buy' ? 'You will pay' : 'You will receive'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={usdValue}
                  onChange={(e) => handleUsdValueChange(e.target.value)}
                  placeholder="0.00"
                  className={`w-full p-4 pl-12 rounded-xl ${theme.input} ${theme.text} placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <DollarSign className={`w-4 h-4 ${theme.textMuted}`} />
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className={`text-xs ${theme.textMuted}`}>
                  Minimum trade: ${MINIMUM_TRADE.toLocaleString()}
                </p>
                {parseFloat(usdValue) > 0 && parseFloat(usdValue) < MINIMUM_TRADE && (
                  <p className={`text-xs ${theme.error}`}>
                    Below minimum
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          {amount && usdValue && parseFloat(usdValue) >= MINIMUM_TRADE && (
            <div className={`bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-xl p-4 mb-6 border border-amber-500/20`}>
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="w-4 h-4 text-amber-400" />
                <h4 className={`text-sm font-semibold ${theme.text}`}>Order Summary</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={`text-sm ${theme.textSecondary}`}>Rate:</span>
                  <span className={`text-sm ${theme.text} font-medium`}>
                    1 {selectedCrypto.symbol} = {formatPrice(selectedCrypto.price)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${theme.textSecondary}`}>Amount:</span>
                  <span className={`text-sm ${theme.text} font-medium`}>
                    {parseFloat(amount).toFixed(8)} {selectedCrypto.symbol}
                  </span>
                </div>
                <div className="h-px bg-gray-600/30 my-2"></div>
                <div className="flex justify-between">
                  <span className={`text-sm font-semibold ${theme.text}`}>Total:</span>
                  <span className={`text-sm font-semibold ${theme.text}`}>
                    ${parseFloat(usdValue).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Notice */}
          <div className={`bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl p-4 mb-6 border border-green-500/20`}>
            <div className="flex items-start space-x-3">
              <MessageCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div className="flex-1">
                <h4 className={`text-sm font-semibold text-green-400 mb-1`}>Trade via WhatsApp</h4>
                <p className={`text-xs ${theme.textSecondary}`}>
                  All trades are processed through WhatsApp for security and personalized service. 
                  Click "Continue to WhatsApp" to finalize your order with our trading team.
                </p>
              </div>
            </div>
          </div>

          {/* Trade Button */}
          <button
            onClick={handleTrade}
            disabled={!amount || !usdValue || isLoading || parseFloat(usdValue) < MINIMUM_TRADE}
            className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r ${theme.whatsapp} hover:from-green-600 hover:to-green-700 text-white`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Preparing Order...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Continue to WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            )}
          </button>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[250, 500, 1000].map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => handleUsdValueChange(quickAmount.toString())}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${theme.textSecondary} hover:${theme.text} bg-gray-700/20 hover:bg-gray-600/30 border ${theme.border}`}
              >
                ${quickAmount}
              </button>
            ))}
          </div>
        </div>

        {/* Order Status */}
        {orderStatus !== 'idle' && (
          <div className={`${theme.surface} rounded-2xl p-5 border shadow-sm ${
            orderStatus === 'success' 
              ? 'border-green-500/30 bg-green-500/10' 
              : 'border-red-500/30 bg-red-500/10'
          }`}>
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                orderStatus === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}>
                {orderStatus === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${orderStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {orderStatus === 'success' ? 'Redirected to WhatsApp!' : 'Order Failed'}
                </p>
                <p className={`text-sm ${theme.textSecondary} mt-1`}>
                  {orderStatus === 'success' 
                    ? `Your ${tradeType} order for ${parseFloat(amount).toFixed(8)} ${selectedCrypto.symbol} has been sent to our WhatsApp team. Please complete the transaction there.`
                    : 'Please check your internet connection and try again, or contact support if the issue persists.'
                  }
                </p>
                {orderStatus === 'success' && (
                  <div className={`mt-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20`}>
                    <p className={`text-xs text-green-400 font-medium`}>
                      💡 Tip: Save our WhatsApp number for faster future trades!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeComponent;