import React, { useState } from "react";
import { MdOutlineAlternateEmail, MdHeadsetMic, MdHelp, MdForum, MdChat, MdAccessTime } from "react-icons/md";
import { RiCustomerService2Line, RiQuestionAnswerLine } from "react-icons/ri";
import { FaTelegram } from "react-icons/fa";
import { RiInstagramLine, RiTwitterLine } from "react-icons/ri";

// Support channels data
const supportChannels = [
  {
    id: 1,
    title: "24/7 Live Chat",
    description: "Get instant help from our support team",
    icon: RiCustomerService2Line,
    url: "/login",
    primary: true,
    availability: "Available 24/7",
    responseTime: "< 2 minutes"
  },
  {
    id: 2,
    title: "Help Center",
    description: "Browse FAQs and comprehensive tutorials",
    icon: MdHelp,
    url: "/login",
    primary: true,
    availability: "Always available",
    responseTime: "Instant"
  },
  {
    id: 3,
    title: "Submit Ticket",
    description: "Create a detailed support request",
    icon: MdHeadsetMic,
    url: "/login",
    primary: true,
    availability: "24/7 Processing",
    responseTime: "< 4 hours"
  },
  {
    id: 4,
    title: "Community Forum",
    description: "Connect with other users and experts",
    icon: MdForum,
    url: "/login",
    primary: true,
    availability: "Community driven",
    responseTime: "Varies"
  },
];

// Only social media contacts with real URLs
const socialContacts = [
  {
    id: 1,
    title: "Email Support",
    description: "Direct email communication",
    email: "tradewithbnaira01@gmail.com",
    icon: MdOutlineAlternateEmail,
    url: "mailto:tradewithbnaira01@gmail.com",
    category: "Direct Contact"
  },
  {
    id: 2,
    title: "Instagram",
    description: "Follow our visual updates and trading tips",
    handle: "@sfpfglobal",
    icon: RiInstagramLine,
    url: "https://www.instagram.com/sfpfglobal?igsh=cDI0eWd6dHZucnZt",
    category: "Social Media"
  },
  {
    id: 3,
    title: "Twitter/X",
    description: "Latest news and market announcements",
    handle: "@sfpfglobal01",
    icon: RiTwitterLine,
    url: "https://x.com/sfpfglobal01?t=hPKIBjIZeZwD2kZLZ8zjZA&s=09",
    category: "Social Media"
  },
  {
    id: 4,
    title: "Telegram Community",
    description: "Join our active trading community",
    handle: "@tradewithbnaira01",
    icon: FaTelegram,
    url: "https://t.me/tradewithbnaira01",
    category: "Community"
  },
];

interface SupportChannelItem {
  id: number;
  url: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  primary?: boolean;
  availability?: string;
  responseTime?: string;
  category?: string;
  handle?: string;
  email?: string;
}

// Enhanced FAQ section data
const faqItems = [
  {
    question: "How do I reset my password?",
    answer: "Go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email to reset your password. If you don't receive the email within 5 minutes, check your spam folder or contact support.",
    category: "Account"
  },
  {
    question: "How long do withdrawals take?",
    answer: "Most withdrawals are processed within 30 minutes, but can take up to 24 hours depending on the network congestion and verification requirements. Premium users enjoy priority processing with faster withdrawal times.",
    category: "Transactions"
  },
  {
    question: "Is my crypto safe on your platform?",
    answer: "We implement industry-leading security measures including cold storage for 95% of assets, multi-signature wallets, 2FA authentication, and regular third-party security audits to ensure the safety of your funds.",
    category: "Security"
  },
  {
    question: "How do I verify my account?",
    answer: "Navigate to the 'Account' section and select 'Verification'. Follow the step-by-step process to upload your identification documents. Verification typically takes 2-24 hours to complete.",
    category: "Account"
  },
  {
    question: "What trading fees do you charge?",
    answer: "Our trading fees are competitive and transparent. Maker fees start at 0.1% and taker fees at 0.15%. Volume-based discounts are available for high-frequency traders. Check our fee schedule for detailed information.",
    category: "Trading"
  },
  {
    question: "How can I enable two-factor authentication?",
    answer: "Go to Security Settings in your account dashboard. Download an authenticator app like Google Authenticator, scan the QR code, and enter the verification code. We strongly recommend enabling 2FA for enhanced security.",
    category: "Security"
  },
];

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'channels' | 'social' | 'faq'>('channels');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqCategories = ['All', ...Array.from(new Set(faqItems.map(item => item.category)))];
  const filteredFaqs = selectedCategory === 'All' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      
      <section 
        className="w-full py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden"
        style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif' }}
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Enhanced Header with Stats */}
          <div className="text-center mb-16">
            <div className="inline-block bg-black/40 text-[#FEFD0C] font-medium px-4 py-2 rounded-full text-sm mb-4 border border-[#FEFD0C]/20 backdrop-blur-sm">
              <MdAccessTime className="inline mr-2" />
              24/7 Support Available
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
              We're Here to 
              <span className="text-[#FEFD0C] block mt-2">Help You</span>
            </h2>
            <div className="w-20 h-1 bg-[#FEFD0C] rounded-full mx-auto shadow-lg shadow-[#FEFD0C]/20 mb-8"></div>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
              Our dedicated team is always available to help you navigate the crypto world with confidence and security.
            </p>
            
            {/* Support Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-lg p-4 hover:border-[#FEFD0C]/30 transition-all duration-300 group">
                <p className="text-2xl font-bold text-[#FEFD0C] group-hover:scale-110 transition-transform duration-300">24/7</p>
                <p className="text-sm text-gray-400">Support Available</p>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-lg p-4 hover:border-[#FEFD0C]/30 transition-all duration-300 group">
                <p className="text-2xl font-bold text-[#FEFD0C] group-hover:scale-110 transition-transform duration-300">&lt;2min</p>
                <p className="text-sm text-gray-400">Average Response</p>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-lg p-4 hover:border-[#FEFD0C]/30 transition-all duration-300 group">
                <p className="text-2xl font-bold text-[#FEFD0C] group-hover:scale-110 transition-transform duration-300">99.9%</p>
                <p className="text-sm text-gray-400">Satisfaction Rate</p>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-lg p-4 hover:border-[#FEFD0C]/30 transition-all duration-300 group">
                <p className="text-2xl font-bold text-[#FEFD0C] group-hover:scale-110 transition-transform duration-300">50K+</p>
                <p className="text-sm text-gray-400">Users Helped</p>
              </div>
            </div>
          </div>

          {/* Enhanced Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-xl bg-black/40 backdrop-blur-xl border border-[#FEFD0C]/10 p-1.5 shadow-2xl shadow-black/50">
              <button
                onClick={() => setActiveTab("channels")}
                className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === "channels"
                    ? "bg-[#FEFD0C] text-black shadow-lg transform scale-105"
                    : "text-white hover:text-[#FEFD0C] hover:bg-white/5"
                }`}
              >
                <RiCustomerService2Line className="mr-2" />
                Support Channels
              </button>
              <button
                onClick={() => setActiveTab("social")}
                className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === "social"
                    ? "bg-[#FEFD0C] text-black shadow-lg transform scale-105"
                    : "text-white hover:text-[#FEFD0C] hover:bg-white/5"
                }`}
              >
                <MdChat className="mr-2" />
                Connect With Us
              </button>
              <button
                onClick={() => setActiveTab("faq")}
                className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === "faq"
                    ? "bg-[#FEFD0C] text-black shadow-lg transform scale-105"
                    : "text-white hover:text-[#FEFD0C] hover:bg-white/5"
                }`}
              >
                <RiQuestionAnswerLine className="mr-2" />
                FAQ
              </button>
            </div>
          </div>

          {/* Enhanced Support Channels Section */}
          {activeTab === "channels" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportChannels.map((item: SupportChannelItem) => {
                const Icon = item.icon;
                return (
                  <a
                    href={item.url}
                    key={item.id}
                    className="bg-black/40 backdrop-blur-xl border border-[#FEFD0C]/10 rounded-2xl p-6 shadow-2xl shadow-black/50 hover:shadow-[#FEFD0C]/10 hover:border-[#FEFD0C]/30 transition-all duration-500 group hover:scale-105"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-[#FEFD0C]/10 text-[#FEFD0C] rounded-lg mb-4 group-hover:bg-[#FEFD0C]/20 transition-all duration-300">
                      <Icon className="text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FEFD0C] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4">
                      {item.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <div className="w-2 h-2 bg-[#FEFD0C] rounded-full mr-2"></div>
                        {item.availability}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MdAccessTime className="w-4 h-4 mr-2" />
                        Response: {item.responseTime}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-[#FEFD0C]/10 flex items-center text-[#FEFD0C] group-hover:text-white transition-colors duration-300">
                      <span className="text-sm font-semibold">Get Help Now</span>
                      <svg
                        className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {/* Enhanced Social Media & Contact Section */}
          {activeTab === "social" && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {socialContacts.map((item: SupportChannelItem) => {
                  const Icon = item.icon;
                  return (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={item.id}
                      className="flex items-center bg-black/40 backdrop-blur-xl border border-[#FEFD0C]/10 rounded-2xl p-6 shadow-2xl shadow-black/50 hover:shadow-[#FEFD0C]/10 hover:border-[#FEFD0C]/30 transition-all duration-500 group hover:scale-105"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-[#FEFD0C]/10 flex items-center justify-center mr-4 group-hover:bg-[#FEFD0C]/20 group-hover:scale-110 transition-all duration-300">
                        <Icon className="text-[#FEFD0C] text-2xl" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h3 className="text-lg font-bold text-white group-hover:text-[#FEFD0C] transition-colors duration-300 mr-2">
                            {item.title}
                          </h3>
                          <span className="text-xs bg-[#FEFD0C]/10 text-[#FEFD0C] px-2 py-1 rounded-full border border-[#FEFD0C]/20">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm mb-2">{item.description}</p>
                        <div className="text-[#FEFD0C] font-medium text-sm">
                          {item.handle || item.email}
                        </div>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-500 group-hover:text-[#FEFD0C] transition-colors duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Enhanced FAQ Section */}
          {activeTab === "faq" && (
            <div className="max-w-4xl mx-auto">
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {faqCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-[#FEFD0C] text-black shadow-lg"
                        : "bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 text-[#FEFD0C] hover:border-[#FEFD0C]/30"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="bg-black/40 backdrop-blur-xl border border-[#FEFD0C]/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden hover:border-[#FEFD0C]/30 transition-all duration-500">
                    <button
                      className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none hover:bg-[#FEFD0C]/5 transition-colors duration-300"
                      onClick={() => toggleFaq(index)}
                    >
                      <div className="flex items-center">
                        <span className="text-lg font-semibold text-white mr-3">
                          {faq.question}
                        </span>
                        <span className="text-xs bg-[#FEFD0C]/10 text-[#FEFD0C] px-2 py-1 rounded-full border border-[#FEFD0C]/20">
                          {faq.category}
                        </span>
                      </div>
                      <svg
                        className={`w-6 h-6 text-[#FEFD0C] transform transition-transform duration-300 ${
                          expandedFaq === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                        expandedFaq === index
                          ? "max-h-96 pb-6 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="border-t border-[#FEFD0C]/10 pt-4">
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Contact CTA Section */}
          <div className="mt-20 bg-black/40 backdrop-blur-xl border border-[#FEFD0C]/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-black/50">
            <div className="max-w-3xl mx-auto">
              <div className="inline-block bg-[#FEFD0C]/10 text-[#FEFD0C] font-medium px-4 py-2 rounded-full text-sm mb-4 border border-[#FEFD0C]/20 backdrop-blur-sm">
                Personal Assistance
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight mb-6">
                Still Need 
                <span className="text-[#FEFD0C] block mt-2">Personal Help?</span>
              </h3>
              <div className="w-20 h-1 bg-[#FEFD0C] rounded-full mx-auto shadow-lg shadow-[#FEFD0C]/20 mb-8"></div>
              <p className="mb-8 text-gray-300 text-base md:text-lg leading-relaxed">
                Our expert support team is available around the clock to provide personalized help with your crypto trading journey. Don't hesitate to reach out!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="/login"
                  className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FEFD0C] text-black font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#FEFD0C]/20"
                >
                  <RiCustomerService2Line className="mr-2 text-xl group-hover:rotate-12 transition-transform duration-300" />
                  Contact Support Team
                </a>
                <a
                  href="/login"
                  className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-transparent border-2 border-[#FEFD0C] text-[#FEFD0C] font-bold hover:bg-[#FEFD0C] hover:text-black transition-all duration-300 transform hover:scale-105"
                >
                  <MdChat className="mr-2 text-xl group-hover:scale-110 transition-transform duration-300" />
                  Start Live Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Support;