import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FilterState } from '../types';

const profilePortraitImg = 'https://res.cloudinary.com/z9mdashc/image/upload/v1784656148/file_00000000ecec71fa81f18d18767cd865_nhdljz.png';

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
    <div className="relative flex flex-col items-center justify-center font-sans bg-white pt-36 sm:pt-48 md:pt-56 pb-16 sm:pb-20 overflow-hidden">
      {/* Pure clean white base background */}
      <div className="absolute inset-0 bg-white pointer-events-none z-0" />

      {/* Hero Content Container */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full space-y-8 my-auto">
        
        {/* Profile Image at Top of Hero */}
        <motion.div 
          initial={{ scale: 0.85, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative group cursor-pointer"
        >
          <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-amber-500/40 bg-white transition-all duration-300 group-hover:scale-105 group-hover:ring-amber-500/70">
            <img 
              src={profilePortraitImg} 
              alt="Dananjaya Polwattage Profile" 
              className="w-full h-full object-cover object-top filter contrast-105"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Active online badge indicator */}
          <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 border-2 border-white rounded-full shadow-md flex items-center justify-center" title="Verified Profile">
            <span className="w-2 h-2 bg-white rounded-full animate-ping" />
          </span>
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
                <span className="h-[2px] w-10 sm:w-14 bg-amber-500/80 rounded-full" />
                <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-amber-600">
                  {HERO_SLIDES[currentIndex].slogan}
                </span>
                <span className="h-[2px] w-10 sm:w-14 bg-amber-500/80 rounded-full" />
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-bold text-gray-900 tracking-tighter leading-[1.08] select-none whitespace-pre-line">
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


