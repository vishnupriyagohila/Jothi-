import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { PageId } from './types';
import { BackgroundEffects } from './components/BackgroundEffects';
import { VideoBackground } from './components/VideoBackground';
import { MusicPlayer } from './components/MusicPlayer';
import { StoryProgress } from './components/StoryProgress';
import { PageOpening } from './components/PageOpening';
import { PageOriginStory } from './components/PageOriginStory';
import { PageFirstDate } from './components/PageFirstDate';
import { InteractiveYesNo } from './components/InteractiveYesNo';
import { PageLoveLetter } from './components/PageLoveLetter';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('opening');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNextFromOpening = () => {
    setCurrentPage('origin');
  };

  const handleNextFromOrigin = () => {
    setCurrentPage('first-date');
  };

  const handleNextFromFirstDate = () => {
    setCurrentPage('interactive');
  };

  const handleYesFromInteractive = () => {
    setCurrentPage('promise');
  };

  const handleRestart = () => {
    setCurrentPage('opening');
  };

  return (
    <div className="relative min-h-screen w-full bg-[#090306] text-rose-50 overflow-x-hidden flex flex-col justify-between selection:bg-rose-900/60 selection:text-rose-100">
      {/* Romantic Ambient Video Background */}
      <VideoBackground />

      {/* Background Animated Ambient Effects & Floating Hearts */}
      <BackgroundEffects />

      {/* Floating Audio / Music Player */}
      <MusicPlayer />

      {/* Story Chapter Progress Indicator */}
      <StoryProgress
        currentPage={currentPage}
        onSelectPage={(page) => setCurrentPage(page)}
      />

      {/* Main Story Container with Smooth Transitions */}
      <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center pt-20 pb-12 px-3 sm:px-6">
        <AnimatePresence mode="wait">
          {currentPage === 'opening' && (
            <PageOpening key="opening" onContinue={handleNextFromOpening} />
          )}

          {currentPage === 'origin' && (
            <PageOriginStory
              key="origin"
              onContinue={handleNextFromOrigin}
              onBack={() => setCurrentPage('opening')}
            />
          )}

          {currentPage === 'first-date' && (
            <PageFirstDate
              key="first-date"
              onContinue={handleNextFromFirstDate}
              onBack={() => setCurrentPage('origin')}
            />
          )}

          {currentPage === 'interactive' && (
            <InteractiveYesNo
              key="interactive"
              onYes={handleYesFromInteractive}
              onBack={() => setCurrentPage('first-date')}
            />
          )}

          {currentPage === 'promise' && (
            <PageLoveLetter
              key="love-letter"
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Subtle Footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-rose-500/40 tracking-wider">
        <span>Made with ❤️ specially for Jothi Ramalingar</span>
      </footer>
    </div>
  );
}
