import AuthForm from './AuthForm';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const handleRegister = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // kalau pakai session/cookie
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Registrasi berhasil:', result);
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate('/auth/login');
      } else {
        alert(result.message || 'Registrasi gagal');
      }
    } catch (error) {
      console.error('Error saat registrasi:', error);
      alert('Terjadi kesalahan jaringan');
    }
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
}
