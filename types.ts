export enum GamePhase {
  WELCOME = 'WELCOME',
  CHARACTER_CREATION = 'CHARACTER_CREATION',
  ADVENTURE = 'ADVENTURE',
  SANCTUARY = 'SANCTUARY',
  FINAL_BOSS = 'FINAL_BOSS',
  ENDING_GOOD = 'ENDING_GOOD',
  ENDING_BAD = 'ENDING_BAD',
}

export enum ItemType {
  HEADGEAR = 'Headgear',
  OUTFIT = 'Outfit',
  ACCESSORY = 'Accessory',
}

export interface CharacterItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export interface CharacterState {
  name: string;
  headgear: CharacterItem | null;
  outfit: CharacterItem | null;
  accessory: CharacterItem | null;
}

export type OutcomeType = 'HEROIC' | 'CHAOTIC';

export interface StoryOption {
  id: string;
  label: string;
  type: OutcomeType;
  failMessage: string; // The text shown if the roll fails, bridging to the other outcome
}

export interface StoryOutcome {
  text: string;
  media: string;
  mediaType: 'image' | 'video';
}

export interface StoryNode {
  id: number;
  title: string;
  text: string;
  
  options: StoryOption[]; // Should contain exactly 2 options
  
  outcomes: {
    HEROIC: StoryOutcome;
    CHAOTIC: StoryOutcome;
  };
}
