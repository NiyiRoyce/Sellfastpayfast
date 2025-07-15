import React, { useState, useEffect, useCallback, useReducer } from "react";
import { Eye, EyeOff, Lock, Mail, Shield, User, Phone, X, Info, CheckCircle, AlertCircle, Calendar, AtSign } from "lucide-react";

// Types
interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  phone: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
  role: string;
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

interface InputFieldProps {
  id: keyof FormData;
  label: string;
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
  showToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  max?: string;
  className?: string;
}

interface ValidationRule {
  (value: string, ...args: any[]): string;
}

interface ApiResponse {
  message?: string;
}

// Constants
const REQUIRED_FIELDS: Array<keyof FormData> = [
  'firstname', 'lastname', 'email', 'username', 'phone', 'dateOfBirth', 'password', 'confirmPassword'
];

const PASSWORD_REQUIREMENTS = {
  length: "At least 8 characters",
  lowercase: "One lowercase letter",
  uppercase: "One uppercase letter",
  number: "One number",
  special: "One special character"
} as const;

const STRENGTH_CONFIG = {
  0: { strength: "", color: "" },
  1: { strength: "Weak", color: "text-red-400" },
  2: { strength: "Weak", color: "text-red-400" },
  3: { strength: "Medium", color: "text-yellow-400" },
  4: { strength: "Strong", color: "text-green-400" },
  5: { strength: "Very Strong", color: "text-emerald-400" }
} as const;

const API_ENDPOINT = "https://sellfastpayfast-backend.onrender.com/api/auth/sign-up-one";

// Validation rules
const validationRules: Record<string, ValidationRule> = {
  firstname: (value: string): string => {
    if (!value.trim()) return "First name is required";
    if (value.trim().length < 2) return "First name must be at least 2 characters";
    return "";
  },
  lastname: (value: string): string => {
    if (!value.trim()) return "Last name is required";
    if (value.trim().length < 2) return "Last name must be at least 2 characters";
    return "";
  },
  email: (value: string): string => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return "";
  },
  username: (value: string): string => {
    if (!value.trim()) return "Username is required";
    const usernameRegex = /^[a-zA-Z0-9_.-]{3,20}$/;
    if (!usernameRegex.test(value)) return "Username must be 3-20 characters (letters, numbers, dots, hyphens, underscores)";
    return "";
  },
  phone: (value: string): string => {
    if (!value.trim()) return "Phone number is required";
    const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^[\+]?[1-9][\d]{7,15}$/;
    if (!phoneRegex.test(cleanPhone)) return "Please enter a valid phone number";
    return "";
  },
  dateOfBirth: (value: string): string => {
    if (!value.trim()) return "Date of birth is required";
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
    if (actualAge < 13) return "You must be at least 13 years old";
    return "";
  },
  password: (value: string, requirements: PasswordStrength['requirements']): string => {
    if (!value) return "Password is required";
    const score = Object.values(requirements).filter(Boolean).length;
    if (score < 4) return "Password must meet at least 4 requirements";
    return "";
  },
  confirmPassword: (value: string, password: string): string => {
    if (!value) return "Please confirm your password";
    if (value !== password) return "Passwords do not match";
    return "";
  }
};

// Error reducer
type ErrorAction = 
  | { type: 'SET_ERROR'; field: string; error: string }
  | { type: 'CLEAR_ERROR'; field: string }
  | { type: 'CLEAR_ALL' }
  | { type: 'SET_ERRORS'; errors: FormErrors };

const errorReducer = (state: FormErrors, action: ErrorAction): FormErrors => {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, [action.field]: action.error };
    case 'CLEAR_ERROR':
      const { [action.field]: _, ...rest } = state;
      return rest;
    case 'CLEAR_ALL':
      return {};
    case 'SET_ERRORS':
      return { ...action.errors };
    default:
      return state;
  }
};

// Utility functions
const sanitizePhone = (phone: string): string => phone.replace(/[\s\-\(\)]/g, '');

const getMaxDate = (): string => {
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
  return maxDate.toISOString().split('T')[0];
};

const calculatePasswordStrength = (password: string): PasswordStrength => {
  const requirements = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };

  const score = Object.values(requirements).filter(Boolean).length;
  const config = STRENGTH_CONFIG[score as keyof typeof STRENGTH_CONFIG] || STRENGTH_CONFIG[0];
  
  return {
    strength: password.length === 0 ? "" : config.strength,
    color: password.length === 0 ? "" : config.color,
    score,
    requirements
  };
};

// Reusable Input Component
const FormInput: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  icon: Icon,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  autoComplete,
  required = false,
  showToggle = false,
  showPassword = false,
  onTogglePassword,
  max,
  className = ""
}) => {
  const baseInputClasses = "w-full bg-black/40 border text-white rounded-lg py-3 pl-10 text-sm placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-black/60 focus:ring-1";
  const errorClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
    : 'border-gray-800 focus:border-[#FEFD0C]/50 focus:ring-[#FEFD0C]/20';
  const paddingClasses = showToggle ? 'pr-10' : 'pr-4';

  return (
    <div className={`space-y-2 ${className}`}>
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
          onBlur={onBlur}
          max={max}
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
const Alert: React.FC<{ 
  type: 'success' | 'error'; 
  message: string; 
  onDismiss?: () => void;
}> = ({ type, message, onDismiss }) => {
  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-green-500/10' : 'bg-red-500/10';
  const borderColor = isSuccess ? 'border-green-500/30' : 'border-red-500/30';
  const textColor = isSuccess ? 'text-green-400' : 'text-red-400';
  const Icon = isSuccess ? CheckCircle : AlertCircle;

  return (
    <div className={`${bgColor} border ${borderColor} ${textColor} px-4 py-3 rounded-lg flex items-center space-x-3`} role="alert">
      <Icon className="h-4 w-4 flex-shrink-0" />
      <span className="text-sm flex-1">{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={`${textColor} hover:opacity-70`}
          aria-label="Dismiss error"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

// Password Requirements Component
const PasswordRequirements: React.FC<{ requirements: PasswordStrength['requirements'] }> = ({ requirements }) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-xs">
    <p className="text-gray-300 mb-2">Password must include:</p>
    <div className="space-y-1">
      {Object.entries(PASSWORD_REQUIREMENTS).map(([key, description]) => {
        const isValid = requirements[key as keyof typeof requirements];
        return (
          <div key={key} className="flex items-center space-x-2">
            {isValid ? (
              <CheckCircle className="w-3 h-3 text-green-400" />
            ) : (
              <AlertCircle className="w-3 h-3 text-gray-400" />
            )}
            <span className={isValid ? "text-green-400" : "text-gray-400"}>
              {description}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

// Password Strength Indicator
const PasswordStrengthIndicator: React.FC<{ strength: PasswordStrength }> = ({ strength }) => {
  const getProgressColor = (score: number): string => {
    if (score <= 2) return 'bg-red-500';
    if (score <= 3) return 'bg-yellow-500';
    if (score <= 4) return 'bg-green-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">Password strength:</span>
        <span className={`font-medium ${strength.color}`}>
          {strength.strength}
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-1">
        <div 
          className={`h-1 rounded-full transition-all duration-300 ${getProgressColor(strength.score)}`}
          style={{ width: `${(strength.score / 5) * 100}%` }}
        />
      </div>
    </div>
  );
};

// Main Component
const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    phone: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, dispatchError] = useReducer(errorReducer, {});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showPasswordRequirements, setShowPasswordRequirements] = useState<boolean>(false);

  const validateField = useCallback((field: keyof FormData, value: string): string => {
    const validator = validationRules[field];
    if (!validator) return "";
    
    if (field === 'password') {
      const passwordStrength = calculatePasswordStrength(value);
      return validator(value, passwordStrength.requirements);
    }
    
    if (field === 'confirmPassword') {
      return validator(value, formData.password);
    }
    
    return validator(value);
  }, [formData.password]);

  const validateForm = useCallback((): { isValid: boolean; errors: FormErrors } => {
    const newErrors: FormErrors = {};
    
    REQUIRED_FIELDS.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors
    };
  }, [formData, acceptTerms, validateField]);

  // Debounced validation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (touchedFields.size > 0) {
        const touchedErrors: FormErrors = {};
        Array.from(touchedFields).forEach(field => {
          if (field !== 'terms') {
            const error = validateField(field as keyof FormData, formData[field as keyof FormData]);
            if (error) {
              touchedErrors[field] = error;
            }
          }
        });
        dispatchError({ type: 'SET_ERRORS', errors: touchedErrors });
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [formData, touchedFields, validateField]);

  const handleInputChange = useCallback((field: keyof FormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouchedFields(prev => new Set(prev).add(field));
    
    if (errors[field]) {
      dispatchError({ type: 'CLEAR_ERROR', field });
    }
  }, [errors]);

  const handleBlur = useCallback((field: string): void => {
    setTouchedFields(prev => new Set(prev).add(field));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setSuccessMessage("");
    setIsSubmitting(true);

    const validation = validateForm();
    
    if (!validation.isValid) {
      dispatchError({ type: 'SET_ERRORS', errors: validation.errors });
      setIsSubmitting(false);
      
      const firstErrorField = Object.keys(validation.errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      errorElement?.focus();
      return;
    }

    try {
      const sanitizedData = {
        firstname: formData.firstname.trim(),
        lastname: formData.lastname.trim(),
        email: formData.email.trim().toLowerCase(),
        username: formData.username.trim(),
        phone: sanitizePhone(formData.phone),
        dateOfBirth: formData.dateOfBirth,
        password: formData.password,
        role: formData.role
      };

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Registration failed (${response.status})`);
      }

      setSuccessMessage("Account created successfully! Redirecting to login...");
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

    } catch (error) {
      dispatchError({ 
        type: 'SET_ERROR', 
        field: 'general', 
        error: error instanceof Error ? error.message : "An unexpected error occurred. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginClick = useCallback((): void => {
    window.location.href = "/login";
  }, []);

  const passwordStrength = calculatePasswordStrength(formData.password);
  const isFormValid = validateForm().isValid;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black py-8 px-4">
      <div className="relative z-10 w-full max-w-lg">
        {/* Security Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-black/90 backdrop-blur-sm border border-[#FEFD0C]/30 rounded-full px-4 py-2 flex items-center space-x-2">
            <Shield className="w-4 h-4 text-[#FEFD0C]" />
            <span className="text-xs font-medium text-[#FEFD0C] tracking-wide">SECURE REGISTRATION</span>
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
              <Alert type="success" message={successMessage} />
            )}

            {/* General Error Message */}
            {errors.general && (
              <Alert 
                type="error" 
                message={errors.general} 
                onDismiss={() => dispatchError({ type: 'CLEAR_ERROR', field: 'general' })}
              />
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                id="firstname"
                label="First Name"
                type="text"
                icon={User}
                value={formData.firstname}
                onChange={(value) => handleInputChange('firstname', value)}
                onBlur={() => handleBlur('firstname')}
                error={errors.firstname}
                placeholder="John"
                autoComplete="given-name"
                required
              />
              <FormInput
                id="lastname"
                label="Last Name"
                type="text"
                icon={User}
                value={formData.lastname}
                onChange={(value) => handleInputChange('lastname', value)}
                onBlur={() => handleBlur('lastname')}
                error={errors.lastname}
                placeholder="Doe"
                autoComplete="family-name"
                required
              />
            </div>

            {/* Email and Username */}
            <FormInput
              id="email"
              label="Email Address"
              type="email"
              icon={Mail}
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              onBlur={() => handleBlur('email')}
              error={errors.email}
              placeholder="john.doe@example.com"
              autoComplete="email"
              required
            />

            <FormInput
              id="username"
              label="Username"
              type="text"
              icon={AtSign}
              value={formData.username}
              onChange={(value) => handleInputChange('username', value)}
              onBlur={() => handleBlur('username')}
              error={errors.username}
              placeholder="johndoe123"
              autoComplete="username"
              required
            />

            {/* Phone and Date of Birth */}
            <FormInput
              id="phone"
              label="Phone Number"
              type="tel"
              icon={Phone}
              value={formData.phone}
              onChange={(value) => handleInputChange('phone', value)}
              onBlur={() => handleBlur('phone')}
              error={errors.phone}
              placeholder="+1 (555) 123-4567"
              autoComplete="tel"
              required
            />

            <FormInput
              id="dateOfBirth"
              label="Date of Birth"
              type="date"
              icon={Calendar}
              value={formData.dateOfBirth}
              onChange={(value) => handleInputChange('dateOfBirth', value)}
              onBlur={() => handleBlur('dateOfBirth')}
              error={errors.dateOfBirth}
              placeholder=""
              max={getMaxDate()}
              required
            />

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
                  aria-expanded={showPasswordRequirements}
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
                  aria-describedby={errors.password ? 'password-error' : 'password-requirements'}
                  aria-invalid={!!errors.password}
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
              
              {errors.password && (
                <p id="password-error" className="text-red-400 text-xs flex items-center space-x-1" role="alert">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.password}</span>
                </p>
              )}

              {/* Password Requirements */}
              {showPasswordRequirements && (
                <PasswordRequirements requirements={passwordStrength.requirements} />
              )}
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <PasswordStrengthIndicator strength={passwordStrength} />
              )}
            </div>

            {/* Confirm Password */}
            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              icon={Lock}
              value={formData.confirmPassword}
              onChange={(value) => handleInputChange('confirmPassword', value)}
              onBlur={() => handleBlur('confirmPassword')}
              error={errors.confirmPassword}
              placeholder="Confirm your password"
              autoComplete="new-password"
              required
              showToggle
              showPassword={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />

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
                    aria-describedby={errors.terms ? 'terms-error' : undefined}
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
                <p id="terms-error" className="text-red-400 text-xs flex items-center space-x-1" role="alert">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.terms}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2 ${
                isSubmitting || !isFormValid
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-[#FEFD0C] hover:bg-[#FEFD0C]/90 text-black hover:shadow-lg hover:shadow-[#FEFD0C]/20'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  <span>Create Account</span>
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={handleLoginClick}
                  className="text-[#FEFD0C] hover:text-[#FEFD0C]/80 font-medium underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
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

export default SignUp;