import React, { useState, useEffect } from "react";
import {
  MdTrendingUp,
  MdSecurity,
  MdSpeed,
  MdVerifiedUser,
  MdArrowForward,
  MdPlayArrow,
  MdPeople,
  MdSwapHoriz,
} from "react-icons/md";
import {
  RiRocketLine,
  RiShieldCheckLine,
  RiCoinLine,
  RiTrophyLine,
  RiExchangeLine,
  RiUserHeartLine,
} from "react-icons/ri";

// Features displayed in the CTA - Updated for P2P focus
const ctaFeatures = [
  {
    id: 1,
    title: "Direct P2P Trading",
    description: "Connect directly with buyers and sellers worldwide",
    icon: MdSwapHoriz,
    stat: "< 2min",
    statLabel: "Connection Time",
  },
  {
    id: 2,
    title: "Escrow Protection",
    description: "Secure transactions with built-in escrow system",
    icon: RiShieldCheckLine,
    stat: "100%",
    statLabel: "Trade Security",
  },
  {
    id: 3,
    title: "Zero Platform Fees",
    description: "Keep more of your profits with no hidden costs",
    icon: RiCoinLine,
    stat: "0%",
    statLabel: "Platform Fee",
  },
  {
    id: 4,
    title: "Global Network",
    description: "Access to verified traders in 180+ countries",
    icon: MdPeople,
    stat: "500K+",
    statLabel: "Active Traders",
  },
];

// Social proof stats displayed - Updated for P2P focus
const socialProof = [
  {
    id: 1,
    metric: "2M+",
    label: "P2P Trades",
    description: "Successful peer connections",
  },
  {
    id: 2,
    metric: "$75B+",
    label: "P2P Volume",
    description: "Direct trader exchanges",
  },
  {
    id: 3,
    metric: "300+",
    label: "Payment Methods",
    description: "Flexible transaction options",
  },
  {
    id: 4,
    metric: "99.8%",
    label: "Success Rate",
    description: "Completed P2P trades",
  },
];

// Testimonials from users - Updated for P2P focus
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "P2P Trader",
    content:
      "Direct trading with other users gives me better rates and faster transactions. The escrow system makes every trade completely secure.",
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Crypto Seller",
    content:
      "I love connecting directly with buyers. No middleman fees means I keep more profit, and the verification system ensures safe trades.",
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Crypto Buyer",
    content:
      "Finding trusted sellers is so easy here. The peer-to-peer system lets me negotiate better prices and choose my preferred payment method.",
    avatar: "ER",
  },
];

const CTA = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes slideInFromLeft {
          0% {transform: translateX(-100px);opacity: 0;}
          100% {transform: translateX(0);opacity: 1;}
        }
        @keyframes slideInFromRight {
          0% {transform: translateX(100px);opacity: 0;}
          100% {transform: translateX(0);opacity: 1;}
        }
        @keyframes slideInFromBottom {
          0% {transform: translateY(50px);opacity: 0;}
          100% {transform: translateY(0);opacity: 1;}
        }
        @keyframes fadeInScale {
          0% {transform: scale(0.8);opacity: 0;}
          100% {transform: scale(1);opacity: 1;}
        }
        @keyframes glowPulse {
          0%, 100% {box-shadow: 0 0 20px rgba(254, 253, 12, 0.3);}
          50% {box-shadow: 0 0 40px rgba(254, 253, 12, 0.6);}
        }
        @keyframes float {
          0%, 100% {transform: translateY(0px);}
          50% {transform: translateY(-10px);}
        }
        .animate-slide-left {
          animation: slideInFromLeft 0.8s ease-out forwards;
        }
        .animate-slide-right {
          animation: slideInFromRight 0.8s ease-out 0.3s forwards;
        }
        .animate-slide-bottom {
          animation: slideInFromBottom 0.8s ease-out 0.6s forwards;
        }
        .animate-fade-scale {
          animation: fadeInScale 0.8s ease-out 0.9s forwards;
        }
        .animate-glow-pulse {
          animation: glowPulse 2s ease-in-out infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .initial-hidden {opacity: 0;transform: translateX(-100px);}
        .initial-hidden-right {opacity: 0;transform: translateX(100px);}
        .initial-hidden-bottom {opacity: 0;transform: translateY(50px);}
        .initial-hidden-scale {opacity: 0;transform: scale(0.8);}
      `}</style>

      <section
        className="w-full py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden"
        style={{
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FEFD0C]/20 via-transparent to-[#FEFD0C]/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FEFD0C]/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FEFD0C]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#FEFD0C]/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div
              className={`inline-block bg-black/40 backdrop-blur-md text-[#FEFD0C] font-medium px-6 py-3 rounded-full text-sm mb-6 border border-[#FEFD0C]/20 hover:bg-[#FEFD0C]/10 hover:scale-105 transition-all duration-300 cursor-default hover:shadow-lg hover:shadow-[#FEFD0C]/20 ${
                isVisible ? "animate-fade-scale" : "initial-hidden-scale"
              }`}
            >
              <RiExchangeLine className="inline mr-2 hover:scale-110 transition-transform duration-300" />
              Join the P2P Revolution
            </div>

            {/* Main Headings */}
            <div className="mb-8">
              <h1
                className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight hover:text-white/90 transition-colors duration-300 ${
                  isVisible ? "animate-slide-left" : "initial-hidden"
                }`}
              >
                Connect. Trade. Profit.
              </h1>
              <span
                className={`text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FEFD0C] block mt-4 hover:text-[#FEFD0C]/90 transition-colors duration-300 hover:drop-shadow-[0_0_30px_rgba(254,253,12,0.5)] ${
                  isVisible ? "animate-slide-right" : "initial-hidden-right"
                }`}
              >
                Peer-to-Peer Crypto Trading
              </span>
            </div>

            <div
              className={`w-24 h-1 bg-[#FEFD0C] rounded-full mx-auto shadow-lg shadow-[#FEFD0C]/30 mb-8 hover:w-32 hover:shadow-[#FEFD0C]/50 transition-all duration-500 animate-glow-pulse ${
                isVisible ? "animate-slide-bottom" : "initial-hidden-bottom"
              }`}
            ></div>

            <p
              className={`text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto mb-12 hover:text-white transition-colors duration-300 ${
                isVisible ? "animate-slide-bottom" : "initial-hidden-bottom"
              }`}
              style={{ animationDelay: "0.8s" }}
            >
              The world's most trusted peer-to-peer cryptocurrency marketplace. Connect directly with verified buyers and sellers for secure, fast, and reliable crypto transactions. Trade on your terms with zero platform fees.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row justify-center gap-6 mb-16 ${
                isVisible ? "animate-slide-bottom" : "initial-hidden-bottom"
              }`}
              style={{ animationDelay: "1s" }}
            >
              <button className="group inline-flex items-center justify-center px-10 py-5 rounded-xl bg-[#FEFD0C] text-black font-bold hover:bg-[#FEFD0C]/90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#FEFD0C]/20 text-lg animate-glow-pulse hover:shadow-[#FEFD0C]/40">
                <RiExchangeLine className="mr-3 text-2xl group-hover:rotate-180 transition-transform duration-500 group-hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
                Start P2P Trading
                <MdArrowForward className="ml-2 text-xl group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              <button className="group inline-flex items-center justify-center px-10 py-5 rounded-xl bg-black/40 backdrop-blur-md border-2 border-[#FEFD0C] text-[#FEFD0C] font-bold hover:bg-[#FEFD0C]/20 hover:border-[#FEFD0C]/60 transition-all duration-300 transform hover:scale-105 text-lg hover:shadow-lg hover:shadow-[#FEFD0C]/20">
                <MdPlayArrow className="mr-3 text-2xl group-hover:scale-110 transition-transform duration-300" />
                See How P2P Works
              </button>
            </div>

            {/* Trust Indicators */}
            <div
              className={`flex flex-wrap justify-center items-center gap-8 text-white/70 text-sm ${
                isVisible ? "animate-fade-scale" : "initial-hidden-scale"
              }`}
              style={{ animationDelay: "1.2s" }}
            >
              <div className="flex items-center bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-lg px-4 py-2 hover:border-[#FEFD0C]/30 hover:bg-black/60 transition-all duration-300 hover:scale-105 cursor-default">
                <MdVerifiedUser className="text-[#FEFD0C] mr-2 hover:scale-110 transition-transform duration-300" />
                <span className="hover:text-white transition-colors duration-300">Verified P2P Network</span>
              </div>
              <div className="flex items-center bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-lg px-4 py-2 hover:border-[#FEFD0C]/30 hover:bg-black/60 transition-all duration-300 hover:scale-105 cursor-default">
                <MdSecurity className="text-[#FEFD0C] mr-2 hover:scale-110 transition-transform duration-300" />
                <span className="hover:text-white transition-colors duration-300">Escrow Protected Trades</span>
              </div>
              <div className="flex items-center bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-lg px-4 py-2 hover:border-[#FEFD0C]/30 hover:bg-black/60 transition-all duration-300 hover:scale-105 cursor-default">
                <RiUserHeartLine className="text-[#FEFD0C] mr-2 hover:scale-110 transition-transform duration-300" />
                <span className="hover:text-white transition-colors duration-300">24/7 Dispute Resolution</span>
              </div>
            </div>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {socialProof.map((item, index) => (
              <div
                key={item.id}
                className={`bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-2xl p-6 text-center shadow-2xl shadow-black/50 hover:border-[#FEFD0C]/30 transition-all duration-500 group hover:scale-105 hover:bg-black/60 hover:backdrop-blur-lg hover:shadow-lg hover:shadow-[#FEFD0C]/10 cursor-default ${
                  isVisible ? "animate-fade-scale" : "initial-hidden-scale"
                }`}
                style={{ animationDelay: `${1.4 + index * 0.1}s` }}
              >
                <p className="text-3xl md:text-4xl font-bold text-[#FEFD0C] mb-2 group-hover:scale-110 transition-transform duration-300 group-hover:drop-shadow-[0_0_15px_rgba(254,253,12,0.5)]">
                  {item.metric}
                </p>
                <p className="text-white font-semibold mb-1 group-hover:text-[#FEFD0C] transition-colors duration-300">{item.label}</p>
                <p className="text-white/70 text-sm group-hover:text-white transition-colors duration-300">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-block bg-black/40 backdrop-blur-md text-[#FEFD0C] font-medium px-4 py-2 rounded-full text-sm mb-4 border border-[#FEFD0C]/20 hover:bg-[#FEFD0C]/10 hover:scale-105 transition-all duration-300 cursor-default">
                <MdPeople className="inline mr-2 hover:scale-110 transition-transform duration-300" />
                P2P Trading Features
              </div>
              <h2
                className={`text-3xl md:text-4xl font-bold text-white mb-4 hover:text-white/90 transition-colors duration-300 ${
                  isVisible ? "animate-slide-left" : "initial-hidden"
                }`}
                style={{ animationDelay: "1.8s" }}
              >
                Why Choose Our P2P Platform?
              </h2>
              <p
                className={`text-white/80 text-lg max-w-2xl mx-auto hover:text-white transition-colors duration-300 ${
                  isVisible ? "animate-slide-right" : "initial-hidden-right"
                }`}
                style={{ animationDelay: "2s" }}
              >
                Experience true peer-to-peer trading with direct connections, secure escrow protection, and complete control over your transactions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ctaFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.id}
                    className={`bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-2xl p-6 shadow-2xl shadow-black/50 hover:shadow-[#FEFD0C]/10 hover:border-[#FEFD0C]/30 transition-all duration-500 group hover:scale-105 hover:bg-black/60 hover:backdrop-blur-lg cursor-default ${
                      isVisible ? "animate-fade-scale" : "initial-hidden-scale"
                    }`}
                    style={{ animationDelay: `${2.2 + index * 0.15}s` }}
                  >
                    <div className="flex items-center mb-4 text-[#FEFD0C]">
                      <div className="w-12 h-12 bg-black/40 rounded-lg flex items-center justify-center mr-3 group-hover:bg-[#FEFD0C]/20 transition-all duration-300 group-hover:scale-110">
                        <Icon className="text-2xl group-hover:drop-shadow-[0_0_8px_rgba(254,253,12,0.5)] transition-all duration-300" />
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-[#FEFD0C]/90 transition-colors duration-300">{feature.title}</h3>
                    </div>
                    <p className="text-white/80 mb-6 group-hover:text-white transition-colors duration-300">{feature.description}</p>
                    <div className="text-[#FEFD0C] font-bold text-3xl flex items-baseline group-hover:scale-105 transition-transform duration-300">
                      <span className="group-hover:drop-shadow-[0_0_8px_rgba(254,253,12,0.3)]">{feature.stat}</span>
                      <span className="text-base ml-2 text-white/70 group-hover:text-white transition-colors duration-300">{feature.statLabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-black/40 backdrop-blur-md text-[#FEFD0C] font-medium px-4 py-2 rounded-full text-sm mb-4 border border-[#FEFD0C]/20 hover:bg-[#FEFD0C]/10 hover:scale-105 transition-all duration-300 cursor-default">
                <RiTrophyLine className="inline mr-2 hover:scale-110 transition-transform duration-300" />
                P2P Trader Reviews
              </div>
              <h2
                className={`text-3xl md:text-4xl font-bold text-white mb-4 hover:text-white/90 transition-colors duration-300 ${
                  isVisible ? "animate-slide-left" : "initial-hidden"
                }`}
                style={{ animationDelay: "3s" }}
              >
                What Our P2P Community Says
              </h2>
            </div>

            <div className="relative">
              {/* Testimonials cards */}
              <div className="overflow-hidden rounded-3xl shadow-xl shadow-black/50 bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 hover:border-[#FEFD0C]/30 transition-all duration-500 hover:bg-black/60 hover:backdrop-blur-lg">
                <div
                  className="flex transition-transform duration-700"
                  style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                >
                  {testimonials.map((t) => (
                    <div
                      key={t.id}
                      className="flex-shrink-0 w-full p-8 md:p-12 text-white text-center"
                    >
                      <div className="mb-6 flex justify-center items-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#FEFD0C] rounded-full blur-lg opacity-30 animate-pulse"></div>
                          <div className="relative w-20 h-20 rounded-full bg-[#FEFD0C] text-black flex items-center justify-center text-2xl font-bold select-none shadow-lg shadow-[#FEFD0C]/40 hover:scale-110 transition-transform duration-300 hover:shadow-[#FEFD0C]/60">
                            {t.avatar}
                          </div>
                        </div>
                      </div>
                      <p className="mb-6 italic text-lg max-w-3xl mx-auto text-white/90 hover:text-white transition-colors duration-300">{`"${t.content}"`}</p>
                      <p className="font-bold text-xl text-[#FEFD0C] hover:text-[#FEFD0C]/90 transition-colors duration-300">{t.name}</p>
                      <p className="text-white/70 hover:text-white transition-colors duration-300">{t.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-6 space-x-4">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Show testimonial ${idx + 1}`}
                    className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                      idx === activeTestimonial
                        ? "bg-[#FEFD0C] shadow-lg shadow-[#FEFD0C]/50"
                        : "bg-white/30 hover:bg-[#FEFD0C]/70 hover:shadow-md hover:shadow-[#FEFD0C]/30"
                    }`}
                    onClick={() => setActiveTestimonial(idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;