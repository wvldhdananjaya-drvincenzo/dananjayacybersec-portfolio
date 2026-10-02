import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Compass, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { Destination } from '../types';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinations: Destination[];
  onSelectDestination: (id: string) => void;
}

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    value: string;
    description: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What is your primary security concern?",
    options: [
      { text: "Active Directory & Lateral Privesc Paths", value: "coastal", description: "Securing domain controllers, removing delegation paths, and hardening forest trusts." },
      { text: "Smart Contract Vulnerabilities & DeFi Exploits", value: "culture", description: "Validating EVM math operations, auditing compiler versions, and verifying bridge protocols." },
      { text: "Physical Facility Covert Access & Badges", value: "wilderness", description: "Simulating physical breaches, RFID cloning, and implanting hardware drops." }
    ]
  },
  {
    id: 2,
    text: "How would you prefer to coordinate the campaign?",
    options: [
      { text: "Coordinated Red Team Engagement", value: "open", description: "Full-scale adversary emulation targeting active corporate endpoints and infrastructure." },
      { text: "Isolated Static Architecture Review", value: "private", description: "Manual source code audits, threat modeling workshops, and GPO parameter reviews." },
      { text: "Flexible Continuous Retainer Basis", value: "flexible", description: "Continuous on-demand security testing as your systems evolve month-to-month." }
    ]
  },
  {
    id: 3,
    text: "Which environment represents your largest attack surface?",
    options: [
      { text: "Multi-Cloud Workloads & Kubernetes Clusters", value: "hills", description: "Hardening public cloud infrastructure, container registries, and IAM policies." },
      { text: "Hybrid Remote Workers & Wi-Fi Access Points", value: "coast", description: "Enterprise dual-band WPA3 perimeters and remote VPN endpoint perimeters." },
      { text: "Legacy Enterprise Forests & On-Premises Domain Controllers", value: "wetlands", description: "Massive Active Directory infrastructures and complex internal trust networks." }
    ]
  }
];

export default function QuizModal({ isOpen, onClose, destinations, onSelectDestination }: QuizModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Destination | null>(null);

  if (!isOpen) return null;

  const handleAnswer = (val: string) => {
    const nextAnswers = [...answers, val];
    setAnswers(nextAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate match
      const matchedDest = calculateMatch(nextAnswers);
      setResult(matchedDest);
    }
  };

  const calculateMatch = (ans: string[]): Destination => {
    // Basic heuristic mapping
    // ans[0] matches coastal -> galle-coastal, culture -> cultural-triangle, wilderness -> wild-safari
    // ans[2] matches hills -> scenic-hills, coast -> wild-safari/galle-coastal, wetlands -> cultural-triangle
    const coastalScore = (ans[0] === 'coastal' ? 2 : 0) + (ans[2] === 'coast' ? 2 : 0);
    const cultureScore = (ans[0] === 'culture' ? 2 : 0) + (ans[2] === 'wetlands' ? 2 : 0);
    const wildScore = (ans[0] === 'wilderness' ? 2 : 0) + (ans[2] === 'coast' ? 1 : 0);
    const hillsScore = (ans[2] === 'hills' ? 3 : 0);

    const max = Math.max(coastalScore, cultureScore, wildScore, hillsScore);

    if (max === coastalScore) {
      return destinations.find(d => d.id === 'galle-coastal') || destinations[3] || destinations[0];
    } else if (max === cultureScore) {
      return destinations.find(d => d.id === 'cultural-triangle') || destinations[0];
    } else if (max === wildScore) {
      return destinations.find(d => d.id === 'wild-safari') || destinations[1] || destinations[0];
    } else {
      return destinations.find(d => d.id === 'scenic-hills') || destinations[2] || destinations[0];
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  const handleRevealMatch = () => {
    if (result) {
      onSelectDestination(result.id);
      onClose();
    }
  };

  return (
    <div id="quiz-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden font-sans border border-gray-100"
      >
        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-blue-500 to-indigo-600" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-amber-600 font-mono text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span>Scope Matchmaker</span>
                </div>

                <div>
                  <h3 className="text-2xl font-display font-bold text-gray-900 leading-tight">
                    {QUESTIONS[currentStep].text}
                  </h3>
                  <div className="flex gap-1 mt-2">
                    {QUESTIONS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          i <= currentStep ? 'bg-amber-500' : 'bg-gray-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {QUESTIONS[currentStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt.value)}
                      className="w-full text-left p-4 rounded-2xl border border-gray-200 hover:border-amber-500 hover:bg-amber-50/40 group transition-all duration-200 flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full border border-gray-300 group-hover:border-amber-500 group-hover:bg-amber-500 flex items-center justify-center text-white text-xs font-semibold shrink-0 transition-colors mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 group-hover:text-amber-950 transition-colors">
                          {opt.text}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {opt.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-400 font-mono">
                    Step {currentStep + 1} of {QUESTIONS.length}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-6 text-center py-4"
              >
                <div className="inline-flex p-3 bg-amber-50 text-amber-600 rounded-full">
                  <Award className="w-10 h-10 animate-bounce" />
                </div>

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest font-mono text-amber-600 font-bold">Your Optimal SecOps Scope is Found!</p>
                  <h3 className="text-3xl font-display font-bold text-gray-900">
                    {result.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-500 flex items-center justify-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-blue-500" />
                    {result.location}
                  </p>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-[16:10] shadow-lg max-w-sm mx-auto group">
                  <img
                    src={result.image}
                    alt={result.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="bg-amber-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      {result.category}
                    </span>
                    <p className="text-white text-xs font-medium mt-1.5 opacity-90 line-clamp-2">
                      {result.description}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Based on your parameters, you require dedicated threat emulation, architecture hardening, and robust secure blueprints. Let's build a highly tailored campaign to defend your perimeters.
                </p>

                <div className="flex gap-3 justify-center pt-2">
                  <button
                    onClick={resetQuiz}
                    className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors cursor-pointer"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={handleRevealMatch}
                    className="px-6 py-2.5 rounded-full bg-gray-900 text-white hover:bg-amber-600 hover:text-white text-sm font-medium transition-all shadow-md flex items-center gap-2 group cursor-pointer"
                  >
                    <span>View Matching Engagement</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
