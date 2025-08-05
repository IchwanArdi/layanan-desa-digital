import { Home, FileText, MessageSquare, CheckCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSettings } from '../../../contexts/SettingsContext';

function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  const { darkMode } = useSettings(); // Ambil state darkMode dari context

  // Skeleton component dengan modern dark mode colors
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

  // Function untuk mendapatkan status styling yang konsisten
  const getStatusStyles = (status) => {
    const statusMap = {
      selesai: {
        bg: darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100',
        text: darkMode ? 'text-emerald-300' : 'text-emerald-600',
        border: darkMode ? 'border-emerald-500/30' : 'border-emerald-200',
        label: 'Selesai',
      },
      diproses: {
        bg: darkMode ? 'bg-blue-500/20' : 'bg-blue-100',
        text: darkMode ? 'text-blue-300' : 'text-blue-600',
        border: darkMode ? 'border-blue-500/30' : 'border-blue-200',
        label: 'Diproses',
      },
      pending: {
        bg: darkMode ? 'bg-amber-500/20' : 'bg-amber-100',
        text: darkMode ? 'text-amber-300' : 'text-amber-600',
        border: darkMode ? 'border-amber-500/30' : 'border-amber-200',
        label: 'Menunggu',
      },
      menunggu: {
        bg: darkMode ? 'bg-amber-500/20' : 'bg-amber-100',
        text: darkMode ? 'text-amber-300' : 'text-amber-600',
        border: darkMode ? 'border-amber-500/30' : 'border-amber-200',
        label: 'Menunggu',
      },
      ditindaklanjuti: {
        bg: darkMode ? 'bg-violet-500/20' : 'bg-violet-100',
        text: darkMode ? 'text-violet-300' : 'text-violet-600',
        border: darkMode ? 'border-violet-500/30' : 'border-violet-200',
        label: 'Ditindaklanjuti',
      },
      proses: {
        bg: darkMode ? 'bg-blue-500/20' : 'bg-blue-100',
        text: darkMode ? 'text-blue-300' : 'text-blue-600',
        border: darkMode ? 'border-blue-500/30' : 'border-blue-200',
        label: 'Proses',
      },
    };

    return (
      statusMap[status] || {
        bg: darkMode ? 'bg-slate-500/20' : 'bg-gray-100',
        text: darkMode ? 'text-slate-300' : 'text-gray-600',
        border: darkMode ? 'border-slate-500/30' : 'border-gray-200',
        label: 'Unknown',
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div id="dashboard-content" className="tab-content fade-in">
        <div className="space-y-6">
          {/* Loading State */}
          {loading ? (
            <>
              {/* Skeleton untuk statistik cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg border p-6`}>
                    <SkeletonBox className="w-20 h-4 mb-2" />
                    <SkeletonBox className="w-24 h-6 mb-2" />
                    <SkeletonBox className="w-32 h-3" />
                  </div>
                ))}
              </div>

              {/* Skeleton untuk list cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg border p-6`}>
                    <SkeletonBox className="w-40 h-5 mb-4" />
                    <div className="space-y-3">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className={`flex items-center justify-between ${darkMode ? 'bg-slate-700' : 'bg-gray-50'} p-3 rounded-lg`}>
                          <div>
                            <SkeletonBox className="w-28 h-4 mb-1" />
                            <SkeletonBox className="w-20 h-3" />
                          </div>
                          <SkeletonBox className="w-16 h-5 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pengajuan Dokumen Card */}
                <div className={`${darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' : 'bg-white border-gray-200 hover:shadow-blue-100'} rounded-xl shadow-lg border p-6 transition-all duration-200 hover:shadow-xl`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm font-medium`}>Pengajuan Dokumen</p>
                      <p className={`${darkMode ? 'text-slate-100' : 'text-gray-800'} text-2xl font-bold mt-1`}>{dashboardData?.totalPengajuanDokumen ?? 0}</p>
                      <p className={`${darkMode ? 'text-blue-300' : 'text-blue-600'} text-xs mt-2`}>
                        Proses: {dashboardData?.totalPengajuanDokumenProses ?? 0} | Selesai: {dashboardData?.totalPengajuanDokumenSelesai ?? 0}
                      </p>
                    </div>
                    <div className={`${darkMode ? 'bg-blue-500/20' : 'bg-blue-50'} p-3 rounded-lg`}>
                      <FileText className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                  </div>
                </div>

                {/* Pengaduan Card */}
                <div className={`${darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' : 'bg-white border-gray-200 hover:shadow-emerald-100'} rounded-xl shadow-lg border p-6 transition-all duration-200 hover:shadow-xl`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm font-medium`}>Pengaduan Aktif</p>
                      <p className={`${darkMode ? 'text-slate-100' : 'text-gray-800'} text-2xl font-bold mt-1`}>{dashboardData?.totalPengaduan ?? 0}</p>
                      <p className={`${darkMode ? 'text-emerald-300' : 'text-emerald-600'} text-xs mt-2`}>
                        Total: {dashboardData?.totalPengaduan ?? 0} | Selesai: {dashboardData?.pengaduanSelesai ?? 0}
                      </p>
                    </div>
                    <div className={`${darkMode ? 'bg-emerald-500/20' : 'bg-emerald-50'} p-3 rounded-lg`}>
                      <MessageSquare className={`w-8 h-8 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                  </div>
                </div>

                {/* Layanan Selesai Card */}
                <div className={`${darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' : 'bg-white border-gray-200 hover:shadow-violet-100'} rounded-xl shadow-lg border p-6 transition-all duration-200 hover:shadow-xl`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm font-medium`}>Layanan Selesai</p>
                      <p className={`${darkMode ? 'text-slate-100' : 'text-gray-800'} text-2xl font-bold mt-1`}>{dashboardData?.layananSelesai ?? 0}</p>
                      <p className={`${darkMode ? 'text-violet-300' : 'text-violet-600'} text-xs mt-2`}>
                        Dokumen: {dashboardData?.totalPengajuanDokumenSelesai ?? 0} | Pengaduan: {dashboardData?.totalPengaduanSelesai ?? 0}
                      </p>
                    </div>
                    <div className={`${darkMode ? 'bg-violet-500/20' : 'bg-violet-50'} p-3 rounded-lg`}>
                      <CheckCheck className={`w-8 h-8 ${darkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pengajuan Dokumen Terbaru */}
                <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg border p-6`}>
                  <h3 className={`${darkMode ? 'text-slate-100' : 'text-gray-800'} text-lg font-semibold mb-4`}>Pengajuan Dokumen Terbaru</h3>
                  <div className="space-y-3">
                    {dashboardData?.pengajuanDokumenTerbaru?.length > 0 ? (
                      dashboardData.pengajuanDokumenTerbaru.map((item, index) => {
                        const statusStyle = getStatusStyles(item.status);

                        return (
                          <div key={index} className={`flex items-center justify-between ${darkMode ? 'bg-slate-700' : 'bg-gray-50'} p-4 rounded-lg hover:scale-[1.02] transition-transform duration-200`}>
                            <div className="flex-1">
                              <p className={`${darkMode ? 'text-slate-100' : 'text-gray-800'} font-medium`}>{item.jenisDokumen}</p>
                              <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm mt-1`}>
                                {new Date(item.createdAt).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </p>
                            </div>
                            <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>{statusStyle.label}</span>
                          </div>
                        );
                      })
                    ) : (
                      <div className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Belum ada pengajuan dokumen</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pengaduan Terbaru */}
                <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg border p-6`}>
                  <h3 className={`${darkMode ? 'text-slate-100' : 'text-gray-800'} text-lg font-semibold mb-4`}>Pengaduan Terbaru</h3>
                  <div className="space-y-3">
                    {dashboardData?.pengaduanTerbaru?.length > 0 ? (
                      dashboardData.pengaduanTerbaru.map((item, index) => {
                        const statusStyle = getStatusStyles(item.status);

                        return (
                          <div key={index} className={`flex items-center justify-between ${darkMode ? 'bg-slate-700' : 'bg-gray-50'} p-4 rounded-lg hover:scale-[1.02] transition-transform duration-200`}>
                            <div className="flex-1">
                              <p className={`${darkMode ? 'text-slate-100' : 'text-gray-800'} font-medium line-clamp-1`}>{item.judul}</p>
                              <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm mt-1`}>
                                {new Date(item.createdAt).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </p>
                            </div>
                            <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>{statusStyle.label}</span>
                          </div>
                        );
                      })
                    ) : (
                      <div className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Belum ada pengaduan</p>
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
