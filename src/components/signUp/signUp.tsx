import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaUser, FaPhone } from "react-icons/fa";
import { MdOutlineAlternateEmail, MdAccessTime, MdSecurity } from "react-icons/md";
import { RiShieldKeyholeLine } from "react-icons/ri";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");

    // Basic validation
    if (!firstName.trim() || !lastName.trim()) {
      setFormError("Please enter your full name");
      setIsLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setFormError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setFormError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!agreeToTerms) {
      setFormError("Please agree to the Terms of Service");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      console.log("Signup attempt with:", { 
        firstName, 
        lastName, 
        email, 
        phone, 
        password, 
        agreeToTerms, 
        subscribeNewsletter 
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      
      <div 
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black px-4 py-8 relative overflow-hidden"
        style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif' }}
      >
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FEFD0C]/10 via-transparent to-[#FEFD0C]/10"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FEFD0C]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FEFD0C]/5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="w-full max-w-md bg-black/60 backdrop-blur-xl border border-[#FEFD0C]/10 p-8 rounded-3xl shadow-2xl shadow-black/50 relative">
          
          {/* Enhanced Logo and Heading */}
          <div className="text-center relative z-10 mb-8">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-[#FEFD0C]/10 flex items-center justify-center shadow-lg shadow-[#FEFD0C]/20 mb-6 backdrop-blur-xl border border-[#FEFD0C]/20">
              <RiShieldKeyholeLine className="h-8 w-8 text-[#FEFD0C]" />
            </div>
            
            <div className="inline-block bg-[#FEFD0C]/10 text-[#FEFD0C] font-medium px-4 py-2 rounded-full text-sm mb-4 border border-[#FEFD0C]/20 backdrop-blur-sm">
              <MdAccessTime className="inline mr-2" />
              Secure Registration
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight mb-4">
              Create your 
              <span className="text-[#FEFD0C] block mt-1">account</span>
            </h2>
            
            <div className="w-16 h-1 bg-gradient-to-r from-[#FEFD0C] to-[#FEFD0C]/50 rounded-full mx-auto shadow-lg shadow-[#FEFD0C]/20 mb-6"></div>
            
            <p className="text-sm text-gray-300 leading-relaxed">
              Join thousands of traders in the most secure crypto exchange platform
            </p>
          </div>

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            {formError && (
              <div className="bg-red-500/10 border border-red-500/30 text-white px-4 py-3 rounded-xl text-sm flex items-center space-x-3 backdrop-blur-xl animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{formError}</span>
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-white ml-1">
                  First name
                </label>
                <div className="relative">
                  <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-[#FEFD0C]/10 focus-within:border-[#FEFD0C]/30 transition-all duration-300 hover:border-[#FEFD0C]/20">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaUser className="h-4 w-4" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-transparent px-12 py-3 text-sm text-white placeholder-gray-500 focus:outline-none rounded-xl"
                      placeholder="First name"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-white ml-1">
                  Last name
                </label>
                <div className="relative">
                  <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-[#FEFD0C]/10 focus-within:border-[#FEFD0C]/30 transition-all duration-300 hover:border-[#FEFD0C]/20">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaUser className="h-4 w-4" />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-transparent px-12 py-3 text-sm text-white placeholder-gray-500 focus:outline-none rounded-xl"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white ml-1">
                Email address
              </label>
              <div className="relative">
                <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-[#FEFD0C]/10 focus-within:border-[#FEFD0C]/30 transition-all duration-300 hover:border-[#FEFD0C]/20">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <MdOutlineAlternateEmail className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent px-12 py-3 text-sm text-white placeholder-gray-500 focus:outline-none rounded-xl"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-white ml-1">
                Phone number <span className="text-gray-500">(optional)</span>
              </label>
              <div className="relative">
                <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-[#FEFD0C]/10 focus-within:border-[#FEFD0C]/30 transition-all duration-300 hover:border-[#FEFD0C]/20">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaPhone className="h-4 w-4" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent px-12 py-3 text-sm text-white placeholder-gray-500 focus:outline-none rounded-xl"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-white ml-1">
                Password
              </label>
              <div className="relative">
                <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-[#FEFD0C]/10 focus-within:border-[#FEFD0C]/30 transition-all duration-300 hover:border-[#FEFD0C]/20">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaLock className="h-4 w-4" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent px-12 py-3 text-sm text-white placeholder-gray-500 focus:outline-none rounded-xl pr-12"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FEFD0C] transition-colors duration-300"
                  >
                    {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 ml-1 flex items-center">
                <MdSecurity className="mr-1" />
                Must be at least 8 characters long
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white ml-1">
                Confirm password
              </label>
              <div className="relative">
                <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-[#FEFD0C]/10 focus-within:border-[#FEFD0C]/30 transition-all duration-300 hover:border-[#FEFD0C]/20">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaLock className="h-4 w-4" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent px-12 py-3 text-sm text-white placeholder-gray-500 focus:outline-none rounded-xl pr-12"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FEFD0C] transition-colors duration-300"
                  >
                    {showConfirmPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and Newsletter */}
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="relative flex items-center h-5 mt-0.5">
                  <input
                    id="agree-terms"
                    name="agree-terms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={() => setAgreeToTerms(!agreeToTerms)}
                    className="h-4 w-4 rounded border-gray-700 text-[#FEFD0C] focus:ring-[#FEFD0C] focus:ring-offset-gray-900 cursor-pointer bg-black/40 border-[#FEFD0C]/20"
                  />
                </div>
                <label htmlFor="agree-terms" className="ml-3 block text-sm text-gray-300 cursor-pointer leading-relaxed">
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#FEFD0C] hover:text-white transition-colors underline font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-[#FEFD0C] hover:text-white transition-colors underline font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div className="flex items-start">
                <div className="relative flex items-center h-5 mt-0.5">
                  <input
                    id="subscribe-newsletter"
                    name="subscribe-newsletter"
                    type="checkbox"
                    checked={subscribeNewsletter}
                    onChange={() => setSubscribeNewsletter(!subscribeNewsletter)}
                    className="h-4 w-4 rounded border-gray-700 text-[#FEFD0C] focus:ring-[#FEFD0C] focus:ring-offset-gray-900 cursor-pointer bg-black/40 border-[#FEFD0C]/20"
                  />
                </div>
                <label htmlFor="subscribe-newsletter" className="ml-3 block text-sm text-gray-300 cursor-pointer leading-relaxed">
                  Subscribe to our newsletter for crypto market updates and trading insights
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`group w-full py-4 px-6 rounded-xl font-bold shadow-lg relative overflow-hidden transition-all duration-300 ${
                  isLoading
                    ? "bg-[#FEFD0C]/50 text-gray-800 cursor-not-allowed"
                    : "bg-[#FEFD0C] text-black hover:bg-yellow-300 hover:shadow-[#FEFD0C]/20 transform hover:scale-105"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating your account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <svg
                        className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 border-t border-[#FEFD0C]/10 pt-6">
            <div className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#FEFD0C] hover:text-white transition-colors duration-300"
              >
                Sign in here
              </Link>
            </div>
          </div>
          
          {/* Security Features */}
          <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center">
              <FaLock className="h-3 w-3 mr-1.5" />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center">
              <MdSecurity className="h-3 w-3 mr-1.5" />
              <span>Bank-grade Security</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;