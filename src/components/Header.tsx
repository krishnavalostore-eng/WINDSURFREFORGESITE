import React, { useEffect, useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavLink {
  label: string;
  target: string;
}

const LINKS: NavLink[] = [
  { label: 'System', target: 'system' },
  { label: 'ForgeGuard', target: 'forgeguard' },
  { label: 'FAQ', target: 'faq' },
];

interface HeaderProps {
  onDownload: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onDownload }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const Logo = () => (
    <span className="relative w-7 h-7 flex items-center justify-center">
      <span className="absolute inset-0 rounded-full bg-cyan-400/30 blur-md" />
      <svg viewBox="0 0 32 32" className="relative w-7 h-7">
        <defs>
          <linearGradient id="logoGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="11" fill="none" stroke="url(#logoGrad)" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="5" fill="url(#logoGrad)" />
        <circle cx="16" cy="5" r="1.4" fill="#22d3ee" />
        <circle cx="27" cy="16" r="1.4" fill="#22d3ee" />
        <circle cx="16" cy="27" r="1.4" fill="#22d3ee" />
        <circle cx="5" cy="16" r="1.4" fill="#22d3ee" />
      </svg>
    </span>
  );

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        className={`fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          scrolled ? 'scale-[0.97]' : 'scale-100'
        }`}
      >
        <nav className="glass-pill rounded-full pl-2 pr-2 py-1.5 flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-cyan-400/10 transition-colors"
            aria-label="Reforge home"
          >
            <Logo />
            <span className="hidden sm:block text-white font-semibold text-sm tracking-wide">reforge</span>
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <li key={l.target}>
                <button
                  onClick={() => scrollTo(l.target)}
                  className="px-4 py-2 text-sm text-slate-200 hover:text-white rounded-full hover:bg-cyan-400/10 transition-colors font-medium"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={onDownload}
            className="hidden md:flex items-center gap-1.5 ml-1 px-4 py-2 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 text-sm font-semibold rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden ml-1 w-10 h-10 rounded-full bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center text-cyan-200"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="relative h-full flex flex-col items-center justify-center gap-2 px-6"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center text-cyan-200"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <Logo />
              </div>

              <ul className="flex flex-col items-center gap-2 mb-8">
                {LINKS.map((l) => (
                  <li key={l.target}>
                    <button
                      onClick={() => scrollTo(l.target)}
                      className="px-8 py-3 text-2xl text-slate-100 font-semibold tracking-wide hover:text-cyan-300 transition-colors"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => { setOpen(false); onDownload(); }}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-semibold rounded-full shadow-[0_0_30px_rgba(34,211,238,0.5)]"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
