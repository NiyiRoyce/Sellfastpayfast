import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { MdOutlineAlternateEmail, MdAccessTime, MdSecurity } from "react-icons/md";
import { RiShieldKeyholeLine } from "react-icons/ri";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsLoading(true);

    if (!email.includes("@") || password.length < 6) {
      setFormError("Enter a valid email and password");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      console.log({ email, password, rememberMe });
      setIsLoading(false);
    }, 1200);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black px-4 font-inter">
      {/* Background Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FEFD0C]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FEFD0C]/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-md bg-black/70 border border-[#FEFD0C]/10 rounded-2xl p-8 shadow-xl backdrop-blur-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto h-12 w-12 bg-[#FEFD0C]/10 border border-[#FEFD0C]/20 rounded-lg flex items-center justify-center mb-3">
            <RiShieldKeyholeLine className="text-[#FEFD0C] w-6 h-6" />
          </div>
          <div className="text-[#FEFD0C] text-xs font-medium tracking-wide flex justify-center items-center gap-1 bg-[#FEFD0C]/10 border border-[#FEFD0C]/20 px-3 py-1 rounded-full w-fit mx-auto mb-1">
            <MdAccessTime className="text-sm" />
            Secure Login
          </div>
          <h1 className="text-3xl font-semibold text-white mt-1">
            Welcome <span className="text-[#FEFD0C]">Back</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Sign in to manage your crypto wallet
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

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-white mb-1">
              Email
            </label>
            <div className="relative">
              <MdOutlineAlternateEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-[#FEFD0C]/10 text-white rounded-lg py-2.5 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:border-[#FEFD0C]/40"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="text-sm text-white">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-[#FEFD0C] hover:text-white"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Remember Me */}
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="accent-[#FEFD0C] h-4 w-4"
            />
            <label>Remember Me</label>
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
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#FEFD0C] hover:text-white font-medium">
            Create one
          </Link>
        </div>

      </div>
    </div>
    </>
  );
};

export default Login;