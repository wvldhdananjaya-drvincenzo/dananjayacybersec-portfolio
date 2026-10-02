import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Code, Sparkles } from 'lucide-react';
import { ProjectData } from './ProjectExactCard';

interface LReportModalProps {
  project: ProjectData;
  isOpen: boolean;
  onClose: () => void;
  voteCount: number;
  hasVoted: boolean;
  onVoteToggle: (e: React.MouseEvent) => void;
}

export default function LReportModal({
  project,
  isOpen,
  onClose,
}: LReportModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Format category badge text
  const categoryBadge = project.subtitle?.toUpperCase() || project.location?.toUpperCase() || "WEB3 SECURITY";
  const formattedDate = "July 15, 2026";

  const isPacketTracer = project.id.includes('packet') || project.title.toLowerCase().includes('packet');

  // Code snippet to display
  const codeSnippet = isPacketTracer 
    ? `! Cisco IOS Enterprise Core Switch & Router Config
hostname Core-Router-01
!
interface GigabitEthernet0/0/0
 description Trunk to ASA Firewall
 ip address 192.168.10.1 255.255.255.252
 ip ospf 1 area 0
!
interface GigabitEthernet0/0/1.10
 encapsulation dot1Q 10
 ip address 10.0.10.1 255.255.255.0
 ip helper-address 10.0.1.50
!
router ospf 1
 router-id 1.1.1.1
 log-adjacency-changes
 passive-interface default
 no passive-interface GigabitEthernet0/0/0
 network 10.0.0.0 0.255.255.255 area 0
!`
    : `// Vulnerable Read-Only Reentrancy target
contract Pool {
    mapping(address => uint) public balances;
    uint public totalSupply;

    function withdraw(uint amount) external {
        uint share = (amount * address(this).balance) / totalSupply;
        totalSupply -= amount;
        
        (bool success, ) = msg.sender.call{value: share}("");
        require(success, "Transfer failed");
        
        balances[msg.sender] -= amount;
    }

    function getSharePrice() external view returns (uint) {
        return address(this).balance / totalSupply;
    }
}`;

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2200);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    triggerToast("Code snippet copied to clipboard!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto">
        
        {/* Backdrop click to dismiss */}
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        {/* Modal Container: Clean White Surface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-white text-gray-900 rounded-[2rem] shadow-2xl overflow-hidden my-auto border border-gray-100 flex flex-col max-h-[92vh]"
        >
          {/* Toast Notification */}
          <AnimatePresence>
            {toastMsg && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-neutral-900 text-amber-400 font-mono text-xs font-bold rounded-full shadow-lg flex items-center gap-2 border border-amber-500/30"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>{toastMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal Header Bar */}
          <div className="px-7 sm:px-9 pt-7 sm:pt-8 pb-3 flex items-center justify-between shrink-0">
            {/* Category Pill Tag & Date */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#fff8e6] text-[#b45309] font-mono font-bold text-[11px] sm:text-xs rounded-md tracking-wider uppercase border border-amber-200/80">
                {categoryBadge}
              </span>
              <span className="text-gray-400 font-mono text-xs tracking-tight">
                {formattedDate}
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-gray-200/80 hover:bg-gray-100/80 flex items-center justify-center text-gray-600 hover:text-black transition-all cursor-pointer"
              title="Close L-Report"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body Content - Clean White Surface Typography */}
          <div className="px-7 sm:px-9 pb-8 overflow-y-auto space-y-6 text-gray-700 font-sans leading-relaxed text-sm sm:text-base">
            
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug font-sans pt-1">
              {isPacketTracer 
                ? "Packet Tracer Network Topology & ASA Firewall Architecture" 
                : project.title.includes("DeFi") ? project.title : `DeFi Security: EVM Reentrancy Beyond the CEI Pattern`}
            </h1>

            {/* Intro Paragraph */}
            <p className="text-gray-600 font-medium leading-relaxed">
              {isPacketTracer
                ? "This Cisco Packet Tracer laboratory defines an enterprise dual-homed network architecture. It validates multi-area OSPF routing convergence, 802.1Q inter-VLAN trunking, ASA firewall access control list policies, and NAT/PAT translation."
                : "Smart contract audits frequently verify the Checks-Effects-Interactions (CEI) pattern to prevent standard single-contract reentrancy. However, modern DeFi exploits increasingly leverage cross-contract and read-only reentrancy vectors."}
            </p>

            {/* Section 1 */}
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 font-sans tracking-tight">
                {isPacketTracer ? "### Network Architecture & Routing Topology" : "### The Read-Only Reentrancy Threat"}
              </h3>
              {isPacketTracer ? (
                <>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    The core backbone utilizes Cisco 2911 ISR routers configured with OSPF Area 0 and Area 10. Access layer switches enforce port security with MAC-limiting on VLAN 10 (Corporate), VLAN 20 (VoIP), and VLAN 99 (Management).
                  </p>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    Edge perimeter protection is provided by a Cisco ASA 5505 Firewall implementing stateful inspection, DMZ segment isolation, and dynamic NAT/PAT mapping for internal subnet translation.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    Read-only reentrancy occurs when a contract queries state from a pool while that pool is in an intermediate, unstable state during a withdrawal. The target pool's view function (e.g. <code className="bg-gray-100 text-gray-800 font-mono text-xs px-1.5 py-0.5 rounded border border-gray-200">`getSharePrice()`</code>) relies on <code className="bg-gray-100 text-gray-800 font-mono text-xs px-1.5 py-0.5 rounded border border-gray-200">`totalSupply`</code> and <code className="bg-gray-100 text-gray-800 font-mono text-xs px-1.5 py-0.5 rounded border border-gray-200">`address(this).balance`</code>.
                  </p>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    If <code className="bg-gray-100 text-gray-800 font-mono text-xs px-1.5 py-0.5 rounded border border-gray-200">`address(this).balance`</code> is reduced via ether transfer <em>*before*</em> <code className="bg-gray-100 text-gray-800 font-mono text-xs px-1.5 py-0.5 rounded border border-gray-200">`totalSupply`</code> is decremented, any contract relying on <code className="bg-gray-100 text-gray-800 font-mono text-xs px-1.5 py-0.5 rounded border border-gray-200">`getSharePrice()`</code> inside the fallback function will calculate a severely undervalued or overvalued share price, leading to instant oracle manipulation.
                  </p>
                </>
              )}
            </div>

            {/* Section 2 - Remediation / Implementation */}
            <div className="space-y-2 pt-1">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 font-sans tracking-tight">
                {isPacketTracer ? "### Security Enforcement Strategies" : "### Remediation Strategies"}
              </h3>
              <ol className="space-y-3 text-gray-600 font-medium list-none pl-0">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-gray-900 shrink-0">1.</span>
                  <span><strong className="text-gray-900 font-bold">{isPacketTracer ? "**Implement Port-Security & BPDU Guard.**" : "**Adhere strictly to the ERC-2981 and Check-Effects-Interactions patterns.**"}</strong> {isPacketTracer ? "Prevent rogue switch insertion by shutting down err-disabled ports violating maximum 2 MAC addresses per access port." : "Ensure all state variables (including aggregate pool parameters) are modified before executing any external transfer/call."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-gray-900 shrink-0">2.</span>
                  <span><strong className="text-gray-900 font-bold">{isPacketTracer ? "**Enforce ASA Stateful ACLs & DMZ Isolation.**" : "**Use OpenZeppelin's ReentrancyGuard.**"}</strong> {isPacketTracer ? "Restrict inbound traffic to DMZ public web servers on ports 80/443 while blocking direct DMZ-to-Internal LAN initiating connections." : "Even view functions can be protected by matching `nonReentrant` modifier logic or checking the lock state if necessary."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-gray-900 shrink-0">3.</span>
                  <span><strong className="text-gray-900 font-bold">{isPacketTracer ? "**Deploy IPsec Site-to-Site VPN Tunnels.**" : "**Integrate Chainlink's decentralized price feeds**"}</strong> {isPacketTracer ? "Secure inter-branch communications using AES-256 encryption and SHA-256 HMAC integrity checks." : "or TWAP (Time-Weighted Average Price) feeds to mitigate short-term oracle manipulation spikes."}</span>
                </li>
              </ol>
            </div>

            {/* Code Snippet Box */}
            <div className="bg-[#0e1118] rounded-2xl p-4 sm:p-5 font-mono text-xs sm:text-sm text-gray-200 shadow-xl border border-gray-800 mt-6 space-y-3">
              {/* Top bar inside code block */}
              <div className="flex items-center justify-between text-gray-400 text-xs border-b border-gray-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-amber-400" />
                  <span>{isPacketTracer ? "Cisco IOS / CLI Configuration" : "Payload / Code Snippet"}</span>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-gray-400 font-sans text-xs"
                >
                  {copiedCode ? (
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

              {/* Code display */}
              <pre className="overflow-x-auto leading-relaxed text-gray-300 font-mono text-[11px] sm:text-xs pt-1">
{codeSnippet}
              </pre>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
