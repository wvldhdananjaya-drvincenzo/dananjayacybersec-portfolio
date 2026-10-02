import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ScrollReveal from './ScrollReveal';
import { 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Download, 
  CheckCircle2, 
  Terminal, 
  ExternalLink, 
  Layers, 
  Calendar, 
  MapPin, 
  Cpu, 
  User, 
  Sparkles 
} from 'lucide-react';
import CertificationExactCard from './CertificationExactCard';

export default function ResumePage() {
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'experience' | 'skills' | 'certifications' | 'education'>('experience');

  const handleDownloadResume = () => {
    if (downloadProgress !== null) return;
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadProgress(null);
            // Open standard simulated file download
            const link = document.createElement('a');
            link.href = '#';
            link.setAttribute('download', 'Dananjaya_Wickramarachchi_CV.pdf');
            // Mock alert/toast is avoided, we use state for safe feedback
          }, 800);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const experience = [
    {
      role: 'Network Engineering Student',
      company: 'Dananjaya Cyber & Network Solutions',
      period: '2023 - Present',
      location: 'Colombo, Sri Lanka',
      bullets: [
        'Designed high-performance secure payment checkouts, OAuth 2.0 / OIDC identity providers, and zero-trust API gateways matching stringent enterprise compliance standards.',
        'Established full zero-trust container architecture and automated SAST/DAST pipelines, reducing cloud lateral movement risks by 85%.',
        'Conducted penetration tests and developed custom WAF rules and sanitization hooks to eliminate OWASP Top 10 vulnerabilities (XSS, SQLi, CSRF).'
      ]
    },
    {
      role: 'Junior Cyber Security Engineer',
      company: 'IFS Security & Cloud Ops',
      period: '2021 - 2023',
      location: 'Colombo, Sri Lanka',
      bullets: [
        'Developed and hardened complex enterprise ERP modules and microservices serving over 10,000 corporate clients globally.',
        'Audited core authentication and session lifecycles, implementing HSM token signing, RBAC controls, and encrypted local states.',
        'Resolved high-severity CVEs across distributed Kubernetes clusters and refactored core state engines, improving system throughput by 34%.'
      ]
    },
    {
      role: 'Offensive Security Researcher & Web3 Auditor',
      company: 'Self-Employed (Security & Penetration Testing)',
      period: '2019 - 2021',
      location: 'Remote',
      bullets: [
        'Executed deep penetration tests and vulnerability assessments for fintech, e-commerce, and Web3 infrastructure startups.',
        'Conducted smart contract audits on EVM chains, identifying and patching critical reentrancy, access control, and flash-loan attack vectors.',
        'Published technical vulnerability writeups, security advisories, and developed automated exploit POC scripts for responsible disclosure.'
      ]
    }
  ];

  const skillGauges = [
    { name: 'Penetration Testing & Vulnerability Assessment', level: 98, category: 'Offensive Security' },
    { name: 'Web Application Security & OWASP Top 10', level: 96, category: 'Application Security' },
    { name: 'Network Security & Traffic Analysis (Wireshark, Nmap)', level: 95, category: 'Network Defense' },
    { name: 'Cryptography & Secure Auth (OAuth2, JWT, HSM)', level: 92, category: 'Security Architecture' },
    { name: 'Cloud Security & Zero-Trust (AWS/GCP IAM, K8s)', level: 90, category: 'Cloud Security' },
    { name: 'DevSecOps & CI/CD Hardening (SAST/DAST)', level: 88, category: 'DevSecOps' }
  ];

  const certifications = [
    { name: 'Offensive Security Certified Professional (OSCP)', issuer: 'OffSec', year: '2025' },
    { name: 'Certified Ethereum Smart Contract Auditor', issuer: 'Blockchain Council', year: '2024' },
    { name: 'AWS Certified Security - Specialty', issuer: 'Amazon Web Services', year: '2023' },
    { name: 'CompTIA Security+', issuer: 'CompTIA', year: '2021' }
  ];

  const education = [
    {
      degree: 'B.Sc. (Hons) Network Security & Ethical Hacking',
      institution: 'National Institute of Business Management (NIBM)',
      year: 'Undergraduate Student',
      location: 'Colombo, Sri Lanka',
      details: 'Undergraduate student. Specialized in network security defense, ethical hacking, vulnerability assessments, and secure infrastructure engineering.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 font-sans pt-32 sm:pt-40 pb-24 relative overflow-hidden select-none">
      {/* Decorative Ornaments */}
      <div className="absolute top-40 left-[-10%] w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-[-10%] w-96 h-96 rounded-full bg-amber-600/5 blur-[120px] pointer-events-none" />

      {/* Hero header */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="relative bg-white border-b border-gray-100 py-16 sm:py-20 text-gray-950 flex flex-col items-center justify-center text-center mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-100/80 border border-neutral-200 rounded-full text-xs font-mono font-semibold tracking-[0.25em] uppercase text-neutral-800 shadow-sm">
              <span className="text-amber-500 font-bold">✦</span> VERIFIED PROFILE
            </span>
              
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-sans font-black tracking-tighter text-black uppercase select-none leading-none">
                CV & Bio
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-neutral-600 font-sans tracking-wide max-w-2xl leading-relaxed">
                DANANJAYA WICKRAMARACHCHI // PLATFORM ARCHITECT & CYBER SECURITY SPECIALIST
              </p>

              <button
                onClick={handleDownloadResume}
                disabled={downloadProgress !== null}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-black hover:bg-amber-500 disabled:bg-neutral-800 text-white hover:text-black text-xs md:text-sm font-sans font-extrabold uppercase tracking-widest rounded-full transition-all shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.3)] hover:scale-[1.02] cursor-pointer relative overflow-hidden"
              >
              {downloadProgress !== null ? (
                <>
                  <div 
                    className="absolute inset-y-0 left-0 bg-amber-500/30 transition-all duration-100"
                    style={{ width: `${downloadProgress}%` }}
                  />
                  <span>Compiling PDF {downloadProgress}%</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download CV (Simulated)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </ScrollReveal>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">

        {/* Dynamic Multi-Tab Selector */}
        <div className="flex border-b border-gray-200 gap-2 overflow-x-auto pb-px">
          {[
            { id: 'experience', label: 'Work Experience', icon: Briefcase },
            { id: 'skills', label: 'Technical Stack', icon: Cpu },
            { id: 'certifications', label: 'Certifications', icon: Award },
            { id: 'education', label: 'Education', icon: GraduationCap }
          ].map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 text-xs font-mono uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === tab.id 
                    ? 'border-gray-950 text-gray-950 font-bold' 
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Areas */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {experience.map((exp, index) => (
                  <div 
                    key={index}
                    className="bg-white/90 backdrop-blur-md border border-gray-200/90 rounded-[1.8rem] p-7 sm:p-9 space-y-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-gray-150/80 pb-4">
                      <div className="space-y-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-sans tracking-tight">{exp.role}</h3>
                        <p className="text-sm font-mono font-bold text-amber-500 tracking-wide">{exp.company}</p>
                      </div>
                      <div className="text-left sm:text-right flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5 font-mono text-xs text-gray-400 shrink-0 pt-0.5">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gray-350" /> {exp.period}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-350" /> {exp.location}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 pl-2 text-sm text-gray-600 font-sans font-normal leading-relaxed">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <span className="text-gray-400 font-bold select-none">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {skillGauges.map((skill) => (
                  <div 
                    key={skill.name}
                    className="bg-white border border-gray-200/80 rounded-2xl p-6 space-y-3 hover:border-gray-400 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-gray-800">{skill.name}</span>
                      <span className="text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded font-bold">{skill.level}%</span>
                    </div>

                    {/* Progress slider bar container */}
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{skill.category} / Expert Level</span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'certifications' && (
              <motion.div
                key="certifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
              >
                {[
                  {
                    id: 'ceh-offensive',
                    title: 'Certified Ethical Hacker (CEH)',
                    badge: 'ETHICAL HACKING',
                    provider: 'Offensive Security',
                    verified: true,
                    level: 'Advanced',
                    issuedOn: '15 May, 2026',
                    description: 'This certification validates advanced ethical hacking skills including network scanning, vulnerability assessment, exploitation, and secure system hardening using industry-standard tools and methodologies.',
                    credentialId: 'CEH-26-5783-DW'
                  },
                  {
                    id: 'thm-pentest',
                    title: 'Pentesting & Web Security Mastery',
                    badge: 'TRYHACKME',
                    provider: 'TryHackMe Labs',
                    verified: true,
                    level: 'Intermediate',
                    issuedOn: 'July 2026',
                    description: 'Hands-on offensive security labs covering OWASP Top 10 vulnerabilities, privilege escalation, Active Directory attack paths, and automated penetration testing techniques.',
                    credentialId: 'THM-7Y9X2A'
                  },
                  {
                    id: 'cisco-[#00f2fe]',
                    title: 'Cybersecurity Essentials & Architecture',
                    badge: 'CISCO ACADEMY',
                    provider: 'Cisco Networking Academy',
                    verified: true,
                    level: 'Fundamental',
                    issuedOn: 'March 2026',
                    description: 'Network defense strategies, firewall configuration, cryptographic principles, VPN tunnels, access control lists, and incident handling protocols.',
                    credentialId: 'CS-N92A3'
                  },
                  {
                    id: 'google-it-support',
                    title: 'Technical Support Professional',
                    badge: 'INFORMATION TECH',
                    provider: 'Google Career Certs',
                    verified: true,
                    level: 'Fundamental',
                    issuedOn: 'January 2026',
                    description: 'Operating systems architecture, hardware components, professional troubleshooting techniques, system administration, and network fundamentals.',
                    credentialId: 'GOOG-TS-8842'
                  }
                ].map((cert) => (
                  <CertificationExactCard key={cert.id} cert={cert} />
                ))}
              </motion.div>
            )}

            {activeTab === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {education.map((edu, index) => (
                  <div 
                    key={index}
                    className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                        <p className="text-sm font-mono font-medium text-gray-500">{edu.institution}</p>
                      </div>
                      <div className="text-right sm:text-right flex flex-col sm:items-end gap-1 font-mono text-[11px] text-gray-400">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {edu.year}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {edu.location}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
                      {edu.details}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Technical Competencies Overview */}
        <div className="bg-gray-950 text-white rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden border border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-85 h-85 bg-amber-500/10 blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl mx-auto space-y-6 relative z-10 text-center">
            <span className="inline-flex items-center gap-1 bg-white/10 text-amber-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/5">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Core Competencies
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tighter text-white">
              Offensive Security & Cloud Defense Architecture
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
              Equipped with deep offensive security insights and defensive engineering capabilities. I ensure web platforms, distributed cloud infrastructure, and enterprise APIs are fortified against zero-day exploits, unauthorized access, and data exfiltration.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
