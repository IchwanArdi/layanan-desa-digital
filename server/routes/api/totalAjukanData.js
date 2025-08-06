const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../middleware/auth');
const PengajuanDokumen = require('../../models/PengajuanDokumen');
const { decryptPengajuanDokumen, decryptArrayData, encryptPengajuanDokumen } = require('../../utils/security/encryptionUtils');

// Middleware untuk memastikan hanya admin yang bisa mengupdate status
const requireAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Akses ditolak. Hanya admin yang bisa mengubah status pengaduan.',
    });
  }
};

router.get('/PengajuanDokumen', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const isAdmin = req.session.user.role === 'admin';

    const ajukanQuery = isAdmin ? {} : { userId };

    // 🔹 Hitung total PengajuanDokumen
    const totalAjukan = await PengajuanDokumen.countDocuments(ajukanQuery);
    const totalAjukanProses = await PengajuanDokumen.countDocuments({
      ...ajukanQuery,
      status: { $in: ['menunggu', 'proses', 'ditindaklanjuti'] },
    });
    const totalAjukanSelesai = await PengajuanDokumen.countDocuments({
      ...ajukanQuery,
      status: 'selesai',
    });

    const ajukanTerbaruRaw = await PengajuanDokumen.find(ajukanQuery).sort({ createdAt: -1 });
    const ajukanTerbaru = decryptArrayData(ajukanTerbaruRaw, decryptPengajuanDokumen);

    console.log(ajukanTerbaru);

    res.json({
      nama: req.session.user.nama,
      role: req.session.user.role,
      isAdmin,

      // Pengaduan
      totalAjukan,
      totalAjukanProses,
      totalAjukanSelesai,
      ajukanTerbaru,
    });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.status(500).json({ message: 'Gagal memuat dashboard' });
  }
});

module.exports = router;
