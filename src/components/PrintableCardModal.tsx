import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Printer, X, Sparkles, Heart } from 'lucide-react';
import { soundService } from '../utils/soundService.ts';

interface PrintableCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  senderName: string;
  displayDate: string;
}

export const PrintableCardModal: React.FC<PrintableCardModalProps> = ({
  isOpen,
  onClose,
  name,
  senderName,
  displayDate,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundService.playSparkle();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-xl rounded-3xl bg-neutral-900 border border-pink-500/40 p-6 text-white shadow-2xl my-8"
      >
        <div className="flex items-center justify-between mb-4 no-print">
          <h4 className="font-serif font-bold text-lg text-pink-300 flex items-center gap-2">
            <Sparkles size={18} />
            <span>Printable Keepsake Card for {name}</span>
          </h4>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-xl cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Printable Card Container */}
        <div
          id="printable-birthday-card"
          className="rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-rose-50 via-white to-pink-50 text-neutral-900 border-4 border-pink-300 shadow-2xl text-center relative overflow-hidden"
        >
          {/* Decorative Corner Filigree */}
          <div className="absolute top-3 left-3 text-2xl text-pink-400">🌸</div>
          <div className="absolute top-3 right-3 text-2xl text-pink-400">🌸</div>
          <div className="absolute bottom-3 left-3 text-2xl text-pink-400">🌸</div>
          <div className="absolute bottom-3 right-3 text-2xl text-pink-400">🌸</div>

          <div className="text-4xl mb-2 animate-bounce">🎂</div>
          <div className="text-xs font-serif uppercase tracking-widest text-rose-600 font-bold mb-1">
            Official Birthday Keepsake • {displayDate}
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-neutral-900 mb-4">
            Happy Birthday, {name}!
          </h2>

          <p className="font-handwriting text-2xl sm:text-3xl text-neutral-800 leading-relaxed max-w-md mx-auto mb-6">
            "To the girl who brings boundless sunshine, endless laughter, and unwavering loyalty
            wherever she goes. May your life be as radiant and extraordinary as your heart!"
          </p>

          <div className="my-6 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-rose-100 text-rose-900 text-xs font-bold border border-rose-300">
            <Heart size={14} className="fill-rose-600 text-rose-600" />
            <span>Lifetime Partner in Crime Certification</span>
          </div>

          <div className="mt-8 pt-6 border-t border-pink-200 flex justify-between items-end px-4">
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                Presented On
              </span>
              <span className="text-xs font-bold text-neutral-800">{displayDate}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                With All My Love
              </span>
              <span className="font-handwriting text-2xl text-rose-700 font-bold block">
                {senderName}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-semibold text-neutral-400 hover:text-white cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:from-pink-400 hover:to-rose-400 flex items-center gap-1.5 cursor-pointer"
          >
            <Printer size={15} />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
