import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Gift, Heart, RotateCcw, Share2, Award, Music } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HeartFireworks } from '../components/HeartFireworks.tsx';
import { CanvasFireworks } from '../components/CanvasFireworks.tsx';
import { RealisticCake } from '../components/RealisticCake.tsx';
import { FriendshipPlaylist } from '../components/FriendshipPlaylist.tsx';
import { soundService } from '../utils/soundService.ts';

interface Page9Props {
  name: string;
  onRestart: () => void;
  onOpenShare: () => void;
}

export const Page9Finale: React.FC<Page9Props> = ({ name, onRestart, onOpenShare }) => {
  const [giftOpened, setGiftOpened] = useState(false);
  const [celebrationScore, setCelebrationScore] = useState(1);
  const [showCanvasSky, setShowCanvasSky] = useState(true);

  // Auto trigger celebratory fanfare when Page 9 mounts
  useEffect(() => {
    soundService.playFirework();
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ff1493', '#ff69b4', '#ffd700', '#ffffff', '#a855f7'],
      });
    } catch {}
  }, []);

  const handleOpenGiftBox = () => {
    soundService.playFirework();
    setGiftOpened(true);
    setCelebrationScore((prev) => prev + 1);
    try {
      confetti({
        particleCount: 160,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#ff1493', '#ff69b4', '#ffd700', '#ff007f'],
      });
    } catch {}
  };

  const handleReplayAll = () => {
    soundService.playFirework();
    setGiftOpened(false);
    setTimeout(() => {
      setGiftOpened(true);
    }, 400);
    try {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
      });
    } catch {}
  };

  return (
    <div className="relative min-h-[92vh] max-w-5xl mx-auto px-4 py-8 flex flex-col items-center text-center">
      {/* High-Impact Heart Fireworks Trigger Component */}
      <HeartFireworks autoTrigger={true} className="mb-6 z-40" />

      {/* Interactive HTML5 Canvas Firework Section */}
      <div className="w-full my-4">
        <div className="flex items-center justify-between px-3 py-2 mb-2">
          <div className="flex items-center gap-2 text-left">
            <span className="text-2xl animate-pulse">🎆</span>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-pink-200">
                Interactive Canvas Firework Sky
              </h3>
              <p className="text-[11px] text-neutral-400">
                Tap anywhere on the canvas below to launch rockets and exploding hearts!
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCanvasSky((prev) => !prev)}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-neutral-900 border border-pink-500/30 text-pink-300 hover:text-white cursor-pointer"
          >
            {showCanvasSky ? 'Collapse Canvas' : 'Expand Canvas Sky'}
          </button>
        </div>

        {showCanvasSky && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CanvasFireworks autoLaunch={true} />
          </motion.div>
        )}
      </div>

      {/* Floating Sparkles & Stars */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-amber-500/20 to-pink-500/20 border border-pink-400/40 text-pink-200 text-xs font-semibold uppercase tracking-widest mb-4">
        <Sparkles size={14} className="text-amber-300 animate-spin" />
        <span>The Grand Finale & Eternal Celebration</span>
        <Sparkles size={14} className="text-amber-300 animate-spin" />
      </div>

      {/* Final Grand Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 bg-clip-text leading-tight max-w-4xl mx-auto"
      >
        Happy Birthday, {name}! You Will Always Be My Favourite Human, My Bestie, and My Partner in
        Crime. 💗🎂
      </motion.h1>

      <p className="mt-3 text-sm sm:text-base text-pink-200/90 max-w-xl mx-auto font-medium">
        Today was all about celebrating the magic you bring into this world. No matter where life
        leads us, my heart will always hold a front-row seat for you!
      </p>

      {/* Realistic Grand Birthday Cake Display */}
      <div className="my-8">
        <RealisticCake name={name} />
      </div>

      {/* Interactive Mystery Birthday Gift Box */}
      <div className="my-6 w-full max-w-md">
        <AnimatePresence mode="wait">
          {!giftOpened ? (
            <motion.div
              key="closed-gift"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleOpenGiftBox}
              className="p-8 rounded-3xl bg-gradient-to-br from-pink-900/80 via-neutral-900 to-purple-950/80 border-2 border-pink-400 shadow-[0_0_50px_rgba(244,63,94,0.4)] cursor-pointer text-center group"
            >
              <div className="text-6xl mb-3 animate-bounce">🎁</div>
              <h3 className="font-serif font-bold text-xl text-white group-hover:text-pink-300 transition-colors">
                Click To Unbox Your Final Gift!
              </h3>
              <p className="text-xs text-pink-200/80 mt-1">
                A secret token of infinite friendship locked inside...
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="opened-gift"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-pink-950 via-neutral-900 to-purple-950 border-2 border-amber-400/80 shadow-[0_0_60px_rgba(251,191,36,0.4)] text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg">
                💖
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Official Soulmate Sisterhood Token
              </span>
              <h3 className="font-serif font-black text-2xl text-white mt-1 mb-2">
                Lifetime Free Subscription To Me!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                Includes unlimited 2 AM calls, emergency emotional support, lifetime defense against
                all annoying people, spontaneous road trips, and endless love that never expires!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* "Forever Besties" Certificate of Sacred Friendship */}
      <div className="w-full max-w-2xl my-8 p-6 sm:p-8 rounded-3xl bg-[#0d090d] border-2 border-pink-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-500 via-amber-400 to-purple-500" />

        <div className="flex items-center justify-between mb-4 pb-3 border-b border-pink-500/20">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-widest">
            <Award size={16} />
            <span>Official Best Friend Certificate</span>
          </div>
          <span className="text-xs font-mono text-pink-400">Cert. No. BESTIE-26-NOV</span>
        </div>

        <h3 className="font-serif font-black text-2xl sm:text-3xl text-pink-100 mb-2">
          Forever Besties Sealed By Love
        </h3>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans max-w-lg mx-auto">
          This certifies that <strong>{name}</strong> is permanently awarded the title of Most
          Precious Soul, Unshakable Confidante, and Queen of My Heart for all lifetimes to come.
        </p>

        <div className="mt-6 pt-4 border-t border-pink-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <div>Issue Date: 26 November</div>
          <div className="flex items-center gap-1.5 text-pink-400 font-semibold">
            <Heart size={14} className="fill-pink-500 text-pink-500" />
            <span>Valid Until: Eternity & Beyond</span>
          </div>
        </div>
      </div>

      {/* Integrated Friendship Playlist */}
      <div className="w-full max-w-2xl my-6 text-left">
        <FriendshipPlaylist />
      </div>

      {/* Finale Action Controls */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={handleReplayAll}
          className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-lg hover:from-pink-500 hover:to-rose-400 flex items-center gap-2 cursor-pointer transition-all"
        >
          <RotateCcw size={16} />
          <span>Replay Celebration Magic 🔄</span>
        </button>

        <button
          onClick={onOpenShare}
          className="px-5 py-3 rounded-full text-xs sm:text-sm font-semibold bg-neutral-900 hover:bg-neutral-800 text-pink-300 border border-pink-500/40 flex items-center gap-2 cursor-pointer transition-all shadow"
        >
          <Share2 size={16} />
          <span>Share Website With Shagun 💌</span>
        </button>

        <button
          onClick={onRestart}
          className="px-5 py-3 rounded-full text-xs sm:text-sm font-medium text-neutral-400 hover:text-white bg-black/40 hover:bg-black/60 border border-neutral-800 cursor-pointer transition-all"
        >
          <span>Return To Beginning 🚀</span>
        </button>
      </div>
    </div>
  );
};
