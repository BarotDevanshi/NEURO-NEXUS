import React from 'react';
import { Brain } from 'lucide-react';
import { MoodTracker } from '../components/MoodTracker';
import { TaskDumpyard } from '../components/TaskDumpyard';
import { SleepTracker } from '../components/SleepTracker';
import { AIRecommendation } from '../components/AIRecommendation';
import { useAuth } from '../context/AuthContext';

export const HomeScreen: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl">Hello, {user?.name?.split(' ')[0] || 'Friend'}!</h1>
            <p className="text-purple-100 text-sm">Let's make today great 💙</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        <MoodTracker />
        <TaskDumpyard />
        <SleepTracker />
        <AIRecommendation />
      </div>
    </div>
  );
};
