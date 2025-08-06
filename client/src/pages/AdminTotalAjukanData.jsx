import { useSettings } from '../contexts/SettingsContext';

function AdminTotalAjukanData() {
  const { darkMode } = useSettings();

  return (
    <div>
      <h1 className={`${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>Total Ajukan Data</h1>
      {/* Tambahkan komponen atau logika lainnya sesuai kebutuhan */}
    </div>
  );
}

export default AdminTotalAjukanData;
