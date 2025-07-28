import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthForm from './AuthForm.jsx';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log('URL API:', import.meta.env.VITE_API_URL); // untuk debugging

  const handleLogin = async (data) => {
    setLoading(true); // mulai loading
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // penting kalau pakai session/cookie
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate('/dashboard');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error saat login:', error);
      toast.error('Terjadi kesalahan saat login.');
    } finally {
      setLoading(false); // loading selesai
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} loading={loading} />;
}
