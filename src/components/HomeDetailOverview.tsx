import React, { useState } from 'react';
import { motion } from 'motion/react';
import ScrollReveal from './ScrollReveal';
import CautionTapeBackground from './CautionTapeBackground';
import { 
  ShieldCheck, 
  Network, 
  Target, 
  Search, 
  Code2, 
  Quote, 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Terminal, 
  Layers,
  Zap,
  Crosshair,
  ShieldAlert,
  Code,
  GitBranch,
  Github,
  Linkedin,
  Youtube,
  Check,
  Globe
} from 'lucide-react';

interface HomeDetailOverviewProps {
  onNavigatePage?: (page: string) => void;
}

const profilePortraitImg = 'https://res.cloudinary.com/z9mdashc/image/upload/v1784656148/file_00000000ecec71fa81f18d18767cd865_nhdljz.png';

export default function HomeDetailOverview({ onNavigatePage }: HomeDetailOverviewProps) {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const quotes = [
    "Cybersecurity is not just about technology, it's about thinking ahead and staying one step ahead.",
    "Offensive security builds resilience; understanding how systems fail is the first step to securing them.",
    "Automating defense metrics frees engineers to solve high-impact threat vectors.",
    "Network security demands continuous surveillance, zero trust, and relentless adaptability."
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="w-full bg-white text-black font-sans antialiased py-16 sm:py-20 border-t border-gray-200/80 relative overflow-hidden">
      
      {/* Background Animated Caution Tape Layer (Behind WHAT I DO section) */}
      <CautionTapeBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">

        {/* SECTION 1: WHAT I DO / My Focus Areas */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="space-y-8">
            <div>
              <span className="text-xs font-sans font-extrabold text-black uppercase tracking-widest block mb-1.5">
                WHAT I DO
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-black tracking-tight">
                My Focus Areas
              </h2>
            </div>

            {/* 5 Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Focus Area 1: Penetration Testing */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs hover:shadow-md hover:border-black transition-all group flex flex-col justify-between text-center items-center h-full">
                <div className="space-y-4 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 text-black border border-gray-200 flex items-center justify-center group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all shadow-xs">
                    <ShieldCheck className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-sans font-bold text-black tracking-tight">
                    Penetration Testing
                  </h3>
                  <p className="text-xs font-sans text-gray-600 font-normal leading-relaxed">
                    Finding vulnerabilities before attackers do.
                  </p>
                </div>
                <div className="w-8 h-1 bg-black rounded-full mt-6 group-hover:w-12 transition-all" />
              </div>

              {/* Focus Area 2: Networking */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs hover:shadow-md hover:border-black transition-all group flex flex-col justify-between text-center items-center h-full">
                <div className="space-y-4 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 text-black border border-gray-200 flex items-center justify-center group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all shadow-xs">
                    <Network className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-sans font-bold text-black tracking-tight">
                    Networking
                  </h3>
                  <p className="text-xs font-sans text-gray-600 font-normal leading-relaxed">
                    Designing, configuring & securing network infrastructures.
                  </p>
                </div>
                <div className="w-8 h-1 bg-black rounded-full mt-6 group-hover:w-12 transition-all" />
              </div>

              {/* Focus Area 3: Red Teaming */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs hover:shadow-md hover:border-black transition-all group flex flex-col justify-between text-center items-center h-full">
                <div className="space-y-4 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 text-black border border-gray-200 flex items-center justify-center group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all shadow-xs">
                    <Target className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-sans font-bold text-black tracking-tight">
                    Red Teaming
                  </h3>
                  <p className="text-xs font-sans text-gray-600 font-normal leading-relaxed">
                    Simulating real-world attacks and improving defensive posture.
                  </p>
                </div>
                <div className="w-8 h-1 bg-black rounded-full mt-6 group-hover:w-12 transition-all" />
              </div>

              {/* Focus Area 4: Security Research */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs hover:shadow-md hover:border-black transition-all group flex flex-col justify-between text-center items-center h-full">
                <div className="space-y-4 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 text-black border border-gray-200 flex items-center justify-center group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all shadow-xs">
                    <Search className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-sans font-bold text-black tracking-tight">
                    Security Research
                  </h3>
                  <p className="text-xs font-sans text-gray-600 font-normal leading-relaxed">
                    Researching threats, tools and emerging vulnerabilities.
                  </p>
                </div>
                <div className="w-8 h-1 bg-black rounded-full mt-6 group-hover:w-12 transition-all" />
              </div>

              {/* Focus Area 5: Automation */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs hover:shadow-md hover:border-black transition-all group flex flex-col justify-between text-center items-center h-full">
                <div className="space-y-4 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 text-black border border-gray-200 flex items-center justify-center group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all shadow-xs">
                    <Code2 className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-sans font-bold text-black tracking-tight">
                    Automation
                  </h3>
                  <p className="text-xs font-sans text-gray-600 font-normal leading-relaxed">
                    Building scripts & tools to automate security tasks.
                  </p>
                </div>
                <div className="w-8 h-1 bg-black rounded-full mt-6 group-hover:w-12 transition-all" />
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* SECTION 2: QUOTE CARD BANNER */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="bg-gray-100/90 border border-gray-200 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xs">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Left Quote Icon + Text */}
              <div className="flex items-start gap-4 max-w-2xl">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <Quote className="w-6 h-6 fill-current rotate-180" />
                </div>
                <div className="space-y-2">
                  <p className="text-base sm:text-lg font-sans font-medium text-black leading-relaxed">
                    "{quotes[activeQuoteIndex]}"
                  </p>
                </div>
              </div>

              {/* Right Profile Photo & Name */}
              <div className="flex items-center gap-4 shrink-0 bg-white/90 backdrop-blur-xs p-3.5 px-5 rounded-2xl border border-gray-200 shadow-xs">
                <div className="relative">
                  <img 
                    src={profilePortraitImg} 
                    alt="Dananjaya Wickramarachchi" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-black shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-bold text-black">
                    Dananjaya Wickramarachchi
                  </h4>
                  <p className="text-xs font-sans text-gray-700 font-semibold">
                    Cybersecurity & Networking Student
                  </p>
                </div>
              </div>

            </div>

            {/* Carousel Pagination Dots */}
            <div className="flex items-center justify-center gap-2 pt-4 mt-2">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveQuoteIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeQuoteIndex === idx ? 'w-6 bg-black' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to quote ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* SECTION 3: SKILLS & TOOLS (2 Columns Layout) */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: MY SKILLS / Technical Skills */}
            <div className="lg:col-span-5 bg-white p-7 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-sans font-extrabold text-black uppercase tracking-widest block mb-1.5">
                  MY SKILLS
                </span>
                <h3 className="text-2xl font-sans font-extrabold text-black tracking-tight">
                  Technical Skills
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Network Security', pct: 90 },
                  { name: 'Penetration Testing', pct: 85 },
                  { name: 'Linux & Bash', pct: 90 },
                  { name: 'Python Scripting', pct: 80 },
                  { name: 'Web Security', pct: 75 },
                  { name: 'Incident Response', pct: 85 }
                ].map((skill, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-sans font-bold text-gray-900">
                      <span>{skill.name}</span>
                      <span className="font-sans font-bold text-black">{skill.pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-black rounded-full" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: TOOLS & TECHNOLOGIES / I Work With */}
            <div className="lg:col-span-7 bg-white p-7 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-sans font-extrabold text-black uppercase tracking-widest block mb-1.5">
                  TOOLS & TECHNOLOGIES
                </span>
                <h3 className="text-2xl font-sans font-extrabold text-black tracking-tight">
                  I Work With
                </h3>
              </div>

              {/* 10 Tool Badges Grid (Crisp Vector Icons with Sans Font) */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                
                {/* 1. Kali Linux */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center space-y-2.5 hover:bg-gray-100 hover:border-black transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-gray-200/80 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Terminal className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-xs font-sans font-bold text-black tracking-tight">Kali Linux</span>
                </div>

                {/* 2. Burp Suite */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center space-y-2.5 hover:bg-gray-100 hover:border-black transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-gray-200/80 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-xs font-sans font-bold text-black tracking-tight">Burp Suite</span>
                </div>

                {/* 3. Nmap */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center space-y-2.5 hover:bg-gray-100 hover:border-black transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-gray-200/80 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Crosshair className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-xs font-sans font-bold text-black tracking-tight">Nmap</span>
                </div>

                {/* 4. Wireshark */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center space-y-2.5 hover:bg-gray-100 hover:border-black transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-gray-200/80 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Network className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-xs font-sans font-bold text-black tracking-tight">Wireshark</span>
                </div>

                {/* 5. Metasploit */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center space-y-2.5 hover:bg-gray-100 hover:border-black transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-gray-200/80 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShieldAlert className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-xs font-sans font-bold text-black tracking-tight">Metasploit</span>
                </div>

                {/* 6. Python */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center space-y-2.5 hover:bg-gray-100 hover:border-black transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-gray-200/80 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Code className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-xs font-sans font-bold text-black tracking-tight">Python</span>
                </div>

                {/* 7. Bash */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center space-y-2.5 hover:bg-gray-100 hover:border-black transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform font-sans text-xs font-bold">
                    &gt;_
                  </div>
                  <span className="text-xs font-sans font-bold text-black tracking-tight">Bash</span>
                </div>

                {/* 8. Cisco Packet Tracer */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center space-y-2.5 hover:bg-gray-100 hover:border-black transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-gray-200/80 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-xs font-sans font-bold text-black tracking-tight text-center leading-tight">Cisco Packet Tracer</span>
                </div>

                {/* 9. Git */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center space-y-2.5 hover:bg-gray-100 hover:border-black transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-gray-200/80 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GitBranch className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-xs font-sans font-bold text-black tracking-tight">Git</span>
                </div>

                {/* 10. VirtualBox */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center space-y-2.5 hover:bg-gray-100 hover:border-black transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-gray-200/80 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Layers className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-xs font-sans font-bold text-black tracking-tight">VirtualBox</span>
                </div>

              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* SECTION 4: MY PROCESS / How I Approach Security */}
        <ScrollReveal direction="up" delay={0.25}>
          <div className="space-y-10">
            <div>
              <span className="text-xs font-sans font-extrabold text-black uppercase tracking-widest block mb-1.5">
                MY PROCESS
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-black tracking-tight">
                How I Approach Security
              </h2>
            </div>

            {/* Stepper Grid (5 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
              
              {/* Process Step 01 */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs relative z-10 flex flex-col items-center text-center space-y-3 group hover:border-black transition-all">
                <div className="w-11 h-11 relative flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 44 44">
                    <circle cx="22" cy="22" r="19" className="fill-gray-100 stroke-gray-300 stroke-[2] group-hover:fill-black group-hover:stroke-black transition-colors" />
                  </svg>
                  <span className="absolute text-black group-hover:text-amber-400 font-sans font-black text-xs tracking-tight antialiased select-none transition-colors">
                    01
                  </span>
                </div>
                <h4 className="text-base font-sans font-bold text-black">Reconnaissance</h4>
                <p className="text-xs font-sans text-gray-600 leading-relaxed font-normal">
                  Gather information and identify attack surface.
                </p>
              </div>

              {/* Process Step 02 */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs relative z-10 flex flex-col items-center text-center space-y-3 group hover:border-black transition-all">
                <div className="w-11 h-11 relative flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 44 44">
                    <circle cx="22" cy="22" r="19" className="fill-gray-100 stroke-gray-300 stroke-[2] group-hover:fill-black group-hover:stroke-black transition-colors" />
                  </svg>
                  <span className="absolute text-black group-hover:text-amber-400 font-sans font-black text-xs tracking-tight antialiased select-none transition-colors">
                    02
                  </span>
                </div>
                <h4 className="text-base font-sans font-bold text-black">Scanning</h4>
                <p className="text-xs font-sans text-gray-600 leading-relaxed font-normal">
                  Scan and enumerate systems & services.
                </p>
              </div>

              {/* Process Step 03 */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs relative z-10 flex flex-col items-center text-center space-y-3 group hover:border-black transition-all">
                <div className="w-11 h-11 relative flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 44 44">
                    <circle cx="22" cy="22" r="19" className="fill-gray-100 stroke-gray-300 stroke-[2] group-hover:fill-black group-hover:stroke-black transition-colors" />
                  </svg>
                  <span className="absolute text-black group-hover:text-amber-400 font-sans font-black text-xs tracking-tight antialiased select-none transition-colors">
                    03
                  </span>
                </div>
                <h4 className="text-base font-sans font-bold text-black">Exploitation</h4>
                <p className="text-xs font-sans text-gray-600 leading-relaxed font-normal">
                  Identify and exploit vulnerabilities.
                </p>
              </div>

              {/* Process Step 04 */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs relative z-10 flex flex-col items-center text-center space-y-3 group hover:border-black transition-all">
                <div className="w-11 h-11 relative flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 44 44">
                    <circle cx="22" cy="22" r="19" className="fill-gray-100 stroke-gray-300 stroke-[2] group-hover:fill-black group-hover:stroke-black transition-colors" />
                  </svg>
                  <span className="absolute text-black group-hover:text-amber-400 font-sans font-black text-xs tracking-tight antialiased select-none transition-colors">
                    04
                  </span>
                </div>
                <h4 className="text-base font-sans font-bold text-black">Post Exploitation</h4>
                <p className="text-xs font-sans text-gray-600 leading-relaxed font-normal">
                  Maintain access and escalate privileges.
                </p>
              </div>

              {/* Process Step 05 */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs relative z-10 flex flex-col items-center text-center space-y-3 group hover:border-black transition-all">
                <div className="w-11 h-11 relative flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 44 44">
                    <circle cx="22" cy="22" r="19" className="fill-gray-100 stroke-gray-300 stroke-[2] group-hover:fill-black group-hover:stroke-black transition-colors" />
                  </svg>
                  <span className="absolute text-black group-hover:text-amber-400 font-sans font-black text-xs tracking-tight antialiased select-none transition-colors">
                    05
                  </span>
                </div>
                <h4 className="text-base font-sans font-bold text-black">Reporting</h4>
                <p className="text-xs font-sans text-gray-600 leading-relaxed font-normal">
                  Document findings and provide remediation.
                </p>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* SECTION 5: LET'S WORK TOGETHER (Contact Card) */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="bg-gray-100/90 border border-gray-200 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: CTA Title + Button */}
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-sans font-extrabold text-black uppercase tracking-widest block">
                  LET'S WORK TOGETHER
                </span>

                <h3 className="text-2xl sm:text-4xl font-sans font-extrabold text-black tracking-tight leading-tight">
                  Have a Project or Collaboration in Mind?
                </h3>

                <p className="text-sm font-sans text-gray-700 font-medium leading-relaxed max-w-xl">
                  I'm open to freelance projects, internships, and collaborations. Let's build something secure together!
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigatePage && onNavigatePage('contact')}
                    className="px-6 py-3.5 bg-black hover:bg-gray-800 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-black/10 flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
                  >
                    <span>LET'S CONNECT</span>
                    <Send className="w-3.5 h-3.5 stroke-[2]" />
                  </button>
                </div>
              </div>

              {/* Right Column: Contact Detail Info */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4 relative overflow-hidden">
                
                <div className="space-y-4 text-xs font-sans font-medium text-black relative z-10">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 text-black border border-gray-200 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-sans font-bold text-gray-500 block uppercase tracking-wider">Email</span>
                      <a href="mailto:dananjayawvldh@gmail.com" className="font-bold text-black hover:text-gray-700 transition-colors">
                        dananjayawvldh@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 text-black border border-gray-200 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-sans font-bold text-gray-500 block uppercase tracking-wider">Phone</span>
                      <a href="tel:+94705084477" className="font-bold text-black hover:text-gray-700 transition-colors">
                        +94 70 508 4477
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 text-black border border-gray-200 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-sans font-bold text-gray-500 block uppercase tracking-wider">Location</span>
                      <strong className="font-bold text-black block">Sri Lanka</strong>
                    </div>
                  </div>
                </div>

                {/* Floating Paper Airplane Illustration */}
                <div className="absolute -right-4 -bottom-4 opacity-15 pointer-events-none">
                  <Send className="w-32 h-32 text-gray-400 rotate-[15deg]" />
                </div>

              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
