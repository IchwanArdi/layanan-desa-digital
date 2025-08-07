import { XCircle } from 'lucide-react';
import { getStatusBadge } from './uiUtils';

const DetailModal = ({
  showModal,
  setShowModal,
  selectedItem,
  darkMode,
  type = 'pengajuan', // 'pengajuan' atau 'pengaduan'
  formatDate,
  updateStatus,
}) => {
  if (!showModal || !selectedItem) return null;

  // Konfigurasi field berdasarkan type
  const getFieldConfig = () => {
    const configs = {
      pengajuan: {
        title: 'Detail Pengajuan',
        fields: [
          { key: 'jenisDokumen', label: 'Judul', type: 'text' },
          { key: 'kategori', label: 'Kategori', type: 'text' },
          { key: 'status', label: 'Status', type: 'badge' },
          { key: 'alamat', label: 'Alamat', type: 'text' },
          { key: 'catatan', label: 'Deskripsi', type: 'textarea' },
          { key: 'warga', label: 'Pengajuan', type: 'user' },
          { key: 'createdAt', label: 'Tanggal Dibuat', type: 'date' },
          { key: 'updatedAt', label: 'Terakhir Diupdate', type: 'date' },
          { key: 'keteranganAdmin', label: 'Keterangan Admin', type: 'text', conditional: true },
        ],
      },
      pengaduan: {
        title: 'Detail Pengaduan',
        fields: [
          { key: 'judul', label: 'Judul', type: 'text' },
          { key: 'kategori', label: 'Kategori', type: 'text' },
          { key: 'status', label: 'Status', type: 'badge' },
          { key: 'lokasi', label: 'Lokasi', type: 'text' },
          { key: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
          { key: 'warga', label: 'Pengadu', type: 'user' },
          { key: 'createdAt', label: 'Tanggal Dibuat', type: 'date' },
          { key: 'updatedAt', label: 'Terakhir Diupdate', type: 'date' },
          { key: 'keteranganAdmin', label: 'Keterangan Admin', type: 'text', conditional: true },
        ],
      },
    };
    return configs[type] || configs.pengajuan;
  };

  const config = getFieldConfig();

  const renderField = (field) => {
    const value = selectedItem[field.key];

    // Skip field jika conditional dan value kosong
    if (field.conditional && !value) return null;

    switch (field.type) {
      case 'badge':
        return (
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{field.label}</label>
            <div className="mt-1">{getStatusBadge(value, darkMode)}</div>
          </div>
        );

      case 'user':
        return (
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{field.label}</label>
            <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {value?.nama} ({value?.email})
            </p>
          </div>
        );

      case 'date':
        return (
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{field.label}</label>
            <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(value)}</p>
          </div>
        );

      case 'textarea':
        return (
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{field.label}</label>
            <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'} whitespace-pre-wrap`}>{value}</p>
          </div>
        );

      default: // text
        return (
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{field.label}</label>
            <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className={`relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
        <div className="mt-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{config.title}</h3>
            <button onClick={() => setShowModal(false)} className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            {config.fields.map((field, index) => {
              // Handle grid layout untuk beberapa field
              if (field.key === 'kategori') {
                const statusField = config.fields.find((f) => f.key === 'status');
                return (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    {renderField(field)}
                    {renderField(statusField)}
                  </div>
                );
              }

              if (field.key === 'status') return null; // Skip karena sudah di-render di atas

              if (field.key === 'createdAt') {
                const updatedField = config.fields.find((f) => f.key === 'updatedAt');
                return (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    {renderField(field)}
                    {renderField(updatedField)}
                  </div>
                );
              }

              if (field.key === 'updatedAt') return null; // Skip karena sudah di-render di atas

              return <div key={index}>{renderField(field)}</div>;
            })}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            {selectedItem.status === 'menunggu' && (
              <>
                <button
                  onClick={() => {
                    updateStatus(selectedItem._id, 'proses');
                    setShowModal(false);
                  }}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Set ke Proses
                </button>
                <button
                  onClick={() => {
                    updateStatus(selectedItem._id, 'ditolak');
                    setShowModal(false);
                  }}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 text-white"
                >
                  Tolak
                </button>
              </>
            )}

            {selectedItem.status === 'proses' && (
              <>
                <button
                  onClick={() => {
                    updateStatus(selectedItem._id, 'ditindaklanjuti');
                    setShowModal(false);
                  }}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Tindaklanjuti
                </button>
                <button
                  onClick={() => {
                    updateStatus(selectedItem._id, 'selesai');
                    setShowModal(false);
                  }}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-green-600 hover:bg-green-700 text-white"
                >
                  Selesaikan
                </button>
              </>
            )}

            {selectedItem.status === 'ditindaklanjuti' && (
              <button
                onClick={() => {
                  updateStatus(selectedItem._id, 'selesai');
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
  );
};

export default DetailModal;
