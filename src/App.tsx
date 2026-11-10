import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation.tsx';
import { InteractiveFlowers } from './components/InteractiveFlowers.tsx';
import { PersonalizationModal } from './components/PersonalizationModal.tsx';
import { ShareModal } from './components/ShareModal.tsx';
import { PrintableCardModal } from './components/PrintableCardModal.tsx';
import { CanvasFireworks } from './components/CanvasFireworks.tsx';
import { Page1Welcome } from './pages/Page1Welcome.tsx';
import { Page2Wishes } from './pages/Page2Wishes.tsx';
import { Page3Memories } from './pages/Page3Memories.tsx';
import { Page4Scrapbook } from './pages/Page4Scrapbook.tsx';
import { Page5FunnyZone } from './pages/Page5FunnyZone.tsx';
import { Page6Poetry } from './pages/Page6Poetry.tsx';
import { Page7Prayers } from './pages/Page7Prayers.tsx';
import { Page8Letter } from './pages/Page8Letter.tsx';
import { Page9Finale } from './pages/Page9Finale.tsx';
import { INITIAL_CONFIG } from './data/defaultContent.ts';
import { soundService } from './utils/soundService.ts';

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('shagun_current_page');
      if (saved) {
        const num = parseInt(saved, 10);
        if (num >= 1 && num <= 9) return num;
      }
    } catch {}
    return 1;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('shagun_theme_dark');
      if (saved !== null) return JSON.parse(saved);
    } catch {}
    return true; // Signature Pink & Black Obsidian default
  });

  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('shagun_birthday_config');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_CONFIG;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPrintCardOpen, setIsPrintCardOpen] = useState(false);
  const [isFireworksModalOpen, setIsFireworksModalOpen] = useState(false);

  // Sync current page
  useEffect(() => {
    try {
      localStorage.setItem('shagun_current_page', currentPage.toString());
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Sync theme
  useEffect(() => {
    try {
      localStorage.setItem('shagun_theme_dark', JSON.stringify(isDarkMode));
    } catch {}
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sync config
  useEffect(() => {
    try {
      localStorage.setItem('shagun_birthday_config', JSON.stringify(config));
    } catch {}
  }, [config]);

  // Keyboard navigation: Left/Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight' && currentPage < 9) {
        soundService.playSparkle();
        setCurrentPage((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        soundService.playSparkle();
        setCurrentPage((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <Page1Welcome
            name={config.name}
            onNavigate={handlePageSelect}
            onOpenFireworks={() => setIsFireworksModalOpen(true)}
          />
        );
      case 2:
        return <Page2Wishes name={config.name} />;
      case 3:
        return <Page3Memories name={config.name} />;
      case 4:
        return <Page4Scrapbook name={config.name} />;
      case 5:
        return <Page5FunnyZone name={config.name} />;
      case 6:
        return <Page6Poetry name={config.name} />;
      case 7:
        return <Page7Prayers name={config.name} />;
      case 8:
        return <Page8Letter name={config.name} />;
      case 9:
        return (
          <Page9Finale
            name={config.name}
            onRestart={() => handlePageSelect(1)}
            onOpenShare={() => setIsShareOpen(true)}
          />
        );
      default:
        return (
          <Page1Welcome
            name={config.name}
            onNavigate={handlePageSelect}
            onOpenFireworks={() => setIsFireworksModalOpen(true)}
          />
        );
    }
  };

  return (
    <div
      className={`min-h-screen relative transition-colors duration-500 font-sans ${
        isDarkMode
          ? 'bg-[#0a050a] text-white selection:bg-pink-500 selection:text-white'
          : 'bg-[#fff5f7] text-neutral-900 selection:bg-pink-400 selection:text-white'
      }`}
    >
      {/* Background Animated Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[120px] transition-opacity duration-1000 ${
            isDarkMode ? 'bg-pink-600/15' : 'bg-pink-300/40'
          }`}
        />
        <div
          className={`absolute top-1/3 -right-40 w-96 h-96 rounded-full blur-[140px] transition-opacity duration-1000 ${
            isDarkMode ? 'bg-purple-700/15' : 'bg-rose-200/50'
          }`}
        />
        <div
          className={`absolute -bottom-40 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] transition-opacity duration-1000 ${
            isDarkMode ? 'bg-rose-600/12' : 'bg-pink-200/45'
          }`}
        />
      </div>

      {/* Falling Rose Petals Layer */}
      <InteractiveFlowers showPetalsBackground={true} />

      {/* Main Top Navigation */}
      <Navigation
        currentPage={currentPage}
        totalPages={9}
        onPageSelect={handlePageSelect}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenPrintCard={() => setIsPrintCardOpen(true)}
        onOpenFireworks={() => setIsFireworksModalOpen(true)}
        name={config.name}
      />

      {/* Active Page View with Motion Slide/Fade Transition */}
      <main className="relative z-20 pb-24 min-h-[85vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Fullscreen Interactive Canvas Fireworks Sky Modal */}
      <CanvasFireworks
        fullScreenModal={true}
        isOpen={isFireworksModalOpen}
        onClose={() => setIsFireworksModalOpen(false)}
        autoLaunch={true}
      />

      {/* Modals */}
      <PersonalizationModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSave={(newCfg) => setConfig(newCfg)}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        name={config.name}
      />

      <PrintableCardModal
        isOpen={isPrintCardOpen}
        onClose={() => setIsPrintCardOpen(false)}
        name={config.name}
        senderName={config.senderName}
        displayDate={config.displayDate}
      />
    </div>
  );
}
