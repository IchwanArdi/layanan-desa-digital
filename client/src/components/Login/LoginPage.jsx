import AuthForm from './AuthForm';

export default function LoginPage() {
  const handleLogin = (data) => {
    console.log('Login data:', data);
    // TODO: kirim ke backend login
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
