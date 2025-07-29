import { LogOut, FileText, MessageSquare, CircleCheck, Settings, Bell, User } from 'lucide-react';

// ProfilPage.jsx
function ProfilPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div id="profile-content" className="tab-content">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-gray-800 text-xl font-bold">ICHWAN</h3>
                  <p className="text-gray-600 text-sm">Warga Desa Karangpucung</p>

                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                      <User className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Akun Terverifikasi</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-gray-800 text-lg font-semibold mb-4">Statistik Anda</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Total Pengajuan Dokumen</span>
                    </div>
                    <span className="text-blue-600 font-bold">5</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Total Pengaduan</span>
                    </div>
                    <span className="text-green-600 font-bold">10</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CircleCheck className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Layanan Selesai</span>
                    </div>
                    <span className="text-purple-600 font-bold">21</span>
                  </div>
                </div>
              </div>

              {/*Account Settings*/}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-gray-800 text-lg font-semibold mb-4">Pengaturan Akun</h3>

                <div className="space-y-3">
                  <a href="/pengaduan/riwayat" className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                    <MessageSquare className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">Riwayat Pengaduan</span>
                  </a>

                  <a href="/dokumen/riwayat" className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">Riwayat Dokumen</span>
                  </a>

                  <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                    <Settings className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">Ubah Password</span>
                  </button>

                  <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                    <Bell className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">Notifikasi</span>
                  </button>

                  <div className="pt-3 border-t border-gray-200">
                    <a href="/home" className="w-full flex items-center space-x-3 p-3 hover:bg-red-50 text-red-600 rounded-lg transition-colors text-left">
                      <LogOut className="h-5 w-5" />
                      <span>Keluar dari Akun</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity History */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="text-gray-800 text-lg font-semibold mb-4">Riwayat Aktivitas Terbaru</h3>

              <div className="space-y-4">
                {/* Riwayat Pengaduan */}

                {/* Riwayat Pengajuan Dokumen */}

                {/* Jika tidak ada aktivitas */}
                <div className="text-center py-8">
                  <i data-lucide="inbox" className="h-12 w-12 text-gray-400 mx-auto mb-4"></i>
                  <p className="text-gray-500">Belum ada aktivitas terbaru</p>
                  <p className="text-gray-400 text-sm">Riwayat pengaduan dan pengajuan dokumen akan muncul di sini</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilPage;
