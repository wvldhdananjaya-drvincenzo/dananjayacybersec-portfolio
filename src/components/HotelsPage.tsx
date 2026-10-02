import { useState } from 'react';
import { motion } from 'motion/react';
import ScrollReveal from './ScrollReveal';
import CertificationExactCard, { CertificationExactData } from './CertificationExactCard';
import CertificateImageModal from './CertificateImageModal';

interface HotelsPageProps {
  onBookHotel?: (hotelDestObj: any) => void;
}

const CERTIFICATIONS_DATA: CertificationExactData[] = [
  {
    id: 'htb-mythical',
    title: 'Mini Pro Labs: Mythical',
    badge: 'PRO LAB • HTB',
    badgeColor: '#22c55e',
    provider: 'Hack The Box',
    issuer: 'Hack The Box',
    verified: true,
    level: 'Advanced',
    difficulty: 'ADVANCED',
    issuedOn: '29 Sep 2026',
    credentialId: 'HTBCERT-640C44CA72',
    certificateUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790949787/Mythical_page-0001_nd1rdd.jpg',
    category: 'PRO LAB',
    cpeCredits: '10 CPE Credits',
    duration: '10 Hours',
    description: 'Official Hack The Box Certificate of Completion for Mini Pro Labs: Mythical. Demonstrates advanced penetration testing skills across complex enterprise exploitation chains, Active Directory enumeration, ADCS certificate services abuse, MSSQL attacks, and C2 operations.',
    skills: [
      'Active Directory Enumeration',
      'AD Certificate Services (ADCS)',
      'Lateral Movement',
      'Local Privilege Escalation',
      'MSSQL Attacks',
      'C2 Operations'
    ],
    cryptoHash: 'sha256:640c44ca72e92a81b37f482d8c301b',
    authorizedSignatory: 'Hack The Box Training & Certifications'
  },
  {
    id: 'htb-puppet',
    title: 'Mini Pro Labs: Puppet',
    badge: 'PRO LAB • HTB',
    badgeColor: '#22c55e',
    provider: 'Hack The Box',
    issuer: 'Hack The Box',
    verified: true,
    level: 'Advanced',
    difficulty: 'ADVANCED',
    issuedOn: '12 Aug 2026',
    credentialId: 'HTBCERT-9A40EF5F6F',
    certificateUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790949687/Puppet_page-0001_uhe6as.jpg',
    category: 'PRO LAB',
    cpeCredits: '10 CPE Credits',
    duration: '10 Hours',
    description: 'Official Hack The Box Certificate of Completion for Mini Pro Labs: Puppet. Focuses on advanced enterprise penetration testing, Active Directory compromise, exploiting continuous delivery & DevOps infrastructure, local privilege escalation, and lateral movement.',
    skills: [
      'Active Directory Enumeration',
      'Exploiting DevOps Infrastructure',
      'Local Privilege Escalation',
      'Lateral Movement',
      'Situational Awareness',
      'C2 Operations'
    ],
    cryptoHash: 'sha256:9a40ef5f6fb831e720c2941aa89104',
    authorizedSignatory: 'Hack The Box Training & Certifications'
  },
  {
    id: 'codered-sqli',
    title: 'SQL Injection Attacks',
    badge: 'WEB SECURITY',
    badgeColor: '#ef4444',
    provider: 'CodeRed',
    issuer: 'CodeRed (EC-Council)',
    verified: true,
    level: 'Intermediate',
    difficulty: 'INTERMEDIATE',
    issuedOn: '27th Aug 2026',
    credentialId: '523049',
    certificateUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790949695/SQL_Injections_dv6snp.png',
    category: 'SECURITY',
    duration: '1 Hour',
    description: 'Validation of Course Completion in SQL Injection Attacks from CodeRed (EC-Council). Demonstrates practical hands-on skills in discovering, testing, and exploiting database injection flaws in web applications, payload crafting, and defensive remediation.',
    skills: [
      'SQL Injection (SQLi)',
      'Database Security',
      'Web Application Exploitation',
      'OWASP Top 10',
      'Defensive Remediation'
    ],
    cryptoHash: 'sha256:523049b1e9c812d4a58f0011b932ef',
    authorizedSignatory: 'CodeRed EC-Council Continuous Learning'
  },
  {
    id: 'codered-az900',
    title: 'AZ 900 - Basics of Cloud Computing',
    badge: 'CLOUD COMPUTING',
    badgeColor: '#0284c7',
    provider: 'CodeRed',
    issuer: 'CodeRed (EC-Council)',
    verified: true,
    level: 'Fundamental',
    difficulty: 'BASIC',
    issuedOn: '15th Sep 2026',
    credentialId: '526894',
    certificateUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790949724/20b58a5b-2d3d-4456-8bc7-bbb6c9101fc3_qfu67q.png',
    category: 'CLOUD',
    duration: '1 Hour',
    description: 'Validation of Course Completion covering Microsoft Azure AZ-900 cloud fundamentals: cloud architecture models (IaaS, PaaS, SaaS), cloud security, global infrastructure resilience, and Azure service architectures.',
    skills: [
      'Azure Fundamentals',
      'Cloud Architecture',
      'IaaS & PaaS Models',
      'Cloud Security & Governance'
    ],
    cryptoHash: 'sha256:526894d8f33b1901ac891142e01bfa',
    authorizedSignatory: 'CodeRed EC-Council Continuous Learning'
  },
  {
    id: 'uom-web-design',
    title: 'Web Design for Beginners',
    badge: 'WEB DESIGN',
    badgeColor: '#f59e0b',
    provider: 'University of Moratuwa',
    issuer: 'University of Moratuwa, Sri Lanka',
    verified: true,
    level: 'Fundamental',
    difficulty: 'BASIC',
    issuedOn: '2026',
    credentialId: 'pkYEySna55',
    verificationUrl: 'https://open.uom.lk/verify',
    certificateUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790949829/Web_Design_for_Beginners_E-Certificate_page-0001_abab9z.jpg',
    category: 'ACADEMIC',
    description: 'Official E-Certificate of Completion from the University of Moratuwa, Sri Lanka (Faculty of IT, Department of Information Technology & CODL). Covers modern web page structuring, responsive web layout design, and frontend styling fundamentals.',
    skills: [
      'Modern Web Design',
      'HTML5 & CSS3',
      'Responsive Web Layouts',
      'UI/UX Fundamentals'
    ],
    cryptoHash: 'sha256:pkyeySna55d901b22e1189ac3f090b',
    authorizedSignatory: 'Yasas Sri (Programme Coordinator), Head of Dept. of Information Technology, Director CODL'
  }
];

export default function HotelsPage({ onBookHotel }: HotelsPageProps) {
  const [selectedCert, setSelectedCert] = useState<CertificationExactData | null>(null);

  return (
    <div className="pt-36 sm:pt-40 bg-gray-50/50 font-sans min-h-screen">
      {/* Hero header */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="relative bg-white border-b border-gray-100 py-16 sm:py-20 text-gray-950 flex flex-col items-center justify-center text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 flex flex-col items-center">
            
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-100/80 border border-neutral-200 rounded-full text-xs font-mono font-semibold tracking-[0.25em] uppercase text-neutral-800 shadow-sm">
              <span className="text-emerald-500 font-bold">✦</span> VERIFIED CREDENTIALS & LABS
            </span>
              
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-cal font-black tracking-tighter text-black uppercase select-none leading-none">
              Certifications
            </h1>

            <button
              onClick={() => {
                const el = document.getElementById('certifications-list');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-black hover:bg-emerald-500 text-white hover:text-black text-xs md:text-sm font-sans font-extrabold uppercase tracking-widest rounded-full transition-all shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.3)] hover:scale-[1.02] cursor-pointer mt-2"
            >
              <span>Explore Certifications</span>
              <span className="text-base font-semibold">↓</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Grid listing using exact copy UI card design */}
      <div id="certifications-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {CERTIFICATIONS_DATA.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <CertificationExactCard 
                cert={cert}
                onViewCertificate={() => {
                  setSelectedCert(cert);
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Image Viewer Popup Modal */}
      <CertificateImageModal
        cert={selectedCert}
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
}
