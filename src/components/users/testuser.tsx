import React from 'react';
import { User, Bell, Settings } from 'lucide-react';

const CustomHeader = () => {
  // Mock user data - replace with real data
  const userData = {
    name: "Alex Johnson", // Set to null or empty string for "Hello, User"
    username: "@alexj",
  };

  const theme = {
    surface: 'bg-[#0A0A0A]/60 backdrop-blur-xl border-[#FEFD0C]/10',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className={`${theme.surface} rounded-xl p-6 border shadow-2xl shadow-black/50`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FEFD0C] to-[#FEFD0C]/80 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-black" />
                  </div>
                  {/* Enhanced online indicator with green glow */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-black shadow-lg shadow-emerald-400/50 animate-pulse">
                    <div className="absolute inset-0 bg-emerald-400 rounded-full blur-sm opacity-75"></div>
                  </div>
                </div>
                <div>
                  <h1 className={`text-xl font-bold ${theme.text} font-poppins`}>
                    Hello, {userData.name ? userData.name.split(' ')[0] : 'User'}! 👋
                  </h1>
                  <p className={`${theme.textSecondary} text-sm font-poppins`}>
                    Welcome back to your dashboard
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-lg hover:bg-[#FEFD0C]/10 transition-colors">
                  <Bell className={`w-5 h-5 ${theme.textMuted}`} />
                </button>
                <button className="p-2 rounded-lg hover:bg-[#FEFD0C]/10 transition-colors">
                  <Settings className={`w-5 h-5 ${theme.textMuted}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomHeader;