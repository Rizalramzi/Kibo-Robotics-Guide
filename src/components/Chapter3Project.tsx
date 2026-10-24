import React, { useState } from 'react';
import { PROJECT_COMMANDS } from '../data/guideData';
import { CodeBlock } from './CodeBlock';
import { CheckCircle2, Circle, FileCode, FolderTree, FileText, ChevronRight, Terminal } from 'lucide-react';

interface Chapter3ProjectProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const Chapter3Project: React.FC<Chapter3ProjectProps> = ({ isCompleted, onToggleComplete }) => {
  const [selectedFile, setSelectedFile] = useState<'user_template' | 'packing_sh'>('user_template');

  return (
    <section id="bab-3" className="py-10 border-b border-slate-200">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            <span>Bab 03</span>
            <span aria-hidden="true">·</span>
            <span>Navigasi & Arsitektur Berkas</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Membuka Proyek & Mengenal File Utama
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
              <span>Bab 3 Selesai</span>
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
        Setelah repositori berhasil diklon, jalankan perintah berikut di terminal Ubuntu untuk membuka kode di editor Visual Studio Code.
      </p>

      {/* Code to open VS Code */}
      <div className="space-y-3 mb-8">
        {PROJECT_COMMANDS.map((cmd, idx) => (
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

      {/* Interactive Project Structure & Key Files */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-900">
              Struktur Berkas Penting Kibo-Robotics
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">ROS Catkin Architecture</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {/* File selector list */}
          <div className="md:col-span-5 p-3 space-y-2 bg-slate-50/40">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-2 pt-1">
              Pilih Berkas untuk Dipelajari:
            </p>

            {/* File 1: user_template.py */}
            <button
              onClick={() => setSelectedFile('user_template')}
              type="button"
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selectedFile === 'user_template'
                  ? 'bg-white border-blue-500 shadow-xs ring-1 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-2">
                <FileCode className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-900">user_template.py</p>
                  <p className="text-[11px] text-slate-500 font-mono truncate">
                    catkin_ws/.../user_template.py
                  </p>
                  <p className="text-xs text-slate-600 mt-1.5 leading-snug">
                    Tempat menulis dan mengedit seluruh logika pergerakan robot Astrobee.
                  </p>
                </div>
              </div>
            </button>

            {/* File 2: packing.sh */}
            <button
              onClick={() => setSelectedFile('packing_sh')}
              type="button"
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selectedFile === 'packing_sh'
                  ? 'bg-white border-blue-500 shadow-xs ring-1 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-900">packing.sh</p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    ./packing.sh
                  </p>
                  <p className="text-xs text-slate-600 mt-1.5 leading-snug">
                    Skrip bash untuk mengemas program menjadi file .tar.gz siap simulator.
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Code preview & explanation panel */}
          <div className="md:col-span-7 p-4 bg-white flex flex-col justify-between">
            {selectedFile === 'user_template' ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-mono font-medium text-slate-800">
                    catkin_ws/src/krpc_user/scripts/user_template.py
                  </span>
                  <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-medium">
                    Logika Robot Utama
                  </span>
                </div>

                <div className="bg-slate-950 text-slate-200 p-3.5 rounded font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                  <p className="text-slate-500">#!/usr/bin/env python</p>
                  <p className="text-slate-500"># Logika Kontrol Robot Astrobee (Kibo-RPC)</p>
                  <p className="text-blue-400">import <span className="text-slate-100">rospy</span></p>
                  <p className="text-blue-400">from <span className="text-slate-100">geometry_msgs.msg</span> import <span className="text-slate-100">Point, Quaternion</span></p>
                  <br />
                  <p className="text-purple-300">def <span className="text-yellow-300">your_plan</span>():</p>
                  <p className="pl-4 text-slate-400"># 1. Pindah ke target Point A</p>
                  <p className="pl-4 text-emerald-300">p1 = Point(11.27, -9.92, 5.29)</p>
                  <p className="pl-4 text-emerald-300">q1 = Quaternion(0, 0, -0.707, 0.707)</p>
                  <p className="pl-4 text-cyan-300">moveTo(p1, q1)</p>
                  <br />
                  <p className="pl-4 text-slate-400"># 2. Nyalakan laser pointer sasaran</p>
                  <p className="pl-4 text-cyan-300">laserControl(True)</p>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
                  <span className="font-semibold text-slate-900">Peran Berkas:</span> Ini adalah satu-satunya berkas Python tempat tim Anda mengimplementasikan algoritma navigasi, pembacaan kamera AR Tag, kalkulasi orientasi (kuaternion), dan penembakan laser ke target.
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-mono font-medium text-slate-800">
                    ./packing.sh
                  </span>
                  <span className="text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-medium">
                    Skrip Otomasi Pengemasan
                  </span>
                </div>

                <div className="bg-slate-950 text-slate-200 p-3.5 rounded font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                  <p className="text-slate-500">#!/usr/bin/env bash</p>
                  <p className="text-slate-500"># Mengompresi paket ROS menjadi format simulator</p>
                  <p className="text-yellow-300">TARGET_NAME<span className="text-white">=</span><span className="text-emerald-300">"$1"</span></p>
                  <br />
                  <p className="text-blue-400">tar <span className="text-slate-300">-czf</span> <span className="text-emerald-300">"{'${TARGET_NAME}'}.tar.gz"</span> <span className="text-slate-300">\</span></p>
                  <p className="pl-4 text-slate-300">-C catkin_ws/src krpc_user</p>
                  <br />
                  <p className="text-purple-300">echo <span className="text-emerald-300">"Berhasil mengemas: {'${TARGET_NAME}'}.tar.gz"</span></p>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
                  <span className="font-semibold text-slate-900">Peran Berkas:</span> Skrip bash ini memadatkan paket workspace Anda menjadi arsip terkompresi <code className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200 text-slate-800">.tar.gz</code> yang valid sesuai format yang diwajibkan oleh server JAXA Web Simulator.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
