import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Github, 
  Twitter, 
  Copy, 
  Check, 
  ShieldCheck, 
  Download, 
  Layers, 
  Terminal, 
  FileText, 
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Destination, Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: Destination;
  userEmail?: string;
  onConfirmBooking: (booking: Booking) => void;
}

// Project detail data structure matching the uploaded editorial UI
interface ProjectCaseStudy {
  category: string;
  title: string;
  lead: string;
  date: string;
  author: string;
  readTime: string;
  heroImage: string;
  galleryImages: { url: string; caption: string }[];
  section1Title: string;
  section1Text: string[];
  section2Title: string;
  section2Text: string[];
  section3Title: string;
  section3Text: string[];
  highlights: string[];
}

// Rich project mapping for each lab / project destination
const getProjectData = (destination: Destination): ProjectCaseStudy => {
  const isPacketTracer = destination.id === 'packet-tracer-lab' || destination.title.toLowerCase().includes('packet tracer');
  const isRedTeam = destination.id === 'cultural-triangle' || destination.title.toLowerCase().includes('red team');
  const isPentest = destination.id === 'wild-safari' || destination.title.toLowerCase().includes('wireless');
  const isWeb3 = destination.id === 'scenic-hills' || destination.title.toLowerCase().includes('smart contract') || destination.title.toLowerCase().includes('web3');

  if (isPacketTracer) {
    return {
      category: 'NETWORK ARCHITECTURE',
      title: destination.title,
      lead: 'A multi-area OSPF enterprise backbone built with Cisco Packet Tracer, ASA 5506-X firewalls, VLAN trunking, and IPsec site-to-site VPN tunnels.',
      date: 'July 21, 2026',
      author: 'Dananjaya Wickramarachchi',
      readTime: '12 Min Read',
      heroImage: destination.image,
      galleryImages: [
        {
          url: 'https://res.cloudinary.com/z9mdashc/image/upload/v1784992987/kirill-sh-eVWWr6nmDf8-unsplash_z0lweq.jpg',
          caption: 'Cisco ASA 5506-X Firewall Rule Matrix & NAT Translation Table'
        },
        {
          url: 'https://res.cloudinary.com/z9mdashc/image/upload/v1784993019/jordan-harrison-40XgDxBfYXM-unsplash_qnxpva.jpg',
          caption: 'Inter-VLAN Packet Flow Analysis & OSPF Area 0 Topology'
        }
      ],
      section1Title: 'System Overview & Core Infrastructure Objectives',
      section1Text: [
        'Enterprise networks require strict segmentation, high availability, and secure communication channels across distributed branch offices. This lab showcases a zero-trust network blueprint engineered in Cisco Packet Tracer.',
        'The topology links a Central Headquarter (HQ) datacenter with remote regional branches through dual-redundant ISPs using multi-area OSPF. Access layers employ 802.1Q VLAN encapsulation, IEEE 802.1w Rapid Spanning Tree Protocol (RSTP), and DHCP Snooping to prevent rogue server injection.',
        'All inter-branch traffic is strictly routed through stateful Cisco ASA 5506-X perimeter firewalls, enforcing strict ACL policies and dynamic NAT/PAT translation.'
      ],
      section2Title: 'ASA Firewall Rules & Site-to-Site IPsec VPN',
      section2Text: [
        'To protect sensitive data in transit between HQ and remote branches, an IPsec site-to-site VPN tunnel was deployed using AES-256 encryption and SHA-256 HMAC integrity verification.',
        'Stateful inspection rules block unsolicited ingress traffic on the perimeter while permitting established connections. DMZ zones host public-facing servers with strict isolation from internal corporate database subnets.'
      ],
      section3Title: 'Key Verification & Hardening Results',
      section3Text: [
        'During automated failover testing, secondary OSPF routes seamlessly converged in under 1.2 seconds upon simulated link degradation.',
        'DHCP snooping and dynamic ARP inspection (DAI) successfully mitigated ARP spoofing attacks across all access switch ports.'
      ],
      highlights: [
        'Multi-Area OSPF Area 0 Backbone',
        'Cisco ASA Stateful Packet Inspection',
        'IPsec Site-to-Site AES-256 VPN Tunnels',
        'Dynamic ARP Inspection & DHCP Snooping'
      ]
    };
  }

  if (isRedTeam) {
    return {
      category: 'RED TEAMING & THREAT EMULATION',
      title: destination.title,
      lead: 'Simulating a nation-state adversary: initial entry via spear phishing, Kerberoasting, Active Directory lateral movement, and proof-of-concept exfiltration.',
      date: 'June 14, 2026',
      author: 'Dananjaya Wickramarachchi',
      readTime: '18 Min Read',
      heroImage: destination.image,
      galleryImages: [
        {
          url: 'https://res.cloudinary.com/z9mdashc/image/upload/v1784993063/jordan-harrison-40XgDxBfYXM-unsplash_qsntgm.jpg',
          caption: 'BloodHound Active Directory Attack Path Graph Analysis'
        },
        {
          url: 'https://res.cloudinary.com/z9mdashc/image/upload/v1784993019/jordan-harrison-40XgDxBfYXM-unsplash_qnxpva.jpg',
          caption: 'Cobalt Strike C2 Beacon Telemetry & Malleable PE Profiles'
        }
      ],
      section1Title: 'Adversary Tactics & Initial Access Strategy',
      section1Text: [
        'This threat emulation campaign modeled an advanced persistent threat (APT) actor targeting a hybrid Active Directory environment. The goal was evaluating internal SOC detection capabilities.',
        'Initial access was achieved through targeted payload delivery bypassing standard email gateway filters. A custom C2 beacon was executed in memory using API unhooking and indirect syscalls.'
      ],
      section2Title: 'Active Directory Privilege Escalation & Lateral Movement',
      section2Text: [
        'Once inside the perimeter, BloodHound revealed an unconstrained delegation path leading to Domain Admin rights. Kerberoasting attacks targeted service accounts with weak NTLM hashes.',
        'Using ticket-granting service (TGS) tickets offline cracking, administrative access was achieved without triggering standard Windows Event Log alerts.'
      ],
      section3Title: 'Exfiltration & Detection Recommendations',
      section3Text: [
        'Proof-of-concept sensitive data exfiltration was conducted over DNS tunneling to bypass egress proxy restrictions.',
        'Key remediation includes enforcing gMSA (Group Managed Service Accounts), disabling NTLMv1, and implementing Tiered Administration models.'
      ],
      highlights: [
        'BloodHound Attack Path Mapping',
        'Kerberoasting & AS-REP Roasting',
        'Memory EDR Bypass & Indirect Syscalls',
        'Tiered Active Directory Hardening Blueprint'
      ]
    };
  }

  if (isPentest) {
    return {
      category: 'PHYSICAL & WIRELESS SECURITY',
      title: destination.title,
      lead: 'Assessing physical facility perimeters, RFID badge cloning vectors, rogue Wi-Fi access points, and covert hardware drop-box implants.',
      date: 'May 08, 2026',
      author: 'Dananjaya Wickramarachchi',
      readTime: '10 Min Read',
      heroImage: destination.image,
      galleryImages: [
        {
          url: 'https://res.cloudinary.com/z9mdashc/image/upload/v1784992994/jj-ying-8bghKxNU1j0-unsplash_lo6f9i.jpg',
          caption: 'Hak5 Wi-Fi Pineapple Rogue Access Point Capture'
        },
        {
          url: 'https://res.cloudinary.com/z9mdashc/image/upload/v1784993039/omar-flores-MOO6k3RaiwE-unsplash_q1vhnc.jpg',
          caption: 'Proxmark3 RFID Badge Emulation & Tailgating Audit'
        }
      ],
      section1Title: 'Physical Perimeter & Access Control Testing',
      section1Text: [
        'Physical security is the bedrock of organizational defense. This audit evaluated low-frequency and high-frequency RFID badge readers deployed across facility entry gates.',
        'Using a Proxmark3 RDV4 device, 125kHz HID Prox cards were successfully cloned from a distance of 15cm during tailgating simulations.'
      ],
      section2Title: 'Rogue Wireless AP & Covert Drop-Box Deployment',
      section2Text: [
        'A covert Raspberry Pi 4 drop-box equipped with 4G LTE backhaul was deployed inside an unmonitored server room network jack.',
        'Simultaneously, a rogue WPA2-Enterprise access point lured corporate laptops to capture EAP-PEAP MSCHAPv2 handshake hashes.'
      ],
      section3Title: 'Mitigation Strategies & Physical Hardening',
      section3Text: [
        'Recommended transitioning to encrypted iCLASS SE/Seos smart cards, enforcing 802.1X Port Security with MACsec on all wall jacks, and deploying wireless intrusion prevention systems (WIPS).'
      ],
      highlights: [
        '125kHz / 13.56MHz RFID Badge Cloning',
        'Hak5 Wireless Rogue AP Interception',
        '802.1X Network Access Control (NAC) Auditing',
        'Covert Hardware Drop-box Implants'
      ]
    };
  }

  if (isWeb3) {
    return {
      category: 'SMART CONTRACT SECURITY',
      title: destination.title,
      lead: 'Auditing EVM & Solana smart contracts: identifying critical reentrancy vectors, flash loan oracle manipulation risks, and logic flaw mitigations.',
      date: 'April 29, 2026',
      author: 'Dananjaya Wickramarachchi',
      readTime: '15 Min Read',
      heroImage: destination.image,
      galleryImages: [
        {
          url: 'https://res.cloudinary.com/z9mdashc/image/upload/v1784992996/nastya-dulhiier-OKOOGO578eo-unsplash_lcfbh2.jpg',
          caption: 'Slither & Foundry Symbolic Execution AST Graph'
        },
        {
          url: 'https://res.cloudinary.com/z9mdashc/image/upload/v1784993039/omar-flores-MOO6k3RaiwE-unsplash_q1vhnc.jpg',
          caption: 'Solidity Reentrancy Guard & Price Oracle Verification'
        }
      ],
      section1Title: 'Audit Scope & Automated Analysis Methodology',
      section1Text: [
        'Smart contracts on public blockchains execute irreversibly. This audit covered core DeFi lending pool contracts and liquidity vault logic using automated static analysis and manual line-by-line review.',
        'Slither and Echidna fuzz testing suites generated over 500,000 invariant test runs to uncover edge-case overflow and state desynchronization conditions.'
      ],
      section2Title: 'Vulnerability Discoveries & Oracle Manipulation Risks',
      section2Text: [
        'A critical reentrancy vector was identified in the liquidity withdrawal function where state updates occurred post-Ether transfer.',
        'Additionally, reliance on spot AMM reserves for collateral valuation exposed the protocol to single-block flash loan price manipulation attacks.'
      ],
      section3Title: 'Remediation & Formal Verification',
      section3Text: [
        'Applied OpenZeppelin ReentrancyGuard nonReentrant modifiers and integrated Chainlink decentralized TWAP price oracle feeds to guarantee price integrity.'
      ],
      highlights: [
        'Reentrancy Guard Implementation',
        'Chainlink Decentralized Oracle Feeds',
        'Foundry Fuzzing & Invariant Testing',
        'Formal Verification & Math Proofs'
      ]
    };
  }

  // Cloud Guard default
  return {
    category: 'DEVSECOPS & CLOUD HARDENING',
    title: destination.title,
    lead: 'Hardening AWS EKS clusters, containerized workloads, IAM least-privilege policies, and automated Checkov/Trivy security pipelines.',
    date: 'March 18, 2026',
    author: 'Dananjaya Wickramarachchi',
    readTime: '14 Min Read',
    heroImage: destination.image,
    galleryImages: [
      {
        url: 'https://res.cloudinary.com/z9mdashc/image/upload/v1784992987/kirill-sh-eVWWr6nmDf8-unsplash_z0lweq.jpg',
        caption: 'Terraform IaC Security Scanning & Checkov Compliance Map'
      },
      {
        url: 'https://res.cloudinary.com/z9mdashc/image/upload/v1784993019/jordan-harrison-40XgDxBfYXM-unsplash_qnxpva.jpg',
        caption: 'Kubernetes Pod Security Admission & Falco Runtime Monitor'
      }
    ],
    section1Title: 'Cloud Architecture & Threat Surface Assessment',
    section1Text: [
      'Modern cloud infrastructures rely on Kubernetes and Infrastructure as Code (IaC). This project involved auditing a multi-account AWS environment hosting microservices.',
      'Analysis revealed overly permissive wildcard IAM policies and public S3 bucket exposures that violated SOC 2 compliance baselines.'
    ],
    section2Title: 'Automated DevSecOps Pipeline & Runtime Monitoring',
    section2Text: [
      'Integrated Checkov and Trivy scanners into GitHub Actions CI/CD workflows, automatically blocking pull requests containing hardcoded credentials or misconfigured security groups.',
      'Deployed Falco runtime detection inside AWS EKS nodes to trigger immediate Slack alerts upon unauthorized terminal execution inside production containers.'
    ],
    section3Title: 'Zero-Trust Hardening & Outcomes',
    section3Text: [
      'Achieved 100% compliance with CIS AWS Foundations Benchmarks, eliminated all admin-level IAM key pairs, and enforced AWS KMS customer-managed encryption across all volumes.'
    ],
    highlights: [
      'AWS IAM Least-Privilege Optimization',
      'Kubernetes EKS Pod Security Policies',
      'Automated CI/CD Vulnerability Gatekeepers',
      'Falco Runtime Anomaly Detection'
    ]
  };
};

export default function BookingModal({
  isOpen,
  onClose,
  destination,
  userEmail = '',
  onConfirmBooking
}: BookingModalProps) {
  const [copied, setCopied] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState(userEmail);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const project = getProjectData(destination);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onConfirmBooking) {
        onConfirmBooking({
          id: 'PRJ-' + Math.floor(Math.random() * 900000 + 100000),
          destinationId: destination.id,
          destinationTitle: destination.title,
          destinationImage: destination.image,
          userName,
          userEmail: email,
          passengers: 1,
          dateSelected: new Date().toISOString().split('T')[0],
          tripType: destination.tripType,
          totalPrice: destination.price,
          status: 'Confirmed',
          bookedAt: new Date().toISOString()
        });
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/70 backdrop-blur-md overflow-y-auto antialiased">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-4xl bg-white rounded-3xl sm:rounded-[36px] shadow-2xl overflow-hidden my-auto border border-gray-100/80 font-sans text-gray-800"
      >
        {/* Sticky top right close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-30 p-2.5 text-gray-500 hover:text-black bg-white/90 hover:bg-white rounded-full shadow-md border border-gray-200/80 transition-all cursor-pointer hover:scale-105 active:scale-95"
          title="Close Modal"
        >
          <X className="w-5 h-5 stroke-[2.2]" />
        </button>

        <div className="max-h-[85vh] overflow-y-auto px-6 sm:px-12 md:px-16 pt-12 pb-14 space-y-10 custom-scrollbar">
          
          {/* HEADER AREA (Centered Editorial Layout matching image exactly) */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            {/* Category Tag */}
            <div>
              <span className="text-[11px] font-mono font-bold tracking-[0.22em] text-gray-400 uppercase">
                {project.category}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-gray-950 tracking-tight leading-[1.15] text-center">
              {project.title}
            </h1>

            {/* Lead Subtitle */}
            <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed text-center max-w-xl mx-auto">
              {project.lead}
            </p>

            {/* Metadata 3-Column Bar */}
            <div className="pt-4 flex items-center justify-center gap-8 sm:gap-14 border-t border-gray-100 max-w-md mx-auto text-center font-sans">
              <div>
                <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase block mb-0.5">
                  DATE
                </span>
                <span className="text-xs font-semibold text-gray-900 block">
                  {project.date}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase block mb-0.5">
                  AUTHOR
                </span>
                <span className="text-xs font-semibold text-gray-900 block">
                  {project.author}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase block mb-0.5">
                  READ
                </span>
                <span className="text-xs font-semibold text-gray-900 block">
                  {project.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* FEATURED HERO IMAGE FRAME (Teal/Soft-Slate Container with generous rounded image) */}
          <div className="w-full bg-[#80b1bd] p-4 sm:p-6 md:p-8 rounded-[28px] sm:rounded-[36px] shadow-sm overflow-hidden flex items-center justify-center">
            <div className="w-full overflow-hidden rounded-2xl sm:rounded-[28px] shadow-lg bg-slate-900">
              <img
                src={project.heroImage}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-96 md:h-[420px] object-cover object-center transform hover:scale-[1.01] transition-transform duration-500"
              />
            </div>
          </div>

          {/* ARTICLE BODY & LEFT SOCIAL SIDEBAR GRID */}
          <div className="grid grid-cols-1 md:grid-cols-[48px_1fr] gap-8 md:gap-12 items-start pt-2">
            
            {/* Left Column: Sticky Action / Social Buttons */}
            <div className="flex md:flex-col items-center justify-center md:justify-start gap-4 md:sticky md:top-8 text-gray-700 pt-1">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200/80 text-gray-600 hover:text-black transition-all cursor-pointer"
                title="Share on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/DananjayaWickramarachchi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200/80 text-gray-600 hover:text-black transition-all cursor-pointer"
                title="View GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200/80 text-gray-600 hover:text-black transition-all cursor-pointer relative"
                title="Copy Article Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied && (
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-[10px] font-mono py-1 px-2 rounded-md whitespace-nowrap shadow-md">
                    Copied!
                  </span>
                )}
              </button>
            </div>

            {/* Right Column: Article Details & Project Images */}
            <div className="space-y-10 text-gray-700 leading-relaxed font-sans text-sm">
              
              {/* Section 1 */}
              <div className="space-y-3.5">
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-gray-950 tracking-tight">
                  {project.section1Title}
                </h3>
                {project.section1Text.map((p, idx) => (
                  <p key={idx} className="text-gray-600 font-normal leading-relaxed text-sm">
                    {p}
                  </p>
                ))}
              </div>

              {/* PROJECT GALLERY IMAGES & DIAGRAMS */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-900 uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span>Technical Blueprint Diagrams & Visual Proofs</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.galleryImages.map((img, i) => (
                    <div key={i} className="group space-y-2">
                      <div className="relative rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm bg-gray-900 aspect-[4/3]">
                        <img
                          src={img.url}
                          alt={img.caption}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <span className="text-[11px] font-sans text-white font-medium">
                            Zoom Blueprint
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] font-sans text-gray-500 italic leading-snug">
                        Figure {i + 1}: {img.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xl font-display font-semibold text-gray-950 tracking-tight">
                  {project.section2Title}
                </h3>
                {project.section2Text.map((p, idx) => (
                  <p key={idx} className="text-gray-600 font-normal leading-relaxed text-sm">
                    {p}
                  </p>
                ))}
              </div>

              {/* Section 3 */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xl font-display font-semibold text-gray-950 tracking-tight">
                  {project.section3Title}
                </h3>
                {project.section3Text.map((p, idx) => (
                  <p key={idx} className="text-gray-600 font-normal leading-relaxed text-sm">
                    {p}
                  </p>
                ))}
              </div>

              {/* Key Technical Highlights Badges */}
              <div className="p-6 bg-slate-900 text-white rounded-2xl sm:rounded-3xl space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Key Architecture Takeaways</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-medium text-gray-200">
                  {project.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-800/90 px-3.5 py-2 rounded-xl border border-slate-700/80">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 stroke-[3]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* REQUEST BLUEPRINT / CONSULTATION DRAWER */}
              {!showRequestForm ? (
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h5 className="font-sans text-sm font-bold text-gray-900">
                      Interested in this Security Blueprint?
                    </h5>
                    <p className="text-xs text-gray-500">
                      Request complete topology files (.pkt/.sol) or schedule an architecture review.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowRequestForm(true)}
                      className="px-6 py-3 bg-black hover:bg-amber-500 text-white hover:text-black font-sans text-xs font-extrabold uppercase tracking-wider rounded-full transition-all shadow-md cursor-pointer hover:scale-102 flex items-center gap-2"
                    >
                      <span>Deploy / Request Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-gray-50 border border-gray-200/90 rounded-3xl space-y-4">
                  {!isSubmitted ? (
                    <form onSubmit={handleRequestSubmit} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-bold text-gray-900 font-sans uppercase tracking-wider flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-amber-500" />
                          <span>Request Full Technical Specs</span>
                        </h5>
                        <button
                          type="button"
                          onClick={() => setShowRequestForm(false)}
                          className="text-xs text-gray-400 hover:text-gray-700 font-mono"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={userName}
                          onChange={e => setUserName(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:outline-none focus:border-black font-sans"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Your Email Address"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:outline-none focus:border-black font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-black hover:bg-gray-800 text-white rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span>Processing Request...</span>
                        ) : (
                          <>
                            <Download className="w-4 h-4 text-amber-400" />
                            <span>Dispatch Technical Specs to My Email</span>
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-4 space-y-2">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full">
                        <Check className="w-5 h-5 stroke-[3]" />
                      </div>
                      <h5 className="text-sm font-bold text-gray-900 font-sans">
                        Request Confirmed!
                      </h5>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto">
                        Thank you <strong>{userName}</strong>. The technical blueprints and topology documentation have been dispatched to <strong>{email}</strong>.
                      </p>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
