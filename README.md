# RupaKata — Pembuat Poster Tipografi

RupaKata adalah aplikasi web untuk mengubah kata, kutipan, dan ide menjadi poster tipografi sederhana. Aplikasi ini dibangun dengan Laravel 13 dan Blade, dengan antarmuka berbahasa Indonesia serta pendekatan desain Swiss Editorial Minimalist. Latar yang bersih, tipografi tegas, dan pengaturan yang ringkas menjaga perhatian pengguna pada isi poster.

Tujuan RupaKata adalah menyediakan ruang kreasi yang mudah digunakan untuk kebutuhan pribadi, materi komunitas, maupun konten media sosial. Pengguna dapat menyusun poster langsung di peramban tanpa membuat akun atau menyiapkan database. Teks dan pengaturan diproses di perangkat pengguna selama halaman terbuka; poster tidak disimpan ke server dan akan kembali ke kondisi awal ketika halaman dimuat ulang.

## Fitur utama

- Mengubah teks hingga 2.000 karakter dengan dukungan baris baru.
- Memilih lima keluarga font sistem: Arial, Georgia, Impact, Trebuchet, dan Courier.
- Mengatur ukuran font, warna teks, serta warna latar.
- Meratakan teks ke kiri, tengah, atau kanan.
- Memilih format persegi 1.080 × 1.080 piksel atau potret 1.080 × 1.350 piksel.
- Melihat perubahan secara langsung dan mengunduh gambar PNG.
- Membungkus teks panjang dan memperkecilnya otomatis agar tetap di area poster.
- Mengembalikan seluruh pengaturan melalui tombol Atur ulang.

## Teknologi

Laravel 13 menangani halaman dan rute, sedangkan Blade menyusun antarmuka. HTML5, CSS3, dan JavaScript murni menyediakan tata letak responsif serta interaksi editor. Vite mengemas aset. Canvas API menggambar pratinjau sekaligus menghasilkan PNG dari kanvas yang sama. Font memakai font lokal dengan pilihan pengganti apabila font utama tidak tersedia; tidak ada permintaan ke layanan font eksternal.

## Menggunakan editor

Masukkan teks pada kolom Teks poster. Tekan Enter untuk menentukan pergantian baris, lalu pilih font, ukuran, warna, perataan, dan format. Ukuran font dihitung pada resolusi poster, bukan ukuran layar. Jika teks terlalu panjang, pemberitahuan di bawah pratinjau menjelaskan ukuran yang disesuaikan. Klik Unduh PNG untuk menyimpan hasil. Teks kosong menghasilkan poster dengan warna latar saja.

## Menjalankan secara lokal

Siapkan PHP 8.3 atau lebih baru, Composer, serta Node.js 22.12+ yang mendukung Vite 8. Dari root proyek, jalankan:

```sh
composer install
cp .env.example .env
php artisan key:generate
npm ci
npm run build
php artisan serve
```

Buka `http://localhost:8000`. Tidak perlu menjalankan migrasi. Untuk pengembangan aset, jalankan `npm run dev` pada terminal terpisah.

Pada MAMP, pilih PHP minimal 8.3 dan arahkan document root ke `/Applications/MAMP/htdocs/rupakata-pembuat-poster-tipografi/public`. Sesuaikan `APP_URL` dengan alamat dan port MAMP. Jangan arahkan document root ke root proyek karena berkas internal harus tetap terlindungi.

## Pemeriksaan

Jalankan `php artisan test` dan `npm run build`. Setelah mengubah editor, periksa pratinjau, unduhan PNG, teks panjang, reset, serta tampilan desktop dan ponsel melalui peramban. Berkas `.env`, dependensi, dan hasil build dikecualikan dari Git; hanya `.env.example` yang dibagikan.
