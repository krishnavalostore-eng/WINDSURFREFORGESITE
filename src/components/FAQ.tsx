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
    <section id="faq" className="py-20 md:py-28 px-4 sm:px-8 container mx-auto relative z-10">
      <div className="flex flex-col items-center mb-12 md:mb-16">
        <div className="relative w-16 h-16 mb-5">
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl" />
          <div className="absolute inset-0 rounded-full border border-cyan-400/40 flex items-center justify-center backdrop-blur-md bg-slate-900/60">
            <HelpCircle className="w-8 h-8 text-cyan-300" strokeWidth={1.8} />
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-white tracking-tight">
          Knowledge <span className="text-cyan-400 text-cyan-glow">Base</span>
        </h2>
        <p className="mt-4 text-slate-400 text-sm md:text-base text-center max-w-xl">
          Everything you need to know about the System.
        </p>
        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-6 rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`group rounded-2xl overflow-hidden transition-all duration-300 border backdrop-blur-md ${
                isOpen
                  ? 'border-cyan-400/50 bg-slate-900/70 shadow-[0_0_40px_rgba(34,211,238,0.18)]'
                  : 'border-cyan-400/15 bg-slate-900/40 hover:border-cyan-400/35 hover:bg-slate-900/55'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-5 sm:px-7 py-5 flex items-center justify-between text-left focus:outline-none gap-4"
              >
                <span className="flex items-start gap-4 flex-1 min-w-0">
                  <span className="text-cyan-400/70 font-mono text-xs sm:text-sm font-semibold pt-1 select-none">
                    0{index + 1}
                  </span>
                  <span
                    className={`text-base sm:text-lg font-semibold tracking-tight transition-colors ${
                      isOpen ? 'text-white' : 'text-slate-200 group-hover:text-white'
                    }`}
                  >
                    {faq.question}
                  </span>
                </span>
                <div
                  className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? 'bg-cyan-400 text-slate-950 rotate-180'
                      : 'bg-slate-800/80 text-cyan-300 group-hover:bg-cyan-400/20'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
                </div>
              </button>

              <div
                className={`grid transition-all duration-400 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 sm:px-7 pb-6 pt-2 pl-12 sm:pl-16 text-slate-300 leading-relaxed text-sm sm:text-base whitespace-pre-line font-light">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
