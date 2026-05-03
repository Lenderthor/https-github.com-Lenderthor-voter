import { useRef, useState } from 'react';
import { useApp } from '../App';
import { motion } from 'motion/react';
import { Download, Award, ShieldCheck, Share2 } from 'lucide-react';

export function Certificate() {
  const { t, points } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [userName, setUserName] = useState('');
  const [generated, setGenerated] = useState(false);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 800, 600);

    // Border
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 20;
    ctx.strokeRect(10, 10, 780, 580);

    // Content
    ctx.textAlign = 'center';
    ctx.fillStyle = '#1e293b';
    
    ctx.font = 'bold 40px Inter';
    ctx.fillText('CERTIFICATE OF KNOWLEDGE', 400, 100);
    
    ctx.font = '24px Inter';
    ctx.fillText('This is safely awarded to', 400, 180);
    
    ctx.font = 'italic bold 48px Inter';
    ctx.fillStyle = '#4f46e5';
    ctx.fillText(userName || 'Voter Expert', 400, 260);

    ctx.fillStyle = '#1e293b';
    ctx.font = '20px Inter';
    ctx.fillText('for successfully completing the VoteSmart AI platform training', 400, 320);
    ctx.fillText('and demonstrating expertise in Indian democratic processes.', 400, 350);

    ctx.font = 'bold 30px Inter';
    ctx.fillText(`Points Earned: ${points}`, 400, 420);

    // Badge
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(400, 500, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Inter';
    ctx.fillText('SMART VOTER', 400, 505);

    const link = document.createElement('a');
    link.download = `VoteSmart_Certificate_${userName}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-10 shadow-2xl text-center">
        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-8 text-blue-600">
          <Award size={44} />
        </div>
        
        <h2 className="text-4xl font-black mb-4">{t.tools.certificate.title}</h2>
        <p className="text-slate-500 mb-10">You've learned enough to be a smart voter. Claim your digital badge!</p>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Enter your name..."
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setGenerated(false);
            }}
            className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-white/5 rounded-2xl focus:outline-none focus:border-blue-500 text-lg transition-all"
          />

          <div className="flex gap-4">
            <button
              onClick={() => {
                if (userName) setGenerated(true);
              }}
              disabled={!userName}
              className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              Generate Preview
            </button>
            <button
              onClick={download}
              disabled={!generated}
              className="px-6 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              <Download size={24} />
            </button>
          </div>
        </div>

        {generated && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-slate-100 dark:border-white/10"
          >
            <div className="border-4 border-blue-600 p-8 text-center bg-white dark:bg-slate-900">
              <ShieldCheck className="mx-auto text-blue-600 mb-4" size={32} />
              <h4 className="text-xl font-bold uppercase tracking-widest text-slate-800 dark:text-white mb-2 underline decoration-blue-600 decoration-4">Certificate</h4>
              <p className="text-sm opacity-60 mb-6 italic">Issued to</p>
              <p className="text-3xl font-black italic text-blue-600 mb-8">{userName}</p>
              <p className="text-xs font-bold uppercase opacity-40">Verified by VoteSmart AI • 2026</p>
            </div>
            <button 
              className="mt-6 flex items-center gap-2 text-blue-600 font-bold mx-auto hover:underline"
              onClick={() => alert("Shared to community board!")}
            >
              <Share2 size={18} /> Share your achievement
            </button>
          </motion.div>
        )}

        <canvas ref={canvasRef} width="800" height="600" className="hidden" />
      </div>
    </div>
  );
}
