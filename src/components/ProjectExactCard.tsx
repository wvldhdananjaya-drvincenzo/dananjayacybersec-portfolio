import React, { useState } from 'react';
import { FileText, ArrowUpRight, Instagram, Twitter, Facebook, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
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
  // Lab / Machine fields
  platform?: string;
  os?: string;
  difficulty?: string;
  status?: string;
  solvedDate?: string;
  user?: string;
  machineRank?: string;
  machineState?: string;
  xpEarned?: number;
  tags?: string[];
  reconnaissance?: string;
  initialFoothold?: string;
  privilegeEscalation?: string;
  codeSnippetTitle?: string;
  codeSnippet?: string;
  remediation?: string[];
}

interface ProjectExactCardProps {
  key?: React.Key;
  project: ProjectData;
  onViewProject?: (project: ProjectData) => void;
}

export default function ProjectExactCard({ project, onViewProject }: ProjectExactCardProps) {
  const defaultPortrait = "https://res.cloudinary.com/z9mdashc/image/upload/v1784656148/file_00000000ecec71fa81f18d18767cd865_nhdljz.png";

  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

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
          <div 
            onClick={handleViewReportClick}
            className="relative h-48 sm:h-52 bg-[#0e1217] overflow-hidden cursor-pointer"
          >
            <img
              src={project.image || defaultPortrait}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />

            {/* Subtle Light Reflection Shimmer Beam on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Top Left Pwned & OS Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-1.5 pointer-events-none">
              <div className="bg-black/85 backdrop-blur-md border border-emerald-500/40 text-emerald-400 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{project.status?.toUpperCase() || 'PWNED'}</span>
              </div>

              {project.os && (
                <div className="bg-black/75 backdrop-blur-md border border-white/10 text-white/90 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium">
                  {project.os}
                </div>
              )}

              {project.difficulty && (
                <div className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                  project.difficulty === 'Easy' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' :
                  project.difficulty === 'Medium' ? 'bg-amber-950/80 text-amber-300 border-amber-500/40' :
                  'bg-purple-950/80 text-purple-300 border-purple-500/40'
                }`}>
                  {project.difficulty}
                </div>
              )}
            </div>

            {/* Top Right HTB Rank Badge */}
            {project.machineRank && (
              <div className="absolute top-3 right-3 z-10 bg-black/80 backdrop-blur-md border border-white/15 text-amber-400 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold pointer-events-none shadow-sm">
                Rank {project.machineRank}
              </div>
            )}

            {/* Social Icons Overlay on Bottom Right of Top Image */}
            <div className="absolute bottom-3 right-4 z-10 flex items-center gap-2.5 text-white/90 drop-shadow-md">
              <Instagram className="w-3.5 h-3.5 hover:text-amber-400 hover:scale-110 transition-all cursor-pointer" />
              <Twitter className="w-3.5 h-3.5 hover:text-amber-400 hover:scale-110 transition-all cursor-pointer" />
              <Facebook className="w-3.5 h-3.5 hover:text-amber-400 hover:scale-110 transition-all cursor-pointer" />
            </div>
          </div>

          {/* Middle Bar: Overlapping Circular Logo (Left) + Solved Date (Right) */}
          <div className="relative px-5 pt-3 pb-2 flex items-center justify-between">
            
            {/* Overlapping DW Circular Avatar */}
            <div className="absolute -top-8 left-5 z-20">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-black border-[3.5px] border-white shadow-md flex items-center justify-center p-1 group-hover:border-amber-400 transition-colors">
                <span className="text-white font-black text-lg sm:text-xl font-sans tracking-wider">
                  DW
                </span>
              </div>
            </div>

            {/* Solved Date indicator on right */}
            {project.solvedDate && (
              <div className="ml-auto text-[11px] font-mono text-gray-500 font-semibold bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                {project.solvedDate}
              </div>
            )}
          </div>

          {/* Text Section */}
          <div className="px-5 pt-3 pb-2 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-gray-900 font-sans tracking-tight leading-snug line-clamp-1">
                {project.title}
              </h3>
              {project.xpEarned && (
                <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                  +{project.xpEarned} XP
                </span>
              )}
            </div>

            <p className="text-xs font-semibold text-gray-400 font-sans tracking-wide truncate">
              {project.subtitle || project.location || 'Hack The Box • Machine Pwned'}
            </p>

            <p className="text-[11px] sm:text-xs text-gray-500 font-light leading-relaxed line-clamp-3 pt-1">
              {project.description}
            </p>

            {/* Technical Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1 pt-2">
                {project.tags.slice(0, 3).map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-mono">
                    #{tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="text-[10px] font-mono text-gray-400">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Area: L-Report Button */}
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
      />
    </>
  );
}
