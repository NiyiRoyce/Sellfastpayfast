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

// Theme configuration
const theme = {
  primary: 'from-[#FEFD0C] to-[#FEFD0C]/90',
  primaryHover: 'from-[#FEFD0C]/90 to-[#FEFD0C]',
  primaryColor: '#FEFD0C',
  secondary: 'from-gray-800 to-gray-900',
  secondaryHover: 'from-gray-700 to-gray-800',
  background: 'bg-black',
  surface: 'bg-black/60 backdrop-blur-xl border-[#FEFD0C]/10',
  surfaceHover: 'bg-black/80',
  text: 'text-white',
  textSecondary: 'text-gray-300',
  textMuted: 'text-gray-400',
  border: 'border-[#FEFD0C]/10',
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-[#FEFD0C]',
  whatsapp: 'from-green-500 to-green-600',
  input: 'bg-black/40 border-[#FEFD0C]/20 focus:border-[#FEFD0C] focus:ring-[#FEFD0C]/20'
} as const;

const availableCryptos: CryptoCurrency[] = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: 118000, change24h: -0.5, icon: '₿' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: 3698, change24h: -0.2, icon: 'Ξ' },
  { id: 'bnb', symbol: 'BNB', name: 'Binance Coin', price: 700, change24h: -1.2, icon: 'Ⓑ' },
  { id: 'xrp', symbol: 'XRP', name: 'XRP', price: 3.08, change24h: -6.3, icon: 'X' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', price: 160.58, change24h: -4.6, icon: '◎' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano', price: 0.746, change24h: -0.2, icon: '₳' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', price: 0.322, change24h: -7.4, icon: 'Ð' },
  { id: 'tron', symbol: 'TRX', name: 'TRON', price: 0.223, change24h: 0.9, icon: '⚡' },
  { id: 'usdt', symbol: 'USDT', name: 'Tether', price: 1.0, change24h: 0.0, icon: '₮' },
  { id: 'usdc', symbol: 'USDC', name: 'USD Coin', price: 1.0, change24h: 0.0, icon: '$' },
  { id: 'avalanche', symbol: 'AVAX', name: 'Avalanche', price: 25.0, change24h: -1.2, icon: '🔺' }
];

// Utility functions
const formatPrice = (price: number): string => {
  return price >= 1
    ? `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `$${price.toFixed(6)}`;
};

const ExchangeComponent: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>(availableCryptos);
  const [selectedCryptoId, setSelectedCryptoId] = useState<string>(availableCryptos[0].id);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState<string>('');
  const [usdValue, setUsdValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showCryptoDropdown, setShowCryptoDropdown] = useState(false);

  const MINIMUM_TRADE = 250;
  const WHATSAPP_NUMBER = '+447721863850';

  // Get the currently selected crypto from the cryptos array (always in sync)
  const selectedCrypto = cryptos.find(c => c.id === selectedCryptoId) || cryptos[0];

  // Fetch live prices
  useEffect(() => {
    const ids = availableCryptos.map(c => c.id).join(',');
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&price_change_percentage=24h`
    )
      .then(res => res.json())
      .then((data: any[]) => {
        const updated: CryptoCurrency[] = availableCryptos.map(c => {
          const match = data.find(d => d.id === c.id);
          if (match) {
            return {
              ...c,
              price: match.current_price,
              change24h: match.price_change_percentage_24h ?? 0
            };
          }
          return c;
        });
        setCryptos(updated);
        // No need to update selectedCrypto separately - it's derived from cryptos
      })
      .catch(console.error);
  }, []);

  const sanitizeCryptoInput = (v: string) => {
    const num = parseFloat(v);
    if (!isFinite(num) || num < 0) return '';
    return num.toFixed(8);
  };

  const sanitizeUsdInput = (v: string) => {
    const num = parseFloat(v);
    if (!isFinite(num) || num < 0) return '';
    return num.toFixed(2);
  };

  const handleAmountChange = (value: string) => {
    const clean = sanitizeCryptoInput(value);
    setAmount(clean);

    const num = parseFloat(clean);
    if (!isNaN(num)) {
      const usd = num * selectedCrypto.price;
      setUsdValue(sanitizeUsdInput(usd.toString()));
    } else {
      setUsdValue('');
    }
  };

  const handleUsdValueChange = (value: string) => {
    const clean = sanitizeUsdInput(value);
    setUsdValue(clean);

    const num = parseFloat(clean);
    if (!isNaN(num)) {
      const crypto = num / selectedCrypto.price;
      setAmount(sanitizeCryptoInput(crypto.toString()));
    } else {
      setAmount('');
    }
  };

  const generateWhatsAppMessage = () => {
    const action = tradeType === 'buy' ? 'Buy' : 'Sell';
    return `🚀 *Crypto Exchange Order Request*

📋 *Order Details:*
• Action: ${action} ${selectedCrypto.name} (${selectedCrypto.symbol})
• Amount: ${parseFloat(amount).toFixed(8)} ${selectedCrypto.symbol}
• Value: $${parseFloat(usdValue).toFixed(2)}
• Rate: ${formatPrice(selectedCrypto.price)}

💼 *Trade Type:* ${tradeType.toUpperCase()}

Please confirm this order and provide payment instructions. Thank you!`;
  };

  const handleTrade = () => {
    if (!amount || !usdValue || parseFloat(usdValue) < MINIMUM_TRADE) return;

    setIsLoading(true);
    setOrderStatus('idle');

    setTimeout(() => {
      const msg = generateWhatsAppMessage();
      const url = `https://wa.me/${WHATSAPP_NUMBER.slice(1)}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
      setOrderStatus('success');
      setIsLoading(false);

      setTimeout(() => {
        setAmount('');
        setUsdValue('');
        setOrderStatus('idle');
      }, 5000);
    }, 1500);
  };

  const handleBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = '/';
  };

  return (
    <div className={`min-h-screen ${theme.background} py-6`} style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
    }}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FEFD0C]/10 via-transparent to-[#FEFD0C]/10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FEFD0C]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FEFD0C]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md mx-auto px-4 space-y-6 relative z-10">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
         <button
  onClick={handleBack}
  className={`flex items-center justify-center p-2 rounded-full ${theme.surface} hover:${theme.surfaceHover} ${theme.textSecondary} hover:${theme.text} transition-all duration-300 border shadow-lg hover:shadow-[#FEFD0C]/20 hover:scale-105`}
>
  <ArrowLeft className="w-6 h-6" />
</button>

          <div>
            <h1 className={`text-2xl font-extrabold tracking-tight flex-1 text-center md:text-left ${theme.text}`}>Exchange</h1>
            <p className={`text-sm ${theme.textSecondary}`}>Trade cryptocurrencies</p>
          </div>
        </div>

        {/* Trade Type Selector */}
        <div className={`${theme.surface} rounded-2xl p-4 border shadow-2xl shadow-black/50`}>
          <div className="flex bg-black/40 rounded-xl p-1 space-x-1 border border-[#FEFD0C]/10">
            <button
              onClick={() => setTradeType('buy')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
                tradeType === 'buy'
                  ? `bg-gradient-to-r ${theme.primary} text-black shadow-lg shadow-[#FEFD0C]/20 scale-105`
                  : `${theme.textSecondary} hover:${theme.text} hover:bg-[#FEFD0C]/10 hover:scale-105`
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Buy</span>
              </div>
            </button>
            <button
              onClick={() => setTradeType('sell')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
                tradeType === 'sell'
                  ? `bg-gradient-to-r ${theme.primary} text-black shadow-lg shadow-[#FEFD0C]/20 scale-105`
                  : `${theme.textSecondary} hover:${theme.text} hover:bg-[#FEFD0C]/10 hover:scale-105`
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
        <div className={`${theme.surface} rounded-2xl p-6 border shadow-2xl shadow-black/50`}>
          {/* Crypto Selection */}
          <div className="mb-6">
            <label className={`block text-sm font-medium ${theme.textSecondary} mb-3`}>
              Select Cryptocurrency
            </label>
            <div className="relative crypto-dropdown">
              <button
                onClick={() => setShowCryptoDropdown(!showCryptoDropdown)}
                className={`w-full flex items-center justify-between p-4 rounded-xl ${theme.input} hover:bg-black/60 transition-all duration-300 ${theme.text} border focus:outline-none focus:ring-2 focus:ring-[#FEFD0C]/20 hover:shadow-lg hover:shadow-[#FEFD0C]/10`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${theme.primary} rounded-full flex items-center justify-center text-black text-sm font-bold shadow-lg shadow-[#FEFD0C]/20`}>
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
                  <ChevronDown className={`w-5 h-5 ${theme.textMuted} transition-transform duration-300 ${showCryptoDropdown ? 'rotate-180' : ''}`} />
                </div>
              </button>
              
              {showCryptoDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl rounded-xl border border-[#FEFD0C]/20 shadow-2xl shadow-black/50 z-20 max-h-80 overflow-y-auto">
                  {cryptos.map((crypto) => (
                    <button
                      key={crypto.id}
                      onClick={() => {
                        setSelectedCryptoId(crypto.id);
                        setShowCryptoDropdown(false);
                        setAmount('');
                        setUsdValue('');
                      }}
                      className={`w-full flex items-center justify-between p-4 hover:bg-[#FEFD0C]/10 transition-all duration-300 text-left first:rounded-t-xl last:rounded-b-xl ${
                        selectedCryptoId === crypto.id ? 'bg-[#FEFD0C]/10 border-l-2 border-[#FEFD0C]' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-gradient-to-br ${theme.primary} rounded-full flex items-center justify-center text-black text-xs font-bold shadow-sm`}>
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
                  className={`w-full p-4 pr-16 rounded-xl ${theme.input} ${theme.text} placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-lg hover:shadow-[#FEFD0C]/10`}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <span className={`text-sm font-semibold text-[#FEFD0C]`}>
                    {selectedCrypto.symbol}
                  </span>
                </div>
              </div>
            </div>

            {/* Conversion Icon */}
            <div className="flex justify-center">
              <div className={`w-10 h-10 rounded-full bg-black/60 flex items-center justify-center ${theme.textMuted} border border-[#FEFD0C]/20 shadow-lg`}>
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
                  className={`w-full p-4 pl-12 rounded-xl ${theme.input} ${theme.text} placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-lg hover:shadow-[#FEFD0C]/10`}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <DollarSign className={`w-4 h-4 text-[#FEFD0C]`} />
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
            <div className={`bg-gradient-to-r from-[#FEFD0C]/10 to-[#FEFD0C]/5 rounded-xl p-4 mb-6 border border-[#FEFD0C]/20 shadow-lg shadow-[#FEFD0C]/10`}>
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="w-4 h-4 text-[#FEFD0C]" />
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
                <div className="h-px bg-[#FEFD0C]/20 my-2"></div>
                <div className="flex justify-between">
                  <span className={`text-sm font-semibold ${theme.text}`}>Total:</span>
                  <span className={`text-sm font-semibold text-[#FEFD0C]`}>
                    ${parseFloat(usdValue).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Notice */}
          <div className={`bg-gradient-to-r from-green-500/10 to-green-600/5 rounded-xl p-4 mb-6 border border-green-500/20 shadow-lg`}>
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
            className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r ${theme.whatsapp} hover:from-green-600 hover:to-green-700 text-white hover:scale-105`}
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
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${theme.textSecondary} hover:${theme.text} bg-black/40 hover:bg-[#FEFD0C]/10 border border-[#FEFD0C]/20 hover:border-[#FEFD0C]/40 hover:scale-105 hover:shadow-lg hover:shadow-[#FEFD0C]/10`}
              >
                ${quickAmount}
              </button>
            ))}
          </div>
        </div>

        {/* Order Status */}
        {orderStatus !== 'idle' && (
          <div className={`${theme.surface} rounded-2xl p-5 border shadow-2xl shadow-black/50 ${
            orderStatus === 'success' 
              ? 'border-green-500/30 bg-green-500/5' 
              : 'border-red-500/30 bg-red-500/5'
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