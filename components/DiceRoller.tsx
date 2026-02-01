import React, { useState, useEffect } from 'react';

interface DiceRollerProps {
  onRollComplete: (val: number) => void;
  autoSuccess?: boolean;
}

const DiceRoller: React.FC<DiceRollerProps> = ({ onRollComplete, autoSuccess }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [displayValue, setDisplayValue] = useState(20);
  const [hasRolled, setHasRolled] = useState(false);

  const handleRoll = () => {
    if (isRolling || hasRolled) return;

    setIsRolling(true);
    
    // Animate numbers randomly
    const interval = setInterval(() => {
      setDisplayValue(Math.floor(Math.random() * 20) + 1);
    }, 50);

    // Stop after 1.5 seconds
    setTimeout(() => {
      clearInterval(interval);
      setIsRolling(false);
      setHasRolled(true);

      // Determine result
      let finalValue: number;
      if (autoSuccess) {
        finalValue = 20; // Critical Success for auto-win nodes
      } else {
         // 50/50 chance roughly, slightly weighted to success for fun
        finalValue = Math.floor(Math.random() * 20) + 1;
      }
      
      setDisplayValue(finalValue);
      
      // Delay callback slightly to let user see the number
      setTimeout(() => {
        onRollComplete(finalValue);
      }, 800);
      
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div 
        onClick={handleRoll}
        className={`w-24 h-24 relative flex items-center justify-center cursor-pointer transition-transform ${isRolling ? 'rolling' : ''}`}
      >
        {/* Dice Shape (Hexagon roughly via SVG) */}
        <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-xl ${hasRolled ? (displayValue > 10 ? 'text-green-600' : 'text-red-600') : 'text-indigo-600'}`}>
          <path 
            d="M50 5 L95 27.5 L95 72.5 L50 95 L5 72.5 L5 27.5 Z" 
            fill="currentColor" 
            stroke="white" 
            strokeWidth="2"
          />
        </svg>
        
        {/* Number */}
        <span className={`absolute text-3xl font-bold font-mono text-white ${hasRolled && 'scale-125 transition-transform'}`}>
          {displayValue}
        </span>
      </div>
      
      {!hasRolled && !isRolling && (
        <p className="mt-4 text-sm font-mono animate-pulse text-yellow-300">
          TAP DIE TO ROLL
        </p>
      )}
      
      {isRolling && (
        <p className="mt-4 text-sm font-mono text-slate-400">
          ROLLING FOR FATE...
        </p>
      )}
      
      {hasRolled && (
        <p className={`mt-4 text-lg font-pixel ${displayValue > 10 ? 'text-green-400' : 'text-red-400'}`}>
          {displayValue > 10 ? 'SUCCESS!' : 'CHAOS!'}
        </p>
      )}
    </div>
  );
};

export default DiceRoller;
