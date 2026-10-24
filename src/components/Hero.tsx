import React from 'react';
import { CheckCircle2, Circle, ArrowDown, ExternalLink } from 'lucide-react';

interface HeroProps {
  completedSteps: Record<string, boolean>;
  onToggleStep: (stepId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ completedSteps, onToggleStep }) => {
  const chapters = [
    { id: 'bab-1', label: '1. Instalasi WSL & Ubuntu' },
    { id: 'bab-2', label: '2. Klon Repositori GitHub' },
    { id: 'bab-3', label: '3. Buka VS Code & Struktur' },
    { id: 'bab-4', label: '4. Pengemasan (packing.sh)' },
    { id: 'bab-5', label: '5. Simpan & Push ke GitHub' },
  ];

  const completedCount = chapters.filter((c) => completedSteps[c.id]).length;
  const progressPercent = Math.round((completedCount / chapters.length) * 100);

  return (
    <section className="pt-8 pb-10 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Unboxed Metadata (Zero-Pill Rule) */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-3">
          <span>Kibo Robot Programming Challenge</span>
          <span aria-hidden="true">·</span>
          <span>JAXA & NASA Astrobee</span>
          <span aria-hidden="true">·</span>
          <span>Windows 10 / 11 & WSL2</span>
          <span aria-hidden="true">·</span>
          <span>Panduan Pemula</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Title & Description */}
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Panduan Penyiapan Proyek Kibo Robotics
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Panduan langkah demi langkah bagi pemula untuk mengonfigurasi WSL2 di Windows,
              mengklon repositori, mengemas kode program robot Astrobee (<code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded text-xs">packing.sh</code>),
              hingga mengirim perubahan (<code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded text-xs">git push</code>) kembali ke GitHub.
            </p>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#bab-1"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Mulai dari Bab 1
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/Rizalramzi/Kibo-Robotics"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
              >
                Repositori GitHub
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>

            {/* Beginner Checklist Box */}
            <div className="pt-4 mt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-700 font-medium mb-2">
                <span>Daftar Progres Anda</span>
                <span className="font-mono tabular-nums text-blue-700">
                  {completedCount} dari {chapters.length} Bab ({progressPercent}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-3">
                <div
                  className="bg-blue-600 h-2 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Chapter Checkbox Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {chapters.map((ch) => {
                  const isDone = !!completedSteps[ch.id];
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => onToggleStep(ch.id)}
                      className={`flex items-center justify-between p-2 rounded text-left text-xs border transition-colors ${
                        isDone
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="truncate pr-2">{ch.label}</span>
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="rounded-lg border border-slate-200 overflow-hidden bg-slate-900 text-white shadow-xs">
              <div className="relative aspect-video w-full bg-slate-800 overflow-hidden">
                <img
                  src="/src/assets/images/astrobee_kibo_robotics_1792811394507.jpg"
                  alt="Astrobee Robot di Modul Kibo ISS"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to stylized SVG placeholder if image fails
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900">
                          <span class="text-xs font-mono text-blue-400 mb-1">NASA ASTROBEE</span>
                          <span class="text-sm font-semibold text-slate-200">Kibo Module Japanese Experiment</span>
                          <span class="text-xs text-slate-400 mt-2">Robotics Development Environment</span>
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              {/* Caption */}
              <div className="p-3 bg-white text-slate-800 border-t border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">Robot Astrobee di Modul ISS Kibo</p>
                  <p className="text-slate-500 text-[11px]">Sasaran simulasi misi kompetisi Kibo-RPC</p>
                </div>
                <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  JAXA / NASA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
