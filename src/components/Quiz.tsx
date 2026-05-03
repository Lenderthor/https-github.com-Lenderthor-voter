import { useState } from 'react';
import { useApp } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const questions = [
  {
    q: { en: 'What is the minimum age to vote in India?', hi: 'भारत में मतदान के लिए न्यूनतम आयु क्या है?' },
    options: { en: ['16', '18', '21', '25'], hi: ['16', '18', '21', '25'] },
    answer: 1
  },
  {
    q: { en: 'Which ID is primarily used for voting in India?', hi: 'भारत में मतदान के लिए मुख्य रूप से किस आईडी का उपयोग किया जाता है?' },
    options: { en: ['PAN Card', 'Student ID', 'Voter ID (EPIC)', 'Ration Card'], hi: ['पैन कार्ड', 'छात्र आईडी', 'वोटर आईडी (ईपीआईसी)', 'राशन कार्ड'] },
    answer: 2
  },
  {
    q: { en: 'How often are General Elections held in India?', hi: 'भारत में आम चुनाव कितने अंतराल पर होते हैं?' },
    options: { en: ['Every 3 years', 'Every 4 years', 'Every 5 years', 'Every 6 years'], hi: ['हर 3 साल में', 'हर 4 साल में', 'हर 5 साल में', 'हर 6 साल में'] },
    answer: 2
  },
  {
    q: { en: 'What does EVM stand for?', hi: 'EVM का पूर्ण रूप क्या है?' },
    options: { en: ['Electronic Vote Machine', 'Every Vote Matters', 'Electronic Voting Machine', 'Election Verification Method'], hi: ['इलेक्ट्रॉनिक वोट मशीन', 'एवरी वोट मैटर्स', 'इलेक्ट्रॉनिक वोटिंग मशीन', 'इलेक्शन वेरिफिकेशन मेथड'] },
    answer: 2
  },
  {
    q: { en: 'Who is the constitutional head of the Election Commission?', hi: 'चुनाव आयोग का संवैधानिक प्रमुख कौन होता है?' },
    options: { en: ['Prime Minister', 'President', 'Chief Election Commissioner', 'Speaker'], hi: ['प्रधान मंत्री', 'राष्ट्रपति', 'मुख्य चुनाव आयुक्त', 'अध्यक्ष'] },
    answer: 2
  }
];

export function Quiz() {
  const { t, language, addPoints } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (showAnswer) return;
    setSelectedOption(idx);
    setShowAnswer(true);
    if (idx === questions[currentStep].answer) {
      setScore(prev => prev + 1);
      addPoints(10);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScore(0);
    setSelectedOption(null);
    setIsFinished(false);
    setShowAnswer(false);
  };

  if (isFinished) {
    return (
      <div className="max-w-xl mx-auto py-12 px-8 flex flex-col items-center text-center bg-white dark:bg-slate-900 shadow-2xl rounded-[3rem] border border-white/20 dark:border-white/10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mb-8 shadow-xl"
        >
          <Trophy size={48} className="text-white" />
        </motion.div>
        <h2 className="text-4xl font-bold mb-4">{t.quiz.score}</h2>
        <div className="text-6xl font-black mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {score} / {questions.length}
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">
          {score === questions.length ? "Perfect! You're a VoteSmart Pro!" : "Great effort! Learn more to get a perfect score."}
        </p>
        <button
          onClick={resetQuiz}
          className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25"
        >
          <RotateCcw size={20} />
          {t.quiz.restart}
        </button>
      </div>
    );
  }

  const qData = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">{t.quiz.title}</h2>
          <span className="text-sm font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
            Question {currentStep + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-10 leading-tight">
            {qData.q[language]}
          </h3>

          <div className="grid gap-4">
            {qData.options[language].map((opt, i) => {
              const isCorrect = i === qData.answer;
              const isSelected = i === selectedOption;
              const stateClass = showAnswer
                ? isCorrect 
                  ? "bg-green-500/10 border-green-500 text-green-700 dark:text-green-400"
                  : isSelected 
                    ? "bg-red-500/10 border-red-500 text-red-700 dark:text-red-400"
                    : "opacity-50 grayscale border-slate-200 dark:border-white/5"
                : isSelected
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-100 dark:border-white/10";

              return (
                <button
                  key={i}
                  disabled={showAnswer}
                  onClick={() => handleOptionSelect(i)}
                  className={cn(
                    "w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group",
                    stateClass
                  )}
                >
                  <span className="font-medium text-lg">{opt}</span>
                  {showAnswer && (
                    isCorrect ? <CheckCircle2 className="text-green-500" /> : isSelected ? <XCircle className="text-red-500" /> : null
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 flex justify-end"
              >
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  {t.quiz.next}
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
