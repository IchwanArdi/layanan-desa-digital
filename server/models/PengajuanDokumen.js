const mongoose = require('mongoose');

const pengajuanDokumenSchema = new mongoose.Schema(
  {
    jenisDokumen: {
      type: String,
      required: true,
      enum: ['Surat Keterangan Domisili', 'Surat Pengantar KTP', 'Surat Pengantar KK', 'Surat Keterangan Usaha', 'Surat Keterangan Tidak Mampu', 'Surat Keterangan Kelahiran'],
    },
    namaLengkap: {
      type: String,
      required: true,
      trim: true,
    },
    nik: {
      type: String,
      required: true,
      trim: true,
    },
    telepon: {
      type: String,
      required: true,
      trim: true,
    },
    alamat: {
      type: String,
      required: true,
      trim: true,
    },
    keperluan: {
      type: String,
      required: true,
      trim: true,
    },
    berkasPendukung: {
      type: String, // nama file
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'diproses', 'selesai', 'ditolak'],
      default: 'pending',
    },
    catatan: {
      type: String,
      default: null,
    },
    tanggalSelesai: {
      type: Date,
      default: null,
    },
    // Relasi ke user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    nomorSurat: {
      type: String,
      unique: true,
      sparse: true, // hanya yang selesai yang punya nomor surat
    },
  },
  {
    timestamps: true,
  }
);

// Auto generate nomor surat ketika status menjadi selesai
pengajuanDokumenSchema.pre('save', function (next) {
  if (this.status === 'selesai' && !this.nomorSurat) {
    const tahun = new Date().getFullYear();
    const bulan = String(new Date().getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    this.nomorSurat = `${random}/DESA-KPC/${bulan}/${tahun}`;
    this.tanggalSelesai = new Date();
  }
  next();
});

module.exports = mongoose.model('PengajuanDokumen', pengajuanDokumenSchema);
