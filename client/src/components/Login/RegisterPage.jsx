import AuthForm from './AuthForm';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      setLoading(true); // mulai loading
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // kalau pakai session/cookie
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate('/auth/login');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error saat registrasi:', error);
      toast.error(error.message || 'Terjadi kesalahan Registrasi');
    } finally {
      setLoading(false); // loading selesai
    }
  };

  return <AuthForm type="register" onSubmit={handleRegister} loading={loading} />;
}
