import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm.jsx';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // kalau pakai session/cookie
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Login berhasil:', result);
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate('/desa-digital/dashboard');
      } else {
        alert(result.message || 'Login gagal');
      }
    } catch (error) {
      console.error('Error saat login:', error);
      alert('Terjadi kesalahan jaringan');
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
