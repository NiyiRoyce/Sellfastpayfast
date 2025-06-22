import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Lock,
  Key,
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut,
  Download,
  Trash2,
  Check,
  X,
  Edit3
} from 'lucide-react';

// Theme configuration
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

interface SettingsCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, children, className = "" }) => (
  <div className={`${theme.surface} rounded-2xl border shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#FEFD0C]/5 hover:border-[#FEFD0C]/20 ${className}`}>
    <div className="p-6">
      <h2 className={`text-xl font-semibold ${theme.text} mb-6 flex items-center space-x-2`}>
        <span>{title}</span>
      </h2>
      {children}
    </div>
  </div>
);

interface SettingsRowProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  rightElement?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ 
  icon, 
  title, 
  description, 
  rightElement, 
  onClick, 
  danger = false 
}) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between py-4 px-5 rounded-xl transition-all duration-300 cursor-pointer group relative overflow-hidden
      ${onClick ? `hover:bg-gradient-to-r ${danger ? 'hover:from-red-500/5 hover:to-red-500/10 hover:border-red-500/20' : 'hover:from-[#FEFD0C]/5 hover:to-[#FEFD0C]/10 hover:border-[#FEFD0C]/20'} hover:shadow-lg ${danger ? 'hover:shadow-red-500/10' : 'hover:shadow-[#FEFD0C]/10'} hover:-translate-y-0.5` : ''}
      border border-transparent`}
  >
    {/* Subtle glow effect on hover */}
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl ${
      danger 
        ? 'bg-gradient-to-r from-red-500/5 to-transparent' 
        : 'bg-gradient-to-r from-[#FEFD0C]/5 to-transparent'
    }`} />
    
    <div className="flex items-center space-x-4 relative z-10">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 transform ${
        danger 
          ? 'bg-red-500/20 text-red-400 group-hover:bg-red-500/30 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-500/20' 
          : 'bg-gradient-to-br from-[#FEFD0C]/20 to-[#FEFD0C]/10 text-[#FEFD0C] group-hover:from-[#FEFD0C]/30 group-hover:to-[#FEFD0C]/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#FEFD0C]/20'
      }`}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5 transition-transform duration-300 group-hover:scale-110' })}
      </div>
      <div>
        <h3 className={`text-base font-medium ${danger ? 'text-red-400' : theme.text} group-hover:text-white transition-all duration-300 ${onClick ? 'group-hover:translate-x-1' : ''}`}>
          {title}
        </h3>
        {description && (
          <p className={`text-sm ${theme.textMuted} mt-0.5 group-hover:text-gray-300 transition-all duration-300 ${onClick ? 'group-hover:translate-x-1' : ''}`}>
            {description}
          </p>
        )}
      </div>
    </div>
    <div className="flex items-center space-x-3 relative z-10">
      {rightElement}
      {onClick && (
        <ChevronRight className={`w-5 h-5 ${theme.textMuted} transition-all duration-300 transform ${
          danger 
            ? 'group-hover:text-red-400 group-hover:translate-x-2 group-hover:scale-110' 
            : 'group-hover:text-[#FEFD0C] group-hover:translate-x-2 group-hover:scale-110'
        }`} />
      )}
    </div>
  </div>
);

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-7 rounded-full transition-all duration-300 transform hover:scale-105 ${
        checked 
          ? 'bg-[#FEFD0C] shadow-lg shadow-[#FEFD0C]/20 hover:shadow-xl hover:shadow-[#FEFD0C]/30' 
          : 'bg-gray-700 hover:bg-gray-600 hover:shadow-lg hover:shadow-gray-500/20'
      }`}
    >
      <div className={`absolute w-5 h-5 bg-white rounded-full transition-all duration-300 transform ${
        checked ? 'translate-x-6 shadow-md hover:shadow-lg' : 'translate-x-1 hover:shadow-md'
      } top-1 shadow-sm hover:scale-105`} />
    </button>
  );
};

const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
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
    <div className={`min-h-screen ${theme.background} py-8`} style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
    }}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FEFD0C]/10 via-transparent to-[#FEFD0C]/10"></div>
        <div className="absolute top-1/4 left-1/6 w-[600px] h-[600px] bg-[#FEFD0C]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-[600px] h-[600px] bg-[#FEFD0C]/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-5">
            <button
              onClick={handleBack}
              aria-label="Go back"
              className={`p-3 rounded-full ${theme.surface} hover:${theme.surfaceHover} ${theme.border} border transition-all duration-300 flex items-center justify-center group shadow-md hover:shadow-xl hover:shadow-[#FEFD0C]/10 hover:border-[#FEFD0C]/30`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className={`text-3xl font-bold ${theme.text} mb-1`}>Settings</h1>
              <p className={`text-base ${theme.textSecondary}`}>Manage your account preferences</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-12">
            <SettingsCard title="Profile">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative group">
                    <div className={`w-20 h-20 bg-[#FEFD0C] rounded-2xl flex items-center justify-center shadow-lg shadow-[#FEFD0C]/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[#FEFD0C]/30 group-hover:rotate-3`}>
                      <User className="w-10 h-10 text-black transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className={`text-xl font-semibold ${theme.text} transition-colors duration-300 hover:text-[#FEFD0C]`}>John Doe</h3>
                    <p className={`text-base ${theme.textSecondary} transition-colors duration-300 hover:text-white`}>john.doe@example.com</p>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 bg-[#FEFD0C] text-black text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FEFD0C]/30`}>
                        Premium
                      </span>
                      <span className={`px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 hover:bg-green-500/30 hover:shadow-lg hover:shadow-green-500/20`}>
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
                <button className={`px-5 py-3 bg-black border border-[#FEFD0C]/20 hover:border-[#FEFD0C] rounded-2xl transition-all duration-300 flex items-center space-x-2 hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-[#FEFD0C]/10 text-base group`}>
                  <Edit3 className="w-5 h-5 transition-all duration-300 group-hover:text-[#FEFD0C] group-hover:rotate-12" />
                  <span className="font-medium transition-colors duration-300 group-hover:text-[#FEFD0C]">Edit</span>
                </button>
              </div>
            </SettingsCard>
          </div>

          {/* Left Column - Preferences */}
          <div className="lg:col-span-6 space-y-8">
            <SettingsCard title="Preferences">
              <div className="space-y-2">
                <SettingsRow
                  icon={<Bell />}
                  title="Notifications"
                  description="Push notifications and email alerts"
                  rightElement={<Toggle checked={notifications} onChange={setNotifications} />}
                />
              </div>
            </SettingsCard>

            <SettingsCard title="Account">
              <div className="space-y-2">
                <SettingsRow
                  icon={<HelpCircle />}
                  title="Help & Support"
                  description="Get assistance"
                  onClick={() => console.log('Help & Support')}
                />
                
                <SettingsRow
                  icon={<LogOut />}
                  title="Sign Out"
                  description="Sign out of your account"
                  onClick={handleLogout}
                />
              </div>
            </SettingsCard>
          </div>

          {/* Right Column - Security */}
          <div className="lg:col-span-6 space-y-8">
            <SettingsCard title="Security">
              <div className="space-y-2">
                <SettingsRow
                  icon={<Shield />}
                  title="Two-Factor Authentication"
                  description={twoFactor ? "Currently enabled" : "Enhance security"}
                  rightElement={<Toggle checked={twoFactor} onChange={setTwoFactor} />}
                />
                
                <SettingsRow
                  icon={<Lock />}
                  title="Change Password"
                  description="Update your password"
                  onClick={() => console.log('Change password')}
                />
              </div>
            </SettingsCard>

            {/* Danger Zone */}
            <SettingsCard title="Danger Zone" className="border-red-500/20 bg-red-500/5 hover:border-red-500/30 hover:bg-red-500/10">
              <div className="space-y-2">
                <SettingsRow
                  icon={<Trash2 />}
                  title={showDeleteConfirm ? "Confirm Deletion" : "Delete Account"}
                  description={showDeleteConfirm ? "This is permanent" : "Remove account permanently"}
                  danger={true}
                  onClick={handleDeleteAccount}
                  rightElement={
                    showDeleteConfirm ? (
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteConfirm(false);
                          }}
                          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 text-sm hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20"
                        >
                          <X className="w-4 h-4 transition-transform duration-300 hover:rotate-90" />
                          <span>Cancel</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAccount();
                          }}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 text-sm hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
                        >
                          <Check className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
                          <span>Confirm</span>
                        </button>
                      </div>
                    ) : null
                  }
                />
              </div>
            </SettingsCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;