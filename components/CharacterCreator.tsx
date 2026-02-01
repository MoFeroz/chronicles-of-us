import React, { useState } from 'react';
import { HEADGEAR_OPTIONS, OUTFIT_OPTIONS, ACCESSORY_OPTIONS } from '../constants';
import { CharacterState, CharacterItem } from '../types';

interface CharacterCreatorProps {
  onComplete: (character: CharacterState) => void;
}

const CharacterCreator: React.FC<CharacterCreatorProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [headgear, setHeadgear] = useState<CharacterItem>(HEADGEAR_OPTIONS[0]);
  const [outfit, setOutfit] = useState<CharacterItem>(OUTFIT_OPTIONS[0]);
  const [accessory, setAccessory] = useState<CharacterItem>(ACCESSORY_OPTIONS[0]);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Every hero needs a name!");
      return;
    }
    onComplete({ name, headgear, outfit, accessory });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-4 space-y-6 animate-fade-in">
      <h2 className="text-2xl font-pixel text-yellow-400 text-center mb-4">Create Your Hero</h2>

      {/* Avatar Preview */}
      <div className="relative w-48 h-48 bg-slate-800 border-4 border-yellow-600 rounded-lg flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
        <div className="absolute inset-0 bg-slate-900 opacity-50 z-0"></div>
        {/* Simple Composition of Emojis to represent character */}
        <div className="z-10 flex flex-col items-center transform scale-150">
           <span className="text-4xl absolute -top-8 animate-bounce">{headgear.emoji}</span>
           <span className="text-6xl z-10">😐</span> {/* Base Face */}
           <span className="text-5xl -mt-4 z-0">{outfit.emoji}</span>
           <span className="text-4xl absolute bottom-0 right-0 rotate-12">{accessory.emoji}</span>
        </div>
      </div>

      {/* Name Input */}
      <div className="w-full">
        <label className="block text-xs font-mono text-slate-400 mb-1">HERO NAME</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name..."
          className="w-full bg-slate-800 border-2 border-slate-600 text-white p-3 font-pixel text-sm focus:border-yellow-500 outline-none rounded"
        />
      </div>

      {/* Selection Grids */}
      <div className="w-full space-y-4">
        <SelectionRow label="HEADGEAR" options={HEADGEAR_OPTIONS} selected={headgear} onSelect={setHeadgear} />
        <SelectionRow label="OUTFIT" options={OUTFIT_OPTIONS} selected={outfit} onSelect={setOutfit} />
        <SelectionRow label="INVENTORY" options={ACCESSORY_OPTIONS} selected={accessory} onSelect={setAccessory} />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full mt-8 bg-yellow-600 hover:bg-yellow-500 text-slate-900 font-pixel py-4 rounded shadow-lg transform transition active:scale-95"
      >
        START QUEST
      </button>
    </div>
  );
};

const SelectionRow = ({ label, options, selected, onSelect }: any) => (
  <div>
    <label className="block text-xs font-mono text-slate-400 mb-1">{label}</label>
    <div className="flex gap-2 justify-between">
      {options.map((opt: CharacterItem) => (
        <button
          key={opt.id}
          onClick={() => onSelect(opt)}
          className={`flex-1 p-2 border-2 rounded flex flex-col items-center justify-center transition-all ${
            selected.id === opt.id 
              ? 'border-yellow-400 bg-slate-700' 
              : 'border-slate-700 bg-slate-800 opacity-60 hover:opacity-100'
          }`}
        >
          <span className="text-2xl mb-1">{opt.emoji}</span>
          <span className="text-[0.6rem] font-mono text-center leading-tight">{opt.name}</span>
        </button>
      ))}
    </div>
    <div className="text-center text-xs text-yellow-200/60 mt-1 h-4 font-mono">
      {selected.description}
    </div>
  </div>
);

export default CharacterCreator;
