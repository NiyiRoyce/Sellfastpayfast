import React, { useState, useEffect } from "react";
import {
  FaGooglePlay,
  FaApple,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
  FaBitcoin,
  FaEthereum,
  FaHeadset
} from "react-icons/fa";
import { MdSpeed, MdVerified } from "react-icons/md";
import { SiTether, SiRipple, SiLitecoin, SiCardano } from "react-icons/si";

// Type definitions
type IconType = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

interface AppButtonProps {
  icon: IconType;
  label: string;
  placeholder: string;
  href: string;
  className?: string;
}

interface CryptoIcon {
  Icon: IconType;
  name: string;
  color: string;
}

interface RevolvingCrypto extends CryptoIcon {
  angle: number;
}

interface Feature {
  icon: IconType;
  title: string;
  description: string;
}

interface Stat {
  icon: IconType;
  value: string;
  label: string;
}

// Updated AppButton Component with card-like design matching 24/7 Support
const AppButton: React.FC<AppButtonProps> = ({
  icon: Icon,
  label,
  placeholder,
  href,
  className = ""
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group bg-black/60 backdrop-blur-xl border border-[#FEFD0C]/10 rounded-2xl p-6 shadow-2xl shadow-black/50 hover:shadow-[#FEFD0C]/10 hover:border-[#FEFD0C]/30 transition-all duration-500 hover:scale-105 flex items-center ${className}`}
  >
    <div className="w-10 h-10 rounded-xl bg-[#FEFD0C]/10 flex items-center justify-center mr-4 group-hover:bg-[#FEFD0C]/20 transition-colors duration-300">
      <Icon className="text-[#FEFD0C] text-lg drop-shadow-sm" />
    </div>
    <div>
      <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-[#FEFD0C] transition-colors duration-300">
        {placeholder}
      </h4>
      <p className="text-gray-400 text-xs font-light">{label}</p>
    </div>
  </a>
);

// Crypto floating icons data
const cryptoIcons: CryptoIcon[] = [
  { Icon: FaBitcoin, name: "BTC", color: "text-orange-400" },
  { Icon: SiTether, name: "USDT", color: "text-green-400" },
  { Icon: FaEthereum, name: "ETH", color: "text-blue-400" },
  { Icon: SiRipple, name: "XRP", color: "text-blue-300" }
];

// Revolving crypto data
const revolvingCryptos: RevolvingCrypto[] = [
  { Icon: FaEthereum, name: "ETH", color: "#627EEA", angle: 0 },
  { Icon: SiTether, name: "USDT", color: "#26A17B", angle: 60 },
  { Icon: SiRipple, name: "XRP", color: "#23292F", angle: 120 },
  { Icon: SiLitecoin, name: "LTC", color: "#BFBBBB", angle: 180 },
  { Icon: SiCardano, name: "ADA", color: "#0D1E30", angle: 240 },
  { Icon: FaBitcoin, name: "BTC2", color: "#F7931A", angle: 300 }
];

// Stats data
const stats: Stat[] = [
  { icon: FaUsers, value: "50K+", label: "Active Users" },
  { icon: FaShieldAlt, value: "99.9%", label: "Security Rate" },
  { icon: FaChartLine, value: "$2M+", label: "Daily Volume" },
  { icon: MdSpeed, value: "<30s", label: "Transaction Speed" }
];

// Features data - Updated to include 24/7 Support
const features: Feature[] = [
  {
    icon: FaHeadset,
    title: "24/7 Support",
    description: "Round-the-clock customer assistance whenever you need it"
  },
  {
    icon: MdSpeed,
    title: "Lightning Fast",
    description: "Instant transactions and real-time processing"
  },
  {
    icon: MdVerified,
    title: "Fully Licensed",
    description: "Regulated and compliant with global standards"
  }
];

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <section
        className="w-full min-h-screen bg-black bg-opacity-40 relative overflow-hidden"
        style={{
          fontFamily:
            'Poppins, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
          fontWeight: '300'
        }}
      >
        {/* Enhanced Background and pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FEFD0C]/20 via-transparent to-[#FEFD0C]/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FEFD0C]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FEFD0C]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#FEFD0C]/5 to-yellow-400/5 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 opacity-8">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(254,253,12,0.4) 1px, transparent 0)`,
              backgroundSize: "40px 40px"
            }}
          ></div>
        </div>

        {/* Enhanced Floating Crypto Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {cryptoIcons.map((crypto, i) => (
            <div
              key={i}
              className={`absolute ${crypto.color} opacity-40 drop-shadow-lg`}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animation: `cryptoFloat ${12 + Math.random() * 8}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                filter: "brightness(1.3) saturate(1.1)"
              }}
            >
              <crypto.Icon className="text-4xl" />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20 pb-16">
          <div className="text-center mb-16">
            <div
              className={`inline-block bg-[#FEFD0C]/15 text-[#FEFD0C] font-light px-6 py-3 rounded-full text-sm border border-[#FEFD0C]/30 backdrop-blur-sm transition-all duration-1000 shadow-lg shadow-[#FEFD0C]/10 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              <MdVerified className="inline mr-2" />
              Trusted by 50,000+ Users Worldwide
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start min-h-[70vh]">
            {/* Left Content */}
            <div
              className={`transition-all duration-1000 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="mb-8">
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[0.9] mb-4"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: '200' }}
                >
                  <span
                    className="inline-block animate-float bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-sm"
                    style={{ animationDelay: "0s" }}
                  >
                    Fast
                  </span>
                  <span className="mx-3 text-gray-400 font-light">and</span>
                  <br />
                  <span
                    className="text-[#FEFD0C] inline-block animate-float bg-gradient-to-r from-[#FEFD0C] via-yellow-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg"
                    style={{ animationDelay: "0.5s" }}
                  >
                    Trusted
                  </span>
                  <br />
                  <span
                    className="inline-block animate-float bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-sm"
                    style={{ animationDelay: "1s" }}
                  >
                    Crypto Trading
                  </span>
                </h1>

                <p className="text-white/70 max-w-xl leading-relaxed text-lg font-light">
               Peer-to-peer cryptocurrency trading platform—where buyers and sellers connect directly for lightning-fast, secure transactions.
                Join thousands who trust us for seamless crypto trading and reliable, professional support.
                </p>
              </div>

              {/* App Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 max-w-2xl mb-12">
                <AppButton
                  icon={FaGooglePlay}
                  label="Get it on Google Play"
                  placeholder="Download Now"
                  href="https://play.google.com/store/apps/details?id=com.myapp"
                  className="flex-1"
                />
                <AppButton
                  icon={FaApple}
                  label="Download on the App Store"
                  placeholder="Download Now"
                  href="https://apps.apple.com/app/id1234567890"
                  className="flex-1"
                />
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className={`bg-black/60 backdrop-blur-xl border border-[#FEFD0C]/10 rounded-2xl p-6 shadow-2xl shadow-black/50 hover:shadow-[#FEFD0C]/10 hover:border-[#FEFD0C]/30 transition-all duration-500 group hover:scale-105 ${
                        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                      }`}
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#FEFD0C]/10 flex items-center justify-center mb-4 group-hover:bg-[#FEFD0C]/20 transition-colors duration-300">
                        <Icon className="text-[#FEFD0C] text-lg drop-shadow-sm" />
                      </div>
                      <h4 className="text-white font-medium text-sm mb-2 group-hover:text-[#FEFD0C] transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-400 text-xs font-light">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right - Fixed Central Image with Revolving Crypto and Magnifying Effect */}
            <div className={`relative transition-all duration-1000 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`} style={{ transitionDelay: "200ms" }}>
              <div className="relative max-w-lg mx-auto h-[600px] flex items-center justify-center">
                {/* Background glow effects only */}
                <div className="absolute inset-0 w-80 h-80 rounded-full bg-gradient-to-br from-[#FEFD0C]/20 via-yellow-300/15 to-[#FEFD0C]/10 blur-3xl animate-pulse-slow"></div>
                <div className="absolute inset-0 w-72 h-72 left-4 top-4 rounded-full bg-gradient-to-br from-[#FEFD0C]/25 via-yellow-400/20 to-transparent blur-2xl animate-glow"></div>
                
                {/* Main Center Image Container with Continuous Magnifying Effect */}
                <div className="relative z-20">
                  <div className="relative w-72 h-72 rounded-full bg-gradient-to-br from-black/40 via-gray-900/60 to-black/80 backdrop-blur-xl border-2 border-[#FEFD0C]/50 shadow-2xl shadow-[#FEFD0C]/40 flex items-center justify-center overflow-hidden hover:border-[#FEFD0C]/70 transition-all duration-500 group hover:shadow-[#FEFD0C]/60">
                    {/* Subtle inner border glow only */}
                    <div className="absolute inset-2 rounded-full border border-[#FEFD0C]/10"></div>
                    
                    {/* Main image with continuous magnifying effect */}
                    <div className="relative w-64 h-64 overflow-hidden rounded-full">
                      <img
                        src="https://ik.imagekit.io/shiga/sfpf/pngimg%201.png?updatedAt=1713648296070"
                        alt="SFPF Trading Platform"
                        className="w-full h-full object-contain relative z-10 animate-magnify"
                      />
                    </div>
                  </div>
                </div>

                {/* Enhanced revolving crypto icons */}
                <div className="absolute w-full h-full animate-spin-slow">
                  {revolvingCryptos.map((crypto, index) => {
                    const Icon = crypto.Icon;
                    const radius = 200;
                    const x = Math.cos((crypto.angle * Math.PI) / 180) * radius;
                    const y = Math.sin((crypto.angle * Math.PI) / 180) * radius;
                    return (
                      <div
                        key={index}
                        className="absolute w-18 h-18 rounded-full bg-gradient-to-br from-black/70 via-gray-900/80 to-black/90 backdrop-blur-xl border-2 border-[#FEFD0C]/40 shadow-2xl shadow-[#FEFD0C]/30 flex items-center justify-center hover:border-[#FEFD0C]/70 transition-all duration-500 hover:scale-110 group animate-pulse hover:shadow-[#FEFD0C]/50"
                        style={{
                          left: `calc(50% + ${x}px - 36px)`,
                          top: `calc(50% + ${y}px - 36px)`,
                          width: '72px',
                          height: '72px',
                          transform: `translate(-50%, -50%)`
                        }}
                      >
                        <Icon 
                          className="text-3xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg relative z-10" 
                          style={{ 
                            color: crypto.color,
                            filter: 'brightness(1.3) saturate(1.2)'
                          }} 
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Section */}
          <div className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {stats.map(({ icon: Icon, value, label }, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl border border-[#FEFD0C]/15 rounded-2xl p-6 shadow-2xl shadow-black/50 hover:border-[#FEFD0C]/40 transition-all duration-500 group hover:scale-105 hover:shadow-[#FEFD0C]/10 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${600 + idx * 150}ms` }}
              >
                <div className="w-12 h-12 bg-[#FEFD0C]/15 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#FEFD0C]/25 transition-colors duration-300 shadow-lg shadow-[#FEFD0C]/10">
                  <Icon className="text-[#FEFD0C] text-xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
                </div>
                <p className="font-medium text-white text-2xl mb-1 group-hover:text-[#FEFD0C] transition-colors duration-300 drop-shadow-sm">{value}</p>
                <p className="text-gray-400 text-sm font-light uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced custom animations */}
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }

            @keyframes cryptoFloat {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              25% { transform: translateY(-20px) rotate(5deg); }
              50% { transform: translateY(-10px) rotate(-5deg); }
              75% { transform: translateY(-30px) rotate(3deg); }
            }

            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            @keyframes glow {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 0.6; transform: scale(1.05); }
            }

            @keyframes pulse-slow {
              0%, 100% { opacity: 0.2; transform: scale(1); }
              50% { opacity: 0.4; transform: scale(1.1); }
            }

            @keyframes magnify {
              0%, 100% { transform: scale(1.1); }
              50% { transform: scale(1.25); }
            }

            .animate-float { animation: float 3s ease-in-out infinite; }
            .animate-spin-slow { animation: spin-slow 30s linear infinite; }
            .animate-glow { animation: glow 4s ease-in-out infinite; }
            .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
            .animate-magnify { animation: magnify 4s ease-in-out infinite; }
          `}
        </style>
      </section>
    </>
  );
};

export default Hero;