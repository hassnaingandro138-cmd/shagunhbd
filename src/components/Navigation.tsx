import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  ChevronDown,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sun,
  Moon,
  Settings,
  Share2,
  Printer,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { soundService } from '../utils/soundService.ts';

interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onPageSelect: (page: number) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  onOpenShare: () => void;
  onOpenPrintCard: () => void;
  onOpenFireworks: () => void;
  name: string;
}

const PAGE_NAMES = [
  { num: 1, title: 'Grand Birthday Welcome', icon: '🎂' },
  { num: 2, title: 'Seven Special Wishes', icon: '💌' },
  { num: 3, title: 'Our Photos & Videos', icon: '📸' },
  { num: 4, title: 'Friendship Scrapbook', icon: '📖' },
  { num: 5, title: 'Jokes & Partner-in-Crime', icon: '🤪' },
  { num: 6, title: 'Poetry & Sweet Shayari', icon: '🌹' },
  { num: 7, title: 'Prayers & Blessings', icon: '🕊️' },
  { num: 8, title: 'Handwritten Letter', icon: '📜' },
  { num: 9, title: 'The Grand Finale', icon: '🎆' },
];

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  totalPages,
  onPageSelect,
  isDarkMode,
  onToggleTheme,
  onOpenSettings,
  onOpenShare,
  onOpenPrintCard,
  onOpenFireworks,
  name,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const currentPageObj = PAGE_NAMES.find((p) => p.num === currentPage) || PAGE_NAMES[0];
  const progressPercent = (currentPage / totalPages) * 100;

  const toggleMusic = () => {
    const nextState = soundService.toggleMusic();
    setIsPlaying(nextState);
  };

  const toggleMute = () => {
    const muted = soundService.toggleMute();
    setIsMuted(muted);
  };

  const goToPrev = () => {
    if (currentPage > 1) {
      soundService.playSparkle();
      onPageSelect(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      soundService.playSparkle();
      onPageSelect(currentPage + 1);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full no-print">
      {/* Top Progress bar */}
      <div className="w-full h-1 bg-pink-950/40">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Main Navbar */}
      <div className="px-3 sm:px-6 py-2.5 sm:py-3 bg-black/75 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-pink-500/20 text-white flex items-center justify-between shadow-lg">
        {/* Logo / Brand with Bestie Name */}
        <div
          onClick={() => onPageSelect(1)}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-600/30 group-hover:scale-105 transition-transform">
            <Heart size={16} className="fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-black text-sm sm:text-base tracking-wide bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text text-transparent">
              {name}'s Birthday
            </span>
            <span className="text-[10px] text-pink-400/90 font-mono hidden sm:inline">
              26 Nov • Soul Sister Edition
            </span>
          </div>
        </div>

        {/* Center: Current Page Badge & Room Selector */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-pink-500/15 hover:bg-pink-500/25 border border-pink-400/30 text-xs sm:text-sm font-semibold text-pink-200 transition-all cursor-pointer shadow-sm"
          >
            <span>{currentPageObj.icon}</span>
            <span className="font-bold text-white">
              {currentPage}/{totalPages}
            </span>
            <span className="hidden md:inline text-pink-200">{currentPageObj.title}</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu of All 9 Rooms */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-72 sm:w-80 rounded-3xl bg-neutral-900 border border-pink-500/40 p-2 shadow-2xl backdrop-blur-xl z-50 max-h-[80vh] overflow-y-auto"
              >
                <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-800">
                  Select A Celebration Room
                </div>
                <div className="space-y-1 mt-1">
                  {PAGE_NAMES.map((page) => (
                    <button
                      key={page.num}
                      onClick={() => {
                        soundService.playSparkle();
                        onPageSelect(page.num);
                        setMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                        currentPage === page.num
                          ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold shadow-md'
                          : 'text-neutral-300 hover:bg-white/5 hover:text-pink-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{page.icon}</span>
                        <span>{page.title}</span>
                      </div>
                      <span className="text-[11px] opacity-60 font-mono">0{page.num}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Tools Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Ambient Music Toggle */}
          <button
            onClick={toggleMusic}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isPlaying
                ? 'bg-pink-600 text-white shadow-md shadow-pink-600/40 animate-pulse'
                : 'bg-white/5 hover:bg-white/10 text-neutral-300'
            }`}
            title={isPlaying ? 'Pause Background Melody' : 'Play Background Melody'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
          </button>

          {/* Mute Toggle */}
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 flex items-center justify-center transition-all cursor-pointer"
            title={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? <VolumeX size={14} className="text-rose-400" /> : <Volume2 size={14} />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 flex items-center justify-center transition-all cursor-pointer"
            title={isDarkMode ? 'Switch to Soft Rose Theme' : 'Switch to Obsidian Dark Theme'}
          >
            {isDarkMode ? <Sun size={14} className="text-amber-300" /> : <Moon size={14} />}
          </button>

          {/* Canvas Fireworks Sky Trigger */}
          <button
            onClick={onOpenFireworks}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-pink-600/30 via-rose-500/30 to-amber-500/30 hover:from-pink-600/50 hover:to-amber-500/50 text-pink-200 border border-pink-400/40 text-xs font-bold transition-all shadow-md cursor-pointer animate-pulse"
            title="Launch Canvas Fireworks Sky Show"
          >
            <span>🎆</span>
            <span className="hidden sm:inline">Fireworks Sky</span>
          </button>

          {/* Settings / Personalize Modal */}
          <button
            onClick={onOpenSettings}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            title="Personalize Bestie Name & Date"
          >
            <Settings size={14} />
          </button>

          {/* Share Modal */}
          <button
            onClick={onOpenShare}
            className="w-8 h-8 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 flex items-center justify-center transition-all cursor-pointer"
            title="Share Surprise with Shagun"
          >
            <Share2 size={14} />
          </button>

          {/* Printable Card */}
          <button
            onClick={onOpenPrintCard}
            className="hidden sm:flex w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white items-center justify-center transition-all cursor-pointer"
            title="Print Keepsake Card"
          >
            <Printer size={14} />
          </button>
        </div>
      </div>

      {/* Floating Bottom Navigation for Mobile (Previous / Next Buttons) */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 flex items-center gap-3 bg-black/80 dark:bg-zinc-950/80 backdrop-blur-xl px-4 py-2 rounded-full border border-pink-500/30 shadow-2xl">
        <button
          onClick={goToPrev}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            currentPage === 1
              ? 'opacity-40 cursor-not-allowed text-neutral-500'
              : 'text-neutral-200 hover:text-white hover:bg-white/10'
          }`}
        >
          <ChevronLeft size={16} />
          <span>Prev</span>
        </button>

        <span className="text-xs font-bold text-pink-300 px-2 font-mono">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            currentPage === totalPages
              ? 'opacity-40 cursor-not-allowed text-neutral-500'
              : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md hover:from-pink-400 hover:to-rose-400'
          }`}
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </header>
  );
};
