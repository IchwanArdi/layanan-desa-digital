const express = require('express');
const router = express.Router(); // Buat router modular untuk endpoint /dashboard

const isAuthenticated = require('../../middleware/auth'); // Middleware untuk pastikan user sudah login (dengan session)
const Pengaduan = require('../../models/Pengaduan'); // Model untuk data pengaduan dari warga
const PengajuanDokumen = require('../../models/PengajuanDokumen'); // Model untuk data pengajuan dokumen oleh warga
const { decryptPengajuanDokumen, decryptPengaduan, decryptArrayData } = require('../../utils/security/encryptionUtils'); // Fungsi dekripsi untuk data sensitif

// Endpoint GET /dashboard → hanya bisa diakses jika user login
router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const isAdmin = req.session.user.role === 'admin';

    // 🔹 Filter query: jika admin ambil semua, jika user ambil miliknya saja
    const pengaduanQuery = isAdmin ? {} : { warga: userId };
    const pengajuanQuery = isAdmin ? {} : { userId };

    // 🔹 Hitung total pengaduan
    const totalPengaduan = await Pengaduan.countDocuments(pengaduanQuery);
    const totalPengaduanProses = await Pengaduan.countDocuments({
      ...pengaduanQuery,
      status: { $in: ['menunggu', 'proses', 'ditindaklanjuti'] },
    });
    const totalPengaduanSelesai = await Pengaduan.countDocuments({
      ...pengaduanQuery,
      status: 'selesai',
    });

    // 🔹 Hitung total pengajuan dokumen
    const totalPengajuanDokumen = await PengajuanDokumen.countDocuments(pengajuanQuery);
    const totalPengajuanDokumenProses = await PengajuanDokumen.countDocuments({
      ...pengajuanQuery,
      status: { $in: ['pending', 'diproses'] },
    });
    const totalPengajuanDokumenSelesai = await PengajuanDokumen.countDocuments({
      ...pengajuanQuery,
      status: 'selesai',
    });

    // 🔹 Ambil data terbaru
    const pengaduanTerbaruRaw = await Pengaduan.find(pengaduanQuery).sort({ createdAt: -1 }).limit(5);
    const pengajuanDokumenTerbaruRaw = await PengajuanDokumen.find(pengajuanQuery).sort({ createdAt: -1 }).limit(5);

    // 🔹 Dekripsi data
    const pengaduanTerbaru = decryptArrayData(pengaduanTerbaruRaw, decryptPengaduan);
    const pengajuanDokumenTerbaru = decryptArrayData(pengajuanDokumenTerbaruRaw, decryptPengajuanDokumen);

    // 🔹 Kirim ke frontend
    res.json({
      nama: req.session.user.nama,
      role: req.session.user.role,
      isAdmin,

      // Pengaduan
      totalPengaduan,
      totalPengaduanProses,
      totalPengaduanSelesai,
      pengaduanTerbaru,

      // Pengajuan
      totalPengajuanDokumen,
      totalPengajuanDokumenProses,
      totalPengajuanDokumenSelesai,
      pengajuanDokumenTerbaru,
    });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.status(500).json({ message: 'Gagal memuat dashboard' });
  }
});

module.exports = router; // Ekspor router supaya bisa dipakai di app utama
