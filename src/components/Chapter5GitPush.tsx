import React, { useState } from 'react';
import { GIT_PUSH_COMMANDS } from '../data/guideData';
import { CodeBlock } from './CodeBlock';
import { CheckCircle2, Circle, GitPullRequest, Key, ShieldCheck, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface Chapter5GitPushProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const Chapter5GitPush: React.FC<Chapter5GitPushProps> = ({ isCompleted, onToggleComplete }) => {
  const [commitMsg, setCommitMsg] = useState('Update logika pergerakan waypoint Astrobee');
  const [copiedCommit, setCopiedCommit] = useState(false);
  const [showPatDetails, setShowPatDetails] = useState(true);

  const customCommitCmd = `git commit -m "${commitMsg.trim() || 'Update kode'}"`;

  const handleCopyCommit = async () => {
    try {
      await navigator.clipboard.writeText(customCommitCmd);
      setCopiedCommit(true);
      setTimeout(() => setCopiedCommit(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section id="bab-5" className="py-10 border-b border-slate-200">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            <span>Bab 05</span>
            <span aria-hidden="true">·</span>
            <span>Kolaborasi & Versi Kode</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Menyimpan & Mengirim Perubahan ke GitHub (<code className="text-blue-600 font-mono">git push</code>)
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
              <span>Bab 5 Selesai</span>
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
        Setelah Anda memodifikasi kode di VS Code dan memastikan program terkemas dengan baik, langkah terakhir adalah menyimpan riwayat perubahan dan mengirimnya ke repositori GitHub tim.
      </p>

      {/* Step A: Credential Helper (Sekali Saja) */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 mb-6 space-y-3">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-slate-900">
            A. Pengaturan Kredensial Otomatis (Cukup Dijalankan Sekali Saja)
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Agar Anda tidak perlu terus-menerus mengetik username dan token setiap kali melakukan push, aktifkan helper penyimpan kredensial Linux:
        </p>
        <CodeBlock
          command="git config --global credential.helper store"
          description="Menyimpan kredensial login GitHub di sistem WSL secara aman."
          env="ubuntu"
        />
      </div>

      {/* Step B: Alur Push Standar */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 mb-6 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <GitPullRequest className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-slate-900">
            B. Alur 3 Langkah Mengirim Perubahan (Add, Commit, Push)
          </h3>
        </div>

        {/* 1. git add . */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-800">1. Masukkan semua berkas yang diubah:</p>
          <CodeBlock
            command="git add ."
            description="Menambahkan semua perubahan file saat ini ke staging area."
            env="ubuntu"
          />
        </div>

        {/* 2. git commit -m */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold text-slate-800">2. Buat catatan perubahan (commit):</p>
          
          {/* Interactive commit message customizer */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md space-y-2">
            <label htmlFor="commit-input" className="block text-xs font-medium text-slate-700">
              Kustomisasi Pesan Commit Anda:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="commit-input"
                type="text"
                value={commitMsg}
                onChange={(e) => setCommitMsg(e.target.value)}
                placeholder="Deskripsi singkat perubahan kode"
                className="flex-1 px-3 py-1.5 text-xs font-mono border border-slate-300 rounded bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={handleCopyCommit}
                type="button"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors whitespace-nowrap"
              >
                {copiedCommit ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Baris Commit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <CodeBlock
            command={customCommitCmd}
            description="Menyimpan snapshot perubahan kode ke riwayat Git lokal dengan pesan Anda."
            env="ubuntu"
          />
        </div>

        {/* 3. git push */}
        <div className="space-y-1 pt-2">
          <p className="text-xs font-semibold text-slate-800">3. Unggah ke repositori GitHub daring:</p>
          <CodeBlock
            command="git push origin main"
            description="Mengirim seluruh commit lokal ke branch main di server GitHub."
            env="ubuntu"
          />
        </div>
      </div>

      {/* Catatan Penting Pemula: Personal Access Token (PAT) */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <h3 className="text-sm font-bold text-amber-950">
              Catatan Penting Pemula: Wajib Menggunakan Personal Access Token (PAT)
            </h3>
          </div>
          <button
            onClick={() => setShowPatDetails(!showPatDetails)}
            type="button"
            className="text-xs font-medium text-amber-800 hover:text-amber-950 flex items-center gap-1"
          >
            {showPatDetails ? (
              <>
                <span>Sembunyikan Panduan</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Lihat Panduan Token</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-amber-900 mt-2 leading-relaxed">
          Saat menjalankan <code className="bg-amber-100 font-mono px-1 py-0.5 rounded text-amber-950">git push</code>, terminal akan menanyakan <strong>Username</strong> dan <strong>Password</strong>.
          <br />
          ⚠️ <strong className="text-amber-950">Perhatian:</strong> Jangan masukkan kata sandi akun web GitHub Anda! Sejak Agustus 2021, GitHub mewajibkan <strong>Personal Access Token (PAT)</strong> sebagai password.
        </p>

        {showPatDetails && (
          <div className="mt-4 pt-4 border-t border-amber-200 space-y-3 text-xs text-amber-950">
            <p className="font-semibold">Cara Mendapatkan Personal Access Token di GitHub (1 Menit):</p>
            <ol className="list-decimal pl-5 space-y-1.5 leading-relaxed">
              <li>
                Buka situs <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer" className="underline font-semibold text-blue-700 hover:text-blue-900">github.com/settings/tokens</a>.
              </li>
              <li>
                Klik tombol <strong className="text-slate-900">Generate new token</strong> lalu pilih <strong className="text-slate-900">Generate new token (classic)</strong>.
              </li>
              <li>
                Isi kotak <strong>Note</strong> (misal: <em>Kibo Robot WSL Token</em>) dan tentukan masa berlaku token (misal: <em>90 days</em>).
              </li>
              <li>
                Beri centang pada izin <strong className="text-slate-900">repo</strong> (Full control of private repositories).
              </li>
              <li>
                Gulir ke bagian bawah halaman, lalu klik tombol hijau <strong className="text-slate-900">Generate token</strong>.
              </li>
              <li>
                Salin kode token yang diawali dengan <code className="bg-amber-100 font-mono px-1 py-0.5 rounded font-semibold text-slate-900">ghp_...</code> dan simpan di tempat aman.
              </li>
              <li>
                Kembali ke terminal WSL: saat diminta <code className="font-mono">Password:</code>, tekan klik kanan atau tempel token tersebut lalu tekan Enter (karakter tidak akan nampak saat ditempel).
              </li>
            </ol>
          </div>
        )}
      </div>
    </section>
  );
};
