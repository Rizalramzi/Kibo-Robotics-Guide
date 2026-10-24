import React, { useState } from 'react';
import { Copy, Check, Terminal, ShieldAlert } from 'lucide-react';

interface CodeBlockProps {
  command: string;
  description?: string;
  env?: 'powershell' | 'ubuntu' | 'git';
  note?: string;
  stepNumber?: number;
  highlightWords?: string[];
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  command,
  description,
  env = 'ubuntu',
  note,
  stepNumber,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = command;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getEnvBadge = () => {
    if (env === 'powershell') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
          <Terminal className="w-3.5 h-3.5 text-blue-600" />
          PowerShell (Admin)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
        <Terminal className="w-3.5 h-3.5 text-amber-600" />
        Ubuntu WSL
      </span>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:border-slate-300 transition-colors">
      {/* Top Bar inside block */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-50 border-b border-slate-200 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          {stepNumber !== undefined && (
            <span className="font-semibold text-slate-800">
              {stepNumber}.
            </span>
          )}
          {getEnvBadge()}
        </div>
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Salin perintah"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded transition-colors active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Tersalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Salin</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-3.5 bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm overflow-x-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 select-none">$</span>
          <code className="text-blue-200 tracking-wide">{command}</code>
        </div>
      </div>

      {/* Description & Note */}
      {description && (
        <div className="px-3.5 py-2.5 bg-white text-xs text-slate-700 border-t border-slate-100">
          <p className="font-normal leading-relaxed text-slate-700">
            <span className="font-medium text-slate-900">Fungsi:</span> {description}
          </p>
          {note && (
            <div className="mt-1.5 flex items-start gap-1.5 text-xs text-amber-800 bg-amber-50/60 p-2 rounded border border-amber-200/60">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-snug">{note}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
