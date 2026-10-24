import { CommandItem, TroubleshootingItem } from '../types';

export const WSL_COMMANDS: CommandItem[] = [
  {
    id: 'wsl-version',
    command: 'wsl --version',
    description: 'Mengecek versi WSL yang terpasang pada Windows Anda.',
    env: 'powershell',
    note: 'Jika perintah ini menampilkan versi, WSL sudah mulai terpasang di sistem Anda.',
  },
  {
    id: 'wsl-install',
    command: 'wsl --install',
    description: 'Memasang komponen WSL utama dan platform virtual mesin Windows.',
    env: 'powershell',
    note: 'Membutuhkan restart komputer setelah proses instalasi selesai.',
  },
  {
    id: 'wsl-update',
    command: 'wsl --update',
    description: 'Memperbarui kernel Linux WSL ke versi paling mutakhir dan stabil.',
    env: 'powershell',
  },
  {
    id: 'wsl-list',
    command: 'wsl --list --verbose',
    description: 'Melihat daftar distro Linux yang terpasang beserta versi WSL (1 atau 2).',
    env: 'powershell',
    note: 'Pastikan kolom VERSION bernilai 2 untuk performa maksimal ROS.',
  },
  {
    id: 'wsl-status',
    command: 'wsl --status',
    description: 'Mengecek status konfigurasi umum WSL dan versi kernel aktif.',
    env: 'powershell',
  },
  {
    id: 'wsl-set-v2',
    command: 'wsl --set-default-version 2',
    description: 'Memastikan seluruh instalasi Linux baru otomatis menggunakan WSL2.',
    env: 'powershell',
    note: 'WSL2 diperlukan untuk kompatibilitas penuh ROS Noetic dan Catkin build.',
  },
  {
    id: 'wsl-status-verify',
    command: 'wsl --status',
    description: 'Verifikasi ulang status WSL setelah pengaturan versi default 2.',
    env: 'powershell',
  },
];

export const CLONE_COMMANDS: CommandItem[] = [
  {
    id: 'clone-mkdir',
    command: 'mkdir -p ~/krpc',
    description: 'Membuat direktori kerja baru bernama krpc di dalam home folder Linux Anda.',
    env: 'ubuntu',
    note: 'Tanda ~ (tilde) merujuk pada direktori /home/username Anda di WSL.',
  },
  {
    id: 'clone-cd',
    command: 'cd ~/krpc',
    description: 'Masuk ke dalam folder kerja krpc yang baru saja dibuat.',
    env: 'ubuntu',
  },
  {
    id: 'clone-git',
    command: 'git clone https://github.com/Rizalramzi/Kibo-Robotics.git',
    description: 'Mengunduh seluruh berkas repositori resmi Kibo-Robotics ke folder lokal.',
    env: 'ubuntu',
    note: 'Repositori berisi ROS Catkin workspace dan skrip otomatisasi packing.',
  },
];

export const PROJECT_COMMANDS: CommandItem[] = [
  {
    id: 'proj-cd',
    command: 'cd ~/krpc/Kibo-Robotics',
    description: 'Masuk ke dalam folder repositori Kibo-Robotics yang sudah diklon.',
    env: 'ubuntu',
  },
  {
    id: 'proj-code',
    command: 'code .',
    description: 'Membuka Visual Studio Code yang langsung terhubung ke lingkungan WSL Ubuntu.',
    env: 'ubuntu',
    note: 'Titik (.) berarti membuka folder saat ini. VS Code akan membuka dengan mode WSL.',
  },
];

export const GIT_PUSH_COMMANDS: CommandItem[] = [
  {
    id: 'git-cred',
    command: 'git config --global credential.helper store',
    description: 'Menyimpan kredensial GitHub di WSL sehingga Anda tidak perlu login berulang kali.',
    env: 'ubuntu',
    note: 'Jalankan perintah ini hanya satu kali saja di awal setup.',
  },
  {
    id: 'git-add',
    command: 'git add .',
    description: 'Menandai seluruh berkas yang telah dimodifikasi untuk siap disimpan.',
    env: 'ubuntu',
  },
  {
    id: 'git-commit',
    command: 'git commit -m "Deskripsi singkat perubahan kode"',
    description: 'Menyimpan riwayat perubahan lokal dengan pesan deskriptif yang jelas.',
    env: 'ubuntu',
    note: 'Gantilah isi di dalam tanda kutip dengan ringkasan apa yang Anda ubah.',
  },
  {
    id: 'git-push',
    command: 'git push origin main',
    description: 'Mengunggah seluruh commit lokal ke repositori GitHub cabang main.',
    env: 'ubuntu',
    note: 'Masukkan username GitHub Anda, lalu masukkan Personal Access Token (PAT) sebagai password.',
  },
];

export const TROUBLESHOOTING_DATA: TroubleshootingItem[] = [
  {
    id: 'bios-virtualization',
    issue: 'WslRegisterDistribution failed with error: 0x80370102',
    symptom: 'Muncul pesan error "Please enable the Virtual Machine Platform Windows feature and ensure virtualization is enabled in the BIOS".',
    cause: 'Fitur Intel Virtualization Technology (Intel VT-x) atau AMD-V belum diaktifkan di pengaturan BIOS motherboard laptop/PC Anda.',
    solution: 'Restart komputer Anda, masuk ke BIOS (tekan F2, F12, atau DEL saat komputer menyala), cari menu "CPU Configuration" atau "Advanced", lalu ubah "Virtualization Technology" atau "SVM Mode" menjadi ENABLED. Simpan (F10) dan nyalakan kembali Windows.',
  },
  {
    id: 'code-not-found',
    issue: 'Perintah "code ." tidak ditemukan (command not found: code)',
    symptom: 'Saat mengetik code . di terminal WSL, muncul pesan: code: command not found.',
    cause: 'VS Code di Windows belum menambahkan path bin ke environment variable sistem, atau ekstensi WSL belum terpasang.',
    solution: '1. Buka VS Code di Windows. 2. Tekan Ctrl + Shift + P, ketik "Shell Command: Install \'code\' command in PATH", lalu tekan Enter. 3. Pasang ekstensi "WSL" di tab Extensions (Ctrl + Shift + X). 4. Tutup terminal Ubuntu dan buka kembali.',
  },
  {
    id: 'packing-permission',
    issue: 'Permission denied saat menjalankan ./packing.sh',
    symptom: 'Saat mengetik ./packing.sh NamaFile, muncul pesan: bash: ./packing.sh: Permission denied.',
    cause: 'Skrip packing.sh belum memiliki izin eksekusi (executable bit) di sistem file Linux.',
    solution: 'Berikan izin eksekusi dengan perintah: chmod +x packing.sh lalu coba jalankan kembali skrip pengemasan.',
    commands: ['chmod +x packing.sh', './packing.sh NamaFileKalian'],
  },
  {
    id: 'git-token-expired',
    issue: 'Support for password authentication was removed (GitHub Push Gagal)',
    symptom: 'Saat git push, Anda memasukkan password akun GitHub lalu muncul pesan: "remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead."',
    cause: 'GitHub tidak lagi mengizinkan autentikasi berbasis kata sandi akun untuk operasi git clone/push melalui HTTPS.',
    solution: 'Gunakan Personal Access Token (PAT). Buka GitHub -> Settings -> Developer Settings -> Personal access tokens -> Tokens (classic) -> Generate new token -> Centang scope "repo" -> Salin token tersebut dan tempel (paste) sebagai password saat diminta di terminal.',
  },
  {
    id: 'slow-filesystem',
    issue: 'Proses build Catkin atau Git sangat lambat di WSL',
    symptom: 'Operasi git clone atau build terasa memakan waktu puluhan menit.',
    cause: 'Folder proyek ditaruh di dalam partisi Windows (/mnt/c/Users/...) bukan di root Linux (~/krpc).',
    solution: 'Selalu simpan proyek robotika Anda di dalam direktori Linux asli seperti ~/krpc/Kibo-Robotics. Hindari bekerja di dalam folder /mnt/c/ karena transfer I/O lintas sistem berkas Windows-WSL sangat lambat.',
  },
];
