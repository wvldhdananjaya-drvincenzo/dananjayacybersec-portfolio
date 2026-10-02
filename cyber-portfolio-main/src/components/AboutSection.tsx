import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, ShieldCheck, Terminal, ChevronLeft, ChevronRight } from 'lucide-react';
import { CarouselItem, Destination } from '../types';
import ScrollReveal from './ScrollReveal';

const img1 = 'https://res.cloudinary.com/z9mdashc/image/upload/v1784992984/taylor-vick-M5tzZtFCOfs-unsplash_xllldl.jpg';
const img2 = 'https://res.cloudinary.com/z9mdashc/image/upload/v1784992987/kirill-sh-eVWWr6nmDf8-unsplash_z0lweq.jpg';
const img3 = 'https://res.cloudinary.com/z9mdashc/image/upload/v1784992996/nastya-dulhiier-OKOOGO578eo-unsplash_lcfbh2.jpg';
const img4 = 'https://res.cloudinary.com/z9mdashc/image/upload/v1784993019/jordan-harrison-40XgDxBfYXM-unsplash_qnxpva.jpg';
const img5 = 'https://res.cloudinary.com/z9mdashc/image/upload/v1784993039/omar-flores-MOO6k3RaiwE-unsplash_q1vhnc.jpg';
const img6 = 'https://res.cloudinary.com/z9mdashc/image/upload/v1784992994/jj-ying-8bghKxNU1j0-unsplash_lo6f9i.jpg';
const img7 = 'https://res.cloudinary.com/z9mdashc/image/upload/v1784993063/jordan-harrison-40XgDxBfYXM-unsplash_qsntgm.jpg';

interface AboutSectionProps {
  onBookCarouselItem: (item: CarouselItem) => void;
  destinations: Destination[];
  onSelectDestination: (id: string) => void;
}

const CAROUSEL_ITEMS = [
  {
    id: 'packet-tracer-lab',
    title: 'ACTIVE DIRECTORY EXPLOITS LAB',
    subtitle: 'KERBEROS & DOMAIN ESCALATION PATHS',
    category: 'AD DEFENSE',
    description: 'Deconstruct Kerberoasting techniques, implement bloodhound execution paths, and secure tier-0 domains from privilege elevation.',
    image: img1
  },
  {
    id: 'cloud-workloads',
    title: 'CLOUD WORKLOADS PROTECTION',
    subtitle: 'AWS & KUBERNETES DEFENSE',
    category: 'CLOUD DEVSECOPS',
    description: 'Audit IAM boundaries, configure zero-trust network policies, and automate continuous container registry security scans.',
    image: img2
  },
  {
    id: 'smart-contract-audit',
    title: 'SMART CONTRACT DEFI AUDITING',
    subtitle: 'CRYPTOGRAPHIC & WEB3 VERIFICATION',
    category: 'WEB3 AUDIT',
    description: 'Formally verify solidity protocols, identify flash-loan attack loops, and audit complex decentralised bridge systems.',
    image: img3
  },
  {
    id: 'saas-supply-chain',
    title: 'SAAS SUPPLY-CHAIN ATTACKS PREP',
    subtitle: 'VENDOR RISK & PIPELINE INFILTRATION AUDITING',
    category: 'SUPPLY-CHAIN',
    description: 'Simulate developer pipeline package hijacking, audit open-source dependency trees, and prevent malicious CI build actions.',
    image: img4
  },
  {
    id: 'evm-fuzzing',
    title: 'EVM FUZZING & STATIC ANALYSIS',
    subtitle: 'ECOSYSTEM RUNTIME ROBUSTNESS CHECKS',
    category: 'FUZZING SUITE',
    description: 'Establish automated fuzzing rigs using Echidna and Foundry to catch protocol crashes, state overrides, and edge cases.',
    image: img5
  },
  {
    id: 'wifi-hardware-pentest',
    title: 'WI-FI & HARDWARE PENTESTS',
    subtitle: 'PHYSICAL & WIRELESS SECURITY AUDITS',
    category: 'PHYSICAL OPS',
    description: 'Implant rogue network hardware drops, clone corporate badges, and hijack enterprise Wi-Fi networks in high-vulnerability sectors.',
    image: img6
  },
  {
    id: 'perimeter-breach',
    title: 'PERIMETER BREACH SIMULATION',
    subtitle: 'NATION-STATE THREAT EMULATION',
    category: 'APT RED TEAM',
    description: 'Bypass modern EDRs, map external exposure surfaces, and establish stable, non-attributable command & control networks.',
    image: img7
  }
];

export default function AboutSection({ onBookCarouselItem, onSelectDestination }: AboutSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [isHovered, setIsHovered] = useState(false);
  const [isDraggingActive, setIsDraggingActive] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const dragStartXRef = useRef<number | null>(null);
  const isDragSwipedRef = useRef<boolean>(false);

  // Responsive spacing for lateral separation in 3D perspective
  const isMobile = containerWidth < 640;
  const spacing = isMobile 
    ? Math.min(190, Math.max(140, containerWidth * 0.44)) 
    : Math.min(270, Math.max(210, containerWidth * 0.26));

  // Track viewport container width safely
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Smooth auto-play loop with hover & drag pause
  useEffect(() => {
    if (isHovered || isDraggingActive) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3600);
    return () => clearInterval(interval);
  }, [isHovered, isDraggingActive]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
  };

  // Touch and Mouse Gesture Handling with drag vs click conflict prevention
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragSwipedRef.current = false;
    setIsDraggingActive(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const diffX = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(diffX) > 28) {
        isDragSwipedRef.current = true;
        if (diffX > 0) {
          handlePrev();
        } else {
          handleNext();
        }
      }
    }
    touchStartX.current = null;
    setIsDraggingActive(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartXRef.current = e.clientX;
    isDragSwipedRef.current = false;
    setIsDraggingActive(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartXRef.current !== null) {
      const diffX = e.clientX - dragStartXRef.current;
      if (Math.abs(diffX) > 28) {
        isDragSwipedRef.current = true;
        if (diffX > 0) {
          handlePrev();
        } else {
          handleNext();
        }
      }
    }
    dragStartXRef.current = null;
    setIsDraggingActive(false);
  };

  return (
    <section 
      id="about-agent-section" 
      className="py-16 sm:py-24 bg-white text-black font-sans overflow-hidden select-none relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle Background Light Grid Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Centered Sleek Title Block */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center space-y-3.5 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-mono font-extrabold uppercase tracking-widest bg-black text-white border border-gray-300 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>SECURITY LABS & ENGAGEMENT SCOPES</span>
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-black tracking-tight leading-[1.1]">
              Advanced OffSec & Threat Emulation Labs
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto font-light leading-relaxed">
              Explore interactive cybersecurity blueprints, Kerberos exploitation labs, cloud architecture defenses, and cryptographic smart contract audit cases.
            </p>
          </div>
        </ScrollReveal>

        {/* 3D PERSPECTIVE COVERFLOW CAROUSEL CONTAINER */}
        <div className="relative w-full flex flex-col items-center">
          
          <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative h-[440px] sm:h-[490px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-visible"
            style={{ perspective: '1200px' }}
          >
            {/* Outer Horizontal Alignment Line */}
            <div className="absolute inset-x-10 top-[55%] h-[1px] bg-gradient-to-r from-transparent via-black/15 to-transparent pointer-events-none" />

            {/* Left Chevron Navigation Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 sm:left-6 z-30 p-3 sm:p-4 rounded-full bg-black/90 text-white border border-white/20 shadow-xl hover:bg-black hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Right Chevron Navigation Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 sm:right-6 z-30 p-3 sm:p-4 rounded-full bg-black/90 text-white border border-white/20 shadow-xl hover:bg-black hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* 3D Cards Render Loop */}
            <div className="relative w-full h-[400px] sm:h-[440px] flex items-center justify-center transform-style-3d pointer-events-none">
              {CAROUSEL_ITEMS.map((item, idx) => {
                // Calculate index delta with wrapping loop
                let diff = idx - activeIndex;
                const half = CAROUSEL_ITEMS.length / 2;
                if (diff > half) diff -= CAROUSEL_ITEMS.length;
                if (diff < -half) diff += CAROUSEL_ITEMS.length;

                const isCenterFocus = idx === activeIndex;

                // Exact 3D Perspective Coverflow geometry matching smooth fluid transitions
                let rotateY = 0;
                let translateZ = 0;
                let scale = 1;
                let opacity = 1;

                if (diff === 0) {
                  // Center active card
                  rotateY = 0;
                  translateZ = 70;
                  scale = 1.05;
                  opacity = 1;
                } else if (diff === -1) {
                  // Immediate Left card
                  rotateY = 24;
                  translateZ = -50;
                  scale = 0.86;
                  opacity = 0.95;
                } else if (diff === 1) {
                  // Immediate Right card
                  rotateY = -24;
                  translateZ = -50;
                  scale = 0.86;
                  opacity = 0.95;
                } else if (diff === -2) {
                  // Far Left card
                  rotateY = 40;
                  translateZ = -170;
                  scale = 0.72;
                  opacity = 0.85;
                } else if (diff === 2) {
                  // Far Right card
                  rotateY = -40;
                  translateZ = -170;
                  scale = 0.72;
                  opacity = 0.85;
                } else {
                  // Invisible outer overflow cards
                  rotateY = diff < 0 ? 50 : -50;
                  translateZ = -300;
                  scale = 0.6;
                  opacity = 0;
                }

                const translateX = diff * spacing;
                const zIndex = isCenterFocus ? 200 : 100 - Math.abs(diff) * 20;
                const isVisible = Math.abs(diff) <= 2;

                return (
                  <motion.div
                    key={item.id}
                    animate={{
                      x: translateX,
                      z: translateZ,
                      rotateY: rotateY,
                      scale: scale,
                      opacity: isVisible ? opacity : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      zIndex: zIndex,
                      position: 'absolute',
                      transformStyle: 'preserve-3d',
                      willChange: 'transform, opacity',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isDragSwipedRef.current) {
                        isDragSwipedRef.current = false;
                        return;
                      }
                      if (isCenterFocus) {
                        onSelectDestination(item.id);
                      } else {
                        setActiveIndex(idx);
                      }
                    }}
                    className={`w-[240px] sm:w-[280px] h-[370px] sm:h-[420px] rounded-[2rem] overflow-hidden bg-black border transform-gpu select-none cursor-pointer pointer-events-auto flex flex-col justify-between group transition-shadow duration-300 ${
                      isCenterFocus 
                        ? 'border-white ring-4 ring-black/80 shadow-[0_25px_60px_rgba(245,158,11,0.28)] hover:border-amber-400' 
                        : 'border-zinc-800 hover:border-zinc-500 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]'
                    }`}
                  >
                    {/* High Quality Image Background */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out select-none opacity-100"
                      />
                      {/* Shimmer Light Reflection */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                      {/* Light bottom gradient overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                    </div>

                    {/* TOP HEADER ROW: Category Badge */}
                    <div className="relative z-10 p-5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span className="text-[9px] font-mono text-gray-300 tracking-wider uppercase font-semibold">
                          ACTIVE THREAT
                        </span>
                      </div>

                      <span className={`px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase border backdrop-blur-md shadow-md ${
                        isCenterFocus 
                          ? 'bg-white text-black border-white shadow-md' 
                          : 'bg-black/80 text-white border-white/30'
                      }`}>
                        {item.category}
                      </span>
                    </div>

                    {/* BOTTOM CONTENT AREA */}
                    <div className="relative z-10 p-5 space-y-2 text-left">
                      {/* Subtitle Label */}
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-300 block drop-shadow-sm">
                        {item.subtitle}
                      </span>

                      {/* Bold Condensed White Title */}
                      <h3 className="text-xl sm:text-2xl font-sans font-black tracking-tight leading-tight uppercase text-white drop-shadow-md">
                        {item.title}
                      </h3>

                      {/* Light Gray Description */}
                      <p className="text-[11px] font-light text-gray-300 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom Pagination Dots Indicator */}
          <div className="flex items-center gap-2 mt-4 z-20">
            {CAROUSEL_ITEMS.map((item, idx) => (
              <button
                key={`dot-${item.id}`}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                  idx === activeIndex
                    ? 'w-8 bg-black shadow-md'
                    : 'w-2 bg-gray-300 hover:bg-gray-500'
                }`}
                aria-label={`Go to item ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

