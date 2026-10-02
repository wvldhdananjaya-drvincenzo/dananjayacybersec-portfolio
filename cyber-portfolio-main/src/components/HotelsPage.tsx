import { useState } from 'react';
import { motion } from 'motion/react';
import ScrollReveal from './ScrollReveal';
import { 
  Award, 
  Terminal, 
  Server
} from 'lucide-react';
import CertificationExactCard, { CertificationExactData } from './CertificationExactCard';
import CertificateImageModal from './CertificateImageModal';

interface HotelsPageProps {
  onBookHotel: (hotelDestObj: any) => void;
}

interface Certification {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  subtitle: string;
  verified: boolean;
  description: string;
  credentialId: string;
  issuedOn: string;
  issuer: string;
  difficulty: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';
  headerType: 'nmap' | 'gobuster' | 'circuit' | 'network';
  cryptoHash: string;
  authorizedSignatory: string;
  provider?: string;
  level?: string;
  price?: string;
}

const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: 'ceh-offensive',
    title: 'Certified Ethical Hacker (CEH)',
    badge: 'ETHICAL HACKING',
    badgeColor: '#3b82f6',
    subtitle: 'OFFENSIVE SECURITY • ADVANCED',
    verified: true,
    description: 'This certification validates advanced ethical hacking skills including network scanning, vulnerability assessment, exploitation, and secure system hardening using industry-standard tools and methodologies.',
    credentialId: 'CEH-26-5783-DW',
    issuedOn: '15 May, 2026',
    issuer: 'Offensive Security',
    provider: 'Offensive Security',
    level: 'Advanced',
    difficulty: 'ADVANCED',
    headerType: 'nmap',
    price: '299 USD',
    cryptoHash: 'sha256:d5f2a1b38c29e4726e6f9872e6d9812e',
    authorizedSignatory: 'Jan Vykopal (Lead Security Assessor)'
  },
  {
    id: 'thm-pentest',
    title: 'Junior Penetration Tester',
    badge: 'ETHICAL HACKING',
    badgeColor: '#3b82f6',
    subtitle: 'TRYHACKME • INTERMEDIATE',
    verified: true,
    description: 'Focused on security assessment, web application security, active network reconnaissance, basic privilege escalation, and active directory enumeration concepts.',
    credentialId: 'THM-7Y9X2A',
    issuedOn: 'July 2026',
    issuer: 'TryHackMe',
    provider: 'TryHackMe Labs',
    level: 'Intermediate',
    difficulty: 'INTERMEDIATE',
    headerType: 'gobuster',
    price: '199 USD',
    cryptoHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb924',
    authorizedSignatory: 'Ashu Savani (SecOps Training Coordinator)'
  },
  {
    id: 'cisco-cyber',
    title: 'Introduction to Cybersecurity',
    badge: 'SECURITY OPS',
    badgeColor: '#10b981',
    subtitle: 'CISCO NETWORKING ACADEMY • BASIC',
    verified: true,
    description: 'Covers essential cybersecurity principles, defense-in-depth frameworks, basic cryptography concepts, threat landscape navigation, and modern defensive controls.',
    credentialId: 'CS-N92A3',
    issuedOn: 'March 2026',
    issuer: 'Cisco Systems Inc.',
    provider: 'Cisco Networking Academy',
    level: 'Fundamental',
    difficulty: 'BASIC',
    headerType: 'circuit',
    price: '149 USD',
    cryptoHash: 'sha256:a4f890d2e8b61c107bfbd4c2396fb12c',
    authorizedSignatory: 'Laura Quintana (VP & GM, Cisco Networking Academy)'
  },
  {
    id: 'google-it-support',
    title: 'Technical Support Professional',
    badge: 'INFORMATION TECH',
    badgeColor: '#06b6d4',
    subtitle: 'GOOGLE • BASIC',
    verified: true,
    description: 'Operating systems architecture, hardware components, professional troubleshooting techniques, system administration, and network fundamentals.',
    credentialId: 'GOOG-TS-8842',
    issuedOn: 'January 2026',
    issuer: 'Google Career Certificates',
    provider: 'Google Career Certs',
    level: 'Fundamental',
    difficulty: 'BASIC',
    headerType: 'network',
    price: '120 USD',
    cryptoHash: 'sha256:f120e29b109e256a4fbfe3c229cf2a5a',
    authorizedSignatory: 'Amanda Brophy (Global Director, Google Career Certificates)'
  }
];

export default function HotelsPage({ onBookHotel }: HotelsPageProps) {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="pt-36 sm:pt-40 bg-gray-50/50 font-sans min-h-screen">
      {/* Hero header */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="relative bg-white border-b border-gray-100 py-20 text-gray-950 flex flex-col items-center justify-center text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-100/80 border border-neutral-200 rounded-full text-xs font-mono font-semibold tracking-[0.25em] uppercase text-neutral-800 shadow-sm">
              <span className="text-amber-500 font-bold">✦</span> LEARNING PROGRESS
            </span>
              
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-sans font-black tracking-tighter text-black uppercase select-none leading-none">
                Certifications
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-neutral-600 font-sans tracking-wide max-w-2xl leading-relaxed">
                Certifications and courses completed
              </p>

              <button
                onClick={() => {
                  const el = document.getElementById('certifications-list');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-black hover:bg-amber-500 text-white hover:text-black text-xs md:text-sm font-sans font-extrabold uppercase tracking-widest rounded-full transition-all shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.3)] hover:scale-[1.02] cursor-pointer"
              >
                <span>View Progress</span>
                <span className="text-base font-semibold">↗</span>
              </button>
            </div>
          </div>
      </ScrollReveal>

      <div id="certifications-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        
        {/* Grid listing using exact copy UI card design */}
        <div className="space-y-10">
          <div className="border-b border-gray-100 pb-4 text-center sm:text-left">
            <h2 className="text-2xl font-display font-extrabold text-gray-900">Professional Qualifications</h2>
            <p className="text-xs text-gray-400 font-mono uppercase mt-1">Guaranteed authentic and digitally verifiable</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {CERTIFICATIONS_DATA.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <CertificationExactCard 
                  cert={{
                    id: cert.id,
                    title: cert.title,
                    badge: cert.badge,
                    provider: cert.provider || cert.issuer,
                    verified: cert.verified,
                    level: cert.level || cert.difficulty,
                    issuedOn: cert.issuedOn,
                    description: cert.description,
                    credentialId: cert.credentialId,
                    authorizedSignatory: cert.authorizedSignatory,
                    cryptoHash: cert.cryptoHash,
                    issuer: cert.issuer
                  }}
                  onViewCertificate={() => {
                    setSelectedCert(cert);
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Certificate Image Viewer Popup Modal */}
      <CertificateImageModal
        cert={selectedCert ? {
          id: selectedCert.id,
          title: selectedCert.title,
          badge: selectedCert.badge,
          provider: selectedCert.provider || selectedCert.issuer,
          verified: selectedCert.verified,
          level: selectedCert.level || selectedCert.difficulty,
          issuedOn: selectedCert.issuedOn,
          description: selectedCert.description,
          credentialId: selectedCert.credentialId,
          authorizedSignatory: selectedCert.authorizedSignatory,
          cryptoHash: selectedCert.cryptoHash,
          issuer: selectedCert.issuer
        } : null}
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
}
