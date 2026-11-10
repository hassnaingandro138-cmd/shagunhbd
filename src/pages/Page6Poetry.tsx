import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Feather, Heart, Copy, Check, Sparkles, Shuffle } from 'lucide-react';
import { POEMS_AND_SHAYARI, PoemItem } from '../data/defaultContent.ts';
import { soundService } from '../utils/soundService.ts';

const COMPLIMENTS = [
  'Shagun, your laugh is literally the sweetest sound in the world.',
  'You make everyone feel seen, heard, and important.',
  'Your resilience in tough times is nothing short of heroic.',
  'You have that rare, genuine golden glow that no makeup can create.',
  'Being your friend makes me feel like the luckiest human alive.',
  'You give the warmest, most reassuring hugs in the entire universe.',
];

export const Page6Poetry: React.FC<{ name: string }> = ({ name }) => {
  const [poems, setPoems] = useState<PoemItem[]>(() => {
    try {
      const saved = localStorage.getItem('shagun_saved_poems');
      if (saved) return JSON.parse(saved);
    } catch {}
    return POEMS_AND_SHAYARI;
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'shayari' | 'friendship' | 'missing' | 'favorite'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [randomCompliment, setRandomCompliment] = useState(COMPLIMENTS[0]);

  // Sync favorites
  useEffect(() => {
    try {
      localStorage.setItem('shagun_saved_poems', JSON.stringify(poems));
    } catch {}
  }, [poems]);

  const toggleFavorite = (id: string) => {
    soundService.playSparkle();
    setPoems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const handleCopy = (poem: PoemItem) => {
    soundService.playSparkle();
    const text = `${poem.title}\n\n${poem.lines.join('\n')}\n\n${poem.meaning || ''}\n— Dedicated to Shagun 💖`;
    navigator.clipboard.writeText(text);
    setCopiedId(poem.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getRandomCompliment = () => {
    soundService.playSparkle();
    const next = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
    setRandomCompliment(next);
  };

  const filteredPoems = poems.filter((p) => {
    if (activeCategory === 'favorite') return p.isFavorite;
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Feather size={14} />
          <span>Verses & Soulful Words</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text">
          Poetry, Shayari & Compliments
        </h2>
        <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-xl mx-auto">
          Words written from the quietest corners of the heart, praising the friendship that time
          could never fade.
        </p>
      </div>

      {/* Sweet Compliment Spotlight Card */}
      <div className="mb-10 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-pink-950/60 via-purple-950/60 to-pink-950/60 border border-pink-400/40 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex-1 text-center sm:text-left">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5 mb-1.5">
            <Sparkles size={12} />
            <span>Compliment For {name}</span>
          </span>
          <p className="font-serif italic text-base sm:text-xl text-white">
            "{randomCompliment}"
          </p>
        </div>

        <button
          onClick={getRandomCompliment}
          className="px-5 py-2.5 rounded-full text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-pink-200 border border-pink-500/30 shadow flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
        >
          <Shuffle size={14} />
          <span>New Compliment 🌸</span>
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {[
          { key: 'all', label: 'All Verses' },
          { key: 'shayari', label: '🌹 Birthday Shayari (Roman Urdu)' },
          { key: 'friendship', label: '💫 Friendship Poetry' },
          { key: 'missing', label: '🥺 Missing You Poetry' },
          { key: 'favorite', label: '💖 Saved Favorites' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveCategory(tab.key as any)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === tab.key
                ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-md'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Poetry & Shayari Cards */}
      <div className="space-y-6">
        {filteredPoems.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="rounded-3xl p-6 sm:p-8 bg-neutral-900/80 border border-pink-500/25 backdrop-blur-md shadow-xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-400" />
                <h3 className="font-serif font-bold text-lg sm:text-xl text-white">{p.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(p.id)}
                  className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-neutral-400 hover:text-pink-400 transition-all cursor-pointer"
                  title={p.isFavorite ? 'Remove favorite' : 'Save to favorites'}
                >
                  <Heart
                    size={16}
                    className={p.isFavorite ? 'text-pink-500 fill-pink-500' : 'text-neutral-400'}
                  />
                </button>

                <button
                  onClick={() => handleCopy(p)}
                  className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-neutral-400 hover:text-white transition-all cursor-pointer"
                  title="Copy poem text"
                >
                  {copiedId === p.id ? (
                    <Check size={16} className="text-emerald-400" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Verses */}
            <div className="my-3 space-y-2 text-center py-4 bg-black/30 rounded-2xl border border-white/5">
              {p.lines.map((line, lIdx) => (
                <p
                  key={lIdx}
                  className="font-serif italic text-sm sm:text-base md:text-lg text-pink-100/90 leading-relaxed tracking-wide"
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Meaning or Translation if Shayari */}
            {p.meaning && (
              <div className="mt-3 text-xs text-neutral-400 italic text-center font-sans">
                Meaning: "{p.meaning}"
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Copy Toast */}
      <AnimatePresence>
        {copiedId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-neutral-900 border border-emerald-500/50 text-white text-xs font-semibold shadow-2xl flex items-center gap-2"
          >
            <Check size={14} className="text-emerald-400" />
            <span>Poem copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
