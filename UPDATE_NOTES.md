# Lasoma SMAN 5 Tuban — Update Notes

## 1. Perbaikan Visi & Misi (Desktop)
File: `style.css`
- `vision-grid` pakai `minmax(0, ...)` + `min-width: 0` pada children → tidak ada lagi teks mission card yang kepotong / overflow ke kanan.
- `vision-main` jadi **sticky** di desktop (`position: sticky; top: 100px`) supaya ngikutin scroll waktu user baca 6 misi di kanan.
- Di layar ≥1025px, daftar misi otomatis jadi **2 kolom** biar tinggi balance dengan kartu visi utama.
- Tampilan mobile/tablet (≤1024px) tidak berubah (sticky di-reset, grid jadi 1 kolom seperti semula).

## 2. Database — Firebase Firestore
Komentar yang tadinya disimpan di `localStorage` sekarang langsung tersimpan & sinkron real-time via Firestore.

### Setup
1. Buat project di https://console.firebase.google.com
2. Aktifkan **Firestore Database** (mode production).
3. Di Project Settings → General → Your apps → Web app, copy `firebaseConfig`.
4. Buka `index.html`, cari blok `const firebaseConfig = { ... }` (baris dekat akhir file), ganti semua nilai `GANTI_*` dengan punya kamu.
5. Di tab **Rules** Firestore, paste isi file `firestore.rules`, lalu Publish.

### Struktur data
Collection: `comments`
```
{
  name: string (2-60 char),
  message: string (3-1000 char),
  createdAt: serverTimestamp
}
```

### Rules ringkas
- Publik bisa **baca** & **kirim** komentar.
- Validasi field, panjang, dan timestamp dilakukan di server.
- **Update / delete** dari client diblokir (hanya admin via Console).
