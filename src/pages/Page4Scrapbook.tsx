import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Plus, Trash2, Edit3, Sparkles, Heart } from 'lucide-react';
import { INITIAL_SCRAPBOOK, ScrapbookCard } from '../data/defaultContent.ts';
import { soundService } from '../utils/soundService.ts';

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  emoji: string;
}

const DEFAULT_TIMELINE: TimelineEvent[] = [
  {
    id: 't1',
    year: 'Chapter 1',
    title: 'How Destiny Introduced Us',
    description: 'We started as strangers, but one conversation was all it took for our souls to recognize each other. Instant bestie connection!',
    emoji: '✨',
  },
  {
    id: 't2',
    year: 'Chapter 2',
    title: 'The First Late-Night Deep Confession',
    description: 'Hours turned into minutes. We shared secrets, fears, dreams, and realizations that neither of us had told anyone else.',
    emoji: '🌙',
  },
  {
    id: 't3',
    year: 'Chapter 3',
    title: 'Certified Partners in Crime',
    description: 'From laughing till we cried over stupid things to standing by each other through emotional days, we became invincible.',
    emoji: '👯‍♀️',
  },
  {
    id: 't4',
    year: 'Today',
    title: 'Celebrating Shagun’s Golden Birthday',
    description: '26 November — Celebrating the queen of my heart, thanking the universe for her existence, and promising forever.',
    emoji: '🎂',
  },
];

export const Page4Scrapbook: React.FC<{ name: string }> = ({ name }) => {
  const [cards, setCards] = useState<ScrapbookCard[]>(() => {
    try {
      const saved = localStorage.getItem('shagun_scrapbook_cards');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_SCRAPBOOK;
  });

  const [timeline, setTimeline] = useState<TimelineEvent[]>(() => {
    try {
      const saved = localStorage.getItem('shagun_timeline_events');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_TIMELINE;
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'reason' | 'reminds_me' | 'favorite_thing' | 'story'>('all');
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [isAddTimelineModalOpen, setIsAddTimelineModalOpen] = useState(false);

  // Note form state
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteCategory, setNoteCategory] = useState<'reason' | 'reminds_me' | 'favorite_thing' | 'story'>('reason');
  const [noteSticker, setNoteSticker] = useState('💖');

  // Timeline form state
  const [tYear, setTYear] = useState('');
  const [tTitle, setTTitle] = useState('');
  const [tDesc, setTDesc] = useState('');
  const [tEmoji, setTEmoji] = useState('🌟');

  // Sync cards
  useEffect(() => {
    try {
      localStorage.setItem('shagun_scrapbook_cards', JSON.stringify(cards));
    } catch {}
  }, [cards]);

  // Sync timeline
  useEffect(() => {
    try {
      localStorage.setItem('shagun_timeline_events', JSON.stringify(timeline));
    } catch {}
  }, [timeline]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;

    soundService.playSparkle();
    const newCard: ScrapbookCard = {
      id: `scrapbook-${Date.now()}`,
      category: noteCategory,
      title: noteTitle.trim(),
      content: noteContent.trim(),
      sticker: noteSticker || '🌸',
      date: 'Added with Love',
      color: 'from-pink-500/20 to-rose-500/20',
    };

    setCards((prev) => [newCard, ...prev]);
    setNoteTitle('');
    setNoteContent('');
    setIsAddNoteModalOpen(false);
  };

  const handleDeleteCard = (id: string) => {
    soundService.playSparkle();
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddTimeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tTitle.trim() || !tDesc.trim()) return;

    soundService.playSparkle();
    const newEvent: TimelineEvent = {
      id: `timeline-${Date.now()}`,
      year: tYear.trim() || 'Special Memory',
      title: tTitle.trim(),
      description: tDesc.trim(),
      emoji: tEmoji || '✨',
    };

    setTimeline((prev) => [...prev, newEvent]);
    setTYear('');
    setTTitle('');
    setTDesc('');
    setIsAddTimelineModalOpen(false);
  };

  const handleDeleteTimeline = (id: string) => {
    soundService.playSparkle();
    setTimeline((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredCards = cards.filter((c) => {
    if (activeCategory === 'all') return true;
    return c.category === activeCategory;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <BookOpen size={14} />
          <span>Our Friendship Scrapbook</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text">
          The Story of {name} & Me
        </h2>
        <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-xl mx-auto">
          Every note, ticket stub, secret laugh, and reason why you are my favourite person in the
          universe.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setIsAddNoteModalOpen(true)}
            className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:from-pink-400 hover:to-rose-400 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Plus size={16} />
            <span>Add Scrapbook Note</span>
          </button>
          <button
            onClick={() => setIsAddTimelineModalOpen(true)}
            className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-neutral-800 hover:bg-neutral-700 text-pink-200 border border-pink-500/30 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Sparkles size={16} />
            <span>Add Story Chapter</span>
          </button>
        </div>
      </div>

      {/* Friendship Timeline Section */}
      <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-pink-500/30 backdrop-blur-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-pink-200 flex items-center gap-2">
            <span>Our Journey Milestones</span>
            <span className="text-xl">🌸</span>
          </h3>
          <span className="text-xs text-neutral-400">Chapters Written Together</span>
        </div>

        <div className="relative border-l-2 border-pink-500/40 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
          {timeline.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Node Dot */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center text-xs sm:text-sm text-white shadow-[0_0_12px_rgba(244,63,94,0.6)]">
                {event.emoji}
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-neutral-800 group-hover:border-pink-500/40 transition-all">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-pink-400">{event.year}</span>
                  {timeline.length > 1 && (
                    <button
                      onClick={() => handleDeleteTimeline(event.id)}
                      className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-rose-400 p-1 cursor-pointer transition-opacity"
                      title="Remove milestone"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
                <h4 className="font-bold text-base sm:text-lg text-white">{event.title}</h4>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scrapbook Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {[
          { key: 'all', label: 'All Notes & Doodles' },
          { key: 'reason', label: '💎 Reasons You Are Special' },
          { key: 'reminds_me', label: '🌸 Things That Remind Me Of You' },
          { key: 'favorite_thing', label: '⚡ Favourite Thing About Us' },
          { key: 'story', label: '📖 Funny & Sweet Stories' },
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

      {/* Scrapbook Cards Grid (Paper aesthetic with tape sticker & pushpin) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card, idx) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="relative rounded-3xl p-6 bg-gradient-to-br from-neutral-900/90 to-neutral-950 border border-pink-500/25 shadow-xl flex flex-col justify-between group overflow-hidden"
          >
            {/* Scrapbook Tape / Sticker at Top */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-amber-100/30 backdrop-blur-xs border border-white/20 rotate-[-2deg] rounded-xs shadow-xs pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{card.sticker}</span>
                <button
                  onClick={() => handleDeleteCard(card.id)}
                  className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-rose-400 p-1 cursor-pointer transition-opacity"
                  title="Delete note"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <h4 className="font-serif font-bold text-base sm:text-lg text-pink-100 mb-2">
                {card.title}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {card.content}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-pink-400">
              <span className="capitalize">{card.category.replace('_', ' ')}</span>
              <Heart size={12} className="fill-pink-500 text-pink-500" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Scrapbook Note Modal */}
      <AnimatePresence>
        {isAddNoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md rounded-3xl bg-neutral-900 border border-pink-500/40 p-6 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif font-bold text-lg text-pink-300 flex items-center gap-2">
                  <Edit3 size={18} />
                  <span>Add A Scrapbook Note</span>
                </h4>
                <button
                  onClick={() => setIsAddNoteModalOpen(false)}
                  className="text-neutral-400 hover:text-white text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddNote} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Section Category
                  </label>
                  <select
                    value={noteCategory}
                    onChange={(e) => setNoteCategory(e.target.value as any)}
                    className="w-full rounded-xl bg-black/50 border border-neutral-700 px-3 py-2 text-xs text-pink-100 focus:outline-hidden focus:border-pink-400"
                  >
                    <option value="reason">Reason Why You Are Special</option>
                    <option value="reminds_me">Things That Remind Me Of You</option>
                    <option value="favorite_thing">My Favourite Thing About Us</option>
                    <option value="story">Unforgettable Story / Moment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Card Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    placeholder="e.g. Your Infectious Laughter"
                    className="w-full rounded-xl bg-black/50 border border-neutral-700 px-3.5 py-2 text-sm text-pink-100 placeholder:text-neutral-500 focus:outline-hidden focus:border-pink-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Sticker Emoji
                  </label>
                  <div className="flex gap-2">
                    {['💖', '🌸', '⚡', '☕', '😂', '💎', '🌙', '🧸'].map((emoji) => (
                      <button
                        type="button"
                        key={emoji}
                        onClick={() => setNoteSticker(emoji)}
                        className={`w-8 h-8 rounded-lg text-lg flex items-center justify-center cursor-pointer ${
                          noteSticker === emoji
                            ? 'bg-pink-600/40 border border-pink-400'
                            : 'bg-black/30 border border-transparent'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Message / Story *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Write your personal words for Shagun..."
                    className="w-full rounded-xl bg-black/50 border border-neutral-700 px-3.5 py-2 text-sm text-pink-100 placeholder:text-neutral-500 focus:outline-hidden focus:border-pink-400"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddNoteModalOpen(false)}
                    className="px-4 py-2 rounded-full text-xs text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow hover:from-pink-400 hover:to-rose-400 cursor-pointer"
                  >
                    Pin To Scrapbook 📌
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Timeline Milestone Modal */}
      <AnimatePresence>
        {isAddTimelineModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md rounded-3xl bg-neutral-900 border border-pink-500/40 p-6 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif font-bold text-lg text-pink-300 flex items-center gap-2">
                  <Sparkles size={18} />
                  <span>Add A Journey Milestone</span>
                </h4>
                <button
                  onClick={() => setIsAddTimelineModalOpen(false)}
                  className="text-neutral-400 hover:text-white text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddTimeline} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Chapter / Date / Year
                  </label>
                  <input
                    type="text"
                    required
                    value={tYear}
                    onChange={(e) => setTYear(e.target.value)}
                    placeholder="e.g. Summer 2024 or Chapter 4"
                    className="w-full rounded-xl bg-black/50 border border-neutral-700 px-3.5 py-2 text-sm text-pink-100 placeholder:text-neutral-500 focus:outline-hidden focus:border-pink-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Milestone Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={tTitle}
                    onChange={(e) => setTTitle(e.target.value)}
                    placeholder="e.g. The Road Trip We Planned in 5 Minutes"
                    className="w-full rounded-xl bg-black/50 border border-neutral-700 px-3.5 py-2 text-sm text-pink-100 placeholder:text-neutral-500 focus:outline-hidden focus:border-pink-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    What Happened? *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={tDesc}
                    onChange={(e) => setTDesc(e.target.value)}
                    placeholder="Describe what made this milestone unforgettable..."
                    className="w-full rounded-xl bg-black/50 border border-neutral-700 px-3.5 py-2 text-sm text-pink-100 placeholder:text-neutral-500 focus:outline-hidden focus:border-pink-400"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddTimelineModalOpen(false)}
                    className="px-4 py-2 rounded-full text-xs text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow hover:from-pink-400 hover:to-rose-400 cursor-pointer"
                  >
                    Add Chapter 📖
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
