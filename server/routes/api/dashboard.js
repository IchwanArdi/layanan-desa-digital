const express = require('express');
const router = express.Router(); // Buat router modular untuk endpoint /dashboard

const isAuthenticated = require('../../middleware/auth'); // Middleware untuk pastikan user sudah login (dengan session)
const Pengaduan = require('../../models/Pengaduan'); // Model untuk data pengaduan dari warga
const PengajuanDokumen = require('../../models/PengajuanDokumen'); // Model untuk data pengajuan dokumen oleh warga
const { decryptPengajuanDokumen, decryptPengaduan, decryptArrayData } = require('../../utils/security/encryptionUtils'); // Fungsi dekripsi untuk data sensitif

// Endpoint GET /dashboard → hanya bisa diakses jika user login
router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user._id; // Ambil ID user dari session login

    // 🔹 Hitung jumlah pengaduan user
    const totalPengaduan = await Pengaduan.countDocuments({ warga: userId });
    const totalPengaduanProses = await Pengaduan.countDocuments({
      warga: userId,
      status: { $in: ['menunggu', 'proses', 'ditindaklanjuti'] }, // status belum selesai
    });
    const totalPengaduanSelesai = await Pengaduan.countDocuments({
      warga: userId,
      status: 'selesai', // status selesai
    });

    // 🔹 Hitung jumlah pengajuan dokumen user
    const totalPengajuanDokumen = await PengajuanDokumen.countDocuments({ userId });
    const totalPengajuanDokumenProses = await PengajuanDokumen.countDocuments({
      userId,
      status: { $in: ['pending', 'diproses'] },
    });
    const totalPengajuanDokumenSelesai = await PengajuanDokumen.countDocuments({
      userId,
      status: 'selesai',
    });

    // Data terbaru - dekripsi untuk tampilan
    const pengaduanTerbarulain = await Pengaduan.find({ warga: userId }).sort({ createdAt: -1 }).limit(5);
    const pengajuanDokumenTerbarulain = await PengajuanDokumen.find({ userId: userId }).sort({ createdAt: -1 }).limit(5);

    // Dekripsi data untuk tampilan
    const pengaduanTerbaru = decryptArrayData(pengaduanTerbarulain, decryptPengaduan);
    const pengajuanDokumenTerbaru = decryptArrayData(pengajuanDokumenTerbarulain, decryptPengajuanDokumen);

    // 🔹 Kirim data statistik sebagai response ke frontend
    res.json({
      nama: req.session.user.nama || 'User',

      // Pengaduan
      totalPengaduan,
      totalPengaduanProses,
      totalPengaduanSelesai,
      pengaduanTerbaru,
      totalPengaduanUser: totalPengaduan,
      totalPengaduanSelesaiUser: totalPengaduanSelesai,
      totalPengaduanProsesUser: totalPengaduanProses,

      // Pengajuan Dokumen
      totalPengajuanDokumen,
      totalPengajuanDokumenProses,
      totalPengajuanDokumenSelesai,
      pengajuanDokumenTerbaru,

      totalPengajuanDokumenUser: totalPengajuanDokumen,
      totalPengajuanDokumenSelesaiUser: totalPengajuanDokumenSelesai,
      totalPengajuanDokumenProsesUser: totalPengajuanDokumenProses,
    });
  } catch (error) {
    // 🔴 Jika ada error (misalnya database gagal), kirim data kosong agar dashboard tetap bisa ditampilkan
    console.error('Error loading dashboard:', error);
    res.status(500).json({
      nama: req.session.user?.nama || 'User',

      // Pengaduan kosong
      totalPengaduan: 0,
      totalPengaduanProses: 0,
      totalPengaduanSelesai: 0,
      pengaduanTerbaru: [],
      totalPengaduanUser: 0,
      totalPengaduanSelesaiUser: 0,
      totalPengaduanProsesUser: 0,

      // Pengajuan Dokumen kosong
      totalPengajuanDokumen: 0,
      totalPengajuanDokumenProses: 0,
      totalPengajuanDokumenSelesai: 0,
      pengajuanDokumenTerbaru: [],
      totalPengajuanDokumenUser: 0,
      totalPengajuanDokumenSelesaiUser: 0,
      totalPengajuanDokumenProsesUser: 0,
    });
  }
});

module.exports = router; // Ekspor router supaya bisa dipakai di app utama
