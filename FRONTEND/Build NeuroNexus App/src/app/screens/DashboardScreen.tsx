import React, { useEffect, useState } from 'react';
import { TrendingUp, Target, Flame, Zap, Moon, Smile } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { progressService, moodService, sleepService } from '../services/api';

export const DashboardScreen: React.FC = () => {
  const [progress, setProgress] = useState<any>(null);
  const [moodData, setMoodData] = useState<any[]>([]);
  const [sleepData, setSleepData] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const progressData = await progressService.getProgress();
    setProgress(progressData);

    // Mock mood trend data
    setMoodData([
      { day: 'Mon', mood: 4 },
      { day: 'Tue', mood: 3 },
      { day: 'Wed', mood: 5 },
      { day: 'Thu', mood: 4 },
      { day: 'Fri', mood: 5 },
      { day: 'Sat', mood: 4 },
      { day: 'Sun', mood: 5 },
    ]);

    // Mock sleep data
    setSleepData([
      { day: 'Mon', hours: 7 },
      { day: 'Tue', hours: 6.5 },
      { day: 'Wed', hours: 8 },
      { day: 'Thu', hours: 7.5 },
      { day: 'Fri', hours: 6 },
      { day: 'Sat', hours: 8.5 },
      { day: 'Sun', hours: 7 },
    ]);
  };

  const taskCompletionData = progress ? [
    { name: 'Completed', value: progress.completedTasks, color: '#10b981' },
    { name: 'Pending', value: progress.pendingTasks, color: '#f59e0b' },
  ] : [];

  return (
    <div className="p-4 pb-24 space-y-4 max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-3xl p-6 shadow-lg">
        <h1 className="text-2xl mb-1">Your Dashboard</h1>
        <p className="text-purple-100">Track your progress & insights</p>
      </div>

      {progress && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Completion</span>
              </div>
              <div className="text-2xl">{progress.completionRate}%</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Streak</span>
              </div>
              <div className="text-2xl">{progress.streak} days 🔥</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Dopamine</span>
              </div>
              <div className="text-2xl">{progress.dopamineLevel}%</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Tasks Done</span>
              </div>
              <div className="text-2xl">{progress.completedTasks}/{progress.totalTasks}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Smile className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg">Mood Trend</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#a855f7" 
                  strokeWidth={3}
                  dot={{ fill: '#a855f7', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Moon className="w-5 h-5 text-indigo-500" />
              <h3 className="text-lg">Sleep Pattern</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Bar dataKey="hours" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg mb-4">Task Distribution</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={taskCompletionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskCompletionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Completed ({progress.completedTasks})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Pending ({progress.pendingTasks})</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
