import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import 'aos/dist/aos.css';
import { Activity } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext.jsx'; // Import context untuk dark mode
import SidebarWithHeader from './navbar-header/SidebarWithHeader.jsx';

export default function IndexHalamanUtama() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // Ambil state darkMode dari context
  const { darkMode } = useSettings();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login'); // redirect kalau belum login
    }
  }, [user, navigate]);

  // Jika belum login, jangan render apapun (atau bisa loading spinner)
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className={`${darkMode ? 'text-white' : 'text-gray-800'} flex items-center space-x-3`}>
          <Activity className="w-8 h-8 animate-spin" />
          <span className="text-xl">Memuat Halaman...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>
        <SidebarWithHeader />

        {/* Main Content */}
        <main className="lg:ml-64 pt-6 p-6">
          {/* Outlet akan menampilkan child routes */}
          <Outlet />
        </main>
      </div>
    </>
  );
}
