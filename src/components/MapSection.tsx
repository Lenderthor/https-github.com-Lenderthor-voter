import { useState } from 'react';
import { useApp } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Info, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const states = [
  { id: 'dl', name: 'Delhi', phase: 1, seats: 7, history: 'High voter turnout in urban areas.' },
  { id: 'mh', name: 'Maharashtra', phase: 2, seats: 48, history: 'Mixed urban-rural demographics.' },
  { id: 'up', name: 'Uttar Pradesh', phase: 3, seats: 80, history: 'Crucial for general election results.' },
  { id: 'tn', name: 'Tamil Nadu', phase: 1, seats: 39, history: 'Strong regional party presence.' },
  { id: 'wb', name: 'West Bengal', phase: 4, seats: 42, history: 'Intense election cycles.' },
  { id: 'ka', name: 'Karnataka', phase: 2, seats: 28, history: 'Key southern battleground.' },
];

export function MapSection() {
  const { t } = useApp();
  const [selectedState, setSelectedState] = useState(states[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStates = states.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3 space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">{t.tools.map.title}</h2>
            <p className="text-slate-500 text-sm">{t.tools.map.desc}</p>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search State..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div className="grid gap-2 max-h-80 overflow-y-auto pr-2 scrollbar-thin">
            {filteredStates.map((state) => (
              <button
                key={state.id}
                onClick={() => setSelectedState(state)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl transition-all border",
                  selectedState?.id === state.id 
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg" 
                    : "bg-white dark:bg-slate-900 border-slate-100 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                )}
              >
                <span className="font-bold">{state.name}</span>
                <ChevronRight size={16} className={selectedState?.id === state.id ? "opacity-100" : "opacity-30"} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedState?.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 border border-blue-200 dark:border-blue-800">
                  <MapPin size={32} />
                </div>
                <div>
                  <h3 className="text-4xl font-black">{selectedState?.name}</h3>
                  <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">Election Profile</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl">
                  <span className="block text-xs font-bold text-slate-400 uppercase mb-2">Total Seats</span>
                  <span className="text-4xl font-black text-blue-600">{selectedState?.seats}</span>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl">
                  <span className="block text-xs font-bold text-slate-400 uppercase mb-2">Voter Phase</span>
                  <span className="text-4xl font-black text-purple-600">Phase {selectedState?.phase}</span>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl col-span-2 md:col-span-1">
                  <span className="block text-xs font-bold text-slate-400 uppercase mb-2">Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-bold text-green-600">Active</span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-blue-600/5 border border-blue-600/10 rounded-3xl flex gap-4">
                <Info className="text-blue-600 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Historical Context</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {selectedState?.history} Election trends here rely heavily on local awareness campaigns and youth participation.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Decorative background circle */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </div>
  );
}
