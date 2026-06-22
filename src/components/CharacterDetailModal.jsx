import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2 } from 'lucide-react';
import templeBg from '../assets/temple_bg.jpg';

export default function CharacterDetailModal({ character, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Lock body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setAudioError(false);
        })
        .catch((e) => {
          console.log("Audio autoplay prevented or file not found:", e);
          setIsPlaying(false);
        });
    }
    return () => {
      // Restore body scrolling when closed
      document.body.style.overflow = '';
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [character]);

  const toggleAudio = (e) => {
    e.stopPropagation(); // Avoid closing modal
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => {
          console.error("Audio error:", e);
          setAudioError(true);
        });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-end p-4 animate-fade-in overflow-hidden h-screen w-screen">
      {/* Blurred Temple Background Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${templeBg})`,
          filter: 'blur(8px)',
          transform: 'scale(1.05)'
        }}
        onClick={onClose}
      />
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Screen Close Button (Top Right) */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-50 rounded-full bg-black/60 border border-[#D4AF37]/30 p-3 text-[#D4AF37] hover:text-white hover:bg-[#D4AF37]/20 transition-all duration-300 shadow-lg"
        aria-label="Đóng"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Vertically-centered Character on the Left (Absolute Positioned, overlapping with Dialog Box) */}
      <div className="absolute left-[5%] md:left-[12%] top-0 bottom-0 flex items-center justify-center z-10 w-auto pointer-events-none">
        <img 
          src={character.image} 
          alt={character.name} 
          className="h-[75vh] md:h-[82vh] max-h-[720px] object-contain drop-shadow-[0_0_45px_rgba(212,175,55,0.4)] animate-character-zoom pointer-events-auto"
        />
      </div>

      {/* Bottom Visual Novel Dialogue Box */}
      <div 
        className="relative z-20 w-full max-w-5xl bg-[#1a0f0d]/90 border border-[#D4AF37]/45 rounded-2xl p-6 md:p-8 shadow-[0_-15px_40px_rgba(0,0,0,0.95)] backdrop-blur-md mb-2 sm:mb-4 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Character Name Badge (Visual Novel Style Pill) */}
        <div className="absolute -top-4 left-6 md:left-10 bg-gradient-to-r from-[#D4AF37] to-[#FFB74D] text-[#1a0f0d] px-6 py-1.5 rounded-full text-sm font-serif font-extrabold uppercase tracking-widest shadow-lg border border-white/20">
          {character.name}
        </div>

        {/* Dialogue Box Content */}
        <div className="mt-2 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-grow text-left">
            {/* Role / Title subtitle */}
            <span className="text-xs font-serif tracking-widest text-[#FFB74D] uppercase font-bold block mb-2">
              {character.role} &mdash; {character.titleDetail}
            </span>
            
            {/* Description Text */}
            <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed font-sans text-justify">
              {character.description}
            </p>
          </div>

          {/* Voice Player Controls inside the Dialog Box */}
          <div className="flex items-center gap-3 shrink-0 bg-black/40 border border-[#D4AF37]/20 rounded-xl p-3 sm:p-4 z-30">
            <button
              onClick={toggleAudio}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D4AF37] text-[#1a0f0d] hover:bg-[#FFB74D] transition-all duration-300 shadow-md shadow-[#D4AF37]/20 cursor-pointer"
              title={isPlaying ? "Tạm dừng" : "Nghe thuyết minh"}
            >
              {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
            </button>
            <div className="text-left">
              <p className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase flex items-center gap-1">
                <Volume2 className="h-3 w-3" /> THUYẾT MINH
              </p>
              <p className="text-[11px] text-slate-400">
                {isPlaying ? "Đang phát giọng nói..." : audioError ? "Không có audio" : "Bấm để nghe đọc"}
              </p>
            </div>
          </div>
        </div>

        {/* Hidden Audio element */}
        <audio 
          ref={audioRef}
          src={character.audio}
          onError={() => setAudioError(true)}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
}
