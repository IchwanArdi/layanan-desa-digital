import { XCircle } from 'lucide-react';

const DetailModal = ({
  showModal,
  onClose,
  selectedItem,
  darkMode,
  getStatusBadge,
  formatDate,
  updateStatus,
  type = 'pengaduan', // 'pengaduan' atau 'pengajuan'
}) => {
  if (!showModal || !selectedItem) return null;

  const getTitle = () => {
    return type === 'pengajuan' ? 'Detail Pengajuan' : 'Detail Pengaduan';
  };

  const getFields = () => {
    if (type === 'pengajuan') {
      return {
        mainTitle: 'Jenis Dokumen',
        mainTitleValue: selectedItem.jenisDokumen,
        kategori: selectedItem.keperluan,
        location: selectedItem.alamat,
        locationLabel: 'Alamat',
        description: selectedItem.catatan,
        descriptionLabel: 'Catatan',
        userLabel: 'Pemohon',
      };
    } else {
      return {
        mainTitle: 'Judul',
        mainTitleValue: selectedItem.judul,
        kategori: selectedItem.kategori,
        location: selectedItem.lokasi,
        locationLabel: 'Lokasi',
        description: selectedItem.deskripsi,
        descriptionLabel: 'Deskripsi',
        userLabel: 'Pengadu',
      };
    }
  };

  const fields = getFields();

  const handleStatusUpdate = (newStatus) => {
    updateStatus(selectedItem._id, newStatus);
    onClose();
  };

  const renderActionButtons = () => {
    if (selectedItem.status === 'menunggu') {
      return (
        <>
          <button onClick={() => handleStatusUpdate('proses')} className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white">
            Set ke Proses
          </button>
          <button onClick={() => handleStatusUpdate('ditolak')} className="px-4 py-2 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 text-white">
            Tolak
          </button>
        </>
      );
    }

    if (selectedItem.status === 'proses') {
      return (
        <>
          <button onClick={() => handleStatusUpdate('ditindaklanjuti')} className="px-4 py-2 text-sm font-medium rounded-md bg-purple-600 hover:bg-purple-700 text-white">
            Tindaklanjuti
          </button>
          <button onClick={() => handleStatusUpdate('selesai')} className="px-4 py-2 text-sm font-medium rounded-md bg-green-600 hover:bg-green-700 text-white">
            Selesaikan
          </button>
        </>
      );
    }

    if (selectedItem.status === 'ditindaklanjuti') {
      return (
        <button onClick={() => handleStatusUpdate('selesai')} className="px-4 py-2 text-sm font-medium rounded-md bg-green-600 hover:bg-green-700 text-white">
          Selesaikan
        </button>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className={`relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
        <div className="mt-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{getTitle()}</h3>
            <button onClick={onClose} className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{fields.mainTitle}</label>
              <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{fields.mainTitleValue}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Kategori</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{fields.kategori}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Status</label>
                <div className="mt-1">{getStatusBadge(selectedItem.status, darkMode)}</div>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{fields.locationLabel}</label>
              <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{fields.location}</p>
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{fields.descriptionLabel}</label>
              <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'} whitespace-pre-wrap`}>{fields.description}</p>
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{fields.userLabel}</label>
              <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {selectedItem.warga?.nama} ({selectedItem.warga?.email})
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Tanggal Dibuat</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(selectedItem.createdAt)}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Terakhir Diupdate</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(selectedItem.updatedAt)}</p>
              </div>
            </div>

            {selectedItem.keteranganAdmin && (
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Keterangan Admin</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedItem.keteranganAdmin}</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            {renderActionButtons()}

            <button onClick={onClose} className={`px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'bg-slate-600 text-white hover:bg-slate-500' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}>
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
