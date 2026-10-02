import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import ProjectExactCard, { ProjectData } from './ProjectExactCard';
import ScrollReveal from './ScrollReveal';
import { LABS_DATA } from '../data/labsData';

interface DestinationsPageProps {
  onSelectRegion?: (region: string) => void;
}

export default function DestinationsPage({ onSelectRegion }: DestinationsPageProps) {
  const totalXP = useMemo(() => {
    return LABS_DATA.reduce((acc, curr) => acc + (curr.xpEarned || 0), 0);
  }, []);

  return (
    <div className="pt-36 sm:pt-40 bg-gray-50/50 font-sans min-h-screen">
      {/* Hero Header */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="relative bg-white border-b border-gray-100 py-16 sm:py-20 text-gray-950 flex flex-col items-center justify-center text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 flex flex-col items-center">
            
            {/* Pill Tag */}
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-100/90 border border-neutral-200 rounded-full text-xs font-mono font-semibold tracking-[0.25em] uppercase text-neutral-800 shadow-sm">
              <span className="text-amber-500 font-bold">✦</span> REPLICATING VECTOR ENVIRONMENTS
            </span>
              
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-cal font-black tracking-tighter text-black uppercase select-none leading-none">
              Threat Labs
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 font-sans tracking-wide max-w-2xl leading-relaxed">
              Official Hack The Box solved machines, vulnerability attack vectors, and enterprise defense testbeds verified with user & root flags.
            </p>

            {/* Quick Metrics Ribbon */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl w-full">
              <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-3.5 text-center">
                <div className="text-2xl sm:text-3xl font-black font-sans text-gray-950">14</div>
                <div className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-wider mt-0.5">HTB Machines Pwned</div>
              </div>
              <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-3.5 text-center">
                <div className="text-2xl sm:text-3xl font-black font-sans text-emerald-600">100%</div>
                <div className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-wider mt-0.5">Solved Verification</div>
              </div>
              <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-3.5 text-center">
                <div className="text-2xl sm:text-3xl font-black font-sans text-amber-500">+{totalXP.toLocaleString()}</div>
                <div className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-wider mt-0.5">XP Earned</div>
              </div>
              <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-3.5 text-center">
                <div className="text-2xl sm:text-3xl font-black font-sans text-gray-950">28</div>
                <div className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-wider mt-0.5">User & Root Flags</div>
              </div>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('threat-labs-list');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-black hover:bg-amber-500 text-white hover:text-black text-xs md:text-sm font-sans font-extrabold uppercase tracking-widest rounded-full transition-all shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.3)] hover:scale-[1.02] cursor-pointer"
            >
              <span>Explore Solved Labs</span>
              <span className="text-base font-semibold">↗</span>
            </button>

          </div>
        </div>
      </ScrollReveal>

      {/* Main Listing Section */}
      <div id="threat-labs-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {LABS_DATA.map((lab, idx) => {
            const projectData: ProjectData = {
              id: lab.id,
              title: lab.machineName,
              subtitle: lab.subtitle,
              description: lab.description,
              authorName: lab.user,
              rating: lab.rating,
              reviewsCount: lab.reviewsCount,
              totalVotes: lab.totalVotes,
              image: lab.imageUrl,
              platform: lab.platform,
              os: lab.os,
              difficulty: lab.difficulty,
              status: lab.status,
              solvedDate: lab.solvedDate,
              user: lab.user,
              machineRank: lab.machineRank,
              machineState: lab.machineState,
              xpEarned: lab.xpEarned,
              tags: lab.tags,
              reconnaissance: lab.reconnaissance,
              initialFoothold: lab.initialFoothold,
              privilegeEscalation: lab.privilegeEscalation,
              codeSnippetTitle: lab.codeSnippetTitle,
              codeSnippet: lab.codeSnippet,
              remediation: lab.remediation,
            };

            return (
              <motion.div
                key={lab.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 6) * 0.08, duration: 0.4 }}
                className="h-full"
              >
                <ProjectExactCard
                  project={projectData}
                  onViewProject={() => {
                    if (onSelectRegion) {
                      onSelectRegion(lab.machineName);
                    }
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
