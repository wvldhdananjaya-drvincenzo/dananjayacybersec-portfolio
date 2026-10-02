import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, Compass, HelpCircle, ShieldCheck, Sparkles, Navigation, Globe, CheckCircle2 } from 'lucide-react';
import { Destination, Booking, FilterState, CarouselItem } from './types';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import DestinationGrid from './components/DestinationGrid';
import HomeDetailOverview from './components/HomeDetailOverview';
import BookingModal from './components/BookingModal';
import BookingCart from './components/BookingCart';
import QuizModal from './components/QuizModal';
import ToursPage from './components/ToursPage';
import DestinationsPage from './components/DestinationsPage';
import HotelsPage from './components/HotelsPage';
import SustainabilityPage from './components/SustainabilityPage';
import BlogPage from './components/BlogPage';
import ResumePage from './components/ResumePage';
import ContactPage from './components/ContactPage';
import CautionTapeBanner from './components/CautionTapeBanner';
import Footer from './components/Footer';
import LampIntro from './components/LampIntro';
import vlanProjectImg from './assets/images/vlan.jpg';

// Images
const sigiriyaImg = 'https://res.cloudinary.com/z9mdashc/image/upload/v1784993063/jordan-harrison-40XgDxBfYXM-unsplash_qsntgm.jpg';
const yalaImg = 'https://res.cloudinary.com/z9mdashc/image/upload/v1784992994/jj-ying-8bghKxNU1j0-unsplash_lo6f9i.jpg';
const ellaImg = 'https://res.cloudinary.com/z9mdashc/image/upload/v1784992996/nastya-dulhiier-OKOOGO578eo-unsplash_lcfbh2.jpg';
const galleImg = 'https://res.cloudinary.com/z9mdashc/image/upload/v1784992987/kirill-sh-eVWWr6nmDf8-unsplash_z0lweq.jpg';
const packetTracerImg = 'https://res.cloudinary.com/z9mdashc/image/upload/v1784992984/taylor-vick-M5tzZtFCOfs-unsplash_xllldl.jpg';

// Active Projects Array - Showing ONLY the 1st project card as requested.
// FUTURE CARDS CODE EXAMPLES: To add new project cards to the app in the future,
// simply uncomment or append new Destination objects to this array.
// Any newly added card will automatically get assigned with the vertical connector line,
// step index number badge (PROJECT #02, #03, etc.), and exact spacing between cards!

const DESTINATIONS: Destination[] = [
  {
    id: 'packet-tracer-lab',
    title: 'Cisco Packet Tracer Network Lab',
    location: 'Multi-Area OSPF, VLANs & ASA Firewalls',
    image: packetTracerImg,
    slotsLeft: 6,
    price: 3800.00,
    tripType: 'Network Topology',
    dateRange: '6 Days Scope',
    category: 'Network Ops',
    region: 'Enterprise Backbone',
    accommodation: 'Cisco Packet Tracer (.pkt) Topology & GNS3 Engine',
    transport: 'Inter-VLAN Routing, Subnetting & BGP Peering',
    meals: 'Complete Configuration Scripts & Topology Maps',
    rating: 4.96,
    description: 'Enterprise network architecture design and simulation using Cisco Packet Tracer. Features multi-area OSPF routing protocols, trunking, STP, ASA firewall access control lists (ACLs), NAT/PAT translation, and secure VPN site-to-site tunnels.'
  },
  {
  id: 'vlan-intervlan-routing-lab',
  title: 'VLAN and Inter-VLAN Routing Lab',
  location: 'VLANs, Trunking and Router-on-a-Stick',
  image: vlanProjectImg,
  slotsLeft: 1,
  price: 500.00,
  tripType: 'Network Infrastructure',
  dateRange: 'Completed Lab',
  category: 'Package',
  region: 'Enterprise Backbone',
  accommodation: 'Cisco Packet Tracer Network Topology',
  transport: '802.1Q Trunking and Router-on-a-Stick',
  meals: 'Configuration Commands, Testing and Documentation',
  rating: 4.90,
  description: 'Designed and configured a segmented enterprise network using VLANs, access ports, 802.1Q trunk links and router-on-a-stick inter-VLAN routing. Verified communication using ping tests and Cisco show commands.'
},

  /* 
  =============================================================================
  FUTURE CARDS ADDITION TEMPLATES (Uncomment to add Card 2, Card 3, etc.):
  =============================================================================
  {
    id: 'cultural-triangle',
    title: 'APT Red Team Campaign',
    location: 'External Perimeter & Active Directory',
    image: sigiriyaImg,
    slotsLeft: 2,
    price: 6200.00,
    tripType: 'Full Box',
    dateRange: '14 Days Scope',
    category: 'Red Team',
    region: 'Internal Network',
    accommodation: 'Dedicated Threat Room & Isolated C2 Cluster',
    transport: 'Secure WireGuard VPN Tunnel Gateway',
    meals: 'Live Threat Feed & Executive Logs',
    rating: 4.95,
    description: 'Simulate a nation-state threat group targeting your organization. This includes initial entry, Active Directory lateral movement, credential dumping, and secure proof-of-concept data exfiltration without tripping telemetry.'
  },
  {
    id: 'wild-safari',
    title: 'Wireless & Physical Pentesting',
    location: 'On-Premises Office & Wi-Fi Perimeter',
    image: yalaImg,
    slotsLeft: 4,
    price: 4800.00,
    tripType: 'On-Site Ops',
    dateRange: '7 Days Scope',
    category: 'Pentest',
    region: 'Physical Facility',
    accommodation: 'Secure Sandbox Rig & Hardware Drop-box',
    transport: 'Hardware Keyloggers, Bash Bunnies & Hak5',
    meals: 'Live Red-Teamer Dashboard & Logs',
    rating: 4.9,
    description: 'Perform wireless network exploitation and on-site physical security assessments. Emulate badge cloning, tailgating, rogue access points setup, and social engineering to assess physical controls.'
  },
  {
    id: 'scenic-hills',
    title: 'Smart Contract & Web3 Audit',
    location: 'Solidity, Rust & EVM Mainnet Scopes',
    image: ellaImg,
    slotsLeft: 3,
    price: 5400.00,
    tripType: 'White Box',
    dateRange: '10 Days Scope',
    category: 'Web3 Audit',
    region: 'EVM Mainnet',
    accommodation: 'Hardhat Static Analysis & Slither Automation',
    transport: 'Formal Verification Proofs & Math Modeling',
    meals: 'Executive Report & Developer Patch Session',
    rating: 4.88,
    description: 'Conduct complete auditing of decentralized smart contracts on EVM and Solana ecosystems. Discover critical reentrancy vulnerabilities, flash loan attack risks, rounding errors, and access control bypasses.'
  }
  */
];

export default function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isLampIntroOpen, setIsLampIntroOpen] = useState(true);
  const [activePage, setActivePage] = useState<'home' | 'tours' | 'destinations' | 'hotels' | 'sustainability' | 'blog' | 'resume' | 'contact'>('home');
  const [activeCategory, setActiveCategory] = useState<"Retreat" | "Package" | "Coaches" | "Adventures" | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [heroFilters, setHeroFilters] = useState<FilterState | null>(null);
  const [selectedDestForBooking, setSelectedDestForBooking] = useState<Destination | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Read email from platform environment if available, fallback safely
  const userEmail = "dananjayawvldh@gmail.com";

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('visatravels_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse bookings:", err);
      }
    }
  }, []);

  // Save to local storage
  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('visatravels_bookings', JSON.stringify(newBookings));
  };

  const handleConfirmBooking = (booking: Booking) => {
    const updated = [booking, ...bookings];
    saveBookings(updated);
    showToast(`Successfully booked ${booking.destinationTitle}!`);
  };

  const handleCancelBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    saveBookings(updated);
    showToast("Reservation successfully cancelled.");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleBookCarouselItem = (item: CarouselItem) => {
    // Map CarouselItem back to Destination model
    const dest = DESTINATIONS.find(d => d.id === item.id) || DESTINATIONS[0];
    if (dest) {
      setSelectedDestForBooking(dest);
    }
  };

  const handleSelectRecommendation = (id: string) => {
    const dest = DESTINATIONS.find(d => d.id === id);
    if (dest) {
      setActivePage('home');
      setTimeout(() => {
        const element = document.getElementById('pick-the-place-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setTimeout(() => {
          setSelectedDestForBooking(dest);
        }, 500);
      }, 100);
    }
  };

  if (isLampIntroOpen) {
    return (
      <div className="fixed inset-0 bg-[#0c0e12] z-[9999] overflow-hidden select-none">
        <LampIntro
          isOpen={isLampIntroOpen}
          onEnterSite={() => {
            setIsLampIntroOpen(false);
          }}
        />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen bg-white text-gray-900 font-sans antialiased relative"
    >
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white font-mono text-xs px-6 py-3 rounded-full border border-white/10 shadow-2xl flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Layer */}
      <Navbar
        activePage={activePage}
        onPageChange={setActivePage}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLampIntro={() => setIsLampIntroOpen(true)}
        bookingsCount={bookings.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Smoothly animated main page content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activePage}
          initial={{ opacity: 0, y: 12, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.995 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          {activePage === 'home' && (
            <>
              {/* Hero section with customizable filter widgets */}
              <Hero onApplyFilters={setHeroFilters} />

              {/* About & Values branding section with custom carousel */}
              <AboutSection
                onBookCarouselItem={handleBookCarouselItem}
                destinations={DESTINATIONS}
                onSelectDestination={handleSelectRecommendation}
              />

              {/* Home Detail Overview - Exact copy of uploaded UI with Caution Tape Background */}
              <HomeDetailOverview onNavigatePage={setActivePage} />

              {/* Custom Cybersecurity Assessment CTA */}
              <section className="bg-white text-black py-20 font-sans relative overflow-hidden border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-black text-white rounded-full text-xs font-sans font-bold tracking-wider uppercase shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    Security Assessment & Audit
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-sans font-extrabold tracking-tight text-black">
                    Need a Security Assessment or Consultation?
                  </h2>
                  <p className="text-sm font-sans text-gray-600 max-w-lg mx-auto font-normal leading-relaxed">
                    Evaluate your system posture, identify vulnerabilities, or discuss offensive security research and collaboration opportunities.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                    <button
                      onClick={() => setIsQuizOpen(true)}
                      className="px-6 py-3 bg-black hover:bg-gray-800 text-white text-xs font-sans font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      Interactive Assessment
                    </button>
                    <button
                      onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-black text-xs font-sans font-bold uppercase tracking-wider rounded-xl border border-gray-300 transition-all cursor-pointer"
                    >
                      Contact Direct
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}

          {activePage === 'tours' && (
            <ToursPage
              destinations={DESTINATIONS}
              onBookDestination={setSelectedDestForBooking}
            />
          )}

          {activePage === 'destinations' && (
            <DestinationsPage
              onSelectRegion={(region) => {
                setHeroFilters({ activity: 'All', location: region, dateRange: 'All', budget: 'All' });
                setActivePage('home');
                setTimeout(() => {
                  document.getElementById('pick-the-place-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }}
            />
          )}

          {activePage === 'hotels' && (
            <HotelsPage
              onBookHotel={setSelectedDestForBooking}
            />
          )}

          {activePage === 'sustainability' && (
            <SustainabilityPage />
          )}

          {activePage === 'blog' && (
            <BlogPage />
          )}

          {activePage === 'resume' && (
            <ResumePage />
          )}

          {activePage === 'contact' && (
            <ContactPage />
          )}
        </motion.main>
      </AnimatePresence>

      {/* Global Clean Light Footer */}
      <Footer onNavigatePage={setActivePage} />

      {/* Side drawer Cart booking manager */}
      <BookingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
      />

      {/* Interactive Booking checkout Form Modal */}
      {selectedDestForBooking && (
        <BookingModal
          isOpen={true}
          onClose={() => setSelectedDestForBooking(null)}
          destination={selectedDestForBooking}
          userEmail={userEmail}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* Interactive Travel Quiz Modal */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        destinations={DESTINATIONS}
        onSelectDestination={handleSelectRecommendation}
      />

      {/* Floating bookmark activator bubble */}
      {bookings.length > 0 && (
        <motion.button
          onClick={() => setIsCartOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          className="fixed bottom-6 right-6 z-40 bg-black text-white p-4.5 rounded-full shadow-2xl hover:bg-zinc-800 hover:text-white transition-all flex items-center justify-center cursor-pointer border border-zinc-700"
          title="Open Saved Bookings"
        >
          <Bookmark className="w-5 h-5 fill-current" />
          <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-bold text-white shadow-md ring-2 ring-white border border-zinc-600">
            {bookings.length}
          </span>
        </motion.button>
      )}

    </motion.div>
  );
}
