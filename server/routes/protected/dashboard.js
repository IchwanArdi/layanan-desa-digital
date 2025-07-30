// routes/protected/dashboard.js
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../middleware/auth');

// Terapkan middleware ke semua endpoint di bawah ini
router.use(isAuthenticated);

// Semua route di bawah ini akan diproteksi login
router.get('/dashboard/layanan-dokumen', (req, res) => {
  res.json({ message: 'Layanan Dokumen', user: req.session.user });
});

router.get('/dashboard/pengajuan', (req, res) => {
  res.json({ message: 'Pengajuan', user: req.session.user });
});

router.get('/dashboard/profil', (req, res) => {
  res.json({ message: 'Profil Pengguna', user: req.session.user });
});

module.exports = router;
