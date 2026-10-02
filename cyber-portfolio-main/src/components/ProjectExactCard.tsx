import React, { useState } from 'react';
import { ThumbsUp, FileText, ArrowUpRight, Instagram, Twitter, Facebook, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LReportModal from './LReportModal';

export interface ProjectData {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  authorName?: string;
  rating?: number;
  reviewsCount?: number;
  totalVotes?: number;
  portraitUrl?: string;
  projectUrl?: string;
  image?: string;
  location?: string;
  price?: number;
}

interface ProjectExactCardProps {
  key?: React.Key;
  project: ProjectData;
  onViewProject?: (project: ProjectData) => void;
}

export default function ProjectExactCard({ project, onViewProject }: ProjectExactCardProps) {
  const defaultPortrait = "https://res.cloudinary.com/z9mdashc/image/upload/v1784656148/file_00000000ecec71fa81f18d18767cd865_nhdljz.png";

  const storageKey = `lab_endorse_${project.id}`;

  const [hasVoted, setHasVoted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(storageKey) === 'true';
    } catch {
      return false;
    }
  });

  const [voteCount, setVoteCount] = useState<number>(() => {
    try {
      const savedCount = localStorage.getItem(`${storageKey}_count`);
      if (savedCount !== null) {
        return parseInt(savedCount, 10);
      }
    } catch {}
    return hasVoted ? 1 : 0;
  });

  const [showPop, setShowPop] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  const handleThumbClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextVoted = !hasVoted;
    const nextCount = nextVoted ? 1 : 0;

    setHasVoted(nextVoted);
    setVoteCount(nextCount);

    try {
      localStorage.setItem(storageKey, String(nextVoted));
      localStorage.setItem(`${storageKey}_count`, String(nextCount));
    } catch {}

    setShowPop(true);
    setTimeout(() => setShowPop(false), 1200);
  };

  const handleViewReportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsReportOpen(true);
  };

  return (
    <>
      <motion.div 
        whileHover={{ y: -8, scale: 1.01, transition: { type: 'spring', stiffness: 260, damping: 20, mass: 0.8 } }}
        className="bg-white border border-gray-200/80 rounded-[2.2rem] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-shadow duration-500 ease-out flex flex-col justify-between group h-full relative"
      >
        
        <div>
          {/* Top Header Photo Frame */}
          <div className="relative h-48 sm:h-52 bg-[#0e1217] overflow-hidden">
            <img
              src={project.image || defaultPortrait}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />

            {/* Subtle Light Reflection Shimmer Beam on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Social Icons Overlay on Bottom Right of Top Image */}
            <div className="absolute bottom-3 right-4 z-10 flex items-center gap-2.5 text-white/90 drop-shadow-md">
              <Instagram className="w-3.5 h-3.5 hover:text-amber-400 hover:scale-110 transition-all cursor-pointer" />
              <Twitter className="w-3.5 h-3.5 hover:text-amber-400 hover:scale-110 transition-all cursor-pointer" />
              <Facebook className="w-3.5 h-3.5 hover:text-amber-400 hover:scale-110 transition-all cursor-pointer" />
            </div>
          </div>

          {/* Middle Bar: Overlapping Circular Logo (Left) + Real-time Thumb Mark Counter (Right) */}
          <div className="relative px-5 pt-3 pb-2 flex items-center justify-between">
            
            {/* Overlapping DW Circular Avatar */}
            <div className="absolute -top-8 left-5 z-20">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-black border-[3.5px] border-white shadow-md flex items-center justify-center p-1 group-hover:border-amber-400 transition-colors">
                <span className="text-white font-black text-lg sm:text-xl font-sans tracking-wider">
                  DW
                </span>
              </div>
            </div>

            {/* Real-Time Responsive Thumb Mark Counter Button */}
            <div className="ml-auto relative flex items-center gap-1.5 whitespace-nowrap">
              <motion.button
                whileTap={{ scale: 0.88 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleThumbClick}
                title={hasVoted ? "Remove Endorsement" : "Endorse & Vote for this Lab"}
                className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs font-bold transition-all duration-300 border cursor-pointer select-none shadow-xs whitespace-nowrap ${
                  hasVoted
                    ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'bg-neutral-900/90 hover:bg-black text-white border-neutral-700'
                }`}
              >
                <motion.div
                  animate={showPop ? { scale: [1, 1.4, 1], rotate: [0, -15, 15, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'fill-black text-black' : 'text-amber-400'}`} />
                </motion.div>

                <span className="font-sans font-extrabold text-xs tracking-tight">
                  {voteCount}
                </span>
              </motion.button>

              {/* Live Pop-Up Indicator on Vote */}
              <AnimatePresence>
                {showPop && (
                  <motion.div
                    initial={{ opacity: 0, y: 0, scale: 0.6 }}
                    animate={{ opacity: 1, y: -22, scale: 1 }}
                    exit={{ opacity: 0, y: -32 }}
                    className="absolute -top-4 right-0 z-30 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black text-amber-400 border border-amber-500/60 shadow-lg text-[10px] font-mono font-black uppercase tracking-wider whitespace-nowrap pointer-events-none"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-spin" />
                    <span>{hasVoted ? '+1 Vote Logged!' : 'Vote Removed'}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Text Section */}
          <div className="px-5 pt-3 pb-2 space-y-1.5">
            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 font-sans tracking-tight leading-snug line-clamp-1">
              {project.title}
            </h3>

            <p className="text-xs font-semibold text-gray-400 font-sans tracking-wide truncate">
              {project.subtitle || project.location || 'Cybersecurity & Threat Vector Labs'}
            </p>

            <p className="text-[11px] sm:text-xs text-gray-500 font-light leading-relaxed line-clamp-3 pt-1">
              {project.description}
            </p>
          </div>
        </div>

        {/* Bottom Area: Replaces Rating, Reviews, Total Votes with "View L-Report" Button */}
        <div className="border-t border-gray-150/80 mt-4 pt-3.5 px-5 pb-4 bg-gradient-to-b from-transparent to-gray-50/60 flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">
              L-REPORT
            </span>
          </div>

          <button
            onClick={handleViewReportClick}
            className="ml-auto shrink-0 inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-black hover:bg-amber-500 text-white hover:text-black font-sans font-extrabold text-[11px] sm:text-xs tracking-wider uppercase transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer group/btn whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400 group-hover/btn:text-black transition-colors shrink-0" />
            <span className="whitespace-nowrap">View L-Report</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform shrink-0" />
          </button>
        </div>

      </motion.div>

      {/* Advanced & Stylish L-Report Popup Modal */}
      <LReportModal
        project={project}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        voteCount={voteCount}
        hasVoted={hasVoted}
        onVoteToggle={handleThumbClick}
      />
    </>
  );
}
