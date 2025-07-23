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

  const linkStyle =
    "xl:text-[16px] text-[14px] font-inter text-white font-normal hover:text-[#FEFD0C] focus:text-[#FEFD0C] focus:outline-none transition-all duration-300 hover:scale-105 relative group";

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
        <div className="flex flex-col items-center w-full justify-between xl:px-[96px] px-[16px] mx-auto xl:pt-[120px] pb-[40px] pt-[100px] relative z-10">
          
          {/* Trust Metrics */}
          <div className="w-full mb-16">
            <div className="text-center mb-12">
              <div className="inline-block bg-black/40 text-[#FEFD0C] font-medium px-4 py-2 rounded-full text-sm mb-4 border border-[#FEFD0C]/20 backdrop-blur-sm hover:bg-[#FEFD0C]/10 transition-all duration-300">
                <MdSecurity className="inline mr-2" />
                Trusted Platform
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight mb-4">
                Join the Future of 
                <span className="text-[#FEFD0C] block mt-2">Crypto Trading</span>
              </h2>
              <div className="w-20 h-1 bg-[#FEFD0C] rounded-full mx-auto shadow-lg mb-8"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
              {trustMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-black/40 border border-[#FEFD0C]/10 rounded-xl p-6 hover:scale-105 transition-all duration-500">
                    <div className="flex flex-col items-center text-center">
                      <Icon className="text-[#FEFD0C] text-2xl mb-3" />
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                      <p className="text-sm text-white/70">{metric.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col xl:flex-row w-full gap-12">
            {/* Left Column */}
            <div className="xl:w-[35%] w-full">
              <Link to="/" aria-label="SellFastPayFast Home" className="inline-block">
                <div className="bg-black/40 border border-[#FEFD0C]/10 rounded-xl p-6">
                  <img src={logo} alt="SellFastPayFast Logo" className="h-[60px] w-[200px] object-contain" loading="lazy" />
                </div>
              </Link>

              <div className="mt-8 bg-black/40 border border-[#FEFD0C]/10 rounded-xl p-6">
                <p className="text-[14px] xl:text-[18px] text-[#FEFD0C] mb-6">
                  The most trustworthy cryptocurrency exchange platform available.
                  Quick access to your money, whenever you desire.
                </p>
                <div className="inline-block bg-black/40 text-[#FEFD0C] font-medium px-3 py-1 rounded-full text-xs border border-[#FEFD0C]/20">
                  Verified & Secure
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-6 bg-black/40 border border-[#FEFD0C]/10 rounded-xl p-6">
                <h3 className="text-[#FEFD0C] font-semibold text-lg mb-4">Connect With Us</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-black/40 border border-[#FEFD0C]/20 rounded-lg px-3 py-2">
                        <Icon className="text-[#FEFD0C] text-lg" />
                        <span className="text-xs text-[#FEFD0C] font-medium">{social.handle}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="xl:w-[65%] w-full xl:grid xl:grid-cols-2 flex flex-col gap-8">
              {/* QR Code Section Only (App Download removed) */}
              <div className="w-full">
                <div className="bg-black/40 border border-[#FEFD0C]/10 rounded-xl p-8 text-center">
                  <div className="inline-block bg-black/40 text-[#FEFD0C] font-medium px-4 py-2 rounded-full text-sm mb-6 border border-[#FEFD0C]/20">
                    Quick Access
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Scan & <span className="text-[#FEFD0C] block">Get Started</span>
                  </h3>
                  <Suspense fallback={<div className="text-[#FEFD0C]">Loading QR Code...</div>}>
                    <div className="bg-black/40 rounded-lg p-4 inline-block">
                      <Qrcode variant="secondary" aria-label="Scan QR code to download our app" />
                    </div>
                  </Suspense>
                  <p className="text-white/70 text-sm mt-4">Instant access to trading</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex items-center xl:mt-[80px] mt-[60px] w-full">
            <div className="w-full bg-black/40 border border-[#FEFD0C]/10 rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <h3 className="xl:text-base text-[14px] text-white opacity-70">© {currentYear} Sellfastpayfast. All rights reserved.</h3>
                <div className="flex items-center gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FEFD0C] rounded-full animate-pulse"></div>
                    Secure & Trusted
                  </span>
                  <span>•</span>
                  <span>Licensed Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/+447721863850"
          className="fixed bottom-6 right-6 z-50 group"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-500 animate-pulse group-hover:scale-125"></div>
            <div className="relative bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-full">
              <FaWhatsapp className="text-[28px] text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </a>
      </footer>
    </>
  );
};

export default React.memo(Footer);
