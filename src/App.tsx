import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Play, X, Activity, Shield, Zap, User, CheckCircle2, Crosshair, Dumbbell, Brain, ChevronDown, Lock, LogOut, Download } from 'lucide-react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { AdminPanel } from './components/AdminPanel';
import { Marquee } from './components/Marquee';
import { FAQ } from './components/FAQ';
import { InstagramPromo } from './components/InstagramPromo';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { RLogo } from './components/RLogo';
import { HeroIconArc } from './components/HeroIconArc';
import { HeroLandscape } from './components/HeroLandscape';
import { MobileMenu } from './components/MobileMenu';
import { Sparkles, Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.reforge.app&pcampaignid=web_share';

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
        className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-600 uppercase font-sans tracking-[0.5em] ml-4 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]"
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
    <section className="py-16 md:py-24 px-4 sm:px-8 container mx-auto relative z-10">
      <div className="max-w-5xl mx-auto glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden group transition-colors duration-500">
        {/* Cyan accent glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 border-2 border-dashed border-cyan-400/30 rounded-full animate-[spin_18s_linear_infinite]"></div>
            <div className="w-28 h-28 rounded-full border border-cyan-400/50 flex items-center justify-center bg-cyan-400/8 shadow-[0_0_30px_rgba(34,211,238,0.35)] relative z-10 backdrop-blur-sm">
              <Shield className="w-12 h-12 text-cyan-300" strokeWidth={1.8} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <div className="h-[1px] w-8 bg-cyan-400/60 hidden md:block"></div>
              <span className="text-cyan-300 font-mono text-xs md:text-sm tracking-[0.3em] uppercase font-bold">Security Protocol Active</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Forge<span className="text-cyan-400 text-cyan-glow">Guard</span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6 font-light">
              Introduced by the New Architect, ForgeGuard is an uncompromising anti-cheat mechanism woven directly into the System's core. It ensures absolute fair play by detecting <strong className="text-cyan-300 font-bold">99.9%</strong> of anomalies, unauthorized modifications, and fake quest completions. The System cannot be deceived.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span className="uppercase tracking-wider font-semibold">Fair Play Enforced</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span className="uppercase tracking-wider font-semibold">Anomaly Detection</span>
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
  const systemInterfaceRef = useRef<HTMLDivElement>(null);
  const [loadingState, setLoadingState] = useState<'loading' | 'fading' | 'done'>('loading');
  const [showTextBox, setShowTextBox] = useState(false);
  const [blobReady, setBlobReady] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [authenticatedAdminPass, setAuthenticatedAdminPass] = useState('');
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState('');
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-redirect to Play Store app immediately on page load
  useEffect(() => {
    // Only auto-redirect on the main page, not on hash navigation
    if (location.hash) return;

    if (isIOS()) {
      setShowIOSModal(true);
    } else {
      // Android Intent URL — Chrome on Android intercepts this and opens the Play Store app directly
      // Falls back to Play Store web URL if the app can't be opened
      const INTENT_URL = 'intent://details?id=com.reforge.app&referrer=utm_source%3Dwebsite#Intent;scheme=market;action=android.intent.action.VIEW;package=com.android.vending;S.browser_fallback_url=' + encodeURIComponent(PLAY_STORE_URL) + ';end';
      window.location.href = INTENT_URL;
    }
  }, []); // Run once on mount

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

  const isIOS = () => {
    const ua = navigator.userAgent || '';
    return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  };

  const handleDownload = () => {
    if (isIOS()) {
      setShowIOSModal(true);
    } else {
      window.open(PLAY_STORE_URL, '_blank', 'noopener,noreferrer');
    }
  };

  const scrollToSystem = () => {
    if (systemInterfaceRef.current) {
      systemInterfaceRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAriseClick = () => {
    handleDownload();
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
    // Safety: force ready after 1.8s even if blob/canvas hasn't signaled
    const safetyTimer = setTimeout(() => setBlobReady(true), 1800);
    return () => clearTimeout(safetyTimer);
  }, []);

  useEffect(() => {
    if (blobReady && loadingState === 'loading') {
      const timer = setTimeout(() => setLoadingState('fading'), 400);
      return () => clearTimeout(timer);
    }
  }, [blobReady, loadingState]);

  useEffect(() => {
    if (loadingState === 'fading') {
      const timer = setTimeout(() => {
        setLoadingState('done');
        setShowTextBox(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loadingState]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-white">
      {loadingState !== 'done' && <LoadingScreen isFading={loadingState === 'fading'} />}

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-40 px-4 sm:px-6 pt-3.5 sm:pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RLogo size={28} />
          <span className="font-display text-white text-xl sm:text-2xl uppercase tracking-[0.04em] leading-none">
            REFORGE<span className="text-cyan-400">AI</span>
          </span>
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <Menu className="w-6 h-6" strokeWidth={2} />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onDownload={handleDownload} />

      {/* Hero Section */}
      <section
        className="relative z-10 overflow-hidden flex flex-col items-center px-4 pt-14 sm:pt-16 pb-0 hero-backdrop"
        style={{ minHeight: '100svh' }}
      >
        {/* Soft cyan top glow */}
        <div className="absolute inset-x-0 top-0 h-[55vh] pointer-events-none"
             style={{ background: 'radial-gradient(ellipse 90% 55% at 50% 5%, rgba(34,211,238,0.20) 0%, transparent 65%)' }} />

        {/* Hero Content stack */}
        <div className={`relative z-10 w-full flex flex-col items-center transition-all duration-1000 ${showTextBox ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Icon arc — sits behind the headline */}
          <div className="relative w-full flex justify-center">
            <HeroIconArc className="md:hidden" width={340} />
            <HeroIconArc className="hidden md:block" width={500} />
          </div>

          {/* AI-Powered pill — overlapping the bottom of the arc */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-cyan-400/55 backdrop-blur-md -mt-7 sm:-mt-8 z-10 shadow-[0_0_20px_rgba(34,211,238,0.18)]">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase text-white">
              AI-Powered Fitness
            </span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          </div>

          {/* Headline — sized so each phrase fits on one line */}
          <h1
            className="font-display text-white text-center leading-[0.9] mt-3 sm:mt-4 whitespace-nowrap"
            style={{ fontSize: 'clamp(3rem, 14vw, 7rem)', letterSpacing: '0.01em' }}
          >
            STOP DREAMING<br />
            <span className="text-cyan-400 text-cyan-glow">START LEVELING</span>
          </h1>

          {/* Description */}
          <p className="mt-4 sm:mt-5 text-slate-300 text-sm sm:text-base text-center max-w-md font-light leading-relaxed px-3">
            AI-powered workouts, personalized plans, smart nutrition tracking and real-time insights to transform your body and mind.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleDownload}
            className="mt-6 sm:mt-7 group px-7 py-3.5 rounded-full bg-slate-950/85 hover:bg-slate-900 border border-cyan-400/55 backdrop-blur-md shadow-[0_0_30px_rgba(34,211,238,0.28)] hover:shadow-[0_0_45px_rgba(34,211,238,0.5)] flex items-center gap-3.5 transition-all"
          >
            <svg className="w-7 h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.196 12l2.502-2.492zM5.864 2.658L16.801 9.49l-2.302 2.302L5.864 2.658z"/>
            </svg>
            <div className="text-left">
              <div className="text-white font-extrabold text-sm tracking-[0.12em] leading-tight">DOWNLOAD NOW</div>
              <div className="text-slate-400 text-[10px] tracking-[0.18em] mt-0.5">AVAILABLE ON PLAY STORE</div>
            </div>
          </button>
        </div>

        {/* Landscape — fills bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0 select-none">
          <HeroLandscape />
        </div>
      </section>

      <div ref={systemInterfaceRef} id="system">
        <Marquee />
      </div>
      <div id="forgeguard">
        <ForgeGuardSection />
      </div>
      <InstagramPromo />
      <div id="faq">
        <FAQ />
      </div>
      
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

      {/* iOS Not Available Modal */}
      <AnimatePresence>
        {showIOSModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={() => setShowIOSModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-slate-900 border border-cyan-500/30 p-8 rounded-2xl max-w-sm w-full relative shadow-[0_0_60px_rgba(6,182,212,0.15)] text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowIOSModal(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Apple Icon */}
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-slate-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>

              <h3 className="text-xl font-bold text-white tracking-wider uppercase mb-2 font-sans">
                Coming Soon to iOS
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Reforge is currently available on <span className="text-emerald-400 font-semibold">Android</span> only. We're working on bringing it to iOS — stay tuned!
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowIOSModal(false)}
                  className="w-full py-3 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-slate-900 transition-all text-sm rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                >
                  Got It
                </button>
                <p className="text-[10px] text-slate-600 font-mono tracking-wider">
                  ANDROID • GOOGLE PLAY • AVAILABLE NOW
                </p>
              </div>
            </motion.div>
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
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
    </Routes>
  );
}
