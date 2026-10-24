import React, { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { CheckCircle2, Circle, Package, UploadCloud, Copy, Check, Sparkles } from 'lucide-react';

interface Chapter4PackingProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const Chapter4Packing: React.FC<Chapter4PackingProps> = ({ isCompleted, onToggleComplete }) => {
  const [customFileName, setCustomFileName] = useState('MyKiboCode_v1');
  const [copiedGenerated, setCopiedGenerated] = useState(false);

  // Clean filename for safety: no spaces or weird characters
  const sanitizedName = customFileName.trim().replace(/\s+/g, '_') || 'MyKiboCode_v1';
  const generatedCommand = `./packing.sh ${sanitizedName}`;

  const handleCopyGenerated = async () => {
    try {
      await navigator.clipboard.writeText(generatedCommand);
      setCopiedGenerated(true);
      setTimeout(() => setCopiedGenerated(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section id="bab-4" className="py-10 border-b border-slate-200">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            <span>Bab 04</span>
            <span aria-hidden="true">·</span>
            <span>Pengemasan Simulator</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Mengemas Program (<code className="text-blue-600 font-mono">packing.sh</code>)
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
              <span>Bab 4 Selesai</span>
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
        Sebelum kode logika robot Anda dapat dievaluasi di Web Simulator JAXA, berkas kode harus dikemas menjadi arsip terkompresi <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded font-mono text-xs">.tar.gz</code> dengan susunan direktori ROS yang sesuai standar panitia.
      </p>

      {/* Basic Commands */}
      <div className="space-y-4 mb-8">
        <CodeBlock
          command="cd ~/krpc/Kibo-Robotics"
          description="Masuk ke direktori utama Kibo-Robotics tempat skrip packing.sh berada."
          env="ubuntu"
        />

        <CodeBlock
          command="./packing.sh NamaFileKalian"
          description="Menjalankan skrip bash untuk mengemas program menjadi file NamaFileKalian.tar.gz."
          env="ubuntu"
          note="Gantilah 'NamaFileKalian' dengan nama tim atau versi pengujian Anda tanpa spasi."
        />
      </div>

      {/* Interactive Generator */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 mb-8 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Package className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-slate-900">
            Simulator Command Generator Interaktif
          </h3>
        </div>

        <div className="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 space-y-2">
            <label htmlFor="filename-input" className="block text-xs font-medium text-slate-700">
              Ketik Nama File / Versi Tim Anda:
            </label>
            <div className="flex items-center gap-2">
              <input
                id="filename-input"
                type="text"
                value={customFileName}
                onChange={(e) => setCustomFileName(e.target.value)}
                placeholder="Contoh: TimGaruda_Run1"
                className="w-full px-3 py-2 text-xs sm:text-sm font-mono border border-slate-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              *Hindari penggunaan spasi atau karakter khusus. Gunakan underscore (_) sebagai pemisah kata.
            </p>
          </div>

          <div className="lg:col-span-7 bg-slate-900 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono">Terminal Ubuntu (WSL)</span>
              <button
                onClick={handleCopyGenerated}
                type="button"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                {copiedGenerated ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Perintah Ini</span>
                  </>
                )}
              </button>
            </div>

            <div className="font-mono text-sm text-yellow-300 select-all py-1">
              $ {generatedCommand}
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Hasil berkas keluaran:</span>
              <span className="font-mono font-semibold text-emerald-400">
                {sanitizedName}.tar.gz
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Upload Steps */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <UploadCloud className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-slate-900">
            Langkah Mengunggah ke Web Simulator JAXA
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white p-3 rounded border border-slate-200 space-y-1">
            <span className="font-bold text-blue-700">1. Akses Simulator</span>
            <p className="text-slate-600 leading-relaxed">
              Login ke portal resmi Kibo-RPC di peramban Anda dan buka halaman <strong>My Page / Simulation</strong>.
            </p>
          </div>

          <div className="bg-white p-3 rounded border border-slate-200 space-y-1">
            <span className="font-bold text-blue-700">2. Unggah .tar.gz</span>
            <p className="text-slate-600 leading-relaxed">
              Pilih tombol upload berkas, lalu arahkan ke file <code className="font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">{sanitizedName}.tar.gz</code>.
            </p>
          </div>

          <div className="bg-white p-3 rounded border border-slate-200 space-y-1">
            <span className="font-bold text-blue-700">3. Jalankan Pengujian</span>
            <p className="text-slate-600 leading-relaxed">
              Klik <strong>Run Simulation</strong> dan pantau pergerakan visual robot Astrobee menyelesaikan misi secara 3D.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
