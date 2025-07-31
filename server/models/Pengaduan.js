const mongoose = require('mongoose');

const PengaduanSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
    trim: true,
  },
  kategori: {
    type: String,
    required: true,
    enum: ['Infrastruktur Jalan', 'Fasilitas Umum', 'Pelayanan Administrasi', 'Kebersihan Lingkungan', 'Keamanan', 'Lainnya'],
  },
  lokasi: {
    type: String,
  },
  deskripsi: {
    type: String,
  },
  status: {
    type: String,
    enum: ['menunggu', 'proses', 'ditindaklanjuti', 'selesai'],
    default: 'menunggu',
  },
  warga: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // UBAH DARI 'Warga' MENJADI 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Pengaduan', PengaduanSchema);
