import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink } from 'lucide-react';
import { CertificationExactData } from './CertificationExactCard';

interface CertificateImageModalProps {
  cert: CertificationExactData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificateImageModal({
  cert,
  isOpen,
  onClose,
}: CertificateImageModalProps) {
  const [downloading, setDownloading] = useState(false);

  if (!isOpen || !cert) return null;

  const certificateImageUrl = cert.certificateUrl || cert.portraitUrl || "";
  const credId = cert.credentialId || "certificate";

  const handleDownloadImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!certificateImageUrl) return;
    setDownloading(true);
    try {
      const response = await fetch(certificateImageUrl, { mode: 'cors' });
      if (!response.ok) throw new Error("Network response error");
      const blob = await response.blob();
      const ext = certificateImageUrl.includes('.png') ? 'png' : 'jpg';
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${credId}-certificate.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      const ext = certificateImageUrl.includes('.png') ? 'png' : 'jpg';
      const link = document.createElement('a');
      link.href = certificateImageUrl;
      link.target = '_blank';
      link.download = `${credId}-certificate.${ext}`;
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setDownloading(false);
    }
  };

  const handleOpenImageTab = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (certificateImageUrl) {
      window.open(certificateImageUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl max-h-[92vh] w-auto flex flex-col items-center justify-center select-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Minimal Floating Top Action Buttons */}
          <div className="absolute -top-11 right-0 flex items-center gap-2 z-50">
            <button
              onClick={handleOpenImageTab}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
              title="Open full image in new tab"
            >
              <ExternalLink className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={handleDownloadImage}
              disabled={downloading}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
              title="Download certificate image"
            >
              <Download className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 transition-all cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Pure Certificate Preview Image Only */}
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-white/15 bg-black">
            <img 
              src={certificateImageUrl} 
              alt={cert.title}
              referrerPolicy="no-referrer"
              className="max-h-[85vh] max-w-[92vw] w-auto h-auto object-contain rounded-xl sm:rounded-2xl select-none"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
