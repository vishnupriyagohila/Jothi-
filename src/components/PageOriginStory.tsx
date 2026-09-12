import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Sparkles, Heart } from 'lucide-react';
import { PhotoPlaceholder } from './PhotoPlaceholder';

interface PageOriginStoryProps {
  onContinue: () => void;
  onBack?: () => void;
}

export const PageOriginStory: React.FC<PageOriginStoryProps> = ({
  onContinue,
  onBack,
}) => {
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
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-950/50 border border-rose-500/25 text-rose-300 text-xs tracking-wider uppercase font-medium">
          <Sparkles className="w-3 h-3 text-rose-400" />
          <span>Chapter 1: The Spark</span>
        </span>
      </div>

      {/* Main Heading: "And then… there was 28th March. ✨" */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        className="text-center mb-8 sm:mb-10"
      >
        <h2 className="font-serif-cormorant text-3xl sm:text-5xl font-normal text-rose-100 tracking-tight leading-snug">
          And then… there was <span className="text-rose-400 italic font-semibold">28th March</span>. ✨
        </h2>
      </motion.div>

      {/* Story Narrative Box 1: Bumble & The Early Days */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.8 }}
        className="romantic-glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-5 text-rose-100/90 text-base sm:text-lg leading-relaxed border border-rose-500/20 shadow-xl"
      >
        <p className="text-rose-200/90 font-medium">
          It all started from Bumble…
        </p>

        <p className="text-rose-300/80">
          But honestly, we didn't even talk that much in the beginning. 😂
        </p>

        <p className="text-rose-300/80">
          Just a few conversations here and there…
        </p>

        <div className="p-4 sm:p-5 rounded-xl bg-black/25 border border-rose-500/15">
          <p className="whitespace-pre-line text-rose-200/95 font-medium leading-relaxed">
            And then somehow,{"\n"}
            we started talking more.{"\n"}
            A little more every day.{"\n"}
            A little closer every time. ❤️
          </p>
        </div>

        {/* Highlighted Special Sentence: "I was literally falling for you from Day 1. 🥹" */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-950/70 via-pink-950/60 to-rose-950/70 p-5 sm:p-6 border border-rose-400/40 shadow-[0_0_25px_rgba(244,63,94,0.2)] text-center my-6"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent" />
          <p className="font-serif-cormorant text-2xl sm:text-3xl text-rose-100 font-semibold tracking-wide leading-snug">
            “I was literally falling for you from Day 1. 🥹”
          </p>
        </motion.div>

        {/* Narrative continuation */}
        <div className="space-y-4 pt-2">
          <p className="text-rose-300/80">
            I don't even know why.
          </p>

          <p className="text-rose-300/85 whitespace-pre-line">
            There was no proper reason.{"\n"}
            No big moment.
          </p>

          <p className="text-rose-200 font-medium text-lg">
            I just… started falling for you.
          </p>

          <div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-rose-400/60 pl-4 my-3">
            <p className="whitespace-pre-line font-serif-cormorant text-xl text-rose-200 italic leading-snug">
              Maybe my heart knew something{"\n"}
              that my brain didn't. 🤍
            </p>
          </div>

          <p className="text-rose-200/90 font-medium">
            And without even realizing it…{"\n"}
            you were slowly becoming someone really special to me. 🫶🏻
          </p>
        </div>
      </motion.div>

      {/* Dramatic Transition to 14th April */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45, duration: 0.8 }}
        className="mt-10 sm:mt-12 text-center"
      >
        <p className="text-rose-400 text-sm sm:text-base tracking-widest uppercase font-medium mb-2">
          And then came...
        </p>

        {/* Highlight 14th April. ❤️ */}
        <div className="inline-block relative">
          <h3 className="font-serif-cormorant text-4xl sm:text-6xl font-bold text-rose-100 tracking-tight text-glow py-2">
            14th April. <span className="text-rose-500 animate-pulse">❤️</span>
          </h3>
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-rose-500 to-transparent mt-1" />
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-lg sm:text-xl font-medium text-rose-200">
            The day we finally met.
          </p>
          <p className="font-serif-cormorant text-xl sm:text-2xl text-rose-300/90 italic max-w-lg mx-auto leading-relaxed">
            “But little did I know… that meeting you would make me fall even harder. 🫶🏻”
          </p>
        </div>
      </motion.div>

      {/* Photo Placeholder for 14th April / Our meeting photo */}
      <div className="my-8 sm:my-10">
        <PhotoPlaceholder
          id="meeting_photo"
          variant="polaroid"
          caption="14th April — The Day We Met"
          subCaption="When my whole world changed ❤️"
        />
        <p className="text-center text-xs text-rose-400/50 mt-2 font-light">
          (You can click the placeholder anytime to preview your photo here)
        </p>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
      >
        {onBack && (
          <button
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full romantic-glass text-rose-300/80 hover:text-rose-100 hover:border-rose-400/30 text-sm font-medium transition-all"
          >
            ← Back
          </button>
        )}
        <button
          id="origin-continue-button"
          onClick={onContinue}
          className="romantic-glow-btn group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-4 rounded-full text-white text-base sm:text-lg font-medium tracking-wide cursor-pointer"
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
