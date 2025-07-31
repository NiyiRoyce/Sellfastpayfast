import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Mail,
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

// Constants
const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;
const OTP_EXPIRY_SECONDS = 300; // 5 minutes
const COLORS = {
  primary: '#FEFD0C',
  background: '#000000',
  cardBackground: 'rgba(0, 0, 0, 0.6)',
  border: 'rgba(254, 253, 12, 0.3)',
  borderHover: 'rgba(254, 253, 12, 0.5)',
  text: '#FEFD0C',
  textMuted: 'rgba(254, 253, 12, 0.7)',
  success: '#FEFD0C',
  error: '#FEFD0C',
  warning: '#FEFD0C',
};

const API_ENDPOINTS = {
  verify: "https://sellfastpayfast-backend.onrender.com/api/auth/verify-otp",
  resend: "https://sellfastpayfast-backend.onrender.com/api/auth/resend-otp",
};

// Types
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
  const getIcon = () => {
    switch (type) {
      case "success":
        return CheckCircle;
      case "error":
        return AlertCircle;
      default:
        return Mail;
    }
  };

  const Icon = getIcon();

  return (
    <div 
      className="border px-4 py-3 rounded-lg flex items-center justify-center space-x-3 mb-4"
      style={{
        backgroundColor: 'rgba(254, 253, 12, 0.1)',
        borderColor: 'rgba(254, 253, 12, 0.3)',
        color: COLORS.primary
      }}
      role="alert"
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      <span className="text-sm text-center flex-1">{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="hover:opacity-70 transition-opacity"
          style={{ color: COLORS.primary }}
          aria-label="Dismiss alert"
        >
          ×
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
    if (!disabled && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  const handleInputChange = useCallback(
    (index: number, inputValue: string): void => {
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
    },
    [value, onChange, disabled, length]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
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
    },
    [value, disabled, length]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, length);

      onChange(pastedData);

      // Focus the last filled input or the last input
      const focusIndex = Math.min(pastedData.length, length - 1);
      setTimeout(() => {
        inputRefs.current[focusIndex]?.focus();
      }, 0);
    },
    [disabled, length, onChange]
  );

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
            backgroundColor: COLORS.background,
            color: COLORS.primary,
            borderColor: COLORS.border,
          }}
          className={`w-12 h-12 text-center text-lg font-bold border-2 rounded-lg transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            hover:border-opacity-70 focus:border-opacity-100
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
        borderTopColor: 'transparent',
      }}
    />
    <span className="text-sm">{text}</span>
  </div>
);

const OTPVerification: React.FC = () => {
  // State Management
  const [otp, setOtp] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [otpTimer, setOtpTimer] = useState<number>(OTP_EXPIRY_SECONDS);

  // User Info from URL parameters
  const [userInfo] = useState<UserInfo>(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      email: params.get("email") || "",
      phone: params.get("phone") || "",
    };
  });

  // OTP timer interval (runs every second)
  useEffect(() => {
    if (otpTimer <= 0) return;

    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [otpTimer]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timeout = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);

    return () => clearTimeout(timeout);
  }, [resendCooldown]);

  // Helper for request payload including email/phone
  const getVerificationPayload = useCallback(() => {
    const payload: Record<string, string> = { otp };
    if (userInfo.email) payload.email = userInfo.email;
    if (userInfo.phone) payload.phone = userInfo.phone;
    return payload;
  }, [otp, userInfo]);

  const getResendPayload = useCallback(() => {
    const payload: Record<string, string> = {};
    if (userInfo.email) payload.email = userInfo.email;
    if (userInfo.phone) payload.phone = userInfo.phone;
    return payload;
  }, [userInfo]);

  // OTP Submission Handler
  const handleSubmit = useCallback(async () => {
    // Prevent submission if already submitting, resending, OTP incomplete, or expired
    if (isSubmitting || isResending || otp.length !== OTP_LENGTH || otpTimer === 0) return;

    if (!validateOTP(otp)) {
      setError("OTP must be a 6-digit number.");
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
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Verification failed. Please try again.");
      }

      const data = await response.json();
      setSuccessMessage("Account verified successfully! Redirecting...");
      
      setTimeout(() => {
        // In a real app, you might want to use React Router or Next.js router
        window.location.href = "/login";
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Verification failed. Please try again.");
      setOtp(""); // Clear OTP on error
    } finally {
      setIsSubmitting(false);
    }
  }, [otp, isSubmitting, isResending, otpTimer, getVerificationPayload]);

  // Auto-submit when OTP is complete
  useEffect(() => {
    if (otp.length === OTP_LENGTH && !isSubmitting && !isResending && otpTimer > 0) {
      handleSubmit();
    }
  }, [otp, isSubmitting, isResending, otpTimer, handleSubmit]);

  // Resend OTP Handler
  const handleResendOTP = useCallback(async () => {
    // Prevent resend if already resending, submitting, or in cooldown
    if (isResending || isSubmitting || resendCooldown > 0) return;

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
        throw new Error(errorData?.message || "Failed to resend OTP. Please try again.");
      }

      setSuccessMessage("OTP has been resent successfully!");
      setResendCooldown(RESEND_COOLDOWN);
      setOtpTimer(OTP_EXPIRY_SECONDS);
      setOtp(""); // Clear current OTP
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  }, [isResending, isSubmitting, resendCooldown, getResendPayload]);

  // Back to login handler
  const handleBackToLogin = useCallback(() => {
    window.location.href = "/login";
  }, []);

  // Clear alerts after 5 seconds
  useEffect(() => {
    if (error || successMessage) {
      const timeout = setTimeout(() => {
        setError("");
        setSuccessMessage("");
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [error, successMessage]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: COLORS.background }}
    >
      <div 
        className="w-full max-w-md p-8 rounded-2xl border shadow-2xl"
        style={{
          backgroundColor: COLORS.cardBackground,
          borderColor: COLORS.border,
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(254, 253, 12, 0.1)' }}
          >
            <Mail className="h-8 w-8" style={{ color: COLORS.primary }} />
          </div>
          <h1 
            className="text-2xl font-bold mb-2"
            style={{ color: COLORS.primary }}
          >
            Verify Your Account
          </h1>
          <p 
            className="text-sm"
            style={{ color: COLORS.textMuted }}
          >
            Enter the 6-digit code sent to your provided email{" "}
            {userInfo.email && (
              <span className="font-medium" style={{ color: COLORS.primary }}>
                {userInfo.email}
              </span>
            )}
            {userInfo.email && userInfo.phone && " and "}
            {userInfo.phone && (
              <span className="font-medium" style={{ color: COLORS.primary }}>
                {userInfo.phone}
              </span>
            )}
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <Alert
            type="error"
            message={error}
            onDismiss={() => setError("")}
          />
        )}

        {successMessage && (
          <Alert
            type="success"
            message={successMessage}
            onDismiss={() => setSuccessMessage("")}
          />
        )}

        {/* OTP Timer */}
        {otpTimer > 0 ? (
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="h-4 w-4" style={{ color: COLORS.primary }} />
              <span 
                className="text-sm font-medium"
                style={{ color: COLORS.primary }}
              >
                Code expires in: {formatTime(otpTimer)}
              </span>
            </div>
          </div>
        ) : (
          <Alert
            type="error"
            message="OTP has expired. Please request a new code."
          />
        )}

        {/* OTP Input */}
        <div className="mb-6">
          <label 
            className="block text-sm font-medium mb-4 text-center"
            style={{ color: COLORS.primary }}
          >
            Enter Verification Code
          </label>
          <OTPInput
            value={otp}
            onChange={setOtp}
            length={OTP_LENGTH}
            disabled={isSubmitting || isResending || otpTimer === 0}
            error={!!error}
          />
        </div>

        {/* Submit Status */}
        {isSubmitting && (
          <div className="mb-6">
            <LoadingSpinner text="Verifying..." />
          </div>
        )}

        {/* Resend Section */}
        <div className="text-center mb-6">
          <p 
            className="text-sm mb-3"
            style={{ color: COLORS.textMuted }}
          >
            Didn't receive the code?
          </p>
          
          {resendCooldown > 0 ? (
            <p 
              className="text-sm"
              style={{ color: COLORS.textMuted }}
            >
              Resend available in {resendCooldown}s
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isResending || isSubmitting}
              className="inline-flex items-center space-x-2 text-sm font-medium hover:opacity-80 
                         transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ color: COLORS.primary }}
            >
              {isResending ? (
                <>
                  <div
                    className="w-3 h-3 border border-t-transparent rounded-full animate-spin"
                    style={{
                      borderColor: COLORS.primary,
                      borderTopColor: 'transparent',
                    }}
                  />
                  <span>Resending...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  <span>Resend Code</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleBackToLogin}
            disabled={isSubmitting || isResending}
            className="inline-flex items-center space-x-2 text-sm hover:opacity-80 
                       transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ color: COLORS.textMuted }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;