import React, { useState, useEffect, useRef } from 'react';
import { Play, X, Activity, Shield, Zap, User, CheckCircle2, Crosshair, Dumbbell, Brain, ChevronDown, Lock, LogOut } from 'lucide-react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { AdminPanel } from './components/AdminPanel';
import { Marquee } from './components/Marquee';
import { FAQ } from './components/FAQ';
import { RegistrationPage } from './components/RegistrationPage';
import { HunterRegistered } from './components/HunterRegistered';
import { InstagramPromo } from './components/InstagramPromo';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { AnimatePresence, motion } from 'motion/react';

// --- Components ---

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const TypewriterText = ({ text, onComplete }: { text: string, onComplete: () => void }) => {
  const [displayed, setDisplayed] = useState('');
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(timer);
        onCompleteRef.current();
      }
    }, 40); // Typing speed
    
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayed}</span>;
};

const LoadingScreen = ({ isFading }: { isFading: boolean }) => (
  <div className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center transition-opacity duration-1000 ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
    <div className="relative w-80 h-80 flex items-center justify-center mb-8">
       {/* SVG Sword */}
       <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] overflow-visible">
          <defs>
            <linearGradient id="bladeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Blade Outline */}
          <motion.path
            d="M 50 140 L 44 30 L 50 5 L 56 30 L 50 140 Z"
            fill="transparent"
            stroke="#06b6d4" 
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Blade Inner Detail */}
          <motion.path
            d="M 50 135 L 50 35"
            fill="transparent"
            stroke="#22d3ee"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />

          {/* Guard */}
          <motion.path
            d="M 35 140 L 65 140 L 60 145 L 40 145 Z"
            fill="transparent"
            stroke="#06b6d4"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          />

           {/* Hilt/Grip */}
           <motion.path
            d="M 48 145 L 48 175 L 52 175 L 52 145"
            fill="transparent"
            stroke="#06b6d4"
            strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
           />
           
           {/* Grip Wrap Detail */}
           <motion.path
            d="M 48 150 L 52 155 M 48 160 L 52 165 M 48 170 L 52 175"
            stroke="#06b6d4"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
           />

           {/* Pommel */}
           <motion.path
            d="M 50 175 L 45 180 L 50 185 L 55 180 Z"
            stroke="#06b6d4"
            fill="transparent"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.0 }}
           />
       </svg>
       
       {/* Glow effect behind */}
       <div className="absolute inset-0 bg-cyan-500/10 blur-[60px] rounded-full animate-pulse"></div>
    </div>
    
    <div className="relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-600 uppercase font-serif tracking-[0.5em] ml-4 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]"
      >
        Reforge
      </motion.div>
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, delay: 2 }}
        className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-2"
      />
    </div>
    
    <div className="text-cyan-600/70 font-mono text-[10px] md:text-xs mt-6 tracking-[0.3em] animate-pulse">
      SYSTEM SYNCHRONIZATION...
    </div>
  </div>
);



const ForgeGuardSection = () => {
  return (
    <section className="py-12 px-8 container mx-auto relative z-10">
      <div className="max-w-5xl mx-auto liquid-glass p-8 md:p-12 rounded-3xl border border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.1)] relative overflow-hidden group hover:border-red-500/50 transition-colors duration-500">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-red-500/10 transition-colors duration-700"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 border-2 border-dashed border-red-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="w-28 h-28 rounded-full border border-red-500/50 flex items-center justify-center bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.2)] relative z-10 backdrop-blur-sm">
              <Shield className="w-12 h-12 text-red-500" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <div className="h-[1px] w-8 bg-red-500/50 hidden md:block"></div>
              <span className="text-red-500 font-mono text-xs md:text-sm tracking-[0.3em] uppercase font-bold animate-pulse">Security Protocol Active</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 tracking-widest uppercase font-serif">
              Forge<span className="text-red-500">Guard</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6">
              Introduced by the New Architect, ForgeGuard is an uncompromising anti-cheat mechanism woven directly into the System's core. It ensures absolute fair play by detecting <strong className="text-red-500 font-mono">99.9%</strong> of anomalies, unauthorized modifications, and fake quest completions. The System cannot be deceived.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 text-sm font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500" />
                <span className="uppercase tracking-wider">Fair Play Enforced</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500" />
                <span className="uppercase tracking-wider">Anomaly Detection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

const introMessages = [
  "Character Building.....",
  "Recreating......",
  "Reforging......",
  "Getting ready....."
];

// Track if intro has been played in this session (module-level variable persists during client-side navigation)
let sessionIntroPlayed = false;

const MainApp = () => {
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const loopVideoRef = useRef<HTMLVideoElement>(null);
  const systemInterfaceRef = useRef<HTMLDivElement>(null);
  const [loadingState, setLoadingState] = useState<'loading' | 'fading' | 'done'>('loading');
  const [showTextBox, setShowTextBox] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [introLoaded, setIntroLoaded] = useState(false);
  const [loopLoaded, setLoopLoaded] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [hunterName, setHunterName] = useState<string | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [authenticatedAdminPass, setAuthenticatedAdminPass] = useState('');
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#faq') {
      const faqElement = document.getElementById('faq');
      if (faqElement) {
        setTimeout(() => {
          faqElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    const storedName = localStorage.getItem('hunterName');
    if (storedName) {
      setHunterName(storedName);
    }
  }, []);

  const scrollToSystem = () => {
    if (systemInterfaceRef.current) {
      systemInterfaceRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAriseClick = () => {
    if (hunterName) {
      scrollToSystem();
    } else {
      navigate('/register');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('hunterName');
    setHunterName(null);
    setShowProfileDropdown(false);
    // Optionally navigate to home or refresh if needed, but state update handles UI
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId === 'admin' && adminPass === 'psp5116') {
      setIsAdminAuthenticated(true);
      setAuthenticatedAdminPass(adminPass);
      setShowAdminLogin(false);
      setAdminId('');
      setAdminPass('');
      setAdminError('');
    } else {
      setAdminError('Access Denied: Invalid Credentials');
    }
  };

  useEffect(() => {
    // Safety fallback: Force load if video takes too long or fails (e.g., slow network, low power mode)
    const safetyTimer = setTimeout(() => {
      if (!loopLoaded && loadingState === 'loading') {
        console.log("Video load timeout reached, forcing system start...");
        setLoopLoaded(true);
      }
    }, 4000);
    return () => clearTimeout(safetyTimer);
  }, [loopLoaded, loadingState]);

  useEffect(() => {
    // Wait for both intro (if not played yet) and loop videos to load before fading out loader
    const isReady = sessionIntroPlayed ? loopLoaded : (introLoaded && loopLoaded);
    
    if (isReady && loadingState === 'loading') {
      const timer = setTimeout(() => {
        setLoadingState('fading');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [introLoaded, loopLoaded, loadingState]);

  useEffect(() => {
    if (loadingState === 'fading') {
      const timer = setTimeout(() => {
        setLoadingState('done');
        if (!sessionIntroPlayed && introVideoRef.current) {
          introVideoRef.current.play().catch(console.error);
        } else if (sessionIntroPlayed && loopVideoRef.current) {
          setIntroFinished(true);
          setShowTextBox(true);
          loopVideoRef.current.play().catch(console.error);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loadingState]);

  const handleIntroEnded = () => {
    setIntroFinished(true);
    setShowTextBox(true);
    sessionIntroPlayed = true;
    if (loopVideoRef.current) {
      loopVideoRef.current.play().catch(console.error);
    }
  };

  return (
    <div className="min-h-screen bg-system-bg text-slate-900 font-rajdhani overflow-x-hidden selection:bg-system-neon selection:text-white">
      {loadingState !== 'done' && <LoadingScreen isFading={loadingState === 'fading'} />}

      {/* Register Button */}
      <div className="fixed top-6 right-6 z-50">
        {hunterName ? (
          <div className="relative">
            <button 
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="px-6 py-2 bg-cyan-500/10 backdrop-blur-md border border-cyan-500/50 text-cyan-400 font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)] text-sm md:text-base flex items-center gap-2 hover:bg-cyan-500/20 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Welcome, {hunterName}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showProfileDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showProfileDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-slate-900/90 backdrop-blur-xl border border-cyan-500/50 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.2)] overflow-hidden z-50"
                >
                  <div className="p-1">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-sm font-mono text-slate-300 hover:bg-cyan-500/20 hover:text-white transition-colors flex items-center gap-3 rounded-lg group"
                    >
                      <LogOut className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
                      <span className="uppercase tracking-wider">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link 
            to="/register" 
            className="px-6 py-2 bg-cyan-500/10 backdrop-blur-md border border-cyan-500/50 text-cyan-400 font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-slate-900 transition-all rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] text-sm md:text-base"
          >
            Register
          </Link>
        )}
      </div>

      {/* Grid Background Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.4]" 
           style={{ backgroundImage: 'linear-gradient(rgba(37,99,235,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#f1f5f9_100%)]"></div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-row relative z-10 overflow-hidden">
        
        {/* Video Background */}
        <div className="absolute inset-0 z-0 bg-black">
          {/* Loop Video (Background/Shadow Loading) */}
          <video 
            ref={loopVideoRef}
            src="https://res.cloudinary.com/dt3adevpo/video/upload/v1775466527/venusloop_tubcvl.mp4"
            loop
            muted
            playsInline
            webkit-playsinline="true"
            preload="auto"
            onCanPlayThrough={() => setLoopLoaded(true)}
            onLoadedData={() => setLoopLoaded(true)}
            onError={() => {
              console.warn("Loop video failed to load, bypassing loader.");
              setLoopLoaded(true);
            }}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${introFinished || sessionIntroPlayed ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {/* Intro Video (Plays once) */}
          {(!sessionIntroPlayed || !introFinished) && (
            <video 
              ref={introVideoRef}
              src="https://res.cloudinary.com/dt3adevpo/video/upload/v1775466507/venusintro_wfngz3.mp4"
              muted
              playsInline
              webkit-playsinline="true"
              preload="auto"
              onCanPlayThrough={() => setIntroLoaded(true)}
              onLoadedData={() => setIntroLoaded(true)}
              onEnded={handleIntroEnded}
              onError={() => {
                console.warn("Intro video failed to load, skipping to loop.");
                setIntroLoaded(true);
                handleIntroEnded();
              }}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${introFinished ? 'opacity-0' : 'opacity-100'}`}
            />
          )}
        </div>

        {/* Text & CTA Container - Positioned at bottom center on mobile, left on tablet/desktop */}
        <div className={`absolute inset-0 flex flex-col justify-end md:justify-center lg:justify-center items-center md:items-start lg:items-start p-4 md:p-12 lg:p-24 z-10 pointer-events-none pb-24 md:pb-0 transition-opacity duration-1000 ${introFinished || sessionIntroPlayed ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`transition-all duration-1000 transform ${showTextBox ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} pointer-events-auto w-full max-w-2xl lg:max-w-3xl`}>
            <div className="p-6 md:p-8 lg:p-12 rounded-3xl w-full border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)] backdrop-blur-md bg-slate-950/60 md:bg-slate-950/70">
              <div className="text-[10px] md:text-xs lg:text-sm tracking-[0.3em] text-slate-400 font-mono mb-4 uppercase flex items-center gap-4 justify-center md:justify-start">
                <span>Dusk</span>
                <span className="text-cyan-400">//</span>
                <span>Accountability AI</span>
              </div>
              
              <h1 className="text-base md:text-xl lg:text-3xl font-medium text-slate-200 mb-8 min-h-[120px] md:min-h-[140px] lg:min-h-[160px] leading-relaxed relative z-10 font-serif text-center md:text-left drop-shadow-md">
                {showTextBox && (
                  <TypewriterText 
                    text="You've been detected. The System has chosen you. Before we proceed — understand this: every action, every failure, every victory will be recorded. I am the New Architect. I will be watching." 
                    onComplete={() => setShowButton(true)} 
                  />
                )}
                <span className="animate-pulse text-cyan-400 ml-1">_</span>
              </h1>
              
              <div className={`transition-all duration-1000 relative z-10 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'} flex justify-center md:justify-start`}>
                <button 
                  onClick={handleAriseClick}
                  className="w-full md:w-auto px-12 py-4 bg-slate-900 hover:bg-slate-800 text-cyan-50 font-bold text-sm md:text-base lg:text-lg tracking-[0.3em] uppercase transition-all rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] border border-cyan-500/30 flex items-center justify-center"
                >
                  ARISE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Adjusted position */}
        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-1000 delay-500 z-20 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <ChevronDown className="w-6 h-6 text-cyan-500/50 animate-bounce" />
        </div>
      </section>

      <div ref={systemInterfaceRef}>
        <Marquee />
      </div>
      <ForgeGuardSection />
      <InstagramPromo />
      <FAQ />
      
      <footer className="py-8 text-center text-slate-500 font-mono text-sm border-t border-system-neon/20 relative z-10 flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-2">
          <Link to="/privacy-policy" className="hover:text-system-neon transition-colors uppercase tracking-widest text-xs">Privacy Policy</Link>
          <Link to="/terms-and-conditions" className="hover:text-system-neon transition-colors uppercase tracking-widest text-xs">Terms & Conditions</Link>
        </div>
        <div>SYSTEM INITIATION PROTOCOL v1.0.0 // ALL RIGHTS RESERVED</div>
        <button 
          onClick={() => setShowAdminLogin(true)}
          className="text-[10px] text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest opacity-50 hover:opacity-100 font-bold"
        >
          Admin Access
        </button>
      </footer>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-red-500/30 p-8 rounded-2xl max-w-sm w-full relative shadow-[0_0_50px_rgba(239,68,68,0.2)]"
            >
              <button 
                onClick={() => setShowAdminLogin(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-6">
                <Lock className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white tracking-wider uppercase">Restricted Access</h2>
                <p className="text-slate-400 text-xs mt-2 font-mono">AUTHORIZED PERSONNEL ONLY</p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-red-500 mb-2 uppercase tracking-wider">
                    System ID
                  </label>
                  <input
                    type="text"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:border-red-500 focus:outline-none transition-colors font-mono text-sm"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-red-500 mb-2 uppercase tracking-wider">
                    Passcode
                  </label>
                  <input
                    type="password"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:border-red-500 focus:outline-none transition-colors font-mono text-sm"
                  />
                </div>
                
                {adminError && (
                  <div className="text-red-500 text-xs font-mono text-center animate-pulse">
                    {adminError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-red-500/20 border border-red-500 text-red-500 font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] text-sm"
                >
                  Verify Credentials
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Panel Overlay */}
      <AnimatePresence>
        {isAdminAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-slate-900 overflow-y-auto"
          >
            <div className="fixed top-4 right-4 z-[210]">
              <button 
                onClick={() => setIsAdminAuthenticated(false)}
                className="bg-red-500 text-white px-4 py-2 rounded font-bold uppercase tracking-wider text-xs hover:bg-red-600 transition-colors shadow-lg flex items-center gap-2"
              >
                <X className="w-4 h-4" /> Exit Admin Mode
              </button>
            </div>
            <AdminPanel adminPass={authenticatedAdminPass} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/hunter-registered" element={<HunterRegistered />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
    </Routes>
  );
}
