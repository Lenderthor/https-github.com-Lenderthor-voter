import { useApp } from '../App';
import { cn } from '../lib/utils';
import { Vote, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { currentView, setView, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'learn', label: t.nav.learn },
    { id: 'chat', label: t.nav.chat },
    { id: 'quiz', label: t.nav.quiz },
    { id: 'timeline', label: t.nav.timeline },
  ] as const;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl px-6 py-3 shadow-2xl">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setView('home')}
        >
          <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg group-hover:rotate-12 transition-transform shadow-lg">
            <Vote className="text-white" size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            VoteSmart AI
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                currentView === item.id 
                  ? "bg-blue-600/10 text-blue-600 dark:text-blue-400 dark:bg-blue-400/10" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-white/5"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600 dark:text-slate-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-24 left-6 right-6 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl flex flex-col gap-2 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setIsOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl text-md font-medium transition-colors",
                currentView === item.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
