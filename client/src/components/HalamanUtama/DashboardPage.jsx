// DashboardPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/auth/login'); // redirect kalau belum login
    }
  }, [user, navigate]);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />

        {/* Main Content */}
        <main className="lg:ml-64 pt-10">
          {/* pt-10 untuk spacing header */}
          {/* Konten halaman Anda */}
          <h1>Selamat datang, {user?.nama}!</h1>
          <h1>Email anda, {user?.email}!</h1>
          <h1>Id anda, {user?.id}!</h1>
          <p>Ini adalah halaman dashboard desa digital.</p>
        </main>
      </div>
    </>
  );
}
