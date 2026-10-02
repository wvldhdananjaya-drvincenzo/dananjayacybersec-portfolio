import { motion } from 'motion/react';
import { Landmark, TreePine, Trees, Waves, Compass } from 'lucide-react';
import ProjectExactCard from './ProjectExactCard';
import ScrollReveal from './ScrollReveal';

interface DestinationsPageProps {
  onSelectRegion: (region: string) => void;
}

export default function DestinationsPage({ onSelectRegion }: DestinationsPageProps) {
  const regions = [
    {
      id: 'Cultural Triangle',
      name: 'Active Directory Exploitation Range',
      icon: Landmark,
      image: 'https://res.cloudinary.com/z9mdashc/image/upload/v1784992984/taylor-vick-M5tzZtFCOfs-unsplash_xllldl.jpg',
      tagline: 'Nation-state Lateral Exploitation Labs',
      description: 'Replicating real-world AD environments with fully provisioned forest trusts, DCSync capabilities, and sophisticated Kerberos delegation attack paths.',
      climate: 'Critical / High',
      bestTime: 'C2, Bloodhound, Impacket',
      highlights: ['EDR bypass & memory injection', 'Active Directory DCSync attack', 'Exfiltration via DNS tunneling']
    },
    {
      id: 'Central Highlands',
      name: 'DeFi & Smart Contract Audit Lab',
      icon: TreePine,
      image: 'https://res.cloudinary.com/z9mdashc/image/upload/v1784992996/nastya-dulhiier-OKOOGO578eo-unsplash_lcfbh2.jpg',
      tagline: 'Web3/Crypto Math & Logic Validation',
      description: 'Dedicated testbeds simulating multiple chain bridges, deep bytecode execution, and custom fuzzing arrays designed to extract DeFi exploit loops.',
      climate: 'Critical',
      bestTime: 'Foundry, Echidna, Slither',
      highlights: ['Reentrancy vulnerability identification', 'Flash-loan attack vector auditing', 'Formal verification of mathematical states']
    },
    {
      id: 'Southern Coast',
      name: 'Wi-Fi & Physical Perimeter Security Lab',
      icon: Waves,
      image: 'https://res.cloudinary.com/z9mdashc/image/upload/v1784992994/jj-ying-8bghKxNU1j0-unsplash_lo6f9i.jpg',
      tagline: 'Covert Physical & RF Perimeter Hijacks',
      description: 'Simulated modern corporate facilities featuring actual RFID card readers, dual-band WPA3 enterprise networks, and hardware drop-box placements.',
      climate: 'Medium / High',
      bestTime: 'Flipper Zero, Bash Bunny, Hak5',
      highlights: ['Badge cloning & tailgating simulation', 'Enterprise Wi-Fi rogue AP setup', 'Hardware dropbox covert deployment']
    },
    {
      id: 'Western Coast',
      name: 'Multi-Cloud Zero-Trust Guard Suite',
      icon: Compass,
      image: 'https://res.cloudinary.com/z9mdashc/image/upload/v1784992987/kirill-sh-eVWWr6nmDf8-unsplash_z0lweq.jpg',
      tagline: 'Multi-Cloud (AWS/GCP/Azure) Zero-Trust Labs',
      description: 'Infrastructure-as-code test environments featuring live Kubernetes clusters, serverless compute scopes, IAM boundaries, and pipeline security triggers.',
      climate: 'High',
      bestTime: 'Terraform, Trivy, Checkov',
      highlights: ['AWS IAM privilege escalation search', 'Kubernetes node-escape checks', 'Continuous DevSecOps pipeline gating']
    }
  ];

  return (
    <div className="pt-36 sm:pt-40 bg-gray-50/50 font-sans min-h-screen">
      {/* Hero header */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="relative bg-white border-b border-gray-100 py-20 text-gray-950 flex flex-col items-center justify-center text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-100/80 border border-neutral-200 rounded-full text-xs font-mono font-semibold tracking-[0.25em] uppercase text-neutral-800 shadow-sm">
              <span className="text-amber-500 font-bold">✦</span> REPLICATING VECTOR ENVIRONMENTS
            </span>
              
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-sans font-black tracking-tighter text-black uppercase select-none leading-none">
                Threat Labs
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-neutral-600 font-sans tracking-wide max-w-2xl leading-relaxed">
                Active threat sandboxes, Active Directory ranges, and cloud perimeter environments
              </p>

              <button
                onClick={() => {
                  const el = document.getElementById('threat-labs-list');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-black hover:bg-amber-500 text-white hover:text-black text-xs md:text-sm font-sans font-extrabold uppercase tracking-widest rounded-full transition-all shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.3)] hover:scale-[1.02] cursor-pointer"
              >
                <span>View Labs</span>
                <span className="text-base font-semibold">↗</span>
              </button>
            </div>
          </div>
      </ScrollReveal>

      {/* Main Grid listing: 4 Cards per line layout */}
      <div id="threat-labs-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {regions.map((reg, idx) => {
            return (
              <motion.div
                key={reg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="h-full"
              >
                <ProjectExactCard
                  project={{
                    id: reg.id,
                    title: reg.name,
                    subtitle: reg.tagline,
                    description: reg.description,
                    authorName: reg.name,
                    rating: 4.8,
                    reviewsCount: 128,
                    totalVotes: 356,
                    image: reg.image
                  }}
                  onViewProject={() => onSelectRegion(reg.id)}
                />
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
