import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, DollarSign, Star, Compass, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { Destination } from '../types';
import ScrollReveal from './ScrollReveal';

interface ToursPageProps {
  destinations: Destination[];
  onBookDestination: (dest: Destination) => void;
}

export default function ToursPage({ destinations, onBookDestination }: ToursPageProps) {
  return (
    <div className="pt-36 sm:pt-40 bg-gray-50/50 font-sans min-h-screen">
      {/* Hero header */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="relative bg-white border-b border-gray-100 py-20 text-gray-950 flex flex-col items-center justify-center text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-100/80 border border-neutral-200 rounded-full text-xs font-mono font-semibold tracking-[0.25em] uppercase text-neutral-800 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '30s' }} /> SECURITY OPERATIONS
            </span>
              
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-cal font-black tracking-tighter text-black uppercase select-none leading-none">
                Campaigns
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-neutral-600 font-sans tracking-wide max-w-2xl leading-relaxed">
                Offensive engagements & simulated adversary cyber threat modeling
              </p>

              <button
                onClick={() => {
                  const el = document.getElementById('campaigns-list');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-black hover:bg-amber-500 text-white hover:text-black text-xs md:text-sm font-sans font-extrabold uppercase tracking-widest rounded-full transition-all shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.3)] hover:scale-[1.02] cursor-pointer"
              >
                <span>View Active Scopes</span>
                <span className="text-base font-semibold">↗</span>
              </button>
            </div>
          </div>
      </ScrollReveal>

      <div id="campaigns-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        
        {/* Tours Grid / List with Automatic Vertical Connecting Line & Index Badging */}
        <div className="space-y-10">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display font-extrabold text-gray-900">Active SecOps Service Lineup</h2>
              <p className="text-xs text-gray-400 font-mono uppercase mt-1">Guaranteed execution & custom tailored scope sizes available</p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200 shadow-2xs">
              {destinations.length} Active {destinations.length === 1 ? 'Project' : 'Projects'}
            </span>
          </div>

          <div className="relative space-y-12">
            {/* Continuous Vertical Connecting Line for Multiple Cards */}
            {destinations.length > 1 && (
              <div className="hidden md:block absolute left-5 top-10 bottom-10 w-0.5 bg-gradient-to-b from-amber-500 via-amber-300 to-amber-500/20 z-0 pointer-events-none" />
            )}

            {destinations.map((dest, idx) => {
              // Custom deliverables tailored to lab scopes
              const highlights = dest.id === 'cultural-triangle'
                ? ['EDR bypass & memory injection', 'Active Directory DCSync attack', 'Exfiltration via DNS tunneling']
                : dest.id === 'wild-safari'
                ? ['Badge cloning & tailgating simulation', 'Enterprise Wi-Fi rogue AP setup', 'Hardware dropbox covert deployment']
                : dest.id === 'scenic-hills'
                ? ['Reentrancy vulnerability identification', 'Flash-loan attack vector auditing', 'Formal verification of mathematical states']
                : ['Multi-Area OSPF Area 0 Backbone', 'Cisco ASA Stateful Packet Inspection', 'IPsec Site-to-Site AES-256 VPN Tunnels'];

              const projectIndexLabel = `PROJECT #${String(idx + 1).padStart(2, '0')}`;

              return (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="relative z-10 grid grid-cols-1 md:grid-cols-[44px_1fr] gap-6 items-start"
                >
                  {/* Left Side: Timeline Number Node */}
                  <div className="hidden md:flex flex-col items-center justify-start pt-6 space-y-2">
                    <div className="w-11 h-11 relative flex items-center justify-center z-10 shrink-0 group filter drop-shadow-sm">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 44 44">
                        <circle cx="22" cy="22" r="19" className="fill-black stroke-amber-400 stroke-[2.5]" />
                      </svg>
                      <span className="absolute text-amber-400 font-sans font-black text-xs tracking-tight antialiased select-none">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Main Project Card Frame */}
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.005, transition: { type: 'spring', stiffness: 260, damping: 20, mass: 0.8 } }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-xs hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-shadow duration-500 ease-out overflow-hidden grid grid-cols-1 md:grid-cols-12 group"
                  >
                    {/* Thumbnail Cover Image */}
                    <div className="md:col-span-5 relative min-h-64 md:min-h-full overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.title}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      {/* Shimmer Light Beam Effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent md:to-transparent" />
                      
                      {/* Overlapping Badges */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="bg-amber-500 text-gray-950 font-mono text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                          {dest.category}
                        </span>
                        <span className="bg-black/80 text-amber-400 border border-amber-400/40 font-mono text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md">
                          {projectIndexLabel}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white md:hidden">
                        <span className="text-xs font-mono font-semibold text-amber-400 block">{dest.region}</span>
                        <h3 className="text-xl font-display font-extrabold tracking-tight">{dest.title}</h3>
                      </div>
                    </div>

                    {/* Card Content & Actions */}
                    <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-6">
                      
                      <div className="space-y-3">
                        <div className="hidden md:block space-y-1">
                          <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-widest block">{dest.region}</span>
                          <h3 className="text-2xl font-display font-extrabold text-gray-900 tracking-tight leading-tight">
                            {dest.title}
                          </h3>
                        </div>

                        <p className="text-xs text-gray-500 leading-relaxed font-light">
                          {dest.description}
                        </p>

                        {/* Highlights box */}
                        <div className="bg-amber-50/50 rounded-2xl p-4.5 border border-amber-100/50 space-y-2">
                          <span className="text-[9px] font-mono font-bold text-amber-800 uppercase tracking-widest block">Engagement Deliverables</span>
                          <ul className="space-y-1.5 text-xs text-gray-700">
                            {highlights.map((high, hIdx) => (
                              <li key={hIdx} className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span className="truncate">{high}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                        <button
                          onClick={() => onBookDestination(dest)}
                          className="px-5 py-2.5 bg-black hover:bg-amber-500 text-white hover:text-black text-xs font-sans font-extrabold uppercase tracking-wider rounded-full transition-all shadow-xs hover:scale-[1.02] active:scale-95 flex items-center justify-center cursor-pointer whitespace-nowrap shrink-0"
                        >
                          VIEW PROJECT
                        </button>
                      </div>

                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quality Assurances Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-8 rounded-3xl border border-gray-100">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-mono font-bold text-gray-800 uppercase tracking-wider">Safe Exploitation Standard</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Strictly controlled exploitation payloads, non-destructive proofs of concept, and fully isolated C2 servers.
              </p>
            </div>
          </div>
          <div className="flex gap-4 border-t md:border-t-0 md:border-x border-gray-100 pt-6 md:pt-0 md:px-8">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-mono font-bold text-gray-800 uppercase tracking-wider">Secure Workspace & Sandboxing</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                All operations are executed within encrypted local environments, custom-built virtual sandboxes, and secure tunnels.
              </p>
            </div>
          </div>
          <div className="flex gap-4 border-t md:border-t-0 pt-6 md:pt-0">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-mono font-bold text-gray-800 uppercase tracking-wider">Zero Telemetry Signature</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Zero noise, custom payload obfuscation, clean environment teardown, and granular system remediation logs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
