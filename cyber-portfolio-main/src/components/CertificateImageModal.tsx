import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Download, FileImage, ExternalLink } from 'lucide-react';
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
  const [copiedId, setCopiedId] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  if (!isOpen || !cert) return null;

  const badgeTag = (cert.badge || cert.provider || "SECURITY CERTIFICATION").toUpperCase();
  const issuerName = cert.provider || cert.issuer || "Offensive Security";
  const certTitle = cert.title || "Certified Ethical Hacker (CEH v12)";
  const credId = cert.credentialId || "CEH-2026-8894-DW";
  const issueDate = cert.issuedOn || "May 15, 2026";
  const signatory = cert.authorizedSignatory || "Dr. Anthony Vance, Chief Security Officer";

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2200);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(credId);
    setCopiedId(true);
    triggerToast("Credential ID copied!");
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Helper to generate a full graphic certificate SVG Data Image
  const generateCertificateSvgImage = () => {
    const isCEH = certTitle.toLowerCase().includes('ceh') || certTitle.toLowerCase().includes('ethical');
    const isTHM = certTitle.toLowerCase().includes('pentest') || certTitle.toLowerCase().includes('tryhackme');
    const isCisco = certTitle.toLowerCase().includes('cisco') || certTitle.toLowerCase().includes('cyber');

    const primaryColor = isCEH ? '#16a34a' : isTHM ? '#dc2626' : isCisco ? '#0284c7' : '#2563eb';
    const accentColor = isCEH ? '#15803d' : isTHM ? '#991b1b' : isCisco ? '#0369a1' : '#1d4ed8';

    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="850" viewBox="0 0 1200 850">
        <rect width="1200" height="850" fill="#ffffff"/>
        
        <!-- Outer Border Frame -->
        <rect x="25" y="25" width="1150" height="800" fill="#fafafa" stroke="${primaryColor}" stroke-width="8" rx="20"/>
        <rect x="45" y="45" width="1110" height="760" fill="none" stroke="#111827" stroke-width="2" stroke-dasharray="8,8"/>
        
        <!-- Header Brand Badge -->
        <rect x="450" y="80" width="300" height="40" fill="${primaryColor}" rx="8"/>
        <text x="600" y="106" font-family="sans-serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="4">${issuerName.toUpperCase()}</text>
        
        <!-- Title Header -->
        <text x="600" y="200" font-family="Georgia, serif" font-size="42" font-weight="bold" fill="#111827" text-anchor="middle">CERTIFICATE OF ACHIEVEMENT</text>
        <line x1="420" y1="230" x2="780" y2="230" stroke="${primaryColor}" stroke-width="3"/>
        
        <!-- Recipient Subtitle -->
        <text x="600" y="290" font-family="Georgia, serif" font-size="20" font-style="italic" fill="#4b5563" text-anchor="middle">This official credential is hereby awarded to</text>
        
        <!-- Recipient Name -->
        <text x="600" y="370" font-family="sans-serif" font-size="48" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="-1">Dananjaya Wickramarachchi</text>
        <line x1="300" y1="395" x2="900" y2="395" stroke="#e5e7eb" stroke-width="2"/>
        
        <!-- Credential Achievement -->
        <text x="600" y="450" font-family="Georgia, serif" font-size="18" font-style="italic" fill="#4b5563" text-anchor="middle">for successfully completing examination and demonstrating mastery in</text>
        
        <rect x="200" y="480" width="800" height="70" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1.5" rx="12"/>
        <text x="600" y="525" font-family="sans-serif" font-size="28" font-weight="900" fill="${accentColor}" text-anchor="middle">${certTitle.toUpperCase()}</text>
        
        <!-- Signatures & Stamp Row -->
        <!-- Left Signature -->
        <text x="300" y="660" font-family="Georgia, serif" font-size="18" font-style="italic" font-weight="bold" fill="#111827" text-anchor="middle">${signatory}</text>
        <line x1="180" y1="680" x2="420" y2="680" stroke="#9ca3af" stroke-width="1.5"/>
        <text x="300" y="705" font-family="sans-serif" font-size="12" font-weight="bold" fill="#6b7280" text-anchor="middle">AUTHORIZED SIGNATURE</text>
        
        <!-- Center Verified Gold Seal -->
        <circle cx="600" cy="660" r="50" fill="${primaryColor}" opacity="0.1" stroke="${primaryColor}" stroke-width="4"/>
        <circle cx="600" cy="660" r="42" fill="none" stroke="${primaryColor}" stroke-width="1.5" stroke-dasharray="4,4"/>
        <text x="600" y="655" font-family="sans-serif" font-size="11" font-weight="900" fill="${accentColor}" text-anchor="middle" letter-spacing="2">OFFICIAL</text>
        <text x="600" y="672" font-family="sans-serif" font-size="11" font-weight="900" fill="${accentColor}" text-anchor="middle" letter-spacing="2">SEAL</text>
        
        <!-- Right Date -->
        <text x="900" y="660" font-family="sans-serif" font-size="18" font-weight="bold" fill="#111827" text-anchor="middle">${issueDate}</text>
        <line x1="780" y1="680" x2="1020" y2="680" stroke="#9ca3af" stroke-width="1.5"/>
        <text x="900" y="705" font-family="sans-serif" font-size="12" font-weight="bold" fill="#6b7280" text-anchor="middle">DATE OF ISSUANCE</text>
        
        <!-- Bottom ID Watermark -->
        <text x="600" y="775" font-family="monospace" font-size="13" font-weight="bold" fill="#9ca3af" text-anchor="middle">CREDENTIAL ID: ${credId} • AUTHENTICATED DIGITAL RECORD</text>
      </svg>
    `;

    return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
  };

  const certificateImageUrl = generateCertificateSvgImage();

  const handleDownloadJpeg = () => {
    setDownloading(true);
    const link = document.createElement('a');
    link.href = certificateImageUrl;
    link.download = `${credId}-certificate.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloading(false);
      triggerToast(`Downloaded ${credId} Certificate Image!`);
    }, 800);
  };

  const handleOpenImageTab = () => {
    const win = window.open();
    if (win) {
      win.document.write(`
        <html>
          <head>
            <title>${certTitle} - Certificate Image</title>
            <style>
              body { margin: 0; background: #0a0a0a; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
              img { max-width: 95vw; max-height: 95vh; border-radius: 12px; box-shadow: 0 25px 60px rgba(0,0,0,0.9); }
            </style>
          </head>
          <body>
            <img src="${certificateImageUrl}" alt="${certTitle}" />
          </body>
        </html>
      `);
      win.document.close();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
        
        {/* Backdrop listener */}
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        {/* Modal Surface Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white text-gray-900 rounded-[2rem] shadow-2xl overflow-hidden my-auto border border-gray-100 flex flex-col max-h-[92vh]"
        >
          {/* Toast Notification */}
          <AnimatePresence>
            {toastMsg && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-black text-white font-mono text-xs font-bold rounded-full shadow-lg flex items-center gap-2 border border-gray-800"
              >
                <span>{toastMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal Header Bar */}
          <div className="px-6 sm:px-8 pt-6 pb-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-gray-100 text-gray-900 font-mono font-bold text-[11px] sm:text-xs rounded-md tracking-wider uppercase border border-gray-200 flex items-center gap-1.5">
                <FileImage className="w-3.5 h-3.5 text-gray-900" />
                {badgeTag}
              </span>
              <span className="text-gray-400 font-mono text-xs tracking-tight hidden sm:inline">
                ID: {credId}
              </span>
            </div>

            {/* Top Right Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenImageTab}
                className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-gray-200"
                title="Open Image in New Tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open Image Tab</span>
              </button>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-gray-200 hover:bg-gray-100 flex items-center justify-center text-gray-600 hover:text-black transition-all cursor-pointer"
                title="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Main Content: ACTUAL CERTIFICATE IMAGE */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
            
            {/* The Certificate Rendered strictly as an IMAGE */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gray-50 flex items-center justify-center group">
              <img 
                src={certificateImageUrl} 
                alt={`${certTitle} Certificate Image`}
                className="w-full h-auto object-contain max-h-[62vh] select-none"
              />
            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                <span>Verified Image Credential • ID: {credId}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyId}
                  className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-900 font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId ? 'ID Copied' : 'Copy Credential ID'}</span>
                </button>

                <button
                  onClick={handleDownloadJpeg}
                  disabled={downloading}
                  className="px-5 py-2 rounded-full bg-black hover:bg-gray-800 text-white font-sans font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloading ? 'Downloading...' : 'Download Certificate Image'}</span>
                </button>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
