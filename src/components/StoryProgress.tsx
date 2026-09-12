import React from 'react';
import { PageId } from '../types';

interface StoryProgressProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
}

const PAGES: { id: PageId; label: string }[] = [
  { id: 'opening', label: 'Opening' },
  { id: 'origin', label: 'Our Story' },
  { id: 'first-date', label: 'First Date' },
  { id: 'interactive', label: 'Question' },
  { id: 'promise', label: 'My Promise' },
];

export const StoryProgress: React.FC<StoryProgressProps> = ({
  currentPage,
  onSelectPage,
}) => {
  const currentIndex = PAGES.findIndex((p) => p.id === currentPage);

  return (
    <nav aria-label="Story chapters" className="fixed top-4 left-4 sm:top-6 sm:left-6 z-40">
      <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full romantic-glass border border-rose-500/20 shadow-lg">
        {PAGES.map((page, idx) => {
          const isActive = page.id === currentPage;
          const isPassed = idx < currentIndex;

          return (
            <button
              key={page.id}
              onClick={() => onSelectPage(page.id)}
              className="group relative flex items-center justify-center p-1 rounded-full transition-transform"
              title={page.label}
              aria-label={`Go to ${page.label}`}
            >
              <span
                className={`transition-all duration-500 rounded-full ${
                  isActive
                    ? 'w-5 sm:w-6 h-2 bg-gradient-to-r from-rose-500 to-pink-400 shadow-[0_0_12px_rgba(244,63,94,0.8)]'
                    : isPassed
                    ? 'w-2 h-2 bg-rose-400/70 hover:bg-rose-300'
                    : 'w-2 h-2 bg-rose-950/80 border border-rose-500/30 hover:bg-rose-800/40'
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
