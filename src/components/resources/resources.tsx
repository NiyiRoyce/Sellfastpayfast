// src/components/EBookStore.tsx
import React, { useState } from 'react';
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
  ArrowLeft
} from 'lucide-react';

// Note: react-hot-toast is not available in this environment
// Using a simple toast implementation instead
const toast = {
  loading: (message: string) => console.log('Loading:', message),
  success: (message: string) => console.log('Success:', message),
  error: (message: string) => console.log('Error:', message),
};

const Toaster: React.FC<{ position: string }> = () => null;

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

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

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

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label }) => (
  <div className={`${theme.card} rounded-xl p-4 ${theme.border} border text-center ${theme.cardHover} transition-all duration-200`}>
    <Icon className="w-6 h-6 text-[#FEFD0C] mx-auto mb-2" />
    <p className={`${theme.text} text-lg font-bold mb-1`}>{value}</p>
    <p className={`${theme.textMuted} text-xs font-medium uppercase tracking-wide`}>{label}</p>
  </div>
);

const stats = [
  { icon: BookOpen, value: '324', label: 'Pages' },
  { icon: Clock, value: '6‑8h', label: 'Read Time' },
  { icon: Award, value: '#1', label: 'Bestseller' },
];

const EBookStore: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<'digital' | 'physical'>('digital');
  const [loading, setLoading] = useState(false);

  const handlePurchase = (type: 'digital' | 'physical') => {
    setLoading(true);
    toast.loading('Processing your purchase...');
    setTimeout(() => {
      setLoading(false);
      toast.success(`🎉 ${type === 'digital' ? 'Digital' : 'Physical'} purchase successful!`);
    }, 1500);
  };

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '/';
      }
    }
  };

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
          {/* Left Column */}
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

            {/* Social Proof */}
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

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selector */}
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

            {/* Digital Option */}
            {selectedOption === 'digital' && (
              <div className={`${theme.card} rounded-2xl p-6 ${theme.border} border space-y-6`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`text-2xl font-bold ${theme.text} mb-2`}>Digital eBook</h3>
                    <p className={`${theme.textSecondary} text-sm`}>Instant download after payment</p>
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

                <div className="grid md:grid-cols-2 gap-4">
                  <Feature icon={<Download className="w-4 h-4" />} title="Instant Download" description="Get immediate access to PDF, EPUB, and MOBI formats" />
                  <Feature icon={<Globe className="w-4 h-4" />} title="Read Anywhere" description="Compatible with all devices and e‑readers" />
                  <Feature icon={<Shield className="w-4 h-4" />} title="Lifetime Access" description="Download and keep forever with free updates" />
                  <Feature icon={<Lock className="w-4 h-4" />} title="Secure Payment" description="256‑bit SSL encryption for safe transactions" />
                </div>

                <button
                  type="button"
                  onClick={() => handlePurchase('digital')}
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-3 py-4 px-6 text-lg font-bold rounded-2xl transition-all duration-200 ${
                    theme.primaryBg
                  } ${theme.primaryHover} text-black border-2 border-[#FEFD0C] ${
                    loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-[#FEFD0C]/20'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{loading ? 'Processing...' : 'Buy Digital Copy – $50'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="flex items-center justify-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className={`${theme.textMuted}`}>30-day money-back guarantee</span>
                </div>
              </div>
            )}

            {/* Physical Option */}
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

                <button
                  type="button"
                  onClick={() => handlePurchase('physical')}
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-3 py-4 px-6 text-lg font-bold rounded-2xl transition-all duration-200 ${
                    theme.primaryBg
                  } ${theme.primaryHover} text-black border-2 border-[#FEFD0C] ${
                    loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-[#FEFD0C]/20'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span>{loading ? 'Processing...' : 'Order Signed Copy – $150'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className={`${theme.textMuted}`}>In stock</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#FEFD0C]" />
                    <span className={`${theme.textMuted}`}>Ships within 24h</span>
                  </div>
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