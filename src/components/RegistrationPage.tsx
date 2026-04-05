import React, { useState, useEffect } from 'react';
import { Shield, Zap, X, ArrowLeft, Mail, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch initial count from API
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/users/count');
        if (response.ok) {
          const data = await response.json();
          setUserCount(data.count);
        }
      } catch (error) {
        console.error('Failed to fetch user count:', error);
      }
    };

    fetchCount();

    // Supabase Realtime subscription to update count
    const channel = supabase
      .channel('users_count')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'users' },
        () => {
          fetchCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleAriseClick = () => {
    setIsModalOpen(true);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          name: name,
          tier: 'Hunter'
        })
      });
      
      if (res.status === 409) {
        alert("User already registered with this email.");
        setIsSubmitting(false);
        return;
      }

      if (res.ok) {
        localStorage.setItem('hunterName', name);
        setIsModalOpen(false);
        setName('');
        setEmail('');
        navigate('/hunter-registered');
      } else {
        throw new Error('Registration failed');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      alert('System Error: Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-rajdhani relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="uppercase tracking-widest text-sm font-bold">Back to System</span>
      </Link>

      <div className="relative z-10 text-center w-full px-4">
        <h1 className="text-system-neon font-bold tracking-[0.5em] uppercase text-sm md:text-base mb-4 animate-pulse">
          System Players Registered
        </h1>
        
        {/* HUGE Counter - Responsive */}
        <div className="text-[20vw] md:text-[16rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-800 tracking-tighter drop-shadow-[0_0_30px_rgba(37,99,235,0.5)] font-mono select-none">
          {String(userCount).padStart(4, '0')}
        </div>

        <div className="mt-12">
          <button
            onClick={handleAriseClick}
            className="group relative px-12 py-6 bg-transparent overflow-hidden rounded-none"
          >
            <div className="absolute inset-0 w-full h-full bg-system-neon/10 group-hover:bg-system-neon/20 transition-colors duration-300 skew-x-[-20deg]"></div>
            <div className="absolute inset-0 border border-system-neon/50 skew-x-[-20deg] group-hover:border-system-neon transition-colors duration-300"></div>
            <span className="relative text-2xl md:text-4xl font-bold tracking-[0.3em] text-white uppercase group-hover:text-system-neon transition-colors duration-300">
              Arise
            </span>
          </button>
        </div>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-system-neon/30 p-8 rounded-2xl max-w-md w-full relative shadow-[0_0_50px_rgba(37,99,235,0.2)]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-6">
                <div className="text-center">
                  <Shield className="w-12 h-12 text-system-neon mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white tracking-wider uppercase">Identify Yourself</h2>
                  <p className="text-slate-400 text-sm mt-2">Enter your details to register in the System.</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-system-neon mb-2 uppercase tracking-wider flex items-center gap-2">
                      <User className="w-3 h-3" /> Hunter Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name..."
                      className="w-full bg-slate-800 border border-slate-700 rounded p-4 text-white focus:border-system-neon focus:outline-none transition-colors font-mono"
                      autoFocus
                      required
                      autoComplete="name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-system-neon mb-2 uppercase tracking-wider flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email..."
                      className="w-full bg-slate-800 border border-slate-700 rounded p-4 text-white focus:border-system-neon focus:outline-none transition-colors font-mono"
                      required
                      autoComplete="email"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !name.trim() || !email.trim()}
                    className="w-full py-4 bg-system-neon text-white font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Zap className="w-4 h-4 animate-pulse" /> Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" /> Register
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
