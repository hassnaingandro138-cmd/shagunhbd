import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Edit3, Copy, Printer, Check, Heart, Sparkles, Save } from 'lucide-react';
import { DEFAULT_LETTER } from '../data/defaultContent.ts';
import { soundService } from '../utils/soundService.ts';

export const Page8Letter: React.FC<{ name: string }> = ({ name }) => {
  const [letterContent, setLetterContent] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('shagun_birthday_letter');
      if (saved) return saved;
    } catch {}
    return DEFAULT_LETTER;
  });

  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(letterContent);
  const [copied, setCopied] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shagun_birthday_letter', letterContent);
    } catch {}
  }, [letterContent]);

  const handleOpenClose = () => {
    soundService.playSparkle();
    setIsOpen((prev) => !prev);
  };

  const handleSaveEdit = () => {
    soundService.playSparkle();
    setLetterContent(tempContent);
    setIsEditing(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleCopy = () => {
    soundService.playSparkle();
    navigator.clipboard.writeText(letterContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    soundService.playSparkle();
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8 no-print">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Mail size={14} />
          <span>The Handwritten Envelope</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text">
          To My Dearest {name}, My Forever Bestie 💗
        </h2>
        <p className="mt-2 text-sm text-neutral-300 max-w-lg mx-auto">
          An open, vulnerable, and timeless letter sealed with pure love on your birthday.
        </p>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleOpenClose}
            className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-neutral-900 hover:bg-neutral-800 text-pink-300 border border-pink-500/30 flex items-center gap-2 cursor-pointer transition-all shadow"
          >
            <span>{isOpen ? 'Fold Into Envelope 💌' : 'Unfold Letter 📜'}</span>
          </button>

          <button
            onClick={() => {
              setTempContent(letterContent);
              setIsEditing(true);
            }}
            className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Edit3 size={15} />
            <span>Edit Letter</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 flex items-center gap-2 cursor-pointer transition-all"
          >
            {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
            <span>{copied ? 'Copied!' : 'Copy Letter'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Printer size={15} />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Realistic Letter Stationery Container */}
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="letter-open"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl p-6 sm:p-12 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border-2 border-pink-200/50 bg-[#fffaf5] text-neutral-900 overflow-hidden"
            style={{
              backgroundImage:
                'radial-gradient(#fbcfe8 0.75px, transparent 0.75px), radial-gradient(#fbcfe8 0.75px, #fffaf5 0.75px)',
              backgroundSize: '30px 30px',
              backgroundPosition: '0 0, 15px 15px',
            }}
          >
            {/* Top Wax Seal Emblem & Ribbon Watermark */}
            <div className="flex items-center justify-between pb-6 border-b border-pink-300/60 mb-6">
              <div className="flex items-center gap-3">
                {/* Wax Seal */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-700 via-rose-600 to-rose-900 shadow-lg flex items-center justify-center text-amber-200 font-serif font-black text-xl border-2 border-amber-300/40">
                  S
                </div>
                <div>
                  <div className="text-xs font-serif uppercase tracking-widest text-rose-800 font-bold">
                    Official Bestie Seal
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">26 November • Forever Sacred</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-rose-500">
                <Heart size={16} className="fill-rose-500" />
                <Sparkles size={14} />
              </div>
            </div>

            {/* Handwritten Letter Body */}
            <div className="font-handwriting text-xl sm:text-2xl md:text-3xl text-neutral-800 leading-relaxed sm:leading-loose whitespace-pre-line tracking-wide">
              {letterContent}
            </div>

            {/* Bottom Floral Border & Signature Stamp */}
            <div className="mt-12 pt-6 border-t border-pink-300/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-serif italic text-neutral-500">
                "Friendship is born at that moment when one person says to another: What! You too?"
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                <span>🌹 Verified Soul Sister Bond</span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Folded Envelope State */
          <motion.div
            key="envelope-closed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={handleOpenClose}
            className="w-full max-w-md mx-auto aspect-4/3 rounded-3xl bg-gradient-to-b from-rose-900 via-pink-900 to-neutral-950 p-6 flex flex-col items-center justify-center border-2 border-pink-400 shadow-2xl cursor-pointer hover:scale-105 transition-all text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-700 to-rose-500 flex items-center justify-center text-amber-300 font-serif font-black text-3xl shadow-xl mb-4 border-2 border-amber-300/60 animate-pulse">
              S
            </div>
            <h3 className="font-serif font-bold text-xl text-white">To: My Dearest Shagun</h3>
            <p className="text-xs text-pink-300 mt-1">From: Your Bestie With All My Heart</p>
            <div className="mt-6 px-5 py-2 rounded-full bg-white/10 text-xs font-semibold text-white border border-white/20">
              Click to Break Wax Seal & Read 💌
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-2xl rounded-3xl bg-neutral-900 border border-pink-500/40 p-6 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif font-bold text-lg text-pink-300 flex items-center gap-2">
                  <Edit3 size={18} />
                  <span>Personalize The Birthday Letter</span>
                </h4>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-neutral-400 hover:text-white text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-neutral-300 mb-3">
                You can customize this letter to include your specific private jokes, dates, and
                adventures with Shagun:
              </p>

              <textarea
                rows={12}
                value={tempContent}
                onChange={(e) => setTempContent(e.target.value)}
                className="w-full rounded-2xl bg-black/60 border border-neutral-700 p-4 text-sm text-pink-100 placeholder:text-neutral-500 focus:outline-hidden focus:border-pink-400 font-sans"
              />

              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  onClick={() => setTempContent(DEFAULT_LETTER)}
                  className="text-xs text-neutral-400 hover:text-pink-300 underline cursor-pointer"
                >
                  Reset To Original Template
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-full text-xs text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-6 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow hover:from-pink-400 hover:to-rose-400 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save size={14} />
                    <span>Save My Letter</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Saved Toast */}
      <AnimatePresence>
        {savedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-neutral-900 border border-emerald-500/50 text-white text-xs font-semibold shadow-2xl flex items-center gap-2"
          >
            <Check size={14} className="text-emerald-400" />
            <span>Letter personalized & saved safely!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
