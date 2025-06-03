import React from "react";
import { ArrowUpRight } from "lucide-react";

const About = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      
      <section 
        className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
        style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif' }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FEFD0C]/10 via-transparent to-[#FEFD0C]/10"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FEFD0C]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FEFD0C]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Company Story Section */}
          <div className="mb-24">
            <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16">
              <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-block bg-[#FEFD0C]/10 text-[#FEFD0C] font-medium px-4 py-2 rounded-full text-sm mb-2 border border-[#FEFD0C]/20 backdrop-blur-sm">
                  Our Story
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                  Transforming the future of 
                  <span className="text-[#FEFD0C] block mt-2">digital finance</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-[#FEFD0C] to-[#FEFD0C]/50 rounded-full shadow-lg shadow-[#FEFD0C]/20"></div>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  Founded in 2020, our exchange was born from a vision to create the most trustworthy cryptocurrency platform in the market. We've built our reputation on security, reliability, and transparent operations, ensuring our users always have quick access to their assets.
                </p>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  Our journey began when our founders recognized the need for a more accessible and secure gateway to digital assets. Since then, we've grown to serve over 1 million users worldwide while maintaining our core commitment to trust and excellence.
                </p>
                <div className="flex items-center space-x-4 pt-4">
                  <button className="group flex items-center gap-2 text-[#FEFD0C] font-medium hover:text-white transition-all duration-300 hover:scale-105">
                    Learn about our security measures 
                    <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 mt-8 md:mt-0">
                <div className="relative group">
                  <div className="absolute -inset-4 md:-inset-8 rounded-3xl bg-[#FEFD0C]/5 -z-10 group-hover:bg-[#FEFD0C]/10 transition-all duration-500"></div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group-hover:shadow-[#FEFD0C]/20 transition-all duration-500">
                    <img
                      src="https://ik.imagekit.io/shiga/sfpf/Screenshot%202024-04-21%20at%2014.01.30.png?updatedAt=1713705786488"
                      alt="Our company headquarters"
                      className="w-full h-auto object-cover aspect-video md:aspect-square group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-black/80 backdrop-blur-md border border-[#FEFD0C]/20 text-white p-4 rounded-lg shadow-xl shadow-black/50 hidden md:block">
                    <p className="font-semibold text-[#FEFD0C]">Adewale Adebayo</p>
                    <p className="text-sm text-gray-300">Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CEO Section */}
          <div className="mb-24">
            <div className="flex flex-col-reverse md:flex-row items-start gap-12 md:gap-16">
              <div className="w-full md:w-1/2 mt-8 md:mt-0">
                <div className="relative group">
                  <div className="absolute -inset-4 md:-inset-8 rounded-3xl bg-[#FEFD0C]/5 -z-10 group-hover:bg-[#FEFD0C]/10 transition-all duration-500"></div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group-hover:shadow-[#FEFD0C]/20 transition-all duration-500">
                    <img
                      src="https://ik.imagekit.io/shiga/sfpf/Group%20913(1).png?updatedAt=1713736326378"
                      alt="CEO of our exchange"
                      className="w-full h-auto object-cover aspect-video md:aspect-square group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-black/80 backdrop-blur-md border border-[#FEFD0C]/20 text-white p-4 rounded-lg shadow-xl shadow-black/50 hidden md:block">
                    <p className="font-semibold text-[#FEFD0C]">Est. 2020</p>
                    <p className="text-sm text-gray-300">Building the future</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-block bg-[#FEFD0C]/10 text-[#FEFD0C] font-medium px-4 py-2 rounded-full text-sm mb-2 border border-[#FEFD0C]/20 backdrop-blur-sm">
                  Our Leadership
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                  Meet our 
                  <span className="text-[#FEFD0C] block mt-2">visionary CEO</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-[#FEFD0C] to-[#FEFD0C]/50 rounded-full shadow-lg shadow-[#FEFD0C]/20"></div>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  With over 15 years of experience in fintech and blockchain technologies, our CEO has guided our exchange to become one of the most respected platforms in the cryptocurrency space.
                </p>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  Prior to founding our exchange, she led digital transformation initiatives at major financial institutions and contributed to pioneering blockchain research. Her vision combines cutting-edge technology with unwavering ethics to create a platform that truly serves its users.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-lg p-4 hover:border-[#FEFD0C]/30 transition-all duration-300 group">
                    <p className="text-2xl font-bold text-[#FEFD0C] group-hover:scale-110 transition-transform duration-300">200+</p>
                    <p className="text-sm text-gray-400">Team members worldwide</p>
                  </div>
                  <div className="bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-lg p-4 hover:border-[#FEFD0C]/30 transition-all duration-300 group">
                    <p className="text-2xl font-bold text-[#FEFD0C] group-hover:scale-110 transition-transform duration-300">30+</p>
                    <p className="text-sm text-gray-400">Countries supported</p>
                  </div>
                  <div className="bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-lg p-4 hover:border-[#FEFD0C]/30 transition-all duration-300 group">
                    <p className="text-2xl font-bold text-[#FEFD0C] group-hover:scale-110 transition-transform duration-300">$100M+</p>
                    <p className="text-sm text-gray-400">Monthly trading volume</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-block bg-[#FEFD0C]/10 text-[#FEFD0C] font-medium px-4 py-2 rounded-full text-sm border border-[#FEFD0C]/20 backdrop-blur-sm">
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                What drives us 
                <span className="text-[#FEFD0C] block mt-2">forward</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#FEFD0C] to-[#FEFD0C]/50 rounded-full mx-auto shadow-lg shadow-[#FEFD0C]/20"></div>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                We're committed to making cryptocurrency accessible to everyone while maintaining the highest standards of security and service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black/60 backdrop-blur-xl border border-[#FEFD0C]/10 rounded-2xl p-6 shadow-2xl shadow-black/50 hover:shadow-[#FEFD0C]/10 hover:border-[#FEFD0C]/30 transition-all duration-500 group hover:scale-105">
                <div className="w-12 h-12 flex items-center justify-center bg-[#FEFD0C]/10 text-[#FEFD0C] rounded-lg mb-4 group-hover:bg-[#FEFD0C]/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FEFD0C] transition-colors duration-300">Enterprise-grade Security</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  We implement multi-layer security protocols and regular audits to ensure your assets are protected at all times.
                </p>
              </div>
              
              <div className="bg-black/60 backdrop-blur-xl border border-[#FEFD0C]/10 rounded-2xl p-6 shadow-2xl shadow-black/50 hover:shadow-[#FEFD0C]/10 hover:border-[#FEFD0C]/30 transition-all duration-500 group hover:scale-105">
                <div className="w-12 h-12 flex items-center justify-center bg-[#FEFD0C]/10 text-[#FEFD0C] rounded-lg mb-4 group-hover:bg-[#FEFD0C]/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FEFD0C] transition-colors duration-300">Instant Liquidity</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Enjoy quick access to your funds with our high-performance trading engine and deep liquidity pools.
                </p>
              </div>
              
              <div className="bg-black/60 backdrop-blur-xl border border-[#FEFD0C]/10 rounded-2xl p-6 shadow-2xl shadow-black/50 hover:shadow-[#FEFD0C]/10 hover:border-[#FEFD0C]/30 transition-all duration-500 group hover:scale-105">
                <div className="w-12 h-12 flex items-center justify-center bg-[#FEFD0C]/10 text-[#FEFD0C] rounded-lg mb-4 group-hover:bg-[#FEFD0C]/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FEFD0C] transition-colors duration-300">Dedicated Support</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Our 24/7 support team ensures all your questions and concerns are addressed promptly and thoroughly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;