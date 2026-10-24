import React, { useState } from 'react';
import { TROUBLESHOOTING_DATA } from '../data/guideData';
import { TroubleshootingItem } from '../types';
import { X, HelpCircle, Search, Copy, Check, Terminal, AlertCircle } from 'lucide-react';

interface TroubleshootingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TroubleshootingModal: React.FC<TroubleshootingModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredItems = TROUBLESHOOTING_DATA.filter(
    (item) =>
      item.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symptom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cause.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.solution.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyCmd = async (cmd: string, id: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-xl border border-slate-200 w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in duration-200">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Pusat Bantuan & Solusi Kendala Umum (FAQ)
              </h2>
              <p className="text-xs text-slate-500">
                Solusi praktis untuk pesan error yang sering dihadapi pemula Kibo Robotics.
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

        {/* Search bar */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kata kunci error (misal: BIOS, permission, password, code)..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-4 divide-y divide-slate-100 flex-1">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              Tidak ada solusi yang cocok dengan kata kunci pencarian Anda.
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                    {item.issue}
                  </h3>
                </div>

                <div className="pl-6 space-y-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                    <span className="font-semibold text-slate-700">Gejala Error: </span>
                    <span className="text-slate-600 font-mono text-[11px]">{item.symptom}</span>
                  </div>

                  <p className="text-slate-600 leading-relaxed">
                    <strong className="text-slate-800">Penyebab:</strong> {item.cause}
                  </p>

                  <div className="bg-blue-50/60 p-3 rounded border border-blue-200 text-blue-950 leading-relaxed">
                    <strong className="font-semibold text-blue-900">Solusi:</strong> {item.solution}
                  </div>

                  {item.commands && (
                    <div className="pt-1 flex flex-wrap gap-2">
                      {item.commands.map((cmd) => (
                        <div
                          key={cmd}
                          className="flex items-center gap-2 bg-slate-900 text-slate-100 px-3 py-1.5 rounded font-mono text-xs"
                        >
                          <Terminal className="w-3.5 h-3.5 text-blue-400" />
                          <span>{cmd}</span>
                          <button
                            onClick={() => handleCopyCmd(cmd, cmd)}
                            type="button"
                            className="text-slate-400 hover:text-white ml-2 text-[11px] flex items-center gap-1"
                          >
                            {copiedId === cmd ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
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
