import React, { useState } from 'react';
import { 
  ShieldCheck,
  Terminal, 
  Github, 
  Linkedin, 
  Send, 
  Check 
} from 'lucide-react';

interface FooterProps {
  onNavigatePage?: (page: string) => void;
}

export default function Footer({ onNavigatePage }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#fcfcfc] border-t border-gray-200/90 pt-16 pb-12 font-sans text-gray-600 text-xs antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-black text-white font-sans font-black text-xs flex items-center justify-center">
                DW
              </div>
              <span className="font-sans font-extrabold text-sm text-black tracking-tight uppercase">
                DANANJAYA WICKRAMARACHCHI
              </span>
            </div>
            <p className="text-gray-500 font-normal leading-relaxed text-xs">
              Building secure systems.<br />
              Securing the future.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2.5">
            <h5 className="font-sans text-[11px] font-extrabold text-black uppercase tracking-wider">
              QUICK LINKS
            </h5>
            <ul className="space-y-2 text-gray-600 font-medium text-xs">
              <li><button onClick={() => { onNavigatePage?.('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-black transition-colors cursor-pointer">About Me</button></li>
              <li><button onClick={() => { onNavigatePage?.('resume'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-black transition-colors cursor-pointer">Skills</button></li>
              <li><button onClick={() => { onNavigatePage?.('tours'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-black transition-colors cursor-pointer">Projects</button></li>
              <li><button onClick={() => { onNavigatePage?.('hotels'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-black transition-colors cursor-pointer">Certifications</button></li>
              <li><button onClick={() => { onNavigatePage?.('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-black transition-colors cursor-pointer">Contact</button></li>
            </ul>
          </div>

          {/* Col 3: Follow Me */}
          <div className="space-y-2.5">
            <h5 className="font-sans text-[11px] font-extrabold text-black uppercase tracking-wider">
              FOLLOW ME
            </h5>
            <ul className="space-y-2 text-gray-600 font-medium text-xs">
              <li><a href="https://github.com/DananjayaWickramarachchi" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors flex items-center gap-2"><Github className="w-3.5 h-3.5 stroke-[2]" /> GitHub</a></li>
              <li><a href="https://tryhackme.com/p/dananjayawvldh" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors flex items-center gap-2"><Terminal className="w-3.5 h-3.5 stroke-[2]" /> TryHackMe</a></li>
              <li><a href="https://www.linkedin.com/in/dananjaya-wickramarachchi-dw-a14823409" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors flex items-center gap-2"><Linkedin className="w-3.5 h-3.5 stroke-[2]" /> LinkedIn</a></li>
              <li><a href="https://profile.hackthebox.com/profile/019e4df3-8431-7210-8eb3-d90f9ba9719b" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 stroke-[2]" /> Hack The Box</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h5 className="font-sans text-[11px] font-extrabold text-black uppercase tracking-wider">
              NEWSLETTER
            </h5>
            <p className="text-gray-500 font-normal leading-relaxed text-xs">
              Stay updated with my latest labs, writeups and cybersecurity insights.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200/90 rounded-2xl text-xs focus:outline-none focus:border-black font-sans shadow-2xs text-black placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="w-10 h-10 bg-black hover:bg-gray-800 text-white rounded-xl transition-all cursor-pointer shrink-0 shadow-xs flex items-center justify-center hover:scale-105 active:scale-95"
                title="Subscribe"
              >
                {subscribed ? <Check className="w-4 h-4 stroke-[2]" /> : <Send className="w-4 h-4 stroke-[2]" />}
              </button>
            </form>
            {subscribed && (
              <span className="text-[11px] font-sans text-emerald-600 font-bold block">
                Thank you for subscribing!
              </span>
            )}
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 font-sans text-xs">
          <p>© 2026 Dananjaya Wickramarachchi. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-gray-400">
            Design by Dananjaya Wickramarachchi
          </p>
        </div>

      </div>
    </footer>
  );
}
