import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSettings } from '../contexts/SettingsContext';
import { FileText, MessageSquare, CheckCheck, Clock, AlertTriangle, Calendar, Activity } from 'lucide-react';

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  const { darkMode } = useSettings();

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

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'} rounded-xl shadow-lg p-6 transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{title}</p>
          <p className={`text-3xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className={`${darkMode ? 'text-white' : 'text-gray-800'} flex items-center space-x-3`}>
          <Activity className="w-8 h-8 animate-spin" />
          <span className="text-xl">Memuat Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-blue-50'}`}>
          <div className="flex items-center space-x-2">
            <Calendar className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Pengaduan" value={dashboardData?.totalPengaduan || 0} icon={<MessageSquare className="w-6 h-6 text-white" />} color="bg-gradient-to-r from-blue-500 to-blue-600" />
        <StatCard title="Pengajuan Dokumen" value={dashboardData?.totalPengajuanDokumen || 0} icon={<FileText className="w-6 h-6 text-white" />} color="bg-gradient-to-r from-green-500 to-green-600" />
        <StatCard
          title="Total Selesai"
          value={(dashboardData?.totalPengaduanSelesai || 0) + (dashboardData?.totalPengajuanDokumenSelesai || 0)}
          icon={<CheckCheck className="w-6 h-6 text-white" />}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
        <StatCard title="Pending Review" value={(dashboardData?.totalPengaduan || 0) - (dashboardData?.totalPengaduanSelesai || 0)} icon={<Clock className="w-6 h-6 text-white" />} color="bg-gradient-to-r from-orange-500 to-orange-600" />
      </div>

      {/* Status Overview */}
      <div className={`${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Ringkasan Status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Menunggu</h3>
            <p className={`text-2xl font-bold text-yellow-600`}>{(dashboardData?.totalPengaduan || 0) - (dashboardData?.totalPengaduanSelesai || 0)}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Diproses</h3>
            <p className={`text-2xl font-bold text-blue-600`}>{Math.floor(((dashboardData?.totalPengaduan || 0) - (dashboardData?.totalPengaduanSelesai || 0)) * 0.6)}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCheck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Selesai</h3>
            <p className={`text-2xl font-bold text-green-600`}>{(dashboardData?.totalPengaduanSelesai || 0) + (dashboardData?.totalPengajuanDokumenSelesai || 0)}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Urgent</h3>
            <p className={`text-2xl font-bold text-red-600`}>{Math.floor(((dashboardData?.totalPengaduan || 0) - (dashboardData?.totalPengaduanSelesai || 0)) * 0.2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
