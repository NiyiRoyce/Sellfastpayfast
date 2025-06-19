import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Lock,
  Key,
  Eye,
  EyeOff,
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut,
  Download,
  Trash2,
  Check,
  X
} from 'lucide-react';

// Theme configuration matching the exchange component
const theme = {
  primary: 'from-[#FEFD0C] to-[#FEFD0C]/90',
  primaryHover: 'from-[#FEFD0C]/90 to-[#FEFD0C]',
  primaryColor: '#FEFD0C',
  secondary: 'from-gray-800 to-gray-900',
  secondaryHover: 'from-gray-700 to-gray-800',
  background: 'bg-black',
  surface: 'bg-black/60 backdrop-blur-xl border-[#FEFD0C]/10',
  surfaceHover: 'bg-black/80',
  text: 'text-white',
  textSecondary: 'text-gray-300',
  textMuted: 'text-gray-400',
  border: 'border-[#FEFD0C]/10',
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-[#FEFD0C]',
  input: 'bg-black/40 border-[#FEFD0C]/20 focus:border-[#FEFD0C] focus:ring-[#FEFD0C]/20'
} as const;

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  rightElement?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ 
  icon, 
  title, 
  description, 
  rightElement, 
  onClick, 
  danger = false 
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between p-4 rounded-xl ${theme.surface} hover:${theme.surfaceHover} transition-all duration-300 border group hover:scale-[1.02] hover:shadow-lg hover:shadow-[#FEFD0C]/10`}
  >
    <div className="flex items-center space-x-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        danger 
          ? 'bg-red-500/20 text-red-400' 
          : 'bg-gradient-to-br from-[#FEFD0C]/20 to-[#FEFD0C]/10 text-[#FEFD0C]'
      } group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <div className="text-left">
        <p className={`font-medium ${danger ? 'text-red-400' : theme.text}`}>
          {title}
        </p>
        {description && (
          <p className={`text-sm ${theme.textMuted} mt-0.5`}>
            {description}
          </p>
        )}
      </div>
    </div>
    <div className="flex items-center space-x-2">
      {rightElement}
      <ChevronRight className={`w-4 h-4 ${theme.textMuted} group-hover:text-[#FEFD0C] transition-colors duration-300`} />
    </div>
  </button>
);

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
      checked 
        ? 'bg-gradient-to-r from-[#FEFD0C] to-[#FEFD0C]/90 shadow-lg shadow-[#FEFD0C]/20' 
        : 'bg-gray-700 hover:bg-gray-600'
    }`}
  >
    <div className={`absolute w-5 h-5 bg-white rounded-full transition-all duration-300 transform ${
      checked ? 'translate-x-6 shadow-lg' : 'translate-x-0.5'
    } top-0.5`} />
  </button>
);

const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleBack = () => {
    try {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      window.location.href = '/';
    }
  };

  const handleLogout = () => {
    // Simulate logout logic
    console.log('Logging out...');
  };

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      console.log('Account deletion confirmed');
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  return (
    <div className={`min-h-screen ${theme.background} py-6`} style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
    }}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FEFD0C]/10 via-transparent to-[#FEFD0C]/10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FEFD0C]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FEFD0C]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md mx-auto px-4 space-y-6 relative z-10">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={handleBack}
            className={`flex items-center justify-center w-12 h-12 rounded-xl ${theme.surface} hover:${theme.surfaceHover} ${theme.textSecondary} hover:${theme.text} transition-all duration-300 border shadow-lg hover:shadow-[#FEFD0C]/20 hover:scale-105`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className={`text-xl font-bold ${theme.text}`}>Settings</h1>
            <p className={`text-sm ${theme.textSecondary}`}>Manage your preferences</p>
          </div>
        </div>

        {/* Profile Section */}
        <div className={`${theme.surface} rounded-2xl p-6 border shadow-2xl shadow-black/50`}>
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${theme.primary} rounded-full flex items-center justify-center shadow-lg shadow-[#FEFD0C]/20`}>
              <User className="w-8 h-8 text-black" />
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${theme.text}`}>John Doe</h3>
              <p className={`text-sm ${theme.textSecondary}`}>john.doe@example.com</p>
              <p className={`text-xs ${theme.textMuted} mt-1`}>Premium Member</p>
            </div>
            <button className={`p-2 rounded-lg ${theme.surface} hover:${theme.surfaceHover} transition-all duration-300 border hover:scale-110`}>
              <Settings className={`w-4 h-4 ${theme.textMuted}`} />
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-3">
          <h2 className={`text-lg font-semibold ${theme.text} px-2`}>Preferences</h2>
          
          <SettingsItem
            icon={<Bell className="w-5 h-5" />}
            title="Notifications"
            description="Push notifications and alerts"
            rightElement={
              <Toggle checked={notifications} onChange={setNotifications} />
            }
          />

          <SettingsItem
            icon={darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            title="Dark Mode"
            description="Toggle dark/light theme"
            rightElement={
              <Toggle checked={darkMode} onChange={setDarkMode} />
            }
          />

          <SettingsItem
            icon={<Globe className="w-5 h-5" />}
            title="Language"
            description="English (US)"
            onClick={() => console.log('Language settings')}
          />

          <SettingsItem
            icon={<Palette className="w-5 h-5" />}
            title="Appearance"
            description="Customize app appearance"
            onClick={() => console.log('Appearance settings')}
          />
        </div>

        {/* Security */}
        <div className="space-y-3">
          <h2 className={`text-lg font-semibold ${theme.text} px-2`}>Security</h2>
          
          <SettingsItem
            icon={<Shield className="w-5 h-5" />}
            title="Two-Factor Authentication"
            description={twoFactor ? "Enabled" : "Disabled"}
            rightElement={
              <Toggle checked={twoFactor} onChange={setTwoFactor} />
            }
          />

          <SettingsItem
            icon={<Smartphone className="w-5 h-5" />}
            title="Biometric Login"
            description="Use fingerprint or face ID"
            rightElement={
              <Toggle checked={biometric} onChange={setBiometric} />
            }
          />

          <SettingsItem
            icon={<Lock className="w-5 h-5" />}
            title="Change Password"
            description="Update your account password"
            onClick={() => console.log('Change password')}
          />

          <SettingsItem
            icon={<Key className="w-5 h-5" />}
            title="API Keys"
            description="Manage trading API keys"
            onClick={() => console.log('API keys')}
          />
        </div>

        {/* Account */}
        <div className="space-y-3">
          <h2 className={`text-lg font-semibold ${theme.text} px-2`}>Account</h2>
          
          <SettingsItem
            icon={<Download className="w-5 h-5" />}
            title="Export Data"
            description="Download your trading history"
            onClick={() => console.log('Export data')}
          />

          <SettingsItem
            icon={<HelpCircle className="w-5 h-5" />}
            title="Help & Support"
            description="Get help and contact support"
            onClick={() => console.log('Help & Support')}
          />

          <SettingsItem
            icon={<LogOut className="w-5 h-5" />}
            title="Sign Out"
            description="Sign out of your account"
            onClick={handleLogout}
          />
        </div>

        {/* Danger Zone */}
        <div className="space-y-3">
          <h2 className={`text-lg font-semibold text-red-400 px-2`}>Danger Zone</h2>
          
          <div className={`${theme.surface} rounded-2xl p-4 border border-red-500/20 bg-red-500/5 shadow-2xl shadow-black/50`}>
            <SettingsItem
              icon={<Trash2 className="w-5 h-5" />}
              title={showDeleteConfirm ? "Confirm Deletion" : "Delete Account"}
              description={showDeleteConfirm ? "This action cannot be undone" : "Permanently delete your account"}
              danger={true}
              onClick={handleDeleteAccount}
              rightElement={
                showDeleteConfirm ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteConfirm(false);
                      }}
                      className="p-1 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors duration-300"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAccount();
                      }}
                      className="p-1 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-300"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ) : null
              }
            />
          </div>
        </div>

        {/* App Info */}
        <div className={`${theme.surface} rounded-2xl p-4 border shadow-2xl shadow-black/50 text-center`}>
          <p className={`text-sm ${theme.textMuted}`}>
            CryptoEx v2.1.0
          </p>
          <p className={`text-xs ${theme.textMuted} mt-1`}>
            © 2025 CryptoEx. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;