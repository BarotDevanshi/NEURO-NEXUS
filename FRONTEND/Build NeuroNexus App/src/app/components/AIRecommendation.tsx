import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { aiService } from '../services/api';

export const AIRecommendation: React.FC = () => {
  const [recommendation, setRecommendation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRecommendation();
  }, []);

  const loadRecommendation = async () => {
    setLoading(true);
    const data = await aiService.getRecommendation();
    setRecommendation(data);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 shadow-lg text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <h3 className="text-lg">AI Suggestion</h3>
        </div>
        <button
          onClick={loadRecommendation}
          disabled={loading}
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {recommendation && (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <p className="text-sm leading-relaxed">{recommendation.text}</p>
        </div>
      )}
    </div>
  );
};
