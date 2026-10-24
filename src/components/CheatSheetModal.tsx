import React, { useState } from 'react';
import { WSL_COMMANDS, CLONE_COMMANDS, PROJECT_COMMANDS, GIT_PUSH_COMMANDS } from '../data/guideData';
import { CommandItem } from '../types';
import { X, Terminal, Copy, Check, Filter } from 'lucide-react';

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'powershell' | 'ubuntu'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const packingCmd: CommandItem = {
    id: 'packing-cmd',
    command: './packing.sh NamaFileKalian',
    description: 'Mengompresi kode robotika menjadi file NamaFileKalian.tar.gz untuk simulator.',
    env: 'ubuntu',
  };

  const allCommands: CommandItem[] = [
    ...WSL_COMMANDS,
    ...CLONE_COMMANDS,
    ...PROJECT_COMMANDS,
    packingCmd,
    ...GIT_PUSH_COMMANDS,
  ];

  const filteredCommands = allCommands.filter((cmd) => {
    if (filter === 'all') return true;
    return cmd.env === filter;
  });

  const handleCopy = async (command: string, id: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyAll = async () => {
    const text = filteredCommands.map((c) => `# ${c.description}\n${c.command}`).join('\n\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId('ALL');
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-xl border border-slate-200 w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-slate-800" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Cheat Sheet Ringkasan Semua Perintah
              </h2>
              <p className="text-xs text-slate-500">
                Koleksi seluruh baris perintah untuk terminal PowerShell dan Ubuntu WSL.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded transition-colors"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters and Batch Actions */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({allCommands.length})
            </button>
            <button
              onClick={() => setFilter('powershell')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                filter === 'powershell'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              PowerShell (Windows)
            </button>
            <button
              onClick={() => setFilter('ubuntu')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                filter === 'ubuntu'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ubuntu WSL (Linux)
            </button>
          </div>

          <button
            onClick={handleCopyAll}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded transition-colors"
          >
            {copiedId === 'ALL' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Tersalin Seluruhnya!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Salin Tampilan ({filteredCommands.length})</span>
              </>
            )}
          </button>
        </div>

        {/* Command list table */}
        <div className="overflow-y-auto p-4 flex-1 divide-y divide-slate-100">
          <div className="space-y-3">
            {filteredCommands.map((cmd) => (
              <div
                key={cmd.id}
                className="p-3 bg-white hover:bg-slate-50/70 border border-slate-200 rounded-md transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded ${
                        cmd.env === 'powershell'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {cmd.env === 'powershell' ? 'PowerShell' : 'Ubuntu WSL'}
                    </span>
                    <span className="text-xs text-slate-600">{cmd.description}</span>
                  </div>
                  <div className="font-mono text-xs sm:text-sm text-slate-900 bg-slate-100 px-2.5 py-1.5 rounded select-all font-semibold">
                    {cmd.command}
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(cmd.command, cmd.id)}
                  type="button"
                  className="self-end sm:self-center shrink-0 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded transition-colors"
                >
                  {copiedId === cmd.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
