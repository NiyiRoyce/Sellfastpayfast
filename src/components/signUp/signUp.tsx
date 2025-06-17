import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaUser, FaPhone, FaChevronDown } from "react-icons/fa";
import { MdOutlineAlternateEmail, MdAccessTime } from "react-icons/md";
import { RiShieldKeyholeLine } from "react-icons/ri";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({ code: "+1", flag: "🇺🇸", name: "US" });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const countries = [
  { code: "+61", flag: "🇦🇺", name: "AU" },
  { code: "+55", flag: "🇧🇷", name: "BR" },
  { code: "+1", flag: "🇨🇦", name: "CA" },
  { code: "+86", flag: "🇨🇳", name: "CN" },
  { code: "+213", flag: "🇩🇿", name: "DZ" },
  { code: "+20", flag: "🇪🇬", name: "EG" },
  { code: "+251", flag: "🇪🇹", name: "ET" },
  { code: "+33", flag: "🇫🇷", name: "FR" },
  { code: "+233", flag: "🇬🇭", name: "GH" },
  { code: "+91", flag: "🇮🇳", name: "IN" },
  { code: "+39", flag: "🇮🇹", name: "IT" },
  { code: "+81", flag: "🇯🇵", name: "JP" },
  { code: "+254", flag: "🇰🇪", name: "KE" },
  { code: "+212", flag: "🇲🇦", name: "MA" },
  { code: "+52", flag: "🇲🇽", name: "MX" },
  { code: "+234", flag: "🇳🇬", name: "NG" },
  { code: "+7", flag: "🇷🇺", name: "RU" },
  { code: "+34", flag: "🇪🇸", name: "ES" },
  { code: "+27", flag: "🇿🇦", name: "ZA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+1", flag: "🇺🇸", name: "US" }
];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const setError = (msg: string) => {
    setFormError(msg);
    setIsLoading(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");

    const { firstName, lastName, email, password, confirmPassword } = form;

    if (!firstName || !lastName) {
      return setError("Please enter your full name");
    }

    if (!email.includes("@")) {
      return setError("Enter a valid email address");
    }

    if (password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (!agreeToTerms) {
      return setError("You must accept the Terms of Service");
    }

    // Simulate async signup action
    setTimeout(() => {
      console.log("Signup data:", { 
        ...form, 
        fullPhone: `${selectedCountry.code}${form.phone}`,
        agreeToTerms, 
        subscribeNewsletter 
      });
      setIsLoading(false);
    }, 1500);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCountryDropdown && !(event.target as Element)?.closest('.relative')) {
        setShowCountryDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCountryDropdown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black px-4 py-10 font-[Inter]">
      {/* Background Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FEFD0C]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FEFD0C]/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-lg bg-black/70 border border-[#FEFD0C]/10 rounded-2xl p-8 shadow-xl backdrop-blur-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto h-12 w-12 bg-[#FEFD0C]/10 border border-[#FEFD0C]/20 rounded-lg flex items-center justify-center mb-3">
            <RiShieldKeyholeLine className="text-[#FEFD0C] w-6 h-6" />
          </div>
          <div className="text-[#FEFD0C] text-xs font-medium tracking-wide flex justify-center items-center gap-1 bg-[#FEFD0C]/10 border border-[#FEFD0C]/20 px-3 py-1 rounded-full w-fit mx-auto mb-1">
            <MdAccessTime className="text-sm" />
            Secure Registration
          </div>
          <h1 className="text-3xl font-semibold text-white mt-1">
            Create Your <span className="text-[#FEFD0C]">Account</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Join our secure crypto platform
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {formError && (
            <div className="bg-red-500/10 border border-red-500/30 text-sm text-red-400 px-3 py-2 rounded-md flex items-center gap-2">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a7 7 0 100 14A7 7 0 009 2zM8 9h2v3H8V9zm0-4h2v2H8V5z" />
              </svg>
              {formError}
            </div>
          )}

          {/* Name Fields */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-sm text-white mb-1">
                First Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-[#FEFD0C]/10 text-white rounded-lg py-2.5 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:border-[#FEFD0C]/40"
                  placeholder="First name"
                />
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block text-sm text-white mb-1">
                Last Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-[#FEFD0C]/10 text-white rounded-lg py-2.5 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:border-[#FEFD0C]/40"
                  placeholder="Last name"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-white mb-1">
              Email
            </label>
            <div className="relative">
              <MdOutlineAlternateEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-black/40 border border-[#FEFD0C]/10 text-white rounded-lg py-2.5 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:border-[#FEFD0C]/40"
                placeholder="your_name@domain.com"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm text-white mb-1">
              Phone (Optional)
            </label>
            <div className="relative flex">
              {/* Country Code Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center gap-2 bg-black/40 border border-[#FEFD0C]/10 border-r-0 text-white rounded-l-lg py-2.5 px-3 text-sm hover:bg-black/60 focus:outline-none focus:border-[#FEFD0C]/40"
                >
                  <span className="text-base">{selectedCountry.flag}</span>
                  <span className="text-gray-300">{selectedCountry.code}</span>
                  <FaChevronDown className="text-gray-400 text-xs" />
                </button>
                
                {/* Dropdown Menu */}
                {showCountryDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-black/90 border border-[#FEFD0C]/20 rounded-lg shadow-xl backdrop-blur-lg z-50 max-h-48 overflow-y-auto">
                    {countries.map((country, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country);
                          setShowCountryDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-[#FEFD0C]/10 focus:outline-none focus:bg-[#FEFD0C]/10"
                      >
                        <span className="text-base">{country.flag}</span>
                        <span className="flex-1 text-left">{country.name}</span>
                        <span className="text-gray-400">{country.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Phone Input */}
              <div className="relative flex-1">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-[#FEFD0C]/10 text-white rounded-r-lg py-2.5 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:border-[#FEFD0C]/40"
                  placeholder="Phone number"
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm text-white mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className="w-full bg-black/40 border border-[#FEFD0C]/10 text-white rounded-lg py-2.5 pl-10 pr-10 text-sm placeholder-gray-500 focus:outline-none focus:border-[#FEFD0C]/40"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FEFD0C]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-white mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full bg-black/40 border border-[#FEFD0C]/10 text-white rounded-lg py-2.5 pl-10 pr-10 text-sm placeholder-gray-500 focus:outline-none focus:border-[#FEFD0C]/40"
                placeholder="Confirm password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FEFD0C]"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
              className="accent-[#FEFD0C] h-4 w-4"
            />
            <label>
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-[#FEFD0C] hover:text-white"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-[#FEFD0C] hover:text-white"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={subscribeNewsletter}
              onChange={() => setSubscribeNewsletter(!subscribeNewsletter)}
              className="accent-[#FEFD0C] h-4 w-4"
            />
            <label>Subscribe for market insights</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-sm font-bold rounded-md transition-all duration-300 ${
              isLoading
                ? "bg-[#FEFD0C]/60 text-gray-800 cursor-not-allowed"
                : "bg-[#FEFD0C] text-black hover:bg-yellow-300 hover:scale-[1.02]"
            }`}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-[#FEFD0C] hover:text-white font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;