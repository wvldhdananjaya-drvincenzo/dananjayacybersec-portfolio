import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { 
  Briefcase, 
  GraduationCap, 
  Trophy, 
  Phone, 
  Globe, 
  Mail,
  MapPin,
  Linkedin,
  Github,
  Award,
  CheckCircle2,
  Download, 
  Printer, 
  Check,
  AlertCircle
} from 'lucide-react';
import { downloadCvAsPdf, generateVectorCvPdf } from '../utils/pdfGenerator';
import { DANANJAYA_PHOTO_BASE64 } from '../assets/dananjayaPhotoBase64';

export default function ResumePage() {
  const profileImageUrl = DANANJAYA_PHOTO_BASE64;
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownloadResume = async () => {
    if (downloadProgress !== null) return;
    setDownloadError(null);
    setDownloadProgress(15);

    try {
      await downloadCvAsPdf('resume-sheet-card', {
        filename: 'Dananjaya_Wickramarachchi_Curriculum_Vitae.pdf',
        onProgress: (percent) => {
          setDownloadProgress(percent);
        }
      });
      setIsDownloaded(true);
      setTimeout(() => setIsDownloaded(false), 5000);
    } catch (error) {
      console.warn('downloadCvAsPdf failed, running vector fallback:', error);
      try {
        generateVectorCvPdf('Dananjaya_Wickramarachchi_Curriculum_Vitae.pdf', (p) => {
          setDownloadProgress(p);
        });
        setIsDownloaded(true);
        setTimeout(() => setIsDownloaded(false), 5000);
      } catch (fallbackError) {
        console.error('All PDF generation methods failed:', fallbackError);
        setDownloadError('Could not render PDF directly. Please use the Print Sheet button to save as PDF.');
        setTimeout(() => setDownloadError(null), 6000);
      }
    } finally {
      setDownloadProgress(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-100/80 text-neutral-900 font-sans pt-28 sm:pt-36 pb-24 relative overflow-hidden select-none">
      {/* Print Stylesheet to enforce clean A4 single-sheet output */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          body {
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          header, footer, nav, #print-control-bar, .print\\:hidden {
            display: none !important;
          }
          #exact-cv-paper {
            max-width: 210mm !important;
            width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: hidden !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
          #resume-sheet-card {
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            overflow: hidden !important;
            display: flex !important;
            flex-direction: row !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
          .cv-left-col {
            width: 72mm !important;
            min-width: 72mm !important;
            max-width: 72mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            background: #1c1c1e !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .cv-right-col {
            width: 138mm !important;
            min-width: 138mm !important;
            max-width: 138mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            background: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* Decorative Background Ornaments */}
      <div className="absolute top-40 left-[-10%] w-96 h-96 rounded-full bg-neutral-900/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-[-10%] w-96 h-96 rounded-full bg-neutral-900/5 blur-[120px] pointer-events-none" />

      {/* Control bar / header actions */}
      <div id="print-control-bar" className="max-w-4xl mx-auto px-4 sm:px-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase text-neutral-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" /> ISO A4 FORMAT (210 × 297 MM)
          </span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mt-1">
            Official Curriculum Vitae
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            id="print-resume-btn"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 text-xs font-semibold rounded-full transition-all shadow-sm hover:shadow hover:scale-[1.02] cursor-pointer"
            title="Print or Save as PDF via Browser"
          >
            <Printer className="w-3.5 h-3.5 text-neutral-600" />
            <span>Print Sheet</span>
          </button>

          <button
            onClick={handleDownloadResume}
            id="download-resume-btn"
            disabled={downloadProgress !== null}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-neutral-800 disabled:bg-neutral-700 text-white text-xs font-bold tracking-wide rounded-full transition-all shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer relative overflow-hidden"
          >
            {downloadProgress !== null ? (
              <>
                <div
                  className="absolute inset-y-0 left-0 bg-white/25 transition-all duration-100"
                  style={{ width: `${downloadProgress}%` }}
                />
                <span>Generating {downloadProgress}%</span>
              </>
            ) : isDownloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                <span>Downloaded A4 PDF</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-white" />
                <span>Download CV</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error alert if PDF generation fails */}
      {downloadError && (
        <div className="max-w-4xl mx-auto px-4 mb-6 print:hidden">
          <div className="p-3.5 bg-neutral-900 border border-neutral-700 text-white rounded-xl text-xs flex items-center gap-2.5 shadow-md">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{downloadError}</span>
          </div>
        </div>
      )}

      {/* Main CV Sheet Container - True Standard A4 Proportions */}
      <ScrollReveal direction="up" delay={0.1}>
        <div 
          id="exact-cv-paper" 
          className="max-w-4xl mx-auto px-2 sm:px-4 print:p-0 print:max-w-none print:shadow-none"
        >
          <div 
            id="resume-sheet-card"
            className="bg-white rounded-2xl md:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.18)] border border-neutral-200/90 overflow-hidden flex flex-col md:flex-row print:border-none print:rounded-none"
          >
            
            {/* LEFT COLUMN: Dark Sidebar (#1c1c1e) */}
            <div className="cv-left-col w-full md:w-[35%] bg-[#1c1c1e] text-white p-6 sm:p-7 flex flex-col justify-between space-y-6 border-r border-neutral-800">
              
              {/* Profile Photo: Centered in Elegant Arched Frame */}
              <div className="flex justify-center pt-2">
                <div className="relative w-40 sm:w-44 h-52 sm:h-60 rounded-t-full rounded-b-[40px] border-[3px] border-white overflow-hidden bg-neutral-900 shadow-xl">
                  <img
                    src={profileImageUrl}
                    alt="Dananjaya Wickramarachchi Portrait"
                    className="w-full h-full object-cover object-top contrast-105"
                    crossOrigin="anonymous"
                  />
                </div>
              </div>

              {/* 1. CONTACT */}
              <div id="section-contact">
                <div className="flex items-center gap-2">
                  <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center text-black shrink-0 shadow-sm p-1">
                    <Phone className="w-2.5 h-2.5" />
                  </div>
                  <h3 className="text-[11px] font-extrabold tracking-[0.2em] text-white uppercase font-cal">
                    CONTACT
                  </h3>
                </div>
                <div className="h-[1px] bg-neutral-700/80 mt-2 mb-3" />
                <div className="space-y-2.5 text-[11px]">
                  <div>
                    <span className="text-[9.5px] font-bold tracking-wider text-neutral-400 block uppercase">
                      PHONE
                    </span>
                    <p className="text-neutral-200 font-medium mt-0.5 tracking-tight">
                      +94 70 508 4477
                    </p>
                  </div>
                  <div>
                    <span className="text-[9.5px] font-bold tracking-wider text-neutral-400 block uppercase">
                      EMAIL
                    </span>
                    <p className="text-neutral-200 font-medium mt-0.5 break-all">
                      dananjayawvldh@gmail.com
                    </p>
                  </div>
                  <div>
                    <span className="text-[9.5px] font-bold tracking-wider text-neutral-400 block uppercase">
                      LOCATION
                    </span>
                    <p className="text-neutral-200 font-medium mt-0.5">
                      Colombo, Sri Lanka
                    </p>
                  </div>
                  <div>
                    <span className="text-[9.5px] font-bold tracking-wider text-neutral-400 block uppercase">
                      LINKEDIN
                    </span>
                    <p className="text-neutral-200 font-medium mt-0.5 break-all">
                      DananjayaWickramarachchi-DW
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. WORK SKILLS */}
              <div id="section-work-skills">
                <div className="flex items-center gap-2">
                  <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center text-black shrink-0 shadow-sm p-1">
                    <Briefcase className="w-2.5 h-2.5" />
                  </div>
                  <h3 className="text-[11px] font-extrabold tracking-[0.2em] text-white uppercase font-cal">
                    WORK SKILLS
                  </h3>
                </div>
                <div className="h-[1px] bg-neutral-700/80 mt-2 mb-3" />
                <div className="space-y-2.5">
                  {[
                    { name: 'Network Security & Pentesting', level: 92 },
                    { name: 'Network Engineering & VLANs', level: 88 },
                    { name: 'System Flow Design & Architecture', level: 86 },
                    { name: 'Linux & Threat Emulation', level: 89 },
                    { name: 'Graphic Design & Brand Identity', level: 90 },
                    { name: 'AI Video Editing & Production', level: 85 }
                  ].map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-200 font-medium w-36 truncate">{skill.name}</span>
                      <div className="flex-1 mx-2.5 h-1.5 bg-neutral-700/80 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-700"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-neutral-300 font-sans text-[10.5px] w-7 text-right shrink-0">
                        {skill.level}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. LANGUAGES */}
              <div id="section-languages">
                <div className="flex items-center gap-2">
                  <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center text-black shrink-0 shadow-sm p-1">
                    <Globe className="w-2.5 h-2.5" />
                  </div>
                  <h3 className="text-[11px] font-extrabold tracking-[0.2em] text-white uppercase font-cal">
                    LANGUAGES
                  </h3>
                </div>
                <div className="h-[1px] bg-neutral-700/80 mt-2 mb-3" />
                <div className="space-y-2.5">
                  {[
                    { name: 'English (Professional)', level: 88 },
                    { name: 'Sinhala (Native / Fluent)', level: 100 }
                  ].map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-200 font-medium w-36 truncate">{lang.name}</span>
                      <div className="flex-1 mx-2.5 h-1.5 bg-neutral-700/80 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-700"
                          style={{ width: `${lang.level}%` }}
                        />
                      </div>
                      <span className="text-neutral-300 font-sans text-[10.5px] w-7 text-right shrink-0">
                        {lang.level}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. REFERENCE */}
              <div id="section-reference">
                <div className="flex items-center gap-2">
                  <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center text-black shrink-0 shadow-sm p-1">
                    <Award className="w-2.5 h-2.5" />
                  </div>
                  <h3 className="text-[11px] font-extrabold tracking-[0.2em] text-white uppercase font-cal">
                    REFERENCE
                  </h3>
                </div>
                <div className="h-[1px] bg-neutral-700/80 mt-2 mb-3" />
                <div className="space-y-3 text-[11px]">
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-wide">
                      T.A. Soysa
                    </h4>
                    <p className="text-neutral-300 font-normal text-[10.5px] pt-0.5 tracking-tight">
                      +94 78 839 2279
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-wide">
                      D. Perera
                    </h4>
                    <p className="text-neutral-300 font-normal text-[10.5px] pt-0.5 tracking-tight">
                      +94 78 596 2959
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Crisp White Content */}
            <div className="cv-right-col w-full md:w-[65%] bg-white text-neutral-900 p-7 sm:p-9 md:p-10 flex flex-col justify-between space-y-6">
              
              {/* Header: Name & Title */}
              <div className="space-y-2 border-b border-neutral-200 pb-4">
                <h1 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[36px] font-extrabold tracking-tight text-neutral-950 uppercase font-cal leading-[1.08] flex flex-col">
                  <span className="block">DANANJAYA</span>
                  <span className="block text-neutral-900">WICKRAMARACHCHI</span>
                </h1>
                <h2 className="text-xs sm:text-[12.5px] font-bold tracking-[0.2em] text-neutral-700 uppercase font-cal pt-1">
                  UNDERGRADUATE IN NETWORK SECURITY & ETHICAL HACKING
                </h2>
                <div className="h-[1px] bg-neutral-200 my-2.5" />
                <p className="text-[11.5px] sm:text-xs text-neutral-600 font-normal leading-relaxed text-justify sm:text-left">
                  Dedicated Network Security and Ethical Hacking undergraduate with solid technical competence in enterprise network engineering, vulnerability assessments, system flow architecture, and digital branding. Experienced in configuring resilient network topologies, threat emulation environments, and AI-driven media workflows with a strong commitment to zero-trust defense principles.
                </p>
              </div>

              {/* 1. EDUCATION */}
              <div id="section-education" className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white shrink-0 shadow-sm">
                    <GraduationCap className="w-2.5 h-2.5" />
                  </div>
                  <h3 className="text-xs font-extrabold tracking-[0.2em] text-black uppercase font-cal shrink-0">
                    EDUCATION
                  </h3>
                  <div className="flex-1 h-[1px] bg-neutral-200 ml-2" />
                </div>

                <div className="space-y-3 pt-0.5">
                  {/* Item 1: BSc Network Security */}
                  <div className="grid grid-cols-[85px_1fr] items-start gap-3 text-xs">
                    <span className="inline-block px-2 py-0.5 bg-neutral-900 text-white font-bold text-[10px] rounded text-center tracking-wide">
                      2026 - Present
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-neutral-950 tracking-wide text-xs uppercase font-cal">
                        BSc (Hons) in Network Security and Ethical Hacking
                      </h4>
                      <p className="text-[11px] text-neutral-600 font-medium italic">
                        National Institute of Business Management (NIBM)
                      </p>
                      <ul className="text-[11px] text-neutral-600 space-y-1 pt-1 list-disc list-inside">
                        <li>Specializing in enterprise network defense, ethical penetration testing, cryptographic protocols, and security audits.</li>
                        <li>Active laboratory experimentation in Active Directory privilege escalation, Kerberos ticket exploits, and intrusion detection.</li>
                        <li>Focusing on hands-on threat emulation, vulnerability mitigation, and zero-trust network infrastructure designs.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Item 2: Network Engineering Certification */}
                  <div className="grid grid-cols-[85px_1fr] items-start gap-3 text-xs">
                    <span className="inline-block px-2 py-0.5 bg-neutral-900 text-white font-bold text-[10px] rounded text-center tracking-wide">
                      2025
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-neutral-950 tracking-wide text-xs uppercase font-cal">
                        Certification in Network Engineering
                      </h4>
                      <p className="text-[11px] text-neutral-600 font-medium italic">
                        NIBM University (National Institute of Business Management)
                      </p>
                      <ul className="text-[11px] text-neutral-600 space-y-1 pt-1 list-disc list-inside">
                        <li>Comprehensive hands-on training in enterprise routing protocols, switching, VLAN segmentations, and subnet architectures.</li>
                        <li>Practical laboratory execution in hardware rack assembly, Cisco packet routing, Wireshark traffic inspection, and firewall policies.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Item 3: A/L */}
                  <div className="grid grid-cols-[85px_1fr] items-start gap-3 text-xs">
                    <span className="inline-block px-2 py-0.5 bg-neutral-900 text-white font-bold text-[10px] rounded text-center tracking-wide">
                      2024
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-neutral-950 tracking-wide text-xs uppercase font-cal">
                        G.C.E. Advanced Level – Commerce Stream
                      </h4>
                      <p className="text-[11px] text-neutral-600 font-medium italic">
                        St. Mary’s College
                      </p>
                      <ul className="text-[11px] text-neutral-600 space-y-1 pt-1 list-disc list-inside">
                        <li>Successfully completed the G.C.E. Advanced Level examination in Commerce Stream with English – C.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Item 4: O/L */}
                  <div className="grid grid-cols-[85px_1fr] items-start gap-3 text-xs">
                    <span className="inline-block px-2 py-0.5 bg-neutral-900 text-white font-bold text-[10px] rounded text-center tracking-wide">
                      2021
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-neutral-950 tracking-wide text-xs uppercase font-cal">
                        G.C.E. Ordinary Level
                      </h4>
                      <p className="text-[11px] text-neutral-600 font-medium italic">
                        St. Mary’s College
                      </p>
                      <ul className="text-[11px] text-neutral-600 space-y-1 pt-1 list-disc list-inside">
                        <li>Achieved core academic distinctions and passes: Mathematics – B, English – B, and Commerce – C.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. WORK EXPERIENCE */}
              <div id="section-work-experience" className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Briefcase className="w-2.5 h-2.5" />
                  </div>
                  <h3 className="text-xs font-extrabold tracking-[0.2em] text-black uppercase font-cal shrink-0">
                    WORK EXPERIENCE
                  </h3>
                  <div className="flex-1 h-[1px] bg-neutral-200 ml-2" />
                </div>

                <div className="space-y-3 pt-0.5">
                  {/* Role 1: SOMRO BPO */}
                  <div className="grid grid-cols-[85px_1fr] items-start gap-3 text-xs">
                    <span className="inline-block px-2 py-0.5 bg-neutral-900 text-white font-bold text-[10px] rounded text-center tracking-wide">
                      2025 (4 mos)
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-neutral-950 tracking-wide text-xs uppercase font-cal">
                        Associate Marketing Intern
                      </h4>
                      <p className="text-[11px] text-neutral-600 font-medium italic">
                        SOMRO BPO Services (Pvt) Ltd
                      </p>
                      <ul className="text-[11px] text-neutral-600 space-y-1 pt-1 list-disc list-inside">
                        <li><strong className="text-neutral-900">Social Media Handling</strong>: Managed corporate social channels, executed scheduled media rollouts, and analyzed key engagement metrics.</li>
                        <li><strong className="text-neutral-900">System Flow Design</strong>: Mapped operational workflows and structured system process blueprints to streamline BPO communication and client deliverables.</li>
                        <li><strong className="text-neutral-900">AI Video Editing & Creation</strong>: Deployed state-of-the-art AI video editing pipelines to generate dynamic promo assets, video reels, and client marketing collaterals.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Role 2: Graphic Designer */}
                  <div className="grid grid-cols-[85px_1fr] items-start gap-3 text-xs">
                    <span className="inline-block px-2 py-0.5 bg-neutral-900 text-white font-bold text-[10px] rounded text-center tracking-wide">
                      2023 - Present
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-neutral-950 tracking-wide text-xs uppercase font-cal">
                        Graphic Designer – Independent Projects & Freelance
                      </h4>
                      <p className="text-[11px] text-neutral-600 font-medium italic">
                        Creative Brand Identity & Visual Design
                      </p>
                      <ul className="text-[11px] text-neutral-600 space-y-1 pt-1 list-disc list-inside">
                        <li><strong className="text-neutral-900">Branding & Packaging</strong>: Developed end-to-end branding product plans, package mockups, and corporate template design systems.</li>
                        <li><strong className="text-neutral-900">Social Media & Marketing</strong>: Designed high-converting promotional post suites, digital advertising graphics, and visual content packages.</li>
                        <li><strong className="text-neutral-900">Festival & Apparel Design</strong>: Created print-ready festival/class event banners, stage backdrops, and custom screen-printed T-shirt graphics.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. PERSONAL ACHIEVEMENTS & CONTRIBUTIONS */}
              <div id="section-personal-achievement" className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Trophy className="w-2.5 h-2.5" />
                  </div>
                  <h3 className="text-xs font-extrabold tracking-[0.2em] text-black uppercase font-cal shrink-0">
                    PERSONAL ACHIEVEMENTS & CONTRIBUTIONS
                  </h3>
                  <div className="flex-1 h-[1px] bg-neutral-200 ml-2" />
                </div>

                <div className="space-y-2 pt-0.5">
                  {[
                    {
                      title: 'Vice President – NIBM Cybersecurity Club (2025 – Present)',
                      desc: 'Elected to executive leadership to direct campus cybersecurity workshops, capture-the-flag (CTF) hackathons, vulnerability emulation sessions, and ethical hacking masterclasses.'
                    },
                    {
                      title: 'Active Member – IEEE NIBM Student Branch (2025 – Present)',
                      desc: 'Participated in global IEEE technical conventions, cybersecurity panels, research colloquiums, and collaborative STEM outreach initiatives across Sri Lankan universities.'
                    }
                  ].map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-1.5 shrink-0" />
                      <div className="text-[11px] text-neutral-700 leading-relaxed">
                        <strong className="text-neutral-900 font-semibold">{ach.title}</strong> — {ach.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
