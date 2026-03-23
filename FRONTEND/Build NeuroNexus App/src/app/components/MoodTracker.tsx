import React, { useState } from 'react';
import { Smile, Meh, Frown, Sparkles } from 'lucide-react';
import { moodService } from '../services/api';
import { toast } from 'sonner';

const moods = [
  { id: 'happy', emoji: '😊', icon: Smile, label: 'Happy', color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400', feedback: 'You seem happy 😊' },
  { id: 'calm', emoji: '😌', icon: Meh, label: 'Calm', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', feedback: 'You seem calm 😌' },
  { id: 'stressed', emoji: '😰', icon: Frown, label: 'Stressed', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400', feedback: 'You seem stressed 😰' },
  { id: 'sad', emoji: '😢', icon: Frown, label: 'Sad', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400', feedback: 'You seem sad 😢' },
];

export const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  const handleMoodSelect = (mood: typeof moods[0]) => {
    setSelectedMood(mood.id);
    setFeedback(mood.feedback);
  };

  const handleSaveMood = async () => {
    if (!selectedMood) return;
    
    setIsSaving(true);
    try {
      await moodService.saveMood(selectedMood);
      toast.success('Mood saved! 💙');
    } catch (error) {
      toast.error('Failed to save mood');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-500" />
        <h3 className="text-lg">How are you feeling?</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodSelect(mood)}
            className={`p-4 rounded-2xl transition-all duration-200 ${
              selectedMood === mood.id
                ? mood.color + ' ring-2 ring-offset-2 ring-offset-background'
                : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            <div className="text-3xl mb-2">{mood.emoji}</div>
            <div className="text-sm">{mood.label}</div>
          </button>
        ))}
      </div>

      {feedback && (
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-4 mb-4">
          <p className="text-sm text-purple-900 dark:text-purple-200">{feedback}</p>
        </div>
      )}

      {selectedMood && (
        <button
          onClick={handleSaveMood}
          disabled={isSaving}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-2xl transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Mood'}
        </button>
      )}
    </div>
  );
};
