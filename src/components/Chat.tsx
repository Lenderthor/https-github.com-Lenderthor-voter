import { useState, useRef, useEffect } from 'react';
import { useApp } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Sparkles, Loader2, Volume2, Mic, MicOff } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export function Chat() {
  const { t, language, addPoints } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: t.chat.welcome }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech recognition not supported in this browser.");

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  const handleSend = async (forcedText?: string) => {
    const userMessage = forcedText || input.trim();
    if (!userMessage || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const prompt = `
        You are VoteSmart AI, an educational assistant for voters in India.
        Current language: ${language === 'hi' ? 'Hindi' : 'English'}.
        User asked: ${userMessage}
        Rules:
        - Keep answers short, helpful, and objective.
        - Encourage democratic participation.
        - If asked about specific political candidates, stay neutral.
        - Provide step-by-step guidance if asked "how to".
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      addPoints(1);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I'm having trouble connecting." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-[70vh] flex flex-col bg-white dark:bg-slate-900/50 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-white/10 bg-gradient-to-r from-blue-600/10 to-purple-600/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
            <Bot size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">{t.chat.title}</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Online Assistant</span>
            </div>
          </div>
        </div>
        <Sparkles size={20} className="text-purple-500" />
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-end gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
                msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'
              }`}>
                {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-blue-600 dark:text-blue-400" />}
              </div>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed relative group/msg ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-white/5 rounded-bl-none shadow-sm'
              }`}>
                <div className="markdown-body">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                {msg.role === 'bot' && (
                  <button 
                    onClick={() => speak(msg.content)}
                    className="absolute -right-10 top-0 p-1.5 opacity-0 group-hover/msg:opacity-100 transition-opacity hover:text-blue-500"
                  >
                    <Volume2 size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-end gap-3"
            >
              <div className="shrink-0 w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <Bot size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none border border-slate-100 dark:border-white/5 shadow-sm">
                <Loader2 className="animate-spin text-blue-600" size={16} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-6 bg-slate-50/50 dark:bg-black/20 border-t border-white/5">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative flex gap-2"
        >
          <div className="relative flex-1">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chat.placeholder}
              className="w-full pl-6 pr-14 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm shadow-inner"
            />
            <button
              type="button"
              onClick={startListening}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors",
                isListening ? "text-red-500 bg-red-500/10" : "text-slate-400 hover:text-blue-500"
              )}
            >
              {isListening ? <Mic size={20} /> : <MicOff size={20} />}
            </button>
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 transition-all active:scale-95 shadow-lg shadow-blue-500/30 shrink-0"
          >
            <Send size={24} />
          </button>
        </form>
        <p className="text-[10px] text-center mt-4 text-slate-400 uppercase tracking-widest font-bold">
          VoteSmart AI can make mistakes. Verify critical info.
        </p>
      </div>
    </div>
  );
}
