import React, { useState, useEffect, useCallback, useReducer } from "react";
import { Eye, EyeOff, Lock, Mail, Shield, User, Phone, X, Info, CheckCircle, AlertCircle, Calendar, AtSign, ChevronDown } from "lucide-react";

// Constants
const COUNTRIES = [
  { code: '+1', name: 'US', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+91', name: 'IN', flag: '🇮🇳' },
  { code: '+86', name: 'CN', flag: '🇨🇳' },
  { code: '+49', name: 'DE', flag: '🇩🇪' },
  { code: '+33', name: 'FR', flag: '🇫🇷' },
  { code: '+234', name: 'NG', flag: '🇳🇬' },
  { code: '+81', name: 'JP', flag: '🇯🇵' },
  { code: '+7', name: 'RU', flag: '🇷🇺' },
  { code: '+55', name: 'BR', flag: '🇧🇷' },
  { code: '+39', name: 'IT', flag: '🇮🇹' },
  { code: '+61', name: 'AU', flag: '🇦🇺' },
  { code: '+27', name: 'ZA', flag: '🇿🇦' },
  { code: '+82', name: 'KR', flag: '🇰🇷' },
  { code: '+46', name: 'SE', flag: '🇸🇪' },
  { code: '+31', name: 'NL', flag: '🇳🇱' },
  { code: '+48', name: 'PL', flag: '🇵🇱' },
  { code: '+64', name: 'NZ', flag: '🇳🇿' },
  { code: '+34', name: 'ES', flag: '🇪🇸' },
  { code: '+41', name: 'CH', flag: '🇨🇭' },
  { code: '+380', name: 'UA', flag: '🇺🇦' },
  { code: '+351', name: 'PT', flag: '🇵🇹' },
  { code: '+420', name: 'CZ', flag: '🇨🇿' },
  { code: '+359', name: 'BG', flag: '🇧🇬' },
  { code: '+212', name: 'MA', flag: '🇲🇦' },
  { code: '+970', name: 'PS', flag: '🇵🇸' },
  { code: '+966', name: 'SA', flag: '🇸🇦' },
  { code: '+65', name: 'SG', flag: '🇸🇬' },
  { code: '+974', name: 'QA', flag: '🇶🇦' },
  { code: '+358', name: 'FI', flag: '🇫🇮' },
  { code: '+352', name: 'LU', flag: '🇱🇺' },
  { code: '+358', name: 'FI', flag: '🇫🇮' },
  { code: '+386', name: 'SI', flag: '🇸🇮' },
  { code: '+502', name: 'GT', flag: '🇬🇹' },
  { code: '+503', name: 'SV', flag: '🇸🇻' },
  { code: '+507', name: 'PA', flag: '🇵🇦' },
  { code: '+351', name: 'PT', flag: '🇵🇹' },
  { code: '+90', name: 'TR', flag: '🇹🇷' },
  { code: '+52', name: 'MX', flag: '🇲🇽' },
  { code: '+56', name: 'CL', flag: '🇨🇱' },
  { code: '+62', name: 'ID', flag: '🇮🇩' },
  { code: '+254', name: 'KE', flag: '🇰🇪' },
  { code: '+211', name: 'SS', flag: '🇸🇸' },
  { code: '+218', name: 'LY', flag: '🇱🇾' },
];


const REQUIRED_FIELDS = ['firstname', 'lastname', 'email', 'username', 'phone', 'dateOfBirth', 'password', 'confirmPassword'];

const PASSWORD_REQUIREMENTS = {
  length: "At least 8 characters",
  lowercase: "One lowercase letter", 
  uppercase: "One uppercase letter",
  number: "One number",
  special: "One special character"
};

const STRENGTH_LEVELS = [
  { strength: "", color: "" },
  { strength: "Weak", color: "text-red-400" },
  { strength: "Weak", color: "text-red-400" },
  { strength: "Medium", color: "text-yellow-400" },
  { strength: "Strong", color: "text-green-400" },
  { strength: "Very Strong", color: "text-emerald-400" }
];

const API_ENDPOINT = "https://sellfastpayfast-backend.onrender.com/api/auth/sign-up-one";

// Types
interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  phone: string;
  countryCode: string;
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
  requirements: Record<string, boolean>;
}

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
  const config = STRENGTH_LEVELS[score] || STRENGTH_LEVELS[0];
  
  return {
    strength: password.length === 0 ? "" : config.strength,
    color: password.length === 0 ? "" : config.color,
    score,
    requirements
  };
};

// Validation rules
const createValidator = (rules: Record<string, (value: string, ...args: any[]) => string>) => 
  (field: string, value: string, ...args: any[]): string => rules[field]?.(value, ...args) || "";

const validationRules = {
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
    const phoneRegex = /^[\d]{7,15}$/;
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
    if (actualAge < 18) return "You must be at least 18 years old";
    return "";
  },
  password: (value: string, requirements: Record<string, boolean>): string => {
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

const validateField = createValidator(validationRules);

// Error reducer
const errorReducer = (state: FormErrors, action: any): FormErrors => {
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

// Reusable Components
const Alert: React.FC<{ 
  type: 'success' | 'error'; 
  message: string; 
  onDismiss?: () => void;
}> = ({ type, message, onDismiss }) => {
  const isSuccess = type === 'success';
  const styles = {
    bg: isSuccess ? 'bg-green-500/10' : 'bg-red-500/10',
    border: isSuccess ? 'border-green-500/30' : 'border-red-500/30',
    text: isSuccess ? 'text-green-400' : 'text-red-400'
  };
  const Icon = isSuccess ? CheckCircle : AlertCircle;

  return (
    <div className={`${styles.bg} border ${styles.border} ${styles.text} px-4 py-3 rounded-lg flex items-center space-x-3`} role="alert">
      <Icon className="h-4 w-4 flex-shrink-0" />
      <span className="text-sm flex-1">{message}</span>
      {onDismiss && (
        <button type="button" onClick={onDismiss} className={`${styles.text} hover:opacity-70`} aria-label="Dismiss">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

const FormInput: React.FC<{
  id: string;
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
  leftElement?: React.ReactNode;
}> = ({
  id, label, type, icon: Icon, value, onChange, onBlur, error, placeholder,
  autoComplete, required = false, showToggle = false, showPassword = false,
  onTogglePassword, max, leftElement
}) => {
  const inputClasses = `
    w-full bg-black/40 border text-white rounded-lg py-3 text-sm placeholder-gray-500 
    transition-all duration-200 focus:outline-none focus:bg-black/60 focus:ring-1
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-800 focus:border-[#FEFD0C]/50 focus:ring-[#FEFD0C]/20'}
    ${leftElement ? 'pl-3' : 'pl-10'}
    ${showToggle ? 'pr-10' : 'pr-4'}
  `;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative flex">
        {leftElement || <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          max={max}
          className={inputClasses}
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

const CountryCodeSelector: React.FC<{
  value: string;
  onChange: (code: string) => void;
}> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCountry = COUNTRIES.find(c => c.code === value) || COUNTRIES[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-full bg-black/40 border border-gray-800 border-r-0 rounded-l-lg px-3 flex items-center space-x-2 text-white hover:bg-black/60 transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-sm">{selectedCountry.flag}</span>
        <span className="text-sm font-medium">{selectedCountry.code}</span>
        <ChevronDown className="w-3 h-3 text-gray-400" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 bg-black/90 border border-gray-800 rounded-lg shadow-xl max-h-48 overflow-y-auto">
          {COUNTRIES.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => {
                onChange(country.code);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-left hover:bg-gray-800/50 flex items-center space-x-3 text-white text-sm transition-colors duration-200"
            >
              <span>{country.flag}</span>
              <span className="font-medium">{country.code}</span>
              <span className="text-gray-400">{country.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const PasswordRequirements: React.FC<{ requirements: Record<string, boolean> }> = ({ requirements }) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-xs">
    <p className="text-gray-300 mb-2">Password must include:</p>
    <div className="space-y-1">
      {Object.entries(PASSWORD_REQUIREMENTS).map(([key, description]) => {
        const isValid = requirements[key];
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
    countryCode: "+234",
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

  const validateForm = useCallback((): { isValid: boolean; errors: FormErrors } => {
    const newErrors: FormErrors = {};
    
    REQUIRED_FIELDS.forEach(field => {
      let error = "";
      if (field === 'password') {
        const passwordStrength = calculatePasswordStrength(formData.password);
        error = validateField(field, formData[field as keyof FormData], passwordStrength.requirements);
      } else if (field === 'confirmPassword') {
        error = validateField(field, formData.confirmPassword, formData.password);
      } else {
        error = validateField(field, formData[field as keyof FormData]);
      }
      
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
  }, [formData, acceptTerms]);

  // Debounced validation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (touchedFields.size > 0) {
        const touchedErrors: FormErrors = {};
        Array.from(touchedFields).forEach(field => {
          if (field !== 'terms') {
            let error = "";
            if (field === 'password') {
              const passwordStrength = calculatePasswordStrength(formData.password);
              error = validateField(field, formData[field as keyof FormData], passwordStrength.requirements);
            } else if (field === 'confirmPassword') {
              error = validateField(field, formData.confirmPassword, formData.password);
            } else {
              error = validateField(field, formData[field as keyof FormData]);
            }
            if (error) {
              touchedErrors[field] = error;
            }
          }
        });
        dispatchError({ type: 'SET_ERRORS', errors: touchedErrors });
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [formData, touchedFields]);

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
        phone: formData.countryCode + sanitizePhone(formData.phone),
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Registration failed (${response.status})`);
      }

      setSuccessMessage("Verifying your Credentials...");
      
      setTimeout(() => {
        // Pass email as URL parameter
        const encodedEmail = encodeURIComponent(sanitizedData.email);
        window.location.href = `/otp-verify?email=${encodedEmail}`;
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
            {/* Messages */}
            {successMessage && <Alert type="success" message={successMessage} />}
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

            {/* Phone with Country Code */}
            <FormInput
              id="phone"
              label="Phone Number"
              type="tel"
              icon={Phone}
              value={formData.phone}
              onChange={(value) => handleInputChange('phone', value)}
              onBlur={() => handleBlur('phone')}
              error={errors.phone}
              placeholder="812 345 6789"
              autoComplete="tel"
              required
              leftElement={
                <CountryCodeSelector 
                  value={formData.countryCode}
                  onChange={(code) => handleInputChange('countryCode', code)}
                />
              }
            />

            {/* Date of Birth */}
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

              {showPasswordRequirements && (
                <PasswordRequirements requirements={passwordStrength.requirements} />
              )}
              
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
                    <span className="text-red-400">Passwords do not match</span>
                  </>
                )}
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    if (errors.terms) {
                      dispatchError({ type: 'CLEAR_ERROR', field: 'terms' });
                    }
                  }}
                  className="mt-1 h-4 w-4 rounded border-gray-600 bg-black/40 text-[#FEFD0C] focus:ring-[#FEFD0C]/20 focus:ring-2"
                  required
                  aria-describedby={errors.terms ? 'terms-error' : undefined}
                  aria-invalid={!!errors.terms}
                />
                <label htmlFor="terms" className="text-sm text-gray-300 leading-5">
                  I agree to the{' '}
                  <a href="/terms" className="text-[#FEFD0C] hover:underline font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-[#FEFD0C] hover:underline font-medium">
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
              className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${
                isSubmitting || !isFormValid
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-[#FEFD0C] text-black hover:bg-[#FEFD0C]/90 focus:ring-[#FEFD0C]/50 transform hover:scale-[1.02] active:scale-[0.98]'
              }`}
              aria-describedby="submit-status"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="text-[#FEFD0C] hover:underline font-semibold transition-colors duration-200"
                >
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Footer Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>Your information is protected with industry-standard encryption</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;