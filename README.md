# FitRank - Fitness Gamification App

Aplikasi fitness berbasis rank, di mana kemampuan fisikmu ditentukan oleh hasil tes nyata, bukan XP.

## Fitur Utama

### 1. **Placement Test**
- Tes awal terdiri dari 4 komponen:
  - **Push-up**: max reps
  - **Squat**: reps dalam 60 detik
  - **Plank**: durasi tahan (detik)
  - **Lari/Jalan 6 Menit**: jarak tempuh (meter)
- Hasil dihitung menjadi 6 stats (Pace, Strength, Endurance, Agility, Stability, Power)
- Menentukan rank awal dan divisi

### 2. **Daftar Rank**
- 12 rank hewan: Koala → Dog → Fox → Deer → Wild Hog → Alligator → Jaguar → Gorilla → Grizzly → Tiger → Lion → Polar Bear
- Setiap rank memiliki 3 divisi: III (terendah) → II → I (tertinggi)
- Akses via tombol 🏆 di profil

### 3. **Misi Harian**
- Sistem progres naik divisi berbasis misi harian
- Setiap hari mendapat 2 misi dari latihan yang memperkuat 2 stat terlemahmu
- **Input numerik**: masukkan hasil reps/waktu yang dicapai
- **Auto Naik Divisi**: jika hasil misi semua memenuhi target minimum, langsung naik divisi otomatis (tidak perlu kumpulkan misi)
- Target reps meningkat per divisi (lebih tinggi divisi = target lebih berat)
- Akses via tombol 📋 di profil

### 4. **Ujian Naik Rank (Promotion Trial / Boss Fight)**
- Unlock hanya jika kamu sudah di **Divisi I** rank saat ini
- Format berbeda setiap rank (unique tests per rank)
- Contoh format:
  - **Koala**: Push-up (20) + Squat (30)
  - **Dog**: Lari 1km + Plank 120s
  - **Tiger**: Push-up (50) + Squat (60) + Lari 1.6km + Plank 300s
  - **Polar Bear**: Push-up (100) + Squat (100) + Plank 600s + Lari 2km
- **Kriteria Lulus**: Fitness Rating (FR) ≥ 60 → **Rank Up** ke rank berikutnya (reset ke Divisi III)
- Akses via tombol ⚔️ di profil (hanya aktif jika sudah Divisi I)

### 5. **Profil**
Menampilkan:
- **Rank & Divisi** saat ini + OVR (Overall Rating)
- **6 Stats** dengan bar visualization
- **Peak Rank**: rank tertinggi yang pernah dicapai
- **Fitness Rating (FR)**: skor hasil ujian
- **Streak**: hari berturut-turut aktif
- **Total Workout**: jumlah tes/ujian yang sudah dikerjakan

## Cara Bermain

1. **Start**: Klik "Mulai Placement Test" untuk tes awal
2. **Lihat Profil**: Hasil tes langsung menampilkan rank awal kamu
3. **Misi Harian**: Klik 📋 untuk lihat dan selesaikan misi harian
   - Masukkan hasil latihan setiap misi
   - Jika semua target tercapai → **Auto Naik Divisi** ✓
4. **Naik Rank**: Setelah reach **Divisi I**, klik ⚔️ untuk ikuti ujian
   - Selesaikan tes unik sesuai rank
   - Lulus jika FR ≥ 60
5. **Lihat Ranking**: Klik 🏆 untuk lihat daftar semua 12 rank + progress-mu

## Data & Penyimpanan

- Semua data tersimpan **lokal di HP kamu** (localStorage browser)
- Tidak ada server, tidak ada koneksi internet yang diperlukan setelah app diinstall
- Data otomatis tersimpan setiap kali ada perubahan

## Teknologi

- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Storage**: Browser localStorage (persist across sessions)
- **Offline**: Service Worker untuk caching, bisa dimainkan tanpa internet
- **PWA**: Bisa diinstall sebagai app di Android/iOS

## Fitur Segera Hadir

- **Decay System**: Rank turun otomatis jika lama tidak aktif (dalam development)
- **Notification**: Reminder misi harian (dalam planning)

---

**FitRank v2** - Rank-mu adalah kemampuanmu. 🏆
