import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundService } from '../utils/soundService.ts';

interface RealisticCakeProps {
  name?: string;
  onBlowCandles?: () => void;
  className?: string;
}

export const RealisticCake: React.FC<RealisticCakeProps> = ({
  name = 'Shagun',
  onBlowCandles,
  className = '',
}) => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true, true, true]);
  const [isBlowing, setIsBlowing] = useState(false);
  const [hasBlownOut, setHasBlownOut] = useState(false);
  const [sliceTaken, setSliceTaken] = useState(false);
  const [wishModalOpen, setWishModalOpen] = useState(false);
  const [userWish, setUserWish] = useState('');
  const [wishConfirmed, setWishConfirmed] = useState(false);

  const toggleCandle = (index: number) => {
    soundService.playSparkle();
    setCandlesLit((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const blowOutAllCandles = () => {
    setIsBlowing(true);
    soundService.playCandleBlow();

    setTimeout(() => {
      setCandlesLit([false, false, false, false, false]);
      setIsBlowing(false);
      setHasBlownOut(true);
      soundService.playSparkle();
      onBlowCandles?.();

      // Confetti & celebratory blast
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff1493', '#ff69b4', '#ffd700', '#ffffff', '#a855f7'],
        });
      } catch {}
    }, 600);
  };

  const reigniteCandles = () => {
    soundService.playSparkle();
    setCandlesLit([true, true, true, true, true]);
    setHasBlownOut(false);
  };

  const handleCutSlice = () => {
    soundService.playSparkle();
    setSliceTaken(true);
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ff69b4', '#ffd700'],
      });
    } catch {}
  };

  const saveWish = () => {
    if (!userWish.trim()) return;
    soundService.playSparkle();
    setWishConfirmed(true);
    setTimeout(() => {
      setWishModalOpen(false);
      setWishConfirmed(false);
    }, 2000);
  };

  const anyCandleLit = candlesLit.some((lit) => lit);

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Wind gust animation when blowing */}
      <AnimatePresence>
        {isBlowing && (
          <motion.div
            initial={{ opacity: 0, x: -100, scaleY: 0.5 }}
            animate={{ opacity: 0.9, x: 200, scaleY: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute top-12 left-1/4 z-50 pointer-events-none"
          >
            <div className="w-48 h-8 rounded-full bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent blur-sm" />
            <div className="w-36 h-4 mt-2 rounded-full bg-white/70 blur-xs" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Fairy Lights & Sparkles around Cake */}
      <div className="absolute -top-16 inset-x-0 h-28 pointer-events-none flex justify-around">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.3, 1, 0.4],
              scale: [0.8, 1.2, 0.8],
              y: [0, -6, 0],
            }}
            transition={{
              duration: 2 + i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
            className="w-2.5 h-2.5 rounded-full bg-amber-200 shadow-[0_0_12px_#fbbf24]"
          />
        ))}
      </div>

      {/* Realistic Multi-Tier Cake Assembly */}
      <div className="relative w-[300px] sm:w-[360px] md:w-[410px] flex flex-col items-center">
        {/* Golden / Acrylic Cake Topper */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-30 mb-[-10px] text-center"
        >
          <div className="relative inline-block px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.6)] border border-amber-400">
            <span className="font-serif italic font-extrabold text-sm sm:text-base tracking-wide bg-gradient-to-r from-pink-700 via-rose-800 to-amber-900 bg-clip-text text-transparent drop-shadow-sm">
              ✨ Happy Birthday {name} ✨
            </span>
          </div>
          {/* Dual acrylic stakes piercing into top tier */}
          <div className="flex justify-between w-28 mx-auto -mt-1">
            <div className="w-1 h-5 bg-gradient-to-b from-amber-300 to-amber-400/40 rounded-full" />
            <div className="w-1 h-5 bg-gradient-to-b from-amber-300 to-amber-400/40 rounded-full" />
          </div>
        </motion.div>

        {/* 5 Realistic Birthday Candles */}
        <div className="relative z-20 flex justify-center items-end gap-5 sm:gap-7 mb-[-6px]">
          {candlesLit.map((isLit, idx) => (
            <div
              key={idx}
              onClick={() => toggleCandle(idx)}
              className="relative flex flex-col items-center cursor-pointer group"
              title={isLit ? 'Click to blow out this candle' : 'Click to light this candle'}
            >
              {/* Flame & Glow Effect */}
              <AnimatePresence>
                {isLit && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0, y: -10 }}
                    className="relative mb-1 flex flex-col items-center"
                  >
                    {/* Ambient Light Halo */}
                    <div className="absolute -inset-3 rounded-full bg-amber-400/30 blur-md animate-pulse" />
                    {/* Outer Teardrop Flame */}
                    <div className="relative w-3.5 h-6 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_15px_#f59e0b] animate-flicker">
                      {/* Inner Blue Cone Flame */}
                      <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-2 rounded-full bg-blue-400 opacity-80" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candle Wick */}
              <div className="w-0.5 h-2 bg-neutral-800" />

              {/* Candle Wax Column with spiral stripes */}
              <div
                className={`w-3.5 h-11 sm:h-13 rounded-t-sm shadow-md transition-all ${
                  idx % 2 === 0
                    ? 'bg-gradient-to-b from-pink-300 via-pink-400 to-rose-500'
                    : 'bg-gradient-to-b from-amber-200 via-yellow-300 to-amber-400'
                }`}
                style={{
                  backgroundImage:
                    idx % 2 === 0
                      ? 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.6) 3px, rgba(255,255,255,0.6) 6px)'
                      : 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(244,63,94,0.4) 3px, rgba(244,63,94,0.4) 6px)',
                }}
              />
            </div>
          ))}
        </div>

        {/* TIER 1 (Top Tier) */}
        <div className="relative z-10 w-[180px] sm:w-[210px] h-[70px] sm:h-[80px] rounded-t-2xl shadow-xl overflow-visible bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 border-t-2 border-pink-100">
          {/* Fresh Strawberries & Whipped Rosettes on Top rim */}
          <div className="absolute -top-3 inset-x-2 flex justify-between items-center pointer-events-none px-1">
            <span className="text-sm">🍓</span>
            <div className="w-3.5 h-3.5 rounded-full bg-white shadow-xs border border-pink-100" />
            <span className="text-sm">🍓</span>
            <div className="w-3.5 h-3.5 rounded-full bg-white shadow-xs border border-pink-100" />
            <span className="text-sm">🍓</span>
          </div>

          {/* Dripping Strawberry Ganache Icing */}
          <div className="absolute top-0 inset-x-0 h-5 flex justify-around overflow-hidden pointer-events-none">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-3 bg-gradient-to-b from-rose-500 to-rose-600 rounded-b-full shadow-inner"
                style={{ height: `${10 + ((i * 7) % 12)}px` }}
              />
            ))}
          </div>

          {/* Frosting Swirls & Edible Pearl Texture */}
          <div className="absolute inset-x-0 bottom-1 flex justify-center gap-1.5 opacity-80">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-tr from-white to-pink-100 shadow-xs"
              />
            ))}
          </div>
        </div>

        {/* TIER 2 (Middle Tier) */}
        <div className="relative w-[240px] sm:w-[285px] h-[80px] sm:h-[95px] rounded-t-2xl shadow-2xl bg-gradient-to-b from-rose-100 via-pink-200 to-pink-400 border-t-4 border-white/60 -mt-2">
          {/* Decorative Whipped Buttercream Rosettes Ring */}
          <div className="absolute -top-3.5 inset-x-2 flex justify-around items-center pointer-events-none">
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full bg-white shadow-sm border border-rose-100 flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-pink-300" />
              </div>
            ))}
          </div>

          {/* Cake Piping Pattern & Inscription */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[11px] sm:text-xs font-handwriting font-bold tracking-widest text-pink-900/80">
              Sweetest Bestie Forever
            </div>
            <div className="flex gap-1.5 mt-0.5">
              <span className="text-[10px]">🌸</span>
              <span className="text-[10px]">💖</span>
              <span className="text-[10px]">🌸</span>
            </div>
          </div>

          {/* Golden Pearl Border at Bottom */}
          <div className="absolute inset-x-0 bottom-1 flex justify-around opacity-90 px-2">
            {[...Array(18)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_2px_#fbbf24]"
              />
            ))}
          </div>
        </div>

        {/* TIER 3 (Bottom Tier - Grand Base) */}
        <div
          className={`relative w-[300px] sm:w-[350px] md:w-[390px] h-[90px] sm:h-[105px] rounded-t-2xl shadow-2xl transition-all border-t-4 border-pink-100/80 -mt-2 ${
            sliceTaken
              ? 'bg-gradient-to-b from-pink-200 via-rose-300 to-pink-500'
              : 'bg-gradient-to-b from-rose-100 via-pink-300 to-pink-600'
          }`}
        >
          {/* Rosette Rim */}
          <div className="absolute -top-3 inset-x-3 flex justify-around pointer-events-none">
            {[...Array(18)].map((_, i) => (
              <div
                key={i}
                className="w-3.5 h-3.5 rounded-full bg-white shadow-xs border border-pink-200"
              />
            ))}
          </div>

          {/* Draped Fondant Ribbon Swags */}
          <div className="absolute inset-0 flex items-center justify-around px-4 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-14 h-8 rounded-b-full border-b-2 border-dashed border-pink-100/70"
              />
            ))}
          </div>

          {/* Interactive Slice Reveal if Cut */}
          {sliceTaken && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute right-4 top-4 bg-white/95 text-pink-700 px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold border border-pink-300 flex items-center gap-1.5"
            >
              <span>🍰</span>
              <span>1st Slice For Shagun!</span>
            </motion.div>
          )}

          {/* Base Lace Border */}
          <div className="absolute inset-x-0 bottom-0.5 flex justify-around px-2">
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-t from-white to-pink-100 shadow-xs"
              />
            ))}
          </div>
        </div>

        {/* Ornate Cake Stand Pedestal */}
        <div className="relative w-[330px] sm:w-[380px] md:w-[430px] flex flex-col items-center -mt-1 z-0">
          {/* Glass/Silver Top Plate */}
          <div className="w-full h-5 rounded-[50%] bg-gradient-to-r from-zinc-200 via-white to-zinc-300 shadow-[0_10px_20px_rgba(0,0,0,0.3)] border-t border-white" />
          {/* Pedestal Base */}
          <div className="w-28 sm:w-36 h-4 bg-gradient-to-b from-zinc-300 to-zinc-400 rounded-b-xl shadow-md" />
          <div className="w-44 sm:w-56 h-3 bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-300 rounded-full shadow-lg" />
        </div>
      </div>

      {/* Interactive Control Bar for Cake */}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        {anyCandleLit ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={blowOutAllCandles}
            className="px-6 py-2.5 rounded-full font-bold text-sm sm:text-base text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 shadow-lg hover:shadow-pink-500/40 transition-all border border-pink-200/40 flex items-center gap-2 cursor-pointer"
          >
            <span>💨</span>
            <span>Blow Out Candles!</span>
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reigniteCandles}
            className="px-6 py-2.5 rounded-full font-bold text-sm sm:text-base text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg hover:shadow-amber-500/40 transition-all border border-amber-200/40 flex items-center gap-2 cursor-pointer"
          >
            <span>🕯️</span>
            <span>Relight Candles</span>
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCutSlice}
          className="px-5 py-2.5 rounded-full font-medium text-sm text-pink-200 bg-pink-950/60 hover:bg-pink-900/80 border border-pink-500/40 shadow flex items-center gap-2 cursor-pointer"
        >
          <span>🍰</span>
          <span>{sliceTaken ? 'Cut Another Slice' : 'Cut A Cake Slice'}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setWishModalOpen(true)}
          className="px-5 py-2.5 rounded-full font-medium text-sm text-amber-200 bg-amber-950/50 hover:bg-amber-900/70 border border-amber-500/40 shadow flex items-center gap-2 cursor-pointer"
        >
          <span>🌟</span>
          <span>Make A Birthday Wish</span>
        </motion.button>
      </div>

      {/* Birthday Blow Out Celebration Banner */}
      <AnimatePresence>
        {hasBlownOut && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-pink-950/90 via-purple-950/90 to-pink-950/90 border border-pink-400/50 shadow-2xl text-center max-w-md mx-auto"
          >
            <div className="text-2xl mb-1">🎉 🥳 💖 🎂</div>
            <h4 className="font-serif font-bold text-lg text-pink-200">
              Wishes Sent Straight to Heaven!
            </h4>
            <p className="text-xs text-pink-300/90 mt-1">
              May every single candle you blew out transform into a year of prosperity, good health,
              and boundless giggles with your bestie!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Make a Wish Modal */}
      <AnimatePresence>
        {wishModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md rounded-3xl bg-neutral-900 border border-pink-500/40 p-6 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-pink-400 font-bold text-lg">
                  <span>🌟</span>
                  <span>Whisper A Wish For {name}</span>
                </div>
                <button
                  onClick={() => setWishModalOpen(false)}
                  className="text-neutral-400 hover:text-white text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {wishConfirmed ? (
                <div className="py-8 text-center">
                  <div className="text-4xl mb-3 animate-bounce">✨💖✨</div>
                  <h4 className="text-lg font-bold text-pink-300">Wish Sealed In The Stars!</h4>
                  <p className="text-xs text-neutral-300 mt-1">
                    Your sweetest wish for Shagun has been recorded and carried to the angels.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-xs text-neutral-300 mb-3">
                    Close your eyes, think of Shagun's smiling face, and write a secret wish or
                    blessing for her birthday:
                  </p>
                  <textarea
                    rows={4}
                    value={userWish}
                    onChange={(e) => setUserWish(e.target.value)}
                    placeholder="e.g. May Shagun always stay as happy, radiant, and loved as she is today..."
                    className="w-full rounded-2xl bg-black/60 border border-pink-500/30 p-3 text-sm text-pink-100 placeholder:text-neutral-500 focus:outline-hidden focus:border-pink-400"
                  />
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      onClick={() => setWishModalOpen(false)}
                      className="px-4 py-2 rounded-full text-xs text-neutral-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveWish}
                      className="px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow hover:from-pink-400 hover:to-rose-400 cursor-pointer"
                    >
                      Seal Wish In Heaven 💫
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
