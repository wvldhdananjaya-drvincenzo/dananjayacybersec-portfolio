import { jsPDF } from 'jspdf';
import { DANANJAYA_PHOTO_BASE64 } from '../assets/dananjayaPhotoBase64';

export interface GeneratePdfOptions {
  filename?: string;
  onProgress?: (percent: number) => void;
}

/**
 * Creates an arched, white-bordered portrait photo using an offscreen canvas.
 * Matches the web resume's distinctive arch shape (rounded-t-full rounded-b-[40px] border-[3px] border-white).
 * Falls back to raw base64 if DOM/canvas is not available (e.g., in SSR/Node testing).
 */
export function createArchedPhotoDataUrl(base64: string): Promise<string> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      resolve(base64);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const w = 480;
        const h = 600;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(base64);
          return;
        }

        const topR = w / 2; // Full semi-circle at top (240px)
        const botR = 52;    // Rounded bottom corners
        const borderWidth = 10;
        const inset = borderWidth / 2;

        // Clip path for photo
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(inset, topR);
        ctx.arc(w / 2, topR, topR - inset, Math.PI, 0);
        ctx.lineTo(w - inset, h - botR);
        ctx.quadraticCurveTo(w - inset, h - inset, w - botR, h - inset);
        ctx.lineTo(botR, h - inset);
        ctx.quadraticCurveTo(inset, h - inset, inset, h - botR);
        ctx.closePath();
        ctx.clip();

        // Draw image filling the canvas
        ctx.drawImage(img, 0, 0, w, h);
        ctx.restore();

        // Draw crisp solid white arch border
        ctx.beginPath();
        ctx.lineWidth = borderWidth;
        ctx.strokeStyle = '#ffffff';
        ctx.moveTo(inset, topR);
        ctx.arc(w / 2, topR, topR - inset, Math.PI, 0);
        ctx.lineTo(w - inset, h - botR);
        ctx.quadraticCurveTo(w - inset, h - inset, w - botR, h - inset);
        ctx.lineTo(botR, h - inset);
        ctx.quadraticCurveTo(inset, h - inset, inset, h - botR);
        ctx.closePath();
        ctx.stroke();

        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        console.warn('Canvas arch render failed, using original base64:', err);
        resolve(base64);
      }
    };

    img.onerror = () => resolve(base64);
    img.src = base64;
  });
}

/**
 * Generates and downloads a crystal-clear, true ISO A4 (210mm x 297mm) single-sheet PDF.
 * Uses pure vector layout engine for razor-sharp typography, selectable & ATS-friendly text,
 * perfectly balanced proportions filling the full A4 page, and an arched portrait photograph.
 */
export async function downloadCvAsPdf(
  _elementId?: string,
  options: GeneratePdfOptions = {}
): Promise<void> {
  const {
    filename = 'Dananjaya_Wickramarachchi_Curriculum_Vitae.pdf',
    onProgress
  } = options;

  onProgress?.(15);
  let photoDataUrl = DANANJAYA_PHOTO_BASE64;
  try {
    photoDataUrl = await createArchedPhotoDataUrl(DANANJAYA_PHOTO_BASE64);
  } catch (err) {
    console.warn('Could not prepare arched photo:', err);
  }
  onProgress?.(50);

  await new Promise((resolve) => setTimeout(resolve, 50));
  onProgress?.(70);

  generateVectorCvPdf(filename, onProgress, photoDataUrl);
}

/**
 * Pure vector-based A4 PDF generator using jsPDF.
 * Creates an exact, professional single-sheet ISO A4 curriculum vitae.
 *
 * Specifications:
 * - Format: ISO A4 (210 mm x 297 mm)
 * - Page Count: Exactly 1 Page (no cutoffs, no blank second page)
 * - Left Column: 72 mm Dark Charcoal (#1c1c1e) spanning full 297 mm
 * - Right Column: 138 mm Crisp White (#ffffff) spanning full 297 mm
 * - Portrait Photo: 43 mm x 54 mm, centered horizontally at X = 14.5 mm, Y = 12 mm
 * - Typography: Scaled and mathematically balanced to fill the vertical A4 height with natural executive rhythm
 */
export function generateVectorCvPdf(
  filename = 'Dananjaya_Wickramarachchi_Curriculum_Vitae.pdf',
  onProgress?: (percent: number) => void,
  photoDataUrl: string = DANANJAYA_PHOTO_BASE64
): void {
  onProgress?.(75);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  // Set PDF Metadata for ATS and PDF readers
  pdf.setProperties({
    title: 'Curriculum Vitae - Dananjaya Wickramarachchi',
    subject: 'Network Security & Ethical Hacking Resume (A4 Format)',
    author: 'Dananjaya Wickramarachchi',
    keywords: 'Network Security, Ethical Hacking, Cisco, Pentesting, CV, Resume, A4',
    creator: 'Dananjaya Wickramarachchi'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const leftColWidth = 72;
  const rightColWidth = pageWidth - leftColWidth; // 138 mm

  // 1. Draw Left Sidebar (Dark Charcoal #1c1c1e) - full 297mm page height
  pdf.setFillColor(28, 28, 30);
  pdf.rect(0, 0, leftColWidth, pageHeight, 'F');

  // 2. Draw Right Body (Pure White #ffffff) - full 297mm page height
  pdf.setFillColor(255, 255, 255);
  pdf.rect(leftColWidth, 0, rightColWidth, pageHeight, 'F');

  // 3. Add Portrait Photo in Left Column (Centered horizontally at X = 13.5 mm, Y = 13 mm)
  try {
    const photoWidth = 45;
    const photoHeight = 56;
    const photoX = (leftColWidth - photoWidth) / 2; // 13.5 mm
    const photoY = 13.0;

    const imgFormat = photoDataUrl.startsWith('data:image/png') ? 'PNG' : 'JPEG';
    pdf.addImage(
      photoDataUrl,
      imgFormat,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      undefined,
      'FAST'
    );

    // Vector arch border reinforcement
    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(0.75);
    pdf.roundedRect(photoX, photoY, photoWidth, photoHeight, 8.0, 8.0, 'S');
  } catch (imgErr) {
    console.warn('Vector PDF portrait embed note:', imgErr);
  }

  // --- LEFT COLUMN CONTENT (White & Silver Text on Dark #1c1c1e) ---
  const leftPad = 8.5;
  let curLeftY = 74.5;

  // Helper for left section title with stylish underline
  const renderLeftTitle = (title: string) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9.8);
    pdf.setTextColor(255, 255, 255);
    pdf.text(title, leftPad, curLeftY);
    curLeftY += 1.8;
    pdf.setDrawColor(75, 75, 84);
    pdf.setLineWidth(0.35);
    pdf.line(leftPad, curLeftY, leftColWidth - leftPad, curLeftY);
    curLeftY += 5.0;
  };

  // Helper for skill and language progress bars
  const renderSkillBar = (label: string, percent: number) => {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.9);
    pdf.setTextColor(228, 228, 234);
    pdf.text(label, leftPad, curLeftY);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${percent}%`, leftColWidth - leftPad, curLeftY, { align: 'right' });
    curLeftY += 1.8;

    const barWidth = leftColWidth - leftPad * 2;
    const barHeight = 1.8;
    pdf.setFillColor(52, 52, 58);
    pdf.roundedRect(leftPad, curLeftY, barWidth, barHeight, 0.9, 0.9, 'F');
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(leftPad, curLeftY, (barWidth * percent) / 100, barHeight, 0.9, 0.9, 'F');
    curLeftY += 4.8;
  };

  // Section 1: CONTACT
  renderLeftTitle('CONTACT');
  const contacts = [
    { label: 'PHONE', val: '+94 70 508 4477' },
    { label: 'EMAIL', val: 'dananjayawvldh@gmail.com' },
    { label: 'LOCATION', val: 'Colombo, Sri Lanka' },
    { label: 'LINKEDIN', val: 'DananjayaWickramarachchi-DW' }
  ];

  contacts.forEach((item, idx) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.0);
    pdf.setTextColor(160, 160, 168);
    pdf.text(item.label, leftPad, curLeftY);
    curLeftY += 2.8;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.9);
    pdf.setTextColor(245, 245, 250);
    pdf.text(item.val, leftPad, curLeftY);
    curLeftY += 4.8 + (idx < contacts.length - 1 ? 2.4 : 0);
  });

  curLeftY += 6.5;

  // Section 2: WORK SKILLS
  renderLeftTitle('WORK SKILLS');
  const skills = [
    { name: 'Network Security & Pentesting', pct: 92 },
    { name: 'Network Engineering & VLANs', pct: 88 },
    { name: 'System Flow Design & Architecture', pct: 86 },
    { name: 'Linux & Threat Emulation', pct: 89 },
    { name: 'Graphic Design & Brand Identity', pct: 90 },
    { name: 'AI Video Editing & Production', pct: 85 }
  ];
  skills.forEach((s) => renderSkillBar(s.name, s.pct));

  curLeftY += 6.5;

  // Section 3: LANGUAGES
  renderLeftTitle('LANGUAGES');
  renderSkillBar('English (Professional)', 88);
  renderSkillBar('Sinhala (Native / Fluent)', 100);

  curLeftY += 6.5;

  // Section 4: REFERENCE
  renderLeftTitle('REFERENCE');
  const referees = [
    { name: 'T.A. Soysa', phone: '+94 78 839 2279' },
    { name: 'D. Perera', phone: '+94 78 596 2959' }
  ];

  referees.forEach((ref, idx) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.6);
    pdf.setTextColor(250, 250, 255);
    pdf.text(ref.name, leftPad, curLeftY);
    curLeftY += 3.6;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.0);
    pdf.setTextColor(185, 185, 195);
    pdf.text(ref.phone, leftPad, curLeftY);
    curLeftY += (idx < referees.length - 1 ? 5.0 : 0);
  });

  // --- RIGHT COLUMN CONTENT (Crisp Dark Text on Pure White) ---
  const rightPad = leftColWidth + 9.5; // 81.5 mm
  const rightMargin = 9.5;
  const rightContentWidth = pageWidth - rightPad - rightMargin; // 119 mm
  let curRightY = 13.0;

  // Header: Name
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(20.0);
  pdf.setTextColor(18, 18, 20);
  pdf.text('DANANJAYA', rightPad, curRightY + 6.0);
  curRightY += 7.0;
  pdf.text('WICKRAMARACHCHI', rightPad, curRightY + 6.0);
  curRightY += 6.5;

  // Header: Professional Subtitle
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.8);
  pdf.setTextColor(88, 88, 96);
  pdf.text('UNDERGRADUATE IN NETWORK SECURITY & ETHICAL HACKING', rightPad, curRightY + 4.2);
  curRightY += 5.5;

  // Header: Horizontal Divider
  pdf.setDrawColor(215, 215, 222);
  pdf.setLineWidth(0.4);
  pdf.line(rightPad, curRightY, pageWidth - rightMargin, curRightY);
  curRightY += 4.5;

  // Executive Profile Summary
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.4);
  pdf.setTextColor(55, 55, 62);
  const summaryText =
    'Dedicated Network Security and Ethical Hacking undergraduate with solid technical competence in enterprise network engineering, vulnerability assessments, system flow architecture, and digital branding. Experienced in configuring resilient network topologies, threat emulation environments, and AI-driven media workflows with a strong commitment to zero-trust defense principles.';
  const summaryLines = pdf.splitTextToSize(summaryText, rightContentWidth);
  pdf.text(summaryLines, rightPad, curRightY);
  curRightY += summaryLines.length * 3.7 + 6.8;

  // Helper for Right Section Title with Horizontal Rule
  const renderRightTitle = (title: string) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10.2);
    pdf.setTextColor(18, 18, 20);
    pdf.text(title, rightPad, curRightY);
    curRightY += 2.0;
    pdf.setDrawColor(215, 215, 222);
    pdf.setLineWidth(0.4);
    pdf.line(rightPad, curRightY, pageWidth - rightMargin, curRightY);
    curRightY += 4.8;
  };

  // Helper for timeline items (education and work experience)
  const renderTimelineItem = (
    year: string,
    role: string,
    org: string,
    bullets: { bold?: string; text: string }[],
    gapAfter: number
  ) => {
    // Year badge
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.2);
    pdf.setTextColor(255, 255, 255);
    pdf.setFillColor(28, 28, 30);
    pdf.roundedRect(rightPad, curRightY - 2.5, 22.0, 4.0, 0.8, 0.8, 'F');
    pdf.text(year, rightPad + 11.0, curRightY + 0.3, { align: 'center' });

    // Role / Title
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9.0);
    pdf.setTextColor(20, 20, 22);
    pdf.text(role, rightPad + 25.5, curRightY);
    curRightY += 3.6;

    // Organization / School
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(8.2);
    pdf.setTextColor(95, 95, 105);
    pdf.text(org, rightPad + 25.5, curRightY);
    curRightY += 3.2;

    // Bullets with custom aligned bullet points
    bullets.forEach((b) => {
      pdf.setFillColor(35, 35, 40);
      pdf.circle(rightPad + 26.5, curRightY - 0.7, 0.46, 'F');
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.1);
      pdf.setTextColor(58, 58, 64);
      const fullStr = b.bold ? b.bold + ': ' + b.text : b.text;
      const bLines = pdf.splitTextToSize(fullStr, rightContentWidth - 29.0);
      pdf.text(bLines, rightPad + 29.0, curRightY);
      curRightY += bLines.length * 3.4 + 0.6;
    });

    curRightY += gapAfter;
  };

  // 1. Section: EDUCATION
  renderRightTitle('EDUCATION');
  renderTimelineItem(
    '2026 - Present',
    'BSc (Hons) in Network Security and Ethical Hacking',
    'National Institute of Business Management (NIBM)',
    [
      { text: 'Specializing in enterprise network defense, ethical penetration testing, cryptographic protocols, and security audits.' },
      { text: 'Active laboratory experimentation in Active Directory privilege escalation, Kerberos ticket exploits, and intrusion detection.' },
      { text: 'Focusing on hands-on threat emulation, vulnerability mitigation, and zero-trust network infrastructure designs.' }
    ],
    3.4
  );

  renderTimelineItem(
    '2025',
    'Certification in Network Engineering',
    'NIBM University (National Institute of Business Management)',
    [
      { text: 'Comprehensive hands-on training in enterprise routing protocols, switching, VLAN segmentations, and subnet architectures.' },
      { text: 'Practical laboratory execution in hardware rack assembly, Cisco packet routing, Wireshark traffic inspection, and firewall policies.' }
    ],
    3.4
  );

  renderTimelineItem(
    '2024',
    'G.C.E. Advanced Level - Commerce Stream',
    'St. Mary\'s College',
    [
      { text: 'Successfully completed the G.C.E. Advanced Level examination in Commerce Stream with English - C.' }
    ],
    3.4
  );

  renderTimelineItem(
    '2021',
    'G.C.E. Ordinary Level',
    'St. Mary\'s College',
    [
      { text: 'Achieved core academic distinctions and passes: Mathematics - B, English - B, and Commerce - C.' }
    ],
    0
  );

  curRightY += 7.0;

  // 2. Section: WORK EXPERIENCE
  renderRightTitle('WORK EXPERIENCE');
  renderTimelineItem(
    '2025 (4 mos)',
    'Associate Marketing Intern',
    'SOMRO BPO Services (Pvt) Ltd',
    [
      { bold: 'Social Media Handling', text: 'Managed corporate social channels, executed scheduled media rollouts, and analyzed key engagement metrics.' },
      { bold: 'System Flow Design', text: 'Mapped operational workflows and structured system process blueprints to streamline BPO communication and client deliverables.' },
      { bold: 'AI Video Editing & Creation', text: 'Deployed state-of-the-art AI video editing pipelines to generate dynamic promo assets, video reels, and client marketing collaterals.' }
    ],
    3.6
  );

  renderTimelineItem(
    '2023 - Present',
    'Graphic Designer - Independent Projects & Freelance',
    'Creative Brand Identity & Visual Design',
    [
      { bold: 'Branding & Packaging', text: 'Developed end-to-end branding product plans, package mockups, and corporate template design systems.' },
      { bold: 'Social Media & Marketing', text: 'Designed high-converting promotional post suites, digital advertising graphics, and visual content packages.' },
      { bold: 'Festival & Apparel Design', text: 'Created print-ready festival/class event banners, stage backdrops, and custom screen-printed T-shirt graphics.' }
    ],
    0
  );

  curRightY += 7.0;

  // 3. Section: PERSONAL ACHIEVEMENTS & CONTRIBUTIONS
  renderRightTitle('PERSONAL ACHIEVEMENTS & CONTRIBUTIONS');
  const achievements = [
    {
      title: 'Vice President - NIBM Cybersecurity Club (2025 - Present)',
      desc: 'Elected to executive leadership to direct campus cybersecurity workshops, capture-the-flag (CTF) hackathons, vulnerability emulation sessions, and ethical hacking masterclasses.'
    },
    {
      title: 'Active Member - IEEE NIBM Student Branch (2025 - Present)',
      desc: 'Participated in global IEEE technical conventions, cybersecurity panels, research colloquiums, and collaborative STEM outreach initiatives across Sri Lankan universities.'
    }
  ];

  achievements.forEach((ach, idx) => {
    pdf.setFillColor(35, 35, 40);
    pdf.circle(rightPad + 2.0, curRightY - 0.7, 0.46, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.6);
    pdf.setTextColor(20, 20, 22);
    pdf.text(ach.title, rightPad + 5.0, curRightY);
    curRightY += 3.5;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.1);
    pdf.setTextColor(58, 58, 64);
    const lines = pdf.splitTextToSize(ach.desc, rightContentWidth - 5.5);
    pdf.text(lines, rightPad + 5.0, curRightY);
    curRightY += lines.length * 3.4 + (idx < achievements.length - 1 ? 3.5 : 0);
  });

  onProgress?.(95);
  pdf.save(filename);
  onProgress?.(100);
}
