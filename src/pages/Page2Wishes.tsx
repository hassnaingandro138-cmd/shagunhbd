import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Copy, Check, Sparkles, MessageCircleHeart } from 'lucide-react';
import { SEVEN_PARAGRAPHS, ParagraphItem } from '../data/defaultContent.ts';
import { soundService } from '../utils/soundService.ts';

export const Page2Wishes: React.FC<{ name: string }> = ({ name }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('shagun_paragraph_likes');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { p1: 12, p2: 15, p3: 20, p4: 18, p5: 14, p6: 22, p7: 26 };
  });

  const handleLike = (id: string) => {
    soundService.playSparkle();
    setLikes((prev) => {
      const updated = { ...prev, [id]: (prev[id] || 0) + 1 };
      try {
        localStorage.setItem('shagun_paragraph_likes', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleCopy = (p: ParagraphItem) => {
    soundService.playSparkle();
    const textToCopy = `${p.title}\n\n${p.content}\n\n${p.quote}\n— With love for Shagun 💖`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getThemeClasses = (theme: ParagraphItem['theme']) => {
    switch (theme) {
      case 'gold':
        return 'border-amber-400/40 bg-gradient-to-br from-amber-950/30 via-neutral-900/90 to-amber-950/20 shadow-[0_0_30px_rgba(251,191,36,0.15)]';
      case 'rose':
        return 'border-rose-400/40 bg-gradient-to-br from-rose-950/30 via-neutral-900/90 to-rose-950/20 shadow-[0_0_30px_rgba(244,63,94,0.15)]';
      case 'purple':
        return 'border-purple-400/40 bg-gradient-to-br from-purple-950/30 via-neutral-900/90 to-purple-950/20 shadow-[0_0_30px_rgba(168,85,247,0.15)]';
      case 'black':
        return 'border-neutral-700 bg-neutral-950/90 shadow-2xl';
      case 'pink':
      default:
        return 'border-pink-500/40 bg-gradient-to-br from-pink-950/30 via-neutral-900/90 to-pink-950/20 shadow-[0_0_30px_rgba(236,72,153,0.15)]';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3"
        >
          <MessageCircleHeart size={14} />
          <span>From My Heart To Yours</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text"
        >
          Seven Special Letters for {name}
        </motion.h2>
        <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-xl mx-auto">
          Seven heartfelt chapters celebrating every dimension of who you are, our crazy memories,
          how much I miss you, and the promises that tie us together.
        </p>
      </div>

      {/* 7 Paragraphs List */}
      <div className="space-y-8">
        {SEVEN_PARAGRAPHS.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
            className={`relative rounded-3xl p-6 sm:p-8 border backdrop-blur-xl transition-all ${getThemeClasses(
              p.theme
            )}`}
          >
            {/* Paragraph Number Badge */}
            <div className="absolute -top-3.5 left-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
              <span>Chapter 0{idx + 1}</span>
              <Sparkles size={11} />
            </div>

            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{p.icon}</span>
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                    {p.title}
                  </h3>
                  <div className="text-xs font-medium text-pink-400">{p.subtitle}</div>
                </div>
              </div>

              {/* Action Buttons: Like & Copy */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => handleLike(p.id)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-pink-500/20 text-pink-300 border border-pink-500/20 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  title="React with love"
                >
                  <Heart size={13} className="text-pink-400 fill-pink-400" />
                  <span>{likes[p.id] || 0}</span>
                </button>

                <button
                  onClick={() => handleCopy(p)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Copy this paragraph"
                >
                  {copiedId === p.id ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Paragraph Body Content */}
            <p className="text-neutral-200 text-sm sm:text-base leading-relaxed mb-5 font-sans font-normal">
              {p.content}
            </p>

            {/* Quote Banner */}
            <div className="p-3.5 rounded-2xl bg-black/40 border-l-4 border-pink-400 text-xs sm:text-sm font-handwriting italic text-pink-200/90">
              {p.quote}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Copy Toast Indicator */}
      <AnimatePresence>
        {copiedId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-neutral-900 border border-emerald-500/50 text-white text-xs font-semibold shadow-2xl flex items-center gap-2"
          >
            <Check size={14} className="text-emerald-400" />
            <span>Wish paragraph copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
