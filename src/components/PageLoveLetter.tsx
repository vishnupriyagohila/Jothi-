import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, HeartHandshake, RotateCcw, Check, Music } from 'lucide-react';
import { PhotoPlaceholder } from './PhotoPlaceholder';

interface PageLoveLetterProps {
  onRestart: () => void;
}

export const PageLoveLetter: React.FC<PageLoveLetterProps> = ({ onRestart }) => {
  const [promiseSealed, setPromiseSealed] = useState(false);

  const handleSealPromise = () => {
    setPromiseSealed(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full max-w-2xl mx-auto px-4 py-8 sm:py-12"
    >
      {/* Chapter Badge */}
      <div className="flex justify-center mb-5">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs tracking-wider uppercase font-medium shadow-[0_0_20px_rgba(225,29,72,0.2)]">
          <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
          <span>My Apology & Forever Promise</span>
        </span>
      </div>

      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        className="text-center mb-8 sm:mb-10"
      >
        <p className="font-script text-3xl sm:text-4xl text-rose-300/90 mb-1">
          Manichukonga d yen thangoo 🥺
        </p>
        <h1 className="font-serif-cormorant text-4xl sm:text-5xl md:text-6xl font-normal text-rose-100 tracking-tight leading-tight">
          To My Dearest <br />
          <span className="font-bold text-rose-300 drop-shadow-[0_0_25px_rgba(244,63,94,0.4)]">
            Jothi Ramalingar
          </span>{' '}
          ❤️
        </h1>
        <p className="font-serif-playfair text-rose-300/80 italic text-base sm:text-lg mt-2">
          A promise straight from my soul to yours
        </p>
      </motion.div>

      {/* Interactive Promise Seal Box */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
        className="mb-8 p-6 sm:p-8 rounded-3xl romantic-glass border border-rose-500/30 text-center relative overflow-hidden"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="relative mb-3 flex items-center justify-center w-16 h-16 rounded-full bg-rose-950/80 border border-rose-400/40 text-rose-300 shadow-[0_0_25px_rgba(225,29,72,0.3)]">
            <Heart className={`w-8 h-8 ${promiseSealed ? 'fill-rose-500 text-rose-400 scale-110' : 'text-rose-400 animate-pulse'} transition-all duration-500`} />
            {promiseSealed && (
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-700 border border-emerald-400 text-emerald-100 flex items-center justify-center text-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            )}
          </div>

          <h3 className="font-serif-cormorant text-2xl sm:text-3xl text-rose-100 font-semibold">
            {promiseSealed ? 'My Sacred Promise Is Sealed ❤️' : 'My Solemn Promise To You'}
          </h3>

          <p className="text-rose-200/90 max-w-md mx-auto text-sm sm:text-base leading-relaxed mt-2">
            “I promise with every beat of my heart that I will never hurt you anymore. You are too precious to ever see you sad because of me.”
          </p>

          {!promiseSealed ? (
            <button
              onClick={handleSealPromise}
              className="mt-5 px-7 py-3 rounded-full romantic-glow-btn text-white text-sm sm:text-base font-medium tracking-wide shadow-[0_0_25px_rgba(225,29,72,0.4)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-rose-200" />
              <span>Tap to Seal My Promise 🤞🏼❤️</span>
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 px-5 py-2.5 rounded-2xl bg-rose-950/80 border border-rose-400/40 text-rose-200 text-sm font-medium italic inline-flex items-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
            >
              <span>Forever protecting your smile and your heart, my babby. 🫶🏻</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* The Heartfelt Apology & Digital Love Letter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8 }}
        className="romantic-glass rounded-3xl p-6 sm:p-10 text-rose-100/90 text-base sm:text-lg leading-relaxed border border-rose-500/20 shadow-2xl space-y-6"
      >
        <div className="flex items-center justify-between pb-3 border-b border-rose-500/15">
          <span className="font-script text-2xl sm:text-3xl text-rose-300">From Your Thangoo</span>
          <Heart className="w-5 h-5 fill-rose-500 text-rose-400" />
        </div>

        <p className="text-rose-200/95 font-medium">
          Manichukonga d yen thangoo 🥺…
        </p>

        <p className="text-rose-300/90 leading-relaxed">
          It breaks my heart knowing that I caused you pain. There is honestly nothing in this world more important to me than your smile, your peace, and us. I never ever want to be the reason tears come to your eyes or worry fills your thoughts.
        </p>

        <p className="text-rose-300/85">
          Looking back at where everything started — from that very first hello on Bumble, to our late-night conversations that slowly became the safest part of my everyday life. 28th March brought you into my life, and 14th April showed me that my heart had already surrendered to you.
        </p>

        {/* Intimate Quote Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-black/30 border border-rose-500/20 text-rose-100 italic font-serif-cormorant text-xl sm:text-2xl leading-relaxed text-center">
          “Laying on your chest that’s always felt like home… when the scent of perfume fades away and your hands lay on my skin, you will always, always be my home 🤌🏼💗”
        </div>

        <p className="text-rose-300/90 leading-relaxed">
          I promise to listen to you more, cherish you more, hold you tighter, and love you better every single day. I won't ever hurt you anymore. Vera yarum vena… yenaku nenga mattum pothum.
        </p>

        <p className="text-rose-200 font-medium">
          Please let go of the hurt, hold my hand, and let’s restart our little world together. ❤️
        </p>

        <div className="pt-4 border-t border-rose-500/15 text-right">
          <p className="font-serif-cormorant text-xl text-rose-200 font-medium">
            With endless love, deepest apology, and all my heart,
          </p>
          <p className="font-script text-3xl sm:text-4xl text-rose-400 mt-1">
            Forever your thangoo 🫶🏻
          </p>
        </div>
      </motion.div>

      {/* Memory Photo Placeholders */}
      <div className="my-10 sm:my-12">
        <div className="text-center mb-6">
          <h3 className="font-serif-cormorant text-2xl sm:text-3xl text-rose-200 font-medium">
            Our Little World ✨
          </h3>
          <p className="text-xs sm:text-sm text-rose-400/70 mt-1">
            The moments that remind me why I love you so much
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          <PhotoPlaceholder
            id="memory_photo_1"
            variant="polaroid"
            caption="Us ❤️"
            subCaption="Through Everything"
          />
          <PhotoPlaceholder
            id="memory_photo_2"
            variant="polaroid"
            caption="Forever My Home 🤌🏼💗"
            subCaption="You & Me"
          />
        </div>
      </div>

      {/* Replay and restart story */}
      <div className="flex flex-col items-center justify-center gap-3 pt-6 pb-12 border-t border-rose-500/15 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/30 text-rose-200 text-sm font-medium tracking-wide transition-all shadow-md hover:shadow-rose-900/30 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-rose-400" />
            <span>Read Our Story Again From The Beginning ↺</span>
          </button>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-music-modal'))}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/25 text-rose-300 text-sm font-medium tracking-wide transition-all cursor-pointer"
          >
            <Music className="w-4 h-4 text-rose-400" />
            <span>Add / Change Song 🎵</span>
          </button>
        </div>
        <p className="text-xs text-rose-400/50 mt-1">
          Made with endless love and a sincere heart for Jothi Ramalingar 🫶🏻
        </p>
      </div>
    </motion.div>
  );
};
