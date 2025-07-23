import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Globe,
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
  Edit3,
  Mail,
  Eye
} from 'lucide-react';

// Simplified theme configuration
const theme = {
  primary: 'from-[#FEFD0C] to-[#F5F500]',
  primaryAccent: '#FEFD0C',
  background: 'bg-black',
  surface: 'bg-black/70 backdrop-blur-2xl border-white/5',
  text: 'text-white',
  textSecondary: 'text-gray-300',
  textMuted: 'text-gray-400',
  textAccent: 'text-[#FEFD0C]',
  border: 'border-white/10',
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-[#FEFD0C]',
} as const;

interface SettingsCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, children, className = "" }) => (
  <div className={`${theme.surface} rounded-xl border ${theme.border} backdrop-blur-3xl ${className}`}>
    <div className="p-8">
      <h2 className={`text-2xl font-semibold ${theme.text} mb-8 flex items-center space-x-3`}>
        <span className="relative">
          {title}
          <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#FEFD0C] to-transparent rounded-full"></div>
        </span>
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
    className={`flex items-center justify-between py-6 px-6 rounded-2xl transition-colors duration-200 ${
      onClick ? 'cursor-pointer hover:bg-white/5' : ''
    } ${danger ? 'hover:bg-red-500/10' : ''}`}
  >
    <div className="flex items-center space-x-5">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
        danger 
          ? 'bg-red-500/10 text-red-400' 
          : 'bg-[#FEFD0C]/10 text-[#FEFD0C]'
      }`}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      </div>
      <div>
        <h3 className={`text-lg font-medium ${danger ? 'text-red-400' : theme.text}`}>
          {title}
        </h3>
        {description && (
          <p className={`text-sm ${theme.textMuted} mt-1`}>
            {description}
          </p>
        )}
      </div>
    </div>
    <div className="flex items-center space-x-4">
      {rightElement}
      {onClick && (
        <ChevronRight className={`w-5 h-5 ${theme.textMuted}`} />
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
      className={`relative w-14 h-8 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FEFD0C]/50 ${
        checked 
          ? 'bg-[#FEFD0C]' 
          : 'bg-gray-700'
      }`}
    >
      <div className={`absolute w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
        checked ? 'translate-x-7' : 'translate-x-1'
      } top-1 shadow-md`}>
        {checked && (
          <Check className="w-3 h-3 text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
    </button>
  );
};

const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const goBack = () => {
    window.history.back();
  };

  const handleLogout = () => {
    // Redirect to index page
    window.location.href = '/';
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
    <div className={`min-h-screen ${theme.background} relative p-8 text-white font-sans`}>
      <div className="max-w-7xl mx-auto">
        {/* Header with Back button */}
        <header className="flex items-center justify-between mb-8">
          <button
            onClick={goBack}
            aria-label="Go back"
            className={`p-2 rounded-full border border-white/20 transition-colors duration-200 flex items-center justify-center mr-4`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-extrabold tracking-tight flex-1 text-center md:text-left">
            Settings
          </h1>
          <div className="w-10 h-10"></div> {/* Spacer to balance the layout */}
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - General Settings */}
          <div className="space-y-8">
            <SettingsCard title="General">
              <div className="space-y-3">
                <SettingsRow
                  icon={<Bell />}
                  title="Push Notifications"
                  description="Receive notifications on this device"
                  rightElement={<Toggle checked={notifications} onChange={setNotifications} />}
                />
                <SettingsRow
                  icon={<Mail />}
                  title="Email Notifications"
                  description="Get updates via email"
                  rightElement={<Toggle checked={emailNotifications} onChange={setEmailNotifications} />}
                />
              </div>
            </SettingsCard>

            <SettingsCard title="Privacy">
              <div className="space-y-3">
                <SettingsRow
                  icon={<Eye />}
                  title="Privacy Settings"
                  description="Control your data visibility"
                  onClick={() => console.log('Privacy settings')}
                />
                <SettingsRow
                  icon={<Download />}
                  title="Download Data"
                  description="Export your account data"
                  onClick={() => console.log('Download data')}
                />
              </div>
            </SettingsCard>
          </div>

          {/* Right Column - Security & Account */}
          <div className="space-y-8">
            <SettingsCard title="Security">
              <div className="space-y-3">
                <SettingsRow
                  icon={<Shield />}
                  title="Two-Factor Authentication"
                  description={twoFactor ? "Enhanced security enabled" : "Strengthen your account"}
                  rightElement={<Toggle checked={twoFactor} onChange={setTwoFactor} />}
                />
                <SettingsRow
                  icon={<Key />}
                  title="Active Sessions"
                  description="Manage logged-in devices"
                  onClick={() => console.log('Active sessions')}
                />
              </div>
            </SettingsCard>

            <SettingsCard title="Account">
              <div className="space-y-3">
                <SettingsRow
                  icon={<HelpCircle />}
                  title="Help & Support"
                  description="Get assistance and documentation"
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

            {/* Danger Zone */}
            <SettingsCard title="Danger Zone" className="border-red-500/20 bg-red-500/5">
              <div className="space-y-3">
                <SettingsRow
                  icon={<Trash2 />}
                  title={showDeleteConfirm ? "Confirm Account Deletion" : "Delete Account"}
                  description={showDeleteConfirm ? "This action cannot be undone" : "Permanently remove your account"}
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
                          className="px-5 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-xl transition-colors duration-200 flex items-center space-x-2 text-sm"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAccount();
                          }}
                          className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors duration-200 flex items-center space-x-2 text-sm"
                        >
                          <Check className="w-4 h-4" />
                          <span>Delete</span>
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