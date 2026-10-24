import React, { useState } from 'react';
import { CLONE_COMMANDS } from '../data/guideData';
import { CodeBlock } from './CodeBlock';
import { CheckCircle2, Circle, GitBranch, FolderGit2, Info, Copy, Check } from 'lucide-react';

interface Chapter2CloneProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const Chapter2Clone: React.FC<Chapter2CloneProps> = ({ isCompleted, onToggleComplete }) => {
  const [copiedBatch, setCopiedBatch] = useState(false);

  const handleCopyBatch = async () => {
    const script = `mkdir -p ~/krpc && cd ~/krpc && git clone https://github.com/Rizalramzi/Kibo-Robotics.git`;
    try {
      await navigator.clipboard.writeText(script);
      setCopiedBatch(true);
      setTimeout(() => setCopiedBatch(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section id="bab-2" className="py-10 border-b border-slate-200">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            <span>Bab 02</span>
            <span aria-hidden="true">·</span>
            <span>Manajemen Repositori Git</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Klon Repositori dari GitHub
          </h2>
        </div>

        <button
          onClick={onToggleComplete}
          type="button"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
            isCompleted
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Bab 2 Selesai</span>
            </>
          ) : (
            <>
              <Circle className="w-4 h-4 text-slate-400" />
              <span>Tandai Selesai</span>
            </>
          )}
        </button>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed mb-6">
        Setelah WSL dan Ubuntu siap, buka terminal <strong className="text-slate-800">Ubuntu</strong> Anda dari Start Menu Windows. Kita akan menyiapkan direktori kerja khusus dan mengunduh repositori proyek Kibo Robotics.
      </p>

      {/* Main card */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-900">
              Perintah Menyiapkan Folder & Klon Proyek
            </h3>
          </div>

          <button
            onClick={handleCopyBatch}
            type="button"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 transition-colors"
          >
            {copiedBatch ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Tersalin (Satu Baris)!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>Salin Sekaligus (One-Liner)</span>
              </>
            )}
          </button>
        </div>

        {/* Commands list */}
        <div className="space-y-3">
          {CLONE_COMMANDS.map((cmd, idx) => (
            <CodeBlock
              key={cmd.id}
              stepNumber={idx + 1}
              command={cmd.command}
              description={cmd.description}
              env={cmd.env}
              note={cmd.note}
            />
          ))}
        </div>

        {/* Educational Callout: Linux vs Windows File System */}
        <div className="bg-slate-50 border border-slate-200 rounded-md p-4 text-xs text-slate-700 space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            <Info className="w-4 h-4 text-blue-600" />
            <span>Mengapa diletakkan di <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono">~/krpc</code>?</span>
          </div>
          <p className="leading-relaxed">
            Tanda <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">~</code> (tilde) adalah singkatan dari direktori asal Linux Anda (<code className="font-mono">/home/username_anda</code>). Sistem file Linux asli memiliki kecepatan baca/tulis hingga 10x lebih cepat untuk build ROS dibanding jika Anda menaruhnya di folder Windows (<code className="font-mono">/mnt/c/...</code>).
          </p>
        </div>
      </div>
    </section>
  );
};
