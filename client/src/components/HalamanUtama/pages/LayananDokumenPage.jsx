// PengajuanPage.jsx
function PengajuanPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div id="documents-content" className="tab-content">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-gray-800 text-2xl font-bold mb-6">Pengajuan Dokumen Kependudukan</h2>

              <form action="/dokumen" method="POST" id="documentForm" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Dokumen</label>
                    <select name="type" className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-200" required>
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
                      type="text"
                      name="name"
                      className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">NIK</label>
                    <input
                      type="text"
                      name="nik"
                      className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      placeholder="Nomor Induk Kependudukan"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">No. Telepon</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      placeholder="Nomor telepon aktif"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
                  <textarea
                    name="address"
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
                    placeholder="Masukkan alamat lengkap"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Keperluan</label>
                  <textarea
                    name="purpose"
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
                    placeholder="Jelaskan keperluan pengajuan dokumen"
                    required
                  ></textarea>
                </div>

                <div className="p-4 bg-blue-50 border rounded-lg">
                  <div className="flex items-start space-x-3">
                    <i data-lucide="alert-circle" className="h-5 w-5 text-blue-600 mt-0.5"></i>
                    <div>
                      <p className="text-blue-800 text-sm font-medium">Keamanan Data</p>
                      <p className="text-blue-700 text-sm">Semua data pribadi akan dienkripsi end-to-end untuk menjamin keamanan dan privasi Anda.</p>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 hover-scale transition-all duration-200 shadow-lg">
                  Kirim Pengajuan
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
