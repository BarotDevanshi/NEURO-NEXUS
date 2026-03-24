import React, { useState } from 'react';
import { Moon, Sun, Clock } from 'lucide-react';
import { sleepService } from '../services/api';
import { toast } from 'sonner';

export const SleepTracker: React.FC = () => {
  const [sleepTime, setSleepTime] = useState('10:00');
  const [sleepPeriod, setSleepPeriod] = useState<'AM' | 'PM'>('PM');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [wakePeriod, setWakePeriod] = useState<'AM' | 'PM'>('AM');
  const [quality, setQuality] = useState<'good' | 'average' | 'poor'>('good');

  // Convert 12-hour time to 24-hour format
  const convertTo24Hour = (time12: string, period: 'AM' | 'PM'): string => {
    const [hours, minutes] = time12.split(':').map(Number);
    let hours24 = hours;
    
    if (period === 'PM' && hours !== 12) {
      hours24 = hours + 12;
    } else if (period === 'AM' && hours === 12) {
      hours24 = 0;
    }
    
    return `${hours24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Convert 24-hour time to 12-hour format
  const convertTo12Hour = (time24: string): { time: string; period: 'AM' | 'PM' } => {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    let hours12 = hours % 12;
    hours12 = hours12 === 0 ? 12 : hours12;
    
    return {
      time: `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
      period
    };
  };

  const calculateDuration = () => {
    const sleep24 = convertTo24Hour(sleepTime, sleepPeriod);
    const wake24 = convertTo24Hour(wakeTime, wakePeriod);
    
    const sleep = new Date(`2000-01-01T${sleep24}`);
    let wake = new Date(`2000-01-01T${wake24}`);
    
    if (wake < sleep) {
      wake = new Date(`2000-01-02T${wake24}`);
    }
    
    const diff = wake.getTime() - sleep.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const handleSave = async () => {
    // Convert 12-hour times to 24-hour format for backend
    const sleepTime24 = convertTo24Hour(sleepTime, sleepPeriod);
    const wakeTime24 = convertTo24Hour(wakeTime, wakePeriod);
    
    // Create full date-time strings for backend
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    let sleepDateTime = `${today}T${sleepTime24}:00`;
    let wakeDateTime = `${today}T${wakeTime24}:00`;
    
    // If wake time is before sleep time, it means next day
    if (wakeTime24 < sleepTime24) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      wakeDateTime = `${tomorrowStr}T${wakeTime24}:00`;
    }

    const data = {
      sleepTime: sleepDateTime,
      wakeTime: wakeDateTime,
      quality,
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
            <div className="flex gap-2">
              <input
                type="time"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border-0"
              />
              <select
                value={sleepPeriod}
                onChange={(e) => setSleepPeriod(e.target.value as 'AM' | 'PM')}
                className="px-3 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border-0 min-w-[70px]"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
              Wake Time ☀️
            </label>
            <div className="flex gap-2">
              <input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border-0"
              />
              <select
                value={wakePeriod}
                onChange={(e) => setWakePeriod(e.target.value as 'AM' | 'PM')}
                className="px-3 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border-0 min-w-[70px]"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
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
