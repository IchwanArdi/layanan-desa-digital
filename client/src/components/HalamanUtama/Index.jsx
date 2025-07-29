// IndexHalamanUtama.jsx
import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import SidebarWithHeader from './utils/SidebarWithHeader.jsx';
import 'aos/dist/aos.css';

export default function IndexHalamanUtama() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

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
      <div className="min-h-screen bg-gray-50">
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
