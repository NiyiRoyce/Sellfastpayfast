import React, { useState, useEffect, useCallback } from "react";
import { Eye, EyeOff, Lock, Mail, Shield, User, Phone, X, Info, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

interface PasswordStrength {
  strength: string;
  color: string;
  score: number;
  requirements: {
    length: boolean;
    lowercase: boolean;
    uppercase: boolean;
    number: boolean;
    special: boolean;
  };
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [successMessage, setSuccessMessage] = useState("");
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^[\+]?[1-9][\d]{7,15}$/;
    return phoneRegex.test(cleanPhone);
  };

  const validatePassword = (password: string): PasswordStrength => {
    const requirements = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    };

    const score = Object.values(requirements).filter(Boolean).length;
    
    let strength = "";
    let color = "";
    
    if (password.length === 0) {
      strength = "";
      color = "";
    } else if (score <= 2) {
      strength = "Weak";
      color = "text-red-400";
    } else if (score <= 3) {
      strength = "Medium";
      color = "text-yellow-400";
    } else if (score <= 4) {
      strength = "Strong";
      color = "text-green-400";
    } else {
      strength = "Very Strong";
      color = "text-emerald-400";
    }

    return { strength, color, score, requirements };
  };

  const validateForm = useCallback((): { isValid: boolean; errors: FormErrors } => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordStrength = validatePassword(formData.password);
      if (passwordStrength.score < 3) {
        newErrors.password = "Password must be stronger (minimum 3 requirements)";
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms validation
    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors
    };
  }, [formData, acceptTerms]);

  // Real-time validation with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (touchedFields.size > 0) {
        const validation = validateForm();
        const touchedErrors: FormErrors = {};
        Array.from(touchedFields).forEach(field => {
          if (validation.errors[field]) {
            touchedErrors[field] = validation.errors[field];
          }
        });
        setErrors(touchedErrors);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [formData, acceptTerms, touchedFields, validateForm]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouchedFields(prev => new Set(prev).add(field));
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouchedFields(prev => new Set(prev).add(field));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");
    setIsLoading(true);

    const validation = validateForm();
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsLoading(false);
      
      const firstErrorField = Object.keys(validation.errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      errorElement?.focus();
      return;
    }

    try {
      const sanitizedData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.replace(/[\s\-\(\)]/g, ''),
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };

      const response = await fetch("https://sellfastpayfast-backend.onrender.com/api/auth/sign-up-one", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Registration failed (${response.status})`);
      }

      setSuccessMessage("Account created successfully! Redirecting to login...");
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

    } catch (error) {
      setErrors({ 
        general: error instanceof Error ? error.message : "An unexpected error occurred. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const passwordStrength = validatePassword(formData.password);
  const isFormValid = validateForm().isValid;

  // Form progress calculation
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword'];
  const filledFields = requiredFields.filter(field => formData[field as keyof FormData].trim() !== '');
  const formProgress = Math.round((filledFields.length / requiredFields.length) * 100);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black py-8 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 animate-pulse" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(254, 253, 12, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="absolute top-20 left-20 w-32 h-32 bg-[#FEFD0C]/5 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#FEFD0C]/3 rounded-full blur-2xl animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Security Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-black/90 backdrop-blur-sm border border-[#FEFD0C]/30 rounded-full px-4 py-2 flex items-center space-x-2">
            <Shield className="w-4 h-4 text-[#FEFD0C] animate-pulse" />
            <span className="text-xs font-medium text-[#FEFD0C] tracking-wide">SECURE REGISTRATION</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Form Progress</span>
            <span>{formProgress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div 
              className="bg-[#FEFD0C] h-1 rounded-full transition-all duration-500"
              style={{ width: `${formProgress}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-black/90 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-14 w-14 bg-gradient-to-br from-[#FEFD0C]/20 to-[#FEFD0C]/10 border border-[#FEFD0C]/30 rounded-xl flex items-center justify-center mb-4">
              <User className="text-[#FEFD0C] w-7 h-7" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Create <span className="text-[#FEFD0C]">Account</span>
            </h1>
            <p className="text-gray-400 text-sm">Join us and start your journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg flex items-center space-x-3">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{successMessage}</span>
              </div>
            )}

            {/* General Error Message */}
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg flex items-center space-x-3">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm flex-1">{errors.general}</span>
                <button
                  type="button"
                  onClick={() => setErrors(prev => {
                    const { general, ...rest } = prev;
                    return rest;
                  })}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-white">
                  First Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    onBlur={() => handleBlur('firstName')}
                    className={`w-full bg-black/40 border text-white rounded-lg py-3 pl-10 pr-4 text-sm placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-black/60 focus:ring-1 ${
                      errors.firstName
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-800 focus:border-[#FEFD0C]/50 focus:ring-[#FEFD0C]/20'
                    }`}
                    placeholder="John"
                    autoComplete="given-name"
                    required
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-400 text-xs flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.firstName}</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-white">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    onBlur={() => handleBlur('lastName')}
                    className={`w-full bg-black/40 border text-white rounded-lg py-3 pl-10 pr-4 text-sm placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-black/60 focus:ring-1 ${
                      errors.lastName
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-800 focus:border-[#FEFD0C]/50 focus:ring-[#FEFD0C]/20'
                    }`}
                    placeholder="Doe"
                    autoComplete="family-name"
                    required
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-400 text-xs flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.lastName}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`w-full bg-black/40 border text-white rounded-lg py-3 pl-10 pr-4 text-sm placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-black/60 focus:ring-1 ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-800 focus:border-[#FEFD0C]/50 focus:ring-[#FEFD0C]/20'
                  }`}
                  placeholder="john.doe@example.com"
                  autoComplete="email"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-white">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  className={`w-full bg-black/40 border text-white rounded-lg py-3 pl-10 pr-4 text-sm placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-black/60 focus:ring-1 ${
                    errors.phone
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-800 focus:border-[#FEFD0C]/50 focus:ring-[#FEFD0C]/20'
                  }`}
                  placeholder="+1 (555) 123-4567"
                  autoComplete="tel"
                  required
                />
              </div>
              {errors.phone && (
                <p className="text-red-400 text-xs flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password <span className="text-red-400">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPasswordRequirements(!showPasswordRequirements)}
                  className="text-gray-400 hover:text-[#FEFD0C] text-xs flex items-center space-x-1"
                >
                  <Info className="w-3 h-3" />
                  <span>Requirements</span>
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                  className={`w-full bg-black/40 border text-white rounded-lg py-3 pl-10 pr-10 text-sm placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-black/60 focus:ring-1 ${
                    errors.password
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-800 focus:border-[#FEFD0C]/50 focus:ring-[#FEFD0C]/20'
                  }`}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FEFD0C] transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {errors.password && (
                <p className="text-red-400 text-xs flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.password}</span>
                </p>
              )}

              {/* Password Requirements */}
              {showPasswordRequirements && (
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-xs">
                  <p className="text-gray-300 mb-2">Password must include:</p>
                  <div className="space-y-1">
                    {Object.entries({
                      length: "At least 8 characters",
                      lowercase: "One lowercase letter",
                      uppercase: "One uppercase letter",
                      number: "One number",
                      special: "One special character"
                    }).map(([key, description]) => (
                      <div key={key} className="flex items-center space-x-2">
                        {passwordStrength.requirements[key as keyof typeof passwordStrength.requirements] ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <AlertCircle className="w-3 h-3 text-gray-400" />
                        )}
                        <span className={
                          passwordStrength.requirements[key as keyof typeof passwordStrength.requirements] 
                            ? "text-green-400" 
                            : "text-gray-400"
                        }>
                          {description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
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
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  onBlur={() => handleBlur('confirmPassword')}
                  className={`w-full bg-black/40 border text-white rounded-lg py-3 pl-10 pr-10 text-sm placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-black/60 focus:ring-1 ${
                    errors.confirmPassword
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
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.confirmPassword}</span>
                </p>
              )}
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && formData.password && (
                <div className="text-xs flex items-center space-x-1">
                  {formData.password === formData.confirmPassword ? (
                    <>
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span className="text-green-400">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 text-red-400" />
                      <span className="text-red-400">Passwords don't match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 text-[#FEFD0C] bg-black/40 border-gray-800 rounded focus:ring-[#FEFD0C]/20 focus:ring-2 focus:ring-offset-0"
                    required
                  />
                </div>
                <label htmlFor="terms" className="text-sm text-gray-300 leading-5">
                  I agree to the{' '}
                  <a href="#" className="text-[#FEFD0C] hover:text-[#FEFD0C]/80 underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#FEFD0C] hover:text-[#FEFD0C]/80 underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-400 text-xs flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.terms}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2 ${
                isLoading || !isFormValid
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-[#FEFD0C] hover:bg-[#FEFD0C]/90 text-black hover:transform hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-600 border-t-gray-400"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={handleLoginClick}
                className="text-[#FEFD0C] hover:text-[#FEFD0C]/80 underline font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Security Features */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>SSL Protected</span>
            </div>
            <div className="flex items-center space-x-1">
              <Lock className="w-3 h-3" />
              <span>Data Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;