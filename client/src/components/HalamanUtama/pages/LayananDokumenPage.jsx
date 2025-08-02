import { Send, CircleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';

const SkeletonBox = ({ className }) => <div className={`bg-gray-200 animate-pulse rounded-md ${className}`} />;

function PengajuanPage() {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    nik: '',
    phone: '',
    address: '',
    purpose: '',
  });

  const [pesan, setPesan] = useState('');
  const [loading, setLoading] = useState(true); // 🔵 Tambahkan state loading

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
        setPesan('✅ Pengajuan dokumen berhasil dibuat!');
        setFormData({ type: '', name: '', nik: '', phone: '', address: '', purpose: '' });
        setTimeout(() => setPesan(''), 5000);
      } else {
        setPesan(data.message || 'Terjadi kesalahan saat mengirim pengajuan dokumen');
      }
    } catch (error) {
      console.error('Error:', error);
      setPesan('Terjadi kesalahan saat mengirim pengajuan dokumen');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div id="documents-content" className="tab-content">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {loading ? (
              <>
                <SkeletonBox className="h-6 w-1/2 mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <SkeletonBox className="h-16 w-full" />
                  <SkeletonBox className="h-16 w-full" />
                  <SkeletonBox className="h-16 w-full" />
                  <SkeletonBox className="h-16 w-full" />
                </div>

                <SkeletonBox className="h-20 w-full mb-4" />
                <SkeletonBox className="h-20 w-full mb-4" />
                <SkeletonBox className="h-20 w-full mb-4" />
                <SkeletonBox className="h-12 w-full" />
              </>
            ) : (
              <>
                {/* Tampilkan pesan jika ada */}
                {pesan && (
                  <div className="mb-6 p-4 rounded-lg border border-green-200 bg-green-50 text-green-800 flex items-start space-x-3 shadow-sm">
                    <svg className="h-5 w-5 mt-0.5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <div className="flex-1 text-sm font-medium">
                      {pesan}
                      <div className="text-xs mt-1 text-green-700">Kami akan memproses pengajuan Anda secepatnya. Silakan cek halaman dashboard.</div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} id="documentForm" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Dokumen</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="name"
                        value={formData.name}
                        className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">NIK</label>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="nik"
                        value={formData.nik}
                        className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        placeholder="Nomor Induk Kependudukan"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">No. Telepon</label>
                      <input
                        onChange={handleChange}
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        placeholder="Nomor telepon aktif"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
                    <textarea
                      onChange={handleChange}
                      name="address"
                      value={formData.address}
                      rows="3"
                      className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
                      placeholder="Masukkan alamat lengkap"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Keperluan</label>
                    <textarea
                      onChange={handleChange}
                      name="purpose"
                      value={formData.purpose}
                      rows="3"
                      className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
                      placeholder="Jelaskan keperluan pengajuan dokumen"
                      required
                    ></textarea>
                  </div>

                  <div className="p-4 bg-blue-50 border rounded-lg">
                    <div className="flex items-start space-x-3">
                      <CircleAlert className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-blue-800 text-sm font-medium">Keamanan Data</p>
                        <p className="text-blue-700 text-sm">Semua data pribadi akan dienkripsi end-to-end untuk menjamin keamanan dan privasi Anda.</p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 hover-scale transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send className="h-5 w-5" />
                    <span>Kirim Pengaduan</span>
                  </button>
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
