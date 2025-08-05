import StatCard from '../components/Admin/StatCard';
import { FileText, MessageSquare, CheckCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSettings } from '../contexts/SettingsContext';

const AdminPage = () => {
  const [loading, setLoading] = useState(true); // untuk menandai apakah data sedang dimuat
  const [dashboardData, setDashboardData] = useState(null); // untuk menyimpan data dashboard
  const { darkMode } = useSettings(); // Mengambil mode gelap dari context

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

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className={`${darkMode ? 'text-white' : 'text-gray-800'} loader`}>Loading...</div>
        </div>
      ) : (
        <>
          <h1 className={`${darkMode ? 'text-white' : 'text-gray-800'} text-2xl font-bold mb-6`}>Dashboard Admin</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <StatCard title="Total Pengajuan Dokumen" value={dashboardData?.totalPengajuanDokumen || 0} icon={<FileText />} />
            <StatCard title="Total Pengaduan" value={dashboardData?.totalPengaduan || 0} icon={<MessageSquare />} />
            <StatCard title="Pengaduan Selesai" value={(dashboardData?.totalPengaduanSelesai || 0) + (dashboardData?.totalPengajuanDokumenSelesai || 0)} icon={<CheckCheck />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bagian pengajuan dokumen */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h3 className={`${darkMode ? 'text-white' : 'text-gray-800'} text-lg font-semibold mb-4`}>Pengajuan Dokumen Terbaru</h3>
              <div className="space-y-4">
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Belum ada pengajuan</p>
              </div>
            </div>

            {/* Bagian pengaduan */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h3 className={`${darkMode ? 'text-white' : 'text-gray-800'} text-lg font-semibold mb-4`}>Pengaduan Terbaru</h3>
              <div className="space-y-3">
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Belum ada pengaduan</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPage;
