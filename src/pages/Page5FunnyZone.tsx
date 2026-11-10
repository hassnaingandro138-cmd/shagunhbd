import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Laugh, Sparkles, MessageCircle, RefreshCw, Trophy, Flame, Shuffle } from 'lucide-react';
import { FUNNY_JOKES, JokeItem } from '../data/defaultContent.ts';
import { soundService } from '../utils/soundService.ts';

const CHAT_MESSAGES = [
  { sender: 'Shagun', text: 'Hey bestie I have a huge emergency 🚨🚨🚨', time: '11:42 PM' },
  { sender: 'You', text: 'OMG WHAT HAPPENED ARE YOU OKAY?! 😱', time: '11:42 PM' },
  { sender: 'Shagun', text: 'Should I buy the pink shoes or the baby pink ones? 🥺', time: '11:43 PM' },
  { sender: 'You', text: 'I literally thought you were kidnapped. Buy both obviously. 🙄💅', time: '11:44 PM' },
  { sender: 'Shagun', text: 'That’s why you’re my soul sister. Now lend me $20. 🏃‍♀️💨', time: '11:45 PM' },
];

const FUNNY_DARES = [
  'Dare: Record a 15-second voice note singing Happy Birthday in an opera voice!',
  'Dare: Send the most unflattering selfie on your phone right now!',
  'Dare: Name 3 reasons why Shagun is the most chaotic human you know in 5 seconds!',
  'Dare: Text Shagun "I know your biggest secret" and wait 10 seconds before replying "Happy Birthday"!',
  'Dare: Swear on your favorite pizza that you will always reply to voice notes within 24 hours!',
];

export const Page5FunnyZone: React.FC<{ name: string }> = ({ name }) => {
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [dramaticVotes, setDramaticVotes] = useState<{ me: number; shagun: number }>({
    me: 14,
    shagun: 86,
  });
  const [hasVotedDramatic, setHasVotedDramatic] = useState<string | null>(null);

  // Who misses whom slider
  const [missesPercentage, setMissesPercentage] = useState(100);

  // Dare generator
  const [currentDare, setCurrentDare] = useState(FUNNY_DARES[0]);

  // Mystery scratch card
  const [isRevealed, setIsRevealed] = useState(false);

  const getNextJoke = () => {
    soundService.playSparkle();
    setCurrentJokeIndex((prev) => (prev + 1) % FUNNY_JOKES.length);
  };

  const getRandomDare = () => {
    soundService.playSparkle();
    const next = FUNNY_DARES[Math.floor(Math.random() * FUNNY_DARES.length)];
    setCurrentDare(next);
  };

  const voteDramatic = (person: 'me' | 'shagun') => {
    soundService.playPop();
    setHasVotedDramatic(person);
    setDramaticVotes((prev) => ({
      me: person === 'me' ? prev.me + 5 : prev.me,
      shagun: person === 'shagun' ? prev.shagun + 12 : prev.shagun,
    }));
  };

  const activeJoke: JokeItem = FUNNY_JOKES[currentJokeIndex];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Laugh size={14} />
          <span>The Laughter & Crime HQ</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text">
          Partner-in-Crime & Joke Zone
        </h2>
        <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-xl mx-auto">
          Because what is true friendship without constant teasing, unhinged banter, and mutual
          blackmail material?
        </p>
      </div>

      {/* Grid of Fun Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Interactive Random Bestie Joke Generator */}
        <div className="rounded-3xl p-6 sm:p-7 bg-neutral-900/80 border border-pink-500/30 backdrop-blur-md shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1.5">
                <Flame size={12} className="text-rose-400" />
                {activeJoke.tag}
              </span>
              <span className="text-xs text-neutral-400">
                Joke {currentJokeIndex + 1} of {FUNNY_JOKES.length}
              </span>
            </div>

            <h3 className="font-serif font-bold text-lg sm:text-xl text-white mb-3">
              "{activeJoke.setup}"
            </h3>

            <div className="p-4 rounded-2xl bg-black/50 border border-pink-500/20 text-pink-100 text-sm sm:text-base font-medium whitespace-pre-line leading-relaxed mb-4">
              {activeJoke.punchline}
            </div>

            <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
              <span>{activeJoke.reaction}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
            <button
              onClick={getNextJoke}
              className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md hover:from-pink-400 hover:to-rose-400 flex items-center gap-2 cursor-pointer transition-all"
            >
              <RefreshCw size={14} className="animate-spin-slow" />
              <span>Click For Next Joke 🎲</span>
            </button>
          </div>
        </div>

        {/* WhatsApp Chat Simulator */}
        <div className="rounded-3xl p-6 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-pink-500/30 shadow-2xl flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center font-bold text-white shadow">
                S
              </div>
              <div>
                <div className="font-bold text-sm text-white">
                  {name} (Soul Sister)
                </div>
                <div className="text-[10px] text-pink-400">Soul Sister & Partner in Crime 💖</div>
              </div>
            </div>
            <MessageCircle size={18} className="text-pink-400" />
          </div>

          {/* Chat Bubble Area */}
          <div className="space-y-3 flex-1 overflow-y-auto max-h-64 pr-1">
            {CHAT_MESSAGES.map((msg, idx) => {
              const isShagun = msg.sender === 'Shagun';
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${isShagun ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs sm:text-sm shadow-md ${
                      isShagun
                        ? 'bg-neutral-800 text-neutral-100 rounded-tl-xs border border-neutral-700'
                        : 'bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-tr-xs shadow-pink-600/20'
                    }`}
                  >
                    <div className="text-[10px] opacity-70 mb-0.5 font-semibold">
                      {msg.sender === 'Shagun' ? name : 'You'}
                    </div>
                    <div>{msg.text}</div>
                  </div>
                  <span className="text-[9px] text-neutral-500 mt-0.5 px-1">{msg.time}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-2 text-center text-[11px] text-neutral-400 italic">
            "Actual leaked footage of our daily 2 AM brain cells communicating"
          </div>
        </div>
      </div>

      {/* Mini-Games Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Mini Game 1: Who Is More Dramatic? */}
        <div className="rounded-3xl p-6 bg-neutral-900/80 border border-pink-500/30 backdrop-blur-md shadow-xl text-center">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 mx-auto mb-3 flex items-center justify-center text-2xl">
            🎭
          </div>
          <h3 className="font-serif font-bold text-lg text-white mb-1">
            Mini Game: Who Is More Dramatic?
          </h3>
          <p className="text-xs text-neutral-300 mb-5">
            Cast your honest vote on who starts a world war over an unanswered text:
          </p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              onClick={() => voteDramatic('me')}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                hasVotedDramatic === 'me'
                  ? 'bg-pink-600 text-white border-pink-400 shadow-lg'
                  : 'bg-black/40 text-neutral-300 border-neutral-800 hover:border-pink-500/40'
              }`}
            >
              <div className="text-xl mb-1">🙋‍♀️</div>
              <div className="text-xs font-bold">Me (Mildly Dramatic)</div>
              <div className="text-[11px] text-pink-300/80 mt-1">{dramaticVotes.me}% Votes</div>
            </button>

            <button
              onClick={() => voteDramatic('shagun')}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                hasVotedDramatic === 'shagun'
                  ? 'bg-pink-600 text-white border-pink-400 shadow-lg'
                  : 'bg-black/40 text-neutral-300 border-neutral-800 hover:border-pink-500/40'
              }`}
            >
              <div className="text-xl mb-1">👑</div>
              <div className="text-xs font-bold">{name} (Drama Queen)</div>
              <div className="text-[11px] text-pink-300/80 mt-1">{dramaticVotes.shagun}% Votes</div>
            </button>
          </div>

          <AnimatePresence>
            {hasVotedDramatic && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-xl bg-pink-950/40 border border-pink-500/30 text-xs text-pink-200"
              >
                🏆 <strong>Final Jury Verdict:</strong> Shagun wins the Oscar for Most Dramatic Bestie
                Performance of the Century!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mini Game 2: Who Misses Whom More? */}
        <div className="rounded-3xl p-6 bg-neutral-900/80 border border-pink-500/30 backdrop-blur-md shadow-xl text-center">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 mx-auto mb-3 flex items-center justify-center text-2xl">
            🥺
          </div>
          <h3 className="font-serif font-bold text-lg text-white mb-1">
            Meter: Who Misses Whom More?
          </h3>
          <p className="text-xs text-neutral-300 mb-4">
            Slide the gauge to see the scientific measurement of longing:
          </p>

          <div className="px-4 py-3 bg-black/40 rounded-2xl border border-neutral-800 mb-4">
            <div className="flex justify-between text-xs text-pink-300 mb-2 font-semibold">
              <span>A Lot</span>
              <span>Infinity & Beyond ({missesPercentage}%)</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={missesPercentage}
              onChange={(e) => {
                soundService.playSparkle();
                setMissesPercentage(Number(e.target.value));
              }}
              className="w-full accent-pink-500 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-xl bg-gradient-to-r from-pink-900/40 to-purple-900/40 border border-pink-500/20 text-xs text-pink-200">
            💖 <strong>Scientific Conclusion:</strong> The scale actually broke because I miss
            you 10,000 times more than anyone could ever compute!
          </div>
        </div>
      </div>

      {/* Silly Friendship Dares Deck */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-pink-950/40 border border-pink-500/30 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
            <Trophy size={14} />
            <span>Bestie Birthday Challenge Card</span>
          </div>
          <h4 className="font-serif font-bold text-xl text-white mb-2">"{currentDare}"</h4>
          <p className="text-xs text-pink-200/80">
            Rules: You cannot refuse a birthday dare from your certified bestie!
          </p>
        </div>

        <button
          onClick={getRandomDare}
          className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-neutral-900 hover:bg-neutral-800 text-pink-300 border border-pink-500/40 shadow-lg flex items-center gap-2 cursor-pointer transition-all shrink-0"
        >
          <Shuffle size={14} />
          <span>Draw Another Dare 🃏</span>
        </button>
      </div>
    </div>
  );
};
