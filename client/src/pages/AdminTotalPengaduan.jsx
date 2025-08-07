import { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, XCircle, Eye, FileText, Activity } from 'lucide-react';
import { toast } from 'react-toastify';
import { useSettings } from '../contexts/SettingsContext';
import { getUserInfo, getStatusBadge, formatDate } from '../components/Admin/uiUtils';
import { pengaduanColumns, emptyMessages } from '../components/Admin/TableConfigs';
import StatsCards from '../components/Admin/StatsCards';
import DataTable from '../components/Admin/DataTable';
import DetailModal from '../components/Admin/DetailModel';

function AdminTotalPengaduan() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedPengaduan, setSelectedPengaduan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [pengaduanList, setPengaduanList] = useState([]);

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

  // Fetch pengaduan data
  useEffect(() => {
    const fetchPengaduan = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pengaduan`, {
          credentials: 'include',
        });
        const result = await response.json();

        if (response.ok) {
          setPengaduanList(result.pengaduanTerbaru || result || []);
        } else {
          toast.error(result.message || 'Gagal mengambil data pengaduan.');
        }
      } catch (error) {
        console.error('Error fetching pengaduan:', error);
        toast.error('Terjadi kesalahan saat mengambil data pengaduan.');
      } finally {
        setLoading(false);
      }
    };

    fetchPengaduan();
  }, []);

  const viewDetail = (pengaduanId) => {
    const pengaduan = pengaduanList.find((p) => p._id === pengaduanId);
    if (pengaduan) {
      const userInfo = getUserInfo(pengaduan.warga, userData);
      setSelectedPengaduan({
        ...pengaduan,
        warga: userInfo,
      });
      setShowModal(true);
    }
  };

  const updateStatus = async (pengaduanId, newStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pengaduan/${pengaduanId}/status`, {
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
        toast.success(`Status pengaduan berhasil diubah menjadi ${newStatus}`);

        // Update local data
        setPengaduanList((prevList) => prevList.map((item) => (item._id === pengaduanId ? { ...item, status: newStatus, updatedAt: new Date().toISOString() } : item)));

        // Update selectedPengaduan if viewing details
        if (selectedPengaduan && selectedPengaduan._id === pengaduanId) {
          setSelectedPengaduan((prev) => ({
            ...prev,
            status: newStatus,
            updatedAt: new Date().toISOString(),
          }));
        }
      } else {
        toast.error(result.message || 'Gagal mengubah status pengaduan');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Terjadi kesalahan saat mengubah status');
    }
  };

  // Filter pengaduan berdasarkan status yang dipilih
  const filteredPengaduan = selectedStatus === 'all' ? pengaduanList : pengaduanList.filter((p) => p.status === selectedStatus);

  // Hitung total pengaduan berdasarkan status
  const statusCount = pengaduanList.reduce(
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
          <span className="text-xl">Memuat Halaman Pengaduan...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}

        <StatsCards statusCount={statusCount} totalItems={pengaduanList.length} darkMode={darkMode} type="pengaduan" />

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

        {/* Pengaduan List */}
        <div className={`${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'} rounded-lg shadow`}>
          <div className={`px-6 py-4 border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Daftar Pengaduan</h2>
          </div>

          <DataTable
            data={filteredPengaduan}
            userData={userData}
            darkMode={darkMode}
            getUserInfo={getUserInfo}
            getStatusBadge={getStatusBadge}
            formatDate={formatDate}
            viewDetail={viewDetail}
            updateStatus={updateStatus}
            columns={pengaduanColumns(darkMode, viewDetail, updateStatus, formatDate, getStatusBadge)}
            emptyMessage={emptyMessages.pengaduan}
          />
        </div>
      </div>

      {/* Modal Detail */}
      <DetailModal showModal={showModal} onClose={() => setShowModal(false)} selectedItem={selectedPengaduan} darkMode={darkMode} getStatusBadge={getStatusBadge} formatDate={formatDate} updateStatus={updateStatus} type="pengaduan" />
    </div>
  );
}

export default AdminTotalPengaduan;
