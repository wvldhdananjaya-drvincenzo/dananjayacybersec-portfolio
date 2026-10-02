import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ScrollReveal from './ScrollReveal';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Search, 
  Terminal, 
  X, 
  Code, 
  ShieldAlert, 
  Cpu, 
  TrendingUp, 
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: 'Web3 Security' | 'Active Directory' | 'DevSecOps' | 'Zero-Trust';
  icon: typeof Cpu;
  content: string;
  codeSnippet?: string;
  tags: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'evm-reentrancy',
    title: 'DeFi Security: EVM Reentrancy Beyond the CEI Pattern',
    summary: 'A deep dive into cross-contract and read-only reentrancy vectors that bypass traditional Checks-Effects-Interactions safeguards on EVM mainnet.',
    date: 'July 15, 2026',
    readTime: '8 min read',
    category: 'Web3 Security',
    icon: ShieldAlert,
    tags: ['Solidity', 'Smart Contracts', 'DeFi', 'Auditing'],
    codeSnippet: `// Vulnerable Read-Only Reentrancy target
contract Pool {
    mapping(address => uint) public balances;
    uint public totalPoolSupply;

    function withdraw(uint amount) external {
        require(balances[msg.sender] >= amount);
        balances[msg.sender] -= amount;
        
        // External call is made here before total supply is decremented!
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok);
        
        totalPoolSupply -= amount; // Effect after external call
    }

    // Helper used by external Oracles or contracts
    function getSharePrice() external view returns (uint) {
        return address(this).balance / totalPoolSupply;
    }
}`,
    content: `Smart contract audits frequently verify the Checks-Effects-Interactions (CEI) pattern to prevent standard single-contract reentrancy. However, modern DeFi exploits increasingly leverage cross-contract and read-only reentrancy vectors.

### The Read-Only Reentrancy Threat
Read-only reentrancy occurs when a contract queries state from a pool while that pool is in an intermediate, unstable state during a withdrawal. The target pool's view function (e.g. \`getSharePrice()\`) relies on \`totalPoolSupply\` and \`address(this).balance\`.

If \`address(this).balance\` is reduced via ether transfer *before* \`totalPoolSupply\` is decremented, any contract relying on \`getSharePrice()\` inside the fallback function will calculate a severely undervalued or overvalued share price, leading to instant oracle manipulation.

### Remediation Strategies
1. **Adhere strictly to the ERC-2981 and Check-Effects-Interactions patterns.** Ensure all state variables (including aggregate pool parameters) are modified before executing any external transfer/call.
2. **Use OpenZeppelin's ReentrancyGuard.** Even view functions can be protected by matching \`nonReentrant\` modifier logic or checking the lock state if necessary.
3. **Integrate Chainlink's decentralized price feeds** or TWAP (Time-Weighted Average Price) feeds to mitigate short-term oracle manipulation spikes.`
  },
  {
    id: 'active-directory-dcsync',
    title: 'DCSync Attacks: Defending Active Directory from Domain Replication Exploits',
    summary: 'How attackers leverage DS-Replication-Get-Changes-All permissions to dump NTDS.dit hashes, and the precise event logs to monitor.',
    date: 'June 28, 2026',
    readTime: '12 min read',
    category: 'Active Directory',
    icon: Terminal,
    tags: ['Pentesting', 'Active Directory', 'Windows', 'DCSync'],
    codeSnippet: `# Mimikatz execution command to perform DCSync
lsadump::dcsync /domain:danwick.local /user:administrator`,
    content: `DCSync is one of the most powerful techniques used by attackers during red team campaigns to achieve absolute domain persistence. Rather than exploiting vulnerabilities, it abuses legitimate Active Directory domain replication APIs.

### The Mechanics of Replication Abuse
In AD environments, Domain Controllers (DCs) synchronize partition data using the Directory Replication Service Remote Protocol (MS-DRSR). Any account granted the following directory access rights can simulate a Domain Controller replication request:
- \`DS-Replication-Get-Changes\`
- \`DS-Replication-Get-Changes-All\`
- \`DS-Replication-Get-Changes-In-Filtered-Set\` (optional)

When executed, an attacker can dump credentials (including NTLM hashes and Kerberos keys) for the \`krbtgt\` account or Domain Admins without touching the actual \`NTDS.dit\` file or running process memory.

### Active Detection & Prevention
- **Audit Domain Access Control Lists (ACLs):** Periodically scan and verify that only domain controller computer accounts possess the replication permissions on the domain object.
- **Monitor Event Logs:** Look for Security Event ID \`4662\` (Operation performed on an object) where the properties parameter contains the MS-DRSR rights GUIDs:
  - \`1131f6aa-9c07-11d1-f79f-00c04fc2dcd2\` (Get-Changes-All)
  - \`1131f6ad-9c07-11d1-f79f-00c04fc2dcd2\` (Get-Changes)`
  },
  {
    id: 'zero-trust-kubernetes',
    title: 'Zero-Trust Architecture in Kubernetes Workloads',
    summary: 'Implementing least-privilege IAM roles, Pod Security Standards, and automated mTLS service meshes to prevent lateral movement.',
    date: 'May 14, 2026',
    readTime: '10 min read',
    category: 'Zero-Trust',
    icon: Cpu,
    tags: ['Kubernetes', 'Cloud Security', 'DevSecOps', 'mTLS'],
    codeSnippet: `# Secure Kubernetes NetworkPolicy restricting lateral movement
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: secure-backend
spec:
  podSelector: {}
  policyTypes:
  - Ingress`,
    content: `Migrating to a containerized infrastructure requires shifting from perimeter-based security to a Zero-Trust Model. In Kubernetes (K8s), a compromise in one container should never translate to immediate cluster administrative control.

### Core Implementation Steps
1. **Network Policies by Default:** Kubenet or Cilium should be configured with a default-deny ingress/egress policy. Only explicitly declared connections should be authorized.
2. **IAM Role Binding (IRSA):** Never use static node instance credentials. Use IAM Roles for Service Accounts (IRSA) on AWS or Workload Identity on GCP to inject temporary scoped tokens directly into containers.
3. **Pod Security Standards:** Mandate the \`restricted\` pod security profile. Disable privilege escalation, drop root capabilities (\`runAsNonRoot: true\`), and use read-only root filesystems.

### Securing Container-to-Container Communications
By integrating a lightweight service mesh like Linkerd or Istio, you enforce automated mutual TLS (mTLS) with cryptographically validated workload identities, protecting intra-cluster traffic from eavesdropping and spoofing.`
  }
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(code);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setEmailSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setEmailSubscribed(false), 4000);
    }
  };

  const categories = ['All', 'Web3 Security', 'Active Directory', 'DevSecOps', 'Zero-Trust'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 font-sans pt-32 sm:pt-40 pb-24 relative overflow-hidden select-none">
      {/* Background Ornaments */}
      <div className="absolute top-40 left-[-10%] w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-[-10%] w-96 h-96 rounded-full bg-amber-600/5 blur-[120px] pointer-events-none" />

      {/* Hero header */}
      <div className="relative bg-white border-b border-gray-100 py-16 sm:py-20 text-gray-950 flex flex-col items-center justify-center text-center mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-100/80 border border-neutral-200 rounded-full text-xs font-mono font-semibold tracking-[0.25em] uppercase text-neutral-800 shadow-sm">
            <span className="text-amber-500 font-bold">✦</span> SECURITY LOGS & WRITEUPS
          </span>
            
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-cal font-black tracking-tighter text-black uppercase select-none leading-none">
              Research
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 font-sans tracking-wide max-w-2xl leading-relaxed">
              Technical papers, threat emulation writeups, and smart contract audits
            </p>

            <button
              onClick={() => {
                const el = document.getElementById('articles-list');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-black hover:bg-amber-500 text-white hover:text-black text-xs md:text-sm font-sans font-extrabold uppercase tracking-widest rounded-full transition-all shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.3)] hover:scale-[1.02] cursor-pointer"
            >
              <span>Read Articles</span>
              <span className="text-base font-semibold">↗</span>
            </button>
          </div>
        </div>

      <div id="articles-list" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-b border-gray-200 pb-6">
          <div className="relative max-w-md w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search by title, technology or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs border border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-xs"
            />
          </div>

          {/* Categories Horizontal Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all cursor-pointer ${
                  selectedCategory === category 
                    ? 'bg-gray-950 text-white font-bold' 
                    : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => {
              const PostIcon = post.icon;
              return (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-gray-200/80 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-amber-400/40 transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-md">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1 max-w-[70%]">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[9px] font-mono text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedPost(post)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-gray-900 hover:text-amber-600 cursor-pointer group"
                    >
                      <span>Read File</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <div className="col-span-full py-16 text-center space-y-3 bg-white border border-gray-150 rounded-3xl">
              <Terminal className="w-10 h-10 text-gray-300 mx-auto" />
              <p className="text-sm font-mono text-gray-500">No matching logs found.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="text-xs text-amber-600 underline font-mono cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Sticky Threat Advisory Newsletter Box */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="bg-gray-950 text-white rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-7 space-y-3">
              <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded border border-amber-500/25">
                <TrendingUp className="w-3.5 h-3.5" /> Threat Advisories
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-white">
                Subscribe to zero-day threat patches
              </h2>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Receive detailed, pre-disclosure security logs and smart contract patch guidelines straight to your mailbox. No promotional tracking.
              </p>
            </div>

            <div className="md:col-span-5">
              {emailSubscribed ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-3 text-emerald-300 animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-xs font-mono">Subscription secure. Welcome!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 bg-white/5 p-1.5 rounded-full border border-white/10 focus-within:ring-1 focus-within:ring-white/20 transition-all">
                  <input
                    type="email"
                    required
                    placeholder="agent@zero-trust.io"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-transparent border-none text-white text-xs pl-3.5 focus:outline-none placeholder-gray-500 min-w-0"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white hover:bg-neutral-100 text-black text-[11px] font-mono font-bold uppercase rounded-full transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        </ScrollReveal>

      </div>

      {/* Reader Modal / Full Article View */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-gray-950/70 backdrop-blur-md"
            />

            {/* Modal body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gray-200 rounded-[2rem] max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative z-10 flex flex-col"
            >
              {/* Header block with close button */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 sm:px-8 py-5 flex items-center justify-between z-25">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2 py-0.5 rounded">
                    {selectedPost.category}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">{selectedPost.date}</span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 border border-gray-150 flex items-center justify-center text-gray-500 hover:text-black transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Core Content */}
              <div className="p-6 sm:p-8 space-y-6">
                <h2 className="text-2xl sm:text-3xl font-sans font-bold text-gray-900 tracking-tight leading-tight">
                  {selectedPost.title}
                </h2>

                <div className="text-sm text-gray-600 font-light leading-relaxed whitespace-pre-wrap font-sans space-y-4">
                  {selectedPost.content}
                </div>

                {/* Optional copyable Code Block */}
                {selectedPost.codeSnippet && (
                  <div className="bg-gray-950 rounded-2xl overflow-hidden border border-white/5 space-y-2 mt-6">
                    <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5 text-[10px] font-mono text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Code className="w-3.5 h-3.5 text-amber-400" />
                        <span>Payload / Code Snippet</span>
                      </div>
                      <button
                        onClick={() => handleCopyCode(selectedPost.codeSnippet!)}
                        className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedSnippet === selectedPost.codeSnippet ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-[11px] font-mono text-neutral-300 leading-relaxed max-h-60">
                      <code>{selectedPost.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4">
                  {selectedPost.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-mono text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer action */}
              <div className="border-t border-gray-100 p-6 bg-gray-50/50 flex justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-2.5 bg-gray-950 hover:bg-amber-500 text-white hover:text-gray-950 text-xs font-mono font-bold uppercase rounded-full transition-all cursor-pointer"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
