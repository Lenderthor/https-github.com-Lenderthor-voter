/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, createContext, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Learn } from './components/Learn';
import { Chat } from './components/Chat';
import { Quiz } from './components/Quiz';
import { Timeline } from './components/Timeline';
import { VotingSimulator } from './components/VotingSimulator';
import { Language, translations } from './translations';
import { cn } from './lib/utils';
import { Sun, Moon } from 'lucide-react';

type View = 'home' | 'learn' | 'chat' | 'quiz' | 'timeline';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  isAccessible: boolean;
  setIsAccessible: (accessible: boolean) => void;
  currentView: View;
  setView: (view: View) => void;
  points: number;
  addPoints: (p: number) => void;
  t: typeof translations['en'];
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [isDark, setIsDark] = useState(false);
  const [isAccessible, setIsAccessible] = useState(false);
  const [currentView, setView] = useState<View>('home');
  const [points, setPoints] = useState(0);

  const addPoints = (p: number) => setPoints(prev => prev + p);

  const t = translations[language];

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <AppContext.Provider value={{ 
      language, setLanguage, 
      isDark, setIsDark, 
      isAccessible, setIsAccessible,
      currentView, setView, 
      points, addPoints,
      t 
    }}>
      <div className={cn(
        "min-h-screen transition-all duration-300 font-sans selection:bg-purple-500/30",
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900",
        isAccessible ? "text-xl" : "text-base"
      )}>
        {/* Background Gradient Accents */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] rounded-full bg-purple-500/20 blur-[120px]" />
          <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-indigo-500/10 blur-[100px]" />
        </div>

        <Navbar />

        <main className="relative pt-20 pb-12 px-4 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {currentView === 'home' && <Hero />}
              {currentView === 'learn' && <Learn />}
              {currentView === 'chat' && <Chat />}
              {currentView === 'quiz' && <Quiz />}
              {currentView === 'timeline' && <Timeline />}
            </motion.div>
          </AnimatePresence>
        </main>

        <VotingSimulator />

        {/* Global Floating Actions */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
          <div className="flex flex-col gap-2 items-end">
            <AnimatePresence>
              {points > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-4 py-2 rounded-xl bg-yellow-400 text-slate-900 font-black shadow-lg flex items-center gap-2"
                >
                   <span className="text-xs uppercase opacity-70">Voter Points:</span> {points}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex gap-2">
              <button
                onClick={() => setIsAccessible(!isAccessible)}
                className="p-3 rounded-full bg-white/20 dark:bg-slate-800/80 backdrop-blur-md shadow-lg border border-white/30 dark:border-white/10 hover:scale-110 transition-transform font-bold text-xs"
                title={t.bonus.accessibility}
              >
                {isAccessible ? "AA" : "A"}
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-3 rounded-full bg-white/20 dark:bg-slate-800/80 backdrop-blur-md shadow-lg border border-white/30 dark:border-white/10 hover:scale-110 transition-transform"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
              </button>
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="px-4 py-2 rounded-full bg-white/20 dark:bg-slate-800/80 backdrop-blur-md shadow-lg border border-white/30 dark:border-white/10 hover:scale-105 transition-transform font-medium text-sm"
              >
                {language === 'en' ? 'हिन्दी' : 'English'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}
