import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Plus,
  Trash2,
  Music,
  Heart,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { INITIAL_PLAYLIST, SongItem } from '../data/defaultContent.ts';
import { soundService } from '../utils/soundService.ts';

const STORAGE_KEY = 'shagun_friendship_playlist_v1';

export const FriendshipPlaylist: React.FC<{
  compact?: boolean;
  className?: string;
}> = ({ compact = false, className = '' }) => {
  const [playlist, setPlaylist] = useState<SongItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PLAYLIST;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(playlist));
    } catch {}
  }, [playlist]);

  const currentSong = playlist[currentIndex] || playlist[0];

  const handleTogglePlay = () => {
    const nextState = soundService.toggleMusic();
    setIsPlaying(nextState);
  };

  const handleNext = () => {
    soundService.playSparkle();
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    soundService.playSparkle();
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const handleToggleMute = () => {
    const muted = soundService.toggleMute();
    setIsMuted(muted);
  };

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newArtist.trim()) return;

    soundService.playSparkle();
    const newSong: SongItem = {
      id: `custom-song-${Date.now()}`,
      title: newTitle.trim(),
      artist: newArtist.trim(),
      duration: '3:30',
      note: newNote.trim() || 'A special melody dedicated to our friendship moments!',
    };

    setPlaylist((prev) => [...prev, newSong]);
    setNewTitle('');
    setNewArtist('');
    setNewNote('');
    setIsAddModalOpen(false);
  };

  const handleDeleteSong = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (playlist.length <= 1) return;
    setPlaylist((prev) => prev.filter((s) => s.id !== id));
    if (currentIndex >= playlist.length - 1) {
      setCurrentIndex(0);
    }
  };

  if (compact) {
    return (
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 dark:bg-zinc-900/80 border border-pink-500/30 backdrop-blur-md shadow-lg ${className}`}
      >
        <button
          onClick={handleTogglePlay}
          className="w-8 h-8 rounded-full bg-pink-500 hover:bg-pink-400 text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow"
          title={isPlaying ? 'Pause Friendship Melody' : 'Play Friendship Melody'}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
        </button>

        <div className="hidden sm:flex flex-col max-w-[120px] md:max-w-[150px]">
          <span className="text-xs font-semibold text-pink-200 truncate">
            {currentSong?.title}
          </span>
          <span className="text-[10px] text-neutral-400 truncate">{currentSong?.artist}</span>
        </div>

        <button
          onClick={handleNext}
          className="text-neutral-400 hover:text-pink-300 p-1 cursor-pointer"
          title="Next Song"
        >
          <SkipForward size={14} />
        </button>

        <button
          onClick={handleToggleMute}
          className="text-neutral-400 hover:text-pink-300 p-1 cursor-pointer"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={14} className="text-rose-400" /> : <Volume2 size={14} />}
        </button>
      </div>
    );
  }

  return (
    <div
      className={`rounded-3xl p-6 bg-gradient-to-br from-neutral-900/90 via-pink-950/30 to-neutral-900/90 border border-pink-500/30 backdrop-blur-xl shadow-2xl ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center text-white shadow-lg shadow-pink-600/30">
            <Music size={20} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-pink-100 flex items-center gap-2">
              <span>Shagun & Me: Friendship Playlist</span>
              <Heart size={14} className="text-pink-400 fill-pink-400 animate-pulse" />
            </h3>
            <p className="text-xs text-neutral-400">
              The soundtrack to our laughs, late nights & memories
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-400/30 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus size={14} />
          <span>Add Song</span>
        </button>
      </div>

      {/* Currently Playing Card */}
      <div className="relative p-5 rounded-2xl bg-black/40 border border-pink-500/20 mb-6 flex flex-col md:flex-row items-center gap-5">
        {/* Animated Vinyl Record */}
        <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-zinc-800 via-black to-zinc-900 border-4 border-zinc-700 shadow-xl flex items-center justify-center"
          >
            {/* Vinyl Grooves */}
            <div className="w-18 h-18 rounded-full border border-zinc-700/60 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border border-zinc-700/60 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center shadow-inner">
                  <div className="w-2 h-2 rounded-full bg-white shadow-xs" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sound wave bars indicator when playing */}
          {isPlaying && (
            <div className="absolute -bottom-2 flex items-end gap-1 h-4">
              {[0.4, 0.8, 1, 0.6, 0.9, 0.5].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: ['4px', `${14 * h}px`, '4px'] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1 bg-pink-400 rounded-full"
                />
              ))}
            </div>
          )}
        </div>

        {/* Song Info & Controls */}
        <div className="flex-1 w-full text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 mb-1">
            <h4 className="font-bold text-base md:text-lg text-white">{currentSong?.title}</h4>
            <span className="text-xs font-medium text-pink-400">{currentSong?.duration}</span>
          </div>
          <p className="text-xs text-pink-200/80 mb-2 font-medium">{currentSong?.artist}</p>
          <p className="text-xs text-neutral-400 italic bg-white/5 p-2 rounded-lg border border-white/5">
            "{currentSong?.note}"
          </p>

          {/* Playback Buttons */}
          <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
            <button
              onClick={handlePrev}
              className="text-neutral-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all cursor-pointer"
              title="Previous Track"
            >
              <SkipBack size={18} />
            </button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleTogglePlay}
              className="w-11 h-11 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 cursor-pointer"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </motion.button>

            <button
              onClick={handleNext}
              className="text-neutral-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all cursor-pointer"
              title="Next Track"
            >
              <SkipForward size={18} />
            </button>

            <button
              onClick={handleToggleMute}
              className="text-neutral-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all cursor-pointer ml-auto"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={18} className="text-rose-400" /> : <Volume2 size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Playlist List */}
      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {playlist.map((song, idx) => {
          const isCurrent = idx === currentIndex;
          return (
            <div
              key={song.id}
              onClick={() => {
                setCurrentIndex(idx);
                if (!isPlaying) {
                  soundService.playMusic();
                  setIsPlaying(true);
                }
              }}
              className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer group ${
                isCurrent
                  ? 'bg-pink-600/20 border border-pink-500/40 text-pink-100 shadow-sm'
                  : 'bg-black/20 hover:bg-pink-900/20 border border-transparent hover:border-pink-500/20 text-neutral-300'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <span className="w-5 text-center text-xs font-mono text-neutral-500">
                  {isCurrent && isPlaying ? '▶' : idx + 1}
                </span>
                <div className="truncate">
                  <div
                    className={`text-sm font-semibold truncate ${
                      isCurrent ? 'text-pink-300 font-bold' : ''
                    }`}
                  >
                    {song.title}
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate">{song.artist}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-neutral-500">{song.duration}</span>
                {playlist.length > 1 && (
                  <button
                    onClick={(e) => handleDeleteSong(song.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-neutral-500 hover:text-rose-400 transition-opacity cursor-pointer"
                    title="Remove from playlist"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Song Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md rounded-3xl bg-neutral-900 border border-pink-500/40 p-6 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif font-bold text-lg text-pink-300 flex items-center gap-2">
                  <Music size={18} />
                  <span>Add A Song For Shagun</span>
                </h4>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-neutral-400 hover:text-white text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddSong} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Song Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Dil Chahta Hai"
                    className="w-full rounded-xl bg-black/50 border border-neutral-700 px-3.5 py-2 text-sm text-pink-100 placeholder:text-neutral-500 focus:outline-hidden focus:border-pink-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Artist *</label>
                  <input
                    type="text"
                    required
                    value={newArtist}
                    onChange={(e) => setNewArtist(e.target.value)}
                    placeholder="e.g. Shankar-Ehsaan-Loy"
                    className="w-full rounded-xl bg-black/50 border border-neutral-700 px-3.5 py-2 text-sm text-pink-100 placeholder:text-neutral-500 focus:outline-hidden focus:border-pink-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Why does this song remind you of Shagun?
                  </label>
                  <textarea
                    rows={2}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="e.g. We sang this together on the car ride back home!"
                    className="w-full rounded-xl bg-black/50 border border-neutral-700 px-3.5 py-2 text-sm text-pink-100 placeholder:text-neutral-500 focus:outline-hidden focus:border-pink-400"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-full text-xs text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow hover:from-pink-400 hover:to-rose-400 cursor-pointer"
                  >
                    Add To Playlist
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
