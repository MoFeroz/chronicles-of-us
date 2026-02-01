import React, { useState } from 'react';
import { ASSETS } from '../constants';
import { CharacterState } from '../types';

interface FinalProposalProps {
  character: CharacterState;
  wifeName?: string;
}

const FinalProposal: React.FC<FinalProposalProps> = ({ character, wifeName = "My Love" }) => {
  const [outcome, setOutcome] = useState<'PENDING' | 'YES' | 'NO'>('PENDING');

  const handleYes = () => {
    setOutcome('YES');
    triggerConfetti();
  };

  const triggerConfetti = () => {
    // Create simple DOM confetti
    const colors = ['#f43f5e', '#ec4899', '#d946ef', '#f59e0b', '#ffffff'];
    for (let i = 0; i < 50; i++) {
      const el = document.createElement('div');
      el.className = 'confetti';
      el.innerText = Math.random() > 0.5 ? '💖' : '🎉';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.animationDuration = (Math.random() * 2 + 2) + 's';
      el.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
      document.body.appendChild(el);
      // cleanup
      setTimeout(() => el.remove(), 5000);
    }
  };

  if (outcome === 'YES') {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-0 overflow-hidden p-4 sm:p-6 animate-fade-in bg-pink-900/30">
        <h1 className="text-2xl sm:text-3xl font-pixel text-pink-300 mb-4 sm:mb-6 text-center leading-normal">
          QUEST COMPLETE!
        </h1>
        <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-pink-500 mb-4 sm:mb-6 rotate-2 max-h-[32vh]">
          <img src={ASSETS.proposalYes} className="w-full h-full max-w-sm object-cover" alt="Us" />
        </div>
        <p className="font-story text-base sm:text-xl text-center mb-4 sm:mb-8">
          You've won the heart of the Bard. <br/>
          <span className="font-bold text-yellow-300">See you at dinner!</span>
        </p>
        <div className="p-4 bg-slate-800 rounded border border-slate-600 font-mono text-xs">
          <p>STATS FINALIZED:</p>
          <p className="text-green-400">Relationship Level: MAX</p>
          <p className="text-green-400">Happiness: ∞</p>
        </div>
      </div>
    );
  }

  if (outcome === 'NO') {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-0 overflow-hidden p-4 sm:p-6 animate-fade-in bg-slate-900">
        <h1 className="text-xl sm:text-2xl font-pixel text-red-500 mb-4 sm:mb-6 text-center">
          MISSION FAILED
        </h1>
        <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-slate-700 grayscale mb-4 sm:mb-6 max-h-[32vh]">
          <img src={ASSETS.proposalNo} className="w-full h-full max-w-sm object-cover" alt="Handshake" />
        </div>
        <div className="bg-slate-800 p-4 sm:p-6 rounded text-left border border-slate-700 font-mono text-xs sm:text-sm space-y-3 sm:space-y-4">
          <p className="uppercase text-red-400 font-bold">Status Update: PALENTINES</p>
          <p>You have been relegated to "Business Associate" status.</p>
          <p>Please submit your 1099 form by April 15th.</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-8 text-slate-500 underline text-xs"
        >
          Retry from checkpoint?
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden p-4 sm:p-6 justify-between py-6 sm:py-10">
      <div className="space-y-4 sm:space-y-6">
        <h2 className="font-pixel text-yellow-500 text-center text-lg sm:text-xl">THE FINAL BOSS</h2>
        <div className="bg-slate-800/80 p-4 sm:p-6 rounded-lg border-2 border-yellow-600/50 shadow-lg">
          <p className="font-story text-base sm:text-xl leading-relaxed">
            You have reached the end of the map. The treasure chest is before you. There is only one lock left to pick.
          </p>
          <p className="font-story text-lg sm:text-2xl font-bold mt-4 sm:mt-6 text-pink-300 text-center">
            {wifeName}, will you be my Valentine?
          </p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4 w-full">
        <button 
          onClick={handleYes}
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-pixel py-4 sm:py-6 rounded-xl shadow-lg transform transition active:scale-95 text-base sm:text-lg border-2 border-white/20"
        >
          YES! (Hero Ending)
        </button>
        
        <button 
          onClick={() => setOutcome('NO')}
          className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 font-pixel py-3 sm:py-4 rounded-xl shadow transform transition active:scale-95 text-[0.65rem] sm:text-xs"
        >
          No. (Dark Ending)
        </button>
      </div>
    </div>
  );
};

export default FinalProposal;
