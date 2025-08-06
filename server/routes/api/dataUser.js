const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../middleware/auth');
const User = require('../../models/User');

router.get('/user', isAuthenticated, async (req, res) => {
  try {
    // Ambil semua user yang role-nya 'user', hanya nama dan email
    const users = await User.find({ role: 'user' }, 'nama email').sort({ createdAt: -1 });

    console.log(users);

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Gagal mengambil data user.' });
  }
});

module.exports = router;
