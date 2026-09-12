import React, { useState, useEffect } from 'react';
import { Camera, Image as ImageIcon, Sparkles, Upload, X } from 'lucide-react';
import { motion } from 'motion/react';

interface PhotoPlaceholderProps {
  id: string; // Unique identifier for localStorage and code reference
  defaultSrc?: string; // Optional default image URL or path
  caption?: string; // Optional romantic caption
  subCaption?: string; // e.g. "14th April 2024"
  variant?: 'polaroid' | 'glass-frame' | 'minimal-glow';
  className?: string;
  allowUpload?: boolean;
}

export const PhotoPlaceholder: React.FC<PhotoPlaceholderProps> = ({
  id,
  defaultSrc,
  caption = 'Our Special Memory',
  subCaption,
  variant = 'polaroid',
  className = '',
  allowUpload = true,
}) => {
  // Support live browser upload stored in localStorage so the user can test their real photos on mobile/desktop immediately!
  const [photoSrc, setPhotoSrc] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`romantic_photo_${id}`);
      if (saved) return saved;
    }
    return defaultSrc || null;
  });

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPhotoSrc(result);
      try {
        localStorage.setItem(`romantic_photo_${id}`, result);
      } catch (err) {
        console.warn('Storage quota exceeded, displayed in session memory');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoSrc(defaultSrc || null);
    try {
      localStorage.removeItem(`romantic_photo_${id}`);
    } catch (e) {
      // ignore
    }
  };

  const triggerUpload = () => {
    if (allowUpload && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Polaroid style
  if (variant === 'polaroid') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`relative group mx-auto w-full max-w-[290px] sm:max-w-[320px] ${className}`}
      >
        {/* Soft Pink Glow Backdrop */}
        <div className="absolute -inset-2 bg-gradient-to-r from-rose-600/20 via-pink-600/15 to-rose-900/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

        {/* Polaroid Card */}
        <div
          onClick={triggerUpload}
          className="relative bg-[#160a12]/90 border border-rose-500/30 rounded-xl p-3 sm:p-4 shadow-2xl backdrop-blur-md cursor-pointer transition-transform duration-500 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(225,29,72,0.25)]"
        >
          {/* Subtle tape/pin decoration at top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-rose-300/15 border border-rose-200/20 rounded-sm backdrop-blur-sm transform -rotate-1 shadow-sm" />

          {/* Photo frame area */}
          <div className="relative aspect-[4/4.8] w-full overflow-hidden rounded-lg bg-[#0d0408] border border-rose-950/80 flex items-center justify-center group-hover:border-rose-500/40 transition-colors duration-500">
            {photoSrc ? (
              <img
                src={photoSrc}
                alt={caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <div className="relative mb-3 flex items-center justify-center w-14 h-14 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 group-hover:scale-110 group-hover:text-rose-200 transition-all duration-300 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                  <Camera className="w-6 h-6 stroke-[1.5]" />
                  <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-pink-400 animate-pulse" />
                </div>
                <span className="text-xs uppercase tracking-widest text-rose-300/90 font-medium">
                  Photo Placeholder
                </span>
                <span className="text-[11px] text-rose-400/60 mt-1 max-w-[200px] leading-snug">
                  Click to preview our photo here
                </span>
              </div>
            )}

            {/* Hover overlay indicator */}
            {photoSrc && allowUpload && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                <span className="text-xs text-rose-100 bg-rose-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-rose-400/30 flex items-center gap-1.5">
                  <Upload className="w-3 h-3" /> Change Photo
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs text-rose-200 bg-black/70 hover:bg-rose-950 p-1.5 rounded-full border border-rose-400/30"
                  title="Remove photo"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Polaroid Caption */}
          <div className="pt-3 pb-1 text-center">
            <p className="font-script text-2xl sm:text-3xl text-rose-200/90 tracking-wide font-normal">
              {caption}
            </p>
            {subCaption && (
              <p className="text-[11px] uppercase tracking-widest text-rose-400/70 mt-0.5 font-medium">
                {subCaption}
              </p>
            )}
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </motion.div>
    );
  }

  // Modern Glass Frame style
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`relative group mx-auto w-full max-w-[320px] sm:max-w-[360px] ${className}`}
    >
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-rose-700/25 via-pink-600/20 to-purple-900/20 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div
        onClick={triggerUpload}
        className="relative romantic-glass border border-rose-500/25 rounded-2xl p-3.5 sm:p-4 overflow-hidden shadow-2xl cursor-pointer hover:border-rose-400/50 transition-all duration-300"
      >
        <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#10050b] border border-rose-900/50 flex items-center justify-center">
          {photoSrc ? (
            <img
              src={photoSrc}
              alt={caption}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-950/70 border border-rose-500/30 flex items-center justify-center text-rose-300 mb-2 shadow-inner">
                <ImageIcon className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase tracking-wider text-rose-200 font-medium">
                Photo Space
              </p>
              <p className="text-[11px] text-rose-400/60 mt-0.5">
                Ready for our couple picture
              </p>
            </div>
          )}

          {photoSrc && allowUpload && (
            <button
              onClick={handleReset}
              className="absolute top-2 right-2 bg-black/60 hover:bg-rose-950 text-rose-200 p-1.5 rounded-full border border-rose-400/30"
              title="Reset photo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="mt-3 text-center">
          <p className="font-serif-cormorant text-lg sm:text-xl text-rose-200 font-medium tracking-wide">
            {caption}
          </p>
          {subCaption && (
            <p className="text-[11px] text-rose-400/70 tracking-widest uppercase mt-0.5">
              {subCaption}
            </p>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </motion.div>
  );
};
