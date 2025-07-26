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

// Helpers
const formatTime = (seconds: number): string =>
  `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

// Alert component
const Alert: React.FC<AlertProps> = ({ type, message, onDismiss }) => {
  const styles = {
    success: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      text: "text-green-400",
    },
    error: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: "text-red-400",
    },
    info: {
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/30",
      text: "text-yellow-400",
    },
  };

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Mail,
  };

  const Icon = icons[type];
  const config = styles[type];

  return (
    <div
      className={`${config.bg} ${config.border} ${config.text} border px-4 py-3 rounded-lg flex items-center space-x-3 mb-4`}
      role="alert"
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      <span className="text-sm flex-1">{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={`${config.text} hover:opacity-70`}
          aria-label="Dismiss"
        >
          <AlertCircle className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

// OTP input field
const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  length,
  disabled = false,
  error = false,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, inputValue: string): void => {
    if (disabled) return;
    const digit = inputValue.replace(/\D/g, "").slice(-1);
    const newValue = value.split("");
    newValue[index] = digit;
    onChange(newValue.join(""));

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (disabled) return;
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    onChange(pasted);
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
  };

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
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', color: '#FEFD0C' }}
          className={`w-12 h-12 text-center text-lg font-bold border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : "border-yellow-400/50 focus:border-yellow-400 focus:ring-yellow-400/20"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-yellow-400/70"}`}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

// Main component
const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpTimer, setOtpTimer] = useState(OTP_EXPIRY_SECONDS);

  const [userInfo] = useState<UserInfo>(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email") || "test@example.com";
    const phone = params.get("phone") || "+1234567890";
    return { email, phone };
  });

  // OTP Expiry Timer
  useEffect(() => {
    if (otpTimer > 0) {
      const interval = setInterval(() => setOtpTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [otpTimer]);

  // Resend Cooldown Timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting || otp.length !== OTP_LENGTH) return;

    if (!/^\d{6}$/.test(otp)) {
      setError("OTP must be a 6-digit number.");
      return;
    }

    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      // Simulated API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccessMessage("Account verified successfully! Redirecting...");

      setTimeout(() => {
        console.log("Redirecting to login...");
        // window.location.href = "/login";
      }, 2000);
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err.message || "Unknown error occurred.";
      setError(errorMsg);
      setOtp("");
    } finally {
      setIsSubmitting(false);
    }
  }, [otp, isSubmitting]);

  useEffect(() => {
    if (otp.length === OTP_LENGTH && !isSubmitting) {
      handleSubmit();
    }
  }, [otp, isSubmitting, handleSubmit]);

  const handleResendOTP = async () => {
    if (isResending || resendCooldown > 0) return;

    setError("");
    setIsResending(true);

    try {
      // Simulated API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccessMessage("OTP sent successfully!");
      setResendCooldown(RESEND_COOLDOWN);
      setOtpTimer(OTP_EXPIRY_SECONDS);
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err.message || "Failed to resend OTP.";
      setError(errorMsg);
    } finally {
      setIsResending(false);
    }
  };

  const handleBack = () => {
    console.log("Going back to registration...");
  };

  const contactInfo = (() => {
    if (userInfo.email && userInfo.phone)
      return { icon: Mail, text: `${userInfo.email} and ${userInfo.phone}` };
    if (userInfo.email) return { icon: Mail, text: userInfo.email };
    if (userInfo.phone) return { icon: Phone, text: userInfo.phone };
    return { icon: Mail, text: "your registered contact" };
  })();

  const ContactIcon = contactInfo.icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-8">
      <div className="max-w-md w-full relative z-10">
        <div className="flex justify-center mb-6">
          <div 
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            className="border border-yellow-400/30 px-4 py-2 rounded-full flex items-center space-x-2"
          >
            <Shield className="w-4 h-4" style={{ color: '#FEFD0C' }} />
            <span className="text-xs font-medium" style={{ color: '#FEFD0C' }}>SECURE VERIFICATION</span>
          </div>
        </div>

        <div 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
          className="border border-yellow-400/30 p-8 rounded-2xl shadow-2xl backdrop-blur-sm"
        >
          <div className="text-center mb-8">
            <div className="h-14 w-14 bg-yellow-400/10 border border-yellow-400/30 rounded-xl mx-auto flex items-center justify-center mb-4">
              <ContactIcon style={{ color: '#FEFD0C' }} className="w-7 h-7" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              <span style={{ color: '#FEFD0C' }}>Verify</span> <span className="text-white">Account</span>
            </h1>
            <p className="text-gray-300 text-sm">We've sent a verification code to</p>
            <p className="text-sm font-medium truncate" style={{ color: '#FEFD0C' }}>{contactInfo.text}</p>
          </div>

          {successMessage && <Alert type="success" message={successMessage} />}
          {error && <Alert type="error" message={error} onDismiss={() => setError("")} />}

          <div className="space-y-6">
            <label className="block text-sm font-medium text-center mb-4" style={{ color: '#FEFD0C' }}>
              Enter 6-digit verification code
            </label>

            <OTPInput
              value={otp}
              onChange={setOtp}
              length={OTP_LENGTH}
              disabled={isSubmitting || otpTimer === 0}
              error={!!error}
            />

            {otpTimer === 0 && (
              <p className="text-red-500 text-sm text-center">OTP expired. Please resend.</p>
            )}

            {otp.length === OTP_LENGTH && isSubmitting && (
              <div className="flex items-center justify-center space-x-2" style={{ color: '#FEFD0C' }}>
                <div 
                  className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" 
                  style={{ borderColor: '#FEFD0C', borderTopColor: 'transparent' }}
                />
                <span className="text-sm">Verifying...</span>
              </div>
            )}

            <div className="text-center pt-4 border-t border-yellow-400/20 space-y-3">
              <p className="text-sm text-gray-300">Didn't receive the code?</p>

              {resendCooldown > 0 ? (
                <div className="flex items-center justify-center text-gray-400 space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Resend available in {formatTime(resendCooldown)}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isResending}
                  style={{ color: '#FEFD0C' }}
                  className="hover:opacity-80 font-semibold text-sm flex items-center justify-center space-x-2 transition-opacity"
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

            <button
              type="button"
              onClick={handleBack}
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.4)', 
                color: '#FEFD0C',
                borderColor: 'rgba(254, 253, 12, 0.3)'
              }}
              className="w-full border hover:border-yellow-400/50 py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 transition-all hover:opacity-90"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Registration</span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>Code expires in {formatTime(otpTimer)} for your security</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
