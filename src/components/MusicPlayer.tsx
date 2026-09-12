import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Music,
  Disc,
  Sparkles,
  Upload,
  Settings2,
  X,
  Play,
  Pause,
  Trash2,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  saveAudioToStorage,
  loadAudioFromStorage,
  clearAudioFromStorage,
} from '../utils/audioStorage';

// Web Audio synthesizer for soothing ambient romantic chords
class RomanticSoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timeoutId: any = null;

  // Romantic chord progressions (Fmaj7 -> Cmaj7 -> Dm7 -> Bbmaj7)
  private chords = [
    [174.61, 220.0, 261.63, 329.63, 392.0], // F3, A3, C4, E4, G4
    [130.81, 196.0, 261.63, 329.63, 392.0], // C3, G3, C4, E4, G4
    [146.83, 220.0, 261.63, 349.23, 440.0], // D3, A3, C4, F4, A4
    [116.54, 174.61, 233.08, 293.66, 349.23], // Bb2, F3, Bb3, D4, F4
  ];
  private chordIndex = 0;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private currentVolume = 0.7;

  public setVolume(vol: number) {
    this.currentVolume = vol;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  public resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (!this.isPlaying) {
      this.start(this.currentVolume);
    }
  }

  public start(volume = 0.7) {
    this.currentVolume = volume;
    try {
      if (!this.ctx || this.ctx.state === 'closed') {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      if (!this.gainNode && this.ctx) {
        // Master gain
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);

        // Warm romantic acoustic low-pass filter
        this.filterNode = this.ctx.createBiquadFilter();
        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.setValueAtTime(1600, this.ctx.currentTime);
        this.filterNode.Q.setValueAtTime(1.0, this.ctx.currentTime);

        this.gainNode.connect(this.filterNode);
        this.filterNode.connect(this.ctx.destination);
      } else if (this.gainNode && this.ctx) {
        this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
      }

      if (!this.isPlaying) {
        this.isPlaying = true;
        this.playNextArpeggio();
      }
    } catch (e) {
      console.warn('AudioContext autoplay awaiting user gesture:', e);
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.ctx && this.ctx.state !== 'closed') {
      try {
        this.ctx.close();
      } catch (e) {
        // ignore
      }
    }
    this.ctx = null;
    this.gainNode = null;
    this.filterNode = null;
  }

  private playTone(freq: number, startTime: number, duration: number) {
    if (!this.ctx || this.ctx.state === 'closed' || !this.gainNode) return;
    try {
      // Primary sine wave note
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Gentle attack and organic romantic chime decay
      noteGain.gain.setValueAtTime(0.0001, startTime);
      noteGain.gain.exponentialRampToValueAtTime(0.14, startTime + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);

      // Subtle soft harmonic overtone for warmth
      const osc2 = this.ctx.createOscillator();
      const noteGain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, startTime);
      noteGain2.gain.setValueAtTime(0.0001, startTime);
      noteGain2.gain.exponentialRampToValueAtTime(0.025, startTime + 0.05);
      noteGain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.7);

      osc2.connect(noteGain2);
      noteGain2.connect(this.gainNode);

      osc2.start(startTime);
      osc2.stop(startTime + duration + 0.1);
    } catch (e) {
      // Audio safety
    }
  }

  private playNextArpeggio = () => {
    if (!this.isPlaying || !this.ctx) return;
    const currentChord = this.chords[this.chordIndex];
    const now = this.ctx.currentTime;

    currentChord.forEach((note, idx) => {
      this.playTone(note, now + idx * 0.38, 2.6);
    });

    this.chordIndex = (this.chordIndex + 1) % this.chords.length;
    this.timeoutId = setTimeout(this.playNextArpeggio, 2400);
  };
}

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [songTitle, setSongTitle] = useState<string>('Romantic Ambient Melody');
  const [hasCustomSong, setHasCustomSong] = useState(false);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.8);
  const [urlInput, setUrlInput] = useState('');
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const synthRef = useRef<RomanticSoundSynthesizer | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Auto-play on startup and handle browser gesture policy
  useEffect(() => {
    synthRef.current = new RomanticSoundSynthesizer();

    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener('open-music-modal', handleOpenModal);

    // 1. Immediately start synthesizer ambient music for immediate playback
    synthRef.current.start(volume);

    // 2. Check if a custom uploaded audio file exists in storage
    loadAudioFromStorage().then((saved) => {
      if (saved && saved.blob) {
        const objectUrl = URL.createObjectURL(saved.blob);
        setCustomAudioUrl(objectUrl);
        setSongTitle(saved.meta.name || 'Our Love Song');
        setHasCustomSong(true);
        if (audioRef.current) {
          audioRef.current.src = objectUrl;
          audioRef.current.volume = volume;
          audioRef.current
            .play()
            .then(() => {
              synthRef.current?.stop();
              setIsPlaying(true);
            })
            .catch(() => {
              // Browser may restrict until first interaction
            });
        }
      }
    });

    // 3. Fallback for browser autoplay policies:
    // Seamlessly unblock and resume audio on the very first touch/click anywhere on page
    const handleFirstGesture = () => {
      if (synthRef.current) {
        synthRef.current.resume();
      }
      if (audioRef.current && audioRef.current.src) {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(true);
    };

    const gestureEvents = ['pointerdown', 'touchstart', 'click', 'keydown'] as const;
    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, handleFirstGesture, { passive: true });
    });

    return () => {
      window.removeEventListener('open-music-modal', handleOpenModal);
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstGesture);
      });
      synthRef.current?.stop();
      if (customAudioUrl) {
        URL.revokeObjectURL(customAudioUrl);
      }
    };
  }, []);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    synthRef.current?.setVolume(volume);
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const playMusic = () => {
    if (hasCustomSong && audioRef.current && audioRef.current.src) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio play error, falling back to synth', err);
          synthRef.current?.start(volume);
          setIsPlaying(true);
        });
    } else {
      synthRef.current?.start(volume);
      setIsPlaying(true);
    }
  };

  const pauseMusic = () => {
    synthRef.current?.stop();
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  // Handle file upload from user's phone or computer
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadStatus('Saving audio...');
      await saveAudioToStorage(file);

      if (customAudioUrl) {
        URL.revokeObjectURL(customAudioUrl);
      }

      const newUrl = URL.createObjectURL(file);
      setCustomAudioUrl(newUrl);
      setSongTitle(file.name);
      setHasCustomSong(true);
      setUploadStatus(`Added: ${file.name}`);

      if (audioRef.current) {
        audioRef.current.src = newUrl;
        audioRef.current.volume = volume;
        synthRef.current?.stop();
        audioRef.current.play().then(() => setIsPlaying(true));
      }

      setTimeout(() => setUploadStatus(null), 3000);
    } catch (err) {
      console.error('Error storing audio file', err);
      setUploadStatus('Could not save audio file. Please try a different audio format.');
    }
  };

  // Handle custom URL input
  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    const url = urlInput.trim();
    if (customAudioUrl) {
      URL.revokeObjectURL(customAudioUrl);
    }
    setCustomAudioUrl(url);
    setSongTitle('Web Stream Audio');
    setHasCustomSong(true);

    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.volume = volume;
      synthRef.current?.stop();
      audioRef.current.play().then(() => setIsPlaying(true));
    }
    setUrlInput('');
    setUploadStatus('Audio link applied!');
    setTimeout(() => setUploadStatus(null), 3000);
  };

  // Switch back to ambient melody preset
  const handleUsePreset = async () => {
    pauseMusic();
    await clearAudioFromStorage();
    if (customAudioUrl) {
      URL.revokeObjectURL(customAudioUrl);
    }
    setCustomAudioUrl(null);
    setHasCustomSong(false);
    setSongTitle('Romantic Ambient Melody');
    if (audioRef.current) {
      audioRef.current.src = '';
    }
    synthRef.current?.start(volume);
    setIsPlaying(true);
    setUploadStatus('Switched to Romantic Ambient Melody');
    setTimeout(() => setUploadStatus(null), 2500);
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
        }}
      />

      {/* Floating Music Control Bar in Top-Right */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-1.5 sm:gap-2">
        {/* Play/Pause Main Pill */}
        <motion.button
          id="music-player-toggle"
          onClick={togglePlay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative group flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full transition-all duration-300 romantic-glass border cursor-pointer ${
            isPlaying
              ? 'border-rose-500/50 bg-rose-950/50 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.35)]'
              : 'border-white/10 hover:border-rose-500/30 text-rose-300/80 hover:text-rose-100'
          }`}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          <div className="relative flex items-center justify-center w-5 h-5">
            <Disc
              className={`w-4 h-4 transition-transform duration-700 ${
                isPlaying ? 'animate-spin text-rose-400' : 'text-rose-300/70'
              }`}
              style={{ animationDuration: '3.5s' }}
            />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </div>

          <span className="text-xs tracking-wider uppercase font-medium max-w-[85px] sm:max-w-[120px] truncate">
            {isPlaying ? 'Playing' : 'Paused'}
          </span>

          {isPlaying ? (
            <div className="flex items-center gap-0.5 ml-0.5">
              <span className="w-0.5 h-3 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 h-4 bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <Play className="w-3.5 h-3.5 text-rose-400/80 fill-rose-400/30" />
          )}
        </motion.button>

        {/* Change / Add Song Button */}
        <motion.button
          id="music-settings-button"
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="p-2 sm:p-2.5 rounded-full romantic-glass border border-rose-500/30 hover:border-rose-400/60 text-rose-300 hover:text-rose-100 transition-colors shadow-lg cursor-pointer"
          title="Add / Change Song"
          aria-label="Add or change background music"
        >
          <Music className="w-4 h-4 text-rose-400" />
        </motion.button>
      </div>

      {/* Add / Change Music Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md romantic-glass rounded-3xl p-6 sm:p-7 border border-rose-500/30 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-rose-950/60 hover:bg-rose-900 border border-rose-500/20 text-rose-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-rose-950/80 border border-rose-500/40 flex items-center justify-center text-rose-400">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-cormorant text-2xl text-rose-100 font-bold">
                    Background Music
                  </h3>
                  <p className="text-xs text-rose-400/80">
                    Add Jothi's favorite song or keep our ambient melody
                  </p>
                </div>
              </div>

              {/* Status Message */}
              {uploadStatus && (
                <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-400/40 text-xs text-rose-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{uploadStatus}</span>
                </div>
              )}

              {/* Current Song Box */}
              <div className="mb-5 p-4 rounded-2xl bg-black/40 border border-rose-500/20 flex items-center justify-between">
                <div className="overflow-hidden mr-2">
                  <span className="text-[11px] uppercase tracking-wider text-rose-400/70 font-semibold block">
                    Now Selected
                  </span>
                  <p className="text-sm font-medium text-rose-100 truncate mt-0.5">
                    {songTitle}
                  </p>
                </div>
                <button
                  onClick={togglePlay}
                  className="px-3.5 py-1.5 rounded-full bg-rose-800 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer shadow-md"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Play
                    </>
                  )}
                </button>
              </div>

              {/* Upload Option 1: File from device */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/40 to-pink-950/30 border border-rose-500/25">
                  <label className="text-xs uppercase tracking-wider text-rose-300 font-semibold flex items-center gap-1.5 mb-2">
                    <Upload className="w-3.5 h-3.5 text-rose-400" />
                    <span>Upload Song from Phone / PC</span>
                  </label>
                  <p className="text-xs text-rose-400/70 mb-3">
                    Select an MP3, M4A, or WAV audio file from your device:
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 px-4 rounded-xl romantic-glow-btn text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Choose Audio File</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*,.mp3,.m4a,.wav,.aac,.ogg"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>

                {/* Option 2: Paste direct audio URL */}
                <form onSubmit={handleApplyUrl} className="p-4 rounded-2xl bg-black/30 border border-rose-500/20">
                  <label className="text-xs uppercase tracking-wider text-rose-300 font-semibold block mb-1.5">
                    Or Paste Audio Link (URL)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/our-song.mp3"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="flex-1 bg-black/50 border border-rose-500/30 rounded-xl px-3 py-2 text-xs text-rose-100 placeholder-rose-400/40 focus:outline-none focus:border-rose-400"
                    />
                    <button
                      type="submit"
                      disabled={!urlInput.trim()}
                      className="px-3.5 py-2 rounded-xl bg-rose-900/80 hover:bg-rose-800 disabled:opacity-40 text-rose-100 text-xs font-medium cursor-pointer transition-colors"
                    >
                      Use
                    </button>
                  </div>
                </form>

                {/* Option 3: Reset to built-in romantic melody */}
                {hasCustomSong && (
                  <button
                    onClick={handleUsePreset}
                    className="w-full py-2 px-3 rounded-xl bg-transparent hover:bg-rose-950/50 border border-rose-500/20 text-xs text-rose-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>Reset to Built-in Romantic Melody</span>
                  </button>
                )}

                {/* Volume Slider */}
                <div className="pt-2 flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-rose-400 shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full accent-rose-500 bg-rose-950/60 h-1.5 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs text-rose-400/80 w-8 text-right font-mono">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-rose-500/15 text-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs text-rose-400/80 hover:text-rose-200 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
