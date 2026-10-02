import React from 'react';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

export default function CautionTapeBanner() {
  // Tagline repeated for continuous ticker
  const tickerItems = Array(10).fill([
    { text: 'NETWORKING', icon: '⚡' },
    { text: 'ETHICAL HACKING', icon: '🔒' },
    { text: 'SECURITY RESEARCHES', icon: '🛡️' },
  ]).flat();

  return (
    <section 
      className="relative py-20 sm:py-28 md:py-32 bg-white text-black overflow-hidden select-none border-y border-gray-200"
    >
      {/* Background Light Grid Matrix Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Decorative Title Header - WHAT I DO SECTION */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mb-8 sm:mb-12 space-y-3">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-extrabold uppercase tracking-widest bg-black text-white border border-gray-300 shadow-sm">
          <Terminal className="w-3.5 h-3.5 text-white animate-pulse" />
          <span>WHAT I DO</span>
        </span>
        <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-black tracking-tight uppercase leading-tight">
          NETWORKING | ETHICAL HACKING | SECURITY RESEARCHES
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto font-light leading-relaxed">
          Interactive security perimeter with continuous active caution lines.
        </p>
      </div>

      {/* =========================================================================
          STABLE BLACK CAUTION TAPES WITH BOLD WHITE TEXT & EMOJIS (2 Parallel Tapes)
         ========================================================================= */}
      <div className="relative w-full flex items-center justify-center py-10 sm:py-16 overflow-hidden min-h-[220px] sm:min-h-[280px]">
        
        <div className="w-[160%] sm:w-[135%] md:w-[125%] transform -rotate-12 space-y-4 sm:space-y-6 my-auto">
          
          {/* TAPE LINE 1 (Top Black Tape - Leftward Continuous Ticker) */}
          <div className="relative w-full bg-black border-y-2 border-white/30 shadow-[0_15px_35px_rgba(0,0,0,0.6)] py-3 sm:py-4 overflow-hidden flex items-center">
            {/* Subtle Hash Pattern Texture Accent */}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff_10%,transparent_10%,transparent_50%,#ffffff_50%,#ffffff_60%,transparent_60%,transparent_100%)] [background-size:20px_20px] opacity-10 pointer-events-none" />
            
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              className="flex whitespace-nowrap items-center shrink-0 will-change-transform transform-gpu"
            >
              {tickerItems.map((item, i) => (
                <div key={`t1-${i}`} className="flex items-center gap-3 sm:gap-6 mx-3 sm:mx-6">
                  <span className="font-mono text-xs sm:text-sm md:text-base font-black tracking-[0.25em] text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
                    {item.text}
                  </span>
                  <span className="text-sm sm:text-base">
                    {item.icon}
                  </span>
                  <span className="text-white/40 font-mono text-xs font-bold">|</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              className="flex whitespace-nowrap items-center shrink-0 will-change-transform transform-gpu"
            >
              {tickerItems.map((item, i) => (
                <div key={`t1-dup-${i}`} className="flex items-center gap-3 sm:gap-6 mx-3 sm:mx-6">
                  <span className="font-mono text-xs sm:text-sm md:text-base font-black tracking-[0.25em] text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
                    {item.text}
                  </span>
                  <span className="text-sm sm:text-base">
                    {item.icon}
                  </span>
                  <span className="text-white/40 font-mono text-xs font-bold">|</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* TAPE LINE 2 (Bottom Black Tape - Rightward Continuous Ticker) */}
          <div className="relative w-full bg-[#09090b] border-y-2 border-white/25 shadow-[0_20px_40px_rgba(0,0,0,0.8)] py-3 sm:py-4 overflow-hidden flex items-center">
            {/* Subtle Hash Pattern Texture Accent */}
            <div className="absolute inset-0 bg-[linear-gradient(-135deg,#ffffff_10%,transparent_10%,transparent_50%,#ffffff_50%,#ffffff_60%,transparent_60%,transparent_100%)] [background-size:20px_20px] opacity-10 pointer-events-none" />

            <motion.div
              animate={{ x: ['-50%', '0%'] }}
              transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
              className="flex whitespace-nowrap items-center shrink-0 will-change-transform transform-gpu"
            >
              {tickerItems.map((item, i) => (
                <div key={`t2-${i}`} className="flex items-center gap-3 sm:gap-6 mx-3 sm:mx-6">
                  <span className="font-mono text-xs sm:text-sm md:text-base font-black tracking-[0.25em] text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
                    {item.text}
                  </span>
                  <span className="text-sm sm:text-base">
                    {item.icon}
                  </span>
                  <span className="text-white/40 font-mono text-xs font-bold">|</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              animate={{ x: ['-50%', '0%'] }}
              transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
              className="flex whitespace-nowrap items-center shrink-0 will-change-transform transform-gpu"
            >
              {tickerItems.map((item, i) => (
                <div key={`t2-dup-${i}`} className="flex items-center gap-3 sm:gap-6 mx-3 sm:mx-6">
                  <span className="font-mono text-xs sm:text-sm md:text-base font-black tracking-[0.25em] text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
                    {item.text}
                  </span>
                  <span className="text-sm sm:text-base">
                    {item.icon}
                  </span>
                  <span className="text-white/40 font-mono text-xs font-bold">|</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>

      </div>

    </section>
  );
}

