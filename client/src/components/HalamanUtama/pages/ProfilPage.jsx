import { LogOut, FileText, MessageSquare, CircleCheck, Settings, Bell, User, Inbox } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useSettings } from '../../../contexts/SettingsContext';

// ProfilPage.jsx
function ProfilPage() {
  const navigate = useNavigate();
  const { darkMode } = useSettings();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  const SkeletonBox = ({ className }) => <div className={`${darkMode ? 'bg-slate-700' : 'bg-gray-200'} rounded-md animate-pulse ${className}`}></div>;

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
                <div className={`rounded-xl shadow-xl border transition-all duration-300 ${darkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-gray-200 shadow-gray-900/10'} p-6`}>
                  <div className="text-center space-y-4">
                    <SkeletonBox className="w-20 h-20 rounded-full mx-auto" />
                    <SkeletonBox className="w-32 h-5 mx-auto" />
                    <SkeletonBox className="w-40 h-4 mx-auto" />
                    <SkeletonBox className="w-48 h-6 mx-auto mt-4" />
                  </div>
                </div>

                {/* Skeleton statistik */}
                <div className={`rounded-xl shadow-xl border transition-all duration-300 ${darkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-gray-200 shadow-gray-900/10'} p-6`}>
                  <SkeletonBox className="w-32 h-5 mb-4" />
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                        <SkeletonBox className="w-36 h-4 mb-2" />
                        <SkeletonBox className="w-10 h-4" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skeleton pengaturan akun */}
                <div className={`rounded-xl shadow-xl border transition-all duration-300 ${darkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-gray-200 shadow-gray-900/10'} p-6`}>
                  <SkeletonBox className="w-40 h-5 mb-4" />
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <SkeletonBox key={i} className="w-full h-10" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Skeleton riwayat aktivitas */}
              <div className={`rounded-xl shadow-xl border transition-all duration-300 ${darkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-gray-200 shadow-gray-900/10'} p-6 mt-6 space-y-4`}>
                <SkeletonBox className="w-60 h-5 mb-4" />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
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
                {/* Profile Card */}
                <div className={`rounded-xl shadow-xl border transition-all duration-300 ${darkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-gray-200 shadow-gray-900/10'} p-6`}>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-10 w-10 text-white" />
                    </div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>ICHWAN</h3>
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Warga Desa Karangpucung</p>

                    <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-green-50'}`}>
                      <div className="flex items-center justify-center space-x-2">
                        <User className={`h-4 w-4 ${darkMode ? 'text-emerald-400' : 'text-green-600'}`} />
                        <span className={`text-sm font-medium ${darkMode ? 'text-emerald-300' : 'text-green-800'}`}>Akun Terverifikasi</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics Card */}
                <div className={`rounded-xl shadow-xl border transition-all duration-300 ${darkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-gray-200 shadow-gray-900/10'} p-6`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>Statistik Anda</h3>

                  <div className="space-y-4">
                    <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50'}`}>
                      <div className="flex items-center space-x-3">
                        <FileText className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <span className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>Total Pengajuan Dokumen</span>
                      </div>
                      <span className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{dashboardData?.totalPengajuanDokumen ?? 0}</span>
                    </div>

                    <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-green-50'}`}>
                      <div className="flex items-center space-x-3">
                        <MessageSquare className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-green-600'}`} />
                        <span className={`text-sm font-medium ${darkMode ? 'text-emerald-300' : 'text-green-800'}`}>Total Pengaduan</span>
                      </div>
                      <span className={`font-bold ${darkMode ? 'text-emerald-400' : 'text-green-600'}`}>{dashboardData?.totalPengaduan ?? 0}</span>
                    </div>

                    <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-100'}`}>
                      <div className="flex items-center space-x-3">
                        <CircleCheck className={`h-5 w-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                        <span className={`text-sm font-medium ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>Layanan Selesai</span>
                      </div>
                      <span className={`font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{dashboardData?.totalLayananSelesai ?? 0}</span>
                    </div>
                  </div>
                </div>

                {/* Account Settings */}
                <div
                  className={`rounded-xl shadow-xl border transition-all duration-300 hover:shadow-2xl ${
                    darkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50 hover:shadow-slate-900/70' : 'bg-white border-gray-200 shadow-gray-900/10 hover:shadow-gray-900/20'
                  } p-6`}
                >
                  <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
                    <Settings className={`h-5 w-5 mr-2 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`} />
                    Pengaturan Akun
                  </h3>

                  <div className="space-y-2">
                    <button
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-left group ${darkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'}`}
                      onClick={() => toast.info('Fitur riwayat pengaduan akan segera tersedia')}
                    >
                      <MessageSquare className={`h-5 w-5 transition-colors ${darkMode ? 'text-slate-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600'}`} />
                      <span className={`transition-colors ${darkMode ? 'text-slate-300 group-hover:text-blue-300' : 'text-gray-700 group-hover:text-blue-700'}`}>Riwayat Pengaduan</span>
                    </button>

                    <button
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-left group ${darkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'}`}
                      onClick={() => toast.info('Fitur riwayat dokumen akan segera tersedia')}
                    >
                      <FileText className={`h-5 w-5 transition-colors ${darkMode ? 'text-slate-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600'}`} />
                      <span className={`transition-colors ${darkMode ? 'text-slate-300 group-hover:text-blue-300' : 'text-gray-700 group-hover:text-blue-700'}`}>Riwayat Dokumen</span>
                    </button>

                    <button
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-left group ${darkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'}`}
                      onClick={() => toast.info('Fitur ubah password akan segera tersedia')}
                    >
                      <Settings className={`h-5 w-5 transition-colors ${darkMode ? 'text-slate-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600'}`} />
                      <span className={`transition-colors ${darkMode ? 'text-slate-300 group-hover:text-blue-300' : 'text-gray-700 group-hover:text-blue-700'}`}>Ubah Password</span>
                    </button>

                    <button
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-left group ${darkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'}`}
                      onClick={() => toast.info('Fitur notifikasi akan segera tersedia')}
                    >
                      <Bell className={`h-5 w-5 transition-colors ${darkMode ? 'text-slate-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600'}`} />
                      <span className={`transition-colors ${darkMode ? 'text-slate-300 group-hover:text-blue-300' : 'text-gray-700 group-hover:text-blue-700'}`}>Notifikasi</span>
                    </button>

                    <div className={`pt-3 border-t ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                      <button
                        onClick={handleLogout}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-left cursor-pointer group ${darkMode ? 'hover:bg-red-500/10 text-red-400' : 'hover:bg-red-50 text-red-600'}`}
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Keluar dari Akun</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity History */}
              <div className={`rounded-xl shadow-xl border transition-all duration-300 ${darkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-gray-200 shadow-gray-900/10'} p-6 mt-6`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>Riwayat Aktivitas Terbaru</h3>

                <div className="space-y-4">
                  {/* Riwayat Pengaduan */}
                  {dashboardData?.pengaduanTerbaru?.length > 0
                    ? dashboardData.pengaduanTerbaru.map((item, index) => {
                        let statusClass = darkMode ? 'bg-slate-600/50 text-slate-300' : 'bg-gray-100 text-gray-600';
                        let statusText = item.status;
                        if (statusText === 'selesai') {
                          statusClass = darkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-green-100 text-green-600';
                          statusText = 'Selesai';
                        } else if (statusText === 'ditindaklanjuti') {
                          statusClass = darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600';
                          statusText = 'Ditindaklanjuti';
                        } else if (statusText === 'proses') {
                          statusClass = darkMode ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-600';
                          statusText = 'Proses';
                        } else if (statusText === 'menunggu') {
                          statusClass = darkMode ? 'bg-slate-600/50 text-slate-300' : 'bg-gray-100 text-gray-600';
                          statusText = 'Menunggu';
                        } else if (statusText === 'ditolak') {
                          statusClass = darkMode ? 'bg-red-600/50 text-red-300' : 'bg-red-100 text-red-600';
                          statusText = 'Ditolak';
                        }

                        return (
                          <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                            <div>
                              <p className={`font-bold ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>Pengaduan: {item.judul}</p>
                              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                                {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' })}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}>{statusText}</span>
                          </div>
                        );
                      })
                    : null}

                  {/* Riwayat Pengajuan Dokumen */}
                  {dashboardData?.pengajuanDokumenTerbaru?.length > 0
                    ? dashboardData.pengajuanDokumenTerbaru.map((item, index) => {
                        let statusClass = darkMode ? 'bg-slate-600/50 text-slate-300' : 'bg-gray-100 text-gray-600';
                        let statusText = item.status;
                        if (statusText === 'selesai') {
                          statusClass = darkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-green-100 text-green-600';
                          statusText = 'Selesai';
                        } else if (statusText === 'ditindaklanjuti') {
                          statusClass = darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600';
                          statusText = 'Ditindaklanjuti';
                        } else if (statusText === 'proses') {
                          statusClass = darkMode ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-600';
                          statusText = 'Proses';
                        } else if (statusText === 'menunggu') {
                          statusClass = darkMode ? 'bg-slate-600/50 text-slate-300' : 'bg-gray-100 text-gray-600';
                          statusText = 'Menunggu';
                        } else if (statusText === 'ditolak') {
                          statusClass = darkMode ? 'bg-red-600/50 text-red-300' : 'bg-red-100 text-red-600';
                          statusText = 'Ditolak';
                        }

                        return (
                          <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                            <div>
                              <p className={`font-bold ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>Pengajuan Dokumen: {item.jenisDokumen}</p>
                              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                                {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' })}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}>{statusText}</span>
                          </div>
                        );
                      })
                    : null}

                  {/* Empty state */}
                  {!dashboardData?.pengaduanTerbaru?.length && !dashboardData?.pengajuanDokumenTerbaru?.length && (
                    <div className="text-center py-8">
                      <Inbox className={`h-12 w-12 mx-auto mb-4 ${darkMode ? 'text-slate-500' : 'text-gray-400'}`} />
                      <p className={`${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Belum ada aktivitas terbaru</p>
                      <p className={`text-sm ${darkMode ? 'text-slate-500' : 'text-gray-400'}`}>Riwayat pengaduan dan pengajuan dokumen akan muncul di sini</p>
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
