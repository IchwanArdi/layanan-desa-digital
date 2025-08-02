const express = require('express');
const router = express.Router(); // Buat router modular untuk endpoint /dashboard

const isAuthenticated = require('../../middleware/auth'); // Middleware untuk pastikan user sudah login (dengan session)
const Pengaduan = require('../../models/Pengaduan'); // Model untuk data pengaduan dari warga
const { encryptPengaduan } = require('../../utils/security/encryptionUtils'); // Fungsi dekripsi untuk data sensitif

router.post('/pengaduan', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user._id; // Ambil ID user dari session login

    // Ambil data pengaduan dari request body
    const { judul, kategori, lokasi, deskripsi } = req.body;

    // Validasi input
    if (!judul || !kategori || !lokasi || !deskripsi) {
      return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    const pengaduanData = {
      judul: judul.trim(),
      kategori,
      lokasi: lokasi.trim(),
      deskripsi: deskripsi.trim(),
      warga: userId, // Set ID user yang mengajukan
      status: 'menunggu', // Status awal pengaduan
    };

    // Enkripsi data sensitif sebelum disimpan
    const encryptedPengaduan = encryptPengaduan(pengaduanData);

    // Simpan pengaduan ke database
    const newPengaduan = new Pengaduan({
      ...encryptedPengaduan,
      warga: userId, // Set ID user yang mengajukan
    });

    await newPengaduan.save();

    res.status(201).json({ message: 'Pengaduan berhasil dibuat', pengaduan: newPengaduan });
  } catch (error) {
    console.error('Gagal membuat pengaduan:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat membuat pengaduan' });
  }
});

module.exports = router;
