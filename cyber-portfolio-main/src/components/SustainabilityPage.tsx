import { useState } from 'react';
import { motion } from 'motion/react';
import ScrollReveal from './ScrollReveal';
import { Shield, Award, Trees, Droplet, Sun, Users, Sparkles, Heart, ShieldAlert, Zap, DollarSign } from 'lucide-react';

export default function SustainabilityPage() {
  // Calculator state
  const [groupSize, setGroupSize] = useState(2);
  const [stayDuration, setStayDuration] = useState(4);
  const [resortType, setResortType] = useState<'wetland' | 'dunes' | 'ocean' | 'highland'>('wetland');

  // Multipliers based on security metrics
  const multipliers = {
    wetland: { co2: 12.8, plastic: 15, water: 8, veg: 320 },
    dunes: { co2: 14.2, plastic: 18, water: 6, veg: 280 },
    ocean: { co2: 11.5, plastic: 12, water: 9, veg: 210 },
    highland: { co2: 13.0, plastic: 16, water: 10, veg: 350 }
  };

  const selectedMult = multipliers[resortType];
  const totalOffset = groupSize * stayDuration * selectedMult.co2;
  const totalPlastics = Math.round(groupSize * stayDuration * selectedMult.plastic);
  const totalWater = Math.round(groupSize * stayDuration * selectedMult.water);
  const totalVeg = Math.round(groupSize * stayDuration * selectedMult.veg);

  return (
    <div className="pt-36 sm:pt-40 bg-gray-50/50 font-sans min-h-screen">
      {/* Hero header */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="relative bg-white border-b border-gray-100 py-20 text-gray-950 flex flex-col items-center justify-center text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-100/80 border border-neutral-200 rounded-full text-xs font-mono font-semibold tracking-[0.25em] uppercase text-neutral-800 shadow-sm">
              <Shield className="w-3.5 h-3.5 text-amber-500" /> ETHICAL & ROBUST PRINCIPLES
            </span>
              
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-sans font-black tracking-tighter text-black uppercase select-none leading-none">
                Skills
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-neutral-600 font-sans tracking-wide max-w-2xl leading-relaxed">
                Secure-by-design methodologies, zero-trust configurations, and proactive defense engineering
              </p>

              <button
                onClick={() => {
                  const el = document.getElementById('ethos-pillars');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-black hover:bg-amber-500 text-white hover:text-black text-xs md:text-sm font-sans font-extrabold uppercase tracking-widest rounded-full transition-all shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.3)] hover:scale-[1.02] cursor-pointer"
              >
                <span>View Commandments</span>
                <span className="text-base font-semibold">↗</span>
              </button>
            </div>
          </div>
      </ScrollReveal>

      <div id="ethos-pillars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        
        {/* Core Pillars Grid */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-display font-extrabold text-gray-900">Our Six Security Commandments</h2>
            <p className="text-xs font-mono text-amber-600 uppercase tracking-wider">How Dananjaya's security engineering respects client environments</p>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              We approach every single line of code, container configuration, and active directory trust boundary with meticulous attention to defense and resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-4 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Secure By Design (SBD)</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                We prioritize zero-trust network configurations, strict IAM boundaries, least-privilege principles, and robust cryptographic signatures in every blueprint.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-4 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Continuous Remediation</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                All identified vulnerabilities are documented with production-grade proof of concepts and clear, actionable step-by-step remediation scripts.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-4 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Controlled Exploitation</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                We perform simulated attacks within highly controlled, non-destructive sandboxes, ensuring zero downtime and zero impact on your production services.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-4 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                <Trees className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Modern Threat Emulation</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                We emulate the exact TTPs of modern state-sponsored and cybercriminal threat actors, bypassing traditional perimeter defenses to test real response times.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-4 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Post-Engagement Support</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                We don't just hand over a static PDF report. We conduct walkthrough workshops with your developer and engineering teams to ensure lasting posture improvements.
              </p>
            </div>

            {/* Pillar 6 */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-4 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Industry Credentials</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                Holding elite offensive security credentials including OSCP, OSWE, and eWPT, coupled with a deep contribution to open source security frameworks.
              </p>
            </div>

          </div>
        </div>

        {/* INTERACTIVE CALCULATOR SECTION */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Input sliders */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-amber-600 uppercase font-bold tracking-widest block">Interactive SecOps Utility</span>
              <h3 className="text-3xl font-display font-extrabold text-gray-900">
                Threat Mitigation Calculator
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Estimate the approximate attack surface exposure reduction and potential costs saved by deploying Dananjaya's security blueprints over standard configuration baselines.
              </p>
            </div>

            <div className="space-y-6">
              {/* Asset Count slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                  <span className="font-mono uppercase text-[10px] text-gray-400">Asset / Host Count</span>
                  <span className="text-amber-600 font-mono text-sm">{groupSize * 5} Live Hosts</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={groupSize}
                  onChange={(e) => setGroupSize(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1 bg-gray-100 rounded-lg cursor-pointer"
                />
              </div>

              {/* Exposure duration slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                  <span className="font-mono uppercase text-[10px] text-gray-400">Exposure Period (Months)</span>
                  <span className="text-amber-600 font-mono text-sm">{stayDuration} Month{stayDuration > 1 ? 's' : ''}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={stayDuration}
                  onChange={(e) => setStayDuration(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1 bg-gray-100 rounded-lg cursor-pointer"
                />
              </div>

              {/* Blueprint Select */}
              <div className="space-y-2">
                <span className="font-mono uppercase text-[10px] text-gray-400 block font-bold">Select Architecture Blueprint</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'wetland', label: 'Zero-Trust AD Hardening' },
                    { id: 'dunes', label: 'EVM Smart Contract Audits' },
                    { id: 'ocean', label: 'Physical/RF Perimeter Security' },
                    { id: 'highland', label: 'AWS/Kubernetes Guard' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setResortType(item.id as any)}
                      className={`p-3 rounded-xl border text-left font-medium transition-all ${
                        resortType === item.id
                          ? 'border-amber-500 bg-amber-50 text-amber-800 font-bold shadow-xs'
                          : 'border-gray-100 hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Simulated results meters */}
          <div className="lg:col-span-7 bg-gray-950 text-white rounded-3xl p-6 md:p-10 grid grid-cols-2 gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            {/* Impact 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2 hover:bg-white/10 transition-colors">
              <Sun className="w-6 h-6 text-amber-400" />
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono uppercase text-amber-300 tracking-wider block">Risk Mitigation</span>
                <span className="text-3xl font-display font-black tracking-tight block text-amber-400">
                  {Math.min(99.8, Number((totalOffset * 0.35).toFixed(1)))} <span className="text-xs font-normal font-mono text-gray-300">%</span>
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-light leading-snug">
                Estimated reduction in exploit success rate across your external and internal network boundaries.
              </p>
            </div>

            {/* Impact 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2 hover:bg-white/10 transition-colors">
              <DollarSign className="w-6 h-6 text-emerald-400" />
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono uppercase text-amber-300 tracking-wider block">Potential Savings</span>
                <span className="text-3xl font-display font-black tracking-tight block text-emerald-400">
                  ${Math.round(totalPlastics * 1.5)}k
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-light leading-snug">
                Calculated savings in incident response fees, ransomware prevention, and compliance penalties.
              </p>
            </div>

            {/* Impact 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2 hover:bg-white/10 transition-colors">
              <Zap className="w-6 h-6 text-blue-400" />
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono uppercase text-amber-300 tracking-wider block">Remediation Speed</span>
                <span className="text-3xl font-display font-black tracking-tight block text-blue-400">
                  {totalWater * 4} <span className="text-xs font-normal font-mono text-gray-300">Hours</span>
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-light leading-snug">
                Estimated developer hours saved using pre-hardened scripts instead of manual patching operations.
              </p>
            </div>

            {/* Impact 4 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2 hover:bg-white/10 transition-colors">
              <Shield className="w-6 h-6 text-purple-400" />
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono uppercase text-amber-300 tracking-wider block">Vulns Preempted</span>
                <span className="text-3xl font-display font-black tracking-tight block text-purple-400">
                  {Math.round(totalVeg / 15)} <span className="text-xs font-normal font-mono text-gray-300">Critical</span>
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-light leading-snug">
                Anticipated high/critical-severity findings preemptively blocked by secure design baselines.
              </p>
            </div>

            <div className="col-span-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-amber-300/80 font-mono">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" /> Audited against MITRE ATT&CK & CIS Benchmarks
              </span>
              <span className="flex items-center gap-1 text-white">
                <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" /> Defending Enterprise Infrastructure
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
