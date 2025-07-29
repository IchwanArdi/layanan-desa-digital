// PengajuanPage.jsx
function PengajuanPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div id="complaints-content" className="tab-content">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-gray-800 text-2xl font-bold mb-6">Sampaikan Pengaduan</h2>

              <form action="/pengaduan" method="POST" id="complaintForm" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Judul Pengaduan</label>
                    <input type="text" name="judul" className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-200" placeholder="Judul singkat pengaduan" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                    <select name="kategori" className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-200">
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
                  <div className="relative">
                    <i data-lucide="map-pin" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"></i>
                    <input
                      type="text"
                      name="lokasi"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      placeholder="RT/RW, Jalan, atau lokasi spesifik"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Pengaduan</label>
                  <textarea
                    name="deskripsi"
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
                    placeholder="Jelaskan detail pengaduan Anda dengan lengkap..."
                  ></textarea>
                </div>

                <div className="p-4 bg-green-50 border rounded-lg">
                  <div className="flex items-start space-x-3">
                    <i data-lucide="check-circle" className="h-5 w-5 text-green-600 mt-0.5"></i>
                    <div>
                      <p className="text-green-800 text-sm font-medium">Jaminan Privasi</p>
                      <p className="text-green-700 text-sm">Data pengaduan dienkripsi dan hanya diakses oleh petugas berwenang untuk penanganan.</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 hover-scale transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
                >
                  <i data-lucide="send" className="h-5 w-5"></i>
                  <span>Kirim Pengaduan</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PengajuanPage;
