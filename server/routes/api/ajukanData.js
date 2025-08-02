const express = require('express');
const router = express.Router(); // Buat router modular untuk endpoint /dashboard

const isAuthenticated = require('../../middleware/auth'); // Middleware untuk pastikan user sudah login (dengan session)
const { encryptPengajuanDokumen } = require('../../utils/security/encryptionUtils'); // Fungsi dekripsi untuk data sensitif
const PengajuanDokumen = require('../../models/PengajuanDokumen'); // Model untuk data pengaduan dari warga

router.post('/pengajuan-dokumen', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user._id; // Ambil ID user dari session login

    // Ambil data pengajuan dokumen dari request body
    const { type, name, nik, phone, address, purpose } = req.body;

    // Validasi input
    if (!type || !name || !nik || !phone || !address || !purpose) {
      return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    const pengajuanDokumenData = {
      jenisDokumen: type,
      namaLengkap: name.trim(),
      nik: nik.trim(),
      telepon: phone.trim(),
      alamat: address.trim(),
      keperluan: purpose.trim(),
      userId, // Set ID user yang mengajukan
      status: 'pending', // Status awal pengajuan
    };

    // Enkripsi data sensitif sebelum disimpan
    const encryptedPengajuanDokumen = encryptPengajuanDokumen(pengajuanDokumenData);

    // Simpan pengajuan dokumen ke database
    const newPengajuan = new PengajuanDokumen({
      ...encryptedPengajuanDokumen,
      userId, // Set ID user yang mengajukan
    });

    await newPengajuan.save();

    res.status(201).json({ message: 'Pengajuan dokumen berhasil dibuat', pengajuan: newPengajuan });
  } catch (error) {
    console.error('Gagal membuat pengajuan dokumen:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat membuat pengajuan dokumen' });
  }
});

module.exports = router;
