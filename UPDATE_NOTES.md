# Update Notes — Hapus Komentar Sendiri

## Perubahan
- **script.js**: Setiap browser sekarang punya `clientId` unik (disimpan di
  `localStorage` dengan key `lasoma_client_id`). ID ini ikut dikirim sebagai
  field `ownerId` saat menambah komentar.
- **script.js**: Tombol hapus (icon `fas fa-trash`) hanya muncul untuk komentar
  yang `ownerId`-nya sama dengan `clientId` browser. Jadi user cuma bisa hapus
  komentarnya sendiri — bukan komentar orang lain.
- **index.html**: Tidak ada perubahan struktur, hanya tambahan kecil method
  helper di `window.firebaseDB`.
- **firestore.rules**: Validasi field `ownerId` wajib ada saat create.

## Catatan Penting
Karena project ini **tidak pakai Firebase Auth**, kepemilikan komentar
dijaga di sisi UI (tombol hapus disembunyikan). Kalau mau benar-benar
aman dari user iseng yang ngakalin lewat console, project harus pakai
Firebase Auth (Anonymous/Email/Google) dan rules diubah jadi
`allow delete: if request.auth.uid == resource.data.ownerId;`.

## Cara apply rules
1. Buka Firebase Console → Firestore Database → Rules.
2. Paste isi `firestore.rules`.
3. Publish.

## Yang perlu user lakukan
Tidak ada. Begitu file di-deploy, user yang baru komen akan otomatis dapat
`clientId` baru, dan bisa hapus komentar mereka sendiri.

> Komentar lama (yang dibuat sebelum update ini) **tidak punya field `ownerId`**,
> jadi tombol hapusnya nggak akan muncul di siapa pun. Hapus manual lewat
> Firebase Console kalau mau dibersihkan.
