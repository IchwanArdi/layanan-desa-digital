import { Home, FileText, MessageSquare, Check, CheckCheck, X } from 'lucide-react';

// DashboardPage.jsx
function DashboardPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div id="dashboard-content" className="tab-content fade-in">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Pengajuan Dokumen</p>
                    <p className="text-gray-800 text-2xl font-bold">6</p>
                    <p className="text-blue-600 text-xs">Proses: 4 | Selesai: 1</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Pengaduan Aktif</p>
                    <p className="text-gray-800 text-2xl font-bold">5</p>
                    <p className="text-green-600 text-xs">Total: 5 | Selesai: 2</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Layanan Selesai</p>
                    <p className="text-gray-800 text-2xl font-bold"> 4 </p>
                    <p className="text-purple-600 text-xs">Dokumen: 2 | Pengaduan: 1</p>
                  </div>
                  <CheckCheck className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-gray-800 text-lg font-semibold mb-4">Pengajuan Dokumen Terbaru</h3>
                <div className="text-center py-4">
                  <p className="text-gray-500">Belum ada pengajuan dokumen</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-gray-800 text-lg font-semibold mb-4">Pengaduan Terbaru</h3>
                <div className="text-center py-4">
                  <p className="text-gray-500">Belum ada pengaduan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
