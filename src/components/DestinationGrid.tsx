import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShieldAlert, MapPin } from 'lucide-react';
import { Destination, FilterState } from '../types';
import ProjectExactCard, { ProjectData } from './ProjectExactCard';
import ScrollReveal from './ScrollReveal';

interface DestinationGridProps {
  destinations: Destination[];
  onBookDestination: (dest: Destination) => void;
  activeCategory: "Retreat" | "Package" | "Coaches" | "Adventures" | null;
  onSelectCategory: (cat: "Retreat" | "Package" | "Coaches" | "Adventures" | null) => void;
  searchQuery: string;
  heroFilters: FilterState | null;
}

export default function DestinationGrid({
  destinations,
  onBookDestination,
  activeCategory,
  onSelectCategory,
  searchQuery,
  heroFilters
}: DestinationGridProps) {
  // Filters State
  const [selectedSpot, setSelectedSpot] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedDate, setSelectedDate] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Detailed Modal State
  const [selectedDestDetails, setSelectedDestDetails] = useState<Destination | null>(null);

  // Dynamic cybersecurity filter lists
  const spotsList = ['All', 'Network Architecture', 'Penetration Testing', 'Red Teaming', 'Blue Team & SIEM'];
  const pricesList = [
    { label: 'All levels', value: 'All' },
    { label: 'Fundamental', value: 'under500' },
    { label: 'Advanced Labs', value: 'under1000' }
  ];
  const datesList = [
    { label: 'All lab statuses', value: 'All' },
    { label: 'Active Lab', value: 'september' },
    { label: 'Completed / CTF', value: 'request' }
  ];

  // Combined Filtering logic (Vite/React optimized)
  const filteredDestinations = useMemo(() => {
    return destinations.filter(dest => {
      // 1. Text Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = dest.title.toLowerCase().includes(query);
        const matchesLoc = dest.location.toLowerCase().includes(query);
        const matchesDesc = dest.description.toLowerCase().includes(query);
        const matchesCat = dest.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesDesc && !matchesCat) return false;
      }

      // 2. Active Header Category Link
      if (activeCategory && dest.category !== activeCategory) {
        return false;
      }

      // 3. Grid Filters: Destination Location
      if (selectedSpot !== 'All') {
        if (!dest.location.toLowerCase().includes(selectedSpot.toLowerCase()) && dest.region !== selectedSpot) {
          return false;
        }
      }

      // 4. Grid Filters: Category selector (already bounded by activeCategory, but we align them)
      // 5. Grid Filters: Price
      if (selectedPrice !== 'All') {
        if (selectedPrice === 'under500' && dest.price > 500) return false;
        if (selectedPrice === 'under1000' && dest.price > 1000) return false;
      }

      // 6. Grid Filters: Date Range
      if (selectedDate !== 'All') {
        if (selectedDate === 'september' && !dest.dateRange.toLowerCase().includes('sept')) return false;
        if (selectedDate === 'request' && !dest.dateRange.toLowerCase().includes('request')) return false;
      }

      // 7. Hero Filters override (if just submitted)
      if (heroFilters) {
        if (heroFilters.location && heroFilters.location !== 'All' && dest.region !== heroFilters.location) {
          return false;
        }
      }

      return true;
    });
  }, [destinations, searchQuery, activeCategory, selectedSpot, selectedPrice, selectedDate, heroFilters]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleDiscoverReset = () => {
    setSelectedSpot('All');
    setSelectedPrice('All');
    setSelectedDate('All');
    onSelectCategory(null);
  };

  return (
    <section id="pick-the-place-section" className="py-24 bg-gray-50/50 border-t border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title with stats description */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="space-y-6">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-800 border border-amber-200">
              • Practical Cyber Security Labs & Projects
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-4xl sm:text-5xl font-sans font-semibold text-gray-900 tracking-tighter leading-none">
                Security Labs & Projects
              </h2>
              <p className="text-sm text-gray-500 max-w-md md:text-right font-light leading-relaxed">
                Explore hands-on network security architecture, vulnerability assessment writeups, offensive security tools, and defensive monitoring projects.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Dynamic Search Dropdowns */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
          
          {/* Security Domain */}
          <div className="space-y-1.5 px-1.5">
            <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">DOMAIN</label>
            <select
              value={selectedSpot}
              onChange={(e) => setSelectedSpot(e.target.value)}
              className="w-full text-xs font-semibold text-gray-800 focus:outline-none bg-transparent cursor-pointer"
            >
              <option value="All">All domains...</option>
              {spotsList.filter(s => s !== 'All').map(spot => (
                <option key={spot} value={spot}>{spot}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="space-y-1.5 px-1.5 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0">
            <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">CATEGORY</label>
            <select
              value={activeCategory || 'All'}
              onChange={(e) => onSelectCategory(e.target.value === 'All' ? null : e.target.value as any)}
              className="w-full text-xs font-semibold text-gray-800 focus:outline-none bg-transparent cursor-pointer"
            >
              <option value="All">Select category...</option>
              <option value="Retreat">Offensive Security</option>
              <option value="Package">Network Infrastructure</option>
              <option value="Coaches">Defensive & SIEM</option>
              <option value="Adventures">CTF & Research</option>
            </select>
          </div>

          {/* Price / Difficulty */}
          <div className="space-y-1.5 px-1.5 border-t lg:border-t-0 lg:border-l border-gray-100 pt-3 lg:pt-0">
            <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">DIFFICULTY</label>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="w-full text-xs font-semibold text-gray-800 focus:outline-none bg-transparent cursor-pointer"
            >
              {pricesList.map(item => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>

          {/* Date / Status */}
          <div className="space-y-1.5 px-1.5 border-t lg:border-t-0 lg:border-l border-gray-100 pt-3 lg:pt-0">
            <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">LAB STATUS</label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full text-xs font-semibold text-gray-800 focus:outline-none bg-transparent cursor-pointer"
            >
              {datesList.map(item => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>

          {/* Discover Button */}
          <button
            onClick={handleDiscoverReset}
            className="w-full py-3.5 bg-gray-900 hover:bg-amber-500 hover:text-gray-950 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-2xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>DISCOVER LABS</span>
          </button>

        </div>

        {/* Main Grid Content: 4 Cards per row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredDestinations.length === 0 ? (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-16 bg-white rounded-3xl border border-gray-100 text-center space-y-4"
              >
                <div className="p-3 bg-amber-50 text-amber-500 rounded-full inline-flex">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h4 className="font-sans font-semibold text-lg text-gray-800 tracking-tighter">No destinations match your filters</h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Try clearing some criteria or click the "Discover" button to reset.
                </p>
                <button
                  onClick={handleDiscoverReset}
                  className="px-5 py-2.5 bg-gray-900 text-white rounded-full text-xs font-mono font-bold uppercase tracking-wider hover:bg-amber-500 transition-colors"
                >
                  Reset all Filters
                </button>
              </motion.div>
            ) : (
              filteredDestinations.map(dest => {
                return (
                  <motion.div
                    key={dest.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                    className="h-full"
                  >
                    <ProjectExactCard
                      project={{
                        id: dest.id,
                        title: dest.title,
                        subtitle: `${dest.category} • ${dest.location}`,
                        description: dest.description,
                        authorName: dest.title,
                        rating: dest.rating || 4.8,
                        reviewsCount: 128,
                        totalVotes: 356,
                        image: dest.image,
                        price: dest.price
                      }}
                      onViewProject={() => setSelectedDestDetails(dest)}
                    />
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* TRIP DETAIL DIALOG DRAWER OVERLAY */}
      <AnimatePresence>
        {selectedDestDetails && (
          <div id="dest-detail-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden font-sans border border-gray-100 my-8"
            >
              <button
                onClick={() => setSelectedDestDetails(null)}
                className="absolute top-4 right-4 p-2.5 text-white hover:text-gray-200 bg-black/40 hover:bg-black/60 rounded-full transition-colors z-20 shadow-xs"
              >
                ✕
              </button>

              {/* Upper scenic gallery frame */}
              <div className="relative h-64 md:h-80">
                <img
                  src={selectedDestDetails.image}
                  alt={selectedDestDetails.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="bg-amber-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {selectedDestDetails.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-sans font-semibold tracking-tighter">
                    {selectedDestDetails.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-200 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    {selectedDestDetails.location}
                  </p>
                </div>
              </div>

              {/* Detail sheets */}
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Journey Overview</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedDestDetails.description} This curated trip features bespoke explorations, small squad interactions, and full accommodation assistance.
                  </p>
                </div>

                {/* Parameters bullet grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-dashed border-gray-200 font-mono text-xs">
                  <div className="space-y-1 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-gray-400 uppercase text-[9px] block">Lodging stay</span>
                    <strong className="text-gray-800 font-bold block">{selectedDestDetails.accommodation}</strong>
                  </div>
                  <div className="space-y-1 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-gray-400 uppercase text-[9px] block">Transit vehicle</span>
                    <strong className="text-gray-800 font-bold block">{selectedDestDetails.transport}</strong>
                  </div>
                  <div className="space-y-1 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-gray-400 uppercase text-[9px] block">Meal arrangements</span>
                    <strong className="text-gray-800 font-bold block">{selectedDestDetails.meals}</strong>
                  </div>
                </div>

                {/* Pricing and Booking button row */}
                <div className="flex items-center justify-end pt-2 gap-2">
                  <button
                    onClick={() => setSelectedDestDetails(null)}
                    className="px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      onBookDestination(selectedDestDetails);
                      setSelectedDestDetails(null);
                    }}
                    className="px-6 py-2.5 bg-gray-900 hover:bg-amber-500 hover:text-gray-950 text-white rounded-full text-xs font-sans font-extrabold uppercase tracking-wider transition-all shadow-md cursor-pointer whitespace-nowrap shrink-0"
                  >
                    VIEW PROJECT
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
