import React, { useState, useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";

// Theme configuration matching your settings page
const theme = {
  primary: 'from-[#FEFD0C] to-[#FEFD0C]/90',
  primaryHover: 'from-[#FEFD0C]/90 to-[#FEFD0C]',
  primaryColor: '#FEFD0C',
  secondary: 'from-gray-800 to-gray-900',
  secondaryHover: 'from-gray-700 to-gray-800',
  background: 'bg-black',
  surface: 'bg-black/60 backdrop-blur-xl border-[#FEFD0C]/10',
  surfaceHover: 'bg-black/80',
  text: 'text-white',
  textSecondary: 'text-gray-300',
  textMuted: 'text-gray-400',
  border: 'border-[#FEFD0C]/10',
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-[#FEFD0C]',
  input: 'bg-black/40 border-[#FEFD0C]/20 focus:border-[#FEFD0C] focus:ring-[#FEFD0C]/20'
} as const;

const NotFound = () => {
  const [glitchEffect, setGlitchEffect] = useState(false);

  // Periodic glitch effect for the 404 text
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      
      <div 
        className={`h-screen w-screen flex items-center justify-center relative overflow-hidden ${theme.background}`}
        style={{ 
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
        }}
      >
        {/* Subtle background elements - no gradient */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-[600px] h-[600px] bg-[#FEFD0C]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/6 w-[600px] h-[600px] bg-[#FEFD0C]/5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="text-center px-6 max-w-lg relative z-10">
          
          {/* 404 with glitch effect */}
          <div className="relative mb-8">
            <h1 
              className={`text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r ${theme.primary} leading-none tracking-tight transition-all duration-200 ${
                glitchEffect ? 'animate-pulse scale-105' : ''
              }`}
              style={{
                textShadow: glitchEffect ? '2px 2px 0px #ff0000, -2px -2px 0px #00ff00' : 'none'
              }}
            >
              404
            </h1>
            {glitchEffect && (
              <div className="absolute inset-0 text-8xl sm:text-9xl font-black text-red-500/20 leading-none tracking-tight transform translate-x-1 -translate-y-1 pointer-events-none">
                404
              </div>
            )}
          </div>

          {/* Main message */}
          <div className="mb-12">
            <h2 className={`text-xl sm:text-2xl font-semibold ${theme.text} mb-3 leading-tight`}>
              Page not found
            </h2>
            <p className={`${theme.textMuted} text-sm sm:text-base leading-relaxed`}>
              The page you're looking for doesn't exist.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20">
            <button
              onClick={() => window.location.href = '/'}
              className={`group inline-flex items-center justify-center px-8 py-3 bg-[#FEFD0C] text-black font-semibold rounded-xl hover:bg-[#FEFD0C]/90 hover:scale-105 transition-all duration-300 cursor-pointer relative z-30 shadow-lg hover:shadow-xl hover:shadow-[#FEFD0C]/20 hover:-translate-y-0.5`}
            >
              <Home className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Go Home
            </button>

            <button
              onClick={() => window.history.back()}
              className={`group inline-flex items-center justify-center px-8 py-3 ${theme.surface} ${theme.border} border ${theme.textSecondary} font-medium rounded-xl hover:border-[#FEFD0C]/40 hover:text-white transition-all duration-300 cursor-pointer relative z-30 hover:scale-105 hover:-translate-y-0.5 shadow-md hover:shadow-xl hover:shadow-[#FEFD0C]/10`}
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-x-1" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;