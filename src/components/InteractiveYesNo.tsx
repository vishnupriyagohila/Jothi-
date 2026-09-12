import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';

interface InteractiveYesNoProps {
  onYes: () => void;
  onBack?: () => void;
}

const NO_MESSAGES = [
  "No… not letting you go 🥹",
  "Yenaku venum us ❤️",
  "Nenga… nanum… plsss 🥺",
  "Vera yarum vena 😭",
  "Pls thangooo 🥹",
  "Yen chelam yaruuuuu? ❤️",
  "You know the answer… it's you. ❤️",
  "No escape for you, okay? 😌🫶🏻",
];

export const InteractiveYesNo: React.FC<InteractiveYesNoProps> = ({
  onYes,
  onBack,
}) => {
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [isDodging, setIsDodging] = useState(false);
  const [isCelebrated, setIsCelebrated] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Determine current active message
  const getCurrentMessage = () => {
    if (noCount === 0) return null;
    if (noCount <= NO_MESSAGES.length) {
      return NO_MESSAGES[noCount - 1];
    }
    return "Now come back and click YES. 😤❤️";
  };

  const moveNoButton = () => {
    // Generate playful offset within container bounds
    const maxX = window.innerWidth < 640 ? 70 : 130;
    const maxY = 80;
    const randomX = (Math.random() - 0.5) * (maxX * 2);
    const randomY = (Math.random() - 0.5) * (maxY * 2);
    setNoPos({ x: randomX, y: randomY });
  };

  const handleNoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    // After 3 clicks, start dodging!
    if (nextCount >= 3) {
      setIsDodging(true);
      moveNoButton();
    }
  };

  const handleNoHover = () => {
    // If dodging is active, evade cursor on hover!
    if (isDodging || noCount >= 4) {
      moveNoButton();
    }
  };

  const handleYesClick = () => {
    setIsCelebrated(true);
    setTimeout(() => {
      onYes();
    }, 900);
  };

  // The YES button grows slightly with every NO click
  const yesScale = Math.min(1 + noCount * 0.07, 1.45);

  const currentMessage = getCurrentMessage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full max-w-xl mx-auto px-4 py-8 sm:py-12 text-center"
      ref={containerRef}
    >
      {/* Chapter Indicator */}
      <div className="flex justify-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/25 text-rose-300 text-xs tracking-wider uppercase font-medium">
          <Heart className="w-3 h-3 text-rose-400 fill-rose-500" />
          <span>A Little Question For You</span>
        </span>
      </div>

      {/* Romantic Question Card */}
      <div className="romantic-glass rounded-3xl p-6 sm:p-10 border border-rose-500/25 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-600/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-pink-600/10 rounded-full blur-2xl pointer-events-none" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-rose-950/70 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6 shadow-[0_0_30px_rgba(225,29,72,0.25)]"
        >
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 fill-rose-500 text-rose-400 animate-pulse" />
        </motion.div>

        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl text-rose-100 font-normal tracking-tight leading-tight">
          Will you promise to be mine forever, babby? 🥺❤️
        </h2>

        <p className="font-serif-playfair text-base sm:text-lg text-rose-300/80 italic mt-3 sm:mt-4">
          Think very carefully before you choose… 😌🫶🏻
        </p>

        {/* Dynamic Emotional Message Box */}
        <div className="min-h-[72px] sm:min-h-[80px] flex items-center justify-center my-6">
          <AnimatePresence mode="wait">
            {currentMessage ? (
              <motion.div
                key={noCount}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="px-5 py-3 rounded-2xl bg-rose-950/80 border border-rose-400/40 text-rose-100 font-medium text-base sm:text-lg shadow-[0_0_20px_rgba(244,63,94,0.3)] inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-rose-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>{currentMessage}</span>
              </motion.div>
            ) : (
              <span className="text-xs text-rose-400/50 italic">
                (There is only one true answer in your heart ❤️)
              </span>
            )}
          </AnimatePresence>
        </div>

        {/* YES / NO Action Buttons Area */}
        <div className="relative pt-2 pb-6 min-h-[120px] flex flex-wrap items-center justify-center gap-5 sm:gap-8">
          {/* YES Button */}
          <motion.button
            id="interactive-yes-button"
            onClick={handleYesClick}
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.05 }}
            whileTap={{ scale: yesScale * 0.95 }}
            className="romantic-glow-btn relative z-20 px-8 py-4 sm:px-10 sm:py-4 rounded-full text-white text-lg sm:text-xl font-bold tracking-wide cursor-pointer shadow-2xl flex items-center gap-2"
          >
            <span>YES ❤️</span>
            {noCount > 0 && (
              <Sparkles className="w-5 h-5 text-rose-200 animate-pulse" />
            )}
          </motion.button>

          {/* NO Button (Playful & dodges after clicks) */}
          <motion.button
            id="interactive-no-button"
            onClick={handleNoClick}
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            animate={{
              x: noPos.x,
              y: noPos.y,
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
            }}
            className={`relative z-10 px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full text-rose-300 text-base sm:text-lg font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
              noCount >= NO_MESSAGES.length
                ? 'bg-rose-950/40 border border-rose-500/20 opacity-70 cursor-not-allowed'
                : 'bg-white/[0.05] hover:bg-rose-950/60 border border-rose-500/30 shadow-lg'
            }`}
          >
            <span>NO 🥺</span>
          </motion.button>
        </div>

        {/* Notice when clicked NO */}
        {noCount >= 3 && (
          <p className="text-xs text-rose-400/70 animate-pulse mt-2">
            Hehe, you can't click NO anymore, babby… the button is running away! 🏃‍♂️💨
          </p>
        )}
      </div>

      {/* Back button */}
      {onBack && (
        <div className="mt-8">
          <button
            onClick={onBack}
            className="px-6 py-2.5 rounded-full bg-transparent hover:bg-white/[0.04] text-rose-400/70 hover:text-rose-200 text-xs tracking-wider uppercase transition-all"
          >
            ← Previous Chapter
          </button>
        </div>
      )}

      {/* Celebration burst on YES click */}
      {isCelebrated && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center bg-rose-950/30 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.8, 1.2, 1], opacity: 1 }}
            className="p-8 rounded-3xl bg-[#1d0611] border border-rose-400/50 shadow-[0_0_60px_rgba(244,63,94,0.5)] text-center"
          >
            <div className="text-5xl sm:text-6xl mb-3 animate-bounce">💖</div>
            <h3 className="font-serif-cormorant text-3xl sm:text-4xl text-rose-100 font-bold">
              I Knew It! Forever & Always! ❤️
            </h3>
            <p className="text-rose-300 mt-2 font-script text-2xl">
              Opening my promise & love letter to you… ✨
            </p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
