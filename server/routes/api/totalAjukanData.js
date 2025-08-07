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

// 🔹 TAMBAHAN: Endpoint untuk update status pengaduan (hanya admin)
router.put('/pengajuandokumen/:id/status', isAuthenticated, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, keteranganAdmin } = req.body;

    // Validasi status yang diizinkan
    const validStatuses = ['menunggu', 'proses', 'ditindaklanjuti', 'selesai', 'ditolak'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status tidak valid. Status yang diizinkan: ' + validStatuses.join(', '),
      });
    }

    // Cari pengaduan berdasarkan ID
    const pengajuan = await PengajuanDokumen.findById(id);
    if (!pengajuan) {
      return res.status(404).json({
        success: false,
        message: 'pengajuan tidak ditemukan',
      });
    }

    // Update status pengajuan
    const updateData = {
      status,
      updatedAt: new Date(),
    };

    // Jika ada keterangan admin, encrypt dan simpan
    if (keteranganAdmin) {
      updateData.keteranganAdmin = keteranganAdmin; // Encrypt jika diperlukan
    }

    const updatedPengajuan = await PengajuanDokumen.findByIdAndUpdate(id, updateData, { new: true });

    // Decrypt data untuk response
    const decryptedPengajuan = decryptPengajuanDokumen(updatedPengajuan);

    res.json({
      success: true,
      message: `Status pengajuan berhasil diubah menjadi "${status}"`,
      data: decryptedPengajuan,
    });
  } catch (error) {
    console.error('Error updating pengajuan status:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengupdate status pengajuan',
    });
  }
});

module.exports = router;
