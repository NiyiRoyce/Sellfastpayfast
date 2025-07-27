import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Shield,
  Mail,
  Phone,
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

// Constants
const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;
const OTP_EXPIRY_SECONDS = 600; // 10 minutes
const COLORS = {
  primary: '#FEFD0C',
  background: '#000000',
  cardBackground: 'rgba(0, 0, 0, 0.4)',
  border: 'rgba(254, 253, 12, 0.3)',
  borderHover: 'rgba(254, 253, 12, 0.5)',
  text: '#FFFFFF',
  textMuted: '#9CA3AF',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
};

const API_ENDPOINTS = {
  verify: "https://sellfastpayfast-backend.onrender.com/api/auth/verify-otp",
  resend: "https://sellfastpayfast-backend.onrender.com/api/auth/resend-otp",
};

// Types
interface OTPData {
  otp: string;
  email?: string;
  phone?: string;
}

interface UserInfo {
  email: string;
  phone: string;
}

interface AlertProps {
  type: "success" | "error" | "info";
  message: string;
  onDismiss?: () => void;
}

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length: number;
  disabled?: boolean;
  error?: boolean;
}

// Utility Functions
const formatTime = (seconds: number): string =>
  `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

const validateOTP = (otp: string): boolean => /^\d{6}$/.test(otp);

// Alert Component
const Alert: React.FC<AlertProps> = ({ type, message, onDismiss }) => {
  const alertStyles = {
    success: {
      bg: `bg-green-500/10`,
      border: `border-green-500/30`,
      text: `text-green-400`,
      icon: CheckCircle,
    },
    error: {
      bg: `bg-red-500/10`,
      border: `border-red-500/30`,
      text: `text-red-400`,
      icon: AlertCircle,
    },
    info: {
      bg: `bg-yellow-400/10`,
      border: `border-yellow-400/30`,
      text: `text-yellow-400`,
      icon: Mail,
    },
  };

  const { bg, border, text, icon: Icon } = alertStyles[type];

  return (
    <div
                className={`${bg} ${border} ${text} border px-4 py-3 rounded-lg flex items-center space-x-3 mb-4`}
      role="alert"
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      <span className="text-sm flex-1">{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={`${text} hover:opacity-70 transition-opacity`}
          aria-label="Dismiss alert"
        >
          <AlertCircle className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

// OTP Input Component
const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  length,
  disabled = false,
  error = false,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = useCallback((index: number, inputValue: string): void => {
    if (disabled) return;
    
    const digit = inputValue.replace(/\D/g, "").slice(-1);
    const newValue = value.split("");
    newValue[index] = digit;
    const updatedValue = newValue.join("");
    
    onChange(updatedValue);

    // Auto-focus next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [value, onChange, disabled, length]);

  const handleKeyDown = useCallback((
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (disabled) return;

    switch (e.key) {
      case "Backspace":
        if (!value[index] && index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        break;
      case "ArrowLeft":
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        break;
      case "ArrowRight":
        if (index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
        break;
    }
  }, [value, disabled, length]);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    
    onChange(pastedData);
    
    // Focus the last filled input or the last input
    const focusIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  }, [disabled, length, onChange]);

  return (
    <div className="flex justify-center space-x-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          style={{ 
            backgroundColor: COLORS.cardBackground, 
            color: COLORS.primary,
            borderColor: error ? COLORS.error : COLORS.border
          }}
          className={`w-12 h-12 text-center text-lg font-bold border rounded-lg transition-all duration-200 
            focus:outline-none focus:ring-2 focus:ring-opacity-20 
            ${error 
              ? "focus:border-red-500 focus:ring-red-500" 
              : "focus:ring-yellow-400 hover:border-yellow-400/70"
            } 
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center justify-center space-x-2" style={{ color: COLORS.primary }}>
    <div 
      className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" 
      style={{ 
        borderColor: COLORS.primary, 
        borderTopColor: 'transparent' 
      }}
    />
    <span className="text-sm">{text}</span>
  </div>
);

const OTPVerification: React.FC = () => {
  // State Management
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpTimer, setOtpTimer] = useState(OTP_EXPIRY_SECONDS);

  // User Info from URL parameters
  const [userInfo] = useState<UserInfo>(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      email: params.get("email") || "",
      phone: params.get("phone") || "",
    };
  });

  // Timer Effects with proper cleanup
  useEffect(() => {
    if (otpTimer <= 0) return;
    const interval = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [otpTimer]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Helper for request body including email/phone
  const getVerificationPayload = () => {
    const payload: any = { otp };
    if (userInfo.email) payload.email = userInfo.email;
    if (userInfo.phone) payload.phone = userInfo.phone;
    return payload;
  };

  const getResendPayload = () => {
    const payload: any = {};
    if (userInfo.email) payload.email = userInfo.email;
    if (userInfo.phone) payload.phone = userInfo.phone;
    return payload;
  };

  // OTP Submission Handler with real API call
  const handleSubmit = useCallback(async () => {
    if (isSubmitting || otp.length !== OTP_LENGTH) return;

    if (!validateOTP(otp)) {
      setError("OTP must be a 6-digit number.");
      return;
    }

    if (otpTimer === 0) {
      setError("OTP has expired. Please request a new one.");
      return;
    }

    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(API_ENDPOINTS.verify, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getVerificationPayload()),
      });

      if (!response.ok) {
        // Attempt to parse error message
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || "Verification failed. Please try again."
        );
      }

      // Success response
      setSuccessMessage("Account verified successfully! Redirecting...");

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Verification failed. Please try again.");
      setOtp("");
    } finally {
      setIsSubmitting(false);
    }
  }, [otp, isSubmitting, otpTimer, userInfo]);

  // Auto-submit when OTP is complete
  useEffect(() => {
    if (otp.length === OTP_LENGTH && !isSubmitting && otpTimer > 0) {
      handleSubmit();
    }
  }, [otp, isSubmitting, otpTimer, handleSubmit]);

  // Resend OTP Handler with real API call
  const handleResendOTP = useCallback(async () => {
    if (isResending || resendCooldown > 0) return;

    setError("");
    setSuccessMessage("");
    setIsResending(true);

    try {
      const response = await fetch(API_ENDPOINTS.resend, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getResendPayload()),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || "Failed to resend OTP. Please try again."
        );
      }

      setSuccessMessage("OTP sent successfully!");
      setResendCooldown(RESEND_COOLDOWN);
      setOtpTimer(OTP_EXPIRY_SECONDS);
      setOtp(""); // Clear previous OTP
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  }, [isResending, resendCooldown, userInfo]);

 
   // Back Button Handler
   const handleBack = useCallback(() => {
     console.log("Navigating back to registration...");
     window.history.back();
   }, []);
 
   // Contact Information Display Logic
   const getContactInfo = useCallback(() => {
     if (userInfo.email && userInfo.phone) {
       return { 
         icon: Mail, 
         text: `${userInfo.email} and ${userInfo.phone}`,
         displayText: "email and phone"
       };
     }
     if (userInfo.email) {
       return { 
         icon: Mail, 
         text: userInfo.email,
         displayText: "email"
       };
     }
     if (userInfo.phone) {
       return { 
         icon: Phone, 
         text: userInfo.phone,
         displayText: "phone"
       };
     }
     return { 
       icon: Mail, 
       text: "your registered contact",
       displayText: "registered contact"
     };
   }, [userInfo]);
 
   const contactInfo = getContactInfo();
   const ContactIcon = contactInfo.icon;
 
   return (
     <div 
       className="min-h-screen flex items-center justify-center px-4 py-8"
       style={{ backgroundColor: COLORS.background }}
     >
       <div className="max-w-md w-full relative z-10">
         {/* Security Badge */}
         <div className="flex justify-center mb-6">
           <div 
             style={{ backgroundColor: COLORS.cardBackground }}
             className="border px-4 py-2 rounded-full flex items-center space-x-2"
           >
             <Shield className="w-4 h-4" style={{ color: COLORS.primary }} />
             <span 
               className="text-xs font-medium" 
               style={{ color: COLORS.primary }}
             >
               SECURE VERIFICATION
             </span>
           </div>
         </div>
 
         {/* Main Card */}
         <div 
           style={{ 
             backgroundColor: COLORS.cardBackground,
             borderColor: COLORS.border
           }}
           className="border p-8 rounded-2xl shadow-2xl backdrop-blur-sm"
         >
           {/* Header */}
           <div className="text-center mb-8">
             <div 
               className="h-14 w-14 border rounded-xl mx-auto flex items-center justify-center mb-4"
               style={{ 
                 backgroundColor: `${COLORS.primary}10`,
                 borderColor: COLORS.border
               }}
             >
               <ContactIcon style={{ color: COLORS.primary }} className="w-7 h-7" />
             </div>
             
             <h1 className="text-3xl font-bold mb-2">
               <span style={{ color: COLORS.primary }}>Verify your</span>{" "}
               <span style={{ color: COLORS.text }}>Account</span>
             </h1>
             
             <p 
               className="text-sm font-medium truncate px-2" 
               style={{ color: COLORS.primary }}
             >
               Code sent to {contactInfo.text}
             </p>
           </div>
 
           {/* Alerts */}
           {successMessage && (
             <Alert 
               type="success" 
               message={successMessage} 
             />
           )}
           {error && (
             <Alert 
               type="error" 
               message={error} 
               onDismiss={() => setError("")} 
             />
           )}
 
           {/* Form Content */}
           <div className="space-y-6">
             <div>
               <label 
                 className="block text-sm font-medium text-center mb-4" 
                 style={{ color: COLORS.primary }}
               >
                 Enter 6-digit verification code
               </label>
 
               <OTPInput
                 value={otp}
                 onChange={setOtp}
                 length={OTP_LENGTH}
                 disabled={isSubmitting || otpTimer === 0}
                 error={!!error}
               />
             </div>
 
             {/* OTP Expired Message */}
             {otpTimer === 0 && (
               <p className="text-red-500 text-sm text-center font-medium">
                 OTP expired. Please request a new one.
               </p>
             )}
 
             {/* Loading State */}
             {otp.length === OTP_LENGTH && isSubmitting && (
               <LoadingSpinner text="Verifying..." />
             )}
 
             {/* Resend Section */}
             <div className="text-center pt-4 border-t space-y-3" style={{ borderColor: COLORS.border }}>
               <p className="text-sm" style={{ color: COLORS.textMuted }}>
                 Didn't receive the code?
               </p>
 
               {resendCooldown > 0 ? (
                 <div className="flex items-center justify-center space-x-2" style={{ color: COLORS.textMuted }}>
                   <Clock className="w-4 h-4" />
                   <span className="text-sm">
                     Resend available in {formatTime(resendCooldown)}
                   </span>
                 </div>
               ) : (
                 <button
                   type="button"
                   onClick={handleResendOTP}
                   disabled={isResending}
                   style={{ color: COLORS.primary }}
                   className="hover:opacity-80 font-semibold text-sm flex items-center justify-center space-x-2 transition-opacity disabled:opacity-50"
                 >
                   {isResending ? (
                     <>
                       <RefreshCw className="w-4 h-4 animate-spin" />
                       <span>Sending...</span>
                     </>
                   ) : (
                     <>
                       <RefreshCw className="w-4 h-4" />
                       <span>Resend Code</span>
                     </>
                   )}
                 </button>
               )}
             </div>
 
             {/* Back Button */}
             <button
               type="button"
               onClick={handleBack}
               style={{ 
                 backgroundColor: COLORS.cardBackground, 
                 color: COLORS.primary,
                 borderColor: COLORS.border
               }}
               className="w-full border hover:border-yellow-400/50 py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 transition-all hover:opacity-90"
             >
               <ArrowLeft className="w-4 h-4" />
               <span>Back to Registration</span>
             </button>
           </div>
         </div>
 
         {/* Footer */}
         <div className="mt-6 text-center">
           <p className="text-xs flex items-center justify-center space-x-1" style={{ color: COLORS.textMuted }}>
             <Shield className="w-3 h-3" />
             <span>Code expires in {formatTime(otpTimer)} for your security</span>
           </p>
         </div>
       </div>
     </div>
   );
 };
 
 export default OTPVerification;