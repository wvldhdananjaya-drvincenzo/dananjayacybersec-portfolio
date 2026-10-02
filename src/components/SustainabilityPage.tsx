import ScrollReveal from './ScrollReveal';
import { Shield, Award, Trees, Users, ShieldAlert, Zap } from 'lucide-react';

export default function SustainabilityPage() {
  return (
    <div className="pt-36 sm:pt-40 bg-gray-50/50 font-sans min-h-screen">
      {/* Hero header */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="relative bg-white border-b border-gray-100 py-20 text-gray-950 flex flex-col items-center justify-center text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-100/80 border border-neutral-200 rounded-full text-xs font-mono font-semibold tracking-[0.25em] uppercase text-neutral-800 shadow-sm">
              <Shield className="w-3.5 h-3.5 text-amber-500" /> ETHICAL & ROBUST PRINCIPLES
            </span>
              
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-cal font-black tracking-tighter text-black uppercase select-none leading-none">
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

      </div>
    </div>
  );
}
