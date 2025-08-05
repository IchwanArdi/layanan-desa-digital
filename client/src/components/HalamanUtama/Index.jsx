// IndexHalamanUtama.jsx
import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import SidebarWithHeader from './navbar-header/SidebarWithHeader.jsx';
import 'aos/dist/aos.css';
import { useSettings } from '../../contexts/SettingsContext.jsx'; // Import context untuk dark mode

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
    return <div>Loading...</div>;
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
