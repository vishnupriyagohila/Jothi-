import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Moon, Compass } from 'lucide-react';
import { PhotoPlaceholder } from './PhotoPlaceholder';
import { TypewriterText } from './TypewriterText';

interface PageFirstDateProps {
  onContinue: () => void;
  onBack?: () => void;
}

export const PageFirstDate: React.FC<PageFirstDateProps> = ({
  onContinue,
  onBack,
}) => {
  const [typewriterFinished, setTypewriterFinished] = useState(false);

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
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/25 text-rose-300 text-xs tracking-wider uppercase font-medium shadow-[0_0_20px_rgba(225,29,72,0.2)]">
          <Moon className="w-3.5 h-3.5 text-rose-400" />
          <span>Chapter 2: The First Date</span>
        </span>
      </div>

      {/* Main Heading: "The Day I Knew... Our First Date ❤️" */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        className="text-center mb-8 sm:mb-10"
      >
        <h2 className="font-serif-cormorant text-3xl sm:text-5xl font-normal text-rose-100 tracking-tight leading-snug">
          The Day I Knew… <br className="sm:hidden" />
          <span className="text-rose-300 italic font-semibold">Our First Date</span>{' '}
          <span className="text-rose-500 animate-pulse">❤️</span>
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-rose-300/80 mt-2">
          The moment time stood completely still
        </p>
      </motion.div>

      {/* 1. Photo with rounded corners, soft glowing border, and subtle zoom on hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="mb-8 sm:mb-10"
      >
        <PhotoPlaceholder
          id="first_date_hero_photo"
          variant="glass-frame"
          caption="Our First Date"
          subCaption="The Beginning of Forever ✨"
          className="max-w-[340px] sm:max-w-[420px]"
        />
        <p className="text-center text-xs text-rose-400/50 mt-2.5 font-light">
          (Click to preview your first date picture)
        </p>
      </motion.div>

      {/* 2. Emotional Story Card with First Reflection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8 }}
        className="romantic-glass rounded-2xl sm:rounded-3xl p-6 sm:p-9 space-y-6 text-rose-100/90 text-base sm:text-lg leading-relaxed border border-rose-500/20 shadow-xl"
      >
        {/* Poetic passage: "There is always one night..." */}
        <div className="relative p-5 sm:p-6 rounded-2xl bg-black/30 border border-rose-500/20 text-center sm:text-left">
          <Sparkles className="hidden sm:block absolute top-4 right-4 w-4 h-4 text-rose-400/40" />
          <p className="font-serif-cormorant text-xl sm:text-2xl text-rose-200/95 italic leading-relaxed">
            “There is always one night or one day when you realise you met someone…{"\n"}
            The meet when you see his soul, feel him around you even without seeing…{"\n"}
            There's always that one night that tells you that you're falling… ✨”
          </p>
        </div>

        {/* Typewriter Effect Paragraph Describing the First Date */}
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-3 text-rose-400 text-xs uppercase tracking-widest font-semibold">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-400" />
            <span>How That Day Felt</span>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border-l-2 border-rose-500/50 min-h-[90px]">
            <p className="text-rose-100 font-medium leading-relaxed font-serif-playfair text-base sm:text-lg">
              <TypewriterText
                text="The moment we sat together, every hesitation vanished into the night. It wasn’t just a simple date — it was the quiet certainty of two souls feeling completely at peace. Looking into your eyes, laughing at the smallest things, I knew right then that you were never going to be just another person to me."
                speed={26}
                delay={400}
                onComplete={() => setTypewriterFinished(true)}
              />
            </p>
          </div>
        </div>

        {/* Deep Emotional Highlight: "Laying on your chest..." */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2c0817]/90 via-[#1b050f]/90 to-[#280715]/90 p-6 sm:p-8 border border-rose-400/40 shadow-[0_0_30px_rgba(225,29,72,0.25)] text-center my-6"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent" />

          <p className="font-serif-cormorant text-xl sm:text-2xl text-rose-100 leading-relaxed font-normal">
            Laying on your chest that's always felt like home,{"\n"}
            I could smell the scent of your perfume at the back of your neck but…
          </p>

          <div className="my-3 flex items-center justify-center gap-2">
            <span className="w-10 h-px bg-rose-500/40" />
            <Heart className="w-4 h-4 fill-rose-500 text-rose-400" />
            <span className="w-10 h-px bg-rose-500/40" />
          </div>

          <p className="font-serif-cormorant text-2xl sm:text-3xl text-rose-200 font-semibold tracking-wide leading-snug">
            When the scent of the perfume fades away and your hands lay on my skin,{"\n"}
            <span className="text-rose-300 underline decoration-rose-500/50 underline-offset-4">
              you will always be my home
            </span>{' '}
            🤌🏼💗
          </p>
        </motion.div>
      </motion.div>

      {/* 3. Ending with a placeholder for a couple photo in a Polaroid style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="my-10 sm:my-12 text-center"
      >
        <PhotoPlaceholder
          id="first_date_polaroid"
          variant="polaroid"
          caption="You Will Always Be My Home 🤌🏼💗"
          subCaption="Our First Date Memory"
        />
        <p className="text-xs text-rose-400/50 mt-2 font-light">
          (Click above to upload our couple polaroid photo)
        </p>
      </motion.div>

      {/* Action Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
      >
        {onBack && (
          <button
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full romantic-glass text-rose-300/80 hover:text-rose-100 hover:border-rose-400/30 text-sm font-medium transition-all cursor-pointer"
          >
            ← Previous Chapter
          </button>
        )}
        <button
          id="first-date-continue-button"
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
