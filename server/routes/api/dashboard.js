const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../middleware/auth'); // ✅ benar
const Pengaduan = require('../../models/Pengaduan');
const PengajuanDokumen = require('../../models/PengajuanDokumen');
// const { decryptPengaduan, decryptPengajuanDokumen, decryptArrayData } = require('../../utils/decryptUtils'); // jika nanti perlu

router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user._id;
    console.log('Dashboard - User ID:', userId);

    // Data Pengaduan
    const totalPengaduan = await Pengaduan.countDocuments({ warga: userId });
    const totalPengaduanProses = await Pengaduan.countDocuments({
      warga: userId,
      status: { $in: ['menunggu', 'proses', 'ditindaklanjuti'] },
    });
    const totalPengaduanSelesai = await Pengaduan.countDocuments({
      warga: userId,
      status: 'selesai',
    });

    // Data Pengajuan Dokumen
    const totalPengajuanDokumen = await PengajuanDokumen.countDocuments({ userId });
    const totalPengajuanDokumenProses = await PengajuanDokumen.countDocuments({
      userId,
      status: { $in: ['pending', 'diproses'] },
    });
    const totalPengajuanDokumenSelesai = await PengajuanDokumen.countDocuments({
      userId,
      status: 'selesai',
    });

    console.log('Dashboard stats:', {
      totalPengaduan,
      totalPengaduanProses,
      totalPengaduanSelesai,
      totalPengajuanDokumen,
      totalPengajuanDokumenProses,
      totalPengajuanDokumenSelesai,
    });

    res.json({
      nama: req.session.user.nama || 'User',

      // Data Pengaduan
      totalPengaduan,
      totalPengaduanProses,
      totalPengaduanSelesai,
      pengaduanTerbaru: [], // Tambahkan jika ingin ambil data real
      totalPengaduanUser: totalPengaduan,
      totalPengaduanSelesaiUser: totalPengaduanSelesai,
      totalPengaduanProsesUser: totalPengaduanProses,

      // Data Pengajuan Dokumen
      totalPengajuanDokumen,
      totalPengajuanDokumenProses,
      totalPengajuanDokumenSelesai,
      pengajuanDokumenTerbaru: [], // Tambahkan jika ingin ambil data real
      totalPengajuanDokumenUser: totalPengajuanDokumen,
      totalPengajuanDokumenSelesaiUser: totalPengajuanDokumenSelesai,
      totalPengajuanDokumenProsesUser: totalPengajuanDokumenProses,
    });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.status(500).json({
      nama: req.session.user?.nama || 'User',
      // Fallback data kosong jika error
      totalPengaduan: 0,
      totalPengaduanProses: 0,
      totalPengaduanSelesai: 0,
      pengaduanTerbaru: [],
      totalPengaduanUser: 0,
      totalPengaduanSelesaiUser: 0,
      totalPengaduanProsesUser: 0,
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

module.exports = router;
