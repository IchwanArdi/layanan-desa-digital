import { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, XCircle, Eye, FileText } from 'lucide-react';

function AdminTotalPengaduan() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedPengaduan, setSelectedPengaduan] = useState(null);

  // Data contoh statis untuk UI
  const stats = {
    total: 156,
    menunggu: 23,
    proses: 15,
    selesai: 98,
    ditolak: 20,
  };

  const pengaduanList = [
    {
      _id: '1',
      warga: { nama: 'Ahmad Susilo', email: 'ahmad@email.com' },
      judul: 'Jalan Rusak di Depan Rumah',
      kategori: 'Infrastruktur',
      lokasi: 'Jl. Merdeka No. 15, RT 02/RW 05',
      status: 'menunggu',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      deskripsi: 'Jalan di depan rumah sudah rusak parah dengan banyak lubang yang membahayakan pengendara.',
      keteranganAdmin: null,
    },
    {
      _id: '2',
      warga: { nama: 'Siti Rahayu', email: 'siti@email.com' },
      judul: 'Lampu Jalan Mati',
      kategori: 'Utilitas',
      lokasi: 'Jl. Sudirman RT 03/RW 02',
      status: 'proses',
      createdAt: '2024-01-14T08:15:00Z',
      updatedAt: '2024-01-16T09:20:00Z',
      deskripsi: 'Lampu jalan di area ini sudah mati sejak seminggu yang lalu, membuat jalanan gelap di malam hari.',
      keteranganAdmin: 'Sedang dikoordinasikan dengan PLN untuk perbaikan',
    },
    {
      _id: '3',
      warga: { nama: 'Budi Santoso', email: 'budi@email.com' },
      judul: 'Sampah Menumpuk',
      kategori: 'Kebersihan',
      lokasi: 'Pasar Tradisional Blok A',
      status: 'selesai',
      createdAt: '2024-01-10T14:45:00Z',
      updatedAt: '2024-01-18T16:00:00Z',
      deskripsi: 'Sampah di area pasar menumpuk dan tidak diangkut selama beberapa hari.',
      keteranganAdmin: 'Telah dikoordinasikan dengan petugas kebersihan, sampah sudah dibersihkan',
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      menunggu: { color: 'bg-yellow-100 text-yellow-800', text: 'Menunggu' },
      proses: { color: 'bg-blue-100 text-blue-800', text: 'Diproses' },
      selesai: { color: 'bg-green-100 text-green-800', text: 'Selesai' },
      ditolak: { color: 'bg-red-100 text-red-800', text: 'Ditolak' },
    };

    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', text: status };
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

  const viewDetail = (pengaduanId) => {
    const pengaduan = pengaduanList.find((p) => p._id === pengaduanId);
    setSelectedPengaduan(pengaduan);
    setShowModal(true);
  };

  const updateStatus = (pengaduanId, newStatus) => {
    // Fungsi placeholder untuk update status
    console.log(`Update pengaduan ${pengaduanId} to ${newStatus}`);
  };

  // Filter pengaduan berdasarkan status yang dipilih
  const filteredPengaduan = selectedStatus === 'all' ? pengaduanList : pengaduanList.filter((p) => p.status === selectedStatus);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin - Pengaduan Warga</h1>
          <p className="text-gray-600">Kelola dan monitor semua pengaduan dari warga</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Menunggu</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.menunggu}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Proses</p>
                <p className="text-2xl font-bold text-blue-600">{stats.proses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Selesai</p>
                <p className="text-2xl font-bold text-green-600">{stats.selesai}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ditolak</p>
                <p className="text-2xl font-bold text-red-600">{stats.ditolak}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter Status:</label>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">Semua Status</option>
              <option value="menunggu">Menunggu</option>
              <option value="proses">Proses</option>
              <option value="selesai">Selesai</option>
              <option value="ditolak">Ditolak</option>
            </select>
          </div>
        </div>

        {/* Pengaduan List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Daftar Pengaduan</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pengadu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPengaduan.map((pengaduan) => (
                  <tr key={pengaduan._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{pengaduan.warga?.nama || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{pengaduan.warga?.email || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{pengaduan.judul}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{pengaduan.kategori}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{pengaduan.lokasi}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(pengaduan.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(pengaduan.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button onClick={() => viewDetail(pengaduan._id)} className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>

                        {pengaduan.status === 'menunggu' && (
                          <>
                            <button onClick={() => updateStatus(pengaduan._id, 'proses')} className="text-blue-600 hover:text-blue-900 px-2 py-1 text-xs bg-blue-100 rounded">
                              Proses
                            </button>
                            <button onClick={() => updateStatus(pengaduan._id, 'ditolak')} className="text-red-600 hover:text-red-900 px-2 py-1 text-xs bg-red-100 rounded">
                              Tolak
                            </button>
                          </>
                        )}

                        {pengaduan.status === 'proses' && (
                          <button onClick={() => updateStatus(pengaduan._id, 'selesai')} className="text-green-600 hover:text-green-900 px-2 py-1 text-xs bg-green-100 rounded">
                            Selesai
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredPengaduan.length === 0 && (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada pengaduan</h3>
                <p className="mt-1 text-sm text-gray-500">Belum ada pengaduan dengan status yang dipilih.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Detail */}
      {showModal && selectedPengaduan && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Detail Pengaduan</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Judul</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPengaduan.judul}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Kategori</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPengaduan.kategori}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <div className="mt-1">{getStatusBadge(selectedPengaduan.status)}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Lokasi</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPengaduan.lokasi}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                  <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{selectedPengaduan.deskripsi}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Pengadu</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedPengaduan.warga?.nama} ({selectedPengaduan.warga?.email})
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tanggal Dibuat</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedPengaduan.createdAt)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Terakhir Diupdate</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedPengaduan.updatedAt)}</p>
                  </div>
                </div>

                {selectedPengaduan.keteranganAdmin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Keterangan Admin</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPengaduan.keteranganAdmin}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                {selectedPengaduan.status === 'menunggu' && (
                  <>
                    <button
                      onClick={() => {
                        updateStatus(selectedPengaduan._id, 'proses');
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                    >
                      Set ke Proses
                    </button>
                    <button
                      onClick={() => {
                        updateStatus(selectedPengaduan._id, 'ditolak');
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
                    >
                      Tolak
                    </button>
                  </>
                )}

                {selectedPengaduan.status === 'proses' && (
                  <button
                    onClick={() => {
                      updateStatus(selectedPengaduan._id, 'selesai');
                      setShowModal(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
                  >
                    Selesaikan
                  </button>
                )}

                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-400">
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

export default AdminTotalPengaduan;
