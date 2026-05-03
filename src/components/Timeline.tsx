import { useApp } from '../App';
import { motion } from 'motion/react';
import { Calendar, UserCheck, Megaphone, CheckSquare, BarChart2 } from 'lucide-react';

const phases = [
  {
    icon: UserCheck,
    title: { en: 'Registration Phase', hi: 'पंजीकरण चरण' },
    date: { en: 'January - March', hi: 'जनवरी - मार्च' },
    color: 'bg-blue-500',
    desc: { en: 'New voters can register and existing voters can update their details.', hi: 'नए मतदाता पंजीकरण कर सकते हैं और मौजूदा मतदाता अपना विवरण अपडेट कर सकते हैं।' }
  },
  {
    icon: Megaphone,
    title: { en: 'Campaign Period', hi: 'अभियान की अवधि' },
    date: { en: 'April', hi: 'अप्रैल' },
    color: 'bg-purple-500',
    desc: { en: 'Political parties share their vision and manifestos with the public.', hi: 'राजनीतिक दल जनता के साथ अपना दृष्टिकोण और घोषणापत्र साझा करते हैं।' }
  },
  {
    icon: CheckSquare,
    title: { en: 'Election Day', hi: 'चुनाव का दिन' },
    date: { en: 'May 10', hi: '10 मई' },
    color: 'bg-indigo-500',
    desc: { en: 'The main event - voters cast their ballot at polling booth.', hi: 'मुख्य कार्यक्रम - मतदाता मतदान केंद्र पर अपना मत डालते हैं।' }
  },
  {
    icon: BarChart2,
    title: { en: 'Result Day', hi: 'परिणाम का दिन' },
    date: { en: 'June 4', hi: '4 जून' },
    color: 'bg-pink-500',
    desc: { en: 'Votes are counted and the winners are announced.', hi: 'वोटों की गिनती होती है और विजेताओं की घोषणा की जाती है।' }
  }
];

export function Timeline() {
  const { language, t } = useApp();

  return (
    <div className="py-12 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          {t.timeline.title}
        </motion.h2>
        <p className="text-slate-600 dark:text-slate-400">Important dates for the 2026 General Elections.</p>
      </div>

      <div className="relative">
        {/* Continuous Line */}
        <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 rounded-full" />

        <div className="space-y-12">
          {phases.map((phase, i) => {
            const Icon = phase.icon;
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={i % 2 === 0 ? "flex md:flex-row-reverse items-center" : "flex items-center"}
              >
                {/* Left side (Desktop) */}
                <div className="hidden md:block md:w-1/2 px-8" />

                {/* Center Circle */}
                <div className="z-10 w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border-4 border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-lg">
                  <div className={`w-full h-full rounded-xl ${phase.color} shadow-lg flex items-center justify-center text-white`}>
                    <Icon size={24} />
                  </div>
                </div>

                {/* Right side (Desktop) / Main side (Mobile) */}
                <div className="w-full md:w-1/2 px-8">
                  <div className="p-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                       <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-lg ${phase.color} bg-opacity-20 text-white mb-2`}>
                        {phase.date[language]}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{phase.title[language]}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {phase.desc[language]}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-2 p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-full pr-6">
          <div className="p-3 bg-white dark:bg-slate-700 rounded-full shadow-sm">
            <Calendar size={20} className="text-blue-500" />
          </div>
          <span className="text-sm font-medium">Add to Google Calendar for alerts</span>
        </div>
      </div>
    </div>
  );
}
