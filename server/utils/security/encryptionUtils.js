const CryptoJS = require('crypto-js');

// 🔑 Kunci rahasia untuk enkripsi. Simpan di .env di server production!
const SECRET_KEY = process.env.ENCRYPTION_KEY || 'ganti-key-ini-di-production';

// 🔒 Fungsi untuk mengenkripsi string
const encrypt = (text) => {
  if (!text || typeof text !== 'string') return text;

  try {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  } catch (err) {
    console.error('Gagal mengenkripsi:', err);
    return text; // Kalau gagal, balikin teks asli
  }
};

// 🔓 Fungsi untuk mendekripsi string
const decrypt = (encryptedText) => {
  if (!encryptedText || typeof encryptedText !== 'string') return encryptedText;

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    return originalText || encryptedText; // Kalau gagal, balikin yang terenkripsi
  } catch (err) {
    console.error('Gagal mendekripsi:', err);
    return encryptedText;
  }
};

// 🔒 Enkripsi beberapa field tertentu di dalam objek
const encryptFields = (dataObj, fields) => {
  const result = { ...dataObj }; // Salin objek dulu agar tidak merusak data asli

  fields.forEach((field) => {
    if (result[field]) {
      result[field] = encrypt(result[field]);
    }
  });

  return result;
};

// 🔁 Dekripsi array data (dipakai untuk dashboard, dll)
const decryptArrayData = (dataArray, decryptFunction) => {
  return dataArray.map((item) => {
    const itemObj = item.toObject ? item.toObject() : item;
    return decryptFunction(itemObj);
  });
};

// 🔓 Dekripsi beberapa field tertentu di dalam objek
const decryptFields = (dataObj, fields) => {
  const result = { ...dataObj };

  fields.forEach((field) => {
    if (result[field]) {
      result[field] = decrypt(result[field]);
    }
  });

  return result;
};

// 🔒 Enkripsi data untuk Pengajuan Dokumen (hanya field sensitif)
const encryptPengajuanDokumen = (data) => {
  const fieldsToEncrypt = ['nik', 'telepon', 'alamat', 'keperluan'];
  return encryptFields(data, fieldsToEncrypt);
};

// 🔓 Dekripsi data Pengajuan Dokumen
const decryptPengajuanDokumen = (data) => {
  const fieldsToDecrypt = ['nik', 'telepon', 'alamat', 'keperluan'];
  return decryptFields(data, fieldsToDecrypt);
};

// 🔒 Enkripsi data Pengaduan
const encryptPengaduan = (data) => {
  const fieldsToEncrypt = ['deskripsi', 'lokasi'];
  return encryptFields(data, fieldsToEncrypt);
};

// 🔓 Dekripsi data Pengaduan
const decryptPengaduan = (data) => {
  const fieldsToDecrypt = ['deskripsi', 'lokasi'];
  return decryptFields(data, fieldsToDecrypt);
};

// ✅ Export semua fungsi agar bisa digunakan di file lain
module.exports = {
  encrypt,
  decrypt,
  encryptFields,
  decryptFields,
  encryptPengajuanDokumen,
  decryptPengajuanDokumen,
  encryptPengaduan,
  decryptPengaduan,
  decryptArrayData,
};
