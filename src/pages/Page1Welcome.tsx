import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Gift, Clock, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RealisticCake } from '../components/RealisticCake.tsx';
import { InteractiveBalloons } from '../components/InteractiveBalloons.tsx';
import { FlowerBouquetButton } from '../components/InteractiveFlowers.tsx';
import { soundService } from '../utils/soundService.ts';

interface Page1Props {
  name: string;
  onNavigate: (page: number) => void;
  onOpenFireworks?: () => void;
}

export const Page1Welcome: React.FC<Page1Props> = ({ name, onNavigate, onOpenFireworks }) => {
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [hugGiven, setHugGiven] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isBirthdayToday: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthdayToday: false });

  // Calculate countdown to next 26 November
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      let targetYear = now.getFullYear();
      let targetDate = new Date(targetYear, 10, 26, 0, 0, 0); // Month 10 is November (0-indexed)

      // If Nov 26 has already passed this year, point to next year
      if (now.getTime() > targetDate.getTime() + 86400000) {
        targetDate = new Date(targetYear + 1, 10, 26, 0, 0, 0);
      }

      const diff = targetDate.getTime() - now.getTime();
      const isBirthdayToday = now.getMonth() === 10 && now.getDate() === 26;

      if (diff <= 0 || isBirthdayToday) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthdayToday: true });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isBirthdayToday: false });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenSurprise = () => {
    soundService.playFirework();
    setSurpriseOpen(true);
    try {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#ff1493', '#ff69b4', '#ffd700', '#ffffff', '#a855f7'],
      });
    } catch {}
  };

  const handleGiveHug = () => {
    soundService.playHug();
    setHugGiven(true);
    setTimeout(() => setHugGiven(false), 3500);
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 py-8 overflow-hidden text-white">
      {/* Interactive Balloons Floating Layer */}
      <InteractiveBalloons count={8} allowRelease={true} />

      {/* Hero Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-30 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-500/15 border border-pink-400/40 backdrop-blur-md shadow-lg mb-4"
      >
        <span className="text-xl">🎂</span>
        <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-pink-300">
          The Grand Birthday Celebration • 26 November
        </span>
        <Sparkles size={16} className="text-amber-300 animate-spin" />
      </motion.div>

      {/* Main Title Heading */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative z-30 text-center max-w-3xl mx-auto mb-6"
      >
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
          HAPPY BIRTHDAY,{' '}
          <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(244,63,94,0.6)]">
            MY BESTIE!
          </span>
        </h1>
        <p className="mt-2 text-sm sm:text-lg text-pink-200/90 font-medium max-w-xl mx-auto">
          To my partner in crime, my secret keeper, and the brightest ray of sunshine in my life—today
          the world belongs to you! 💖
        </p>
      </motion.div>

      {/* Countdown Clock or Birthday Is Today Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-30 mb-8"
      >
        {timeLeft.isBirthdayToday ? (
          <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-bold text-center shadow-2xl animate-pulse-glow flex items-center gap-3">
            <span className="text-2xl animate-bounce">🎉</span>
            <span className="text-sm sm:text-base">
              IT'S 26 NOVEMBER! TODAY IS OFFICIALLY SHAGUN DAY!
            </span>
            <span className="text-2xl animate-bounce">🥳</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3 p-3 rounded-2xl bg-black/60 dark:bg-zinc-950/70 border border-pink-500/30 backdrop-blur-md shadow-xl">
            <div className="flex items-center gap-1.5 pl-2 text-pink-400">
              <Clock size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">
                Countdown:
              </span>
            </div>
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Mins', val: timeLeft.minutes },
              { label: 'Secs', val: timeLeft.seconds },
            ].map((unit, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center px-3 py-1.5 min-w-[54px] rounded-xl bg-pink-950/40 border border-pink-500/20"
              >
                <span className="font-mono text-base sm:text-lg font-bold text-white">
                  {String(unit.val).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-pink-300/80 uppercase font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Centered Realistic Birthday Cake */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative z-30 my-4"
      >
        <RealisticCake name={name} />
      </motion.div>

      {/* Interactive Grand Actions */}
      <div className="relative z-30 mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
        {/* Open Surprise Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenSurprise}
          className="px-6 py-3.5 rounded-full font-bold text-sm sm:text-base text-white bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-500 hover:to-amber-400 shadow-xl shadow-pink-500/30 border border-pink-200/40 flex items-center gap-2 cursor-pointer transition-all"
        >
          <Gift size={20} className="animate-bounce" />
          <span>Open Your Birthday Surprise 🎁</span>
        </motion.button>

        {/* Send Shagun Flowers Button */}
        <FlowerBouquetButton />

        {/* Tap For A Hug Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGiveHug}
          className="px-5 py-2.5 rounded-full font-semibold text-sm text-pink-200 bg-pink-950/60 hover:bg-pink-900/80 border border-pink-500/40 shadow flex items-center gap-2 cursor-pointer transition-all"
        >
          <span>🤗</span>
          <span>Tap For A Bear Hug</span>
        </motion.button>

        {/* Launch Canvas Fireworks Sky Button */}
        {onOpenFireworks && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenFireworks}
            className="px-5 py-2.5 rounded-full font-bold text-sm text-amber-200 bg-gradient-to-r from-amber-950/70 via-rose-950/70 to-pink-950/70 hover:border-amber-400 border border-amber-500/40 shadow-lg flex items-center gap-2 cursor-pointer transition-all"
          >
            <span>🎆</span>
            <span>Canvas Fireworks Sky</span>
          </motion.button>
        )}
      </div>

      {/* Hug Warm Overlay Notification */}
      <AnimatePresence>
        {hugGiven && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 30 }}
            className="fixed bottom-24 z-50 px-7 py-4 rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 text-white shadow-2xl border border-white/40 flex items-center gap-3 backdrop-blur-xl"
          >
            <span className="text-3xl animate-bounce">🫂💖</span>
            <div>
              <div className="font-bold text-base">Long Distance Hug Delivered!</div>
              <div className="text-xs text-pink-100">
                Wrapping you in all my warmth, love, and bestie energy right now!
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grand Birthday Surprise Modal */}
      <AnimatePresence>
        {surpriseOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-neutral-900 via-pink-950/60 to-neutral-900 border-2 border-pink-400 p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(244,63,94,0.5)] overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-20 -left-20 w-44 h-44 rounded-full bg-pink-500/30 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-44 h-44 rounded-full bg-amber-500/30 blur-3xl pointer-events-none" />

              <div className="text-5xl mb-3 animate-bounce">🎉 💖 🎂</div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-transparent bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text">
                SURPRISE, SHAGUN!
              </h3>
              <p className="mt-3 text-sm text-pink-100 leading-relaxed font-sans">
                You thought this was just a normal birthday card? Absolutely not! This whole website
                was hand-crafted from scratch just for you—every candle, every memory, every joke,
                and every prayer was created to remind you how deeply loved and missed you are!
              </p>

              <div className="my-6 p-4 rounded-2xl bg-black/40 border border-pink-500/30 text-left space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-pink-300">
                  <Heart size={14} className="fill-pink-400 text-pink-400" />
                  <span>9 Exclusive Surprise Rooms Crafted For You</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-pink-300">
                  <Flame size={14} className="text-amber-400" />
                  <span>Real interactive candles, balloons, jokes & playlist</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-pink-300">
                  <Sparkles size={14} className="text-yellow-300" />
                  <span>A heartfelt handwritten letter & grand heart fireworks</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setSurpriseOpen(false);
                    onNavigate(2); // Jump to 7 paragraphs
                  }}
                  className="px-6 py-3 rounded-full font-bold text-sm bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white shadow-lg hover:from-pink-400 hover:to-amber-400 cursor-pointer"
                >
                  Read My 7 Special Paragraphs 💌
                </button>
                <button
                  onClick={() => setSurpriseOpen(false)}
                  className="px-5 py-3 rounded-full text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 cursor-pointer"
                >
                  Stay On Welcome Page
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
