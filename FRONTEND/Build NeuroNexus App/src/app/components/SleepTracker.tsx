import React, { useState } from 'react';
import { Moon, Sun, Clock } from 'lucide-react';
import { sleepService } from '../services/api';
import { toast } from 'sonner';

export const SleepTracker: React.FC = () => {
  const [sleepTime, setSleepTime] = useState('22:00');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [quality, setQuality] = useState<'good' | 'average' | 'poor'>('good');

  const calculateDuration = () => {
    const sleep = new Date(`2000-01-01T${sleepTime}`);
    let wake = new Date(`2000-01-01T${wakeTime}`);
    
    if (wake < sleep) {
      wake = new Date(`2000-01-02T${wakeTime}`);
    }
    
    const diff = wake.getTime() - sleep.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const handleSave = async () => {
    const data = {
      sleepTime,
      wakeTime,
      duration: calculateDuration(),
      quality,
      date: new Date().toISOString(),
    };

    await sleepService.saveSleep(data);
    toast.success('Sleep data saved! 💤');
  };

  const qualityColors = {
    good: 'bg-green-500',
    average: 'bg-yellow-500',
    poor: 'bg-red-500',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Moon className="w-5 h-5 text-indigo-500" />
        <h3 className="text-lg">Sleep Tracker</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
              Bedtime 🌙
            </label>
            <input
              type="time"
              value={sleepTime}
              onChange={(e) => setSleepTime(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border-0"
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
              Wake Time ☀️
            </label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border-0"
            />
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm">Sleep Duration</span>
            </div>
            <span className="font-medium text-indigo-600 dark:text-indigo-400">
              {calculateDuration()}
            </span>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
            Sleep Quality
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['good', 'average', 'poor'] as const).map((q) => (
              <button
                key={q}
                onClick={() => setQuality(q)}
                className={`py-2 rounded-2xl transition-all ${
                  quality === q
                    ? qualityColors[q] + ' text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {q.charAt(0).toUpperCase() + q.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-2xl transition-colors"
        >
          Save Sleep Data
        </button>
      </div>
    </div>
  );
};
