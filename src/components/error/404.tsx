import React, { useState, useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";

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
        className="h-screen w-screen flex items-center justify-center relative overflow-hidden"
        style={{ 
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Subtle background elements */}
        <div className="absolute inset-0 opacity-3 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="text-center px-6 max-w-lg relative z-10">
          
          {/* 404 with glitch effect */}
          <div className="relative mb-8">
            <h1 
              className={`text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300 leading-none tracking-tight transition-all duration-200 ${
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
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 leading-tight">
              Page not found
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              The page you're looking for doesn't exist.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20">
            <button
              onClick={() => alert('Go Home clicked')}
              className="group inline-flex items-center justify-center px-8 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 hover:scale-105 transition-all duration-300 cursor-pointer relative z-30"
            >
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </button>

            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center justify-center px-8 py-3 bg-transparent border border-gray-600 text-gray-300 font-medium rounded-xl hover:border-yellow-400/40 hover:text-white transition-all duration-300 cursor-pointer relative z-30"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;