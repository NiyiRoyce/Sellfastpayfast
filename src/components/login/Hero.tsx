import React, { useState, FormEvent } from "react";
import { Eye, EyeOff, Lock, Mail, Shield, Clock, AlertCircle, CheckCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Email validation
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password strength check
  const getPasswordStrength = (password: string): { strength: string; color: string } => {
    if (password.length === 0) return { strength: "", color: "" };
    if (password.length < 6) return { strength: "Weak", color: "text-red-400" };
    if (password.length < 10) return { strength: "Medium", color: "text-yellow-400" };
    return { strength: "Strong", color: "text-green-400" };
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");
    setIsLoading(true);

    // Enhanced validation
    if (!email.trim()) {
      setFormError("Email is required");
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setFormError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setFormError("Password is required");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log({ email, password, rememberMe });
      setSuccessMessage("Login successful! Redirecting...");
      setIsLoading(false);
      
      // Simulate redirect after success
      setTimeout(() => {
        console.log("Redirecting to dashboard...");
      }, 1000);
    }, 1500);
  };

  // Simple navigation handler for demo purposes
  const handleSignupClick = () => {
    // In a real app with React Router, this would be: navigate('/signup')
    console.log("Navigating to /signup");
    alert("Would navigate to /signup in a real app with React Router");
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-black py-8 px-4"
      style={{
        fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 animate-pulse" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(254, 253, 12, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Elements for Visual Interest */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-[#FEFD0C]/5 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#FEFD0C]/3 rounded-full blur-2xl animate-pulse delay-1000"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-sm">
        {/* Security Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-black/90 backdrop-blur-sm border border-[#FEFD0C]/30 rounded-full px-4 py-2 flex items-center space-x-2 hover:border-[#FEFD0C]/50 transition-all duration-300">
            <Shield className="w-4 h-4 text-[#FEFD0C] animate-pulse" />
            <span className="text-xs font-medium text-[#FEFD0C] tracking-wide">SECURE LOGIN</span>
            <Clock className="w-4 h-4 text-[#FEFD0C]" />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-black/90 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl hover:border-gray-700 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-14 w-14 bg-gradient-to-br from-[#FEFD0C]/20 to-[#FEFD0C]/10 border border-[#FEFD0C]/30 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105 hover:rotate-3">
              <Lock className="text-[#FEFD0C] w-7 h-7" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome <span className="text-[#FEFD0C]">Back</span>
            </h1>
            <p className="text-gray-400 text-sm">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg flex items-center space-x-3 animate-fade-in">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{successMessage}</span>
              </div>
            )}

            {/* Error Message */}
            {formError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg flex items-center space-x-3 animate-shake">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{formError}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-colors duration-200" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-gray-800 text-white rounded-lg py-3 pl-10 pr-4 text-sm placeholder-gray-500 transition-all duration-200 focus:outline-none focus:border-[#FEFD0C]/50 focus:bg-black/60 focus:ring-1 focus:ring-[#FEFD0C]/20"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium text-white">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-[#FEFD0C] hover:text-white transition-colors duration-200 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-gray-800 text-white rounded-lg py-3 pl-10 pr-10 text-sm placeholder-gray-500 transition-all duration-200 focus:outline-none focus:border-[#FEFD0C]/50 focus:bg-black/60 focus:ring-1 focus:ring-[#FEFD0C]/20"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FEFD0C] transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Password strength:</span>
                  <span className={`font-medium ${passwordStrength.color}`}>
                    {passwordStrength.strength}
                  </span>
                </div>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded border-2 transition-all duration-200 ${
                    rememberMe 
                      ? 'bg-[#FEFD0C] border-[#FEFD0C] scale-105' 
                      : 'bg-transparent border-gray-500 group-hover:border-[#FEFD0C]/50'
                  }`}>
                    {rememberMe && (
                      <svg className="w-2.5 h-2.5 text-black absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-200">
                  Remember me for 30 days
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-3 text-sm font-semibold rounded-lg transition-all duration-200 relative overflow-hidden ${
                isLoading
                  ? "bg-[#FEFD0C]/60 text-black/70 cursor-not-allowed"
                  : "bg-[#FEFD0C] text-black hover:bg-[#FEFD0C]/90 active:scale-95 hover:shadow-lg hover:shadow-[#FEFD0C]/20"
              }`}
            >
              {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              )}
              {isLoading ? "Signing you in..." : "Sign In"}
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 pt-6 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <button 
                type="button"
                onClick={handleSignupClick}
                className="text-[#FEFD0C] hover:text-white font-medium transition-colors duration-200 hover:underline"
              >
                Create Account
              </button>
            </p>
            
            {/* Security Features */}
            <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1 hover:text-gray-400 transition-colors duration-200">
                <Shield className="w-3 h-3" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center space-x-1 hover:text-gray-400 transition-colors duration-200">
                <Lock className="w-3 h-3" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1 hover:text-gray-400 transition-colors duration-200">
                <Clock className="w-3 h-3" />
                <span>24/7 Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Login;