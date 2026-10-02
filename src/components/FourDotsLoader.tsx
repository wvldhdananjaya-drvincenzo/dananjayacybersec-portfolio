import { useEffect } from 'react';
import { motion } from 'motion/react';

interface FourDotsLoaderProps {
  onLoaded?: () => void;
  duration?: number;
}

export default function FourDotsLoader({
  onLoaded,
  duration = 1800,
}: FourDotsLoaderProps) {
  useEffect(() => {
    if (!onLoaded) return;
    const timer = setTimeout(() => {
      onLoaded();
    }, duration);

    return () => clearTimeout(timer);
  }, [onLoaded, duration]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center select-none"
      id="website-loading-screen"
    >
      {/* 4 Black Dots in a horizontal line */}
      <div 
        className="flex items-center justify-center gap-3.5 sm:gap-4"
        role="status"
        aria-label="Loading"
      >
        {[0, 1, 2, 3].map((index) => (
          <motion.span
            key={index}
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-black block shadow-sm"
            animate={{
              opacity: [0.15, 1, 0.15],
              scale: [0.8, 1.15, 0.8],
              y: [0, -3, 0],
            }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.16,
            }}
          />
        ))}
      </div>
      <span className="sr-only">Loading...</span>
    </motion.div>
  );
}
