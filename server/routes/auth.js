const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const CryptoJS = require('crypto-js');

const secretKey = process.env.SECRET_KEY || 'desa12345';

// Proses login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Email tidak terdaftar' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Password salah' });
    }

    return res.status(200).json({
      message: 'Login berhasil',
      user: {
        id: user._id,
        nama: user.nama,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

// Proses register
router.post('/register', async (req, res) => {
  const { nama, email, telepon, rt, rw, jalan, nik, password } = req.body; // ✅ Ubah no_hp menjadi telepon
  let errors = [];

  if (password.length < 5) {
    errors.push({ msg: 'Password harus memiliki minimal 5 karakter' });
  }

  if (errors.length > 0) {
    return res.render('register', {
      errors,
      nama,
      email,
      telepon,
      rt,
      rw,
      jalan,
    });
  }

  try {
    // Cek apakah email atau NIK sudah terdaftar
    const userExists = await User.findOne({
      $or: [{ email }, { nik }], // ✅ Cek NIK juga
    });

    if (userExists) {
      errors.push({ msg: 'Email atau NIK sudah terdaftar' });
      return res.render('register', {
        errors,
        nama,
        email,
        telepon,
        rt,
        rw,
        jalan,
      });
    }
    // ✅ Enkripsi NIK dan telepon
    const encryptedNIK = CryptoJS.AES.encrypt(nik, secretKey).toString();
    const encryptedTelepon = CryptoJS.AES.encrypt(telepon, secretKey).toString();

    const hashedPassword = await bcrypt.hash(password, 10);

    const userBaru = new User({
      nama,
      email,
      telepon: encryptedTelepon, // ✅ Gunakan nama field yang konsisten
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
