import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AuthForm from './AuthForm.jsx';
import { useSettings } from '../../contexts/SettingsContext.jsx';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Ambil fungsi setUser dari SettingsContext
  const { setUser } = useSettings();

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

        // Simpan user ke SettingsContext
        setUser(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));

        if (result.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
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
