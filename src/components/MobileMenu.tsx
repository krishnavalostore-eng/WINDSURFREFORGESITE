import React, { useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onDownload: () => void;
}

const LINKS = [
  { label: 'System',     href: '#system' },
  { label: 'ForgeGuard', href: '#forgeguard' },
  { label: 'FAQ',        href: '#faq' },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, onDownload }) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 origin-top transition-all duration-400 ease-out ${
          open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="mx-3 mt-3 rounded-2xl glass-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-400/15">
            <span className="text-white font-bold text-sm tracking-[0.25em] uppercase">Menu</span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-9 h-9 rounded-full bg-slate-800/70 text-cyan-300 hover:bg-cyan-400/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex flex-col py-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={onClose}
                className="px-6 py-4 text-white text-lg font-semibold tracking-wide hover:bg-cyan-400/10 hover:text-cyan-300 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="p-4 border-t border-cyan-400/15">
            <button
              onClick={() => {
                onClose();
                onDownload();
              }}
              className="w-full px-5 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-colors"
            >
              <Download className="w-4 h-4" strokeWidth={2.5} />
              DOWNLOAD APP
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
