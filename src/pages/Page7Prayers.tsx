import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Heart, Sparkles, Send } from 'lucide-react';
import { PRAYERS_LIST } from '../data/defaultContent.ts';
import { soundService } from '../utils/soundService.ts';

export const Page7Prayers: React.FC<{ name: string }> = ({ name }) => {
  const [candlesLitCount, setCandlesLitCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('shagun_prayer_candles');
      if (saved) return parseInt(saved, 10);
    } catch {}
    return 108;
  });

  const [hasLitCandle, setHasLitCandle] = useState(false);
  const [customBlessing, setCustomBlessing] = useState('');
  const [sentBlessings, setSentBlessings] = useState<string[]>([
    'May you achieve every rank and award you work hard for!',
    'May every person in your life cherish you as much as I do.',
  ]);

  const handleLightCandle = () => {
    soundService.playSparkle();
    setHasLitCandle(true);
    const updated = candlesLitCount + 1;
    setCandlesLitCount(updated);
    try {
      localStorage.setItem('shagun_prayer_candles', updated.toString());
    } catch {}
  };

  const handleSendBlessing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customBlessing.trim()) return;
    soundService.playSparkle();
    setSentBlessings((prev) => [customBlessing.trim(), ...prev]);
    setCustomBlessing('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldCheck size={14} />
          <span>Divine Blessings & Hopes</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-amber-200 via-pink-200 to-rose-200 bg-clip-text">
          Prayers & Dreams For {name}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-xl mx-auto">
          Sacred blessings whispered for your protection, radiant health, soaring ambitions, and
          lifelong peace.
        </p>
      </div>

      {/* Interactive Light A Prayer Candle Box */}
      <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-amber-950/20 to-neutral-900 border border-amber-400/30 backdrop-blur-md shadow-2xl text-center">
        <div className="relative inline-block mb-3">
          {/* Candle Flame */}
          <div className="w-4 h-7 mx-auto rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_20px_#fbbf24] animate-flicker" />
          <div className="w-1 h-2 bg-neutral-700 mx-auto" />
          <div className="w-6 h-12 rounded-t-sm bg-gradient-to-b from-amber-200 to-amber-400 shadow-md mx-auto" />
        </div>

        <h3 className="font-serif font-bold text-xl text-amber-100 mb-1">
          The Virtual Sanctuary Candle
        </h3>
        <p className="text-xs text-neutral-300 max-w-md mx-auto mb-4">
          Over <strong className="text-amber-300">{candlesLitCount} prayer lights</strong> have
          been dedicated to Shagun’s happiness and long life.
        </p>

        <button
          onClick={handleLightCandle}
          disabled={hasLitCandle}
          className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2 mx-auto cursor-pointer ${
            hasLitCandle
              ? 'bg-amber-600/30 text-amber-200 border border-amber-500/40 cursor-default'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold shadow-amber-500/30'
          }`}
        >
          <span>🕯️</span>
          <span>{hasLitCandle ? 'Your Candle Glows Brightly ✨' : 'Light A Prayer Candle For Her'}</span>
        </button>
      </div>

      {/* Prayers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {PRAYERS_LIST.map((pr, idx) => (
          <motion.div
            key={pr.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="rounded-3xl p-6 bg-neutral-900/80 border border-amber-500/20 backdrop-blur-md shadow-xl flex flex-col justify-between group hover:border-amber-400/50 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{pr.icon}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {pr.tag}
                </span>
              </div>
              <h4 className="font-serif font-bold text-lg text-white mb-2">{pr.title}</h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {pr.blessing}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-amber-300/80">
              <span>May this come true</span>
              <Sparkles size={12} className="text-amber-400" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Sky Lantern Wishing Box */}
      <div className="rounded-3xl p-6 sm:p-8 bg-neutral-900/90 border border-pink-500/30 backdrop-blur-md shadow-2xl">
        <h3 className="font-serif font-bold text-xl text-pink-200 mb-1 flex items-center gap-2">
          <span>Release A Wishing Lantern</span>
          <span>🏮</span>
        </h3>
        <p className="text-xs text-neutral-300 mb-4">
          Write a heartfelt prayer for Shagun and release it into the celestial sky:
        </p>

        <form onSubmit={handleSendBlessing} className="flex gap-2 mb-6">
          <input
            type="text"
            value={customBlessing}
            onChange={(e) => setCustomBlessing(e.target.value)}
            placeholder="e.g. May you travel to your dream cities and always stay smiling..."
            className="flex-1 rounded-2xl bg-black/60 border border-neutral-700 px-4 py-2.5 text-sm text-pink-100 placeholder:text-neutral-500 focus:outline-hidden focus:border-pink-400"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow hover:from-pink-400 hover:to-rose-400 flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Send size={14} />
            <span>Release</span>
          </button>
        </form>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
            Recent Floating Prayers:
          </div>
          {sentBlessings.map((b, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-pink-200 flex items-center gap-2"
            >
              <Heart size={12} className="text-pink-400 fill-pink-400 shrink-0" />
              <span>"{b}"</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
