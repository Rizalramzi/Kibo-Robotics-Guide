import React, { useState } from 'react';
import { WSL_COMMANDS } from '../data/guideData';
import { CodeBlock } from './CodeBlock';
import { Video, CheckCircle2, Circle, AlertTriangle, Monitor, Sparkles, Copy, Check } from 'lucide-react';

interface Chapter1WSLProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const Chapter1WSL: React.FC<Chapter1WSLProps> = ({ isCompleted, onToggleComplete }) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  const handleCopyAll = async () => {
    const allText = WSL_COMMANDS.map((c) => `# ${c.description}\n${c.command}`).join('\n\n');
    try {
      await navigator.clipboard.writeText(allText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section id="bab-1" className="py-10 border-b border-slate-200">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            <span>Bab 01</span>
            <span aria-hidden="true">·</span>
            <span>Konfigurasi Sistem Dasar</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Instalasi WSL & Ubuntu (Windows)
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
              <span>Bab 1 Selesai</span>
            </>
          ) : (
            <>
              <Circle className="w-4 h-4 text-slate-400" />
              <span>Tandai Selesai</span>
            </>
          )}
        </button>
      </div>

      {/* Intro Note */}
      <p className="text-sm text-slate-600 leading-relaxed mb-6">
        Windows Subsystem for Linux (WSL2) memungkinkan Anda menjalankan lingkungan Linux Ubuntu asli langsung di dalam Windows tanpa perlu dual-boot atau mesin virtual berat, ideal untuk sistem Robot Operating System (ROS).
      </p>

      {/* Video Reference Card */}
      <div className="mb-8 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-red-600" />
            <h3 className="text-xs sm:text-sm font-semibold text-slate-800">
              Video Tutorial Referensi: Pemasangan WSL di Windows
            </h3>
          </div>
          <button
            onClick={() => setShowVideo(!showVideo)}
            type="button"
            className="text-xs font-medium text-slate-600 hover:text-slate-900 underline"
          >
            {showVideo ? 'Sembunyikan Video' : 'Tampilkan Video'}
          </button>
        </div>

        {showVideo && (
          <div className="p-4 bg-slate-900">
            <div className="relative aspect-video max-w-3xl mx-auto rounded overflow-hidden shadow-sm bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/JzSZhdptuTs"
                title="Panduan Instalasi WSL di Windows"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-center text-xs text-slate-400 mt-2">
              Tonton video di atas jika Anda ingin melihat visualisasi langkah per langkah secara langsung.
            </p>
          </div>
        )}
      </div>

      {/* Steps Flow */}
      <div className="space-y-6">
        {/* Langkah 1 */}
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold shrink-0 mt-0.5">
              1
            </span>
            <div className="space-y-2 flex-1">
              <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                Langkah 1: Jalankan PowerShell sebagai Administrator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ketik <strong className="text-slate-800">"PowerShell"</strong> di kotak pencarian menu Start Windows, klik kanan pada ikon <strong className="text-slate-800">Windows PowerShell</strong>, lalu pilih <strong className="text-blue-700">"Run as Administrator"</strong> (Jalankan sebagai administrator).
              </p>
              <div className="bg-sky-50 text-sky-900 p-3 rounded text-xs border border-sky-200">
                <span className="font-semibold text-sky-950">Catatan Penting:</span> Hak Administrator wajib diperlukan untuk mengaktifkan fitur virtualisasi Windows Subsystem for Linux di tingkat kernel.
              </div>
            </div>
          </div>
        </div>

        {/* Langkah 2 */}
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-start gap-3 mb-4">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold shrink-0 mt-0.5">
              2
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                  Langkah 2: Perintah Dasar Pemasangan WSL
                </h3>
                <button
                  onClick={handleCopyAll}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 transition-colors"
                >
                  {copiedAll ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Tersalin Semua!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-600" />
                      <span>Salin Urutan Perintah</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Jalankan perintah-perintah berikut secara berurutan di jendela PowerShell Administrator Anda:
              </p>
            </div>
          </div>

          {/* List of 7 commands with badges */}
          <div className="grid grid-cols-1 gap-3.5 pl-0 sm:pl-9">
            {WSL_COMMANDS.map((cmd, idx) => (
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

          {/* Restart tip */}
          <div className="mt-4 pl-0 sm:pl-9">
            <div className="flex items-start gap-2 bg-amber-50 p-3 rounded border border-amber-200 text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-950">Tips Restart:</span> Jika setelah menjalankan <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">wsl --install</code> sistem meminta Anda untuk me-restart komputer, silakan restart komputer Anda terlebih dahulu sebelum melanjutkan ke Langkah 3.
              </div>
            </div>
          </div>
        </div>

        {/* Langkah 3 */}
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold shrink-0 mt-0.5">
              3
            </span>
            <div className="space-y-4 flex-1">
              <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                Langkah 3: Instalasi Ubuntu & Ekstensi VS Code
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Step 3.1 */}
                <div className="p-3.5 border border-slate-200 rounded-lg bg-slate-50/60 space-y-2">
                  <span className="text-xs font-bold text-blue-600">3.1 Pasang Ubuntu</span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Buka <strong className="text-slate-900">Microsoft Store</strong> di Windows, cari <strong>"Ubuntu"</strong> (atau Ubuntu 20.04 / 22.04 LTS), lalu klik tombol <strong className="text-blue-600">Install / Get</strong>.
                  </p>
                </div>

                {/* Step 3.2 */}
                <div className="p-3.5 border border-slate-200 rounded-lg bg-slate-50/60 space-y-2">
                  <span className="text-xs font-bold text-blue-600">3.2 Buat Akun Linux</span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Buka aplikasi Ubuntu dari Start Menu. Tunggu inisialisasi, lalu buat <em>username</em> dan <em>password</em> baru.
                  </p>
                  <p className="text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded border border-amber-200">
                    *Saat mengetik password di Linux, huruf memang sengaja tidak tampak di layar demi keamanan. Terus ketik lalu tekan Enter.
                  </p>
                </div>

                {/* Step 3.3 */}
                <div className="p-3.5 border border-slate-200 rounded-lg bg-slate-50/60 space-y-2">
                  <span className="text-xs font-bold text-blue-600">3.3 Ekstensi VS Code</span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Buka <strong className="text-slate-900">VS Code</strong> di Windows, buka tab <strong>Extensions</strong> (<kbd className="bg-slate-200 px-1 py-0.5 rounded text-[10px]">Ctrl+Shift+X</kbd>), cari dan pasang ekstensi resmi <strong className="text-blue-600">WSL</strong> dari Microsoft.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
