import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What happens if I cheat or fake completing a task?",
    answer: "While failing a task is perfectly fine—failure is just a stepping stone to leveling up—cheating is strictly forbidden. If you attempt to mark a quest as complete without actually putting in the work, the Forge Guard will detect the deception and issue a formal warning. If you accumulate 3 warnings for faking your progress, your access to the System will be completely suspended. You cannot cheat your way to real-world stats."
  },
  {
    question: "Can I register custom, real-time tasks?",
    answer: "Yes, you can register any meaningful task that challenges you or provides productive \"friction.\" Our smart Forge Guard evaluates the difficulty of your tasks based on your personal potential and assigns them appropriate ranks. Whether it’s running, studying, cooking, or meditating—if an activity makes your life better, you can turn it into a quest."
  },
  {
    question: "Is the app free to use?",
    answer: "Yes, the app is completely free to use. While premium billing tiers may be introduced in the future, the core leveling experience is free right now."
  },
  {
    question: "What exactly is the Accountability Mentor?",
    answer: "If you are familiar with Solo Leveling, you know how the \"System\" guided Sung Jinwoo—it forced him to complete tasks, analyzed his weaknesses, and celebrated his milestones. Our Accountability Mentor serves that exact same purpose in the real world. It acts as your personal \"System,\" analyzing your weak points and actively pushing you past your limits to ensure you don't fail your daily quests."
  },
  {
    question: "What are the core features of the app?",
    answer: "Our features are built to bridge the gap between self-improvement and gaming:\n\n• Real-Time Progress Tracking: Watch your stats grow as you complete tasks.\n• Personalized Workout Plans: Physical routines tailored to your current \"level.\"\n• AI Nutrition Tracking: Smart logging to keep your real-world health in check.\n• Regulated Quest Tracking: Manage your daily habits as structured RPG quests.\n• Alliance Wars: Team up with other players and compete in group challenges.\n• Accountability Mentor: An uncompromising guide to keep your discipline high.\n• System Gamification: Turn your everyday life into an immersive game.\n• In-App Rewards: Earn and equip unlockable outfits, keys, and inventory items."
  },
  {
    question: "Where was the app developed?",
    answer: "The app was proudly conceptualized and developed in India."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-8 container mx-auto relative z-10">
      <div className="flex flex-col items-center mb-16">
        <div className="relative">
          <HelpCircle className="w-16 h-16 text-system-neon mb-4 animate-pulse opacity-50" />
          <HelpCircle className="w-16 h-16 text-system-neon absolute top-0 left-0 animate-ping opacity-20" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 tracking-widest uppercase neon-text">
          Knowledge <span className="text-system-neon">Base</span>
        </h2>
        <div className="h-1 w-32 bg-system-neon/30 mt-6 rounded-full relative overflow-hidden">
          <div className="absolute inset-0 bg-system-neon animate-[scanline_2s_linear_infinite]"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className={`group border transition-all duration-500 rounded-2xl overflow-hidden ${
              openIndex === index 
                ? 'border-system-neon bg-white shadow-[0_0_30px_rgba(37,99,235,0.15)] scale-[1.02]' 
                : 'border-slate-200 bg-white/50 hover:border-system-neon/40 hover:bg-white hover:shadow-xl'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
            >
              <span className={`font-mono text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${
                openIndex === index ? 'text-system-neon' : 'text-slate-700 group-hover:text-slate-900'
              }`}>
                <span className="text-system-neon/40 mr-4 font-mono text-sm">0{index + 1}</span>
                {faq.question}
              </span>
              <div className={`p-2 rounded-full transition-all duration-500 ${
                openIndex === index ? 'bg-system-neon text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-system-neon/10 group-hover:text-system-neon'
              }`}>
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>
            
            <div 
              className={`transition-all duration-500 ease-in-out ${
                openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-8 pb-8 text-slate-600 leading-relaxed text-base md:text-lg border-t border-slate-100 pt-6 whitespace-pre-line">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
