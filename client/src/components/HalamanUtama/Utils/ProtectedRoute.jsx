import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/check-auth`, {
          method: 'GET',
          credentials: 'include',
        });

        const result = await response.json();

        if (!result.isAuthenticated) {
          toast.warning('Silakan login terlebih dahulu');
          navigate('/auth/login');
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Gagal mengecek autentikasi:', error);
        navigate('/auth/login');
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return children;
}
