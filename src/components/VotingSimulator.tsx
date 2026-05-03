import { useState } from 'react';
import { useApp } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { Vote, X, Check, Fingerprint, Info, BarChart2 } from 'lucide-react';

export function VotingSimulator() {
  const { t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0); // 0: Start, 1: Selection, 2: Confirmation, 3: Success

  const handleVote = () => {
    setStep(2);
    setTimeout(() => {
      setStep(3);
    }, 1500);
  };

  const reset = () => {
    setStep(0);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 p-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl shadow-green-500/30 flex items-center gap-2 hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <Vote size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="font-bold pr-2">{t.bonus.voteSim}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={reset}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-white/20"
            >
              <button 
                onClick={reset}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="p-10 border-b border-slate-100 dark:border-white/5 bg-gradient-to-b from-slate-50 dark:from-white/5 to-transparent">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-xl text-green-600">
                    <Vote size={24} />
                  </div>
                  {t.bonus.voteSim}
                </h3>
                <p className="text-slate-500 text-sm mt-2">Experimental Simulation. Does not cast a real vote.</p>
              </div>

              <div className="p-10">
                {step === 0 && (
                  <div className="text-center space-y-6">
                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800/30 flex items-start gap-4 text-left">
                      <Info className="text-blue-600 shrink-0 mt-1" />
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        This simulator will walk you through the experience of using an Electronic Voting Machine (EVM). It's simple and fast!
                      </p>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-lg hover:shadow-xl transition-all"
                    >
                      Enter Booth
                    </button>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <p className="font-bold text-slate-500 mb-6 uppercase tracking-widest text-xs">Select your candidate</p>
                    {[
                      { name: 'Future Progress Party', symbol: '🚀' },
                      { name: 'Unity & Harmony Alliance', symbol: '🕊️' },
                      { name: 'Green Earth Council', symbol: '🌳' },
                      { name: 'Digital Rights Front', symbol: '💻' },
                    ].map((c, i) => (
                      <button
                        key={i}
                        onClick={handleVote}
                        className="w-full p-6 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-transparent hover:border-blue-500 hover:bg-white dark:hover:bg-slate-800 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{c.symbol}</span>
                          <span className="font-bold">{c.name}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-blue-500 transition-colors" />
                      </button>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-col items-center justify-center py-12 space-y-8">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-blue-500/40"
                    >
                      <Fingerprint size={48} />
                    </motion.div>
                    <div className="text-center">
                      <h4 className="text-2xl font-black mb-2">Processing Vote...</h4>
                      <p className="text-slate-500">Wait for the beep sound from the EVM.</p>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-2xl shadow-green-500/40"
                    >
                      <Check size={40} strokeWidth={4} />
                    </motion.div>
                    <h4 className="text-3xl font-black mb-2">Voted Successfully!</h4>
                    <p className="text-slate-500 text-sm mb-8 italic">Your choice was recorded in this demo simulation.</p>
                    
                    {/* Results Visualization */}
                    <div className="w-full space-y-4 mb-8 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem] border border-slate-100 dark:border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest opacity-50">Global Simulation Trends</span>
                        <BarChart2 size={16} className="text-blue-500" />
                      </div>
                      {[
                        { name: 'Future Progress', color: 'bg-blue-500', pct: 45 },
                        { name: 'Unity Alliance', color: 'bg-purple-500', pct: 30 },
                        { name: 'Green Earth', color: 'bg-green-500', pct: 25 },
                      ].map((item, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold">
                            <span>{item.name}</span>
                            <span>{item.pct}%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${item.pct}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              className={`h-full ${item.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep(1)}
                        className="px-6 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-sm"
                      >
                         Vote Again
                      </button>
                      <button
                        onClick={reset}
                        className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
