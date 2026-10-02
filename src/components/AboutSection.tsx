import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
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
  const [isDraggingActive, setIsDraggingActive] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentPosRef = useRef<number>(0);
  const activeIndexRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef<boolean>(false);

  // Pointer drag tracking refs
  const isPointerDownRef = useRef<boolean>(false);
  const pointerStartXRef = useRef<number>(0);
  const pointerStartPosRef = useRef<number>(0);
  const lastPointerXRef = useRef<number>(0);
  const lastPointerTimeRef = useRef<number>(0);
  const pointerVelocityRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);

  // Shortest circular delta for 7 items
  const getShortestCircularDelta = (fromIdx: number, toIdx: number, count: number): number => {
    let delta = (toIdx - fromIdx) % count;
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    return delta;
  };

  // 3D Ribbon transformation calculations
  const updateCardTransforms = (pos: number, width: number) => {
    const count = CAROUSEL_ITEMS.length;
    const isMobile = width < 640;
    const spacing = isMobile 
      ? Math.min(210, Math.max(160, width * 0.48)) 
      : Math.min(300, Math.max(240, width * 0.28));

    for (let i = 0; i < count; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;

      // Circular relative offset wrapped to [-count/2, count/2]
      let rel = ((i - pos) % count + count) % count;
      if (rel > count / 2) rel -= count;

      const absRel = Math.abs(rel);

      // Horizontal spacing along the 3D arc
      const x = rel * spacing;

      // Downward arch curvature (downward displacement on sides)
      const y = (isMobile ? 18 : 22) * Math.pow(absRel, 1.35);

      // Depth along the Z-axis (inward displacement on sides)
      const z = 75 - (isMobile ? 100 : 125) * Math.pow(absRel, 1.15);

      // Y-axis rotation (faces slightly inward towards center)
      const maxRotY = isMobile ? 38 : 42;
      const rotY = Math.max(-maxRotY, Math.min(maxRotY, -rel * (isMobile ? 18 : 21)));

      // Z-axis rotation (ribbon arch curvature tilt)
      const maxRotZ = isMobile ? 12 : 14;
      const rotZ = Math.max(-maxRotZ, Math.min(maxRotZ, rel * (isMobile ? 5.5 : 6.5)));

      // Scale
      const scale = Math.max(0.6, 1.02 - (isMobile ? 0.12 : 0.14) * absRel);

      // Smooth Opacity falloff: rear cards are completely invisible (0 opacity)
      // preventing any visual pop during wrapping
      let opacity = 0;
      if (absRel <= 1.0) {
        opacity = 1.0 - 0.05 * absRel;
      } else if (absRel <= 2.0) {
        opacity = 0.95 - 0.28 * (absRel - 1.0);
      } else if (absRel <= 2.45) {
        opacity = 0.67 * (1.0 - (absRel - 2.0) / 0.45);
      } else {
        opacity = 0;
      }

      const zIndex = Math.round(200 - absRel * 30);

      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      el.style.opacity = `${opacity.toFixed(3)}`;
      el.style.zIndex = `${zIndex}`;
      el.style.pointerEvents = opacity > 0.15 ? 'auto' : 'none';
    }
  };

  // Sync active index for reactive components (badges, dots, active ring)
  const syncActiveIndex = (pos: number) => {
    const count = CAROUSEL_ITEMS.length;
    const normalized = ((Math.round(pos) % count) + count) % count;
    if (normalized !== activeIndexRef.current) {
      activeIndexRef.current = normalized;
      setActiveIndex(normalized);
    }
  };

  // Natural Skip Animation with quartic ease-out deceleration
  const animateTo = (targetPos: number, customDuration?: number) => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const startPos = currentPosRef.current;
    const distance = Math.abs(targetPos - startPos);

    if (distance < 0.001) {
      currentPosRef.current = targetPos;
      updateCardTransforms(targetPos, containerWidth);
      syncActiveIndex(targetPos);
      return;
    }

    // Adaptive duration: 420ms for 1 step, up to 660ms for 3-4 steps skip
    const duration = customDuration ?? Math.min(680, 420 + distance * 80);
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Quartic ease-out: crisp responsive start, fluid glide, soft settle
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = startPos + (targetPos - startPos) * ease;

      currentPosRef.current = current;
      updateCardTransforms(current, containerWidth);
      syncActiveIndex(current);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        currentPosRef.current = targetPos;
        updateCardTransforms(targetPos, containerWidth);
        syncActiveIndex(targetPos);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  // Step delta navigation (Previous / Next)
  const goToDelta = (delta: number) => {
    resetAutoPlay();
    const target = Math.round(currentPosRef.current) + delta;
    animateTo(target);
  };

  // Direct dot index navigation with shortest circular path
  const goToIndex = (targetIndex: number) => {
    resetAutoPlay();
    const count = CAROUSEL_ITEMS.length;
    const currentActive = ((Math.round(currentPosRef.current) % count) + count) % count;
    const delta = getShortestCircularDelta(currentActive, targetIndex, count);
    const target = Math.round(currentPosRef.current) + delta;
    animateTo(target);
  };

  // Card click handler (center opens, side cards slide to center)
  const handleCardClick = (idx: number, item: CarouselItem) => {
    if (hasDraggedRef.current) return;
    resetAutoPlay();

    const count = CAROUSEL_ITEMS.length;
    let rel = ((idx - currentPosRef.current) % count + count) % count;
    if (rel > count / 2) rel -= count;

    if (Math.abs(rel) < 0.35) {
      // Direct center card action
      onSelectDestination(item.id);
    } else {
      // Side card clicked: smoothly center it via natural skip
      const target = Math.round(currentPosRef.current) + Math.round(rel);
      animateTo(target);
    }
  };

  // Reset auto-play with cooldown
  const resetAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
    if (!isHoveredRef.current && !isPointerDownRef.current) {
      autoPlayTimerRef.current = setInterval(() => {
        goToDelta(1);
      }, 4200);
    }
  };

  // Setup auto-play on mount
  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

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

  // Update layout synchronously before paint when container width or active position updates
  useLayoutEffect(() => {
    updateCardTransforms(currentPosRef.current, containerWidth);
  }, [containerWidth]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isHoveredRef.current) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToDelta(-1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToDelta(1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Pointer gesture handling (Fluid, never-sticking, with setPointerCapture)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

    // Interrupt any active animation smoothly
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    isPointerDownRef.current = true;
    pointerStartXRef.current = e.clientX;
    pointerStartPosRef.current = currentPosRef.current;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = performance.now();
    pointerVelocityRef.current = 0;
    hasDraggedRef.current = false;
    setIsDraggingActive(true);
    resetAutoPlay();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;

    const deltaX = e.clientX - pointerStartXRef.current;
    if (Math.abs(deltaX) > 6) {
      hasDraggedRef.current = true;
    }

    const now = performance.now();
    const dt = now - lastPointerTimeRef.current;
    if (dt > 8) {
      pointerVelocityRef.current = (e.clientX - lastPointerXRef.current) / dt;
      lastPointerXRef.current = e.clientX;
      lastPointerTimeRef.current = now;
    }

    // 1:1 real-time drag response
    const dragSensitivity = containerWidth < 640 
      ? Math.max(160, containerWidth * 0.45) 
      : Math.max(220, containerWidth * 0.28);

    const deltaPos = -deltaX / dragSensitivity;
    const newPos = pointerStartPosRef.current + deltaPos;

    currentPosRef.current = newPos;
    updateCardTransforms(newPos, containerWidth);
    syncActiveIndex(newPos);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDraggingActive(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    if (hasDraggedRef.current) {
      const dragSensitivity = containerWidth < 640 
        ? Math.max(160, containerWidth * 0.45) 
        : Math.max(220, containerWidth * 0.28);

      const velocityInCardsPerSec = -pointerVelocityRef.current * 1000 / dragSensitivity;

      // Add momentum offset if flicked with velocity
      let momentum = 0;
      if (Math.abs(velocityInCardsPerSec) > 0.4) {
        momentum = Math.max(-2, Math.min(2, velocityInCardsPerSec * 0.22));
      }

      const targetPos = Math.round(currentPosRef.current + momentum);
      animateTo(targetPos);
    }

    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 60);

    resetAutoPlay();
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDraggingActive(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    const targetPos = Math.round(currentPosRef.current);
    animateTo(targetPos);
    resetAutoPlay();
  };

  return (
    <section 
      id="about-agent-section" 
      className="py-16 sm:py-24 bg-white text-black font-sans overflow-hidden select-none relative"
      onMouseEnter={() => {
        isHoveredRef.current = true;
        resetAutoPlay();
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        resetAutoPlay();
      }}
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
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-cal font-semibold text-black tracking-tight leading-[1.1]">
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
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            className={`relative h-[480px] sm:h-[530px] w-full flex items-center justify-center select-none overflow-visible touch-pan-y ${
              isDraggingActive ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ perspective: '1400px' }}
          >
            {/* Outer Horizontal Alignment Line */}
            <div className="absolute inset-x-10 top-[52%] h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none" />

            {/* 3D Cards Render Loop */}
            <div className="relative w-full h-[430px] sm:h-[470px] flex items-center justify-center transform-style-3d pointer-events-none">
              {CAROUSEL_ITEMS.map((item, idx) => {
                const isCenterFocus = idx === activeIndex;

                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(idx, item);
                    }}
                    style={{
                      position: 'absolute',
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      willChange: 'transform, opacity',
                    }}
                    className={`w-[270px] sm:w-[310px] md:w-[330px] h-[390px] sm:h-[430px] rounded-[26px] bg-white p-4 sm:p-5 border transform-gpu select-none cursor-pointer flex flex-col justify-between group transition-shadow duration-300 ${
                      isCenterFocus 
                        ? 'border-neutral-300 ring-1 ring-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.12)]' 
                        : 'border-neutral-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:border-neutral-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.09)]'
                    }`}
                  >
                    {/* CARD TOP HEADER: Category & Title */}
                    <div className="mb-3 text-left">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase block mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-cal font-bold tracking-tight text-neutral-900 leading-snug line-clamp-1">
                        {item.title}
                      </h3>
                    </div>

                    {/* CARD MEDIA IMAGE CONTAINER */}
                    <div className="relative w-full h-[180px] sm:h-[205px] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-100 shadow-inner">
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out select-none pointer-events-none"
                      />
                      {/* Active Status Badge on Image Corner */}
                      <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-white border border-white/20 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>LAB SCOPE</span>
                        </span>
                      </div>
                    </div>

                    {/* CARD BOTTOM METADATA & DESCRIPTION */}
                    <div className="mt-3.5 space-y-1.5 flex-1 flex flex-col justify-between text-left">
                      <div>
                        <span className="text-[10px] font-mono font-semibold tracking-wider text-neutral-400 uppercase block">
                          {item.subtitle}
                        </span>
                        <p className="text-xs text-neutral-600 font-normal leading-relaxed line-clamp-2 mt-1">
                          {item.description}
                        </p>
                      </div>

                      {/* Mini Footer Indicator */}
                      <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-neutral-400 uppercase tracking-wider">OFFSEC EMULATION</span>
                        <span className="font-semibold text-neutral-800 flex items-center gap-1 group-hover:text-orange-600 transition-colors">
                          <span>VIEW LAB</span>
                          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Pagination Dots & Counter */}
          <div className="flex flex-col items-center gap-3 mt-6 z-20">
            <div className="flex items-center gap-2">
              {CAROUSEL_ITEMS.map((item, idx) => (
                <button
                  key={`dot-${item.id}`}
                  type="button"
                  onClick={() => goToIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                    idx === activeIndex
                      ? 'w-9 bg-neutral-900 shadow-sm'
                      : 'w-2.5 bg-neutral-200 hover:bg-neutral-400 hover:scale-110'
                  }`}
                  aria-label={`Go to item ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono font-semibold text-neutral-400">
              <span className="text-neutral-900">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span>/</span>
              <span>{String(CAROUSEL_ITEMS.length).padStart(2, '0')}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

