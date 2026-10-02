import React, { useState } from 'react';
import { Award, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import CertificateImageModal from './CertificateImageModal';

export interface CertificationExactData {
  id: string;
  title: string;
  badge: string;
  provider: string;
  verified: boolean;
  level: string;
  difficulty?: string;
  issuedOn: string;
  description: string;
  credentialId: string;
  price?: string;
  portraitUrl?: string;
  certificateUrl?: string;
  badgeColor?: string;
  cryptoHash?: string;
  authorizedSignatory?: string;
  issuer?: string;
  category?: string;
  skills?: string[];
  duration?: string;
  cpeCredits?: string;
  verificationUrl?: string;
}

interface CertificationExactCardProps {
  key?: React.Key;
  cert: CertificationExactData;
  onViewCertificate?: (cert: CertificationExactData) => void;
}

export default function CertificationExactCard({ cert, onViewCertificate }: CertificationExactCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultPortrait = "https://res.cloudinary.com/z9mdashc/image/upload/v1784656148/file_00000000ecec71fa81f18d18767cd865_nhdljz.png";

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onViewCertificate) {
      onViewCertificate(cert);
    } else {
      setIsModalOpen(true);
    }
  };

  const certificateImg = cert.certificateUrl || cert.portraitUrl || defaultPortrait;

  return (
    <>
      <motion.div 
        whileHover={{ y: -8, scale: 1.01, transition: { type: 'spring', stiffness: 260, damping: 20, mass: 0.8 } }}
        className="bg-white border border-gray-200/80 rounded-[2.2rem] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-shadow duration-500 ease-out flex flex-col justify-between group h-full relative cursor-pointer"
        onClick={handleCardClick}
      >
        <div>
          {/* Top Header Certificate Image Frame - EXACTLY like lab section */}
          <div className="relative h-48 sm:h-52 bg-[#0e1217] overflow-hidden cursor-pointer">
            <img
              src={certificateImg}
              alt={cert.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />

            {/* Subtle Light Reflection Shimmer Beam on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Top Left Verified & Difficulty Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-1.5 pointer-events-none">
              <div className="bg-black/85 backdrop-blur-md border border-emerald-500/40 text-emerald-400 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>VERIFIED</span>
              </div>

              {cert.difficulty && (
                <div className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border backdrop-blur-md ${
                  cert.difficulty === 'ADVANCED' 
                    ? 'bg-purple-950/85 text-purple-300 border-purple-500/40' 
                    : cert.difficulty === 'INTERMEDIATE' 
                    ? 'bg-amber-950/85 text-amber-300 border-amber-500/40' 
                    : 'bg-emerald-950/85 text-emerald-300 border-emerald-500/40'
                }`}>
                  {cert.difficulty}
                </div>
              )}
            </div>

            {/* Top Right Category / Badge Tag */}
            {cert.badge && (
              <div className="absolute top-3 right-3 z-10 bg-black/85 backdrop-blur-md border border-white/20 text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold pointer-events-none shadow-sm">
                {cert.badge}
              </div>
            )}
          </div>

          {/* Middle Bar: Overlapping Circular Avatar + Issued Date */}
          <div className="relative px-5 pt-3 pb-2 flex items-center justify-between">
            {/* Overlapping DW Circular Avatar */}
            <div className="absolute -top-8 left-5 z-20">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-black border-[3.5px] border-white shadow-md flex items-center justify-center p-1 group-hover:border-emerald-400 transition-colors">
                <span className="text-white font-black text-lg sm:text-xl font-sans tracking-wider">
                  DW
                </span>
              </div>
            </div>

            {/* Issued Date on right */}
            {cert.issuedOn && (
              <div className="ml-auto text-[11px] font-mono text-gray-500 font-semibold bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                {cert.issuedOn}
              </div>
            )}
          </div>

          {/* Clean Text Section - Minimal Text, No Heavy Paragraphs */}
          <div className="px-5 pt-2 pb-3 space-y-2">
            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 font-sans tracking-tight leading-snug line-clamp-1">
              {cert.title}
            </h3>

            <div className="flex items-center justify-between gap-2 text-xs font-mono text-gray-500">
              <span className="font-semibold text-gray-700 truncate">
                {cert.provider || cert.issuer}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                {cert.credentialId}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Action Area: View Certificate Button */}
        <div className="border-t border-gray-150/80 mt-2 pt-3.5 px-5 pb-4 bg-gradient-to-b from-transparent to-gray-50/60 flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official Credential</span>
          </div>

          <button
            onClick={handleCardClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black hover:bg-emerald-500 text-white hover:text-black font-sans font-bold text-xs transition-all shadow-sm group-hover:shadow-md cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>View Certificate</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      {/* Pure Certificate Preview Popup Modal */}
      <CertificateImageModal 
        cert={cert}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
