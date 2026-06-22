import React, { useState } from 'react';
import { characters } from '../data/characters';
import CharacterDetailModal from './CharacterDetailModal';
import templeBg from '../assets/temple_bg.jpg';

export default function TempleScene() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  // Find the currently hovered character to display their info at the bottom
  const activeChar = characters.find(c => c.id === hoveredId);

  return (
    <div 
      className="relative h-screen w-full overflow-hidden flex flex-col justify-between bg-cover bg-center text-white select-none transition-all duration-700"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(14, 7, 5, 0.6) 0%, rgba(14, 7, 5, 0.4) 50%, rgba(14, 7, 5, 0.85) 100%), url(${templeBg})` 
      }}
    >
      {/* Top Header Section */}
      <header className="w-full p-6 sm:p-8 flex justify-between items-center relative z-20 shrink-0">
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-serif tracking-widest text-[#D4AF37] font-bold uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            HẦU ĐỒNG
          </h1>
        </div>
        
        {/* Cultural Tag */}
        <div className="hidden sm:block border border-[#D4AF37]/30 bg-black/40 backdrop-blur-sm px-4 py-2 text-xs font-serif tracking-widest text-[#D4AF37]">
          DI SẢN VĂN HÓA PHI VẬT THỂ
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10 py-4 overflow-hidden">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-end justify-center h-full max-h-[55vh] md:max-h-[60vh]">
          {characters.map((char) => {
            const isHovered = hoveredId === char.id;
            return (
              <div
                key={char.id}
                className="group relative flex flex-col items-center justify-end cursor-pointer transition-all duration-500 ease-out focus:outline-none"
                onMouseEnter={() => setHoveredId(char.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedCharacter(char)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedCharacter(char);
                  }
                }}
              >
                {/* Character Cutout Image (Optimized size to prevent pushing layout) */}
                <div className="relative w-full flex items-end justify-center overflow-visible z-10 transition-transform duration-500 group-hover:scale-[1.08]">
                  <img
                    src={char.image}
                    alt={char.name}
                    className={`h-[38vh] md:h-[45vh] max-h-[240px] md:max-h-[340px] object-contain transition-all duration-500 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] 
                      ${isHovered 
                        ? 'brightness-110 drop-shadow-[0_0_25px_rgba(212,175,55,0.45)]' 
                        : 'brightness-[0.85]'
                      }`}
                  />
                </div>

                {/* Character Label for Mobile (always visible) or Desktop hover indicator */}
                <div className="mt-4 text-center z-15 pointer-events-none transition-all duration-300">
                  <h3 className="text-xl sm:text-2xl font-serif text-[#D4AF37] tracking-wider font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    {char.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-sans drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                    {char.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Dynamic Descriptive Subtitle Footer */}
      <footer className="w-full pb-8 pt-4 px-6 text-center relative z-20 bg-gradient-to-t from-black via-black/80 to-transparent shrink-0 min-h-[160px] sm:min-h-[140px] flex items-center justify-center">
        <div className="max-w-3xl mx-auto w-full transition-all duration-500">
          {activeChar ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#D4AF37] font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {activeChar.name}
              </h2>
              <p className="text-[10px] sm:text-xs tracking-[0.3em] text-slate-400 uppercase mt-1">
                {activeChar.role}
              </p>
              <div className="h-[1px] w-16 bg-[#D4AF37]/50 mx-auto my-3" />
              <p className="text-sm sm:text-base text-slate-300 font-sans italic max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] animate-fade-in">
                "{activeChar.description}"
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl sm:text-2xl font-serif text-[#D4AF37]/80 tracking-widest uppercase font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Khám Phá Nghi Lễ
              </h2>
              <div className="h-[1px] w-12 bg-[#D4AF37]/30 mx-auto my-2" />
              <p className="text-xs sm:text-sm text-slate-400 font-sans uppercase tracking-[0.15em] max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] animate-pulse">
                Hãy nhấn vào một nhân vật để bắt đầu khám phá
              </p>
            </>
          )}
        </div>
      </footer>

      {/* Modal Detail Screen */}
      {selectedCharacter && (
        <CharacterDetailModal 
          character={selectedCharacter} 
          onClose={() => setSelectedCharacter(null)} 
        />
      )}
    </div>
  );
}
