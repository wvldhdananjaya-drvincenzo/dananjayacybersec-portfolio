import { useState } from 'react';
import { 
  Bookmark, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activePage: 'home' | 'tours' | 'destinations' | 'hotels' | 'sustainability' | 'blog' | 'resume' | 'contact';
  onPageChange: (page: 'home' | 'tours' | 'destinations' | 'hotels' | 'sustainability' | 'blog' | 'resume' | 'contact') => void;
  onOpenQuiz: () => void;
  onOpenCart: () => void;
  onOpenLampIntro?: () => void;
  bookingsCount: number;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Navbar({
  activePage,
  onPageChange,
  onOpenQuiz,
  onOpenCart,
  onOpenLampIntro,
  bookingsCount,
  searchQuery = '',
  onSearchChange = () => {}
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePageClick = (page: 'home' | 'tours' | 'destinations' | 'hotels' | 'sustainability' | 'blog' | 'resume' | 'contact') => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home' as const, label: 'Home' },
    { id: 'sustainability' as const, label: 'Skills' },
    { id: 'tours' as const, label: 'Projects' },
    { id: 'destinations' as const, label: 'Labs' },
    { id: 'hotels' as const, label: 'Certifications' },
    { id: 'blog' as const, label: 'Blog' },
    { id: 'resume' as const, label: 'Resume' },
    { id: 'contact' as const, label: 'Contact' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 md:px-6 pt-5 sm:pt-7 font-sans">
      <div className="max-w-[1680px] w-full mx-auto">
        {/* Sleek Dark Floating Capsule modeled exactly on the reference designs */}
        <nav className="bg-[#09090b]/95 backdrop-blur-xl border border-white/10 rounded-full px-3 sm:px-5 md:px-6 lg:px-8 h-[72px] flex items-center justify-between shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)] relative overflow-hidden transition-all duration-300">
          
          {/* Top & Bottom horizontal accent micro-reflections */}
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          {/* Left: Custom Capsule Brand Identity matching the reference exactly */}
          <div 
            className="flex items-center cursor-pointer group shrink-0 relative z-10" 
            onClick={() => handlePageClick('home')}
          >
            <div className="bg-[#18181b] border border-white/10 rounded-full px-4 sm:px-5 py-2.5 flex items-center gap-3.5 hover:bg-[#202024] hover:border-white/20 transition-all duration-300">
              {/* Reference-identical Custom Hamburger Icon with varied lengths */}
              <div className="flex flex-col gap-1 shrink-0">
                <div className="w-3.5 h-[1.5px] bg-white rounded-full group-hover:scale-x-110 transition-transform origin-left duration-300" />
                <div className="w-4.5 h-[1.5px] bg-white rounded-full group-hover:scale-x-90 transition-transform origin-left duration-300" />
                <div className="w-2.5 h-[1.5px] bg-white rounded-full group-hover:scale-x-125 transition-transform origin-left duration-300" />
              </div>
              <span className="text-white text-xs sm:text-[13px] font-black tracking-[0.16em] font-sans">
                DANWICK
              </span>
            </div>
          </div>

          {/* Center: Navigation links with EXACT copy-cat SPOTLIGHT active indicators */}
          <div className="hidden xl:flex items-center h-full gap-0.5 xl:gap-1 z-10">
            {navItems.map((item) => {
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.label}
                  onClick={() => handlePageClick(item.id)}
                  className={`relative px-2 xl:px-3.5 h-full flex items-center gap-1 cursor-pointer transition-all duration-200 select-none text-[13px] font-medium tracking-wide font-sans group ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
                  
                  {/* The Spotlight Active State: Light indicator at top and fading trapezoid light projection below */}
                  {isActive && (
                    <>
                      {/* Top bright laser capsule */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-white rounded-b-sm shadow-[0_1px_14px_rgba(255,255,255,0.9)]" />
                      {/* Fading trapezoidal spotlight beam */}
                      <div 
                        className="absolute inset-x-0 top-[3px] bottom-0 bg-gradient-to-b from-white/12 to-transparent pointer-events-none mix-blend-screen" 
                        style={{ 
                          clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' 
                        }} 
                      />
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Integrated Email Contact Pill & Core UI Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 relative z-10">
            
            {/* White Contact Pill matching reference precisely */}
            <a
              href="mailto:dananjayawvldh@gmail.com"
              className="hidden lg:flex items-center justify-center bg-white hover:bg-neutral-100 text-black text-xs font-bold px-6 py-2.5 rounded-full transition-all shrink-0 select-none cursor-pointer hover:scale-[1.01] shadow-md"
            >
              dananjayawvldh@gmail.com
            </a>

            {/* Matchmaker Trigger */}
            <button
              onClick={onOpenQuiz}
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-amber-400 transition-all cursor-pointer shrink-0"
              title="Start matchmaker"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            {/* Saved Campaigns / Bookings Bookmark */}
            <button
              onClick={onOpenCart}
              className="relative w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all cursor-pointer shrink-0 text-white"
              title="Saved items"
            >
              <Bookmark className="w-4 h-4" />
              {bookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-mono font-bold text-gray-950 shadow-[0_2px_8px_rgba(245,158,11,0.5)] animate-bounce">
                  {bookingsCount}
                </span>
              )}
            </button>

            {/* Mobile/Tablet Menu Drawer Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all text-white cursor-pointer shrink-0"
            >
              {isMobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>

        </nav>

        {/* Mobile Dropdown Panel Container */}
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-3.5 bg-[#09090b]/98 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-[0_24px_50px_rgba(0,0,0,0.95)] space-y-4 animate-fade-in">
            
            {/* Embedded Mobile Email Contact */}
            <div className="lg:hidden">
              <a
                href="mailto:dananjayawvldh@gmail.com"
                className="w-full py-3 bg-white hover:bg-neutral-100 text-black font-bold flex items-center justify-center gap-2 rounded-xl text-xs font-semibold tracking-wide transition-all"
              >
                <span>dananjayawvldh@gmail.com</span>
              </a>
            </div>

            {/* Mobile Matchmaker Quiz banner */}
            <button
              onClick={() => { onOpenQuiz(); setIsMobileMenuOpen(false); }}
              className="w-full py-3 bg-gradient-to-r from-amber-500/20 to-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 font-bold flex items-center justify-center gap-2 text-xs font-mono tracking-wider"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Start Matchmaker</span>
            </button>

            {/* Mobile Navigation List with subtle active indicators */}
            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono tracking-wider uppercase">
              {navItems.map((item) => {
                const isActive = activePage === item.id;

                return (
                  <button 
                    key={item.label}
                    onClick={() => handlePageClick(item.id)} 
                    className={`p-3.5 rounded-xl border transition-all flex flex-col items-center justify-center gap-1 ${
                      isActive 
                        ? 'bg-white/10 border-white/20 text-white font-bold shadow-[inset_0_1px_8px_rgba(255,255,255,0.05)]' 
                        : 'bg-white/5 border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="text-[10px]">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
