import React, { useEffect, useState } from 'react';
import { ASSETS } from '../constants';

interface SanctuaryNodeProps {
  onNext: () => void;
}

const SanctuaryNode: React.FC<SanctuaryNodeProps> = ({ onNext }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Slow fade in for emotional effect
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="flex flex-col h-full transition-opacity duration-[2000ms] p-6 pb-20"
      style={{ opacity, background: 'linear-gradient(to bottom, #0f172a, #4a2c2c)' }}
    >
      <div className="flex-1 flex flex-col justify-center gap-8">
        <div className="text-center space-y-4">
          <h2 className="font-story text-3xl text-amber-200 italic">Phase 5: The Sanctuary</h2>
          <p className="font-story text-lg text-amber-50/90 leading-relaxed">
            You reach the Shore of Memories. The sun is warm, and for a moment, the quest feels quiet and still. You aren't alone here.
          </p>
        </div>

        <div className="rounded-xl overflow-hidden shadow-[0_0_30px_rgba(251,191,36,0.3)] border-4 border-amber-900/50 transform rotate-1 hover:rotate-0 transition-transform duration-700">
          <img 
            src={ASSETS.dadBeach} 
            alt="Shore of Memories" 
            className="w-full h-auto object-cover sepia-[0.3]"
          />
        </div>

        <p className="font-story text-xl text-center text-white font-medium italic">
          "The best parts of us are built by those who loved us first. Take a breath here. You are loved, then and now."
        </p>

        <button 
          onClick={onNext}
          className="mt-8 bg-amber-700/80 hover:bg-amber-600 text-white font-story text-lg py-3 px-8 rounded-full shadow-lg border border-amber-400/30 mx-auto transition-all hover:scale-105"
        >
          Continue to the Final Gate
        </button>
      </div>
    </div>
  );
};

export default SanctuaryNode;
