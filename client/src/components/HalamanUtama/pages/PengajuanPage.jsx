import { useState, useEffect } from 'react';
import { Send, CircleCheck, AlertCircle } from 'lucide-react';
import { useSettings } from '../../../contexts/SettingsContext';

function PengajuanPage() {
  const { darkMode } = useSettings();

  const [formData, setFormData] = useState({
    judul: '',
    kategori: '',
    lokasi: '',
    deskripsi: '',
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Simulasi loading seperti ambil data dari API
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800); // Ganti dengan fetch kategori bila perlu

    return () => clearTimeout(timeout);
  }, []);

  // Komponen untuk menampilkan loading skeleton
  const SkeletonBox = ({ className }) => <div className={`${darkMode ? 'bg-slate-700' : 'bg-gray-200'} animate-pulse rounded-lg ${className}`} />;

  const [pesan, setPesan] = useState(''); // Pesan untuk menampilkan status pengajuan
  const [pesanType, setPesanType] = useState('success'); // 'success' atau 'error'

  // Fungsi untuk menangani perubahan input form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

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
        setPesan('Pengaduan berhasil dikirim dan akan ditindaklanjuti dalam 1x24 jam!');
        setPesanType('success');
        setFormData({ judul: '', kategori: '', lokasi: '', deskripsi: '' });
        setTimeout(() => setPesan(''), 8000);
      } else {
        setPesan(data.message || 'Gagal mengirim pengaduan. Silakan coba lagi.');
        setPesanType('error');
        setTimeout(() => setPesan(''), 6000);
      }
    } catch (error) {
      console.error('Gagal kirim:', error);
      setPesan('Terjadi kesalahan jaringan. Silakan periksa koneksi internet Anda.');
      setPesanType('error');
      setTimeout(() => setPesan(''), 6000);
    } finally {
      setSubmitting(false);
    }
  };

  // Validasi form
  const isFormValid = formData.judul && formData.kategori && formData.lokasi && formData.deskripsi;

  return (
    <div className="max-w-7xl mx-auto">
      <div className={`max-w-2xl mx-auto rounded-xl shadow-xl border transition-all duration-300 ${darkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-gray-200 shadow-gray-900/10'} p-8`}>
        {/* Tampilkan loading skeleton saat data masih dimuat */}
        {loading ? (
          <>
            <SkeletonBox className="h-8 w-1/2 mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <SkeletonBox className="h-4 w-1/3" />
                <SkeletonBox className="h-12 w-full" />
              </div>
              <div className="space-y-2">
                <SkeletonBox className="h-4 w-1/4" />
                <SkeletonBox className="h-12 w-full" />
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <SkeletonBox className="h-4 w-1/3" />
              <SkeletonBox className="h-12 w-full" />
            </div>

            <div className="space-y-2 mb-6">
              <SkeletonBox className="h-4 w-1/4" />
              <SkeletonBox className="h-32 w-full" />
            </div>

            <SkeletonBox className="h-16 w-full mb-6" />
            <SkeletonBox className="h-12 w-full" />
          </>
        ) : (
          <>
            {/* Header dengan gradient text */}
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-slate-100' : 'bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'}`}>Sampaikan Pengaduan</h2>
              <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Kami berkomitmen mendengar dan menindaklanjuti setiap pengaduan masyarakat</p>
            </div>

            {/* Alert message */}
            {pesan && (
              <div
                className={`mb-6 p-4 rounded-xl border transition-all duration-300 ${
                  pesanType === 'success'
                    ? darkMode
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : darkMode
                    ? 'bg-red-500/10 border-red-500/30 text-red-300'
                    : 'bg-red-50 border-red-200 text-red-800'
                } flex items-start space-x-3 shadow-sm`}
              >
                {pesanType === 'success' ? <CircleCheck className={`h-5 w-5 mt-0.5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} /> : <AlertCircle className={`h-5 w-5 mt-0.5 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />}
                <div className="flex-1 text-sm font-medium">{pesan}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form fields dengan modern styling */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`block text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>Judul Pengaduan *</label>
                  <input
                    type="text"
                    name="judul"
                    value={formData.judul}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                      darkMode
                        ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 focus:ring-offset-slate-800'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20'
                    }`}
                    placeholder="Contoh: Jalan rusak di RT 01"
                  />
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>Kategori *</label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                      darkMode
                        ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-emerald-500 focus:ring-emerald-500/20 focus:ring-offset-slate-800'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500/20'
                    }`}
                  >
                    <option value="">Pilih kategori pengaduan</option>
                    <option value="Infrastruktur Jalan">Infrastruktur Jalan</option>
                    <option value="Fasilitas Umum">Fasilitas Umum</option>
                    <option value="Pelayanan Administrasi">Pelayanan Administrasi</option>
                    <option value="Kebersihan Lingkungan">Kebersihan Lingkungan</option>
                    <option value="Keamanan">Keamanan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>Lokasi Kejadian *</label>
                <input
                  type="text"
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                    darkMode
                      ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 focus:ring-offset-slate-800'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20'
                  }`}
                  placeholder="Contoh: RT 01/RW 05, Jl. Mawar No. 15"
                />
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>Deskripsi Pengaduan *</label>
                <textarea
                  name="deskripsi"
                  rows="5"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border resize-none transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                    darkMode
                      ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 focus:ring-offset-slate-800'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20'
                  }`}
                  placeholder="Jelaskan detail pengaduan Anda dengan lengkap. Sertakan informasi waktu kejadian, dampak yang dirasakan, dan hal lain yang relevan..."
                />
              </div>

              {/* Privacy guarantee */}
              <div className={`p-4 rounded-xl border transition-all duration-200 ${darkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
                <div className="flex items-start space-x-3">
                  <CircleCheck className={`h-5 w-5 mt-0.5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <div>
                    <p className={`font-semibold text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>Jaminan Privasi & Keamanan</p>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-emerald-200/80' : 'text-emerald-700'}`}>
                      Data pengaduan dienkripsi end-to-end dan hanya diakses oleh petugas berwenang. Identitas pelapor dijamin kerahasiaannya sesuai UU No. 14 Tahun 2008.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={!isFormValid || submitting}
                className={`w-full py-4 font-semibold rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 transform ${
                  !isFormValid || submitting
                    ? darkMode
                      ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : darkMode
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 hover:scale-[1.02]'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-700/30 hover:scale-[1.02]'
                } ${submitting ? 'animate-pulse' : ''}`}
              >
                <Send className={`h-5 w-5 ${submitting ? 'animate-bounce' : ''}`} />
                <span>{submitting ? 'Mengirim Pengaduan...' : 'Kirim Pengaduan'}</span>
              </button>

              {/* Form validation hint */}
              {!isFormValid && <p className={`text-xs text-center ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>* Semua field wajib diisi untuk mengirim pengaduan</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default PengajuanPage;
