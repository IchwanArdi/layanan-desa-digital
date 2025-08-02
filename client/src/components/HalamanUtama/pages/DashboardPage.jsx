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
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <span className="ml-3 text-slate-600">Memuat data dashboard...</span>
              </div>
            </div>
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
                {/* Pengajuan Dokumen */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-gray-800 text-lg font-semibold mb-4">Pengajuan Dokumen Terbaru</h3>
                  <div className="space-y-3">
                    {dashboardData?.pengajuanDokumenTerbaru?.length > 0 ? (
                      dashboardData.pengajuanDokumenTerbaru.map((item, index) => {
                        let statusClass = 'bg-gray-100 text-gray-600';
                        let statusText = item.status;
                        if (statusText === 'selesai') {
                          statusClass = 'bg-green-100 text-green-600';
                          statusText = 'Selesai';
                        } else if (statusText === 'diproses') {
                          statusClass = 'bg-blue-100 text-blue-600';
                          statusText = 'Proses';
                        } else if (statusText === 'pending') {
                          statusClass = 'bg-gray-100 text-gray-600';
                          statusText = 'Menunggu';
                        }

                        return (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-gray-800 font-medium">{item.jenisDokumen}</p>
                              <p className="text-gray-600 text-sm">{new Date(item.createdAt).toLocaleDateString('id-ID')}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}>{statusText}</span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500">Belum ada pengajuan dokumen</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pengaduan */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-gray-800 text-lg font-semibold mb-4">Pengaduan Terbaru</h3>
                  <div className="space-y-3">
                    {dashboardData?.pengaduanTerbaru?.length > 0 ? (
                      dashboardData.pengaduanTerbaru.map((item, index) => {
                        let statusClass = 'bg-gray-100 text-gray-600';
                        let statusText = item.status;
                        if (statusText === 'selesai') {
                          statusClass = 'bg-green-100 text-green-600';
                          statusText = 'Selesai';
                        } else if (statusText === 'ditindaklanjuti') {
                          statusClass = 'bg-yellow-100 text-yellow-600';
                          statusText = 'Ditindaklanjuti';
                        } else if (statusText === 'proses') {
                          statusClass = 'bg-blue-100 text-blue-600';
                          statusText = 'Proses';
                        } else if (statusText === 'menunggu') {
                          statusClass = 'bg-gray-100 text-gray-600';
                          statusText = 'Menunggu';
                        }

                        return (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-gray-800 font-medium">{item.judul}</p>
                              <p className="text-gray-600 text-sm">{new Date(item.createdAt).toLocaleDateString('id-ID')}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}>{statusText}</span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500">Belum ada pengaduan</p>
                      </div>
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
