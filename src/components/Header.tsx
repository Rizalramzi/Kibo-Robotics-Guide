import React, { useState, useEffect } from 'react';
import { HelpCircle, Terminal, Menu, X } from 'lucide-react';

interface HeaderProps {
  completedStepsCount: number;
  totalStepsCount: number;
  onOpenTroubleshooting: () => void;
  onOpenCheatSheet: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  completedStepsCount,
  totalStepsCount,
  onOpenTroubleshooting,
  onOpenCheatSheet,
}) => {
  const [activeSection, setActiveSection] = useState<string>('bab-1');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      const sections = ['bab-1', 'bab-2', 'bab-3', 'bab-4', 'bab-5'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'bab-1', label: 'Bab 1: WSL' },
    { id: 'bab-2', label: 'Bab 2: Klon' },
    { id: 'bab-3', label: 'Bab 3: Proyek' },
    { id: 'bab-4', label: 'Bab 4: Packing' },
    { id: 'bab-5', label: 'Bab 5: GitHub' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
      {/* Scroll indicator bar */}
      <div
        className="h-0.5 bg-blue-600 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-blue-600 transition-colors"
        >
          Kibo Robotics
        </a>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                activeSection === link.id
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'hover:text-slate-900'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCheatSheet}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            <Terminal className="w-3.5 h-3.5 text-slate-600" />
            Cheat Sheet
          </button>

          <button
            onClick={onOpenTroubleshooting}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-xs transition-colors whitespace-nowrap shrink-0"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Solusi Kendala
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenCheatSheet}
            type="button"
            aria-label="Cheat Sheet"
            className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 rounded"
          >
            <Terminal className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Buka navigasi"
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 text-sm font-medium shadow-md">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md ${
                activeSection === link.id
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTroubleshooting();
              }}
              type="button"
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-md"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Solusi Kendala (FAQ)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
