import React, { useState, useEffect } from 'react';
import {
  Download,
  BookOpen,
  Clock,
  Shield,
  CreditCard,
  Truck,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  Globe,
  Lock,
  Eye,
  Heart,
  Share2,
  Package,
  ArrowLeft,
  QrCode,
  Copy,
  RefreshCw,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

// Theme configuration
const theme = {
  primary: '#FEFD0C',
  primaryBg: 'bg-[#FEFD0C]',
  primaryHover: 'hover:bg-[#FEFD0C]/90',
  background: 'bg-black',
  surface: 'bg-neutral-900',
  surfaceHover: 'hover:bg-neutral-800',
  card: 'bg-neutral-900',
  cardHover: 'hover:bg-neutral-800',
  text: 'text-white',
  textSecondary: 'text-neutral-300',
  textMuted: 'text-neutral-400',
  border: 'border-neutral-700',
} as const;

// Toast system (mock implementation)
const toast = {
  loading: (msg: string) => console.log('Loading:', msg),
  success: (msg: string) => console.log('Success:', msg),
  error: (msg: string) => console.log('Error:', msg),
};

const Toaster: React.FC<{ position: string }> = () => null;

// Types
type PaymentStatus = 'idle' | 'initiating' | 'pending' | 'confirmed' | 'expired' | 'error';

interface PaymentData {
  paymentId: string;
  address: string;
  amount: string;
  btcAmount: string;
  qrCode?: string;
  expiresAt: string;
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}

// Yellow Button Component
const YellowButton: React.FC<{
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  disabled?: boolean;
}> = ({ icon, text, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full flex items-center justify-center gap-3 py-4 px-6 text-lg font-bold rounded-2xl ${
      theme.primaryBg
    } ${theme.primaryHover} text-black border-2 border-[#FEFD0C] transition-all duration-200 ${
      disabled ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-[#FEFD0C]/20'
    }`}
  >
    {icon}
    <span>{text}</span>
  </button>
);

// Feature Component
const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="flex items-start gap-3 p-4 rounded-lg bg-neutral-800/50 border border-neutral-700">
    <div className="w-8 h-8 rounded-lg bg-[#FEFD0C] flex items-center justify-center text-black flex-shrink-0">
      {icon}
    </div>
    <div className="flex-1">
      <h4 className={`${theme.text} font-semibold mb-1 text-sm`}>{title}</h4>
      <p className={`${theme.textMuted} text-xs leading-relaxed`}>{description}</p>
    </div>
  </div>
);

// Stats Card Component
const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label }) => (
  <div
    className={`${theme.card} rounded-xl p-4 ${theme.border} border text-center ${theme.cardHover} transition-all duration-200`}
  >
    <Icon className="w-6 h-6 text-[#FEFD0C] mx-auto mb-2" />
    <p className={`${theme.text} text-lg font-bold mb-1`}>{value}</p>
    <p className={`${theme.textMuted} text-xs font-medium uppercase tracking-wide`}>{label}</p>
  </div>
);

// Constants
const BOOK_ID = 'make-money-while-you-sleep';
const POLLING_INTERVAL = 10000; // 10 seconds

const stats = [
  { icon: BookOpen, value: '324', label: 'Pages' },
  { icon: Clock, value: '6‑8h', label: 'Read Time' },
  { icon: Award, value: '#1', label: 'Bestseller' },
];

// Main Component
const EBookStore: React.FC = () => {
  // State
  const [selectedOption, setSelectedOption] = useState<'digital' | 'physical'>('digital');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Timer countdown effect
  useEffect(() => {
    if (paymentData && paymentStatus === 'pending') {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const expiry = new Date(paymentData.expiresAt).getTime();
        const remaining = expiry - now;
        
        if (remaining <= 0) {
          setTimeLeft(0);
          setPaymentStatus('expired');
          clearInterval(interval);
        } else {
          setTimeLeft(Math.floor(remaining / 1000));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [paymentData, paymentStatus]);

  // Payment status polling effect
  useEffect(() => {
    if (paymentStatus === 'pending' && paymentData?.paymentId) {
      const controller = new AbortController();

      const poll = () => {
        checkPaymentStatus(paymentData.paymentId, controller.signal);
      };

      const interval = setInterval(poll, POLLING_INTERVAL);
      poll(); // Call immediately

      return () => {
        clearInterval(interval);
        controller.abort();
      };
    }
  }, [paymentStatus, paymentData]);

  // Helper functions
  const checkPaymentStatus = async (paymentId: string, signal?: AbortSignal) => {
    try {
      const response = await fetch(`/api/payments/status/${paymentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const statusData = await response.json();

      if (statusData.status === 'confirmed') {
        setPaymentStatus('confirmed');
        toast.success('Payment confirmed! Unlocking your eBook...');
        await unlockEbook(paymentId);
      } else if (statusData.status === 'expired') {
        setPaymentStatus('expired');
        toast.error('Payment expired. Please try again.');
      }
    } catch (error) {
      if ((error as Error)?.name === 'AbortError') return;
      console.error('Status check error:', error);
      toast.error('Failed to check payment status');
    }
  };

  const unlockEbook = async (paymentId: string) => {
    try {
      const response = await fetch('/api/unlock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentId, bookId: BOOK_ID }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const unlockData = await response.json();
      setDownloadUrl(unlockData.downloadUrl);
      toast.success('eBook unlocked! Download link ready.');
    } catch (error) {
      console.error('Unlock error:', error);
      toast.error('Failed to unlock eBook. Please contact support.');
    }
  };

  const handlePurchase = async (type: 'digital' | 'physical') => {
    setLoading(true);
    setPaymentStatus('initiating');
    
    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: BOOK_ID,
          type,
          amount: type === 'digital' ? '50.00' : '150.00',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setPaymentData(data);
      setPaymentStatus('pending');
      
      // Set initial timer
      const expiryTime = new Date(data.expiresAt).getTime();
      const now = new Date().getTime();
      setTimeLeft(Math.floor((expiryTime - now) / 1000));
      
      toast.success('Payment address generated. Please send Bitcoin to complete your purchase.');
    } catch (error) {
      console.error('Purchase error:', error);
      setPaymentStatus('error');
      toast.error('Failed to create payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    if (!navigator?.clipboard) {
      toast.error('Clipboard not supported');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const resetPayment = () => {
    setPaymentStatus('idle');
    setPaymentData(null);
    setTimeLeft(0);
    setDownloadUrl(null);
  };

  const handleGoBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = '/';
  };

  // Render
  return (
    <div className={`${theme.background} min-h-screen`} style={{ fontFamily: '"Inter", sans-serif' }}>
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center">
          <button
            onClick={handleGoBack}
            aria-label="Go back"
            className={`p-3 rounded-full ${theme.card} ${theme.cardHover} ${theme.border} border transition-shadow duration-300 shadow-lg hover:shadow-[#FEFD0C]/20 text-white`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="ml-4 text-2xl font-extrabold text-white">Purchase E-book</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Book Preview & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Book Preview */}
            <div className={`${theme.card} rounded-2xl p-8 ${theme.border} border`}>
              <div className="flex justify-center mb-6">
                <div className="w-48 h-64 bg-black rounded-xl border-2 border-[#FEFD0C] p-5 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-[#FEFD0C] rotate-45 translate-x-4 -translate-y-4" />
                  <div className="relative z-10 text-center">
                    <h3 className="text-lg font-black text-[#FEFD0C] mb-2">MAKE MONEY</h3>
                    <h4 className="text-sm font-bold text-white mb-4">WHILE YOU SLEEP</h4>
                    <div className="mx-auto w-12 h-0.5 bg-[#FEFD0C]" />
                  </div>
                  <div className="relative z-10 text-center">
                    <p className="text-[#FEFD0C] font-black text-lg">BNAIRA</p>
                    <p className="text-neutral-300 text-xs mt-1">Financial Freedom Guide</p>
                  </div>
                </div>
              </div>
              <button
                aria-label="Preview sample pages"
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 ${theme.surface} ${theme.surfaceHover} rounded-xl ${theme.border} border transition-colors duration-200`}
              >
                <Eye className="w-4 h-4 text-[#FEFD0C]" />
                <span className={`${theme.text} font-medium text-sm`}>Preview Sample Pages</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            {/* Testimonials */}
            <div className={`${theme.card} rounded-2xl p-6 ${theme.border} border`}>
              <h4 className="flex items-center gap-2 mb-4 text-sm font-semibold text-white">
                <Users className="w-4 h-4 text-[#FEFD0C]" />
                What Readers Are Saying
              </h4>
              {[
                {
                  quote: 'Changed my entire approach to passive income. Already making $2k/month!',
                  author: '— Sarah M., Entrepreneur',
                },
                {
                  quote: 'The strategies in this book are pure gold. Worth every penny and more.',
                  author: '— Michael R., Investor',
                },
              ].map((review, idx) => (
                <div key={idx} className="border-l-2 border-[#FEFD0C] pl-4 py-1 mb-3 last:mb-0">
                  <p className={`${theme.textSecondary} text-sm leading-relaxed mb-2`}>{review.quote}</p>
                  <p className={`${theme.textMuted} text-xs font-medium`}>{review.author}</p>
                </div>
              ))}
            </div>

            {/* Action Icons */}
            <div className="flex items-center justify-center gap-4">
              <button
                aria-label="Favorite"
                className={`p-3 rounded-xl ${theme.card} ${theme.cardHover} ${theme.border} border transition-colors duration-200`}
              >
                <Heart className="w-5 h-5 text-[#FEFD0C]" />
              </button>
              <button
                aria-label="Share"
                className={`p-3 rounded-xl ${theme.card} ${theme.cardHover} ${theme.border} border transition-colors duration-200`}
              >
                <Share2 className="w-5 h-5 text-[#FEFD0C]" />
              </button>
            </div>
          </div>

          {/* Right Column - Purchase Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Format Selector */}
            <div className={`${theme.card} rounded-2xl p-4 ${theme.border} border`}>
              <div className="grid grid-cols-2 gap-3">
                {(['digital', 'physical'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedOption(type)}
                    aria-pressed={selectedOption === type}
                    className={`py-3 px-4 rounded-xl font-semibold text-sm flex flex-col items-center gap-2 transition-colors duration-200 ${
                      selectedOption === type
                        ? `${theme.primaryBg} text-black`
                        : `${theme.text} bg-neutral-800 hover:bg-neutral-700`
                    }`}
                  >
                    {type === 'digital' ? <Download className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                    <span>{type === 'digital' ? 'Digital Copy' : 'Physical Copy'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Digital Purchase */}
            {selectedOption === 'digital' && (
              <div className={`${theme.card} rounded-2xl p-6 ${theme.border} border space-y-6`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`text-2xl font-bold ${theme.text} mb-2`}>Digital eBook</h3>
                    <p className={`${theme.textSecondary} text-sm`}>Instant download after payment confirmation</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl font-black ${theme.text}`}>$50</span>
                      <span className={`${theme.textMuted} text-lg line-through`}>$97</span>
                    </div>
                    <span className="mt-2 inline-block bg-green-500 text-xs text-white font-bold px-3 py-1 rounded-full">
                      48% OFF
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Feature icon={<Download className="w-4 h-4" />} title="Instant Download" description="Get immediate access to PDF, EPUB, and MOBI formats" />
                  <Feature icon={<Globe className="w-4 h-4" />} title="Read Anywhere" description="Compatible with all devices and e‑readers" />
                  <Feature icon={<Shield className="w-4 h-4" />} title="Lifetime Access" description="Download and keep forever with free updates" />
                  <Feature icon={<Lock className="w-4 h-4" />} title="Secure Payment" description="Bitcoin payment with blockchain confirmation" />
                </div>

                {/* Payment States */}
                {paymentStatus === 'idle' && (
                  <YellowButton
                    icon={<CreditCard className="w-5 h-5" />}
                    text={loading ? 'Processing...' : 'Buy Digital Copy – $50'}
                    onClick={() => handlePurchase('digital')}
                    disabled={loading || paymentStatus !== 'idle'}
                  />
                )}

                {/* Bitcoin Payment Details */}
                {paymentStatus === 'pending' && paymentData && (
                  <div className="space-y-4">
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-orange-400" />
                        <span 
                          className="text-orange-400 font-semibold text-sm"
                          aria-live="polite"
                        >
                          Payment expires in {formatTime(timeLeft)}
                        </span>
                      </div>
                      <p className="text-neutral-300 text-xs">
                        Send exactly {paymentData.btcAmount} BTC to the address below
                      </p>
                    </div>

                    {/* QR Code Display */}
                    {paymentData.qrCode && (
                      <div className="text-center">
                        <div className="inline-block p-4 bg-white rounded-xl">
                          <img src={paymentData.qrCode} alt="Bitcoin Payment QR Code" className="w-48 h-48" />
                        </div>
                        <p className="text-xs text-neutral-400 mt-2">Scan with your Bitcoin wallet</p>
                      </div>
                    )}

                    {/* Payment Details */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-400 mb-1">Bitcoin Address</label>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 p-3 bg-neutral-800 rounded-lg text-xs text-white break-all">
                            {paymentData.address}
                          </code>
                          <button
                            onClick={() => copyToClipboard(paymentData.address)}
                            className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                            aria-label="Copy address"
                          >
                            <Copy className="w-4 h-4 text-[#FEFD0C]" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-400 mb-1">Amount (BTC)</label>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 p-3 bg-neutral-800 rounded-lg text-xs text-white">
                            {paymentData.btcAmount}
                          </code>
                          <button
                            onClick={() => copyToClipboard(paymentData.btcAmount)}
                            className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                            aria-label="Copy amount"
                          >
                            <Copy className="w-4 h-4 text-[#FEFD0C]" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div 
                      className="flex items-center justify-center gap-2 text-sm"
                      aria-live="polite"
                    >
                      <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                      <span className="text-neutral-400">Waiting for payment confirmation...</span>
                    </div>
                  </div>
                )}

                {/* Payment Confirmed */}
                {paymentStatus === 'confirmed' && downloadUrl && (
                  <div className="text-center space-y-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-green-400 mb-2">Payment Confirmed!</h4>
                      <p className="text-neutral-300 text-sm">Your eBook is ready for download</p>
                    </div>

                    <YellowButton
                      icon={<Download className="w-5 h-5" />}
                      text="Download Your eBook"
                      onClick={() => {
                        if (downloadUrl) {
                          window.open(downloadUrl, '_blank', 'noopener,noreferrer');
                        }
                      }}
                    />
                  </div>
                )}

                {/* Payment Expired */}
                {paymentStatus === 'expired' && (
                  <div className="text-center space-y-4">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                      <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-red-400 mb-2">Payment Expired</h4>
                      <p className="text-neutral-300 text-sm">The payment window has closed. Please try again.</p>
                    </div>

                    <YellowButton
                      icon={<RefreshCw className="w-5 h-5" />}
                      text="Try Again"
                      onClick={resetPayment}
                    />
                  </div>
                )}

                {/* Payment Error */}
                {paymentStatus === 'error' && (
                  <div className="text-center space-y-4">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                      <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-red-400 mb-2">Payment Error</h4>
                      <p className="text-neutral-300 text-sm">Something went wrong. Please try again or contact support.</p>
                    </div>

                    <YellowButton
                      icon={<RefreshCw className="w-5 h-5" />}
                      text="Try Again"
                      onClick={resetPayment}
                    />
                  </div>
                )}

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className={`${theme.textMuted}`}>Secure Bitcoin payment with 30-day guarantee</span>
                </div>
              </div>
            )}

            {/* Physical Copy */}
            {selectedOption === 'physical' && (
              <div className={`${theme.card} rounded-2xl p-6 ${theme.border} border space-y-6`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`text-2xl font-bold ${theme.text} mb-2`}>Signed Physical Copy</h3>
                    <p className={`${theme.textSecondary} text-sm`}>Premium hardcover with author signature</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-3xl font-black ${theme.text}`}>$150</span>
                    <span className="mt-2 inline-block bg-[#FEFD0C] text-xs text-black font-bold px-3 py-1 rounded-full">
                      FREE SHIPPING
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Feature icon={<Award className="w-4 h-4" />} title="Author Signed" description="Signed by Bnaira + certificate of authenticity" />
                  <Feature icon={<BookOpen className="w-4 h-4" />} title="Premium Hardcover" description="High-quality binding with dust jacket" />
                  <Feature icon={<Truck className="w-4 h-4" />} title="Free Worldwide Shipping" description="Arrives in 5–10 business days" />
                  <Feature icon={<Download className="w-4 h-4" />} title="Digital Copy Included" description="Immediate digital access while shipping" />
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
                  <h4 className="text-yellow-400 font-semibold mb-2">Coming Soon</h4>
                  <p className="text-neutral-300 text-sm">We're preparing the signed hardcovers. Check back soon!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EBookStore;