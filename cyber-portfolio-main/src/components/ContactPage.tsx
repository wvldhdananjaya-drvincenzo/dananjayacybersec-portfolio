import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ScrollReveal from './ScrollReveal';
import { 
  Mail, 
  Terminal, 
  Send, 
  Cpu, 
  Activity, 
  CheckCircle, 
  ShieldCheck, 
  Github, 
  Linkedin, 
  Globe, 
  MessageSquare,
  Lock,
  Wifi,
  Copy,
  Check
} from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sentLogs, setSentLogs] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  // Simulated ping rate state
  const [ping, setPing] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.round(35 + Math.random() * 15));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCopyPGP = () => {
    navigator.clipboard.writeText("-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: GnuPG v2.2.27 (GNU/Linux)\n\nmQINBGD9s/0BEADg6o81z...\n-----END PGP PUBLIC KEY BLOCK-----");
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending || isComplete) return;

    setIsSending(true);
    setSentLogs([]);

    const recipient = 'dananjayawvldh@gmail.com';
    const emailSubject = encodeURIComponent(form.subject || 'New Contact Dispatch');
    const emailBody = encodeURIComponent(`From: ${form.name} (${form.email})\n\nSubject: ${form.subject}\n\nMessage:\n${form.message}`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${emailSubject}&body=${emailBody}`;
    const mailtoUrl = `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;

    // Simulate safe cryptographic dispatch logs
    const logs = [
      'Initializing zero-trust handshake...',
      'Validating sender email origin...',
      'Encrypting message body with RSA-4096 key...',
      `Routing payload to inbox (${recipient})...`,
      'Dispatching automatically to Gmail inbox...',
      'Dispatch completed successfully.'
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setSentLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setIsSending(false);
          setIsComplete(true);

          // Automatically trigger email dispatch to Gmail inbox
          try {
            window.open(gmailUrl, '_blank') || (window.location.href = mailtoUrl);
          } catch {
            window.location.href = mailtoUrl;
          }

          setForm({ name: '', email: '', subject: '', message: '' });
        }
      }, (index + 1) * 350);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 font-sans pt-32 sm:pt-40 pb-24 relative overflow-hidden select-none">
      {/* Decorative Ornaments */}
      <div className="absolute top-40 left-[-10%] w-96 h-96 rounded-full bg-black/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-[-10%] w-96 h-96 rounded-full bg-black/5 blur-[120px] pointer-events-none" />

      {/* Hero header */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="relative bg-white border-b border-gray-100 py-16 sm:py-20 text-gray-950 flex flex-col items-center justify-center text-center mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-100/80 border border-neutral-200 rounded-full text-xs font-mono font-semibold tracking-[0.25em] uppercase text-neutral-800 shadow-sm">
              <span className="text-black font-bold">✦</span> SECURE HANDSHAKE
            </span>
              
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-sans font-black tracking-tighter text-black uppercase select-none leading-none">
                Contact
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-neutral-600 font-sans tracking-wide max-w-2xl leading-relaxed">
                Initiate a secure transaction stream to request consulting, security audits, or custom architectures
              </p>

              <button
                onClick={() => {
                  const el = document.getElementById('contact-form-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-black hover:bg-zinc-800 text-white text-xs md:text-sm font-sans font-extrabold uppercase tracking-widest rounded-full transition-all shadow-md hover:scale-[1.02] cursor-pointer"
              >
                <span>Open Channel</span>
                <span className="text-base font-semibold">↗</span>
              </button>
            </div>
          </div>
      </ScrollReveal>

      <div id="contact-form-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">

        {/* Info Grid & Form Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Command Stats Panel & Socials */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Interactive Terminal Interface Image */}
            <div className="overflow-hidden rounded-3xl shadow-xl border border-gray-900/10">
              <img 
                src="https://res.cloudinary.com/z9mdashc/image/upload/v1785048379/ChatGPT_Image_Jul_26_2026_12_15_58_PM_dlvhtz.png" 
                alt="Diagnostics Terminal" 
                className="w-full h-auto object-cover rounded-3xl"
              />
            </div>

            {/* General Reachable Info cards */}
            <div className="bg-white border border-gray-200/80 rounded-3xl p-6 space-y-4 shadow-xs">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-black">Secure Channels</h3>
              <div className="space-y-3 text-sm">
                <a 
                  href="mailto:dananjayawvldh@gmail.com"
                  className="flex items-center gap-3 text-gray-600 hover:text-black transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm">dananjayawvldh@gmail.com</span>
                </a>
              </div>

              {/* Social Pills */}
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <a 
                  href="https://github.com/DananjayaWickramarachchi" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-200 bg-[#faf9f6] text-gray-500 hover:text-black hover:border-gray-400 flex items-center justify-center transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4.5 h-4.5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/dananjaya-wickramarachchi-dw-a14823409" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-200 bg-[#faf9f6] text-gray-500 hover:text-black hover:border-gray-400 flex items-center justify-center transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
                <a 
                  href="https://tryhackme.com/p/dananjayawvldh" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-200 bg-[#faf9f6] text-gray-500 hover:text-black hover:border-gray-400 flex items-center justify-center transition-colors"
                  title="TryHackMe"
                >
                  <Terminal className="w-4.5 h-4.5" />
                </a>
                <a 
                  href="https://profile.hackthebox.com/profile/019e4df3-8431-7210-8eb3-d90f9ba9719b" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-200 bg-[#faf9f6] text-gray-500 hover:text-black hover:border-gray-400 flex items-center justify-center transition-colors"
                  title="Hack The Box"
                >
                  <ShieldCheck className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Dispatcher Form */}
          <div className="lg:col-span-7 bg-white border border-gray-200/80 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-xs">
            {isComplete ? (
              <div className="text-center py-12 space-y-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">Cryptographic Payload Dispatched</h3>
                  <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Thank you! Your message has been encrypted and successfully signed. Dananjaya will receive it on his secure perimeter shortly.
                  </p>
                </div>
                <button
                  onClick={() => { setIsComplete(false); setSentLogs([]); }}
                  className="px-6 py-2.5 bg-black hover:bg-zinc-800 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-sm"
                >
                  Dispatch New Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Ident Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Agent Smith"
                      value={form.name}
                      onChange={handleChange}
                      disabled={isSending}
                      className="w-full px-4 py-3 text-xs border border-gray-200 rounded-2xl bg-[#faf9f6] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Return Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="smith@agency.com"
                      value={form.email}
                      onChange={handleChange}
                      disabled={isSending}
                      className="w-full px-4 py-3 text-xs border border-gray-200 rounded-2xl bg-[#faf9f6] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Subject Directive</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="Audit request: EVM protocols"
                    value={form.subject}
                    onChange={handleChange}
                    disabled={isSending}
                    className="w-full px-4 py-3 text-xs border border-gray-200 rounded-2xl bg-[#faf9f6] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Secure Payload (Message)</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Provide details regarding scope dates, tech stack, or general query parameters..."
                    value={form.message}
                    onChange={handleChange}
                    disabled={isSending}
                    className="w-full px-4 py-3 text-xs border border-gray-200 rounded-2xl bg-[#faf9f6] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all disabled:opacity-50 resize-none"
                  />
                </div>

                {isSending && (
                  <div className="bg-gray-950 p-4 rounded-2xl font-mono text-[10px] text-gray-300 space-y-1.5 border border-white/5">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-1 mb-1.5 text-white">
                      <Terminal className="w-3.5 h-3.5 animate-spin" />
                      <span>Console Logs</span>
                    </div>
                    {sentLogs.map((log, lIdx) => (
                      <div key={lIdx} className="flex items-center gap-1.5 animate-fade-in">
                        <span className="text-gray-500">[{lIdx + 1}]</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 bg-black hover:bg-zinc-800 text-white text-xs font-mono font-bold uppercase tracking-widest rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? 'Transmitting...' : 'Dispatch Message'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
