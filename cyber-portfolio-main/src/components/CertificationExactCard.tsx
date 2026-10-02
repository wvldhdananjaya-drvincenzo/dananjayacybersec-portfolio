import React, { useState } from 'react';
import { Shield, Check, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import CertificateImageModal from './CertificateImageModal';

export interface CertificationExactData {
  id: string;
  title: string;
  badge: string;
  provider: string;
  verified: boolean;
  level: string;
  issuedOn: string;
  description: string;
  credentialId: string;
  price?: string;
  portraitUrl?: string;
  badgeColor?: string;
  cryptoHash?: string;
  authorizedSignatory?: string;
  issuer?: string;
}

interface CertificationExactCardProps {
  key?: React.Key;
  cert: CertificationExactData;
  onViewCertificate?: (cert: CertificationExactData) => void;
}

export default function CertificationExactCard({ cert, onViewCertificate }: CertificationExactCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultPortrait = "https://res.cloudinary.com/z9mdashc/image/upload/v1784656148/file_00000000ecec71fa81f18d18767cd865_nhdljz.png";

  const handleBtnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewCertificate) {
      onViewCertificate(cert);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <motion.div 
        whileHover={{ y: -8, scale: 1.015, transition: { type: 'spring', stiffness: 260, damping: 20, mass: 0.8 } }}
        className="relative w-full h-full select-none flex flex-col group cursor-pointer"
        onClick={handleBtnClick}
      >
        
        {/* Top Right Floating Badge Notch */}
        <div className="absolute -top-3 -right-2 z-20">
          <div className="bg-[#0b0c10] border border-white/15 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.8)] group-hover:border-emerald-400/50 group-hover:scale-105 transition-all duration-300">
            <Shield className="w-3 h-3 text-emerald-400 fill-emerald-400/20 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-[9px] font-mono font-extrabold tracking-widest text-white uppercase">
              {cert.badge || 'ETHICAL HACKING'}
            </span>
          </div>
        </div>

        {/* Main Dark Card Container */}
        <div className="bg-gradient-to-br from-[#121915] via-[#0d1210] to-[#070a08] border border-white/10 rounded-[1.8rem] sm:rounded-[2.2rem] p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group-hover:shadow-[0_25px_60px_rgba(34,197,94,0.2)] relative overflow-hidden transition-all duration-300 group-hover:border-emerald-500/50 flex flex-col justify-between h-full">
          
          {/* Animated Ambient Radial Glow on Hover */}
          <div className="absolute top-0 left-0 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:opacity-100 group-hover:scale-125 opacity-40 transition-all duration-500" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:opacity-100 opacity-20 transition-all duration-500" />

          {/* Shimmer Light Beam Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Card Header: Squircle App Icon + Provider Name */}
              <div className="flex items-center gap-2.5 mb-3.5 pt-1">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#20c961] flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/25 p-2">
                  {/* Security Outline Vector */}
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-full h-full text-white fill-current"
                  >
                    <path d="M50 10 C30 10 15 25 15 45 C15 65 30 85 50 90 C70 85 85 65 85 45 C85 25 70 10 50 10 Z M50 20 C65 20 75 32 75 45 C75 58 65 78 50 81 C35 78 25 58 25 45 C25 32 35 20 50 20 Z" opacity="0.3"/>
                    <path d="M50 25 L65 40 L58 40 L58 65 L42 65 L42 40 L35 40 Z" fill="white" />
                    <circle cx="50" cy="72" r="4" fill="white" />
                  </svg>
                </div>

                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-white font-sans tracking-wide truncate">
                    {cert.provider || 'Offensive Security'}
                  </span>
                  {cert.verified && (
                    <span className="w-4 h-4 rounded-full bg-[#1d9bf0] inline-flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </span>
                  )}
                </div>
              </div>

              {/* Main Certificate Title */}
              <h2 className="text-base sm:text-lg font-extrabold text-white font-sans tracking-tight leading-snug mb-3 line-clamp-2 min-h-[2.75rem] flex items-center">
                {cert.title}
              </h2>

              {/* 3-Column Metadata Row */}
              <div className="grid grid-cols-3 gap-1 py-2.5 my-1 border-t border-b border-white/10 text-left">
                <div className="pr-1">
                  <span className="text-[9px] font-mono text-gray-400 font-medium uppercase tracking-wider block">
                    Level
                  </span>
                  <span className="text-[11px] font-bold text-white font-sans block mt-0.5 truncate">
                    {cert.level || 'Advanced'}
                  </span>
                </div>

                <div className="border-l border-white/10 pl-2 pr-1">
                  <span className="text-[9px] font-mono text-gray-400 font-medium uppercase tracking-wider block">
                    Provider
                  </span>
                  <span className="text-[11px] font-bold text-white font-sans block mt-0.5 truncate">
                    {cert.provider || 'Offensive Security'}
                  </span>
                </div>

                <div className="border-l border-white/10 pl-2">
                  <span className="text-[9px] font-mono text-gray-400 font-medium uppercase tracking-wider block">
                    Issued On
                  </span>
                  <span className="text-[11px] font-bold text-white font-sans block mt-0.5 truncate">
                    {cert.issuedOn || '15 May, 2026'}
                  </span>
                </div>
              </div>

              {/* Description Paragraph */}
              <p className="text-[11px] text-gray-300 font-light leading-relaxed my-3 line-clamp-3 min-h-[2.75rem]">
                {cert.description}
              </p>
            </div>

            {/* Middle Row: Verified Badge + Credential ID + Portrait Image */}
            <div className="flex items-end justify-between gap-2 mt-auto pt-3 pb-1">
              <div className="space-y-1.5 min-w-0">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0a2416] border border-emerald-500/40 text-emerald-400 text-[9px] font-mono font-bold tracking-wider uppercase">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>VERIFIED</span>
                </div>

                <div className="text-xs sm:text-sm font-black text-white font-mono tracking-wider truncate">
                  {cert.credentialId}
                </div>
              </div>

              {/* Portrait Photo */}
              <div className="w-14 h-18 sm:w-16 sm:h-20 rounded-xl overflow-hidden border border-white/20 shadow-xl shrink-0 bg-neutral-900 group-hover:border-emerald-500/40 transition-colors">
                <img 
                  src={cert.portraitUrl || defaultPortrait} 
                  alt="Dananjaya Wickramarachchi"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Bottom Action Bar: View Certificate Button */}
          <div className="flex items-center justify-end pt-3 border-t border-white/10 mt-2">
            <button
              onClick={handleBtnClick}
              className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-[#86efac] text-gray-950 font-extrabold text-xs font-sans tracking-tight hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <span>View Certificate</span>
            </button>
          </div>

        </div>
      </motion.div>

      {/* Certificate Image Viewer Popup Modal */}
      <CertificateImageModal 
        cert={cert}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
