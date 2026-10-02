import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FilterState } from '../types';
const heroImgUrl = 'https://res.cloudinary.com/z9mdashc/image/upload/v1789121603/New_Project_5_hindcw.png';
// Cloudinary trimmed version that removes transparent padding for pixel-perfect centering and grounding shadow
const heroImgTrimmedUrl = 'https://res.cloudinary.com/z9mdashc/image/upload/e_trim/v1789121603/New_Project_5_hindcw.png';

const HERO_SLIDES = [
  {
    slogan: 'BUILDING SECURE DIGITAL FOUNDATIONS',
    title: 'NETWORK &\nCYBERSECURITY STUDENT',
    description: 'Exploring enterprise networking, system security, and defensive technologies through practical labs, real-world projects, and continuous learning.'
  },
  {
    slogan: 'THINK LIKE AN ATTACKER',
    title: 'ASPIRING\nPENETRATION TESTER',
    description: 'Identifying vulnerabilities, testing security controls, and developing hands-on offensive security skills through ethical hacking labs and CTF challenges.'
  },
  {
    slogan: 'SIMULATE • EXPLOIT • IMPROVE',
    title: 'RED TEAM\nENTHUSIAST',
    description: 'Studying adversary techniques, network exploitation, privilege escalation, and attack simulations to better understand real-world cyber threats.'
  },
  {
    slogan: 'QUESTION • ANALYZE • DISCOVER',
    title: 'SECURITY\nRESEARCHER',
    description: 'Researching emerging vulnerabilities, attack methods, security tools, and network technologies while documenting discoveries and practical solutions.'
  }
];

interface HeroProps {
  onApplyFilters?: (filters: FilterState) => void;
}

export default function Hero({ onApplyFilters }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const slideDuration = 5000; // 5 seconds smooth interval

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
    }, slideDuration);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center font-sans bg-white pt-24 sm:pt-32 md:pt-36 pb-16 sm:pb-20 overflow-hidden">
      {/* Pure clean white base */}
      <div className="absolute inset-0 bg-white pointer-events-none -z-20" />

      {/* Atmospheric Multi-Stop Studio Lighting Gradient on White Canvas */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden -z-10">
        {/* Soft Linear Horizon Wash from Top */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(248, 250, 252, 0.85) 0%, rgba(255, 255, 255, 0.3) 25%, rgba(255, 255, 255, 0.95) 75%, #FFFFFF 100%)'
          }}
        />

        {/* Primary Expansive Studio Key Light centered behind subject */}
        <div 
          className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[520px] sm:h-[620px] pointer-events-none opacity-90"
          style={{
            background: 'radial-gradient(ellipse 70% 55% at 50% 36%, rgba(226, 232, 240, 0.65) 0%, rgba(238, 242, 246, 0.45) 30%, rgba(248, 250, 252, 0.2) 60%, rgba(255, 255, 255, 0) 100%)'
          }}
        />

        {/* Delicate Warm Pearl Center Spotlight for dimensional warmth */}
        <div 
          className="absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 w-[85%] max-w-3xl h-[400px] pointer-events-none opacity-75"
          style={{
            background: 'radial-gradient(circle 360px at 50% 40%, rgba(254, 250, 242, 0.75) 0%, rgba(248, 250, 252, 0.35) 45%, rgba(255, 255, 255, 0) 80%)'
          }}
        />

        {/* Ambient Cool-Slate Horizontal Flare */}
        <div 
          className="absolute top-44 sm:top-52 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[240px] pointer-events-none opacity-50"
          style={{
            background: 'radial-gradient(ellipse 80% 40% at 50% 50%, rgba(219, 229, 245, 0.45) 0%, rgba(241, 245, 249, 0.15) 55%, transparent 80%)'
          }}
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full space-y-6 sm:space-y-8 my-auto">
        
        {/* Hero Subject with Perfect Studio Gradient & Shadow Integration */}
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative group w-full flex flex-col items-center justify-center max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl cursor-pointer"
        >
          {/* Radiant Aura directly hugging the cutout figure */}
          <div 
            className="absolute -inset-x-8 -inset-y-6 pointer-events-none -z-10 rounded-full blur-2xl opacity-70 transition-opacity duration-500 group-hover:opacity-90"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(224, 231, 255, 0.45) 0%, rgba(241, 245, 249, 0.25) 45%, transparent 75%)'
            }}
          />

          <div className="relative w-full flex flex-col items-center">
            {/* Cutout Image with CSS Gradient Alpha Masking (Seamless Dissolve into White Canvas) */}
            <div 
              className="relative w-full flex justify-center transition-all duration-500 ease-out group-hover:scale-[1.015] group-hover:-translate-y-1"
              style={{
                maskImage: 'linear-gradient(to bottom, black 0%, black 72%, rgba(0, 0, 0, 0.85) 82%, rgba(0, 0, 0, 0.35) 92%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 72%, rgba(0, 0, 0, 0.85) 82%, rgba(0, 0, 0, 0.35) 92%, transparent 100%)'
              }}
            >
              <img 
                src={heroImgTrimmedUrl} 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== heroImgUrl) {
                    target.src = heroImgUrl;
                  }
                }}
                alt="Dananjaya Wickramarachchi Hero" 
                className="w-full h-auto max-h-[310px] sm:max-h-[370px] md:max-h-[430px] lg:max-h-[490px] object-contain select-none filter contrast-[1.02] brightness-[1.01] drop-shadow-[0_10px_20px_rgba(15,23,42,0.07)] drop-shadow-[0_24px_42px_rgba(15,23,42,0.11)] drop-shadow-[0_2px_4px_rgba(15,23,42,0.03)]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Multi-Tier Grounding Contact Shadow underneath Subject */}
            <div className="relative w-full flex flex-col items-center pointer-events-none select-none -mt-4 sm:-mt-5">
              {/* Inner core contact occlusion shadow */}
              <div className="w-1/2 sm:w-2/5 max-w-sm h-3 sm:h-3.5 bg-neutral-900/[0.17] rounded-[100%] blur-md transition-all duration-500 group-hover:scale-105 group-hover:bg-neutral-900/[0.22]" />
              {/* Broad ambient floor shadow */}
              <div className="w-3/4 sm:w-2/3 max-w-lg h-5 sm:h-7 -mt-2 bg-slate-900/[0.08] rounded-[100%] blur-xl transition-all duration-500 group-hover:scale-105 group-hover:bg-slate-900/[0.12]" />
            </div>
          </div>
        </motion.div>

        {/* Hero Text Animation directly below profile image */}
        <div className="space-y-6 max-w-4xl select-none w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -35, scale: 0.96 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 flex flex-col items-center"
            >
              <div className="flex items-center gap-3">
                <span className="h-[1.5px] w-8 sm:w-12 bg-neutral-400 rounded-full" />
                <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-neutral-800">
                  {HERO_SLIDES[currentIndex].slogan}
                </span>
                <span className="h-[1.5px] w-8 sm:w-12 bg-neutral-400 rounded-full" />
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-cal font-bold text-gray-900 tracking-tighter leading-[1.08] select-none whitespace-pre-line">
                {HERO_SLIDES[currentIndex].title}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed mx-auto">
                {HERO_SLIDES[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
