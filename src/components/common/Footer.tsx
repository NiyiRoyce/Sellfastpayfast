import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { FaGooglePlay, FaApple, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { RiInstagramLine, RiTwitterLine } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineAlternateEmail, MdAccessTime, MdSecurity, MdTrendingUp } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import logo from "../../assets/img/logo-white.png";

// Lazy-loaded components
const Qrcode = React.lazy(() => import("./Qrcode"));
const AppButton = React.lazy(() =>
  import("./Buttons").then(mod => ({ default: mod.AppButton }))
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const linkStyle =
    "xl:text-[16px] text-[14px] font-inter text-white font-normal hover:text-[#FEFD0C] focus:text-[#FEFD0C] focus:outline-none transition-all duration-300 hover:scale-105";

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
    {
      icon: FaTelegram,
      url: "https://t.me/tradewithbnaira01",
      label: "Telegram",
      handle: "@tradewithbnaira01"
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
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      
      <footer
        className="w-full bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
        style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif' }}
        role="contentinfo"
        aria-label="Site Footer"
      >
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FEFD0C]/20 via-transparent to-[#FEFD0C]/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FEFD0C]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FEFD0C]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#FEFD0C]/5 to-transparent rounded-full"></div>
        </div>

        <div className="flex flex-col items-center w-full justify-between xl:px-[96px] px-[16px] mx-auto xl:pt-[120px] pb-[40px] pt-[100px] relative z-10">
          
          {/* Trust Metrics Section */}
          <div className="w-full mb-16">
            <div className="text-center mb-12">
              <div className="inline-block bg-[#FEFD0C]/10 text-[#FEFD0C] font-medium px-4 py-2 rounded-full text-sm mb-4 border border-[#FEFD0C]/20 backdrop-blur-sm">
                <MdSecurity className="inline mr-2" />
                Trusted Platform
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight mb-4">
                Join the Future of 
                <span className="text-[#FEFD0C] block mt-2">Crypto Trading</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#FEFD0C] to-[#FEFD0C]/50 rounded-full mx-auto shadow-lg shadow-[#FEFD0C]/20 mb-8"></div>
            </div>
            
            {/* Trust Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
              {trustMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-xl p-6 hover:border-[#FEFD0C]/30 transition-all duration-500 group hover:scale-105 hover:shadow-lg hover:shadow-[#FEFD0C]/10">
                    <div className="flex flex-col items-center text-center">
                      <Icon className="text-[#FEFD0C] text-2xl mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <p className="text-2xl font-bold text-white group-hover:text-[#FEFD0C] transition-colors duration-300">{metric.value}</p>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{metric.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col xl:flex-row w-full h-full relative gap-12">
            {/* Left Column - Enhanced */}
            <div className="xl:w-[35%] w-full">
              <Link to="/" aria-label="SellFastPayFast Home" className="inline-block group">
                <div className="bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-xl p-6 hover:border-[#FEFD0C]/30 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-[#FEFD0C]/10">
                  <img
                    src={logo}
                    alt="SellFastPayFast Logo"
                    className="h-[60px] w-[200px] object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width="200"
                    height="60"
                  />
                </div>
              </Link>
              
              <div className="mt-8 bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-xl p-6 hover:border-[#FEFD0C]/30 transition-all duration-500">
                <p className="font-normal xl:text-[18px] tracking-wide text-[14px] leading-[30px] text-[#FEFD0C] font-inter mb-6">
                  The most trustworthy cryptocurrency exchange platform available.
                  Where you can have quick access to your money whenever you desire.
                </p>
                
                <div className="inline-block bg-[#FEFD0C]/10 text-[#FEFD0C] font-medium px-3 py-1 rounded-full text-xs mb-4 border border-[#FEFD0C]/20">
                  Verified & Secure
                </div>
              </div>

              {/* Contact Information - Enhanced */}
              <div className="mt-6 bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-xl p-6 hover:border-[#FEFD0C]/30 transition-all duration-500">
                <h3 className="text-[#FEFD0C] font-semibold text-lg mb-4 flex items-center">
                  <RiCustomerService2Line className="mr-2" />
                  Contact Us
                </h3>
                <address className="not-italic text-white font-inter text-[14px] xl:text-[16px] space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#FEFD0C]/5 transition-colors duration-300 group">
                    <div className="w-10 h-10 bg-[#FEFD0C]/10 rounded-lg flex items-center justify-center group-hover:bg-[#FEFD0C]/20 transition-colors duration-300">
                      <FiPhoneCall className="text-[#FEFD0C] text-lg" aria-hidden="true" />
                    </div>
                    <a
                      href="tel:+447510755472"
                      className={linkStyle}
                      aria-label="Call us at +447510755472"
                    >
                      +447510755472
                    </a>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#FEFD0C]/5 transition-colors duration-300 group">
                    <div className="w-10 h-10 bg-[#FEFD0C]/10 rounded-lg flex items-center justify-center group-hover:bg-[#FEFD0C]/20 transition-colors duration-300">
                      <MdOutlineAlternateEmail className="text-[#FEFD0C] text-lg" aria-hidden="true" />
                    </div>
                    <a
                      href="mailto:tradewithbnaira01@gmail.com"
                      className={linkStyle}
                      aria-label="Email us"
                    >
                      tradewithbnaira01@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#FEFD0C]/5 transition-colors duration-300 group">
                    <div className="w-10 h-10 bg-[#FEFD0C]/10 rounded-lg flex items-center justify-center group-hover:bg-[#FEFD0C]/20 transition-colors duration-300">
                      <HiOutlineLocationMarker className="text-[#FEFD0C] text-lg" aria-hidden="true" />
                    </div>
                    <span className={linkStyle}>London, United Kingdom</span>
                  </div>
                </address>
              </div>

              {/* Social Media Links - Enhanced */}
              <div className="mt-6 bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-xl p-6 hover:border-[#FEFD0C]/30 transition-all duration-500">
                <h3 className="text-[#FEFD0C] font-semibold text-lg mb-4">Connect With Us</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#FEFD0C]/10 hover:bg-[#FEFD0C]/20 border border-[#FEFD0C]/20 hover:border-[#FEFD0C]/40 rounded-lg px-3 py-2 transition-all duration-300 group hover:scale-105"
                        aria-label={`Follow us on ${social.label}`}
                      >
                        <Icon className="text-[#FEFD0C] text-lg group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-xs text-[#FEFD0C] font-medium">{social.handle}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced */}
            <div className="xl:w-[65%] w-full xl:grid xl:grid-cols-2 flex flex-col gap-8 z-10">
              {/* QR Code Section - Enhanced */}
              <div className="w-full">
                <div className="bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-xl p-8 hover:border-[#FEFD0C]/30 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-[#FEFD0C]/10 text-center">
                  <div className="inline-block bg-[#FEFD0C]/10 text-[#FEFD0C] font-medium px-4 py-2 rounded-full text-sm mb-6 border border-[#FEFD0C]/20">
                    Quick Access
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Scan & 
                    <span className="text-[#FEFD0C] block">Get Started</span>
                  </h3>
                  <div className="hidden xl:block">
                    <Suspense fallback={
                      <div className="bg-[#FEFD0C]/5 rounded-lg p-8 animate-pulse">
                        <div className="text-[#FEFD0C]">Loading QR Code...</div>
                      </div>
                    }>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
                        <Qrcode variant="secondary" aria-label="Scan QR code to download our app" />
                      </div>
                    </Suspense>
                  </div>
                  <p className="text-gray-400 text-sm mt-4">Instant access to trading</p>
                </div>
              </div>

              {/* App Download Section - Enhanced */}
              <div className="w-full">
                <div className="bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-xl p-8 hover:border-[#FEFD0C]/30 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-[#FEFD0C]/10">
                  <div className="text-center mb-6">
                    <div className="inline-block bg-[#FEFD0C]/10 text-[#FEFD0C] font-medium px-4 py-2 rounded-full text-sm mb-4 border border-[#FEFD0C]/20">
                      Mobile Apps
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Download Our 
                      <span className="text-[#FEFD0C] block">Trading App</span>
                    </h3>
                    <p className="text-gray-400 text-sm">Trade crypto on the go</p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-4">
                    <Suspense fallback={
                      <div className="space-y-4 w-full">
                        <div className="bg-[#FEFD0C]/5 rounded-lg p-4 animate-pulse">Loading App Buttons...</div>
                        <div className="bg-[#FEFD0C]/5 rounded-lg p-4 animate-pulse">Loading App Buttons...</div>
                      </div>
                    }>
                      <div className="transform hover:scale-105 transition-transform duration-300 w-full">
                        <AppButton
                          icon={FaGooglePlay}
                          label="Get it on"
                          placeholder="Google Play"
                          href="https://play.google.com/store/apps/details?id=com.brandboxafrica.sellfast&hl=en&gl=US&pli=1"
                          aria-label="Download our app on Google Play"
                        />
                      </div>
                      <div className="transform hover:scale-105 transition-transform duration-300 w-full">
                        <AppButton
                          icon={FaApple}
                          label="Download on the"
                          placeholder="App Store"
                          href="https://apps.apple.com/us/app/sellfastpayfast/id1525149238"
                          aria-label="Download our app on the App Store"
                        />
                      </div>
                    </Suspense>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-[#FEFD0C]/10 text-center">
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Available on both platforms
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Background Decoration */}
            <div className="absolute right-[-100px] top-[100px] xl:block hidden opacity-20">
              <div className="relative">
                <div className="w-[400px] h-[600px] bg-gradient-to-br from-[#FEFD0C]/20 via-[#FEFD0C]/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/4 left-1/4 w-[200px] h-[300px] bg-gradient-to-tl from-[#FEFD0C]/30 via-transparent to-[#FEFD0C]/10 rounded-full blur-2xl animate-pulse delay-500"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Copyright Section */}
          <div className="flex items-center xl:mt-[80px] mt-[60px] w-full">
            <div className="w-full bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-xl p-6 hover:border-[#FEFD0C]/30 transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <h3 className="xl:text-base text-[14px] text-white opacity-70 font-inter">
                  © {currentYear} Sellfastpayfast. All rights reserved.
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
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

        {/* Enhanced WhatsApp Floating Button */}
        <a
          href="https://wa.link/vprjk4"
          className="fixed bottom-6 right-6 z-50 group"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 transform group-hover:scale-110 shadow-2xl border-2 border-green-400/30">
              <FaWhatsapp className="text-[28px] text-white" aria-hidden="true" />
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