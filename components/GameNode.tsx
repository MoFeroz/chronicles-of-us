import React, { useState } from 'react';
import { StoryNode, CharacterState, StoryOption, OutcomeType } from '../types';
import DiceRoller from './DiceRoller';

interface GameNodeProps {
  node: StoryNode;
  character: CharacterState;
  onNext: () => void;
}

const GameNode: React.FC<GameNodeProps> = ({ node, character, onNext }) => {
  const [step, setStep] = useState<'NARRATIVE' | 'ROLLING' | 'RESULT'>('NARRATIVE');
  const [selectedOption, setSelectedOption] = useState<StoryOption | null>(null);
  const [finalOutcomeType, setFinalOutcomeType] = useState<OutcomeType>('HEROIC');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOptionClick = (option: StoryOption) => {
    setSelectedOption(option);
    setStep('ROLLING');
  };

  const handleRollComplete = (rollValue: number) => {
    const success = rollValue > 10;
    setIsSuccess(success);

    if (success && selectedOption) {
      // Logic: Success means we get what we wanted
      setFinalOutcomeType(selectedOption.type);
    } else if (selectedOption) {
      // Logic: Failure forces the OTHER option
      const forcedType = selectedOption.type === 'HEROIC' ? 'CHAOTIC' : 'HEROIC';
      setFinalOutcomeType(forcedType);
    }
    setStep('RESULT');
  };

  const outcomeData = node.outcomes[finalOutcomeType];

  return (
    <div className="flex flex-col h-full min-h-0 animate-fade-in pb-3">
      {/* Header / Stats */}
      <div className="flex justify-between items-center bg-slate-800 p-2 text-xs font-mono border-b border-slate-700">
        <div className="text-yellow-500">{node.title}</div>
        <div className="text-slate-400">{character.name} HP: 100%</div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
        
        {/* Initial Narrative */}
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-600 shadow-lg">
          <p className="font-story text-base sm:text-lg leading-relaxed text-amber-50">
            {node.text}
          </p>
        </div>

        {/* Action Phase: Two Choices */}
        {step === 'NARRATIVE' && (
          <div className="mt-auto flex flex-col gap-3 sm:gap-4">
             <p className="text-center font-mono text-xs text-slate-400 mb-2">CHOOSE YOUR PATH (D20 ROLL)</p>
             {node.options.map((opt) => (
                <button 
                  key={opt.id}
                  onClick={() => handleOptionClick(opt)}
                  className={`w-full font-pixel py-3 sm:py-4 rounded-lg shadow-lg border-2 transition-transform active:scale-95 text-xs sm:text-sm leading-relaxed px-2 
                    ${opt.type === 'HEROIC' 
                      ? 'bg-indigo-600 hover:bg-indigo-500 border-indigo-400 text-white' 
                      : 'bg-rose-700 hover:bg-rose-600 border-rose-400 text-white'
                    }`}
                >
                  {opt.label.toUpperCase()}
                </button>
             ))}
          </div>
        )}

        {/* Dice Rolling Phase */}
        {step === 'ROLLING' && (
           <DiceRoller 
             onRollComplete={handleRollComplete} 
           />
        )}

        {/* Result Phase */}
        {step === 'RESULT' && outcomeData && (
          <div className="flex flex-col gap-4 animate-slide-up">
            
            {/* Fail Transition Text (If needed) */}
            {!isSuccess && selectedOption && (
              <div className="p-3 bg-red-900/30 border-l-4 border-red-500 text-red-100 italic text-xs sm:text-sm font-story">
                <span className="font-bold not-italic font-mono text-xs block mb-1">ROLL FAILED (CRITICAL FAIL)</span>
                "{selectedOption.failMessage}"
              </div>
            )}

            <div className={`p-4 rounded-lg border-2 ${isSuccess ? 'border-green-500/50 bg-green-900/20' : 'border-yellow-500/50 bg-yellow-900/20'}`}>
              <p className="font-story text-base sm:text-lg italic text-white">
                "{outcomeData.text}"
              </p>
            </div>

            {/* Media Display */}
            <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-slate-700 bg-black max-h-[32vh]">
              {outcomeData.mediaType === 'video' ? (
                <video 
                  src={outcomeData.media} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={outcomeData.media} 
                  alt="Outcome" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <button 
              onClick={onNext}
              className="w-full bg-yellow-600 hover:bg-yellow-500 text-slate-900 font-pixel py-3 sm:py-4 rounded-lg shadow-lg mt-3 sm:mt-4 text-sm sm:text-base"
            >
              CONTINUE JOURNEY
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameNode;
