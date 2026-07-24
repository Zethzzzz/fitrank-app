# FitRank Update v2.0 - Fitur Baru

## ✨ Fitur yang Ditambahkan

### 1. **Daftar Rank (🏆 button)**
- Lihat semua 12 rank dalam satu layar
- Tahu rank mana yang sedang kamu jalani (highlight emas)
- Lihat progress divisi di setiap rank

### 2. **Misi Harian (📋 button)**
- **Auto Generate**: Setiap hari, 2 misi otomatis dibuat dari 2 stat terlemahmu
- **Input Reps**: Masukkan jumlah reps/waktu yang berhasil kamu capai
- **Auto Naik Divisi**: Ketika hasil semua misi mencapai target minimum → langsung naik divisi
- **Target Dinamis**: Target reps berbeda di setiap divisi (naik divisi = target lebih berat)

**Contoh alur:**
- Hari 1: Dapat misi Push-up 25 reps + Squat 30 reps (Koala Divisi I)
- Input hasil: Push-up 26 reps + Squat 31 reps
- ✓ Semua target tercapai → **Naik ke Dog Divisi III** otomatis
- Hari 2: Misi baru dari Dog rank (target lebih tinggi)

### 3. **Ujian Naik Rank / Promotion Trial (⚔️ button)**
- Unlock: Hanya bisa attempt jika sudah **Divisi I** di rank saat ini
- **Format Unik Per Rank**: Setiap rank punya tes berbeda
- **Kriteria Lulus**: FR ≥ 60 → Naik ke rank berikutnya (reset ke Divisi III)
- **Hasil Gagal**: FR < 60 → Tetap di rank yang sama, bisa coba lagi

**Contoh Format Ujian:**
- **Koala**: Push-up (20) + Squat (30) = tes dasar
- **Fox**: Push-up (30) + Squat (40) + Burpee (15) = speed/agility test
- **Tiger**: Push-up (50) + Squat (60) + Lari 1.6km + Plank 300s = all-around peak test
- **Polar Bear**: Push-up (100) + Squat (100) + Plank 600s + Lari 2km = ultimate test

### 4. **Profil Update**
- Tambah info **FR (Fitness Rating)** dari hasil ujian
- Tambah info **Peak Rank** (rank tertinggi yang pernah dicapai)
- 3 tombol di header: 📋 (Misi), 🏆 (Rank List), ↻ (Tes Ulang)
- Boss Fight button berubah warna tergantung eligibility (hijau = ready, abu = locked)

## 🔄 Alur Permainan Lengkap

```
Placement Test
    ↓
Profil & Rank Initial
    ↓
Misi Harian (kumpulkan hasil) → Auto Naik Divisi
    ↓ (repeat sampai Divisi I)
Divisi I → Ujian Naik Rank
    ↓
FR ≥ 60? → YES → Rank Up (reset Divisi III) → Repeat
            → NO → Tetap rank, bisa coba lagi
```

## 📊 Sistem Penilaian Misi Harian

**Target Reps per Divisi (contoh Koala rank):**

| Latihan | Divisi III | Divisi II | Divisi I |
|---------|-----------|-----------|---------|
| Push-up | 15 reps   | 20 reps   | 25 reps |
| Squat   | 20 reps   | 25 reps   | 30 reps |
| Plank   | 60s       | 90s       | 120s    |
| Lari    | 800m      | 1000m     | 1200m   |

Target terus meningkat seiring rank naik. Semakin tinggi rank = semakin challenging misi.

## 🎯 Strategi Naik Rank Cepat

1. **Fokus Misi Harian**: Naik divisi konsisten (3 divisi per rank = 3 siklus misi)
2. **Target Minimum**: Jangan shoot untuk melampaui target banyak—capai target saja cukup
3. **Ujian Saat Ready**: Jangan ijin saat FR ≥ 60, coba di atas 70-80 untuk margin aman
4. **2 Stat Terlemah**: Misi selalu ke-generate dari stat terlemahmu → gunakan kesempatan ini untuk balance stats

## 🔧 Troubleshooting

**Q: Tombol Ujian/Boss Fight Disabled?**
A: Kamu belum di Divisi I. Selesaikan misi sampai naik ke Divisi I dulu.

**Q: Misi belum reset hari berikutnya?**
A: Misi auto-reset setiap hari UTC. Kalo belum reset, force-refresh browser (Ctrl+F5).

**Q: Naik divisi tapi hasil tidak sesuai ekspektasi?**
A: Sistem auto-naik divisi berdasarkan hasil vs target. Jika kedua misi mencapai target → naik langsung, tidak perlu tunggu hari berikutnya.

---

**Nikmati permainan, keep grinding! 💪🏆**
