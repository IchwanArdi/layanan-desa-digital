import { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, XCircle, Eye, FileText, Activity } from 'lucide-react';
import { toast } from 'react-toastify';
import { useSettings } from '../contexts/SettingsContext';
import { getUserInfo, getStatusBadge, formatDate } from '../components/Admin/uiUtils';
import StatsCards from '../components/Admin/StatsCards';
import DataTable from '../components/Admin/DataTable';
import { pengajuanColumns, emptyMessages } from '../components/Admin/TableConfigs';

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/PengajuanDokumen/${ajukanId}/status`, {
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
      {showModal && selectedPengajuan && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Detail Pengajuan</h3>
                <button onClick={() => setShowModal(false)} className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Judul</label>
                  <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedPengajuan.jenisDokumen}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Kategori</label>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedPengajuan.kategori}</p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Status</label>
                    {/* Pass darkMode as second parameter to getStatusBadge */}
                    <div className="mt-1">{getStatusBadge(selectedPengajuan.status, darkMode)}</div>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>alamat</label>
                  <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedPengajuan.alamat}</p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Deskripsi</label>
                  <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'} whitespace-pre-wrap`}>{selectedPengajuan.catatan}</p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Pengadu</label>
                  <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedPengajuan.warga?.nama} ({selectedPengajuan.warga?.email})
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Tanggal Dibuat</label>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(selectedPengajuan.createdAt)}</p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Terakhir Diupdate</label>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(selectedPengajuan.updatedAt)}</p>
                  </div>
                </div>

                {selectedPengajuan.keteranganAdmin && (
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Keterangan Admin</label>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedPengajuan.keteranganAdmin}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                {selectedPengajuan.status === 'menunggu' && (
                  <>
                    <button
                      onClick={() => {
                        updateStatus(selectedPengajuan._id, 'proses');
                        setShowModal(false);
                      }}
                      className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Set ke Proses
                    </button>
                    <button
                      onClick={() => {
                        updateStatus(selectedPengajuan._id, 'ditolak');
                        setShowModal(false);
                      }}
                      className="px-4 py-2 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 text-white"
                    >
                      Tolak
                    </button>
                  </>
                )}

                {selectedPengajuan.status === 'proses' && (
                  <>
                    <button
                      onClick={() => {
                        updateStatus(selectedPengajuan._id, 'ditindaklanjuti');
                        setShowModal(false);
                      }}
                      className="px-4 py-2 text-sm font-medium rounded-md bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Tindaklanjuti
                    </button>
                    <button
                      onClick={() => {
                        updateStatus(selectedPengajuan._id, 'selesai');
                        setShowModal(false);
                      }}
                      className="px-4 py-2 text-sm font-medium rounded-md bg-green-600 hover:bg-green-700 text-white"
                    >
                      Selesaikan
                    </button>
                  </>
                )}

                {selectedPengajuan.status === 'ditindaklanjuti' && (
                  <button
                    onClick={() => {
                      updateStatus(selectedPengajuan._id, 'selesai');
                      setShowModal(false);
                    }}
                    className="px-4 py-2 text-sm font-medium rounded-md bg-green-600 hover:bg-green-700 text-white"
                  >
                    Selesaikan
                  </button>
                )}

                <button onClick={() => setShowModal(false)} className={`px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'bg-slate-600 text-white hover:bg-slate-500' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}>
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTotalAjukanData;
