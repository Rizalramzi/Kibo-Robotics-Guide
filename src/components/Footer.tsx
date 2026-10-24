import React from 'react';
import { Github, ExternalLink, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 mt-16 text-slate-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <span className="text-base font-bold text-slate-900 tracking-tight">
              Kibo Robotics
            </span>
            <p className="text-slate-500 mt-1 max-w-md text-xs leading-relaxed">
              Panduan instalasi WSL2, Git, VS Code, dan pengemasan simulasi Astrobee Kibo-RPC ramah pemula.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <a href="#bab-1" className="hover:text-slate-900 transition-colors">Bab 1: WSL</a>
            <a href="#bab-2" className="hover:text-slate-900 transition-colors">Bab 2: Klon</a>
            <a href="#bab-3" className="hover:text-slate-900 transition-colors">Bab 3: Proyek</a>
            <a href="#bab-4" className="hover:text-slate-900 transition-colors">Bab 4: Packing</a>
            <a href="#bab-5" className="hover:text-slate-900 transition-colors">Bab 5: GitHub</a>
            <button
              onClick={scrollToTop}
              type="button"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
            >
              Kembali ke Atas
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex items-center gap-2">
            <span>Repositori Referensi:</span>
            <a
              href="https://github.com/Rizalramzi/Kibo-Robotics"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-slate-700 hover:text-blue-600 inline-flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              Rizalramzi/Kibo-Robotics
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          <div className="text-center sm:text-right">
            Dibuat untuk Tim Peserta Kibo Robot Programming Challenge (JAXA & NASA)
          </div>
        </div>
      </div>
    </footer>
  );
};
