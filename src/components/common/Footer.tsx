// Updated Imports
import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { RiInstagramLine, RiTwitterLine } from "react-icons/ri";
import { MdSecurity, MdTrendingUp, MdAccessTime } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import logo from "../../assets/img/logo-white.png";

// Lazy-loaded QR code
const Qrcode = React.lazy(() => import("./Qrcode"));

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: RiInstagramLine,
      url: "https://www.instagram.com/sfpfglobal?igsh=cDI0eWd6dHZucnZt",
      label: "Instagram",
      handle: "@sfpfglobal"
    },
    {
      icon: RiTwitterLine,
      url: "https://x.com/sfpfglobal01?t=hPKIBjIZeZwD2kZLZ8zjZA&s=09",
      label: "Twitter/X",
      handle: "@sfpfglobal01"
    },
  ];

  const trustMetrics = [
    { icon: MdSecurity, value: "100%", label: "Secure" },
    { icon: RiCustomerService2Line, value: "24/7", label: "Support" },
    { icon: MdTrendingUp, value: "50K+", label: "Users" },
    { icon: MdAccessTime, value: "<2min", label: "Response" }
  ];

  return (
    <>
      <footer className="w-full bg-black relative overflow-hidden" role="contentinfo" aria-label="Site Footer">
        <div className="w-full xl:px-[96px] px-[16px] mx-auto xl:pt-[120px] pb-[40px] pt-[100px] relative z-10">
          
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-block bg-black/40 text-[#FEFD0C] font-medium px-6 py-3 rounded-full text-sm mb-6 border border-[#FEFD0C]/20 backdrop-blur-sm hover:bg-[#FEFD0C]/10 transition-all duration-300">
              <MdSecurity className="inline mr-2" />
              Trusted Platform
            </div>
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
              Join the Future of 
              <span className="text-[#FEFD0C] block mt-2">Crypto Trading</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FEFD0C] to-transparent rounded-full mx-auto shadow-lg mb-8"></div>
            <p className="text-lg xl:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              The most trustworthy cryptocurrency exchange platform available. Quick access to your money, whenever you desire.
            </p>
          </div>

          {/* Trust Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
            {trustMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-black/60 to-black/40 border border-[#FEFD0C]/20 rounded-2xl p-8 hover:scale-105 hover:border-[#FEFD0C]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#FEFD0C]/10">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-[#FEFD0C]/10 p-4 rounded-full mb-4 group-hover:bg-[#FEFD0C]/20 transition-all duration-300">
                        <Icon className="text-[#FEFD0C] text-3xl" />
                      </div>
                      <p className="text-3xl font-bold text-white mb-2">{metric.value}</p>
                      <p className="text-sm text-white/70 font-medium">{metric.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Footer Content */}
          <div className="grid xl:grid-cols-3 gap-12 mb-16">
            
            {/* Brand Section */}
            <div className="xl:col-span-1">
              <Link to="/" aria-label="SellFastPayFast Home" className="inline-block mb-8">
                <div className="bg-gradient-to-br from-black/60 to-black/40 border border-[#FEFD0C]/20 rounded-2xl p-8 hover:border-[#FEFD0C]/40 transition-all duration-300">
                  <img src={logo} alt="SellFastPayFast Logo" className="h-[70px] w-auto object-contain" loading="lazy" />
                </div>
              </Link>

              <div className="bg-gradient-to-br from-black/60 to-black/40 border border-[#FEFD0C]/20 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-[#FEFD0C] rounded-full animate-pulse"></div>
                  <span className="text-[#FEFD0C] font-semibold text-sm">VERIFIED & SECURE</span>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Experience seamless crypto trading with our cutting-edge platform designed for both beginners and professionals.
                </p>
              </div>
            </div>

            {/* Social Media & QR Section */}
            <div className="xl:col-span-2 grid md:grid-cols-2 gap-8">
              
              {/* Social Media */}
              <div className="bg-gradient-to-br from-black/60 to-black/40 border border-[#FEFD0C]/20 rounded-2xl p-8">
                <h3 className="text-[#FEFD0C] font-bold text-xl mb-6 flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FEFD0C] rounded-full"></div>
                  Connect With Us
                </h3>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" 
                         className="flex items-center gap-4 bg-black/40 border border-[#FEFD0C]/10 rounded-xl px-5 py-4 hover:border-[#FEFD0C]/30 hover:bg-black/60 transition-all duration-300 group">
                        <div className="bg-[#FEFD0C]/10 p-3 rounded-full group-hover:bg-[#FEFD0C]/20 transition-all duration-300">
                          <Icon className="text-[#FEFD0C] text-xl" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{social.label}</p>
                          <p className="text-[#FEFD0C] text-sm">{social.handle}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* QR Code Section */}
              <div className="bg-gradient-to-br from-black/60 to-black/40 border border-[#FEFD0C]/20 rounded-2xl p-8 text-center">
                <div className="inline-block bg-[#FEFD0C]/10 text-[#FEFD0C] font-medium px-4 py-2 rounded-full text-sm mb-6 border border-[#FEFD0C]/20">
                  Quick Access
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Scan & <span className="text-[#FEFD0C]">Get Started</span>
                </h3>
                <Suspense fallback={
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#FEFD0C] border-t-transparent"></div>
                  </div>
                }>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 inline-block mb-4 border border-[#FEFD0C]/10">
                    <Qrcode variant="secondary" aria-label="Scan QR code to download our app" />
                  </div>
                </Suspense>
                <p className="text-white/70 text-sm">Instant access to trading platform</p>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="w-full">
            <div className="bg-gradient-to-r from-black/60 via-black/40 to-black/60 border border-[#FEFD0C]/20 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#FEFD0C]/10 rounded-full flex items-center justify-center">
                    <MdSecurity className="text-[#FEFD0C] text-lg" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">© {currentYear} Sellfastpayfast</h3>
                    <p className="text-white/70 text-sm">All rights reserved.</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-white/70">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Secure & Trusted</span>
                  </div>
                  <div className="w-px h-4 bg-white/20"></div>
                  <span className="text-white/70">Licensed Platform</span>
                  <div className="w-px h-4 bg-white/20"></div>
                  <div className="flex items-center gap-2 text-[#FEFD0C]">
                    <div className="w-2 h-2 bg-[#FEFD0C] rounded-full"></div>
                    <span className="font-medium">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced WhatsApp Floating Button */}
        <a
          href="https://wa.me/+447721863850"
          className="fixed bottom-6 right-6 z-50 group"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30 group-hover:opacity-60 group-hover:blur-2xl transition-all duration-500 animate-pulse group-hover:scale-150"></div>
            {/* Outer ring */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full animate-ping opacity-20"></div>
            {/* Button */}
            <div className="relative bg-gradient-to-br from-green-500 to-green-600 p-5 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110">
              <FaWhatsapp className="text-[32px] text-white" />
              {/* Notification dot */}
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full animate-bounce border-2 border-white">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
                <div className="relative w-full h-full bg-red-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </a>

        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-10 w-2 h-2 bg-[#FEFD0C] rounded-full animate-pulse opacity-30"></div>
          <div className="absolute top-1/3 right-20 w-1 h-1 bg-[#FEFD0C] rounded-full animate-pulse opacity-40 animation-delay-300"></div>
          <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-[#FEFD0C] rounded-full animate-pulse opacity-20 animation-delay-700"></div>
          <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-[#FEFD0C] rounded-full animate-pulse opacity-25 animation-delay-1000"></div>
        </div>
      </footer>
    </>
  );
};

export default React.memo(Footer);