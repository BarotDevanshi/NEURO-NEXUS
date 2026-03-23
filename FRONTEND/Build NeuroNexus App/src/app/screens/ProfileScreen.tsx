import React, { useState } from 'react';
import { User, Mail, Moon, Sun, LogOut, Brain, Settings, Bell, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router';
import { progressService } from '../services/api';

const avatarMoods = {
  happy: '😊',
  calm: '😌',
  focused: '🎯',
  relaxed: '😴',
  energetic: '⚡',
};

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [avatarMood, setAvatarMood] = useState<keyof typeof avatarMoods>('happy');
  const [progress, setProgress] = useState<any>(null);

  React.useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const data = await progressService.getProgress();
    setProgress(data);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl mb-1">Profile</h1>
        <p className="text-purple-100">Manage your account</p>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        {/* Avatar Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-5xl shadow-lg">
              {avatarMoods[avatarMood]}
            </div>
            <h3 className="text-xl mb-1">{user?.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{user?.email}</p>
            
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Avatar Mood</p>
              <div className="flex gap-2 justify-center flex-wrap">
                {(Object.keys(avatarMoods) as Array<keyof typeof avatarMoods>).map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setAvatarMood(mood)}
                    className={`px-4 py-2 rounded-2xl text-2xl ${
                      avatarMood === mood
                        ? 'bg-purple-100 dark:bg-purple-900/30 ring-2 ring-purple-500'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {avatarMoods[mood]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        {progress && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg mb-4">Your Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
                <div className="text-2xl text-purple-600 dark:text-purple-400">{progress.totalTasks}</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                <div className="text-2xl text-green-600 dark:text-green-400">{progress.completedTasks}</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Streak 🔥</div>
                <div className="text-2xl text-orange-600 dark:text-orange-400">{progress.streak} days</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Completion</div>
                <div className="text-2xl text-blue-600 dark:text-blue-400">{progress.completionRate}%</div>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg mb-2">Settings</h3>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <span>Dark Mode</span>
            </div>
            <button
              onClick={toggleTheme}
              className={`w-14 h-8 rounded-full transition-colors ${
                isDark ? 'bg-purple-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                  isDark ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <button className="flex items-center gap-3 py-3 w-full border-b border-gray-200 dark:border-gray-700">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </button>

          <button className="flex items-center gap-3 py-3 w-full border-b border-gray-200 dark:border-gray-700">
            <Shield className="w-5 h-5" />
            <span>Privacy</span>
          </button>

          <button className="flex items-center gap-3 py-3 w-full border-b border-gray-200 dark:border-gray-700">
            <Settings className="w-5 h-5" />
            <span>Preferences</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 py-3 w-full text-red-500 hover:text-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* App Info */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-3">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg mb-1">NeuroNexus</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Version 1.0.0</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Your ADHD-friendly productivity companion
          </p>
        </div>
      </div>
    </div>
  );
};
