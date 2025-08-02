import { useState } from 'react';
import { Send, CircleCheck } from 'lucide-react';

function PengajuanPage() {
  const [formData, setFormData] = useState({
    judul: '',
    kategori: '',
    lokasi: '',
    deskripsi: '',
  });

  const [pesan, setPesan] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pengaduan`, {
        method: 'POST',
        credentials: 'include', // penting agar session dikirim
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setPesan('Pengaduan berhasil dikirim!');
        setFormData({ judul: '', kategori: '', lokasi: '', deskripsi: '' });
      } else {
        setPesan(data.message || 'Gagal mengirim pengaduan');
      }
    } catch (error) {
      console.error('Gagal kirim:', error);
      setPesan('Terjadi kesalahan saat mengirim');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-gray-800 text-2xl font-bold mb-6">Sampaikan Pengaduan</h2>

        {pesan && <div className="mb-4 text-sm text-blue-600">{pesan}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Judul Pengaduan</label>
              <input type="text" name="judul" value={formData.judul} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border" placeholder="Judul singkat pengaduan" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select name="kategori" value={formData.kategori} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border">
                <option value="">Pilih kategori</option>
                <option value="Infrastruktur Jalan">Infrastruktur Jalan</option>
                <option value="Fasilitas Umum">Fasilitas Umum</option>
                <option value="Pelayanan Administrasi">Pelayanan Administrasi</option>
                <option value="Kebersihan Lingkungan">Kebersihan Lingkungan</option>
                <option value="Keamanan">Keamanan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi Kejadian</label>
            <input type="text" name="lokasi" value={formData.lokasi} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border" placeholder="RT/RW, Jalan, atau lokasi spesifik" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Pengaduan</label>
            <textarea name="deskripsi" rows="4" value={formData.deskripsi} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border resize-none" placeholder="Jelaskan detail pengaduan Anda dengan lengkap..." />
          </div>

          <div className="p-4 bg-green-50 border rounded-lg">
            <div className="flex items-start space-x-3">
              <CircleCheck className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-green-800 text-sm font-medium">Jaminan Privasi</p>
                <p className="text-green-700 text-sm">Data pengaduan dienkripsi dan hanya diakses oleh petugas berwenang untuk penanganan.</p>
              </div>
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg flex items-center justify-center space-x-2">
            <Send className="h-5 w-5" />
            <span>Kirim Pengaduan</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default PengajuanPage;
