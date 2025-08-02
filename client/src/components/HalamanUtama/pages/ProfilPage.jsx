import { LogOut, FileText, MessageSquare, CircleCheck, Settings, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

// ProfilPage.jsx
function ProfilPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  const SkeletonBox = ({ className }) => <div className={`bg-gray-200 rounded-md animate-pulse ${className}`}></div>;

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

  // Untuk menangani logout
  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        localStorage.removeItem('user');
        navigate('/');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Terjadi kesalahan saat logout');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div id="profile-content" className="tab-content">
        <div className="max-w-4xl mx-auto">
          {/* Loader sementara */}
          {loading ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Skeleton kartu profil */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="text-center space-y-4">
                    <SkeletonBox className="w-20 h-20 rounded-full mx-auto" />
                    <SkeletonBox className="w-32 h-5 mx-auto" />
                    <SkeletonBox className="w-40 h-4 mx-auto" />
                    <SkeletonBox className="w-48 h-6 mx-auto mt-4" />
                  </div>
                </div>

                {/* Skeleton statistik */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <SkeletonBox className="w-32 h-5 mb-4" />
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <SkeletonBox className="w-36 h-4" />
                        <SkeletonBox className="w-10 h-4" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skeleton pengaturan akun */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <SkeletonBox className="w-40 h-5 mb-4" />
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <SkeletonBox key={i} className="w-full h-10" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Skeleton riwayat aktivitas */}
              <div className="bg-white rounded-xl shadow-lg p-6 mt-6 space-y-4">
                <SkeletonBox className="w-60 h-5 mb-4" />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <SkeletonBox className="w-52 h-4 mb-1" />
                      <SkeletonBox className="w-36 h-3" />
                    </div>
                    <SkeletonBox className="w-16 h-5 rounded-full" />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
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
                      <span className="text-blue-600 font-bold">{dashboardData?.totalPengajuanDokumen ?? 0}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Total Pengaduan</span>
                      </div>
                      <span className="text-green-600 font-bold">{dashboardData?.totalPengaduan ?? 0}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-100 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CircleCheck className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">Layanan Selesai</span>
                      </div>
                      <span className="text-purple-600 font-bold">{dashboardData?.totalLayananSelesai ?? 0}</span>
                    </div>
                  </div>
                </div>

                {/* Account Settings */}
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-gray-800 text-lg font-semibold mb-4 flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-gray-600" />
                    Pengaturan Akun
                  </h3>

                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left group" onClick={() => toast.info('Fitur riwayat pengaduan akan segera tersedia')}>
                      <MessageSquare className="h-5 w-5 text-gray-500 group-hover:text-blue-600" />
                      <span className="text-gray-700 group-hover:text-blue-700">Riwayat Pengaduan</span>
                    </button>

                    <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left group" onClick={() => toast.info('Fitur riwayat dokumen akan segera tersedia')}>
                      <FileText className="h-5 w-5 text-gray-500 group-hover:text-blue-600" />
                      <span className="text-gray-700 group-hover:text-blue-700">Riwayat Dokumen</span>
                    </button>

                    <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left group" onClick={() => toast.info('Fitur ubah password akan segera tersedia')}>
                      <Settings className="h-5 w-5 text-gray-500 group-hover:text-blue-600" />
                      <span className="text-gray-700 group-hover:text-blue-700">Ubah Password</span>
                    </button>

                    <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left group" onClick={() => toast.info('Fitur notifikasi akan segera tersedia')}>
                      <Bell className="h-5 w-5 text-gray-500 group-hover:text-blue-600" />
                      <span className="text-gray-700 group-hover:text-blue-700">Notifikasi</span>
                    </button>

                    <div className="pt-3 border-t border-gray-200">
                      <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-3 hover:bg-red-50 text-red-600 rounded-lg transition-colors text-left cursor-pointer">
                        <LogOut className="h-5 w-5" />
                        <span>Keluar dari Akun</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity History */}
              <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                <h3 className="text-gray-800 text-lg font-semibold mb-4">Riwayat Aktivitas Terbaru</h3>

                <div className="space-y-4">
                  {/* Riwayat Pengaduan */}

                  {dashboardData?.pengaduanTerbaru?.length > 0 ? (
                    dashboardData.pengaduanTerbaru.map((item, index) => {
                      let statusClass = 'bg-gray-100 text-gray-600';
                      let statusText = item.status;
                      if (statusText === 'selesai') {
                        statusClass = 'bg-green-100 text-green-600';
                        statusText = 'Selesai';
                      } else if (statusText === 'ditindaklanjuti') {
                        statusClass = 'bg-blue-100 text-blue-600';
                        statusText = 'Ditindaklanjuti';
                      } else if (statusText === 'proses') {
                        statusClass = 'bg-yellow-100 text-yellow-600';
                        statusText = 'Proses';
                      } else if (statusText === 'menunggu') {
                        statusClass = 'bg-gray-100 text-gray-600';
                        statusText = 'Menunggu';
                      }

                      return (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-gray-800 font-bold">Pengaduan: {item.judul}</p>
                            <p className="text-gray-600 text-sm">{new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' })}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}>{statusText}</span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <i data-lucide="inbox" className="h-12 w-12 text-gray-400 mx-auto mb-4"></i>
                      <p className="text-gray-500">Belum ada aktivitas terbaru</p>
                      <p className="text-gray-400 text-sm">Riwayat pengaduan dan pengajuan dokumen akan muncul di sini</p>
                    </div>
                  )}

                  {/* Riwayat Pengajuan Dokumen */}
                  {dashboardData?.pengajuanDokumenTerbaru?.length > 0 ? (
                    dashboardData.pengajuanDokumenTerbaru.map((item, index) => {
                      let statusClass = 'bg-gray-100 text-gray-600';
                      let statusText = item.status;
                      if (statusText === 'selesai') {
                        statusClass = 'bg-green-100 text-green-600';
                        statusText = 'Selesai';
                      } else if (statusText === 'ditindaklanjuti') {
                        statusClass = 'bg-blue-100 text-blue-600';
                        statusText = 'Ditindaklanjuti';
                      } else if (statusText === 'proses') {
                        statusClass = 'bg-yellow-100 text-yellow-600';
                        statusText = 'Proses';
                      } else if (statusText === 'menunggu') {
                        statusClass = 'bg-gray-100 text-gray-600';
                        statusText = 'Menunggu';
                      }

                      return (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-gray-800 font-bold">Pengajuan Dokumen: {item.jenisDokumen}</p>
                            <p className="text-gray-600 text-sm">{new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' })}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}>{statusText}</span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500">Belum ada aktivitas terbaru</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilPage;
