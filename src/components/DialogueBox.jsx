import React, { useState, useEffect } from 'react';

export default function DialogueBox({
  speaker,
  speakerRole,
  dialogue,
  onOptionSelect,
  choices,
  question,
  wrongChoiceIndex,
  onChoiceSelect,
  verified,
  audioEnabled,
  toggleAudio,
  onNext,
  character
}) {
  const [displayedText, setDisplayedText] = useState('');

  // Reset text and do a typewriter effect when the dialogue changes
  useEffect(() => {
    if (!dialogue) {
      setDisplayedText('');
      return;
    }
    const cleanText = dialogue.normalize('NFC');
    let index = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      if (index < cleanText.length) {
        setDisplayedText(cleanText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [dialogue]);

  const isDialogueOnly = !choices && !question;
  const hasOptions = choices || (question && !verified);
  const activeSpeaker = hasOptions ? "BẠN" : speaker;

  return (
    <div
      onClick={isDialogueOnly ? onNext : undefined}
      className={`relative w-full max-w-4xl bg-[#1a0f0d]/90 border border-[#D4AF37]/45 rounded-2xl p-6 sm:p-8 pb-10 shadow-[0_15px_40px_rgba(0,0,0,0.95)] backdrop-blur-md transition-all duration-300 z-10 ${isDialogueOnly ? 'cursor-pointer hover:border-[#D4AF37]/80' : ''
        }`}
    >
      {/* Speaker Name Badge (Visual Novel style) */}
      {activeSpeaker && (
        <div className="absolute -top-4 right-6 md:right-10 bg-[#D4AF37] text-[#1a0f0d] px-6 py-1.5 rounded-full text-xs font-serif font-extrabold uppercase tracking-widest shadow-lg border border-white/20 select-none">
          {activeSpeaker}
        </div>
      )}

      {/* Main Dialogue Flex Row */}
      <div className="mt-2 flex flex-col md:flex-row md:items-start justify-between gap-6">
        {/* Left side: Role Subtitle & Main Dialogue Text + Choices */}
        <div className="flex-grow text-left">
          {speakerRole && (
            <span className="text-[10px] sm:text-xs font-serif tracking-widest text-[#FFB74D] uppercase font-bold block mb-2 select-none">
              {speakerRole}
            </span>
          )}

          {displayedText && (
            <div className="min-h-[40px] mb-3">
              <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed font-sans text-justify drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                {displayedText}
              </p>
            </div>
          )}

          {/* Interactive Options - Quiz Questions (Chặng 1, 2) */}
          {question && !verified && (
            <div className="mt-6 space-y-2.5 animate-fade-in">
              <p className="text-xs sm:text-sm text-slate-300 font-sans italic mb-3">
                {question.text}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {question.choices.map((choice, idx) => {
                  const isWrong = wrongChoiceIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        onChoiceSelect(choice, idx);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-lg border text-xs sm:text-sm font-sans transition-all duration-300 cursor-pointer ${isWrong
                        ? 'bg-red-950/50 border-red-500 text-red-200 animate-pulse'
                        : 'bg-black/35 border-[#D4AF37]/25 text-slate-200 hover:border-[#D4AF37]/80 hover:bg-[#D4AF37]/10'
                        }`}
                    >
                      <span className="font-serif text-[#D4AF37] mr-2">{String.fromCharCode(65 + idx)}.</span>
                      {choice.text}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Branching Dialog Choice Options (Chặng 3, 4) */}
          {choices && (
            <div className="mt-6 space-y-2.5 animate-fade-in">
              <div className="grid grid-cols-1 gap-2">
                {choices.map((choice, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOptionSelect(choice);
                    }}
                    className="w-full text-left px-4 py-2.5 rounded-lg border bg-black/35 border-[#D4AF37]/25 text-slate-200 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs sm:text-sm font-sans transition-all duration-300 cursor-pointer"
                  >
                    <span className="font-serif text-[#D4AF37] mr-2">{idx + 1}.</span>
                    {choice.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Continue indicator for dialogue only */}
      {isDialogueOnly && (
        <div className="absolute bottom-3.5 right-6 flex items-center gap-1 text-[9px] font-serif font-extrabold text-[#D4AF37] tracking-[0.15em] uppercase animate-pulse select-none pointer-events-none">
          Bấm để tiếp tục &raquo;
        </div>
      )}
    </div>
  );
}
