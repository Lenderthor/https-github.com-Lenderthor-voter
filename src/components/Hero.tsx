import { useState } from 'react';
import { useApp } from '../App';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Bot } from 'lucide-react';
import { cn } from '../lib/utils';
import { FakeNewsDetector } from './FakeNewsDetector';
import { MapSection } from './MapSection';
import { Certificate } from './Certificate';

export function Hero() {
  const { setView, t, addPoints } = useApp();
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center text-center pt-12 md:pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8"
      >
        <Zap size={16} fill="currentColor" />
        <span>New: 2026 Election Guide & AI Persona Modes</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl"
      >
        {t.hero.title} <br className="hidden md:block" />
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Empowered & AI-Guided
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl"
      >
        {t.hero.subtitle} Pick your path or ask our AI.
      </motion.p>

      {/* Persona Selection */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {[
          { id: 'student', label: t.tools.persona.student, color: 'hover:border-blue-500' },
          { id: 'first', label: t.tools.persona.first, color: 'hover:border-purple-500' },
          { id: 'senior', label: t.tools.persona.senior, color: 'hover:border-indigo-500' },
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedPersona(p.id);
              addPoints(2);
            }}
            className={cn(
              "px-6 py-3 rounded-2xl border-2 transition-all font-bold backdrop-blur-md",
              selectedPersona === p.id 
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-xl" 
                : "bg-white/40 dark:bg-white/5 border-white/20 dark:border-white/10 " + p.color
            )}
          >
            {p.label}
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 mb-20"
      >
        <button
          onClick={() => setView('learn')}
          className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-bold text-xl transition-all shadow-2xl shadow-blue-500/25 flex items-center gap-2"
        >
          {t.hero.cta}
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => setView('chat')}
          className="px-10 py-5 bg-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 rounded-[2rem] font-bold text-xl transition-all flex items-center gap-3"
        >
          <Bot size={24} />
          Talk to AI
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-6xl space-y-24 mt-20"
      >
        {/* Core Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <CheckCircle2 className="text-green-500" />, title: "Verified Info", desc: "Sourced directly from official commission data." },
            { icon: <ShieldCheck className="text-blue-500" />, title: "Fake News Detector", desc: "Use our AI tool below to verify any news string." },
            { icon: <Zap className="text-purple-500" />, title: "Gamified Learning", desc: "Earn points and badges as you learn to vote." },
          ].map((feat, i) => (
            <div key={i} className="p-8 bg-white/40 dark:bg-white/5 backdrop-blur-lg border border-white/40 dark:border-white/10 rounded-3xl text-left hover:translate-y-[-4px] transition-transform shadow-xl">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 w-fit rounded-2xl mb-4">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </section>

        {/* New Advanced Tools */}
        <FakeNewsDetector />
        <MapSection />
        <Certificate />
      </motion.div>
    </div>
  );
}
