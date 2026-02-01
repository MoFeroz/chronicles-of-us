import React, { useState } from 'react';
import { GamePhase, CharacterState, StoryNode } from './types';
import { STORY_NODES } from './constants';
import CharacterCreator from './components/CharacterCreator';
import GameNode from './components/GameNode';
import SanctuaryNode from './components/SanctuaryNode';
import FinalProposal from './components/FinalProposal';

const App: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.WELCOME);
  const [character, setCharacter] = useState<CharacterState | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const startAdventure = (charState: CharacterState) => {
    setCharacter(charState);
    setPhase(GamePhase.ADVENTURE);
  };

  const handleNextNode = () => {
    const nextIndex = currentStoryIndex + 1;
    
    if (nextIndex < STORY_NODES.length) {
      setCurrentStoryIndex(nextIndex);
    } else {
      // After all story nodes (0-3), go to Sanctuary (Dad Phase)
      setPhase(GamePhase.SANCTUARY);
    }
  };

  const handleSanctuaryComplete = () => {
    setPhase(GamePhase.FINAL_BOSS);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-amber-50 overflow-hidden relative max-w-lg mx-auto shadow-2xl border-x border-slate-800">
      
      {/* Top Bar (Inventory/Status) - Only show when playing */}
      {phase !== GamePhase.WELCOME && phase !== GamePhase.CHARACTER_CREATION && character && (
        <div className="fixed top-0 max-w-lg w-full z-40 bg-slate-900/90 backdrop-blur border-b border-slate-700 flex justify-between px-4 py-2 shadow-md">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-xs text-yellow-500">LVL 5</span>
            <span className="font-mono text-sm font-bold">{character.name}</span>
          </div>
          <div className="flex gap-2 text-lg">
            <span>{character.headgear?.emoji}</span>
            <span>{character.outfit?.emoji}</span>
            <span>{character.accessory?.emoji}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`h-screen pt-12 ${phase === GamePhase.WELCOME ? 'pt-0' : ''}`}>
        
        {/* Phase: WELCOME */}
        {phase === GamePhase.WELCOME && (
          <div className="flex flex-col items-center justify-center h-full p-6 space-y-8 animate-fade-in bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
            <h1 className="text-4xl font-pixel text-center text-yellow-400 leading-tight drop-shadow-lg">
              The Chronicles<br/>of Us
            </h1>
            <p className="font-story text-center text-slate-300 italic max-w-xs">
              A Valentine's Quest through the Realm of Memories.
            </p>
            <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center border-4 border-yellow-600 shadow-[0_0_50px_rgba(234,179,8,0.2)] animate-pulse">
               <span className="text-6xl">❤️</span>
            </div>
            <button
              onClick={() => setPhase(GamePhase.CHARACTER_CREATION)}
              className="px-8 py-4 bg-yellow-600 text-slate-900 font-pixel rounded hover:bg-yellow-500 transition-transform active:scale-95 shadow-xl"
            >
              NEW GAME
            </button>
          </div>
        )}

        {/* Phase: CHARACTER CREATION */}
        {phase === GamePhase.CHARACTER_CREATION && (
          <CharacterCreator onComplete={startAdventure} />
        )}

        {/* Phase: ADVENTURE (Dice Rolls) */}
        {phase === GamePhase.ADVENTURE && character && (
          <GameNode 
            key={currentStoryIndex} // Force re-render on node change
            node={STORY_NODES[currentStoryIndex]}
            character={character}
            onNext={handleNextNode}
          />
        )}

        {/* Phase: SANCTUARY (Dad Memory) */}
        {phase === GamePhase.SANCTUARY && (
          <SanctuaryNode onNext={handleSanctuaryComplete} />
        )}

        {/* Phase: FINAL BOSS (Proposal) */}
        {phase === GamePhase.FINAL_BOSS && character && (
          <FinalProposal character={character} wifeName="Babe" /> // Replace with wife's name or use char name
        )}
      </div>
    </div>
  );
};

export default App;
