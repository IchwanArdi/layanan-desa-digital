import { Outlet } from 'react-router-dom';
import SidebarWithHeader from '../components/HalamanUtama/navbar-header/SidebarWithHeader.jsx';
import { useSettings } from '../contexts/SettingsContext.jsx';

const AdminLayout = () => {
  // Menggunakan useSettings untuk mendapatkan darkMode
  const { darkMode } = useSettings();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <SidebarWithHeader />

      {/* Main Content Area */}
      <main className="lg:ml-64 pt-6 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
