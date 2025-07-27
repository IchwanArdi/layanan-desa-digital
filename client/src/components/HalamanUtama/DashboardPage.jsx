// DashboardPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/auth/login'); // redirect kalau belum login
    }
  }, [user, navigate]);

  return (
    <div className="p-4">
      <h1>Selamat datang, {user?.nama}!</h1>
      <h1>Email anda, {user?.email}!</h1>
      <h1>Id anda, {user?.id}!</h1>
      <p>Ini adalah halaman dashboard desa digital.</p>
    </div>
  );
}
