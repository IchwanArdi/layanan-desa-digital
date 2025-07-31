import { Home, FileText, MessageSquare, CheckCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
          credentials: 'include',
        });

        const result = await response.json();

        if (response.ok) {
          setDashboardData(result);
          console.log('Dashboard data:', result);
        } else {
          toast.error(result.message || 'Gagal mengambil data dashboard.');
        }
      } catch (error) {
        console.error('Error fetching dashboard:', error);
        toast.error('Terjadi kesalahan saat mengambil data dashboard.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div id="dashboard-content" className="tab-content fade-in">
        <div className="space-y-6">
          {/* Loader sementara */}
          {loading ? (
            <p className="text-center text-gray-500">Memuat data dashboard...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Pengajuan Dokumen</p>
                      <p className="text-gray-800 text-2xl font-bold">{dashboardData?.totalPengajuanDokumen ?? 0}</p>
                      <p className="text-blue-600 text-xs">
                        Proses: {dashboardData?.totalPengajuanDokumenProses ?? 0} | Selesai: {dashboardData?.totalPengajuanDokumenSelesai ?? 0}
                      </p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Pengaduan Aktif</p>
                      <p className="text-gray-800 text-2xl font-bold">{dashboardData?.totalPengaduan ?? 0}</p>
                      <p className="text-green-600 text-xs">
                        Total: {dashboardData?.totalPengaduan ?? 0} | Selesai: {dashboardData?.pengaduanSelesai ?? 0}
                      </p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Layanan Selesai</p>
                      <p className="text-gray-800 text-2xl font-bold">{dashboardData?.layananSelesai ?? 0}</p>
                      <p className="text-purple-600 text-xs">
                        Dokumen: {dashboardData?.totalPengajuanDokumenSelesai ?? 0} | Pengaduan: {dashboardData?.totalPengaduanSelesai ?? 0}
                      </p>
                    </div>
                    <CheckCheck className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-gray-800 text-lg font-semibold mb-4">Pengajuan Dokumen Terbaru</h3>
                  <div className="text-center py-4">
                    {dashboardData?.pengajuanTerbaru?.length > 0 ? (
                      <ul>
                        {dashboardData.pengajuanTerbaru.map((item, index) => (
                          <li key={index} className="text-gray-700 text-sm">
                            {item.nama} - {item.status}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">Belum ada pengajuan dokumen</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-gray-800 text-lg font-semibold mb-4">Pengaduan Terbaru</h3>
                  <div className="text-center py-4">
                    {dashboardData?.pengaduanTerbaru?.length > 0 ? (
                      <ul>
                        {dashboardData.pengaduanTerbaru.map((item, index) => (
                          <li key={index} className="text-gray-700 text-sm">
                            {item.judul} - {item.status}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">Belum ada pengaduan</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
