import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, RotateCcw, MapPin, Sparkles } from 'lucide-react';
import { kichbanData } from '../data/kichbanData';
import DialogueBox from './DialogueBox';
import CouponCard from './CouponCard';

export default function TayHoGame() {
  const [currentStage, setCurrentStage] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [dialogueVisible, setDialogueVisible] = useState(false);
  
  // Dialogue state machine variables
  const [dialogueState, setDialogueState] = useState('dialogues'); // 'dialogues', 'choices', 'choice_feedback', 'question1', 'question1_feedback', 'postVerifiedDialogues', 'question2', 'question2_feedback', 'postQuestion2Dialogues', 'question3', 'question3_feedback', 'postQuestion3Dialogues', 'wishChoices', 'wish_feedback', 'postWishDialogues', 'endingDialogues', 'complete', 'final'
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [customDialogue, setCustomDialogue] = useState('');

  // Global game state variables
  const [verified, setVerified] = useState(false);
  const [endingChosen, setEndingChosen] = useState(null);
  const [wishPath, setWishPath] = useState(null);
  const [countdownActive, setCountdownActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [wrongChoiceIndex, setWrongChoiceIndex] = useState(null);
  const [incorrectFlash, setIncorrectFlash] = useState(false);
  const [bgTransitioning, setBgTransitioning] = useState(false);
  
  // Audio states
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioCtxRef = useRef(null);
  const synthIntervalRef = useRef(null);

  const stageData = kichbanData[currentStage];

  // Sync basic stage info and reset dialog states when stage changes
  useEffect(() => {
    setDialogueState('dialogues');
    setDialogueIndex(0);
    setVerified(false);
    setWrongChoiceIndex(null);
    setCountdownActive(false);
    setTimeLeft(0);
  }, [currentStage]);

  // Manage dialogue visibility timing (delay Chặng 0 dialogue box until Cô Bơ fades in)
  useEffect(() => {
    if (gameStarted) {
      if (currentStage === 0) {
        setDialogueVisible(false);
        const timer = setTimeout(() => {
          setDialogueVisible(true);
        }, 3000); // 3 seconds matching the fade-in animation
        return () => clearTimeout(timer);
      } else {
        setDialogueVisible(true);
      }
    } else {
      setDialogueVisible(false);
    }
  }, [currentStage, gameStarted]);

  // Handle countdown tick
  useEffect(() => {
    let timer;
    if (countdownActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (countdownActive && timeLeft === 0) {
      setCountdownActive(false);
    }
    return () => clearTimeout(timer);
  }, [countdownActive, timeLeft]);

  // Sound chime helpers
  const playChime = (isSuccess) => {
    if (!audioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      if (isSuccess) {
        // Pentatonic C5 (523.25) -> G5 (783.99) chime
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else {
        // Low buzzer buzz
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
      
      osc.connect(gain);
      gain.connect(ctx.destination);
    } catch(e) {}
  };

  // Web Audio ambient music player (Vietnamese Pentatonic Synth)
  const toggleAudio = () => {
    if (audioEnabled) {
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
        synthIntervalRef.current = null;
      }
      setAudioEnabled(false);
    } else {
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        playAmbientLoop();
        setAudioEnabled(true);
      } catch (e) {
        console.error("Web Audio failed", e);
      }
    }
  };

  const playAmbientLoop = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const scale = [261.63, 293.66, 349.23, 392.00, 440.00, 523.25];
    
    // Low wave/drone
    const droneOsc = ctx.createOscillator();
    const droneGain = ctx.createGain();
    droneOsc.type = 'triangle';
    droneOsc.frequency.setValueAtTime(65.41, ctx.currentTime); 
    droneGain.gain.setValueAtTime(0.04, ctx.currentTime);
    droneOsc.connect(droneGain);
    droneGain.connect(ctx.destination);
    droneOsc.start();

    const triggerNote = () => {
      if (!audioEnabled && synthIntervalRef.current === null) {
        try { droneOsc.stop(); } catch(e){}
        return;
      }
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sine';
      
      const baseFreq = scale[Math.floor(Math.random() * scale.length)];
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05); 
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8); 
      
      osc.frequency.linearRampToValueAtTime(baseFreq + 4, ctx.currentTime + 0.1);
      osc.frequency.linearRampToValueAtTime(baseFreq - 4, ctx.currentTime + 0.4);
      osc.frequency.linearRampToValueAtTime(baseFreq, ctx.currentTime + 0.7);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 2.0);
    };

    triggerNote();
    synthIntervalRef.current = setInterval(triggerNote, 2200);
  };

  useEffect(() => {
    return () => {
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
      }
    };
  }, []);

  const startCountdown = (seconds) => {
    setTimeLeft(seconds);
    setCountdownActive(true);
  };

  // Compute what dialogue text to show
  const getCurrentDialogueText = () => {
    switch (dialogueState) {
      case 'dialogues':
        return stageData.dialogues[dialogueIndex];
      case 'postVerifiedDialogues':
        return stageData.postVerifiedDialogues[dialogueIndex];
      case 'postQuestion1Dialogues':
        return stageData.postQuestion1Dialogues[dialogueIndex];
      case 'postQuestion2Dialogues':
        return stageData.postQuestion2Dialogues[dialogueIndex];
      case 'postQuestion3Dialogues':
        return stageData.postQuestion3Dialogues[dialogueIndex];
      case 'postChoiceDialogues':
        return stageData.postChoiceDialogues[dialogueIndex];
      case 'postWishDialogues':
        return stageData.postWishDialogues[dialogueIndex];
      case 'question1_feedback':
      case 'question2_feedback':
      case 'question3_feedback':
      case 'choice_feedback':
      case 'wish_feedback':
        return customDialogue;
      case 'endingDialogues':
        return stageData.endings[endingChosen || 'A'].dialogues[dialogueIndex];
      default:
        return '';
    }
  };

  // Dialogue progression handler
  const handleDialogueNext = () => {
    if (dialogueState === 'dialogues') {
      if (dialogueIndex < stageData.dialogues.length - 1) {
        setDialogueIndex(prev => prev + 1);
      } else {
        if (currentStage === 0) {
          setDialogueState('choices');
        } else if (currentStage === 1) {
          setDialogueState('question1');
        } else if (currentStage === 2) {
          setDialogueState('question1');
        } else if (currentStage === 3) {
          setDialogueState('choices');
        } else if (currentStage === 4) {
          setDialogueState('choices');
        } else if (currentStage === 5) {
          setDialogueState('endingDialogues');
          setDialogueIndex(0);
        }
      }
    } 
    else if (dialogueState === 'choice_feedback') {
      if (currentStage === 0) {
        setDialogueState('complete');
        if (stageData.countdown > 0) {
          startCountdown(stageData.countdown);
        }
      } else if (currentStage === 3) {
        setDialogueState('postChoiceDialogues');
        setDialogueIndex(0);
      } else if (currentStage === 4) {
        if (wishPath !== null) {
          setDialogueState('postWishDialogues');
          setDialogueIndex(0);
          if (stageData.countdown > 0) {
            startCountdown(stageData.countdown);
          }
        } else {
          setDialogueState('postChoiceDialogues');
          setDialogueIndex(0);
        }
      }
    } 
    else if (dialogueState === 'postChoiceDialogues') {
      if (dialogueIndex < stageData.postChoiceDialogues.length - 1) {
        setDialogueIndex(prev => prev + 1);
      } else {
        if (currentStage === 3) {
          setDialogueState('complete');
          if (stageData.countdown > 0) {
            startCountdown(stageData.countdown);
          }
        } else if (currentStage === 4) {
          setDialogueState('wishChoices');
        }
      }
    }
    else if (dialogueState === 'wish_feedback') {
      setDialogueState('postWishDialogues');
      setDialogueIndex(0);
    }
    else if (dialogueState === 'postWishDialogues') {
      if (dialogueIndex < stageData.postWishDialogues.length - 1) {
        setDialogueIndex(prev => prev + 1);
      } else {
        setDialogueState('complete');
      }
    }
    else if (dialogueState === 'question1_feedback') {
      if (wrongChoiceIndex !== null) {
        setDialogueState('question1');
        setWrongChoiceIndex(null);
      } else {
        if (currentStage === 1) {
          setDialogueState('postVerifiedDialogues');
          setDialogueIndex(0);
        } else if (currentStage === 2) {
          setDialogueState('postQuestion1Dialogues');
          setDialogueIndex(0);
        }
      }
    }
    else if (dialogueState === 'postVerifiedDialogues') {
      if (dialogueIndex < stageData.postVerifiedDialogues.length - 1) {
        setDialogueIndex(prev => prev + 1);
      } else {
        if (currentStage === 1) {
          setDialogueState('question2');
          setVerified(false);
        }
      }
    }
    else if (dialogueState === 'question2_feedback') {
      if (wrongChoiceIndex !== null) {
        setDialogueState('question2');
        setWrongChoiceIndex(null);
      } else {
        setDialogueState('postQuestion2Dialogues');
        setDialogueIndex(0);
      }
    }
    else if (dialogueState === 'postQuestion1Dialogues') {
      if (dialogueIndex < stageData.postQuestion1Dialogues.length - 1) {
        setDialogueIndex(prev => prev + 1);
      } else {
        if (currentStage === 2) {
          setDialogueState('question2');
          setVerified(false);
        }
      }
    }
    else if (dialogueState === 'postQuestion2Dialogues') {
      if (dialogueIndex < stageData.postQuestion2Dialogues.length - 1) {
        setDialogueIndex(prev => prev + 1);
      } else {
        if (currentStage === 1) {
          setDialogueState('complete');
          if (stageData.countdown > 0) {
            startCountdown(stageData.countdown);
          }
        } else if (currentStage === 2) {
          setDialogueState('question3');
          setVerified(false);
        }
      }
    }
    else if (dialogueState === 'question3_feedback') {
      if (wrongChoiceIndex !== null) {
        setDialogueState('question3');
        setWrongChoiceIndex(null);
      } else {
        setDialogueState('postQuestion3Dialogues');
        setDialogueIndex(0);
      }
    }
    else if (dialogueState === 'postQuestion3Dialogues') {
      if (dialogueIndex < stageData.postQuestion3Dialogues.length - 1) {
        setDialogueIndex(prev => prev + 1);
      } else {
        if (currentStage === 2) {
          setDialogueState('complete');
          if (stageData.countdown > 0) {
            startCountdown(stageData.countdown);
          }
        }
      }
    }
    else if (dialogueState === 'endingDialogues') {
      const endingLines = stageData.endings[endingChosen || 'A'].dialogues;
      if (dialogueIndex < endingLines.length - 1) {
        setDialogueIndex(prev => prev + 1);
      } else {
        setDialogueState('final');
      }
    }
  };

  // Quiz / choice option select handlers
  const handleChoiceSelect = (choice, idx) => {
    if (choice.correct) {
      setVerified(true);
      setWrongChoiceIndex(null);
      setCustomDialogue(choice.feedback);
      
      const feedbackStateName = 
        dialogueState === 'question1' ? 'question1_feedback' :
        dialogueState === 'question2' ? 'question2_feedback' : 'question3_feedback';
      setDialogueState(feedbackStateName);
      
      playChime(true);
    } else {
      setWrongChoiceIndex(idx);
      setIncorrectFlash(true);
      setCustomDialogue(choice.feedback);
      
      const feedbackStateName = 
        dialogueState === 'question1' ? 'question1_feedback' :
        dialogueState === 'question2' ? 'question2_feedback' : 'question3_feedback';
      setDialogueState(feedbackStateName);
      
      playChime(false);

      setTimeout(() => {
        setIncorrectFlash(false);
      }, 600);
    }
  };

  const handleOptionSelect = (choice) => {
    setDialogueState('choice_feedback');
    setCustomDialogue(choice.reply);
    
    if (choice.ending) {
      setEndingChosen(choice.ending);
    }
    if (choice.wish) {
      setWishPath(choice.wish);
    }
    playChime(true);
  };

  const handleNextStage = () => {
    if (currentStage < kichbanData.length - 1) {
      setBgTransitioning(true);
      setTimeout(() => {
        setCurrentStage((prev) => prev + 1);
        setTimeout(() => {
          setBgTransitioning(false);
        }, 150);
      }, 500);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentStage(0);
    setDialogueState('dialogues');
    setDialogueIndex(0);
    setCustomDialogue('');
    setVerified(false);
    setEndingChosen(null);
    setWishPath(null);
    setCountdownActive(false);
    setTimeLeft(0);
    setWrongChoiceIndex(null);
    setIncorrectFlash(false);
  };



  const getCharacterClassName = () => {
    let base = stageData.characterStyle || '';
    base = base
      .replace(/bottom-0/g, '')
      .replace(/left-\[[^\]]+\]/g, '')
      .replace(/md:left-\[[^\]]+\]/g, '')
      .replace(/absolute/g, '')
      .replace(/animate-pulse-slow/g, '')
      .trim();

    if (currentStage === 0) {
      return `${base} animate-character-fade-in`;
    }
    return `${base} animate-pulse-slow`;
  };

  // Compile dialogue text and choices for DialogueBox props
  const currentDialogueText = getCurrentDialogueText();

  const getActiveChoices = () => {
    if (dialogueState === 'choices') {
      return stageData.choices;
    }
    if (dialogueState === 'wishChoices') {
      return stageData.wishChoices;
    }
    return null;
  };

  const getActiveQuestion = () => {
    if (dialogueState === 'question1') {
      return stageData.question;
    }
    if (dialogueState === 'question2') {
      return stageData.question2;
    }
    if (dialogueState === 'question3') {
      return stageData.question3;
    }
    return null;
  };

  if (!gameStarted) {
    return (
      <div 
        className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center transition-all duration-700"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(14, 7, 5, 0.5) 0%, rgba(14, 7, 5, 0.4) 50%, rgba(14, 7, 5, 0.95) 100%), url(${kichbanData[0].background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="z-10 text-center max-w-lg px-6 flex flex-col items-center gap-6 animate-scale-up">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-[#D4AF37] tracking-widest uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
              Tây Hồ
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold text-[#D4AF37]/90 tracking-[0.2em] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] mt-1">
              Huyền Thoại
            </h2>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
            <p className="text-xs sm:text-sm text-slate-300 font-sans tracking-[0.15em] uppercase mt-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              Hành Trình Tương Tác Thực Địa Phủ Tây Hồ
            </p>
          </div>

          <button
            onClick={() => {
              setGameStarted(true);
              if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
                audioCtxRef.current.resume();
              }
            }}
            className="group relative px-10 py-4 mt-6 rounded-full border-2 border-[#D4AF37] bg-[#1e110d]/80 text-[#D4AF37] hover:text-[#1e110d] hover:bg-[#D4AF37] font-serif font-bold text-base tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all duration-500 cursor-pointer animate-float"
          >
            BẮT ĐẦU HÀNH TRÌNH
          </button>
        </div>

        {/* Decorative corner lines in screen */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]/45 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37]/45 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37]/45 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]/45 rounded-br-lg pointer-events-none" />

        {/* Bottom copyright/heritage tag */}
        <div className="absolute bottom-10 z-10 border border-[#D4AF37]/20 bg-black/55 px-4 py-2 text-[10px] sm:text-xs font-serif tracking-[0.2em] text-[#D4AF37]">
          DI SẢN VĂN HÓA PHI VẬT THỂ
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative w-full h-screen overflow-hidden bg-black flex flex-col justify-between transition-all duration-700 ${
        incorrectFlash ? 'animate-incorrect-glow' : ''
      }`}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(14, 7, 5, 0.45) 0%, rgba(14, 7, 5, 0.3) 50%, rgba(14, 7, 5, 0.9) 100%), url(${stageData.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Header Bar */}
      <div className="w-full px-5 py-4 flex justify-between items-center bg-gradient-to-b from-black/85 to-transparent relative z-20">
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <h2 className="text-sm font-serif font-bold text-[#D4AF37] uppercase tracking-widest">
              Tây Hồ Huyền Thoại
            </h2>
          </div>
          <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-400">
            <MapPin className="h-3 w-3 text-[#D4AF37]/70" />
            <span>{stageData.location}</span>
          </div>
        </div>

        {/* Audio and Restart buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
              audioEnabled 
                ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' 
                : 'bg-black/60 border-slate-700 text-slate-400 hover:border-slate-500'
            }`}
            title={audioEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
          >
            {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          
          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-slate-700 text-slate-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 cursor-pointer text-[10px] font-serif font-bold uppercase tracking-wider shadow-md"
            title="Quay lại từ đầu"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Quay lại</span>
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-[68px] left-0 w-full px-5 z-20">
        <div className="flex justify-between text-[9px] text-[#D4AF37]/80 font-serif mb-1 px-0.5">
          <span>HÀNH TRÌNH THỰC ĐỊA</span>
          <span>CHẶNG {currentStage}/5</span>
        </div>
        <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden border border-[#D4AF37]/15">
          <div 
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFB74D] rounded-full transition-all duration-500"
            style={{ width: `${(currentStage / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-grow flex items-end justify-center relative px-4 select-none z-10 pointer-events-none mt-14 pb-0 min-h-[200px] sm:min-h-[280px]">
        {stageData.character && dialogueState !== 'complete' && dialogueState !== 'final' && (
          <img
            src={stageData.character}
            alt={stageData.characterName}
            className={`h-[40vh] md:h-[46vh] max-h-[340px] md:max-h-[400px] object-contain transition-all duration-1000 pointer-events-auto ${getCharacterClassName()}`}
          />
        )}
      </div>

      {/* Interface Dialogue Box Section */}
      <div 
        className={`w-full p-4 pb-6 relative z-20 flex flex-col items-center gap-3 shrink-0 transition-opacity duration-1000 ${
          dialogueVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {dialogueVisible && (
          dialogueState === 'final' ? (
            // Final stage displays customized ending details and a simplified blessing layout
            <div className="w-full flex flex-col items-center gap-4 py-2">
              <div className="relative w-full max-w-2xl bg-[#1e110d]/90 border border-[#D4AF37]/50 rounded-2xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.95)] backdrop-blur-md">
                <div className="absolute -top-3.5 left-6 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#1e110d] px-5 py-1 rounded-full text-xs font-serif font-extrabold uppercase tracking-widest shadow-md border border-[#D4AF37]/30">
                  {stageData.speaker}
                </div>
                <p className="text-[#FFB74D] text-[10px] sm:text-xs font-serif font-bold uppercase tracking-widest block mb-2 text-left">
                  {stageData.speakerRole}
                </p>
                
                {/* Ending final dialogue */}
                <p className="text-slate-100 text-sm sm:text-base leading-relaxed text-justify font-sans">
                  {stageData.endings[endingChosen || 'A'].dialogues[stageData.endings[endingChosen || 'A'].dialogues.length - 1]}
                </p>
                
                {/* Visual Separator */}
                <div className="h-[1px] w-full bg-[#D4AF37]/30 my-4" />
                
                {/* Words of Mẫu Section */}
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed text-justify font-sans whitespace-pre-line pl-3 border-l-2 border-[#D4AF37]/50 mt-4">
                  Hành trình kết thúc. Nhưng việc gìn giữ di sản thì không.
                  {"\n\n"}
                  Mỗi câu chuyện được lắng nghe.
                  {"\n"}
                  Mỗi giá trị được trân trọng.
                  {"\n"}
                  Mỗi di sản được khám phá.
                  {"\n\n"}
                  Đều là một cách để quá khứ tiếp tục sống trong hiện tại.
                  {"\n\n"}
                  Cảm ơn con đã đồng hành cùng Phủ Tây Hồ.
                </p>
              </div>
              
              <button
                onClick={resetGame}
                className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFB74D] text-[#1a0f0d] hover:brightness-110 active:scale-95 font-serif font-bold text-sm tracking-widest shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="h-4 w-4" /> QUAY LẠI TỪ ĐẦU
              </button>
            </div>
          ) : (
            // Dialogue & Actions Box
            <>
              {dialogueState !== 'complete' && (
                <DialogueBox
                  speaker={stageData.speaker}
                  speakerRole={stageData.speakerRole}
                  dialogue={currentDialogueText}
                  onChoiceSelect={handleChoiceSelect}
                  wrongChoiceIndex={wrongChoiceIndex}
                  question={getActiveQuestion()}
                  verified={verified}
                  choices={getActiveChoices()}
                  onOptionSelect={handleOptionSelect}
                  audioEnabled={audioEnabled}
                  toggleAudio={toggleAudio}
                  onNext={handleDialogueNext}
                />
              )}

              {/* Navigation Button */}
              {/* Show navigation buttons when in complete stage */}
              {(dialogueState === 'complete') && (
                <div className="w-full max-w-2xl px-2">
                  <button
                    disabled={countdownActive}
                    onClick={handleNextStage}
                    className={`w-full py-3 px-6 rounded-xl font-serif font-bold text-sm uppercase tracking-widest shadow-lg transition-all duration-300 cursor-pointer flex justify-center items-center gap-2 ${
                      countdownActive
                        ? 'bg-slate-800/80 border border-slate-700 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#D4AF37] to-[#FFB74D] text-[#1e110d] hover:brightness-110 active:scale-[0.98]'
                    }`}
                  >
                    {countdownActive ? (
                      <>
                        Đang di chuyển thực địa... ({timeLeft}s)
                      </>
                    ) : (
                      <>
                        {stageData.buttonText}
                        <Sparkles className="h-4 w-4 animate-pulse" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )
        )}
      </div>

      {/* Black Transition Overlay */}
      <div 
        className={`absolute inset-0 bg-black z-50 pointer-events-none transition-opacity duration-500 ${
          bgTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
