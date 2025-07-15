import React, { useState, useCallback } from "react";
import { Eye, EyeOff, Lock, Mail, Shield, AlertCircle, CheckCircle } from "lucide-react";

// Types
interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface InputFieldProps {
  id: keyof LoginFormData;
  label: string;
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
  showToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

interface AlertProps {
  type: 'success' | 'error';
  message: string;
}

// Constants
const API_ENDPOINT = "https://sellfastpayfast-backend.onrender.com/api/auth/login";

// Validation functions
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateForm = (formData: LoginFormData): LoginFormErrors => {
  const errors: LoginFormErrors = {};
  
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }
  
  if (!formData.password.trim()) {
    errors.password = "Password is required";
  }
  
  return errors;
};

// Reusable Input Component
const FormInput: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  icon: Icon,
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  required = false,
  showToggle = false,
  showPassword = false,
  onTogglePassword
}) => {
  const baseInputClasses = "w-full bg-black/40 border text-white rounded-lg py-3 pl-10 text-sm placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-black/60 focus:ring-1";
  const errorClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
    : 'border-gray-800 focus:border-[#FEFD0C]/50 focus:ring-[#FEFD0C]/20';
  const paddingClasses = showToggle ? 'pr-10' : 'pr-4';

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseInputClasses} ${errorClasses} ${paddingClasses}`}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
        {showToggle && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FEFD0C] transition-colors duration-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-red-400 text-xs flex items-center space-x-1" role="alert">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

// Alert Component
const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-green-500/10' : 'bg-red-500/10';
  const borderColor = isSuccess ? 'border-green-500/30' : 'border-red-500/30';
  const textColor = isSuccess ? 'text-green-400' : 'text-red-400';
  const Icon = isSuccess ? CheckCircle : AlertCircle;

  return (
    <div className={`${bgColor} border ${borderColor} ${textColor} px-4 py-3 rounded-lg flex items-center space-x-3`} role="alert">
      <Icon className="h-4 w-4 flex-shrink-0" />
      <span className="text-sm">{message}</span>
    </div>
  );
};

// Main Login Component
const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: ""
  });
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleInputChange = useCallback((field: keyof LoginFormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  }, [errors]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (isLoading) return;
    
    setSuccessMessage("");
    setErrors({});
    setIsLoading(true);

    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password
        }),
      });
      
      let data: { message?: string } | null = null;
      try {
        const text = await response.text();
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(data?.message || "Login failed");
      }

      setSuccessMessage("Login successful! Redirecting...");

      // Redirect after success
      setTimeout(() => {
        window.location.href = "/users";
      }, 1500);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Invalid email or password";
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = useCallback((): void => {
    window.location.href = "/signup";
  }, []);

  const handleForgotPasswordClick = useCallback((): void => {
    window.location.href = "/forgot-password";
  }, []);

  const togglePassword = useCallback((): void => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleRememberMe = useCallback((): void => {
    setRememberMe(prev => !prev);
  }, []);

  const isFormValid = Object.keys(validateForm(formData)).length === 0;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black py-8 px-4">
      <div className="relative z-10 w-full max-w-sm">
        {/* Security Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-black/90 backdrop-blur-sm border border-[#FEFD0C]/30 rounded-full px-4 py-2 flex items-center space-x-2">
            <Shield className="w-4 h-4 text-[#FEFD0C]" />
            <span className="text-xs font-medium text-[#FEFD0C] tracking-wide">SECURE LOGIN</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-black/90 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-14 w-14 bg-gradient-to-br from-[#FEFD0C]/20 to-[#FEFD0C]/10 border border-[#FEFD0C]/30 rounded-xl flex items-center justify-center mb-4">
              <Lock className="text-[#FEFD0C] w-7 h-7" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome <span className="text-[#FEFD0C]">Back</span>
            </h1>
            <p className="text-gray-400 text-sm">Sign in to access your account</p>
          </div>

          <div className="space-y-5">
            {/* Success Message */}
            {successMessage && (
              <Alert type="success" message={successMessage} />
            )}

            {/* General Error Message */}
            {errors.general && (
              <Alert type="error" message={errors.general} />
            )}

            {/* Email Field */}
            <FormInput
              id="email"
              label="Email Address"
              type="email"
              icon={Mail}
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              error={errors.email}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />

            {/* Password Field */}
            <FormInput
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              icon={Lock}
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              error={errors.password}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              showToggle
              showPassword={showPassword}
              onTogglePassword={togglePassword}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={toggleRememberMe}
                    className="w-4 h-4 text-[#FEFD0C] bg-black/40 border-gray-800 rounded focus:ring-[#FEFD0C]/20 focus:ring-2 focus:ring-offset-0"
                  />
                </div>
                <label htmlFor="remember" className="text-sm text-gray-400">
                  Remember me
                </label>
              </div>
              
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                className="text-sm text-[#FEFD0C] hover:text-[#FEFD0C]/80 underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={(e) => handleSubmit(e as any)}
              disabled={isLoading || !isFormValid}
              className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2 ${
                isLoading || !isFormValid
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-[#FEFD0C] hover:bg-[#FEFD0C]/90 text-black hover:shadow-lg hover:shadow-[#FEFD0C]/20'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>

            {/* Signup Link */}
            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={handleSignupClick}
                  className="text-[#FEFD0C] hover:text-[#FEFD0C]/80 font-medium underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-xs">
            Protected by industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;