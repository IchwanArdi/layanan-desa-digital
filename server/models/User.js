const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
      trim: true,
    },
    nik: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    telepon: {
      // ✅ Konsisten dengan nama field
      type: String,
      required: true, // ✅ Tambahkan required jika perlu
      trim: true,
    },
    jalan: {
      type: String,
      trim: true,
    },
    rt: {
      type: String,
      required: true,
    },
    rw: {
      type: String,
      required: true,
    },
    tanggalLahir: {
      type: Date,
    },
    jenisKelamin: {
      type: String,
      enum: ['Laki-laki', 'Perempuan'],
    },
    pekerjaan: {
      type: String,
    },
    statusVerifikasi: {
      type: String,
      enum: ['pending', 'terverifikasi', 'ditolak'],
      default: 'pending',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
