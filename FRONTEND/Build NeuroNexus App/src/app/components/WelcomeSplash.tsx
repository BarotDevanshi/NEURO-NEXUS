import React, { useEffect, useState } from 'react';
import { Brain } from 'lucide-react';

export const WelcomeSplash: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center">
      <div className="text-center animate-pulse">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl mb-4 shadow-2xl">
          <Brain className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl text-white mb-2">NeuroNexus</h1>
        <p className="text-purple-100">Your wellness companion</p>
      </div>
    </div>
  );
};
