import React, { useState } from 'react';
import { Gamepad2, Circle, Square, Triangle, RefreshCw } from 'lucide-react';

export const GamesScreen: React.FC = () => {
  const [breathCount, setBreathCount] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [memoryCards, setMemoryCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [focusScore, setFocusScore] = useState(0);

  // Breathing Exercise
  const startBreathing = () => {
    setIsBreathing(true);
    const interval = setInterval(() => {
      setBreathCount(prev => {
        if (prev >= 5) {
          clearInterval(interval);
          setIsBreathing(false);
          return 0;
        }
        return prev + 1;
      });
    }, 4000);
  };

  // Memory Match Game
  const initMemoryGame = () => {
    const cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
    const shuffled = cards.sort(() => Math.random() - 0.5);
    setMemoryCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
  };

  const flipCard = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memoryCards[first] === memoryCards[second]) {
        setMatchedCards([...matchedCards, first, second]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  // Focus Clicker
  const handleFocusClick = () => {
    setClickCount(prev => prev + 1);
    setFocusScore(prev => prev + Math.floor(Math.random() * 10 + 1));
  };

  const resetFocusGame = () => {
    setClickCount(0);
    setFocusScore(0);
  };

  const cardEmojis = ['🌟', '🌈', '🦋', '🌸', '🍀', '💫'];

  return (
    <div className="p-4 pb-24 space-y-4 max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <Gamepad2 className="w-8 h-8" />
          <div>
            <h1 className="text-2xl">Mind Games</h1>
            <p className="text-purple-100 text-sm">Relax & focus activities</p>
          </div>
        </div>
      </div>

      {/* Breathing Exercise */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg mb-4">Breathing Exercise 🧘‍♀️</h3>
        <div className="text-center">
          <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center transition-all duration-4000 ${
            isBreathing ? 'scale-125' : 'scale-100'
          }`}>
            <span className="text-white text-2xl">{breathCount}/5</span>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {isBreathing ? 'Breathe in... and out...' : 'Take 5 deep breaths to calm your mind'}
          </p>
          {!isBreathing && (
            <button
              onClick={startBreathing}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl"
            >
              Start Breathing
            </button>
          )}
        </div>
      </div>

      {/* Memory Match Game */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg">Memory Match 🎯</h3>
          <button
            onClick={initMemoryGame}
            className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/50"
          >
            <RefreshCw className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </button>
        </div>
        
        {memoryCards.length === 0 ? (
          <div className="text-center py-8">
            <button
              onClick={initMemoryGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-2xl"
            >
              Start Game
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {memoryCards.map((card, index) => (
              <button
                key={index}
                onClick={() => flipCard(index)}
                className={`aspect-square rounded-2xl text-3xl flex items-center justify-center transition-all ${
                  flippedCards.includes(index) || matchedCards.includes(index)
                    ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {flippedCards.includes(index) || matchedCards.includes(index) ? cardEmojis[card - 1] : '?'}
              </button>
            ))}
          </div>
        )}
        
        {matchedCards.length === memoryCards.length && memoryCards.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-green-600 dark:text-green-400">🎉 Great job! You matched them all!</p>
          </div>
        )}
      </div>

      {/* Focus Clicker */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg">Focus Clicker ⚡</h3>
          <button
            onClick={resetFocusGame}
            className="text-sm text-purple-500 hover:text-purple-600"
          >
            Reset
          </button>
        </div>
        
        <div className="text-center space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">Clicks</div>
              <div className="text-2xl text-purple-600 dark:text-purple-400">{clickCount}</div>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-2xl p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
              <div className="text-2xl text-pink-600 dark:text-pink-400">{focusScore}</div>
            </div>
          </div>
          
          <button
            onClick={handleFocusClick}
            className="w-full h-32 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-3xl text-3xl shadow-lg active:scale-95 transition-transform"
          >
            Click Me! 🎯
          </button>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tap rapidly to improve focus and hand-eye coordination
          </p>
        </div>
      </div>

      {/* Calm Color Patterns */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg mb-4">Calm Patterns 🌈</h3>
        <div className="grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => {
            const colors = [
              'bg-purple-300',
              'bg-pink-300',
              'bg-blue-300',
              'bg-green-300',
              'bg-yellow-300',
              'bg-indigo-300'
            ];
            return (
              <div
                key={i}
                className={`aspect-square rounded-2xl ${colors[i % colors.length]} animate-pulse`}
                style={{ animationDelay: `${i * 100}ms` }}
              />
            );
          })}
        </div>
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Watch the gentle patterns to calm your mind
        </p>
      </div>
    </div>
  );
};
