import { Eye } from 'lucide-react';

// Konfigurasi kolom untuk tabel Pengajuan
export const pengajuanColumns = (darkMode, viewDetail, updateStatus, formatDate, getStatusBadge) => [
  {
    header: 'Pengajuan',
    render: (item, userInfo) => (
      <div>
        <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userInfo.nama}</div>
        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{userInfo.email}</div>
      </div>
    ),
  },
  {
    header: 'Judul',
    className: 'px-6 py-4',
    render: (item) => <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'} max-w-xs truncate`}>{item.jenisDokumen}</div>,
  },
  {
    header: 'Kategori',
    render: (item) => <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.keperluan}</span>,
  },
  {
    header: 'Alamat',
    className: 'px-6 py-4',
    render: (item) => <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'} max-w-xs truncate`}>{item.alamat}</div>,
  },
  {
    header: 'Status',
    render: (item) => getStatusBadge(item.status, darkMode),
  },
  {
    header: 'Tanggal',
    className: `px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`,
    render: (item) => formatDate(item.createdAt),
  },
  {
    header: 'Aksi',
    className: 'px-6 py-4 whitespace-nowrap text-sm font-medium',
    render: (item) => (
      <div className="flex space-x-2">
        <button onClick={() => viewDetail(item._id)} className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'}`}>
          <Eye className="w-4 h-4" />
        </button>

        {item.status === 'menunggu' && (
          <>
            <button
              onClick={() => updateStatus(item._id, 'proses')}
              className={`px-2 py-1 text-xs rounded ${darkMode ? 'text-blue-300 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-700/50' : 'text-blue-600 bg-blue-100 hover:text-blue-900'}`}
            >
              Proses
            </button>
            <button
              onClick={() => updateStatus(item._id, 'ditolak')}
              className={`px-2 py-1 text-xs rounded ${darkMode ? 'text-red-300 bg-red-900/30 hover:bg-red-900/50 border border-red-700/50' : 'text-red-600 bg-red-100 hover:text-red-900'}`}
            >
              Tolak
            </button>
          </>
        )}

        {item.status === 'proses' && (
          <>
            <button
              onClick={() => updateStatus(item._id, 'ditindaklanjuti')}
              className={`px-2 py-1 text-xs rounded ${darkMode ? 'text-purple-300 bg-purple-900/30 hover:bg-purple-900/50 border border-purple-700/50' : 'text-purple-600 bg-purple-100 hover:text-purple-900'}`}
            >
              Tindaklanjuti
            </button>
            <button
              onClick={() => updateStatus(item._id, 'selesai')}
              className={`px-2 py-1 text-xs rounded ${darkMode ? 'text-green-300 bg-green-900/30 hover:bg-green-900/50 border border-green-700/50' : 'text-green-600 bg-green-100 hover:text-green-900'}`}
            >
              Selesai
            </button>
          </>
        )}

        {item.status === 'ditindaklanjuti' && (
          <button
            onClick={() => updateStatus(item._id, 'selesai')}
            className={`px-2 py-1 text-xs rounded ${darkMode ? 'text-green-300 bg-green-900/30 hover:bg-green-900/50 border border-green-700/50' : 'text-green-600 bg-green-100 hover:text-green-900'}`}
          >
            Selesai
          </button>
        )}
      </div>
    ),
  },
];

// Konfigurasi kolom untuk tabel Pengaduan
export const pengaduanColumns = (darkMode, viewDetail, updateStatus, formatDate, getStatusBadge) => [
  {
    header: 'Pengadu',
    render: (item, userInfo) => (
      <div>
        <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userInfo.nama}</div>
        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{userInfo.email}</div>
      </div>
    ),
  },
  {
    header: 'Judul',
    className: 'px-6 py-4',
    render: (item) => <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'} max-w-xs truncate`}>{item.judul}</div>,
  },
  {
    header: 'Kategori',
    render: (item) => <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.kategori}</span>,
  },
  {
    header: 'Lokasi',
    className: 'px-6 py-4',
    render: (item) => <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'} max-w-xs truncate`}>{item.lokasi}</div>,
  },
  {
    header: 'Status',
    render: (item) => getStatusBadge(item.status, darkMode),
  },
  {
    header: 'Tanggal',
    className: `px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`,
    render: (item) => formatDate(item.createdAt),
  },
  {
    header: 'Aksi',
    className: 'px-6 py-4 whitespace-nowrap text-sm font-medium',
    render: (item) => (
      <div className="flex space-x-2">
        <button onClick={() => viewDetail(item._id)} className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'}`}>
          <Eye className="w-4 h-4" />
        </button>

        {item.status === 'menunggu' && (
          <>
            <button
              onClick={() => updateStatus(item._id, 'proses')}
              className={`px-2 py-1 text-xs rounded ${darkMode ? 'text-blue-300 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-700/50' : 'text-blue-600 bg-blue-100 hover:text-blue-900'}`}
            >
              Proses
            </button>
            <button
              onClick={() => updateStatus(item._id, 'ditolak')}
              className={`px-2 py-1 text-xs rounded ${darkMode ? 'text-red-300 bg-red-900/30 hover:bg-red-900/50 border border-red-700/50' : 'text-red-600 bg-red-100 hover:text-red-900'}`}
            >
              Tolak
            </button>
          </>
        )}

        {item.status === 'proses' && (
          <>
            <button
              onClick={() => updateStatus(item._id, 'ditindaklanjuti')}
              className={`px-2 py-1 text-xs rounded ${darkMode ? 'text-purple-300 bg-purple-900/30 hover:bg-purple-900/50 border border-purple-700/50' : 'text-purple-600 bg-purple-100 hover:text-purple-900'}`}
            >
              Tindaklanjuti
            </button>
            <button
              onClick={() => updateStatus(item._id, 'selesai')}
              className={`px-2 py-1 text-xs rounded ${darkMode ? 'text-green-300 bg-green-900/30 hover:bg-green-900/50 border border-green-700/50' : 'text-green-600 bg-green-100 hover:text-green-900'}`}
            >
              Selesai
            </button>
          </>
        )}

        {item.status === 'ditindaklanjuti' && (
          <button
            onClick={() => updateStatus(item._id, 'selesai')}
            className={`px-2 py-1 text-xs rounded ${darkMode ? 'text-green-300 bg-green-900/30 hover:bg-green-900/50 border border-green-700/50' : 'text-green-600 bg-green-100 hover:text-green-900'}`}
          >
            Selesai
          </button>
        )}
      </div>
    ),
  },
];

// Pesan kosong untuk setiap tabel
export const emptyMessages = {
  pengajuan: {
    title: 'Tidak ada Pengajuan',
    description: 'Belum ada Pengajuan dengan status yang dipilih.',
  },
  pengaduan: {
    title: 'Tidak ada pengaduan',
    description: 'Belum ada pengaduan dengan status yang dipilih.',
  },
};
