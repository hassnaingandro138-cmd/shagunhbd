import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload,
  Plus,
  Trash2,
  Heart,
  Video,
  X,
  Calendar,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { MemoryItem } from '../data/defaultContent.ts';
import { saveMediaItem, getMediaItem, deleteMediaItem } from '../utils/indexedDb.ts';
import { soundService } from '../utils/soundService.ts';

const SAMPLE_PLACEHOLDERS: MemoryItem[] = [
  {
    id: 'sample-1',
    title: 'Example: Our Unfiltered Laughs',
    date: '2025-08-14',
    caption: 'Sample photo placeholder — click "Add Memory" to replace with your real picture of you and Shagun!',
    type: 'photo',
    isPlaceholder: true,
    isFavorite: true,
    category: 'silly',
  },
  {
    id: 'sample-2',
    title: 'Example: Sunset Talks & Chai',
    date: '2025-10-02',
    caption: 'Sample memory placeholder — click to edit or upload your real pictures & videos together!',
    type: 'photo',
    isPlaceholder: true,
    isFavorite: false,
    category: 'celebration',
  },
];

export const Page3Memories: React.FC<{ name: string }> = ({ name }) => {
  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('shagun_memories_meta');
      if (saved) return JSON.parse(saved);
    } catch {}
    return SAMPLE_PLACEHOLDERS;
  });

  const [filter, setFilter] = useState<'all' | 'photo' | 'video' | 'favorite'>('all');
  const [loadedUrls, setLoadedUrls] = useState<Record<string, string>>({});
  const [activeLightbox, setActiveLightbox] = useState<MemoryItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formCaption, setFormCaption] = useState('');
  const [formCategory, setFormCategory] = useState<'trip' | 'silly' | 'celebration' | 'milestone'>('celebration');
  const [formFile, setFormFile] = useState<File | null>(null);
  const [formFilePreview, setFormFilePreview] = useState<string | null>(null);
  const [formFileType, setFormFileType] = useState<'photo' | 'video'>('photo');
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync metadata to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shagun_memories_meta', JSON.stringify(memories));
    } catch {}
  }, [memories]);

  // Load binary images/videos from IndexedDB for real uploaded memories
  useEffect(() => {
    memories.forEach(async (m) => {
      if (!m.isPlaceholder && !loadedUrls[m.id]) {
        const url = await getMediaItem(m.id);
        if (url) {
          setLoadedUrls((prev) => ({ ...prev, [m.id]: url }));
        }
      }
    });
  }, [memories, loadedUrls]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 30MB for safety in browser
    if (file.size > 30 * 1024 * 1024) {
      setUploadError('File size is over 30MB. Please choose a smaller photo or short video.');
      return;
    }

    setUploadError(null);
    setFormFile(file);
    const isVid = file.type.startsWith('video');
    setFormFileType(isVid ? 'video' : 'photo');

    const reader = new FileReader();
    reader.onload = () => {
      setFormFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setUploadError('Please give this memory a title!');
      return;
    }

    soundService.playSparkle();
    const newId = `memory-${Date.now()}`;

    let dataUrl = formFilePreview;

    if (formFile && dataUrl) {
      await saveMediaItem(newId, dataUrl);
      setLoadedUrls((prev) => ({ ...prev, [newId]: dataUrl! }));
    }

    const newMemory: MemoryItem = {
      id: newId,
      title: formTitle.trim(),
      date: formDate || new Date().toISOString().split('T')[0],
      caption: formCaption.trim() || 'A precious memory with my bestie!',
      type: formFileType,
      isPlaceholder: !formFile,
      isFavorite: false,
      category: formCategory,
    };

    setMemories((prev) => [newMemory, ...prev]);

    // Reset form
    setFormTitle('');
    setFormDate('');
    setFormCaption('');
    setFormFile(null);
    setFormFilePreview(null);
    setUploadError(null);
    setIsAddModalOpen(false);
  };

  const handleDeleteMemory = async (id: string) => {
    soundService.playSparkle();
    await deleteMediaItem(id);
    setMemories((prev) => prev.filter((m) => m.id !== id));
    setDeleteConfirmId(null);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playSparkle();
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isFavorite: !m.isFavorite } : m))
    );
  };

  const filteredMemories = memories.filter((m) => {
    if (filter === 'photo') return m.type === 'photo';
    if (filter === 'video') return m.type === 'video';
    if (filter === 'favorite') return m.isFavorite;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles size={14} />
            <span>Memories Sanctuary</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-white">
            Moments With {name}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1">
            Store your real photos and videos safely. Upload your favourite pictures from your phone or PC!
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-full font-bold text-sm bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white shadow-lg hover:shadow-pink-500/30 flex items-center gap-2 cursor-pointer transition-all self-start md:self-auto"
        >
          <Plus size={16} />
          <span>Upload Real Photo / Video</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'all', label: 'All Moments' },
          { key: 'photo', label: '📷 Photos Only' },
          { key: 'video', label: '🎥 Videos Only' },
          { key: 'favorite', label: '💖 Favorites' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === tab.key
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredMemories.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-neutral-900/40 border border-neutral-800 p-8">
          <div className="text-4xl mb-3">📸</div>
          <h4 className="text-lg font-bold text-neutral-200">No memories in this view yet!</h4>
          <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
            Click the "Upload Real Photo / Video" button above to preserve your genuine friendship memories!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMemories.map((m) => {
            const mediaSrc = loadedUrls[m.id];

            return (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative rounded-3xl overflow-hidden bg-neutral-900 border border-pink-500/20 shadow-xl flex flex-col transition-all hover:border-pink-500/50"
              >
                {/* Media Container */}
                <div
                  className="relative aspect-4/3 w-full bg-neutral-950 flex items-center justify-center overflow-hidden cursor-pointer"
                  onClick={() => setActiveLightbox(m)}
                >
                  {m.type === 'video' && mediaSrc ? (
                    <video
                      src={mediaSrc}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                      onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                    />
                  ) : mediaSrc ? (
                    <img
                      src={mediaSrc}
                      alt={m.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* Beautiful Artistic SVG Placeholder with notice */
                    <div className="w-full h-full bg-gradient-to-br from-pink-950/60 via-purple-950/50 to-neutral-950 flex flex-col items-center justify-center p-6 text-center border-b border-pink-500/20">
                      <div className="w-14 h-14 rounded-2xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-2xl mb-2 text-pink-300">
                        {m.type === 'video' ? '🎬' : '🌸'}
                      </div>
                      <span className="text-xs font-semibold text-pink-200">
                        {m.isPlaceholder ? 'Sample Memory Placeholder' : 'Custom Memory Note'}
                      </span>
                      <span className="text-[10px] text-neutral-400 mt-1 max-w-[200px]">
                        Click to view full note or upload your genuine photo!
                      </span>
                    </div>
                  )}

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
                    {m.isPlaceholder && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/80 text-black">
                        Example
                      </span>
                    )}
                    {m.type === 'video' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 text-white flex items-center gap-1">
                        <Video size={10} />
                        Video
                      </span>
                    )}
                  </div>

                  {/* Favorite Toggle Button */}
                  <button
                    onClick={(e) => toggleFavorite(m.id, e)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur text-white flex items-center justify-center transition-all cursor-pointer"
                    title={m.isFavorite ? 'Unfavorite' : 'Mark as favorite'}
                  >
                    <Heart
                      size={15}
                      className={m.isFavorite ? 'text-pink-500 fill-pink-500' : 'text-white'}
                    />
                  </button>
                </div>

                {/* Card Info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-pink-400 mb-1">
                      <Calendar size={12} />
                      <span>{m.date}</span>
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-white line-clamp-1">
                      {m.title}
                    </h4>
                    <p className="text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
                      {m.caption}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <button
                      onClick={() => setActiveLightbox(m)}
                      className="text-xs font-semibold text-pink-400 hover:text-pink-300 cursor-pointer"
                    >
                      View Details & Media →
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(m.id)}
                      className="text-neutral-500 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                      title="Delete this memory"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-3xl rounded-3xl bg-neutral-900 border border-neutral-700 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    {activeLightbox.title}
                  </h3>
                  <span className="text-xs text-pink-400">{activeLightbox.date}</span>
                </div>
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Media Display */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] overflow-hidden">
                {loadedUrls[activeLightbox.id] ? (
                  activeLightbox.type === 'video' ? (
                    <video
                      src={loadedUrls[activeLightbox.id]}
                      controls
                      autoPlay
                      className="max-h-[60vh] max-w-full"
                    />
                  ) : (
                    <img
                      src={loadedUrls[activeLightbox.id]}
                      alt={activeLightbox.title}
                      className="max-h-[60vh] max-w-full object-contain"
                    />
                  )
                ) : (
                  <div className="p-8 text-center">
                    <span className="text-5xl mb-2">📸</span>
                    <p className="text-sm font-semibold text-pink-200 mt-2">
                      {activeLightbox.isPlaceholder
                        ? 'Sample Memory Placeholder'
                        : 'No file attached to this entry'}
                    </p>
                    <p className="text-xs text-neutral-400 max-w-md mx-auto mt-1">
                      You can replace this anytime by clicking "Upload Real Photo / Video" with
                      your favourite photo or short video clip with Shagun!
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-neutral-900 border-t border-neutral-800">
                <p className="text-sm text-neutral-200">{activeLightbox.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm rounded-3xl bg-neutral-900 border border-rose-500/40 p-6 text-center text-white shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 mx-auto mb-3 flex items-center justify-center text-2xl">
                <AlertTriangle size={24} />
              </div>
              <h4 className="font-bold text-lg mb-1">Delete this memory?</h4>
              <p className="text-xs text-neutral-400 mb-5">
                Are you sure you want to remove this photo/video memory? This action cannot be
                undone.
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteMemory(deleteConfirmId)}
                  className="px-5 py-2 rounded-full text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white cursor-pointer"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload Memory Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-lg rounded-3xl bg-neutral-900 border border-pink-500/40 p-6 text-white shadow-2xl my-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif font-bold text-xl text-pink-300 flex items-center gap-2">
                  <Upload size={20} />
                  <span>Upload Real Bestie Memory</span>
                </h4>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-neutral-400 hover:text-white text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveMemory} className="space-y-4">
                {/* File picker */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Select Photo or Video (from PC or Phone)
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer border-2 border-dashed border-pink-500/40 rounded-2xl p-4 text-center hover:bg-pink-950/20 transition-all flex flex-col items-center justify-center"
                  >
                    {formFilePreview ? (
                      <div className="w-full">
                        {formFileType === 'video' ? (
                          <div className="text-xs text-pink-300 font-semibold">
                            🎥 Video selected: {formFile?.name}
                          </div>
                        ) : (
                          <img
                            src={formFilePreview}
                            alt="preview"
                            className="max-h-36 mx-auto rounded-lg object-contain"
                          />
                        )}
                        <span className="text-[11px] text-pink-400 underline block mt-2">
                          Click to choose a different file
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload size={28} className="text-pink-400 mb-1" />
                        <span className="text-xs font-semibold text-pink-200">
                          Click here to browse your files
                        </span>
                        <span className="text-[10px] text-neutral-400 mt-0.5">
                          Supports JPG, PNG, WEBP, MP4, MOV (up to 30MB)
                        </span>
                      </>
                    )}
                  </div>
                  {uploadError && (
                    <p className="text-xs text-rose-400 mt-1 font-semibold">{uploadError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Memory Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Our Unforgettable Coffee Date"
                    className="w-full rounded-xl bg-black/60 border border-neutral-700 px-3.5 py-2 text-sm text-pink-100 placeholder:text-neutral-500 focus:outline-hidden focus:border-pink-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">Date</label>
                    <input
                      type="date"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full rounded-xl bg-black/60 border border-neutral-700 px-3 py-2 text-xs text-pink-100 focus:outline-hidden focus:border-pink-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Category
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                      className="w-full rounded-xl bg-black/60 border border-neutral-700 px-3 py-2 text-xs text-pink-100 focus:outline-hidden focus:border-pink-400"
                    >
                      <option value="celebration">Celebration</option>
                      <option value="silly">Silly & Chaos</option>
                      <option value="trip">Trips & Hangouts</option>
                      <option value="milestone">Life Milestone</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Caption / Inside Story
                  </label>
                  <textarea
                    rows={3}
                    value={formCaption}
                    onChange={(e) => setFormCaption(e.target.value)}
                    placeholder="Write a sweet story, inside joke, or feeling about this moment..."
                    className="w-full rounded-xl bg-black/60 border border-neutral-700 px-3.5 py-2 text-sm text-pink-100 placeholder:text-neutral-500 focus:outline-hidden focus:border-pink-400"
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
                    className="px-6 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:from-pink-400 hover:to-rose-400 cursor-pointer"
                  >
                    Save Memory 💖
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
