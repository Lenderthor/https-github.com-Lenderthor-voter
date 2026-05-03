import { useState } from 'react';
import { useApp } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, AlertTriangle, Search, Loader2, Sparkles, CheckCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../lib/utils';

export function FakeNewsDetector() {
  const { t, addPoints } = useApp();
  const [news, setNews] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ score: number; verdict: string; details: string } | null>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const analyzeNews = async () => {
    if (!news.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const prompt = `
        You are an Election Integrity AI.
        Analyze this news/text for potential election misinformation: "${news}"
        Return JSON format (nothing else): { "score": 0-100, "verdict": "Real" | "Suspicious" | "Fake", "details": "Explanation here..." }
        Score: 100 is definitely real, 0 is definitely fake.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const data = JSON.parse(response.text.replace(/```json|```/g, ''));
      setResult(data);
      if (data.verdict === 'Real' || data.verdict === 'Fake') {
        addPoints(5); // Reward for checking news
      }
    } catch (error) {
      console.error('Detector Error:', error);
      setResult({ score: 50, verdict: 'Suspicious', details: 'Unable to fully verify. Cross-check with official Election Commission website.' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-500/30"
          >
            <ShieldCheck size={32} />
          </motion.div>
          <h2 className="text-4xl font-black mb-4">{t.tools.detector.title}</h2>
          <p className="text-slate-500">Don't believe everything you read. Use AI to verify election news.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <textarea
            value={news}
            onChange={(e) => setNews(e.target.value)}
            placeholder={t.tools.detector.placeholder}
            className="w-full h-40 p-6 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all text-lg resize-none mb-6"
          />

          <div className="flex justify-center">
            <button
              onClick={analyzeNews}
              disabled={!news.trim() || isAnalyzing}
              className="flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {isAnalyzing ? <Loader2 className="animate-spin" size={24} /> : <Search size={22} />}
              {isAnalyzing ? "Analyzing..." : t.tools.detector.button}
            </button>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "mt-10 p-8 rounded-3xl border-2 flex flex-col md:flex-row gap-8 items-center",
                  result.verdict === 'Real' ? "bg-green-500/5 border-green-500/20" : 
                  result.verdict === 'Fake' ? "bg-red-500/5 border-red-500/20" : "bg-yellow-500/5 border-yellow-500/20"
                )}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={cn(
                    "w-24 h-24 rounded-full flex items-center justify-center border-4 shadow-xl",
                    result.verdict === 'Real' ? "border-green-500 bg-white text-green-500" : 
                    result.verdict === 'Fake' ? "border-red-500 bg-white text-red-500" : "border-yellow-500 bg-white text-yellow-500"
                  )}>
                    <span className="text-3xl font-black">{result.score}%</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-50">Reliability Score</span>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    {result.verdict === 'Real' ? <CheckCircle className="text-green-500" /> : <AlertTriangle className={result.verdict === 'Fake' ? "text-red-500" : "text-yellow-500"} />}
                    <h4 className={cn(
                      "text-2xl font-black",
                      result.verdict === 'Real' ? "text-green-600" : result.verdict === 'Fake' ? "text-red-600" : "text-yellow-600"
                    )}>
                      {result.verdict} Content
                    </h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    {result.details}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
