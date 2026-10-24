import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Chapter1WSL } from './components/Chapter1WSL';
import { Chapter2Clone } from './components/Chapter2Clone';
import { Chapter3Project } from './components/Chapter3Project';
import { Chapter4Packing } from './components/Chapter4Packing';
import { Chapter5GitPush } from './components/Chapter5GitPush';
import { TroubleshootingModal } from './components/TroubleshootingModal';
import { CheatSheetModal } from './components/CheatSheetModal';
import { Footer } from './components/Footer';
import { RotateCcw, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'kibo_guide_progress_v1';

export default function App() {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isTroubleshootingOpen, setIsTroubleshootingOpen] = useState(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedSteps));
    } catch {
      // storage quota or disabled
    }
  }, [completedSteps]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  const handleResetProgress = () => {
    if (window.confirm('Apakah Anda yakin ingin mengatur ulang tanda penyelesaian semua bab?')) {
      setCompletedSteps({});
    }
  };

  const totalStepsCount = 5;
  const completedStepsCount = Object.values(completedSteps).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Sticky Header with Top Bar Contract */}
      <Header
        completedStepsCount={completedStepsCount}
        totalStepsCount={totalStepsCount}
        onOpenTroubleshooting={() => setIsTroubleshootingOpen(true)}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          completedSteps={completedSteps}
          onToggleStep={toggleStep}
        />

        {/* Chapters Content Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 divide-y divide-slate-200">
          {/* Bab 1: WSL & Ubuntu */}
          <Chapter1WSL
            isCompleted={!!completedSteps['bab-1']}
            onToggleComplete={() => toggleStep('bab-1')}
          />

          {/* Bab 2: Klon Repositori */}
          <Chapter2Clone
            isCompleted={!!completedSteps['bab-2']}
            onToggleComplete={() => toggleStep('bab-2')}
          />

          {/* Bab 3: Membuka Proyek & File Utama */}
          <Chapter3Project
            isCompleted={!!completedSteps['bab-3']}
            onToggleComplete={() => toggleStep('bab-3')}
          />

          {/* Bab 4: Mengemas Program (packing.sh) */}
          <Chapter4Packing
            isCompleted={!!completedSteps['bab-4']}
            onToggleComplete={() => toggleStep('bab-4')}
          />

          {/* Bab 5: Simpan & Push ke GitHub */}
          <Chapter5GitPush
            isCompleted={!!completedSteps['bab-5']}
            onToggleComplete={() => toggleStep('bab-5')}
          />

          {/* Completion Celebration / Reset area */}
          <section className="py-10 text-center space-y-4">
            {completedStepsCount === totalStepsCount ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 max-w-lg mx-auto text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-950">
                  Selamat! Seluruh Alur Setup Selesai!
                </h3>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Lingkungan WSL2, repositori Kibo Robotics, VS Code, dan alur packing simulasi Anda telah siap sepenuhnya. Selamat berjuang di kompetisi Kibo-RPC!
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                Langkah demi langkah tersimpan otomatis di peramban Anda ({completedStepsCount} dari {totalStepsCount} bab selesai).
              </p>
            )}

            <button
              onClick={handleResetProgress}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-200/60 rounded transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Tanda Progres
            </button>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <TroubleshootingModal
        isOpen={isTroubleshootingOpen}
        onClose={() => setIsTroubleshootingOpen(false)}
      />

      <CheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
      />
    </div>
  );
}
