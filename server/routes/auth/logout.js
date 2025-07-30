const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ message: 'Gagal logout' });
      }

      // Hapus cookie session
      res.clearCookie('connect.sid', {
        path: '/',
      });

      return res.status(200).json({ message: 'Logout berhasil' });
    });
  } catch (err) {
    console.error('Logout catch error:', err);
    return res.status(500).json({ message: 'Server error saat logout' });
  }
});

module.exports = router;
