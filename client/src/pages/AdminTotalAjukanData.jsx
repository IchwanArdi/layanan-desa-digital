import { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, XCircle, Eye, FileText, Activity } from 'lucide-react';
import { toast } from 'react-toastify';
import { useSettings } from '../contexts/SettingsContext';

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
          console.log(result);
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

  // Function to get user info by warga ID
  const getUserInfo = (wargaId) => {
    const user = userData.find((user) => user._id === wargaId);
    return user || { nama: 'N/A', email: 'N/A' };
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      menunggu: {
        color: darkMode ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-700/50' : 'bg-yellow-100 text-yellow-800',
        text: 'Menunggu',
      },
      proses: {
        color: darkMode ? 'bg-blue-900/30 text-blue-300 border border-blue-700/50' : 'bg-blue-100 text-blue-800',
        text: 'Diproses',
      },
      selesai: {
        color: darkMode ? 'bg-green-900/30 text-green-300 border border-green-700/50' : 'bg-green-100 text-green-800',
        text: 'Selesai',
      },
      ditolak: {
        color: darkMode ? 'bg-red-900/30 text-red-300 border border-red-700/50' : 'bg-red-100 text-red-800',
        text: 'Ditolak',
      },
      ditindaklanjuti: {
        color: darkMode ? 'bg-purple-900/30 text-purple-300 border border-purple-700/50' : 'bg-purple-100 text-purple-800',
        text: 'Ditindaklanjuti',
      },
    };

    const config = statusConfig[status] || {
      color: darkMode ? 'bg-gray-700 text-gray-300 border border-gray-600' : 'bg-gray-100 text-gray-800',
      text: status,
    };
    return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.color}`}>{config.text}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const viewDetail = (ajukanId) => {
    const pengajuan = pengajuanList.find((p) => p._id === ajukanId);
    if (pengajuan) {
      const userInfo = getUserInfo(pengajuan.warga);
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className={`${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center">
              <div className={`p-2 ${darkMode ? 'bg-slate-700' : 'bg-gray-100'} rounded-lg`}>
                <FileText className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pengajuanList.length}</p>
              </div>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center">
              <div className={`p-2 ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'} rounded-lg`}>
                <Clock className={`w-6 h-6 ${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`} />
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Menunggu</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>{statusCount.menunggu}</p>
              </div>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center">
              <div className={`p-2 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} rounded-lg`}>
                <AlertCircle className={`w-6 h-6 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Proses</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>{statusCount.proses}</p>
              </div>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center">
              <div className={`p-2 ${darkMode ? 'bg-green-900/30' : 'bg-green-100'} rounded-lg`}>
                <CheckCircle className={`w-6 h-6 ${darkMode ? 'text-green-300' : 'text-green-600'}`} />
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Ditindaklanjuti</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-green-300' : 'text-green-600'}`}>{statusCount.ditindaklanjuti}</p>
              </div>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center">
              <div className={`p-2 ${darkMode ? 'bg-red-900/30' : 'bg-red-100'} rounded-lg`}>
                <XCircle className={`w-6 h-6 ${darkMode ? 'text-red-300' : 'text-red-600'}`} />
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Selesai</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-red-300' : 'text-red-600'}`}>{statusCount.selesai}</p>
              </div>
            </div>
          </div>
        </div>

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

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
              <thead className={`${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Pengajuan</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Judul</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Kategori</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Alamat</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Status</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Tanggal</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Aksi</th>
                </tr>
              </thead>
              <tbody className={`${darkMode ? 'bg-slate-800 divide-slate-700' : 'bg-white divide-gray-200'} divide-y`}>
                {filteredPengajuan.map((Pengajuan) => {
                  const userInfo = getUserInfo(Pengajuan.warga);
                  return (
                    <tr key={Pengajuan._id} className={`${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userInfo.nama}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{userInfo.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'} max-w-xs truncate`}>{Pengajuan.jenisDokumen}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{Pengajuan.keperluan}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'} max-w-xs truncate`}>{Pengajuan.alamat}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(Pengajuan.status)}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{formatDate(Pengajuan.createdAt)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button onClick={() => viewDetail(Pengajuan._id)} className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'}`}>
                            <Eye className="w-4 h-4" />
                          </button>

                          {Pengajuan.status === 'menunggu' && (
                            <>
                              <button
                                onClick={() => updateStatus(Pengajuan._id, 'proses')}
                                className={`px-2 py-1 text-xs rounded ${darkMode ? 'text-blue-300 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-700/50' : 'text-blue-600 bg-blue-100 hover:text-blue-900'}`}
                              >
                                Proses
                              </button>
                              <button
                                onClick={() => updateStatus(Pengajuan._id, 'ditolak')}
                                className={`px-2 py-1 text-xs rounded ${darkMode ? 'text-red-300 bg-red-900/30 hover:bg-red-900/50 border border-red-700/50' : 'text-red-600 bg-red-100 hover:text-red-900'}`}
                              >
                                Tolak
                              </button>
                            </>
                          )}

                          {Pengajuan.status === 'proses' && (
                            <>
                              <button
                                onClick={() => updateStatus(Pengajuan._id, 'ditindaklanjuti')}
                                className={`px-2 py-1 text-xs rounded ${darkMode ? 'text-purple-300 bg-purple-900/30 hover:bg-purple-900/50 border border-purple-700/50' : 'text-purple-600 bg-purple-100 hover:text-purple-900'}`}
                              >
                                Tindaklanjuti
                              </button>
                              <button
                                onClick={() => updateStatus(Pengajuan._id, 'selesai')}
                                className={`px-2 py-1 text-xs rounded ${darkMode ? 'text-green-300 bg-green-900/30 hover:bg-green-900/50 border border-green-700/50' : 'text-green-600 bg-green-100 hover:text-green-900'}`}
                              >
                                Selesai
                              </button>
                            </>
                          )}

                          {Pengajuan.status === 'ditindaklanjuti' && (
                            <button
                              onClick={() => updateStatus(Pengajuan._id, 'selesai')}
                              className={`px-2 py-1 text-xs rounded ${darkMode ? 'text-green-300 bg-green-900/30 hover:bg-green-900/50 border border-green-700/50' : 'text-green-600 bg-green-100 hover:text-green-900'}`}
                            >
                              Selesai
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredPengajuan.length === 0 && (
              <div className="text-center py-12">
                <FileText className={`mx-auto h-12 w-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <h3 className={`mt-2 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tidak ada Pengajuan</h3>
                <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Belum ada Pengajuan dengan status yang dipilih.</p>
              </div>
            )}
          </div>
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
                    <div className="mt-1">{getStatusBadge(selectedPengajuan.status)}</div>
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
