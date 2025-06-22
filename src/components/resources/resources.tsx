import React, { useState } from 'react';
import {
  Download,
  BookOpen,
  Star,
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

// Refined theme configuration
const theme = {
  primary: '#FEFD0C',
  primaryBg: 'bg-[#FEFD0C]',
  primaryHover: 'hover:bg-[#FEFD0C]/90',
  background: 'bg-black',
  surface: 'bg-neutral-900',
  surfaceHover: 'hover:bg-neutral-800',
  surfaceLight: 'bg-neutral-800',
  card: 'bg-neutral-900',
  cardHover: 'hover:bg-neutral-800',
  text: 'text-white',
  textSecondary: 'text-neutral-300',
  textMuted: 'text-neutral-400',
  textAccent: 'text-[#FEFD0C]',
  border: 'border-neutral-700',
  borderHover: 'hover:border-[#FEFD0C]',
  borderLight: 'border-neutral-800',
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-[#FEFD0C]'
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
      <h4 className={`font-semibold ${theme.text} mb-1 text-sm`}>{title}</h4>
      <p className={`text-xs ${theme.textMuted} leading-relaxed`}>{description}</p>
    </div>
  </div>
);

const EBookStore: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<'digital' | 'physical'>('digital');

  const handlePurchase = (type: 'digital' | 'physical') => {
    console.log(`Purchasing ${type} version`);
    // Simulate purchase process
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      console.log('No history to go back to');
    }
  };

  return (
    <>
      {/* Font imports */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" 
        rel="stylesheet" 
      />
      
      <div className={`min-h-screen ${theme.background} py-8`} style={{
        fontFamily: '"Inter", sans-serif'
      }}>
        <div className="max-w-7xl mx-auto px-6">
           {/* Header with Back Button */}
          <div className="mb-8 flex items-center justify-left">
            <button
              onClick={handleGoBack}
              aria-label="Go back"
              className={`p-3 rounded-full ${theme.card} hover:${theme.cardHover} ${theme.border} border transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-[#FEFD0C]/20`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-extrabold tracking-tight text-white ml-4">
              Purchase E-book
            </h1>
            <div className="w-12"></div> {/* Spacer for centering */}
          </div>
          {/* Header Section */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Book Preview - Left Column */}
            <div className="lg:col-span-1 space-y-6">
              <div className={`${theme.card} rounded-2xl p-8 ${theme.border} border`}>
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    {/* Book Cover - Smaller size */}
                    <div className="w-48 h-64 bg-black rounded-xl border-2 border-[#FEFD0C] flex flex-col justify-between p-5 text-center relative overflow-hidden">
                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-8 h-8 bg-[#FEFD0C] transform rotate-45 translate-x-4 -translate-y-4"></div>
                      
                      <div className="relative z-10">
                        <h3 className="text-lg font-black text-[#FEFD0C] mb-2 tracking-wide">MAKE MONEY</h3>
                        <h4 className="text-sm font-bold text-white mb-4 tracking-wide">WHILE YOU SLEEP</h4>
                        <div className="w-12 h-0.5 bg-[#FEFD0C] mx-auto"></div>
                      </div>
                      
                      <div className="relative z-10">
                        <p className="text-[#FEFD0C] font-black text-lg tracking-wider">BNAIRA</p>
                        <p className="text-neutral-300 text-xs mt-1 font-medium">Financial Freedom Guide</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button className={`w-full flex items-center justify-center gap-2 py-3 px-6 ${theme.surface} ${theme.surfaceHover} rounded-xl transition-all duration-200 ${theme.border} border font-medium text-sm`}>
                  <Eye className="w-4 h-4 text-[#FEFD0C]" />
                  <span>Preview Sample Pages</span>
                </button>
              </div>

              {/* Book Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: BookOpen, value: "324", label: "Pages" },
                  { icon: Clock, value: "6-8h", label: "Read Time" },
                  { icon: Award, value: "#1", label: "Bestseller" }
                ].map((stat, index) => (
                  <div key={index} className={`${theme.card} rounded-xl p-4 ${theme.border} border text-center ${theme.cardHover} transition-all duration-200`}>
                    <stat.icon className="w-6 h-6 text-[#FEFD0C] mx-auto mb-2" />
                    <p className={`text-lg font-bold ${theme.text} mb-1`}>{stat.value}</p>
                    <p className={`text-xs ${theme.textMuted} font-medium uppercase tracking-wide`}>{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Social Proof */}
              <div className={`${theme.card} rounded-2xl p-6 ${theme.border} border`}>
                <h4 className={`font-semibold ${theme.text} mb-4 text-sm flex items-center gap-2`}>
                  <Users className="w-4 h-4 text-[#FEFD0C]" />
                  What Readers Are Saying
                </h4>
                <div className="space-y-4">
                  <div className="border-l-2 border-[#FEFD0C] pl-4 py-1">
                    <p className={`text-sm ${theme.textSecondary} mb-2 leading-relaxed`}>
                      "Changed my entire approach to passive income. Already making $2k/month!"
                    </p>
                    <p className={`text-xs ${theme.textMuted} font-medium`}>— Sarah M., Entrepreneur</p>
                  </div>
                  <div className="border-l-2 border-[#FEFD0C] pl-4 py-1">
                    <p className={`text-sm ${theme.textSecondary} mb-2 leading-relaxed`}>
                      "The strategies in this book are pure gold. Worth every penny and more."
                    </p>
                    <p className={`text-xs ${theme.textMuted} font-medium`}>— Michael R., Investor</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4">
                <button className={`p-3 rounded-xl ${theme.card} ${theme.cardHover} ${theme.border} border transition-all duration-200 hover:scale-105`}>
                  <Heart className="w-5 h-5 text-[#FEFD0C]" />
                </button>
                <button className={`p-3 rounded-xl ${theme.card} ${theme.cardHover} ${theme.border} border transition-all duration-200 hover:scale-105`}>
                  <Share2 className="w-5 h-5 text-[#FEFD0C]" />
                </button>
              </div>
            </div>

            {/* Purchase Options - Right Columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Option Selector */}
              <div className={`${theme.card} rounded-2xl p-4 ${theme.border} border`}>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedOption('digital')}
                    className={`py-3 px-4 rounded-xl transition-all duration-200 font-semibold text-sm flex flex-col items-center gap-2 ${
                      selectedOption === 'digital'
                        ? `${theme.primaryBg} text-black`
                        : `${theme.text} bg-neutral-800 hover:bg-neutral-700`
                    }`}
                  >
                    <Download className="w-5 h-5" />
                    Digital Copy
                  </button>
                  <button
                    onClick={() => setSelectedOption('physical')}
                    className={`py-3 px-4 rounded-xl transition-all duration-200 font-semibold text-sm flex flex-col items-center gap-2 ${
                      selectedOption === 'physical'
                        ? `${theme.primaryBg} text-black`
                        : `${theme.text} bg-neutral-800 hover:bg-neutral-700`
                    }`}
                  >
                    <Package className="w-5 h-5" />
                    Physical Copy
                  </button>
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
                        <span className={`text-lg ${theme.textMuted} line-through`}>$97</span>
                      </div>
                      <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mt-2">
                        48% OFF
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Feature
                      icon={<Download className="w-4 h-4" />}
                      title="Instant Download"
                      description="Get immediate access to PDF, EPUB, and MOBI formats"
                    />
                    <Feature
                      icon={<Globe className="w-4 h-4" />}
                      title="Read Anywhere"
                      description="Compatible with all devices and e-readers"
                    />
                    <Feature
                      icon={<Shield className="w-4 h-4" />}
                      title="Lifetime Access"
                      description="Download and keep forever with free updates"
                    />
                    <Feature
                      icon={<Lock className="w-4 h-4" />}
                      title="Secure Payment"
                      description="256-bit SSL encryption for safe transactions"
                    />
                  </div>

                  <button
                    onClick={() => handlePurchase('digital')}
                    className={`w-full py-4 px-6 ${theme.primaryBg} ${theme.primaryHover} text-black font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 text-lg border-2 border-[#FEFD0C] hover:scale-[1.02]`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Buy Digital Copy - $50</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className={`${theme.textMuted} font-medium`}>30-day money-back guarantee</span>
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
                      <div className="flex items-baseline gap-2">
                        <span className={`text-3xl font-black ${theme.text}`}>$150</span>
                      </div>
                      <div className="bg-[#FEFD0C] text-black text-xs font-bold px-3 py-1 rounded-full mt-2">
                        FREE SHIPPING
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Feature
                      icon={<Award className="w-4 h-4" />}
                      title="Author Signed"
                      description="Personally signed by Bnaira with certificate of authenticity"
                    />
                    <Feature
                      icon={<BookOpen className="w-4 h-4" />}
                      title="Premium Hardcover"
                      description="High-quality binding with dust jacket and ribbon bookmark"
                    />
                    <Feature
                      icon={<Truck className="w-4 h-4" />}
                      title="Free Worldwide Shipping"
                      description="Express delivery included, arrives in 5-10 business days"
                    />
                    <Feature
                      icon={<Download className="w-4 h-4" />}
                      title="Digital Copy Included"
                      description="Get immediate digital access while physical copy ships"
                    />
                  </div>

                  <button
                    onClick={() => handlePurchase('physical')}
                    className={`w-full py-4 px-6 ${theme.primaryBg} ${theme.primaryHover} text-black font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 text-lg border-2 border-[#FEFD0C] hover:scale-[1.02]`}
                  >
                    <Package className="w-5 h-5" />
                    <span>Order Signed Copy - $150</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className={`${theme.textMuted} font-medium`}>In stock</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#FEFD0C]" />
                      <span className={`${theme.textMuted} font-medium`}>Ships within 24h</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EBookStore;