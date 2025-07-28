// routes/auth/register.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');
const User = require('../../models/User');

const secretKey = process.env.SECRET_KEY || 'desa12345';

router.post('/register', async (req, res) => {
  const { nama, email, telepon, rt, rw, jalan, nik, password } = req.body;

  if (!nama || !email || !telepon || !rt || !rw || !jalan || !nik || !password) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  if (password.length < 5) {
    return res.status(400).json({ message: 'Password harus minimal 5 karakter' });
  }

  try {
    const userExists = await User.findOne({ $or: [{ email }, { nik }] });
    if (userExists) {
      return res.status(400).json({ message: 'Email atau NIK sudah terdaftar' });
    }

    const encryptedNIK = CryptoJS.AES.encrypt(nik, secretKey).toString();
    const encryptedTelepon = CryptoJS.AES.encrypt(telepon, secretKey).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    const userBaru = new User({
      nama,
      email,
      telepon: encryptedTelepon,
      rt,
      rw,
      jalan,
      nik: encryptedNIK,
      password: hashedPassword,
    });

    await userBaru.save();

    return res.status(201).json({
      message: 'Registrasi berhasil',
      user: {
        id: userBaru._id,
        nama: userBaru.nama,
        email: userBaru.email,
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

module.exports = router;
