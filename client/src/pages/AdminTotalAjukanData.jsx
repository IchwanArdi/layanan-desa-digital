import { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, XCircle, Eye, FileText, Activity } from 'lucide-react';
import { toast } from 'react-toastify';
import { useSettings } from '../contexts/SettingsContext';
import { getUserInfo, getStatusBadge, formatDate } from '../components/Admin/uiUtils';
import { pengajuanColumns, emptyMessages } from '../components/Admin/TableConfigs';
import StatsCards from '../components/Admin/StatsCards';
import DataTable from '../components/Admin/DataTable';
import DetailModal from '../components/Admin/DetailModel';

function AdminTotalAjukanData() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedPengajuan, setSelectedPengajuan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [pengajuanList, setPengajuanList] = useState([]);

  const { darkMode } = useSettings();

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
          credentials: 'include',
        });
        const result = await response.json();

        if (response.ok) {
          setUserData(result);
        } else {
          toast.error(result.message || 'Gagal mengambil data user.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Terjadi kesalahan saat mengambil data user.');
      }
    };

    fetchUsers();
  }, []);

  // Fetch pengajuan data
  useEffect(() => {
    const fetchPengajuan = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/PengajuanDokumen`, {
          credentials: 'include',
        });
        const result = await response.json();

        if (response.ok) {
          setPengajuanList(result.ajukanTerbaru || result || []);
        } else {
          toast.error(result.message || 'Gagal mengambil data pengajuan.');
        }
      } catch (error) {
        console.error('Error fetching pengajuan:', error);
        toast.error('Terjadi kesalahan saat mengambil data pengajuan.');
      } finally {
        setLoading(false);
      }
    };

    fetchPengajuan();
  }, []);

  const viewDetail = (ajukanId) => {
    const pengajuan = pengajuanList.find((p) => p._id === ajukanId);
    if (pengajuan) {
      // Pass userData as second parameter
      const userInfo = getUserInfo(pengajuan.warga, userData);
      setSelectedPengajuan({
        ...pengajuan,
        warga: userInfo,
      });
      setShowModal(true);
    }
  };

  const updateStatus = async (ajukanId, newStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pengajuandokumen/${ajukanId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          status: newStatus,
          keteranganAdmin: `Status diubah menjadi ${newStatus}`,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`Status pengajuan berhasil diubah menjadi ${newStatus}`);
        console.log(result);

        // Update local data
        setPengajuanList((prevList) => prevList.map((item) => (item._id === ajukanId ? { ...item, status: newStatus, updatedAt: new Date().toISOString() } : item)));

        // Update selected pengajuan if viewing details
        if (selectedPengajuan && selectedPengajuan._id === ajukanId) {
          setSelectedPengajuan((prev) => ({
            ...prev,
            status: newStatus,
            updatedAt: new Date().toISOString(),
          }));
        }
      } else {
        toast.error(result.message || 'Gagal mengubah status pengajuan');
        console.log('error:', result);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Terjadi kesalahan saat mengubah status');
    }
  };

  // Filter pengajuan berdasarkan status yang dipilih
  const filteredPengajuan = selectedStatus === 'all' ? pengajuanList : pengajuanList.filter((p) => p.status === selectedStatus);

  // Hitung total pengajuan berdasarkan status
  const statusCount = pengajuanList.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    {
      menunggu: 0,
      proses: 0,
      ditindaklanjuti: 0,
      selesai: 0,
      ditolak: 0,
    }
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className={`${darkMode ? 'text-white' : 'text-gray-800'} flex items-center space-x-3`}>
          <Activity className="w-8 h-8 animate-spin" />
          <span className="text-xl">Memuat Halaman Pengajuan...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <StatsCards statusCount={statusCount} totalItems={pengajuanList.length} darkMode={darkMode} type="pengajuan" />

        {/* Filter */}
        <div className={`${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'} rounded-lg shadow mb-6 p-6`}>
          <div className="flex items-center space-x-4">
            <label className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Filter Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={`border ${darkMode ? 'border-slate-600 bg-slate-700 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'} rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2`}
            >
              <option value="all">Semua Status</option>
              <option value="menunggu">Menunggu</option>
              <option value="proses">Proses</option>
              <option value="ditindaklanjuti">Ditindaklanjuti</option>
              <option value="selesai">Selesai</option>
              <option value="ditolak">Ditolak</option>
            </select>
          </div>
        </div>

        {/* Pengajuan List */}
        <div className={`${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'} rounded-lg shadow`}>
          <div className={`px-6 py-4 border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Daftar Pengajuan</h2>
          </div>

          <DataTable
            data={filteredPengajuan}
            userData={userData}
            darkMode={darkMode}
            getUserInfo={getUserInfo}
            getStatusBadge={getStatusBadge}
            formatDate={formatDate}
            viewDetail={viewDetail}
            updateStatus={updateStatus}
            columns={pengajuanColumns(darkMode, viewDetail, updateStatus, formatDate, getStatusBadge)}
            emptyMessage={emptyMessages.pengajuan}
          />
        </div>
      </div>

      {/* Modal Detail */}
      <DetailModal showModal={showModal} onClose={() => setShowModal(false)} selectedItem={selectedPengajuan} darkMode={darkMode} getStatusBadge={getStatusBadge} formatDate={formatDate} updateStatus={updateStatus} type="pengajuan" />
    </div>
  );
}

export default AdminTotalAjukanData;
