import { useApp } from '../App';
import { motion } from 'motion/react';
import { UserPlus, Fingerprint, MapPin, ClipboardCheck } from 'lucide-react';

const icons = [UserPlus, ClipboardCheck, MapPin, Fingerprint];

export function Learn() {
  const { t } = useApp();

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          {t.learn.title}
        </motion.h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Follow these simple steps to ensure you are ready for the upcoming elections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {t.learn.steps.map((step, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all shadow-xl shadow-slate-200/50 dark:shadow-none"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                <Icon size={28} />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-bold">
                  0{i + 1}
                </span>
                <h3 className="text-lg font-bold">{step.title}</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-20 p-8 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-4xl font-bold mb-4 italic">Register from your mobile in 5 mins!</h3>
          <p className="text-blue-100 mb-8 max-w-xl">
            You don't need to visit government offices anymore. Use the official NVSP portal or the Voter Helpline app.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:shadow-lg transition-shadow">
              Official Website
            </button>
            <button className="px-6 py-3 bg-blue-500/20 backdrop-blur-md border border-white/30 rounded-xl font-bold">
              Watch Tutorial
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}
