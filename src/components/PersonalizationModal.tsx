import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Save, Check } from 'lucide-react';
import { soundService } from '../utils/soundService.ts';

interface PersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: {
    name: string;
    nickname: string;
    displayDate: string;
    senderName: string;
  };
  onSave: (newConfig: {
    name: string;
    nickname: string;
    displayDate: string;
    senderName: string;
  }) => void;
}

export const PersonalizationModal: React.FC<PersonalizationModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [name, setName] = useState(config.name);
  const [nickname, setNickname] = useState(config.nickname);
  const [displayDate, setDisplayDate] = useState(config.displayDate);
  const [senderName, setSenderName] = useState(config.senderName);
  const [toast, setToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundService.playSparkle();
    onSave({
      name: name.trim() || 'Shagun',
      nickname: nickname.trim() || 'My Soul Sister',
      displayDate: displayDate.trim() || '26 November',
      senderName: senderName.trim() || 'Your Forever Bestie',
    });
    setToast(true);
    setTimeout(() => {
      setToast(false);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md rounded-3xl bg-neutral-900 border border-pink-500/40 p-6 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-serif font-bold text-lg text-pink-300 flex items-center gap-2">
            <Settings size={18} />
            <span>Personalize Celebration Settings</span>
          </h4>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        {toast ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto mb-3 flex items-center justify-center text-2xl">
              <Check size={24} />
            </div>
            <h4 className="text-lg font-bold text-white">Settings Updated!</h4>
            <p className="text-xs text-neutral-300 mt-1">
              The website has been re-tuned for your bestie!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Recipient Bestie's Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-black/50 border border-neutral-700 px-3.5 py-2 text-sm text-pink-100 focus:outline-hidden focus:border-pink-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Her Nickname / Title
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="e.g. Partner in Crime"
                className="w-full rounded-xl bg-black/50 border border-neutral-700 px-3.5 py-2 text-sm text-pink-100 focus:outline-hidden focus:border-pink-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Birthday Date
              </label>
              <input
                type="text"
                value={displayDate}
                onChange={(e) => setDisplayDate(e.target.value)}
                placeholder="e.g. 26 November"
                className="w-full rounded-xl bg-black/50 border border-neutral-700 px-3.5 py-2 text-sm text-pink-100 focus:outline-hidden focus:border-pink-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Your Bestie Signature Name
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Your Partner in Crime"
                className="w-full rounded-xl bg-black/50 border border-neutral-700 px-3.5 py-2 text-sm text-pink-100 focus:outline-hidden focus:border-pink-400"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full text-xs text-neutral-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow hover:from-pink-400 hover:to-rose-400 flex items-center gap-1.5 cursor-pointer"
              >
                <Save size={14} />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
