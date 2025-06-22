import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Shield, Clock, AlertCircle, CheckCircle, User, Phone } from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Email validation
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation
  const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  // Password strength check
  const getPasswordStrength = (password: string): { strength: string; color: string; score: number } => {
    if (password.length === 0) return { strength: "", color: "", score: 0 };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { strength: "Weak", color: "text-red-400", score };
    if (score <= 3) return { strength: "Medium", color: "text-yellow-400", score };
    if (score <= 4) return { strength: "Strong", color: "text-green-400", score };
    return { strength: "Very Strong", color: "text-emerald-400", score };
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");
    setIsLoading(true);

    // Enhanced validation
    if (!formData.firstName.trim()) {
      setFormError("First name is required");
      setIsLoading(false);
      return;
    }

    if (!formData.lastName.trim()) {
      setFormError("Last name is required");
      setIsLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setFormError("Email is required");
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(formData.email)) {
      setFormError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (!formData.phone.trim()) {
      setFormError("Phone number is required");
      setIsLoading(false);
      return;
    }

    if (!isValidPhone(formData.phone)) {
      setFormError("Please enter a valid phone number");
      setIsLoading(false);
      return;
    }

    if (!formData.password.trim()) {
      setFormError("Password is required");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setFormError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      setFormError("Please accept the terms and conditions");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Sign up data:", formData);
      setSuccessMessage("Account created successfully! Welcome aboard!");
      setIsLoading(false);
      
      // Simulate redirect after success
      setTimeout(() => {
        console.log("Redirecting to dashboard...");
      }, 1500);
    }, 2000);
  };

  const passwordStrength = getPasswordStrength(formData.password);

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
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-[#FEFD0C]/4 rounded-full blur-lg animate-pulse delay-500"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Security Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-black/90 backdrop-blur-sm border border-[#FEFD0C]/30 rounded-full px-4 py-2 flex items-center space-x-2 hover:border-[#FEFD0C]/50 transition-all duration-300">
            <Shield className="w-4 h-4 text-[#FEFD0C] animate-pulse" />
            <span className="text-xs font-medium text-[#FEFD0C] tracking-wide">SECURE REGISTRATION</span>
            <Clock className="w-4 h-4 text-[#FEFD0C]" />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-black/90 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl hover:border-gray-700 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-14 w-14 bg-gradient-to-br from-[#FEFD0C]/20 to-[#FEFD0C]/10 border border-[#FEFD0C]/30 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105 hover:rotate-3">
              <User className="text-[#FEFD0C] w-7 h-7" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2">
              Create <span className="text-[#FEFD0C]">Account</span>
            </h1>
            <p className="text-gray-400 text-sm">
              Join us and start your journey today
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

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-white">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full bg-black/40 border border-gray-800 text-white rounded-lg py-3 pl-10 pr-4 text-sm placeholder-gray-500 transition-all duration-200 focus:outline-none focus:border-[#FEFD0C]/50 focus:bg-black/60 focus:ring-1 focus:ring-[#FEFD0C]/20"
                    placeholder="John"
                    autoComplete="given-name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-white">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full bg-black/40 border border-gray-800 text-white rounded-lg py-3 pl-10 pr-4 text-sm placeholder-gray-500 transition-all duration-200 focus:outline-none focus:border-[#FEFD0C]/50 focus:bg-black/60 focus:ring-1 focus:ring-[#FEFD0C]/20"
                    placeholder="Doe"
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-black/40 border border-gray-800 text-white rounded-lg py-3 pl-10 pr-4 text-sm placeholder-gray-500 transition-all duration-200 focus:outline-none focus:border-[#FEFD0C]/50 focus:bg-black/60 focus:ring-1 focus:ring-[#FEFD0C]/20"
                  placeholder="john.doe@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-white">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full bg-black/40 border border-gray-800 text-white rounded-lg py-3 pl-10 pr-4 text-sm placeholder-gray-500 transition-all duration-200 focus:outline-none focus:border-[#FEFD0C]/50 focus:bg-black/60 focus:ring-1 focus:ring-[#FEFD0C]/20"
                  placeholder="+1 (555) 123-4567"
                  autoComplete="tel"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full bg-black/40 border border-gray-800 text-white rounded-lg py-3 pl-10 pr-10 text-sm placeholder-gray-500 transition-all duration-200 focus:outline-none focus:border-[#FEFD0C]/50 focus:bg-black/60 focus:ring-1 focus:ring-[#FEFD0C]/20"
                  placeholder="Create a strong password"
                  autoComplete="new-password"
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
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Password strength:</span>
                    <span className={`font-medium ${passwordStrength.color}`}>
                      {passwordStrength.strength}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        passwordStrength.score <= 2 ? 'bg-red-500' :
                        passwordStrength.score <= 3 ? 'bg-yellow-500' :
                        passwordStrength.score <= 4 ? 'bg-green-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full bg-black/40 border text-white rounded-lg py-3 pl-10 pr-10 text-sm placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-black/60 focus:ring-1 ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : formData.confirmPassword && formData.password === formData.confirmPassword
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
                      : 'border-gray-800 focus:border-[#FEFD0C]/50 focus:ring-[#FEFD0C]/20'
                  }`}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FEFD0C] transition-colors duration-200"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className="text-xs">
                  {formData.password === formData.confirmPassword ? (
                    <span className="text-green-400 flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Passwords match</span>
                    </span>
                  ) : (
                    <span className="text-red-400 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Passwords do not match</span>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={() => setAcceptTerms(!acceptTerms)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded border-2 transition-all duration-200 ${
                    acceptTerms 
                      ? 'bg-[#FEFD0C] border-[#FEFD0C] scale-105' 
                      : 'bg-transparent border-gray-500 group-hover:border-[#FEFD0C]/50'
                  }`}>
                    {acceptTerms && (
                      <svg className="w-2.5 h-2.5 text-black absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-200 leading-relaxed">
                  I agree to the{" "}
                  <button type="button" className="text-[#FEFD0C] hover:text-white underline">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button type="button" className="text-[#FEFD0C] hover:text-white underline">
                    Privacy Policy
                  </button>
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
              {isLoading ? "Creating your account..." : "Create Account"}
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 pt-6 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <button 
                type="button"
                className="text-[#FEFD0C] hover:text-white font-medium transition-colors duration-200 hover:underline"
              >
                Sign In
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

export default SignUp;