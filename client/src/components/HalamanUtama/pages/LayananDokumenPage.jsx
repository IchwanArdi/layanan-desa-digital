import { Send, CircleAlert, CircleCheck, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSettings } from '../../../contexts/SettingsContext';

function PengajuanPage() {
  const { darkMode } = useSettings();

  const [formData, setFormData] = useState({
    type: '',
    name: '',
    nik: '',
    phone: '',
    address: '',
    purpose: '',
  });

  const [pesan, setPesan] = useState('');
  const [pesanType, setPesanType] = useState('success');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Komponen untuk menampilkan loading skeleton
  const SkeletonBox = ({ className }) => <div className={`${darkMode ? 'bg-slate-700' : 'bg-gray-200'} animate-pulse rounded-md ${className}`} />;

  useEffect(() => {
    // Simulasi delay 700ms, ganti ini dengan fetch jika ambil data dinamis
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pengajuan-dokumen`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setPesan('Pengajuan dokumen berhasil dibuat dan akan diproses dalam 1x24 jam!');
        setPesanType('success');
        setFormData({ type: '', name: '', nik: '', phone: '', address: '', purpose: '' });
        setTimeout(() => setPesan(''), 8000);
      } else {
        setPesan(data.message || 'Gagal mengirim pengajuan dokumen. Silakan coba lagi.');
        setPesanType('error');
        setTimeout(() => setPesan(''), 6000);
      }
    } catch (error) {
      console.error('Error:', error);
      setPesan('Terjadi kesalahan jaringan. Silakan periksa koneksi internet Anda.');
      setPesanType('error');
      setTimeout(() => setPesan(''), 6000);
    } finally {
      setSubmitting(false);
    }
  };

  // Validasi form
  const isFormValid = formData.type && formData.name && formData.nik && formData.phone && formData.address && formData.purpose;

  return (
    <div className="max-w-7xl mx-auto">
      <div id="documents-content" className="tab-content">
        <div className="max-w-2xl mx-auto">
          <div className={`rounded-xl shadow-xl border transition-all duration-300 ${darkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-gray-200 shadow-gray-900/10'} p-8`}>
            {loading ? (
              <>
                {/* Header skeleton */}
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
                  <div className="space-y-2">
                    <SkeletonBox className="h-4 w-1/4" />
                    <SkeletonBox className="h-12 w-full" />
                  </div>
                  <div className="space-y-2">
                    <SkeletonBox className="h-4 w-1/3" />
                    <SkeletonBox className="h-12 w-full" />
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <SkeletonBox className="h-4 w-1/3" />
                  <SkeletonBox className="h-20 w-full" />
                </div>

                <div className="space-y-2 mb-6">
                  <SkeletonBox className="h-4 w-1/4" />
                  <SkeletonBox className="h-20 w-full" />
                </div>

                <SkeletonBox className="h-16 w-full mb-6" />
                <SkeletonBox className="h-12 w-full" />
              </>
            ) : (
              <>
                {/* Header dengan gradient text */}
                <div className="text-center mb-8">
                  <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-slate-100' : 'bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'}`}>Pengajuan Dokumen</h2>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Ajukan dokumen administrasi yang Anda butuhkan dengan mudah dan cepat</p>
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
                    <div className="flex-1">
                      <div className="text-sm font-medium">{pesan}</div>
                      {pesanType === 'success' && <div className={`text-xs mt-1 ${darkMode ? 'text-emerald-200/80' : 'text-emerald-700'}`}>Kami akan memproses pengajuan Anda secepatnya. Silakan cek halaman dashboard.</div>}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} id="documentForm" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>Jenis Dokumen *</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                          darkMode
                            ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-offset-slate-800'
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                        }`}
                        required
                      >
                        <option value="">Pilih jenis dokumen</option>
                        <option value="Surat Keterangan Domisili">Surat Keterangan Domisili</option>
                        <option value="Surat Pengantar KTP">Surat Pengantar KTP</option>
                        <option value="Surat Pengantar KK">Surat Pengantar KK</option>
                        <option value="Surat Keterangan Usaha">Surat Keterangan Usaha</option>
                        <option value="Surat Keterangan Tidak Mampu">Surat Keterangan Tidak Mampu</option>
                        <option value="Surat Keterangan Kelahiran">Surat Keterangan Kelahiran</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>Nama Lengkap *</label>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="name"
                        value={formData.name}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                          darkMode
                            ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-offset-slate-800'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                        }`}
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>NIK *</label>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="nik"
                        value={formData.nik}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                          darkMode
                            ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-offset-slate-800'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                        }`}
                        placeholder="Nomor Induk Kependudukan"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>No. Telepon *</label>
                      <input
                        onChange={handleChange}
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                          darkMode
                            ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-offset-slate-800'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                        }`}
                        placeholder="Nomor telepon aktif"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>Alamat Lengkap *</label>
                    <textarea
                      onChange={handleChange}
                      name="address"
                      value={formData.address}
                      rows="3"
                      className={`w-full px-4 py-3 rounded-lg border resize-none transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                        darkMode
                          ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-offset-slate-800'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                      }`}
                      placeholder="Masukkan alamat lengkap"
                      required
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>Keperluan *</label>
                    <textarea
                      onChange={handleChange}
                      name="purpose"
                      value={formData.purpose}
                      rows="3"
                      className={`w-full px-4 py-3 rounded-lg border resize-none transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                        darkMode
                          ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-offset-slate-800'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                      }`}
                      placeholder="Jelaskan keperluan pengajuan dokumen"
                      required
                    ></textarea>
                  </div>

                  {/* Privacy guarantee */}
                  <div className={`p-4 rounded-xl border transition-all duration-200 ${darkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
                    <div className="flex items-start space-x-3">
                      <CircleAlert className={`h-5 w-5 mt-0.5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      <div>
                        <p className={`font-semibold text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>Keamanan Data</p>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-blue-200/80' : 'text-blue-700'}`}>Semua data pribadi akan dienkripsi end-to-end untuk menjamin keamanan dan privasi Anda.</p>
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
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 hover:scale-[1.02]'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-700/30 hover:scale-[1.02]'
                    } ${submitting ? 'animate-pulse' : ''}`}
                  >
                    <Send className={`h-5 w-5 ${submitting ? 'animate-bounce' : ''}`} />
                    <span>{submitting ? 'Mengirim Pengajuan...' : 'Kirim Pengajuan'}</span>
                  </button>

                  {/* Form validation hint */}
                  {!isFormValid && <p className={`text-xs text-center ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>* Semua field wajib diisi untuk mengirim pengajuan</p>}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PengajuanPage;
