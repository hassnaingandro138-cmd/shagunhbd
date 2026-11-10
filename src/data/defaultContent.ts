export interface ParagraphItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  theme: 'pink' | 'purple' | 'gold' | 'rose' | 'black';
  content: string;
  quote: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  caption: string;
  type: 'photo' | 'video';
  dataUrl?: string; // Loaded from IndexedDB or placeholder SVG
  isPlaceholder?: boolean;
  isFavorite: boolean;
  category: 'trip' | 'silly' | 'celebration' | 'milestone';
}

export interface ScrapbookCard {
  id: string;
  category: 'reason' | 'reminds_me' | 'favorite_thing' | 'story';
  title: string;
  content: string;
  sticker: string;
  date?: string;
  color: string;
}

export interface JokeItem {
  id: string;
  setup: string;
  punchline: string;
  reaction: string;
  tag: string;
}

export interface PoemItem {
  id: string;
  title: string;
  category: 'friendship' | 'birthday' | 'missing' | 'shayari';
  lines: string[];
  meaning?: string;
  isFavorite: boolean;
}

export interface PrayerItem {
  id: string;
  title: string;
  blessing: string;
  icon: string;
  tag: string;
}

export interface SongItem {
  id: string;
  title: string;
  artist: string;
  duration: string;
  note: string;
}

export const INITIAL_CONFIG = {
  name: 'Shagun',
  nickname: 'My Partner in Crime & Soul Sister',
  birthdayDate: '2026-11-26', // Next 26 November
  displayDate: '26 November',
  senderName: 'Your Forever Bestie',
};

export const SEVEN_PARAGRAPHS: ParagraphItem[] = [
  {
    id: 'p1',
    title: 'A Grand Birthday Wish For You',
    subtitle: 'Happiness, Health & Infinite Joy',
    icon: '🎂',
    theme: 'pink',
    content: `Happy Birthday to the most irreplaceable person in my entire world, my dearest Shagun! On this magical 26th of November, my heart overflows with sheer gratitude for the day you were born. May this year shower you with endless laughter, unapologetic confidence, glowing health, and the kind of dreams that make your eyes sparkle. You deserve every ounce of magic the universe has to offer, and I hope this birthday is just the beginning of your sweetest chapter yet!`,
    quote: `"May your smiles be as wide as your dreams, and your joy as boundless as the sky."`,
  },
  {
    id: 'p2',
    title: 'Your Radiant Soul & Beautiful Qualities',
    subtitle: 'Kindness, Grace & A Million-Dollar Smile',
    icon: '✨',
    theme: 'gold',
    content: `There is something truly captivating about the warmth you carry into every room, Shagun. Your smile has this rare superpower to dissolve someone's worst day into pure comfort. You are intensely loyal, fiercely strong, ridiculously kind-hearted, and thoughtful in ways people often fail to notice. Watching you navigate life with your golden heart inspires me constantly. You never pretend; you are unapologetically, beautifully you.`,
    quote: `"You don't just light up rooms; you ignite warmth in everyone fortunate enough to know you."`,
  },
  {
    id: 'p3',
    title: 'How Deeply I Miss You',
    subtitle: 'Distance Is Just A Number, But My Heart Aches',
    icon: '🥺',
    theme: 'rose',
    content: `I'm not going to sugarcoat it—I miss you so much that words sometimes feel so tiny and inadequate. I miss our spontaneous giggles over nothing, our marathon voice notes where we dissect the universe, the casual hugs, and just sitting together doing absolutely nothing while feeling completely at peace. Even when days pass with busy routines, there is this permanent cozy corner in my mind reserved exclusively for you. Distance hasn't dimmed our bond even 1%, but God, I wish I could give you a bear hug right now!`,
    quote: `"Physical distance means nothing when someone has permanently taken residence in your heart."`,
  },
  {
    id: 'p4',
    title: 'Our Sacred & Unbreakable Friendship',
    subtitle: 'My Secret Keeper & Partner in Crime',
    icon: '🔐',
    theme: 'purple',
    content: `Having you as my best friend feels like winning the ultimate cosmic jackpot. You know my secrets before I even speak them out loud; you can decode my mood from a single emoji or punctuation mark. We have built a sanctuary of zero judgment, where vulnerability is celebrated and nonsense is fully respected. You are the one person I can confess my wildest chaos to, knowing you will either join in or hold my hand through it. Here's to us—unshakable, undefeated, and always in sync.`,
    quote: `"Friendship isn't about whom you have known the longest; it's about who came and never left your side."`,
  },
  {
    id: 'p5',
    title: 'My Deepest Prayers & Blessings',
    subtitle: 'Divine Protection & Unstoppable Abundance',
    icon: '🕊️',
    theme: 'gold',
    content: `My sweetest prayer today and every single day is for your peace of mind and protection. May any burden on your shoulders feel feather-light. May every door of opportunity fling open wide for you. May your hard work bear the sweetest fruits, and may you be sheltered from negative vibes and sorrow. I pray that you are surrounded by people who honor your delicate heart just as much as you deserve. You are protected, cherished, and blessed beyond measure.`,
    quote: `"May divine grace walk ahead of you, clarity walk beside you, and eternal love guide your footsteps."`,
  },
  {
    id: 'p6',
    title: 'Our Chaotic & Hilarious Moments',
    subtitle: 'The Madness We Call Our Normal',
    icon: '🤪',
    theme: 'pink',
    content: `Let's be completely honest: if anyone ever read our WhatsApp chats without context, we would probably be sent straight to a comedy mental asylum! From our dramatic 2 AM life crises that ended in memes, to our fiercely debated silly theories, you are my certified partner in crime. Thank you for never judging my terrible jokes, for being just as dramatic as me, and for always being ready to fight imaginary enemies on my behalf. Life with you is a 24/7 blockbuster comedy show!`,
    quote: `"Best friends don't let you do crazy things alone. They grab snacks and lead the parade."`,
  },
  {
    id: 'p7',
    title: 'My Eternal Promise To You',
    subtitle: 'Through Every High, Low & Wrinkle',
    icon: '♾️',
    theme: 'rose',
    content: `Here is my sacred bestie vow on your special day: I promise to be your loudest cheerleader in your victories, your quiet anchor when storms roll in, and your human shield whenever the world gets heavy. I promise to keep listening to your twenty-minute voice memos with full attention, to celebrate every milestone, and to remind you of how spectacular you are whenever you forget. Even when we are old, wrinkly, and drinking tea in rocking chairs, you will still be my favorite human.`,
    quote: `"Forever isn't just a duration for us; it's our promise. Happy Birthday, my Shagun!"`,
  },
];

export const INITIAL_SCRAPBOOK: ScrapbookCard[] = [
  {
    id: 's1',
    category: 'reason',
    title: 'Why You Are So Irreplaceable',
    content: 'Because you remember the smallest things I say, you never judge my flaws, and you make me feel like the most confident version of myself just by believing in me.',
    sticker: '💎',
    color: 'from-pink-500/20 to-purple-500/20',
  },
  {
    id: 's2',
    category: 'reminds_me',
    title: 'Things That Instantly Remind Me Of You',
    content: 'Pretty pink sunsets, sweet iced coffee, dramatic Bollywood songs, hilarious reel captions, and cute handwritten sticky notes.',
    sticker: '🌸',
    color: 'from-rose-500/20 to-amber-500/20',
  },
  {
    id: 's3',
    category: 'favorite_thing',
    title: 'My Absolute Favourite Thing About Us',
    content: 'That we can go from serious philosophical talks about life & dreams straight into hysterical laughter over an inside joke within 3 seconds flat.',
    sticker: '⚡',
    color: 'from-fuchsia-500/20 to-pink-500/20',
  },
  {
    id: 's4',
    category: 'story',
    title: 'The Time We Laughed Until Our Stomachs Ached',
    content: 'Remember that day when we couldn’t stop giggling in public and people looked at us like we were totally crazy? That was the exact moment I knew our friendship was sealed for eternity.',
    sticker: '😂',
    date: 'A Golden Memory',
    color: 'from-purple-500/20 to-indigo-500/20',
  },
  {
    id: 's5',
    category: 'reason',
    title: 'Your Contagious Warmth',
    content: 'You have this effortless charm that makes any heavy situation feel manageable. Your voice alone is like an emotional safety blanket.',
    sticker: '🧸',
    color: 'from-pink-500/20 to-rose-500/20',
  },
  {
    id: 's6',
    category: 'reminds_me',
    title: 'The Midnight Gossip Sessions',
    content: 'Looking at late night hours on the clock always brings back our marathon talks where we solved every single mystery of the universe.',
    sticker: '🌙',
    color: 'from-violet-500/20 to-pink-500/20',
  },
];

export const FUNNY_JOKES: JokeItem[] = [
  {
    id: 'j1',
    setup: 'Who authorized Shagun to look so pretty on her birthday...',
    punchline: '...while still possessing the chaos energy of five toddlers after three energy drinks?!',
    reaction: '💅 High Glamour, High Chaos',
    tag: 'Bestie Roast',
  },
  {
    id: 'j2',
    setup: 'Scientists discovered that true friendship requires three things:',
    punchline: '1. Shared enemies\n2. Knowing each other’s unflattering angles\n3. Agreeing that Shagun is always right (even when she definitely is not)!',
    reaction: '😂 Facts Only',
    tag: 'Truth Bomb',
  },
  {
    id: 'j3',
    setup: 'Shagun says she has nothing to wear...',
    punchline: '...yet her closet has enough fabrics to clothe a small European village for three winters!',
    reaction: '👗 Closet Overload',
    tag: 'Classic Shagun',
  },
  {
    id: 'j4',
    setup: 'Our Friendship in a nutshell:',
    punchline: 'Me: "I have a bad idea."\nShagun: "Wait for me, I am putting my shoes on!"',
    reaction: '🚨 Crime Partners',
    tag: 'Ride or Die',
  },
  {
    id: 'j5',
    setup: 'Why do we need GPS when navigating life?',
    punchline: 'Because both of us together have an internal sense of direction equivalent to a confused penguin in the Sahara desert!',
    reaction: '🗺️ Lost Together',
    tag: 'Adventure',
  },
  {
    id: 'j6',
    setup: 'Happy Birthday to my favorite therapist...',
    punchline: '...who doesn’t charge $150/hour, but accepts payment exclusively in snacks, gossip, and endless attention!',
    reaction: '🍕 Fair Trade',
    tag: 'Free Therapy',
  },
];

export const POEMS_AND_SHAYARI: PoemItem[] = [
  {
    id: 'pm1',
    title: 'A Constellation Named Shagun',
    category: 'friendship',
    lines: [
      'In a world of fleeting faces and whispered goodbyes,',
      'You are the steady North Star in my wandering skies.',
      'Through stormy nights and sunny afternoons so bright,',
      'Your friendship is my gentle haven and purest light.',
    ],
    meaning: 'A reminder that true friends remain anchor points no matter how stormy life gets.',
    isFavorite: false,
  },
  {
    id: 'pm2',
    title: 'Tere Jaisi Yaari (Birthday Shayari)',
    category: 'shayari',
    lines: [
      'Har phool muskuraaye teri raahon mein aaj,',
      'Khuda sajaye tere sir par khushiyon ka taaj.',
      'Tere jaisi pyaari bestie naseeb walon ko milti hai,',
      'Tujhe dekh kar meri har udaasi pighalti hai!',
    ],
    meaning: 'May every flower smile in your path today; a bestie as lovely as you is a blessing granted only by pure fortune.',
    isFavorite: true,
  },
  {
    id: 'pm3',
    title: 'The Miles Between Us',
    category: 'missing',
    lines: [
      'I look across the quiet screen and feel you close at hand,',
      'Though miles stretch wide between us across this waking land.',
      'For distance cannot steal the warmth that sisterhood has spun,',
      'You’ll always be my favourite, my irreplaceable Shagun.',
    ],
    meaning: 'Physical distance fails completely when souls are knit together by loyalty and affection.',
    isFavorite: false,
  },
  {
    id: 'pm4',
    title: 'Roshni Ka Safar',
    category: 'shayari',
    lines: [
      'Chaand sitaaron se saji rahe teri har ek shaam,',
      'Tere honton pe sada rahe meethi si muskaan.',
      'Janmadin par duaa hai rab se ye dil se meri,',
      'Duniya ki saari daulat se unchi ho udaan teri!',
    ],
    meaning: 'May your evenings be studded with moon and stars, and may your flight reach heights higher than worldly treasures.',
    isFavorite: true,
  },
  {
    id: 'pm5',
    title: 'Partners In Every Story',
    category: 'friendship',
    lines: [
      'We write our story chapter by chapter, messy and bold,',
      'More precious than diamonds, more rare than purest gold.',
      'A bond forged in laughter, tested by time,',
      'Shagun, you will forever remain my partner in crime.',
    ],
    meaning: 'Celebrating our timeless and unbreakable bond.',
    isFavorite: false,
  },
];

export const PRAYERS_LIST: PrayerItem[] = [
  {
    id: 'pr1',
    title: 'Unending Joy & Serenity',
    blessing: 'May your heart always be untroubled, resting in calm assurance and buoyant happiness even on cloudy days.',
    icon: '✨',
    tag: 'Peace',
  },
  {
    id: 'pr2',
    title: 'Radiant Health & Vitality',
    blessing: 'May every breath bring strength, energy, vitality, and restful sleep. May your glow never diminish.',
    icon: '🌿',
    tag: 'Health',
  },
  {
    id: 'pr3',
    title: 'Sky-High Success & Career Triumph',
    blessing: 'May every exam, interview, project, and creative endeavor you touch turn into triumphant victory and recognition.',
    icon: '🏆',
    tag: 'Success',
  },
  {
    id: 'pr4',
    title: 'Shield from Evil Eye & Heavy Hearts',
    blessing: 'May a celestial canopy of safety protect you from envy, bad vibes, sadness, and fake companions forever.',
    icon: '🧿',
    tag: 'Protection',
  },
  {
    id: 'pr5',
    title: 'Fulfilment of Secret Desires',
    blessing: 'May the silent wishes you whisper into your pillow late at night be heard and manifested into miraculous reality.',
    icon: '💫',
    tag: 'Dreams',
  },
  {
    id: 'pr6',
    title: 'Everlasting Friendship & Love',
    blessing: 'May our bond grow stronger with each passing year, weathering all seasons and keeping our laughter forever young.',
    icon: '💖',
    tag: 'Love',
  },
];

export const DEFAULT_LETTER = `To My Dearest Shagun, My Forever Bestie 💗,

As I sit down to write this, my mind floods with a million memories—every laugh that made our ribs hurt, every late-night confession, every time you held space for me without asking for an explanation, and every single moment you made me feel understood in a world that often rushes past.

Happy, Happy Birthday! 🎂

I want you to pause for just a moment and realize how truly special you are. You carry a quiet resilience that marvels me. You possess a smile that can illuminate the darkest room. And above all, you have a loyalty that is so rare it feels sacred.

I miss you. Truly, I miss you more than my pride usually lets me say out loud. I miss our spontaneous shenanigans, our impromptu debriefs, the comfortable silences, and the unfiltered silliness. But the greatest comfort I have is knowing that no matter how many miles lie between us, or how busy our schedules get, nothing can ever erode the foundation we built.

On this 26th of November, I pray that the universe opens its floodgates of blessings upon you. I pray that every goal you set turns to gold. I pray that you never, ever doubt your brilliance. And whenever life feels overwhelming, remember that you have me in your corner—forever cheering, forever ready to listen, and forever armed with love for you.

Thank you for being my anchor, my clown, my secret keeper, and my soul sister.

Happy Birthday, my precious Shagun! Let's conquer the world together.

Forever & Always,
With all my heart,
Your Partner in Crime 💖`;

export const INITIAL_PLAYLIST: SongItem[] = [
  {
    id: 's1',
    title: 'Count on Me',
    artist: 'Bruno Mars',
    duration: '3:17',
    note: 'Our ultimate friendship anthem for whenever either of us needs a reminder!',
  },
  {
    id: 's2',
    title: 'Tera Yaar Hoon Main',
    artist: 'Arijit Singh / Rochak Kohli',
    duration: '4:24',
    note: 'Pure emotion—no matter where life takes us, we are ride or die.',
  },
  {
    id: 's3',
    title: 'Best Friend',
    artist: 'Saweetie ft. Doja Cat',
    duration: '2:35',
    note: 'When we are hyping each other up and feeling unstoppable!',
  },
  {
    id: 's4',
    title: 'You’ve Got a Friend in Me',
    artist: 'Randy Newman',
    duration: '2:04',
    note: 'Classic nostalgic warmth that never goes out of style.',
  },
  {
    id: 's5',
    title: 'Sweet Birthday Lofi Vibes',
    artist: 'Acoustic Dreams',
    duration: '3:45',
    note: 'Cozy background melody for reminiscing our golden moments.',
  },
];
