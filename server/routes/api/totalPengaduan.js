const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../middleware/auth');
const Pengaduan = require('../../models/Pengaduan');
const { decryptPengaduan, decryptArrayData, encryptPengaduan } = require('../../utils/security/encryptionUtils');

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

router.get('/pengaduan', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const isAdmin = req.session.user.role === 'admin';

    const pengaduanQuery = isAdmin ? {} : { userId };

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

    const pengaduanTerbaruRaw = await Pengaduan.find(pengaduanQuery).sort({ createdAt: -1 });
    const pengaduanTerbaru = decryptArrayData(pengaduanTerbaruRaw, decryptPengaduan);

    res.json({
      nama: req.session.user.nama,
      role: req.session.user.role,
      isAdmin,

      // Pengaduan
      totalPengaduan,
      totalPengaduanProses,
      totalPengaduanSelesai,
      pengaduanTerbaru,
    });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.status(500).json({ message: 'Gagal memuat dashboard' });
  }
});

// 🔹 TAMBAHAN: Endpoint untuk update status pengaduan (hanya admin)
router.put('/pengaduan/:id/status', isAuthenticated, requireAdmin, async (req, res) => {
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
    const pengaduan = await Pengaduan.findById(id);
    if (!pengaduan) {
      return res.status(404).json({
        success: false,
        message: 'Pengaduan tidak ditemukan',
      });
    }

    // Update status pengaduan
    const updateData = {
      status,
      updatedAt: new Date(),
    };

    // Jika ada keterangan admin, encrypt dan simpan
    if (keteranganAdmin) {
      updateData.keteranganAdmin = keteranganAdmin; // Encrypt jika diperlukan
    }

    const updatedPengaduan = await Pengaduan.findByIdAndUpdate(id, updateData, { new: true });

    // Decrypt data untuk response
    const decryptedPengaduan = decryptPengaduan(updatedPengaduan);

    res.json({
      success: true,
      message: `Status pengaduan berhasil diubah menjadi "${status}"`,
      data: decryptedPengaduan,
    });
  } catch (error) {
    console.error('Error updating pengaduan status:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengupdate status pengaduan',
    });
  }
});

// 🔹 TAMBAHAN: Endpoint untuk mendapatkan detail pengaduan (opsional, untuk modal detail)
router.get('/pengaduan/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.user._id;
    const isAdmin = req.session.user.role === 'admin';

    // Query berdasarkan role: admin bisa lihat semua, user hanya miliknya
    const query = isAdmin ? { _id: id } : { _id: id, userId };

    const pengaduanRaw = await Pengaduan.findOne(query);

    if (!pengaduanRaw) {
      return res.status(404).json({
        success: false,
        message: 'Pengaduan tidak ditemukan',
      });
    }

    // Decrypt data
    const pengaduan = decryptPengaduan(pengaduanRaw);

    res.json({
      success: true,
      data: pengaduan,
    });
  } catch (error) {
    console.error('Error fetching pengaduan detail:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil detail pengaduan',
    });
  }
});

module.exports = router;
