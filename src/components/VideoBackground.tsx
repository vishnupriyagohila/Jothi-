import React, { useState, useRef, useEffect } from 'react';
import { Film, Eye, EyeOff, Sliders, Sparkles, Check, ChevronDown, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export interface VideoPreset {
  id: string;
  name: string;
  description: string;
  url: string;
  type: string;
}

export const ROMANTIC_VIDEO_PRESETS: VideoPreset[] = [
  {
    id: 'candlelight',
    name: 'Candlelight Glow',
    description: 'Soft, warm flickering candlelight ambiance',
    url: publicAsset('/videos/candle.mp4'),
    type: 'video/mp4',
  },
  {
    id: 'flower',
    name: 'Blooming Petals',
    description: 'Delicate petals unfolding in romantic time-lapse',
    url: publicAsset('/videos/flower.mp4'),
    type: 'video/mp4',
  },
  {
    id: 'bokeh-lights',
    name: 'Dreamy Bokeh Lights',
    description: 'Ethereal floating bokeh and glowing night light leaks',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Catadioptric_lens_bokeh_etc_-_2018_12_08.webm',
    type: 'video/webm',
  },
];

export interface VideoBackgroundProps {
  /** Optional custom stock video URL override */
  videoUrl?: string;
  /** Default opacity level (0 to 1), defaults to 0.35 for a subtle backdrop */
  defaultOpacity?: number;
  /** Whether to show the subtle ambient control pill */
  showControls?: boolean;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoUrl,
  defaultOpacity = 0.35,
  showControls = true,
}) => {
  const [currentPresetId, setCurrentPresetId] = useState<string>(
    videoUrl ? 'custom' : 'candlelight'
  );
  const [activeUrl, setActiveUrl] = useState<string>(
    videoUrl || ROMANTIC_VIDEO_PRESETS[0].url
  );
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [opacity, setOpacity] = useState<number>(defaultOpacity);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isControlOpen, setIsControlOpen] = useState<boolean>(false);
  const [customInputUrl, setCustomInputUrl] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sync prop changes
  useEffect(() => {
    if (videoUrl) {
      setActiveUrl(videoUrl);
      setCurrentPresetId('custom');
      setIsLoaded(false);
      setHasError(false);
    }
  }, [videoUrl]);

  // Attempt autoplay whenever URL or enabled state changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isEnabled) {
      video.muted = true; // Ensures autoplay without browser rejection
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsLoaded(true);
            setHasError(false);
          })
          .catch((err) => {
            console.warn('Video background autoplay prevented or waiting:', err);
          });
      }
    } else {
      video.pause();
    }
  }, [activeUrl, isEnabled]);

  const handleSelectPreset = (preset: VideoPreset) => {
    setCurrentPresetId(preset.id);
    setActiveUrl(preset.url);
    setIsLoaded(false);
    setHasError(false);
    setIsControlOpen(false);
  };

  const handleCustomUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputUrl.trim()) return;
    setActiveUrl(customInputUrl.trim());
    setCurrentPresetId('custom');
    setIsLoaded(false);
    setHasError(false);
    setCustomInputUrl('');
    setIsControlOpen(false);
  };

  return (
    <>
      {/* Background Video Viewport Layer */}
      <div
        id="romantic-video-background"
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
        aria-hidden="true"
      >
        {isEnabled && !hasError && (
          <video
            ref={videoRef}
            id="ambient-video-player"
            key={activeUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onCanPlay={() => setIsLoaded(true)}
            onError={() => {
              console.warn('Video background failed to load:', activeUrl);
              setHasError(true);
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              filter: 'saturate(1.25) contrast(1.08)',
              opacity: isLoaded ? opacity : 0,
            }}
          >
            <source src={activeUrl} />
            {/* Direct fallback to candlelight if custom or external URL fails */}
            <source src={publicAsset('/videos/candle.mp4')} type="video/mp4" />
          </video>
        )}

        {/* Romantic Tone Mapping & Vignette Overlays */}
        {/* Layer 1: Dark Burgundy & Midnight Rose Vignette */}
        <div
          id="video-ambient-overlay"
          className="absolute inset-0 bg-gradient-to-b from-[#090306]/90 via-[#090306]/65 to-[#090306]/95 mix-blend-multiply pointer-events-none"
        />

        {/* Layer 2: Radial vignette highlighting center love story */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(9,3,6,0.25)_0%,rgba(9,3,6,0.85)_80%,rgba(9,3,6,0.98)_100%)] pointer-events-none" />

        {/* Layer 3: Warm Rose Tint to harmonize video palette with the theme */}
        <div className="absolute inset-0 bg-rose-950/20 mix-blend-color-burn pointer-events-none" />
      </div>

      {/* Subtle Ambient Video Controller Pill (Bottom-Right) */}
      {showControls && (
        <div
          id="video-background-controls-wrapper"
          className="fixed bottom-4 right-4 sm:bottom-5 sm:right-6 z-40 flex flex-col items-end"
        >
          {/* Settings Popover */}
          <AnimatePresence>
            {isControlOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="mb-2 w-72 sm:w-80 romantic-glass rounded-2xl p-4 border border-rose-500/25 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center justify-between pb-3 border-b border-rose-500/15 mb-3">
                  <div className="flex items-center gap-2">
                    <Film className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-semibold text-rose-100 tracking-wider uppercase">
                      Ambient Video
                    </span>
                  </div>
                  <button
                    id="video-toggle-enable"
                    onClick={() => setIsEnabled(!isEnabled)}
                    className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                      isEnabled
                        ? 'bg-rose-900/60 text-rose-200 border border-rose-500/40 hover:bg-rose-850'
                        : 'bg-black/60 text-rose-400/60 border border-white/10 hover:text-rose-300'
                    }`}
                  >
                    {isEnabled ? (
                      <>
                        <Eye className="w-3 h-3 text-rose-300" /> On
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" /> Off
                      </>
                    )}
                  </button>
                </div>

                {/* Video Presets List */}
                <div className="space-y-1.5 mb-3">
                  <label className="text-[11px] uppercase tracking-wider text-rose-400/80 font-medium block">
                    Mood Ambiance
                  </label>
                  {ROMANTIC_VIDEO_PRESETS.map((preset) => {
                    const isSelected = currentPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        id={`video-preset-${preset.id}`}
                        onClick={() => handleSelectPreset(preset)}
                        className={`w-full text-left p-2 rounded-xl transition-all flex items-center justify-between text-xs cursor-pointer ${
                          isSelected
                            ? 'bg-rose-950/80 border border-rose-500/40 text-rose-100 shadow-sm'
                            : 'bg-black/20 hover:bg-rose-950/40 border border-transparent text-rose-300/80 hover:text-rose-100'
                        }`}
                      >
                        <div>
                          <div className="font-medium text-rose-200">{preset.name}</div>
                          <div className="text-[10px] text-rose-400/70 truncate max-w-[190px]">
                            {preset.description}
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-rose-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Opacity Intensity Slider */}
                <div className="space-y-1.5 pt-2 border-t border-rose-500/15">
                  <div className="flex items-center justify-between text-[11px] text-rose-300/80">
                    <span className="flex items-center gap-1.5">
                      <Sliders className="w-3 h-3 text-rose-400" /> Opacity
                    </span>
                    <span className="font-mono text-rose-400">{Math.round(opacity * 100)}%</span>
                  </div>
                  <input
                    id="video-opacity-slider"
                    type="range"
                    min="0.1"
                    max="0.8"
                    step="0.05"
                    value={opacity}
                    onChange={(e) => setOpacity(parseFloat(e.target.value))}
                    className="w-full accent-rose-500 bg-rose-950/60 h-1.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-rose-500/60 px-0.5">
                    <span>Subtle</span>
                    <span>Romantic</span>
                    <span>Vivid</span>
                  </div>
                </div>

                {/* Custom Stock URL Form */}
                <form
                  onSubmit={handleCustomUrlSubmit}
                  className="mt-3 pt-2.5 border-t border-rose-500/15"
                >
                  <label className="text-[10px] uppercase tracking-wider text-rose-400/70 font-medium block mb-1">
                    Or Use Custom Stock Video URL
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      type="url"
                      placeholder="https://.../video.mp4"
                      value={customInputUrl}
                      onChange={(e) => setCustomInputUrl(e.target.value)}
                      className="flex-1 bg-black/50 border border-rose-500/30 rounded-lg px-2.5 py-1 text-[11px] text-rose-100 placeholder-rose-500/40 focus:outline-none focus:border-rose-400"
                    />
                    <button
                      type="submit"
                      disabled={!customInputUrl.trim()}
                      className="px-2.5 py-1 rounded-lg bg-rose-900/80 hover:bg-rose-800 disabled:opacity-40 text-rose-100 text-[11px] font-medium cursor-pointer transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trigger Pill Button */}
          <motion.button
            id="video-background-toggle-button"
            onClick={() => setIsControlOpen(!isControlOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full romantic-glass border text-xs cursor-pointer transition-all duration-300 shadow-lg ${
              isEnabled && !hasError
                ? 'border-rose-500/30 hover:border-rose-400/60 text-rose-300 hover:text-rose-100'
                : 'border-white/10 text-rose-500/50 hover:text-rose-300'
            }`}
            title="Video Ambiance Settings"
            aria-label="Toggle ambient video background settings"
          >
            <Film className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-[11px] uppercase tracking-wider font-medium hidden sm:inline">
              Ambiance
            </span>
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isEnabled && !hasError ? 'bg-rose-500 animate-pulse' : 'bg-rose-950'
              }`}
            />
          </motion.button>
        </div>
      )}
    </>
  );
};
