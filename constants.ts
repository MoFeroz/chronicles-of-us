import { CharacterItem, StoryNode } from './types';

// --- CONFIGURATION ---
// Replace these URLs with your Cloudinary/Mux links for the best performance
export const ASSETS = {
  // Placeholder images used. REPLACE THESE with your real content.
  catBiscuits: "https://picsum.photos/id/40/800/600", // Video placeholder
  catZoomies: "https://res.cloudinary.com/dbiodosax/video/upload/v1769937897/20251128_101936_hkdwa3.mp4", // Video placeholder
  dance: "https://res.cloudinary.com/dbiodosax/video/upload/v1769937944/20250609_201732_k8ongs.mp4",
  horseMilk: "https://res.cloudinary.com/dbiodosax/video/upload/v1769937792/VID-20250712-WA0009_gdnavs.mp4",
  toiletSeat: "https://res.cloudinary.com/dbiodosax/video/upload/v1769937919/20241105_150356_m2x8pv.mp4",
  hiking: "https://res.cloudinary.com/dbiodosax/video/upload/v1769937937/20250708_164248_mjxa7o.mp4",
  bowlingFail: "https://res.cloudinary.com/dbiodosax/video/upload/v1769937896/20240525_162548_mrwebj.mp4",
  dadBeach: "https://res.cloudinary.com/dbiodosax/image/upload/v1769937784/20250126_165751_swfiv5.jpg", // The sentimental photo
  proposalYes: "https://res.cloudinary.com/dbiodosax/video/upload/v1769937760/VID-20251115-WA0000_wvnntp.mp4", // Photobooth
  proposalNo: "https://res.cloudinary.com/dbiodosax/image/upload/v1769937773/20240214_205303_i7yhqt.jpg", // Handshake
};

// --- CHARACTER ITEMS ---
export const HEADGEAR_OPTIONS: CharacterItem[] = [
  { id: 'h1', name: 'Flower Crown', emoji: '🌸', description: '+5 Charisma' },
  { id: 'h2', name: 'Viking Helmet', emoji: '⚔️', description: '+5 Intimidation' },
  { id: 'h3', name: 'Royal Tiara', emoji: '👑', description: 'Queen Status' },
];

export const OUTFIT_OPTIONS: CharacterItem[] = [
  { id: 'o1', name: 'Cloak of Coziness', emoji: '🧥', description: 'Resist Cold' },
  { id: 'o2', name: 'Armor of Patience', emoji: '🛡️', description: 'Resist Nags' },
  { id: 'o3', name: 'Hiking Tunic', emoji: '🥾', description: '+5 Agility' },
];

export const ACCESSORY_OPTIONS: CharacterItem[] = [
  { id: 'a1', name: 'Infinite Coffee', emoji: '☕', description: 'Never Sleepy' },
  { id: 'a2', name: 'Phone of Scrolling', emoji: '📱', description: 'Summon Knowledge' },
  { id: 'a3', name: 'Bag of Snacks', emoji: '🥨', description: 'Heal 10HP' },
];

// --- STORY NODES ---
export const STORY_NODES: StoryNode[] = [
  {
    id: 1,
    title: "Phase 1: The Companion",
    text: "Brave Traveler, every great hero needs a sidekick. You look into the mist and see a familiar creature. How does it greet you?",
    options: [
      {
        id: 'opt1_a',
        label: "With the Rhythm of Bakers",
        type: 'HEROIC',
        failMessage: "You extend a hand for a gentle greeting, but the creature has too much energy! Peace is not an option today."
      },
      {
        id: 'opt1_b',
        label: "With the Speed of Suns",
        type: 'CHAOTIC',
        failMessage: "You brace for impact, expecting chaos, but the creature simply flops over and demands kneading time."
      }
    ],
    outcomes: {
      HEROIC: {
        text: "A peaceful omen. The journey begins with comfort and carbs.",
        media: ASSETS.catBiscuits,
        mediaType: 'image' // Change to video when ready
      },
      CHAOTIC: {
        text: "Chaos has entered the chat. Buckle up, it’s going to be a wild ride.",
        media: ASSETS.catZoomies,
        mediaType: 'image'
      }
    }
  },
  {
    id: 2,
    title: "Phase 2: The Ritual",
    text: "You reach a village celebrating a festival. To pass, you must participate in a local tradition. Which do you choose?",
    options: [
      {
        id: 'opt2_a',
        label: "Perform Sacred Dance",
        type: 'HEROIC',
        failMessage: "You attempt a pirouette but get dizzy and stumble into the refreshments table... specifically into a jug of..."
      },
      {
        id: 'opt2_b',
        label: "Drink Mysterious Elixir",
        type: 'CHAOTIC',
        failMessage: "You raise the cup to drink, but the locals intervene! 'No! That is for the horses!' They demand you dance instead."
      }
    ],
    outcomes: {
      HEROIC: {
        text: "The locals are impressed! Your moves are legendary (and slightly terrifying).",
        media: ASSETS.dance,
        mediaType: 'image'
      },
      CHAOTIC: {
        text: "A brave choice... but a regrettable one. Your face says it all. Let’s never speak of this again.",
        media: ASSETS.horseMilk,
        mediaType: 'image'
      }
    }
  },
  {
    id: 3,
    title: "Phase 3: The Fortress",
    text: "You are searching for a permanent base for your guild. But a true queen is picky about her throne. How do you test the castle's defenses?",
    options: [
      {
        id: 'opt3_a',
        label: "Test for Comfort",
        type: 'HEROIC',
        failMessage: "You sit regally, but the seat is loose! You start wiggling it to fix it, turning it into a full inspection."
      },
      {
        id: 'opt3_b',
        label: "Test for Durability",
        type: 'CHAOTIC',
        failMessage: "You try to break it, but it's too sturdy. You resort to a detailed analysis of its ergonomics."
      }
    ],
    outcomes: {
      HEROIC: {
        text: "A true visionary. You know that comfort is the foundation of any great empire.",
        media: ASSETS.toiletSeat,
        mediaType: 'image'
      },
      CHAOTIC: {
        text: "The Great Throne Inspection. Safety first! You ensure the fortress can withstand any biological attack.",
        media: ASSETS.toiletSeat, // Reusing asset as requested by logic flow
        mediaType: 'image'
      }
    }
  },
  {
    id: 4,
    title: "Phase 4: The Trial",
    text: "To reach the final destination, you must scale the Peak of Perseverance. The air is thin, and your legs are heavy...",
    options: [
      {
        id: 'opt4_a',
        label: "Keep Climbing",
        type: 'HEROIC',
        failMessage: "You push forward, but your foot slips! You slide down to the recreation center where a different challenge awaits."
      },
      {
        id: 'opt4_b',
        label: "Attempt Athletic Throw",
        type: 'CHAOTIC',
        failMessage: "You wind up for the throw, but inspiration strikes! You realize the view is better from the top and start climbing instead."
      }
    ],
    outcomes: {
      HEROIC: {
        text: "You’re making it look... well, you’re making it! Almost there!",
        media: ASSETS.hiking,
        mediaType: 'image'
      },
      CHAOTIC: {
        text: "You attempt an athletic feat... and throw a gutter ball. Gravity is a harsh mistress.",
        media: ASSETS.bowlingFail,
        mediaType: 'image'
      }
    }
  },
];
