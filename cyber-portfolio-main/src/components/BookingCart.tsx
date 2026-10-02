import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Trash2, Shield, Compass, ChevronRight, Bookmark } from 'lucide-react';
import { Booking } from '../types';

interface BookingCartProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
}

export default function BookingCart({ isOpen, onClose, bookings, onCancelBooking }: BookingCartProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-black" />
                <h3 className="text-lg font-display font-bold text-gray-900">Active Engagements & Blueprints</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {bookings.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="p-4 bg-gray-50 text-gray-400 rounded-full mb-3">
                    <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '20s' }} />
                  </div>
                  <h4 className="font-semibold text-gray-800">No active engagements scheduled</h4>
                  <p className="text-xs text-gray-400 max-w-xs mt-1">
                    Browse our suite of threat emulation services, smart contract audits, and zero-trust blueprints to queue them for deployment.
                  </p>
                </div>
              ) : (
                bookings.map(bkg => (
                  <motion.div
                    key={bkg.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex gap-4"
                  >
                    {/* Color stripe */}
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-black" />

                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-xs bg-gray-100">
                      <img
                        src={bkg.destinationImage}
                        alt={bkg.destinationTitle}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-display font-bold text-sm text-gray-900 truncate">
                          {bkg.destinationTitle}
                        </h4>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">
                          {bkg.status}
                        </span>
                      </div>

                      <div className="space-y-1 text-[11px] text-gray-500 font-mono">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span>{bkg.dateSelected}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span>{bkg.passengers} Target Host{bkg.passengers === 1 ? '' : 's'}</span>
                        </div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest">{bkg.tripType}</div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-semibold text-gray-900">${bkg.totalPrice.toFixed(2)}</span>
                        <button
                          onClick={() => onCancelBooking(bkg.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Remove Engagement"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {bookings.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono text-gray-600">
                  <span>Pending Campaigns</span>
                  <span className="font-bold text-gray-900">{bookings.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-semibold text-gray-800">
                  <span>Estimated Investment</span>
                  <span className="text-base text-black font-extrabold font-display">
                    ${bookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 py-1">
                  <Shield className="w-4 h-4 text-black shrink-0" />
                  <span>All projects are scoped, executed, and certified under Dananjaya's zero-disclosure non-disclosure agreement.</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
