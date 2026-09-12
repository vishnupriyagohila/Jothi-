import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface PageOpeningProps {
  onContinue: () => void;
}

export const PageOpening: React.FC<PageOpeningProps> = ({ onContinue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12"
    >
      {/* Decorative top seal / heart badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 18 }}
        className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-rose-900/60 to-pink-950/80 border border-rose-500/30 text-rose-300 mb-6 sm:mb-8 shadow-[0_0_30px_rgba(225,29,72,0.3)] backdrop-blur-sm"
      >
        <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-rose-500 text-rose-400 animate-pulse" />
      </motion.div>

      {/* Main heading: "Hii babbyyy ❤️" */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="font-serif-cormorant text-4xl sm:text-5xl md:text-6xl font-normal text-rose-100 tracking-tight leading-tight"
      >
        Hii babbyyy <span className="inline-block text-rose-500 animate-pulse">❤️</span>
      </motion.h1>

      {/* Below it: "Manichukonga d yen thangoo 🥺" */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.8 }}
        className="font-script text-2xl sm:text-3xl text-rose-300/90 mt-2 sm:mt-3 tracking-wide"
      >
        Manichukonga d yen thangoo 🥺
      </motion.p>

      {/* Romantic Glass Letter Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.9 }}
        className="relative mt-8 sm:mt-10 w-full romantic-glass rounded-2xl sm:rounded-3xl p-6 sm:p-9 text-rose-100/90 text-base sm:text-lg leading-relaxed shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-rose-500/20"
      >
        {/* Subtle romantic corner sparkle */}
        <Sparkles className="absolute top-4 right-4 w-4 h-4 text-rose-400/40" />

        <div className="space-y-4 sm:space-y-5">
          <p className="text-rose-200/95 font-medium tracking-wide">
            Okay… enough of everything.
          </p>

          <p className="text-rose-300/80 font-normal">
            Let’s forget all the little things for a moment…
          </p>

          <p className="text-rose-200/95 font-medium">
            and start from the very beginning. ❤️
          </p>

          <div className="py-1">
            <div className="h-px w-16 mx-auto bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
          </div>

          <p className="font-serif-cormorant text-xl sm:text-2xl text-rose-100/95 italic">
            Our story… our memories… our little world. 🫶🏻
          </p>
        </div>

        {/* "Ready, babby? 👀❤️" */}
        <div className="mt-7 sm:mt-8 pt-5 border-t border-rose-500/15">
          <p className="text-lg sm:text-xl font-medium text-rose-200 tracking-wide">
            Ready, babby? 👀❤️
          </p>
        </div>
      </motion.div>

      {/* At the bottom: Glowing button "Continue →" */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.6 }}
        className="mt-8 sm:mt-10 flex flex-col items-center"
      >
        <button
          id="opening-continue-button"
          onClick={onContinue}
          className="romantic-glow-btn group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-4 rounded-full text-white text-base sm:text-lg font-medium tracking-wide cursor-pointer select-none"
        >
          <span>Continue</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-rose-200">
            →
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
};
