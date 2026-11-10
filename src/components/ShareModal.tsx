import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Copy, Check, Info } from 'lucide-react';
import { soundService } from '../utils/soundService.ts';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, name }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareMessage = `🎂 Happy Birthday to my dearest bestie ${name}! I built a whole digital birthday surprise world with our memories, cakes, games, and letters just for you: ${currentUrl} 💖`;

  const handleShareNative = async () => {
    soundService.playSparkle();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Birthday ${name}! 🎂 Bestie Surprise`,
          text: `A digital celebration sanctuary built with love for ${name}!`,
          url: currentUrl,
        });
      } catch {}
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    soundService.playSparkle();
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyMessage = () => {
    soundService.playSparkle();
    navigator.clipboard.writeText(shareMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

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
            <Share2 size={18} />
            <span>Share Website With {name}</span>
          </h4>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
          Send this surprise link directly to Shagun on WhatsApp, Instagram, or iMessage so she can
          experience her 9-room celebration!
        </p>

        {/* Web Share Button */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleShareNative}
            className="w-full mb-3 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:from-pink-400 hover:to-rose-400 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Share2 size={16} />
            <span>Open System Share Menu (WhatsApp / Instagram)</span>
          </button>
        )}

        {/* Copy Link Row */}
        <div className="mb-3">
          <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
            Website Link:
          </label>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-black/50 border border-neutral-700">
            <span className="text-xs text-pink-200 truncate flex-1 font-mono">{currentUrl}</span>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-pink-300 flex items-center gap-1 cursor-pointer shrink-0"
            >
              {copiedLink ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Copy Ready-Made Birthday Wish Text */}
        <div className="mb-4">
          <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
            Ready-Made WhatsApp Invitation Message:
          </label>
          <div className="p-3 rounded-xl bg-black/40 border border-neutral-800 text-xs text-neutral-300 italic mb-2">
            "{shareMessage}"
          </div>
          <button
            onClick={handleCopyMessage}
            className="w-full py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copiedMessage ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            <span>{copiedMessage ? 'Message Copied!' : 'Copy Birthday Wish Message'}</span>
          </button>
        </div>

        {/* Note on localStorage persistence */}
        <div className="p-3 rounded-xl bg-pink-950/30 border border-pink-500/20 text-[11px] text-pink-300/80 flex items-start gap-2">
          <Info size={14} className="shrink-0 mt-0.5 text-pink-400" />
          <span>
            <strong>Note:</strong> Photos & videos uploaded on this browser are stored safely in
            your local device storage. When deployed to a public web address, Shagun will see the
            entire interactive experience and default memories seamlessly!
          </span>
        </div>
      </motion.div>
    </div>
  );
};
