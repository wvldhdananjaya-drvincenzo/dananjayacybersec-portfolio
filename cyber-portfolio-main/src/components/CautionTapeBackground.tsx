import React from 'react';
import { motion } from 'motion/react';

export default function CautionTapeBackground() {
  // Repeated tagline items for continuous seamless ticker
  const tickerItems = Array(12).fill([
    { text: 'NETWORKING', icon: '⚡' },
    { text: 'ETHICAL HACKING', icon: '🔒' },
    { text: 'SECURITY RESEARCHES', icon: '🛡️' },
  ]).flat();

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Subtle Monochrome Dark/Light Grid Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* =========================================================================
          STABLE BLACK CAUTION TAPES WITH BOLD WHITE TEXT & EMOJIS
          Fixed in position behind WHAT I DO section with continuous horizontal marquee ticker
         ========================================================================= */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        
        <div className="w-[170%] sm:w-[145%] md:w-[130%] transform -rotate-12 space-y-4 sm:space-y-6 my-auto">
          
          {/* TAPE LINE 1 (Pure Black Tape - Leftward Continuous Ticker) */}
          <div className="relative w-full bg-black border-y-2 border-white/30 shadow-[0_15px_35px_rgba(0,0,0,0.5)] py-3 sm:py-4 overflow-hidden flex items-center">
            {/* Subtle Hash Pattern Texture Accent */}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff_10%,transparent_10%,transparent_50%,#ffffff_50%,#ffffff_60%,transparent_60%,transparent_100%)] [background-size:20px_20px] opacity-10 pointer-events-none" />
            
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
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
              transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
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

          {/* TAPE LINE 2 (Pure Black Tape - Rightward Continuous Ticker) */}
          <div className="relative w-full bg-[#09090b] border-y-2 border-white/25 shadow-[0_20px_40px_rgba(0,0,0,0.6)] py-3 sm:py-4 overflow-hidden flex items-center">
            {/* Subtle Hash Pattern Texture Accent */}
            <div className="absolute inset-0 bg-[linear-gradient(-135deg,#ffffff_10%,transparent_10%,transparent_50%,#ffffff_50%,#ffffff_60%,transparent_60%,transparent_100%)] [background-size:20px_20px] opacity-10 pointer-events-none" />

            <motion.div
              animate={{ x: ['-50%', '0%'] }}
              transition={{ repeat: Infinity, duration: 26, ease: 'linear' }}
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
              transition={{ repeat: Infinity, duration: 26, ease: 'linear' }}
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
    </div>
  );
}



