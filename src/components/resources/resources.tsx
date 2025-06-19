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

// Simplified theme configuration - clean black and yellow
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
  <div className="flex items-start gap-4 p-4 rounded-lg bg-neutral-800/50 border border-neutral-700">
    <div className="w-10 h-10 rounded-lg bg-[#FEFD0C] flex items-center justify-center text-black flex-shrink-0">
      {icon}
    </div>
    <div className="flex-1">
      <h4 className={`font-semibold ${theme.text} mb-2`}>{title}</h4>
      <p className={`text-sm ${theme.textMuted} leading-relaxed`}>{description}</p>
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
      
      <div className={`min-h-screen ${theme.background} py-12`} style={{
        fontFamily: '"Inter", sans-serif'
      }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Back Button */}
          <div className="mb-12">
            <button
              onClick={handleGoBack}
              aria-label="Go back"
              className={`p-3 rounded-full ${theme.card} ${theme.cardHover} ${theme.border} border transition-all duration-200 flex items-center justify-center group`}
            >
              <ArrowLeft className="w-5 h-5 text-white group-hover:text-[#FEFD0C] transition-colors" />
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FEFD0C] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-black" />
              </div>
              <span className={`text-sm font-bold ${theme.textMuted} uppercase tracking-widest`}>
                Financial Freedom Guide
              </span>
            </div>
            
            <h1 className={`text-5xl md:text-7xl font-black ${theme.text} mb-6 leading-none`}>
              Make Money<br />
              <span className="text-[#FEFD0C]">While You Sleep</span>
            </h1>
            
            <p className={`text-2xl ${theme.textSecondary} mb-8 font-medium`}>by Bnaira</p>
            
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FEFD0C] text-[#FEFD0C]" />
                  ))}
                </div>
                <span className={`${theme.text} font-bold text-lg`}>4.9</span>
                <span className={theme.textMuted}>(2,847 reviews)</span>
              </div>
              <div className={`w-2 h-2 rounded-full bg-[#FEFD0C]`}></div>
              <span className={`${theme.textMuted} font-semibold`}>15,000+ copies sold</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Book Preview */}
            <div className="space-y-8">
              <div className={`${theme.card} rounded-3xl p-12 ${theme.border} border-2`}>
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    {/* Book Cover */}
                    <div className="w-72 h-96 bg-black rounded-2xl border-4 border-[#FEFD0C] flex flex-col justify-between p-8 text-center relative overflow-hidden">
                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-[#FEFD0C] transform rotate-45 translate-x-8 -translate-y-8"></div>
                      
                      <div className="relative z-10">
                        <h3 className="text-3xl font-black text-[#FEFD0C] mb-3 tracking-wider">MAKE MONEY</h3>
                        <h4 className="text-xl font-bold text-white mb-6 tracking-wide">WHILE YOU SLEEP</h4>
                        <div className="w-20 h-1 bg-[#FEFD0C] mx-auto"></div>
                      </div>
                      
                      <div className="relative z-10">
                        <p className="text-[#FEFD0C] font-black text-2xl tracking-widest">BNAIRA</p>
                        <p className="text-neutral-300 text-sm mt-2 font-medium">Financial Freedom Guide</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button className={`w-full flex items-center justify-center gap-3 py-4 px-8 ${theme.surface} ${theme.surfaceHover} rounded-xl transition-all duration-200 ${theme.border} border font-semibold`}>
                  <Eye className="w-5 h-5 text-[#FEFD0C]" />
                  <span>Preview Sample Pages</span>
                </button>
              </div>

              {/* Book Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: BookOpen, value: "324", label: "Pages" },
                  { icon: Clock, value: "6-8h", label: "Read Time" },
                  { icon: Award, value: "#1", label: "Bestseller" }
                ].map((stat, index) => (
                  <div key={index} className={`${theme.card} rounded-2xl p-6 ${theme.border} border-2 text-center ${theme.cardHover} transition-all duration-200`}>
                    <stat.icon className="w-8 h-8 text-[#FEFD0C] mx-auto mb-4" />
                    <p className={`text-2xl font-bold ${theme.text} mb-1`}>{stat.value}</p>
                    <p className={`text-sm ${theme.textMuted} font-semibold uppercase tracking-wide`}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Options */}
            <div className="space-y-8">
              {/* Option Selector */}
              <div className={`${theme.card} rounded-2xl p-4 ${theme.border} border-2`}>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedOption('digital')}
                    className={`py-4 px-6 rounded-xl transition-all duration-200 font-bold text-sm flex flex-col items-center gap-2 ${
                      selectedOption === 'digital'
                        ? `${theme.primaryBg} text-black`
                        : `${theme.text} bg-neutral-800 hover:bg-neutral-700`
                    }`}
                  >
                    <Download className="w-6 h-6" />
                    Digital Copy
                  </button>
                  <button
                    onClick={() => setSelectedOption('physical')}
                    className={`py-4 px-6 rounded-xl transition-all duration-200 font-bold text-sm flex flex-col items-center gap-2 ${
                      selectedOption === 'physical'
                        ? `${theme.primaryBg} text-black`
                        : `${theme.text} bg-neutral-800 hover:bg-neutral-700`
                    }`}
                  >
                    <Package className="w-6 h-6" />
                    Physical Copy
                  </button>
                </div>
              </div>

              {/* Digital Option */}
              {selectedOption === 'digital' && (
                <div className={`${theme.card} rounded-3xl p-8 ${theme.border} border-2 space-y-8`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`text-3xl font-bold ${theme.text} mb-2`}>Digital eBook</h3>
                      <p className={`${theme.textSecondary} text-lg`}>Instant download after payment</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-3">
                        <span className={`text-4xl font-black ${theme.text}`}>$50</span>
                        <span className={`text-xl ${theme.textMuted} line-through`}>$97</span>
                      </div>
                      <div className="bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full mt-2">
                        48% OFF
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Feature
                      icon={<Download className="w-5 h-5" />}
                      title="Instant Download"
                      description="Get immediate access to PDF, EPUB, and MOBI formats"
                    />
                    <Feature
                      icon={<Globe className="w-5 h-5" />}
                      title="Read Anywhere"
                      description="Compatible with all devices and e-readers"
                    />
                    <Feature
                      icon={<Shield className="w-5 h-5" />}
                      title="Lifetime Access"
                      description="Download and keep forever with free updates"
                    />
                    <Feature
                      icon={<Lock className="w-5 h-5" />}
                      title="Secure Payment"
                      description="256-bit SSL encryption for safe transactions"
                    />
                  </div>

                  <button
                    onClick={() => handlePurchase('digital')}
                    className={`w-full py-5 px-8 ${theme.primaryBg} ${theme.primaryHover} text-black font-black rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 text-xl border-4 border-[#FEFD0C]`}
                  >
                    <CreditCard className="w-6 h-6" />
                    <span>Buy Digital Copy - $50</span>
                    <ArrowRight className="w-6 h-6" />
                  </button>

                  <div className="flex items-center justify-center gap-3 text-sm">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className={`${theme.textMuted} font-semibold`}>30-day money-back guarantee</span>
                  </div>
                </div>
              )}

              {/* Physical Option */}
              {selectedOption === 'physical' && (
                <div className={`${theme.card} rounded-3xl p-8 ${theme.border} border-2 space-y-8`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`text-3xl font-bold ${theme.text} mb-2`}>Signed Physical Copy</h3>
                      <p className={`${theme.textSecondary} text-lg`}>Premium hardcover with author signature</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-3">
                        <span className={`text-4xl font-black ${theme.text}`}>$150</span>
                      </div>
                      <div className="bg-[#FEFD0C] text-black text-sm font-bold px-4 py-2 rounded-full mt-2">
                        FREE SHIPPING
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Feature
                      icon={<Award className="w-5 h-5" />}
                      title="Author Signed"
                      description="Personally signed by Bnaira with certificate of authenticity"
                    />
                    <Feature
                      icon={<BookOpen className="w-5 h-5" />}
                      title="Premium Hardcover"
                      description="High-quality binding with dust jacket and ribbon bookmark"
                    />
                    <Feature
                      icon={<Truck className="w-5 h-5" />}
                      title="Free Worldwide Shipping"
                      description="Express delivery included, arrives in 5-10 business days"
                    />
                    <Feature
                      icon={<Download className="w-5 h-5" />}
                      title="Digital Copy Included"
                      description="Get immediate digital access while physical copy ships"
                    />
                  </div>

                  <button
                    onClick={() => handlePurchase('physical')}
                    className={`w-full py-5 px-8 ${theme.primaryBg} ${theme.primaryHover} text-black font-black rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 text-xl border-4 border-[#FEFD0C]`}
                  >
                    <Package className="w-6 h-6" />
                    <span>Order Signed Copy - $150</span>
                    <ArrowRight className="w-6 h-6" />
                  </button>

                  <div className="flex items-center justify-center gap-8 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className={`${theme.textMuted} font-semibold`}>In stock</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#FEFD0C]" />
                      <span className={`${theme.textMuted} font-semibold`}>Ships within 24h</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Social Proof */}
              <div className={`${theme.card} rounded-2xl p-8 ${theme.border} border-2`}>
                <h4 className={`font-bold ${theme.text} mb-6 text-lg flex items-center gap-3`}>
                  <Users className="w-6 h-6 text-[#FEFD0C]" />
                  What Readers Are Saying
                </h4>
                <div className="space-y-6">
                  <div className="border-l-4 border-[#FEFD0C] pl-6 py-2">
                    <p className={`text-lg ${theme.textSecondary} mb-3 leading-relaxed font-medium`}>
                      "Changed my entire approach to passive income. Already making $2k/month!"
                    </p>
                    <p className={`text-sm ${theme.textMuted} font-bold`}>— Sarah M., Entrepreneur</p>
                  </div>
                  <div className="border-l-4 border-[#FEFD0C] pl-6 py-2">
                    <p className={`text-lg ${theme.textSecondary} mb-3 leading-relaxed font-medium`}>
                      "The strategies in this book are pure gold. Worth every penny and more."
                    </p>
                    <p className={`text-sm ${theme.textMuted} font-bold`}>— Michael R., Investor</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-6">
                <button className={`p-4 rounded-2xl ${theme.card} ${theme.cardHover} ${theme.border} border-2 transition-all duration-200 hover:scale-105`}>
                  <Heart className="w-6 h-6 text-[#FEFD0C]" />
                </button>
                <button className={`p-4 rounded-2xl ${theme.card} ${theme.cardHover} ${theme.border} border-2 transition-all duration-200 hover:scale-105`}>
                  <Share2 className="w-6 h-6 text-[#FEFD0C]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EBookStore;